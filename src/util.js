'use strict';

var md5 = require('../lib/md5');
var CryptoJS = require('../lib/crypto');
var xml2json = require('../lib/xml2json');
var json2xml = require('../lib/json2xml');
var Tracker = require('./tracker');

function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

function getObjectKeys(obj, forKey) {
    var list = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            list.push(forKey ? camSafeUrlEncode(key).toLowerCase() : key);
        }
    }
    return list.sort(function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a === b ? 0 : (a > b ? 1 : -1);
    });
};

/**
 * obj转为string
 * @param  {Object}  obj                需要转的对象，必须
 * @param  {Boolean} lowerCaseKey       key是否转为小写，默认false，非必须
 * @return {String}  data               返回字符串
 */
var obj2str = function (obj, lowerCaseKey) {
    var i, key, val;
    var list = [];
    var keyList = getObjectKeys(obj);
    for (i = 0; i < keyList.length; i++) {
        key = keyList[i];
        val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
        key = lowerCaseKey? camSafeUrlEncode(key).toLowerCase() : camSafeUrlEncode(key);
        val = camSafeUrlEncode(val) || '';
        list.push(key + '=' + val)
    }
    return list.join('&');
};


// 可以签入签名的headers
var signHeaders = ['cache-control', 'content-disposition', 'content-encoding', 'content-length', 'content-md5',
    'expect', 'expires', 'host', 'if-match', 'if-modified-since', 'if-none-match', 'if-unmodified-since',
    'origin', 'range', 'transfer-encoding'];

var getSignHeaderObj = function (headers) {
    var signHeaderObj = {};
    for (var i in headers) {
        var key = i.toLowerCase();
        if (key.indexOf('x-cos-') > -1 || signHeaders.indexOf(key) > -1) {
            signHeaderObj[i] = headers[i];
        }
    }
    return signHeaderObj;
}

//测试用的key后面可以去掉
var getAuth = function (opt) {
    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var KeyTime = opt.KeyTime;
    var method = (opt.method || opt.Method || 'get').toLowerCase();
    var queryParams = clone(opt.Query || opt.params || {});
    var headers = getSignHeaderObj(clone(opt.Headers || opt.headers || {}));

    var Key = opt.Key || '';
    var pathname;
    if (opt.UseRawKey) {
        pathname = opt.Pathname || opt.pathname || '/' + Key;
    } else {
        pathname = opt.Pathname || opt.pathname || Key;
        pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
    }

    // ForceSignHost明确传入false才不加入host签名
    var forceSignHost = opt.ForceSignHost === false ? false : true;

    // 如果有传入存储桶且需要强制签名，那么签名默认加 Host 参与计算，避免跨桶访问
    if (!headers.Host && !headers.host && opt.Bucket && opt.Region && forceSignHost) headers.Host = opt.Bucket + '.cos.' + opt.Region + '.myqcloud.com';

    if (!SecretId) throw new Error('missing param SecretId');
    if (!SecretKey) throw new Error('missing param SecretKey');

    // 签名有效起止时间
    var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;
    var exp = now;

    var Expires = opt.Expires || opt.expires;
    if (Expires === undefined) {
        exp += 900; // 签名过期时间为当前 + 900s
    } else {
        exp += (Expires * 1) || 0;
    }

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = KeyTime || now + ';' + exp;
    var qKeyTime = KeyTime || now + ';' + exp;
    var qHeaderList = getObjectKeys(headers, true).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(queryParams, true).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString();

    // 步骤二：构成 FormatString
    var formatString = [method, pathname, util.obj2str(queryParams, true), util.obj2str(headers, true), ''].join('\n');

    // 步骤三：计算 StringToSign
    var stringToSign = ['sha1', qSignTime, CryptoJS.SHA1(formatString).toString(), ''].join('\n');

    // 步骤四：计算 Signature
    var qSignature = CryptoJS.HmacSHA1(stringToSign, signKey).toString();

    // 步骤五：构造 Authorization
    var authorization = [
        'q-sign-algorithm=' + qSignAlgorithm,
        'q-ak=' + qAk,
        'q-sign-time=' + qSignTime,
        'q-key-time=' + qKeyTime,
        'q-header-list=' + qHeaderList,
        'q-url-param-list=' + qUrlParamList,
        'q-signature=' + qSignature
    ].join('&');

    return authorization;

};

