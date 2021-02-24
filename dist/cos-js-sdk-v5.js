(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["COS"] = factory();
	else
		root["COS"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var md5 = __webpack_require__(6);
var CryptoJS = __webpack_require__(10);
var xml2json = __webpack_require__(11);
var json2xml = __webpack_require__(14);

function camSafeUrlEncode(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

//测试用的key后面可以去掉
var getAuth = function (opt) {
    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var KeyTime = opt.KeyTime;
    var method = (opt.method || opt.Method || 'get').toLowerCase();
    var queryParams = clone(opt.Query || opt.params || {});
    var headers = clone(opt.Headers || opt.headers || {});

    var Key = opt.Key || '';
    var pathname;
    if (opt.UseRawKey) {
        pathname = opt.Pathname || opt.pathname || '/' + Key;
    } else {
        pathname = opt.Pathname || opt.pathname || Key;
        pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
    }

    if (!SecretId) throw new Error('missing param SecretId');
    if (!SecretKey) throw new Error('missing param SecretKey');

    var getObjectKeys = function (obj, forKey) {
        var list = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.push(forKey ? camSafeUrlEncode(key).toLowerCase() : key);
            }
        }
        return list.sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a === b ? 0 : a > b ? 1 : -1;
        });
    };

    var obj2str = function (obj) {
        var i, key, val;
        var list = [];
        var keyList = getObjectKeys(obj);
        for (i = 0; i < keyList.length; i++) {
            key = keyList[i];
            val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];
            key = camSafeUrlEncode(key).toLowerCase();
            val = camSafeUrlEncode(val) || '';
            list.push(key + '=' + val);
        }
        return list.join('&');
    };

    // 签名有效起止时间
    var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;
    var exp = now;

    var Expires = opt.Expires || opt.expires;
    if (Expires === undefined) {
        exp += 900; // 签名过期时间为当前 + 900s
    } else {
        exp += Expires * 1 || 0;
    }

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = KeyTime || now + ';' + exp;
    var qKeyTime = KeyTime || now + ';' + exp;
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
    var authorization = ['q-sign-algorithm=' + qSignAlgorithm, 'q-ak=' + qAk, 'q-sign-time=' + qSignTime, 'q-key-time=' + qKeyTime, 'q-header-list=' + qHeaderList, 'q-url-param-list=' + qUrlParamList, 'q-signature=' + qSignature].join('&');

    return authorization;
};

var readIntBE = function (chunk, size, offset) {
    var bytes = size / 8;
    var buf = chunk.slice(offset, offset + bytes);
    new Uint8Array(buf).reverse();
    return new { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array }[size](buf)[0];
};
var buf2str = function (chunk, start, end, isUtf8) {
    var buf = chunk.slice(start, end);
    var str = '';
    new Uint8Array(buf).forEach(function (charCode) {
        str += String.fromCharCode(charCode);
    });
    if (isUtf8) str = decodeURIComponent(escape(str));
    return str;
};
var parseSelectPayload = function (chunk) {
    var header = {};
    var body = buf2str(chunk);
    var result = { records: [] };
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
        body: body
    };
};

var noop = function () {};

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
    } else if (FileReader.prototype.readAsArrayBuffer) {
        // 在 ie11 添加 readAsBinaryString 兼容
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

var fileSliceNeedCopy = function () {
    var compareVersion = function (a, b) {
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
        var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
        var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
        var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0 && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0 && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
        return need;
    };
    return check(navigator && navigator.userAgent);
}();

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
                if (onProgress) onProgress({ loaded: loaded, total: size, percent: Math.round(loaded / size * 10000) / 10000 });
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
    var i,
        len,
        char,
        res = '';
    for (i = 0, len = str.length / 2; i < len; i++) {
        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
        res += String.fromCharCode(char);
    }
    return btoa(res);
};
var uuid = function () {
    var S4 = function () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
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
                // SSE-C
                'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
                'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
                'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
                // SSE-COS、SSE-KMS
                'x-cos-server-side-encryption': 'ServerSideEncryption',
                'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
                'x-cos-server-side-encryption-context': 'SSEContext'
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

        // 代理回调函数
        var formatResult = function (result) {
            if (result && result.headers) {
                result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);
                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
            }
            return result;
        };
        var _callback = function (err, data) {
            callback && callback(formatResult(err), formatResult(data));
        };

        var checkParams = function () {
            if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
                // 判断参数是否完整
                var missingResult = hasMissingParams(apiName, params);
                if (missingResult) {
                    return 'missing param ' + missingResult;
                }
                // 判断 region 格式
                if (params.Region) {
                    if (params.Region.indexOf('cos.') > -1) {
                        return 'param Region should not be start with "cos."';
                    } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
                        return 'Region format error.';
                    }
                    // 判断 region 格式
                    if (!self.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default') {
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
        var isSync = apiName === 'getAuth' || apiName === 'getObjectUrl';
        if (Promise && !isSync && !callback) {
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
    };
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
        if (onProgress && typeof onProgress === 'function') {
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
                onProgress({ loaded: size1, total: total, speed: speed, percent: percent });
            } catch (e) {}
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
        params.Body = new Blob([params.Body], { type: 'text/plain' });
    } else if (params.Body instanceof ArrayBuffer) {
        params.Body = new Blob([params.Body]);
    }
    if (params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]')) {
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
        Object.defineProperty(err, 'name', { writable: true, enumerable: false });
        Object.defineProperty(err, 'message', { enumerable: true });
    }

    err.name = opt && opt.name || err.name || err.code || 'Error';
    if (!err.code) err.code = err.name;
    if (!err.error) err.error = clone(sourceErr); // 兼容老的错误格式

    return err;
};

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
    getAuth: getAuth,
    parseSelectPayload: parseSelectPayload,
    isBrowser: true
};

module.exports = util;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9?this.documentElement:this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node,isHTML, visibleNamespaces) {
	var prefix = node.prefix||'';
	var uri = node.namespaceURI;
	if (!prefix && !uri){
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
		|| uri == 'http://www.w3.org/2000/xmlns/'){
		return false;
	}
	
	var i = visibleNamespaces.length 
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix){
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch(node.nodeType){
	case ELEMENT_NODE:
		if (!visibleNamespaces) visibleNamespaces = [];
		var startVisibleNamespaces = visibleNamespaces.length;
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML =  (htmlns === node.namespaceURI) ||isHTML 
		buf.push('<',nodeName);
		
		
		
		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}
		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}
		// add namespace for current node		
		if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			var ns = prefix ? ' xmlns:' + prefix : " xmlns";
			buf.push(ns, '="' , uri , '"');
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var initEvent = function (cos) {
    var listeners = {};
    var getList = function (action) {
        !listeners[action] && (listeners[action] = []);
        return listeners[action];
    };
    cos.on = function (action, callback) {
        if (action === 'task-list-update') {
            console.warn('warning: Event "' + action + '" has been deprecated. Please use "list-update" instead.');
        }
        getList(action).push(callback);
    };
    cos.off = function (action, callback) {
        var list = getList(action);
        for (var i = list.length - 1; i >= 0; i--) {
            callback === list[i] && list.splice(i, 1);
        }
    };
    cos.emit = function (action, data) {
        var list = getList(action).map(function (cb) {
            return cb;
        });
        for (var i = 0; i < list.length; i++) {
            list[i](data);
        }
    };
};

var EventProxy = function () {
    initEvent(this);
};

module.exports.init = initEvent;
module.exports.EventProxy = EventProxy;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);

// 按照文件特征值，缓存 UploadId
var cacheKey = 'cos_sdk_upload_cache';
var expires = 30 * 24 * 3600;
var cache;
var timer;

var getCache = function () {
    try {
        var val = JSON.parse(localStorage.getItem(cacheKey));
    } catch (e) {}
    if (!val) val = [];
    cache = val;
};
var setCache = function () {
    try {
        localStorage.setItem(cacheKey, JSON.stringify(cache));
    } catch (e) {}
};

var init = function () {
    if (cache) return;
    getCache.call(this);
    // 清理太老旧的数据
    var changed = false;
    var now = Math.round(Date.now() / 1000);
    for (var i = cache.length - 1; i >= 0; i--) {
        var mtime = cache[i][2];
        if (!mtime || mtime + expires < now) {
            cache.splice(i, 1);
            changed = true;
        }
    }
    changed && setCache();
};

// 把缓存存到本地
var save = function () {
    if (timer) return;
    timer = setTimeout(function () {
        setCache();
        timer = null;
    }, 400);
};

var mod = {
    using: {},
    // 标记 UploadId 正在使用
    setUsing: function (uuid) {
        mod.using[uuid] = true;
    },
    // 标记 UploadId 已经没在使用
    removeUsing: function (uuid) {
        delete mod.using[uuid];
    },
    // 用上传参数生成哈希值
    getFileId: function (file, ChunkSize, Bucket, Key) {
        if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
            return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));
        } else {
            return null;
        }
    },
    // 获取文件对应的 UploadId 列表
    getUploadIdList: function (uuid) {
        if (!uuid) return null;
        init.call(this);
        var list = [];
        for (var i = 0; i < cache.length; i++) {
            if (cache[i][0] === uuid) list.push(cache[i][1]);
        }
        return list.length ? list : null;
    },
    // 缓存 UploadId
    saveUploadId: function (uuid, UploadId, limit) {
        init.call(this);
        if (!uuid) return;
        // 清理没用的 UploadId，js 文件没有 FilePath ，只清理相同记录
        for (var i = cache.length - 1; i >= 0; i--) {
            var item = cache[i];
            if (item[0] === uuid && item[1] === UploadId) {
                cache.splice(i, 1);
            }
        }
        cache.unshift([uuid, UploadId, Math.round(Date.now() / 1000)]);
        if (cache.length > limit) cache.splice(limit);
        save();
    },
    // UploadId 已用完，移除掉
    removeUploadId: function (UploadId) {
        init.call(this);
        delete mod.using[UploadId];
        for (var i = cache.length - 1; i >= 0; i--) {
            if (cache[i][1] === UploadId) cache.splice(i, 1);
        }
        save();
    }
};

module.exports = mod;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var COS = __webpack_require__(5);
module.exports = COS;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var event = __webpack_require__(2);
var task = __webpack_require__(15);
var base = __webpack_require__(16);
var advance = __webpack_require__(18);

var defaultOptions = {
    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
    SecretId: '',
    SecretKey: '',
    SecurityToken: '', // 使用临时密钥需要注意自行刷新 Token
    ChunkRetryTimes: 2,
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkSize: 1024 * 1024,
    SliceSize: 1024 * 1024,
    CopyChunkParallelLimit: 20,
    CopyChunkSize: 1024 * 1024 * 10,
    CopySliceSize: 1024 * 1024 * 10,
    MaxPartNumber: 10000,
    ProgressInterval: 1000,
    Domain: '',
    ServiceDomain: '',
    Protocol: '',
    CompatibilityMode: false,
    ForcePathStyle: false,
    UseRawKey: false,
    Timeout: 0, // 单位毫秒，0 代表不设置超时时间
    CorrectClockSkew: true,
    SystemClockOffset: 0, // 单位毫秒，ms
    UploadCheckContentMd5: false,
    UploadQueueSize: 10000,
    UploadAddMetaMd5: false,
    UploadIdCacheLimit: 50
};

// 对外暴露的类
var COS = function (options) {
    this.options = util.extend(util.clone(defaultOptions), options || {});
    this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);
    this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);
    this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);
    this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);
    this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);
    this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);
    this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);
    this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));
    this.options.Timeout = Math.max(0, this.options.Timeout);
    if (this.options.AppId) {
        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
    }
    event.init(this);
    task.init(this);
};

base.init(COS, task);
advance.init(COS, task);

COS.getAuthorization = util.getAuth;
COS.version = '1.2.3';

