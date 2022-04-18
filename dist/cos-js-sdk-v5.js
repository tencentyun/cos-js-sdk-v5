(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["COS"] = factory();
	else
		root["COS"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
<<<<<<< HEAD
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

<<<<<<< HEAD
var md5 = __webpack_require__(8);
<<<<<<< HEAD
var CryptoJS = __webpack_require__(11);
var xml2json = __webpack_require__(12);
var json2xml = __webpack_require__(17);
=======
var CryptoJS = __webpack_require__(10);
var xml2json = __webpack_require__(11);
var json2xml = __webpack_require__(14);
var Reporter = __webpack_require__(20);
>>>>>>> upd
=======
var md5 = __webpack_require__(9);
var CryptoJS = __webpack_require__(11);
var xml2json = __webpack_require__(12);
var json2xml = __webpack_require__(15);
<<<<<<< HEAD
var Reporter = __webpack_require__(4);
>>>>>>> upd 暂存
=======
var Tracker = __webpack_require__(22);
>>>>>>> upd

function camSafeUrlEncode(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
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
        return a === b ? 0 : a > b ? 1 : -1;
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
        val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];
        key = lowerCaseKey ? camSafeUrlEncode(key).toLowerCase() : camSafeUrlEncode(key);
        val = camSafeUrlEncode(val) || '';
        list.push(key + '=' + val);
    }
    return list.join('&');
};

// 可以签入签名的headers
var signHeaders = ['content-disposition', 'content-encoding', 'content-length', 'content-md5', 'expect', 'host', 'if-match', 'if-modified-since', 'if-none-match', 'if-unmodified-since', 'origin', 'range', 'response-cache-control', 'response-content-disposition', 'response-content-encoding', 'response-content-language', 'response-content-type', 'response-expires', 'transfer-encoding', 'versionid'];

var getSignHeaderObj = function (headers) {
    var signHeaderObj = {};
    for (var i in headers) {
        var key = i.toLowerCase();
        if (key.indexOf('x-cos-') > -1 || signHeaders.indexOf(key) > -1) {
            signHeaderObj[i] = headers[i];
        }
    }
    return signHeaderObj;
};

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
        exp += Expires * 1 || 0;
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

var getSourceParams = function (source) {
    var parser = this.options.CopySourceParser;
    if (parser) return parser(source);
    var m = source.match(/^([^.]+-\d+)\.cos(v6|-cdc)?\.([^.]+)\.myqcloud\.com\/(.+)$/);
    if (!m) return null;
    return { Bucket: m[1], Region: m[3], Key: m[4] };
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
        if (!ua) return false;
        var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
        var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
        var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0 && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0 && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
        return need;
    };
    return check(typeof navigator !== 'undefined' && navigator.userAgent);
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

        // tracker传递
        var tracker;
        if (params.calledBySdk === 'sliceUploadFile' && self.options.deepTracker) {
            console.log(apiName, params);
            // 分块上传内部方法使用sliceUploadFile的子链路
            tracker = params.tracker.generateSubTracker({ apiName: apiName });
        } else if (['uploadFile', 'uploadFiles'].includes(apiName)) {
            // uploadFile、uploadFiles方法在内部处理，此处不处理
            tracker = null;
        } else {
            var fileSize = typeof params.Body === 'string' ? params.Body.length : params.Body.size || -1;
            tracker = new Tracker({
                bucket: params.Bucket,
                region: params.Region,
                apiName: apiName,
                originApiName: apiName,
                fileKey: params.Key,
                fileSize: fileSize,
                useAccelerate: self.options.UseAccelerate
            });
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
            tracker && tracker.sendEvents();

            callback && callback(formatResult(err), formatResult(data));
        };

        var checkParams = function () {
            if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
                // 判断参数是否完整
                var missingResult = hasMissingParams.call(self, apiName, params);
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
                    if (!self.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default' && params.Region !== 'accelerate') {
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

var isWebWorker = function () {
    // 有限判断 worker 环境的 constructor name 其次用 worker 独有的 FileReaderSync 兜底 详细参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
    return typeof globalThis === 'object' && (globalThis.constructor.name === 'DedicatedWorkerGlobalScope' || globalThis.FileReaderSync);
};

var isNode = function () {
    // 得兜底 web worker 环境中 webpack 用了 process 插件之类的情况
    return typeof window !== 'object' && typeof process === 'object' && "function" === 'function' && !isWebWorker();
};

var isCIHost = function (url) {
    return (/^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(url)
    );
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
    obj2str: obj2str,
    getAuth: getAuth,
    parseSelectPayload: parseSelectPayload,
    getSourceParams: getSourceParams,
    isBrowser: true,
    isNode: isNode,
    isCIHost: isCIHost
};

module.exports = util;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

/**
 * Since we can not rely on `Object.assign` we provide a simplified version
 * that is sufficient for our needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 *
 * @returns {Object} target
 * @throws TypeError if target is not an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */
function assign(target, source) {
	if (target === null || typeof target !== 'object') {
		throw new TypeError('target is not an object')
	}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key]
		}
	}
	return target
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */
var MIME_TYPE = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
})

/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */
	isHTML: function (uri) {
		return uri === NAMESPACE.HTML
	},

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
})

exports.assign = assign;
exports.freeze = freeze;
exports.MIME_TYPE = MIME_TYPE;
exports.NAMESPACE = NAMESPACE;


/***/ }),
/* 2 */
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
=======
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var COS = __webpack_require__(/*! ./src/cos */ \"./src/cos.js\");\nmodule.exports = COS;\n\n//# sourceURL=webpack://COS/./index.js?");

/***/ }),
>>>>>>> upd：webpack升级

/***/ "./lib/beacon.js":
/*!***********************!*\
  !*** ./lib/beacon.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {!function (t, e) {\n   true ? module.exports = e() : undefined;\n}(this, function () {\n  \"use strict\";\n  var t = function (e, r) {\n    return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) {\n      t.__proto__ = e;\n    } || function (t, e) {\n      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);\n    })(e, r);\n  };var e = function () {\n    return (e = Object.assign || function (t) {\n      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;\n    }).apply(this, arguments);\n  };function r(t, e, r, n) {\n    return new (r || (r = Promise))(function (o, i) {\n      function a(t) {\n        try {\n          c(n.next(t));\n        } catch (t) {\n          i(t);\n        }\n      }function s(t) {\n        try {\n          c(n.throw(t));\n        } catch (t) {\n          i(t);\n        }\n      }function c(t) {\n        var e;t.done ? o(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) {\n          t(e);\n        })).then(a, s);\n      }c((n = n.apply(t, e || [])).next());\n    });\n  }function n(t, e) {\n    var r,\n        n,\n        o,\n        i,\n        a = { label: 0, sent: function () {\n        if (1 & o[0]) throw o[1];return o[1];\n      }, trys: [], ops: [] };return i = { next: s(0), throw: s(1), return: s(2) }, \"function\" == typeof Symbol && (i[Symbol.iterator] = function () {\n      return this;\n    }), i;function s(i) {\n      return function (s) {\n        return function (i) {\n          if (r) throw new TypeError(\"Generator is already executing.\");for (; a;) try {\n            if (r = 1, n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done) return o;switch (n = 0, o && (i = [2 & i[0], o.value]), i[0]) {case 0:case 1:\n                o = i;break;case 4:\n                return a.label++, { value: i[1], done: !1 };case 5:\n                a.label++, n = i[1], i = [0];continue;case 7:\n                i = a.ops.pop(), a.trys.pop();continue;default:\n                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {\n                  a = 0;continue;\n                }if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {\n                  a.label = i[1];break;\n                }if (6 === i[0] && a.label < o[1]) {\n                  a.label = o[1], o = i;break;\n                }if (o && a.label < o[2]) {\n                  a.label = o[2], a.ops.push(i);break;\n                }o[2] && a.ops.pop(), a.trys.pop();continue;}i = e.call(t, a);\n          } catch (t) {\n            i = [6, t], n = 0;\n          } finally {\n            r = o = 0;\n          }if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };\n        }([i, s]);\n      };\n    }\n  }var o = \"__BEACON_\",\n      i = \"__BEACON_deviceId\",\n      a = \"last_report_time\",\n      s = \"sending_event_ids\",\n      c = \"beacon_config\",\n      u = \"beacon_config_request_time\",\n      l = function () {\n    function t() {\n      var t = this;this.emit = function (e, r) {\n        if (t) {\n          var n,\n              o = t.__EventsList[e];if (null == o ? void 0 : o.length) {\n            o = o.slice();for (var i = 0; i < o.length; i++) {\n              n = o[i];try {\n                var a = n.callback.apply(t, [r]);if (1 === n.type && t.remove(e, n.callback), !1 === a) break;\n              } catch (t) {\n                throw t;\n              }\n            }\n          }return t;\n        }\n      }, this.__EventsList = {};\n    }return t.prototype.indexOf = function (t, e) {\n      for (var r = 0; r < t.length; r++) if (t[r].callback === e) return r;return -1;\n    }, t.prototype.on = function (t, e, r) {\n      if (void 0 === r && (r = 0), this) {\n        var n = this.__EventsList[t];if (n || (n = this.__EventsList[t] = []), -1 === this.indexOf(n, e)) {\n          var o = { name: t, type: r || 0, callback: e };return n.push(o), this;\n        }return this;\n      }\n    }, t.prototype.one = function (t, e) {\n      this.on(t, e, 1);\n    }, t.prototype.remove = function (t, e) {\n      if (this) {\n        var r = this.__EventsList[t];if (!r) return null;if (!e) {\n          try {\n            delete this.__EventsList[t];\n          } catch (t) {}return null;\n        }if (r.length) {\n          var n = this.indexOf(r, e);r.splice(n, 1);\n        }return this;\n      }\n    }, t;\n  }();function h(t, e) {\n    for (var r = {}, n = 0, o = Object.keys(t); n < o.length; n++) {\n      var i = o[n],\n          a = t[i];if (\"string\" == typeof a) r[f(i)] = f(a);else {\n        if (e) throw new Error(\"value mast be string  !!!!\");r[f(String(i))] = f(String(a));\n      }\n    }return r;\n  }function f(t) {\n    if (\"string\" != typeof t) return t;try {\n      return t.replace(new RegExp(\"\\\\|\", \"g\"), \"%7C\").replace(new RegExp(\"\\\\&\", \"g\"), \"%26\").replace(new RegExp(\"\\\\=\", \"g\"), \"%3D\").replace(new RegExp(\"\\\\+\", \"g\"), \"%2B\");\n    } catch (t) {\n      return \"\";\n    }\n  }function p(t) {\n    return String(t.A99) + String(t.A100);\n  }var d = function () {};var v = function () {\n    function t(t) {\n      var r = this;this.lifeCycle = new l(), this.uploadJobQueue = [], this.additionalParams = {}, this.delayTime = 0, this._normalLogPipeline = function (t) {\n        if (!t || !t.reduce || !t.length) throw new TypeError(\"createPipeline 方法需要传入至少有一个 pipe 的数组\");return 1 === t.length ? function (e, r) {\n          t[0](e, r || d);\n        } : t.reduce(function (t, e) {\n          return function (r, n) {\n            return void 0 === n && (n = d), t(r, function (t) {\n              return null == e ? void 0 : e(t, n);\n            });\n          };\n        });\n      }([function (t) {\n        r.send({ url: r.strategy.getUploadUrl(), data: t, method: \"post\", contentType: \"application/json;charset=UTF-8\" }, function () {\n          var e = r.config.onReportSuccess;\"function\" == typeof e && e(JSON.stringify(t.events));\n        }, function () {\n          var e = r.config.onReportFail;\"function\" == typeof e && e(JSON.stringify(t.events));\n        });\n      }]), function (t, e) {\n        if (!t) throw e instanceof Error ? e : new Error(e);\n      }(Boolean(t.appkey), \"appkey must be initial\"), this.config = e({}, t);\n    }return t.prototype.onUserAction = function (t, e) {\n      this.preReport(t, e, !1);\n    }, t.prototype.onDirectUserAction = function (t, e) {\n      this.preReport(t, e, !0);\n    }, t.prototype.preReport = function (t, e, r) {\n      t ? this.strategy.isEventUpOnOff() && (this.strategy.isBlackEvent(t) || this.strategy.isSampleEvent(t) || this.onReport(t, e, r)) : this.errorReport.reportError(\"602\", \" no eventCode\");\n    }, t.prototype.addAdditionalParams = function (t) {\n      for (var e = 0, r = Object.keys(t); e < r.length; e++) {\n        var n = r[e];this.additionalParams[n] = t[n];\n      }\n    }, t.prototype.setChannelId = function (t) {\n      this.commonInfo.channelID = String(t);\n    }, t.prototype.setOpenId = function (t) {\n      this.commonInfo.openid = String(t);\n    }, t.prototype.setUnionid = function (t) {\n      this.commonInfo.unid = String(t);\n    }, t.prototype.getDeviceId = function () {\n      return this.commonInfo.deviceId;\n    }, t.prototype.getCommonInfo = function () {\n      return this.commonInfo;\n    }, t.prototype.removeSendingId = function (t) {\n      try {\n        var e = JSON.parse(this.storage.getItem(s)),\n            r = e.indexOf(t);-1 != r && (e.splice(r, 1), this.storage.setItem(s, JSON.stringify(e)));\n      } catch (t) {}\n    }, t;\n  }(),\n      y = function () {\n    function t(t, e, r, n) {\n      this.requestParams = {}, this.network = n, this.requestParams.attaid = \"00400014144\", this.requestParams.token = \"6478159937\", this.requestParams.product_id = t.appkey, this.requestParams.platform = r, this.requestParams.uin = e.deviceId, this.requestParams.model = \"\", this.requestParams.os = r, this.requestParams.app_version = t.appVersion, this.requestParams.sdk_version = e.sdkVersion, this.requestParams.error_stack = \"\", this.uploadUrl = t.isOversea ? \"https://htrace.wetvinfo.com/kv\" : \"https://h.trace.qq.com/kv\";\n    }return t.prototype.reportError = function (t, e) {\n      this.requestParams._dc = Math.random(), this.requestParams.error_msg = e, this.requestParams.error_code = t, this.network.get(this.uploadUrl, { params: this.requestParams }).catch(function (t) {});\n    }, t;\n  }(),\n      g = function () {\n    function t(t, e, r, n) {\n      this.strategy = { isEventUpOnOff: !0, httpsUploadUrl: \"https://otheve.beacon.qq.com/analytics/v2_upload\", requestInterval: 30, blacklist: [], samplelist: [] }, this.realSample = {}, this.appkey = \"\", this.appkey = t.appkey, this.storage = r;try {\n        var o = JSON.parse(this.storage.getItem(c));o && this.processData(o);\n      } catch (t) {}t.isOversea && (this.strategy.httpsUploadUrl = \"https://svibeacon.onezapp.com/analytics/v2_upload\"), !t.isOversea && this.needRequestConfig() && this.requestConfig(t.appVersion, e, n);\n    }return t.prototype.requestConfig = function (t, e, r) {\n      var n = this;this.storage.setItem(u, Date.now().toString()), r.post(\"https://oth.str.beacon.qq.com/trpc.beacon.configserver.BeaconConfigService/QueryConfig\", { platformId: \"undefined\" == typeof wx ? \"3\" : \"4\", mainAppKey: this.appkey, appVersion: t, sdkVersion: e.sdkVersion, osVersion: e.userAgent, model: \"\", packageName: \"\", params: { A3: e.deviceId } }).then(function (t) {\n        if (0 == t.data.ret) try {\n          var e = JSON.parse(t.data.beaconConfig);e && (n.processData(e), n.storage.setItem(c, t.data.beaconConfig));\n        } catch (t) {} else n.processData(null), n.storage.setItem(c, \"\");\n      }).catch(function (t) {});\n    }, t.prototype.processData = function (t) {\n      var e, r, n, o, i;this.strategy.isEventUpOnOff = null !== (e = null == t ? void 0 : t.isEventUpOnOff) && void 0 !== e ? e : this.strategy.isEventUpOnOff, this.strategy.httpsUploadUrl = null !== (r = null == t ? void 0 : t.httpsUploadUrl) && void 0 !== r ? r : this.strategy.httpsUploadUrl, this.strategy.requestInterval = null !== (n = null == t ? void 0 : t.requestInterval) && void 0 !== n ? n : this.strategy.requestInterval, this.strategy.blacklist = null !== (o = null == t ? void 0 : t.blacklist) && void 0 !== o ? o : this.strategy.blacklist, this.strategy.samplelist = null !== (i = null == t ? void 0 : t.samplelist) && void 0 !== i ? i : this.strategy.samplelist;for (var a = 0, s = this.strategy.samplelist; a < s.length; a++) {\n        var c = s[a].split(\",\");2 == c.length && (this.realSample[c[0]] = c[1]);\n      }\n    }, t.prototype.needRequestConfig = function () {\n      var t = Number(this.storage.getItem(u));return Date.now() - t > 60 * this.strategy.requestInterval * 1e3;\n    }, t.prototype.getUploadUrl = function () {\n      return this.strategy.httpsUploadUrl + \"?appkey=\" + this.appkey;\n    }, t.prototype.isBlackEvent = function (t) {\n      return -1 != this.strategy.blacklist.indexOf(t);\n    }, t.prototype.isEventUpOnOff = function () {\n      return this.strategy.isEventUpOnOff;\n    }, t.prototype.isSampleEvent = function (t) {\n      return !!Object.prototype.hasOwnProperty.call(this.realSample, t) && this.realSample[t] < Math.floor(Math.random() * Math.floor(1e4));\n    }, t;\n  }(),\n      m = \"session_storage_key\",\n      w = function () {\n    function t(t, e, r) {\n      this.beacon = r, this.storage = t, this.duration = e, this.appkey = r.config.appkey;\n    }return t.prototype.getSession = function () {\n      var t = this.storage.getItem(m);if (!t) return this.createSession();var e = \"\",\n          r = 0;try {\n        var n = JSON.parse(t) || { sessionId: void 0, sessionStart: void 0 };if (!n.sessionId || !n.sessionStart) return this.createSession();var o = Number(this.storage.getItem(a));if (Date.now() - o > this.duration) return this.createSession();e = n.sessionId, r = n.sessionStart;\n      } catch (t) {}return { sessionId: e, sessionStart: r };\n    }, t.prototype.createSession = function () {\n      var t = Date.now(),\n          e = { sessionId: this.appkey + \"_\" + t.toString(), sessionStart: t };this.storage.setItem(m, JSON.stringify(e)), this.storage.setItem(a, t.toString());var r = \"is_new_user\",\n          n = this.storage.getItem(r);return this.beacon.onDirectUserAction(\"rqd_applaunched\", { A21: n ? \"N\" : \"Y\" }), this.storage.setItem(r, JSON.stringify(!1)), e;\n    }, t;\n  }();function b() {\n    var t = navigator.userAgent,\n        e = t.indexOf(\"compatible\") > -1 && t.indexOf(\"MSIE\") > -1,\n        r = t.indexOf(\"Edge\") > -1 && !e,\n        n = t.indexOf(\"Trident\") > -1 && t.indexOf(\"rv:11.0\") > -1;if (e) {\n      new RegExp(\"MSIE (\\\\d+\\\\.\\\\d+);\").test(t);var o = parseFloat(RegExp.$1);return 7 == o ? 7 : 8 == o ? 8 : 9 == o ? 9 : 10 == o ? 10 : 6;\n    }return r ? -2 : n ? 11 : -1;\n  }var S = function () {\n    return (S = Object.assign || function (t) {\n      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;\n    }).apply(this, arguments);\n  };var E,\n      I = function () {\n    function t(t, e) {\n      void 0 === e && (e = {}), this.reportOptions = {}, this.config = t, this.reportOptions = e;\n    }return t.canUseDB = function () {\n      return !!(null === window || void 0 === window ? void 0 : window.indexedDB);\n    }, t.prototype.openDB = function () {\n      var e = this;return new Promise(function (r, n) {\n        if (!t.canUseDB()) return n({ message: \"当前不支持 indexeddb\" });var o = e.config,\n            i = o.name,\n            a = o.version,\n            s = o.stores,\n            c = indexedDB.open(i, a);c.onsuccess = function () {\n          e.db = c.result, r(), S({ result: 1, func: \"open\", params: JSON.stringify(e.config) }, e.reportOptions);\n        }, c.onerror = function (t) {\n          var r, o;n(t), S({ result: 0, func: \"open\", params: JSON.stringify(e.config), error_msg: null === (o = null === (r = t.target) || void 0 === r ? void 0 : r.error) || void 0 === o ? void 0 : o.message }, e.reportOptions);\n        }, c.onupgradeneeded = function () {\n          e.db = c.result;try {\n            null == s || s.forEach(function (t) {\n              e.createStore(t);\n            });\n          } catch (t) {\n            S({ result: 0, func: \"open\", params: JSON.stringify(e.config), error_msg: t.message }, e.reportOptions), n(t);\n          }\n        };\n      });\n    }, t.prototype.useStore = function (t) {\n      return this.storeName = t, this;\n    }, t.prototype.deleteDB = function () {\n      var t = this;return this.closeDB(), new Promise(function (e, r) {\n        var n = indexedDB.deleteDatabase(t.config.name);n.onsuccess = function () {\n          return e();\n        }, n.onerror = r;\n      });\n    }, t.prototype.closeDB = function () {\n      var t;null === (t = this.db) || void 0 === t || t.close(), this.db = null;\n    }, t.prototype.getStoreCount = function () {\n      var t = this;return new Promise(function (e, r) {\n        var n = t.getStore(\"readonly\").count();n.onsuccess = function () {\n          return e(n.result);\n        }, n.onerror = r;\n      });\n    }, t.prototype.clearStore = function () {\n      var t = this;return new Promise(function (e, r) {\n        var n = t.getStore(\"readwrite\").clear();n.onsuccess = function () {\n          return e();\n        }, n.onerror = r;\n      });\n    }, t.prototype.add = function (t, e) {\n      var r = this;return new Promise(function (n, o) {\n        var i = r.getStore(\"readwrite\").add(t, e);i.onsuccess = function () {\n          n(i.result);\n        }, i.onerror = o;\n      });\n    }, t.prototype.put = function (t, e) {\n      var r = this;return new Promise(function (n, o) {\n        var i = r.getStore(\"readwrite\").put(t, e);i.onsuccess = function () {\n          n(i.result);\n        }, i.onerror = o;\n      });\n    }, t.prototype.getStoreAllData = function () {\n      var t = this;return new Promise(function (e, r) {\n        var n = t.getStore(\"readonly\").openCursor(),\n            o = [];n.onsuccess = function () {\n          var t;if (null === (t = n.result) || void 0 === t ? void 0 : t.value) {\n            var r = n.result.value;o.push(r), n.result.continue();\n          } else e(o);\n        }, n.onerror = r;\n      });\n    }, t.prototype.getDataRangeByIndex = function (t, e, r, n, o) {\n      var i = this;return new Promise(function (a, s) {\n        var c = i.getStore().index(t),\n            u = IDBKeyRange.bound(e, r, n, o),\n            l = [],\n            h = c.openCursor(u);h.onsuccess = function () {\n          var t;(null === (t = null == h ? void 0 : h.result) || void 0 === t ? void 0 : t.value) ? (l.push(null == h ? void 0 : h.result.value), null == h || h.result.continue()) : a(l);\n        }, h.onerror = s;\n      });\n    }, t.prototype.removeDataByIndex = function (t, e, r, n, o) {\n      var i = this;return new Promise(function (a, s) {\n        var c = i.getStore(\"readwrite\").index(t),\n            u = IDBKeyRange.bound(e, r, n, o),\n            l = c.openCursor(u),\n            h = 0;l.onsuccess = function (t) {\n          var e = t.target.result;e ? (h += 1, e.delete(), e.continue()) : a(h);\n        }, l.onerror = s;\n      });\n    }, t.prototype.createStore = function (t) {\n      var e = t.name,\n          r = t.indexes,\n          n = void 0 === r ? [] : r,\n          o = t.options;if (this.db) {\n        this.db.objectStoreNames.contains(e) && this.db.deleteObjectStore(e);var i = this.db.createObjectStore(e, o);n.forEach(function (t) {\n          i.createIndex(t.indexName, t.keyPath, t.options);\n        });\n      }\n    }, t.prototype.getStore = function (t) {\n      var e;return void 0 === t && (t = \"readonly\"), null === (e = this.db) || void 0 === e ? void 0 : e.transaction(this.storeName, t).objectStore(this.storeName);\n    }, t;\n  }(),\n      O = \"event_table_v3\",\n      k = \"eventId\",\n      x = function () {\n    function t(t) {\n      this.isReady = !1, this.taskQueue = Promise.resolve(), this.db = new I({ name: \"Beacon_\" + t + \"_V3\", version: 1, stores: [{ name: O, options: { keyPath: k }, indexes: [{ indexName: k, keyPath: k, options: { unique: !0 } }] }] }), this.open();\n    }return t.prototype.getCount = function () {\n      var t = this;return this.readyExec(function () {\n        return t.db.getStoreCount();\n      });\n    }, t.prototype.setItem = function (t, e) {\n      var r = this;return this.readyExec(function () {\n        return r.db.add({ eventId: t, value: e });\n      });\n    }, t.prototype.getItem = function (t) {\n      return r(this, void 0, void 0, function () {\n        var e = this;return n(this, function (r) {\n          return [2, this.readyExec(function () {\n            return e.db.getDataRangeByIndex(k, t, t);\n          })];\n        });\n      });\n    }, t.prototype.removeItem = function (t) {\n      var e = this;return this.readyExec(function () {\n        return e.db.removeDataByIndex(k, t, t);\n      });\n    }, t.prototype.updateItem = function (t, e) {\n      var r = this;return this.readyExec(function () {\n        return r.db.put({ eventId: t, value: e });\n      });\n    }, t.prototype.iterate = function (t) {\n      var e = this;return this.readyExec(function () {\n        return e.db.getStoreAllData().then(function (e) {\n          e.forEach(function (e) {\n            t(e.value);\n          });\n        });\n      });\n    }, t.prototype.open = function () {\n      return r(this, void 0, void 0, function () {\n        var t = this;return n(this, function (e) {\n          switch (e.label) {case 0:\n              return this.taskQueue = this.taskQueue.then(function () {\n                return t.db.openDB();\n              }), [4, this.taskQueue];case 1:\n              return e.sent(), this.isReady = !0, this.db.useStore(O), [2];}\n        });\n      });\n    }, t.prototype.readyExec = function (t) {\n      return this.isReady ? t() : (this.taskQueue = this.taskQueue.then(function () {\n        return t();\n      }), this.taskQueue);\n    }, t;\n  }(),\n      C = function () {\n    function t(t) {\n      this.keyObject = {}, this.storage = t;\n    }return t.prototype.getCount = function () {\n      return this.storage.getStoreCount();\n    }, t.prototype.removeItem = function (t) {\n      this.storage.removeItem(t), delete this.keyObject[t];\n    }, t.prototype.setItem = function (t, e) {\n      var r = JSON.stringify(e);this.storage.setItem(t, r), this.keyObject[t] = e;\n    }, t.prototype.iterate = function (t) {\n      for (var e = Object.keys(this.keyObject), r = 0; r < e.length; r++) {\n        var n = this.storage.getItem(e[r]);t(JSON.parse(n));\n      }\n    }, t;\n  }(),\n      _ = function () {\n    function t(t, e) {\n      var r = this;this.dbEventCount = 0, b() > 0 || !window.indexedDB || /X5Lite/.test(navigator.userAgent) ? (this.store = new C(e), this.dbEventCount = this.store.getCount()) : (this.store = new x(t), this.getCount().then(function (t) {\n        r.dbEventCount = t;\n      }));\n    }return t.prototype.getCount = function () {\n      return r(this, void 0, void 0, function () {\n        return n(this, function (t) {\n          switch (t.label) {case 0:\n              return t.trys.push([0, 2,, 3]), [4, this.store.getCount()];case 1:\n              return [2, t.sent()];case 2:\n              return t.sent(), [2, Promise.reject()];case 3:\n              return [2];}\n        });\n      });\n    }, t.prototype.insertEvent = function (t, e) {\n      return r(this, void 0, void 0, function () {\n        var r, o;return n(this, function (n) {\n          switch (n.label) {case 0:\n              if (this.dbEventCount >= 1e4) return [2, Promise.reject()];r = p(t.mapValue), n.label = 1;case 1:\n              return n.trys.push([1, 3,, 4]), this.dbEventCount++, [4, this.store.setItem(r, t)];case 2:\n              return [2, n.sent()];case 3:\n              return o = n.sent(), e && e(o, t), this.dbEventCount--, [2, Promise.reject()];case 4:\n              return [2];}\n        });\n      });\n    }, t.prototype.getEvents = function () {\n      return r(this, void 0, void 0, function () {\n        var t;return n(this, function (e) {\n          switch (e.label) {case 0:\n              t = [], e.label = 1;case 1:\n              return e.trys.push([1, 3,, 4]), [4, this.store.iterate(function (e) {\n                t.push(e);\n              })];case 2:\n              return e.sent(), [2, Promise.all(t)];case 3:\n              return e.sent(), [2, Promise.all(t)];case 4:\n              return [2];}\n        });\n      });\n    }, t.prototype.removeEvent = function (t) {\n      return r(this, void 0, void 0, function () {\n        var e;return n(this, function (r) {\n          switch (r.label) {case 0:\n              e = p(t.mapValue), r.label = 1;case 1:\n              return r.trys.push([1, 3,, 4]), this.dbEventCount--, [4, this.store.removeItem(e)];case 2:\n              return [2, r.sent()];case 3:\n              return r.sent(), this.dbEventCount++, [2, Promise.reject()];case 4:\n              return [2];}\n        });\n      });\n    }, t;\n  }(),\n      A = function () {\n    return (A = Object.assign || function (t) {\n      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;\n    }).apply(this, arguments);\n  };function P(t) {\n    try {\n      return decodeURIComponent(t.replace(/\\+/g, \" \"));\n    } catch (t) {\n      return null;\n    }\n  }function j(t, e) {\n    var r = [null, void 0, \"\", NaN].includes(t);if (e.isSkipEmpty && r) return null;var n = !e.isSkipEmpty && r ? \"\" : t;try {\n      return e.encode ? encodeURIComponent(n) : n;\n    } catch (t) {\n      return null;\n    }\n  }function D(t) {\n    var e = t.split(\"#\"),\n        r = e[0],\n        n = e[1],\n        o = void 0 === n ? \"\" : n,\n        i = r.split(\"?\"),\n        a = i[0],\n        s = i[1],\n        c = void 0 === s ? \"\" : s,\n        u = P(o),\n        l = Object.create(null);return c.split(\"&\").forEach(function (t) {\n      var e = t.split(\"=\"),\n          r = e[0],\n          n = e[1],\n          o = void 0 === n ? \"\" : n,\n          i = P(r),\n          a = P(o);null === i || null === a || \"\" === i && \"\" === a || l[i] || (l[i] = a);\n    }), { url: a, query: l, hash: u };\n  }function T(t, e) {\n    void 0 === e && (e = { encode: !0, isSkipEmpty: !1 });var r = t.url,\n        n = t.query,\n        o = void 0 === n ? {} : n,\n        i = t.hash,\n        a = r.split(\"#\"),\n        s = a[0],\n        c = a[1],\n        u = void 0 === c ? \"\" : c,\n        l = s.split(\"?\")[0],\n        h = [],\n        f = j(i || u, e),\n        p = A(A({}, D(r).query), o);return Object.keys(p).forEach(function (t) {\n      var r = j(t, e),\n          n = j(p[t], e);null !== r && null !== n && h.push(r + \"=\" + n);\n    }), l + (h.length ? \"?\" + h.join(\"&\") : \"\") + (f ? \"#\" + f : \"\");\n  }function N(t, e) {\n    return new Promise(function (r, n) {\n      if (e && document.querySelectorAll(\"script[data-tag=\" + e + \"]\").length) return r();var o = document.createElement(\"script\"),\n          i = A({ type: \"text/javascript\", charset: \"utf-8\" }, t);Object.keys(i).forEach(function (t) {\n        return function (t, e, r) {\n          if (t) return void 0 === r ? t.getAttribute(e) : t.setAttribute(e, r);\n        }(o, t, i[t]);\n      }), e && (o.dataset.tag = e), o.onload = function () {\n        return r();\n      }, o.onreadystatechange = function () {\n        var t = o.readyState;[\"complete\", \"loaded\"].includes(t) && (o.onreadystatechange = null, r());\n      }, o.onerror = n, document.body.appendChild(o);\n    });\n  }!function (t) {\n    t[t.equal = 0] = \"equal\", t[t.low = -1] = \"low\", t[t.high = 1] = \"high\";\n  }(E || (E = {}));var U = function () {\n    return (U = Object.assign || function (t) {\n      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;\n    }).apply(this, arguments);\n  };function q(t, e, r, n) {\n    return new (r || (r = Promise))(function (o, i) {\n      function a(t) {\n        try {\n          c(n.next(t));\n        } catch (t) {\n          i(t);\n        }\n      }function s(t) {\n        try {\n          c(n.throw(t));\n        } catch (t) {\n          i(t);\n        }\n      }function c(t) {\n        var e;t.done ? o(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) {\n          t(e);\n        })).then(a, s);\n      }c((n = n.apply(t, e || [])).next());\n    });\n  }function R(t, e) {\n    var r,\n        n,\n        o,\n        i,\n        a = { label: 0, sent: function () {\n        if (1 & o[0]) throw o[1];return o[1];\n      }, trys: [], ops: [] };return i = { next: s(0), throw: s(1), return: s(2) }, \"function\" == typeof Symbol && (i[Symbol.iterator] = function () {\n      return this;\n    }), i;function s(i) {\n      return function (s) {\n        return function (i) {\n          if (r) throw new TypeError(\"Generator is already executing.\");for (; a;) try {\n            if (r = 1, n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done) return o;switch (n = 0, o && (i = [2 & i[0], o.value]), i[0]) {case 0:case 1:\n                o = i;break;case 4:\n                return a.label++, { value: i[1], done: !1 };case 5:\n                a.label++, n = i[1], i = [0];continue;case 7:\n                i = a.ops.pop(), a.trys.pop();continue;default:\n                if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {\n                  a = 0;continue;\n                }if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {\n                  a.label = i[1];break;\n                }if (6 === i[0] && a.label < o[1]) {\n                  a.label = o[1], o = i;break;\n                }if (o && a.label < o[2]) {\n                  a.label = o[2], a.ops.push(i);break;\n                }o[2] && a.ops.pop(), a.trys.pop();continue;}i = e.call(t, a);\n          } catch (t) {\n            i = [6, t], n = 0;\n          } finally {\n            r = o = 0;\n          }if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };\n        }([i, s]);\n      };\n    }\n  }var L = function () {\n    function t() {\n      this.interceptors = [];\n    }return t.prototype.use = function (t, e) {\n      return this.interceptors.push({ resolved: t, rejected: e }), this.interceptors.length - 1;\n    }, t.prototype.traverse = function (t, e) {\n      void 0 === e && (e = !1);var r = Promise.resolve(t);return (e ? Array.prototype.reduceRight : Array.prototype.reduce).call(this.interceptors, function (t, e) {\n        if (e) {\n          var n = e.resolved,\n              o = e.rejected;r = r.then(n, o);\n        }return t;\n      }, \"\"), r;\n    }, t.prototype.eject = function (t) {\n      this.interceptors[t] && (this.interceptors[t] = null);\n    }, t;\n  }(),\n      B = { defaults: { timeout: 0, method: \"GET\", mode: \"cors\", redirect: \"follow\", credentials: \"same-origin\" }, headers: { common: { Accept: \"application/json, text/plain, */*\" }, POST: { \"Content-Type\": \"application/x-www-form-urlencoded\" }, PUT: { \"Content-Type\": \"application/x-www-form-urlencoded\" }, PATCH: { \"Content-Type\": \"application/x-www-form-urlencoded\" } }, baseURL: \"\", polyfillUrl: \"https://vm.gtimg.cn/comps/script/fetch.min.js\", interceptors: { request: new L(), response: new L() } },\n      J = /^([a-z][a-z\\d+\\-.]*:)?\\/\\//i,\n      M = Object.prototype.toString;function V(t) {\n    return q(this, void 0, void 0, function () {\n      var e;return R(this, function (r) {\n        switch (r.label) {case 0:\n            if (window.fetch) return [2];r.label = 1;case 1:\n            return r.trys.push([1, 3,, 4]), [4, N({ src: t })];case 2:\n            return r.sent(), [3, 4];case 3:\n            throw e = r.sent(), function (t) {\n              if (\"undefined\" != typeof Image) {\n                var e = new Image(1, 1),\n                    r = U({ attaid: \"0f400053130\", token: \"6552374442\", comps: \"@tencent/ovb-request\", version: \"1.1.18\", ua: navigator.userAgent, url: location.href, _dc: Math.random() }, t),\n                    n = Object.keys(r).map(function (t) {\n                  return t + \"=\" + encodeURIComponent(r[t]);\n                }).join(\"&\");e.src = \"https://h.trace.qq.com/kv?\" + n;\n              }\n            }({ func: \"loadPolyfill\", result: 0, params: t, error_msg: e.message }), new Error(\"加载 polyfill \" + t + \" 失败: \" + e.message);case 4:\n            return [2];}\n      });\n    });\n  }function G(t) {\n    return [\"Accept\", \"Content-Type\"].forEach(function (e) {\n      return r = e, void ((n = t.headers) && Object.keys(n).forEach(function (t) {\n        t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = n[t], delete n[t]);\n      }));var r, n;\n    }), function (t) {\n      if (\"[object Object]\" !== M.call(t)) return !1;var e = Object.getPrototypeOf(t);return null === e || e === Object.prototype;\n    }(t.body) && (t.body = JSON.stringify(t.body), t.headers && (t.headers[\"Content-Type\"] = \"application/json;charset=utf-8\")), t;\n  }function F(t) {\n    return q(this, void 0, void 0, function () {\n      var e, r, n, o, i, a, s, c, u, l, h, f, p, d, v, y, g;return R(this, function (m) {\n        switch (m.label) {case 0:\n            return e = B.baseURL, r = B.defaults, n = B.interceptors, [4, V(B.polyfillUrl)];case 1:\n            return m.sent(), (o = U(U({}, r), t)).headers || (o.headers = function (t) {\n              void 0 === t && (t = \"GET\");var e = B.headers[t] || {};return U(U({}, B.headers.common), e);\n            }(o.method)), G(o), [4, n.request.traverse(o, !0)];case 2:\n            if ((i = m.sent()) instanceof Error) throw i;return i.url = function (t, e) {\n              return !t || J.test(e) ? e : t.replace(/\\/+$/, \"\") + \"/\" + e.replace(/^\\/+/, \"\");\n            }(e, i.url), a = i.url, s = i.timeout, c = i.params, u = i.method, l = [\"GET\", \"DELETE\", \"OPTIONS\", \"HEAD\"].includes(void 0 === u ? \"GET\" : u) && !!c, h = l ? T({ url: a, query: c }) : a, f = [], s && !i.signal && (v = new Promise(function (t) {\n              p = setTimeout(function () {\n                t(new Error(\"timeout\"));\n              }, s);\n            }), f.push(v), d = new AbortController(), i.signal = d.signal), f.push(fetch(h, i).catch(function (t) {\n              return t;\n            })), [4, Promise.race(f)];case 3:\n            return y = m.sent(), p && clearTimeout(p), [4, n.response.traverse(y)];case 4:\n            if ((g = m.sent()) instanceof Error) throw null == d || d.abort(), g;return [2, g];}\n      });\n    });\n  }var Q = function () {\n    function t(t) {\n      B.interceptors.request.use(function (r) {\n        var n = r.url,\n            o = r.method,\n            i = r.body,\n            a = i;if (t.onReportBeforeSend) {\n          var s = t.onReportBeforeSend({ url: n, method: o, data: i ? JSON.parse(i) : null });a = (null == s ? void 0 : s.data) ? JSON.stringify(s.data) : null;\n        }if (\"GET\" !== o && !a) throw new Error(\"No data for sdk, cancel.\");return e(e({}, r), { body: a });\n      });\n    }return t.prototype.get = function (t, o) {\n      return r(this, void 0, void 0, function () {\n        var r, i;return n(this, function (n) {\n          switch (n.label) {case 0:\n              return [4, F(e({ url: t }, o))];case 1:\n              return [4, (r = n.sent()).json()];case 2:\n              return i = n.sent(), [2, Promise.resolve({ data: i, status: r.status, statusText: r.statusText, headers: r.headers })];}\n        });\n      });\n    }, t.prototype.post = function (t, o, i) {\n      return r(this, void 0, void 0, function () {\n        var r, a;return n(this, function (n) {\n          switch (n.label) {case 0:\n              return [4, F(e({ url: t, body: o, method: \"POST\" }, i))];case 1:\n              return [4, (r = n.sent()).json()];case 2:\n              return a = n.sent(), [2, Promise.resolve({ data: a, status: r.status, statusText: r.statusText, headers: r.headers })];}\n        });\n      });\n    }, t;\n  }(),\n      K = function () {\n    function t(t) {\n      this.appkey = t;\n    }return t.prototype.getItem = function (t) {\n      try {\n        return window.localStorage.getItem(this.getStoreKey(t));\n      } catch (t) {\n        return \"\";\n      }\n    }, t.prototype.removeItem = function (t) {\n      try {\n        window.localStorage.removeItem(this.getStoreKey(t));\n      } catch (t) {}\n    }, t.prototype.setItem = function (t, e) {\n      try {\n        window.localStorage.setItem(this.getStoreKey(t), e);\n      } catch (t) {}\n    }, t.prototype.setSessionItem = function (t, e) {\n      try {\n        window.sessionStorage.setItem(this.getStoreKey(t), e);\n      } catch (t) {}\n    }, t.prototype.getSessionItem = function (t) {\n      try {\n        return window.sessionStorage.getItem(this.getStoreKey(t));\n      } catch (t) {\n        return \"\";\n      }\n    }, t.prototype.getStoreKey = function (t) {\n      return o + this.appkey + \"_\" + t;\n    }, t.prototype.createDeviceId = function () {\n      try {\n        var t = window.localStorage.getItem(i);return t || (t = function (t) {\n          for (var e = \"ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789\", r = \"\", n = 0; n < t; n++) r += e.charAt(Math.floor(Math.random() * e.length));return r;\n        }(32), window.localStorage.setItem(i, t)), t;\n      } catch (t) {\n        return \"\";\n      }\n    }, t.prototype.clear = function () {\n      try {\n        for (var t = window.localStorage.length, e = 0; e < t; e++) {\n          var r = window.localStorage.key(e);(null == r ? void 0 : r.substr(0, 9)) == o && window.localStorage.removeItem(r);\n        }\n      } catch (t) {}\n    }, t.prototype.getStoreCount = function () {\n      var t = 0;try {\n        t = window.localStorage.length;\n      } catch (t) {}return t;\n    }, t;\n  }();\"undefined\" != typeof globalThis ? globalThis : \"undefined\" != typeof window ? window : \"undefined\" != typeof global ? global : \"undefined\" != typeof self && self;var W = function (t) {\n    var e = { exports: {} };return t(e, e.exports), e.exports;\n  }(function (t, e) {\n    t.exports = function () {\n      function t(t, e, r, n, o, i, a) {\n        try {\n          var s = t[i](a),\n              c = s.value;\n        } catch (t) {\n          return void r(t);\n        }s.done ? e(c) : Promise.resolve(c).then(n, o);\n      }function e(t, e) {\n        for (var r = 0; r < e.length; r++) {\n          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, \"value\" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);\n        }\n      }var r,\n          n = (function (t) {\n        t = function (t) {\n          var e,\n              r = Object.prototype,\n              n = r.hasOwnProperty,\n              o = \"function\" == typeof Symbol ? Symbol : {},\n              i = o.iterator || \"@@iterator\",\n              a = o.asyncIterator || \"@@asyncIterator\",\n              s = o.toStringTag || \"@@toStringTag\";function c(t, e, r) {\n            return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];\n          }try {\n            c({}, \"\");\n          } catch (r) {\n            c = function (t, e, r) {\n              return t[e] = r;\n            };\n          }function u(t, r, n, o) {\n            var i, a, s, c;return r = r && r.prototype instanceof y ? r : y, r = Object.create(r.prototype), o = new k(o || []), r._invoke = (i = t, a = n, s = o, c = h, function (t, r) {\n              if (c === p) throw new Error(\"Generator is already running\");if (c === d) {\n                if (\"throw\" === t) throw r;return C();\n              }for (s.method = t, s.arg = r;;) {\n                var n = s.delegate;if (n) {\n                  var o = function t(r, n) {\n                    var o;if ((o = r.iterator[n.method]) === e) {\n                      if (n.delegate = null, \"throw\" === n.method) {\n                        if (r.iterator.return && (n.method = \"return\", n.arg = e, t(r, n), \"throw\" === n.method)) return v;n.method = \"throw\", n.arg = new TypeError(\"The iterator does not provide a 'throw' method\");\n                      }return v;\n                    }return \"throw\" === (o = l(o, r.iterator, n.arg)).type ? (n.method = \"throw\", n.arg = o.arg, n.delegate = null, v) : (o = o.arg) ? o.done ? (n[r.resultName] = o.value, n.next = r.nextLoc, \"return\" !== n.method && (n.method = \"next\", n.arg = e), n.delegate = null, v) : o : (n.method = \"throw\", n.arg = new TypeError(\"iterator result is not an object\"), n.delegate = null, v);\n                  }(n, s);if (o) {\n                    if (o === v) continue;return o;\n                  }\n                }if (\"next\" === s.method) s.sent = s._sent = s.arg;else if (\"throw\" === s.method) {\n                  if (c === h) throw c = d, s.arg;s.dispatchException(s.arg);\n                } else \"return\" === s.method && s.abrupt(\"return\", s.arg);if (c = p, \"normal\" === (o = l(i, a, s)).type) {\n                  if (c = s.done ? d : f, o.arg !== v) return { value: o.arg, done: s.done };\n                } else \"throw\" === o.type && (c = d, s.method = \"throw\", s.arg = o.arg);\n              }\n            }), r;\n          }function l(t, e, r) {\n            try {\n              return { type: \"normal\", arg: t.call(e, r) };\n            } catch (t) {\n              return { type: \"throw\", arg: t };\n            }\n          }t.wrap = u;var h = \"suspendedStart\",\n              f = \"suspendedYield\",\n              p = \"executing\",\n              d = \"completed\",\n              v = {};function y() {}function g() {}function m() {}var w = {};w[i] = function () {\n            return this;\n          }, (o = (o = Object.getPrototypeOf) && o(o(x([])))) && o !== r && n.call(o, i) && (w = o);var b = m.prototype = y.prototype = Object.create(w);function S(t) {\n            [\"next\", \"throw\", \"return\"].forEach(function (e) {\n              c(t, e, function (t) {\n                return this._invoke(e, t);\n              });\n            });\n          }function E(t, e) {\n            var r;this._invoke = function (o, i) {\n              function a() {\n                return new e(function (r, a) {\n                  !function r(o, i, a, s) {\n                    if (\"throw\" !== (o = l(t[o], t, i)).type) {\n                      var c = o.arg;return (i = c.value) && \"object\" == typeof i && n.call(i, \"__await\") ? e.resolve(i.__await).then(function (t) {\n                        r(\"next\", t, a, s);\n                      }, function (t) {\n                        r(\"throw\", t, a, s);\n                      }) : e.resolve(i).then(function (t) {\n                        c.value = t, a(c);\n                      }, function (t) {\n                        return r(\"throw\", t, a, s);\n                      });\n                    }s(o.arg);\n                  }(o, i, r, a);\n                });\n              }return r = r ? r.then(a, a) : a();\n            };\n          }function I(t) {\n            var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);\n          }function O(t) {\n            var e = t.completion || {};e.type = \"normal\", delete e.arg, t.completion = e;\n          }function k(t) {\n            this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(I, this), this.reset(!0);\n          }function x(t) {\n            if (t) {\n              if (r = t[i]) return r.call(t);if (\"function\" == typeof t.next) return t;if (!isNaN(t.length)) {\n                var r,\n                    o = -1;return (r = function r() {\n                  for (; ++o < t.length;) if (n.call(t, o)) return r.value = t[o], r.done = !1, r;return r.value = e, r.done = !0, r;\n                }).next = r;\n              }\n            }return { next: C };\n          }function C() {\n            return { value: e, done: !0 };\n          }return ((g.prototype = b.constructor = m).constructor = g).displayName = c(m, s, \"GeneratorFunction\"), t.isGeneratorFunction = function (t) {\n            return !!(t = \"function\" == typeof t && t.constructor) && (t === g || \"GeneratorFunction\" === (t.displayName || t.name));\n          }, t.mark = function (t) {\n            return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, c(t, s, \"GeneratorFunction\")), t.prototype = Object.create(b), t;\n          }, t.awrap = function (t) {\n            return { __await: t };\n          }, S(E.prototype), E.prototype[a] = function () {\n            return this;\n          }, t.AsyncIterator = E, t.async = function (e, r, n, o, i) {\n            void 0 === i && (i = Promise);var a = new E(u(e, r, n, o), i);return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {\n              return t.done ? t.value : a.next();\n            });\n          }, S(b), c(b, s, \"Generator\"), b[i] = function () {\n            return this;\n          }, b.toString = function () {\n            return \"[object Generator]\";\n          }, t.keys = function (t) {\n            var e,\n                r = [];for (e in t) r.push(e);return r.reverse(), function e() {\n              for (; r.length;) {\n                var n = r.pop();if (n in t) return e.value = n, e.done = !1, e;\n              }return e.done = !0, e;\n            };\n          }, t.values = x, k.prototype = { constructor: k, reset: function (t) {\n              if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = e, this.tryEntries.forEach(O), !t) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);\n            }, stop: function () {\n              this.done = !0;var t = this.tryEntries[0].completion;if (\"throw\" === t.type) throw t.arg;return this.rval;\n            }, dispatchException: function (t) {\n              if (this.done) throw t;var r = this;function o(n, o) {\n                return s.type = \"throw\", s.arg = t, r.next = n, o && (r.method = \"next\", r.arg = e), !!o;\n              }for (var i = this.tryEntries.length - 1; 0 <= i; --i) {\n                var a = this.tryEntries[i],\n                    s = a.completion;if (\"root\" === a.tryLoc) return o(\"end\");if (a.tryLoc <= this.prev) {\n                  var c = n.call(a, \"catchLoc\"),\n                      u = n.call(a, \"finallyLoc\");if (c && u) {\n                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);if (this.prev < a.finallyLoc) return o(a.finallyLoc);\n                  } else if (c) {\n                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);\n                  } else {\n                    if (!u) throw new Error(\"try statement without catch or finally\");if (this.prev < a.finallyLoc) return o(a.finallyLoc);\n                  }\n                }\n              }\n            }, abrupt: function (t, e) {\n              for (var r = this.tryEntries.length - 1; 0 <= r; --r) {\n                var o = this.tryEntries[r];if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) {\n                  var i = o;break;\n                }\n              }var a = (i = i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc ? null : i) ? i.completion : {};return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, v) : this.complete(a);\n            }, complete: function (t, e) {\n              if (\"throw\" === t.type) throw t.arg;return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), v;\n            }, finish: function (t) {\n              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {\n                var r = this.tryEntries[e];if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), v;\n              }\n            }, catch: function (t) {\n              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {\n                var r = this.tryEntries[e];if (r.tryLoc === t) {\n                  var n,\n                      o = r.completion;return \"throw\" === o.type && (n = o.arg, O(r)), n;\n                }\n              }throw new Error(\"illegal catch attempt\");\n            }, delegateYield: function (t, r, n) {\n              return this.delegate = { iterator: x(t), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = e), v;\n            } }, t;\n        }(t.exports);try {\n          regeneratorRuntime = t;\n        } catch (e) {\n          Function(\"r\", \"regeneratorRuntime = r\")(t);\n        }\n      }(r = { exports: {} }), r.exports);return function () {\n        function r(t) {\n          !function (t, e) {\n            if (!(t instanceof e)) throw new TypeError(\"Cannot call a class as a function\");\n          }(this, r), this.version = \"1.0.0\";var e = Array.prototype.map,\n              n = Array.prototype.forEach;t && (this.hasher = t), this.each = function (t, e, r) {\n            if (null != t) if (n && t.forEach === n) t.forEach(e, r);else if (t.length === +t.length) {\n              for (var o = 0, i = t.length; o < i; o++) if (e.call(r, t[o], o, t) === {}) return;\n            } else for (var a in t) if (t.hasOwnProperty(a) && e.call(r, t[a], a, t) === {}) return;\n          }, this.map = function (t, r, n) {\n            var o = [];return null == t ? o : e && t.map === e ? t.map(r, n) : (this.each(t, function (t, e, i) {\n              o[o.length] = r.call(n, t, e, i);\n            }), o);\n          };\n        }var o, i, a, s;return o = r, (i = [{ key: \"getQimei36\", value: function (t, e) {\n            var r = this;this.getHid().then(function (n) {\n              var o = \"3BJr\" + t.substring(0, 2) + (n && n.substring(3, 7)),\n                  i = new XMLHttpRequest();i.open(\"POST\", \"https://snowflake.qq.com/ola/h5\", !0), i.setRequestHeader(\"Content-Type\", \"application/json\"), i.onreadystatechange = function () {\n                if (i.readyState == XMLHttpRequest.DONE && 200 == i.status) try {\n                  e && e(JSON.parse(i.responseText));\n                } catch (t) {\n                  e(null);\n                }\n              }, i.send(JSON.stringify({ appKey: t, hid: n, sign: o, version: r.version }));\n            });\n          } }, { key: \"getHid\", value: (a = n.mark(function t() {\n            var e, r;return n.wrap(function (t) {\n              for (;;) switch (t.prev = t.next) {case 0:\n                  return (e = []).push((n = void 0, (n = [Math.floor(window.screen.width * window.devicePixelRatio), Math.floor(window.screen.height * window.devicePixelRatio)]).sort().reverse(), n.join(\"x\"))), e.push((n = void 0, (n = [Math.floor(window.screen.availWidth * window.devicePixelRatio), Math.floor(window.screen.availHeight * window.devicePixelRatio)]).sort().reverse(), n.join(\"x\"))), e.push(navigator.deviceMemory), e.push(!!window.sessionStorage), e.push(!!window.indexedDB), e.push(navigator.productSub), e.push(navigator.hardwareConcurrency), e.push(this.getWebglVendorAndRenderer()), e.push(new Date().getTimezoneOffset()), t.next = 12, this.getFactor();case 12:\n                  if (r = t.sent, e.push(r), this.hasher) return t.abrupt(\"return\", this.hasher(e.join(\"###\"), 31));t.next = 18;break;case 18:\n                  return t.abrupt(\"return\", this.x64hash128(e.join(\"###\"), 31));case 19:case \"end\":\n                  return t.stop();}var n;\n            }, t, this);\n          }), s = function () {\n            var e = this,\n                r = arguments;return new Promise(function (n, o) {\n              var i = a.apply(e, r);function s(e) {\n                t(i, n, o, s, c, \"next\", e);\n              }function c(e) {\n                t(i, n, o, s, c, \"throw\", e);\n              }s(void 0);\n            });\n          }, function () {\n            return s.apply(this, arguments);\n          }) }, { key: \"getUserAgent\", value: function () {\n            return navigator.userAgent;\n          } }, { key: \"getNative\", value: function () {\n            var t = this;this.getHid().then(function (e) {\n              JSInterface.callback(t.version, e, t.getUserAgent());\n            });\n          } }, { key: \"getWebglVendorAndRenderer\", value: function () {\n            try {\n              var t = function () {\n                var t = document.createElement(\"canvas\"),\n                    e = null;try {\n                  e = t.getContext(\"webgl\") || t.getContext(\"experimental-webgl\");\n                } catch (t) {}return e || null;\n              }(),\n                  e = t.getExtension(\"WEBGL_debug_renderer_info\"),\n                  r = [t.getParameter(e.UNMASKED_VENDOR_WEBGL), t.getParameter(e.UNMASKED_RENDERER_WEBGL)].join(\"~\"),\n                  n = t.getExtension(\"WEBGL_lose_context\");return null != n && n.loseContext(), r;\n            } catch (t) {\n              return null;\n            }\n          } }, { key: \"getFactor\", value: function () {\n            return new Promise(function (t, e) {\n              var r = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;r ? function () {\n                var e = new r({ iceServers: [] });e.createDataChannel(\"\", { reliable: !1 }), e.onicecandidate = function (t) {\n                  t.candidate && i(\"a=\".concat(t.candidate.candidate));\n                }, e.createOffer(function (t) {\n                  i(t.sdp), e.setLocalDescription(t);\n                }, function (t) {});var n = Object.create(null);function o(e) {\n                  if (!(e in n)) {\n                    n[e] = !0;for (var r = Object.keys(n).filter(function (t) {\n                      return n[t];\n                    }), o = 0; o < r.length; o++) 16 < r[o].length && (r.splice(o, 1), o--);t(r[0]);\n                  }\n                }function i(t) {\n                  (0 < arguments.length && void 0 !== t ? t : \"\").split(\"\\r\\n\").forEach(function (t, e, r) {\n                    var n, i;~t.indexOf(\"a=candidate\") ? (i = (n = t.split(\" \"))[4], \"host\" === n[7] && o(i)) : ~t.indexOf(\"c=\") && o(t.split(\" \")[2]);\n                  });\n                }n[\"0.0.0.0\"] = !1;\n              }() : t(null);\n            });\n          } }, { key: \"x64hash128\", value: function (t, e) {\n            for (var r = function (t, e) {\n              t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];var r = [0, 0, 0, 0];return r[3] += t[3] + e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] + e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] + e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] + e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];\n            }, n = function (t, e) {\n              t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];var r = [0, 0, 0, 0];return r[3] += t[3] * e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] * e[3], r[1] += r[2] >>> 16, r[2] &= 65535, r[2] += t[3] * e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] * e[3], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[2] * e[2], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[3] * e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];\n            }, o = function (t, e) {\n              return 32 == (e %= 64) ? [t[1], t[0]] : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e | t[0] >>> 32 - e] : [t[1] << (e -= 32) | t[0] >>> 32 - e, t[0] << e | t[1] >>> 32 - e];\n            }, i = function (t, e) {\n              return 0 == (e %= 64) ? t : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e] : [t[1] << e - 32, 0];\n            }, a = function (t, e) {\n              return [t[0] ^ e[0], t[1] ^ e[1]];\n            }, s = function (t) {\n              return t = a(t, [0, t[0] >>> 1]), t = n(t, [4283543511, 3981806797]), t = a(t, [0, t[0] >>> 1]), t = n(t, [3301882366, 444984403]), a(t, [0, t[0] >>> 1]);\n            }, c = (t = t || \"\").length % 16, u = t.length - c, l = [0, e = e || 0], h = [0, e], f = [0, 0], p = [0, 0], d = [2277735313, 289559509], v = [1291169091, 658871167], y = 0; y < u; y += 16) f = [255 & t.charCodeAt(y + 4) | (255 & t.charCodeAt(y + 5)) << 8 | (255 & t.charCodeAt(y + 6)) << 16 | (255 & t.charCodeAt(y + 7)) << 24, 255 & t.charCodeAt(y) | (255 & t.charCodeAt(y + 1)) << 8 | (255 & t.charCodeAt(y + 2)) << 16 | (255 & t.charCodeAt(y + 3)) << 24], p = [255 & t.charCodeAt(y + 12) | (255 & t.charCodeAt(y + 13)) << 8 | (255 & t.charCodeAt(y + 14)) << 16 | (255 & t.charCodeAt(y + 15)) << 24, 255 & t.charCodeAt(y + 8) | (255 & t.charCodeAt(y + 9)) << 8 | (255 & t.charCodeAt(y + 10)) << 16 | (255 & t.charCodeAt(y + 11)) << 24], f = o(f = n(f, d), 31), f = n(f, v), l = r(l = o(l = a(l, f), 27), h), l = r(n(l, [0, 5]), [0, 1390208809]), p = o(p = n(p, v), 33), p = n(p, d), h = r(h = o(h = a(h, p), 31), l), h = r(n(h, [0, 5]), [0, 944331445]);switch (f = [0, 0], p = [0, 0], c) {case 15:\n                p = a(p, i([0, t.charCodeAt(y + 14)], 48));case 14:\n                p = a(p, i([0, t.charCodeAt(y + 13)], 40));case 13:\n                p = a(p, i([0, t.charCodeAt(y + 12)], 32));case 12:\n                p = a(p, i([0, t.charCodeAt(y + 11)], 24));case 11:\n                p = a(p, i([0, t.charCodeAt(y + 10)], 16));case 10:\n                p = a(p, i([0, t.charCodeAt(y + 9)], 8));case 9:\n                p = a(p, [0, t.charCodeAt(y + 8)]), p = o(p = n(p, v), 33), p = n(p, d), h = a(h, p);case 8:\n                f = a(f, i([0, t.charCodeAt(y + 7)], 56));case 7:\n                f = a(f, i([0, t.charCodeAt(y + 6)], 48));case 6:\n                f = a(f, i([0, t.charCodeAt(y + 5)], 40));case 5:\n                f = a(f, i([0, t.charCodeAt(y + 4)], 32));case 4:\n                f = a(f, i([0, t.charCodeAt(y + 3)], 24));case 3:\n                f = a(f, i([0, t.charCodeAt(y + 2)], 16));case 2:\n                f = a(f, i([0, t.charCodeAt(y + 1)], 8));case 1:\n                f = a(f, [t.charCodeAt(y)]), f = o(f = n(f, d), 31), f = n(f, v), l = a(l, f);}return l = a(l, [0, t.length]), h = r(h = a(h, [0, t.length]), l = r(l, h)), l = s(l), h = r(h = s(h), l = r(l, h)), (\"00000000\" + (l[0] >>> 0).toString(16)).slice(-8) + (\"00000000\" + (l[1] >>> 0).toString(16)).slice(-8) + (\"00000000\" + (h[0] >>> 0).toString(16)).slice(-8) + (\"00000000\" + (h[1] >>> 0).toString(16)).slice(-8);\n          } }]) && e(o.prototype, i), r;\n      }();\n    }();\n  }),\n      H = \"logid_start\",\n      z = \"4.5.6-web\";return function (r) {\n    function n(t) {\n      var e = r.call(this, t) || this;e.qimei36 = \"\", e.uselessCycleTaskNum = 0, e.underWeakNet = !1, e.send = function (t, r, n) {\n        e.storage.setItem(a, Date.now().toString()), e.network.post(e.uploadUrl || e.strategy.getUploadUrl(), t.data).then(function (n) {\n          var o;100 == (null === (o = null == n ? void 0 : n.data) || void 0 === o ? void 0 : o.result) ? e.delayTime = 1e3 * n.data.delayTime : e.delayTime = 0, r && r(t.data), t.data.events.forEach(function (t) {\n            e.store.removeEvent(t).then(function () {\n              e.removeSendingId(p(t.mapValue));\n            });\n          }), e.doCustomCycleTask();\n        }).catch(function (r) {\n          var o = t.data.events;e.errorReport.reportError(r.code ? r.code.toString() : \"600\", r.message), n && n(t.data);var i = JSON.parse(e.storage.getItem(s));o.forEach(function (t) {\n            i && -1 != i.indexOf(p(t)) && e.store.insertEvent(t, function (t, r) {\n              t && e.errorReport.reportError(\"604\", \"insertEvent fail!\");\n            }), e.removeSendingId(p(t));\n          }), e.monitorUploadFailed();\n        });\n      };var n,\n          o,\n          i = b();return e.isUnderIE8 = i > 0 && i < 8, e.isUnderIE8 || (e.isUnderIE = i > 0, t.needInitQimei && e.initQimei(t.appkey), e.network = new Q(t), e.storage = new K(t.appkey), e.initCommonInfo(t), e.store = new _(t.appkey, e.storage), e.errorReport = new y(e.config, e.commonInfo, \"web\", e.network), e.strategy = new g(e.config, e.commonInfo, e.storage, e.network), e.logidStartTime = e.storage.getItem(H), e.logidStartTime || (e.logidStartTime = Date.now().toString(), e.storage.setItem(H, e.logidStartTime)), n = e.logidStartTime, o = Date.now() - Number.parseFloat(n), Math.floor(o / 864e5) >= 365 && e.storage.clear(), e.initSession(t), e.onDirectUserAction(\"rqd_js_init\", {}), setTimeout(function () {\n        return e.lifeCycle.emit(\"init\");\n      }, 0), e.initDelayTime = t.delay ? t.delay : 1e3, e.cycleTask(e.initDelayTime)), e;\n    }return function (e, r) {\n      if (\"function\" != typeof r && null !== r) throw new TypeError(\"Class extends value \" + String(r) + \" is not a constructor or null\");function n() {\n        this.constructor = e;\n      }t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n());\n    }(n, r), n.prototype.initQimei = function (t) {\n      var e = this;new W().getQimei36(t, function (t) {\n        e.qimei36 = t.q36;\n      });\n    }, n.prototype.initSession = function (t) {\n      var e = 18e5;t.sessionDuration && t.sessionDuration > 3e4 && (e = t.sessionDuration), this.beaconSession = new w(this.storage, e, this);\n    }, n.prototype.initCommonInfo = function (t) {\n      var e = Number(this.storage.getItem(a));try {\n        var r = JSON.parse(this.storage.getItem(s));(Date.now() - e > 3e4 || !r) && this.storage.setItem(s, JSON.stringify([]));\n      } catch (t) {}t.uploadUrl && (this.uploadUrl = t.uploadUrl + \"?appkey=\" + t.appkey);var n = [window.screen.width, window.screen.height];window.devicePixelRatio && n.push(window.devicePixelRatio), this.commonInfo = { deviceId: this.storage.createDeviceId(), language: navigator && navigator.language || \"zh_CN\", query: window.location.search, userAgent: navigator.userAgent, pixel: n.join(\"*\"), channelID: t.channelID ? String(t.channelID) : \"\", openid: t.openid ? String(t.openid) : \"\", unid: t.unionid ? String(t.unionid) : \"\", sdkVersion: z }, this.config.appVersion = t.versionCode ? String(t.versionCode) : \"\", this.config.strictMode = t.strictMode;\n    }, n.prototype.cycleTask = function (t) {\n      var e = this;this.intervalID = window.setInterval(function () {\n        e.store.getEvents().then(function (t) {\n          var r = [],\n              n = JSON.parse(e.storage.getItem(s));n || (n = []), t && t.forEach(function (t) {\n            var e = p(t.mapValue);-1 == n.indexOf(e) && (r.push(t), n.push(e));\n          }), 0 != r.length && (e.storage.setItem(s, JSON.stringify(n)), e._normalLogPipeline(e.assembleData(r)));\n        }).catch(function (t) {});\n      }, t);\n    }, n.prototype.onReport = function (t, e, r) {\n      var n = this;if (this.isUnderIE8) this.errorReport.reportError(\"601\", \"UnderIE8\");else {\n        var o = this.generateData(t, e, r);if (r && 0 == this.delayTime && !this.underWeakNet) this._normalLogPipeline(this.assembleData(o));else {\n          var i = o.shift();i && this.store.insertEvent(i, function (t) {\n            t && n.errorReport.reportError(\"604\", \"insertEvent fail!\");\n          }).catch(function (t) {\n            n._normalLogPipeline(n.assembleData(o));\n          });\n        }\n      }\n    }, n.prototype.onSendBeacon = function (t, e) {\n      if (this.isUnderIE) this.errorReport.reportError(\"605\", \"UnderIE\");else {\n        var r = this.assembleData(this.generateData(t, e, !0));\"function\" == typeof navigator.sendBeacon && navigator.sendBeacon(this.uploadUrl || this.strategy.getUploadUrl(), JSON.stringify(r));\n      }\n    }, n.prototype.generateData = function (t, r, n) {\n      var o = [],\n          i = \"4.5.6-web_\" + (n ? \"direct_log_id\" : \"normal_log_id\"),\n          a = Number(this.storage.getItem(i));return a = a || 1, r = e(e({}, r), { A99: n ? \"Y\" : \"N\", A100: a.toString(), A72: z, A88: this.logidStartTime }), a++, this.storage.setItem(i, a.toString()), o.push({ eventCode: t, eventTime: Date.now().toString(), mapValue: h(r, this.config.strictMode) }), o;\n    }, n.prototype.assembleData = function (t) {\n      var r = this.beaconSession.getSession();return { appVersion: this.config.appVersion ? f(this.config.appVersion) : \"\", sdkId: \"js\", sdkVersion: z, mainAppKey: this.config.appkey, platformId: 3, common: h(e(e({}, this.additionalParams), { A2: this.commonInfo.deviceId, A8: this.commonInfo.openid, A12: this.commonInfo.language, A17: this.commonInfo.pixel, A23: this.commonInfo.channelID, A50: this.commonInfo.unid, A76: r.sessionId, A101: this.commonInfo.userAgent, A102: window.location.href, A104: document.referrer, A119: this.commonInfo.query, A153: this.qimei36 }), !1), events: t };\n    }, n.prototype.monitorUploadFailed = function () {\n      this.uselessCycleTaskNum++, this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(6e4), this.underWeakNet = !0);\n    }, n.prototype.doCustomCycleTask = function () {\n      this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(this.initDelayTime)), this.uselessCycleTaskNum = 0, this.underWeakNet = !1;\n    }, n;\n  }(v);\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://COS/./lib/beacon.js?");

/***/ }),
<<<<<<< HEAD
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

<<<<<<< HEAD
var conventions = __webpack_require__(1);

var NAMESPACE = conventions.NAMESPACE;

/**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */
function notEmptyString (input) {
	return input !== ''
}
/**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
=======
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
=======

/***/ "./lib/crypto.js":
/*!***********************!*\
  !*** ./lib/crypto.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
>>>>>>> upd：webpack升级

eval("/*\n CryptoJS v3.1.2\n code.google.com/p/crypto-js\n (c) 2009-2013 by Jeff Mott. All rights reserved.\n code.google.com/p/crypto-js/wiki/License\n */\nvar CryptoJS = CryptoJS || function (g, l) {\n    var e = {},\n        d = e.lib = {},\n        m = function () {},\n        k = d.Base = { extend: function (a) {\n            m.prototype = this;var c = new m();a && c.mixIn(a);c.hasOwnProperty(\"init\") || (c.init = function () {\n                c.$super.init.apply(this, arguments);\n            });c.init.prototype = c;c.$super = this;return c;\n        }, create: function () {\n            var a = this.extend();a.init.apply(a, arguments);return a;\n        }, init: function () {}, mixIn: function (a) {\n            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);a.hasOwnProperty(\"toString\") && (this.toString = a.toString);\n        }, clone: function () {\n            return this.init.prototype.extend(this);\n        } },\n        p = d.WordArray = k.extend({ init: function (a, c) {\n            a = this.words = a || [];this.sigBytes = c != l ? c : 4 * a.length;\n        }, toString: function (a) {\n            return (a || n).stringify(this);\n        }, concat: function (a) {\n            var c = this.words,\n                q = a.words,\n                f = this.sigBytes;a = a.sigBytes;this.clamp();if (f % 4) for (var b = 0; b < a; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);else if (65535 < q.length) for (b = 0; b < a; b += 4) c[f + b >>> 2] = q[b >>> 2];else c.push.apply(c, q);this.sigBytes += a;return this;\n        }, clamp: function () {\n            var a = this.words,\n                c = this.sigBytes;a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);a.length = g.ceil(c / 4);\n        }, clone: function () {\n            var a = k.clone.call(this);a.words = this.words.slice(0);return a;\n        }, random: function (a) {\n            for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0);return new p.init(c, a);\n        } }),\n        b = e.enc = {},\n        n = b.Hex = { stringify: function (a) {\n            var c = a.words;a = a.sigBytes;for (var b = [], f = 0; f < a; f++) {\n                var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;b.push((d >>> 4).toString(16));b.push((d & 15).toString(16));\n            }return b.join(\"\");\n        }, parse: function (a) {\n            for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);return new p.init(b, c / 2);\n        } },\n        j = b.Latin1 = { stringify: function (a) {\n            var c = a.words;a = a.sigBytes;for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));return b.join(\"\");\n        }, parse: function (a) {\n            for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4);return new p.init(b, c);\n        } },\n        h = b.Utf8 = { stringify: function (a) {\n            try {\n                return decodeURIComponent(escape(j.stringify(a)));\n            } catch (c) {\n                throw Error(\"Malformed UTF-8 data\");\n            }\n        }, parse: function (a) {\n            return j.parse(unescape(encodeURIComponent(a)));\n        } },\n        r = d.BufferedBlockAlgorithm = k.extend({ reset: function () {\n            this._data = new p.init();this._nDataBytes = 0;\n        }, _append: function (a) {\n            \"string\" == typeof a && (a = h.parse(a));this._data.concat(a);this._nDataBytes += a.sigBytes;\n        }, _process: function (a) {\n            var c = this._data,\n                b = c.words,\n                f = c.sigBytes,\n                d = this.blockSize,\n                e = f / (4 * d),\n                e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0);a = e * d;f = g.min(4 * a, f);if (a) {\n                for (var k = 0; k < a; k += d) this._doProcessBlock(b, k);k = b.splice(0, a);c.sigBytes -= f;\n            }return new p.init(k, f);\n        }, clone: function () {\n            var a = k.clone.call(this);\n            a._data = this._data.clone();return a;\n        }, _minBufferSize: 0 });d.Hasher = r.extend({ cfg: k.extend(), init: function (a) {\n            this.cfg = this.cfg.extend(a);this.reset();\n        }, reset: function () {\n            r.reset.call(this);this._doReset();\n        }, update: function (a) {\n            this._append(a);this._process();return this;\n        }, finalize: function (a) {\n            a && this._append(a);return this._doFinalize();\n        }, blockSize: 16, _createHelper: function (a) {\n            return function (b, d) {\n                return new a.init(d).finalize(b);\n            };\n        }, _createHmacHelper: function (a) {\n            return function (b, d) {\n                return new s.HMAC.init(a, d).finalize(b);\n            };\n        } });var s = e.algo = {};return e;\n}(Math);\n(function () {\n    var g = CryptoJS,\n        l = g.lib,\n        e = l.WordArray,\n        d = l.Hasher,\n        m = [],\n        l = g.algo.SHA1 = d.extend({ _doReset: function () {\n            this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);\n        }, _doProcessBlock: function (d, e) {\n            for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {\n                if (16 > a) m[a] = d[e + a] | 0;else {\n                    var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];m[a] = c << 1 | c >>> 31;\n                }c = (n << 5 | n >>> 27) + l + m[a];c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514);l = g;g = h;h = j << 30 | j >>> 2;j = n;n = c;\n            }b[0] = b[0] + n | 0;b[1] = b[1] + j | 0;b[2] = b[2] + h | 0;b[3] = b[3] + g | 0;b[4] = b[4] + l | 0;\n        }, _doFinalize: function () {\n            var d = this._data,\n                e = d.words,\n                b = 8 * this._nDataBytes,\n                g = 8 * d.sigBytes;e[g >>> 5] |= 128 << 24 - g % 32;e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);e[(g + 64 >>> 9 << 4) + 15] = b;d.sigBytes = 4 * e.length;this._process();return this._hash;\n        }, clone: function () {\n            var e = d.clone.call(this);e._hash = this._hash.clone();return e;\n        } });g.SHA1 = d._createHelper(l);g.HmacSHA1 = d._createHmacHelper(l);\n})();\n(function () {\n    var g = CryptoJS,\n        l = g.enc.Utf8;g.algo.HMAC = g.lib.Base.extend({ init: function (e, d) {\n            e = this._hasher = new e.init();\"string\" == typeof d && (d = l.parse(d));var g = e.blockSize,\n                k = 4 * g;d.sigBytes > k && (d = e.finalize(d));d.clamp();for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) n[h] ^= 1549556828, j[h] ^= 909522486;p.sigBytes = b.sigBytes = k;this.reset();\n        }, reset: function () {\n            var e = this._hasher;e.reset();e.update(this._iKey);\n        }, update: function (e) {\n            this._hasher.update(e);return this;\n        }, finalize: function (e) {\n            var d = this._hasher;e = d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e));\n        } });\n})();\n\n(function () {\n    // Shortcuts\n    var C = CryptoJS;\n    var C_lib = C.lib;\n    var WordArray = C_lib.WordArray;\n    var C_enc = C.enc;\n\n    /**\n     * Base64 encoding strategy.\n     */\n    var Base64 = C_enc.Base64 = {\n        /**\n         * Converts a word array to a Base64 string.\n         *\n         * @param {WordArray} wordArray The word array.\n         *\n         * @return {string} The Base64 string.\n         *\n         * @static\n         *\n         * @example\n         *\n         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);\n         */\n        stringify: function (wordArray) {\n            // Shortcuts\n            var words = wordArray.words;\n            var sigBytes = wordArray.sigBytes;\n            var map = this._map;\n\n            // Clamp excess bits\n            wordArray.clamp();\n\n            // Convert\n            var base64Chars = [];\n            for (var i = 0; i < sigBytes; i += 3) {\n                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;\n                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;\n                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;\n\n                var triplet = byte1 << 16 | byte2 << 8 | byte3;\n\n                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {\n                    base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));\n                }\n            }\n\n            // Add padding\n            var paddingChar = map.charAt(64);\n            if (paddingChar) {\n                while (base64Chars.length % 4) {\n                    base64Chars.push(paddingChar);\n                }\n            }\n\n            return base64Chars.join('');\n        },\n\n        /**\n         * Converts a Base64 string to a word array.\n         *\n         * @param {string} base64Str The Base64 string.\n         *\n         * @return {WordArray} The word array.\n         *\n         * @static\n         *\n         * @example\n         *\n         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);\n         */\n        parse: function (base64Str) {\n            // Shortcuts\n            var base64StrLength = base64Str.length;\n            var map = this._map;\n\n            // Ignore padding\n            var paddingChar = map.charAt(64);\n            if (paddingChar) {\n                var paddingIndex = base64Str.indexOf(paddingChar);\n                if (paddingIndex != -1) {\n                    base64StrLength = paddingIndex;\n                }\n            }\n\n            // Convert\n            var words = [];\n            var nBytes = 0;\n            for (var i = 0; i < base64StrLength; i++) {\n                if (i % 4) {\n                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;\n                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;\n                    words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;\n                    nBytes++;\n                }\n            }\n\n            return WordArray.create(words, nBytes);\n        },\n\n        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='\n    };\n})();\n\nif (true) {\n    module.exports = CryptoJS;\n} else {}\n\n//# sourceURL=webpack://COS/./lib/crypto.js?");

/***/ }),
<<<<<<< HEAD
/* 3 */
/***/ (function(module, exports) {

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
>>>>>>> upd
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : []
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */
function orderedSetReducer (current, element) {
	if (!current.hasOwnProperty(element)) {
		current[element] = true;
	}
	return current;
}

/**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}))
}

/**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */
function arrayIncludes (list) {
	return function(element) {
		return list && list.indexOf(element) !== -1;
	}
}

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
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknown Class:"+Class)
		}
		pt.constructor = Class
	}
}

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

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
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
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
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
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
	/**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */
	hasFeature: function(feature, version) {
			return true;
	},
	/**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocument: function(namespaceURI,  qualifiedName, doctype){
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype){
			doc.appendChild(doctype);
		}
		if (qualifiedName){
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocumentType: function(qualifiedName, publicId, systemId){
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';

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
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */
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
=======
>>>>>>> upd：webpack升级

/***/ "./lib/json2xml.js":
/*!*************************!*\
  !*** ./lib/json2xml.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//copyright Ryan Day 2010 <http://ryanday.org>, Joscha Feth 2013 <http://www.feth.com> [MIT Licensed]\n\nvar element_start_char = \"a-zA-Z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FFF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\";\nvar element_non_start_char = \"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F\\u2040\";\nvar element_replace = new RegExp(\"^([^\" + element_start_char + \"])|^((x|X)(m|M)(l|L))|([^\" + element_start_char + element_non_start_char + \"])\", \"g\");\nvar not_safe_in_xml = /[^\\x09\\x0A\\x0D\\x20-\\xFF\\x85\\xA0-\\uD7FF\\uE000-\\uFDCF\\uFDE0-\\uFFFD]/gm;\n\nvar objKeys = function (obj) {\n    var l = [];\n    if (obj instanceof Object) {\n        for (var k in obj) {\n            if (obj.hasOwnProperty(k)) {\n                l.push(k);\n            }\n        }\n    }\n    return l;\n};\nvar process_to_xml = function (node_data, options) {\n\n    var makeNode = function (name, content, attributes, level, hasSubNodes) {\n        var indent_value = options.indent !== undefined ? options.indent : \"\\t\";\n        var indent = options.prettyPrint ? '\\n' + new Array(level).join(indent_value) : '';\n        if (options.removeIllegalNameCharacters) {\n            name = name.replace(element_replace, '_');\n        }\n\n        var node = [indent, '<', name, attributes || ''];\n        if (content && content.length > 0) {\n            node.push('>');\n            node.push(content);\n            hasSubNodes && node.push(indent);\n            node.push('</');\n            node.push(name);\n            node.push('>');\n        } else {\n            node.push('/>');\n        }\n        return node.join('');\n    };\n\n    return function fn(node_data, node_descriptor, level) {\n        var type = typeof node_data;\n        if (Array.isArray ? Array.isArray(node_data) : node_data instanceof Array) {\n            type = 'array';\n        } else if (node_data instanceof Date) {\n            type = 'date';\n        }\n\n        switch (type) {\n            //if value is an array create child nodes from values\n            case 'array':\n                var ret = [];\n                node_data.map(function (v) {\n                    ret.push(fn(v, 1, level + 1));\n                    //entries that are values of an array are the only ones that can be special node descriptors\n                });\n                options.prettyPrint && ret.push('\\n');\n                return ret.join('');\n                break;\n\n            case 'date':\n                // cast dates to ISO 8601 date (soap likes it)\n                return node_data.toJSON ? node_data.toJSON() : node_data + '';\n                break;\n\n            case 'object':\n                var nodes = [];\n                for (var name in node_data) {\n                    if (node_data.hasOwnProperty(name)) {\n                        if (node_data[name] instanceof Array) {\n                            for (var j = 0; j < node_data[name].length; j++) {\n                                if (node_data[name].hasOwnProperty(j)) {\n                                    nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));\n                                }\n                            }\n                        } else {\n                            nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));\n                        }\n                    }\n                }\n                options.prettyPrint && nodes.length > 0 && nodes.push('\\n');\n                return nodes.join('');\n                break;\n\n            case 'function':\n                return node_data();\n                break;\n\n            default:\n                return options.escape ? esc(node_data) : '' + node_data;\n        }\n    }(node_data, 0, 0);\n};\n\nvar xml_header = function (standalone) {\n    var ret = ['<?xml version=\"1.0\" encoding=\"UTF-8\"'];\n\n    if (standalone) {\n        ret.push(' standalone=\"yes\"');\n    }\n    ret.push('?>');\n\n    return ret.join('');\n};\n\nfunction esc(str) {\n    return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/\"/g, '&quot;').replace(not_safe_in_xml, '');\n}\n\nmodule.exports = function (obj, options) {\n    if (!options) {\n        options = {\n            xmlHeader: {\n                standalone: true\n            },\n            prettyPrint: true,\n            indent: \"  \",\n            escape: true\n        };\n    }\n\n    if (typeof obj == 'string') {\n        try {\n            obj = JSON.parse(obj.toString());\n        } catch (e) {\n            return false;\n        }\n    }\n\n    var xmlheader = '';\n    var docType = '';\n    if (options) {\n        if (typeof options == 'object') {\n            // our config is an object\n\n            if (options.xmlHeader) {\n                // the user wants an xml header\n                xmlheader = xml_header(!!options.xmlHeader.standalone);\n            }\n\n            if (typeof options.docType != 'undefined') {\n                docType = '<!DOCTYPE ' + options.docType + '>';\n            }\n        } else {\n            // our config is a boolean value, so just add xml header\n            xmlheader = xml_header();\n        }\n    }\n    options = options || {};\n\n    var ret = [xmlheader, options.prettyPrint && docType ? '\\n' : '', docType, process_to_xml(obj, options)];\n    return ret.join('').replace(/\\n{2,}/g, '\\n').replace(/\\s+$/g, '');\n};\n\n//# sourceURL=webpack://COS/./lib/json2xml.js?");

/***/ }),

/***/ "./lib/md5.js":
/*!********************!*\
  !*** ./lib/md5.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/* https://github.com/emn178/js-md5 */\n(function () {\n    'use strict';\n\n    var ERROR = 'input is invalid type';\n    var WINDOW = typeof window === 'object';\n    var root = WINDOW ? window : {};\n    if (root.JS_MD5_NO_WINDOW) {\n        WINDOW = false;\n    }\n    var WEB_WORKER = !WINDOW && typeof self === 'object';\n    var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;\n    if (NODE_JS) {\n        root = global;\n    } else if (WEB_WORKER) {\n        root = self;\n    }\n    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;\n    var AMD =  true && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\");\n    var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';\n    var HEX_CHARS = '0123456789abcdef'.split('');\n    var EXTRA = [128, 32768, 8388608, -2147483648];\n    var SHIFT = [0, 8, 16, 24];\n    var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];\n    var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');\n\n    var blocks = [],\n        buffer8;\n    if (ARRAY_BUFFER) {\n        var buffer = new ArrayBuffer(68);\n        buffer8 = new Uint8Array(buffer);\n        blocks = new Uint32Array(buffer);\n    }\n\n    if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {\n        Array.isArray = function (obj) {\n            return Object.prototype.toString.call(obj) === '[object Array]';\n        };\n    }\n\n    if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {\n        ArrayBuffer.isView = function (obj) {\n            return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;\n        };\n    }\n\n    /**\n     * @method hex\n     * @memberof md5\n     * @description Output hash as hex string\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {String} Hex string\n     * @example\n     * md5.hex('The quick brown fox jumps over the lazy dog');\n     * // equal to\n     * md5('The quick brown fox jumps over the lazy dog');\n     */\n    /**\n     * @method digest\n     * @memberof md5\n     * @description Output hash as bytes array\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {Array} Bytes array\n     * @example\n     * md5.digest('The quick brown fox jumps over the lazy dog');\n     */\n    /**\n     * @method array\n     * @memberof md5\n     * @description Output hash as bytes array\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {Array} Bytes array\n     * @example\n     * md5.array('The quick brown fox jumps over the lazy dog');\n     */\n    /**\n     * @method arrayBuffer\n     * @memberof md5\n     * @description Output hash as ArrayBuffer\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {ArrayBuffer} ArrayBuffer\n     * @example\n     * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');\n     */\n    /**\n     * @method buffer\n     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.\n     * @memberof md5\n     * @description Output hash as ArrayBuffer\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {ArrayBuffer} ArrayBuffer\n     * @example\n     * md5.buffer('The quick brown fox jumps over the lazy dog');\n     */\n    /**\n     * @method base64\n     * @memberof md5\n     * @description Output hash as base64 string\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {String} base64 string\n     * @example\n     * md5.base64('The quick brown fox jumps over the lazy dog');\n     */\n    var createOutputMethod = function (outputType) {\n        return function (message, isBinStr) {\n            return new Md5(true).update(message, isBinStr)[outputType]();\n        };\n    };\n\n    /**\n     * @method create\n     * @memberof md5\n     * @description Create Md5 object\n     * @returns {Md5} Md5 object.\n     * @example\n     * var hash = md5.create();\n     */\n    /**\n     * @method update\n     * @memberof md5\n     * @description Create and update Md5 object\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {Md5} Md5 object.\n     * @example\n     * var hash = md5.update('The quick brown fox jumps over the lazy dog');\n     * // equal to\n     * var hash = md5.create();\n     * hash.update('The quick brown fox jumps over the lazy dog');\n     */\n    var createMethod = function () {\n        var method = createOutputMethod('hex');\n        if (NODE_JS) {\n            method = nodeWrap(method);\n        }\n        method.getCtx = method.create = function () {\n            return new Md5();\n        };\n        method.update = function (message) {\n            return method.create().update(message);\n        };\n        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {\n            var type = OUTPUT_TYPES[i];\n            method[type] = createOutputMethod(type);\n        }\n        return method;\n    };\n\n    var nodeWrap = function (method) {\n        var crypto = eval(\"require('crypto')\");\n        var Buffer = eval(\"require('buffer').Buffer\");\n        var nodeMethod = function (message) {\n            if (typeof message === 'string') {\n                return crypto.createHash('md5').update(message, 'utf8').digest('hex');\n            } else {\n                if (message === null || message === undefined) {\n                    throw ERROR;\n                } else if (message.constructor === ArrayBuffer) {\n                    message = new Uint8Array(message);\n                }\n            }\n            if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {\n                return crypto.createHash('md5').update(new Buffer(message)).digest('hex');\n            } else {\n                return method(message);\n            }\n        };\n        return nodeMethod;\n    };\n\n    /**\n     * Md5 class\n     * @class Md5\n     * @description This is internal class.\n     * @see {@link md5.create}\n     */\n    function Md5(sharedMemory) {\n        if (sharedMemory) {\n            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;\n            this.blocks = blocks;\n            this.buffer8 = buffer8;\n        } else {\n            if (ARRAY_BUFFER) {\n                var buffer = new ArrayBuffer(68);\n                this.buffer8 = new Uint8Array(buffer);\n                this.blocks = new Uint32Array(buffer);\n            } else {\n                this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n            }\n        }\n        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;\n        this.finalized = this.hashed = false;\n        this.first = true;\n    }\n\n    /**\n     * @method update\n     * @memberof Md5\n     * @instance\n     * @description Update hash\n     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n     * @returns {Md5} Md5 object.\n     * @see {@link md5.update}\n     */\n    Md5.prototype.update = function (message, isBinStr) {\n        if (this.finalized) {\n            return;\n        }\n\n        var code,\n            index = 0,\n            i,\n            length = message.length,\n            blocks = this.blocks;\n        var buffer8 = this.buffer8;\n\n        while (index < length) {\n            if (this.hashed) {\n                this.hashed = false;\n                blocks[0] = blocks[16];\n                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;\n            }\n\n            if (ARRAY_BUFFER) {\n                for (i = this.start; index < length && i < 64; ++index) {\n                    code = message.charCodeAt(index);\n                    if (isBinStr || code < 0x80) {\n                        buffer8[i++] = code;\n                    } else if (code < 0x800) {\n                        buffer8[i++] = 0xc0 | code >> 6;\n                        buffer8[i++] = 0x80 | code & 0x3f;\n                    } else if (code < 0xd800 || code >= 0xe000) {\n                        buffer8[i++] = 0xe0 | code >> 12;\n                        buffer8[i++] = 0x80 | code >> 6 & 0x3f;\n                        buffer8[i++] = 0x80 | code & 0x3f;\n                    } else {\n                        code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);\n                        buffer8[i++] = 0xf0 | code >> 18;\n                        buffer8[i++] = 0x80 | code >> 12 & 0x3f;\n                        buffer8[i++] = 0x80 | code >> 6 & 0x3f;\n                        buffer8[i++] = 0x80 | code & 0x3f;\n                    }\n                }\n            } else {\n                for (i = this.start; index < length && i < 64; ++index) {\n                    code = message.charCodeAt(index);\n                    if (isBinStr || code < 0x80) {\n                        blocks[i >> 2] |= code << SHIFT[i++ & 3];\n                    } else if (code < 0x800) {\n                        blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];\n                    } else if (code < 0xd800 || code >= 0xe000) {\n                        blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];\n                    } else {\n                        code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);\n                        blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];\n                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];\n                    }\n                }\n            }\n            this.lastByteIndex = i;\n            this.bytes += i - this.start;\n            if (i >= 64) {\n                this.start = i - 64;\n                this.hash();\n                this.hashed = true;\n            } else {\n                this.start = i;\n            }\n        }\n        if (this.bytes > 4294967295) {\n            this.hBytes += this.bytes / 4294967296 << 0;\n            this.bytes = this.bytes % 4294967296;\n        }\n        return this;\n    };\n\n    Md5.prototype.finalize = function () {\n        if (this.finalized) {\n            return;\n        }\n        this.finalized = true;\n        var blocks = this.blocks,\n            i = this.lastByteIndex;\n        blocks[i >> 2] |= EXTRA[i & 3];\n        if (i >= 56) {\n            if (!this.hashed) {\n                this.hash();\n            }\n            blocks[0] = blocks[16];\n            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;\n        }\n        blocks[14] = this.bytes << 3;\n        blocks[15] = this.hBytes << 3 | this.bytes >>> 29;\n        this.hash();\n    };\n\n    Md5.prototype.hash = function () {\n        var a,\n            b,\n            c,\n            d,\n            bc,\n            da,\n            blocks = this.blocks;\n\n        if (this.first) {\n            a = blocks[0] - 680876937;\n            a = (a << 7 | a >>> 25) - 271733879 << 0;\n            d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;\n            d = (d << 12 | d >>> 20) + a << 0;\n            c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;\n            c = (c << 17 | c >>> 15) + d << 0;\n            b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;\n            b = (b << 22 | b >>> 10) + c << 0;\n        } else {\n            a = this.h0;\n            b = this.h1;\n            c = this.h2;\n            d = this.h3;\n            a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;\n            a = (a << 7 | a >>> 25) + b << 0;\n            d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;\n            d = (d << 12 | d >>> 20) + a << 0;\n            c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;\n            c = (c << 17 | c >>> 15) + d << 0;\n            b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;\n            b = (b << 22 | b >>> 10) + c << 0;\n        }\n\n        a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;\n        a = (a << 7 | a >>> 25) + b << 0;\n        d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;\n        d = (d << 12 | d >>> 20) + a << 0;\n        c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;\n        c = (c << 17 | c >>> 15) + d << 0;\n        b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;\n        b = (b << 22 | b >>> 10) + c << 0;\n        a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;\n        a = (a << 7 | a >>> 25) + b << 0;\n        d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;\n        d = (d << 12 | d >>> 20) + a << 0;\n        c += (b ^ d & (a ^ b)) + blocks[10] - 42063;\n        c = (c << 17 | c >>> 15) + d << 0;\n        b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;\n        b = (b << 22 | b >>> 10) + c << 0;\n        a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;\n        a = (a << 7 | a >>> 25) + b << 0;\n        d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;\n        d = (d << 12 | d >>> 20) + a << 0;\n        c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;\n        c = (c << 17 | c >>> 15) + d << 0;\n        b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;\n        b = (b << 22 | b >>> 10) + c << 0;\n        a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;\n        a = (a << 5 | a >>> 27) + b << 0;\n        d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;\n        d = (d << 9 | d >>> 23) + a << 0;\n        c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;\n        c = (c << 14 | c >>> 18) + d << 0;\n        b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;\n        b = (b << 20 | b >>> 12) + c << 0;\n        a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;\n        a = (a << 5 | a >>> 27) + b << 0;\n        d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;\n        d = (d << 9 | d >>> 23) + a << 0;\n        c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;\n        c = (c << 14 | c >>> 18) + d << 0;\n        b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;\n        b = (b << 20 | b >>> 12) + c << 0;\n        a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;\n        a = (a << 5 | a >>> 27) + b << 0;\n        d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;\n        d = (d << 9 | d >>> 23) + a << 0;\n        c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;\n        c = (c << 14 | c >>> 18) + d << 0;\n        b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;\n        b = (b << 20 | b >>> 12) + c << 0;\n        a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;\n        a = (a << 5 | a >>> 27) + b << 0;\n        d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;\n        d = (d << 9 | d >>> 23) + a << 0;\n        c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;\n        c = (c << 14 | c >>> 18) + d << 0;\n        b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;\n        b = (b << 20 | b >>> 12) + c << 0;\n        bc = b ^ c;\n        a += (bc ^ d) + blocks[5] - 378558;\n        a = (a << 4 | a >>> 28) + b << 0;\n        d += (bc ^ a) + blocks[8] - 2022574463;\n        d = (d << 11 | d >>> 21) + a << 0;\n        da = d ^ a;\n        c += (da ^ b) + blocks[11] + 1839030562;\n        c = (c << 16 | c >>> 16) + d << 0;\n        b += (da ^ c) + blocks[14] - 35309556;\n        b = (b << 23 | b >>> 9) + c << 0;\n        bc = b ^ c;\n        a += (bc ^ d) + blocks[1] - 1530992060;\n        a = (a << 4 | a >>> 28) + b << 0;\n        d += (bc ^ a) + blocks[4] + 1272893353;\n        d = (d << 11 | d >>> 21) + a << 0;\n        da = d ^ a;\n        c += (da ^ b) + blocks[7] - 155497632;\n        c = (c << 16 | c >>> 16) + d << 0;\n        b += (da ^ c) + blocks[10] - 1094730640;\n        b = (b << 23 | b >>> 9) + c << 0;\n        bc = b ^ c;\n        a += (bc ^ d) + blocks[13] + 681279174;\n        a = (a << 4 | a >>> 28) + b << 0;\n        d += (bc ^ a) + blocks[0] - 358537222;\n        d = (d << 11 | d >>> 21) + a << 0;\n        da = d ^ a;\n        c += (da ^ b) + blocks[3] - 722521979;\n        c = (c << 16 | c >>> 16) + d << 0;\n        b += (da ^ c) + blocks[6] + 76029189;\n        b = (b << 23 | b >>> 9) + c << 0;\n        bc = b ^ c;\n        a += (bc ^ d) + blocks[9] - 640364487;\n        a = (a << 4 | a >>> 28) + b << 0;\n        d += (bc ^ a) + blocks[12] - 421815835;\n        d = (d << 11 | d >>> 21) + a << 0;\n        da = d ^ a;\n        c += (da ^ b) + blocks[15] + 530742520;\n        c = (c << 16 | c >>> 16) + d << 0;\n        b += (da ^ c) + blocks[2] - 995338651;\n        b = (b << 23 | b >>> 9) + c << 0;\n        a += (c ^ (b | ~d)) + blocks[0] - 198630844;\n        a = (a << 6 | a >>> 26) + b << 0;\n        d += (b ^ (a | ~c)) + blocks[7] + 1126891415;\n        d = (d << 10 | d >>> 22) + a << 0;\n        c += (a ^ (d | ~b)) + blocks[14] - 1416354905;\n        c = (c << 15 | c >>> 17) + d << 0;\n        b += (d ^ (c | ~a)) + blocks[5] - 57434055;\n        b = (b << 21 | b >>> 11) + c << 0;\n        a += (c ^ (b | ~d)) + blocks[12] + 1700485571;\n        a = (a << 6 | a >>> 26) + b << 0;\n        d += (b ^ (a | ~c)) + blocks[3] - 1894986606;\n        d = (d << 10 | d >>> 22) + a << 0;\n        c += (a ^ (d | ~b)) + blocks[10] - 1051523;\n        c = (c << 15 | c >>> 17) + d << 0;\n        b += (d ^ (c | ~a)) + blocks[1] - 2054922799;\n        b = (b << 21 | b >>> 11) + c << 0;\n        a += (c ^ (b | ~d)) + blocks[8] + 1873313359;\n        a = (a << 6 | a >>> 26) + b << 0;\n        d += (b ^ (a | ~c)) + blocks[15] - 30611744;\n        d = (d << 10 | d >>> 22) + a << 0;\n        c += (a ^ (d | ~b)) + blocks[6] - 1560198380;\n        c = (c << 15 | c >>> 17) + d << 0;\n        b += (d ^ (c | ~a)) + blocks[13] + 1309151649;\n        b = (b << 21 | b >>> 11) + c << 0;\n        a += (c ^ (b | ~d)) + blocks[4] - 145523070;\n        a = (a << 6 | a >>> 26) + b << 0;\n        d += (b ^ (a | ~c)) + blocks[11] - 1120210379;\n        d = (d << 10 | d >>> 22) + a << 0;\n        c += (a ^ (d | ~b)) + blocks[2] + 718787259;\n        c = (c << 15 | c >>> 17) + d << 0;\n        b += (d ^ (c | ~a)) + blocks[9] - 343485551;\n        b = (b << 21 | b >>> 11) + c << 0;\n\n        if (this.first) {\n            this.h0 = a + 1732584193 << 0;\n            this.h1 = b - 271733879 << 0;\n            this.h2 = c - 1732584194 << 0;\n            this.h3 = d + 271733878 << 0;\n            this.first = false;\n        } else {\n            this.h0 = this.h0 + a << 0;\n            this.h1 = this.h1 + b << 0;\n            this.h2 = this.h2 + c << 0;\n            this.h3 = this.h3 + d << 0;\n        }\n    };\n\n    /**\n     * @method hex\n     * @memberof Md5\n     * @instance\n     * @description Output hash as hex string\n     * @returns {String} Hex string\n     * @see {@link md5.hex}\n     * @example\n     * hash.hex();\n     */\n    Md5.prototype.hex = function () {\n        this.finalize();\n\n        var h0 = this.h0,\n            h1 = this.h1,\n            h2 = this.h2,\n            h3 = this.h3;\n\n        return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];\n    };\n\n    /**\n     * @method toString\n     * @memberof Md5\n     * @instance\n     * @description Output hash as hex string\n     * @returns {String} Hex string\n     * @see {@link md5.hex}\n     * @example\n     * hash.toString();\n     */\n    Md5.prototype.toString = Md5.prototype.hex;\n\n    /**\n     * @method digest\n     * @memberof Md5\n     * @instance\n     * @description Output hash as bytes array\n     * @returns {Array} Bytes array\n     * @see {@link md5.digest}\n     * @example\n     * hash.digest();\n     */\n    Md5.prototype.digest = function (format) {\n        if (format === 'hex') return this.hex();\n        this.finalize();\n\n        var h0 = this.h0,\n            h1 = this.h1,\n            h2 = this.h2,\n            h3 = this.h3;\n        var res = [h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF, h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF, h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF, h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];\n        return res;\n    };\n\n    /**\n     * @method array\n     * @memberof Md5\n     * @instance\n     * @description Output hash as bytes array\n     * @returns {Array} Bytes array\n     * @see {@link md5.array}\n     * @example\n     * hash.array();\n     */\n    Md5.prototype.array = Md5.prototype.digest;\n\n    /**\n     * @method arrayBuffer\n     * @memberof Md5\n     * @instance\n     * @description Output hash as ArrayBuffer\n     * @returns {ArrayBuffer} ArrayBuffer\n     * @see {@link md5.arrayBuffer}\n     * @example\n     * hash.arrayBuffer();\n     */\n    Md5.prototype.arrayBuffer = function () {\n        this.finalize();\n\n        var buffer = new ArrayBuffer(16);\n        var blocks = new Uint32Array(buffer);\n        blocks[0] = this.h0;\n        blocks[1] = this.h1;\n        blocks[2] = this.h2;\n        blocks[3] = this.h3;\n        return buffer;\n    };\n\n    /**\n     * @method buffer\n     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.\n     * @memberof Md5\n     * @instance\n     * @description Output hash as ArrayBuffer\n     * @returns {ArrayBuffer} ArrayBuffer\n     * @see {@link md5.buffer}\n     * @example\n     * hash.buffer();\n     */\n    Md5.prototype.buffer = Md5.prototype.arrayBuffer;\n\n    /**\n     * @method base64\n     * @memberof Md5\n     * @instance\n     * @description Output hash as base64 string\n     * @returns {String} base64 string\n     * @see {@link md5.base64}\n     * @example\n     * hash.base64();\n     */\n    Md5.prototype.base64 = function () {\n        var v1,\n            v2,\n            v3,\n            base64Str = '',\n            bytes = this.array();\n        for (var i = 0; i < 15;) {\n            v1 = bytes[i++];\n            v2 = bytes[i++];\n            v3 = bytes[i++];\n            base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];\n        }\n        v1 = bytes[i];\n        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + '==';\n        return base64Str;\n    };\n\n    var exports = createMethod();\n\n    if (COMMON_JS) {\n        module.exports = exports;\n    } else {\n        /**\n         * @method md5\b\n         * @description Md5 hash function, export to global in browsers.\n         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash\n         * @returns {String} md5 hashes\n         * @example\n         * md5(''); // d41d8cd98f00b204e9800998ecf8427e\n         * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6\n         * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0\n         *\n         * // It also supports UTF-8 encoding\n         * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07\n         *\n         * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`\n         * md5([]); // d41d8cd98f00b204e9800998ecf8427e\n         * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e\n         */\n        root.md5 = exports;\n        if (AMD) {\n            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n                return exports;\n            }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n        }\n    }\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://COS/./lib/md5.js?");

<<<<<<< HEAD
function Document(){
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}

/**
 * Updates `el.childNodes`, updating the indexed items and it's `length`.
 * Passing `newChild` means it will be appended.
 * Otherwise it's assumed that an item has been removed,
 * and `el.firstNode` and it's `.nextSibling` are used
 * to walk the current list of child nodes.
 *
 * @param {Document} doc
 * @param {Node} el
 * @param {Node} [newChild]
 * @private
 */
function _onUpdateChild (doc, el, newChild) {
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
			delete cs[cs.length];
		}
	}
}

/**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 *
 * @param {Node} parentNode
 * @param {Node} child
 * @returns {Node} the child that was removed.
 * @private
 */
function _removeChild (parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	child.parentNode = null;
	child.previousSibling = null;
	child.nextSibling = null;
	_onUpdateChild(parentNode.ownerDocument, parentNode);
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

/**
 * Appends `newChild` to `parentNode`.
 * If `newChild` is already connected to a `parentNode` it is first removed from it.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 * @param {Node} parentNode
 * @param {Node} newChild
 * @returns {Node}
 * @private
 */
function _appendSingleChild (parentNode, newChild) {
	if (newChild.parentNode) {
		newChild.parentNode.removeChild(newChild);
	}
	newChild.parentNode = parentNode;
	newChild.previousSibling = parentNode.lastChild;
	newChild.nextSibling = null;
	if (newChild.previousSibling) {
		newChild.previousSibling.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */
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

	/**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function(classNames) {
		var classNamesSet = toOrderedSet(classNames)
		return new LiveNodeList(this, function(base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base.documentElement, function(node) {
					if(node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class')
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames)
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet))
							}
							if(matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
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
=======
/***/ }),

/***/ "./lib/request.js":
/*!************************!*\
  !*** ./lib/request.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var stringifyPrimitive = function (v) {\n    switch (typeof v) {\n        case 'string':\n            return v;\n        case 'boolean':\n            return v ? 'true' : 'false';\n        case 'number':\n            return isFinite(v) ? v : '';\n        default:\n            return '';\n    }\n};\n\nvar queryStringify = function (obj, sep, eq, name) {\n    sep = sep || '&';\n    eq = eq || '=';\n    if (obj === null) {\n        obj = undefined;\n    }\n    if (typeof obj === 'object') {\n        return Object.keys(obj).map(function (k) {\n            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n            if (Array.isArray(obj[k])) {\n                return obj[k].map(function (v) {\n                    return ks + encodeURIComponent(stringifyPrimitive(v));\n                }).join(sep);\n            } else {\n                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n            }\n        }).filter(Boolean).join(sep);\n    }\n    if (!name) return '';\n    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar xhrRes = function (err, xhr, body) {\n    var headers = {};\n    xhr.getAllResponseHeaders().trim().split('\\n').forEach(function (item) {\n        if (item) {\n            var index = item.indexOf(':');\n            var key = item.substr(0, index).trim().toLowerCase();\n            var val = item.substr(index + 1).trim();\n            headers[key] = val;\n        }\n    });\n    return {\n        error: err,\n        statusCode: xhr.status,\n        statusMessage: xhr.statusText,\n        headers: headers,\n        body: body\n    };\n};\n\nvar xhrBody = function (xhr, dataType) {\n    return !dataType && dataType === 'text' ? xhr.responseText : xhr.response;\n};\n\nvar request = function (opt, callback) {\n\n    // method\n    var method = (opt.method || 'GET').toUpperCase();\n\n    // url、qs\n    var url = opt.url;\n    if (opt.qs) {\n        var qsStr = queryStringify(opt.qs);\n        if (qsStr) {\n            url += (url.indexOf('?') === -1 ? '?' : '&') + qsStr;\n        }\n    }\n\n    // 创建 ajax 实例\n    var xhr = new XMLHttpRequest();\n    xhr.open(method, url, true);\n    xhr.responseType = opt.dataType || 'text';\n\n    // 处理 xhrFields 属性\n    if (opt.xhrFields) {\n        for (var xhrField in opt.xhrFields) {\n            xhr[xhrField] = opt.xhrFields[xhrField];\n        }\n    }\n\n    // 处理 headers\n    var headers = opt.headers;\n    if (headers) {\n        for (var key in headers) {\n            if (headers.hasOwnProperty(key) && key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'user-agent' && key.toLowerCase() !== 'origin' && key.toLowerCase() !== 'host') {\n                xhr.setRequestHeader(key, headers[key]);\n            }\n        }\n    }\n\n    // onprogress\n    if (opt.onProgress && xhr.upload) xhr.upload.onprogress = opt.onProgress;\n    if (opt.onDownloadProgress) xhr.onprogress = opt.onDownloadProgress;\n\n    // timeout\n    if (opt.timeout) xhr.timeout = opt.timeout;\n    xhr.ontimeout = function (event) {\n        var error = new Error('timeout');\n        callback(xhrRes(error, xhr));\n    };\n\n    // success 2xx/3xx/4xx\n    xhr.onload = function () {\n        callback(xhrRes(null, xhr, xhrBody(xhr, opt.dataType)));\n    };\n\n    // error 5xx/0 (网络错误、跨域报错、Https connect-src 限制的报错时 statusCode 为 0)\n    xhr.onerror = function (err) {\n        var body = xhrBody(xhr, opt.dataType);\n        if (body) {\n            // 5xx\n            callback(xhrRes(null, xhr, body));\n        } else {\n            // 0\n            var error = xhr.statusText;\n            if (!error && xhr.status === 0) error = new Error('CORS blocked or network error');\n            callback(xhrRes(error, xhr, body));\n        }\n    };\n\n    // send\n    xhr.send(opt.body || '');\n\n    // 返回 ajax 实例，用于外部调用 xhr.abort\n    return xhr;\n};\n\nmodule.exports = request;\n\n//# sourceURL=webpack://COS/./lib/request.js?");
>>>>>>> upd：webpack升级

/***/ }),

/***/ "./lib/xml2json.js":
/*!*************************!*\
  !*** ./lib/xml2json.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* Copyright 2015 William Summers, MetaTribal LLC\n * adapted from https://developer.mozilla.org/en-US/docs/JXON\n *\n * Licensed under the MIT License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *     https://opensource.org/licenses/MIT\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * @author William Summers\n * https://github.com/metatribal/xmlToJSON\n */\nvar DOMParser = __webpack_require__(/*! xmldom */ \"./node_modules/xmldom/dom-parser.js\").DOMParser;\n\nvar xmlToJSON = function () {\n\n    this.version = \"1.3.5\";\n\n    var options = { // set up the default options\n        mergeCDATA: true, // extract cdata and merge with text\n        normalize: true, // collapse multiple spaces to single space\n        stripElemPrefix: true // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property\n    };\n\n    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);\n    var trimMatch = new RegExp(/^\\s+|\\s+$/g);\n\n    this.grokType = function (sValue) {\n        if (/^\\s*$/.test(sValue)) {\n            return null;\n        }\n        if (/^(?:true|false)$/i.test(sValue)) {\n            return sValue.toLowerCase() === \"true\";\n        }\n        if (isFinite(sValue)) {\n            return parseFloat(sValue);\n        }\n        return sValue;\n    };\n\n    this.parseString = function (xmlString, opt) {\n        if (xmlString) {\n            var xml = this.stringToXML(xmlString);\n            if (xml.getElementsByTagName('parsererror').length) {\n                return null;\n            } else {\n                return this.parseXML(xml, opt);\n            }\n        } else {\n            return null;\n        }\n    };\n\n    this.parseXML = function (oXMLParent, opt) {\n\n        // initialize options\n        for (var key in opt) {\n            options[key] = opt[key];\n        }\n\n        var vResult = {},\n            nLength = 0,\n            sCollectedTxt = \"\";\n\n        // iterate over the children\n        var childNum = oXMLParent.childNodes.length;\n        if (childNum) {\n            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {\n                oNode = oXMLParent.childNodes.item(nItem);\n\n                if (oNode.nodeType === 4) {\n                    if (options.mergeCDATA) {\n                        sCollectedTxt += oNode.nodeValue;\n                    }\n                } /* nodeType is \"CDATASection\" (4) */\n                else if (oNode.nodeType === 3) {\n                        sCollectedTxt += oNode.nodeValue;\n                    } /* nodeType is \"Text\" (3) */\n                    else if (oNode.nodeType === 1) {\n                            /* nodeType is \"Element\" (1) */\n\n                            if (nLength === 0) {\n                                vResult = {};\n                            }\n\n                            // using nodeName to support browser (IE) implementation with no 'localName' property\n                            if (options.stripElemPrefix) {\n                                sProp = oNode.nodeName.replace(prefixMatch, '');\n                            } else {\n                                sProp = oNode.nodeName;\n                            }\n\n                            vContent = xmlToJSON.parseXML(oNode);\n\n                            if (vResult.hasOwnProperty(sProp)) {\n                                if (vResult[sProp].constructor !== Array) {\n                                    vResult[sProp] = [vResult[sProp]];\n                                }\n                                vResult[sProp].push(vContent);\n                            } else {\n                                vResult[sProp] = vContent;\n                                nLength++;\n                            }\n                        }\n            }\n        }\n\n        if (!Object.keys(vResult).length) {\n            // vResult = sCollectedTxt.replace(trimMatch, '') || ''; // by carsonxu 修复 getBucket返回的 Key 是 \" /\" 这种场景\n            vResult = sCollectedTxt || '';\n        }\n\n        return vResult;\n    };\n\n    // Convert xmlDocument to a string\n    // Returns null on failure\n    this.xmlToString = function (xmlDoc) {\n        try {\n            var xmlString = xmlDoc.xml ? xmlDoc.xml : new XMLSerializer().serializeToString(xmlDoc);\n            return xmlString;\n        } catch (err) {\n            return null;\n        }\n    };\n\n    // Convert a string to XML Node Structure\n    // Returns null on failure\n    this.stringToXML = function (xmlString) {\n        try {\n            var xmlDoc = null;\n\n            if (window.DOMParser) {\n\n                var parser = new DOMParser();\n                xmlDoc = parser.parseFromString(xmlString, \"text/xml\");\n\n                return xmlDoc;\n            } else {\n                xmlDoc = new ActiveXObject(\"Microsoft.XMLDOM\");\n                xmlDoc.async = false;\n                xmlDoc.loadXML(xmlString);\n\n                return xmlDoc;\n            }\n        } catch (e) {\n            return null;\n        }\n    };\n\n    return this;\n}.call({});\n\nvar xml2json = function (xmlString) {\n    return xmlToJSON.parseString(xmlString);\n};\n\nmodule.exports = xml2json;\n\n//# sourceURL=webpack://COS/./lib/xml2json.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://COS/./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */\nmodule.exports = __webpack_amd_options__;\n\n/* WEBPACK VAR INJECTION */}.call(this, {}))\n\n//# sourceURL=webpack://COS/(webpack)/buildin/amd-options.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://COS/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/xmldom/dom-parser.js":
/*!*******************************************!*\
  !*** ./node_modules/xmldom/dom-parser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

<<<<<<< HEAD
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
	var refNode = this.nodeType == 9 && this.documentElement || this;
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

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
		return false;
	}
	
	var i = visibleNamespaces.length 
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Well-formed constraint: No < in Attribute Values
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 *
 * Literal whitespace other than space that appear in attribute values
 * are serialized as their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces)
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"')
}

function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}

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
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML

		var prefixedNodeName = nodeName
		if (!isHTML && !node.prefix && node.namespaceURI) {
			var defaultNS
			// lookup current default ns from `xmlns` attribute
			for (var ai = 0; ai < attrs.length; ai++) {
				if (attrs.item(ai).name === 'xmlns') {
					defaultNS = attrs.item(ai).value
					break
				}
			}
			if (!defaultNS) {
				// lookup current default ns in visibleNamespaces
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
						defaultNS = namespace.namespace
						break
					}
				}
			}
			if (defaultNS !== node.namespaceURI) {
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.namespace === node.namespaceURI) {
						if (namespace.prefix) {
							prefixedNodeName = namespace.prefix + ':' + nodeName
						}
						break
					}
				}
			}
		}

		buf.push('<', prefixedNodeName);

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
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}

		// add namespace for current node		
		if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
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
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					child = child.nextSibling;
				}
			}
			buf.push('</',prefixedNodeName,'>');
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
			serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return addSerializedAttribute(buf, node.name, node.value);
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
		 */
		return buf.push(node.data
			.replace(/[<&>]/g,_xmlEncoder)
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
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
	exports.DocumentType = DocumentType;
	exports.DOMException = DOMException;
	exports.DOMImplementation = DOMImplementation;
	exports.Element = Element;
	exports.Node = Node;
	exports.NodeList = NodeList;
	exports.XMLSerializer = XMLSerializer;
//}
=======
eval("function DOMParser(options){\r\n\tthis.options = options ||{locator:{}};\r\n\t\r\n}\r\nDOMParser.prototype.parseFromString = function(source,mimeType){\r\n\tvar options = this.options;\r\n\tvar sax =  new XMLReader();\r\n\tvar domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler\r\n\tvar errorHandler = options.errorHandler;\r\n\tvar locator = options.locator;\r\n\tvar defaultNSMap = options.xmlns||{};\r\n\tvar entityMap = {'lt':'<','gt':'>','amp':'&','quot':'\"','apos':\"'\"}\r\n\tif(locator){\r\n\t\tdomBuilder.setDocumentLocator(locator)\r\n\t}\r\n\t\r\n\tsax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);\r\n\tsax.domBuilder = options.domBuilder || domBuilder;\r\n\tif(/\\/x?html?$/.test(mimeType)){\r\n\t\tentityMap.nbsp = '\\xa0';\r\n\t\tentityMap.copy = '\\xa9';\r\n\t\tdefaultNSMap['']= 'http://www.w3.org/1999/xhtml';\r\n\t}\r\n\tdefaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';\r\n\tif(source){\r\n\t\tsax.parse(source,defaultNSMap,entityMap);\r\n\t}else{\r\n\t\tsax.errorHandler.error(\"invalid doc source\");\r\n\t}\r\n\treturn domBuilder.doc;\r\n}\r\nfunction buildErrorHandler(errorImpl,domBuilder,locator){\r\n\tif(!errorImpl){\r\n\t\tif(domBuilder instanceof DOMHandler){\r\n\t\t\treturn domBuilder;\r\n\t\t}\r\n\t\terrorImpl = domBuilder ;\r\n\t}\r\n\tvar errorHandler = {}\r\n\tvar isCallback = errorImpl instanceof Function;\r\n\tlocator = locator||{}\r\n\tfunction build(key){\r\n\t\tvar fn = errorImpl[key];\r\n\t\tif(!fn && isCallback){\r\n\t\t\tfn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;\r\n\t\t}\r\n\t\terrorHandler[key] = fn && function(msg){\r\n\t\t\tfn('[xmldom '+key+']\\t'+msg+_locator(locator));\r\n\t\t}||function(){};\r\n\t}\r\n\tbuild('warning');\r\n\tbuild('error');\r\n\tbuild('fatalError');\r\n\treturn errorHandler;\r\n}\r\n\r\n//console.log('#\\n\\n\\n\\n\\n\\n\\n####')\r\n/**\r\n * +ContentHandler+ErrorHandler\r\n * +LexicalHandler+EntityResolver2\r\n * -DeclHandler-DTDHandler \r\n * \r\n * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler\r\n * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html\r\n */\r\nfunction DOMHandler() {\r\n    this.cdata = false;\r\n}\r\nfunction position(locator,node){\r\n\tnode.lineNumber = locator.lineNumber;\r\n\tnode.columnNumber = locator.columnNumber;\r\n}\r\n/**\r\n * @see org.xml.sax.ContentHandler#startDocument\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html\r\n */ \r\nDOMHandler.prototype = {\r\n\tstartDocument : function() {\r\n    \tthis.doc = new DOMImplementation().createDocument(null, null, null);\r\n    \tif (this.locator) {\r\n        \tthis.doc.documentURI = this.locator.systemId;\r\n    \t}\r\n\t},\r\n\tstartElement:function(namespaceURI, localName, qName, attrs) {\r\n\t\tvar doc = this.doc;\r\n\t    var el = doc.createElementNS(namespaceURI, qName||localName);\r\n\t    var len = attrs.length;\r\n\t    appendElement(this, el);\r\n\t    this.currentElement = el;\r\n\t    \r\n\t\tthis.locator && position(this.locator,el)\r\n\t    for (var i = 0 ; i < len; i++) {\r\n\t        var namespaceURI = attrs.getURI(i);\r\n\t        var value = attrs.getValue(i);\r\n\t        var qName = attrs.getQName(i);\r\n\t\t\tvar attr = doc.createAttributeNS(namespaceURI, qName);\r\n\t\t\tthis.locator &&position(attrs.getLocator(i),attr);\r\n\t\t\tattr.value = attr.nodeValue = value;\r\n\t\t\tel.setAttributeNode(attr)\r\n\t    }\r\n\t},\r\n\tendElement:function(namespaceURI, localName, qName) {\r\n\t\tvar current = this.currentElement\r\n\t\tvar tagName = current.tagName;\r\n\t\tthis.currentElement = current.parentNode;\r\n\t},\r\n\tstartPrefixMapping:function(prefix, uri) {\r\n\t},\r\n\tendPrefixMapping:function(prefix) {\r\n\t},\r\n\tprocessingInstruction:function(target, data) {\r\n\t    var ins = this.doc.createProcessingInstruction(target, data);\r\n\t    this.locator && position(this.locator,ins)\r\n\t    appendElement(this, ins);\r\n\t},\r\n\tignorableWhitespace:function(ch, start, length) {\r\n\t},\r\n\tcharacters:function(chars, start, length) {\r\n\t\tchars = _toString.apply(this,arguments)\r\n\t\t//console.log(chars)\r\n\t\tif(chars){\r\n\t\t\tif (this.cdata) {\r\n\t\t\t\tvar charNode = this.doc.createCDATASection(chars);\r\n\t\t\t} else {\r\n\t\t\t\tvar charNode = this.doc.createTextNode(chars);\r\n\t\t\t}\r\n\t\t\tif(this.currentElement){\r\n\t\t\t\tthis.currentElement.appendChild(charNode);\r\n\t\t\t}else if(/^\\s*$/.test(chars)){\r\n\t\t\t\tthis.doc.appendChild(charNode);\r\n\t\t\t\t//process xml\r\n\t\t\t}\r\n\t\t\tthis.locator && position(this.locator,charNode)\r\n\t\t}\r\n\t},\r\n\tskippedEntity:function(name) {\r\n\t},\r\n\tendDocument:function() {\r\n\t\tthis.doc.normalize();\r\n\t},\r\n\tsetDocumentLocator:function (locator) {\r\n\t    if(this.locator = locator){// && !('lineNumber' in locator)){\r\n\t    \tlocator.lineNumber = 0;\r\n\t    }\r\n\t},\r\n\t//LexicalHandler\r\n\tcomment:function(chars, start, length) {\r\n\t\tchars = _toString.apply(this,arguments)\r\n\t    var comm = this.doc.createComment(chars);\r\n\t    this.locator && position(this.locator,comm)\r\n\t    appendElement(this, comm);\r\n\t},\r\n\t\r\n\tstartCDATA:function() {\r\n\t    //used in characters() methods\r\n\t    this.cdata = true;\r\n\t},\r\n\tendCDATA:function() {\r\n\t    this.cdata = false;\r\n\t},\r\n\t\r\n\tstartDTD:function(name, publicId, systemId) {\r\n\t\tvar impl = this.doc.implementation;\r\n\t    if (impl && impl.createDocumentType) {\r\n\t        var dt = impl.createDocumentType(name, publicId, systemId);\r\n\t        this.locator && position(this.locator,dt)\r\n\t        appendElement(this, dt);\r\n\t    }\r\n\t},\r\n\t/**\r\n\t * @see org.xml.sax.ErrorHandler\r\n\t * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html\r\n\t */\r\n\twarning:function(error) {\r\n\t\tconsole.warn('[xmldom warning]\\t'+error,_locator(this.locator));\r\n\t},\r\n\terror:function(error) {\r\n\t\tconsole.error('[xmldom error]\\t'+error,_locator(this.locator));\r\n\t},\r\n\tfatalError:function(error) {\r\n\t\tconsole.error('[xmldom fatalError]\\t'+error,_locator(this.locator));\r\n\t    throw error;\r\n\t}\r\n}\r\nfunction _locator(l){\r\n\tif(l){\r\n\t\treturn '\\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'\r\n\t}\r\n}\r\nfunction _toString(chars,start,length){\r\n\tif(typeof chars == 'string'){\r\n\t\treturn chars.substr(start,length)\r\n\t}else{//java sax connect width xmldom on rhino(what about: \"? && !(chars instanceof String)\")\r\n\t\tif(chars.length >= start+length || start){\r\n\t\t\treturn new java.lang.String(chars,start,length)+'';\r\n\t\t}\r\n\t\treturn chars;\r\n\t}\r\n}\r\n\r\n/*\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html\r\n * used method of org.xml.sax.ext.LexicalHandler:\r\n *  #comment(chars, start, length)\r\n *  #startCDATA()\r\n *  #endCDATA()\r\n *  #startDTD(name, publicId, systemId)\r\n *\r\n *\r\n * IGNORED method of org.xml.sax.ext.LexicalHandler:\r\n *  #endDTD()\r\n *  #startEntity(name)\r\n *  #endEntity(name)\r\n *\r\n *\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html\r\n * IGNORED method of org.xml.sax.ext.DeclHandler\r\n * \t#attributeDecl(eName, aName, type, mode, value)\r\n *  #elementDecl(name, model)\r\n *  #externalEntityDecl(name, publicId, systemId)\r\n *  #internalEntityDecl(name, value)\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html\r\n * IGNORED method of org.xml.sax.EntityResolver2\r\n *  #resolveEntity(String name,String publicId,String baseURI,String systemId)\r\n *  #resolveEntity(publicId, systemId)\r\n *  #getExternalSubset(name, baseURI)\r\n * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html\r\n * IGNORED method of org.xml.sax.DTDHandler\r\n *  #notationDecl(name, publicId, systemId) {};\r\n *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};\r\n */\r\n\"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl\".replace(/\\w+/g,function(key){\r\n\tDOMHandler.prototype[key] = function(){return null}\r\n})\r\n\r\n/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */\r\nfunction appendElement (hander,node) {\r\n    if (!hander.currentElement) {\r\n        hander.doc.appendChild(node);\r\n    } else {\r\n        hander.currentElement.appendChild(node);\r\n    }\r\n}//appendChild and setAttributeNS are preformance key\r\n\r\n//if(typeof require == 'function'){\r\n\tvar XMLReader = __webpack_require__(/*! ./sax */ \"./node_modules/xmldom/sax.js\").XMLReader;\r\n\tvar DOMImplementation = exports.DOMImplementation = __webpack_require__(/*! ./dom */ \"./node_modules/xmldom/dom.js\").DOMImplementation;\r\n\texports.XMLSerializer = __webpack_require__(/*! ./dom */ \"./node_modules/xmldom/dom.js\").XMLSerializer ;\r\n\texports.DOMParser = DOMParser;\r\n//}\r\n\n\n//# sourceURL=webpack://COS/./node_modules/xmldom/dom-parser.js?");

/***/ }),

/***/ "./node_modules/xmldom/dom.js":
/*!************************************!*\
  !*** ./node_modules/xmldom/dom.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {
>>>>>>> upd：webpack升级

eval("/*\n * DOM Level 2\n * Object DOMException\n * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html\n * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html\n */\n\nfunction copy(src,dest){\n\tfor(var p in src){\n\t\tdest[p] = src[p];\n\t}\n}\n/**\n^\\w+\\.prototype\\.([_\\w]+)\\s*=\\s*((?:.*\\{\\s*?[\\r\\n][\\s\\S]*?^})|\\S.*?(?=[;\\r\\n]));?\n^\\w+\\.prototype\\.([_\\w]+)\\s*=\\s*(\\S.*?(?=[;\\r\\n]));?\n */\nfunction _extends(Class,Super){\n\tvar pt = Class.prototype;\n\tif(Object.create){\n\t\tvar ppt = Object.create(Super.prototype)\n\t\tpt.__proto__ = ppt;\n\t}\n\tif(!(pt instanceof Super)){\n\t\tfunction t(){};\n\t\tt.prototype = Super.prototype;\n\t\tt = new t();\n\t\tcopy(pt,t);\n\t\tClass.prototype = pt = t;\n\t}\n\tif(pt.constructor != Class){\n\t\tif(typeof Class != 'function'){\n\t\t\tconsole.error(\"unknow Class:\"+Class)\n\t\t}\n\t\tpt.constructor = Class\n\t}\n}\nvar htmlns = 'http://www.w3.org/1999/xhtml' ;\n// Node Types\nvar NodeType = {}\nvar ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;\nvar ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;\nvar TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;\nvar CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;\nvar ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;\nvar ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;\nvar PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;\nvar COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;\nvar DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;\nvar DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;\nvar DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;\nvar NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;\n\n// ExceptionCode\nvar ExceptionCode = {}\nvar ExceptionMessage = {};\nvar INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]=\"Index size error\"),1);\nvar DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]=\"DOMString size error\"),2);\nvar HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]=\"Hierarchy request error\"),3);\nvar WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]=\"Wrong document\"),4);\nvar INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]=\"Invalid character\"),5);\nvar NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]=\"No data allowed\"),6);\nvar NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]=\"No modification allowed\"),7);\nvar NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]=\"Not found\"),8);\nvar NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]=\"Not supported\"),9);\nvar INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]=\"Attribute in use\"),10);\n//level2\nvar INVALID_STATE_ERR        \t= ExceptionCode.INVALID_STATE_ERR        \t= ((ExceptionMessage[11]=\"Invalid state\"),11);\nvar SYNTAX_ERR               \t= ExceptionCode.SYNTAX_ERR               \t= ((ExceptionMessage[12]=\"Syntax error\"),12);\nvar INVALID_MODIFICATION_ERR \t= ExceptionCode.INVALID_MODIFICATION_ERR \t= ((ExceptionMessage[13]=\"Invalid modification\"),13);\nvar NAMESPACE_ERR            \t= ExceptionCode.NAMESPACE_ERR           \t= ((ExceptionMessage[14]=\"Invalid namespace\"),14);\nvar INVALID_ACCESS_ERR       \t= ExceptionCode.INVALID_ACCESS_ERR      \t= ((ExceptionMessage[15]=\"Invalid access\"),15);\n\n\nfunction DOMException(code, message) {\n\tif(message instanceof Error){\n\t\tvar error = message;\n\t}else{\n\t\terror = this;\n\t\tError.call(this, ExceptionMessage[code]);\n\t\tthis.message = ExceptionMessage[code];\n\t\tif(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);\n\t}\n\terror.code = code;\n\tif(message) this.message = this.message + \": \" + message;\n\treturn error;\n};\nDOMException.prototype = Error.prototype;\ncopy(ExceptionCode,DOMException)\n/**\n * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177\n * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.\n * The items in the NodeList are accessible via an integral index, starting from 0.\n */\nfunction NodeList() {\n};\nNodeList.prototype = {\n\t/**\n\t * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.\n\t * @standard level1\n\t */\n\tlength:0, \n\t/**\n\t * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.\n\t * @standard level1\n\t * @param index  unsigned long \n\t *   Index into the collection.\n\t * @return Node\n\t * \tThe node at the indexth position in the NodeList, or null if that is not a valid index. \n\t */\n\titem: function(index) {\n\t\treturn this[index] || null;\n\t},\n\ttoString:function(isHTML,nodeFilter){\n\t\tfor(var buf = [], i = 0;i<this.length;i++){\n\t\t\tserializeToString(this[i],buf,isHTML,nodeFilter);\n\t\t}\n\t\treturn buf.join('');\n\t}\n};\nfunction LiveNodeList(node,refresh){\n\tthis._node = node;\n\tthis._refresh = refresh\n\t_updateLiveList(this);\n}\nfunction _updateLiveList(list){\n\tvar inc = list._node._inc || list._node.ownerDocument._inc;\n\tif(list._inc != inc){\n\t\tvar ls = list._refresh(list._node);\n\t\t//console.log(ls.length)\n\t\t__set__(list,'length',ls.length);\n\t\tcopy(ls,list);\n\t\tlist._inc = inc;\n\t}\n}\nLiveNodeList.prototype.item = function(i){\n\t_updateLiveList(this);\n\treturn this[i];\n}\n\n_extends(LiveNodeList,NodeList);\n/**\n * \n * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.\n * NamedNodeMap objects in the DOM are live.\n * used for attributes or DocumentType entities \n */\nfunction NamedNodeMap() {\n};\n\nfunction _findNodeIndex(list,node){\n\tvar i = list.length;\n\twhile(i--){\n\t\tif(list[i] === node){return i}\n\t}\n}\n\nfunction _addNamedNode(el,list,newAttr,oldAttr){\n\tif(oldAttr){\n\t\tlist[_findNodeIndex(list,oldAttr)] = newAttr;\n\t}else{\n\t\tlist[list.length++] = newAttr;\n\t}\n\tif(el){\n\t\tnewAttr.ownerElement = el;\n\t\tvar doc = el.ownerDocument;\n\t\tif(doc){\n\t\t\toldAttr && _onRemoveAttribute(doc,el,oldAttr);\n\t\t\t_onAddAttribute(doc,el,newAttr);\n\t\t}\n\t}\n}\nfunction _removeNamedNode(el,list,attr){\n\t//console.log('remove attr:'+attr)\n\tvar i = _findNodeIndex(list,attr);\n\tif(i>=0){\n\t\tvar lastIndex = list.length-1\n\t\twhile(i<lastIndex){\n\t\t\tlist[i] = list[++i]\n\t\t}\n\t\tlist.length = lastIndex;\n\t\tif(el){\n\t\t\tvar doc = el.ownerDocument;\n\t\t\tif(doc){\n\t\t\t\t_onRemoveAttribute(doc,el,attr);\n\t\t\t\tattr.ownerElement = null;\n\t\t\t}\n\t\t}\n\t}else{\n\t\tthrow DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))\n\t}\n}\nNamedNodeMap.prototype = {\n\tlength:0,\n\titem:NodeList.prototype.item,\n\tgetNamedItem: function(key) {\n//\t\tif(key.indexOf(':')>0 || key == 'xmlns'){\n//\t\t\treturn null;\n//\t\t}\n\t\t//console.log()\n\t\tvar i = this.length;\n\t\twhile(i--){\n\t\t\tvar attr = this[i];\n\t\t\t//console.log(attr.nodeName,key)\n\t\t\tif(attr.nodeName == key){\n\t\t\t\treturn attr;\n\t\t\t}\n\t\t}\n\t},\n\tsetNamedItem: function(attr) {\n\t\tvar el = attr.ownerElement;\n\t\tif(el && el!=this._ownerElement){\n\t\t\tthrow new DOMException(INUSE_ATTRIBUTE_ERR);\n\t\t}\n\t\tvar oldAttr = this.getNamedItem(attr.nodeName);\n\t\t_addNamedNode(this._ownerElement,this,attr,oldAttr);\n\t\treturn oldAttr;\n\t},\n\t/* returns Node */\n\tsetNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR\n\t\tvar el = attr.ownerElement, oldAttr;\n\t\tif(el && el!=this._ownerElement){\n\t\t\tthrow new DOMException(INUSE_ATTRIBUTE_ERR);\n\t\t}\n\t\toldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);\n\t\t_addNamedNode(this._ownerElement,this,attr,oldAttr);\n\t\treturn oldAttr;\n\t},\n\n\t/* returns Node */\n\tremoveNamedItem: function(key) {\n\t\tvar attr = this.getNamedItem(key);\n\t\t_removeNamedNode(this._ownerElement,this,attr);\n\t\treturn attr;\n\t\t\n\t\t\n\t},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR\n\t\n\t//for level2\n\tremoveNamedItemNS:function(namespaceURI,localName){\n\t\tvar attr = this.getNamedItemNS(namespaceURI,localName);\n\t\t_removeNamedNode(this._ownerElement,this,attr);\n\t\treturn attr;\n\t},\n\tgetNamedItemNS: function(namespaceURI, localName) {\n\t\tvar i = this.length;\n\t\twhile(i--){\n\t\t\tvar node = this[i];\n\t\t\tif(node.localName == localName && node.namespaceURI == namespaceURI){\n\t\t\t\treturn node;\n\t\t\t}\n\t\t}\n\t\treturn null;\n\t}\n};\n/**\n * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490\n */\nfunction DOMImplementation(/* Object */ features) {\n\tthis._features = {};\n\tif (features) {\n\t\tfor (var feature in features) {\n\t\t\t this._features = features[feature];\n\t\t}\n\t}\n};\n\nDOMImplementation.prototype = {\n\thasFeature: function(/* string */ feature, /* string */ version) {\n\t\tvar versions = this._features[feature.toLowerCase()];\n\t\tif (versions && (!version || version in versions)) {\n\t\t\treturn true;\n\t\t} else {\n\t\t\treturn false;\n\t\t}\n\t},\n\t// Introduced in DOM Level 2:\n\tcreateDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR\n\t\tvar doc = new Document();\n\t\tdoc.implementation = this;\n\t\tdoc.childNodes = new NodeList();\n\t\tdoc.doctype = doctype;\n\t\tif(doctype){\n\t\t\tdoc.appendChild(doctype);\n\t\t}\n\t\tif(qualifiedName){\n\t\t\tvar root = doc.createElementNS(namespaceURI,qualifiedName);\n\t\t\tdoc.appendChild(root);\n\t\t}\n\t\treturn doc;\n\t},\n\t// Introduced in DOM Level 2:\n\tcreateDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR\n\t\tvar node = new DocumentType();\n\t\tnode.name = qualifiedName;\n\t\tnode.nodeName = qualifiedName;\n\t\tnode.publicId = publicId;\n\t\tnode.systemId = systemId;\n\t\t// Introduced in DOM Level 2:\n\t\t//readonly attribute DOMString        internalSubset;\n\t\t\n\t\t//TODO:..\n\t\t//  readonly attribute NamedNodeMap     entities;\n\t\t//  readonly attribute NamedNodeMap     notations;\n\t\treturn node;\n\t}\n};\n\n\n/**\n * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247\n */\n\nfunction Node() {\n};\n\nNode.prototype = {\n\tfirstChild : null,\n\tlastChild : null,\n\tpreviousSibling : null,\n\tnextSibling : null,\n\tattributes : null,\n\tparentNode : null,\n\tchildNodes : null,\n\townerDocument : null,\n\tnodeValue : null,\n\tnamespaceURI : null,\n\tprefix : null,\n\tlocalName : null,\n\t// Modified in DOM Level 2:\n\tinsertBefore:function(newChild, refChild){//raises \n\t\treturn _insertBefore(this,newChild,refChild);\n\t},\n\treplaceChild:function(newChild, oldChild){//raises \n\t\tthis.insertBefore(newChild,oldChild);\n\t\tif(oldChild){\n\t\t\tthis.removeChild(oldChild);\n\t\t}\n\t},\n\tremoveChild:function(oldChild){\n\t\treturn _removeChild(this,oldChild);\n\t},\n\tappendChild:function(newChild){\n\t\treturn this.insertBefore(newChild,null);\n\t},\n\thasChildNodes:function(){\n\t\treturn this.firstChild != null;\n\t},\n\tcloneNode:function(deep){\n\t\treturn cloneNode(this.ownerDocument||this,this,deep);\n\t},\n\t// Modified in DOM Level 2:\n\tnormalize:function(){\n\t\tvar child = this.firstChild;\n\t\twhile(child){\n\t\t\tvar next = child.nextSibling;\n\t\t\tif(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){\n\t\t\t\tthis.removeChild(next);\n\t\t\t\tchild.appendData(next.data);\n\t\t\t}else{\n\t\t\t\tchild.normalize();\n\t\t\t\tchild = next;\n\t\t\t}\n\t\t}\n\t},\n  \t// Introduced in DOM Level 2:\n\tisSupported:function(feature, version){\n\t\treturn this.ownerDocument.implementation.hasFeature(feature,version);\n\t},\n    // Introduced in DOM Level 2:\n    hasAttributes:function(){\n    \treturn this.attributes.length>0;\n    },\n    lookupPrefix:function(namespaceURI){\n    \tvar el = this;\n    \twhile(el){\n    \t\tvar map = el._nsMap;\n    \t\t//console.dir(map)\n    \t\tif(map){\n    \t\t\tfor(var n in map){\n    \t\t\t\tif(map[n] == namespaceURI){\n    \t\t\t\t\treturn n;\n    \t\t\t\t}\n    \t\t\t}\n    \t\t}\n    \t\tel = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;\n    \t}\n    \treturn null;\n    },\n    // Introduced in DOM Level 3:\n    lookupNamespaceURI:function(prefix){\n    \tvar el = this;\n    \twhile(el){\n    \t\tvar map = el._nsMap;\n    \t\t//console.dir(map)\n    \t\tif(map){\n    \t\t\tif(prefix in map){\n    \t\t\t\treturn map[prefix] ;\n    \t\t\t}\n    \t\t}\n    \t\tel = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;\n    \t}\n    \treturn null;\n    },\n    // Introduced in DOM Level 3:\n    isDefaultNamespace:function(namespaceURI){\n    \tvar prefix = this.lookupPrefix(namespaceURI);\n    \treturn prefix == null;\n    }\n};\n\n\nfunction _xmlEncoder(c){\n\treturn c == '<' && '&lt;' ||\n         c == '>' && '&gt;' ||\n         c == '&' && '&amp;' ||\n         c == '\"' && '&quot;' ||\n         '&#'+c.charCodeAt()+';'\n}\n\n\ncopy(NodeType,Node);\ncopy(NodeType,Node.prototype);\n\n/**\n * @param callback return true for continue,false for break\n * @return boolean true: break visit;\n */\nfunction _visitNode(node,callback){\n\tif(callback(node)){\n\t\treturn true;\n\t}\n\tif(node = node.firstChild){\n\t\tdo{\n\t\t\tif(_visitNode(node,callback)){return true}\n        }while(node=node.nextSibling)\n    }\n}\n\n\n\nfunction Document(){\n}\nfunction _onAddAttribute(doc,el,newAttr){\n\tdoc && doc._inc++;\n\tvar ns = newAttr.namespaceURI ;\n\tif(ns == 'http://www.w3.org/2000/xmlns/'){\n\t\t//update namespace\n\t\tel._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value\n\t}\n}\nfunction _onRemoveAttribute(doc,el,newAttr,remove){\n\tdoc && doc._inc++;\n\tvar ns = newAttr.namespaceURI ;\n\tif(ns == 'http://www.w3.org/2000/xmlns/'){\n\t\t//update namespace\n\t\tdelete el._nsMap[newAttr.prefix?newAttr.localName:'']\n\t}\n}\nfunction _onUpdateChild(doc,el,newChild){\n\tif(doc && doc._inc){\n\t\tdoc._inc++;\n\t\t//update childNodes\n\t\tvar cs = el.childNodes;\n\t\tif(newChild){\n\t\t\tcs[cs.length++] = newChild;\n\t\t}else{\n\t\t\t//console.log(1)\n\t\t\tvar child = el.firstChild;\n\t\t\tvar i = 0;\n\t\t\twhile(child){\n\t\t\t\tcs[i++] = child;\n\t\t\t\tchild =child.nextSibling;\n\t\t\t}\n\t\t\tcs.length = i;\n\t\t}\n\t}\n}\n\n/**\n * attributes;\n * children;\n * \n * writeable properties:\n * nodeValue,Attr:value,CharacterData:data\n * prefix\n */\nfunction _removeChild(parentNode,child){\n\tvar previous = child.previousSibling;\n\tvar next = child.nextSibling;\n\tif(previous){\n\t\tprevious.nextSibling = next;\n\t}else{\n\t\tparentNode.firstChild = next\n\t}\n\tif(next){\n\t\tnext.previousSibling = previous;\n\t}else{\n\t\tparentNode.lastChild = previous;\n\t}\n\t_onUpdateChild(parentNode.ownerDocument,parentNode);\n\treturn child;\n}\n/**\n * preformance key(refChild == null)\n */\nfunction _insertBefore(parentNode,newChild,nextChild){\n\tvar cp = newChild.parentNode;\n\tif(cp){\n\t\tcp.removeChild(newChild);//remove and update\n\t}\n\tif(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){\n\t\tvar newFirst = newChild.firstChild;\n\t\tif (newFirst == null) {\n\t\t\treturn newChild;\n\t\t}\n\t\tvar newLast = newChild.lastChild;\n\t}else{\n\t\tnewFirst = newLast = newChild;\n\t}\n\tvar pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;\n\n\tnewFirst.previousSibling = pre;\n\tnewLast.nextSibling = nextChild;\n\t\n\t\n\tif(pre){\n\t\tpre.nextSibling = newFirst;\n\t}else{\n\t\tparentNode.firstChild = newFirst;\n\t}\n\tif(nextChild == null){\n\t\tparentNode.lastChild = newLast;\n\t}else{\n\t\tnextChild.previousSibling = newLast;\n\t}\n\tdo{\n\t\tnewFirst.parentNode = parentNode;\n\t}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))\n\t_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);\n\t//console.log(parentNode.lastChild.nextSibling == null)\n\tif (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {\n\t\tnewChild.firstChild = newChild.lastChild = null;\n\t}\n\treturn newChild;\n}\nfunction _appendSingleChild(parentNode,newChild){\n\tvar cp = newChild.parentNode;\n\tif(cp){\n\t\tvar pre = parentNode.lastChild;\n\t\tcp.removeChild(newChild);//remove and update\n\t\tvar pre = parentNode.lastChild;\n\t}\n\tvar pre = parentNode.lastChild;\n\tnewChild.parentNode = parentNode;\n\tnewChild.previousSibling = pre;\n\tnewChild.nextSibling = null;\n\tif(pre){\n\t\tpre.nextSibling = newChild;\n\t}else{\n\t\tparentNode.firstChild = newChild;\n\t}\n\tparentNode.lastChild = newChild;\n\t_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);\n\treturn newChild;\n\t//console.log(\"__aa\",parentNode.lastChild.nextSibling == null)\n}\nDocument.prototype = {\n\t//implementation : null,\n\tnodeName :  '#document',\n\tnodeType :  DOCUMENT_NODE,\n\tdoctype :  null,\n\tdocumentElement :  null,\n\t_inc : 1,\n\t\n\tinsertBefore :  function(newChild, refChild){//raises \n\t\tif(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){\n\t\t\tvar child = newChild.firstChild;\n\t\t\twhile(child){\n\t\t\t\tvar next = child.nextSibling;\n\t\t\t\tthis.insertBefore(child,refChild);\n\t\t\t\tchild = next;\n\t\t\t}\n\t\t\treturn newChild;\n\t\t}\n\t\tif(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){\n\t\t\tthis.documentElement = newChild;\n\t\t}\n\t\t\n\t\treturn _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;\n\t},\n\tremoveChild :  function(oldChild){\n\t\tif(this.documentElement == oldChild){\n\t\t\tthis.documentElement = null;\n\t\t}\n\t\treturn _removeChild(this,oldChild);\n\t},\n\t// Introduced in DOM Level 2:\n\timportNode : function(importedNode,deep){\n\t\treturn importNode(this,importedNode,deep);\n\t},\n\t// Introduced in DOM Level 2:\n\tgetElementById :\tfunction(id){\n\t\tvar rtv = null;\n\t\t_visitNode(this.documentElement,function(node){\n\t\t\tif(node.nodeType == ELEMENT_NODE){\n\t\t\t\tif(node.getAttribute('id') == id){\n\t\t\t\t\trtv = node;\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t})\n\t\treturn rtv;\n\t},\n\t\n\t//document factory method:\n\tcreateElement :\tfunction(tagName){\n\t\tvar node = new Element();\n\t\tnode.ownerDocument = this;\n\t\tnode.nodeName = tagName;\n\t\tnode.tagName = tagName;\n\t\tnode.childNodes = new NodeList();\n\t\tvar attrs\t= node.attributes = new NamedNodeMap();\n\t\tattrs._ownerElement = node;\n\t\treturn node;\n\t},\n\tcreateDocumentFragment :\tfunction(){\n\t\tvar node = new DocumentFragment();\n\t\tnode.ownerDocument = this;\n\t\tnode.childNodes = new NodeList();\n\t\treturn node;\n\t},\n\tcreateTextNode :\tfunction(data){\n\t\tvar node = new Text();\n\t\tnode.ownerDocument = this;\n\t\tnode.appendData(data)\n\t\treturn node;\n\t},\n\tcreateComment :\tfunction(data){\n\t\tvar node = new Comment();\n\t\tnode.ownerDocument = this;\n\t\tnode.appendData(data)\n\t\treturn node;\n\t},\n\tcreateCDATASection :\tfunction(data){\n\t\tvar node = new CDATASection();\n\t\tnode.ownerDocument = this;\n\t\tnode.appendData(data)\n\t\treturn node;\n\t},\n\tcreateProcessingInstruction :\tfunction(target,data){\n\t\tvar node = new ProcessingInstruction();\n\t\tnode.ownerDocument = this;\n\t\tnode.tagName = node.target = target;\n\t\tnode.nodeValue= node.data = data;\n\t\treturn node;\n\t},\n\tcreateAttribute :\tfunction(name){\n\t\tvar node = new Attr();\n\t\tnode.ownerDocument\t= this;\n\t\tnode.name = name;\n\t\tnode.nodeName\t= name;\n\t\tnode.localName = name;\n\t\tnode.specified = true;\n\t\treturn node;\n\t},\n\tcreateEntityReference :\tfunction(name){\n\t\tvar node = new EntityReference();\n\t\tnode.ownerDocument\t= this;\n\t\tnode.nodeName\t= name;\n\t\treturn node;\n\t},\n\t// Introduced in DOM Level 2:\n\tcreateElementNS :\tfunction(namespaceURI,qualifiedName){\n\t\tvar node = new Element();\n\t\tvar pl = qualifiedName.split(':');\n\t\tvar attrs\t= node.attributes = new NamedNodeMap();\n\t\tnode.childNodes = new NodeList();\n\t\tnode.ownerDocument = this;\n\t\tnode.nodeName = qualifiedName;\n\t\tnode.tagName = qualifiedName;\n\t\tnode.namespaceURI = namespaceURI;\n\t\tif(pl.length == 2){\n\t\t\tnode.prefix = pl[0];\n\t\t\tnode.localName = pl[1];\n\t\t}else{\n\t\t\t//el.prefix = null;\n\t\t\tnode.localName = qualifiedName;\n\t\t}\n\t\tattrs._ownerElement = node;\n\t\treturn node;\n\t},\n\t// Introduced in DOM Level 2:\n\tcreateAttributeNS :\tfunction(namespaceURI,qualifiedName){\n\t\tvar node = new Attr();\n\t\tvar pl = qualifiedName.split(':');\n\t\tnode.ownerDocument = this;\n\t\tnode.nodeName = qualifiedName;\n\t\tnode.name = qualifiedName;\n\t\tnode.namespaceURI = namespaceURI;\n\t\tnode.specified = true;\n\t\tif(pl.length == 2){\n\t\t\tnode.prefix = pl[0];\n\t\t\tnode.localName = pl[1];\n\t\t}else{\n\t\t\t//el.prefix = null;\n\t\t\tnode.localName = qualifiedName;\n\t\t}\n\t\treturn node;\n\t}\n};\n_extends(Document,Node);\n\n\nfunction Element() {\n\tthis._nsMap = {};\n};\nElement.prototype = {\n\tnodeType : ELEMENT_NODE,\n\thasAttribute : function(name){\n\t\treturn this.getAttributeNode(name)!=null;\n\t},\n\tgetAttribute : function(name){\n\t\tvar attr = this.getAttributeNode(name);\n\t\treturn attr && attr.value || '';\n\t},\n\tgetAttributeNode : function(name){\n\t\treturn this.attributes.getNamedItem(name);\n\t},\n\tsetAttribute : function(name, value){\n\t\tvar attr = this.ownerDocument.createAttribute(name);\n\t\tattr.value = attr.nodeValue = \"\" + value;\n\t\tthis.setAttributeNode(attr)\n\t},\n\tremoveAttribute : function(name){\n\t\tvar attr = this.getAttributeNode(name)\n\t\tattr && this.removeAttributeNode(attr);\n\t},\n\t\n\t//four real opeartion method\n\tappendChild:function(newChild){\n\t\tif(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){\n\t\t\treturn this.insertBefore(newChild,null);\n\t\t}else{\n\t\t\treturn _appendSingleChild(this,newChild);\n\t\t}\n\t},\n\tsetAttributeNode : function(newAttr){\n\t\treturn this.attributes.setNamedItem(newAttr);\n\t},\n\tsetAttributeNodeNS : function(newAttr){\n\t\treturn this.attributes.setNamedItemNS(newAttr);\n\t},\n\tremoveAttributeNode : function(oldAttr){\n\t\t//console.log(this == oldAttr.ownerElement)\n\t\treturn this.attributes.removeNamedItem(oldAttr.nodeName);\n\t},\n\t//get real attribute name,and remove it by removeAttributeNode\n\tremoveAttributeNS : function(namespaceURI, localName){\n\t\tvar old = this.getAttributeNodeNS(namespaceURI, localName);\n\t\told && this.removeAttributeNode(old);\n\t},\n\t\n\thasAttributeNS : function(namespaceURI, localName){\n\t\treturn this.getAttributeNodeNS(namespaceURI, localName)!=null;\n\t},\n\tgetAttributeNS : function(namespaceURI, localName){\n\t\tvar attr = this.getAttributeNodeNS(namespaceURI, localName);\n\t\treturn attr && attr.value || '';\n\t},\n\tsetAttributeNS : function(namespaceURI, qualifiedName, value){\n\t\tvar attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);\n\t\tattr.value = attr.nodeValue = \"\" + value;\n\t\tthis.setAttributeNode(attr)\n\t},\n\tgetAttributeNodeNS : function(namespaceURI, localName){\n\t\treturn this.attributes.getNamedItemNS(namespaceURI, localName);\n\t},\n\t\n\tgetElementsByTagName : function(tagName){\n\t\treturn new LiveNodeList(this,function(base){\n\t\t\tvar ls = [];\n\t\t\t_visitNode(base,function(node){\n\t\t\t\tif(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){\n\t\t\t\t\tls.push(node);\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn ls;\n\t\t});\n\t},\n\tgetElementsByTagNameNS : function(namespaceURI, localName){\n\t\treturn new LiveNodeList(this,function(base){\n\t\t\tvar ls = [];\n\t\t\t_visitNode(base,function(node){\n\t\t\t\tif(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){\n\t\t\t\t\tls.push(node);\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn ls;\n\t\t\t\n\t\t});\n\t}\n};\nDocument.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;\nDocument.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;\n\n\n_extends(Element,Node);\nfunction Attr() {\n};\nAttr.prototype.nodeType = ATTRIBUTE_NODE;\n_extends(Attr,Node);\n\n\nfunction CharacterData() {\n};\nCharacterData.prototype = {\n\tdata : '',\n\tsubstringData : function(offset, count) {\n\t\treturn this.data.substring(offset, offset+count);\n\t},\n\tappendData: function(text) {\n\t\ttext = this.data+text;\n\t\tthis.nodeValue = this.data = text;\n\t\tthis.length = text.length;\n\t},\n\tinsertData: function(offset,text) {\n\t\tthis.replaceData(offset,0,text);\n\t\n\t},\n\tappendChild:function(newChild){\n\t\tthrow new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])\n\t},\n\tdeleteData: function(offset, count) {\n\t\tthis.replaceData(offset,count,\"\");\n\t},\n\treplaceData: function(offset, count, text) {\n\t\tvar start = this.data.substring(0,offset);\n\t\tvar end = this.data.substring(offset+count);\n\t\ttext = start + text + end;\n\t\tthis.nodeValue = this.data = text;\n\t\tthis.length = text.length;\n\t}\n}\n_extends(CharacterData,Node);\nfunction Text() {\n};\nText.prototype = {\n\tnodeName : \"#text\",\n\tnodeType : TEXT_NODE,\n\tsplitText : function(offset) {\n\t\tvar text = this.data;\n\t\tvar newText = text.substring(offset);\n\t\ttext = text.substring(0, offset);\n\t\tthis.data = this.nodeValue = text;\n\t\tthis.length = text.length;\n\t\tvar newNode = this.ownerDocument.createTextNode(newText);\n\t\tif(this.parentNode){\n\t\t\tthis.parentNode.insertBefore(newNode, this.nextSibling);\n\t\t}\n\t\treturn newNode;\n\t}\n}\n_extends(Text,CharacterData);\nfunction Comment() {\n};\nComment.prototype = {\n\tnodeName : \"#comment\",\n\tnodeType : COMMENT_NODE\n}\n_extends(Comment,CharacterData);\n\nfunction CDATASection() {\n};\nCDATASection.prototype = {\n\tnodeName : \"#cdata-section\",\n\tnodeType : CDATA_SECTION_NODE\n}\n_extends(CDATASection,CharacterData);\n\n\nfunction DocumentType() {\n};\nDocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;\n_extends(DocumentType,Node);\n\nfunction Notation() {\n};\nNotation.prototype.nodeType = NOTATION_NODE;\n_extends(Notation,Node);\n\nfunction Entity() {\n};\nEntity.prototype.nodeType = ENTITY_NODE;\n_extends(Entity,Node);\n\nfunction EntityReference() {\n};\nEntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;\n_extends(EntityReference,Node);\n\nfunction DocumentFragment() {\n};\nDocumentFragment.prototype.nodeName =\t\"#document-fragment\";\nDocumentFragment.prototype.nodeType =\tDOCUMENT_FRAGMENT_NODE;\n_extends(DocumentFragment,Node);\n\n\nfunction ProcessingInstruction() {\n}\nProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;\n_extends(ProcessingInstruction,Node);\nfunction XMLSerializer(){}\nXMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){\n\treturn nodeSerializeToString.call(node,isHtml,nodeFilter);\n}\nNode.prototype.toString = nodeSerializeToString;\nfunction nodeSerializeToString(isHtml,nodeFilter){\n\tvar buf = [];\n\tvar refNode = this.nodeType == 9?this.documentElement:this;\n\tvar prefix = refNode.prefix;\n\tvar uri = refNode.namespaceURI;\n\t\n\tif(uri && prefix == null){\n\t\t//console.log(prefix)\n\t\tvar prefix = refNode.lookupPrefix(uri);\n\t\tif(prefix == null){\n\t\t\t//isHTML = true;\n\t\t\tvar visibleNamespaces=[\n\t\t\t{namespace:uri,prefix:null}\n\t\t\t//{namespace:uri,prefix:''}\n\t\t\t]\n\t\t}\n\t}\n\tserializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);\n\t//console.log('###',this.nodeType,uri,prefix,buf.join(''))\n\treturn buf.join('');\n}\nfunction needNamespaceDefine(node,isHTML, visibleNamespaces) {\n\tvar prefix = node.prefix||'';\n\tvar uri = node.namespaceURI;\n\tif (!prefix && !uri){\n\t\treturn false;\n\t}\n\tif (prefix === \"xml\" && uri === \"http://www.w3.org/XML/1998/namespace\" \n\t\t|| uri == 'http://www.w3.org/2000/xmlns/'){\n\t\treturn false;\n\t}\n\t\n\tvar i = visibleNamespaces.length \n\t//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)\n\twhile (i--) {\n\t\tvar ns = visibleNamespaces[i];\n\t\t// get namespace prefix\n\t\t//console.log(node.nodeType,node.tagName,ns.prefix,prefix)\n\t\tif (ns.prefix == prefix){\n\t\t\treturn ns.namespace != uri;\n\t\t}\n\t}\n\t//console.log(isHTML,uri,prefix=='')\n\t//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){\n\t//\treturn false;\n\t//}\n\t//node.flag = '11111'\n\t//console.error(3,true,node.flag,node.prefix,node.namespaceURI)\n\treturn true;\n}\nfunction serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){\n\tif(nodeFilter){\n\t\tnode = nodeFilter(node);\n\t\tif(node){\n\t\t\tif(typeof node == 'string'){\n\t\t\t\tbuf.push(node);\n\t\t\t\treturn;\n\t\t\t}\n\t\t}else{\n\t\t\treturn;\n\t\t}\n\t\t//buf.sort.apply(attrs, attributeSorter);\n\t}\n\tswitch(node.nodeType){\n\tcase ELEMENT_NODE:\n\t\tif (!visibleNamespaces) visibleNamespaces = [];\n\t\tvar startVisibleNamespaces = visibleNamespaces.length;\n\t\tvar attrs = node.attributes;\n\t\tvar len = attrs.length;\n\t\tvar child = node.firstChild;\n\t\tvar nodeName = node.tagName;\n\t\t\n\t\tisHTML =  (htmlns === node.namespaceURI) ||isHTML \n\t\tbuf.push('<',nodeName);\n\t\t\n\t\t\n\t\t\n\t\tfor(var i=0;i<len;i++){\n\t\t\t// add namespaces for attributes\n\t\t\tvar attr = attrs.item(i);\n\t\t\tif (attr.prefix == 'xmlns') {\n\t\t\t\tvisibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });\n\t\t\t}else if(attr.nodeName == 'xmlns'){\n\t\t\t\tvisibleNamespaces.push({ prefix: '', namespace: attr.value });\n\t\t\t}\n\t\t}\n\t\tfor(var i=0;i<len;i++){\n\t\t\tvar attr = attrs.item(i);\n\t\t\tif (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {\n\t\t\t\tvar prefix = attr.prefix||'';\n\t\t\t\tvar uri = attr.namespaceURI;\n\t\t\t\tvar ns = prefix ? ' xmlns:' + prefix : \" xmlns\";\n\t\t\t\tbuf.push(ns, '=\"' , uri , '\"');\n\t\t\t\tvisibleNamespaces.push({ prefix: prefix, namespace:uri });\n\t\t\t}\n\t\t\tserializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);\n\t\t}\n\t\t// add namespace for current node\t\t\n\t\tif (needNamespaceDefine(node,isHTML, visibleNamespaces)) {\n\t\t\tvar prefix = node.prefix||'';\n\t\t\tvar uri = node.namespaceURI;\n\t\t\tvar ns = prefix ? ' xmlns:' + prefix : \" xmlns\";\n\t\t\tbuf.push(ns, '=\"' , uri , '\"');\n\t\t\tvisibleNamespaces.push({ prefix: prefix, namespace:uri });\n\t\t}\n\t\t\n\t\tif(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){\n\t\t\tbuf.push('>');\n\t\t\t//if is cdata child node\n\t\t\tif(isHTML && /^script$/i.test(nodeName)){\n\t\t\t\twhile(child){\n\t\t\t\t\tif(child.data){\n\t\t\t\t\t\tbuf.push(child.data);\n\t\t\t\t\t}else{\n\t\t\t\t\t\tserializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);\n\t\t\t\t\t}\n\t\t\t\t\tchild = child.nextSibling;\n\t\t\t\t}\n\t\t\t}else\n\t\t\t{\n\t\t\t\twhile(child){\n\t\t\t\t\tserializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);\n\t\t\t\t\tchild = child.nextSibling;\n\t\t\t\t}\n\t\t\t}\n\t\t\tbuf.push('</',nodeName,'>');\n\t\t}else{\n\t\t\tbuf.push('/>');\n\t\t}\n\t\t// remove added visible namespaces\n\t\t//visibleNamespaces.length = startVisibleNamespaces;\n\t\treturn;\n\tcase DOCUMENT_NODE:\n\tcase DOCUMENT_FRAGMENT_NODE:\n\t\tvar child = node.firstChild;\n\t\twhile(child){\n\t\t\tserializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);\n\t\t\tchild = child.nextSibling;\n\t\t}\n\t\treturn;\n\tcase ATTRIBUTE_NODE:\n\t\treturn buf.push(' ',node.name,'=\"',node.value.replace(/[<&\"]/g,_xmlEncoder),'\"');\n\tcase TEXT_NODE:\n\t\treturn buf.push(node.data.replace(/[<&]/g,_xmlEncoder));\n\tcase CDATA_SECTION_NODE:\n\t\treturn buf.push( '<![CDATA[',node.data,']]>');\n\tcase COMMENT_NODE:\n\t\treturn buf.push( \"<!--\",node.data,\"-->\");\n\tcase DOCUMENT_TYPE_NODE:\n\t\tvar pubid = node.publicId;\n\t\tvar sysid = node.systemId;\n\t\tbuf.push('<!DOCTYPE ',node.name);\n\t\tif(pubid){\n\t\t\tbuf.push(' PUBLIC \"',pubid);\n\t\t\tif (sysid && sysid!='.') {\n\t\t\t\tbuf.push( '\" \"',sysid);\n\t\t\t}\n\t\t\tbuf.push('\">');\n\t\t}else if(sysid && sysid!='.'){\n\t\t\tbuf.push(' SYSTEM \"',sysid,'\">');\n\t\t}else{\n\t\t\tvar sub = node.internalSubset;\n\t\t\tif(sub){\n\t\t\t\tbuf.push(\" [\",sub,\"]\");\n\t\t\t}\n\t\t\tbuf.push(\">\");\n\t\t}\n\t\treturn;\n\tcase PROCESSING_INSTRUCTION_NODE:\n\t\treturn buf.push( \"<?\",node.target,\" \",node.data,\"?>\");\n\tcase ENTITY_REFERENCE_NODE:\n\t\treturn buf.push( '&',node.nodeName,';');\n\t//case ENTITY_NODE:\n\t//case NOTATION_NODE:\n\tdefault:\n\t\tbuf.push('??',node.nodeName);\n\t}\n}\nfunction importNode(doc,node,deep){\n\tvar node2;\n\tswitch (node.nodeType) {\n\tcase ELEMENT_NODE:\n\t\tnode2 = node.cloneNode(false);\n\t\tnode2.ownerDocument = doc;\n\t\t//var attrs = node2.attributes;\n\t\t//var len = attrs.length;\n\t\t//for(var i=0;i<len;i++){\n\t\t\t//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));\n\t\t//}\n\tcase DOCUMENT_FRAGMENT_NODE:\n\t\tbreak;\n\tcase ATTRIBUTE_NODE:\n\t\tdeep = true;\n\t\tbreak;\n\t//case ENTITY_REFERENCE_NODE:\n\t//case PROCESSING_INSTRUCTION_NODE:\n\t////case TEXT_NODE:\n\t//case CDATA_SECTION_NODE:\n\t//case COMMENT_NODE:\n\t//\tdeep = false;\n\t//\tbreak;\n\t//case DOCUMENT_NODE:\n\t//case DOCUMENT_TYPE_NODE:\n\t//cannot be imported.\n\t//case ENTITY_NODE:\n\t//case NOTATION_NODE：\n\t//can not hit in level3\n\t//default:throw e;\n\t}\n\tif(!node2){\n\t\tnode2 = node.cloneNode(false);//false\n\t}\n\tnode2.ownerDocument = doc;\n\tnode2.parentNode = null;\n\tif(deep){\n\t\tvar child = node.firstChild;\n\t\twhile(child){\n\t\t\tnode2.appendChild(importNode(doc,child,deep));\n\t\t\tchild = child.nextSibling;\n\t\t}\n\t}\n\treturn node2;\n}\n//\n//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,\n//\t\t\t\t\tattributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};\nfunction cloneNode(doc,node,deep){\n\tvar node2 = new node.constructor();\n\tfor(var n in node){\n\t\tvar v = node[n];\n\t\tif(typeof v != 'object' ){\n\t\t\tif(v != node2[n]){\n\t\t\t\tnode2[n] = v;\n\t\t\t}\n\t\t}\n\t}\n\tif(node.childNodes){\n\t\tnode2.childNodes = new NodeList();\n\t}\n\tnode2.ownerDocument = doc;\n\tswitch (node2.nodeType) {\n\tcase ELEMENT_NODE:\n\t\tvar attrs\t= node.attributes;\n\t\tvar attrs2\t= node2.attributes = new NamedNodeMap();\n\t\tvar len = attrs.length\n\t\tattrs2._ownerElement = node2;\n\t\tfor(var i=0;i<len;i++){\n\t\t\tnode2.setAttributeNode(cloneNode(doc,attrs.item(i),true));\n\t\t}\n\t\tbreak;;\n\tcase ATTRIBUTE_NODE:\n\t\tdeep = true;\n\t}\n\tif(deep){\n\t\tvar child = node.firstChild;\n\t\twhile(child){\n\t\t\tnode2.appendChild(cloneNode(doc,child,deep));\n\t\t\tchild = child.nextSibling;\n\t\t}\n\t}\n\treturn node2;\n}\n\nfunction __set__(object,key,value){\n\tobject[key] = value\n}\n//do dynamic\ntry{\n\tif(Object.defineProperty){\n\t\tObject.defineProperty(LiveNodeList.prototype,'length',{\n\t\t\tget:function(){\n\t\t\t\t_updateLiveList(this);\n\t\t\t\treturn this.$$length;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(Node.prototype,'textContent',{\n\t\t\tget:function(){\n\t\t\t\treturn getTextContent(this);\n\t\t\t},\n\t\t\tset:function(data){\n\t\t\t\tswitch(this.nodeType){\n\t\t\t\tcase ELEMENT_NODE:\n\t\t\t\tcase DOCUMENT_FRAGMENT_NODE:\n\t\t\t\t\twhile(this.firstChild){\n\t\t\t\t\t\tthis.removeChild(this.firstChild);\n\t\t\t\t\t}\n\t\t\t\t\tif(data || String(data)){\n\t\t\t\t\t\tthis.appendChild(this.ownerDocument.createTextNode(data));\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\t//TODO:\n\t\t\t\t\tthis.data = data;\n\t\t\t\t\tthis.value = data;\n\t\t\t\t\tthis.nodeValue = data;\n\t\t\t\t}\n\t\t\t}\n\t\t})\n\t\t\n\t\tfunction getTextContent(node){\n\t\t\tswitch(node.nodeType){\n\t\t\tcase ELEMENT_NODE:\n\t\t\tcase DOCUMENT_FRAGMENT_NODE:\n\t\t\t\tvar buf = [];\n\t\t\t\tnode = node.firstChild;\n\t\t\t\twhile(node){\n\t\t\t\t\tif(node.nodeType!==7 && node.nodeType !==8){\n\t\t\t\t\t\tbuf.push(getTextContent(node));\n\t\t\t\t\t}\n\t\t\t\t\tnode = node.nextSibling;\n\t\t\t\t}\n\t\t\t\treturn buf.join('');\n\t\t\tdefault:\n\t\t\t\treturn node.nodeValue;\n\t\t\t}\n\t\t}\n\t\t__set__ = function(object,key,value){\n\t\t\t//console.log(value)\n\t\t\tobject['$$'+key] = value\n\t\t}\n\t}\n}catch(e){//ie8\n}\n\n//if(typeof require == 'function'){\n\texports.DOMImplementation = DOMImplementation;\n\texports.XMLSerializer = XMLSerializer;\n//}\n\n\n//# sourceURL=webpack://COS/./node_modules/xmldom/dom.js?");

/***/ }),

/***/ "./node_modules/xmldom/sax.js":
/*!************************************!*\
  !*** ./node_modules/xmldom/sax.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//[4]   \tNameStartChar\t   ::=   \t\":\" | [A-Z] | \"_\" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]\r\n//[4a]   \tNameChar\t   ::=   \tNameStartChar | \"-\" | \".\" | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]\r\n//[5]   \tName\t   ::=   \tNameStartChar (NameChar)*\r\nvar nameStartChar = /[A-Z_a-z\\xC0-\\xD6\\xD8-\\xF6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]///\\u10000-\\uEFFFF\r\nvar nameChar = new RegExp(\"[\\\\-\\\\.0-9\"+nameStartChar.source.slice(1,-1)+\"\\\\u00B7\\\\u0300-\\\\u036F\\\\u203F-\\\\u2040]\");\r\nvar tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\\:'+nameStartChar.source+nameChar.source+'*)?$');\r\n//var tagNamePattern = /^[a-zA-Z_][\\w\\-\\.]*(?:\\:[a-zA-Z_][\\w\\-\\.]*)?$/\r\n//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')\r\n\r\n//S_TAG,\tS_ATTR,\tS_EQ,\tS_ATTR_NOQUOT_VALUE\r\n//S_ATTR_SPACE,\tS_ATTR_END,\tS_TAG_SPACE, S_TAG_CLOSE\r\nvar S_TAG = 0;//tag name offerring\r\nvar S_ATTR = 1;//attr name offerring \r\nvar S_ATTR_SPACE=2;//attr name end and space offer\r\nvar S_EQ = 3;//=space?\r\nvar S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)\r\nvar S_ATTR_END = 5;//attr value end and no space(quot end)\r\nvar S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)\r\nvar S_TAG_CLOSE = 7;//closed el<el />\r\n\r\nfunction XMLReader(){\r\n\t\r\n}\r\n\r\nXMLReader.prototype = {\r\n\tparse:function(source,defaultNSMap,entityMap){\r\n\t\tvar domBuilder = this.domBuilder;\r\n\t\tdomBuilder.startDocument();\r\n\t\t_copy(defaultNSMap ,defaultNSMap = {})\r\n\t\tparse(source,defaultNSMap,entityMap,\r\n\t\t\t\tdomBuilder,this.errorHandler);\r\n\t\tdomBuilder.endDocument();\r\n\t}\r\n}\r\nfunction parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){\r\n\tfunction fixedFromCharCode(code) {\r\n\t\t// String.prototype.fromCharCode does not supports\r\n\t\t// > 2 bytes unicode chars directly\r\n\t\tif (code > 0xffff) {\r\n\t\t\tcode -= 0x10000;\r\n\t\t\tvar surrogate1 = 0xd800 + (code >> 10)\r\n\t\t\t\t, surrogate2 = 0xdc00 + (code & 0x3ff);\r\n\r\n\t\t\treturn String.fromCharCode(surrogate1, surrogate2);\r\n\t\t} else {\r\n\t\t\treturn String.fromCharCode(code);\r\n\t\t}\r\n\t}\r\n\tfunction entityReplacer(a){\r\n\t\tvar k = a.slice(1,-1);\r\n\t\tif(k in entityMap){\r\n\t\t\treturn entityMap[k]; \r\n\t\t}else if(k.charAt(0) === '#'){\r\n\t\t\treturn fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))\r\n\t\t}else{\r\n\t\t\terrorHandler.error('entity not found:'+a);\r\n\t\t\treturn a;\r\n\t\t}\r\n\t}\r\n\tfunction appendText(end){//has some bugs\r\n\t\tif(end>start){\r\n\t\t\tvar xt = source.substring(start,end).replace(/&#?\\w+;/g,entityReplacer);\r\n\t\t\tlocator&&position(start);\r\n\t\t\tdomBuilder.characters(xt,0,end-start);\r\n\t\t\tstart = end\r\n\t\t}\r\n\t}\r\n\tfunction position(p,m){\r\n\t\twhile(p>=lineEnd && (m = linePattern.exec(source))){\r\n\t\t\tlineStart = m.index;\r\n\t\t\tlineEnd = lineStart + m[0].length;\r\n\t\t\tlocator.lineNumber++;\r\n\t\t\t//console.log('line++:',locator,startPos,endPos)\r\n\t\t}\r\n\t\tlocator.columnNumber = p-lineStart+1;\r\n\t}\r\n\tvar lineStart = 0;\r\n\tvar lineEnd = 0;\r\n\tvar linePattern = /.*(?:\\r\\n?|\\n)|.*$/g\r\n\tvar locator = domBuilder.locator;\r\n\t\r\n\tvar parseStack = [{currentNSMap:defaultNSMapCopy}]\r\n\tvar closeMap = {};\r\n\tvar start = 0;\r\n\twhile(true){\r\n\t\ttry{\r\n\t\t\tvar tagStart = source.indexOf('<',start);\r\n\t\t\tif(tagStart<0){\r\n\t\t\t\tif(!source.substr(start).match(/^\\s*$/)){\r\n\t\t\t\t\tvar doc = domBuilder.doc;\r\n\t    \t\t\tvar text = doc.createTextNode(source.substr(start));\r\n\t    \t\t\tdoc.appendChild(text);\r\n\t    \t\t\tdomBuilder.currentElement = text;\r\n\t\t\t\t}\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tif(tagStart>start){\r\n\t\t\t\tappendText(tagStart);\r\n\t\t\t}\r\n\t\t\tswitch(source.charAt(tagStart+1)){\r\n\t\t\tcase '/':\r\n\t\t\t\tvar end = source.indexOf('>',tagStart+3);\r\n\t\t\t\tvar tagName = source.substring(tagStart+2,end);\r\n\t\t\t\tvar config = parseStack.pop();\r\n\t\t\t\tif(end<0){\r\n\t\t\t\t\t\r\n\t        \t\ttagName = source.substring(tagStart+2).replace(/[\\s<].*/,'');\r\n\t        \t\t//console.error('#@@@@@@'+tagName)\r\n\t        \t\terrorHandler.error(\"end tag name: \"+tagName+' is not complete:'+config.tagName);\r\n\t        \t\tend = tagStart+1+tagName.length;\r\n\t        \t}else if(tagName.match(/\\s</)){\r\n\t        \t\ttagName = tagName.replace(/[\\s<].*/,'');\r\n\t        \t\terrorHandler.error(\"end tag name: \"+tagName+' maybe not complete');\r\n\t        \t\tend = tagStart+1+tagName.length;\r\n\t\t\t\t}\r\n\t\t\t\t//console.error(parseStack.length,parseStack)\r\n\t\t\t\t//console.error(config);\r\n\t\t\t\tvar localNSMap = config.localNSMap;\r\n\t\t\t\tvar endMatch = config.tagName == tagName;\r\n\t\t\t\tvar endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()\r\n\t\t        if(endIgnoreCaseMach){\r\n\t\t        \tdomBuilder.endElement(config.uri,config.localName,tagName);\r\n\t\t\t\t\tif(localNSMap){\r\n\t\t\t\t\t\tfor(var prefix in localNSMap){\r\n\t\t\t\t\t\t\tdomBuilder.endPrefixMapping(prefix) ;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(!endMatch){\r\n\t\t            \terrorHandler.fatalError(\"end tag name: \"+tagName+' is not match the current start tagName:'+config.tagName );\r\n\t\t\t\t\t}\r\n\t\t        }else{\r\n\t\t        \tparseStack.push(config)\r\n\t\t        }\r\n\t\t\t\t\r\n\t\t\t\tend++;\r\n\t\t\t\tbreak;\r\n\t\t\t\t// end elment\r\n\t\t\tcase '?':// <?...?>\r\n\t\t\t\tlocator&&position(tagStart);\r\n\t\t\t\tend = parseInstruction(source,tagStart,domBuilder);\r\n\t\t\t\tbreak;\r\n\t\t\tcase '!':// <!doctype,<![CDATA,<!--\r\n\t\t\t\tlocator&&position(tagStart);\r\n\t\t\t\tend = parseDCC(source,tagStart,domBuilder,errorHandler);\r\n\t\t\t\tbreak;\r\n\t\t\tdefault:\r\n\t\t\t\tlocator&&position(tagStart);\r\n\t\t\t\tvar el = new ElementAttributes();\r\n\t\t\t\tvar currentNSMap = parseStack[parseStack.length-1].currentNSMap;\r\n\t\t\t\t//elStartEnd\r\n\t\t\t\tvar end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);\r\n\t\t\t\tvar len = el.length;\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\tif(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){\r\n\t\t\t\t\tel.closed = true;\r\n\t\t\t\t\tif(!entityMap.nbsp){\r\n\t\t\t\t\t\terrorHandler.warning('unclosed xml attribute');\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\tif(locator && len){\r\n\t\t\t\t\tvar locator2 = copyLocator(locator,{});\r\n\t\t\t\t\t//try{//attribute position fixed\r\n\t\t\t\t\tfor(var i = 0;i<len;i++){\r\n\t\t\t\t\t\tvar a = el[i];\r\n\t\t\t\t\t\tposition(a.offset);\r\n\t\t\t\t\t\ta.locator = copyLocator(locator,{});\r\n\t\t\t\t\t}\r\n\t\t\t\t\t//}catch(e){console.error('@@@@@'+e)}\r\n\t\t\t\t\tdomBuilder.locator = locator2\r\n\t\t\t\t\tif(appendElement(el,domBuilder,currentNSMap)){\r\n\t\t\t\t\t\tparseStack.push(el)\r\n\t\t\t\t\t}\r\n\t\t\t\t\tdomBuilder.locator = locator;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tif(appendElement(el,domBuilder,currentNSMap)){\r\n\t\t\t\t\t\tparseStack.push(el)\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\tif(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){\r\n\t\t\t\t\tend = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)\r\n\t\t\t\t}else{\r\n\t\t\t\t\tend++;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}catch(e){\r\n\t\t\terrorHandler.error('element parse error: '+e)\r\n\t\t\t//errorHandler.error('element parse error: '+e);\r\n\t\t\tend = -1;\r\n\t\t\t//throw e;\r\n\t\t}\r\n\t\tif(end>start){\r\n\t\t\tstart = end;\r\n\t\t}else{\r\n\t\t\t//TODO: 这里有可能sax回退，有位置错误风险\r\n\t\t\tappendText(Math.max(tagStart,start)+1);\r\n\t\t}\r\n\t}\r\n}\r\nfunction copyLocator(f,t){\r\n\tt.lineNumber = f.lineNumber;\r\n\tt.columnNumber = f.columnNumber;\r\n\treturn t;\r\n}\r\n\r\n/**\r\n * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);\r\n * @return end of the elementStartPart(end of elementEndPart for selfClosed el)\r\n */\r\nfunction parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){\r\n\tvar attrName;\r\n\tvar value;\r\n\tvar p = ++start;\r\n\tvar s = S_TAG;//status\r\n\twhile(true){\r\n\t\tvar c = source.charAt(p);\r\n\t\tswitch(c){\r\n\t\tcase '=':\r\n\t\t\tif(s === S_ATTR){//attrName\r\n\t\t\t\tattrName = source.slice(start,p);\r\n\t\t\t\ts = S_EQ;\r\n\t\t\t}else if(s === S_ATTR_SPACE){\r\n\t\t\t\ts = S_EQ;\r\n\t\t\t}else{\r\n\t\t\t\t//fatalError: equal must after attrName or space after attrName\r\n\t\t\t\tthrow new Error('attribute equal must after attrName');\r\n\t\t\t}\r\n\t\t\tbreak;\r\n\t\tcase '\\'':\r\n\t\tcase '\"':\r\n\t\t\tif(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE\r\n\t\t\t\t){//equal\r\n\t\t\t\tif(s === S_ATTR){\r\n\t\t\t\t\terrorHandler.warning('attribute value must after \"=\"')\r\n\t\t\t\t\tattrName = source.slice(start,p)\r\n\t\t\t\t}\r\n\t\t\t\tstart = p+1;\r\n\t\t\t\tp = source.indexOf(c,start)\r\n\t\t\t\tif(p>0){\r\n\t\t\t\t\tvalue = source.slice(start,p).replace(/&#?\\w+;/g,entityReplacer);\r\n\t\t\t\t\tel.add(attrName,value,start-1);\r\n\t\t\t\t\ts = S_ATTR_END;\r\n\t\t\t\t}else{\r\n\t\t\t\t\t//fatalError: no end quot match\r\n\t\t\t\t\tthrow new Error('attribute value no end \\''+c+'\\' match');\r\n\t\t\t\t}\r\n\t\t\t}else if(s == S_ATTR_NOQUOT_VALUE){\r\n\t\t\t\tvalue = source.slice(start,p).replace(/&#?\\w+;/g,entityReplacer);\r\n\t\t\t\t//console.log(attrName,value,start,p)\r\n\t\t\t\tel.add(attrName,value,start);\r\n\t\t\t\t//console.dir(el)\r\n\t\t\t\terrorHandler.warning('attribute \"'+attrName+'\" missed start quot('+c+')!!');\r\n\t\t\t\tstart = p+1;\r\n\t\t\t\ts = S_ATTR_END\r\n\t\t\t}else{\r\n\t\t\t\t//fatalError: no equal before\r\n\t\t\t\tthrow new Error('attribute value must after \"=\"');\r\n\t\t\t}\r\n\t\t\tbreak;\r\n\t\tcase '/':\r\n\t\t\tswitch(s){\r\n\t\t\tcase S_TAG:\r\n\t\t\t\tel.setTagName(source.slice(start,p));\r\n\t\t\tcase S_ATTR_END:\r\n\t\t\tcase S_TAG_SPACE:\r\n\t\t\tcase S_TAG_CLOSE:\r\n\t\t\t\ts =S_TAG_CLOSE;\r\n\t\t\t\tel.closed = true;\r\n\t\t\tcase S_ATTR_NOQUOT_VALUE:\r\n\t\t\tcase S_ATTR:\r\n\t\t\tcase S_ATTR_SPACE:\r\n\t\t\t\tbreak;\r\n\t\t\t//case S_EQ:\r\n\t\t\tdefault:\r\n\t\t\t\tthrow new Error(\"attribute invalid close char('/')\")\r\n\t\t\t}\r\n\t\t\tbreak;\r\n\t\tcase ''://end document\r\n\t\t\t//throw new Error('unexpected end of input')\r\n\t\t\terrorHandler.error('unexpected end of input');\r\n\t\t\tif(s == S_TAG){\r\n\t\t\t\tel.setTagName(source.slice(start,p));\r\n\t\t\t}\r\n\t\t\treturn p;\r\n\t\tcase '>':\r\n\t\t\tswitch(s){\r\n\t\t\tcase S_TAG:\r\n\t\t\t\tel.setTagName(source.slice(start,p));\r\n\t\t\tcase S_ATTR_END:\r\n\t\t\tcase S_TAG_SPACE:\r\n\t\t\tcase S_TAG_CLOSE:\r\n\t\t\t\tbreak;//normal\r\n\t\t\tcase S_ATTR_NOQUOT_VALUE://Compatible state\r\n\t\t\tcase S_ATTR:\r\n\t\t\t\tvalue = source.slice(start,p);\r\n\t\t\t\tif(value.slice(-1) === '/'){\r\n\t\t\t\t\tel.closed  = true;\r\n\t\t\t\t\tvalue = value.slice(0,-1)\r\n\t\t\t\t}\r\n\t\t\tcase S_ATTR_SPACE:\r\n\t\t\t\tif(s === S_ATTR_SPACE){\r\n\t\t\t\t\tvalue = attrName;\r\n\t\t\t\t}\r\n\t\t\t\tif(s == S_ATTR_NOQUOT_VALUE){\r\n\t\t\t\t\terrorHandler.warning('attribute \"'+value+'\" missed quot(\")!!');\r\n\t\t\t\t\tel.add(attrName,value.replace(/&#?\\w+;/g,entityReplacer),start)\r\n\t\t\t\t}else{\r\n\t\t\t\t\tif(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){\r\n\t\t\t\t\t\terrorHandler.warning('attribute \"'+value+'\" missed value!! \"'+value+'\" instead!!')\r\n\t\t\t\t\t}\r\n\t\t\t\t\tel.add(value,value,start)\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase S_EQ:\r\n\t\t\t\tthrow new Error('attribute value missed!!');\r\n\t\t\t}\r\n//\t\t\tconsole.log(tagName,tagNamePattern,tagNamePattern.test(tagName))\r\n\t\t\treturn p;\r\n\t\t/*xml space '\\x20' | #x9 | #xD | #xA; */\r\n\t\tcase '\\u0080':\r\n\t\t\tc = ' ';\r\n\t\tdefault:\r\n\t\t\tif(c<= ' '){//space\r\n\t\t\t\tswitch(s){\r\n\t\t\t\tcase S_TAG:\r\n\t\t\t\t\tel.setTagName(source.slice(start,p));//tagName\r\n\t\t\t\t\ts = S_TAG_SPACE;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase S_ATTR:\r\n\t\t\t\t\tattrName = source.slice(start,p)\r\n\t\t\t\t\ts = S_ATTR_SPACE;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase S_ATTR_NOQUOT_VALUE:\r\n\t\t\t\t\tvar value = source.slice(start,p).replace(/&#?\\w+;/g,entityReplacer);\r\n\t\t\t\t\terrorHandler.warning('attribute \"'+value+'\" missed quot(\")!!');\r\n\t\t\t\t\tel.add(attrName,value,start)\r\n\t\t\t\tcase S_ATTR_END:\r\n\t\t\t\t\ts = S_TAG_SPACE;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t//case S_TAG_SPACE:\r\n\t\t\t\t//case S_EQ:\r\n\t\t\t\t//case S_ATTR_SPACE:\r\n\t\t\t\t//\tvoid();break;\r\n\t\t\t\t//case S_TAG_CLOSE:\r\n\t\t\t\t\t//ignore warning\r\n\t\t\t\t}\r\n\t\t\t}else{//not space\r\n//S_TAG,\tS_ATTR,\tS_EQ,\tS_ATTR_NOQUOT_VALUE\r\n//S_ATTR_SPACE,\tS_ATTR_END,\tS_TAG_SPACE, S_TAG_CLOSE\r\n\t\t\t\tswitch(s){\r\n\t\t\t\t//case S_TAG:void();break;\r\n\t\t\t\t//case S_ATTR:void();break;\r\n\t\t\t\t//case S_ATTR_NOQUOT_VALUE:void();break;\r\n\t\t\t\tcase S_ATTR_SPACE:\r\n\t\t\t\t\tvar tagName =  el.tagName;\r\n\t\t\t\t\tif(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){\r\n\t\t\t\t\t\terrorHandler.warning('attribute \"'+attrName+'\" missed value!! \"'+attrName+'\" instead2!!')\r\n\t\t\t\t\t}\r\n\t\t\t\t\tel.add(attrName,attrName,start);\r\n\t\t\t\t\tstart = p;\r\n\t\t\t\t\ts = S_ATTR;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase S_ATTR_END:\r\n\t\t\t\t\terrorHandler.warning('attribute space is required\"'+attrName+'\"!!')\r\n\t\t\t\tcase S_TAG_SPACE:\r\n\t\t\t\t\ts = S_ATTR;\r\n\t\t\t\t\tstart = p;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase S_EQ:\r\n\t\t\t\t\ts = S_ATTR_NOQUOT_VALUE;\r\n\t\t\t\t\tstart = p;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase S_TAG_CLOSE:\r\n\t\t\t\t\tthrow new Error(\"elements closed character '/' and '>' must be connected to\");\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}//end outer switch\r\n\t\t//console.log('p++',p)\r\n\t\tp++;\r\n\t}\r\n}\r\n/**\r\n * @return true if has new namespace define\r\n */\r\nfunction appendElement(el,domBuilder,currentNSMap){\r\n\tvar tagName = el.tagName;\r\n\tvar localNSMap = null;\r\n\t//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;\r\n\tvar i = el.length;\r\n\twhile(i--){\r\n\t\tvar a = el[i];\r\n\t\tvar qName = a.qName;\r\n\t\tvar value = a.value;\r\n\t\tvar nsp = qName.indexOf(':');\r\n\t\tif(nsp>0){\r\n\t\t\tvar prefix = a.prefix = qName.slice(0,nsp);\r\n\t\t\tvar localName = qName.slice(nsp+1);\r\n\t\t\tvar nsPrefix = prefix === 'xmlns' && localName\r\n\t\t}else{\r\n\t\t\tlocalName = qName;\r\n\t\t\tprefix = null\r\n\t\t\tnsPrefix = qName === 'xmlns' && ''\r\n\t\t}\r\n\t\t//can not set prefix,because prefix !== ''\r\n\t\ta.localName = localName ;\r\n\t\t//prefix == null for no ns prefix attribute \r\n\t\tif(nsPrefix !== false){//hack!!\r\n\t\t\tif(localNSMap == null){\r\n\t\t\t\tlocalNSMap = {}\r\n\t\t\t\t//console.log(currentNSMap,0)\r\n\t\t\t\t_copy(currentNSMap,currentNSMap={})\r\n\t\t\t\t//console.log(currentNSMap,1)\r\n\t\t\t}\r\n\t\t\tcurrentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;\r\n\t\t\ta.uri = 'http://www.w3.org/2000/xmlns/'\r\n\t\t\tdomBuilder.startPrefixMapping(nsPrefix, value) \r\n\t\t}\r\n\t}\r\n\tvar i = el.length;\r\n\twhile(i--){\r\n\t\ta = el[i];\r\n\t\tvar prefix = a.prefix;\r\n\t\tif(prefix){//no prefix attribute has no namespace\r\n\t\t\tif(prefix === 'xml'){\r\n\t\t\t\ta.uri = 'http://www.w3.org/XML/1998/namespace';\r\n\t\t\t}if(prefix !== 'xmlns'){\r\n\t\t\t\ta.uri = currentNSMap[prefix || '']\r\n\t\t\t\t\r\n\t\t\t\t//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\tvar nsp = tagName.indexOf(':');\r\n\tif(nsp>0){\r\n\t\tprefix = el.prefix = tagName.slice(0,nsp);\r\n\t\tlocalName = el.localName = tagName.slice(nsp+1);\r\n\t}else{\r\n\t\tprefix = null;//important!!\r\n\t\tlocalName = el.localName = tagName;\r\n\t}\r\n\t//no prefix element has default namespace\r\n\tvar ns = el.uri = currentNSMap[prefix || ''];\r\n\tdomBuilder.startElement(ns,localName,tagName,el);\r\n\t//endPrefixMapping and startPrefixMapping have not any help for dom builder\r\n\t//localNSMap = null\r\n\tif(el.closed){\r\n\t\tdomBuilder.endElement(ns,localName,tagName);\r\n\t\tif(localNSMap){\r\n\t\t\tfor(prefix in localNSMap){\r\n\t\t\t\tdomBuilder.endPrefixMapping(prefix) \r\n\t\t\t}\r\n\t\t}\r\n\t}else{\r\n\t\tel.currentNSMap = currentNSMap;\r\n\t\tel.localNSMap = localNSMap;\r\n\t\t//parseStack.push(el);\r\n\t\treturn true;\r\n\t}\r\n}\r\nfunction parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){\r\n\tif(/^(?:script|textarea)$/i.test(tagName)){\r\n\t\tvar elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);\r\n\t\tvar text = source.substring(elStartEnd+1,elEndStart);\r\n\t\tif(/[&<]/.test(text)){\r\n\t\t\tif(/^script$/i.test(tagName)){\r\n\t\t\t\t//if(!/\\]\\]>/.test(text)){\r\n\t\t\t\t\t//lexHandler.startCDATA();\r\n\t\t\t\t\tdomBuilder.characters(text,0,text.length);\r\n\t\t\t\t\t//lexHandler.endCDATA();\r\n\t\t\t\t\treturn elEndStart;\r\n\t\t\t\t//}\r\n\t\t\t}//}else{//text area\r\n\t\t\t\ttext = text.replace(/&#?\\w+;/g,entityReplacer);\r\n\t\t\t\tdomBuilder.characters(text,0,text.length);\r\n\t\t\t\treturn elEndStart;\r\n\t\t\t//}\r\n\t\t\t\r\n\t\t}\r\n\t}\r\n\treturn elStartEnd+1;\r\n}\r\nfunction fixSelfClosed(source,elStartEnd,tagName,closeMap){\r\n\t//if(tagName in closeMap){\r\n\tvar pos = closeMap[tagName];\r\n\tif(pos == null){\r\n\t\t//console.log(tagName)\r\n\t\tpos =  source.lastIndexOf('</'+tagName+'>')\r\n\t\tif(pos<elStartEnd){//忘记闭合\r\n\t\t\tpos = source.lastIndexOf('</'+tagName)\r\n\t\t}\r\n\t\tcloseMap[tagName] =pos\r\n\t}\r\n\treturn pos<elStartEnd;\r\n\t//} \r\n}\r\nfunction _copy(source,target){\r\n\tfor(var n in source){target[n] = source[n]}\r\n}\r\nfunction parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'\r\n\tvar next= source.charAt(start+2)\r\n\tswitch(next){\r\n\tcase '-':\r\n\t\tif(source.charAt(start + 3) === '-'){\r\n\t\t\tvar end = source.indexOf('-->',start+4);\r\n\t\t\t//append comment source.substring(4,end)//<!--\r\n\t\t\tif(end>start){\r\n\t\t\t\tdomBuilder.comment(source,start+4,end-start-4);\r\n\t\t\t\treturn end+3;\r\n\t\t\t}else{\r\n\t\t\t\terrorHandler.error(\"Unclosed comment\");\r\n\t\t\t\treturn -1;\r\n\t\t\t}\r\n\t\t}else{\r\n\t\t\t//error\r\n\t\t\treturn -1;\r\n\t\t}\r\n\tdefault:\r\n\t\tif(source.substr(start+3,6) == 'CDATA['){\r\n\t\t\tvar end = source.indexOf(']]>',start+9);\r\n\t\t\tdomBuilder.startCDATA();\r\n\t\t\tdomBuilder.characters(source,start+9,end-start-9);\r\n\t\t\tdomBuilder.endCDATA() \r\n\t\t\treturn end+3;\r\n\t\t}\r\n\t\t//<!DOCTYPE\r\n\t\t//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) \r\n\t\tvar matchs = split(source,start);\r\n\t\tvar len = matchs.length;\r\n\t\tif(len>1 && /!doctype/i.test(matchs[0][0])){\r\n\t\t\tvar name = matchs[1][0];\r\n\t\t\tvar pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]\r\n\t\t\tvar sysid = len>4 && matchs[4][0];\r\n\t\t\tvar lastMatch = matchs[len-1]\r\n\t\t\tdomBuilder.startDTD(name,pubid && pubid.replace(/^(['\"])(.*?)\\1$/,'$2'),\r\n\t\t\t\t\tsysid && sysid.replace(/^(['\"])(.*?)\\1$/,'$2'));\r\n\t\t\tdomBuilder.endDTD();\r\n\t\t\t\r\n\t\t\treturn lastMatch.index+lastMatch[0].length\r\n\t\t}\r\n\t}\r\n\treturn -1;\r\n}\r\n\r\n\r\n\r\nfunction parseInstruction(source,start,domBuilder){\r\n\tvar end = source.indexOf('?>',start);\r\n\tif(end){\r\n\t\tvar match = source.substring(start,end).match(/^<\\?(\\S*)\\s*([\\s\\S]*?)\\s*$/);\r\n\t\tif(match){\r\n\t\t\tvar len = match[0].length;\r\n\t\t\tdomBuilder.processingInstruction(match[1], match[2]) ;\r\n\t\t\treturn end+2;\r\n\t\t}else{//error\r\n\t\t\treturn -1;\r\n\t\t}\r\n\t}\r\n\treturn -1;\r\n}\r\n\r\n/**\r\n * @param source\r\n */\r\nfunction ElementAttributes(source){\r\n\t\r\n}\r\nElementAttributes.prototype = {\r\n\tsetTagName:function(tagName){\r\n\t\tif(!tagNamePattern.test(tagName)){\r\n\t\t\tthrow new Error('invalid tagName:'+tagName)\r\n\t\t}\r\n\t\tthis.tagName = tagName\r\n\t},\r\n\tadd:function(qName,value,offset){\r\n\t\tif(!tagNamePattern.test(qName)){\r\n\t\t\tthrow new Error('invalid attribute:'+qName)\r\n\t\t}\r\n\t\tthis[this.length++] = {qName:qName,value:value,offset:offset}\r\n\t},\r\n\tlength:0,\r\n\tgetLocalName:function(i){return this[i].localName},\r\n\tgetLocator:function(i){return this[i].locator},\r\n\tgetQName:function(i){return this[i].qName},\r\n\tgetURI:function(i){return this[i].uri},\r\n\tgetValue:function(i){return this[i].value}\r\n//\t,getIndex:function(uri, localName)){\r\n//\t\tif(localName){\r\n//\t\t\t\r\n//\t\t}else{\r\n//\t\t\tvar qName = uri\r\n//\t\t}\r\n//\t},\r\n//\tgetValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},\r\n//\tgetType:function(uri,localName){}\r\n//\tgetType:function(i){},\r\n}\r\n\r\n\r\n\r\n\r\nfunction _set_proto_(thiz,parent){\r\n\tthiz.__proto__ = parent;\r\n\treturn thiz;\r\n}\r\nif(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){\r\n\t_set_proto_ = function(thiz,parent){\r\n\t\tfunction p(){};\r\n\t\tp.prototype = parent;\r\n\t\tp = new p();\r\n\t\tfor(parent in thiz){\r\n\t\t\tp[parent] = thiz[parent];\r\n\t\t}\r\n\t\treturn p;\r\n\t}\r\n}\r\n\r\nfunction split(source,start){\r\n\tvar match;\r\n\tvar buf = [];\r\n\tvar reg = /'[^']+'|\"[^\"]+\"|[^\\s<>\\/=]+=?|(\\/?\\s*>|<)/g;\r\n\treg.lastIndex = start;\r\n\treg.exec(source);//skip <\r\n\twhile(match = reg.exec(source)){\r\n\t\tbuf.push(match);\r\n\t\tif(match[1])return buf;\r\n\t}\r\n}\r\n\r\nexports.XMLReader = XMLReader;\r\n\r\n\n\n//# sourceURL=webpack://COS/./node_modules/xmldom/sax.js?");

/***/ }),

/***/ "./src/advance.js":
/*!************************!*\
  !*** ./src/advance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var session = __webpack_require__(/*! ./session */ \"./src/session.js\");\nvar Async = __webpack_require__(/*! ./async */ \"./src/async.js\");\nvar EventProxy = __webpack_require__(/*! ./event */ \"./src/event.js\").EventProxy;\nvar util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nvar Tracker = __webpack_require__(/*! ./tracker */ \"./src/tracker.js\");\n\n// 文件分块上传全过程，暴露的分块上传接口\nfunction sliceUploadFile(params, callback) {\n    var self = this;\n    var ep = new EventProxy();\n    var TaskId = params.TaskId;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var Body = params.Body;\n    var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;\n    var AsyncLimit = params.AsyncLimit;\n    var StorageClass = params.StorageClass;\n    var ServerSideEncryption = params.ServerSideEncryption;\n    var FileSize;\n\n    var onProgress;\n    var onHashProgress = params.onHashProgress;\n\n    var tracker = params.tracker;\n\n    // 上传过程中出现错误，返回错误\n    ep.on('error', function (err) {\n        if (!self._isRunningTask(TaskId)) return;\n        err.UploadId = params.UploadData.UploadId || '';\n        return callback(err);\n    });\n\n    // 上传分块完成，开始 uploadSliceComplete 操作\n    ep.on('upload_complete', function (UploadCompleteData) {\n        var _UploadCompleteData = util.extend({\n            UploadId: params.UploadData.UploadId || ''\n        }, UploadCompleteData);\n        callback(null, _UploadCompleteData);\n    });\n\n    // 上传分块完成，开始 uploadSliceComplete 操作\n    ep.on('upload_slice_complete', function (UploadData) {\n        var metaHeaders = {};\n        util.each(params.Headers, function (val, k) {\n            var shortKey = k.toLowerCase();\n            if (shortKey.indexOf('x-cos-meta-') === 0 || shortKey === 'pic-operations') metaHeaders[k] = val;\n        });\n        uploadSliceComplete.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            UploadId: UploadData.UploadId,\n            SliceList: UploadData.SliceList,\n            Headers: metaHeaders,\n            tracker: tracker\n        }, function (err, data) {\n            if (!self._isRunningTask(TaskId)) return;\n            session.removeUsing(UploadData.UploadId);\n            if (err) {\n                onProgress(null, true);\n                return ep.emit('error', err);\n            }\n            session.removeUploadId.call(self, UploadData.UploadId);\n            onProgress({ loaded: FileSize, total: FileSize }, true);\n            ep.emit('upload_complete', data);\n        });\n    });\n\n    // 获取 UploadId 完成，开始上传每个分片\n    ep.on('get_upload_data_finish', function (UploadData) {\n\n        // 处理 UploadId 缓存\n        var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);\n        uuid && session.saveUploadId.call(self, uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId\n        session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用\n\n        // 获取 UploadId\n        onProgress(null, true); // 任务状态开始 uploading\n        uploadSliceList.call(self, {\n            TaskId: TaskId,\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            Body: Body,\n            FileSize: FileSize,\n            SliceSize: ChunkSize,\n            AsyncLimit: AsyncLimit,\n            ServerSideEncryption: ServerSideEncryption,\n            UploadData: UploadData,\n            Headers: params.Headers,\n            onProgress: onProgress,\n            tracker: tracker\n        }, function (err, data) {\n            if (!self._isRunningTask(TaskId)) return;\n            if (err) {\n                onProgress(null, true);\n                return ep.emit('error', err);\n            }\n            ep.emit('upload_slice_complete', data);\n        });\n    });\n\n    // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传\n    ep.on('get_file_size_finish', function () {\n\n        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);\n\n        if (params.UploadData.UploadId) {\n            ep.emit('get_upload_data_finish', params.UploadData);\n        } else {\n            var _params = util.extend({\n                TaskId: TaskId,\n                Bucket: Bucket,\n                Region: Region,\n                Key: Key,\n                Headers: params.Headers,\n                StorageClass: StorageClass,\n                Body: Body,\n                FileSize: FileSize,\n                SliceSize: ChunkSize,\n                onHashProgress: onHashProgress,\n                tracker: tracker\n            }, params);\n            getUploadIdAndPartList.call(self, _params, function (err, UploadData) {\n                if (!self._isRunningTask(TaskId)) return;\n                if (err) return ep.emit('error', err);\n                params.UploadData.UploadId = UploadData.UploadId;\n                params.UploadData.PartList = UploadData.PartList;\n                ep.emit('get_upload_data_finish', params.UploadData);\n            });\n        }\n    });\n\n    // 获取上传文件大小\n    FileSize = params.ContentLength;\n    delete params.ContentLength;\n    !params.Headers && (params.Headers = {});\n    util.each(params.Headers, function (item, key) {\n        if (key.toLowerCase() === 'content-length') {\n            delete params.Headers[key];\n        }\n    });\n\n    // 控制分片大小\n    (function () {\n        var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];\n        var AutoChunkSize = 1024 * 1024;\n        for (var i = 0; i < SIZE.length; i++) {\n            AutoChunkSize = SIZE[i] * 1024 * 1024;\n            if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;\n        }\n        params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);\n    })();\n\n    // 开始上传\n    if (FileSize === 0) {\n        params.Body = '';\n        params.ContentLength = 0;\n        params.SkipTask = true;\n        self.putObject(params, callback);\n    } else {\n        ep.emit('get_file_size_finish');\n    }\n}\n\n// 获取上传任务的 UploadId\nfunction getUploadIdAndPartList(params, callback) {\n\n    var TaskId = params.TaskId;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var StorageClass = params.StorageClass;\n    var self = this;\n\n    // 计算 ETag\n    var ETagMap = {};\n    var FileSize = params.FileSize;\n    var SliceSize = params.SliceSize;\n    var SliceCount = Math.ceil(FileSize / SliceSize);\n    var FinishSliceCount = 0;\n    var FinishSize = 0;\n    var onHashProgress = util.throttleOnProgress.call(self, FileSize, params.onHashProgress);\n    var getChunkETag = function (PartNumber, callback) {\n        var start = SliceSize * (PartNumber - 1);\n        var end = Math.min(start + SliceSize, FileSize);\n        var ChunkSize = end - start;\n\n        if (ETagMap[PartNumber]) {\n            callback(null, {\n                PartNumber: PartNumber,\n                ETag: ETagMap[PartNumber],\n                Size: ChunkSize\n            });\n        } else {\n            util.fileSlice(params.Body, start, end, false, function (chunkItem) {\n                util.getFileMd5(chunkItem, function (err, md5) {\n                    if (err) return callback(util.error(err));\n                    var ETag = '\"' + md5 + '\"';\n                    ETagMap[PartNumber] = ETag;\n                    FinishSliceCount += 1;\n                    FinishSize += ChunkSize;\n                    onHashProgress({ loaded: FinishSize, total: FileSize });\n                    callback(null, {\n                        PartNumber: PartNumber,\n                        ETag: ETag,\n                        Size: ChunkSize\n                    });\n                });\n            });\n        }\n    };\n\n    // 通过和文件的 md5 对比，判断 UploadId 是否可用\n    var isAvailableUploadList = function (PartList, callback) {\n        var PartCount = PartList.length;\n        // 如果没有分片，通过\n        if (PartCount === 0) {\n            return callback(null, true);\n        }\n        // 检查分片数量\n        if (PartCount > SliceCount) {\n            return callback(null, false);\n        }\n        // 检查分片大小\n        if (PartCount > 1) {\n            var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);\n            if (PartSliceSize !== SliceSize) {\n                return callback(null, false);\n            }\n        }\n        // 逐个分片计算并检查 ETag 是否一致\n        var next = function (index) {\n            if (index < PartCount) {\n                var Part = PartList[index];\n                getChunkETag(Part.PartNumber, function (err, chunk) {\n                    if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {\n                        next(index + 1);\n                    } else {\n                        callback(null, false);\n                    }\n                });\n            } else {\n                callback(null, true);\n            }\n        };\n        next(0);\n    };\n\n    var ep = new EventProxy();\n    ep.on('error', function (errData) {\n        if (!self._isRunningTask(TaskId)) return;\n        return callback(errData);\n    });\n\n    // 存在 UploadId\n    ep.on('upload_id_available', function (UploadData) {\n        // 转换成 map\n        var map = {};\n        var list = [];\n        util.each(UploadData.PartList, function (item) {\n            map[item.PartNumber] = item;\n        });\n        for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {\n            var item = map[PartNumber];\n            if (item) {\n                item.PartNumber = PartNumber;\n                item.Uploaded = true;\n            } else {\n                item = {\n                    PartNumber: PartNumber,\n                    ETag: null,\n                    Uploaded: false\n                };\n            }\n            list.push(item);\n        }\n        UploadData.PartList = list;\n        callback(null, UploadData);\n    });\n\n    // 不存在 UploadId, 初始化生成 UploadId\n    ep.on('no_available_upload_id', function () {\n        if (!self._isRunningTask(TaskId)) return;\n        var _params = util.extend({\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            Query: util.clone(params.Query),\n            StorageClass: StorageClass,\n            Body: params.Body,\n            calledBySdk: 'sliceUploadFile',\n            tracker: params.tracker\n        }, params);\n        var headers = util.clone(params.Headers);\n        delete headers['x-cos-mime-limit'];\n        _params.Headers = headers;\n        self.multipartInit(_params, function (err, data) {\n            if (!self._isRunningTask(TaskId)) return;\n            if (err) return ep.emit('error', err);\n            var UploadId = data.UploadId;\n            if (!UploadId) {\n                return callback(util.error(new Error('no such upload id')));\n            }\n            ep.emit('upload_id_available', { UploadId: UploadId, PartList: [] });\n        });\n    });\n\n    // 如果已存在 UploadId，找一个可以用的 UploadId\n    ep.on('has_and_check_upload_id', function (UploadIdList) {\n        // 串行地，找一个内容一致的 UploadId\n        UploadIdList = UploadIdList.reverse();\n        Async.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {\n            if (!self._isRunningTask(TaskId)) return;\n            // 如果正在上传，跳过\n            if (session.using[UploadId]) {\n                asyncCallback(); // 检查下一个 UploadId\n                return;\n            }\n            // 判断 UploadId 是否可用\n            wholeMultipartListPart.call(self, {\n                Bucket: Bucket,\n                Region: Region,\n                Key: Key,\n                UploadId: UploadId,\n                tracker: params.tracker\n            }, function (err, PartListData) {\n                if (!self._isRunningTask(TaskId)) return;\n                if (err) {\n                    session.removeUsing(UploadId);\n                    return ep.emit('error', err);\n                }\n                var PartList = PartListData.PartList;\n                PartList.forEach(function (item) {\n                    item.PartNumber *= 1;\n                    item.Size *= 1;\n                    item.ETag = item.ETag || '';\n                });\n                isAvailableUploadList(PartList, function (err, isAvailable) {\n                    if (!self._isRunningTask(TaskId)) return;\n                    if (err) return ep.emit('error', err);\n                    if (isAvailable) {\n                        asyncCallback({\n                            UploadId: UploadId,\n                            PartList: PartList\n                        }); // 马上结束\n                    } else {\n                        asyncCallback(); // 检查下一个 UploadId\n                    }\n                });\n            });\n        }, function (AvailableUploadData) {\n            if (!self._isRunningTask(TaskId)) return;\n            onHashProgress(null, true);\n            if (AvailableUploadData && AvailableUploadData.UploadId) {\n                ep.emit('upload_id_available', AvailableUploadData);\n            } else {\n                ep.emit('no_available_upload_id');\n            }\n        });\n    });\n\n    // 在本地缓存找可用的 UploadId\n    ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {\n        // 在本地找可用的 UploadId\n        var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);\n        var LocalUploadIdList = session.getUploadIdList.call(self, uuid);\n        if (!uuid || !LocalUploadIdList) {\n            ep.emit('has_and_check_upload_id', RemoteUploadIdList);\n            return;\n        }\n        var next = function (index) {\n            // 如果本地找不到可用 UploadId，再一个个遍历校验远端\n            if (index >= LocalUploadIdList.length) {\n                ep.emit('has_and_check_upload_id', RemoteUploadIdList);\n                return;\n            }\n            var UploadId = LocalUploadIdList[index];\n            // 如果不在远端 UploadId 列表里，跳过并删除\n            if (!util.isInArray(RemoteUploadIdList, UploadId)) {\n                session.removeUploadId.call(self, UploadId);\n                next(index + 1);\n                return;\n            }\n            // 如果正在上传，跳过\n            if (session.using[UploadId]) {\n                next(index + 1);\n                return;\n            }\n            // 判断 UploadId 是否存在线上\n            wholeMultipartListPart.call(self, {\n                Bucket: Bucket,\n                Region: Region,\n                Key: Key,\n                UploadId: UploadId,\n                tracker: params.tracker\n            }, function (err, PartListData) {\n                if (!self._isRunningTask(TaskId)) return;\n                if (err) {\n                    // 如果 UploadId 获取会出错，跳过并删除\n                    session.removeUploadId.call(self, UploadId);\n                    next(index + 1);\n                } else {\n                    // 找到可用 UploadId\n                    ep.emit('upload_id_available', {\n                        UploadId: UploadId,\n                        PartList: PartListData.PartList\n                    });\n                }\n            });\n        };\n        next(0);\n    });\n\n    // 获取线上 UploadId 列表\n    ep.on('get_remote_upload_id_list', function () {\n        // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。\n        wholeMultipartList.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            tracker: params.tracker\n        }, function (err, data) {\n            if (!self._isRunningTask(TaskId)) return;\n            if (err) return ep.emit('error', err);\n            // 整理远端 UploadId 列表\n            var RemoteUploadIdList = util.filter(data.UploadList, function (item) {\n                return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());\n            }).reverse().map(function (item) {\n                return item.UploadId || item.UploadID;\n            });\n            if (RemoteUploadIdList.length) {\n                ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);\n            } else {\n                // 远端没有 UploadId，清理缓存的 UploadId\n                var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key),\n                    LocalUploadIdList;\n                if (uuid && (LocalUploadIdList = session.getUploadIdList.call(self, uuid))) {\n                    util.each(LocalUploadIdList, function (UploadId) {\n                        session.removeUploadId.call(self, UploadId);\n                    });\n                }\n                ep.emit('no_available_upload_id');\n            }\n        });\n    });\n\n    // 开始找可用 UploadId\n    ep.emit('get_remote_upload_id_list');\n}\n\n// 获取符合条件的全部上传任务 (条件包括 Bucket, Region, Prefix)\nfunction wholeMultipartList(params, callback) {\n\n    var self = this;\n    var UploadList = [];\n    var sendParams = {\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Prefix: params.Key,\n        calledBySdk: params.calledBySdk || 'sliceUploadFile',\n        tracker: params.tracker\n    };\n    var next = function () {\n        self.multipartList(sendParams, function (err, data) {\n            if (err) return callback(err);\n            UploadList.push.apply(UploadList, data.Upload || []);\n            if (data.IsTruncated === 'true') {\n                // 列表不完整\n                sendParams.KeyMarker = data.NextKeyMarker;\n                sendParams.UploadIdMarker = data.NextUploadIdMarker;\n                next();\n            } else {\n                callback(null, { UploadList: UploadList });\n            }\n        });\n    };\n    next();\n}\n\n// 获取指定上传任务的分块列表\nfunction wholeMultipartListPart(params, callback) {\n    var self = this;\n    var PartList = [];\n    var sendParams = {\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        UploadId: params.UploadId,\n        calledBySdk: 'sliceUploadFile',\n        tracker: params.tracker\n    };\n    var next = function () {\n        self.multipartListPart(sendParams, function (err, data) {\n            if (err) return callback(err);\n            PartList.push.apply(PartList, data.Part || []);\n            if (data.IsTruncated === 'true') {\n                // 列表不完整\n                sendParams.PartNumberMarker = data.NextPartNumberMarker;\n                next();\n            } else {\n                callback(null, { PartList: PartList });\n            }\n        });\n    };\n    next();\n}\n\n// 上传文件分块，包括\n/*\n UploadId (上传任务编号)\n AsyncLimit (并发量)，\n SliceList (上传的分块数组)，\n FilePath (本地文件的位置)，\n SliceSize (文件分块大小)\n FileSize (文件大小)\n onProgress (上传成功之后的回调函数)\n */\nfunction uploadSliceList(params, cb) {\n    var self = this;\n    var TaskId = params.TaskId;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var UploadData = params.UploadData;\n    var FileSize = params.FileSize;\n    var SliceSize = params.SliceSize;\n    var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);\n    var Body = params.Body;\n    var SliceCount = Math.ceil(FileSize / SliceSize);\n    var FinishSize = 0;\n    var ServerSideEncryption = params.ServerSideEncryption;\n    var Headers = params.Headers;\n    var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {\n        if (SliceItem['Uploaded']) {\n            FinishSize += SliceItem['PartNumber'] >= SliceCount ? FileSize % SliceSize || SliceSize : SliceSize;\n        }\n        return !SliceItem['Uploaded'];\n    });\n    var onProgress = params.onProgress;\n\n    Async.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {\n        if (!self._isRunningTask(TaskId)) return;\n        var PartNumber = SliceItem['PartNumber'];\n        var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;\n        var preAddSize = 0;\n        uploadSliceItem.call(self, {\n            TaskId: TaskId,\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            SliceSize: SliceSize,\n            FileSize: FileSize,\n            PartNumber: PartNumber,\n            ServerSideEncryption: ServerSideEncryption,\n            Body: Body,\n            UploadData: UploadData,\n            Headers: Headers,\n            onProgress: function (data) {\n                FinishSize += data.loaded - preAddSize;\n                preAddSize = data.loaded;\n                onProgress({ loaded: FinishSize, total: FileSize });\n            },\n            tracker: params.tracker\n        }, function (err, data) {\n            if (!self._isRunningTask(TaskId)) return;\n            if (!err && !data.ETag) err = 'get ETag error, please add \"ETag\" to CORS ExposeHeader setting.( 获取ETag失败，请在CORS ExposeHeader设置中添加ETag，请参考文档：https://cloud.tencent.com/document/product/436/13318 )';\n            if (err) {\n                FinishSize -= preAddSize;\n            } else {\n                FinishSize += currentSize - preAddSize;\n                SliceItem.ETag = data.ETag;\n            }\n            onProgress({ loaded: FinishSize, total: FileSize });\n            asyncCallback(err || null, data);\n        });\n    }, function (err) {\n        if (!self._isRunningTask(TaskId)) return;\n        if (err) return cb(err);\n        cb(null, {\n            UploadId: UploadData.UploadId,\n            SliceList: UploadData.PartList\n        });\n    });\n}\n\n// 上传指定分片\nfunction uploadSliceItem(params, callback) {\n    var self = this;\n    var TaskId = params.TaskId;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var FileSize = params.FileSize;\n    var FileBody = params.Body;\n    var PartNumber = params.PartNumber * 1;\n    var SliceSize = params.SliceSize;\n    var ServerSideEncryption = params.ServerSideEncryption;\n    var UploadData = params.UploadData;\n    var Headers = params.Headers || {};\n    var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;\n\n    var start = SliceSize * (PartNumber - 1);\n\n    var ContentLength = SliceSize;\n\n    var end = start + SliceSize;\n\n    if (end > FileSize) {\n        end = FileSize;\n        ContentLength = end - start;\n    }\n\n    var headersWhiteList = ['x-cos-traffic-limit', 'x-cos-mime-limit'];\n    var headers = {};\n    util.each(Headers, function (v, k) {\n        if (headersWhiteList.indexOf(k) > -1) {\n            headers[k] = v;\n        }\n    });\n\n    var PartItem = UploadData.PartList[PartNumber - 1];\n    Async.retry(ChunkRetryTimes, function (tryCallback) {\n        if (!self._isRunningTask(TaskId)) return;\n        util.fileSlice(FileBody, start, end, true, function (Body) {\n            self.multipartUpload({\n                TaskId: TaskId,\n                Bucket: Bucket,\n                Region: Region,\n                Key: Key,\n                ContentLength: ContentLength,\n                PartNumber: PartNumber,\n                UploadId: UploadData.UploadId,\n                ServerSideEncryption: ServerSideEncryption,\n                Body: Body,\n                Headers: headers,\n                onProgress: params.onProgress,\n                calledBySdk: 'sliceUploadFile',\n                tracker: params.tracker\n            }, function (err, data) {\n                if (!self._isRunningTask(TaskId)) return;\n                if (err) return tryCallback(err);\n                PartItem.Uploaded = true;\n                return tryCallback(null, data);\n            });\n        });\n    }, function (err, data) {\n        if (!self._isRunningTask(TaskId)) return;\n        return callback(err, data);\n    });\n}\n\n// 完成分块上传\nfunction uploadSliceComplete(params, callback) {\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var UploadId = params.UploadId;\n    var SliceList = params.SliceList;\n    var self = this;\n    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;\n    var Headers = params.Headers;\n    var Parts = SliceList.map(function (item) {\n        return {\n            PartNumber: item.PartNumber,\n            ETag: item.ETag\n        };\n    });\n    // 完成上传的请求也做重试\n    Async.retry(ChunkRetryTimes, function (tryCallback) {\n        self.multipartComplete({\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            UploadId: UploadId,\n            Parts: Parts,\n            Headers: Headers,\n            calledBySdk: 'sliceUploadFile',\n            tracker: params.tracker\n        }, tryCallback);\n    }, function (err, data) {\n        callback(err, data);\n    });\n}\n\n// 抛弃分块上传任务\n/*\n AsyncLimit (抛弃上传任务的并发量)，\n UploadId (上传任务的编号，当 Level 为 task 时候需要)\n Level (抛弃分块上传任务的级别，task : 抛弃指定的上传任务，file ： 抛弃指定的文件对应的上传任务，其他值 ：抛弃指定Bucket 的全部上传任务)\n */\nfunction abortUploadTask(params, callback) {\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var UploadId = params.UploadId;\n    var Level = params.Level || 'task';\n    var AsyncLimit = params.AsyncLimit;\n    var self = this;\n\n    var ep = new EventProxy();\n\n    ep.on('error', function (errData) {\n        return callback(errData);\n    });\n\n    // 已经获取到需要抛弃的任务列表\n    ep.on('get_abort_array', function (AbortArray) {\n        abortUploadTaskArray.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            Headers: params.Headers,\n            AsyncLimit: AsyncLimit,\n            AbortArray: AbortArray\n        }, callback);\n    });\n\n    if (Level === 'bucket') {\n        // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务\n        wholeMultipartList.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            calledBySdk: 'abortUploadTask'\n        }, function (err, data) {\n            if (err) return callback(err);\n            ep.emit('get_abort_array', data.UploadList || []);\n        });\n    } else if (Level === 'file') {\n        // 文件级别的任务抛弃，抛弃该文件的全部上传任务\n        if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));\n        wholeMultipartList.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            calledBySdk: 'abortUploadTask'\n        }, function (err, data) {\n            if (err) return callback(err);\n            ep.emit('get_abort_array', data.UploadList || []);\n        });\n    } else if (Level === 'task') {\n        // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务\n        if (!UploadId) return callback(util.error(new Error('abort_upload_task_no_id')));\n        if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));\n        ep.emit('get_abort_array', [{\n            Key: Key,\n            UploadId: UploadId\n        }]);\n    } else {\n        return callback(util.error(new Error('abort_unknown_level')));\n    }\n}\n\n// 批量抛弃分块上传任务\nfunction abortUploadTaskArray(params, callback) {\n\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var AbortArray = params.AbortArray;\n    var AsyncLimit = params.AsyncLimit || 1;\n    var self = this;\n\n    var index = 0;\n    var resultList = new Array(AbortArray.length);\n    Async.eachLimit(AbortArray, AsyncLimit, function (AbortItem, nextItem) {\n        var eachIndex = index;\n        if (Key && Key !== AbortItem.Key) {\n            resultList[eachIndex] = { error: { KeyNotMatch: true } };\n            nextItem(null);\n            return;\n        }\n        var UploadId = AbortItem.UploadId || AbortItem.UploadID;\n\n        self.multipartAbort({\n            Bucket: Bucket,\n            Region: Region,\n            Key: AbortItem.Key,\n            Headers: params.Headers,\n            UploadId: UploadId\n        }, function (err) {\n            var task = {\n                Bucket: Bucket,\n                Region: Region,\n                Key: AbortItem.Key,\n                UploadId: UploadId\n            };\n            resultList[eachIndex] = { error: err, task: task };\n            nextItem(null);\n        });\n        index++;\n    }, function (err) {\n        if (err) return callback(err);\n\n        var successList = [];\n        var errorList = [];\n\n        for (var i = 0, len = resultList.length; i < len; i++) {\n            var item = resultList[i];\n            if (item['task']) {\n                if (item['error']) {\n                    errorList.push(item['task']);\n                } else {\n                    successList.push(item['task']);\n                }\n            }\n        }\n\n        return callback(null, {\n            successList: successList,\n            errorList: errorList\n        });\n    });\n}\n\n// 高级上传\nfunction uploadFile(params, callback) {\n    var self = this;\n\n    // 判断多大的文件使用分片上传\n    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;\n\n    var taskList = [];\n\n    var Body = params.Body;\n    var FileSize = Body.size || Body.length || 0;\n    var fileInfo = { TaskId: '' };\n\n    // 整理 option，用于返回给回调\n    util.each(params, function (v, k) {\n        if (typeof v !== 'object' && typeof v !== 'function') {\n            fileInfo[k] = v;\n        }\n    });\n\n    // 处理文件 TaskReady\n    var _onTaskReady = params.onTaskReady;\n    var onTaskReady = function (tid) {\n        fileInfo.TaskId = tid;\n        _onTaskReady && _onTaskReady(tid);\n    };\n    params.onTaskReady = onTaskReady;\n\n    // 添加上传任务,超过阈值使用分块上传，小于等于则简单上传\n    var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';\n\n    // 上传链路\n    params.tracker = new Tracker({\n        buctet: params.Bucket,\n        region: params.Reigon,\n        apiName: api,\n        originApiName: 'uploadFile',\n        fileKey: params.Key,\n        fileSize: FileSize\n    });\n\n    // 处理文件完成\n    var _onFileFinish = params.onFileFinish;\n    var onFileFinish = function (err, data) {\n        // 格式化上报参数并上报\n        params.tracker && params.tracker.formatResult(err, data);\n        params.tracker && params.tracker.sendEvents();\n        _onFileFinish && _onFileFinish(err, data, fileInfo);\n        callback && callback(err, data);\n    };\n\n    taskList.push({\n        api: api,\n        params: params,\n        callback: onFileFinish\n    });\n\n    self._addTasks(taskList);\n}\n\n// 批量上传文件\nfunction uploadFiles(params, callback) {\n\n    var self = this;\n\n    // 判断多大的文件使用分片上传\n    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;\n\n    // 汇总返回进度\n    var TotalSize = 0;\n    var TotalFinish = 0;\n    var onTotalProgress = util.throttleOnProgress.call(self, TotalFinish, params.onProgress);\n\n    // 汇总返回回调\n    var unFinishCount = params.files.length;\n    var _onTotalFileFinish = params.onFileFinish;\n    var resultList = Array(unFinishCount);\n    var onTotalFileFinish = function (err, data, options) {\n        onTotalProgress(null, true);\n        _onTotalFileFinish && _onTotalFileFinish(err, data, options);\n        resultList[options.Index] = {\n            options: options,\n            error: err,\n            data: data\n        };\n        if (--unFinishCount <= 0 && callback) {\n            callback(null, { files: resultList });\n        }\n    };\n\n    // 开始处理每个文件\n    var taskList = [];\n    util.each(params.files, function (fileParams, index) {\n        (function () {\n            // 对齐 nodejs 缩进\n\n            var Body = fileParams.Body;\n            var FileSize = Body.size || Body.length || 0;\n            var fileInfo = { Index: index, TaskId: '' };\n\n            // 更新文件总大小\n            TotalSize += FileSize;\n\n            // 整理 option，用于返回给回调\n            util.each(fileParams, function (v, k) {\n                if (typeof v !== 'object' && typeof v !== 'function') {\n                    fileInfo[k] = v;\n                }\n            });\n\n            // 处理单个文件 TaskReady\n            var _onTaskReady = fileParams.onTaskReady;\n            var onTaskReady = function (tid) {\n                fileInfo.TaskId = tid;\n                _onTaskReady && _onTaskReady(tid);\n            };\n            fileParams.onTaskReady = onTaskReady;\n\n            // 处理单个文件进度\n            var PreAddSize = 0;\n            var _onProgress = fileParams.onProgress;\n            var onProgress = function (info) {\n                TotalFinish = TotalFinish - PreAddSize + info.loaded;\n                PreAddSize = info.loaded;\n                _onProgress && _onProgress(info);\n                onTotalProgress({ loaded: TotalFinish, total: TotalSize });\n            };\n            fileParams.onProgress = onProgress;\n\n            // 添加上传任务\n            var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';\n\n            // 单个文件上传链路\n            fileParams.tracker = new Tracker({\n                bucket: fileParams.Bucket,\n                region: fileParams.Region,\n                apiName: api,\n                originApiName: 'uploadFiles',\n                fileKey: fileParams.Key,\n                fileSize: FileSize\n            });\n\n            // 处理单个文件完成\n            var _onFileFinish = fileParams.onFileFinish;\n            var onFileFinish = function (err, data) {\n                // 格式化上报参数并上报\n                fileParams.tracker && fileParams.tracker.formatResult(err, data);\n                fileParams.tracker && fileParams.tracker.sendEvents();\n                _onFileFinish && _onFileFinish(err, data);\n                onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);\n            };\n\n            taskList.push({\n                api: api,\n                params: fileParams,\n                callback: onFileFinish\n            });\n        })();\n    });\n    self._addTasks(taskList);\n}\n\n// 分片复制文件\nfunction sliceCopyFile(params, callback) {\n    var ep = new EventProxy();\n\n    var self = this;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var CopySource = params.CopySource;\n    var m = util.getSourceParams.call(this, CopySource);\n    if (!m) {\n        callback(util.error(new Error('CopySource format error')));\n        return;\n    }\n\n    var SourceBucket = m.Bucket;\n    var SourceRegion = m.Region;\n    var SourceKey = decodeURIComponent(m.Key);\n    var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;\n    CopySliceSize = Math.max(0, CopySliceSize);\n\n    var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;\n    var ChunkParallel = this.options.CopyChunkParallelLimit;\n\n    var FinishSize = 0;\n    var FileSize;\n    var onProgress;\n\n    // 分片复制完成，开始 multipartComplete 操作\n    ep.on('copy_slice_complete', function (UploadData) {\n        var metaHeaders = {};\n        util.each(params.Headers, function (val, k) {\n            if (k.toLowerCase().indexOf('x-cos-meta-') === 0) metaHeaders[k] = val;\n        });\n        var Parts = util.map(UploadData.PartList, function (item) {\n            return {\n                PartNumber: item.PartNumber,\n                ETag: item.ETag\n            };\n        });\n        self.multipartComplete({\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            UploadId: UploadData.UploadId,\n            Parts: Parts,\n            calledBySdk: 'sliceCopyFile'\n        }, function (err, data) {\n            if (err) {\n                onProgress(null, true);\n                return callback(err);\n            }\n            onProgress({ loaded: FileSize, total: FileSize }, true);\n            callback(null, data);\n        });\n    });\n\n    ep.on('get_copy_data_finish', function (UploadData) {\n        Async.eachLimit(UploadData.PartList, ChunkParallel, function (SliceItem, asyncCallback) {\n            var PartNumber = SliceItem.PartNumber;\n            var CopySourceRange = SliceItem.CopySourceRange;\n            var currentSize = SliceItem.end - SliceItem.start;\n\n            copySliceItem.call(self, {\n                Bucket: Bucket,\n                Region: Region,\n                Key: Key,\n                CopySource: CopySource,\n                UploadId: UploadData.UploadId,\n                PartNumber: PartNumber,\n                CopySourceRange: CopySourceRange\n            }, function (err, data) {\n                if (err) return asyncCallback(err);\n                FinishSize += currentSize;\n                onProgress({ loaded: FinishSize, total: FileSize });\n                SliceItem.ETag = data.ETag;\n                asyncCallback(err || null, data);\n            });\n        }, function (err) {\n            if (err) {\n                onProgress(null, true);\n                return callback(err);\n            }\n\n            ep.emit('copy_slice_complete', UploadData);\n        });\n    });\n\n    ep.on('get_file_size_finish', function (SourceHeaders) {\n        // 控制分片大小\n        (function () {\n            var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];\n            var AutoChunkSize = 1024 * 1024;\n            for (var i = 0; i < SIZE.length; i++) {\n                AutoChunkSize = SIZE[i] * 1024 * 1024;\n                if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;\n            }\n            params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);\n\n            var ChunkCount = Math.ceil(FileSize / ChunkSize);\n\n            var list = [];\n            for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {\n                var start = (partNumber - 1) * ChunkSize;\n                var end = partNumber * ChunkSize < FileSize ? partNumber * ChunkSize - 1 : FileSize - 1;\n                var item = {\n                    PartNumber: partNumber,\n                    start: start,\n                    end: end,\n                    CopySourceRange: \"bytes=\" + start + \"-\" + end\n                };\n                list.push(item);\n            }\n            params.PartList = list;\n        })();\n\n        var TargetHeader;\n        if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {\n            TargetHeader = params.Headers;\n        } else {\n            TargetHeader = SourceHeaders;\n        }\n        TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];\n        TargetHeader = util.clearKey(TargetHeader);\n        /**\n         * 对于归档存储的对象，如果未恢复副本，则不允许 Copy\n         */\n        if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE' || SourceHeaders['x-cos-storage-class'] === 'DEEP_ARCHIVE') {\n            var restoreHeader = SourceHeaders['x-cos-restore'];\n            if (!restoreHeader || restoreHeader === 'ongoing-request=\"true\"') {\n                callback(util.error(new Error('Unrestored archive object is not allowed to be copied')));\n                return;\n            }\n        }\n        /**\n         * 去除一些无用的头部，规避 multipartInit 出错\n         * 这些头部通常是在 putObjectCopy 时才使用\n         */\n        delete TargetHeader['x-cos-copy-source'];\n        delete TargetHeader['x-cos-metadata-directive'];\n        delete TargetHeader['x-cos-copy-source-If-Modified-Since'];\n        delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];\n        delete TargetHeader['x-cos-copy-source-If-Match'];\n        delete TargetHeader['x-cos-copy-source-If-None-Match'];\n        self.multipartInit({\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            Headers: TargetHeader,\n            calledBySdk: 'sliceCopyFile'\n        }, function (err, data) {\n            if (err) return callback(err);\n            params.UploadId = data.UploadId;\n            ep.emit('get_copy_data_finish', params);\n        });\n    });\n\n    // 获取远端复制源文件的大小\n    self.headObject({\n        Bucket: SourceBucket,\n        Region: SourceRegion,\n        Key: SourceKey\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode && err.statusCode === 404) {\n                callback(util.error(err, { ErrorStatus: SourceKey + ' Not Exist' }));\n            } else {\n                callback(err);\n            }\n            return;\n        }\n\n        FileSize = params.FileSize = data.headers['content-length'];\n        if (FileSize === undefined || !FileSize) {\n            callback(util.error(new Error('get Content-Length error, please add \"Content-Length\" to CORS ExposeHeader setting.（ 获取Content-Length失败，请在CORS ExposeHeader设置中添加Content-Length，请参考文档：https://cloud.tencent.com/document/product/436/13318 ）')));\n            return;\n        }\n\n        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);\n\n        // 开始上传\n        if (FileSize <= CopySliceSize) {\n            if (!params.Headers['x-cos-metadata-directive']) {\n                params.Headers['x-cos-metadata-directive'] = 'Copy';\n            }\n            self.putObjectCopy(params, function (err, data) {\n                if (err) {\n                    onProgress(null, true);\n                    return callback(err);\n                }\n                onProgress({ loaded: FileSize, total: FileSize }, true);\n                callback(err, data);\n            });\n        } else {\n            var resHeaders = data.headers;\n            var SourceHeaders = {\n                'Cache-Control': resHeaders['cache-control'],\n                'Content-Disposition': resHeaders['content-disposition'],\n                'Content-Encoding': resHeaders['content-encoding'],\n                'Content-Type': resHeaders['content-type'],\n                'Expires': resHeaders['expires'],\n                'x-cos-storage-class': resHeaders['x-cos-storage-class']\n            };\n            util.each(resHeaders, function (v, k) {\n                var metaPrefix = 'x-cos-meta-';\n                if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {\n                    SourceHeaders[k] = v;\n                }\n            });\n            ep.emit('get_file_size_finish', SourceHeaders);\n        }\n    });\n}\n\n// 复制指定分片\nfunction copySliceItem(params, callback) {\n    var TaskId = params.TaskId;\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var CopySource = params.CopySource;\n    var UploadId = params.UploadId;\n    var PartNumber = params.PartNumber * 1;\n    var CopySourceRange = params.CopySourceRange;\n\n    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;\n    var self = this;\n\n    Async.retry(ChunkRetryTimes, function (tryCallback) {\n        self.uploadPartCopy({\n            TaskId: TaskId,\n            Bucket: Bucket,\n            Region: Region,\n            Key: Key,\n            CopySource: CopySource,\n            UploadId: UploadId,\n            PartNumber: PartNumber,\n            CopySourceRange: CopySourceRange\n        }, function (err, data) {\n            tryCallback(err || null, data);\n        });\n    }, function (err, data) {\n        return callback(err, data);\n    });\n}\n\nvar API_MAP = {\n    sliceUploadFile: sliceUploadFile,\n    abortUploadTask: abortUploadTask,\n    uploadFile: uploadFile,\n    uploadFiles: uploadFiles,\n    sliceCopyFile: sliceCopyFile\n};\n\nmodule.exports.init = function (COS, task) {\n    task.transferToTaskMethod(API_MAP, 'sliceUploadFile');\n    util.each(API_MAP, function (fn, apiName) {\n        COS.prototype[apiName] = util.apiWrapper(apiName, fn);\n    });\n};\n\n//# sourceURL=webpack://COS/./src/advance.js?");

/***/ }),

/***/ "./src/async.js":
/*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var eachLimit = function (arr, limit, iterator, callback) {\n    callback = callback || function () {};\n    if (!arr.length || limit <= 0) {\n        return callback();\n    }\n\n    var completed = 0;\n    var started = 0;\n    var running = 0;\n\n    (function replenish() {\n        if (completed >= arr.length) {\n            return callback();\n        }\n\n        while (running < limit && started < arr.length) {\n            started += 1;\n            running += 1;\n            iterator(arr[started - 1], function (err) {\n\n                if (err) {\n                    callback(err);\n                    callback = function () {};\n                } else {\n                    completed += 1;\n                    running -= 1;\n                    if (completed >= arr.length) {\n                        callback();\n                    } else {\n                        replenish();\n                    }\n                }\n            });\n        }\n    })();\n};\n\nvar retry = function (times, iterator, callback) {\n    var next = function (index) {\n        iterator(function (err, data) {\n            if (err && index < times) {\n                next(index + 1);\n            } else {\n                callback(err, data);\n            }\n        });\n    };\n    if (times < 1) {\n        callback();\n    } else {\n        next(1);\n    }\n};\n\nvar async = {\n    eachLimit: eachLimit,\n    retry: retry\n};\n\nmodule.exports = async;\n\n//# sourceURL=webpack://COS/./src/async.js?");

/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var REQUEST = __webpack_require__(/*! ../lib/request */ \"./lib/request.js\");\nvar util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n// Bucket 相关\n\n/**\n * 获取用户的 bucket 列表\n * @param  {Object}  params         回调函数，必须，下面为参数列表\n * 无特殊参数\n * @param  {Function}  callback     回调函数，必须\n */\nfunction getService(params, callback) {\n\n    if (typeof params === 'function') {\n        callback = params;\n        params = {};\n    }\n    var protocol = this.options.Protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');\n    var domain = this.options.ServiceDomain;\n    var appId = params.AppId || this.options.appId;\n    var region = params.Region;\n    if (domain) {\n        domain = domain.replace(/\\{\\{AppId\\}\\}/ig, appId || '').replace(/\\{\\{Region\\}\\}/ig, region || '').replace(/\\{\\{.*?\\}\\}/ig, '');\n        if (!/^[a-zA-Z]+:\\/\\//.test(domain)) {\n            domain = protocol + '//' + domain;\n        }\n        if (domain.slice(-1) === '/') {\n            domain = domain.slice(0, -1);\n        }\n    } else if (region) {\n        domain = protocol + '//cos.' + region + '.myqcloud.com';\n    } else {\n        domain = protocol + '//service.cos.myqcloud.com';\n    }\n\n    var SignHost = '';\n    var standardHost = region ? 'cos.' + region + '.myqcloud.com' : 'service.cos.myqcloud.com';\n    var urlHost = domain.replace(/^https?:\\/\\/([^/]+)(\\/.*)?$/, '$1');\n    if (standardHost === urlHost) SignHost = standardHost;\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetService',\n        url: domain,\n        method: 'GET',\n        headers: params.Headers,\n        SignHost: SignHost\n    }, function (err, data) {\n        if (err) return callback(err);\n        var buckets = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Buckets && data.ListAllMyBucketsResult.Buckets.Bucket || [];\n        buckets = util.isArray(buckets) ? buckets : [buckets];\n        var owner = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Owner || {};\n        callback(null, {\n            Buckets: buckets,\n            Owner: owner,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 创建 Bucket，并初始化访问权限\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须\n *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=\" \",uin=\" \"，非必须\n *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=\" \",uin=\" \"，非必须\n *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=\" \",uin=\" \"，非必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n *     @return  {String}  data.Location             操作地址\n */\nfunction putBucket(params, callback) {\n\n    var self = this;\n\n    var xml = '';\n    if (params['BucketAZConfig']) {\n        var CreateBucketConfiguration = {\n            BucketAZConfig: params.BucketAZConfig\n        };\n        xml = util.json2xml({ CreateBucketConfiguration: CreateBucketConfiguration });\n    }\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucket',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        body: xml\n    }, function (err, data) {\n        if (err) return callback(err);\n        var url = getUrl({\n            protocol: self.options.Protocol,\n            domain: self.options.Domain,\n            bucket: params.Bucket,\n            region: params.Region,\n            isLocation: true\n        });\n        callback(null, {\n            Location: url,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 查看是否存在该Bucket，是否有权限访问\n * @param  {Object}  params                     参数对象，必须\n *     @param  {String}  params.Bucket          Bucket名称，必须\n *     @param  {String}  params.Region          地域名称，必须\n * @param  {Function}  callback                 回调函数，必须\n * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                      返回的数据\n *     @return  {Boolean}  data.BucketExist     Bucket是否存在\n *     @return  {Boolean}  data.BucketAuth      是否有 Bucket 的访问权限\n */\nfunction headBucket(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:HeadBucket',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        method: 'HEAD'\n    }, callback);\n}\n\n/**\n * 获取 Bucket 下的 object 列表\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n *     @param  {String}  params.Prefix              前缀匹配，用来规定返回的文件前缀地址，非必须\n *     @param  {String}  params.Delimiter           定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，非必须\n *     @param  {String}  params.Marker              默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须\n *     @param  {String}  params.MaxKeys             单次返回最大的条目数量，默认1000，非必须\n *     @param  {String}  params.EncodingType        规定返回值的编码方式，非必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n *     @return  {Object}  data.ListBucketResult     返回的 object 列表信息\n */\nfunction getBucket(params, callback) {\n    var reqParams = {};\n    reqParams['prefix'] = params['Prefix'] || '';\n    reqParams['delimiter'] = params['Delimiter'];\n    reqParams['marker'] = params['Marker'];\n    reqParams['max-keys'] = params['MaxKeys'];\n    reqParams['encoding-type'] = params['EncodingType'];\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucket',\n        ResourceKey: reqParams['prefix'],\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        qs: reqParams\n    }, function (err, data) {\n        if (err) return callback(err);\n        var ListBucketResult = data.ListBucketResult || {};\n        var Contents = ListBucketResult.Contents || [];\n        var CommonPrefixes = ListBucketResult.CommonPrefixes || [];\n\n        Contents = util.isArray(Contents) ? Contents : [Contents];\n        CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];\n\n        var result = util.clone(ListBucketResult);\n        util.extend(result, {\n            Contents: Contents,\n            CommonPrefixes: CommonPrefixes,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n\n        callback(null, result);\n    });\n}\n\n/**\n * 删除 Bucket\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n * @param  {Function}  callback             回调函数，必须\n * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                  返回的数据\n *     @return  {String}  data.Location     操作地址\n */\nfunction deleteBucket(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucket',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        method: 'DELETE'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 的 权限列表\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须\n *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=\" \",uin=\" \"，非必须\n *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=\" \",uin=\" \"，非必须\n *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=\" \",uin=\" \"，非必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n */\nfunction putBucketAcl(params, callback) {\n    var headers = params.Headers;\n\n    var xml = '';\n    if (params['AccessControlPolicy']) {\n        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});\n        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;\n        Grants = util.isArray(Grants) ? Grants : [Grants];\n        delete AccessControlPolicy.Grant;\n        delete AccessControlPolicy.Grants;\n        AccessControlPolicy.AccessControlList = { Grant: Grants };\n        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });\n\n        headers['Content-Type'] = 'application/xml';\n        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n    }\n\n    // Grant Header 去重\n    util.each(headers, function (val, key) {\n        if (key.indexOf('x-cos-grant-') === 0) {\n            headers[key] = uniqGrant(headers[key]);\n        }\n    });\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketACL',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: headers,\n        action: 'acl',\n        body: xml\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的 权限列表\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n *     @return  {Object}  data.AccessControlPolicy  访问权限信息\n */\nfunction getBucketAcl(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketACL',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'acl'\n    }, function (err, data) {\n        if (err) return callback(err);\n        var AccessControlPolicy = data.AccessControlPolicy || {};\n        var Owner = AccessControlPolicy.Owner || {};\n        var Grant = AccessControlPolicy.AccessControlList.Grant || [];\n        Grant = util.isArray(Grant) ? Grant : [Grant];\n        var result = decodeAcl(AccessControlPolicy);\n        if (data.headers && data.headers['x-cos-acl']) {\n            result.ACL = data.headers['x-cos-acl'];\n        }\n        result = util.extend(result, {\n            Owner: Owner,\n            Grants: Grant,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\n/**\n * 设置 Bucket 的 跨域设置\n * @param  {Object}  params                             参数对象，必须\n *     @param  {String}  params.Bucket                  Bucket名称，必须\n *     @param  {String}  params.Region                  地域名称，必须\n *     @param  {Object}  params.CORSConfiguration       相关的跨域设置，必须\n * @param  {Array}  params.CORSConfiguration.CORSRules  对应的跨域规则\n * @param  {Function}  callback                         回调函数，必须\n * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                              返回的数据\n */\nfunction putBucketCors(params, callback) {\n\n    var CORSConfiguration = params['CORSConfiguration'] || {};\n    var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];\n    CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);\n    util.each(CORSRules, function (rule) {\n        util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {\n            var sKey = key + 's';\n            var val = rule[sKey] || rule[key] || [];\n            delete rule[sKey];\n            rule[key] = util.isArray(val) ? val : [val];\n        });\n    });\n\n    var xml = util.json2xml({ CORSConfiguration: { CORSRule: CORSRules } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketCORS',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'cors',\n        headers: headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的 跨域设置\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n *     @return  {Object}  data.CORSRules            Bucket的跨域设置\n */\nfunction getBucketCors(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketCORS',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'cors'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchCORSConfiguration') {\n                var result = {\n                    CORSRules: [],\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        var CORSConfiguration = data.CORSConfiguration || {};\n        var CORSRules = CORSConfiguration.CORSRules || CORSConfiguration.CORSRule || [];\n        CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);\n\n        util.each(CORSRules, function (rule) {\n            util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {\n                var sKey = key + 's';\n                var val = rule[sKey] || rule[key] || [];\n                delete rule[key];\n                rule[sKey] = util.isArray(val) ? val : [val];\n            });\n        });\n\n        callback(null, {\n            CORSRules: CORSRules,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 的 跨域设置\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n * @param  {Function}  callback             回调函数，必须\n * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                  返回的数据\n */\nfunction deleteBucketCors(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketCORS',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'cors'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode || err.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的 地域信息\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据，包含地域信息 LocationConstraint\n */\nfunction getBucketLocation(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketLocation',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'location'\n    }, callback);\n}\n\nfunction putBucketPolicy(params, callback) {\n    var Policy = params['Policy'];\n    try {\n        if (typeof Policy === 'string') Policy = JSON.parse(Policy);\n    } catch (e) {}\n    if (!Policy || typeof Policy === 'string') return callback(util.error(new Error('Policy format error')));\n    var PolicyStr = JSON.stringify(Policy);\n    if (!Policy.version) Policy.version = '2.0';\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/json';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(PolicyStr));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketPolicy',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        action: 'policy',\n        body: PolicyStr,\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的读取权限策略\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketPolicy(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketPolicy',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'policy',\n        rawBody: true\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode && err.statusCode === 403) {\n                return callback(util.error(err, { ErrorStatus: 'Access Denied' }));\n            }\n            if (err.statusCode && err.statusCode === 405) {\n                return callback(util.error(err, { ErrorStatus: 'Method Not Allowed' }));\n            }\n            if (err.statusCode && err.statusCode === 404) {\n                return callback(util.error(err, { ErrorStatus: 'Policy Not Found' }));\n            }\n            return callback(err);\n        }\n        var Policy = {};\n        try {\n            Policy = JSON.parse(data.body);\n        } catch (e) {}\n        callback(null, {\n            Policy: Policy,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 的 跨域设置\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n * @param  {Function}  callback             回调函数，必须\n * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                  返回的数据\n */\nfunction deleteBucketPolicy(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketPolicy',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'policy'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode || err.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 的标签\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {Array}   params.TagSet  标签设置，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction putBucketTagging(params, callback) {\n\n    var Tagging = params['Tagging'] || {};\n    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];\n    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);\n    var xml = util.json2xml({ Tagging: { TagSet: { Tag: Tags } } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketTagging',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'tagging',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的标签设置\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketTagging(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketTagging',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'tagging'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error && (err.error === \"Not Found\" || err.error.Code === 'NoSuchTagSet')) {\n                var result = {\n                    Tags: [],\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        var Tags = [];\n        try {\n            Tags = data.Tagging.TagSet.Tag || [];\n        } catch (e) {}\n        Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);\n        callback(null, {\n            Tags: Tags,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 的 标签设置\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回的数据\n */\nfunction deleteBucketTagging(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketTagging',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'tagging'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction putBucketLifecycle(params, callback) {\n\n    var LifecycleConfiguration = params['LifecycleConfiguration'] || {};\n    var Rules = LifecycleConfiguration.Rules || params.Rules || [];\n    Rules = util.clone(Rules);\n    var xml = util.json2xml({ LifecycleConfiguration: { Rule: Rules } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketLifecycle',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'lifecycle',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction getBucketLifecycle(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketLifecycle',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'lifecycle'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchLifecycleConfiguration') {\n                var result = {\n                    Rules: [],\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        var Rules = [];\n        try {\n            Rules = data.LifecycleConfiguration.Rule || [];\n        } catch (e) {}\n        Rules = util.clone(util.isArray(Rules) ? Rules : [Rules]);\n        callback(null, {\n            Rules: Rules,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction deleteBucketLifecycle(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketLifecycle',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'lifecycle'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction putBucketVersioning(params, callback) {\n\n    if (!params['VersioningConfiguration']) {\n        callback(util.error(new Error('missing param VersioningConfiguration')));\n        return;\n    }\n    var VersioningConfiguration = params['VersioningConfiguration'] || {};\n    var xml = util.json2xml({ VersioningConfiguration: VersioningConfiguration });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketVersioning',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'versioning',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction getBucketVersioning(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketVersioning',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'versioning'\n    }, function (err, data) {\n        if (!err) {\n            !data.VersioningConfiguration && (data.VersioningConfiguration = {});\n        }\n        callback(err, data);\n    });\n}\n\nfunction putBucketReplication(params, callback) {\n    var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);\n    var xml = util.json2xml({ ReplicationConfiguration: ReplicationConfiguration });\n    xml = xml.replace(/<(\\/?)Rules>/ig, '<$1Rule>');\n    xml = xml.replace(/<(\\/?)Tags>/ig, '<$1Tag>');\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketReplication',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'replication',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction getBucketReplication(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketReplication',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'replication'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {\n                var result = {\n                    ReplicationConfiguration: { Rules: [] },\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});\n        if (data.ReplicationConfiguration.Rule) {\n            data.ReplicationConfiguration.Rules = util.makeArray(data.ReplicationConfiguration.Rule);\n            delete data.ReplicationConfiguration.Rule;\n        }\n        callback(err, data);\n    });\n}\n\nfunction deleteBucketReplication(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketReplication',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'replication'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 静态网站配置信息\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n *     @param  {Object}  params.WebsiteConfiguration                        地域名称，必须\n *         @param  {Object}   WebsiteConfiguration.IndexDocument            索引文档，必须\n *         @param  {Object}   WebsiteConfiguration.ErrorDocument            错误文档，非必须\n *         @param  {Object}   WebsiteConfiguration.RedirectAllRequestsTo    重定向所有请求，非必须\n *         @param  {Array}   params.RoutingRules                            重定向规则，非必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketWebsite(params, callback) {\n\n    if (!params['WebsiteConfiguration']) {\n        callback(util.error(new Error('missing param WebsiteConfiguration')));\n        return;\n    }\n\n    var WebsiteConfiguration = util.clone(params['WebsiteConfiguration'] || {});\n    var RoutingRules = WebsiteConfiguration['RoutingRules'] || WebsiteConfiguration['RoutingRule'] || [];\n    RoutingRules = util.isArray(RoutingRules) ? RoutingRules : [RoutingRules];\n    delete WebsiteConfiguration.RoutingRule;\n    delete WebsiteConfiguration.RoutingRules;\n    if (RoutingRules.length) WebsiteConfiguration.RoutingRules = { RoutingRule: RoutingRules };\n    var xml = util.json2xml({ WebsiteConfiguration: WebsiteConfiguration });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketWebsite',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'website',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的静态网站配置信息\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketWebsite(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketWebsite',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        action: 'website'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error.Code === 'NoSuchWebsiteConfiguration') {\n                var result = {\n                    WebsiteConfiguration: {},\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n\n        var WebsiteConfiguration = data.WebsiteConfiguration || {};\n        if (WebsiteConfiguration['RoutingRules']) {\n            var RoutingRules = util.clone(WebsiteConfiguration['RoutingRules'].RoutingRule || []);\n            RoutingRules = util.makeArray(RoutingRules);\n            WebsiteConfiguration.RoutingRules = RoutingRules;\n        }\n\n        callback(null, {\n            WebsiteConfiguration: WebsiteConfiguration,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 的静态网站配置\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction deleteBucketWebsite(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketWebsite',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'website'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 的防盗链白名单或者黑名单\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n *     @param  {Object}  params.RefererConfiguration                        地域名称，必须\n *         @param  {String}   RefererConfiguration.Status                   是否开启防盗链，枚举值：Enabled、Disabled\n *         @param  {String}   RefererConfiguration.RefererType              防盗链类型，枚举值：Black-List、White-List，必须\n *         @param  {Array}   RefererConfiguration.DomianList.Domain         生效域名，必须\n *         @param  {String}   RefererConfiguration.EmptyReferConfiguration  ，非必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketReferer(params, callback) {\n\n    if (!params['RefererConfiguration']) {\n        callback(util.error(new Error('missing param RefererConfiguration')));\n        return;\n    }\n\n    var RefererConfiguration = util.clone(params['RefererConfiguration'] || {});\n    var DomainList = RefererConfiguration['DomainList'] || {};\n    var Domains = DomainList['Domains'] || DomainList['Domain'] || [];\n    Domains = util.isArray(Domains) ? Domains : [Domains];\n    if (Domains.length) RefererConfiguration.DomainList = { Domain: Domains };\n    var xml = util.json2xml({ RefererConfiguration: RefererConfiguration });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketReferer',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'referer',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的防盗链白名单或者黑名单\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketReferer(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketReferer',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        action: 'referer'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error.Code === 'NoSuchRefererConfiguration') {\n                var result = {\n                    WebsiteConfiguration: {},\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n\n        var RefererConfiguration = data.RefererConfiguration || {};\n        if (RefererConfiguration['DomainList']) {\n            var Domains = util.makeArray(RefererConfiguration['DomainList'].Domain || []);\n            RefererConfiguration.DomainList = { Domains: Domains };\n        }\n\n        callback(null, {\n            RefererConfiguration: RefererConfiguration,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 自定义域名\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketDomain(params, callback) {\n\n    var DomainConfiguration = params['DomainConfiguration'] || {};\n    var DomainRule = DomainConfiguration.DomainRule || params.DomainRule || [];\n    DomainRule = util.clone(DomainRule);\n    var xml = util.json2xml({ DomainConfiguration: { DomainRule: DomainRule } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketDomain',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'domain',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的自定义域名\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketDomain(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketDomain',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'domain'\n    }, function (err, data) {\n        if (err) return callback(err);\n\n        var DomainRule = [];\n        try {\n            DomainRule = data.DomainConfiguration.DomainRule || [];\n        } catch (e) {}\n        DomainRule = util.clone(util.isArray(DomainRule) ? DomainRule : [DomainRule]);\n        callback(null, {\n            DomainRule: DomainRule,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 自定义域名\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction deleteBucketDomain(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketDomain',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'domain'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 的回源\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketOrigin(params, callback) {\n    var OriginConfiguration = params['OriginConfiguration'] || {};\n    var OriginRule = OriginConfiguration.OriginRule || params.OriginRule || [];\n    OriginRule = util.clone(OriginRule);\n    var xml = util.json2xml({ OriginConfiguration: { OriginRule: OriginRule } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketOrigin',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'origin',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的回源\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketOrigin(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketOrigin',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'origin'\n    }, function (err, data) {\n        if (err) return callback(err);\n\n        var OriginRule = [];\n        try {\n            OriginRule = data.OriginConfiguration.OriginRule || [];\n        } catch (e) {}\n        OriginRule = util.clone(util.isArray(OriginRule) ? OriginRule : [OriginRule]);\n        callback(null, {\n            OriginRule: OriginRule,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Bucket 的回源\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction deleteBucketOrigin(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketOrigin',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'origin'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 设置 Bucket 的日志记录\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n *     @param  {(Object|String)}  params.BucketLoggingStatus                         说明日志记录配置的状态，如果无子节点信息则意为关闭日志记录，必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketLogging(params, callback) {\n    var xml = util.json2xml({\n        BucketLoggingStatus: params['BucketLoggingStatus'] || ''\n    });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketLogging',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'logging',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的日志记录\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketLogging(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketLogging',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'logging'\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            BucketLoggingStatus: data.BucketLoggingStatus,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 创建/编辑 Bucket 的清单任务\n * @param  {Object}  params                                                 参数对象，必须\n *     @param  {String}  params.Bucket                                      Bucket名称，必须\n *     @param  {String}  params.Region                                      地域名称，必须\n *     @param  {String}  params.Id                                          清单任务的名称，必须\n *     @param  {Object}  params.InventoryConfiguration                      包含清单的配置参数，必须\n * @param  {Function}  callback                                             回调函数，必须\n * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                                  返回数据\n */\nfunction putBucketInventory(params, callback) {\n    var InventoryConfiguration = util.clone(params['InventoryConfiguration']);\n\n    if (InventoryConfiguration.OptionalFields) {\n        var Field = InventoryConfiguration.OptionalFields || [];\n        InventoryConfiguration.OptionalFields = {\n            Field: Field\n        };\n    }\n\n    if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {\n        var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;\n        if (Object.keys(Encryption).indexOf('SSECOS') > -1) {\n            Encryption['SSE-COS'] = Encryption['SSECOS'];\n            delete Encryption['SSECOS'];\n        }\n    }\n\n    var xml = util.json2xml({\n        InventoryConfiguration: InventoryConfiguration\n    });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketInventory',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'inventory',\n        qs: {\n            id: params['Id']\n        },\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的清单任务信息\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {String}  params.Id      清单任务的名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction getBucketInventory(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketInventory',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'inventory',\n        qs: {\n            id: params['Id']\n        }\n    }, function (err, data) {\n        if (err) return callback(err);\n\n        var InventoryConfiguration = data['InventoryConfiguration'];\n        if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {\n            var Field = InventoryConfiguration.OptionalFields.Field;\n            if (!util.isArray(Field)) {\n                Field = [Field];\n            }\n            InventoryConfiguration.OptionalFields = Field;\n        }\n        if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {\n            var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;\n            if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {\n                Encryption['SSECOS'] = Encryption['SSE-COS'];\n                delete Encryption['SSE-COS'];\n            }\n        }\n\n        callback(null, {\n            InventoryConfiguration: InventoryConfiguration,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Bucket 的清单任务信息\n * @param  {Object}  params                             参数对象，必须\n *     @param  {String}  params.Bucket                  Bucket名称，必须\n *     @param  {String}  params.Region                  地域名称，必须\n *     @param  {String}  params.ContinuationToken       当 COS 响应体中 IsTruncated 为 true，且 NextContinuationToken 节点中存在参数值时，您可以将这个参数作为 continuation-token 参数值，以获取下一页的清单任务信息，非必须\n * @param  {Function}  callback                         回调函数，必须\n * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                              返回数据\n */\nfunction listBucketInventory(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:ListBucketInventory',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'inventory',\n        qs: {\n            'continuation-token': params['ContinuationToken']\n        }\n    }, function (err, data) {\n        if (err) return callback(err);\n        var ListInventoryConfigurationResult = data['ListInventoryConfigurationResult'];\n        var InventoryConfigurations = ListInventoryConfigurationResult.InventoryConfiguration || [];\n        InventoryConfigurations = util.isArray(InventoryConfigurations) ? InventoryConfigurations : [InventoryConfigurations];\n        delete ListInventoryConfigurationResult['InventoryConfiguration'];\n        util.each(InventoryConfigurations, function (InventoryConfiguration) {\n            if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {\n                var Field = InventoryConfiguration.OptionalFields.Field;\n                if (!util.isArray(Field)) {\n                    Field = [Field];\n                }\n                InventoryConfiguration.OptionalFields = Field;\n            }\n\n            if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {\n                var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;\n                if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {\n                    Encryption['SSECOS'] = Encryption['SSE-COS'];\n                    delete Encryption['SSE-COS'];\n                }\n            }\n        });\n        ListInventoryConfigurationResult.InventoryConfigurations = InventoryConfigurations;\n        util.extend(ListInventoryConfigurationResult, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, ListInventoryConfigurationResult);\n    });\n}\n\n/**\n * 删除 Bucket 的清单任务\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {String}  params.Id      清单任务的名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回数据\n */\nfunction deleteBucketInventory(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketInventory',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'inventory',\n        qs: {\n            id: params['Id']\n        }\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/* 全球加速 */\nfunction putBucketAccelerate(params, callback) {\n\n    if (!params['AccelerateConfiguration']) {\n        callback(util.error(new Error('missing param AccelerateConfiguration')));\n        return;\n    }\n\n    var configuration = { AccelerateConfiguration: params.AccelerateConfiguration || {} };\n\n    var xml = util.json2xml(configuration);\n\n    var headers = {};\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketAccelerate',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'accelerate',\n        headers: headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction getBucketAccelerate(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketAccelerate',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        action: 'accelerate'\n    }, function (err, data) {\n        if (!err) {\n            !data.AccelerateConfiguration && (data.AccelerateConfiguration = {});\n        }\n        callback(err, data);\n    });\n}\n\nfunction putBucketEncryption(params, callback) {\n    var conf = params.ServerSideEncryptionConfiguration || {};\n    var Rules = conf.Rule || conf.Rules || [];\n    var xml = util.json2xml({ ServerSideEncryptionConfiguration: { Rule: Rules } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutBucketEncryption',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'encryption',\n        headers: headers\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\nfunction getBucketEncryption(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketEncryption',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'encryption'\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.code === 'NoSuchEncryptionConfiguration') {\n                var result = {\n                    EncryptionConfiguration: { Rules: [] },\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        var Rules = util.makeArray(data.EncryptionConfiguration && data.EncryptionConfiguration.Rule || []);\n        data.EncryptionConfiguration = { Rules: Rules };\n        callback(err, data);\n    });\n}\n\nfunction deleteBucketEncryption(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteBucketReplication',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'encryption'\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n// Object 相关\n\n/**\n * 取回对应Object的元数据，Head的权限与Get的权限一致\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n *     @param  {String}  params.Key                 文件名称，必须\n *     @param  {String}  params.IfModifiedSince     当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          为指定 object 的元数据，如果设置了 IfModifiedSince ，且文件未修改，则返回一个对象，NotModified 属性为 true\n *     @return  {Boolean}  data.NotModified         是否在 IfModifiedSince 时间点之后未修改该 object，则为 true\n */\nfunction headObject(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:HeadObject',\n        method: 'HEAD',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        VersionId: params.VersionId,\n        headers: params.Headers\n    }, function (err, data) {\n        if (err) {\n            var statusCode = err.statusCode;\n            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {\n                return callback(null, {\n                    NotModified: true,\n                    statusCode: statusCode\n                });\n            }\n            return callback(err);\n        }\n        data.ETag = util.attr(data.headers, 'etag', '');\n        callback(null, data);\n    });\n}\n\nfunction listObjectVersions(params, callback) {\n    var reqParams = {};\n    reqParams['prefix'] = params['Prefix'] || '';\n    reqParams['delimiter'] = params['Delimiter'];\n    reqParams['key-marker'] = params['KeyMarker'];\n    reqParams['version-id-marker'] = params['VersionIdMarker'];\n    reqParams['max-keys'] = params['MaxKeys'];\n    reqParams['encoding-type'] = params['EncodingType'];\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetBucketObjectVersions',\n        ResourceKey: reqParams['prefix'],\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        qs: reqParams,\n        action: 'versions'\n    }, function (err, data) {\n        if (err) return callback(err);\n        var ListVersionsResult = data.ListVersionsResult || {};\n        var DeleteMarkers = ListVersionsResult.DeleteMarker || [];\n        DeleteMarkers = util.isArray(DeleteMarkers) ? DeleteMarkers : [DeleteMarkers];\n        var Versions = ListVersionsResult.Version || [];\n        Versions = util.isArray(Versions) ? Versions : [Versions];\n\n        var result = util.clone(ListVersionsResult);\n        delete result.DeleteMarker;\n        delete result.Version;\n        util.extend(result, {\n            DeleteMarkers: DeleteMarkers,\n            Versions: Versions,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n\n        callback(null, result);\n    });\n}\n\n/**\n * 下载 object\n * @param  {Object}  params                                 参数对象，必须\n *     @param  {String}  params.Bucket                      Bucket名称，必须\n *     @param  {String}  params.Region                      地域名称，必须\n *     @param  {String}  params.Key                         文件名称，必须\n *     @param  {WriteStream}  params.Output                 文件写入流，非必须\n *     @param  {String}  params.IfModifiedSince             当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须\n *     @param  {String}  params.IfUnmodifiedSince           如果文件修改时间早于或等于指定时间，才返回文件内容。否则返回 412 (precondition failed)，非必须\n *     @param  {String}  params.IfMatch                     当 ETag 与指定的内容一致，才返回文件。否则返回 412 (precondition failed)，非必须\n *     @param  {String}  params.IfNoneMatch                 当 ETag 与指定的内容不一致，才返回文件。否则返回304 (not modified)，非必须\n *     @param  {String}  params.ResponseContentType         设置返回头部中的 Content-Type 参数，非必须\n *     @param  {String}  params.ResponseContentLanguage     设置返回头部中的 Content-Language 参数，非必须\n *     @param  {String}  params.ResponseExpires             设置返回头部中的 Content-Expires 参数，非必须\n *     @param  {String}  params.ResponseCacheControl        设置返回头部中的 Cache-Control 参数，非必须\n *     @param  {String}  params.ResponseContentDisposition  设置返回头部中的 Content-Disposition 参数，非必须\n *     @param  {String}  params.ResponseContentEncoding     设置返回头部中的 Content-Encoding 参数，非必须\n * @param  {Function}  callback                             回调函数，必须\n * @param  {Object}  err                                    请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @param  {Object}  data                                   为对应的 object 数据，包括 body 和 headers\n */\nfunction getObject(params, callback) {\n    var reqParams = params.Query || {};\n    var reqParamsStr = params.QueryString || '';\n    var onProgress = util.throttleOnProgress.call(this, 0, params.onProgress);\n    var tracker = params.tracker;\n    tracker.setParams({ signStartTime: new Date().getTime() });\n\n    reqParams['response-content-type'] = params['ResponseContentType'];\n    reqParams['response-content-language'] = params['ResponseContentLanguage'];\n    reqParams['response-expires'] = params['ResponseExpires'];\n    reqParams['response-cache-control'] = params['ResponseCacheControl'];\n    reqParams['response-content-disposition'] = params['ResponseContentDisposition'];\n    reqParams['response-content-encoding'] = params['ResponseContentEncoding'];\n\n    // 如果用户自己传入了 output\n    submitRequest.call(this, {\n        Action: 'name/cos:GetObject',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        VersionId: params.VersionId,\n        DataType: params.DataType,\n        headers: params.Headers,\n        qs: reqParams,\n        qsStr: reqParamsStr,\n        rawBody: true,\n        onDownloadProgress: onProgress,\n        tracker: tracker\n    }, function (err, data) {\n        onProgress(null, true);\n        if (err) {\n            var statusCode = err.statusCode;\n            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {\n                return callback(null, {\n                    NotModified: true\n                });\n            }\n            return callback(err);\n        }\n        callback(null, {\n            Body: data.body,\n            ETag: util.attr(data.headers, 'etag', ''),\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 上传 object\n * @param  {Object} params                                          参数对象，必须\n *     @param  {String}  params.Bucket                              Bucket名称，必须\n *     @param  {String}  params.Region                              地域名称，必须\n *     @param  {String}  params.Key                                 文件名称，必须\n *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串，必须\n *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须\n *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须\n *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须\n *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须\n *     @param  {String}  params.GrantRead                           赋予被授权者读取对象的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantReadAcp                        赋予被授权者读取对象的访问控制列表（ACL）的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantWriteAcp                       赋予被授权者写入对象的访问控制列表（ACL）的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantFullControl                    赋予被授权者操作对象的所有权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.StorageClass                        设置对象的存储级别，枚举值：STANDARD、STANDARD_IA、ARCHIVE，默认值：STANDARD，非必须\n *     @param  {String}  params.x-cos-meta-*                        允许用户自定义的头部信息，将作为对象的元数据保存。大小限制2KB，非必须\n *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须\n *     @param  {String}  params.ServerSideEncryption                支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: \"AES256\"，非必须\n *     @param  {Function}  params.onProgress                        上传进度回调函数\n * @param  {Function}  callback                                     回调函数，必须\n * @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                          为对应的 object 数据\n *     @return  {String}  data.ETag                                 为对应上传文件的 ETag 值\n */\nfunction putObject(params, callback) {\n    var self = this;\n    var FileSize = params.ContentLength;\n    var onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);\n\n    // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里\n    var headers = params.Headers;\n    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';\n    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';\n    var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;\n\n    var tracker = params.tracker;\n    needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });\n\n    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {\n        if (md5) {\n            tracker && tracker.setParams({ md5EndTime: new Date().getTime() });\n            if (self.options.UploadCheckContentMd5) headers['Content-MD5'] = util.binaryBase64(md5);\n            if (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5) headers['x-cos-meta-md5'] = md5;\n        }\n        if (params.ContentLength !== undefined) headers['Content-Length'] = params.ContentLength;\n        onProgress(null, true); // 任务状态开始 uploading\n        submitRequest.call(self, {\n            Action: 'name/cos:PutObject',\n            TaskId: params.TaskId,\n            method: 'PUT',\n            Bucket: params.Bucket,\n            Region: params.Region,\n            Key: params.Key,\n            headers: params.Headers,\n            qs: params.Query,\n            body: params.Body,\n            onProgress: onProgress,\n            tracker: tracker\n        }, function (err, data) {\n            if (err) {\n                onProgress(null, true);\n                return callback(err);\n            }\n            onProgress({ loaded: FileSize, total: FileSize }, true);\n            var url = getUrl({\n                ForcePathStyle: self.options.ForcePathStyle,\n                protocol: self.options.Protocol,\n                domain: self.options.Domain,\n                bucket: params.Bucket,\n                region: !self.options.UseAccelerate ? params.Region : 'accelerate',\n                object: params.Key\n            });\n            url = url.substr(url.indexOf('://') + 3);\n            data.Location = url;\n            data.ETag = util.attr(data.headers, 'etag', '');\n            callback(null, data);\n        });\n    }, params.onHashProgress);\n}\n\n/**\n * 删除 object\n * @param  {Object}  params                     参数对象，必须\n *     @param  {String}  params.Bucket          Bucket名称，必须\n *     @param  {String}  params.Region          地域名称，必须\n *     @param  {String}  params.Key             object名称，必须\n * @param  {Function}  callback                 回调函数，必须\n * @param  {Object}  err                        请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @param  {Object}  data                       删除操作成功之后返回的数据\n */\nfunction deleteObject(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteObject',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        VersionId: params.VersionId,\n        action: params.Recursive ? 'recursive' : ''\n    }, function (err, data) {\n        if (err) {\n            var statusCode = err.statusCode;\n            if (statusCode && statusCode === 404) {\n                return callback(null, { BucketNotFound: true, statusCode: statusCode });\n            } else {\n                return callback(err);\n            }\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 object 的 权限列表\n * @param  {Object}  params                         参数对象，必须\n *     @param  {String}  params.Bucket              Bucket名称，必须\n *     @param  {String}  params.Region              地域名称，必须\n *     @param  {String}  params.Key                 object名称，必须\n * @param  {Function}  callback                     回调函数，必须\n * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                          返回的数据\n *     @return  {Object}  data.AccessControlPolicy  权限列表\n */\nfunction getObjectAcl(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetObjectACL',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        action: 'acl'\n    }, function (err, data) {\n        if (err) return callback(err);\n        var AccessControlPolicy = data.AccessControlPolicy || {};\n        var Owner = AccessControlPolicy.Owner || {};\n        var Grant = AccessControlPolicy.AccessControlList && AccessControlPolicy.AccessControlList.Grant || [];\n        Grant = util.isArray(Grant) ? Grant : [Grant];\n        var result = decodeAcl(AccessControlPolicy);\n        delete result.GrantWrite;\n        if (data.headers && data.headers['x-cos-acl']) {\n            result.ACL = data.headers['x-cos-acl'];\n        }\n        result = util.extend(result, {\n            Owner: Owner,\n            Grants: Grant,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\n/**\n * 设置 object 的 权限列表\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {String}  params.Key     object名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回的数据\n */\nfunction putObjectAcl(params, callback) {\n    var headers = params.Headers;\n\n    var xml = '';\n    if (params['AccessControlPolicy']) {\n        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});\n        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;\n        Grants = util.isArray(Grants) ? Grants : [Grants];\n        delete AccessControlPolicy.Grant;\n        delete AccessControlPolicy.Grants;\n        AccessControlPolicy.AccessControlList = { Grant: Grants };\n        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });\n\n        headers['Content-Type'] = 'application/xml';\n        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n    }\n\n    // Grant Header 去重\n    util.each(headers, function (val, key) {\n        if (key.indexOf('x-cos-grant-') === 0) {\n            headers[key] = uniqGrant(headers[key]);\n        }\n    });\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutObjectACL',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        action: 'acl',\n        headers: headers,\n        body: xml\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * Options Object请求实现跨域访问的预请求。即发出一个 OPTIONS 请求给服务器以确认是否可以进行跨域操作。\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {String}  params.Key     object名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data              返回的数据\n */\nfunction optionsObject(params, callback) {\n\n    var headers = params.Headers;\n    headers['Origin'] = params['Origin'];\n    headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];\n    headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];\n\n    submitRequest.call(this, {\n        Action: 'name/cos:OptionsObject',\n        method: 'OPTIONS',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: headers\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode && err.statusCode === 403) {\n                return callback(null, {\n                    OptionsForbidden: true,\n                    statusCode: err.statusCode\n                });\n            }\n            return callback(err);\n        }\n\n        var headers = data.headers || {};\n        callback(null, {\n            AccessControlAllowOrigin: headers['access-control-allow-origin'],\n            AccessControlAllowMethods: headers['access-control-allow-methods'],\n            AccessControlAllowHeaders: headers['access-control-allow-headers'],\n            AccessControlExposeHeaders: headers['access-control-expose-headers'],\n            AccessControlMaxAge: headers['access-control-max-age'],\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * @param  {Object}                                     参数列表\n *     @param  {String}  Bucket                         Bucket 名称\n *     @param  {String}  Region                         地域名称\n *     @param  {String}  Key                            文件名称\n *     @param  {String}  CopySource                     源文件URL绝对路径，可以通过versionid子资源指定历史版本\n *     @param  {String}  ACL                            允许用户自定义文件权限。有效值：private，public-read默认值：private。\n *     @param  {String}  GrantRead                      赋予被授权者读的权限，格式 x-cos-grant-read: uin=\" \",uin=\" \"，当需要给子账户授权时，uin=\"RootAcountID/SubAccountID\"，当需要给根账户授权时，uin=\"RootAcountID\"。\n *     @param  {String}  GrantWrite                     赋予被授权者写的权限，格式 x-cos-grant-write: uin=\" \",uin=\" \"，当需要给子账户授权时，uin=\"RootAcountID/SubAccountID\"，当需要给根账户授权时，uin=\"RootAcountID\"。\n *     @param  {String}  GrantFullControl               赋予被授权者读写权限，格式 x-cos-grant-full-control: uin=\" \",uin=\" \"，当需要给子账户授权时，uin=\"RootAcountID/SubAccountID\"，当需要给根账户授权时，uin=\"RootAcountID\"。\n *     @param  {String}  MetadataDirective              是否拷贝元数据，枚举值：Copy, Replaced，默认值Copy。假如标记为Copy，忽略Header中的用户元数据信息直接复制；假如标记为Replaced，按Header信息修改元数据。当目标路径和原路径一致，即用户试图修改元数据时，必须为Replaced\n *     @param  {String}  CopySourceIfModifiedSince      当Object在指定时间后被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-None-Match一起使用，与其他条件联合使用返回冲突。\n *     @param  {String}  CopySourceIfUnmodifiedSince    当Object在指定时间后未被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-Match一起使用，与其他条件联合使用返回冲突。\n *     @param  {String}  CopySourceIfMatch              当Object的ETag和给定一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Unmodified-Since一起使用，与其他条件联合使用返回冲突。\n *     @param  {String}  CopySourceIfNoneMatch          当Object的ETag和给定不一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Modified-Since一起使用，与其他条件联合使用返回冲突。\n *     @param  {String}  StorageClass                   存储级别，枚举值：存储级别，枚举值：Standard, Standard_IA，Archive；默认值：Standard\n *     @param  {String}  CacheControl                   指定所有缓存机制在整个请求/响应链中必须服从的指令。\n *     @param  {String}  ContentDisposition             MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件\n *     @param  {String}  ContentEncoding                HTTP 中用来对「采用何种编码格式传输正文」进行协定的一对头部字段\n *     @param  {String}  ContentLength                  设置响应消息的实体内容的大小，单位为字节\n *     @param  {String}  ContentType                    RFC 2616 中定义的 HTTP 请求内容类型（MIME），例如text/plain\n *     @param  {String}  Expect                         请求的特定的服务器行为\n *     @param  {String}  Expires                        响应过期的日期和时间\n *     @param  {String}  params.ServerSideEncryption   支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: \"AES256\"，非必须\n *     @param  {String}  ContentLanguage                指定内容语言\n *     @param  {String}  x-cos-meta-*                   允许用户自定义的头部信息，将作为 Object 元数据返回。大小限制2K。\n */\nfunction putObjectCopy(params, callback) {\n\n    // 特殊处理 Cache-Control\n    var self = this;\n    var headers = params.Headers;\n    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';\n\n    var CopySource = params.CopySource || '';\n    var m = util.getSourceParams.call(this, CopySource);\n    if (!m) {\n        callback(util.error(new Error('CopySource format error')));\n        return;\n    }\n\n    var SourceBucket = m[1];\n    var SourceRegion = m[3];\n    var SourceKey = decodeURIComponent(m[4]);\n\n    submitRequest.call(this, {\n        Scope: [{\n            action: 'name/cos:GetObject',\n            bucket: SourceBucket,\n            region: SourceRegion,\n            prefix: SourceKey\n        }, {\n            action: 'name/cos:PutObject',\n            bucket: params.Bucket,\n            region: params.Region,\n            prefix: params.Key\n        }],\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        VersionId: params.VersionId,\n        headers: params.Headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        var result = util.clone(data.CopyObjectResult || {});\n        var url = getUrl({\n            ForcePathStyle: self.options.ForcePathStyle,\n            protocol: self.options.Protocol,\n            domain: self.options.Domain,\n            bucket: params.Bucket,\n            region: params.Region,\n            object: params.Key,\n            isLocation: true\n        });\n        util.extend(result, {\n            Location: url,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\nfunction uploadPartCopy(params, callback) {\n\n    var CopySource = params.CopySource || '';\n    var m = util.getSourceParams.call(this, CopySource);\n    if (!m) {\n        callback(util.error(new Error('CopySource format error')));\n        return;\n    }\n\n    var SourceBucket = m[1];\n    var SourceRegion = m[3];\n    var SourceKey = decodeURIComponent(m[4]);\n\n    submitRequest.call(this, {\n        Scope: [{\n            action: 'name/cos:GetObject',\n            bucket: SourceBucket,\n            region: SourceRegion,\n            prefix: SourceKey\n        }, {\n            action: 'name/cos:PutObject',\n            bucket: params.Bucket,\n            region: params.Region,\n            prefix: params.Key\n        }],\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        VersionId: params.VersionId,\n        qs: {\n            partNumber: params['PartNumber'],\n            uploadId: params['UploadId']\n        },\n        headers: params.Headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        var result = util.clone(data.CopyPartResult || {});\n        util.extend(result, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\nfunction deleteMultipleObject(params, callback) {\n    var Objects = params.Objects || [];\n    var Quiet = params.Quiet;\n    Objects = util.isArray(Objects) ? Objects : [Objects];\n\n    var xml = util.json2xml({ Delete: { Object: Objects, Quiet: Quiet || false } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    var Scope = util.map(Objects, function (v) {\n        return {\n            action: 'name/cos:DeleteObject',\n            bucket: params.Bucket,\n            region: params.Region,\n            prefix: v.Key\n        };\n    });\n\n    submitRequest.call(this, {\n        Scope: Scope,\n        method: 'POST',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        body: xml,\n        action: 'delete',\n        headers: headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        var DeleteResult = data.DeleteResult || {};\n        var Deleted = DeleteResult.Deleted || [];\n        var Errors = DeleteResult.Error || [];\n\n        Deleted = util.isArray(Deleted) ? Deleted : [Deleted];\n        Errors = util.isArray(Errors) ? Errors : [Errors];\n\n        var result = util.clone(DeleteResult);\n        util.extend(result, {\n            Error: Errors,\n            Deleted: Deleted,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\nfunction restoreObject(params, callback) {\n    var headers = params.Headers;\n    if (!params['RestoreRequest']) {\n        callback(util.error(new Error('missing param RestoreRequest')));\n        return;\n    }\n\n    var RestoreRequest = params.RestoreRequest || {};\n    var xml = util.json2xml({ RestoreRequest: RestoreRequest });\n\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:RestoreObject',\n        method: 'POST',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        VersionId: params.VersionId,\n        body: xml,\n        action: 'restore',\n        headers: headers\n    }, callback);\n}\n\n/**\n * 设置 Object 的标签\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Object名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n *     @param  {Array}   params.TagSet  标签设置，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998\n * @return  {Object}  data              返回数据\n */\nfunction putObjectTagging(params, callback) {\n\n    var Tagging = params['Tagging'] || {};\n    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];\n    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);\n    var xml = util.json2xml({ Tagging: { TagSet: { Tag: Tags } } });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:PutObjectTagging',\n        method: 'PUT',\n        Bucket: params.Bucket,\n        Key: params.Key,\n        Region: params.Region,\n        body: xml,\n        action: 'tagging',\n        headers: headers,\n        VersionId: params.VersionId\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 获取 Object 的标签设置\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Bucket名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998\n * @return  {Object}  data              返回数据\n */\nfunction getObjectTagging(params, callback) {\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetObjectTagging',\n        method: 'GET',\n        Key: params.Key,\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        action: 'tagging',\n        VersionId: params.VersionId\n    }, function (err, data) {\n        if (err) {\n            if (err.statusCode === 404 && err.error && (err.error === \"Not Found\" || err.error.Code === 'NoSuchTagSet')) {\n                var result = {\n                    Tags: [],\n                    statusCode: err.statusCode\n                };\n                err.headers && (result.headers = err.headers);\n                callback(null, result);\n            } else {\n                callback(err);\n            }\n            return;\n        }\n        var Tags = [];\n        try {\n            Tags = data.Tagging.TagSet.Tag || [];\n        } catch (e) {}\n        Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);\n        callback(null, {\n            Tags: Tags,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 删除 Object 的 标签设置\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Bucket  Object名称，必须\n *     @param  {String}  params.Region  地域名称，必须\n * @param  {Function}  callback         回调函数，必须\n * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998\n * @return  {Object}  data              返回的数据\n */\nfunction deleteObjectTagging(params, callback) {\n    submitRequest.call(this, {\n        Action: 'name/cos:DeleteObjectTagging',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        action: 'tagging',\n        VersionId: params.VersionId\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 使用 SQL 语句从指定对象（CSV 格式或者 JSON 格式）中检索内容\n * @param  {Object}  params                   参数对象，必须\n *     @param  {String}  params.Bucket        Object名称，必须\n *     @param  {String}  params.Region        地域名称，必须\n *     @param  {Object}  params.SelectRequest 地域名称，必须\n * @param  {Function}  callback               回调函数，必须\n * @return  {Object}  err                     请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/42998\n * @return  {Object}  data                    返回的数据\n */\nfunction selectObjectContent(params, callback) {\n    var SelectType = params['SelectType'];\n    if (!SelectType) return callback(util.error(new Error('missing param SelectType')));\n\n    var SelectRequest = params['SelectRequest'] || {};\n    var xml = util.json2xml({ SelectRequest: SelectRequest });\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:GetObject',\n        method: 'POST',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        action: 'select',\n        qs: {\n            'select-type': params['SelectType']\n        },\n        VersionId: params.VersionId,\n        body: xml,\n        DataType: 'arraybuffer',\n        rawBody: true\n    }, function (err, data) {\n        if (err && err.statusCode === 204) {\n            return callback(null, { statusCode: err.statusCode });\n        } else if (err) {\n            return callback(err);\n        }\n        var result = util.parseSelectPayload(data.body);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers,\n            Body: result.body,\n            Payload: result.payload\n        });\n    });\n}\n\n// 分块上传\n\n\n/**\n * 初始化分块上传\n * @param  {Object}  params                                     参数对象，必须\n *     @param  {String}  params.Bucket                          Bucket名称，必须\n *     @param  {String}  params.Region                          地域名称，必须\n *     @param  {String}  params.Key                             object名称，必须\n *     @param  {String}  params.UploadId                        object名称，必须\n *     @param  {String}  params.CacheControl                    RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentDisposition              RFC 2616 中定义的文件名称，将作为 Object 元数据保存    ，非必须\n *     @param  {String}  params.ContentEncoding                 RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentType                     RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须\n *     @param  {String}  params.Expires                         RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ACL                             允许用户自定义文件权限，非必须\n *     @param  {String}  params.GrantRead                       赋予被授权者读的权限 ，非必须\n *     @param  {String}  params.GrantWrite                      赋予被授权者写的权限 ，非必须\n *     @param  {String}  params.GrantFullControl                赋予被授权者读写权限 ，非必须\n *     @param  {String}  params.StorageClass                    设置Object的存储级别，枚举值：Standard，Standard_IA，Archive，非必须\n *     @param  {String}  params.ServerSideEncryption           支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: \"AES256\"，非必须\n * @param  {Function}  callback                                 回调函数，必须\n * @return  {Object}  err                                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                      返回的数据\n */\nfunction multipartInit(params, callback) {\n    var self = this;\n    // 特殊处理 Cache-Control\n    var headers = params.Headers;\n    var tracker = params.tracker;\n\n    // 特殊处理 Cache-Control、Content-Type\n    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';\n    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';\n\n    var needCalcMd5 = params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5);\n    needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });\n\n    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {\n        if (md5) params.Headers['x-cos-meta-md5'] = md5;\n        needCalcMd5 && tracker && tracker.setParams({ md5EndTime: new Date().getTime() });\n        submitRequest.call(self, {\n            Action: 'name/cos:InitiateMultipartUpload',\n            method: 'POST',\n            Bucket: params.Bucket,\n            Region: params.Region,\n            Key: params.Key,\n            action: 'uploads',\n            headers: params.Headers,\n            qs: params.Query,\n            tracker: tracker\n        }, function (err, data) {\n            if (err) return callback(err);\n            data = util.clone(data || {});\n            if (data && data.InitiateMultipartUploadResult) {\n                return callback(null, util.extend(data.InitiateMultipartUploadResult, {\n                    statusCode: data.statusCode,\n                    headers: data.headers\n                }));\n            }\n            callback(null, data);\n        });\n    }, params.onHashProgress);\n}\n\n/**\n * 分块上传\n * @param  {Object}  params                                 参数对象，必须\n *     @param  {String}  params.Bucket                      Bucket名称，必须\n *     @param  {String}  params.Region                      地域名称，必须\n *     @param  {String}  params.Key                         object名称，必须\n *     @param  {File || Blob || String}  params.Body        上传文件对象或字符串\n *     @param  {String} params.ContentLength                RFC 2616 中定义的 HTTP 请求内容长度（字节），非必须\n *     @param  {String} params.Expect                       当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须\n *     @param  {String} params.ServerSideEncryption         支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: \"AES256\"，非必须\n *     @param  {String} params.ContentSha1                  RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验值，非必须\n * @param  {Function}  callback                             回调函数，必须\n *     @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n *     @return  {Object}  data                              返回的数据\n *     @return  {Object}  data.ETag                         返回的文件分块 sha1 值\n */\nfunction multipartUpload(params, callback) {\n\n    var self = this;\n    util.getFileSize('multipartUpload', params, function () {\n        var tracker = params.tracker;\n        var needCalcMd5 = self.options.UploadCheckContentMd5;\n        needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });\n        util.getBodyMd5(needCalcMd5, params.Body, function (md5) {\n            if (md5) params.Headers['Content-MD5'] = util.binaryBase64(md5);\n            needCalcMd5 && tracker && tracker.setParams({ md5EndTime: new Date().getTime(), partNumber: params['PartNumber'] });\n            submitRequest.call(self, {\n                Action: 'name/cos:UploadPart',\n                TaskId: params.TaskId,\n                method: 'PUT',\n                Bucket: params.Bucket,\n                Region: params.Region,\n                Key: params.Key,\n                qs: {\n                    partNumber: params['PartNumber'],\n                    uploadId: params['UploadId']\n                },\n                headers: params.Headers,\n                onProgress: params.onProgress,\n                body: params.Body || null,\n                tracker: tracker\n            }, function (err, data) {\n                if (err) return callback(err);\n                callback(null, {\n                    ETag: util.attr(data.headers, 'etag', ''),\n                    statusCode: data.statusCode,\n                    headers: data.headers\n                });\n            });\n        });\n    });\n}\n\n/**\n * 完成分块上传\n * @param  {Object}  params                             参数对象，必须\n *     @param  {String}  params.Bucket                  Bucket名称，必须\n *     @param  {String}  params.Region                  地域名称，必须\n *     @param  {String}  params.Key                     object名称，必须\n *     @param  {Array}   params.Parts                   分块信息列表，必须\n *     @param  {String}  params.Parts[i].PartNumber     块编号，必须\n *     @param  {String}  params.Parts[i].ETag           分块的 sha1 校验值\n * @param  {Function}  callback                         回调函数，必须\n * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                              返回的数据\n *     @return  {Object}  data.CompleteMultipartUpload  完成分块上传后的文件信息，包括Location, Bucket, Key 和 ETag\n */\nfunction multipartComplete(params, callback) {\n    var self = this;\n\n    var UploadId = params.UploadId;\n\n    var Parts = params['Parts'];\n\n    var tracker = params.tracker;\n\n    for (var i = 0, len = Parts.length; i < len; i++) {\n        if (Parts[i]['ETag'] && Parts[i]['ETag'].indexOf('\"') === 0) {\n            continue;\n        }\n        Parts[i]['ETag'] = '\"' + Parts[i]['ETag'] + '\"';\n    }\n\n    var xml = util.json2xml({ CompleteMultipartUpload: { Part: Parts } });\n    // CSP/ceph CompleteMultipartUpload 接口 body 写死了限制 1MB，这里醉倒 10000 片时，xml 字符串去掉空格853KB\n    xml = xml.replace(/\\n\\s*/g, '');\n\n    var headers = params.Headers;\n    headers['Content-Type'] = 'application/xml';\n    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));\n\n    submitRequest.call(this, {\n        Action: 'name/cos:CompleteMultipartUpload',\n        method: 'POST',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        qs: {\n            uploadId: UploadId\n        },\n        body: xml,\n        headers: headers,\n        tracker: tracker\n    }, function (err, data) {\n        if (err) return callback(err);\n        var url = getUrl({\n            ForcePathStyle: self.options.ForcePathStyle,\n            protocol: self.options.Protocol,\n            domain: self.options.Domain,\n            bucket: params.Bucket,\n            region: params.Region,\n            object: params.Key,\n            isLocation: true\n        });\n        var res = data.CompleteMultipartUploadResult || {};\n        if (res.ProcessResults) {\n            if (res && res.ProcessResults) {\n                res.UploadResult = {\n                    OriginalInfo: {\n                        Key: res.Key,\n                        Location: url,\n                        ETag: res.ETag,\n                        ImageInfo: res.ImageInfo\n                    },\n                    ProcessResults: res.ProcessResults\n                };\n                delete res.ImageInfo;\n                delete res.ProcessResults;\n            }\n        }\n        var result = util.extend(res, {\n            Location: url,\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\n/**\n * 分块上传任务列表查询\n * @param  {Object}  params                                 参数对象，必须\n *     @param  {String}  params.Bucket                      Bucket名称，必须\n *     @param  {String}  params.Region                      地域名称，必须\n *     @param  {String}  params.Delimiter                   定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，定义为Common Prefix，然后列出所有Common Prefix。如果没有Prefix，则从路径起点开始，非必须\n *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须\n *     @param  {String}  params.Prefix                      前缀匹配，用来规定返回的文件前缀地址，非必须\n *     @param  {String}  params.MaxUploads                  单次返回最大的条目数量，默认1000，非必须\n *     @param  {String}  params.KeyMarker                   与upload-id-marker一起使用 </Br>当upload-id-marker未被指定时，ObjectName字母顺序大于key-marker的条目将被列出 </Br>当upload-id-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须\n *     @param  {String}  params.UploadIdMarker              与key-marker一起使用 </Br>当key-marker未被指定时，upload-id-marker将被忽略 </Br>当key-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须\n * @param  {Function}  callback                             回调函数，必须\n * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                  返回的数据\n *     @return  {Object}  data.ListMultipartUploadsResult   分块上传任务信息\n */\nfunction multipartList(params, callback) {\n    var reqParams = {};\n\n    reqParams['delimiter'] = params['Delimiter'];\n    reqParams['encoding-type'] = params['EncodingType'];\n    reqParams['prefix'] = params['Prefix'] || '';\n\n    reqParams['max-uploads'] = params['MaxUploads'];\n\n    reqParams['key-marker'] = params['KeyMarker'];\n    reqParams['upload-id-marker'] = params['UploadIdMarker'];\n\n    reqParams = util.clearKey(reqParams);\n\n    var tracker = params.tracker;\n    tracker && tracker.setParams({ signStartTime: new Date().getTime() });\n\n    submitRequest.call(this, {\n        Action: 'name/cos:ListMultipartUploads',\n        ResourceKey: reqParams['prefix'],\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        headers: params.Headers,\n        qs: reqParams,\n        action: 'uploads',\n        tracker: tracker\n    }, function (err, data) {\n        if (err) return callback(err);\n\n        if (data && data.ListMultipartUploadsResult) {\n            var Upload = data.ListMultipartUploadsResult.Upload || [];\n            Upload = util.isArray(Upload) ? Upload : [Upload];\n            data.ListMultipartUploadsResult.Upload = Upload;\n        }\n        var result = util.clone(data.ListMultipartUploadsResult || {});\n        util.extend(result, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\n/**\n * 上传的分块列表查询\n * @param  {Object}  params                                 参数对象，必须\n *     @param  {String}  params.Bucket                      Bucket名称，必须\n *     @param  {String}  params.Region                      地域名称，必须\n *     @param  {String}  params.Key                         object名称，必须\n *     @param  {String}  params.UploadId                    标示本次分块上传的ID，必须\n *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须\n *     @param  {String}  params.MaxParts                    单次返回最大的条目数量，默认1000，非必须\n *     @param  {String}  params.PartNumberMarker            默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须\n * @param  {Function}  callback                             回调函数，必须\n * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n * @return  {Object}  data                                  返回的数据\n *     @return  {Object}  data.ListMultipartUploadsResult   分块信息\n */\nfunction multipartListPart(params, callback) {\n    var reqParams = {};\n\n    reqParams['uploadId'] = params['UploadId'];\n    reqParams['encoding-type'] = params['EncodingType'];\n    reqParams['max-parts'] = params['MaxParts'];\n    reqParams['part-number-marker'] = params['PartNumberMarker'];\n\n    submitRequest.call(this, {\n        Action: 'name/cos:ListParts',\n        method: 'GET',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        qs: reqParams\n    }, function (err, data) {\n        if (err) return callback(err);\n        var ListPartsResult = data.ListPartsResult || {};\n        var Part = ListPartsResult.Part || [];\n        Part = util.isArray(Part) ? Part : [Part];\n\n        ListPartsResult.Part = Part;\n        var result = util.clone(ListPartsResult);\n        util.extend(result, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n        callback(null, result);\n    });\n}\n\n/**\n * 抛弃分块上传\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n *     @param  {String}  params.Key         object名称，必须\n *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须\n * @param  {Function}  callback             回调函数，必须\n *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n *     @return  {Object}    data            返回的数据\n */\nfunction multipartAbort(params, callback) {\n    var reqParams = {};\n\n    reqParams['uploadId'] = params['UploadId'];\n    submitRequest.call(this, {\n        Action: 'name/cos:AbortMultipartUpload',\n        method: 'DELETE',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        headers: params.Headers,\n        qs: reqParams\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, {\n            statusCode: data.statusCode,\n            headers: data.headers\n        });\n    });\n}\n\n/**\n * 抛弃分块上传\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n *     @param  {String}  params.Key         object名称，必须\n *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须\n * @param  {Function}  callback             回调函数，必须\n *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n *     @return  {Object}    data            返回的数据\n */\nfunction request(params, callback) {\n    submitRequest.call(this, {\n        method: params.Method,\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Key: params.Key,\n        action: params.Action,\n        headers: params.Headers,\n        qs: params.Query,\n        body: params.Body,\n        Url: params.Url,\n        rawBody: params.RawBody,\n        DataType: params.DataType\n    }, function (err, data) {\n        if (err) return callback(err);\n        if (data && data.body) {\n            data.Body = data.body;\n            delete data.body;\n        }\n        callback(err, data);\n    });\n}\n\n/**\n * 追加上传\n * @param  {Object}  params                                         参数对象，必须\n *     @param  {String}  params.Bucket                              Bucket名称，必须\n *     @param  {String}  params.Region                              地域名称，必须\n *     @param  {String}  params.Key                                 object名称，必须\n *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串\n *     @param  {Number}  params.Position                            追加操作的起始点，单位为字节，必须\n *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须\n *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须\n *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须\n *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须\n *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须\n *     @param  {String}  params.GrantRead                           赋予被授权者读取对象的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantReadAcp                        赋予被授权者读取对象的访问控制列表（ACL）的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantWriteAcp                       赋予被授权者写入对象的访问控制列表（ACL）的权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.GrantFullControl                    赋予被授权者操作对象的所有权限，格式：id=\"[OwnerUin]\"，可使用半角逗号（,）分隔多组被授权者，非必须\n *     @param  {String}  params.StorageClass                        设置对象的存储级别，枚举值：STANDARD、STANDARD_IA、ARCHIVE，默认值：STANDARD，非必须\n *     @param  {String}  params.x-cos-meta-*                        允许用户自定义的头部信息，将作为对象的元数据保存。大小限制2KB，非必须\n *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须\n *     @param  {String}  params.ServerSideEncryption                支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: \"AES256\"，非必须\n * @param  {Function}  callback                                     回调函数，必须\n *     @return  {Object}    err                                     请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n *     @return  {Object}    data                                    返回的数据\n */\nfunction appendObject(params, callback) {\n    // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里\n    var headers = params.Headers;\n    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';\n    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';\n    submitRequest.call(this, {\n        Action: 'name/cos:AppendObject',\n        method: 'POST',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        action: 'append',\n        Key: params.Key,\n        body: params.Body,\n        qs: {\n            position: params.Position\n        },\n        headers: params.Headers\n    }, function (err, data) {\n        if (err) return callback(err);\n        callback(null, data);\n    });\n}\n\n/**\n * 获取签名\n * @param  {Object}  params             参数对象，必须\n *     @param  {String}  params.Method  请求方法，必须\n *     @param  {String}  params.Key     object名称，必须\n *     @param  {String}  params.Expires 名超时时间，单位秒，可选\n * @return  {String}  data              返回签名字符串\n */\nfunction getAuth(params) {\n    var self = this;\n    return util.getAuth({\n        SecretId: params.SecretId || this.options.SecretId || '',\n        SecretKey: params.SecretKey || this.options.SecretKey || '',\n        Bucket: params.Bucket,\n        Region: params.Region,\n        Method: params.Method,\n        Key: params.Key,\n        Query: params.Query,\n        Headers: params.Headers,\n        Expires: params.Expires,\n        UseRawKey: self.options.UseRawKey,\n        SystemClockOffset: self.options.SystemClockOffset\n    });\n}\n\n/**\n * 获取文件下载链接\n * @param  {Object}  params                 参数对象，必须\n *     @param  {String}  params.Bucket      Bucket名称，必须\n *     @param  {String}  params.Region      地域名称，必须\n *     @param  {String}  params.Key         object名称，必须\n *     @param  {String}  params.Method      请求的方法，可选\n *     @param  {String}  params.Expires     签名超时时间，单位秒，可选\n * @param  {Function}  callback             回调函数，必须\n *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730\n *     @return  {Object}    data            返回的数据\n */\nfunction getObjectUrl(params, callback) {\n    var self = this;\n    var url = getUrl({\n        ForcePathStyle: self.options.ForcePathStyle,\n        protocol: params.Protocol || self.options.Protocol,\n        domain: params.Domain || self.options.Domain,\n        bucket: params.Bucket,\n        region: params.Region,\n        object: params.Key\n    });\n\n    var queryParamsStr = '';\n    if (params.Query) {\n        queryParamsStr += util.obj2str(params.Query);\n    }\n    if (params.QueryString) {\n        queryParamsStr += (queryParamsStr ? '&' : '') + params.QueryString;\n    }\n\n    var syncUrl = url;\n    if (params.Sign !== undefined && !params.Sign) {\n        queryParamsStr && (syncUrl += '?' + queryParamsStr);\n        callback(null, { Url: syncUrl });\n        return syncUrl;\n    }\n\n    // 签名加上 Host，避免跨桶访问\n    var SignHost = getSignHost.call(this, { Bucket: params.Bucket, Region: params.Region, Url: url });\n    var AuthData = getAuthorizationAsync.call(this, {\n        Action: (params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject',\n        Bucket: params.Bucket || '',\n        Region: params.Region || '',\n        Method: params.Method || 'get',\n        Key: params.Key,\n        Expires: params.Expires,\n        Headers: params.Headers,\n        Query: params.Query,\n        SignHost: SignHost,\n        ForceSignHost: params.ForceSignHost === false ? false : self.options.ForceSignHost // getObjectUrl支持传参ForceSignHost\n    }, function (err, AuthData) {\n        if (!callback) return;\n        if (err) {\n            callback(err);\n            return;\n        }\n\n        // 兼容万象url qUrlParamList需要再encode一次\n        var replaceUrlParamList = function (url) {\n            var urlParams = url.match(/q-url-param-list.*?(?=&)/g)[0];\n            var encodedParams = 'q-url-param-list=' + encodeURIComponent(urlParams.replace(/q-url-param-list=/, '')).toLowerCase();\n            var reg = new RegExp(urlParams, 'g');\n            var replacedUrl = url.replace(reg, encodedParams);\n            return replacedUrl;\n        };\n\n        var signUrl = url;\n        signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ? replaceUrlParamList(AuthData.Authorization) : 'sign=' + encodeURIComponent(AuthData.Authorization));\n        AuthData.SecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.SecurityToken);\n        AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);\n        AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);\n        AuthData.Token && (signUrl += '&token=' + AuthData.Token);\n        queryParamsStr && (signUrl += '&' + queryParamsStr);\n        setTimeout(function () {\n            callback(null, { Url: signUrl });\n        });\n    });\n    if (AuthData) {\n        syncUrl += '?' + AuthData.Authorization + (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');\n        queryParamsStr && (syncUrl += '&' + queryParamsStr);\n    } else {\n        queryParamsStr && (syncUrl += '?' + queryParamsStr);\n    }\n    return syncUrl;\n}\n\n/**\n * 私有方法\n */\nfunction decodeAcl(AccessControlPolicy) {\n    var result = {\n        GrantFullControl: [],\n        GrantWrite: [],\n        GrantRead: [],\n        GrantReadAcp: [],\n        GrantWriteAcp: [],\n        ACL: ''\n    };\n    var GrantMap = {\n        'FULL_CONTROL': 'GrantFullControl',\n        'WRITE': 'GrantWrite',\n        'READ': 'GrantRead',\n        'READ_ACP': 'GrantReadAcp',\n        'WRITE_ACP': 'GrantWriteAcp'\n    };\n    var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};\n    var Grant = AccessControlList.Grant;\n    if (Grant) {\n        Grant = util.isArray(Grant) ? Grant : [Grant];\n    }\n    var PublicAcl = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };\n    Grant && Grant.length && util.each(Grant, function (item) {\n        if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || item.Grantee.URI === 'http://cam.qcloud.com/groups/global/AllUsers') {\n            PublicAcl[item.Permission] = 1;\n        } else if (item.Grantee.ID !== AccessControlPolicy.Owner.ID) {\n            result[GrantMap[item.Permission]].push('id=\"' + item.Grantee.ID + '\"');\n        }\n    });\n    if (PublicAcl.FULL_CONTROL || PublicAcl.WRITE && PublicAcl.READ) {\n        result.ACL = 'public-read-write';\n    } else if (PublicAcl.READ) {\n        result.ACL = 'public-read';\n    } else {\n        result.ACL = 'private';\n    }\n    util.each(GrantMap, function (item) {\n        result[item] = uniqGrant(result[item].join(','));\n    });\n    return result;\n}\n\n// Grant 去重\nfunction uniqGrant(str) {\n    var arr = str.split(',');\n    var exist = {};\n    var i, item;\n    for (i = 0; i < arr.length;) {\n        item = arr[i].trim();\n        if (exist[item]) {\n            arr.splice(i, 1);\n        } else {\n            exist[item] = true;\n            arr[i] = item;\n            i++;\n        }\n    }\n    return arr.join(',');\n}\n\n// 生成操作 url\nfunction getUrl(params) {\n    var region = params.region || '';\n    var longBucket = params.bucket || '';\n    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));\n    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);\n    var domain = params.domain;\n    var object = params.object;\n    if (typeof domain === 'function') {\n        domain = domain({ Bucket: longBucket, Region: region });\n    }\n    var protocol = params.protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');\n    if (!domain) {\n        if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {\n            domain = '{Region}.myqcloud.com';\n        } else {\n            domain = 'cos.{Region}.myqcloud.com';\n        }\n        if (!params.ForcePathStyle) {\n            domain = '{Bucket}.' + domain;\n        }\n    }\n    domain = domain.replace(/\\{\\{AppId\\}\\}/ig, appId).replace(/\\{\\{Bucket\\}\\}/ig, shortBucket).replace(/\\{\\{Region\\}\\}/ig, region).replace(/\\{\\{.*?\\}\\}/ig, '');\n    domain = domain.replace(/\\{AppId\\}/ig, appId).replace(/\\{BucketName\\}/ig, shortBucket).replace(/\\{Bucket\\}/ig, longBucket).replace(/\\{Region\\}/ig, region).replace(/\\{.*?\\}/ig, '');\n    if (!/^[a-zA-Z]+:\\/\\//.test(domain)) {\n        domain = protocol + '//' + domain;\n    }\n\n    // 去掉域名最后的斜杆\n    if (domain.slice(-1) === '/') {\n        domain = domain.slice(0, -1);\n    }\n    var url = domain;\n\n    if (params.ForcePathStyle) {\n        url += '/' + longBucket;\n    }\n    url += '/';\n    if (object) {\n        url += util.camSafeUrlEncode(object).replace(/%2F/g, '/');\n    }\n\n    if (params.isLocation) {\n        url = url.replace(/^https?:\\/\\//, '');\n    }\n    return url;\n}\n\nvar getSignHost = function (opt) {\n    if (!opt.Bucket || !opt.Region) return '';\n    var url = opt.Url || getUrl({\n        ForcePathStyle: this.options.ForcePathStyle,\n        protocol: this.options.Protocol,\n        domain: this.options.Domain,\n        bucket: opt.Bucket,\n        region: this.options.UseAccelerate ? 'accelerate' : opt.Region\n    });\n    var urlHost = url.replace(/^https?:\\/\\/([^/]+)(\\/.*)?$/, '$1');\n    var standardHostReg = new RegExp('^([a-z\\\\d-]+-\\\\d+\\\\.)?(cos|cosv6|ci|pic)\\\\.([a-z\\\\d-]+)\\\\.myqcloud\\\\.com$');\n    if (standardHostReg.test(urlHost)) return urlHost;\n    return '';\n};\n\n// 异步获取签名\nfunction getAuthorizationAsync(params, callback) {\n    var headers = util.clone(params.Headers);\n    var headerHost = '';\n    util.each(headers, function (v, k) {\n        (v === '' || ['content-type', 'cache-control', 'expires'].indexOf(k.toLowerCase()) > -1) && delete headers[k];\n        if (k.toLowerCase() === 'host') headerHost = v;\n    });\n    // ForceSignHost明确传入false才不加入host签名\n    var forceSignHost = params.ForceSignHost === false ? false : true;\n\n    // Host 加入签名计算\n    if (!headerHost && params.SignHost && forceSignHost) headers.Host = params.SignHost;\n\n    // 获取凭证的回调，避免用户 callback 多次\n    var cbDone = false;\n    var cb = function (err, AuthData) {\n        if (cbDone) return;\n        cbDone = true;\n        if (AuthData && AuthData.XCosSecurityToken && !AuthData.SecurityToken) {\n            AuthData = util.clone(AuthData);\n            AuthData.SecurityToken = AuthData.XCosSecurityToken;\n            delete AuthData.XCosSecurityToken;\n        }\n        callback && callback(err, AuthData);\n    };\n\n    var self = this;\n    var Bucket = params.Bucket || '';\n    var Region = params.Region || '';\n\n    // PathName\n    var KeyName = params.Key || '';\n    if (self.options.ForcePathStyle && Bucket) {\n        KeyName = Bucket + '/' + KeyName;\n    }\n    var Pathname = '/' + KeyName;\n\n    // Action、ResourceKey\n    var StsData = {};\n    var Scope = params.Scope;\n    if (!Scope) {\n        var Action = params.Action || '';\n        var ResourceKey = params.ResourceKey || params.Key || '';\n        Scope = params.Scope || [{\n            action: Action,\n            bucket: Bucket,\n            region: Region,\n            prefix: ResourceKey\n        }];\n    }\n    var ScopeKey = util.md5(JSON.stringify(Scope));\n\n    // STS\n    self._StsCache = self._StsCache || [];\n    (function () {\n        var i, AuthData;\n        for (i = self._StsCache.length - 1; i >= 0; i--) {\n            AuthData = self._StsCache[i];\n            var compareTime = Math.round(util.getSkewTime(self.options.SystemClockOffset) / 1000) + 30;\n            if (AuthData.StartTime && compareTime < AuthData.StartTime || compareTime >= AuthData.ExpiredTime) {\n                self._StsCache.splice(i, 1);\n                continue;\n            }\n            if (!AuthData.ScopeLimit || AuthData.ScopeLimit && AuthData.ScopeKey === ScopeKey) {\n                StsData = AuthData;\n                break;\n            }\n        }\n    })();\n\n    var calcAuthByTmpKey = function () {\n        var KeyTime = StsData.StartTime && StsData.ExpiredTime ? StsData.StartTime + ';' + StsData.ExpiredTime : '';\n        var Authorization = util.getAuth({\n            SecretId: StsData.TmpSecretId,\n            SecretKey: StsData.TmpSecretKey,\n            Method: params.Method,\n            Pathname: Pathname,\n            Query: params.Query,\n            Headers: headers,\n            Expires: params.Expires,\n            UseRawKey: self.options.UseRawKey,\n            SystemClockOffset: self.options.SystemClockOffset,\n            KeyTime: KeyTime,\n            ForceSignHost: self.options.ForceSignHost\n        });\n        var AuthData = {\n            Authorization: Authorization,\n            SecurityToken: StsData.SecurityToken || StsData.XCosSecurityToken || '',\n            Token: StsData.Token || '',\n            ClientIP: StsData.ClientIP || '',\n            ClientUA: StsData.ClientUA || ''\n        };\n        cb(null, AuthData);\n    };\n    var checkAuthError = function (AuthData) {\n        if (AuthData.Authorization) {\n            // 检查签名格式\n            var formatAllow = false;\n            var auth = AuthData.Authorization;\n            if (auth) {\n                if (auth.indexOf(' ') > -1) {\n                    formatAllow = false;\n                } else if (auth.indexOf('q-sign-algorithm=') > -1 && auth.indexOf('q-ak=') > -1 && auth.indexOf('q-sign-time=') > -1 && auth.indexOf('q-key-time=') > -1 && auth.indexOf('q-url-param-list=') > -1) {\n                    formatAllow = true;\n                } else {\n                    try {\n                        auth = atob(auth);\n                        if (auth.indexOf('a=') > -1 && auth.indexOf('k=') > -1 && auth.indexOf('t=') > -1 && auth.indexOf('r=') > -1 && auth.indexOf('b=') > -1) {\n                            formatAllow = true;\n                        }\n                    } catch (e) {}\n                }\n            }\n            if (!formatAllow) return util.error(new Error('getAuthorization callback params format error'));\n        } else {\n            if (!AuthData.TmpSecretId) return util.error(new Error('getAuthorization callback params missing \"TmpSecretId\"'));\n            if (!AuthData.TmpSecretKey) return util.error(new Error('getAuthorization callback params missing \"TmpSecretKey\"'));\n            if (!AuthData.SecurityToken && !AuthData.XCosSecurityToken) return util.error(new Error('getAuthorization callback params missing \"SecurityToken\"'));\n            if (!AuthData.ExpiredTime) return util.error(new Error('getAuthorization callback params missing \"ExpiredTime\"'));\n            if (AuthData.ExpiredTime && AuthData.ExpiredTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params \"ExpiredTime\" should be 10 digits'));\n            if (AuthData.StartTime && AuthData.StartTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params \"StartTime\" should be 10 StartTime'));\n        }\n        return false;\n    };\n\n    // 先判断是否有临时密钥\n    if (StsData.ExpiredTime && StsData.ExpiredTime - util.getSkewTime(self.options.SystemClockOffset) / 1000 > 60) {\n        // 如果缓存的临时密钥有效，并还有超过60秒有效期就直接使用\n        calcAuthByTmpKey();\n    } else if (self.options.getAuthorization) {\n        // 外部计算签名或获取临时密钥\n        self.options.getAuthorization.call(self, {\n            Bucket: Bucket,\n            Region: Region,\n            Method: params.Method,\n            Key: KeyName,\n            Pathname: Pathname,\n            Query: params.Query,\n            Headers: headers,\n            Scope: Scope,\n            SystemClockOffset: self.options.SystemClockOffset,\n            ForceSignHost: self.options.ForceSignHost\n        }, function (AuthData) {\n            if (typeof AuthData === 'string') AuthData = { Authorization: AuthData };\n            var AuthError = checkAuthError(AuthData);\n            if (AuthError) return cb(AuthError);\n            if (AuthData.Authorization) {\n                cb(null, AuthData);\n            } else {\n                StsData = AuthData || {};\n                StsData.Scope = Scope;\n                StsData.ScopeKey = ScopeKey;\n                self._StsCache.push(StsData);\n                calcAuthByTmpKey();\n            }\n        });\n    } else if (self.options.getSTS) {\n        // 外部获取临时密钥\n        self.options.getSTS.call(self, {\n            Bucket: Bucket,\n            Region: Region\n        }, function (data) {\n            StsData = data || {};\n            StsData.Scope = Scope;\n            StsData.ScopeKey = ScopeKey;\n            if (!StsData.TmpSecretId) StsData.TmpSecretId = StsData.SecretId;\n            if (!StsData.TmpSecretKey) StsData.TmpSecretKey = StsData.SecretKey;\n            var AuthError = checkAuthError(StsData);\n            if (AuthError) return cb(AuthError);\n            self._StsCache.push(StsData);\n            calcAuthByTmpKey();\n        });\n    } else {\n        // 内部计算获取签名\n        return function () {\n            var Authorization = util.getAuth({\n                SecretId: params.SecretId || self.options.SecretId,\n                SecretKey: params.SecretKey || self.options.SecretKey,\n                Method: params.Method,\n                Pathname: Pathname,\n                Query: params.Query,\n                Headers: headers,\n                Expires: params.Expires,\n                UseRawKey: self.options.UseRawKey,\n                SystemClockOffset: self.options.SystemClockOffset,\n                ForceSignHost: self.options.ForceSignHost\n            });\n            var AuthData = {\n                Authorization: Authorization,\n                SecurityToken: self.options.SecurityToken || self.options.XCosSecurityToken\n            };\n            cb(null, AuthData);\n            return AuthData;\n        }();\n    }\n    return '';\n}\n\n// 调整时间偏差\nfunction allowRetry(err) {\n    var allowRetry = false;\n    var isTimeError = false;\n    var serverDate = err.headers && (err.headers.date || err.headers.Date) || err.error && err.error.ServerTime;\n    try {\n        var errorCode = err.error.Code;\n        var errorMessage = err.error.Message;\n        if (errorCode === 'RequestTimeTooSkewed' || errorCode === 'AccessDenied' && errorMessage === 'Request has expired') {\n            isTimeError = true;\n        }\n    } catch (e) {}\n    if (err) {\n        if (isTimeError && serverDate) {\n            var serverTime = Date.parse(serverDate);\n            if (this.options.CorrectClockSkew && Math.abs(util.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {\n                console.error('error: Local time is too skewed.');\n                this.options.SystemClockOffset = serverTime - Date.now();\n                allowRetry = true;\n            }\n        } else if (Math.floor(err.statusCode / 100) === 5) {\n            allowRetry = true;\n        }\n    }\n    return allowRetry;\n}\n\n// 获取签名并发起请求\nfunction submitRequest(params, callback) {\n    var self = this;\n\n    // 处理 headers\n    !params.headers && (params.headers = {});\n\n    // 处理 query\n    !params.qs && (params.qs = {});\n    params.VersionId && (params.qs.versionId = params.VersionId);\n    params.qs = util.clearKey(params.qs);\n\n    // 清理 undefined 和 null 字段\n    params.headers && (params.headers = util.clearKey(params.headers));\n    params.qs && (params.qs = util.clearKey(params.qs));\n\n    var Query = util.clone(params.qs);\n    params.action && (Query[params.action] = '');\n\n    var paramsUrl = params.url || params.Url;\n    var SignHost = params.SignHost || getSignHost.call(this, { Bucket: params.Bucket, Region: params.Region, Url: paramsUrl });\n    var tracker = params.tracker;\n    var next = function (tryTimes) {\n        var oldClockOffset = self.options.SystemClockOffset;\n        tracker && tracker.setParams({ signStartTime: new Date().getTime(), retryTimes: tryTimes - 1 });\n        getAuthorizationAsync.call(self, {\n            Bucket: params.Bucket || '',\n            Region: params.Region || '',\n            Method: params.method,\n            Key: params.Key,\n            Query: Query,\n            Headers: params.headers,\n            SignHost: SignHost,\n            Action: params.Action,\n            ResourceKey: params.ResourceKey,\n            Scope: params.Scope,\n            ForceSignHost: self.options.ForceSignHost\n        }, function (err, AuthData) {\n            if (err) {\n                callback(err);\n                return;\n            }\n            tracker && tracker.setParams({ signEndTime: new Date().getTime(), httpStartTime: new Date().getTime() });\n            params.AuthData = AuthData;\n            _submitRequest.call(self, params, function (err, data) {\n                tracker && tracker.setParams({ httpEndTime: new Date().getTime() });\n                if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {\n                    if (params.headers) {\n                        delete params.headers.Authorization;\n                        delete params.headers['token'];\n                        delete params.headers['clientIP'];\n                        delete params.headers['clientUA'];\n                        params.headers['x-cos-security-token'] && delete params.headers['x-cos-security-token'];\n                        params.headers['x-ci-security-token'] && delete params.headers['x-ci-security-token'];\n                    }\n                    next(tryTimes + 1);\n                } else {\n                    callback(err, data);\n                }\n            });\n        });\n    };\n    next(1);\n}\n\n// 发起请求\nfunction _submitRequest(params, callback) {\n    var self = this;\n    var TaskId = params.TaskId;\n    if (TaskId && !self._isRunningTask(TaskId)) return;\n\n    var bucket = params.Bucket;\n    var region = params.Region;\n    var object = params.Key;\n    var method = params.method || 'GET';\n    var url = params.Url || params.url;\n    var body = params.body;\n    var rawBody = params.rawBody;\n\n    // url\n    if (self.options.UseAccelerate) {\n        region = 'accelerate';\n    }\n    url = url || getUrl({\n        ForcePathStyle: self.options.ForcePathStyle,\n        protocol: self.options.Protocol,\n        domain: self.options.Domain,\n        bucket: bucket,\n        region: region,\n        object: object\n    });\n    if (params.action) {\n        url = url + '?' + params.action;\n    }\n    if (params.qsStr) {\n        if (url.indexOf('?') > -1) {\n            url = url + '&' + params.qsStr;\n        } else {\n            url = url + '?' + params.qsStr;\n        }\n    }\n\n    var opt = {\n        method: method,\n        url: url,\n        headers: params.headers,\n        qs: params.qs,\n        body: body\n    };\n\n    // 兼容ci接口\n    var token = 'x-cos-security-token';\n    if (util.isCIHost(url)) {\n        token = 'x-ci-security-token';\n    }\n\n    // 获取签名\n    opt.headers.Authorization = params.AuthData.Authorization;\n    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);\n    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);\n    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);\n    params.AuthData.SecurityToken && (opt.headers[token] = params.AuthData.SecurityToken);\n\n    // 清理 undefined 和 null 字段\n    opt.headers && (opt.headers = util.clearKey(opt.headers));\n    opt = util.clearKey(opt);\n\n    // progress\n    if (params.onProgress && typeof params.onProgress === 'function') {\n        var contentLength = body && (body.size || body.length) || 0;\n        opt.onProgress = function (e) {\n            if (TaskId && !self._isRunningTask(TaskId)) return;\n            var loaded = e ? e.loaded : 0;\n            params.onProgress({ loaded: loaded, total: contentLength });\n        };\n    }\n    if (params.onDownloadProgress) {\n        opt.onDownloadProgress = params.onDownloadProgress;\n    }\n    if (params.DataType) {\n        opt.dataType = params.DataType;\n    }\n    if (this.options.Timeout) {\n        opt.timeout = this.options.Timeout;\n    }\n\n    self.options.ForcePathStyle && (opt.pathStyle = self.options.ForcePathStyle);\n    self.emit('before-send', opt);\n    params.tracker && params.tracker.setParams({ reqUrl: opt.url });\n    var sender = (self.options.Request || REQUEST)(opt, function (r) {\n        if (r.error === 'abort') return;\n\n        var receive = {\n            options: opt,\n            error: err,\n            statusCode: response && response.statusCode || 0,\n            headers: response && response.headers || {},\n            body: body\n        };\n        self.emit('after-receive', receive);\n        err = receive.error;\n        body = receive.body;\n        response = {\n            statusCode: receive.statusCode,\n            headers: receive.headers\n        };\n\n        // 抛出事件，允许修改返回值的 error、statusCode、statusMessage、body\n        self.emit('after-receive', r);\n        var response = { statusCode: r.statusCode, statusMessage: r.statusMessage, headers: r.headers };\n        var err = r.error;\n        var body = r.body;\n\n        // 返回内容添加 状态码 和 headers\n        var hasReturned;\n        var cb = function (err, data) {\n            TaskId && self.off('inner-kill-task', killTask);\n            if (hasReturned) return;\n            hasReturned = true;\n            var attrs = {};\n            response && response.statusCode && (attrs.statusCode = response.statusCode);\n            response && response.headers && (attrs.headers = response.headers);\n\n            if (err) {\n                err = util.extend(err || {}, attrs);\n                callback(err, null);\n            } else {\n                data = util.extend(data || {}, attrs);\n                callback(null, data);\n            }\n            sender = null;\n        };\n\n        // 请求错误，发生网络错误\n        if (err) return cb(util.error(err));\n\n        // 请求返回码不为 200\n        var statusCode = response.statusCode;\n        var statusSuccess = Math.floor(statusCode / 100) === 2; // 200 202 204 206\n\n        // 不对 body 进行转换，body 直接挂载返回\n        if (rawBody && statusSuccess) return cb(null, { body: body });\n\n        // 解析 xml body\n        var json;\n        try {\n            json = body && body.indexOf('<') > -1 && body.indexOf('>') > -1 && util.xml2json(body) || {};\n        } catch (e) {\n            json = {};\n        }\n\n        // 处理返回值\n        var xmlError = json && json.Error;\n        if (statusSuccess) {\n            // 正确返回，状态码 2xx 时，body 不会有 Error\n            cb(null, json);\n        } else if (xmlError) {\n            // 正常返回了 xml body，且有 Error 节点\n            cb(util.error(new Error(xmlError.Message), { code: xmlError.Code, error: xmlError }));\n        } else if (statusCode) {\n            // 有错误的状态码\n            cb(util.error(new Error(response.statusMessage), { code: '' + statusCode }));\n        } else if (statusCode) {\n            // 无状态码，或者获取不到状态码\n            cb(util.error(new Error('statusCode error')));\n        }\n    });\n\n    // kill task\n    var killTask = function (data) {\n        if (data.TaskId === TaskId) {\n            sender && sender.abort && sender.abort();\n            self.off('inner-kill-task', killTask);\n        }\n    };\n    TaskId && self.on('inner-kill-task', killTask);\n}\n\nvar API_MAP = {\n    // Bucket 相关方法\n    getService: getService, // Bucket\n    putBucket: putBucket,\n    headBucket: headBucket, // Bucket\n    getBucket: getBucket,\n    deleteBucket: deleteBucket,\n    putBucketAcl: putBucketAcl, // BucketACL\n    getBucketAcl: getBucketAcl,\n    putBucketCors: putBucketCors, // BucketCors\n    getBucketCors: getBucketCors,\n    deleteBucketCors: deleteBucketCors,\n    getBucketLocation: getBucketLocation, // BucketLocation\n    getBucketPolicy: getBucketPolicy, // BucketPolicy\n    putBucketPolicy: putBucketPolicy,\n    deleteBucketPolicy: deleteBucketPolicy,\n    putBucketTagging: putBucketTagging, // BucketTagging\n    getBucketTagging: getBucketTagging,\n    deleteBucketTagging: deleteBucketTagging,\n    putBucketLifecycle: putBucketLifecycle, // BucketLifecycle\n    getBucketLifecycle: getBucketLifecycle,\n    deleteBucketLifecycle: deleteBucketLifecycle,\n    putBucketVersioning: putBucketVersioning, // BucketVersioning\n    getBucketVersioning: getBucketVersioning,\n    putBucketReplication: putBucketReplication, // BucketReplication\n    getBucketReplication: getBucketReplication,\n    deleteBucketReplication: deleteBucketReplication,\n    putBucketWebsite: putBucketWebsite, // BucketWebsite\n    getBucketWebsite: getBucketWebsite,\n    deleteBucketWebsite: deleteBucketWebsite,\n    putBucketReferer: putBucketReferer, // BucketReferer\n    getBucketReferer: getBucketReferer,\n    putBucketDomain: putBucketDomain, // BucketDomain\n    getBucketDomain: getBucketDomain,\n    deleteBucketDomain: deleteBucketDomain,\n    putBucketOrigin: putBucketOrigin, // BucketOrigin\n    getBucketOrigin: getBucketOrigin,\n    deleteBucketOrigin: deleteBucketOrigin,\n    putBucketLogging: putBucketLogging, // BucketLogging\n    getBucketLogging: getBucketLogging,\n    putBucketInventory: putBucketInventory, // BucketInventory\n    getBucketInventory: getBucketInventory,\n    listBucketInventory: listBucketInventory,\n    deleteBucketInventory: deleteBucketInventory,\n    putBucketAccelerate: putBucketAccelerate,\n    getBucketAccelerate: getBucketAccelerate,\n    putBucketEncryption: putBucketEncryption,\n    getBucketEncryption: getBucketEncryption,\n    deleteBucketEncryption: deleteBucketEncryption,\n\n    // Object 相关方法\n    getObject: getObject,\n    headObject: headObject,\n    listObjectVersions: listObjectVersions,\n    putObject: putObject,\n    deleteObject: deleteObject,\n    getObjectAcl: getObjectAcl,\n    putObjectAcl: putObjectAcl,\n    optionsObject: optionsObject,\n    putObjectCopy: putObjectCopy,\n    deleteMultipleObject: deleteMultipleObject,\n    restoreObject: restoreObject,\n    putObjectTagging: putObjectTagging,\n    getObjectTagging: getObjectTagging,\n    deleteObjectTagging: deleteObjectTagging,\n    selectObjectContent: selectObjectContent,\n    appendObject: appendObject,\n\n    // 分块上传相关方法\n    uploadPartCopy: uploadPartCopy,\n    multipartInit: multipartInit,\n    multipartUpload: multipartUpload,\n    multipartComplete: multipartComplete,\n    multipartList: multipartList,\n    multipartListPart: multipartListPart,\n    multipartAbort: multipartAbort,\n\n    // 工具方法\n    request: request,\n    getObjectUrl: getObjectUrl,\n    getAuth: getAuth\n};\n\nfunction warnOldApi(apiName, fn, proto) {\n    util.each(['Cors', 'Acl'], function (suffix) {\n        if (apiName.slice(-suffix.length) === suffix) {\n            var oldName = apiName.slice(0, -suffix.length) + suffix.toUpperCase();\n            var apiFn = util.apiWrapper(apiName, fn);\n            var warned = false;\n            proto[oldName] = function () {\n                !warned && console.warn('warning: cos.' + oldName + ' has been deprecated. Please Use cos.' + apiName + ' instead.');\n                warned = true;\n                apiFn.apply(this, arguments);\n            };\n        }\n    });\n}\n\nmodule.exports.init = function (COS, task) {\n    task.transferToTaskMethod(API_MAP, 'putObject');\n    util.each(API_MAP, function (fn, apiName) {\n        COS.prototype[apiName] = util.apiWrapper(apiName, fn);\n        warnOldApi(apiName, fn, COS.prototype);\n    });\n};\n\n//# sourceURL=webpack://COS/./src/base.js?");

/***/ }),

/***/ "./src/cos.js":
/*!********************!*\
  !*** ./src/cos.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
<<<<<<< HEAD


var util = __webpack_require__(0);
<<<<<<< HEAD
var event = __webpack_require__(4);
<<<<<<< HEAD
var task = __webpack_require__(18);
var base = __webpack_require__(19);
var advance = __webpack_require__(21);
=======
var task = __webpack_require__(15);
var base = __webpack_require__(16);
var advance = __webpack_require__(18);
>>>>>>> upd
=======
var event = __webpack_require__(5);
var task = __webpack_require__(17);
var base = __webpack_require__(18);
var advance = __webpack_require__(20);
>>>>>>> upd 暂存

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
    UploadIdCacheLimit: 50,
    UseAccelerate: false,
    ForceSignHost: true, // 默认将host加入签名计算，关闭后可能导致越权风险，建议保持为true
    deepTracker: true
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
    if (this.options.SecretId && this.options.SecretId.indexOf(' ') > -1) {
        console.error('error: SecretId格式错误，请检查');
        console.error('error: SecretId format is incorrect. Please check');
    }
    if (this.options.SecretKey && this.options.SecretKey.indexOf(' ') > -1) {
        console.error('error: SecretKey格式错误，请检查');
        console.error('error: SecretKey format is incorrect. Please check');
    }
    if (util.isNode()) {
        console.warn('warning: cos-js-sdk-v5 不支持 nodejs 环境使用，请改用 cos-nodejs-sdk-v5，参考文档： https://cloud.tencent.com/document/product/436/8629');
        console.warn('warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629');
    }
    event.init(this);
    task.init(this);
};

base.init(COS, task);
advance.init(COS, task);

COS.util = {
    md5: util.md5,
    xml2json: util.xml2json,
    json2xml: util.json2xml
};
COS.getAuthorization = util.getAuth;
COS.version = '1.3.10';

module.exports = COS;
=======
eval("\n\nvar util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nvar event = __webpack_require__(/*! ./event */ \"./src/event.js\");\nvar task = __webpack_require__(/*! ./task */ \"./src/task.js\");\nvar base = __webpack_require__(/*! ./base */ \"./src/base.js\");\nvar advance = __webpack_require__(/*! ./advance */ \"./src/advance.js\");\n\nvar defaultOptions = {\n    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000\n    SecretId: '',\n    SecretKey: '',\n    SecurityToken: '', // 使用临时密钥需要注意自行刷新 Token\n    ChunkRetryTimes: 2,\n    FileParallelLimit: 3,\n    ChunkParallelLimit: 3,\n    ChunkSize: 1024 * 1024,\n    SliceSize: 1024 * 1024,\n    CopyChunkParallelLimit: 20,\n    CopyChunkSize: 1024 * 1024 * 10,\n    CopySliceSize: 1024 * 1024 * 10,\n    MaxPartNumber: 10000,\n    ProgressInterval: 1000,\n    Domain: '',\n    ServiceDomain: '',\n    Protocol: '',\n    CompatibilityMode: false,\n    ForcePathStyle: false,\n    UseRawKey: false,\n    Timeout: 0, // 单位毫秒，0 代表不设置超时时间\n    CorrectClockSkew: true,\n    SystemClockOffset: 0, // 单位毫秒，ms\n    UploadCheckContentMd5: false,\n    UploadQueueSize: 10000,\n    UploadAddMetaMd5: false,\n    UploadIdCacheLimit: 50,\n    UseAccelerate: false,\n    ForceSignHost: true, // 默认将host加入签名计算，关闭后可能导致越权风险，建议保持为true\n    DeepTracker: true\n};\n\n// 对外暴露的类\nvar COS = function (options) {\n    this.options = util.extend(util.clone(defaultOptions), options || {});\n    this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);\n    this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);\n    this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);\n    this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);\n    this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);\n    this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);\n    this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);\n    this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));\n    this.options.Timeout = Math.max(0, this.options.Timeout);\n    if (this.options.AppId) {\n        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: \"test-1250000000\").');\n    }\n    if (this.options.SecretId && this.options.SecretId.indexOf(' ') > -1) {\n        console.error('error: SecretId格式错误，请检查');\n        console.error('error: SecretId format is incorrect. Please check');\n    }\n    if (this.options.SecretKey && this.options.SecretKey.indexOf(' ') > -1) {\n        console.error('error: SecretKey格式错误，请检查');\n        console.error('error: SecretKey format is incorrect. Please check');\n    }\n    if (util.isNode()) {\n        console.warn('warning: cos-js-sdk-v5 不支持 nodejs 环境使用，请改用 cos-nodejs-sdk-v5，参考文档： https://cloud.tencent.com/document/product/436/8629');\n        console.warn('warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629');\n    }\n    event.init(this);\n    task.init(this);\n};\n\nbase.init(COS, task);\nadvance.init(COS, task);\n\nCOS.util = {\n    md5: util.md5,\n    xml2json: util.xml2json,\n    json2xml: util.json2xml\n};\nCOS.getAuthorization = util.getAuth;\nCOS.version = '0.0.1';\n\nmodule.exports = COS;\n\n//# sourceURL=webpack://COS/./src/cos.js?");
>>>>>>> upd：webpack升级

/***/ }),

<<<<<<< HEAD
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
<<<<<<< HEAD
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(9)))

/***/ }),
/* 10 */
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

=======
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))
>>>>>>> upd

/***/ }),
<<<<<<< HEAD
/* 10 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
=======
>>>>>>> upd 暂存
/* 11 */
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
=======
/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var initEvent = function (cos) {\n    var listeners = {};\n    var getList = function (action) {\n        !listeners[action] && (listeners[action] = []);\n        return listeners[action];\n    };\n    cos.on = function (action, callback) {\n        if (action === 'task-list-update') {\n            console.warn('warning: Event \"' + action + '\" has been deprecated. Please use \"list-update\" instead.');\n        }\n        getList(action).push(callback);\n    };\n    cos.off = function (action, callback) {\n        var list = getList(action);\n        for (var i = list.length - 1; i >= 0; i--) {\n            callback === list[i] && list.splice(i, 1);\n        }\n    };\n    cos.emit = function (action, data) {\n        var list = getList(action).map(function (cb) {\n            return cb;\n        });\n        for (var i = 0; i < list.length; i++) {\n            list[i](data);\n        }\n    };\n};\n\nvar EventProxy = function () {\n    initEvent(this);\n};\n\nmodule.exports.init = initEvent;\nmodule.exports.EventProxy = EventProxy;\n\n//# sourceURL=webpack://COS/./src/event.js?");

/***/ }),
>>>>>>> upd：webpack升级

/***/ "./src/session.js":
/*!************************!*\
  !*** ./src/session.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n// 按照文件特征值，缓存 UploadId\nvar cacheKey = 'cos_sdk_upload_cache';\nvar expires = 30 * 24 * 3600;\nvar cache;\nvar timer;\n\nvar getCache = function () {\n    try {\n        var val = JSON.parse(localStorage.getItem(cacheKey));\n    } catch (e) {}\n    if (!val) val = [];\n    cache = val;\n};\nvar setCache = function () {\n    try {\n        localStorage.setItem(cacheKey, JSON.stringify(cache));\n    } catch (e) {}\n};\n\nvar init = function () {\n    if (cache) return;\n    getCache.call(this);\n    // 清理太老旧的数据\n    var changed = false;\n    var now = Math.round(Date.now() / 1000);\n    for (var i = cache.length - 1; i >= 0; i--) {\n        var mtime = cache[i][2];\n        if (!mtime || mtime + expires < now) {\n            cache.splice(i, 1);\n            changed = true;\n        }\n    }\n    changed && setCache();\n};\n\n// 把缓存存到本地\nvar save = function () {\n    if (timer) return;\n    timer = setTimeout(function () {\n        setCache();\n        timer = null;\n    }, 400);\n};\n\nvar mod = {\n    using: {},\n    // 标记 UploadId 正在使用\n    setUsing: function (uuid) {\n        mod.using[uuid] = true;\n    },\n    // 标记 UploadId 已经没在使用\n    removeUsing: function (uuid) {\n        delete mod.using[uuid];\n    },\n    // 用上传参数生成哈希值\n    getFileId: function (file, ChunkSize, Bucket, Key) {\n        if (file.name && file.size && file.lastModifiedDate && ChunkSize) {\n            return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));\n        } else {\n            return null;\n        }\n    },\n    // 获取文件对应的 UploadId 列表\n    getUploadIdList: function (uuid) {\n        if (!uuid) return null;\n        init.call(this);\n        var list = [];\n        for (var i = 0; i < cache.length; i++) {\n            if (cache[i][0] === uuid) list.push(cache[i][1]);\n        }\n        return list.length ? list : null;\n    },\n    // 缓存 UploadId\n    saveUploadId: function (uuid, UploadId, limit) {\n        init.call(this);\n        if (!uuid) return;\n        // 清理没用的 UploadId，js 文件没有 FilePath ，只清理相同记录\n        for (var i = cache.length - 1; i >= 0; i--) {\n            var item = cache[i];\n            if (item[0] === uuid && item[1] === UploadId) {\n                cache.splice(i, 1);\n            }\n        }\n        cache.unshift([uuid, UploadId, Math.round(Date.now() / 1000)]);\n        if (cache.length > limit) cache.splice(limit);\n        save();\n    },\n    // UploadId 已用完，移除掉\n    removeUploadId: function (UploadId) {\n        init.call(this);\n        delete mod.using[UploadId];\n        for (var i = cache.length - 1; i >= 0; i--) {\n            if (cache[i][1] === UploadId) cache.splice(i, 1);\n        }\n        save();\n    }\n};\n\nmodule.exports = mod;\n\n//# sourceURL=webpack://COS/./src/session.js?");

/***/ }),

<<<<<<< HEAD
var dom = __webpack_require__(3)
exports.DOMImplementation = dom.DOMImplementation
exports.XMLSerializer = dom.XMLSerializer
exports.DOMParser = __webpack_require__(14).DOMParser
=======
/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
>>>>>>> upd：webpack升级

eval("var session = __webpack_require__(/*! ./session */ \"./src/session.js\");\nvar util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nvar originApiMap = {};\nvar transferToTaskMethod = function (apiMap, apiName) {\n    originApiMap[apiName] = apiMap[apiName];\n    apiMap[apiName] = function (params, callback) {\n        if (params.SkipTask) {\n            originApiMap[apiName].call(this, params, callback);\n        } else {\n            this._addTask(apiName, params, callback);\n        }\n    };\n};\n\nvar initTask = function (cos) {\n\n    var queue = [];\n    var tasks = {};\n    var uploadingFileCount = 0;\n    var nextUploadIndex = 0;\n\n    // 接口返回简略的任务信息\n    var formatTask = function (task) {\n        var t = {\n            id: task.id,\n            Bucket: task.Bucket,\n            Region: task.Region,\n            Key: task.Key,\n            FilePath: task.FilePath,\n            state: task.state,\n            loaded: task.loaded,\n            size: task.size,\n            speed: task.speed,\n            percent: task.percent,\n            hashPercent: task.hashPercent,\n            error: task.error\n        };\n        if (task.FilePath) t.FilePath = task.FilePath;\n        if (task._custom) t._custom = task._custom; // 控制台使用\n        return t;\n    };\n\n    var emitListUpdate = function () {\n        var timer;\n        var emit = function () {\n            timer = 0;\n            cos.emit('task-list-update', { list: util.map(queue, formatTask) });\n            cos.emit('list-update', { list: util.map(queue, formatTask) });\n        };\n        return function () {\n            if (!timer) timer = setTimeout(emit);\n        };\n    }();\n\n    var clearQueue = function () {\n        if (queue.length <= cos.options.UploadQueueSize) return;\n        for (var i = 0; i < nextUploadIndex && // 小于当前操作的 index 才清理\n        i < queue.length && // 大于队列才清理\n        queue.length > cos.options.UploadQueueSize // 如果还太多，才继续清理\n        ;) {\n            var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';\n            if (!queue[i] || !isActive) {\n                tasks[queue[i].id] && delete tasks[queue[i].id];\n                queue.splice(i, 1);\n                nextUploadIndex--;\n            } else {\n                i++;\n            }\n        }\n        emitListUpdate();\n    };\n\n    var startNextTask = function () {\n        // 检查是否允许增加执行进程\n        if (uploadingFileCount >= cos.options.FileParallelLimit) return;\n        // 跳过不可执行的任务\n        while (queue[nextUploadIndex] && queue[nextUploadIndex].state !== 'waiting') nextUploadIndex++;\n        // 检查是否已遍历结束\n        if (nextUploadIndex >= queue.length) return;\n        // 上传该遍历到的任务\n        var task = queue[nextUploadIndex];\n        nextUploadIndex++;\n        uploadingFileCount++;\n        task.state = 'checking';\n        task.params.onTaskStart && task.params.onTaskStart(formatTask(task));\n        !task.params.UploadData && (task.params.UploadData = {});\n        var apiParams = util.formatParams(task.api, task.params);\n        originApiMap[task.api].call(cos, apiParams, function (err, data) {\n            if (!cos._isRunningTask(task.id)) return;\n            if (task.state === 'checking' || task.state === 'uploading') {\n                task.state = err ? 'error' : 'success';\n                err && (task.error = err);\n                uploadingFileCount--;\n                emitListUpdate();\n                startNextTask();\n                task.callback && task.callback(err, data);\n                if (task.state === 'success') {\n                    if (task.params) {\n                        delete task.params.UploadData;\n                        delete task.params.Body;\n                        delete task.params;\n                    }\n                    delete task.callback;\n                }\n            }\n            clearQueue();\n        });\n        emitListUpdate();\n        // 异步执行下一个任务\n        setTimeout(startNextTask);\n    };\n\n    var killTask = function (id, switchToState) {\n        var task = tasks[id];\n        if (!task) return;\n        var waiting = task && task.state === 'waiting';\n        var running = task && (task.state === 'checking' || task.state === 'uploading');\n        if (switchToState === 'canceled' && task.state !== 'canceled' || switchToState === 'paused' && waiting || switchToState === 'paused' && running) {\n            if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {\n                console.error('stream not support pause');\n                return;\n            }\n            task.state = switchToState;\n            cos.emit('inner-kill-task', { TaskId: id, toState: switchToState });\n            try {\n                var UploadId = task && task.params && task.params.UploadData.UploadId;\n            } catch (e) {}\n            if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId);\n            emitListUpdate();\n            if (running) {\n                uploadingFileCount--;\n                startNextTask();\n            }\n            if (switchToState === 'canceled') {\n                if (task.params) {\n                    delete task.params.UploadData;\n                    delete task.params.Body;\n                    delete task.params;\n                }\n                delete task.callback;\n            }\n        }\n        clearQueue();\n    };\n\n    cos._addTasks = function (taskList) {\n        util.each(taskList, function (task) {\n            cos._addTask(task.api, task.params, task.callback, true);\n        });\n        emitListUpdate();\n    };\n\n    var isTaskReadyWarning = true;\n    cos._addTask = function (api, params, callback, ignoreAddEvent) {\n\n        // 复制参数对象\n        params = util.formatParams(api, params);\n\n        // 生成 id\n        var id = util.uuid();\n        params.TaskId = id;\n        params.onTaskReady && params.onTaskReady(id);\n        if (params.TaskReady) {\n            params.TaskReady(id);\n            isTaskReadyWarning && console.warn('warning: Param \"TaskReady\" has been deprecated. Please use \"onTaskReady\" instead.');\n            isTaskReadyWarning = false;\n        }\n\n        var task = {\n            // env\n            params: params,\n            callback: callback,\n            api: api,\n            index: queue.length,\n            // task\n            id: id,\n            Bucket: params.Bucket,\n            Region: params.Region,\n            Key: params.Key,\n            FilePath: params.FilePath || '',\n            state: 'waiting',\n            loaded: 0,\n            size: 0,\n            speed: 0,\n            percent: 0,\n            hashPercent: 0,\n            error: null,\n            _custom: params._custom\n        };\n        var onHashProgress = params.onHashProgress;\n        params.onHashProgress = function (info) {\n            if (!cos._isRunningTask(task.id)) return;\n            task.hashPercent = info.percent;\n            onHashProgress && onHashProgress(info);\n            emitListUpdate();\n        };\n        var onProgress = params.onProgress;\n        params.onProgress = function (info) {\n            if (!cos._isRunningTask(task.id)) return;\n            task.state === 'checking' && (task.state = 'uploading');\n            task.loaded = info.loaded;\n            task.speed = info.speed;\n            task.percent = info.percent;\n            onProgress && onProgress(info);\n            emitListUpdate();\n        };\n\n        // 异步获取 filesize\n        util.getFileSize(api, params, function (err, size) {\n            // 开始处理上传\n            if (err) return callback(util.error(err)); // 如果获取大小出错，不加入队列\n            // 获取完文件大小再把任务加入队列\n            tasks[id] = task;\n            queue.push(task);\n            task.size = size;\n            !ignoreAddEvent && emitListUpdate();\n            startNextTask();\n            clearQueue();\n        });\n        return id;\n    };\n    cos._isRunningTask = function (id) {\n        var task = tasks[id];\n        return !!(task && (task.state === 'checking' || task.state === 'uploading'));\n    };\n    cos.getTaskList = function () {\n        return util.map(queue, formatTask);\n    };\n    cos.cancelTask = function (id) {\n        killTask(id, 'canceled');\n    };\n    cos.pauseTask = function (id) {\n        killTask(id, 'paused');\n    };\n    cos.restartTask = function (id) {\n        var task = tasks[id];\n        if (task && (task.state === 'paused' || task.state === 'error')) {\n            task.state = 'waiting';\n            emitListUpdate();\n            nextUploadIndex = Math.min(nextUploadIndex, task.index);\n            startNextTask();\n        }\n    };\n    cos.isUploadRunning = function () {\n        return uploadingFileCount || nextUploadIndex < queue.length;\n    };\n};\n\nmodule.exports.transferToTaskMethod = transferToTaskMethod;\nmodule.exports.init = initTask;\n\n//# sourceURL=webpack://COS/./src/task.js?");

/***/ }),
<<<<<<< HEAD
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var conventions = __webpack_require__(1);
var dom = __webpack_require__(3)
var entities = __webpack_require__(15);
var sax = __webpack_require__(16);

var DOMImplementation = dom.DOMImplementation;

var NAMESPACE = conventions.NAMESPACE;

var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;

/**
 * Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating all of the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA
 * > 2. the two-character sequence #xD #x85
 * > 3. the single character #x85
 * > 4. the single character #x2028
 * > 5. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeLineEndings(input) {
	return input
		.replace(/\r[\n\u0085]/g, '\n')
		.replace(/[\r\u0085\u2028]/g, '\n')
}

/**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */

/**
 * @typedef DOMParserOptions
 * @property {DOMHandler} [domBuilder]
 * @property {Function} [errorHandler]
 * @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
 * 						defaults to `normalizeLineEndings`
 * @property {Locator} [locator]
 * @property {Record<string, string>} [xmlns]
 *
 * @see normalizeLineEndings
 */

/**
 * The DOMParser interface provides the ability to parse XML or HTML source code
 * from a string into a DOM `Document`.
 *
 * _xmldom is different from the spec in that it allows an `options` parameter,
 * to override the default behavior._
 *
 * @param {DOMParserOptions} [options]
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */
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
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap[''] = NAMESPACE.HTML;
	}
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
	var normalize = options.normalizeLineEndings || normalizeLineEndings;
	if (source && typeof source === 'string') {
		sax.parse(
			normalize(source),
			defaultNSMap,
			entityMap
		)
	} else {
		sax.errorHandler.error('invalid doc source')
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
					this.doc.doctype = dt;
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
		throw new ParseError(error, this.locator);
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

exports.__DOMHandler = DOMHandler;
exports.normalizeLineEndings = normalizeLineEndings;
exports.DOMParser = DOMParser;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var freeze = __webpack_require__(1).freeze;

/**
 * The entities that are predefined in every XML document.
 *
 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
 */
exports.XML_ENTITIES = freeze({amp:'&', apos:"'", gt:'>', lt:'<', quot:'"'})

/**
 * A map of currently 241 entities that are detected in an HTML document.
 * They contain all entries from `XML_ENTITIES`.
 *
 * @see XML_ENTITIES
 * @see DOMParser.parseFromString
 * @see DOMImplementation.prototype.createHTMLDocument
 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
 */
exports.HTML_ENTITIES = freeze({
       lt: '<',
       gt: '>',
       amp: '&',
       quot: '"',
       apos: "'",
       Agrave: "À",
       Aacute: "Á",
       Acirc: "Â",
       Atilde: "Ã",
       Auml: "Ä",
       Aring: "Å",
       AElig: "Æ",
       Ccedil: "Ç",
       Egrave: "È",
       Eacute: "É",
       Ecirc: "Ê",
       Euml: "Ë",
       Igrave: "Ì",
       Iacute: "Í",
       Icirc: "Î",
       Iuml: "Ï",
       ETH: "Ð",
       Ntilde: "Ñ",
       Ograve: "Ò",
       Oacute: "Ó",
       Ocirc: "Ô",
       Otilde: "Õ",
       Ouml: "Ö",
       Oslash: "Ø",
       Ugrave: "Ù",
       Uacute: "Ú",
       Ucirc: "Û",
       Uuml: "Ü",
       Yacute: "Ý",
       THORN: "Þ",
       szlig: "ß",
       agrave: "à",
       aacute: "á",
       acirc: "â",
       atilde: "ã",
       auml: "ä",
       aring: "å",
       aelig: "æ",
       ccedil: "ç",
       egrave: "è",
       eacute: "é",
       ecirc: "ê",
       euml: "ë",
       igrave: "ì",
       iacute: "í",
       icirc: "î",
       iuml: "ï",
       eth: "ð",
       ntilde: "ñ",
       ograve: "ò",
       oacute: "ó",
       ocirc: "ô",
       otilde: "õ",
       ouml: "ö",
       oslash: "ø",
       ugrave: "ù",
       uacute: "ú",
       ucirc: "û",
       uuml: "ü",
       yacute: "ý",
       thorn: "þ",
       yuml: "ÿ",
       nbsp: "\u00a0",
       iexcl: "¡",
       cent: "¢",
       pound: "£",
       curren: "¤",
       yen: "¥",
       brvbar: "¦",
       sect: "§",
       uml: "¨",
       copy: "©",
       ordf: "ª",
       laquo: "«",
       not: "¬",
       shy: "­­",
       reg: "®",
       macr: "¯",
       deg: "°",
       plusmn: "±",
       sup2: "²",
       sup3: "³",
       acute: "´",
       micro: "µ",
       para: "¶",
       middot: "·",
       cedil: "¸",
       sup1: "¹",
       ordm: "º",
       raquo: "»",
       frac14: "¼",
       frac12: "½",
       frac34: "¾",
       iquest: "¿",
       times: "×",
       divide: "÷",
       forall: "∀",
       part: "∂",
       exist: "∃",
       empty: "∅",
       nabla: "∇",
       isin: "∈",
       notin: "∉",
       ni: "∋",
       prod: "∏",
       sum: "∑",
       minus: "−",
       lowast: "∗",
       radic: "√",
       prop: "∝",
       infin: "∞",
       ang: "∠",
       and: "∧",
       or: "∨",
       cap: "∩",
       cup: "∪",
       'int': "∫",
       there4: "∴",
       sim: "∼",
       cong: "≅",
       asymp: "≈",
       ne: "≠",
       equiv: "≡",
       le: "≤",
       ge: "≥",
       sub: "⊂",
       sup: "⊃",
       nsub: "⊄",
       sube: "⊆",
       supe: "⊇",
       oplus: "⊕",
       otimes: "⊗",
       perp: "⊥",
       sdot: "⋅",
       Alpha: "Α",
       Beta: "Β",
       Gamma: "Γ",
       Delta: "Δ",
       Epsilon: "Ε",
       Zeta: "Ζ",
       Eta: "Η",
       Theta: "Θ",
       Iota: "Ι",
       Kappa: "Κ",
       Lambda: "Λ",
       Mu: "Μ",
       Nu: "Ν",
       Xi: "Ξ",
       Omicron: "Ο",
       Pi: "Π",
       Rho: "Ρ",
       Sigma: "Σ",
       Tau: "Τ",
       Upsilon: "Υ",
       Phi: "Φ",
       Chi: "Χ",
       Psi: "Ψ",
       Omega: "Ω",
       alpha: "α",
       beta: "β",
       gamma: "γ",
       delta: "δ",
       epsilon: "ε",
       zeta: "ζ",
       eta: "η",
       theta: "θ",
       iota: "ι",
       kappa: "κ",
       lambda: "λ",
       mu: "μ",
       nu: "ν",
       xi: "ξ",
       omicron: "ο",
       pi: "π",
       rho: "ρ",
       sigmaf: "ς",
       sigma: "σ",
       tau: "τ",
       upsilon: "υ",
       phi: "φ",
       chi: "χ",
       psi: "ψ",
       omega: "ω",
       thetasym: "ϑ",
       upsih: "ϒ",
       piv: "ϖ",
       OElig: "Œ",
       oelig: "œ",
       Scaron: "Š",
       scaron: "š",
       Yuml: "Ÿ",
       fnof: "ƒ",
       circ: "ˆ",
       tilde: "˜",
       ensp: " ",
       emsp: " ",
       thinsp: " ",
       zwnj: "‌",
       zwj: "‍",
       lrm: "‎",
       rlm: "‏",
       ndash: "–",
       mdash: "—",
       lsquo: "‘",
       rsquo: "’",
       sbquo: "‚",
       ldquo: "“",
       rdquo: "”",
       bdquo: "„",
       dagger: "†",
       Dagger: "‡",
       bull: "•",
       hellip: "…",
       permil: "‰",
       prime: "′",
       Prime: "″",
       lsaquo: "‹",
       rsaquo: "›",
       oline: "‾",
       euro: "€",
       trade: "™",
       larr: "←",
       uarr: "↑",
       rarr: "→",
       darr: "↓",
       harr: "↔",
       crarr: "↵",
       lceil: "⌈",
       rceil: "⌉",
       lfloor: "⌊",
       rfloor: "⌋",
       loz: "◊",
       spades: "♠",
       clubs: "♣",
       hearts: "♥",
       diams: "♦"
});

/**
 * @deprecated use `HTML_ENTITIES` instead
 * @see HTML_ENTITIES
 */
exports.entityMap = exports.HTML_ENTITIES


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var NAMESPACE = __webpack_require__(1).NAMESPACE;

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

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError(message, locator) {
	this.message = message
	this.locator = locator
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
}
ParseError.prototype = new Error();
ParseError.prototype.name = ParseError.name

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
		if (Object.hasOwnProperty.call(entityMap, k)) {
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
				var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, '');
				var config = parseStack.pop();
				if(end<0){

	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
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
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
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

				if (NAMESPACE.isHTML(el.uri) && !el.closed) {
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				} else {
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError) {
				throw e;
			}
			errorHandler.error('element parse error: '+e)
			end = -1;
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

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (el.attributeNames.hasOwnProperty(qname)) {
			errorHandler.fatalError('Attribute ' + qname + ' redefined')
		}
		el.addValue(
			qname,
			// @see https://www.w3.org/TR/xml/#AVNormalize
			// since the xmldom sax parser does not "interpret" DTD the following is not implemented:
			// - recursive replacement of (DTD) entity references
			// - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
			value.replace(/[\t\n\r]/g, ' ').replace(/&#?\w+;/g, entityReplacer),
			startIndex
		)
	}
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
				throw new Error('attribute equal must after attrName'); // No known test case
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
					value = source.slice(start, p);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start, p);
				addAttribute(attrName, value, start);
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
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
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
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
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value, start)
				}else{
					if(!NAMESPACE.isHTML(currentNSMap['']) || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					addAttribute(value, value, start)
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
					var value = source.slice(start, p);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start)
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
					if (!NAMESPACE.isHTML(currentNSMap['']) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					addAttribute(attrName, attrName, start);
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
			a.uri = NAMESPACE.XMLNS
			domBuilder.startPrefixMapping(nsPrefix, value)
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = NAMESPACE.XML;
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
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();

			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



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

<<<<<<< HEAD
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
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(3).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(3).XMLSerializer ;
	exports.DOMParser = DOMParser;
//}

function ElementAttributes(){
	this.attributeNames = {}
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
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
=======
/***/ }),
/* 13 */
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
	var XMLReader = __webpack_require__(14).XMLReader;
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(3).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(3).XMLSerializer ;
	exports.DOMParser = DOMParser;
//}


/***/ }),
/* 14 */
/***/ (function(module, exports) {
>>>>>>> upd 暂存

exports.XMLReader = XMLReader;
exports.ParseError = ParseError;


/***/ }),
<<<<<<< HEAD
/* 17 */
=======
/* 15 */
>>>>>>> upd 暂存
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
<<<<<<< HEAD
/* 18 */
=======
/* 16 */
>>>>>>> upd 暂存
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function (t, e) {
   true ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).BeaconAction = e();
}(this, function () {
  "use strict";
  var t = function (e, r) {
    return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    })(e, r);
  };var e = function () {
    return (e = Object.assign || function (t) {
      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;
    }).apply(this, arguments);
  };function r(t, e, r, n) {
    return new (r || (r = Promise))(function (o, i) {
      function a(t) {
        try {
          c(n.next(t));
        } catch (t) {
          i(t);
        }
      }function s(t) {
        try {
          c(n.throw(t));
        } catch (t) {
          i(t);
        }
      }function c(t) {
        var e;t.done ? o(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) {
          t(e);
        })).then(a, s);
      }c((n = n.apply(t, e || [])).next());
    });
  }function n(t, e) {
    var r,
        n,
        o,
        i,
        a = { label: 0, sent: function () {
        if (1 & o[0]) throw o[1];return o[1];
      }, trys: [], ops: [] };return i = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
      return this;
    }), i;function s(i) {
      return function (s) {
        return function (i) {
          if (r) throw new TypeError("Generator is already executing.");for (; a;) try {
            if (r = 1, n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done) return o;switch (n = 0, o && (i = [2 & i[0], o.value]), i[0]) {case 0:case 1:
                o = i;break;case 4:
                return a.label++, { value: i[1], done: !1 };case 5:
                a.label++, n = i[1], i = [0];continue;case 7:
                i = a.ops.pop(), a.trys.pop();continue;default:
                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                  a = 0;continue;
                }if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                  a.label = i[1];break;
                }if (6 === i[0] && a.label < o[1]) {
                  a.label = o[1], o = i;break;
                }if (o && a.label < o[2]) {
                  a.label = o[2], a.ops.push(i);break;
                }o[2] && a.ops.pop(), a.trys.pop();continue;}i = e.call(t, a);
          } catch (t) {
            i = [6, t], n = 0;
          } finally {
            r = o = 0;
          }if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };
        }([i, s]);
      };
    }
  }var o = "__BEACON_",
      i = "__BEACON_deviceId",
      a = "last_report_time",
      s = "sending_event_ids",
      c = "beacon_config",
      u = "beacon_config_request_time",
      l = function () {
    function t() {
      var t = this;this.emit = function (e, r) {
        if (t) {
          var n,
              o = t.__EventsList[e];if (null == o ? void 0 : o.length) {
            o = o.slice();for (var i = 0; i < o.length; i++) {
              n = o[i];try {
                var a = n.callback.apply(t, [r]);if (1 === n.type && t.remove(e, n.callback), !1 === a) break;
              } catch (t) {
                throw t;
              }
            }
          }return t;
        }
<<<<<<< HEAD
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var REQUEST = __webpack_require__(20);
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

    var SignHost = '';
    var standardHost = region ? 'cos.' + region + '.myqcloud.com' : 'service.cos.myqcloud.com';
    var urlHost = domain.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
    if (standardHost === urlHost) SignHost = standardHost;

    submitRequest.call(this, {
        Action: 'name/cos:GetService',
        url: domain,
        method: 'GET',
        headers: params.Headers,
        SignHost: SignHost
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

    var Conf = { CORSRule: CORSRules };
    if (params.ResponseVary) Conf.ResponseVary = params.ResponseVary;

    var xml = util.json2xml({ CORSConfiguration: Conf });

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
        var ResponseVary = CORSConfiguration.ResponseVary;

        util.each(CORSRules, function (rule) {
            util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
                var sKey = key + 's';
                var val = rule[sKey] || rule[key] || [];
                delete rule[key];
                rule[sKey] = util.isArray(val) ? val : [val];
=======
      }, this.__EventsList = {};
    }return t.prototype.indexOf = function (t, e) {
      for (var r = 0; r < t.length; r++) if (t[r].callback === e) return r;return -1;
    }, t.prototype.on = function (t, e, r) {
      if (void 0 === r && (r = 0), this) {
        var n = this.__EventsList[t];if (n || (n = this.__EventsList[t] = []), -1 === this.indexOf(n, e)) {
          var o = { name: t, type: r || 0, callback: e };return n.push(o), this;
        }return this;
      }
    }, t.prototype.one = function (t, e) {
      this.on(t, e, 1);
    }, t.prototype.remove = function (t, e) {
      if (this) {
        var r = this.__EventsList[t];if (!r) return null;if (!e) {
          try {
            delete this.__EventsList[t];
          } catch (t) {}return null;
        }if (r.length) {
          var n = this.indexOf(r, e);r.splice(n, 1);
        }return this;
      }
    }, t;
  }();function h(t, e) {
    for (var r = {}, n = 0, o = Object.keys(t); n < o.length; n++) {
      var i = o[n],
          a = t[i];if ("string" == typeof a) r[f(i)] = f(a);else {
        if (e) throw new Error("value mast be string  !!!!");r[f(String(i))] = f(String(a));
      }
    }return r;
  }function f(t) {
    if ("string" != typeof t) return t;try {
      return t.replace(new RegExp("\\|", "g"), "%7C").replace(new RegExp("\\&", "g"), "%26").replace(new RegExp("\\=", "g"), "%3D").replace(new RegExp("\\+", "g"), "%2B");
    } catch (t) {
      return "";
    }
  }function p(t) {
    return String(t.A99) + String(t.A100);
  }var d = function () {};var v = function () {
    function t(t) {
      var r = this;this.lifeCycle = new l(), this.uploadJobQueue = [], this.additionalParams = {}, this.delayTime = 0, this._normalLogPipeline = function (t) {
        if (!t || !t.reduce || !t.length) throw new TypeError("createPipeline 方法需要传入至少有一个 pipe 的数组");return 1 === t.length ? function (e, r) {
          t[0](e, r || d);
        } : t.reduce(function (t, e) {
          return function (r, n) {
            return void 0 === n && (n = d), t(r, function (t) {
              return null == e ? void 0 : e(t, n);
>>>>>>> upd 暂存
            });
          };
        });
<<<<<<< HEAD

        callback(null, {
            CORSRules: CORSRules,
            ResponseVary: ResponseVary,
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
=======
      }([function (t) {
        r.send({ url: r.strategy.getUploadUrl(), data: t, method: "post", contentType: "application/json;charset=UTF-8" }, function () {
          var e = r.config.onReportSuccess;"function" == typeof e && e(JSON.stringify(t.events));
        }, function () {
          var e = r.config.onReportFail;"function" == typeof e && e(JSON.stringify(t.events));
>>>>>>> upd 暂存
        });
      }]), function (t, e) {
        if (!t) throw e instanceof Error ? e : new Error(e);
      }(Boolean(t.appkey), "appkey must be initial"), this.config = e({}, t);
    }return t.prototype.onUserAction = function (t, e) {
      this.preReport(t, e, !1);
    }, t.prototype.onDirectUserAction = function (t, e) {
      this.preReport(t, e, !0);
    }, t.prototype.preReport = function (t, e, r) {
      t ? this.strategy.isEventUpOnOff() && (this.strategy.isBlackEvent(t) || this.strategy.isSampleEvent(t) || this.onReport(t, e, r)) : this.errorReport.reportError("602", " no eventCode");
    }, t.prototype.addAdditionalParams = function (t) {
      for (var e = 0, r = Object.keys(t); e < r.length; e++) {
        var n = r[e];this.additionalParams[n] = t[n];
      }
    }, t.prototype.setChannelId = function (t) {
      this.commonInfo.channelID = String(t);
    }, t.prototype.setOpenId = function (t) {
      this.commonInfo.openid = String(t);
    }, t.prototype.setUnionid = function (t) {
      this.commonInfo.unid = String(t);
    }, t.prototype.getDeviceId = function () {
      return this.commonInfo.deviceId;
    }, t.prototype.getCommonInfo = function () {
      return this.commonInfo;
    }, t.prototype.removeSendingId = function (t) {
      try {
        var e = JSON.parse(this.storage.getItem(s)),
            r = e.indexOf(t);-1 != r && (e.splice(r, 1), this.storage.setItem(s, JSON.stringify(e)));
      } catch (t) {}
    }, t;
  }(),
      y = function () {
    function t(t, e, r, n) {
      this.requestParams = {}, this.network = n, this.requestParams.attaid = "00400014144", this.requestParams.token = "6478159937", this.requestParams.product_id = t.appkey, this.requestParams.platform = r, this.requestParams.uin = e.deviceId, this.requestParams.model = "", this.requestParams.os = r, this.requestParams.app_version = t.appVersion, this.requestParams.sdk_version = e.sdkVersion, this.requestParams.error_stack = "", this.uploadUrl = t.isOversea ? "https://htrace.wetvinfo.com/kv" : "https://h.trace.qq.com/kv";
    }return t.prototype.reportError = function (t, e) {
      this.requestParams._dc = Math.random(), this.requestParams.error_msg = e, this.requestParams.error_code = t, this.network.get(this.uploadUrl, { params: this.requestParams }).catch(function (t) {});
    }, t;
  }(),
      g = function () {
    function t(t, e, r, n) {
      this.strategy = { isEventUpOnOff: !0, httpsUploadUrl: "https://otheve.beacon.qq.com/analytics/v2_upload", requestInterval: 30, blacklist: [], samplelist: [] }, this.realSample = {}, this.appkey = "", this.appkey = t.appkey, this.storage = r;try {
        var o = JSON.parse(this.storage.getItem(c));o && this.processData(o);
      } catch (t) {}t.isOversea && (this.strategy.httpsUploadUrl = "https://svibeacon.onezapp.com/analytics/v2_upload"), !t.isOversea && this.needRequestConfig() && this.requestConfig(t.appVersion, e, n);
    }return t.prototype.requestConfig = function (t, e, r) {
      var n = this;this.storage.setItem(u, Date.now().toString()), r.post("https://oth.str.beacon.qq.com/trpc.beacon.configserver.BeaconConfigService/QueryConfig", { platformId: "undefined" == typeof wx ? "3" : "4", mainAppKey: this.appkey, appVersion: t, sdkVersion: e.sdkVersion, osVersion: e.userAgent, model: "", packageName: "", params: { A3: e.deviceId } }).then(function (t) {
        if (0 == t.data.ret) try {
          var e = JSON.parse(t.data.beaconConfig);e && (n.processData(e), n.storage.setItem(c, t.data.beaconConfig));
        } catch (t) {} else n.processData(null), n.storage.setItem(c, "");
      }).catch(function (t) {});
    }, t.prototype.processData = function (t) {
      var e, r, n, o, i;this.strategy.isEventUpOnOff = null !== (e = null == t ? void 0 : t.isEventUpOnOff) && void 0 !== e ? e : this.strategy.isEventUpOnOff, this.strategy.httpsUploadUrl = null !== (r = null == t ? void 0 : t.httpsUploadUrl) && void 0 !== r ? r : this.strategy.httpsUploadUrl, this.strategy.requestInterval = null !== (n = null == t ? void 0 : t.requestInterval) && void 0 !== n ? n : this.strategy.requestInterval, this.strategy.blacklist = null !== (o = null == t ? void 0 : t.blacklist) && void 0 !== o ? o : this.strategy.blacklist, this.strategy.samplelist = null !== (i = null == t ? void 0 : t.samplelist) && void 0 !== i ? i : this.strategy.samplelist;for (var a = 0, s = this.strategy.samplelist; a < s.length; a++) {
        var c = s[a].split(",");2 == c.length && (this.realSample[c[0]] = c[1]);
      }
    }, t.prototype.needRequestConfig = function () {
      var t = Number(this.storage.getItem(u));return Date.now() - t > 60 * this.strategy.requestInterval * 1e3;
    }, t.prototype.getUploadUrl = function () {
      return this.strategy.httpsUploadUrl + "?appkey=" + this.appkey;
    }, t.prototype.isBlackEvent = function (t) {
      return -1 != this.strategy.blacklist.indexOf(t);
    }, t.prototype.isEventUpOnOff = function () {
      return this.strategy.isEventUpOnOff;
    }, t.prototype.isSampleEvent = function (t) {
      return !!Object.prototype.hasOwnProperty.call(this.realSample, t) && this.realSample[t] < Math.floor(Math.random() * Math.floor(1e4));
    }, t;
  }(),
      m = "session_storage_key",
      w = function () {
    function t(t, e, r) {
      this.beacon = r, this.storage = t, this.duration = e, this.appkey = r.config.appkey;
    }return t.prototype.getSession = function () {
      var t = this.storage.getItem(m);if (!t) return this.createSession();var e = "",
          r = 0;try {
        var n = JSON.parse(t) || { sessionId: void 0, sessionStart: void 0 };if (!n.sessionId || !n.sessionStart) return this.createSession();var o = Number(this.storage.getItem(a));if (Date.now() - o > this.duration) return this.createSession();e = n.sessionId, r = n.sessionStart;
      } catch (t) {}return { sessionId: e, sessionStart: r };
    }, t.prototype.createSession = function () {
      var t = Date.now(),
          e = { sessionId: this.appkey + "_" + t.toString(), sessionStart: t };this.storage.setItem(m, JSON.stringify(e)), this.storage.setItem(a, t.toString());var r = "is_new_user",
          n = this.storage.getItem(r);return this.beacon.onDirectUserAction("rqd_applaunched", { A21: n ? "N" : "Y" }), this.storage.setItem(r, JSON.stringify(!1)), e;
    }, t;
  }();function b() {
    var t = navigator.userAgent,
        e = t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1,
        r = t.indexOf("Edge") > -1 && !e,
        n = t.indexOf("Trident") > -1 && t.indexOf("rv:11.0") > -1;if (e) {
      new RegExp("MSIE (\\d+\\.\\d+);").test(t);var o = parseFloat(RegExp.$1);return 7 == o ? 7 : 8 == o ? 8 : 9 == o ? 9 : 10 == o ? 10 : 6;
    }return r ? -2 : n ? 11 : -1;
  }var S = function () {
    return (S = Object.assign || function (t) {
      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;
    }).apply(this, arguments);
  };var E,
      I = function () {
    function t(t, e) {
      void 0 === e && (e = {}), this.reportOptions = {}, this.config = t, this.reportOptions = e;
    }return t.canUseDB = function () {
      return !!(null === window || void 0 === window ? void 0 : window.indexedDB);
    }, t.prototype.openDB = function () {
      var e = this;return new Promise(function (r, n) {
        if (!t.canUseDB()) return n({ message: "当前不支持 indexeddb" });var o = e.config,
            i = o.name,
            a = o.version,
            s = o.stores,
            c = indexedDB.open(i, a);c.onsuccess = function () {
          e.db = c.result, r(), S({ result: 1, func: "open", params: JSON.stringify(e.config) }, e.reportOptions);
        }, c.onerror = function (t) {
          var r, o;n(t), S({ result: 0, func: "open", params: JSON.stringify(e.config), error_msg: null === (o = null === (r = t.target) || void 0 === r ? void 0 : r.error) || void 0 === o ? void 0 : o.message }, e.reportOptions);
        }, c.onupgradeneeded = function () {
          e.db = c.result;try {
            null == s || s.forEach(function (t) {
              e.createStore(t);
            });
          } catch (t) {
            S({ result: 0, func: "open", params: JSON.stringify(e.config), error_msg: t.message }, e.reportOptions), n(t);
          }
        };
      });
    }, t.prototype.useStore = function (t) {
      return this.storeName = t, this;
    }, t.prototype.deleteDB = function () {
      var t = this;return this.closeDB(), new Promise(function (e, r) {
        var n = indexedDB.deleteDatabase(t.config.name);n.onsuccess = function () {
          return e();
        }, n.onerror = r;
      });
    }, t.prototype.closeDB = function () {
      var t;null === (t = this.db) || void 0 === t || t.close(), this.db = null;
    }, t.prototype.getStoreCount = function () {
      var t = this;return new Promise(function (e, r) {
        var n = t.getStore("readonly").count();n.onsuccess = function () {
          return e(n.result);
        }, n.onerror = r;
      });
    }, t.prototype.clearStore = function () {
      var t = this;return new Promise(function (e, r) {
        var n = t.getStore("readwrite").clear();n.onsuccess = function () {
          return e();
        }, n.onerror = r;
      });
    }, t.prototype.add = function (t, e) {
      var r = this;return new Promise(function (n, o) {
        var i = r.getStore("readwrite").add(t, e);i.onsuccess = function () {
          n(i.result);
        }, i.onerror = o;
      });
    }, t.prototype.put = function (t, e) {
      var r = this;return new Promise(function (n, o) {
        var i = r.getStore("readwrite").put(t, e);i.onsuccess = function () {
          n(i.result);
        }, i.onerror = o;
      });
    }, t.prototype.getStoreAllData = function () {
      var t = this;return new Promise(function (e, r) {
        var n = t.getStore("readonly").openCursor(),
            o = [];n.onsuccess = function () {
          var t;if (null === (t = n.result) || void 0 === t ? void 0 : t.value) {
            var r = n.result.value;o.push(r), n.result.continue();
          } else e(o);
        }, n.onerror = r;
      });
    }, t.prototype.getDataRangeByIndex = function (t, e, r, n, o) {
      var i = this;return new Promise(function (a, s) {
        var c = i.getStore().index(t),
            u = IDBKeyRange.bound(e, r, n, o),
            l = [],
            h = c.openCursor(u);h.onsuccess = function () {
          var t;(null === (t = null == h ? void 0 : h.result) || void 0 === t ? void 0 : t.value) ? (l.push(null == h ? void 0 : h.result.value), null == h || h.result.continue()) : a(l);
        }, h.onerror = s;
      });
    }, t.prototype.removeDataByIndex = function (t, e, r, n, o) {
      var i = this;return new Promise(function (a, s) {
        var c = i.getStore("readwrite").index(t),
            u = IDBKeyRange.bound(e, r, n, o),
            l = c.openCursor(u),
            h = 0;l.onsuccess = function (t) {
          var e = t.target.result;e ? (h += 1, e.delete(), e.continue()) : a(h);
        }, l.onerror = s;
      });
    }, t.prototype.createStore = function (t) {
      var e = t.name,
          r = t.indexes,
          n = void 0 === r ? [] : r,
          o = t.options;if (this.db) {
        this.db.objectStoreNames.contains(e) && this.db.deleteObjectStore(e);var i = this.db.createObjectStore(e, o);n.forEach(function (t) {
          i.createIndex(t.indexName, t.keyPath, t.options);
        });
      }
    }, t.prototype.getStore = function (t) {
      var e;return void 0 === t && (t = "readonly"), null === (e = this.db) || void 0 === e ? void 0 : e.transaction(this.storeName, t).objectStore(this.storeName);
    }, t;
  }(),
      O = "event_table_v3",
      k = "eventId",
      x = function () {
    function t(t) {
      this.isReady = !1, this.taskQueue = Promise.resolve(), this.db = new I({ name: "Beacon_" + t + "_V3", version: 1, stores: [{ name: O, options: { keyPath: k }, indexes: [{ indexName: k, keyPath: k, options: { unique: !0 } }] }] }), this.open();
    }return t.prototype.getCount = function () {
      var t = this;return this.readyExec(function () {
        return t.db.getStoreCount();
      });
    }, t.prototype.setItem = function (t, e) {
      var r = this;return this.readyExec(function () {
        return r.db.add({ eventId: t, value: e });
      });
    }, t.prototype.getItem = function (t) {
      return r(this, void 0, void 0, function () {
        var e = this;return n(this, function (r) {
          return [2, this.readyExec(function () {
            return e.db.getDataRangeByIndex(k, t, t);
          })];
        });
      });
    }, t.prototype.removeItem = function (t) {
      var e = this;return this.readyExec(function () {
        return e.db.removeDataByIndex(k, t, t);
      });
    }, t.prototype.updateItem = function (t, e) {
      var r = this;return this.readyExec(function () {
        return r.db.put({ eventId: t, value: e });
      });
    }, t.prototype.iterate = function (t) {
      var e = this;return this.readyExec(function () {
        return e.db.getStoreAllData().then(function (e) {
          e.forEach(function (e) {
            t(e.value);
          });
        });
      });
    }, t.prototype.open = function () {
      return r(this, void 0, void 0, function () {
        var t = this;return n(this, function (e) {
          switch (e.label) {case 0:
              return this.taskQueue = this.taskQueue.then(function () {
                return t.db.openDB();
              }), [4, this.taskQueue];case 1:
              return e.sent(), this.isReady = !0, this.db.useStore(O), [2];}
        });
      });
    }, t.prototype.readyExec = function (t) {
      return this.isReady ? t() : (this.taskQueue = this.taskQueue.then(function () {
        return t();
      }), this.taskQueue);
    }, t;
  }(),
      C = function () {
    function t(t) {
      this.keyObject = {}, this.storage = t;
    }return t.prototype.getCount = function () {
      return this.storage.getStoreCount();
    }, t.prototype.removeItem = function (t) {
      this.storage.removeItem(t), delete this.keyObject[t];
    }, t.prototype.setItem = function (t, e) {
      var r = JSON.stringify(e);this.storage.setItem(t, r), this.keyObject[t] = e;
    }, t.prototype.iterate = function (t) {
      for (var e = Object.keys(this.keyObject), r = 0; r < e.length; r++) {
        var n = this.storage.getItem(e[r]);t(JSON.parse(n));
      }
    }, t;
  }(),
      _ = function () {
    function t(t, e) {
      var r = this;this.dbEventCount = 0, b() > 0 || !window.indexedDB || /X5Lite/.test(navigator.userAgent) ? (this.store = new C(e), this.dbEventCount = this.store.getCount()) : (this.store = new x(t), this.getCount().then(function (t) {
        r.dbEventCount = t;
      }));
    }return t.prototype.getCount = function () {
      return r(this, void 0, void 0, function () {
        return n(this, function (t) {
          switch (t.label) {case 0:
              return t.trys.push([0, 2,, 3]), [4, this.store.getCount()];case 1:
              return [2, t.sent()];case 2:
              return t.sent(), [2, Promise.reject()];case 3:
              return [2];}
        });
      });
    }, t.prototype.insertEvent = function (t, e) {
      return r(this, void 0, void 0, function () {
        var r, o;return n(this, function (n) {
          switch (n.label) {case 0:
              if (this.dbEventCount >= 1e4) return [2, Promise.reject()];r = p(t.mapValue), n.label = 1;case 1:
              return n.trys.push([1, 3,, 4]), this.dbEventCount++, [4, this.store.setItem(r, t)];case 2:
              return [2, n.sent()];case 3:
              return o = n.sent(), e && e(o, t), this.dbEventCount--, [2, Promise.reject()];case 4:
              return [2];}
        });
      });
    }, t.prototype.getEvents = function () {
      return r(this, void 0, void 0, function () {
        var t;return n(this, function (e) {
          switch (e.label) {case 0:
              t = [], e.label = 1;case 1:
              return e.trys.push([1, 3,, 4]), [4, this.store.iterate(function (e) {
                t.push(e);
              })];case 2:
              return e.sent(), [2, Promise.all(t)];case 3:
              return e.sent(), [2, Promise.all(t)];case 4:
              return [2];}
        });
      });
    }, t.prototype.removeEvent = function (t) {
      return r(this, void 0, void 0, function () {
        var e;return n(this, function (r) {
          switch (r.label) {case 0:
              e = p(t.mapValue), r.label = 1;case 1:
              return r.trys.push([1, 3,, 4]), this.dbEventCount--, [4, this.store.removeItem(e)];case 2:
              return [2, r.sent()];case 3:
              return r.sent(), this.dbEventCount++, [2, Promise.reject()];case 4:
              return [2];}
        });
      });
    }, t;
  }(),
      A = function () {
    return (A = Object.assign || function (t) {
      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;
    }).apply(this, arguments);
  };function P(t) {
    try {
      return decodeURIComponent(t.replace(/\+/g, " "));
    } catch (t) {
      return null;
    }
  }function j(t, e) {
    var r = [null, void 0, "", NaN].includes(t);if (e.isSkipEmpty && r) return null;var n = !e.isSkipEmpty && r ? "" : t;try {
      return e.encode ? encodeURIComponent(n) : n;
    } catch (t) {
      return null;
    }
  }function D(t) {
    var e = t.split("#"),
        r = e[0],
        n = e[1],
        o = void 0 === n ? "" : n,
        i = r.split("?"),
        a = i[0],
        s = i[1],
        c = void 0 === s ? "" : s,
        u = P(o),
        l = Object.create(null);return c.split("&").forEach(function (t) {
      var e = t.split("="),
          r = e[0],
          n = e[1],
          o = void 0 === n ? "" : n,
          i = P(r),
          a = P(o);null === i || null === a || "" === i && "" === a || l[i] || (l[i] = a);
    }), { url: a, query: l, hash: u };
  }function T(t, e) {
    void 0 === e && (e = { encode: !0, isSkipEmpty: !1 });var r = t.url,
        n = t.query,
        o = void 0 === n ? {} : n,
        i = t.hash,
        a = r.split("#"),
        s = a[0],
        c = a[1],
        u = void 0 === c ? "" : c,
        l = s.split("?")[0],
        h = [],
        f = j(i || u, e),
        p = A(A({}, D(r).query), o);return Object.keys(p).forEach(function (t) {
      var r = j(t, e),
          n = j(p[t], e);null !== r && null !== n && h.push(r + "=" + n);
    }), l + (h.length ? "?" + h.join("&") : "") + (f ? "#" + f : "");
  }function N(t, e) {
    return new Promise(function (r, n) {
      if (e && document.querySelectorAll("script[data-tag=" + e + "]").length) return r();var o = document.createElement("script"),
          i = A({ type: "text/javascript", charset: "utf-8" }, t);Object.keys(i).forEach(function (t) {
        return function (t, e, r) {
          if (t) return void 0 === r ? t.getAttribute(e) : t.setAttribute(e, r);
        }(o, t, i[t]);
      }), e && (o.dataset.tag = e), o.onload = function () {
        return r();
      }, o.onreadystatechange = function () {
        var t = o.readyState;["complete", "loaded"].includes(t) && (o.onreadystatechange = null, r());
      }, o.onerror = n, document.body.appendChild(o);
    });
  }!function (t) {
    t[t.equal = 0] = "equal", t[t.low = -1] = "low", t[t.high = 1] = "high";
  }(E || (E = {}));var U = function () {
    return (U = Object.assign || function (t) {
      for (var e, r = 1, n = arguments.length; r < n; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);return t;
    }).apply(this, arguments);
  };function q(t, e, r, n) {
    return new (r || (r = Promise))(function (o, i) {
      function a(t) {
        try {
          c(n.next(t));
        } catch (t) {
          i(t);
        }
      }function s(t) {
        try {
          c(n.throw(t));
        } catch (t) {
          i(t);
        }
      }function c(t) {
        var e;t.done ? o(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) {
          t(e);
        })).then(a, s);
      }c((n = n.apply(t, e || [])).next());
    });
  }function R(t, e) {
    var r,
        n,
        o,
        i,
        a = { label: 0, sent: function () {
        if (1 & o[0]) throw o[1];return o[1];
      }, trys: [], ops: [] };return i = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
      return this;
    }), i;function s(i) {
      return function (s) {
        return function (i) {
          if (r) throw new TypeError("Generator is already executing.");for (; a;) try {
            if (r = 1, n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done) return o;switch (n = 0, o && (i = [2 & i[0], o.value]), i[0]) {case 0:case 1:
                o = i;break;case 4:
                return a.label++, { value: i[1], done: !1 };case 5:
                a.label++, n = i[1], i = [0];continue;case 7:
                i = a.ops.pop(), a.trys.pop();continue;default:
                if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                  a = 0;continue;
                }if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                  a.label = i[1];break;
                }if (6 === i[0] && a.label < o[1]) {
                  a.label = o[1], o = i;break;
                }if (o && a.label < o[2]) {
                  a.label = o[2], a.ops.push(i);break;
                }o[2] && a.ops.pop(), a.trys.pop();continue;}i = e.call(t, a);
          } catch (t) {
            i = [6, t], n = 0;
          } finally {
            r = o = 0;
          }if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };
        }([i, s]);
      };
    }
  }var L = function () {
    function t() {
      this.interceptors = [];
    }return t.prototype.use = function (t, e) {
      return this.interceptors.push({ resolved: t, rejected: e }), this.interceptors.length - 1;
    }, t.prototype.traverse = function (t, e) {
      void 0 === e && (e = !1);var r = Promise.resolve(t);return (e ? Array.prototype.reduceRight : Array.prototype.reduce).call(this.interceptors, function (t, e) {
        if (e) {
          var n = e.resolved,
              o = e.rejected;r = r.then(n, o);
        }return t;
      }, ""), r;
    }, t.prototype.eject = function (t) {
      this.interceptors[t] && (this.interceptors[t] = null);
    }, t;
  }(),
      B = { defaults: { timeout: 0, method: "GET", mode: "cors", redirect: "follow", credentials: "same-origin" }, headers: { common: { Accept: "application/json, text/plain, */*" }, POST: { "Content-Type": "application/x-www-form-urlencoded" }, PUT: { "Content-Type": "application/x-www-form-urlencoded" }, PATCH: { "Content-Type": "application/x-www-form-urlencoded" } }, baseURL: "", polyfillUrl: "https://vm.gtimg.cn/comps/script/fetch.min.js", interceptors: { request: new L(), response: new L() } },
      J = /^([a-z][a-z\d+\-.]*:)?\/\//i,
      M = Object.prototype.toString;function V(t) {
    return q(this, void 0, void 0, function () {
      var e;return R(this, function (r) {
        switch (r.label) {case 0:
            if (window.fetch) return [2];r.label = 1;case 1:
            return r.trys.push([1, 3,, 4]), [4, N({ src: t })];case 2:
            return r.sent(), [3, 4];case 3:
            throw e = r.sent(), function (t) {
              if ("undefined" != typeof Image) {
                var e = new Image(1, 1),
                    r = U({ attaid: "0f400053130", token: "6552374442", comps: "@tencent/ovb-request", version: "1.1.18", ua: navigator.userAgent, url: location.href, _dc: Math.random() }, t),
                    n = Object.keys(r).map(function (t) {
                  return t + "=" + encodeURIComponent(r[t]);
                }).join("&");e.src = "https://h.trace.qq.com/kv?" + n;
              }
            }({ func: "loadPolyfill", result: 0, params: t, error_msg: e.message }), new Error("加载 polyfill " + t + " 失败: " + e.message);case 4:
            return [2];}
      });
    });
  }function G(t) {
    return ["Accept", "Content-Type"].forEach(function (e) {
      return r = e, void ((n = t.headers) && Object.keys(n).forEach(function (t) {
        t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = n[t], delete n[t]);
      }));var r, n;
    }), function (t) {
      if ("[object Object]" !== M.call(t)) return !1;var e = Object.getPrototypeOf(t);return null === e || e === Object.prototype;
    }(t.body) && (t.body = JSON.stringify(t.body), t.headers && (t.headers["Content-Type"] = "application/json;charset=utf-8")), t;
  }function F(t) {
    return q(this, void 0, void 0, function () {
      var e, r, n, o, i, a, s, c, u, l, h, f, p, d, v, y, g;return R(this, function (m) {
        switch (m.label) {case 0:
            return e = B.baseURL, r = B.defaults, n = B.interceptors, [4, V(B.polyfillUrl)];case 1:
            return m.sent(), (o = U(U({}, r), t)).headers || (o.headers = function (t) {
              void 0 === t && (t = "GET");var e = B.headers[t] || {};return U(U({}, B.headers.common), e);
            }(o.method)), G(o), [4, n.request.traverse(o, !0)];case 2:
            if ((i = m.sent()) instanceof Error) throw i;return i.url = function (t, e) {
              return !t || J.test(e) ? e : t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "");
            }(e, i.url), a = i.url, s = i.timeout, c = i.params, u = i.method, l = ["GET", "DELETE", "OPTIONS", "HEAD"].includes(void 0 === u ? "GET" : u) && !!c, h = l ? T({ url: a, query: c }) : a, f = [], s && !i.signal && (v = new Promise(function (t) {
              p = setTimeout(function () {
                t(new Error("timeout"));
              }, s);
            }), f.push(v), d = new AbortController(), i.signal = d.signal), f.push(fetch(h, i).catch(function (t) {
              return t;
            })), [4, Promise.race(f)];case 3:
            return y = m.sent(), p && clearTimeout(p), [4, n.response.traverse(y)];case 4:
            if ((g = m.sent()) instanceof Error) throw null == d || d.abort(), g;return [2, g];}
      });
    });
  }var Q = function () {
    function t(t) {
      B.interceptors.request.use(function (r) {
        var n = r.url,
            o = r.method,
            i = r.body,
            a = i;if (t.onReportBeforeSend) {
          var s = t.onReportBeforeSend({ url: n, method: o, data: i ? JSON.parse(i) : null });a = (null == s ? void 0 : s.data) ? JSON.stringify(s.data) : null;
        }if ("GET" !== o && !a) throw new Error("No data for sdk, cancel.");return e(e({}, r), { body: a });
      });
    }return t.prototype.get = function (t, o) {
      return r(this, void 0, void 0, function () {
        var r, i;return n(this, function (n) {
          switch (n.label) {case 0:
              return [4, F(e({ url: t }, o))];case 1:
              return [4, (r = n.sent()).json()];case 2:
              return i = n.sent(), [2, Promise.resolve({ data: i, status: r.status, statusText: r.statusText, headers: r.headers })];}
        });
      });
    }, t.prototype.post = function (t, o, i) {
      return r(this, void 0, void 0, function () {
        var r, a;return n(this, function (n) {
          switch (n.label) {case 0:
              return [4, F(e({ url: t, body: o, method: "POST" }, i))];case 1:
              return [4, (r = n.sent()).json()];case 2:
              return a = n.sent(), [2, Promise.resolve({ data: a, status: r.status, statusText: r.statusText, headers: r.headers })];}
        });
      });
    }, t;
  }(),
      K = function () {
    function t(t) {
      this.appkey = t;
    }return t.prototype.getItem = function (t) {
      try {
        return window.localStorage.getItem(this.getStoreKey(t));
      } catch (t) {
        return "";
      }
    }, t.prototype.removeItem = function (t) {
      try {
        window.localStorage.removeItem(this.getStoreKey(t));
      } catch (t) {}
    }, t.prototype.setItem = function (t, e) {
      try {
        window.localStorage.setItem(this.getStoreKey(t), e);
      } catch (t) {}
    }, t.prototype.setSessionItem = function (t, e) {
      try {
        window.sessionStorage.setItem(this.getStoreKey(t), e);
      } catch (t) {}
    }, t.prototype.getSessionItem = function (t) {
      try {
        return window.sessionStorage.getItem(this.getStoreKey(t));
      } catch (t) {
        return "";
      }
    }, t.prototype.getStoreKey = function (t) {
      return o + this.appkey + "_" + t;
    }, t.prototype.createDeviceId = function () {
      try {
        var t = window.localStorage.getItem(i);return t || (t = function (t) {
          for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789", r = "", n = 0; n < t; n++) r += e.charAt(Math.floor(Math.random() * e.length));return r;
        }(32), window.localStorage.setItem(i, t)), t;
      } catch (t) {
        return "";
      }
    }, t.prototype.clear = function () {
      try {
        for (var t = window.localStorage.length, e = 0; e < t; e++) {
          var r = window.localStorage.key(e);(null == r ? void 0 : r.substr(0, 9)) == o && window.localStorage.removeItem(r);
        }
      } catch (t) {}
    }, t.prototype.getStoreCount = function () {
      var t = 0;try {
        t = window.localStorage.length;
      } catch (t) {}return t;
    }, t;
  }();"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;var W = function (t) {
    var e = { exports: {} };return t(e, e.exports), e.exports;
  }(function (t, e) {
    t.exports = function () {
      function t(t, e, r, n, o, i, a) {
        try {
          var s = t[i](a),
              c = s.value;
        } catch (t) {
          return void r(t);
        }s.done ? e(c) : Promise.resolve(c).then(n, o);
      }function e(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
      }var r,
          n = (function (t) {
        t = function (t) {
          var e,
              r = Object.prototype,
              n = r.hasOwnProperty,
              o = "function" == typeof Symbol ? Symbol : {},
              i = o.iterator || "@@iterator",
              a = o.asyncIterator || "@@asyncIterator",
              s = o.toStringTag || "@@toStringTag";function c(t, e, r) {
            return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
          }try {
            c({}, "");
          } catch (r) {
            c = function (t, e, r) {
              return t[e] = r;
            };
          }function u(t, r, n, o) {
            var i, a, s, c;return r = r && r.prototype instanceof y ? r : y, r = Object.create(r.prototype), o = new k(o || []), r._invoke = (i = t, a = n, s = o, c = h, function (t, r) {
              if (c === p) throw new Error("Generator is already running");if (c === d) {
                if ("throw" === t) throw r;return C();
              }for (s.method = t, s.arg = r;;) {
                var n = s.delegate;if (n) {
                  var o = function t(r, n) {
                    var o;if ((o = r.iterator[n.method]) === e) {
                      if (n.delegate = null, "throw" === n.method) {
                        if (r.iterator.return && (n.method = "return", n.arg = e, t(r, n), "throw" === n.method)) return v;n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
                      }return v;
                    }return "throw" === (o = l(o, r.iterator, n.arg)).type ? (n.method = "throw", n.arg = o.arg, n.delegate = null, v) : (o = o.arg) ? o.done ? (n[r.resultName] = o.value, n.next = r.nextLoc, "return" !== n.method && (n.method = "next", n.arg = e), n.delegate = null, v) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, v);
                  }(n, s);if (o) {
                    if (o === v) continue;return o;
                  }
                }if ("next" === s.method) s.sent = s._sent = s.arg;else if ("throw" === s.method) {
                  if (c === h) throw c = d, s.arg;s.dispatchException(s.arg);
                } else "return" === s.method && s.abrupt("return", s.arg);if (c = p, "normal" === (o = l(i, a, s)).type) {
                  if (c = s.done ? d : f, o.arg !== v) return { value: o.arg, done: s.done };
                } else "throw" === o.type && (c = d, s.method = "throw", s.arg = o.arg);
              }
            }), r;
          }function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }t.wrap = u;var h = "suspendedStart",
              f = "suspendedYield",
              p = "executing",
              d = "completed",
              v = {};function y() {}function g() {}function m() {}var w = {};w[i] = function () {
            return this;
          }, (o = (o = Object.getPrototypeOf) && o(o(x([])))) && o !== r && n.call(o, i) && (w = o);var b = m.prototype = y.prototype = Object.create(w);function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              c(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }function E(t, e) {
            var r;this._invoke = function (o, i) {
              function a() {
                return new e(function (r, a) {
                  !function r(o, i, a, s) {
                    if ("throw" !== (o = l(t[o], t, i)).type) {
                      var c = o.arg;return (i = c.value) && "object" == typeof i && n.call(i, "__await") ? e.resolve(i.__await).then(function (t) {
                        r("next", t, a, s);
                      }, function (t) {
                        r("throw", t, a, s);
                      }) : e.resolve(i).then(function (t) {
                        c.value = t, a(c);
                      }, function (t) {
                        return r("throw", t, a, s);
                      });
                    }s(o.arg);
                  }(o, i, r, a);
                });
              }return r = r ? r.then(a, a) : a();
            };
          }function I(t) {
            var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
          }function O(t) {
            var e = t.completion || {};e.type = "normal", delete e.arg, t.completion = e;
          }function k(t) {
            this.tryEntries = [{ tryLoc: "root" }], t.forEach(I, this), this.reset(!0);
          }function x(t) {
            if (t) {
              if (r = t[i]) return r.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
                var r,
                    o = -1;return (r = function r() {
                  for (; ++o < t.length;) if (n.call(t, o)) return r.value = t[o], r.done = !1, r;return r.value = e, r.done = !0, r;
                }).next = r;
              }
            }return { next: C };
          }function C() {
            return { value: e, done: !0 };
          }return ((g.prototype = b.constructor = m).constructor = g).displayName = c(m, s, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
            return !!(t = "function" == typeof t && t.constructor) && (t === g || "GeneratorFunction" === (t.displayName || t.name));
          }, t.mark = function (t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, c(t, s, "GeneratorFunction")), t.prototype = Object.create(b), t;
          }, t.awrap = function (t) {
            return { __await: t };
          }, S(E.prototype), E.prototype[a] = function () {
            return this;
          }, t.AsyncIterator = E, t.async = function (e, r, n, o, i) {
            void 0 === i && (i = Promise);var a = new E(u(e, r, n, o), i);return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
          }, S(b), c(b, s, "Generator"), b[i] = function () {
            return this;
          }, b.toString = function () {
            return "[object Generator]";
          }, t.keys = function (t) {
            var e,
                r = [];for (e in t) r.push(e);return r.reverse(), function e() {
              for (; r.length;) {
                var n = r.pop();if (n in t) return e.value = n, e.done = !1, e;
              }return e.done = !0, e;
            };
          }, t.values = x, k.prototype = { constructor: k, reset: function (t) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(O), !t) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
            }, stop: function () {
              this.done = !0;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
            }, dispatchException: function (t) {
              if (this.done) throw t;var r = this;function o(n, o) {
                return s.type = "throw", s.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o;
              }for (var i = this.tryEntries.length - 1; 0 <= i; --i) {
                var a = this.tryEntries[i],
                    s = a.completion;if ("root" === a.tryLoc) return o("end");if (a.tryLoc <= this.prev) {
                  var c = n.call(a, "catchLoc"),
                      u = n.call(a, "finallyLoc");if (c && u) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  } else if (c) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  } else {
                    if (!u) throw new Error("try statement without catch or finally");if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  }
                }
              }
            }, abrupt: function (t, e) {
              for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                var o = this.tryEntries[r];if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                  var i = o;break;
                }
              }var a = (i = i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc ? null : i) ? i.completion : {};return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, v) : this.complete(a);
            }, complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), v;
            }, finish: function (t) {
              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r = this.tryEntries[e];if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), v;
              }
            }, catch: function (t) {
              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r = this.tryEntries[e];if (r.tryLoc === t) {
                  var n,
                      o = r.completion;return "throw" === o.type && (n = o.arg, O(r)), n;
                }
              }throw new Error("illegal catch attempt");
            }, delegateYield: function (t, r, n) {
              return this.delegate = { iterator: x(t), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = e), v;
            } }, t;
        }(t.exports);try {
          regeneratorRuntime = t;
        } catch (e) {
          Function("r", "regeneratorRuntime = r")(t);
        }
      }(r = { exports: {} }), r.exports);return function () {
        function r(t) {
          !function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, r), this.version = "1.0.0";var e = Array.prototype.map,
              n = Array.prototype.forEach;t && (this.hasher = t), this.each = function (t, e, r) {
            if (null != t) if (n && t.forEach === n) t.forEach(e, r);else if (t.length === +t.length) {
              for (var o = 0, i = t.length; o < i; o++) if (e.call(r, t[o], o, t) === {}) return;
            } else for (var a in t) if (t.hasOwnProperty(a) && e.call(r, t[a], a, t) === {}) return;
          }, this.map = function (t, r, n) {
            var o = [];return null == t ? o : e && t.map === e ? t.map(r, n) : (this.each(t, function (t, e, i) {
              o[o.length] = r.call(n, t, e, i);
            }), o);
          };
        }var o, i, a, s;return o = r, (i = [{ key: "getQimei36", value: function (t, e) {
            var r = this;this.getHid().then(function (n) {
              var o = "3BJr" + t.substring(0, 2) + (n && n.substring(3, 7)),
                  i = new XMLHttpRequest();i.open("POST", "https://snowflake.qq.com/ola/h5", !0), i.setRequestHeader("Content-Type", "application/json"), i.onreadystatechange = function () {
                if (i.readyState == XMLHttpRequest.DONE && 200 == i.status) try {
                  e && e(JSON.parse(i.responseText));
                } catch (t) {
                  e(null);
                }
              }, i.send(JSON.stringify({ appKey: t, hid: n, sign: o, version: r.version }));
            });
          } }, { key: "getHid", value: (a = n.mark(function t() {
            var e, r;return n.wrap(function (t) {
              for (;;) switch (t.prev = t.next) {case 0:
                  return (e = []).push((n = void 0, (n = [Math.floor(window.screen.width * window.devicePixelRatio), Math.floor(window.screen.height * window.devicePixelRatio)]).sort().reverse(), n.join("x"))), e.push((n = void 0, (n = [Math.floor(window.screen.availWidth * window.devicePixelRatio), Math.floor(window.screen.availHeight * window.devicePixelRatio)]).sort().reverse(), n.join("x"))), e.push(navigator.deviceMemory), e.push(!!window.sessionStorage), e.push(!!window.indexedDB), e.push(navigator.productSub), e.push(navigator.hardwareConcurrency), e.push(this.getWebglVendorAndRenderer()), e.push(new Date().getTimezoneOffset()), t.next = 12, this.getFactor();case 12:
                  if (r = t.sent, e.push(r), this.hasher) return t.abrupt("return", this.hasher(e.join("###"), 31));t.next = 18;break;case 18:
                  return t.abrupt("return", this.x64hash128(e.join("###"), 31));case 19:case "end":
                  return t.stop();}var n;
            }, t, this);
          }), s = function () {
            var e = this,
                r = arguments;return new Promise(function (n, o) {
              var i = a.apply(e, r);function s(e) {
                t(i, n, o, s, c, "next", e);
              }function c(e) {
                t(i, n, o, s, c, "throw", e);
              }s(void 0);
            });
          }, function () {
            return s.apply(this, arguments);
          }) }, { key: "getUserAgent", value: function () {
            return navigator.userAgent;
          } }, { key: "getNative", value: function () {
            var t = this;this.getHid().then(function (e) {
              JSInterface.callback(t.version, e, t.getUserAgent());
            });
          } }, { key: "getWebglVendorAndRenderer", value: function () {
            try {
              var t = function () {
                var t = document.createElement("canvas"),
                    e = null;try {
                  e = t.getContext("webgl") || t.getContext("experimental-webgl");
                } catch (t) {}return e || null;
              }(),
                  e = t.getExtension("WEBGL_debug_renderer_info"),
                  r = [t.getParameter(e.UNMASKED_VENDOR_WEBGL), t.getParameter(e.UNMASKED_RENDERER_WEBGL)].join("~"),
                  n = t.getExtension("WEBGL_lose_context");return null != n && n.loseContext(), r;
            } catch (t) {
              return null;
            }
          } }, { key: "getFactor", value: function () {
            return new Promise(function (t, e) {
              var r = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;r ? function () {
                var e = new r({ iceServers: [] });e.createDataChannel("", { reliable: !1 }), e.onicecandidate = function (t) {
                  t.candidate && i("a=".concat(t.candidate.candidate));
                }, e.createOffer(function (t) {
                  i(t.sdp), e.setLocalDescription(t);
                }, function (t) {});var n = Object.create(null);function o(e) {
                  if (!(e in n)) {
                    n[e] = !0;for (var r = Object.keys(n).filter(function (t) {
                      return n[t];
                    }), o = 0; o < r.length; o++) 16 < r[o].length && (r.splice(o, 1), o--);t(r[0]);
                  }
                }function i(t) {
                  (0 < arguments.length && void 0 !== t ? t : "").split("\r\n").forEach(function (t, e, r) {
                    var n, i;~t.indexOf("a=candidate") ? (i = (n = t.split(" "))[4], "host" === n[7] && o(i)) : ~t.indexOf("c=") && o(t.split(" ")[2]);
                  });
                }n["0.0.0.0"] = !1;
              }() : t(null);
            });
          } }, { key: "x64hash128", value: function (t, e) {
            for (var r = function (t, e) {
              t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];var r = [0, 0, 0, 0];return r[3] += t[3] + e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] + e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] + e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] + e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];
            }, n = function (t, e) {
              t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];var r = [0, 0, 0, 0];return r[3] += t[3] * e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] * e[3], r[1] += r[2] >>> 16, r[2] &= 65535, r[2] += t[3] * e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] * e[3], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[2] * e[2], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[3] * e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];
            }, o = function (t, e) {
              return 32 == (e %= 64) ? [t[1], t[0]] : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e | t[0] >>> 32 - e] : [t[1] << (e -= 32) | t[0] >>> 32 - e, t[0] << e | t[1] >>> 32 - e];
            }, i = function (t, e) {
              return 0 == (e %= 64) ? t : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e] : [t[1] << e - 32, 0];
            }, a = function (t, e) {
              return [t[0] ^ e[0], t[1] ^ e[1]];
            }, s = function (t) {
              return t = a(t, [0, t[0] >>> 1]), t = n(t, [4283543511, 3981806797]), t = a(t, [0, t[0] >>> 1]), t = n(t, [3301882366, 444984403]), a(t, [0, t[0] >>> 1]);
            }, c = (t = t || "").length % 16, u = t.length - c, l = [0, e = e || 0], h = [0, e], f = [0, 0], p = [0, 0], d = [2277735313, 289559509], v = [1291169091, 658871167], y = 0; y < u; y += 16) f = [255 & t.charCodeAt(y + 4) | (255 & t.charCodeAt(y + 5)) << 8 | (255 & t.charCodeAt(y + 6)) << 16 | (255 & t.charCodeAt(y + 7)) << 24, 255 & t.charCodeAt(y) | (255 & t.charCodeAt(y + 1)) << 8 | (255 & t.charCodeAt(y + 2)) << 16 | (255 & t.charCodeAt(y + 3)) << 24], p = [255 & t.charCodeAt(y + 12) | (255 & t.charCodeAt(y + 13)) << 8 | (255 & t.charCodeAt(y + 14)) << 16 | (255 & t.charCodeAt(y + 15)) << 24, 255 & t.charCodeAt(y + 8) | (255 & t.charCodeAt(y + 9)) << 8 | (255 & t.charCodeAt(y + 10)) << 16 | (255 & t.charCodeAt(y + 11)) << 24], f = o(f = n(f, d), 31), f = n(f, v), l = r(l = o(l = a(l, f), 27), h), l = r(n(l, [0, 5]), [0, 1390208809]), p = o(p = n(p, v), 33), p = n(p, d), h = r(h = o(h = a(h, p), 31), l), h = r(n(h, [0, 5]), [0, 944331445]);switch (f = [0, 0], p = [0, 0], c) {case 15:
                p = a(p, i([0, t.charCodeAt(y + 14)], 48));case 14:
                p = a(p, i([0, t.charCodeAt(y + 13)], 40));case 13:
                p = a(p, i([0, t.charCodeAt(y + 12)], 32));case 12:
                p = a(p, i([0, t.charCodeAt(y + 11)], 24));case 11:
                p = a(p, i([0, t.charCodeAt(y + 10)], 16));case 10:
                p = a(p, i([0, t.charCodeAt(y + 9)], 8));case 9:
                p = a(p, [0, t.charCodeAt(y + 8)]), p = o(p = n(p, v), 33), p = n(p, d), h = a(h, p);case 8:
                f = a(f, i([0, t.charCodeAt(y + 7)], 56));case 7:
                f = a(f, i([0, t.charCodeAt(y + 6)], 48));case 6:
                f = a(f, i([0, t.charCodeAt(y + 5)], 40));case 5:
                f = a(f, i([0, t.charCodeAt(y + 4)], 32));case 4:
                f = a(f, i([0, t.charCodeAt(y + 3)], 24));case 3:
                f = a(f, i([0, t.charCodeAt(y + 2)], 16));case 2:
                f = a(f, i([0, t.charCodeAt(y + 1)], 8));case 1:
                f = a(f, [t.charCodeAt(y)]), f = o(f = n(f, d), 31), f = n(f, v), l = a(l, f);}return l = a(l, [0, t.length]), h = r(h = a(h, [0, t.length]), l = r(l, h)), l = s(l), h = r(h = s(h), l = r(l, h)), ("00000000" + (l[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (l[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[1] >>> 0).toString(16)).slice(-8);
          } }]) && e(o.prototype, i), r;
      }();
    }();
  }),
      H = "logid_start",
      z = "4.5.6-web";return function (r) {
    function n(t) {
      var e = r.call(this, t) || this;e.qimei36 = "", e.uselessCycleTaskNum = 0, e.underWeakNet = !1, e.send = function (t, r, n) {
        e.storage.setItem(a, Date.now().toString()), e.network.post(e.uploadUrl || e.strategy.getUploadUrl(), t.data).then(function (n) {
          var o;100 == (null === (o = null == n ? void 0 : n.data) || void 0 === o ? void 0 : o.result) ? e.delayTime = 1e3 * n.data.delayTime : e.delayTime = 0, r && r(t.data), t.data.events.forEach(function (t) {
            e.store.removeEvent(t).then(function () {
              e.removeSendingId(p(t.mapValue));
            });
          }), e.doCustomCycleTask();
        }).catch(function (r) {
          var o = t.data.events;e.errorReport.reportError(r.code ? r.code.toString() : "600", r.message), n && n(t.data);var i = JSON.parse(e.storage.getItem(s));o.forEach(function (t) {
            i && -1 != i.indexOf(p(t)) && e.store.insertEvent(t, function (t, r) {
              t && e.errorReport.reportError("604", "insertEvent fail!");
            }), e.removeSendingId(p(t));
          }), e.monitorUploadFailed();
        });
      };var n,
          o,
          i = b();return e.isUnderIE8 = i > 0 && i < 8, e.isUnderIE8 || (e.isUnderIE = i > 0, t.needInitQimei && e.initQimei(t.appkey), e.network = new Q(t), e.storage = new K(t.appkey), e.initCommonInfo(t), e.store = new _(t.appkey, e.storage), e.errorReport = new y(e.config, e.commonInfo, "web", e.network), e.strategy = new g(e.config, e.commonInfo, e.storage, e.network), e.logidStartTime = e.storage.getItem(H), e.logidStartTime || (e.logidStartTime = Date.now().toString(), e.storage.setItem(H, e.logidStartTime)), n = e.logidStartTime, o = Date.now() - Number.parseFloat(n), Math.floor(o / 864e5) >= 365 && e.storage.clear(), e.initSession(t), e.onDirectUserAction("rqd_js_init", {}), setTimeout(function () {
        return e.lifeCycle.emit("init");
      }, 0), e.initDelayTime = t.delay ? t.delay : 1e3, e.cycleTask(e.initDelayTime)), e;
    }return function (e, r) {
      if ("function" != typeof r && null !== r) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");function n() {
        this.constructor = e;
      }t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n());
    }(n, r), n.prototype.initQimei = function (t) {
      var e = this;new W().getQimei36(t, function (t) {
        e.qimei36 = t.q36;
      });
    }, n.prototype.initSession = function (t) {
      var e = 18e5;t.sessionDuration && t.sessionDuration > 3e4 && (e = t.sessionDuration), this.beaconSession = new w(this.storage, e, this);
    }, n.prototype.initCommonInfo = function (t) {
      var e = Number(this.storage.getItem(a));try {
        var r = JSON.parse(this.storage.getItem(s));(Date.now() - e > 3e4 || !r) && this.storage.setItem(s, JSON.stringify([]));
      } catch (t) {}t.uploadUrl && (this.uploadUrl = t.uploadUrl + "?appkey=" + t.appkey);var n = [window.screen.width, window.screen.height];window.devicePixelRatio && n.push(window.devicePixelRatio), this.commonInfo = { deviceId: this.storage.createDeviceId(), language: navigator && navigator.language || "zh_CN", query: window.location.search, userAgent: navigator.userAgent, pixel: n.join("*"), channelID: t.channelID ? String(t.channelID) : "", openid: t.openid ? String(t.openid) : "", unid: t.unionid ? String(t.unionid) : "", sdkVersion: z }, this.config.appVersion = t.versionCode ? String(t.versionCode) : "", this.config.strictMode = t.strictMode;
    }, n.prototype.cycleTask = function (t) {
      var e = this;this.intervalID = window.setInterval(function () {
        e.store.getEvents().then(function (t) {
          var r = [],
              n = JSON.parse(e.storage.getItem(s));n || (n = []), t && t.forEach(function (t) {
            var e = p(t.mapValue);-1 == n.indexOf(e) && (r.push(t), n.push(e));
          }), 0 != r.length && (e.storage.setItem(s, JSON.stringify(n)), e._normalLogPipeline(e.assembleData(r)));
        }).catch(function (t) {});
      }, t);
    }, n.prototype.onReport = function (t, e, r) {
      var n = this;if (this.isUnderIE8) this.errorReport.reportError("601", "UnderIE8");else {
        var o = this.generateData(t, e, r);if (r && 0 == this.delayTime && !this.underWeakNet) this._normalLogPipeline(this.assembleData(o));else {
          var i = o.shift();i && this.store.insertEvent(i, function (t) {
            t && n.errorReport.reportError("604", "insertEvent fail!");
          }).catch(function (t) {
            n._normalLogPipeline(n.assembleData(o));
          });
        }
      }
    }, n.prototype.onSendBeacon = function (t, e) {
      if (this.isUnderIE) this.errorReport.reportError("605", "UnderIE");else {
        var r = this.assembleData(this.generateData(t, e, !0));"function" == typeof navigator.sendBeacon && navigator.sendBeacon(this.uploadUrl || this.strategy.getUploadUrl(), JSON.stringify(r));
      }
    }, n.prototype.generateData = function (t, r, n) {
      var o = [],
          i = "4.5.6-web_" + (n ? "direct_log_id" : "normal_log_id"),
          a = Number(this.storage.getItem(i));return a = a || 1, r = e(e({}, r), { A99: n ? "Y" : "N", A100: a.toString(), A72: z, A88: this.logidStartTime }), a++, this.storage.setItem(i, a.toString()), o.push({ eventCode: t, eventTime: Date.now().toString(), mapValue: h(r, this.config.strictMode) }), o;
    }, n.prototype.assembleData = function (t) {
      var r = this.beaconSession.getSession();return { appVersion: this.config.appVersion ? f(this.config.appVersion) : "", sdkId: "js", sdkVersion: z, mainAppKey: this.config.appkey, platformId: 3, common: h(e(e({}, this.additionalParams), { A2: this.commonInfo.deviceId, A8: this.commonInfo.openid, A12: this.commonInfo.language, A17: this.commonInfo.pixel, A23: this.commonInfo.channelID, A50: this.commonInfo.unid, A76: r.sessionId, A101: this.commonInfo.userAgent, A102: window.location.href, A104: document.referrer, A119: this.commonInfo.query, A153: this.qimei36 }), !1), events: t };
    }, n.prototype.monitorUploadFailed = function () {
      this.uselessCycleTaskNum++, this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(6e4), this.underWeakNet = !0);
    }, n.prototype.doCustomCycleTask = function () {
      this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(this.initDelayTime)), this.uselessCycleTaskNum = 0, this.underWeakNet = !1;
    }, n;
  }(v);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(6);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var REQUEST = __webpack_require__(19);
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

    var SignHost = '';
    var standardHost = region ? 'cos.' + region + '.myqcloud.com' : 'service.cos.myqcloud.com';
    var urlHost = domain.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
    if (standardHost === urlHost) SignHost = standardHost;

    submitRequest.call(this, {
        Action: 'name/cos:GetService',
        url: domain,
        method: 'GET',
        headers: params.Headers,
        SignHost: SignHost
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
        !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});
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
            var Domains = util.makeArray(RefererConfiguration['DomainList'].Domain || []);
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
<<<<<<< HEAD
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
    var useAccelerate = params.UseAccelerate === undefined ? self.options.UseAccelerate : params.UseAccelerate;
    var url = getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: params.Protocol || self.options.Protocol,
        domain: params.Domain || self.options.Domain,
        bucket: params.Bucket,
        region: useAccelerate ? 'accelerate' : params.Region,
        object: params.Key
    });

    var queryParamsStr = '';
    if (params.Query) {
        queryParamsStr += util.obj2str(params.Query);
    }
    if (params.QueryString) {
        queryParamsStr += (queryParamsStr ? '&' : '') + params.QueryString;
    }

    var syncUrl = url;
    if (params.Sign !== undefined && !params.Sign) {
        queryParamsStr && (syncUrl += '?' + queryParamsStr);
        callback(null, { Url: syncUrl });
        return syncUrl;
    }

    // 签名加上 Host，避免跨桶访问
    var SignHost = getSignHost.call(this, { Bucket: params.Bucket, Region: params.Region, UseAccelerate: params.UseAccelerate, Url: url });
    var AuthData = getAuthorizationAsync.call(this, {
        Action: (params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject',
        Bucket: params.Bucket || '',
        Region: params.Region || '',
        Method: params.Method || 'get',
        Key: params.Key,
        Expires: params.Expires,
        Headers: params.Headers,
        Query: params.Query,
        SignHost: SignHost,
        ForceSignHost: params.ForceSignHost === false ? false : self.options.ForceSignHost // getObjectUrl支持传参ForceSignHost
    }, function (err, AuthData) {
        if (!callback) return;
        if (err) {
            callback(err);
            return;
=======
        headers: params.Headers,
        action: 'inventory',
        qs: {
            'continuation-token': params['ContinuationToken']
>>>>>>> upd 暂存
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

<<<<<<< HEAD
var getSignHost = function (opt) {
    if (!opt.Bucket || !opt.Region) return '';
    var useAccelerate = opt.UseAccelerate === undefined ? this.options.UseAccelerate : opt.UseAccelerate;
    var url = opt.Url || getUrl({
        ForcePathStyle: this.options.ForcePathStyle,
        protocol: this.options.Protocol,
        domain: this.options.Domain,
        bucket: opt.Bucket,
        region: useAccelerate ? 'accelerate' : opt.Region
=======
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
>>>>>>> upd 暂存
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

function putBucketEncryption(params, callback) {
    var conf = params.ServerSideEncryptionConfiguration || {};
    var Rules = conf.Rule || conf.Rules || [];
    var xml = util.json2xml({ ServerSideEncryptionConfiguration: { Rule: Rules } });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketEncryption',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'encryption',
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

function getBucketEncryption(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketEncryption',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'encryption'
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.code === 'NoSuchEncryptionConfiguration') {
                var result = {
                    EncryptionConfiguration: { Rules: [] },
                    statusCode: err.statusCode
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Rules = util.makeArray(data.EncryptionConfiguration && data.EncryptionConfiguration.Rule || []);
        data.EncryptionConfiguration = { Rules: Rules };
        callback(err, data);
    });
}

function deleteBucketEncryption(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketReplication',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'encryption'
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

<<<<<<< HEAD
    var calcAuthByTmpKey = function () {
        var KeyTime = '';
        if (StsData.StartTime && params.Expires) KeyTime = StsData.StartTime + ';' + (StsData.StartTime + params.Expires * 1);else if (StsData.StartTime && StsData.ExpiredTime) KeyTime = StsData.StartTime + ';' + StsData.ExpiredTime;
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
            KeyTime: KeyTime,
            ForceSignHost: forceSignHost
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
            SystemClockOffset: self.options.SystemClockOffset,
            ForceSignHost: forceSignHost
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
                SystemClockOffset: self.options.SystemClockOffset,
                ForceSignHost: forceSignHost
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
=======
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
>>>>>>> upd 暂存
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
    var reqParamsStr = params.QueryString || '';
    var onProgress = util.throttleOnProgress.call(this, 0, params.onProgress);
    var tracker = params.tracker;
    tracker.setParams({ signStartTime: new Date().getTime() });

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
        qsStr: reqParamsStr,
        rawBody: true,
        onDownloadProgress: onProgress,
        tracker: tracker
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

    var tracker = params.tracker;
    needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });

    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
        if (md5) {
            tracker && tracker.setParams({ md5EndTime: new Date().getTime() });
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
            onProgress: onProgress,
            tracker: tracker
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
                region: !self.options.UseAccelerate ? params.Region : 'accelerate',
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
        VersionId: params.VersionId,
        action: params.Recursive ? 'recursive' : ''
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

<<<<<<< HEAD
module.exports.init = function (COS, task) {
    task.transferToTaskMethod(API_MAP, 'putObject');
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
        warnOldApi(apiName, fn, COS.prototype);
    });
};

/***/ }),
/* 20 */
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
=======
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
>>>>>>> upd 暂存

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
    var self = this;
    var headers = params.Headers;
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';

    var CopySource = params.CopySource || '';
    var m = util.getSourceParams.call(this, CopySource);
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
        var url = getUrl({
            ForcePathStyle: self.options.ForcePathStyle,
            protocol: self.options.Protocol,
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            object: params.Key,
            isLocation: true
        });
        util.extend(result, {
            Location: url,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function uploadPartCopy(params, callback) {

    var CopySource = params.CopySource || '';
    var m = util.getSourceParams.call(this, CopySource);
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

<<<<<<< HEAD
/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(5);
<<<<<<< HEAD
var Async = __webpack_require__(22);
=======
var Async = __webpack_require__(19);
>>>>>>> upd
var EventProxy = __webpack_require__(4).EventProxy;
var util = __webpack_require__(0);
var Reporter = __webpack_require__(20);
=======
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
>>>>>>> upd 暂存

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
    var tracker = params.tracker;

    // 特殊处理 Cache-Control、Content-Type
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';

    var needCalcMd5 = params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5);
    needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });

    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
        if (md5) params.Headers['x-cos-meta-md5'] = md5;
        needCalcMd5 && tracker && tracker.setParams({ md5EndTime: new Date().getTime() });
        submitRequest.call(self, {
            Action: 'name/cos:InitiateMultipartUpload',
            method: 'POST',
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            action: 'uploads',
            headers: params.Headers,
            qs: params.Query,
            tracker: tracker
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
        var tracker = params.tracker;
        var needCalcMd5 = self.options.UploadCheckContentMd5;
        needCalcMd5 && tracker && tracker.setParams({ md5StartTime: new Date().getTime() });
        util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
            if (md5) params.Headers['Content-MD5'] = util.binaryBase64(md5);
            needCalcMd5 && tracker && tracker.setParams({ md5EndTime: new Date().getTime(), partNumber: params['PartNumber'] });
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
                body: params.Body || null,
                tracker: tracker
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

    var tracker = params.tracker;

    for (var i = 0, len = Parts.length; i < len; i++) {
        if (Parts[i]['ETag'] && Parts[i]['ETag'].indexOf('"') === 0) {
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
        headers: headers,
        tracker: tracker
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

    var tracker = params.tracker;
    tracker && tracker.setParams({ signStartTime: new Date().getTime() });

    submitRequest.call(this, {
        Action: 'name/cos:ListMultipartUploads',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
        action: 'uploads',
        tracker: tracker
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
function request(params, callback) {
    submitRequest.call(this, {
        method: params.Method,
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: params.Action,
        headers: params.Headers,
        qs: params.Query,
        body: params.Body,
        Url: params.Url,
        rawBody: params.RawBody,
        DataType: params.DataType
    }, function (err, data) {
        if (err) return callback(err);
        if (data && data.body) {
            data.Body = data.body;
            delete data.body;
        }
        callback(err, data);
    });
}

/**
 * 追加上传
 * @param  {Object}  params                                         参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 object名称，必须
 *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串
 *     @param  {Number}  params.Position                            追加操作的起始点，单位为字节，必须
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
 * @param  {Function}  callback                                     回调函数，必须
 *     @return  {Object}    err                                     请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data                                    返回的数据
 */
function appendObject(params, callback) {
    // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里
    var headers = params.Headers;
    if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
    submitRequest.call(this, {
        Action: 'name/cos:AppendObject',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        action: 'append',
        Key: params.Key,
        body: params.Body,
        qs: {
            position: params.Position
        },
        headers: params.Headers
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
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
        Bucket: params.Bucket,
        Region: params.Region,
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

    var queryParamsStr = '';
    if (params.Query) {
        queryParamsStr += util.obj2str(params.Query);
    }
    if (params.QueryString) {
        queryParamsStr += (queryParamsStr ? '&' : '') + params.QueryString;
    }

    var syncUrl = url;
    if (params.Sign !== undefined && !params.Sign) {
        queryParamsStr && (syncUrl += '?' + queryParamsStr);
        callback(null, { Url: syncUrl });
        return syncUrl;
    }

    // 签名加上 Host，避免跨桶访问
    var SignHost = getSignHost.call(this, { Bucket: params.Bucket, Region: params.Region, Url: url });
    var AuthData = getAuthorizationAsync.call(this, {
        Action: (params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject',
        Bucket: params.Bucket || '',
        Region: params.Region || '',
        Method: params.Method || 'get',
        Key: params.Key,
        Expires: params.Expires,
        Headers: params.Headers,
        Query: params.Query,
        SignHost: SignHost,
        ForceSignHost: params.ForceSignHost === false ? false : self.options.ForceSignHost // getObjectUrl支持传参ForceSignHost
    }, function (err, AuthData) {
        if (!callback) return;
        if (err) {
            callback(err);
            return;
        }

        // 兼容万象url qUrlParamList需要再encode一次
        var replaceUrlParamList = function (url) {
            var urlParams = url.match(/q-url-param-list.*?(?=&)/g)[0];
            var encodedParams = 'q-url-param-list=' + encodeURIComponent(urlParams.replace(/q-url-param-list=/, '')).toLowerCase();
            var reg = new RegExp(urlParams, 'g');
            var replacedUrl = url.replace(reg, encodedParams);
            return replacedUrl;
        };

        var signUrl = url;
        signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ? replaceUrlParamList(AuthData.Authorization) : 'sign=' + encodeURIComponent(AuthData.Authorization));
        AuthData.SecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.SecurityToken);
        AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);
        AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);
        AuthData.Token && (signUrl += '&token=' + AuthData.Token);
        queryParamsStr && (signUrl += '&' + queryParamsStr);
        setTimeout(function () {
            callback(null, { Url: signUrl });
        });
    });
    if (AuthData) {
        syncUrl += '?' + AuthData.Authorization + (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
        queryParamsStr && (syncUrl += '&' + queryParamsStr);
    } else {
        queryParamsStr && (syncUrl += '?' + queryParamsStr);
    }
    return syncUrl;
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
    var region = params.region || '';
    var longBucket = params.bucket || '';
    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
    var domain = params.domain;
    var object = params.object;
    if (typeof domain === 'function') {
        domain = domain({ Bucket: longBucket, Region: region });
    }
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

var getSignHost = function (opt) {
    if (!opt.Bucket || !opt.Region) return '';
    var url = opt.Url || getUrl({
        ForcePathStyle: this.options.ForcePathStyle,
        protocol: this.options.Protocol,
        domain: this.options.Domain,
        bucket: opt.Bucket,
        region: this.options.UseAccelerate ? 'accelerate' : opt.Region
    });
    var urlHost = url.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
    var standardHostReg = new RegExp('^([a-z\\d-]+-\\d+\\.)?(cos|cosv6|ci|pic)\\.([a-z\\d-]+)\\.myqcloud\\.com$');
    if (standardHostReg.test(urlHost)) return urlHost;
    return '';
};

// 异步获取签名
function getAuthorizationAsync(params, callback) {
    var headers = util.clone(params.Headers);
    var headerHost = '';
    util.each(headers, function (v, k) {
        (v === '' || ['content-type', 'cache-control', 'expires'].indexOf(k.toLowerCase()) > -1) && delete headers[k];
        if (k.toLowerCase() === 'host') headerHost = v;
    });
    // ForceSignHost明确传入false才不加入host签名
    var forceSignHost = params.ForceSignHost === false ? false : true;

    // Host 加入签名计算
    if (!headerHost && params.SignHost && forceSignHost) headers.Host = params.SignHost;

    // 获取凭证的回调，避免用户 callback 多次
    var cbDone = false;
    var cb = function (err, AuthData) {
        if (cbDone) return;
        cbDone = true;
        if (AuthData && AuthData.XCosSecurityToken && !AuthData.SecurityToken) {
            AuthData = util.clone(AuthData);
            AuthData.SecurityToken = AuthData.XCosSecurityToken;
            delete AuthData.XCosSecurityToken;
        }
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
            KeyTime: KeyTime,
            ForceSignHost: self.options.ForceSignHost
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
            SystemClockOffset: self.options.SystemClockOffset,
            ForceSignHost: self.options.ForceSignHost
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
                SystemClockOffset: self.options.SystemClockOffset,
                ForceSignHost: self.options.ForceSignHost
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

    var paramsUrl = params.url || params.Url;
    var SignHost = params.SignHost || getSignHost.call(this, { Bucket: params.Bucket, Region: params.Region, Url: paramsUrl });
    var tracker = params.tracker;
    var next = function (tryTimes) {
        var oldClockOffset = self.options.SystemClockOffset;
        tracker && tracker.setParams({ signStartTime: new Date().getTime(), retryTimes: tryTimes - 1 });
        getAuthorizationAsync.call(self, {
            Bucket: params.Bucket || '',
            Region: params.Region || '',
            Method: params.method,
            Key: params.Key,
            Query: Query,
            Headers: params.headers,
            SignHost: SignHost,
            Action: params.Action,
            ResourceKey: params.ResourceKey,
            Scope: params.Scope,
            ForceSignHost: self.options.ForceSignHost
        }, function (err, AuthData) {
            if (err) {
                callback(err);
                return;
            }
            tracker && tracker.setParams({ signEndTime: new Date().getTime(), httpStartTime: new Date().getTime() });
            params.AuthData = AuthData;
            _submitRequest.call(self, params, function (err, data) {
                tracker && tracker.setParams({ httpEndTime: new Date().getTime() });
                if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {
                    if (params.headers) {
                        delete params.headers.Authorization;
                        delete params.headers['token'];
                        delete params.headers['clientIP'];
                        delete params.headers['clientUA'];
                        params.headers['x-cos-security-token'] && delete params.headers['x-cos-security-token'];
                        params.headers['x-ci-security-token'] && delete params.headers['x-ci-security-token'];
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
    var url = params.Url || params.url;
    var body = params.body;
    var rawBody = params.rawBody;

    // url
    if (self.options.UseAccelerate) {
        region = 'accelerate';
    }
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
    if (params.qsStr) {
        if (url.indexOf('?') > -1) {
            url = url + '&' + params.qsStr;
        } else {
            url = url + '?' + params.qsStr;
        }
    }

    var opt = {
        method: method,
        url: url,
        headers: params.headers,
        qs: params.qs,
        body: body
    };

    // 兼容ci接口
    var token = 'x-cos-security-token';
    if (util.isCIHost(url)) {
        token = 'x-ci-security-token';
    }

    // 获取签名
    opt.headers.Authorization = params.AuthData.Authorization;
    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
    params.AuthData.SecurityToken && (opt.headers[token] = params.AuthData.SecurityToken);

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
    params.tracker && params.tracker.setParams({ reqUrl: opt.url });
    var sender = (self.options.Request || REQUEST)(opt, function (r) {
        if (r.error === 'abort') return;

        var receive = {
            options: opt,
            error: err,
            statusCode: response && response.statusCode || 0,
            headers: response && response.headers || {},
            body: body
        };
        self.emit('after-receive', receive);
        err = receive.error;
        body = receive.body;
        response = {
            statusCode: receive.statusCode,
            headers: receive.headers
        };

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
    putBucketEncryption: putBucketEncryption,
    getBucketEncryption: getBucketEncryption,
    deleteBucketEncryption: deleteBucketEncryption,

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
    appendObject: appendObject,

    // 分块上传相关方法
    uploadPartCopy: uploadPartCopy,
    multipartInit: multipartInit,
    multipartUpload: multipartUpload,
    multipartComplete: multipartComplete,
    multipartList: multipartList,
    multipartListPart: multipartListPart,
    multipartAbort: multipartAbort,

    // 工具方法
    request: request,
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
/* 22 */
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

    // 处理 xhrFields 属性
    if (opt.xhrFields) {
        for (var xhrField in opt.xhrFields) {
            xhr[xhrField] = opt.xhrFields[xhrField];
        }
    }

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

    // timeout
    if (opt.timeout) xhr.timeout = opt.timeout;
    xhr.ontimeout = function (event) {
        var error = new Error('timeout');
        callback(xhrRes(error, xhr));
    };

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(6);
var Async = __webpack_require__(21);
var EventProxy = __webpack_require__(5).EventProxy;
var util = __webpack_require__(0);
var Tracker = __webpack_require__(22);

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

    var tracker = params.tracker;

    // 上传过程中出现错误，返回错误
    ep.on('error', function (err) {
        if (!self._isRunningTask(TaskId)) return;
        err.UploadId = params.UploadData.UploadId || '';
        return callback(err);
    });

    // 上传分块完成，开始 uploadSliceComplete 操作
    ep.on('upload_complete', function (UploadCompleteData) {
        var _UploadCompleteData = util.extend({
            UploadId: params.UploadData.UploadId || ''
        }, UploadCompleteData);
        callback(null, _UploadCompleteData);
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
            Headers: metaHeaders,
            tracker: tracker
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
            Headers: params.Headers,
            onProgress: onProgress,
            tracker: tracker
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
                onHashProgress: onHashProgress,
                tracker: tracker
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
            Query: util.clone(params.Query),
            StorageClass: StorageClass,
            Body: params.Body,
            calledBySdk: 'sliceUploadFile',
            tracker: params.tracker
        }, params);
        var headers = util.clone(params.Headers);
        delete headers['x-cos-mime-limit'];
        _params.Headers = headers;
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
                UploadId: UploadId,
                tracker: params.tracker
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
                UploadId: UploadId,
                tracker: params.tracker
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
            Key: Key,
            tracker: params.tracker
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
        Prefix: params.Key,
        calledBySdk: params.calledBySdk || 'sliceUploadFile',
        tracker: params.tracker
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
        UploadId: params.UploadId,
        calledBySdk: 'sliceUploadFile',
        tracker: params.tracker
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
    var Headers = params.Headers;
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
            Headers: Headers,
            onProgress: function (data) {
                FinishSize += data.loaded - preAddSize;
                preAddSize = data.loaded;
                onProgress({ loaded: FinishSize, total: FileSize });
            },
            tracker: params.tracker
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (!err && !data.ETag) err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.( 获取ETag失败，请在CORS ExposeHeader设置中添加ETag，请参考文档：https://cloud.tencent.com/document/product/436/13318 )';
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
    var Headers = params.Headers || {};
    var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;

    var start = SliceSize * (PartNumber - 1);

    var ContentLength = SliceSize;

    var end = start + SliceSize;

    if (end > FileSize) {
        end = FileSize;
        ContentLength = end - start;
    }

    var headersWhiteList = ['x-cos-traffic-limit', 'x-cos-mime-limit'];
    var headers = {};
    util.each(Headers, function (v, k) {
        if (headersWhiteList.indexOf(k) > -1) {
            headers[k] = v;
        }
    });

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
                Headers: headers,
                onProgress: params.onProgress,
                calledBySdk: 'sliceUploadFile',
                tracker: params.tracker
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
            Headers: Headers,
            calledBySdk: 'sliceUploadFile',
            tracker: params.tracker
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
            Region: Region,
            calledBySdk: 'abortUploadTask'
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
            Key: Key,
            calledBySdk: 'abortUploadTask'
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

// 高级上传
function uploadFile(params, callback) {
    var self = this;

    // 判断多大的文件使用分片上传
    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

    var taskList = [];

    var Body = params.Body;
    var FileSize = Body.size || Body.length || 0;
    var fileInfo = { TaskId: '' };

    // 整理 option，用于返回给回调
    util.each(params, function (v, k) {
        if (typeof v !== 'object' && typeof v !== 'function') {
            fileInfo[k] = v;
        }
    });

    // 处理文件 TaskReady
    var _onTaskReady = params.onTaskReady;
    var onTaskReady = function (tid) {
        fileInfo.TaskId = tid;
        _onTaskReady && _onTaskReady(tid);
    };
    params.onTaskReady = onTaskReady;

    // 添加上传任务,超过阈值使用分块上传，小于等于则简单上传
    var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

    // 上传链路
    params.tracker = new Tracker({
        buctet: params.Bucket,
        region: params.Reigon,
        apiName: api,
        originApiName: 'uploadFile',
        fileKey: params.Key,
        fileSize: FileSize
    });

    // 处理文件完成
    var _onFileFinish = params.onFileFinish;
    var onFileFinish = function (err, data) {
        // 格式化上报参数并上报
        params.tracker && params.tracker.formatResult(err, data);
        params.tracker && params.tracker.sendEvents();
        _onFileFinish && _onFileFinish(err, data, fileInfo);
        callback && callback(err, data);
    };

    taskList.push({
        api: api,
        params: params,
        callback: onFileFinish
    });

    self._addTasks(taskList);
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

            // 添加上传任务
            var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

            // 单个文件上传链路
            fileParams.tracker = new Tracker({
                bucket: fileParams.Bucket,
                region: fileParams.Region,
                apiName: api,
                originApiName: 'uploadFiles',
                fileKey: fileParams.Key,
                fileSize: FileSize
            });

            // 处理单个文件完成
            var _onFileFinish = fileParams.onFileFinish;
            var onFileFinish = function (err, data) {
                // 格式化上报参数并上报
                fileParams.tracker && fileParams.tracker.formatResult(err, data);
                fileParams.tracker && fileParams.tracker.sendEvents();
                _onFileFinish && _onFileFinish(err, data);
                onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
            };

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
    var m = util.getSourceParams.call(this, CopySource);
    if (!m) {
        callback(util.error(new Error('CopySource format error')));
        return;
    }

    var SourceBucket = m.Bucket;
    var SourceRegion = m.Region;
    var SourceKey = decodeURIComponent(m.Key);
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
            Parts: Parts,
            calledBySdk: 'sliceCopyFile'
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
            Headers: TargetHeader,
            calledBySdk: 'sliceCopyFile'
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
            callback(util.error(new Error('get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.（ 获取Content-Length失败，请在CORS ExposeHeader设置中添加Content-Length，请参考文档：https://cloud.tencent.com/document/product/436/13318 ）')));
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
    uploadFile: uploadFile,
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
/* 21 */
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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


const BeaconAction = __webpack_require__(16);
const beacon = new BeaconAction({
  appkey: "0WEB0H6CDU46LPPI", // 系统或项目id, 必填
  versionCode: '0.0.1', //项目版本,选填
  channelID: 'channel', //渠道,选填
  openid: 'openid', // 用户id, 选填
  unionid: 'unid', //用户unionid , 类似idfv,选填
  strictMode: false, //严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!
  delay: 1000, // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填
  sessionDuration: 60 * 1000 // session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填
  // onReportSuccess: success, // 上报成功回调,选填
  // onReportFail: fail, // 上报失败回调,选填,
  // onReportBeforeSend: beforeSend, // 上报前回调，选填
});

var uuid = function () {
  var S4 = function () {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

// 观察者的选项（观察哪些突变）
// const config = {
//   entryTypes: ['resource', 'mark', 'measure']
// };

// const observer = new PerformanceObserver(list => {
//   list.getEntries().forEach(entry => {
//     // 在控制台上显示每个报告的测量
//     console.log(
//       `Name: ${entry.name}`,
//       `Type: ${entry.entryType}`,
//       `Start: ${entry.startTime}`,
//       `Duration: ${entry.duration}`,
//     );
//   });
// });

// // 开始观察
// observer.observe(config);
// performance.mark('registered-observer');

const uploadApi = ['putObject', 'postObject', 'appendObject', 'multipartInit', 'multipartUpload', 'multipartComplete', 'multipartList', 'multipartListPart', 'multipartAbort', 'sliceUploadFile', 'uploadFile', 'uploadFiles'];
const downloadApi = ['getObject'];

function getEventCode(apiName) {
  if (uploadApi.includes(apiName)) {
    return 'cos_upload';
  }
  if (downloadApi.includes(apiName)) {
    return 'cos_download';
  }
  return 'cos_common';
}

// 上报参数驼峰改下划线
function hump2underline(key) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
function formatParams(params) {
  const formattedParams = {};
  for (let key in params) {
    const formattedKey = hump2underline(key);
    formattedParams[formattedKey] = params[key];
  }
  return formattedParams;
}

// 链路追踪器
class Tracker {
  constructor({ traceId, bucket, region, apiName, originApiName, fileKey, fileSize, useAccelerate }) {
    const appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';
    this.beacon = beacon; // 共用一个beacon实例
    this.params = {
      traceId: traceId || uuid(), // 每条上报唯一标识
      bucket,
      region,
      appid,
      apiName, // 调用sdk最原子的api名称，比如multipartInit
      originApiName, // 分块上传可能有uploadFile、uploadFiles内部触发
      fileKey, // cos端文件路径
      fileSize, // 文件大小，上传时已知，下载时成功返回后取到。默认给-1，可能真实值是0
      useAccelerate: useAccelerate ? '1' : '0', // 使用全球加速
      md5StartTime: 0, // md5计算开始时间
      md5EndTime: 0, // md5计算结束时间
      md5AvgTime: 0, // MD5平均耗时
      signStartTime: 0, // 计算签名开始时间
      signEndTime: 0, // 计算签名结束时间
      signAvgTime: 0, // 计算签名平均耗时
      httpStartTime: 0, // 发起网络请求开始时间
      httpEndTime: 0, // 网路请求结束时间
      httpAvgTime: 0, // 网络请求平均耗时
      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时
      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时
      speed: -1, // 平均速度
      partNumber: 0, // 分块上传编号
      retryTimes: 0, // sdk内部发起的请求重试
      result: '', // sdk api调用结果success、fail
      statusCode: 0,
      errorMessage: '',
      requestId: '',
      reqUrl: '' // 请求url
    };
  }

  // 格式化sdk回调
  formatResult(err, data) {
    const now = new Date().getTime();
    var avgTime = now - this.params.startTime;
    Object.assign(this.params, {
      endTime: now,
      avgTime,
      speed: this.params.fileSize !== -1 ? (this.params.fileSize / (avgTime / 1000)).toFixed(2) : -1,
      md5AvgTime: this.params.md5EndTime - this.params.md5StartTime,
      signAvgTime: this.params.signEndTime - this.params.signStartTime,
      httpAvgTime: this.params.httpEndTime - this.params.httpStartTime,
      result: err ? 'fail' : 'success',
      statusCode: err ? err.code : data.statusCode,
      errorMessage: err ? err.message : '',
      requestId: err ? err.headers && err.headers['x-cos-request-id'] : data.headers && data.headers['x-cos-request-id']
    });
    if (this.params.apiName === 'getObject') {
      this.params.fileSize = data ? data.headers['content-length'] : -1;
    }
    this.params.speed = this.params.fileSize !== -1 ? (this.params.fileSize / (avgTime / 1000)).toFixed(2) : -1;
  }

  // 设置当前链路的参数
  setParams(params) {
    Object.assign(this.params, params);
  }

  // 使用灯塔延时上报
  sendEvents() {
    const eventCode = getEventCode(this.params.apiName);
    const formattedParams = formatParams(this.params);
    console.log(eventCode, formattedParams);
    this.beacon.onUserAction(eventCode, formattedParams);
  }

  // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作
  generateSubTracker(subParams) {
    Object.assign(subParams, {
      traceId: this.params.traceId,
      originApiName: this.params.originApiName,
      bucket: this.params.bucket,
      region: this.params.region,
      fileKey: this.params.fileKey,
      fileSize: this.params.fileSize,
      useAccelerate: this.params.useAccelerate
    });
    return new Tracker(subParams);
  }

  // 销毁实例
  destroy() {
    this.ins = null;
    this.params = {};
  }
}

module.exports = Tracker;

/***/ })
/******/ ]);
=======

/***/ "./src/tracker.js":
/*!************************!*\
  !*** ./src/tracker.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst BeaconAction = __webpack_require__(/*! ../lib/beacon */ \"./lib/beacon.js\");\nconst beacon = new BeaconAction({\n  appkey: \"0WEB0H6CDU46LPPI\", // 系统或项目id, 必填\n  versionCode: '0.0.1', //项目版本,选填\n  channelID: 'channel', //渠道,选填\n  openid: 'openid', // 用户id, 选填\n  unionid: 'unid', //用户unionid , 类似idfv,选填\n  strictMode: false, //严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!\n  delay: 1000, // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填\n  sessionDuration: 60 * 1000 // session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填\n  // onReportSuccess: success, // 上报成功回调,选填\n  // onReportFail: fail, // 上报失败回调,选填,\n  // onReportBeforeSend: beforeSend, // 上报前回调，选填\n});\n\nvar uuid = function () {\n  var S4 = function () {\n    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);\n  };\n  return S4() + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + S4() + S4();\n};\n\n// 观察者的选项（观察哪些突变）\n// const config = {\n//   entryTypes: ['resource', 'mark', 'measure']\n// };\n\n// const observer = new PerformanceObserver(list => {\n//   list.getEntries().forEach(entry => {\n//     // 在控制台上显示每个报告的测量\n//     console.log(\n//       `Name: ${entry.name}`,\n//       `Type: ${entry.entryType}`,\n//       `Start: ${entry.startTime}`,\n//       `Duration: ${entry.duration}`,\n//     );\n//   });\n// });\n\n// // 开始观察\n// observer.observe(config);\n// performance.mark('registered-observer');\n\nconst uploadApi = ['putObject', 'postObject', 'appendObject', 'multipartInit', 'multipartUpload', 'multipartComplete', 'multipartList', 'multipartListPart', 'multipartAbort', 'sliceUploadFile', 'uploadFile', 'uploadFiles'];\nconst downloadApi = ['getObject'];\n\nfunction getEventCode(apiName) {\n  if (uploadApi.includes(apiName)) {\n    return 'cos_upload';\n  }\n  if (downloadApi.includes(apiName)) {\n    return 'cos_download';\n  }\n  return 'cos_common';\n}\n\n// 上报参数驼峰改下划线\nfunction hump2underline(key) {\n  return key.replace(/([A-Z])/g, \"_$1\").toLowerCase();\n}\nfunction formatParams(params) {\n  const formattedParams = {};\n  for (let key in params) {\n    const formattedKey = hump2underline(key);\n    formattedParams[formattedKey] = params[key];\n  }\n  return formattedParams;\n}\n\n// 链路追踪器\nclass Tracker {\n  constructor({ traceId, bucket, region, apiName, originApiName, fileKey, fileSize, useAccelerate }) {\n    const appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';\n    this.beacon = beacon; // 共用一个beacon实例\n    this.params = {\n      traceId: traceId || uuid(), // 每条上报唯一标识\n      bucket,\n      region,\n      appid,\n      apiName, // 调用sdk最原子的api名称，比如multipartInit\n      originApiName, // 分块上传可能有uploadFile、uploadFiles内部触发\n      fileKey, // cos端文件路径\n      fileSize, // 文件大小，上传时已知，下载时成功返回后取到。默认给-1，可能真实值是0\n      useAccelerate: useAccelerate ? '1' : '0', // 使用全球加速\n      md5StartTime: 0, // md5计算开始时间\n      md5EndTime: 0, // md5计算结束时间\n      md5AvgTime: 0, // MD5平均耗时\n      signStartTime: 0, // 计算签名开始时间\n      signEndTime: 0, // 计算签名结束时间\n      signAvgTime: 0, // 计算签名平均耗时\n      httpStartTime: 0, // 发起网络请求开始时间\n      httpEndTime: 0, // 网路请求结束时间\n      httpAvgTime: 0, // 网络请求平均耗时\n      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时\n      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时\n      speed: -1, // 平均速度\n      partNumber: 0, // 分块上传编号\n      retryTimes: 0, // sdk内部发起的请求重试\n      result: '', // sdk api调用结果success、fail\n      statusCode: 0,\n      errorMessage: '',\n      requestId: '',\n      reqUrl: '' // 请求url\n    };\n  }\n\n  // 格式化sdk回调\n  formatResult(err, data) {\n    const now = new Date().getTime();\n    var avgTime = now - this.params.startTime;\n    Object.assign(this.params, {\n      endTime: now,\n      avgTime,\n      speed: this.params.fileSize !== -1 ? (this.params.fileSize / (avgTime / 1000)).toFixed(2) : -1,\n      md5AvgTime: this.params.md5EndTime - this.params.md5StartTime,\n      signAvgTime: this.params.signEndTime - this.params.signStartTime,\n      httpAvgTime: this.params.httpEndTime - this.params.httpStartTime,\n      result: err ? 'fail' : 'success',\n      statusCode: err ? err.code : data.statusCode,\n      errorMessage: err ? err.message : '',\n      requestId: err ? err.headers && err.headers['x-cos-request-id'] : data.headers && data.headers['x-cos-request-id']\n    });\n    if (this.params.apiName === 'getObject') {\n      this.params.fileSize = data ? data.headers['content-length'] : -1;\n    }\n    this.params.speed = this.params.fileSize !== -1 ? (this.params.fileSize / (avgTime / 1000)).toFixed(2) : -1;\n  }\n\n  // 设置当前链路的参数\n  setParams(params) {\n    Object.assign(this.params, params);\n  }\n\n  // 使用灯塔延时上报\n  sendEvents() {\n    const eventCode = getEventCode(this.params.apiName);\n    const formattedParams = formatParams(this.params);\n    this.beacon.onUserAction(eventCode, formattedParams);\n  }\n\n  // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作\n  generateSubTracker(subParams) {\n    Object.assign(subParams, {\n      traceId: this.params.traceId,\n      originApiName: this.params.originApiName,\n      bucket: this.params.bucket,\n      region: this.params.region,\n      fileKey: this.params.fileKey,\n      fileSize: this.params.fileSize,\n      useAccelerate: this.params.useAccelerate\n    });\n    return new Tracker(subParams);\n  }\n\n  // 销毁实例\n  destroy() {\n    this.ins = null;\n    this.params = {};\n  }\n}\n\nmodule.exports = Tracker;\n\n//# sourceURL=webpack://COS/./src/tracker.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar md5 = __webpack_require__(/*! ../lib/md5 */ \"./lib/md5.js\");\nvar CryptoJS = __webpack_require__(/*! ../lib/crypto */ \"./lib/crypto.js\");\nvar xml2json = __webpack_require__(/*! ../lib/xml2json */ \"./lib/xml2json.js\");\nvar json2xml = __webpack_require__(/*! ../lib/json2xml */ \"./lib/json2xml.js\");\nvar Tracker = __webpack_require__(/*! ./tracker */ \"./src/tracker.js\");\n\nfunction camSafeUrlEncode(str) {\n    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\\(/g, '%28').replace(/\\)/g, '%29').replace(/\\*/g, '%2A');\n}\n\nfunction getObjectKeys(obj, forKey) {\n    var list = [];\n    for (var key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            list.push(forKey ? camSafeUrlEncode(key).toLowerCase() : key);\n        }\n    }\n    return list.sort(function (a, b) {\n        a = a.toLowerCase();\n        b = b.toLowerCase();\n        return a === b ? 0 : a > b ? 1 : -1;\n    });\n};\n\n/**\n * obj转为string\n * @param  {Object}  obj                需要转的对象，必须\n * @param  {Boolean} lowerCaseKey       key是否转为小写，默认false，非必须\n * @return {String}  data               返回字符串\n */\nvar obj2str = function (obj, lowerCaseKey) {\n    var i, key, val;\n    var list = [];\n    var keyList = getObjectKeys(obj);\n    for (i = 0; i < keyList.length; i++) {\n        key = keyList[i];\n        val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];\n        key = lowerCaseKey ? camSafeUrlEncode(key).toLowerCase() : camSafeUrlEncode(key);\n        val = camSafeUrlEncode(val) || '';\n        list.push(key + '=' + val);\n    }\n    return list.join('&');\n};\n\n// 可以签入签名的headers\nvar signHeaders = ['content-disposition', 'content-encoding', 'content-length', 'content-md5', 'expect', 'host', 'if-match', 'if-modified-since', 'if-none-match', 'if-unmodified-since', 'origin', 'range', 'response-cache-control', 'response-content-disposition', 'response-content-encoding', 'response-content-language', 'response-content-type', 'response-expires', 'transfer-encoding', 'versionid'];\n\nvar getSignHeaderObj = function (headers) {\n    var signHeaderObj = {};\n    for (var i in headers) {\n        var key = i.toLowerCase();\n        if (key.indexOf('x-cos-') > -1 || signHeaders.indexOf(key) > -1) {\n            signHeaderObj[i] = headers[i];\n        }\n    }\n    return signHeaderObj;\n};\n\n//测试用的key后面可以去掉\nvar getAuth = function (opt) {\n    opt = opt || {};\n\n    var SecretId = opt.SecretId;\n    var SecretKey = opt.SecretKey;\n    var KeyTime = opt.KeyTime;\n    var method = (opt.method || opt.Method || 'get').toLowerCase();\n    var queryParams = clone(opt.Query || opt.params || {});\n    var headers = getSignHeaderObj(clone(opt.Headers || opt.headers || {}));\n\n    var Key = opt.Key || '';\n    var pathname;\n    if (opt.UseRawKey) {\n        pathname = opt.Pathname || opt.pathname || '/' + Key;\n    } else {\n        pathname = opt.Pathname || opt.pathname || Key;\n        pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);\n    }\n\n    // ForceSignHost明确传入false才不加入host签名\n    var forceSignHost = opt.ForceSignHost === false ? false : true;\n\n    // 如果有传入存储桶且需要强制签名，那么签名默认加 Host 参与计算，避免跨桶访问\n    if (!headers.Host && !headers.host && opt.Bucket && opt.Region && forceSignHost) headers.Host = opt.Bucket + '.cos.' + opt.Region + '.myqcloud.com';\n\n    if (!SecretId) throw new Error('missing param SecretId');\n    if (!SecretKey) throw new Error('missing param SecretKey');\n\n    // 签名有效起止时间\n    var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;\n    var exp = now;\n\n    var Expires = opt.Expires || opt.expires;\n    if (Expires === undefined) {\n        exp += 900; // 签名过期时间为当前 + 900s\n    } else {\n        exp += Expires * 1 || 0;\n    }\n\n    // 要用到的 Authorization 参数列表\n    var qSignAlgorithm = 'sha1';\n    var qAk = SecretId;\n    var qSignTime = KeyTime || now + ';' + exp;\n    var qKeyTime = KeyTime || now + ';' + exp;\n    var qHeaderList = getObjectKeys(headers, true).join(';').toLowerCase();\n    var qUrlParamList = getObjectKeys(queryParams, true).join(';').toLowerCase();\n\n    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778\n    // 步骤一：计算 SignKey\n    var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString();\n\n    // 步骤二：构成 FormatString\n    var formatString = [method, pathname, util.obj2str(queryParams, true), util.obj2str(headers, true), ''].join('\\n');\n\n    // 步骤三：计算 StringToSign\n    var stringToSign = ['sha1', qSignTime, CryptoJS.SHA1(formatString).toString(), ''].join('\\n');\n\n    // 步骤四：计算 Signature\n    var qSignature = CryptoJS.HmacSHA1(stringToSign, signKey).toString();\n\n    // 步骤五：构造 Authorization\n    var authorization = ['q-sign-algorithm=' + qSignAlgorithm, 'q-ak=' + qAk, 'q-sign-time=' + qSignTime, 'q-key-time=' + qKeyTime, 'q-header-list=' + qHeaderList, 'q-url-param-list=' + qUrlParamList, 'q-signature=' + qSignature].join('&');\n\n    return authorization;\n};\n\nvar readIntBE = function (chunk, size, offset) {\n    var bytes = size / 8;\n    var buf = chunk.slice(offset, offset + bytes);\n    new Uint8Array(buf).reverse();\n    return new { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array }[size](buf)[0];\n};\nvar buf2str = function (chunk, start, end, isUtf8) {\n    var buf = chunk.slice(start, end);\n    var str = '';\n    new Uint8Array(buf).forEach(function (charCode) {\n        str += String.fromCharCode(charCode);\n    });\n    if (isUtf8) str = decodeURIComponent(escape(str));\n    return str;\n};\nvar parseSelectPayload = function (chunk) {\n    var header = {};\n    var body = buf2str(chunk);\n    var result = { records: [] };\n    while (chunk.byteLength) {\n        var totalLength = readIntBE(chunk, 32, 0);\n        var headerLength = readIntBE(chunk, 32, 4);\n        var payloadRestLength = totalLength - headerLength - 16;\n        var offset = 0;\n        var content;\n        chunk = chunk.slice(12);\n        // 获取 Message 的 header 信息\n        while (offset < headerLength) {\n            var headerNameLength = readIntBE(chunk, 8, offset);\n            var headerName = buf2str(chunk, offset + 1, offset + 1 + headerNameLength);\n            var headerValueLength = readIntBE(chunk, 16, offset + headerNameLength + 2);\n            var headerValue = buf2str(chunk, offset + headerNameLength + 4, offset + headerNameLength + 4 + headerValueLength);\n            header[headerName] = headerValue;\n            offset += headerNameLength + 4 + headerValueLength;\n        }\n        if (header[':event-type'] === 'Records') {\n            content = buf2str(chunk, offset, offset + payloadRestLength, true);\n            result.records.push(content);\n        } else if (header[':event-type'] === 'Stats') {\n            content = buf2str(chunk, offset, offset + payloadRestLength, true);\n            result.stats = util.xml2json(content).Stats;\n        } else if (header[':event-type'] === 'error') {\n            var errCode = header[':error-code'];\n            var errMessage = header[':error-message'];\n            var err = new Error(errMessage);\n            err.message = errMessage;\n            err.name = err.code = errCode;\n            result.error = err;\n        } else if (['Progress', 'Continuation', 'End'].includes(header[':event-type'])) {\n            // do nothing\n        }\n        chunk = chunk.slice(offset + payloadRestLength + 4);\n    }\n    return {\n        payload: result.records.join(''),\n        body: body\n    };\n};\n\nvar getSourceParams = function (source) {\n    var parser = this.options.CopySourceParser;\n    if (parser) return parser(source);\n    var m = source.match(/^([^.]+-\\d+)\\.cos(v6|-cdc)?\\.([^.]+)\\.myqcloud\\.com\\/(.+)$/);\n    if (!m) return null;\n    return { Bucket: m[1], Region: m[3], Key: m[4] };\n};\n\nvar noop = function () {};\n\n// 清除对象里值为的 undefined 或 null 的属性\nvar clearKey = function (obj) {\n    var retObj = {};\n    for (var key in obj) {\n        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {\n            retObj[key] = obj[key];\n        }\n    }\n    return retObj;\n};\n\nvar readAsBinaryString = function (blob, callback) {\n    var readFun;\n    var fr = new FileReader();\n    if (FileReader.prototype.readAsBinaryString) {\n        readFun = FileReader.prototype.readAsBinaryString;\n        fr.onload = function () {\n            callback(this.result);\n        };\n    } else if (FileReader.prototype.readAsArrayBuffer) {\n        // 在 ie11 添加 readAsBinaryString 兼容\n        readFun = function (fileData) {\n            var binary = \"\";\n            var pt = this;\n            var reader = new FileReader();\n            reader.onload = function (e) {\n                var bytes = new Uint8Array(reader.result);\n                var length = bytes.byteLength;\n                for (var i = 0; i < length; i++) {\n                    binary += String.fromCharCode(bytes[i]);\n                }\n                callback(binary);\n            };\n            reader.readAsArrayBuffer(fileData);\n        };\n    } else {\n        console.error('FileReader not support readAsBinaryString');\n    }\n    readFun.call(fr, blob);\n};\n\nvar fileSliceNeedCopy = function () {\n    var compareVersion = function (a, b) {\n        a = a.split('.');\n        b = b.split('.');\n        for (var i = 0; i < b.length; i++) {\n            if (a[i] !== b[i]) {\n                return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;\n            }\n        }\n        return 0;\n    };\n    var check = function (ua) {\n        if (!ua) return false;\n        var ChromeVersion = (ua.match(/Chrome\\/([.\\d]+)/) || [])[1];\n        var QBCoreVersion = (ua.match(/QBCore\\/([.\\d]+)/) || [])[1];\n        var QQBrowserVersion = (ua.match(/QQBrowser\\/([.\\d]+)/) || [])[1];\n        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0 && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0 && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;\n        return need;\n    };\n    return check(typeof navigator !== 'undefined' && navigator.userAgent);\n}();\n\n// 获取文件分片\nvar fileSlice = function (file, start, end, isUseToUpload, callback) {\n    var blob;\n    if (file.slice) {\n        blob = file.slice(start, end);\n    } else if (file.mozSlice) {\n        blob = file.mozSlice(start, end);\n    } else if (file.webkitSlice) {\n        blob = file.webkitSlice(start, end);\n    }\n    if (isUseToUpload && fileSliceNeedCopy) {\n        var reader = new FileReader();\n        reader.onload = function (e) {\n            blob = null;\n            callback(new Blob([reader.result]));\n        };\n        reader.readAsArrayBuffer(blob);\n    } else {\n        callback(blob);\n    }\n};\n\n// 获取文件内容的 MD5\nvar getBodyMd5 = function (UploadCheckContentMd5, Body, callback, onProgress) {\n    callback = callback || noop;\n    if (UploadCheckContentMd5) {\n        if (typeof Body === 'string') {\n            callback(util.md5(Body, true));\n        } else if (Blob && Body instanceof Blob) {\n            util.getFileMd5(Body, function (err, md5) {\n                callback(md5);\n            }, onProgress);\n        } else {\n            callback();\n        }\n    } else {\n        callback();\n    }\n};\n\n// 获取文件 md5 值\nvar md5ChunkSize = 1024 * 1024;\nvar getFileMd5 = function (blob, callback, onProgress) {\n    var size = blob.size;\n    var loaded = 0;\n    var md5ctx = md5.getCtx();\n    var next = function (start) {\n        if (start >= size) {\n            var hash = md5ctx.digest('hex');\n            callback(null, hash);\n            return;\n        }\n        var end = Math.min(size, start + md5ChunkSize);\n        util.fileSlice(blob, start, end, false, function (chunk) {\n            readAsBinaryString(chunk, function (content) {\n                chunk = null;\n                md5ctx = md5ctx.update(content, true);\n                loaded += content.length;\n                content = null;\n                if (onProgress) onProgress({ loaded: loaded, total: size, percent: Math.round(loaded / size * 10000) / 10000 });\n                next(start + md5ChunkSize);\n            });\n        });\n    };\n    next(0);\n};\n\nfunction clone(obj) {\n    return map(obj, function (v) {\n        return typeof v === 'object' && v !== null ? clone(v) : v;\n    });\n}\n\nfunction attr(obj, name, defaultValue) {\n    return obj && name in obj ? obj[name] : defaultValue;\n}\n\nfunction extend(target, source) {\n    each(source, function (val, key) {\n        target[key] = source[key];\n    });\n    return target;\n}\n\nfunction isArray(arr) {\n    return arr instanceof Array;\n}\n\nfunction isInArray(arr, item) {\n    var flag = false;\n    for (var i = 0; i < arr.length; i++) {\n        if (item === arr[i]) {\n            flag = true;\n            break;\n        }\n    }\n    return flag;\n}\n\nfunction makeArray(arr) {\n    return isArray(arr) ? arr : [arr];\n}\n\nfunction each(obj, fn) {\n    for (var i in obj) {\n        if (obj.hasOwnProperty(i)) {\n            fn(obj[i], i);\n        }\n    }\n}\n\nfunction map(obj, fn) {\n    var o = isArray(obj) ? [] : {};\n    for (var i in obj) {\n        if (obj.hasOwnProperty(i)) {\n            o[i] = fn(obj[i], i);\n        }\n    }\n    return o;\n}\n\nfunction filter(obj, fn) {\n    var iaArr = isArray(obj);\n    var o = iaArr ? [] : {};\n    for (var i in obj) {\n        if (obj.hasOwnProperty(i)) {\n            if (fn(obj[i], i)) {\n                if (iaArr) {\n                    o.push(obj[i]);\n                } else {\n                    o[i] = obj[i];\n                }\n            }\n        }\n    }\n    return o;\n}\n\nvar binaryBase64 = function (str) {\n    var i,\n        len,\n        char,\n        res = '';\n    for (i = 0, len = str.length / 2; i < len; i++) {\n        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);\n        res += String.fromCharCode(char);\n    }\n    return btoa(res);\n};\nvar uuid = function () {\n    var S4 = function () {\n        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);\n    };\n    return S4() + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + S4() + S4();\n};\n\nvar hasMissingParams = function (apiName, params) {\n    var Bucket = params.Bucket;\n    var Region = params.Region;\n    var Key = params.Key;\n    var Domain = this.options.Domain;\n    var checkBucket = !Domain || Domain.indexOf('{Bucket}') > -1;\n    var checkRegion = !Domain || Domain.indexOf('{Region}') > -1;\n    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {\n        if (checkBucket && !Bucket) return 'Bucket';\n        if (checkRegion && !Region) return 'Region';\n    } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {\n        if (checkBucket && !Bucket) return 'Bucket';\n        if (checkRegion && !Region) return 'Region';\n        if (!Key) return 'Key';\n    }\n    return false;\n};\n\nvar formatParams = function (apiName, params) {\n\n    // 复制参数对象\n    params = extend({}, params);\n\n    // 统一处理 Headers\n    if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {\n        var Headers = params.Headers || {};\n        if (params && typeof params === 'object') {\n            (function () {\n                for (var key in params) {\n                    if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {\n                        Headers[key] = params[key];\n                    }\n                }\n            })();\n\n            var headerMap = {\n                // params headers\n                'x-cos-mfa': 'MFA',\n                'Content-MD5': 'ContentMD5',\n                'Content-Length': 'ContentLength',\n                'Content-Type': 'ContentType',\n                'Expect': 'Expect',\n                'Expires': 'Expires',\n                'Cache-Control': 'CacheControl',\n                'Content-Disposition': 'ContentDisposition',\n                'Content-Encoding': 'ContentEncoding',\n                'Range': 'Range',\n                'If-Modified-Since': 'IfModifiedSince',\n                'If-Unmodified-Since': 'IfUnmodifiedSince',\n                'If-Match': 'IfMatch',\n                'If-None-Match': 'IfNoneMatch',\n                'x-cos-copy-source': 'CopySource',\n                'x-cos-copy-source-Range': 'CopySourceRange',\n                'x-cos-metadata-directive': 'MetadataDirective',\n                'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',\n                'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',\n                'x-cos-copy-source-If-Match': 'CopySourceIfMatch',\n                'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',\n                'x-cos-acl': 'ACL',\n                'x-cos-grant-read': 'GrantRead',\n                'x-cos-grant-write': 'GrantWrite',\n                'x-cos-grant-full-control': 'GrantFullControl',\n                'x-cos-grant-read-acp': 'GrantReadAcp',\n                'x-cos-grant-write-acp': 'GrantWriteAcp',\n                'x-cos-storage-class': 'StorageClass',\n                'x-cos-traffic-limit': 'TrafficLimit',\n                'x-cos-mime-limit': 'MimeLimit',\n                // SSE-C\n                'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',\n                'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',\n                'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',\n                // SSE-COS、SSE-KMS\n                'x-cos-server-side-encryption': 'ServerSideEncryption',\n                'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',\n                'x-cos-server-side-encryption-context': 'SSEContext'\n            };\n            util.each(headerMap, function (paramKey, headerKey) {\n                if (params[paramKey] !== undefined) {\n                    Headers[headerKey] = params[paramKey];\n                }\n            });\n\n            params.Headers = clearKey(Headers);\n        }\n    }\n\n    return params;\n};\n\nvar apiWrapper = function (apiName, apiFn) {\n    return function (params, callback) {\n\n        var self = this;\n\n        // 处理参数\n        if (typeof params === 'function') {\n            callback = params;\n            params = {};\n        }\n\n        // 整理参数格式\n        params = formatParams(apiName, params);\n\n        // tracker传递\n        var tracker;\n        if (params.calledBySdk === 'sliceUploadFile' && self.options.DeepTracker) {\n            // 分块上传内部方法使用sliceUploadFile的子链路\n            tracker = params.tracker.generateSubTracker({ apiName: apiName });\n        } else if (['uploadFile', 'uploadFiles'].includes(apiName)) {\n            // uploadFile、uploadFiles方法在内部处理，此处不处理\n            tracker = null;\n        } else {\n            var fileSize = -1;\n            if (params.Body) {\n                fileSize = typeof params.Body === 'string' ? params.Body.length : params.Body.size || -1;\n            }\n            tracker = new Tracker({\n                bucket: params.Bucket,\n                region: params.Region,\n                apiName: apiName,\n                originApiName: apiName,\n                fileKey: params.Key,\n                fileSize: fileSize,\n                useAccelerate: self.options.UseAccelerate\n            });\n        }\n\n        params.tracker = tracker;\n\n        // 代理回调函数\n        var formatResult = function (result) {\n            if (result && result.headers) {\n                result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);\n                result.headers['x-ci-request-id'] && (result.RequestId = result.headers['x-ci-request-id']);\n                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);\n                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);\n            }\n            return result;\n        };\n        var _callback = function (err, data) {\n            // 格式化上报参数并上报\n            tracker && tracker.formatResult(err, data);\n            tracker && tracker.sendEvents();\n\n            callback && callback(formatResult(err), formatResult(data));\n        };\n\n        var checkParams = function () {\n            if (apiName !== 'getService' && apiName !== 'abortUploadTask') {\n                // 判断参数是否完整\n                var missingResult = hasMissingParams.call(self, apiName, params);\n                if (missingResult) {\n                    return 'missing param ' + missingResult;\n                }\n                // 判断 region 格式\n                if (params.Region) {\n                    if (self.options.CompatibilityMode) {\n                        if (!/^([a-z\\d-.]+)$/.test(params.Region)) {\n                            return 'Region format error.';\n                        }\n                    } else {\n                        if (params.Region.indexOf('cos.') > -1) {\n                            return 'param Region should not be start with \"cos.\"';\n                        } else if (!/^([a-z\\d-]+)$/.test(params.Region)) {\n                            return 'Region format error.';\n                        }\n                    }\n                    // 判断 region 格式\n                    if (!self.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default' && params.Region !== 'accelerate') {\n                        console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');\n                    }\n                }\n                // 兼容不带 AppId 的 Bucket\n                if (params.Bucket) {\n                    if (!/^([a-z\\d-]+)-(\\d+)$/.test(params.Bucket)) {\n                        if (params.AppId) {\n                            params.Bucket = params.Bucket + '-' + params.AppId;\n                        } else if (self.options.AppId) {\n                            params.Bucket = params.Bucket + '-' + self.options.AppId;\n                        } else {\n                            return 'Bucket should format as \"test-1250000000\".';\n                        }\n                    }\n                    if (params.AppId) {\n                        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:\"test-1250000000\" ).');\n                        delete params.AppId;\n                    }\n                }\n                // 如果 Key 是 / 开头，强制去掉第一个 /\n                if (!self.options.UseRawKey && params.Key && params.Key.substr(0, 1) === '/') {\n                    params.Key = params.Key.substr(1);\n                }\n            }\n        };\n\n        var errMsg = checkParams();\n        var isSync = apiName === 'getAuth' || apiName === 'getObjectUrl';\n        if (window.Promise && !isSync && !callback) {\n            return new Promise(function (resolve, reject) {\n                callback = function (err, data) {\n                    err ? reject(err) : resolve(data);\n                };\n                if (errMsg) return _callback(util.error(new Error(errMsg)));\n                apiFn.call(self, params, _callback);\n            });\n        } else {\n            if (errMsg) return _callback(util.error(new Error(errMsg)));\n            var res = apiFn.call(self, params, _callback);\n            if (isSync) return res;\n        }\n    };\n};\n\nvar throttleOnProgress = function (total, onProgress) {\n    var self = this;\n    var size0 = 0;\n    var size1 = 0;\n    var time0 = Date.now();\n    var time1;\n    var timer;\n\n    function update() {\n        timer = 0;\n        if (onProgress && typeof onProgress === 'function') {\n            time1 = Date.now();\n            var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100) || 0;\n            var percent;\n            if (size1 === 0 && total === 0) {\n                percent = 1;\n            } else {\n                percent = Math.floor(size1 / total * 100) / 100 || 0;\n            }\n            time0 = time1;\n            size0 = size1;\n            try {\n                onProgress({ loaded: size1, total: total, speed: speed, percent: percent });\n            } catch (e) {}\n        }\n    }\n\n    return function (info, immediately) {\n        if (info) {\n            size1 = info.loaded;\n            total = info.total;\n        }\n        if (immediately) {\n            clearTimeout(timer);\n            update();\n        } else {\n            if (timer) return;\n            timer = setTimeout(update, self.options.ProgressInterval);\n        }\n    };\n};\n\nvar getFileSize = function (api, params, callback) {\n    var size;\n    if (typeof params.Body === 'string') {\n        params.Body = new Blob([params.Body], { type: 'text/plain' });\n    } else if (params.Body instanceof ArrayBuffer) {\n        params.Body = new Blob([params.Body]);\n    }\n    if (params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]')) {\n        size = params.Body.size;\n    } else {\n        callback(util.error(new Error('params body format error, Only allow File|Blob|String.')));\n        return;\n    }\n    params.ContentLength = size;\n    callback(null, size);\n};\n\n// 获取调正的时间戳\nvar getSkewTime = function (offset) {\n    return Date.now() + (offset || 0);\n};\n\nvar error = function (err, opt) {\n    var sourceErr = err;\n    err.message = err.message || null;\n\n    if (typeof opt === 'string') {\n        err.error = opt;\n        err.message = opt;\n    } else if (typeof opt === 'object' && opt !== null) {\n        extend(err, opt);\n        if (opt.code || opt.name) err.code = opt.code || opt.name;\n        if (opt.message) err.message = opt.message;\n        if (opt.stack) err.stack = opt.stack;\n    }\n\n    if (typeof Object.defineProperty === 'function') {\n        Object.defineProperty(err, 'name', { writable: true, enumerable: false });\n        Object.defineProperty(err, 'message', { enumerable: true });\n    }\n\n    err.name = opt && opt.name || err.name || err.code || 'Error';\n    if (!err.code) err.code = err.name;\n    if (!err.error) err.error = clone(sourceErr); // 兼容老的错误格式\n\n    return err;\n};\n\nvar isNode = function () {\n    return typeof window !== 'object' && typeof process === 'object' && \"function\" === 'function';\n};\n\nvar isCIHost = function (url) {\n    return (/^https?:\\/\\/([^/]+\\.)?ci\\.[^/]+/.test(url)\n    );\n};\n\nvar util = {\n    noop: noop,\n    formatParams: formatParams,\n    apiWrapper: apiWrapper,\n    xml2json: xml2json,\n    json2xml: json2xml,\n    md5: md5,\n    clearKey: clearKey,\n    fileSlice: fileSlice,\n    getBodyMd5: getBodyMd5,\n    getFileMd5: getFileMd5,\n    binaryBase64: binaryBase64,\n    extend: extend,\n    isArray: isArray,\n    isInArray: isInArray,\n    makeArray: makeArray,\n    each: each,\n    map: map,\n    filter: filter,\n    clone: clone,\n    attr: attr,\n    uuid: uuid,\n    camSafeUrlEncode: camSafeUrlEncode,\n    throttleOnProgress: throttleOnProgress,\n    getFileSize: getFileSize,\n    getSkewTime: getSkewTime,\n    error: error,\n    obj2str: obj2str,\n    getAuth: getAuth,\n    parseSelectPayload: parseSelectPayload,\n    getSourceParams: getSourceParams,\n    isBrowser: true,\n    isNode: isNode,\n    isCIHost: isCIHost\n};\n\nmodule.exports = util;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://COS/./src/util.js?");

/***/ })

/******/ });
>>>>>>> upd：webpack升级
});