var readIntBE = function (chunk, size, offset) {
    var bytes = size / 8;
    var buf = chunk.slice(offset, offset + bytes);
    new Uint8Array(buf).reverse();
    return new ({8: Uint8Array, 16: Uint16Array, 32: Uint32Array})[size](buf)[0];
};
var buf2str = function (chunk, start, end, isUtf8) {
    var buf = chunk.slice(start, end);
    var str = '';
    new Uint8Array(buf).forEach(function (charCode) {
        str += String.fromCharCode(charCode)
    });
    if (isUtf8) str = decodeURIComponent(escape(str));
    return str;
};
var parseSelectPayload = function (chunk) {
    var header = {};
    var body = buf2str(chunk);
    var result = {records:[]};
    while (chunk.byteLength) {
        var totalLength = readIntBE(chunk, 32, 0);
        var headerLength = readIntBE(chunk, 32, 4);
        var payloadRestLength = totalLength - headerLength - 16;
        var offset = 0;
        var content;
        chunk = chunk.slice(12);
        // 获取 Message 的 header 信息
        while (offset < headerLength) {
            var headerNameLength = readIntBE(chunk, 8, offset);
            var headerName = buf2str(chunk, offset + 1, offset + 1 + headerNameLength);
            var headerValueLength = readIntBE(chunk, 16, offset + headerNameLength + 2);
            var headerValue = buf2str(chunk, offset + headerNameLength + 4, offset + headerNameLength + 4 + headerValueLength);
            header[headerName] = headerValue;
            offset += headerNameLength + 4 + headerValueLength;
        }
        if (header[':event-type'] === 'Records') {
            content = buf2str(chunk, offset, offset + payloadRestLength, true);
            result.records.push(content);
        } else if (header[':event-type'] === 'Stats') {
            content = buf2str(chunk, offset, offset + payloadRestLength, true);
            result.stats = util.xml2json(content).Stats;
        } else if (header[':event-type'] === 'error') {
            var errCode = header[':error-code'];
            var errMessage = header[':error-message'];
            var err = new Error(errMessage);
            err.message = errMessage;
            err.name = err.code = errCode;
            result.error = err;
        } else if (['Progress', 'Continuation', 'End'].includes(header[':event-type'])) {
            // do nothing
        }
        chunk = chunk.slice(offset + payloadRestLength + 4);
    }
    return {
        payload: result.records.join(''),
        body: body,
    };
};

var getSourceParams = function (source) {
    var parser = this.options.CopySourceParser;
    if (parser) return parser(source);
    var m = source.match(/^([^.]+-\d+)\.cos(v6|-cdc|-cdz|-internal)?\.([^.]+)\.((myqcloud\.com)|(tencentcos\.cn))\/(.+)$/);
    if (!m) return null;
    return { Bucket: m[1], Region: m[3], Key: m[7] };
};

var noop = function () {

};

// 清除对象里值为的 undefined 或 null 的属性
var clearKey = function (obj) {
    var retObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
            retObj[key] = obj[key];
        }
    }
    return retObj;
};

var readAsBinaryString = function (blob, callback) {
    var readFun;
    var fr = new FileReader();
    if (FileReader.prototype.readAsBinaryString) {
        readFun = FileReader.prototype.readAsBinaryString;
        fr.onload = function () {
            callback(this.result);
        };
    } else if (FileReader.prototype.readAsArrayBuffer) { // 在 ie11 添加 readAsBinaryString 兼容
        readFun = function (fileData) {
            var binary = "";
            var pt = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                callback(binary);
            };
            reader.readAsArrayBuffer(fileData);
        };
    } else {
        console.error('FileReader not support readAsBinaryString');
    }
    readFun.call(fr, blob);
};

var fileSliceNeedCopy = (function () {
    var compareVersion = function(a, b) {
        a = a.split('.');
        b = b.split('.');
        for (var i = 0; i < b.length; i++) {
            if (a[i] !== b[i]) {
                return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;
            }
        }
        return 0;
    };
    var check = function (ua) {
        if (!ua) return false;
        var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
        var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
        var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0
            && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0
            && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
        return need;
    };
    return check(typeof navigator !== 'undefined' && navigator.userAgent);
})();

// 获取文件分片
var fileSlice = function (file, start, end, isUseToUpload, callback) {
    var blob;
    if (file.slice) {
        blob = file.slice(start, end);
    } else if (file.mozSlice) {
        blob = file.mozSlice(start, end);
    } else if (file.webkitSlice) {
        blob = file.webkitSlice(start, end);
    }
    if (isUseToUpload && fileSliceNeedCopy) {
        var reader = new FileReader();
        reader.onload = function (e) {
            blob = null;
            callback(new Blob([reader.result]));
        };
        reader.readAsArrayBuffer(blob);
    } else {
        callback(blob);
    }
};