module.exports = COS;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/* https://github.com/emn178/js-md5 */
(function () {
    'use strict';

    var ERROR = 'input is invalid type';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_MD5_NO_WINDOW) {
        WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
        root = global;
    } else if (WEB_WORKER) {
        root = self;
    }
    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
    var AMD = "function" === 'function' && __webpack_require__(9);
    var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var EXTRA = [128, 32768, 8388608, -2147483648];
    var SHIFT = [0, 8, 16, 24];
    var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
    var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

    var blocks = [],
        buffer8;
    if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer);
        blocks = new Uint32Array(buffer);
    }

    if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
    }

    if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function (obj) {
            return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
    }

    /**
     * @method hex
     * @memberof md5
     * @description Output hash as hex string
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} Hex string
     * @example
     * md5.hex('The quick brown fox jumps over the lazy dog');
     * // equal to
     * md5('The quick brown fox jumps over the lazy dog');
     */
    /**
     * @method digest
     * @memberof md5
     * @description Output hash as bytes array
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Array} Bytes array
     * @example
     * md5.digest('The quick brown fox jumps over the lazy dog');
     */
    /**
     * @method array
     * @memberof md5
     * @description Output hash as bytes array
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Array} Bytes array
     * @example
     * md5.array('The quick brown fox jumps over the lazy dog');
     */
    /**
     * @method arrayBuffer
     * @memberof md5
     * @description Output hash as ArrayBuffer
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {ArrayBuffer} ArrayBuffer
     * @example
     * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
     */
    /**
     * @method buffer
     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
     * @memberof md5
     * @description Output hash as ArrayBuffer
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {ArrayBuffer} ArrayBuffer
     * @example
     * md5.buffer('The quick brown fox jumps over the lazy dog');
     */
    /**
     * @method base64
     * @memberof md5
     * @description Output hash as base64 string
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} base64 string
     * @example
     * md5.base64('The quick brown fox jumps over the lazy dog');
     */
    var createOutputMethod = function (outputType) {
        return function (message, isBinStr) {
            return new Md5(true).update(message, isBinStr)[outputType]();
        };
    };

    /**
     * @method create
     * @memberof md5
     * @description Create Md5 object
     * @returns {Md5} Md5 object.
     * @example
     * var hash = md5.create();
     */
    /**
     * @method update
     * @memberof md5
     * @description Create and update Md5 object
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Md5} Md5 object.
     * @example
     * var hash = md5.update('The quick brown fox jumps over the lazy dog');
     * // equal to
     * var hash = md5.create();
     * hash.update('The quick brown fox jumps over the lazy dog');
     */
    var createMethod = function () {
        var method = createOutputMethod('hex');
        if (NODE_JS) {
            method = nodeWrap(method);
        }
        method.getCtx = method.create = function () {
            return new Md5();
        };
        method.update = function (message) {
            return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
            var type = OUTPUT_TYPES[i];
            method[type] = createOutputMethod(type);
        }
        return method;
    };

    var nodeWrap = function (method) {
        var crypto = eval("require('crypto')");
        var Buffer = eval("require('buffer').Buffer");
        var nodeMethod = function (message) {
            if (typeof message === 'string') {
                return crypto.createHash('md5').update(message, 'utf8').digest('hex');
            } else {
                if (message === null || message === undefined) {
                    throw ERROR;
                } else if (message.constructor === ArrayBuffer) {
                    message = new Uint8Array(message);
                }
            }
            if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
                return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
            } else {
                return method(message);
            }
        };
        return nodeMethod;
    };

    /**
     * Md5 class
     * @class Md5
     * @description This is internal class.
     * @see {@link md5.create}
     */
    function Md5(sharedMemory) {
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
            this.buffer8 = buffer8;
        } else {
            if (ARRAY_BUFFER) {
                var buffer = new ArrayBuffer(68);
                this.buffer8 = new Uint8Array(buffer);
                this.blocks = new Uint32Array(buffer);
            } else {
                this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
        }
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
    }

    /**
     * @method update
     * @memberof Md5
     * @instance
     * @description Update hash
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Md5} Md5 object.
     * @see {@link md5.update}
     */
    Md5.prototype.update = function (message, isBinStr) {
        if (this.finalized) {
            return;
        }

        var code,
            index = 0,
            i,
            length = message.length,
            blocks = this.blocks;
        var buffer8 = this.buffer8;

        while (index < length) {
            if (this.hashed) {
                this.hashed = false;
                blocks[0] = blocks[16];
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }

            if (ARRAY_BUFFER) {
                for (i = this.start; index < length && i < 64; ++index) {
                    code = message.charCodeAt(index);
                    if (isBinStr || code < 0x80) {
                        buffer8[i++] = code;
                    } else if (code < 0x800) {
                        buffer8[i++] = 0xc0 | code >> 6;
                        buffer8[i++] = 0x80 | code & 0x3f;
                    } else if (code < 0xd800 || code >= 0xe000) {
                        buffer8[i++] = 0xe0 | code >> 12;
                        buffer8[i++] = 0x80 | code >> 6 & 0x3f;
                        buffer8[i++] = 0x80 | code & 0x3f;
                    } else {
                        code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                        buffer8[i++] = 0xf0 | code >> 18;
                        buffer8[i++] = 0x80 | code >> 12 & 0x3f;
                        buffer8[i++] = 0x80 | code >> 6 & 0x3f;
                        buffer8[i++] = 0x80 | code & 0x3f;
                    }
                }
            } else {
                for (i = this.start; index < length && i < 64; ++index) {
                    code = message.charCodeAt(index);
                    if (isBinStr || code < 0x80) {
                        blocks[i >> 2] |= code << SHIFT[i++ & 3];
                    } else if (code < 0x800) {
                        blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else if (code < 0xd800 || code >= 0xe000) {
                        blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else {
                        code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                        blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    }
                }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
                this.start = i - 64;
                this.hash();
                this.hashed = true;
            } else {
                this.start = i;
            }
        }
        if (this.bytes > 4294967295) {
            this.hBytes += this.bytes / 4294967296 << 0;
            this.bytes = this.bytes % 4294967296;
        }
        return this;
    };

    Md5.prototype.finalize = function () {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        var blocks = this.blocks,
            i = this.lastByteIndex;
        blocks[i >> 2] |= EXTRA[i & 3];
        if (i >= 56) {
            if (!this.hashed) {
                this.hash();
            }
            blocks[0] = blocks[16];
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        blocks[14] = this.bytes << 3;
        blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
        this.hash();
    };

    Md5.prototype.hash = function () {
        var a,
            b,
            c,
            d,
            bc,
            da,
            blocks = this.blocks;

        if (this.first) {
            a = blocks[0] - 680876937;
            a = (a << 7 | a >>> 25) - 271733879 << 0;
            d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
            d = (d << 12 | d >>> 20) + a << 0;
            c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
            c = (c << 17 | c >>> 15) + d << 0;
            b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
            b = (b << 22 | b >>> 10) + c << 0;
        } else {
            a = this.h0;
            b = this.h1;
            c = this.h2;
            d = this.h3;
            a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
            a = (a << 7 | a >>> 25) + b << 0;
            d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
            d = (d << 12 | d >>> 20) + a << 0;
            c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
            c = (c << 17 | c >>> 15) + d << 0;
            b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
            b = (b << 22 | b >>> 10) + c << 0;
        }

        a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
        b = (b << 20 | b >>> 12) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks[5] - 378558;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks[8] - 2022574463;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks[11] + 1839030562;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks[14] - 35309556;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks[1] - 1530992060;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks[4] + 1272893353;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks[7] - 155497632;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks[10] - 1094730640;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks[13] + 681279174;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks[0] - 358537222;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks[3] - 722521979;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks[6] + 76029189;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks[9] - 640364487;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks[12] - 421815835;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks[15] + 530742520;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks[2] - 995338651;
        b = (b << 23 | b >>> 9) + c << 0;
        a += (c ^ (b | ~d)) + blocks[0] - 198630844;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks[5] - 57434055;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks[10] - 1051523;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks[15] - 30611744;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks[4] - 145523070;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks[2] + 718787259;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks[9] - 343485551;
        b = (b << 21 | b >>> 11) + c << 0;

        if (this.first) {
            this.h0 = a + 1732584193 << 0;
            this.h1 = b - 271733879 << 0;
            this.h2 = c - 1732584194 << 0;
            this.h3 = d + 271733878 << 0;
            this.first = false;
        } else {
            this.h0 = this.h0 + a << 0;
            this.h1 = this.h1 + b << 0;
            this.h2 = this.h2 + c << 0;
            this.h3 = this.h3 + d << 0;
        }
    };

    /**
     * @method hex
     * @memberof Md5
     * @instance
     * @description Output hash as hex string
     * @returns {String} Hex string
     * @see {@link md5.hex}
     * @example
     * hash.hex();
     */
    Md5.prototype.hex = function () {
        this.finalize();

        var h0 = this.h0,
            h1 = this.h1,
            h2 = this.h2,
            h3 = this.h3;

        return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
    };

    /**
     * @method toString
     * @memberof Md5
     * @instance
     * @description Output hash as hex string
     * @returns {String} Hex string
     * @see {@link md5.hex}
     * @example
     * hash.toString();
     */
    Md5.prototype.toString = Md5.prototype.hex;

    /**
     * @method digest
     * @memberof Md5
     * @instance
     * @description Output hash as bytes array
     * @returns {Array} Bytes array
     * @see {@link md5.digest}
     * @example
     * hash.digest();
     */
    Md5.prototype.digest = function (format) {
        if (format === 'hex') return this.hex();
        this.finalize();

        var h0 = this.h0,
            h1 = this.h1,
            h2 = this.h2,
            h3 = this.h3;
        var res = [h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF, h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF, h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF, h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];
        return res;
    };

    /**
     * @method array
     * @memberof Md5
     * @instance
     * @description Output hash as bytes array
     * @returns {Array} Bytes array
     * @see {@link md5.array}
     * @example
     * hash.array();
     */
    Md5.prototype.array = Md5.prototype.digest;

    /**
     * @method arrayBuffer
     * @memberof Md5
     * @instance
     * @description Output hash as ArrayBuffer
     * @returns {ArrayBuffer} ArrayBuffer
     * @see {@link md5.arrayBuffer}
     * @example
     * hash.arrayBuffer();
     */
    Md5.prototype.arrayBuffer = function () {
        this.finalize();

        var buffer = new ArrayBuffer(16);
        var blocks = new Uint32Array(buffer);
        blocks[0] = this.h0;
        blocks[1] = this.h1;
        blocks[2] = this.h2;
        blocks[3] = this.h3;
        return buffer;
    };

    /**
     * @method buffer
     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
     * @memberof Md5
     * @instance
     * @description Output hash as ArrayBuffer
     * @returns {ArrayBuffer} ArrayBuffer
     * @see {@link md5.buffer}
     * @example
     * hash.buffer();
     */
    Md5.prototype.buffer = Md5.prototype.arrayBuffer;

    /**
     * @method base64
     * @memberof Md5
     * @instance
     * @description Output hash as base64 string
     * @returns {String} base64 string
     * @see {@link md5.base64}
     * @example
     * hash.base64();
     */
    Md5.prototype.base64 = function () {
        var v1,
            v2,
            v3,
            base64Str = '',
            bytes = this.array();
        for (var i = 0; i < 15;) {
            v1 = bytes[i++];
            v2 = bytes[i++];
            v3 = bytes[i++];
            base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
        }
        v1 = bytes[i];
        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + '==';
        return base64Str;
    };

    var exports = createMethod();

    if (COMMON_JS) {
        module.exports = exports;
    } else {
        /**
         * @method md5
         * @description Md5 hash function, export to global in browsers.
         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
         * @returns {String} md5 hashes
         * @example
         * md5(''); // d41d8cd98f00b204e9800998ecf8427e
         * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
         * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
         *
         * // It also supports UTF-8 encoding
         * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
         *
         * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
         * md5([]); // d41d8cd98f00b204e9800998ecf8427e
         * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
         */
        root.md5 = exports;
        if (AMD) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return exports;
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
    }
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS = CryptoJS || function (g, l) {
    var e = {},
        d = e.lib = {},
        m = function () {},
        k = d.Base = { extend: function (a) {
            m.prototype = this;var c = new m();a && c.mixIn(a);c.hasOwnProperty("init") || (c.init = function () {
                c.$super.init.apply(this, arguments);
            });c.init.prototype = c;c.$super = this;return c;
        }, create: function () {
            var a = this.extend();a.init.apply(a, arguments);return a;
        }, init: function () {}, mixIn: function (a) {
            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);a.hasOwnProperty("toString") && (this.toString = a.toString);
        }, clone: function () {
            return this.init.prototype.extend(this);
        } },
        p = d.WordArray = k.extend({ init: function (a, c) {
            a = this.words = a || [];this.sigBytes = c != l ? c : 4 * a.length;
        }, toString: function (a) {
            return (a || n).stringify(this);
        }, concat: function (a) {
            var c = this.words,
                q = a.words,
                f = this.sigBytes;a = a.sigBytes;this.clamp();if (f % 4) for (var b = 0; b < a; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);else if (65535 < q.length) for (b = 0; b < a; b += 4) c[f + b >>> 2] = q[b >>> 2];else c.push.apply(c, q);this.sigBytes += a;return this;
        }, clamp: function () {
            var a = this.words,
                c = this.sigBytes;a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);a.length = g.ceil(c / 4);
        }, clone: function () {
            var a = k.clone.call(this);a.words = this.words.slice(0);return a;
        }, random: function (a) {
            for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0);return new p.init(c, a);
        } }),
        b = e.enc = {},
        n = b.Hex = { stringify: function (a) {
            var c = a.words;a = a.sigBytes;for (var b = [], f = 0; f < a; f++) {
                var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;b.push((d >>> 4).toString(16));b.push((d & 15).toString(16));
            }return b.join("");
        }, parse: function (a) {
            for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);return new p.init(b, c / 2);
        } },
        j = b.Latin1 = { stringify: function (a) {
            var c = a.words;a = a.sigBytes;for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));return b.join("");
        }, parse: function (a) {
            for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4);return new p.init(b, c);
        } },
        h = b.Utf8 = { stringify: function (a) {
            try {
                return decodeURIComponent(escape(j.stringify(a)));
            } catch (c) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (a) {
            return j.parse(unescape(encodeURIComponent(a)));
        } },
        r = d.BufferedBlockAlgorithm = k.extend({ reset: function () {
            this._data = new p.init();this._nDataBytes = 0;
        }, _append: function (a) {
            "string" == typeof a && (a = h.parse(a));this._data.concat(a);this._nDataBytes += a.sigBytes;
        }, _process: function (a) {
            var c = this._data,
                b = c.words,
                f = c.sigBytes,
                d = this.blockSize,
                e = f / (4 * d),
                e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0);a = e * d;f = g.min(4 * a, f);if (a) {
                for (var k = 0; k < a; k += d) this._doProcessBlock(b, k);k = b.splice(0, a);c.sigBytes -= f;
            }return new p.init(k, f);
        }, clone: function () {
            var a = k.clone.call(this);
            a._data = this._data.clone();return a;
        }, _minBufferSize: 0 });d.Hasher = r.extend({ cfg: k.extend(), init: function (a) {
            this.cfg = this.cfg.extend(a);this.reset();
        }, reset: function () {
            r.reset.call(this);this._doReset();
        }, update: function (a) {
            this._append(a);this._process();return this;
        }, finalize: function (a) {
            a && this._append(a);return this._doFinalize();
        }, blockSize: 16, _createHelper: function (a) {
            return function (b, d) {
                return new a.init(d).finalize(b);
            };
        }, _createHmacHelper: function (a) {
            return function (b, d) {
                return new s.HMAC.init(a, d).finalize(b);
            };
        } });var s = e.algo = {};return e;
}(Math);
(function () {
    var g = CryptoJS,
        l = g.lib,
        e = l.WordArray,
        d = l.Hasher,
        m = [],
        l = g.algo.SHA1 = d.extend({ _doReset: function () {
            this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function (d, e) {
            for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
                if (16 > a) m[a] = d[e + a] | 0;else {
                    var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];m[a] = c << 1 | c >>> 31;
                }c = (n << 5 | n >>> 27) + l + m[a];c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514);l = g;g = h;h = j << 30 | j >>> 2;j = n;n = c;
            }b[0] = b[0] + n | 0;b[1] = b[1] + j | 0;b[2] = b[2] + h | 0;b[3] = b[3] + g | 0;b[4] = b[4] + l | 0;
        }, _doFinalize: function () {
            var d = this._data,
                e = d.words,
                b = 8 * this._nDataBytes,
                g = 8 * d.sigBytes;e[g >>> 5] |= 128 << 24 - g % 32;e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);e[(g + 64 >>> 9 << 4) + 15] = b;d.sigBytes = 4 * e.length;this._process();return this._hash;
        }, clone: function () {
            var e = d.clone.call(this);e._hash = this._hash.clone();return e;
        } });g.SHA1 = d._createHelper(l);g.HmacSHA1 = d._createHmacHelper(l);
})();
(function () {
    var g = CryptoJS,
        l = g.enc.Utf8;g.algo.HMAC = g.lib.Base.extend({ init: function (e, d) {
            e = this._hasher = new e.init();"string" == typeof d && (d = l.parse(d));var g = e.blockSize,
                k = 4 * g;d.sigBytes > k && (d = e.finalize(d));d.clamp();for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) n[h] ^= 1549556828, j[h] ^= 909522486;p.sigBytes = b.sigBytes = k;this.reset();
        }, reset: function () {
            var e = this._hasher;e.reset();e.update(this._iKey);
        }, update: function (e) {
            this._hasher.update(e);return this;
        }, finalize: function (e) {
            var d = this._hasher;e = d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e));
        } });
})();

(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;

            // Clamp excess bits
            wordArray.clamp();

            // Convert
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

                var triplet = byte1 << 16 | byte2 << 8 | byte3;

                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                    base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
                }
            }

            // Add padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }

            return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
            // Shortcuts
            var base64StrLength = base64Str.length;
            var map = this._map;

            // Ignore padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex != -1) {
                    base64StrLength = paddingIndex;
                }
            }

            // Convert
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
                if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
                    words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                    nBytes++;
                }
            }

            return WordArray.create(words, nBytes);
        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
})();

if (true) {
    module.exports = CryptoJS;
} else {
    window.CryptoJS = CryptoJS;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2015 William Summers, MetaTribal LLC
 * adapted from https://developer.mozilla.org/en-US/docs/JXON
 *
 * Licensed under the MIT License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author William Summers
 * https://github.com/metatribal/xmlToJSON
 */
var DOMParser = __webpack_require__(12).DOMParser;

var xmlToJSON = function () {

    this.version = "1.3.5";

    var options = { // set up the default options
        mergeCDATA: true, // extract cdata and merge with text
        normalize: true, // collapse multiple spaces to single space
        stripElemPrefix: true // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
    };

    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    var trimMatch = new RegExp(/^\s+|\s+$/g);

    this.grokType = function (sValue) {
        if (/^\s*$/.test(sValue)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        return sValue;
    };

    this.parseString = function (xmlString, opt) {
        if (xmlString) {
            var xml = this.stringToXML(xmlString);
            if (xml.getElementsByTagName('parsererror').length) {
                return null;
            } else {
                return this.parseXML(xml, opt);
            }
        } else {
            return null;
        }
    };

    this.parseXML = function (oXMLParent, opt) {

        // initialize options
        for (var key in opt) {
            options[key] = opt[key];
        }

        var vResult = {},
            nLength = 0,
            sCollectedTxt = "";

        // iterate over the children
        var childNum = oXMLParent.childNodes.length;
        if (childNum) {
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);

                if (oNode.nodeType === 4) {
                    if (options.mergeCDATA) {
                        sCollectedTxt += oNode.nodeValue;
                    }
                } /* nodeType is "CDATASection" (4) */
                else if (oNode.nodeType === 3) {
                        sCollectedTxt += oNode.nodeValue;
                    } /* nodeType is "Text" (3) */
                    else if (oNode.nodeType === 1) {
                            /* nodeType is "Element" (1) */

                            if (nLength === 0) {
                                vResult = {};
                            }

                            // using nodeName to support browser (IE) implementation with no 'localName' property
                            if (options.stripElemPrefix) {
                                sProp = oNode.nodeName.replace(prefixMatch, '');
                            } else {
                                sProp = oNode.nodeName;
                            }

                            vContent = xmlToJSON.parseXML(oNode);

                            if (vResult.hasOwnProperty(sProp)) {
                                if (vResult[sProp].constructor !== Array) {
                                    vResult[sProp] = [vResult[sProp]];
                                }
                                vResult[sProp].push(vContent);
                            } else {
                                vResult[sProp] = vContent;
                                nLength++;
                            }
                        }
            }
        }

        if (!Object.keys(vResult).length) {
            // vResult = sCollectedTxt.replace(trimMatch, '') || ''; // by carsonxu 修复 getBucket返回的 Key 是 " /" 这种场景
            vResult = sCollectedTxt || '';
        }

        return vResult;
    };

    // Convert xmlDocument to a string
    // Returns null on failure
    this.xmlToString = function (xmlDoc) {
        try {
            var xmlString = xmlDoc.xml ? xmlDoc.xml : new XMLSerializer().serializeToString(xmlDoc);
            return xmlString;
        } catch (err) {
            return null;
        }
    };

    // Convert a string to XML Node Structure
    // Returns null on failure
    this.stringToXML = function (xmlString) {
        try {
            var xmlDoc = null;

            if (window.DOMParser) {

                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlString, "text/xml");

                return xmlDoc;
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString);

                return xmlDoc;
            }
        } catch (e) {
            return null;
        }
    };

    return this;
}.call({});

var xml2json = function (xmlString) {
    return xmlToJSON.parseString(xmlString);
};

module.exports = xml2json;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function DOMParser(options){
	this.options = options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if(source){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
	var XMLReader = __webpack_require__(13).XMLReader;
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(1).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(1).XMLSerializer ;
	exports.DOMParser = DOMParser;
//}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart+2,end);
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		//console.error('#@@@@@@'+tagName)
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				//console.error(parseStack.length,parseStack)
				//console.error(config);
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					//}catch(e){console.error('@@@@@'+e)}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}
				
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}
		}catch(e){
			errorHandler.error('element parse error: '+e)
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName');
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el.add(attrName,value,start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				el.add(attrName,value,start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="');
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')")
			}
			break;
		case ''://end document
			//throw new Error('unexpected end of input')
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start)
				}else{
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					el.add(value,value,start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value,start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					el.add(attrName,attrName,start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
					sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	add:function(qName,value,offset){
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;



/***/ }),
/* 14 */
/***/ (function(module, exports) {

//copyright Ryan Day 2010 <http://ryanday.org>, Joscha Feth 2013 <http://www.feth.com> [MIT Licensed]

var element_start_char = "a-zA-Z_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
var element_non_start_char = "\-.0-9\u00B7\u0300-\u036F\u203F\u2040";
var element_replace = new RegExp("^([^" + element_start_char + "])|^((x|X)(m|M)(l|L))|([^" + element_start_char + element_non_start_char + "])", "g");
var not_safe_in_xml = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

var objKeys = function (obj) {
    var l = [];
    if (obj instanceof Object) {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                l.push(k);
            }
        }
    }
    return l;
};
var process_to_xml = function (node_data, options) {

    var makeNode = function (name, content, attributes, level, hasSubNodes) {
        var indent_value = options.indent !== undefined ? options.indent : "\t";
        var indent = options.prettyPrint ? '\n' + new Array(level).join(indent_value) : '';
        if (options.removeIllegalNameCharacters) {
            name = name.replace(element_replace, '_');
        }

        var node = [indent, '<', name, attributes || ''];
        if (content && content.length > 0) {
            node.push('>');
            node.push(content);
            hasSubNodes && node.push(indent);
            node.push('</');
            node.push(name);
            node.push('>');
        } else {
            node.push('/>');
        }
        return node.join('');
    };

    return function fn(node_data, node_descriptor, level) {
        var type = typeof node_data;
        if (Array.isArray ? Array.isArray(node_data) : node_data instanceof Array) {
            type = 'array';
        } else if (node_data instanceof Date) {
            type = 'date';
        }

        switch (type) {
            //if value is an array create child nodes from values
            case 'array':
                var ret = [];
                node_data.map(function (v) {
                    ret.push(fn(v, 1, level + 1));
                    //entries that are values of an array are the only ones that can be special node descriptors
                });
                options.prettyPrint && ret.push('\n');
                return ret.join('');
                break;

            case 'date':
                // cast dates to ISO 8601 date (soap likes it)
                return node_data.toJSON ? node_data.toJSON() : node_data + '';
                break;

            case 'object':
                var nodes = [];
                for (var name in node_data) {
                    if (node_data.hasOwnProperty(name)) {
                        if (node_data[name] instanceof Array) {
                            for (var j = 0; j < node_data[name].length; j++) {
                                if (node_data[name].hasOwnProperty(j)) {
                                    nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));
                                }
                            }
                        } else {
                            nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));
                        }
                    }
                }
                options.prettyPrint && nodes.length > 0 && nodes.push('\n');
                return nodes.join('');
                break;

            case 'function':
                return node_data();
                break;

            default:
                return options.escape ? esc(node_data) : '' + node_data;
        }
    }(node_data, 0, 0);
};

