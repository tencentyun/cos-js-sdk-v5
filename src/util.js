'use strict';

var md5 = require('../lib/md5');
var CryptoJS = require('../lib/crypto');
var xml2json = require('../lib/xml2json');
var json2xml = require('../lib/json2xml');

function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

//测试用的key后面可以去掉
var getAuth = function (opt) {
    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var method = (opt.method || opt.Method || 'get').toLowerCase();
    var pathname = opt.pathname || opt.Key || '/';
    var queryParams = clone(opt.Query || opt.params || {});
    var headers = clone(opt.Headers || opt.headers || {});
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);

    if (!SecretId) return console.error('missing param SecretId');
    if (!SecretKey) return console.error('missing param SecretKey');

    var getObjectKeys = function (obj) {
        var list = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list.sort();
    };

    var obj2str = function (obj) {
        var i, key, val;
        var list = [];
        var keyList = getObjectKeys(obj);
        for (i = 0; i < keyList.length; i++) {
            key = keyList[i];
            val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
            key = key.toLowerCase();
            key = camSafeUrlEncode(key);
            val = camSafeUrlEncode(val) || '';
            list.push(key + '=' +  val)
        }
        return list.join('&');
    };

    // 签名有效起止时间
    var now = parseInt(new Date().getTime() / 1000) - 1;
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
    var qSignTime = now + ';' + exp;
    var qKeyTime = now + ';' + exp;
    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString();

    // 步骤二：构成 FormatString
    var formatString = [method, pathname, obj2str(queryParams), obj2str(headers), ''].join('\n');

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

// 获取文件 md5 值
var getFileMd5 = function (blob, callback) {
    readAsBinaryString(blob, function (content) {
        var hash = md5(content, true);
        callback(null, hash);
    });
};
function clone(obj) {
    return map(obj, function (v) {
        return typeof v === 'object' ? clone(v) : v;
    });
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
    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
        if (!Bucket) return 'Bucket';
        if (!Region) return 'Region';
    } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
        if (!Bucket) return 'Bucket';
        if (!Region) return 'Region';
        if (!Key) return 'Key';
    }
    return false;
};