// 获取文件内容的 MD5
var getBodyMd5 = function (UploadCheckContentMd5, Body, callback, onProgress) {
    callback = callback || noop;
    if (UploadCheckContentMd5) {
        if (typeof Body === 'string') {
            callback(util.md5(Body, true));
        } else if (Blob && Body instanceof Blob) {
            util.getFileMd5(Body, function (err, md5) {
                callback(md5);
            }, onProgress);
        } else {
            callback();
        }
    } else {
        callback();
    }
};

// 获取文件 md5 值
var md5ChunkSize = 1024 * 1024;
var getFileMd5 = function (blob, callback, onProgress) {
    var size = blob.size;
    var loaded = 0;
    var md5ctx = md5.getCtx();
    var next = function (start) {
        if (start >= size) {
            var hash = md5ctx.digest('hex');
            callback(null, hash);
            return;
        }
        var end = Math.min(size, start + md5ChunkSize);
        util.fileSlice(blob, start, end, false, function (chunk) {
            readAsBinaryString(chunk, function (content) {
                chunk = null;
                md5ctx = md5ctx.update(content, true);
                loaded += content.length;
                content = null;
                if (onProgress) onProgress({loaded: loaded, total: size, percent: Math.round(loaded / size * 10000) / 10000});
                next(start + md5ChunkSize);
            });
        });
    };
    next(0);
};

function clone(obj) {
    return map(obj, function (v) {
        return typeof v === 'object' && v !== null ? clone(v) : v;
    });
}

function attr(obj, name, defaultValue) {
    return obj && name in obj ? obj[name] : defaultValue;
}

function extend(target, source) {
    each(source, function (val, key) {
        target[key] = source[key];
    });
    return target;
}

function isArray(arr) {
    return arr instanceof Array;
}

function isInArray(arr, item) {
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
        if (item === arr[i]) {
            flag = true;
            break;
        }
    }
    return flag;
}

function makeArray(arr) {
    return isArray(arr) ? arr : [arr];
}

function each(obj, fn) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            fn(obj[i], i);
        }
    }
}

function map(obj, fn) {
    var o = isArray(obj) ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = fn(obj[i], i);
        }
    }
    return o;
}

function filter(obj, fn) {
    var iaArr = isArray(obj);
    var o = iaArr ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (fn(obj[i], i)) {
                if (iaArr) {
                    o.push(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        }
    }
    return o;
}

var binaryBase64 = function (str) {
    var i, len, char, res = '';
    for (i = 0, len = str.length / 2; i < len; i++) {
        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
        res += String.fromCharCode(char);
    }
    return btoa(res);
};
var uuid = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

var hasMissingParams = function (apiName, params) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var Domain = this.options.Domain;
    var checkBucket = !Domain || typeof Domain === 'string' && Domain.indexOf('{Bucket}') > -1;
    var checkRegion = !Domain || typeof Domain === 'string' && Domain.indexOf('{Region}') > -1;
    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
        if (checkBucket && !Bucket) return 'Bucket';
        if (checkRegion && !Region) return 'Region';
    } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
        if (checkBucket && !Bucket) return 'Bucket';
        if (checkRegion && !Region) return 'Region';
        if (!Key) return 'Key';
    }
    return false;
};

var formatParams = function (apiName, params) {

    // 复制参数对象
    params = extend({}, params);

    // 统一处理 Headers
    if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {
        var Headers = params.Headers || {};
        if (params && typeof params === 'object') {
            (function () {
                for (var key in params) {
                    if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {
                        Headers[key] = params[key];
                    }
                }
            })();

            var headerMap = {
                // params headers
                'x-cos-mfa': 'MFA',
                'Content-MD5': 'ContentMD5',
                'Content-Length': 'ContentLength',
                'Content-Type': 'ContentType',
                'Expect': 'Expect',
                'Expires': 'Expires',
                'Cache-Control': 'CacheControl',
                'Content-Disposition': 'ContentDisposition',
                'Content-Encoding': 'ContentEncoding',
                'Range': 'Range',
                'If-Modified-Since': 'IfModifiedSince',
                'If-Unmodified-Since': 'IfUnmodifiedSince',
                'If-Match': 'IfMatch',
                'If-None-Match': 'IfNoneMatch',
                'x-cos-copy-source': 'CopySource',
                'x-cos-copy-source-Range': 'CopySourceRange',
                'x-cos-metadata-directive': 'MetadataDirective',
                'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',
                'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',
                'x-cos-copy-source-If-Match': 'CopySourceIfMatch',
                'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',
                'x-cos-acl': 'ACL',
                'x-cos-grant-read': 'GrantRead',
                'x-cos-grant-write': 'GrantWrite',
                'x-cos-grant-full-control': 'GrantFullControl',
                'x-cos-grant-read-acp': 'GrantReadAcp',
                'x-cos-grant-write-acp': 'GrantWriteAcp',
                'x-cos-storage-class': 'StorageClass',
                'x-cos-traffic-limit': 'TrafficLimit',
                'x-cos-mime-limit': 'MimeLimit',
                // SSE-C
                'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
                'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
                'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
                // SSE-COS、SSE-KMS
                'x-cos-server-side-encryption': 'ServerSideEncryption',
                'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
                'x-cos-server-side-encryption-context': 'SSEContext',
                // 上传时图片处理
                'Pic-Operations': 'PicOperations',
            };
            util.each(headerMap, function (paramKey, headerKey) {
                if (params[paramKey] !== undefined) {
                    Headers[headerKey] = params[paramKey];
                }
            });

            params.Headers = clearKey(Headers);
        }
    }

    return params;
};