var xml_header = function (standalone) {
    var ret = ['<?xml version="1.0" encoding="UTF-8"'];

    if (standalone) {
        ret.push(' standalone="yes"');
    }
    ret.push('?>');

    return ret.join('');
};

function esc(str) {
    return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(not_safe_in_xml, '');
}

module.exports = function (obj, options) {
    if (!options) {
        options = {
            xmlHeader: {
                standalone: true
            },
            prettyPrint: true,
            indent: "  ",
            escape: true
        };
    }

    if (typeof obj == 'string') {
        try {
            obj = JSON.parse(obj.toString());
        } catch (e) {
            return false;
        }
    }

    var xmlheader = '';
    var docType = '';
    if (options) {
        if (typeof options == 'object') {
            // our config is an object

            if (options.xmlHeader) {
                // the user wants an xml header
                xmlheader = xml_header(!!options.xmlHeader.standalone);
            }

            if (typeof options.docType != 'undefined') {
                docType = '<!DOCTYPE ' + options.docType + '>';
            }
        } else {
            // our config is a boolean value, so just add xml header
            xmlheader = xml_header();
        }
    }
    options = options || {};

    var ret = [xmlheader, options.prettyPrint && docType ? '\n' : '', docType, process_to_xml(obj, options)];
    return ret.join('').replace(/\n{2,}/g, '\n').replace(/\s+$/g, '');
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(3);
var util = __webpack_require__(0);

var originApiMap = {};
var transferToTaskMethod = function (apiMap, apiName) {
    originApiMap[apiName] = apiMap[apiName];
    apiMap[apiName] = function (params, callback) {
        if (params.SkipTask) {
            originApiMap[apiName].call(this, params, callback);
        } else {
            this._addTask(apiName, params, callback);
        }
    };
};

var initTask = function (cos) {

    var queue = [];
    var tasks = {};
    var uploadingFileCount = 0;
    var nextUploadIndex = 0;

    // 接口返回简略的任务信息
    var formatTask = function (task) {
        var t = {
            id: task.id,
            Bucket: task.Bucket,
            Region: task.Region,
            Key: task.Key,
            FilePath: task.FilePath,
            state: task.state,
            loaded: task.loaded,
            size: task.size,
            speed: task.speed,
            percent: task.percent,
            hashPercent: task.hashPercent,
            error: task.error
        };
        if (task.FilePath) t.FilePath = task.FilePath;
        if (task._custom) t._custom = task._custom; // 控制台使用
        return t;
    };

    var emitListUpdate = function () {
        var timer;
        var emit = function () {
            timer = 0;
            cos.emit('task-list-update', { list: util.map(queue, formatTask) });
            cos.emit('list-update', { list: util.map(queue, formatTask) });
        };
        return function () {
            if (!timer) timer = setTimeout(emit);
        };
    }();

    var clearQueue = function () {
        if (queue.length <= cos.options.UploadQueueSize) return;
        for (var i = 0; i < nextUploadIndex && // 小于当前操作的 index 才清理
        i < queue.length && // 大于队列才清理
        queue.length > cos.options.UploadQueueSize // 如果还太多，才继续清理
        ;) {
            var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';
            if (!queue[i] || !isActive) {
                tasks[queue[i].id] && delete tasks[queue[i].id];
                queue.splice(i, 1);
                nextUploadIndex--;
            } else {
                i++;
            }
        }
        emitListUpdate();
    };

    var startNextTask = function () {
        // 检查是否允许增加执行进程
        if (uploadingFileCount >= cos.options.FileParallelLimit) return;
        // 跳过不可执行的任务
        while (queue[nextUploadIndex] && queue[nextUploadIndex].state !== 'waiting') nextUploadIndex++;
        // 检查是否已遍历结束
        if (nextUploadIndex >= queue.length) return;
        // 上传该遍历到的任务
        var task = queue[nextUploadIndex];
        nextUploadIndex++;
        uploadingFileCount++;
        task.state = 'checking';
        task.params.onTaskStart && task.params.onTaskStart(formatTask(task));
        !task.params.UploadData && (task.params.UploadData = {});
        var apiParams = util.formatParams(task.api, task.params);
        originApiMap[task.api].call(cos, apiParams, function (err, data) {
            if (!cos._isRunningTask(task.id)) return;
            if (task.state === 'checking' || task.state === 'uploading') {
                task.state = err ? 'error' : 'success';
                err && (task.error = err);
                uploadingFileCount--;
                emitListUpdate();
                startNextTask();
                task.callback && task.callback(err, data);
                if (task.state === 'success') {
                    if (task.params) {
                        delete task.params.UploadData;
                        delete task.params.Body;
                        delete task.params;
                    }
                    delete task.callback;
                }
            }
            clearQueue();
        });
        emitListUpdate();
        // 异步执行下一个任务
        setTimeout(startNextTask);
    };

    var killTask = function (id, switchToState) {
        var task = tasks[id];
        if (!task) return;
        var waiting = task && task.state === 'waiting';
        var running = task && (task.state === 'checking' || task.state === 'uploading');
        if (switchToState === 'canceled' && task.state !== 'canceled' || switchToState === 'paused' && waiting || switchToState === 'paused' && running) {
            if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {
                console.error('stream not support pause');
                return;
            }
            task.state = switchToState;
            cos.emit('inner-kill-task', { TaskId: id, toState: switchToState });
            try {
                var UploadId = task && task.params && task.params.UploadData.UploadId;
            } catch (e) {}
            if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId);
            emitListUpdate();
            if (running) {
                uploadingFileCount--;
                startNextTask();
            }
            if (switchToState === 'canceled') {
                if (task.params) {
                    delete task.params.UploadData;
                    delete task.params.Body;
                    delete task.params;
                }
                delete task.callback;
            }
        }
        clearQueue();
    };

    cos._addTasks = function (taskList) {
        util.each(taskList, function (task) {
            cos._addTask(task.api, task.params, task.callback, true);
        });
        emitListUpdate();
    };

    var isTaskReadyWarning = true;
    cos._addTask = function (api, params, callback, ignoreAddEvent) {

        // 复制参数对象
        params = util.formatParams(api, params);

        // 生成 id
        var id = util.uuid();
        params.TaskId = id;
        params.onTaskReady && params.onTaskReady(id);
        if (params.TaskReady) {
            params.TaskReady(id);
            isTaskReadyWarning && console.warn('warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.');
            isTaskReadyWarning = false;
        }

        var task = {
            // env
            params: params,
            callback: callback,
            api: api,
            index: queue.length,
            // task
            id: id,
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            FilePath: params.FilePath || '',
            state: 'waiting',
            loaded: 0,
            size: 0,
            speed: 0,
            percent: 0,
            hashPercent: 0,
            error: null,
            _custom: params._custom
        };
        var onHashProgress = params.onHashProgress;
        params.onHashProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.hashPercent = info.percent;
            onHashProgress && onHashProgress(info);
            emitListUpdate();
        };
        var onProgress = params.onProgress;
        params.onProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.state === 'checking' && (task.state = 'uploading');
            task.loaded = info.loaded;
            task.speed = info.speed;
            task.percent = info.percent;
            onProgress && onProgress(info);
            emitListUpdate();
        };

        // 异步获取 filesize
        util.getFileSize(api, params, function (err, size) {
            // 开始处理上传
            if (err) return callback(util.error(err)); // 如果获取大小出错，不加入队列
            // 获取完文件大小再把任务加入队列
            tasks[id] = task;
            queue.push(task);
            task.size = size;
            !ignoreAddEvent && emitListUpdate();
            startNextTask();
            clearQueue();
        });
        return id;
    };
    cos._isRunningTask = function (id) {
        var task = tasks[id];
        return !!(task && (task.state === 'checking' || task.state === 'uploading'));
    };
    cos.getTaskList = function () {
        return util.map(queue, formatTask);
    };
    cos.cancelTask = function (id) {
        killTask(id, 'canceled');
    };
    cos.pauseTask = function (id) {
        killTask(id, 'paused');
    };
    cos.restartTask = function (id) {
        var task = tasks[id];
        if (task && (task.state === 'paused' || task.state === 'error')) {
            task.state = 'waiting';
            emitListUpdate();
            nextUploadIndex = Math.min(nextUploadIndex, task.index);
            startNextTask();
        }
    };
    cos.isUploadRunning = function () {
        return uploadingFileCount || nextUploadIndex < queue.length;
    };
};

module.exports.transferToTaskMethod = transferToTaskMethod;
module.exports.init = initTask;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var REQUEST = __webpack_require__(17);
var util = __webpack_require__(0);

// Bucket 相关

/**
 * 获取用户的 bucket 列表
 * @param  {Object}  params         回调函数，必须，下面为参数列表
 * 无特殊参数
 * @param  {Function}  callback     回调函数，必须
 */