var apiWrapper = function (apiName, apiFn) {
    return function (params, callback) {

        // 处理参数
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }

        // 复制参数对象
        params = extend({}, params);

        // 统一处理 Headers
        if (apiName !== 'getAuth' && apiName !== 'getObjectUrl') {
            var Headers = params.Headers || {};
            if (params && typeof params === 'object') {
                (function () {
                    for (var key in params) {
                        if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {
                            Headers[key] = params[key];
                        }
                    }
                })();

                // params headers
                Headers['x-cos-mfa'] = params['MFA'];
                Headers['Content-MD5'] = params['ContentMD5'];
                Headers['Content-Length'] = params['ContentLength'];
                Headers['Content-Type'] = params['ContentType'];
                Headers['Expect'] = params['Expect'];
                Headers['Expires'] = params['Expires'];
                Headers['Cache-Control'] = params['CacheControl'];
                Headers['Content-Disposition'] = params['ContentDisposition'];
                Headers['Content-Encoding'] = params['ContentEncoding'];
                Headers['Range'] = params['Range'];
                Headers['If-Modified-Since'] = params['IfModifiedSince'];
                Headers['If-Unmodified-Since'] = params['IfUnmodifiedSince'];
                Headers['If-Match'] = params['IfMatch'];
                Headers['If-None-Match'] = params['IfNoneMatch'];
                Headers['x-cos-copy-source'] = params['CopySource'];
                Headers['x-cos-copy-source-Range'] = params['CopySourceRange'];
                Headers['x-cos-metadata-directive'] = params['MetadataDirective'];
                Headers['x-cos-copy-source-If-Modified-Since'] = params['CopySourceIfModifiedSince'];
                Headers['x-cos-copy-source-If-Unmodified-Since'] = params['CopySourceIfUnmodifiedSince'];
                Headers['x-cos-copy-source-If-Match'] = params['CopySourceIfMatch'];
                Headers['x-cos-copy-source-If-None-Match'] = params['CopySourceIfNoneMatch'];
                Headers['x-cos-acl'] = params['ACL'];
                Headers['x-cos-grant-read'] = params['GrantRead'];
                Headers['x-cos-grant-write'] = params['GrantWrite'];
                Headers['x-cos-grant-full-control'] = params['GrantFullControl'];
                Headers['x-cos-grant-read-acp'] = params['GrantReadAcp'];
                Headers['x-cos-grant-write-acp'] = params['GrantWriteAcp'];
                Headers['x-cos-storage-class'] = params['StorageClass'];
                // SSE-C
                Headers['x-cos-server-side-encryption-customer-algorithm'] = params['SSECustomerAlgorithm'];
                Headers['x-cos-server-side-encryption-customer-key'] = params['SSECustomerKey'];
                Headers['x-cos-server-side-encryption-customer-key-MD5'] = params['SSECustomerKeyMD5'];
                // SSE-COS、SSE-KMS
                Headers['x-cos-server-side-encryption'] = params['ServerSideEncryption'];
                Headers['x-cos-server-side-encryption-cos-kms-key-id'] = params['SSEKMSKeyId'];
                Headers['x-cos-server-side-encryption-context'] = params['SSEContext'];

                params.Headers = clearKey(Headers);
            }
        }

        // 代理回调函数
        var formatResult = function (result) {
            if (result && result.headers) {
                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
            }
            return result;
        };
        var _callback = function (err, data) {
            callback && callback(formatResult(err), formatResult(data));
        };

        if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
            // 判断参数是否完整
            var missingResult;
            if (missingResult = hasMissingParams(apiName, params)) {
                _callback({error: 'missing param ' + missingResult});
                return;
            }
            // 判断 region 格式
            if (params.Region) {
                if (params.Region.indexOf('cos.') > -1) {
                    _callback({error: 'param Region should not be start with "cos."'});
                    return;
                } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
                    _callback({error: 'Region format error.'});
                    return;
                }
                // 判断 region 格式
                if (!this.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default') {
                    console.warn('param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
                }
            }
            // 兼容不带 AppId 的 Bucket
            if (params.Bucket) {
                if (!/^([a-z\d-]+)-(\d+)$/.test(params.Bucket)) {
                    if (params.AppId) {
                        params.Bucket = params.Bucket + '-' + params.AppId;
                    } else if (this.options.AppId) {
                        params.Bucket = params.Bucket + '-' + this.options.AppId;
                    } else {
                        _callback({error: 'Bucket should format as "test-1250000000".'});
                        return;
                    }
                }
                if (params.AppId) {
                    console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).');
                    delete params.AppId;
                }
            }
            // 兼容带有斜杠开头的 Key
            if (params.Key && params.Key.substr(0, 1) === '/') {
                params.Key = params.Key.substr(1);
            }
        }
        var res = apiFn.call(this, params, _callback);
        if (apiName === 'getAuth' || apiName === 'getObjectUrl') {
            return res;
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
            var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100);
            var percent;
            if (size1 === 0 && total === 0) {
                percent = 1;
            } else {
                percent = Math.round(size1 / total * 100) / 100 || 0;
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
    if (util.isBrowser) {
        if (typeof params.Body === 'string') {
            params.Body = new global.Blob([params.Body]);
        }
        if (params.Body instanceof global.File || params.Body instanceof global.Blob) {
            size = params.Body.size;
        } else {
            callback({error: 'params body format error, Only allow File|Blob|String.'});
            return;
        }
    } else {
        if (api === 'sliceUploadFile') {
            if (params.FilePath) {
                fs.stat(params.FilePath, function (err, fileStats) {
                    if (err) {
                        if (params.ContentLength !== undefined) {
                            size = params.ContentLength;
                        } else {
                            callback(err);
                            return;
                        }
                    } else {
                        params.FileStat = fileStats;
                        params.FileStat.FilePath = params.FilePath;
                        size = fileStats.size;
                    }
                    params.ContentLength = size = size || 0;
                    callback(null, size);
                });
                return;
            } else {
                callback({error: 'missing param FilePath'});
                return;
            }
        } else {
            if (params.Body !== undefined) {
                if (typeof params.Body === 'string') {
                    params.Body = global.Buffer.from(params.Body);
                }
                if (params.Body instanceof global.Buffer) {
                    size = params.Body.length;
                } else if (typeof params.Body.pipe === 'function') {
                    if (params.ContentLength === undefined) {
                        size = undefined;
                    } else {
                        size = params.ContentLength;
                    }
                } else {
                    callback({error: 'params Body format error, Only allow Buffer|Stream|String.'});
                    return;
                }
            } else {
                callback({error: 'missing param Body'});
                return;
            }
        }
    }
    params.ContentLength = size;
    callback(null, size);
};

var util = {
    noop: noop,
    apiWrapper: apiWrapper,
    getAuth: getAuth,
    xml2json: xml2json,
    json2xml: json2xml,
    md5: md5,
    clearKey: clearKey,
    getFileMd5: getFileMd5,
    binaryBase64: binaryBase64,
    extend: extend,
    isArray: isArray,
    isInArray: isInArray,
    each: each,
    map: map,
    filter: filter,
    clone: clone,
    uuid: uuid,
    throttleOnProgress: throttleOnProgress,
    getFileSize: getFileSize,
    isBrowser: !!global.document,
};

util.localStorage = global.localStorage;
util.fileSlice = function (file, start, end) {
    if (file.slice) {
        return file.slice(start, end);
    } else if (file.mozSlice) {
        return file.mozSlice(start, end);
    } else if (file.webkitSlice) {
        return file.webkitSlice(start, end);
    }
};
util.getFileUUID = function (file, ChunkSize) {
    // 如果信息不完整，不获取
    if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
        return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize].join('::'));
    } else {
        return null;
    }
};

module.exports = util;