var apiWrapper = function (apiName, apiFn) {
    return function (params, callback) {

        var self = this;

        // 处理参数
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }

        // 整理参数格式
        params = formatParams(apiName, params);

        // tracker传递
        var tracker;
        if (self.options.EnableTracker) {
          if (params.calledBySdk === 'sliceUploadFile') {
            // 分块上传内部方法使用sliceUploadFile的子链路
            tracker = params.tracker && params.tracker.generateSubTracker({ apiName });
          } else if (['uploadFile', 'uploadFiles'].includes(apiName)) {
            // uploadFile、uploadFiles方法在内部处理，此处不处理
            tracker = null;
          } else {
            var fileSize = -1;
            if (params.Body) {
              fileSize = typeof params.Body === 'string' ? params.Body.length : params.Body.size || params.Body.byteLength || -1;
            }
            tracker = new Tracker({
              bucket: params.Bucket,
              region: params.Region,
              apiName: apiName,
              fileKey: params.Key,
              fileSize: fileSize,
              deepTracker: self.options.DeepTracker,
              customId: self.options.CustomId,
              delay: self.options.TrackerDelay,
            });
          }
        }
        params.tracker = tracker;

        // 代理回调函数
        var formatResult = function (result) {
            if (result && result.headers) {
                result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);
                result.headers['x-ci-request-id'] && (result.RequestId = result.headers['x-ci-request-id']);
                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
            }
            return result;
        };
        var _callback = function (err, data) {
            // 格式化上报参数并上报
            tracker && tracker.formatResult(err, data);
            callback && callback(formatResult(err), formatResult(data));
        };

        var checkParams = function () {
            if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
                // 判断参数是否完整
                var missingResult = hasMissingParams.call(self, apiName, params)
                if (missingResult) {
                    return 'missing param ' + missingResult;
                }
                // 判断 region 格式
                if (params.Region) {
                    if (self.options.CompatibilityMode) {
                        if (!/^([a-z\d-.]+)$/.test(params.Region)) {
                            return 'Region format error.';
                        }
                    } else {
                        if (params.Region.indexOf('cos.') > -1) {
                            return 'param Region should not be start with "cos."';
                        } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
                            return 'Region format error.';
                        }
                    }
                    // 判断 region 格式
                    if (!self.options.CompatibilityMode
                        && params.Region.indexOf('-') === -1
                        && params.Region !== 'yfb'
                        && params.Region !== 'default'
                        && params.Region !== 'accelerate' ) {
                        console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
                    }
                }
                // 兼容不带 AppId 的 Bucket
                if (params.Bucket) {
                    if (!/^([a-z\d-]+)-(\d+)$/.test(params.Bucket)) {
                        if (params.AppId) {
                            params.Bucket = params.Bucket + '-' + params.AppId;
                        } else if (self.options.AppId) {
                            params.Bucket = params.Bucket + '-' + self.options.AppId;
                        } else {
                            return 'Bucket should format as "test-1250000000".';
                        }
                    }
                    if (params.AppId) {
                        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).');
                        delete params.AppId;
                    }
                }
                // 如果 Key 是 / 开头，强制去掉第一个 /
                if (!self.options.UseRawKey && params.Key && params.Key.substr(0, 1) === '/') {
                    params.Key = params.Key.substr(1);
                }
            }
        };

        var errMsg = checkParams();
        var isSync = ['getAuth', 'getObjectUrl'].includes(apiName);
        if (typeof Promise === 'function' && !isSync && !callback) {
            return new Promise(function (resolve, reject) {
                callback = function (err, data) {
                    err ? reject(err) : resolve(data);
                };
                if (errMsg) return _callback(util.error(new Error(errMsg)));
                apiFn.call(self, params, _callback);
            });
        } else {
            if (errMsg) return _callback(util.error(new Error(errMsg)));
            var res = apiFn.call(self, params, _callback);
            if (isSync) return res;
        }
    }
};