function getService(params, callback) {

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }
    var protocol = this.options.Protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
    var domain = this.options.ServiceDomain;
    var appId = params.AppId || this.options.appId;
    var region = params.Region;
    if (domain) {
        domain = domain.replace(/\{\{AppId\}\}/ig, appId || '').replace(/\{\{Region\}\}/ig, region || '').replace(/\{\{.*?\}\}/ig, '');
        if (!/^[a-zA-Z]+:\/\//.test(domain)) {
            domain = protocol + '//' + domain;
        }
        if (domain.slice(-1) === '/') {
            domain = domain.slice(0, -1);
        }
    } else if (region) {
        domain = protocol + '//cos.' + region + '.myqcloud.com';
    } else {
        domain = protocol + '//service.cos.myqcloud.com';
    }

    submitRequest.call(this, {
        Action: 'name/cos:GetService',
        url: domain,
        method: 'GET',
        headers: params.Headers
    }, function (err, data) {
        if (err) return callback(err);
        var buckets = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Buckets && data.ListAllMyBucketsResult.Buckets.Bucket || [];
        buckets = util.isArray(buckets) ? buckets : [buckets];
        var owner = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Owner || {};
        callback(null, {
            Buckets: buckets,
            Owner: owner,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 创建 Bucket，并初始化访问权限
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {String}  data.Location             操作地址
 */
function putBucket(params, callback) {

    var self = this;

    var xml = '';
    if (params['BucketAZConfig']) {
        var CreateBucketConfiguration = {
            BucketAZConfig: params.BucketAZConfig
        };
        xml = util.json2xml({ CreateBucketConfiguration: CreateBucketConfiguration });
    }

    submitRequest.call(this, {
        Action: 'name/cos:PutBucket',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        body: xml
    }, function (err, data) {
        if (err) return callback(err);
        var url = getUrl({
            protocol: self.options.Protocol,
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            isLocation: true
        });
        callback(null, {
            Location: url,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 查看是否存在该Bucket，是否有权限访问
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                      返回的数据
 *     @return  {Boolean}  data.BucketExist     Bucket是否存在
 *     @return  {Boolean}  data.BucketAuth      是否有 Bucket 的访问权限
 */
function headBucket(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:HeadBucket',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        method: 'HEAD'
    }, callback);
}

/**
 * 获取 Bucket 下的 object 列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Prefix              前缀匹配，用来规定返回的文件前缀地址，非必须
 *     @param  {String}  params.Delimiter           定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，非必须
 *     @param  {String}  params.Marker              默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
 *     @param  {String}  params.MaxKeys             单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.EncodingType        规定返回值的编码方式，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.ListBucketResult     返回的 object 列表信息
 */
function getBucket(params, callback) {
    var reqParams = {};
    reqParams['prefix'] = params['Prefix'] || '';
    reqParams['delimiter'] = params['Delimiter'];
    reqParams['marker'] = params['Marker'];
    reqParams['max-keys'] = params['MaxKeys'];
    reqParams['encoding-type'] = params['EncodingType'];

    submitRequest.call(this, {
        Action: 'name/cos:GetBucket',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams
    }, function (err, data) {
        if (err) return callback(err);
        var ListBucketResult = data.ListBucketResult || {};
        var Contents = ListBucketResult.Contents || [];
        var CommonPrefixes = ListBucketResult.CommonPrefixes || [];

        Contents = util.isArray(Contents) ? Contents : [Contents];
        CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];

        var result = util.clone(ListBucketResult);
        util.extend(result, {
            Contents: Contents,
            CommonPrefixes: CommonPrefixes,
            statusCode: data.statusCode,
            headers: data.headers
        });

        callback(null, result);
    });
}

/**
 * 删除 Bucket
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 *     @return  {String}  data.Location     操作地址
 */
function deleteBucket(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucket',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        method: 'DELETE'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 */
function putBucketAcl(params, callback) {
    var headers = params.Headers;

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = { Grant: Grants };
        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });

        headers['Content-Type'] = 'application/xml';
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    }

    // Grant Header 去重
    util.each(headers, function (val, key) {
        if (key.indexOf('x-cos-grant-') === 0) {
            headers[key] = uniqGrant(headers[key]);
        }
    });

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketACL',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: headers,
        action: 'acl',
        body: xml
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  访问权限信息
 */
function getBucketAcl(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketACL',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'acl'
    }, function (err, data) {
        if (err) return callback(err);
        var AccessControlPolicy = data.AccessControlPolicy || {};
        var Owner = AccessControlPolicy.Owner || {};
        var Grant = AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(AccessControlPolicy);
        if (data.headers && data.headers['x-cos-acl']) {
            result.ACL = data.headers['x-cos-acl'];
        }
        result = util.extend(result, {
            Owner: Owner,
            Grants: Grant,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 设置 Bucket 的 跨域设置
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {Object}  params.CORSConfiguration       相关的跨域设置，必须
 * @param  {Array}  params.CORSConfiguration.CORSRules  对应的跨域规则
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              返回的数据
 */
function putBucketCors(params, callback) {

    var CORSConfiguration = params['CORSConfiguration'] || {};
    var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];
    CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);
    util.each(CORSRules, function (rule) {
        util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
            var sKey = key + 's';
            var val = rule[sKey] || rule[key] || [];
            delete rule[sKey];
            rule[key] = util.isArray(val) ? val : [val];
        });
    });

    var xml = util.json2xml({ CORSConfiguration: { CORSRule: CORSRules } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketCORS',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'cors',
        headers: headers
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的 跨域设置
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.CORSRules            Bucket的跨域设置
 */
function getBucketCors(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketCORS',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'cors'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchCORSConfiguration') {
                var result = {
                    CORSRules: [],
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var CORSConfiguration = data.CORSConfiguration || {};
        var CORSRules = CORSConfiguration.CORSRules || CORSConfiguration.CORSRule || [];
        CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);

        util.each(CORSRules, function (rule) {
            util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
                var sKey = key + 's';
                var val = rule[sKey] || rule[key] || [];
                delete rule[key];
                rule[sKey] = util.isArray(val) ? val : [val];
            });
        });

        callback(null, {
            CORSRules: CORSRules,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 的 跨域设置
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 */
function deleteBucketCors(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketCORS',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'cors'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode || err.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的 地域信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据，包含地域信息 LocationConstraint
 */
function getBucketLocation(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketLocation',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'location'
    }, callback);
}

function putBucketPolicy(params, callback) {
    var Policy = params['Policy'];
    try {
        if (typeof Policy === 'string') Policy = JSON.parse(Policy);
    } catch (e) {}
    if (!Policy || typeof Policy === 'string') return callback(util.error(new Error('Policy format error')));
    var PolicyStr = JSON.stringify(Policy);
    if (!Policy.version) Policy.version = '2.0';

    var headers = params.Headers;
    headers['Content-Type'] = 'application/json';
    headers['Content-MD5'] = util.binaryBase64(util.md5(PolicyStr));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketPolicy',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        action: 'policy',
        body: PolicyStr,
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的读取权限策略
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketPolicy(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketPolicy',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'policy',
        rawBody: true
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 403) {
                return callback(util.error(err, { ErrorStatus: 'Access Denied' }));
            }
            if (err.statusCode && err.statusCode === 405) {
                return callback(util.error(err, { ErrorStatus: 'Method Not Allowed' }));
            }
            if (err.statusCode && err.statusCode === 404) {
                return callback(util.error(err, { ErrorStatus: 'Policy Not Found' }));
            }
            return callback(err);
        }
        var Policy = {};
        try {
            Policy = JSON.parse(data.body);
        } catch (e) {}
        callback(null, {
            Policy: Policy,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 的 跨域设置
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 */
function deleteBucketPolicy(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketPolicy',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'policy'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode || err.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 的标签
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {Array}   params.TagSet  标签设置，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function putBucketTagging(params, callback) {

    var Tagging = params['Tagging'] || {};
    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    var xml = util.json2xml({ Tagging: { TagSet: { Tag: Tags } } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketTagging',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'tagging',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketTagging(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketTagging',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'tagging'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
                var result = {
                    Tags: [],
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Tags = [];
        try {
            Tags = data.Tagging.TagSet.Tag || [];
        } catch (e) {}
        Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
        callback(null, {
            Tags: Tags,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 的 标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function deleteBucketTagging(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketTagging',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'tagging'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function putBucketLifecycle(params, callback) {

    var LifecycleConfiguration = params['LifecycleConfiguration'] || {};
    var Rules = LifecycleConfiguration.Rules || params.Rules || [];
    Rules = util.clone(Rules);
    var xml = util.json2xml({ LifecycleConfiguration: { Rule: Rules } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketLifecycle',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'lifecycle',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function getBucketLifecycle(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketLifecycle',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'lifecycle'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchLifecycleConfiguration') {
                var result = {
                    Rules: [],
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Rules = [];
        try {
            Rules = data.LifecycleConfiguration.Rule || [];
        } catch (e) {}
        Rules = util.clone(util.isArray(Rules) ? Rules : [Rules]);
        callback(null, {
            Rules: Rules,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function deleteBucketLifecycle(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketLifecycle',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'lifecycle'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function putBucketVersioning(params, callback) {

    if (!params['VersioningConfiguration']) {
        callback(util.error(new Error('missing param VersioningConfiguration')));
        return;
    }
    var VersioningConfiguration = params['VersioningConfiguration'] || {};
    var xml = util.json2xml({ VersioningConfiguration: VersioningConfiguration });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketVersioning',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'versioning',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function getBucketVersioning(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketVersioning',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'versioning'
    }, function (err, data) {
        if (!err) {
            !data.VersioningConfiguration && (data.VersioningConfiguration = {});
        }
        callback(err, data);
    });
}

function putBucketReplication(params, callback) {
    var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);
    var xml = util.json2xml({ ReplicationConfiguration: ReplicationConfiguration });
    xml = xml.replace(/<(\/?)Rules>/ig, '<$1Rule>');
    xml = xml.replace(/<(\/?)Tags>/ig, '<$1Tag>');

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketReplication',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'replication',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function getBucketReplication(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketReplication',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'replication'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {
                var result = {
                    ReplicationConfiguration: { Rules: [] },
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        if (!err) {
            !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});
        }
        if (data.ReplicationConfiguration.Rule) {
            data.ReplicationConfiguration.Rules = util.makeArray(data.ReplicationConfiguration.Rule);
            delete data.ReplicationConfiguration.Rule;
        }
        callback(err, data);
    });
}

function deleteBucketReplication(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketReplication',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'replication'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 静态网站配置信息
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 *     @param  {Object}  params.WebsiteConfiguration                        地域名称，必须
 *         @param  {Object}   WebsiteConfiguration.IndexDocument            索引文档，必须
 *         @param  {Object}   WebsiteConfiguration.ErrorDocument            错误文档，非必须
 *         @param  {Object}   WebsiteConfiguration.RedirectAllRequestsTo    重定向所有请求，非必须
 *         @param  {Array}   params.RoutingRules                            重定向规则，非必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketWebsite(params, callback) {

    if (!params['WebsiteConfiguration']) {
        callback(util.error(new Error('missing param WebsiteConfiguration')));
        return;
    }

    var WebsiteConfiguration = util.clone(params['WebsiteConfiguration'] || {});
    var RoutingRules = WebsiteConfiguration['RoutingRules'] || WebsiteConfiguration['RoutingRule'] || [];
    RoutingRules = util.isArray(RoutingRules) ? RoutingRules : [RoutingRules];
    delete WebsiteConfiguration.RoutingRule;
    delete WebsiteConfiguration.RoutingRules;
    if (RoutingRules.length) WebsiteConfiguration.RoutingRules = { RoutingRule: RoutingRules };
    var xml = util.json2xml({ WebsiteConfiguration: WebsiteConfiguration });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketWebsite',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'website',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的静态网站配置信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketWebsite(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketWebsite',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'website'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error.Code === 'NoSuchWebsiteConfiguration') {
                var result = {
                    WebsiteConfiguration: {},
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }

        var WebsiteConfiguration = data.WebsiteConfiguration || {};
        if (WebsiteConfiguration['RoutingRules']) {
            var RoutingRules = util.clone(WebsiteConfiguration['RoutingRules'].RoutingRule || []);
            RoutingRules = util.makeArray(RoutingRules);
            WebsiteConfiguration.RoutingRules = RoutingRules;
        }

        callback(null, {
            WebsiteConfiguration: WebsiteConfiguration,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 的静态网站配置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function deleteBucketWebsite(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketWebsite',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'website'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 的防盗链白名单或者黑名单
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 *     @param  {Object}  params.RefererConfiguration                        地域名称，必须
 *         @param  {String}   RefererConfiguration.Status                   是否开启防盗链，枚举值：Enabled、Disabled
 *         @param  {String}   RefererConfiguration.RefererType              防盗链类型，枚举值：Black-List、White-List，必须
 *         @param  {Array}   RefererConfiguration.DomianList.Domain         生效域名，必须
 *         @param  {String}   RefererConfiguration.EmptyReferConfiguration  ，非必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketReferer(params, callback) {

    if (!params['RefererConfiguration']) {
        callback(util.error(new Error('missing param RefererConfiguration')));
        return;
    }

    var RefererConfiguration = util.clone(params['RefererConfiguration'] || {});
    var DomainList = RefererConfiguration['DomainList'] || {};
    var Domains = DomainList['Domains'] || DomainList['Domain'] || [];
    Domains = util.isArray(Domains) ? Domains : [Domains];
    if (Domains.length) RefererConfiguration.DomainList = { Domain: Domains };
    var xml = util.json2xml({ RefererConfiguration: RefererConfiguration });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketReferer',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'referer',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的防盗链白名单或者黑名单
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketReferer(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketReferer',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'referer'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error.Code === 'NoSuchRefererConfiguration') {
                var result = {
                    WebsiteConfiguration: {},
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }

        var RefererConfiguration = data.RefererConfiguration || {};
        if (RefererConfiguration['DomainList']) {
            var Domains = util.clone(RefererConfiguration['DomainList'].Domain || []);
            Domains = util.makeArray(Domains);
            RefererConfiguration.DomainList = { Domains: Domains };
        }

        callback(null, {
            RefererConfiguration: RefererConfiguration,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 自定义域名
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketDomain(params, callback) {

    var DomainConfiguration = params['DomainConfiguration'] || {};
    var DomainRule = DomainConfiguration.DomainRule || params.DomainRule || [];
    DomainRule = util.clone(DomainRule);
    var xml = util.json2xml({ DomainConfiguration: { DomainRule: DomainRule } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketDomain',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'domain',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的自定义域名
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketDomain(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketDomain',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'domain'
    }, function (err, data) {
        if (err) return callback(err);

        var DomainRule = [];
        try {
            DomainRule = data.DomainConfiguration.DomainRule || [];
        } catch (e) {}
        DomainRule = util.clone(util.isArray(DomainRule) ? DomainRule : [DomainRule]);
        callback(null, {
            DomainRule: DomainRule,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 自定义域名
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function deleteBucketDomain(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketDomain',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'domain'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 的回源
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketOrigin(params, callback) {
    var OriginConfiguration = params['OriginConfiguration'] || {};
    var OriginRule = OriginConfiguration.OriginRule || params.OriginRule || [];
    OriginRule = util.clone(OriginRule);
    var xml = util.json2xml({ OriginConfiguration: { OriginRule: OriginRule } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketOrigin',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'origin',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的回源
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketOrigin(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketOrigin',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'origin'
    }, function (err, data) {
        if (err) return callback(err);

        var OriginRule = [];
        try {
            OriginRule = data.OriginConfiguration.OriginRule || [];
        } catch (e) {}
        OriginRule = util.clone(util.isArray(OriginRule) ? OriginRule : [OriginRule]);
        callback(null, {
            OriginRule: OriginRule,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Bucket 的回源
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function deleteBucketOrigin(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketOrigin',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'origin'
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 设置 Bucket 的日志记录
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 *     @param  {(Object|String)}  params.BucketLoggingStatus                         说明日志记录配置的状态，如果无子节点信息则意为关闭日志记录，必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketLogging(params, callback) {
    var xml = util.json2xml({
        BucketLoggingStatus: params['BucketLoggingStatus'] || ''
    });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketLogging',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'logging',
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的日志记录
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketLogging(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketLogging',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'logging'
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            BucketLoggingStatus: data.BucketLoggingStatus,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 创建/编辑 Bucket 的清单任务
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 *     @param  {String}  params.Id                                          清单任务的名称，必须
 *     @param  {Object}  params.InventoryConfiguration                      包含清单的配置参数，必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketInventory(params, callback) {
    var InventoryConfiguration = util.clone(params['InventoryConfiguration']);

    if (InventoryConfiguration.OptionalFields) {
        var Field = InventoryConfiguration.OptionalFields || [];
        InventoryConfiguration.OptionalFields = {
            Field: Field
        };
    }

    if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
        var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
        if (Object.keys(Encryption).indexOf('SSECOS') > -1) {
            Encryption['SSE-COS'] = Encryption['SSECOS'];
            delete Encryption['SSECOS'];
        }
    }

    var xml = util.json2xml({
        InventoryConfiguration: InventoryConfiguration
    });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketInventory',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'inventory',
        qs: {
            id: params['Id']
        },
        headers: headers
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的清单任务信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Id      清单任务的名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketInventory(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketInventory',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'inventory',
        qs: {
            id: params['Id']
        }
    }, function (err, data) {
        if (err) return callback(err);

        var InventoryConfiguration = data['InventoryConfiguration'];
        if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
            var Field = InventoryConfiguration.OptionalFields.Field;
            if (!util.isArray(Field)) {
                Field = [Field];
            }
            InventoryConfiguration.OptionalFields = Field;
        }
        if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
            var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
            if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
                Encryption['SSECOS'] = Encryption['SSE-COS'];
                delete Encryption['SSE-COS'];
            }
        }

        callback(null, {
            InventoryConfiguration: InventoryConfiguration,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Bucket 的清单任务信息
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {String}  params.ContinuationToken       当 COS 响应体中 IsTruncated 为 true，且 NextContinuationToken 节点中存在参数值时，您可以将这个参数作为 continuation-token 参数值，以获取下一页的清单任务信息，非必须
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              返回数据
 */
function listBucketInventory(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:ListBucketInventory',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'inventory',
        qs: {
            'continuation-token': params['ContinuationToken']
        }
    }, function (err, data) {
        if (err) return callback(err);
        var ListInventoryConfigurationResult = data['ListInventoryConfigurationResult'];
        var InventoryConfigurations = ListInventoryConfigurationResult.InventoryConfiguration || [];
        InventoryConfigurations = util.isArray(InventoryConfigurations) ? InventoryConfigurations : [InventoryConfigurations];
        delete ListInventoryConfigurationResult['InventoryConfiguration'];
        util.each(InventoryConfigurations, function (InventoryConfiguration) {
            if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
                var Field = InventoryConfiguration.OptionalFields.Field;
                if (!util.isArray(Field)) {
                    Field = [Field];
                }
                InventoryConfiguration.OptionalFields = Field;
            }

            if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
                var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;
                if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
                    Encryption['SSECOS'] = Encryption['SSE-COS'];
                    delete Encryption['SSE-COS'];
                }
            }
        });
        ListInventoryConfigurationResult.InventoryConfigurations = InventoryConfigurations;
        util.extend(ListInventoryConfigurationResult, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, ListInventoryConfigurationResult);
    });
}

/**
 * 删除 Bucket 的清单任务
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Id      清单任务的名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function deleteBucketInventory(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketInventory',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'inventory',
        qs: {
            id: params['Id']
        }
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/* 全球加速 */
function putBucketAccelerate(params, callback) {

    if (!params['AccelerateConfiguration']) {
        callback(util.error(new Error('missing param AccelerateConfiguration')));
        return;
    }

    var configuration = { AccelerateConfiguration: params.AccelerateConfiguration || {} };

    var xml = util.json2xml(configuration);

    var headers = {};
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketAccelerate',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'accelerate',
        headers: headers
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

function getBucketAccelerate(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketAccelerate',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: 'accelerate'
    }, function (err, data) {
        if (!err) {
            !data.AccelerateConfiguration && (data.AccelerateConfiguration = {});
        }
        callback(err, data);
    });
}

// Object 相关

/**
 * 取回对应Object的元数据，Head的权限与Get的权限一致
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Key                 文件名称，必须
 *     @param  {String}  params.IfModifiedSince     当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          为指定 object 的元数据，如果设置了 IfModifiedSince ，且文件未修改，则返回一个对象，NotModified 属性为 true
 *     @return  {Boolean}  data.NotModified         是否在 IfModifiedSince 时间点之后未修改该 object，则为 true
 */
function headObject(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:HeadObject',
        method: 'HEAD',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        headers: params.Headers
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true,
                    statusCode: statusCode
                });
            }
            return callback(err);
        }
        data.ETag = util.attr(data.headers, 'etag', '');
        callback(null, data);
    });
}

function listObjectVersions(params, callback) {
    var reqParams = {};
    reqParams['prefix'] = params['Prefix'] || '';
    reqParams['delimiter'] = params['Delimiter'];
    reqParams['key-marker'] = params['KeyMarker'];
    reqParams['version-id-marker'] = params['VersionIdMarker'];
    reqParams['max-keys'] = params['MaxKeys'];
    reqParams['encoding-type'] = params['EncodingType'];

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketObjectVersions',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
        action: 'versions'
    }, function (err, data) {
        if (err) return callback(err);
        var ListVersionsResult = data.ListVersionsResult || {};
        var DeleteMarkers = ListVersionsResult.DeleteMarker || [];
        DeleteMarkers = util.isArray(DeleteMarkers) ? DeleteMarkers : [DeleteMarkers];
        var Versions = ListVersionsResult.Version || [];
        Versions = util.isArray(Versions) ? Versions : [Versions];

        var result = util.clone(ListVersionsResult);
        delete result.DeleteMarker;
        delete result.Version;
        util.extend(result, {
            DeleteMarkers: DeleteMarkers,
            Versions: Versions,
            statusCode: data.statusCode,
            headers: data.headers
        });

        callback(null, result);
    });
}

/**
 * 下载 object
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         文件名称，必须
 *     @param  {WriteStream}  params.Output                 文件写入流，非必须
 *     @param  {String}  params.IfModifiedSince             当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
 *     @param  {String}  params.IfUnmodifiedSince           如果文件修改时间早于或等于指定时间，才返回文件内容。否则返回 412 (precondition failed)，非必须
 *     @param  {String}  params.IfMatch                     当 ETag 与指定的内容一致，才返回文件。否则返回 412 (precondition failed)，非必须
 *     @param  {String}  params.IfNoneMatch                 当 ETag 与指定的内容不一致，才返回文件。否则返回304 (not modified)，非必须
 *     @param  {String}  params.ResponseContentType         设置返回头部中的 Content-Type 参数，非必须
 *     @param  {String}  params.ResponseContentLanguage     设置返回头部中的 Content-Language 参数，非必须
 *     @param  {String}  params.ResponseExpires             设置返回头部中的 Content-Expires 参数，非必须
 *     @param  {String}  params.ResponseCacheControl        设置返回头部中的 Cache-Control 参数，非必须
 *     @param  {String}  params.ResponseContentDisposition  设置返回头部中的 Content-Disposition 参数，非必须
 *     @param  {String}  params.ResponseContentEncoding     设置返回头部中的 Content-Encoding 参数，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @param  {Object}  err                                    请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                                   为对应的 object 数据，包括 body 和 headers
 */
function getObject(params, callback) {
    var reqParams = params.Query || {};
    var onProgress = util.throttleOnProgress.call(this, 0, params.onProgress);

    reqParams['response-content-type'] = params['ResponseContentType'];
    reqParams['response-content-language'] = params['ResponseContentLanguage'];
    reqParams['response-expires'] = params['ResponseExpires'];
    reqParams['response-cache-control'] = params['ResponseCacheControl'];
    reqParams['response-content-disposition'] = params['ResponseContentDisposition'];
    reqParams['response-content-encoding'] = params['ResponseContentEncoding'];

    // 如果用户自己传入了 output
    submitRequest.call(this, {
        Action: 'name/cos:GetObject',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        DataType: params.DataType,
        headers: params.Headers,
        qs: reqParams,
        rawBody: true,
        onDownloadProgress: onProgress
    }, function (err, data) {
        onProgress(null, true);
        if (err) {
            var statusCode = err.statusCode;
            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true
                });
            }
            return callback(err);
        }
        callback(null, {
            Body: data.body,
            ETag: util.attr(data.headers, 'etag', ''),
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 上传 object
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 文件名称，必须
 *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串，必须
 *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须
 *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
 *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须
 *     @param  {String}  params.GrantRead                           赋予被授权者读取对象的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantReadAcp                        赋予被授权者读取对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantWriteAcp                       赋予被授权者写入对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantFullControl                    赋予被授权者操作对象的所有权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.StorageClass                        设置对象的存储级别，枚举值：STANDARD、STANDARD_IA、ARCHIVE，默认值：STANDARD，非必须
 *     @param  {String}  params.x-cos-meta-*                        允许用户自定义的头部信息，将作为对象的元数据保存。大小限制2KB，非必须
 *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须
 *     @param  {String}  params.ServerSideEncryption                支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {Function}  params.onProgress                        上传进度回调函数
 * @param  {Function}  callback                                     回调函数，必须
 * @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                          为对应的 object 数据
 *     @return  {String}  data.ETag                                 为对应上传文件的 ETag 值
 */
function putObject(params, callback) {
    var self = this;
    var FileSize = params.ContentLength;
    var onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

    // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里
    var headers = params.Headers;
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
    var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;
    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
        if (md5) {
            if (self.options.UploadCheckContentMd5) headers['Content-MD5'] = util.binaryBase64(md5);
            if (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5) headers['x-cos-meta-md5'] = md5;
        }
        if (params.ContentLength !== undefined) headers['Content-Length'] = params.ContentLength;
        onProgress(null, true); // 任务状态开始 uploading
        submitRequest.call(self, {
            Action: 'name/cos:PutObject',
            TaskId: params.TaskId,
            method: 'PUT',
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            headers: params.Headers,
            qs: params.Query,
            body: params.Body,
            onProgress: onProgress
        }, function (err, data) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }
            onProgress({ loaded: FileSize, total: FileSize }, true);
            var url = getUrl({
                ForcePathStyle: self.options.ForcePathStyle,
                protocol: self.options.Protocol,
                domain: self.options.Domain,
                bucket: params.Bucket,
                region: params.Region,
                object: params.Key
            });
            url = url.substr(url.indexOf('://') + 3);
            data.Location = url;
            data.ETag = util.attr(data.headers, 'etag', '');
            callback(null, data);
        });
    }, params.onHashProgress);
}

/**
 * 删除 object
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 *     @param  {String}  params.Key             object名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @param  {Object}  err                        请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                       删除操作成功之后返回的数据
 */
function deleteObject(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteObject',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        VersionId: params.VersionId
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (statusCode && statusCode === 404) {
                return callback(null, { BucketNotFound: true, statusCode: statusCode });
            } else {
                return callback(err);
            }
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 object 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Key                 object名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  权限列表
 */
function getObjectAcl(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetObjectACL',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'acl'
    }, function (err, data) {
        if (err) return callback(err);
        var AccessControlPolicy = data.AccessControlPolicy || {};
        var Owner = AccessControlPolicy.Owner || {};
        var Grant = AccessControlPolicy.AccessControlList && AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(AccessControlPolicy);
        delete result.GrantWrite;
        if (data.headers && data.headers['x-cos-acl']) {
            result.ACL = data.headers['x-cos-acl'];
        }
        result = util.extend(result, {
            Owner: Owner,
            Grants: Grant,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 设置 object 的 权限列表
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Key     object名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function putObjectAcl(params, callback) {
    var headers = params.Headers;

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = { Grant: Grants };
        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });

        headers['Content-Type'] = 'application/xml';
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    }

    // Grant Header 去重
    util.each(headers, function (val, key) {
        if (key.indexOf('x-cos-grant-') === 0) {
            headers[key] = uniqGrant(headers[key]);
        }
    });

    submitRequest.call(this, {
        Action: 'name/cos:PutObjectACL',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: 'acl',
        headers: headers,
        body: xml
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * Options Object请求实现跨域访问的预请求。即发出一个 OPTIONS 请求给服务器以确认是否可以进行跨域操作。
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Key     object名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function optionsObject(params, callback) {

    var headers = params.Headers;
    headers['Origin'] = params['Origin'];
    headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];
    headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];

    submitRequest.call(this, {
        Action: 'name/cos:OptionsObject',
        method: 'OPTIONS',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 403) {
                return callback(null, {
                    OptionsForbidden: true,
                    statusCode: err.statusCode
                });
            }
            return callback(err);
        }

        var headers = data.headers || {};
        callback(null, {
            AccessControlAllowOrigin: headers['access-control-allow-origin'],
            AccessControlAllowMethods: headers['access-control-allow-methods'],
            AccessControlAllowHeaders: headers['access-control-allow-headers'],
            AccessControlExposeHeaders: headers['access-control-expose-headers'],
            AccessControlMaxAge: headers['access-control-max-age'],
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * @param  {Object}                                     参数列表
 *     @param  {String}  Bucket                         Bucket 名称
 *     @param  {String}  Region                         地域名称
 *     @param  {String}  Key                            文件名称
 *     @param  {String}  CopySource                     源文件URL绝对路径，可以通过versionid子资源指定历史版本
 *     @param  {String}  ACL                            允许用户自定义文件权限。有效值：private，public-read默认值：private。
 *     @param  {String}  GrantRead                      赋予被授权者读的权限，格式 x-cos-grant-read: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  GrantWrite                     赋予被授权者写的权限，格式 x-cos-grant-write: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  GrantFullControl               赋予被授权者读写权限，格式 x-cos-grant-full-control: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  MetadataDirective              是否拷贝元数据，枚举值：Copy, Replaced，默认值Copy。假如标记为Copy，忽略Header中的用户元数据信息直接复制；假如标记为Replaced，按Header信息修改元数据。当目标路径和原路径一致，即用户试图修改元数据时，必须为Replaced
 *     @param  {String}  CopySourceIfModifiedSince      当Object在指定时间后被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-None-Match一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfUnmodifiedSince    当Object在指定时间后未被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-Match一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfMatch              当Object的ETag和给定一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Unmodified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfNoneMatch          当Object的ETag和给定不一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Modified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  StorageClass                   存储级别，枚举值：存储级别，枚举值：Standard, Standard_IA，Archive；默认值：Standard
 *     @param  {String}  CacheControl                   指定所有缓存机制在整个请求/响应链中必须服从的指令。
 *     @param  {String}  ContentDisposition             MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
 *     @param  {String}  ContentEncoding                HTTP 中用来对「采用何种编码格式传输正文」进行协定的一对头部字段
 *     @param  {String}  ContentLength                  设置响应消息的实体内容的大小，单位为字节
 *     @param  {String}  ContentType                    RFC 2616 中定义的 HTTP 请求内容类型（MIME），例如text/plain
 *     @param  {String}  Expect                         请求的特定的服务器行为
 *     @param  {String}  Expires                        响应过期的日期和时间
 *     @param  {String}  params.ServerSideEncryption   支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {String}  ContentLanguage                指定内容语言
 *     @param  {String}  x-cos-meta-*                   允许用户自定义的头部信息，将作为 Object 元数据返回。大小限制2K。
 */
function putObjectCopy(params, callback) {

    // 特殊处理 Cache-Control
    var headers = params.Headers;
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';

    var CopySource = params.CopySource || '';
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback(util.error(new Error('CopySource format error')));
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);

    submitRequest.call(this, {
        Scope: [{
            action: 'name/cos:GetObject',
            bucket: SourceBucket,
            region: SourceRegion,
            prefix: SourceKey
        }, {
            action: 'name/cos:PutObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: params.Key
        }],
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        headers: params.Headers
    }, function (err, data) {
        if (err) return callback(err);
        var result = util.clone(data.CopyObjectResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function uploadPartCopy(params, callback) {

    var CopySource = params.CopySource || '';
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback(util.error(new Error('CopySource format error')));
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);

    submitRequest.call(this, {
        Scope: [{
            action: 'name/cos:GetObject',
            bucket: SourceBucket,
            region: SourceRegion,
            prefix: SourceKey
        }, {
            action: 'name/cos:PutObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: params.Key
        }],
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        qs: {
            partNumber: params['PartNumber'],
            uploadId: params['UploadId']
        },
        headers: params.Headers
    }, function (err, data) {
        if (err) return callback(err);
        var result = util.clone(data.CopyPartResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function deleteMultipleObject(params, callback) {
    var Objects = params.Objects || [];
    var Quiet = params.Quiet;
    Objects = util.isArray(Objects) ? Objects : [Objects];

    var xml = util.json2xml({ Delete: { Object: Objects, Quiet: Quiet || false } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    var Scope = util.map(Objects, function (v) {
        return {
            action: 'name/cos:DeleteObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: v.Key
        };
    });

    submitRequest.call(this, {
        Scope: Scope,
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'delete',
        headers: headers
    }, function (err, data) {
        if (err) return callback(err);
        var DeleteResult = data.DeleteResult || {};
        var Deleted = DeleteResult.Deleted || [];
        var Errors = DeleteResult.Error || [];

        Deleted = util.isArray(Deleted) ? Deleted : [Deleted];
        Errors = util.isArray(Errors) ? Errors : [Errors];

        var result = util.clone(DeleteResult);
        util.extend(result, {
            Error: Errors,
            Deleted: Deleted,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function restoreObject(params, callback) {
    var headers = params.Headers;
    if (!params['RestoreRequest']) {
        callback(util.error(new Error('missing param RestoreRequest')));
        return;
    }

    var RestoreRequest = params.RestoreRequest || {};
    var xml = util.json2xml({ RestoreRequest: RestoreRequest });

    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:RestoreObject',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        body: xml,
        action: 'restore',
        headers: headers
    }, callback);
}

/**
 * 设置 Object 的标签
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Object名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {Array}   params.TagSet  标签设置，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              返回数据
 */
function putObjectTagging(params, callback) {

    var Tagging = params['Tagging'] || {};
    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    var xml = util.json2xml({ Tagging: { TagSet: { Tag: Tags } } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutObjectTagging',
        method: 'PUT',
        Bucket: params.Bucket,
        Key: params.Key,
        Region: params.Region,
        body: xml,
        action: 'tagging',
        headers: headers,
        VersionId: params.VersionId
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取 Object 的标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              返回数据
 */
function getObjectTagging(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetObjectTagging',
        method: 'GET',
        Key: params.Key,
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'tagging',
        VersionId: params.VersionId
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
                var result = {
                    Tags: [],
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Tags = [];
        try {
            Tags = data.Tagging.TagSet.Tag || [];
        } catch (e) {}
        Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
        callback(null, {
            Tags: Tags,
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 删除 Object 的 标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Object名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              返回的数据
 */
function deleteObjectTagging(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteObjectTagging',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'tagging',
        VersionId: params.VersionId
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 使用 SQL 语句从指定对象（CSV 格式或者 JSON 格式）中检索内容
 * @param  {Object}  params                   参数对象，必须
 *     @param  {String}  params.Bucket        Object名称，必须
 *     @param  {String}  params.Region        地域名称，必须
 *     @param  {Object}  params.SelectRequest 地域名称，必须
 * @param  {Function}  callback               回调函数，必须
 * @return  {Object}  err                     请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data                    返回的数据
 */
function selectObjectContent(params, callback) {
    var SelectType = params['SelectType'];
    if (!SelectType) return callback(util.error(new Error('missing param SelectType')));

    var SelectRequest = params['SelectRequest'] || {};
    var xml = util.json2xml({ SelectRequest: SelectRequest });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:GetObject',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'select',
        qs: {
            'select-type': params['SelectType']
        },
        VersionId: params.VersionId,
        body: xml,
        DataType: 'arraybuffer',
        rawBody: true
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, { statusCode: err.statusCode });
        } else if (err) {
            return callback(err);
        }
        var result = util.parseSelectPayload(data.body);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
            Body: result.body,
            Payload: result.payload
        });
    });
}

// 分块上传


/**
 * 初始化分块上传
 * @param  {Object}  params                                     参数对象，必须
 *     @param  {String}  params.Bucket                          Bucket名称，必须
 *     @param  {String}  params.Region                          地域名称，必须
 *     @param  {String}  params.Key                             object名称，必须
 *     @param  {String}  params.UploadId                        object名称，必须
 *     @param  {String}  params.CacheControl                    RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentDisposition              RFC 2616 中定义的文件名称，将作为 Object 元数据保存    ，非必须
 *     @param  {String}  params.ContentEncoding                 RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentType                     RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
 *     @param  {String}  params.Expires                         RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ACL                             允许用户自定义文件权限，非必须
 *     @param  {String}  params.GrantRead                       赋予被授权者读的权限 ，非必须
 *     @param  {String}  params.GrantWrite                      赋予被授权者写的权限 ，非必须
 *     @param  {String}  params.GrantFullControl                赋予被授权者读写权限 ，非必须
 *     @param  {String}  params.StorageClass                    设置Object的存储级别，枚举值：Standard，Standard_IA，Archive，非必须
 *     @param  {String}  params.ServerSideEncryption           支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 * @param  {Function}  callback                                 回调函数，必须
 * @return  {Object}  err                                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                      返回的数据
 */
function multipartInit(params, callback) {

    var self = this;
    // 特殊处理 Cache-Control
    var headers = params.Headers;

    // 特殊处理 Cache-Control、Content-Type
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';

    util.getBodyMd5(params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5), params.Body, function (md5) {
        if (md5) params.Headers['x-cos-meta-md5'] = md5;
        submitRequest.call(self, {
            Action: 'name/cos:InitiateMultipartUpload',
            method: 'POST',
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            action: 'uploads',
            headers: params.Headers,
            qs: params.Query
        }, function (err, data) {
            if (err) return callback(err);
            data = util.clone(data || {});
            if (data && data.InitiateMultipartUploadResult) {
                return callback(null, util.extend(data.InitiateMultipartUploadResult, {
                    statusCode: data.statusCode,
                    headers: data.headers
                }));
            }
            callback(null, data);
        });
    }, params.onHashProgress);
}

/**
 * 分块上传
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         object名称，必须
 *     @param  {File || Blob || String}  params.Body        上传文件对象或字符串
 *     @param  {String} params.ContentLength                RFC 2616 中定义的 HTTP 请求内容长度（字节），非必须
 *     @param  {String} params.Expect                       当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 *     @param  {String} params.ServerSideEncryption         支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {String} params.ContentSha1                  RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验值，非必须
 * @param  {Function}  callback                             回调函数，必须
 *     @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                              返回的数据
 *     @return  {Object}  data.ETag                         返回的文件分块 sha1 值
 */
function multipartUpload(params, callback) {

    var self = this;
    util.getFileSize('multipartUpload', params, function () {
        util.getBodyMd5(self.options.UploadCheckContentMd5, params.Body, function (md5) {
            if (md5) params.Headers['Content-MD5'] = util.binaryBase64(md5);
            submitRequest.call(self, {
                Action: 'name/cos:UploadPart',
                TaskId: params.TaskId,
                method: 'PUT',
                Bucket: params.Bucket,
                Region: params.Region,
                Key: params.Key,
                qs: {
                    partNumber: params['PartNumber'],
                    uploadId: params['UploadId']
                },
                headers: params.Headers,
                onProgress: params.onProgress,
                body: params.Body || null
            }, function (err, data) {
                if (err) return callback(err);
                callback(null, {
                    ETag: util.attr(data.headers, 'etag', ''),
                    statusCode: data.statusCode,
                    headers: data.headers
                });
            });
        });
    });
}

/**
 * 完成分块上传
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {String}  params.Key                     object名称，必须
 *     @param  {Array}   params.Parts                   分块信息列表，必须
 *     @param  {String}  params.Parts[i].PartNumber     块编号，必须
 *     @param  {String}  params.Parts[i].ETag           分块的 sha1 校验值
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              返回的数据
 *     @return  {Object}  data.CompleteMultipartUpload  完成分块上传后的文件信息，包括Location, Bucket, Key 和 ETag
 */
function multipartComplete(params, callback) {
    var self = this;

    var UploadId = params.UploadId;

    var Parts = params['Parts'];

    for (var i = 0, len = Parts.length; i < len; i++) {
        if (Parts[i]['ETag'].indexOf('"') === 0) {
            continue;
        }
        Parts[i]['ETag'] = '"' + Parts[i]['ETag'] + '"';
    }

    var xml = util.json2xml({ CompleteMultipartUpload: { Part: Parts } });
    // CSP/ceph CompleteMultipartUpload 接口 body 写死了限制 1MB，这里醉倒 10000 片时，xml 字符串去掉空格853KB
    xml = xml.replace(/\n\s*/g, '');

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:CompleteMultipartUpload',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        qs: {
            uploadId: UploadId
        },
        body: xml,
        headers: headers
    }, function (err, data) {
        if (err) return callback(err);
        var url = getUrl({
            ForcePathStyle: self.options.ForcePathStyle,
            protocol: self.options.Protocol,
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            object: params.Key,
            isLocation: true
        });
        var res = data.CompleteMultipartUploadResult || {};
        if (res.ProcessResults) {
            if (res && res.ProcessResults) {
                res.UploadResult = {
                    OriginalInfo: {
                        Key: res.Key,
                        Location: url,
                        ETag: res.ETag,
                        ImageInfo: res.ImageInfo
                    },
                    ProcessResults: res.ProcessResults
                };
                delete res.ImageInfo;
                delete res.ProcessResults;
            }
        }
        var result = util.extend(res, {
            Location: url,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 分块上传任务列表查询
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Delimiter                   定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，定义为Common Prefix，然后列出所有Common Prefix。如果没有Prefix，则从路径起点开始，非必须
 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
 *     @param  {String}  params.Prefix                      前缀匹配，用来规定返回的文件前缀地址，非必须
 *     @param  {String}  params.MaxUploads                  单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.KeyMarker                   与upload-id-marker一起使用 </Br>当upload-id-marker未被指定时，ObjectName字母顺序大于key-marker的条目将被列出 </Br>当upload-id-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
 *     @param  {String}  params.UploadIdMarker              与key-marker一起使用 </Br>当key-marker未被指定时，upload-id-marker将被忽略 </Br>当key-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  返回的数据
 *     @return  {Object}  data.ListMultipartUploadsResult   分块上传任务信息
 */
function multipartList(params, callback) {
    var reqParams = {};

    reqParams['delimiter'] = params['Delimiter'];
    reqParams['encoding-type'] = params['EncodingType'];
    reqParams['prefix'] = params['Prefix'] || '';

    reqParams['max-uploads'] = params['MaxUploads'];

    reqParams['key-marker'] = params['KeyMarker'];
    reqParams['upload-id-marker'] = params['UploadIdMarker'];

    reqParams = util.clearKey(reqParams);

    submitRequest.call(this, {
        Action: 'name/cos:ListMultipartUploads',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
        action: 'uploads'
    }, function (err, data) {
        if (err) return callback(err);

        if (data && data.ListMultipartUploadsResult) {
            var Upload = data.ListMultipartUploadsResult.Upload || [];
            Upload = util.isArray(Upload) ? Upload : [Upload];
            data.ListMultipartUploadsResult.Upload = Upload;
        }
        var result = util.clone(data.ListMultipartUploadsResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 上传的分块列表查询
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         object名称，必须
 *     @param  {String}  params.UploadId                    标示本次分块上传的ID，必须
 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
 *     @param  {String}  params.MaxParts                    单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.PartNumberMarker            默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  返回的数据
 *     @return  {Object}  data.ListMultipartUploadsResult   分块信息
 */
function multipartListPart(params, callback) {
    var reqParams = {};

    reqParams['uploadId'] = params['UploadId'];
    reqParams['encoding-type'] = params['EncodingType'];
    reqParams['max-parts'] = params['MaxParts'];
    reqParams['part-number-marker'] = params['PartNumberMarker'];

    submitRequest.call(this, {
        Action: 'name/cos:ListParts',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        qs: reqParams
    }, function (err, data) {
        if (err) return callback(err);
        var ListPartsResult = data.ListPartsResult || {};
        var Part = ListPartsResult.Part || [];
        Part = util.isArray(Part) ? Part : [Part];

        ListPartsResult.Part = Part;
        var result = util.clone(ListPartsResult);
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 抛弃分块上传
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 *     @param  {String}  params.Key         object名称，必须
 *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须
 * @param  {Function}  callback             回调函数，必须
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            返回的数据
 */
function multipartAbort(params, callback) {
    var reqParams = {};

    reqParams['uploadId'] = params['UploadId'];
    submitRequest.call(this, {
        Action: 'name/cos:AbortMultipartUpload',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        qs: reqParams
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers
        });
    });
}

/**
 * 获取签名
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Method  请求方法，必须
 *     @param  {String}  params.Key     object名称，必须
 *     @param  {String}  params.Expires 名超时时间，单位秒，可选
 * @return  {String}  data              返回签名字符串
 */
function getAuth(params) {
    var self = this;
    return util.getAuth({
        SecretId: params.SecretId || this.options.SecretId || '',
        SecretKey: params.SecretKey || this.options.SecretKey || '',
        Method: params.Method,
        Key: params.Key,
        Query: params.Query,
        Headers: params.Headers,
        Expires: params.Expires,
        UseRawKey: self.options.UseRawKey,
        SystemClockOffset: self.options.SystemClockOffset
    });
}

/**
 * 获取文件下载链接
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 *     @param  {String}  params.Key         object名称，必须
 *     @param  {String}  params.Method      请求的方法，可选
 *     @param  {String}  params.Expires     签名超时时间，单位秒，可选
 * @param  {Function}  callback             回调函数，必须
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            返回的数据
 */
function getObjectUrl(params, callback) {
    var self = this;
    var url = getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: params.Protocol || self.options.Protocol,
        domain: params.Domain || self.options.Domain,
        bucket: params.Bucket,
        region: params.Region,
        object: params.Key
    });
    if (params.Sign !== undefined && !params.Sign) {
        callback(null, { Url: url });
        return url;
    }
    var AuthData = getAuthorizationAsync.call(this, {
        Action: (params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject',
        Bucket: params.Bucket || '',
        Region: params.Region || '',
        Method: params.Method || 'get',
        Key: params.Key,
        Expires: params.Expires
    }, function (err, AuthData) {
        if (!callback) return;
        if (err) {
            callback(err);
            return;
        }
        var signUrl = url;
        signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ? AuthData.Authorization : 'sign=' + encodeURIComponent(AuthData.Authorization));
        AuthData.SecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.SecurityToken);
        AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);
        AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);
        AuthData.Token && (signUrl += '&token=' + AuthData.Token);
        setTimeout(function () {
            callback(null, { Url: signUrl });
        });
    });
    if (AuthData) {
        return url + '?' + AuthData.Authorization + (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
    } else {
        return url;
    }
}

/**
 * 私有方法
 */
function decodeAcl(AccessControlPolicy) {
    var result = {
        GrantFullControl: [],
        GrantWrite: [],
        GrantRead: [],
        GrantReadAcp: [],
        GrantWriteAcp: [],
        ACL: ''
    };
    var GrantMap = {
        'FULL_CONTROL': 'GrantFullControl',
        'WRITE': 'GrantWrite',
        'READ': 'GrantRead',
        'READ_ACP': 'GrantReadAcp',
        'WRITE_ACP': 'GrantWriteAcp'
    };
    var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};
    var Grant = AccessControlList.Grant;
    if (Grant) {
        Grant = util.isArray(Grant) ? Grant : [Grant];
    }
    var PublicAcl = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
    Grant && Grant.length && util.each(Grant, function (item) {
        if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || item.Grantee.URI === 'http://cam.qcloud.com/groups/global/AllUsers') {
            PublicAcl[item.Permission] = 1;
        } else if (item.Grantee.ID !== AccessControlPolicy.Owner.ID) {
            result[GrantMap[item.Permission]].push('id="' + item.Grantee.ID + '"');
        }
    });
    if (PublicAcl.FULL_CONTROL || PublicAcl.WRITE && PublicAcl.READ) {
        result.ACL = 'public-read-write';
    } else if (PublicAcl.READ) {
        result.ACL = 'public-read';
    } else {
        result.ACL = 'private';
    }
    util.each(GrantMap, function (item) {
        result[item] = uniqGrant(result[item].join(','));
    });
    return result;
}

// Grant 去重
function uniqGrant(str) {
    var arr = str.split(',');
    var exist = {};
    var i, item;
    for (i = 0; i < arr.length;) {
        item = arr[i].trim();
        if (exist[item]) {
            arr.splice(i, 1);
        } else {
            exist[item] = true;
            arr[i] = item;
            i++;
        }
    }
    return arr.join(',');
}

// 生成操作 url
function getUrl(params) {
    var longBucket = params.bucket;
    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
    var domain = params.domain;
    var region = params.region;
    var object = params.object;
    var protocol = params.protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
    if (!domain) {
        if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {
            domain = '{Region}.myqcloud.com';
        } else {
            domain = 'cos.{Region}.myqcloud.com';
        }
        if (!params.ForcePathStyle) {
            domain = '{Bucket}.' + domain;
        }
    }
    domain = domain.replace(/\{\{AppId\}\}/ig, appId).replace(/\{\{Bucket\}\}/ig, shortBucket).replace(/\{\{Region\}\}/ig, region).replace(/\{\{.*?\}\}/ig, '');
    domain = domain.replace(/\{AppId\}/ig, appId).replace(/\{BucketName\}/ig, shortBucket).replace(/\{Bucket\}/ig, longBucket).replace(/\{Region\}/ig, region).replace(/\{.*?\}/ig, '');
    if (!/^[a-zA-Z]+:\/\//.test(domain)) {
        domain = protocol + '//' + domain;
    }

    // 去掉域名最后的斜杆
    if (domain.slice(-1) === '/') {
        domain = domain.slice(0, -1);
    }
    var url = domain;

    if (params.ForcePathStyle) {
        url += '/' + longBucket;
    }
    url += '/';
    if (object) {
        url += util.camSafeUrlEncode(object).replace(/%2F/g, '/');
    }

    if (params.isLocation) {
        url = url.replace(/^https?:\/\//, '');
    }
    return url;
}

// 异步获取签名
function getAuthorizationAsync(params, callback) {

    var headers = util.clone(params.Headers);
    util.each(headers, function (v, k) {
        (v === '' || ['content-type', 'cache-control', 'expires'].indexOf(k.toLowerCase())) && delete headers[k];
    });

    // 获取凭证的回调，避免用户 callback 多次
    var cbDone = false;
    var cb = function (err, AuthData) {
        if (cbDone) return;
        cbDone = true;
        callback && callback(err, AuthData);
    };

    var self = this;
    var Bucket = params.Bucket || '';
    var Region = params.Region || '';

    // PathName
    var KeyName = params.Key || '';
    if (self.options.ForcePathStyle && Bucket) {
        KeyName = Bucket + '/' + KeyName;
    }
    var Pathname = '/' + KeyName;

    // Action、ResourceKey
    var StsData = {};
    var Scope = params.Scope;
    if (!Scope) {
        var Action = params.Action || '';
        var ResourceKey = params.ResourceKey || params.Key || '';
        Scope = params.Scope || [{
            action: Action,
            bucket: Bucket,
            region: Region,
            prefix: ResourceKey
        }];
    }
    var ScopeKey = util.md5(JSON.stringify(Scope));

    // STS
    self._StsCache = self._StsCache || [];
    (function () {
        var i, AuthData;
        for (i = self._StsCache.length - 1; i >= 0; i--) {
            AuthData = self._StsCache[i];
            var compareTime = Math.round(util.getSkewTime(self.options.SystemClockOffset) / 1000) + 30;
            if (AuthData.StartTime && compareTime < AuthData.StartTime || compareTime >= AuthData.ExpiredTime) {
                self._StsCache.splice(i, 1);
                continue;
            }
            if (!AuthData.ScopeLimit || AuthData.ScopeLimit && AuthData.ScopeKey === ScopeKey) {
                StsData = AuthData;
                break;
            }
        }
    })();

    var calcAuthByTmpKey = function () {
        var KeyTime = StsData.StartTime && StsData.ExpiredTime ? StsData.StartTime + ';' + StsData.ExpiredTime : '';
        var Authorization = util.getAuth({
            SecretId: StsData.TmpSecretId,
            SecretKey: StsData.TmpSecretKey,
            Method: params.Method,
            Pathname: Pathname,
            Query: params.Query,
            Headers: headers,
            Expires: params.Expires,
            UseRawKey: self.options.UseRawKey,
            SystemClockOffset: self.options.SystemClockOffset,
            KeyTime: KeyTime
        });
        var AuthData = {
            Authorization: Authorization,
            SecurityToken: StsData.SecurityToken || StsData.XCosSecurityToken || '',
            Token: StsData.Token || '',
            ClientIP: StsData.ClientIP || '',
            ClientUA: StsData.ClientUA || ''
        };
        cb(null, AuthData);
    };
    var checkAuthError = function (AuthData) {
        if (AuthData.Authorization) {
            // 检查签名格式
            var formatAllow = false;
            var auth = AuthData.Authorization;
            if (auth) {
                if (auth.indexOf(' ') > -1) {
                    formatAllow = false;
                } else if (auth.indexOf('q-sign-algorithm=') > -1 && auth.indexOf('q-ak=') > -1 && auth.indexOf('q-sign-time=') > -1 && auth.indexOf('q-key-time=') > -1 && auth.indexOf('q-url-param-list=') > -1) {
                    formatAllow = true;
                } else {
                    try {
                        auth = atob(auth);
                        if (auth.indexOf('a=') > -1 && auth.indexOf('k=') > -1 && auth.indexOf('t=') > -1 && auth.indexOf('r=') > -1 && auth.indexOf('b=') > -1) {
                            formatAllow = true;
                        }
                    } catch (e) {}
                }
            }
            if (!formatAllow) return util.error(new Error('getAuthorization callback params format error'));
        } else {
            if (!AuthData.TmpSecretId) return util.error(new Error('getAuthorization callback params missing "TmpSecretId"'));
            if (!AuthData.TmpSecretKey) return util.error(new Error('getAuthorization callback params missing "TmpSecretKey"'));
            if (!AuthData.SecurityToken && !AuthData.XCosSecurityToken) return util.error(new Error('getAuthorization callback params missing "SecurityToken"'));
            if (!AuthData.ExpiredTime) return util.error(new Error('getAuthorization callback params missing "ExpiredTime"'));
            if (AuthData.ExpiredTime && AuthData.ExpiredTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params "ExpiredTime" should be 10 digits'));
            if (AuthData.StartTime && AuthData.StartTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params "StartTime" should be 10 StartTime'));
        }
        return false;
    };

    // 先判断是否有临时密钥
    if (StsData.ExpiredTime && StsData.ExpiredTime - util.getSkewTime(self.options.SystemClockOffset) / 1000 > 60) {
        // 如果缓存的临时密钥有效，并还有超过60秒有效期就直接使用
        calcAuthByTmpKey();
    } else if (self.options.getAuthorization) {
        // 外部计算签名或获取临时密钥
        self.options.getAuthorization.call(self, {
            Bucket: Bucket,
            Region: Region,
            Method: params.Method,
            Key: KeyName,
            Pathname: Pathname,
            Query: params.Query,
            Headers: headers,
            Scope: Scope,
            SystemClockOffset: self.options.SystemClockOffset
        }, function (AuthData) {
            if (typeof AuthData === 'string') AuthData = { Authorization: AuthData };
            var AuthError = checkAuthError(AuthData);
            if (AuthError) return cb(AuthError);
            if (AuthData.Authorization) {
                cb(null, AuthData);
            } else {
                StsData = AuthData || {};
                StsData.Scope = Scope;
                StsData.ScopeKey = ScopeKey;
                self._StsCache.push(StsData);
                calcAuthByTmpKey();
            }
        });
    } else if (self.options.getSTS) {
        // 外部获取临时密钥
        self.options.getSTS.call(self, {
            Bucket: Bucket,
            Region: Region
        }, function (data) {
            StsData = data || {};
            StsData.Scope = Scope;
            StsData.ScopeKey = ScopeKey;
            if (!StsData.TmpSecretId) StsData.TmpSecretId = StsData.SecretId;
            if (!StsData.TmpSecretKey) StsData.TmpSecretKey = StsData.SecretKey;
            var AuthError = checkAuthError(StsData);
            if (AuthError) return cb(AuthError);
            self._StsCache.push(StsData);
            calcAuthByTmpKey();
        });
    } else {
        // 内部计算获取签名
        return function () {
            var Authorization = util.getAuth({
                SecretId: params.SecretId || self.options.SecretId,
                SecretKey: params.SecretKey || self.options.SecretKey,
                Method: params.Method,
                Pathname: Pathname,
                Query: params.Query,
                Headers: headers,
                Expires: params.Expires,
                UseRawKey: self.options.UseRawKey,
                SystemClockOffset: self.options.SystemClockOffset
            });
            var AuthData = {
                Authorization: Authorization,
                SecurityToken: self.options.SecurityToken || self.options.XCosSecurityToken
            };
            cb(null, AuthData);
            return AuthData;
        }();
    }
    return '';
}

// 调整时间偏差
function allowRetry(err) {
    var allowRetry = false;
    var isTimeError = false;
    var serverDate = err.headers && (err.headers.date || err.headers.Date) || err.error && err.error.ServerTime;
    try {
        var errorCode = err.error.Code;
        var errorMessage = err.error.Message;
        if (errorCode === 'RequestTimeTooSkewed' || errorCode === 'AccessDenied' && errorMessage === 'Request has expired') {
            isTimeError = true;
        }
    } catch (e) {}
    if (err) {
        if (isTimeError && serverDate) {
            var serverTime = Date.parse(serverDate);
            if (this.options.CorrectClockSkew && Math.abs(util.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {
                console.error('error: Local time is too skewed.');
                this.options.SystemClockOffset = serverTime - Date.now();
                allowRetry = true;
            }
        } else if (Math.floor(err.statusCode / 100) === 5) {
            allowRetry = true;
        }
    }
    return allowRetry;
}

// 获取签名并发起请求
function submitRequest(params, callback) {
    var self = this;

    // 处理 headers
    !params.headers && (params.headers = {});

    // 处理 query
    !params.qs && (params.qs = {});
    params.VersionId && (params.qs.versionId = params.VersionId);
    params.qs = util.clearKey(params.qs);

    // 清理 undefined 和 null 字段
    params.headers && (params.headers = util.clearKey(params.headers));
    params.qs && (params.qs = util.clearKey(params.qs));

    var Query = util.clone(params.qs);
    params.action && (Query[params.action] = '');

    var next = function (tryTimes) {
        var oldClockOffset = self.options.SystemClockOffset;
        getAuthorizationAsync.call(self, {
            Bucket: params.Bucket || '',
            Region: params.Region || '',
            Method: params.method,
            Key: params.Key,
            Query: Query,
            Headers: params.headers,
            Action: params.Action,
            ResourceKey: params.ResourceKey,
            Scope: params.Scope
        }, function (err, AuthData) {
            if (err) {
                callback(err);
                return;
            }
            params.AuthData = AuthData;
            _submitRequest.call(self, params, function (err, data) {
                if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {
                    if (params.headers) {
                        delete params.headers.Authorization;
                        delete params.headers['token'];
                        delete params.headers['clientIP'];
                        delete params.headers['clientUA'];
                        delete params.headers['x-cos-security-token'];
                    }
                    next(tryTimes + 1);
                } else {
                    callback(err, data);
                }
            });
        });
    };
    next(1);
}

// 发起请求
function _submitRequest(params, callback) {
    var self = this;
    var TaskId = params.TaskId;
    if (TaskId && !self._isRunningTask(TaskId)) return;

    var bucket = params.Bucket;
    var region = params.Region;
    var object = params.Key;
    var method = params.method || 'GET';
    var url = params.url;
    var body = params.body;
    var rawBody = params.rawBody;

    // url
    url = url || getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: self.options.Protocol,
        domain: self.options.Domain,
        bucket: bucket,
        region: region,
        object: object
    });
    if (params.action) {
        url = url + '?' + params.action;
    }

    var opt = {
        method: method,
        url: url,
        headers: params.headers,
        qs: params.qs,
        body: body
    };

    // 获取签名
    opt.headers.Authorization = params.AuthData.Authorization;
    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
    params.AuthData.SecurityToken && (opt.headers['x-cos-security-token'] = params.AuthData.SecurityToken);

    // 清理 undefined 和 null 字段
    opt.headers && (opt.headers = util.clearKey(opt.headers));
    opt = util.clearKey(opt);

    // progress
    if (params.onProgress && typeof params.onProgress === 'function') {
        var contentLength = body && (body.size || body.length) || 0;
        opt.onProgress = function (e) {
            if (TaskId && !self._isRunningTask(TaskId)) return;
            var loaded = e ? e.loaded : 0;
            params.onProgress({ loaded: loaded, total: contentLength });
        };
    }
    if (params.onDownloadProgress) {
        opt.onDownloadProgress = params.onDownloadProgress;
    }
    if (params.DataType) {
        opt.dataType = params.DataType;
    }
    if (this.options.Timeout) {
        opt.timeout = this.options.Timeout;
    }

    self.options.ForcePathStyle && (opt.pathStyle = self.options.ForcePathStyle);
    self.emit('before-send', opt);
    var sender = (self.options.Request || REQUEST)(opt, function (r) {
        if (r.error === 'abort') return;

        // 抛出事件，允许修改返回值的 error、statusCode、statusMessage、body
        self.emit('after-receive', r);
        var response = { statusCode: r.statusCode, statusMessage: r.statusMessage, headers: r.headers };
        var err = r.error;
        var body = r.body;

        // 返回内容添加 状态码 和 headers
        var hasReturned;
        var cb = function (err, data) {
            TaskId && self.off('inner-kill-task', killTask);
            if (hasReturned) return;
            hasReturned = true;
            var attrs = {};
            response && response.statusCode && (attrs.statusCode = response.statusCode);
            response && response.headers && (attrs.headers = response.headers);

            if (err) {
                err = util.extend(err || {}, attrs);
                callback(err, null);
            } else {
                data = util.extend(data || {}, attrs);
                callback(null, data);
            }
            sender = null;
        };

        // 请求错误，发生网络错误
        if (err) return cb(util.error(err));

        // 请求返回码不为 200
        var statusCode = response.statusCode;
        var statusSuccess = Math.floor(statusCode / 100) === 2; // 200 202 204 206

        // 不对 body 进行转换，body 直接挂载返回
        if (rawBody && statusSuccess) return cb(null, { body: body });

        // 解析 xml body
        var json;
        try {
            json = body && body.indexOf('<') > -1 && body.indexOf('>') > -1 && util.xml2json(body) || {};
        } catch (e) {
            json = {};
        }

        // 处理返回值
        var xmlError = json && json.Error;
        if (statusSuccess) {
            // 正确返回，状态码 2xx 时，body 不会有 Error
            cb(null, json);
        } else if (xmlError) {
            // 正常返回了 xml body，且有 Error 节点
            cb(util.error(new Error(xmlError.Message), { code: xmlError.Code, error: xmlError }));
        } else if (statusCode) {
            // 有错误的状态码
            cb(util.error(new Error(response.statusMessage), { code: '' + statusCode }));
        } else if (statusCode) {
            // 无状态码，或者获取不到状态码
            cb(util.error(new Error('statusCode error')));
        }
    });

    // kill task
    var killTask = function (data) {
        if (data.TaskId === TaskId) {
            sender && sender.abort && sender.abort();
            self.off('inner-kill-task', killTask);
        }
    };
    TaskId && self.on('inner-kill-task', killTask);
}

var API_MAP = {
    // Bucket 相关方法
    getService: getService, // Bucket
    putBucket: putBucket,
    headBucket: headBucket, // Bucket
    getBucket: getBucket,
    deleteBucket: deleteBucket,
    putBucketAcl: putBucketAcl, // BucketACL
    getBucketAcl: getBucketAcl,
    putBucketCors: putBucketCors, // BucketCors
    getBucketCors: getBucketCors,
    deleteBucketCors: deleteBucketCors,
    getBucketLocation: getBucketLocation, // BucketLocation
    getBucketPolicy: getBucketPolicy, // BucketPolicy
    putBucketPolicy: putBucketPolicy,
    deleteBucketPolicy: deleteBucketPolicy,
    putBucketTagging: putBucketTagging, // BucketTagging
    getBucketTagging: getBucketTagging,
    deleteBucketTagging: deleteBucketTagging,
    putBucketLifecycle: putBucketLifecycle, // BucketLifecycle
    getBucketLifecycle: getBucketLifecycle,
    deleteBucketLifecycle: deleteBucketLifecycle,
    putBucketVersioning: putBucketVersioning, // BucketVersioning
    getBucketVersioning: getBucketVersioning,
    putBucketReplication: putBucketReplication, // BucketReplication
    getBucketReplication: getBucketReplication,
    deleteBucketReplication: deleteBucketReplication,
    putBucketWebsite: putBucketWebsite, // BucketWebsite
    getBucketWebsite: getBucketWebsite,
    deleteBucketWebsite: deleteBucketWebsite,
    putBucketReferer: putBucketReferer, // BucketReferer
    getBucketReferer: getBucketReferer,
    putBucketDomain: putBucketDomain, // BucketDomain
    getBucketDomain: getBucketDomain,
    deleteBucketDomain: deleteBucketDomain,
    putBucketOrigin: putBucketOrigin, // BucketOrigin
    getBucketOrigin: getBucketOrigin,
    deleteBucketOrigin: deleteBucketOrigin,
    putBucketLogging: putBucketLogging, // BucketLogging
    getBucketLogging: getBucketLogging,
    putBucketInventory: putBucketInventory, // BucketInventory
    getBucketInventory: getBucketInventory,
    listBucketInventory: listBucketInventory,
    deleteBucketInventory: deleteBucketInventory,
    putBucketAccelerate: putBucketAccelerate,
    getBucketAccelerate: getBucketAccelerate,

    // Object 相关方法
    getObject: getObject,
    headObject: headObject,
    listObjectVersions: listObjectVersions,
    putObject: putObject,
    deleteObject: deleteObject,
    getObjectAcl: getObjectAcl,
    putObjectAcl: putObjectAcl,
    optionsObject: optionsObject,
    putObjectCopy: putObjectCopy,
    deleteMultipleObject: deleteMultipleObject,
    restoreObject: restoreObject,
    putObjectTagging: putObjectTagging,
    getObjectTagging: getObjectTagging,
    deleteObjectTagging: deleteObjectTagging,
    selectObjectContent: selectObjectContent,

    // 分块上传相关方法
    uploadPartCopy: uploadPartCopy,
    multipartInit: multipartInit,
    multipartUpload: multipartUpload,
    multipartComplete: multipartComplete,
    multipartList: multipartList,
    multipartListPart: multipartListPart,
    multipartAbort: multipartAbort,

    // 工具方法
    getObjectUrl: getObjectUrl,
    getAuth: getAuth
};

function warnOldApi(apiName, fn, proto) {
    util.each(['Cors', 'Acl'], function (suffix) {
        if (apiName.slice(-suffix.length) === suffix) {
            var oldName = apiName.slice(0, -suffix.length) + suffix.toUpperCase();
            var apiFn = util.apiWrapper(apiName, fn);
            var warned = false;
            proto[oldName] = function () {
                !warned && console.warn('warning: cos.' + oldName + ' has been deprecated. Please Use cos.' + apiName + ' instead.');
                warned = true;
                apiFn.apply(this, arguments);
            };
        }
    });
}

module.exports.init = function (COS, task) {
    task.transferToTaskMethod(API_MAP, 'putObject');
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
        warnOldApi(apiName, fn, COS.prototype);
    });
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var stringifyPrimitive = function (v) {
    switch (typeof v) {
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v : '';
        default:
            return '';
    }
};

var queryStringify = function (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
        obj = undefined;
    }
    if (typeof obj === 'object') {
        return Object.keys(obj).map(function (k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
                return obj[k].map(function (v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep);
            } else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
        }).filter(Boolean).join(sep);
    }
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var xhrRes = function (err, xhr, body) {
    var headers = {};
    xhr.getAllResponseHeaders().trim().split('\n').forEach(function (item) {
        if (item) {
            var index = item.indexOf(':');
            var key = item.substr(0, index).trim().toLowerCase();
            var val = item.substr(index + 1).trim();
            headers[key] = val;
        }
    });
    return {
        error: err,
        statusCode: xhr.status,
        statusMessage: xhr.statusText,
        headers: headers,
        body: body
    };
};

var xhrBody = function (xhr, dataType) {
    return !dataType && dataType === 'text' ? xhr.responseText : xhr.response;
};

var request = function (opt, callback) {

    // method
    var method = (opt.method || 'GET').toUpperCase();

    // url、qs
    var url = opt.url;
    if (opt.qs) {
        var qsStr = queryStringify(opt.qs);
        if (qsStr) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + qsStr;
        }
    }

    // 创建 ajax 实例
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = opt.dataType || 'text';

    // 处理 headers
    var headers = opt.headers;
    if (headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key) && key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'user-agent' && key.toLowerCase() !== 'origin' && key.toLowerCase() !== 'host') {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    }

    // onprogress
    if (opt.onProgress && xhr.upload) xhr.upload.onprogress = opt.onProgress;
    if (opt.onDownloadProgress) xhr.onprogress = opt.onDownloadProgress;

    // success 2xx/3xx/4xx
    xhr.onload = function () {
        callback(xhrRes(null, xhr, xhrBody(xhr, opt.dataType)));
    };

    // error 5xx/0 (网络错误、跨域报错、Https connect-src 限制的报错时 statusCode 为 0)
    xhr.onerror = function (err) {
        var body = xhrBody(xhr, opt.dataType);
        if (body) {
            // 5xx
            callback(xhrRes(null, xhr, body));
        } else {
            // 0
            var error = xhr.statusText;
            if (!error && xhr.status === 0) error = new Error('CORS blocked or network error');
            callback(xhrRes(error, xhr, body));
        }
    };

    // send
    xhr.send(opt.body || '');

    // 返回 ajax 实例，用于外部调用 xhr.abort
    return xhr;
};

module.exports = request;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(3);
var Async = __webpack_require__(19);
var EventProxy = __webpack_require__(2).EventProxy;
var util = __webpack_require__(0);

// 文件分块上传全过程，暴露的分块上传接口
function sliceUploadFile(params, callback) {
    var self = this;
    var ep = new EventProxy();
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var Body = params.Body;
    var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;
    var AsyncLimit = params.AsyncLimit;
    var StorageClass = params.StorageClass;
    var ServerSideEncryption = params.ServerSideEncryption;
    var FileSize;

    var onProgress;
    var onHashProgress = params.onHashProgress;

    // 上传过程中出现错误，返回错误
    ep.on('error', function (err) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(err);
    });

    // 上传分块完成，开始 uploadSliceComplete 操作
    ep.on('upload_complete', function (UploadCompleteData) {
        callback(null, UploadCompleteData);
    });

    // 上传分块完成，开始 uploadSliceComplete 操作
    ep.on('upload_slice_complete', function (UploadData) {
        var metaHeaders = {};
        util.each(params.Headers, function (val, k) {
            var shortKey = k.toLowerCase();
            if (shortKey.indexOf('x-cos-meta-') === 0 || shortKey === 'pic-operations') metaHeaders[k] = val;
        });
        uploadSliceComplete.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadData.UploadId,
            SliceList: UploadData.SliceList,
            Headers: metaHeaders
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            session.removeUsing(UploadData.UploadId);
            if (err) {
                onProgress(null, true);
                return ep.emit('error', err);
            }
            session.removeUploadId.call(self, UploadData.UploadId);
            onProgress({ loaded: FileSize, total: FileSize }, true);
            ep.emit('upload_complete', data);
        });
    });

    // 获取 UploadId 完成，开始上传每个分片
    ep.on('get_upload_data_finish', function (UploadData) {

        // 处理 UploadId 缓存
        var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);
        uuid && session.saveUploadId.call(self, uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
        session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

        // 获取 UploadId
        onProgress(null, true); // 任务状态开始 uploading
        uploadSliceList.call(self, {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Body: Body,
            FileSize: FileSize,
            SliceSize: ChunkSize,
            AsyncLimit: AsyncLimit,
            ServerSideEncryption: ServerSideEncryption,
            UploadData: UploadData,
            onProgress: onProgress
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
                onProgress(null, true);
                return ep.emit('error', err);
            }
            ep.emit('upload_slice_complete', data);
        });
    });

    // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
    ep.on('get_file_size_finish', function () {

        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

        if (params.UploadData.UploadId) {
            ep.emit('get_upload_data_finish', params.UploadData);
        } else {
            var _params = util.extend({
                TaskId: TaskId,
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                Headers: params.Headers,
                StorageClass: StorageClass,
                Body: Body,
                FileSize: FileSize,
                SliceSize: ChunkSize,
                onHashProgress: onHashProgress
            }, params);
            getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) return ep.emit('error', err);
                params.UploadData.UploadId = UploadData.UploadId;
                params.UploadData.PartList = UploadData.PartList;
                ep.emit('get_upload_data_finish', params.UploadData);
            });
        }
    });

    // 获取上传文件大小
    FileSize = params.ContentLength;
    delete params.ContentLength;
    !params.Headers && (params.Headers = {});
    util.each(params.Headers, function (item, key) {
        if (key.toLowerCase() === 'content-length') {
            delete params.Headers[key];
        }
    });

    // 控制分片大小
    (function () {
        var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
        var AutoChunkSize = 1024 * 1024;
        for (var i = 0; i < SIZE.length; i++) {
            AutoChunkSize = SIZE[i] * 1024 * 1024;
            if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
        }
        params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
    })();

    // 开始上传
    if (FileSize === 0) {
        params.Body = '';
        params.ContentLength = 0;
        params.SkipTask = true;
        self.putObject(params, callback);
    } else {
        ep.emit('get_file_size_finish');
    }
}

// 获取上传任务的 UploadId
function getUploadIdAndPartList(params, callback) {
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var StorageClass = params.StorageClass;
    var self = this;

    // 计算 ETag
    var ETagMap = {};
    var FileSize = params.FileSize;
    var SliceSize = params.SliceSize;
    var SliceCount = Math.ceil(FileSize / SliceSize);
    var FinishSliceCount = 0;
    var FinishSize = 0;
    var onHashProgress = util.throttleOnProgress.call(self, FileSize, params.onHashProgress);
    var getChunkETag = function (PartNumber, callback) {
        var start = SliceSize * (PartNumber - 1);
        var end = Math.min(start + SliceSize, FileSize);
        var ChunkSize = end - start;

        if (ETagMap[PartNumber]) {
            callback(null, {
                PartNumber: PartNumber,
                ETag: ETagMap[PartNumber],
                Size: ChunkSize
            });
        } else {
            util.fileSlice(params.Body, start, end, false, function (chunkItem) {
                util.getFileMd5(chunkItem, function (err, md5) {
                    if (err) return callback(util.error(err));
                    var ETag = '"' + md5 + '"';
                    ETagMap[PartNumber] = ETag;
                    FinishSliceCount += 1;
                    FinishSize += ChunkSize;
                    onHashProgress({ loaded: FinishSize, total: FileSize });
                    callback(null, {
                        PartNumber: PartNumber,
                        ETag: ETag,
                        Size: ChunkSize
                    });
                });
            });
        }
    };

    // 通过和文件的 md5 对比，判断 UploadId 是否可用
    var isAvailableUploadList = function (PartList, callback) {
        var PartCount = PartList.length;
        // 如果没有分片，通过
        if (PartCount === 0) {
            return callback(null, true);
        }
        // 检查分片数量
        if (PartCount > SliceCount) {
            return callback(null, false);
        }
        // 检查分片大小
        if (PartCount > 1) {
            var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);
            if (PartSliceSize !== SliceSize) {
                return callback(null, false);
            }
        }
        // 逐个分片计算并检查 ETag 是否一致
        var next = function (index) {
            if (index < PartCount) {
                var Part = PartList[index];
                getChunkETag(Part.PartNumber, function (err, chunk) {
                    if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
                        next(index + 1);
                    } else {
                        callback(null, false);
                    }
                });
            } else {
                callback(null, true);
            }
        };
        next(0);
    };

    var ep = new EventProxy();
    ep.on('error', function (errData) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(errData);
    });

    // 存在 UploadId
    ep.on('upload_id_available', function (UploadData) {
        // 转换成 map
        var map = {};
        var list = [];
        util.each(UploadData.PartList, function (item) {
            map[item.PartNumber] = item;
        });
        for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {
            var item = map[PartNumber];
            if (item) {
                item.PartNumber = PartNumber;
                item.Uploaded = true;
            } else {
                item = {
                    PartNumber: PartNumber,
                    ETag: null,
                    Uploaded: false
                };
            }
            list.push(item);
        }
        UploadData.PartList = list;
        callback(null, UploadData);
    });

    // 不存在 UploadId, 初始化生成 UploadId
    ep.on('no_available_upload_id', function () {
        if (!self._isRunningTask(TaskId)) return;
        var _params = util.extend({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: util.clone(params.Headers),
            Query: util.clone(params.Query),
            StorageClass: StorageClass,
            Body: params.Body
        }, params);
        self.multipartInit(_params, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return ep.emit('error', err);
            var UploadId = data.UploadId;
            if (!UploadId) {
                return callback(util.error(new Error('no such upload id')));
            }
            ep.emit('upload_id_available', { UploadId: UploadId, PartList: [] });
        });
    });

    // 如果已存在 UploadId，找一个可以用的 UploadId
    ep.on('has_and_check_upload_id', function (UploadIdList) {
        // 串行地，找一个内容一致的 UploadId
        UploadIdList = UploadIdList.reverse();
        Async.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {
            if (!self._isRunningTask(TaskId)) return;
            // 如果正在上传，跳过
            if (session.using[UploadId]) {
                asyncCallback(); // 检查下一个 UploadId
                return;
            }
            // 判断 UploadId 是否可用
            wholeMultipartListPart.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                UploadId: UploadId
            }, function (err, PartListData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) {
                    session.removeUsing(UploadId);
                    return ep.emit('error', err);
                }
                var PartList = PartListData.PartList;
                PartList.forEach(function (item) {
                    item.PartNumber *= 1;
                    item.Size *= 1;
                    item.ETag = item.ETag || '';
                });
                isAvailableUploadList(PartList, function (err, isAvailable) {
                    if (!self._isRunningTask(TaskId)) return;
                    if (err) return ep.emit('error', err);
                    if (isAvailable) {
                        asyncCallback({
                            UploadId: UploadId,
                            PartList: PartList
                        }); // 马上结束
                    } else {
                        asyncCallback(); // 检查下一个 UploadId
                    }
                });
            });
        }, function (AvailableUploadData) {
            if (!self._isRunningTask(TaskId)) return;
            onHashProgress(null, true);
            if (AvailableUploadData && AvailableUploadData.UploadId) {
                ep.emit('upload_id_available', AvailableUploadData);
            } else {
                ep.emit('no_available_upload_id');
            }
        });
    });

    // 在本地缓存找可用的 UploadId
    ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {
        // 在本地找可用的 UploadId
        var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);
        var LocalUploadIdList = session.getUploadIdList.call(self, uuid);
        if (!uuid || !LocalUploadIdList) {
            ep.emit('has_and_check_upload_id', RemoteUploadIdList);
            return;
        }
        var next = function (index) {
            // 如果本地找不到可用 UploadId，再一个个遍历校验远端
            if (index >= LocalUploadIdList.length) {
                ep.emit('has_and_check_upload_id', RemoteUploadIdList);
                return;
            }
            var UploadId = LocalUploadIdList[index];
            // 如果不在远端 UploadId 列表里，跳过并删除
            if (!util.isInArray(RemoteUploadIdList, UploadId)) {
                session.removeUploadId.call(self, UploadId);
                next(index + 1);
                return;
            }
            // 如果正在上传，跳过
            if (session.using[UploadId]) {
                next(index + 1);
                return;
            }
            // 判断 UploadId 是否存在线上
            wholeMultipartListPart.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                UploadId: UploadId
            }, function (err, PartListData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) {
                    // 如果 UploadId 获取会出错，跳过并删除
                    session.removeUploadId.call(self, UploadId);
                    next(index + 1);
                } else {
                    // 找到可用 UploadId
                    ep.emit('upload_id_available', {
                        UploadId: UploadId,
                        PartList: PartListData.PartList
                    });
                }
            });
        };
        next(0);
    });

    // 获取线上 UploadId 列表
    ep.on('get_remote_upload_id_list', function () {
        // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return ep.emit('error', err);
            // 整理远端 UploadId 列表
            var RemoteUploadIdList = util.filter(data.UploadList, function (item) {
                return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());
            }).reverse().map(function (item) {
                return item.UploadId || item.UploadID;
            });
            if (RemoteUploadIdList.length) {
                ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);
            } else {
                // 远端没有 UploadId，清理缓存的 UploadId
                var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key),
                    LocalUploadIdList;
                if (uuid && (LocalUploadIdList = session.getUploadIdList.call(self, uuid))) {
                    util.each(LocalUploadIdList, function (UploadId) {
                        session.removeUploadId.call(self, UploadId);
                    });
                }
                ep.emit('no_available_upload_id');
            }
        });
    });

    // 开始找可用 UploadId
    ep.emit('get_remote_upload_id_list');
}

// 获取符合条件的全部上传任务 (条件包括 Bucket, Region, Prefix)
function wholeMultipartList(params, callback) {
    var self = this;
    var UploadList = [];
    var sendParams = {
        Bucket: params.Bucket,
        Region: params.Region,
        Prefix: params.Key
    };
    var next = function () {
        self.multipartList(sendParams, function (err, data) {
            if (err) return callback(err);
            UploadList.push.apply(UploadList, data.Upload || []);
            if (data.IsTruncated === 'true') {
                // 列表不完整
                sendParams.KeyMarker = data.NextKeyMarker;
                sendParams.UploadIdMarker = data.NextUploadIdMarker;
                next();
            } else {
                callback(null, { UploadList: UploadList });
            }
        });
    };
    next();
}

// 获取指定上传任务的分块列表
function wholeMultipartListPart(params, callback) {
    var self = this;
    var PartList = [];
    var sendParams = {
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        UploadId: params.UploadId
    };
    var next = function () {
        self.multipartListPart(sendParams, function (err, data) {
            if (err) return callback(err);
            PartList.push.apply(PartList, data.Part || []);
            if (data.IsTruncated === 'true') {
                // 列表不完整
                sendParams.PartNumberMarker = data.NextPartNumberMarker;
                next();
            } else {
                callback(null, { PartList: PartList });
            }
        });
    };
    next();
}

// 上传文件分块，包括
/*
 UploadId (上传任务编号)
 AsyncLimit (并发量)，
 SliceList (上传的分块数组)，
 FilePath (本地文件的位置)，
 SliceSize (文件分块大小)
 FileSize (文件大小)
 onProgress (上传成功之后的回调函数)
 */
function uploadSliceList(params, cb) {
    var self = this;
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadData = params.UploadData;
    var FileSize = params.FileSize;
    var SliceSize = params.SliceSize;
    var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);
    var Body = params.Body;
    var SliceCount = Math.ceil(FileSize / SliceSize);
    var FinishSize = 0;
    var ServerSideEncryption = params.ServerSideEncryption;
    var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {
        if (SliceItem['Uploaded']) {
            FinishSize += SliceItem['PartNumber'] >= SliceCount ? FileSize % SliceSize || SliceSize : SliceSize;
        }
        return !SliceItem['Uploaded'];
    });
    var onProgress = params.onProgress;

    Async.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {
        if (!self._isRunningTask(TaskId)) return;
        var PartNumber = SliceItem['PartNumber'];
        var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
        var preAddSize = 0;
        uploadSliceItem.call(self, {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            SliceSize: SliceSize,
            FileSize: FileSize,
            PartNumber: PartNumber,
            ServerSideEncryption: ServerSideEncryption,
            Body: Body,
            UploadData: UploadData,
            onProgress: function (data) {
                FinishSize += data.loaded - preAddSize;
                preAddSize = data.loaded;
                onProgress({ loaded: FinishSize, total: FileSize });
            }
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (!err && !data.ETag) err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.';
            if (err) {
                FinishSize -= preAddSize;
            } else {
                FinishSize += currentSize - preAddSize;
                SliceItem.ETag = data.ETag;
            }
            onProgress({ loaded: FinishSize, total: FileSize });
            asyncCallback(err || null, data);
        });
    }, function (err) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return cb(err);
        cb(null, {
            UploadId: UploadData.UploadId,
            SliceList: UploadData.PartList
        });
    });
}

// 上传指定分片
function uploadSliceItem(params, callback) {
    var self = this;
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var FileSize = params.FileSize;
    var FileBody = params.Body;
    var PartNumber = params.PartNumber * 1;
    var SliceSize = params.SliceSize;
    var ServerSideEncryption = params.ServerSideEncryption;
    var UploadData = params.UploadData;
    var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;

    var start = SliceSize * (PartNumber - 1);

    var ContentLength = SliceSize;

    var end = start + SliceSize;

    if (end > FileSize) {
        end = FileSize;
        ContentLength = end - start;
    }

    var PartItem = UploadData.PartList[PartNumber - 1];
    Async.retry(ChunkRetryTimes, function (tryCallback) {
        if (!self._isRunningTask(TaskId)) return;
        util.fileSlice(FileBody, start, end, true, function (Body) {
            self.multipartUpload({
                TaskId: TaskId,
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                ContentLength: ContentLength,
                PartNumber: PartNumber,
                UploadId: UploadData.UploadId,
                ServerSideEncryption: ServerSideEncryption,
                Body: Body,
                onProgress: params.onProgress
            }, function (err, data) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) return tryCallback(err);
                PartItem.Uploaded = true;
                return tryCallback(null, data);
            });
        });
    }, function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(err, data);
    });
}

// 完成分块上传
function uploadSliceComplete(params, callback) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadId = params.UploadId;
    var SliceList = params.SliceList;
    var self = this;
    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
    var Headers = params.Headers;
    var Parts = SliceList.map(function (item) {
        return {
            PartNumber: item.PartNumber,
            ETag: item.ETag
        };
    });
    // 完成上传的请求也做重试
    Async.retry(ChunkRetryTimes, function (tryCallback) {
        self.multipartComplete({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadId,
            Parts: Parts,
            Headers: Headers
        }, tryCallback);
    }, function (err, data) {
        callback(err, data);
    });
}

// 抛弃分块上传任务
/*
 AsyncLimit (抛弃上传任务的并发量)，
 UploadId (上传任务的编号，当 Level 为 task 时候需要)
 Level (抛弃分块上传任务的级别，task : 抛弃指定的上传任务，file ： 抛弃指定的文件对应的上传任务，其他值 ：抛弃指定Bucket 的全部上传任务)
 */
function abortUploadTask(params, callback) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadId = params.UploadId;
    var Level = params.Level || 'task';
    var AsyncLimit = params.AsyncLimit;
    var self = this;

    var ep = new EventProxy();

    ep.on('error', function (errData) {
        return callback(errData);
    });

    // 已经获取到需要抛弃的任务列表
    ep.on('get_abort_array', function (AbortArray) {
        abortUploadTaskArray.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: params.Headers,
            AsyncLimit: AsyncLimit,
            AbortArray: AbortArray
        }, callback);
    });

    if (Level === 'bucket') {
        // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region
        }, function (err, data) {
            if (err) return callback(err);
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'file') {
        // 文件级别的任务抛弃，抛弃该文件的全部上传任务
        if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key
        }, function (err, data) {
            if (err) return callback(err);
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'task') {
        // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务
        if (!UploadId) return callback(util.error(new Error('abort_upload_task_no_id')));
        if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
        ep.emit('get_abort_array', [{
            Key: Key,
            UploadId: UploadId
        }]);
    } else {
        return callback(util.error(new Error('abort_unknown_level')));
    }
}

// 批量抛弃分块上传任务
function abortUploadTaskArray(params, callback) {

    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var AbortArray = params.AbortArray;
    var AsyncLimit = params.AsyncLimit || 1;
    var self = this;

    var index = 0;
    var resultList = new Array(AbortArray.length);
    Async.eachLimit(AbortArray, AsyncLimit, function (AbortItem, nextItem) {
        var eachIndex = index;
        if (Key && Key !== AbortItem.Key) {
            resultList[eachIndex] = { error: { KeyNotMatch: true } };
            nextItem(null);
            return;
        }
        var UploadId = AbortItem.UploadId || AbortItem.UploadID;

        self.multipartAbort({
            Bucket: Bucket,
            Region: Region,
            Key: AbortItem.Key,
            Headers: params.Headers,
            UploadId: UploadId
        }, function (err) {
            var task = {
                Bucket: Bucket,
                Region: Region,
                Key: AbortItem.Key,
                UploadId: UploadId
            };
            resultList[eachIndex] = { error: err, task: task };
            nextItem(null);
        });
        index++;
    }, function (err) {
        if (err) return callback(err);

        var successList = [];
        var errorList = [];

        for (var i = 0, len = resultList.length; i < len; i++) {
            var item = resultList[i];
            if (item['task']) {
                if (item['error']) {
                    errorList.push(item['task']);
                } else {
                    successList.push(item['task']);
                }
            }
        }

        return callback(null, {
            successList: successList,
            errorList: errorList
        });
    });
}

// 批量上传文件
function uploadFiles(params, callback) {
    var self = this;

    // 判断多大的文件使用分片上传
    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

    // 汇总返回进度
    var TotalSize = 0;
    var TotalFinish = 0;
    var onTotalProgress = util.throttleOnProgress.call(self, TotalFinish, params.onProgress);

    // 汇总返回回调
    var unFinishCount = params.files.length;
    var _onTotalFileFinish = params.onFileFinish;
    var resultList = Array(unFinishCount);
    var onTotalFileFinish = function (err, data, options) {
        onTotalProgress(null, true);
        _onTotalFileFinish && _onTotalFileFinish(err, data, options);
        resultList[options.Index] = {
            options: options,
            error: err,
            data: data
        };
        if (--unFinishCount <= 0 && callback) {
            callback(null, { files: resultList });
        }
    };

    // 开始处理每个文件
    var taskList = [];
    util.each(params.files, function (fileParams, index) {
        (function () {
            // 对齐 nodejs 缩进

            var Body = fileParams.Body;
            var FileSize = Body.size || Body.length || 0;
            var fileInfo = { Index: index, TaskId: '' };

            // 更新文件总大小
            TotalSize += FileSize;

            // 整理 option，用于返回给回调
            util.each(fileParams, function (v, k) {
                if (typeof v !== 'object' && typeof v !== 'function') {
                    fileInfo[k] = v;
                }
            });

            // 处理单个文件 TaskReady
            var _onTaskReady = fileParams.onTaskReady;
            var onTaskReady = function (tid) {
                fileInfo.TaskId = tid;
                _onTaskReady && _onTaskReady(tid);
            };
            fileParams.onTaskReady = onTaskReady;

            // 处理单个文件进度
            var PreAddSize = 0;
            var _onProgress = fileParams.onProgress;
            var onProgress = function (info) {
                TotalFinish = TotalFinish - PreAddSize + info.loaded;
                PreAddSize = info.loaded;
                _onProgress && _onProgress(info);
                onTotalProgress({ loaded: TotalFinish, total: TotalSize });
            };
            fileParams.onProgress = onProgress;

            // 处理单个文件完成
            var _onFileFinish = fileParams.onFileFinish;
            var onFileFinish = function (err, data) {
                _onFileFinish && _onFileFinish(err, data);
                onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
            };

            // 添加上传任务
            var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';
            taskList.push({
                api: api,
                params: fileParams,
                callback: onFileFinish
            });
        })();
    });
    self._addTasks(taskList);
}

// 分片复制文件
function sliceCopyFile(params, callback) {
    var ep = new EventProxy();

    var self = this;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var CopySource = params.CopySource;
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback(util.error(new Error('CopySource format error')));
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);
    var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;
    CopySliceSize = Math.max(0, CopySliceSize);

    var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;
    var ChunkParallel = this.options.CopyChunkParallelLimit;

    var FinishSize = 0;
    var FileSize;
    var onProgress;

    // 分片复制完成，开始 multipartComplete 操作
    ep.on('copy_slice_complete', function (UploadData) {
        var metaHeaders = {};
        util.each(params.Headers, function (val, k) {
            if (k.toLowerCase().indexOf('x-cos-meta-') === 0) metaHeaders[k] = val;
        });
        var Parts = util.map(UploadData.PartList, function (item) {
            return {
                PartNumber: item.PartNumber,
                ETag: item.ETag
            };
        });
        self.multipartComplete({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadData.UploadId,
            Parts: Parts
        }, function (err, data) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }
            onProgress({ loaded: FileSize, total: FileSize }, true);
            callback(null, data);
        });
    });

    ep.on('get_copy_data_finish', function (UploadData) {
        Async.eachLimit(UploadData.PartList, ChunkParallel, function (SliceItem, asyncCallback) {
            var PartNumber = SliceItem.PartNumber;
            var CopySourceRange = SliceItem.CopySourceRange;
            var currentSize = SliceItem.end - SliceItem.start;

            copySliceItem.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                CopySource: CopySource,
                UploadId: UploadData.UploadId,
                PartNumber: PartNumber,
                CopySourceRange: CopySourceRange
            }, function (err, data) {
                if (err) return asyncCallback(err);
                FinishSize += currentSize;
                onProgress({ loaded: FinishSize, total: FileSize });
                SliceItem.ETag = data.ETag;
                asyncCallback(err || null, data);
            });
        }, function (err) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }

            ep.emit('copy_slice_complete', UploadData);
        });
    });

    ep.on('get_file_size_finish', function (SourceHeaders) {
        // 控制分片大小
        (function () {
            var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
            var AutoChunkSize = 1024 * 1024;
            for (var i = 0; i < SIZE.length; i++) {
                AutoChunkSize = SIZE[i] * 1024 * 1024;
                if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
            }
            params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);

            var ChunkCount = Math.ceil(FileSize / ChunkSize);

            var list = [];
            for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
                var start = (partNumber - 1) * ChunkSize;
                var end = partNumber * ChunkSize < FileSize ? partNumber * ChunkSize - 1 : FileSize - 1;
                var item = {
                    PartNumber: partNumber,
                    start: start,
                    end: end,
                    CopySourceRange: "bytes=" + start + "-" + end
                };
                list.push(item);
            }
            params.PartList = list;
        })();

        var TargetHeader;
        if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {
            TargetHeader = params.Headers;
        } else {
            TargetHeader = SourceHeaders;
        }
        TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];
        TargetHeader = util.clearKey(TargetHeader);
        /**
         * 对于归档存储的对象，如果未恢复副本，则不允许 Copy
         */
        if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE' || SourceHeaders['x-cos-storage-class'] === 'DEEP_ARCHIVE') {
            var restoreHeader = SourceHeaders['x-cos-restore'];
            if (!restoreHeader || restoreHeader === 'ongoing-request="true"') {
                callback(util.error(new Error('Unrestored archive object is not allowed to be copied')));
                return;
            }
        }
        /**
         * 去除一些无用的头部，规避 multipartInit 出错
         * 这些头部通常是在 putObjectCopy 时才使用
         */
        delete TargetHeader['x-cos-copy-source'];
        delete TargetHeader['x-cos-metadata-directive'];
        delete TargetHeader['x-cos-copy-source-If-Modified-Since'];
        delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];
        delete TargetHeader['x-cos-copy-source-If-Match'];
        delete TargetHeader['x-cos-copy-source-If-None-Match'];
        self.multipartInit({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: TargetHeader
        }, function (err, data) {
            if (err) return callback(err);
            params.UploadId = data.UploadId;
            ep.emit('get_copy_data_finish', params);
        });
    });

    // 获取远端复制源文件的大小
    self.headObject({
        Bucket: SourceBucket,
        Region: SourceRegion,
        Key: SourceKey
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                callback(util.error(err, { ErrorStatus: SourceKey + ' Not Exist' }));
            } else {
                callback(err);
            }
            return;
        }

        FileSize = params.FileSize = data.headers['content-length'];
        if (FileSize === undefined || !FileSize) {
            callback(util.error(new Error('get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.')));
            return;
        }

        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

        // 开始上传
        if (FileSize <= CopySliceSize) {
            if (!params.Headers['x-cos-metadata-directive']) {
                params.Headers['x-cos-metadata-directive'] = 'Copy';
            }
            self.putObjectCopy(params, function (err, data) {
                if (err) {
                    onProgress(null, true);
                    return callback(err);
                }
                onProgress({ loaded: FileSize, total: FileSize }, true);
                callback(err, data);
            });
        } else {
            var resHeaders = data.headers;
            var SourceHeaders = {
                'Cache-Control': resHeaders['cache-control'],
                'Content-Disposition': resHeaders['content-disposition'],
                'Content-Encoding': resHeaders['content-encoding'],
                'Content-Type': resHeaders['content-type'],
                'Expires': resHeaders['expires'],
                'x-cos-storage-class': resHeaders['x-cos-storage-class']
            };
            util.each(resHeaders, function (v, k) {
                var metaPrefix = 'x-cos-meta-';
                if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
                    SourceHeaders[k] = v;
                }
            });
            ep.emit('get_file_size_finish', SourceHeaders);
        }
    });
}