var throttleOnProgress = function (total, onProgress) {
    var self = this;
    var size0 = 0;
    var size1 = 0;
    var time0 = Date.now();
    var time1;
    var timer;

    function update() {
        timer = 0;
        if (onProgress && (typeof onProgress === 'function')) {
            time1 = Date.now();
            var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100) || 0;
            var percent;
            if (size1 === 0 && total === 0) {
                percent = 1;
            } else {
                percent = Math.floor(size1 / total * 100) / 100 || 0;
            }
            time0 = time1;
            size0 = size1;
            try {
                onProgress({loaded: size1, total: total, speed: speed, percent: percent});
            } catch (e) {
            }
        }
    }

    return function (info, immediately) {
        if (info) {
            size1 = info.loaded;
            total = info.total;
        }
        if (immediately) {
            clearTimeout(timer);
            update();
        } else {
            if (timer) return;
            timer = setTimeout(update, self.options.ProgressInterval);
        }
    };
};

var getFileSize = function (api, params, callback) {
    var size;
    if (typeof params.Body === 'string') {
        params.Body = new Blob([params.Body], {type: 'text/plain'});
    } else if (params.Body instanceof ArrayBuffer) {
        params.Body = new Blob([params.Body]);
    }
    if ((params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]'))) {
        size = params.Body.size;
    } else {
        callback(util.error(new Error('params body format error, Only allow File|Blob|String.')));
        return;
    }
    params.ContentLength = size;
    callback(null, size);
};

// 获取调正的时间戳
var getSkewTime = function (offset) {
    return Date.now() + (offset || 0);
};


var error = function (err, opt) {
    var sourceErr = err;
    err.message = err.message || null;

    if (typeof opt === 'string') {
        err.error = opt;
        err.message = opt;
    } else if (typeof opt === 'object' && opt !== null) {
        extend(err, opt);
        if (opt.code || opt.name) err.code = opt.code || opt.name;
        if (opt.message) err.message = opt.message;
        if (opt.stack) err.stack = opt.stack;
    }

    if (typeof Object.defineProperty === 'function') {
        Object.defineProperty(err, 'name', {writable: true, enumerable: false});
        Object.defineProperty(err, 'message', {enumerable: true});
    }

    err.name = opt && opt.name || err.name || err.code || 'Error';
    if (!err.code) err.code = err.name;
    if (!err.error) err.error = clone(sourceErr); // 兼容老的错误格式

    return err;
}

var isWebWorker = function () {
    // 有限判断 worker 环境的 constructor name 其次用 worker 独有的 FileReaderSync 兜底 详细参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
    return typeof globalThis === 'object' && (globalThis.constructor.name === 'DedicatedWorkerGlobalScope' || globalThis.FileReaderSync);
}

var isNode = function () {
    // 得兜底 web worker 环境中 webpack 用了 process 插件之类的情况
    return typeof window !== 'object' && typeof process === 'object' && typeof require === 'function' && !isWebWorker();
}

var isCIHost = function(url) {
    return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(url);
}

//判断是否是ios
var isIOS = (function(){
  if (typeof navigator !== 'object') {
    return false;
  }
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isIOS;
})();

// 判断是qq内置浏览器
var isQQ = (function () {
  if (typeof navigator !== 'object') {
    return false;
  }
  return /\sQQ/i.test(navigator.userAgent)
})();

var util = {
    noop: noop,
    formatParams: formatParams,
    apiWrapper: apiWrapper,
    xml2json: xml2json,
    json2xml: json2xml,
    md5: md5,
    clearKey: clearKey,
    fileSlice: fileSlice,
    getBodyMd5: getBodyMd5,
    getFileMd5: getFileMd5,
    binaryBase64: binaryBase64,
    extend: extend,
    isArray: isArray,
    isInArray: isInArray,
    makeArray: makeArray,
    each: each,
    map: map,
    filter: filter,
    clone: clone,
    attr: attr,
    uuid: uuid,
    camSafeUrlEncode: camSafeUrlEncode,
    throttleOnProgress: throttleOnProgress,
    getFileSize: getFileSize,
    getSkewTime: getSkewTime,
    error: error,
    obj2str: obj2str,
    getAuth: getAuth,
    parseSelectPayload: parseSelectPayload,
    getSourceParams: getSourceParams,
    isBrowser: true,
    isNode: isNode,
    isCIHost: isCIHost,
    isIOS_QQ: isIOS && isQQ,
};

module.exports = util;