// 复制指定分片
function copySliceItem(params, callback) {
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var CopySource = params.CopySource;
    var UploadId = params.UploadId;
    var PartNumber = params.PartNumber * 1;
    var CopySourceRange = params.CopySourceRange;

    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
    var self = this;

    Async.retry(ChunkRetryTimes, function (tryCallback) {
        self.uploadPartCopy({
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            CopySource: CopySource,
            UploadId: UploadId,
            PartNumber: PartNumber,
            CopySourceRange: CopySourceRange
        }, function (err, data) {
            tryCallback(err || null, data);
        });
    }, function (err, data) {
        return callback(err, data);
    });
}

var API_MAP = {
    sliceUploadFile: sliceUploadFile,
    abortUploadTask: abortUploadTask,
    uploadFiles: uploadFiles,
    sliceCopyFile: sliceCopyFile
};

module.exports.init = function (COS, task) {
    task.transferToTaskMethod(API_MAP, 'sliceUploadFile');
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
    });
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var eachLimit = function (arr, limit, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length || limit <= 0) {
        return callback();
    }

    var completed = 0;
    var started = 0;
    var running = 0;

    (function replenish() {
        if (completed >= arr.length) {
            return callback();
        }

        while (running < limit && started < arr.length) {
            started += 1;
            running += 1;
            iterator(arr[started - 1], function (err) {

                if (err) {
                    callback(err);
                    callback = function () {};
                } else {
                    completed += 1;
                    running -= 1;
                    if (completed >= arr.length) {
                        callback();
                    } else {
                        replenish();
                    }
                }
            });
        }
    })();
};

var retry = function (times, iterator, callback) {
    var next = function (index) {
        iterator(function (err, data) {
            if (err && index < times) {
                next(index + 1);
            } else {
                callback(err, data);
            }
        });
    };
    if (times < 1) {
        callback();
    } else {
        next(1);
    }
};

var async = {
    eachLimit: eachLimit,
    retry: retry
};

module.exports = async;

/***/ })
/******/ ]);
});