(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["COS"] = factory();
	else
		root["COS"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, global) {

var md5 = __webpack_require__(10);
var CryptoJS = __webpack_require__(11);
var xml2json = __webpack_require__(12);
var json2xml = __webpack_require__(13);

function camSafeUrlEncode(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

//测试用的key后面可以去掉
var getAuth = function (opt) {
    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var method = (opt.method || opt.Method || 'get').toLowerCase();
    var pathname = opt.pathname || opt.Key || '/';
    var queryParams = opt.params || '';
    var headers = opt.headers || '';
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);

    if (!SecretId) return console.error('lack of param SecretId');
    if (!SecretKey) return console.error('lack of param SecretKey');

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
            val = obj[key] || '';
            key = key.toLowerCase();
            list.push(camSafeUrlEncode(key) + '=' + camSafeUrlEncode(val));
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
        exp += Expires * 1 || 0;
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
    var authorization = ['q-sign-algorithm=' + qSignAlgorithm, 'q-ak=' + qAk, 'q-sign-time=' + qSignTime, 'q-key-time=' + qKeyTime, 'q-header-list=' + qHeaderList, 'q-url-param-list=' + qUrlParamList, 'q-signature=' + qSignature].join('&');

    return authorization;
};

// 清除对象里值为的 undefined 或 null 的属性
var clearKey = function (obj) {
    var retObj = {};
    for (var key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
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

// 获取文件 sha1 值
var getFileSHA = function (blob, callback) {
    readAsBinaryString(blob, function (content) {
        var hash = CryptoJS.SHA1(content).toString();
        callback(null, hash);
    });
};

// 获取文件 md5 值
var getFileMd5 = function (blob, callback) {
    readAsBinaryString(blob, function (content) {
        var hash = md5(content);
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
        arr = [];
    for (i = 0, len = str.length / 2; i < len; i++) {
        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
        arr.push(char);
    }
    return new Buffer(arr).toString('base64');
};
var uuid = function () {
    var S4 = function () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

var checkParams = function (apiName, params) {
    var bucket = params.Bucket;
    var region = params.Region;
    var object = params.Key;
    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList') {
        return bucket && region;
    }
    if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
        return bucket && region && object;
    }
    return true;
};

var apiWrapper = function (apiName, apiFn) {
    var regionMap = {
        'gz': 'ap-guangzhou',
        'tj': 'ap-beijing-2',
        'sh': 'ap-shanghai',
        'cd': 'ap-chengdu'
    };
    return function (params, callback) {
        callback = callback || function () {};
        if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
            // 判断参数是否完整
            if (!checkParams(apiName, params)) {
                callback({ error: 'lack of required params' });
                return;
            }
            // 判断 region 格式
            if (params.Region && regionMap[params.Region]) {
                callback({ error: 'Region should be ' + regionMap[params.Region] });
                return;
            }
            // 判断 region 格式
            if (params.Region && params.Region.indexOf('cos.') > -1) {
                callback({ error: 'Region should not be start with "cos."' });
                return;
            }
            // 兼容不带 AppId 的 Bucket
            if (params.Bucket) {
                if (!/^(.+)-(\d+)$/.test(params.Bucket)) {
                    if (params.AppId) {
                        params.Bucket = params.Bucket + '-' + params.AppId;
                    } else if (this.options.AppId) {
                        params.Bucket = params.Bucket + '-' + this.options.AppId;
                    } else {
                        callback({ error: 'Bucket should format as "test-1250000000".' });
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
        var res = apiFn.call(this, params, callback);
        if (apiName === 'getAuth' || apiName === 'getObjectUrl') {
            return res;
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

var fileSlice = function (file, start, end) {
    if (file.slice) {
        return file.slice(start, end);
    } else if (file.mozSlice) {
        return file.mozSlice(start, end);
    } else if (file.webkitSlice) {
        return file.webkitSlice(start, end);
    }
};

var util = {
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
    each: each,
    map: map,
    filter: filter,
    clone: clone,
    uuid: uuid,
    throttleOnProgress: throttleOnProgress,
    isBrowser: !!global.document,
    fileSlice: fileSlice
};

module.exports = util;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer, __webpack_require__(1)))

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(7)
var ieee754 = __webpack_require__(8)
var isArray = __webpack_require__(9)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(16);
exports.encode = exports.stringify = __webpack_require__(17);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var COS = __webpack_require__(6);
module.exports = COS;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var event = __webpack_require__(3);
var task = __webpack_require__(14);
var base = __webpack_require__(15);
var advance = __webpack_require__(19);

var defaultOptions = {
    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
    SecretId: '',
    SecretKey: '',
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkSize: 1024 * 1024,
    ProgressInterval: 1000,
    Domain: '',
    ServiceDomain: '',
    SliceSize: 1024 * 1024 * 20
};

// 对外暴露的类
var COS = function (options) {
    this.options = util.extend(util.clone(defaultOptions), options || {});
    if (options.AppId) {
        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
    }
    event.init(this);
    task.init(this);
};

util.extend(COS.prototype, base);
util.extend(COS.prototype, advance);

COS.getAuthorization = util.getAuth;
COS.version = '0.3.7';

module.exports = COS;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 *
 *  MD5 (Message-Digest Algorithm)
 *  http://www.webtoolkit.info/
 *
 **/

var md5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
            } else {
                return lResult ^ 0x40000000 ^ lX8 ^ lY8;
            }
        } else {
            return lResult ^ lX8 ^ lY8;
        }
    }

    function F(x, y, z) {
        return x & y | ~x & z;
    }
    function G(x, y, z) {
        return x & z | y & ~z;
    }
    function H(x, y, z) {
        return x ^ y ^ z;
    }
    function I(x, y, z) {
        return y ^ (x | ~z);
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - lByteCount % 4) / 4;
            lBytePosition = lByteCount % 4 * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
            lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte,
            lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = lValue >>> lCount * 8 & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;b = 0xEFCDAB89;c = 0x98BADCFE;d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;BB = b;CC = c;DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};

module.exports = md5;

/***/ }),
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
/* 12 */
/***/ (function(module, exports) {

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
            vResult = sCollectedTxt.replace(trimMatch, '') || '';
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
/* 13 */
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
                    if (node_data[name] instanceof Array) {
                        for (var j in node_data[name]) {
                            nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));
                        }
                    } else {
                        nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));
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
            indent: "  "
        };
    }

    var Buffer = this.Buffer || function Buffer() {};

    if (typeof obj == 'string' || obj instanceof Buffer) {
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);

var initTask = function (cos) {

    var queue = [];
    var tasks = {};
    var uploadingFileCount = 0;
    var nextUploadIndex = 0;

    var originApiMap = {};

    // 把上传方法替换成添加任务的方法
    util.each(['putObject', 'sliceUploadFile'], function (api) {
        originApiMap[api] = cos[api];
        cos[api] = function (params, callback) {
            cos._addTask(api, params, callback);
        };
    });

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
        return t;
    };

    var emitListUpdate = function () {
        cos.emit('task-list-update', { list: util.map(queue, formatTask) });
        cos.emit('list-update', { list: util.map(queue, formatTask) });
    };

    var startNextTask = function () {
        if (nextUploadIndex < queue.length && uploadingFileCount < cos.options.FileParallelLimit) {
            var task = queue[nextUploadIndex];
            if (task.state === 'waiting') {
                uploadingFileCount++;
                task.state = 'checking';
                !task.params.UploadData && (task.params.UploadData = {});
                originApiMap[task.api].call(cos, task.params, function (err, data) {
                    if (!cos._isRunningTask(task.id)) return;
                    if (task.state === 'checking' || task.state === 'uploading') {
                        task.state = err ? 'error' : 'success';
                        err && (task.error = err);
                        uploadingFileCount--;
                        emitListUpdate();
                        startNextTask(cos);
                        task.callback && task.callback(err, data);
                        if (task.state === 'success') {
                            delete task.params;
                            delete task.callback;
                        }
                    }
                });
                emitListUpdate();
            }
            nextUploadIndex++;
            startNextTask(cos);
        }
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
            cos.emit('inner-kill-task', { TaskId: id });
            emitListUpdate();
            if (running) {
                uploadingFileCount--;
                startNextTask(cos);
            }
            if (switchToState === 'canceled') {
                delete task.params;
                delete task.callback;
            }
        }
    };

    cos._addTasks = function (taskList) {
        util.each(taskList, function (task) {
            task.params.IgnoreAddEvent = true;
            cos._addTask(task.api, task.params, task.callback);
        });
        emitListUpdate();
    };

    cos._addTask = function (api, params, callback) {

        // 生成 id
        var id = util.uuid();
        params.TaskReady && params.TaskReady(id);

        var size;
        if (params.Body && params.Body.size !== undefined) {
            size = params.Body.size;
        } else if (params.Body && params.Body.length !== undefined) {
            size = params.Body.length;
        } else if (params.ContentLength !== undefined) {
            size = params.ContentLength;
        }

        if (params.ContentLength === undefined) params.ContentLength = size;
        size = size || 0;
        params.TaskId = id;

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
            size: size,
            speed: 0,
            percent: 0,
            hashPercent: 0,
            error: null
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
        queue.push(task);
        tasks[id] = task;
        !params.IgnoreAddEvent && emitListUpdate();
        startNextTask(cos);
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
};

module.exports.init = initTask;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {var queryString = __webpack_require__(4);
var REQUEST = __webpack_require__(18);
var util = __webpack_require__(0);

// Bucket 相关

/**
 * 查看是否存在该Bucket，是否有权限访问
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                      返回的数据
 *     @return  {Boolean}  data.BucketExist     Bucket是否存在
 *     @return  {Boolean}  data.BucketAuth      是否有 Bucket 的访问权限
 */
function headBucket(params, callback) {
    submitRequest.call(this, {
        Bucket: params.Bucket,
        Region: params.Region,
        method: 'HEAD'
    }, function (err, data) {
        var exist, auth, statusCode;
        if (err) {
            statusCode = err.statusCode;
            if (statusCode && statusCode === 404) {
                exist = false;
                auth = false;
            } else if (statusCode && statusCode === 403) {
                exist = true;
                auth = false;
            } else {
                return callback(err);
            }
        } else {
            statusCode = data.statusCode;
            exist = true;
            auth = true;
        }
        var result = {
            BucketExist: exist,
            BucketAuth: auth,
            statusCode: statusCode
        };
        if (data && data.headers) {
            result.headers = data.headers;
        }
        callback(null, result);
    });
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
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.ListBucketResult     返回的 object 列表信息
 */
function getBucket(params, callback) {
    var reqParams = {};
    reqParams['prefix'] = params['Prefix'];
    reqParams['delimiter'] = params['Delimiter'];
    reqParams['marker'] = params['Marker'];
    reqParams['max-keys'] = params['MaxKeys'];
    reqParams['encoding-type'] = params['EncodingType'];

    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        qs: reqParams
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var contents = data.ListBucketResult.Contents || [];
        var CommonPrefixes = data.ListBucketResult.CommonPrefixes || [];

        contents = util.isArray(contents) ? contents : [contents];
        CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];

        var result = util.clone(data.ListBucketResult);
        util.extend(result, {
            Contents: contents,
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
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                  返回的数据
 *     @return  {String}  data.Location     操作地址
 */
function deleteBucket(params, callback) {
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region
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
 * 获取 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  访问权限信息
 */
function getBucketAcl(params, callback) {
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?acl'
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var Owner = data.AccessControlPolicy.Owner || {};
        var Grant = data.AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(data.AccessControlPolicy);
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
 * 设置 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          返回的数据
 */
function putBucketAcl(params, callback) {
    var headers = {};

    headers['x-cos-acl'] = params['ACL'];
    headers['x-cos-grant-read'] = params['GrantRead'];
    headers['x-cos-grant-write'] = params['GrantWrite'];
    headers['x-cos-grant-read-acp'] = params['GrantReadAcp'];
    headers['x-cos-grant-write-acp'] = params['GrantWriteAcp'];
    headers['x-cos-grant-full-control'] = params['GrantFullControl'];

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = { Grant: Grants };
        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
        headers['Content-Type'] = 'application/xml';
    }

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?acl',
        headers: headers,
        body: xml
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
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
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.CORSRules            Bucket的跨域设置
 */
function getBucketCors(params, callback) {
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?cors'
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
            util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key, j) {
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
 * 设置 Bucket 的 跨域设置
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {Object}  params.CORSConfiguration       相关的跨域设置，必须
 * @param  {Array}  params.CORSConfiguration.CORSRules  对应的跨域规则
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                              返回的数据
 */
function putBucketCors(params, callback) {

    var CORSConfiguration = params['CORSConfiguration'] || {};
    var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];
    CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);
    util.each(CORSRules, function (rule) {
        util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key, k) {
            var sKey = key + 's';
            var val = rule[sKey] || rule[key] || [];
            delete rule[sKey];
            rule[key] = util.isArray(val) ? val : [val];
        });
    });

    var xml = util.json2xml({ CORSConfiguration: { CORSRule: CORSRules } });
    var headers = {};
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    headers['Content-Type'] = 'application/xml';

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?cors',
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, {
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
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                  返回的数据
 */
function deleteBucketCors(params, callback) {
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?cors'
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

function putBucketPolicy(params, callback) {
    var headers = {};
    var Policy = params['Policy'];
    var PolicyStr = Policy;
    try {
        if (typeof Policy === 'string') {
            Policy = JSON.parse(PolicyStr);
        } else {
            PolicyStr = JSON.stringify(Policy);
        }
    } catch (e) {
        callback({ error: 'Policy format error' });
    }

    headers['Content-Type'] = 'application/json';
    headers['Content-MD5'] = util.binaryBase64(util.md5(PolicyStr));

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?policy',
        body: util.isBrowser ? PolicyStr : Policy,
        headers: headers,
        json: true
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
 * 获取 Bucket 的 地域信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回数据，包含地域信息 LocationConstraint
 */
function getBucketLocation(params, callback) {
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?location'
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}

/**
 * 获取 Bucket 的读取权限策略
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回数据
 */
function getBucketPolicy(params, callback) {
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?policy',
        rawBody: true
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 403) {
                return callback({ ErrorStatus: 'Access Denied' });
            }
            if (err.statusCode && err.statusCode === 405) {
                return callback({ ErrorStatus: 'Method Not Allowed' });
            }
            if (err.statusCode && err.statusCode === 404) {
                return callback({ ErrorStatus: 'Policy Not Found' });
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
 * 获取 Bucket 的标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回数据
 */
function getBucketTagging(params, callback) {
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?tagging'
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
 * 设置 Bucket 的标签
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {Array}   params.TagSet  标签设置，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回数据
 */
function putBucketTagging(params, callback) {

    var Tagging = params['Tagging'] || {};
    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    var xml = util.json2xml({ Tagging: { TagSet: { Tag: Tags } } });

    var headers = {};
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?tagging',
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
 * 删除 Bucket 的 标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回的数据
 */
function deleteBucketTagging(params, callback) {
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?tagging'
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
    var Rules = LifecycleConfiguration.Rules || [];
    Rules = util.clone(Rules);
    var xml = util.json2xml({ LifecycleConfiguration: { Rule: Rules } });

    var headers = {};
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?lifecycle',
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
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?lifecycle'
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
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?lifecycle'
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
    var VersioningConfiguration = params['VersioningConfiguration'] || {};
    var xml = util.json2xml({ VersioningConfiguration: VersioningConfiguration });

    var headers = {};
    headers['x-cos-mfa'] = params.MFA;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?versioning',
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
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?versioning'
    }, function (err, data) {
        if (!err) {
            !data.VersioningConfiguration && (data.VersioningConfiguration = {});
            !data.VersioningConfiguration.MFADelete && (data.VersioningConfiguration.MFADelete = 'Disabled');
            !data.VersioningConfiguration.Status && (data.VersioningConfiguration.Status = 'Disabled');
        }
        callback(err, data);
    });
}

function putBucketReplication(params, callback) {
    var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);
    ReplicationConfiguration.Rule = ReplicationConfiguration.Rules;
    delete ReplicationConfiguration.Rules;
    var xml = util.json2xml({ ReplicationConfiguration: ReplicationConfiguration });

    var headers = {};
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?replication',
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
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?replication'
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
        callback(err, data);
    });
}

function deleteBucketReplication(params, callback) {
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?replication'
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
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          为指定 object 的元数据，如果设置了 IfModifiedSince ，且文件未修改，则返回一个对象，NotModified 属性为 true
 *     @return  {Boolean}  data.NotModified         是否在 IfModifiedSince 时间点之后未修改该 object，则为 true
 */
function headObject(params, callback) {
    var headers = {};
    headers['If-Modified-Since'] = params['IfModifiedSince'];

    submitRequest.call(this, {
        method: 'HEAD',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true,
                    statusCode: statusCode
                });
            }
            return callback(err);
        }
        callback(null, data);
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
 * @param  {Object}  err                                    请求失败的错误，如果请求成功，则为空。
 * @param  {Object}  data                                   为对应的 object 数据，包括 body 和 headers
 */
function getObject(params, callback) {
    var self = this;
    var headers = {};
    var reqParams = {};

    headers['Range'] = params['Range'];
    headers['If-Modified-Since'] = params['IfModifiedSince'];
    headers['If-Unmodified-Since'] = params['IfUnmodifiedSince'];
    headers['If-Match'] = params['IfMatch'];
    headers['If-None-Match'] = params['IfNoneMatch'];

    reqParams['response-content-type'] = params['ResponseContentType'];
    reqParams['response-content-language'] = params['ResponseContentLanguage'];
    reqParams['response-expires'] = params['ResponseExpires'];
    reqParams['response-cache-control'] = params['ResponseCacheControl'];
    reqParams['response-content-disposition'] = params['ResponseContentDisposition'];
    reqParams['response-content-encoding'] = params['ResponseContentEncoding'];

    var BodyType;

    BodyType = util.isBrowser ? 'string' : 'buffer';

    // 如果用户自己传入了 output
    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers,
        qs: reqParams,
        rawBody: true
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true
                });
            }
            return callback(err);
        }
        var result = {};
        if (BodyType === 'string') {
            result.Body = data.body;
        }
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

/**
 * 上传 object
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 文件名称，必须
 *     @param  {Buffer || ReadStream || File || Blob}  params.Body  上传文件的内容或者流
 *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须
 *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
 *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须
 *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须
 *     @param  {String}  params.GrantRead                           赋予被授权者读的权限，格式 x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite                          赋予被授权者写的权限，格式 x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl                    赋予被授权者读写权限，格式 x-cos-grant-full-control: uin=" ",uin=" "，非必须
 *     @param  {Function}  params.onProgress                        上传进度回调函数
 * @param  {Function}  callback                                     回调函数，必须
 * @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                                          为对应的 object 数据
 *     @return  {String}  data.ETag                                 为对应上传文件的 ETag 值
 */
function putObject(params, callback) {
    var self = this;
    var headers = {};

    headers['Cache-Control'] = params['CacheControl'];
    headers['Content-Disposition'] = params['ContentDisposition'];
    headers['Content-Encoding'] = params['ContentEncoding'];
    headers['Content-MD5'] = params['ContentMD5'];
    headers['Content-Length'] = params['ContentLength'];
    headers['Content-Type'] = params['ContentType'];
    headers['Expect'] = params['Expect'];
    headers['Expires'] = params['Expires'];
    headers['x-cos-acl'] = params['ACL'];
    headers['x-cos-grant-read'] = params['GrantRead'];
    headers['x-cos-grant-write'] = params['GrantWrite'];
    headers['x-cos-grant-full-control'] = params['GrantFullControl'];
    headers['x-cos-storage-class'] = params['StorageClass'];

    for (var key in params) {
        if (key.indexOf('x-cos-meta-') > -1) {
            headers[key] = params[key];
        }
    }

    var Body = params.Body;
    var readStream;

    if (util.isBrowser && Body && (Body instanceof global.Blob || Body instanceof global.File)) {
        // 在浏览器允许传入 Blob 或者 File 文件内容
        headers['Content-Length'] = Body.size;
    } else if (util.isBrowser && Body && typeof Body === 'string') {
        // 在浏览器允许传入字符串作为内容 'hello'
        headers['Content-Length'] = Body.length;
    } else if (Body && Body instanceof Buffer) {
        // 传入 fs.readFileSync(filepath) 或者 文件内容
        headers['Content-Length'] = Body.length;
    } else if (Body && typeof Body.pipe === 'function') {
        // fs.createReadStream(filepath)
        readStream = Body;
        Body = null;
        if (headers['Content-Length'] === undefined) {
            callback({ error: 'lack of param ContentLength' });
            return;
        }
    } else {
        callback({ error: 'params body format error, Only allow Buffer, Stream, Blob.' });
        return;
    }
    var onProgress = util.throttleOnProgress.call(self, headers['Content-Length'], params.onProgress);

    submitRequest.call(this, {
        TaskId: params.TaskId,
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers,
        body: Body,
        onProgress: onProgress
    }, function (err, data) {
        onProgress(null, true);
        if (err) {
            return callback(err);
        }
        if (data && data.headers && data.headers['etag']) {
            var url = getUrl({
                domain: self.options.Domain,
                bucket: params.Bucket,
                region: params.Region,
                object: params.Key
            });
            return callback(null, {
                Location: url,
                ETag: data.headers['etag'],
                statusCode: data.statusCode,
                headers: data.headers
            });
        }
        callback(null, data);
    });
}

/**
 * 删除 object
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 *     @param  {String}  params.Key             object名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @param  {Object}  err                        请求失败的错误，如果请求成功，则为空。
 * @param  {Object}  data                       删除操作成功之后返回的数据
 */
function deleteObject(params, callback) {
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (statusCode && statusCode === 204) {
                return callback(null, { statusCode: statusCode });
            } else if (statusCode && statusCode === 404) {
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
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  权限列表
 */
function getObjectAcl(params, callback) {

    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: '?acl'
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var Owner = data.AccessControlPolicy.Owner || {};
        var Grant = data.AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(data.AccessControlPolicy);
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
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回的数据
 */
function putObjectAcl(params, callback) {
    var headers = {};

    headers['x-cos-acl'] = params['ACL'];
    headers['x-cos-grant-read'] = params['GrantRead'];
    headers['x-cos-grant-write'] = params['GrantWrite'];
    headers['x-cos-grant-full-control'] = params['GrantFullControl'];

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = { Grant: Grants };
        xml = util.json2xml({ AccessControlPolicy: AccessControlPolicy });
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
        headers['Content-Type'] = 'application/xml';
    }

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: '?acl',
        headers: headers,
        body: xml
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
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
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data              返回的数据
 */
function optionsObject(params, callback) {
    var headers = {};

    headers['Origin'] = params['Origin'];
    headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];
    headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];

    submitRequest.call(this, {
        method: 'OPTIONS',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode == 403) {
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
 *     @param  {String}  CopySourceIfMatch              当Object的Etag和给定一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Unmodified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfNoneMatch          当Object的Etag和给定不一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Modified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  StorageClass                   存储级别，枚举值：存储级别，枚举值：Standard, Standard_IA，Nearline；默认值：Standard
 *     @param  {String}  CacheControl                   指定所有缓存机制在整个请求/响应链中必须服从的指令。
 *     @param  {String}  ContentDisposition             MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
 *     @param  {String}  ContentEncoding                HTTP 中用来对「采用何种编码格式传输正文」进行协定的一对头部字段
 *     @param  {String}  ContentLength                  设置响应消息的实体内容的大小，单位为字节
 *     @param  {String}  ContentType                    RFC 2616 中定义的 HTTP 请求内容类型（MIME），例如text/plain
 *     @param  {String}  Expect                         请求的特定的服务器行为
 *     @param  {String}  Expires                        响应过期的日期和时间
 *     @param  {String}  ContentLanguage                指定内容语言
 *     @param  {String}  x-cos-meta-*                   允许用户自定义的头部信息，将作为 Object 元数据返回。大小限制2K。
 */
function putObjectCopy(params, callback) {
    var headers = {};

    headers['x-cos-copy-source'] = params['CopySource'];
    headers['x-cos-metadata-directive'] = params['MetadataDirective'];
    headers['x-cos-copy-source-If-Modified-Since'] = params['CopySourceIfModifiedSince'];
    headers['x-cos-copy-source-If-Unmodified-Since'] = params['CopySourceIfUnmodifiedSince'];
    headers['x-cos-copy-source-If-Match'] = params['CopySourceIfMatch'];
    headers['x-cos-copy-source-If-None-Match'] = params['CopySourceIfNoneMatch'];
    headers['x-cos-storage-class'] = params['StorageClass'];
    headers['x-cos-acl'] = params['ACL'];
    headers['x-cos-grant-read'] = params['GrantRead'];
    headers['x-cos-grant-write'] = params['GrantWrite'];
    headers['x-cos-grant-full-control'] = params['GrantFullControl'];
    headers['Cache-Control'] = params['CacheControl'];
    headers['Content-Disposition'] = params['ContentDisposition'];
    headers['Content-Encoding'] = params['ContentEncoding'];
    headers['Content-Length'] = params['ContentLength'];
    headers['Content-Type'] = params['ContentType'];
    headers['Expect'] = params['Expect'];
    headers['Expires'] = params['Expires'];

    for (var key in params) {
        if (key.indexOf('x-cos-meta-') > -1) {
            headers[key] = params[key];
        }
    }

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var result = util.clone(data.CopyObjectResult);
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function uploadPartCopy(params, callback) {
    var headers = {};

    headers['x-cos-copy-source'] = params['CopySource'];
    headers['x-cos-copy-source-Range'] = params['CopySourceRange'];
    headers['x-cos-copy-source-If-Modified-Since'] = params['CopySourceIfModifiedSince'];
    headers['x-cos-copy-source-If-Unmodified-Since'] = params['CopySourceIfUnmodifiedSince'];
    headers['x-cos-copy-source-If-Match'] = params['CopySourceIfMatch'];
    headers['x-cos-copy-source-If-None-Match'] = params['CopySourceIfNoneMatch'];

    var action = '?partNumber=' + params['PartNumber'] + '&uploadId=' + params['UploadId'];

    submitRequest.call(this, {
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: action,
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var result = util.clone(data.CopyObjectResult);
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
    });
}

function deleteMultipleObject(params, callback) {
    var headers = {};

    headers['Content-Type'] = 'application/xml';

    var Objects = params.Objects || {};
    var Quiet = params.Quiet;

    var DeleteConfiguration = {
        Delete: {
            Object: Objects,
            Quiet: Quiet || false
        }
    };

    var xml = util.json2xml(DeleteConfiguration);

    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    headers['Content-Length'] = Buffer.byteLength(xml, 'utf8');

    submitRequest.call(this, {
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: '/?delete',
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var Deleted = data.DeleteResult.Deleted || [];
        var Errors = data.DeleteResult.Error || [];

        Deleted = util.isArray(Deleted) ? Deleted : [Deleted];
        Errors = util.isArray(Errors) ? Errors : [Errors];

        var result = util.clone(data.DeleteResult);
        util.extend(result, {
            Error: Errors,
            Deleted: Deleted,
            statusCode: data.statusCode,
            headers: data.headers
        });
        callback(null, result);
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
 *     @param  {String}  params.StorageClass                    设置Object的存储级别，枚举值：Standard，Standard_IA，Nearline，非必须
 * @param  {Function}  callback                                 回调函数，必须
 * @return  {Object}  err                                       请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                                      返回的数据
 */
function multipartInit(params, callback) {
    var headers = {};

    headers['Cache-Control'] = params['CacheControl'];
    headers['Content-Disposition'] = params['ContentDisposition'];
    headers['Content-Encoding'] = params['ContentEncoding'];
    headers['Content-Type'] = params['ContentType'];
    headers['Expires'] = params['Expires'];

    headers['x-cos-acl'] = params['ACL'];
    headers['x-cos-grant-read'] = params['GrantRead'];
    headers['x-cos-grant-write'] = params['GrantWrite'];
    headers['x-cos-grant-full-control'] = params['GrantFullControl'];
    headers['x-cos-storage-class'] = params['StorageClass'];

    for (var key in params) {
        if (key.indexOf('x-cos-meta-') > -1) {
            headers[key] = params[key];
        }
    }

    submitRequest.call(this, {
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: '?uploads',
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        data = util.clone(data || {});
        if (data && data.InitiateMultipartUploadResult) {
            return callback(null, util.extend(data.InitiateMultipartUploadResult, {
                statusCode: data.statusCode,
                headers: data.headers
            }));
        }
        callback(null, data);
    });
}

/**
 * 分块上传
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 *     @param  {String}  params.Key             object名称，必须
 * @param  {String}      params.ContentLength   RFC 2616 中定义的 HTTP 请求内容长度（字节），非必须
 * @param  {String}      params.Expect          当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 * @param  {String}      params.ContentSha1     RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验值，非必须
 * @param  {Function}  callback                 回调函数，必须
 * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                      返回的数据
 *     @return  {Object}  data.ETag             返回的文件分块 sha1 值
 */
function multipartUpload(params, callback) {
    var headers = {};

    headers['Content-Length'] = params['ContentLength'];
    headers['Expect'] = params['Expect'];

    var PartNumber = params['PartNumber'];
    var UploadId = params['UploadId'];

    var action = '?partNumber=' + PartNumber + '&uploadId=' + UploadId;

    submitRequest.call(this, {
        TaskId: params.TaskId,
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: action,
        headers: headers,
        onProgress: params.onProgress,
        body: params.Body || null
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        data['headers'] = data['headers'] || {};
        callback(null, {
            ETag: data['headers']['etag'] || '',
            statusCode: data.statusCode,
            headers: data.headers
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
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                              返回的数据
 *     @return  {Object}  data.CompleteMultipartUpload  完成分块上传后的文件信息，包括Location, Bucket, Key 和 ETag
 */
function multipartComplete(params, callback) {
    var self = this;
    var headers = {};

    headers['Content-Type'] = 'application/xml';

    var UploadId = params.UploadId;

    var action = '?uploadId=' + UploadId;

    var Parts = params['Parts'];

    for (var i = 0, len = Parts.length; i < len; i++) {
        if (Parts[i]['ETag'].indexOf('"') == 0) {
            continue;
        }
        Parts[i]['ETag'] = '"' + Parts[i]['ETag'] + '"';
    }

    var PartData = {
        'CompleteMultipartUpload': {
            'Part': Parts
        }
    };

    var xml = util.json2xml(PartData);

    headers['Content-length'] = Buffer.byteLength(xml, 'utf8');
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: action,
        body: xml,
        headers: headers
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var url = getUrl({
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            object: params.Key,
            isLocation: true
        });
        var result = util.extend(data.CompleteMultipartUploadResult, {
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
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。
 * @return  {Object}  data                                  返回的数据
 *     @return  {Object}  data.ListMultipartUploadsResult   分块上传任务信息
 */
function multipartList(params, callback) {
    var reqParams = {};

    reqParams['delimiter'] = params['Delimiter'];
    reqParams['encoding-type'] = params['EncodingType'];
    reqParams['prefix'] = params['Prefix'];

    reqParams['max-uploads'] = params['MaxUploads'];

    reqParams['key-marker'] = params['KeyMarker'];
    reqParams['upload-id-marker'] = params['UploadIdMarker'];

    reqParams = util.clearKey(reqParams);

    submitRequest.call(this, {
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        action: '/?uploads&' + queryString.stringify(reqParams)
    }, function (err, data) {
        if (err) {
            return callback(err);
        }

        if (data && data.ListMultipartUploadsResult) {
            var Upload = data.ListMultipartUploadsResult.Upload || [];

            var CommonPrefixes = data.ListMultipartUploadsResult.CommonPrefixes || [];

            CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];
            Upload = util.isArray(Upload) ? Upload : [Upload];

            data.ListMultipartUploadsResult.Upload = Upload;
            data.ListMultipartUploadsResult.CommonPrefixes = CommonPrefixes;
        }
        var result = util.clone(data.ListMultipartUploadsResult);
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
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。
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
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        qs: reqParams
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var Part = data.ListPartsResult.Part || [];
        Part = util.isArray(Part) ? Part : [Part];

        data.ListPartsResult.Part = Part;
        var result = util.clone(data.ListPartsResult);
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
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。
 *     @return  {Object}    data            返回的数据
 */
function multipartAbort(params, callback) {
    var reqParams = {};

    reqParams['uploadId'] = params['UploadId'];
    submitRequest.call(this, {
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        qs: reqParams
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
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
    return util.getAuth({
        Method: params.Method,
        Key: params.Key,
        Expires: params.Expires,
        SecretId: params.SecretId || this.options.SecretId || '',
        SecretKey: params.SecretKey || this.options.SecretKey || ''
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
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。
 *     @return  {Object}    data            返回的数据
 */
function getObjectUrl(params, callback) {
    var self = this;
    var url = getUrl({
        domain: self.options.Domain,
        bucket: params.Bucket,
        region: params.Region,
        object: params.Key
    });
    if (params.Sign !== undefined && !params.Sign) {
        callback(null, { Url: url });
        return url;
    }
    var authorization = getAuthorizationAsync.call(this, {
        Method: params.Method || 'get',
        Key: params.Key
    }, function (AuthData) {
        if (!callback) return;
        var result = {
            Url: url + '?sign=' + encodeURIComponent(AuthData.Authorization)
        };
        AuthData.XCosSecurityToken && (result.XCosSecurityToken = AuthData.XCosSecurityToken);
        AuthData.ClientIP && (result.ClientIP = AuthData.ClientIP);
        AuthData.ClientUA && (result.ClientUA = AuthData.ClientUA);
        AuthData.Token && (result.Token = AuthData.Token);
        setTimeout(function () {
            callback(null, result);
        });
    });
    if (authorization) {
        return url + '?sign=' + encodeURIComponent(authorization);
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
    var Grant = AccessControlPolicy.AccessControlList.Grant;
    if (Grant) {
        Grant = util.isArray(Grant) ? Grant : [Grant];
    }
    var PublicAcl = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
    Grant.length && util.each(Grant, function (item) {
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
        result[item] = result[item].join(',');
    });
    return result;
}

// 生成操作 url
function getUrl(params) {
    var longBucket = params.bucket;
    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
    var domain = params.domain;
    var region = params.region;
    var object = params.object;
    var action = params.action;
    var protocol = util.isBrowser && location.protocol === 'https:' ? 'https:' : 'http:';
    if (!domain) {
        if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {
            domain = '{{Bucket}}-{{AppId}}.{{Region}}.myqcloud.com';
        } else {
            domain = '{{Bucket}}-{{AppId}}.cos.{{Region}}.myqcloud.com';
        }
    }
    domain = domain.replace(/\{\{AppId\}\}/ig, appId).replace(/\{\{Bucket\}\}/ig, shortBucket).replace(/\{\{Region\}\}/ig, region).replace(/\{\{.*?\}\}/ig, '');
    if (!/^[a-zA-Z]+:\/\//.test(domain)) {
        domain = protocol + '//' + domain;
    }
    if (domain.slice(-1) === '/') {
        domain = domain.slice(0, -1);
    }
    var url = domain;

    if (object) {
        url += '/' + encodeURIComponent(object).replace(/%2F/g, '/');
    }

    if (action) {
        url += action;
    }
    if (params.isLocation) {
        url = url.replace(/^https?:\/\//, '');
    }
    return url;
}

// 异步获取签名
function getAuthorizationAsync(params, callback) {
    var self = this;
    if (self.options.getAuthorization) {
        // 外部计算签名
        self.options.getAuthorization.call(self, {
            Method: params.Method,
            Key: params.Key
        }, function (AuthData) {
            if (typeof AuthData === 'string') {
                AuthData = { Authorization: AuthData };
            }
            callback && callback(AuthData);
        });
    } else if (self.options.getSTS) {
        // 外部获取临时密钥
        var Bucket = params.Bucket || '';
        self._StsMap = self._StsMap || {};
        var StsData = self._StsMap[Bucket] || {};
        var runTemp = function () {
            var Authorization = util.getAuth({
                SecretId: StsData.SecretId,
                SecretKey: StsData.SecretKey,
                Method: params.Method,
                Key: params.Key
            });
            var AuthData = {
                Authorization: Authorization,
                XCosSecurityToken: StsData.XCosSecurityToken || '',
                Token: StsData.Token || '',
                ClientIP: StsData.ClientIP || '',
                ClientUA: StsData.ClientUA || ''
            };
            callback && callback(AuthData);
        };
        if (StsData.ExpiredTime && StsData.ExpiredTime - (Date.now() / 1000 > 60)) {
            // 如果缓存的临时密钥有效，并还有超过60秒有效期就直接使用
            runTemp();
        } else {
            // 如果有效时间小于 60 秒就重新获取临时密钥
            self.options.getSTS.call(self, {
                Bucket: Bucket
            }, function (data) {
                StsData = self._StsMap[Bucket] = data || {};
                runTemp();
            });
        }
    } else {
        // 内部计算获取签名
        var Authorization = util.getAuth({
            SecretId: params.SecretId || self.options.SecretId,
            SecretKey: params.SecretKey || self.options.SecretKey,
            Method: params.Method,
            Key: params.Key
            // headers: opt.headers,
        });
        callback && callback({ Authorization: Authorization });
        return Authorization;
    }
    return '';
}

// 获取签名并发起请求
function submitRequest(params, callback) {
    var self = this;
    getAuthorizationAsync.call(self, {
        Method: params.method,
        Key: params.Key
    }, function (AuthData) {
        params.AuthData = AuthData;
        _submitRequest.call(self, params, callback);
    });
}

// 发起请求
function _submitRequest(params, callback) {
    var self = this;
    var TaskId = params.TaskId;
    if (TaskId && !self._isRunningTask(TaskId)) return;

    var bucket = params.Bucket;
    var region = params.Region;
    var object = params.Key;
    var action = params.action;
    var method = params.method || 'GET';
    var headers = params.headers || {};
    var url = params.url;
    var body = params.body;
    var json = params.json;
    var rawBody = params.rawBody;
    var qs = params.qs;

    var opt = {
        url: url || getUrl({
            domain: self.options.Domain,
            bucket: bucket,
            region: region,
            object: object,
            action: action
        }),
        method: method,
        headers: headers || {},
        qs: qs,
        body: body,
        json: json
    };

    // 获取签名
    opt.headers.Authorization = params.AuthData.Authorization;
    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
    params.AuthData.XCosSecurityToken && (opt.headers['x-cos-security-token'] = params.AuthData.XCosSecurityToken);

    // 预先处理 undefined 和 null 的属性
    opt.headers && (opt.headers = util.clearKey(opt.headers));
    opt.qs && (opt.qs = util.clearKey(opt.qs));
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

    var sender = REQUEST(opt, function (err, response, body) {

        // 返回内容添加 状态码 和 headers
        var cb = function (err, data) {
            TaskId && self.off('inner-kill-task', killTask);
            if (TaskId && !self._isRunningTask(TaskId)) return;
            if (err) {
                err = err || {};
                response && response.statusCode && (err.statusCode = response.statusCode);
                response && response.headers && (err.headers = response.headers);
                callback(err, null);
            } else {
                data = data || {};
                response && response.statusCode && (data.statusCode = response.statusCode);
                response && response.headers && (data.headers = response.headers);
                callback(null, data);
            }
        };

        // 请求错误，发生网络错误
        if (err) {
            cb({ error: err });
            return;
        }

        var jsonRes;
        try {
            jsonRes = util.xml2json(body) || {};
        } catch (e) {
            jsonRes = body || {};
        }

        // 请求返回码不为 200
        var statusCode = response.statusCode;
        if (statusCode !== 200 && statusCode !== 204 && statusCode !== 206) {
            cb({ error: jsonRes.Error || jsonRes });
            return;
        }

        // 不对 body 进行转换，body 直接挂载返回
        if (rawBody) {
            jsonRes = {};
            jsonRes.body = body;
        }

        if (jsonRes.Error) {
            cb({ error: jsonRes.Error });
            return;
        }
        cb(null, jsonRes);
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
    getBucket: getBucket,
    headBucket: headBucket,
    deleteBucket: deleteBucket,
    getBucketAcl: getBucketAcl,
    putBucketAcl: putBucketAcl,
    getBucketCors: getBucketCors,
    putBucketCors: putBucketCors,
    deleteBucketCors: deleteBucketCors,
    getBucketLocation: getBucketLocation,
    putBucketTagging: putBucketTagging,
    getBucketTagging: getBucketTagging,
    deleteBucketTagging: deleteBucketTagging,
    getBucketPolicy: getBucketPolicy,
    putBucketPolicy: putBucketPolicy,
    getBucketLifecycle: getBucketLifecycle,
    putBucketLifecycle: putBucketLifecycle,
    deleteBucketLifecycle: deleteBucketLifecycle,
    putBucketVersioning: putBucketVersioning,
    getBucketVersioning: getBucketVersioning,
    putBucketReplication: putBucketReplication,
    getBucketReplication: getBucketReplication,
    deleteBucketReplication: deleteBucketReplication,

    // Object 相关方法
    getObject: getObject,
    headObject: headObject,
    putObject: putObject,
    deleteObject: deleteObject,
    getObjectAcl: getObjectAcl,
    putObjectAcl: putObjectAcl,
    optionsObject: optionsObject,
    putObjectCopy: putObjectCopy,

    // 分块上传相关方法
    uploadPartCopy: uploadPartCopy,
    multipartInit: multipartInit,
    multipartUpload: multipartUpload,
    multipartComplete: multipartComplete,
    multipartList: multipartList,
    multipartListPart: multipartListPart,
    multipartAbort: multipartAbort,
    deleteMultipleObject: deleteMultipleObject,

    // 工具方法
    getObjectUrl: getObjectUrl,
    getAuth: getAuth
};

util.each(API_MAP, function (fn, apiName) {
    exports[apiName] = util.apiWrapper(apiName, fn);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2).Buffer))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
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

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var queryString = __webpack_require__(4);

var $ = function () {
    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};

    var version = "1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap",


    // Define a local copy of jQuery
    jQuery = function (selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init(selector, context);
    },


    // Support: Android<4.1, IE<9
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,


    // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function (all, letter) {
        return letter.toUpperCase();
    };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {
            return num != null ?

            // Return just the one element from the set
            num < 0 ? this[num + this.length] : this[num] :

            // Return all the elements in a clean array
            slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var src,
            copyIsArray,
            copy,
            name,
            options,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function (obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function (obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function (obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {}

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                (window.execScript || function (data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1, IE<9
        trim: function (text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            var args, proxy, tmp;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function () {
            return +new Date();
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }

    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,


    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,


    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function (selector, context) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // Handle HTML strings
        if (typeof selector === "string") {
            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [null, selector, null];
            } else {
                match = rquickExpr.exec(selector);
            }

            // Match html or make sure no context is specified for #id
            if (match && (match[1] || !context)) {

                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;

                    // scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

                    // HANDLE: $(html, props)
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            // Properties of context are called as methods if possible
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);

                                // ...and otherwise set as attributes
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }

                    return this;

                    // HANDLE: $(#id)
                } else {
                    elem = document.getElementById(match[2]);

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if (elem && elem.parentNode) {
                        // Handle the case where IE and Opera return items
                        // by name instead of ID
                        if (elem.id !== match[2]) {
                            return rootjQuery.find(selector);
                        }

                        // Otherwise, we inject the element directly into the jQuery object
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

                // HANDLE: $(expr, $(...))
            } else if (!context || context.jquery) {
                return (context || rootjQuery).find(selector);

                // HANDLE: $(expr, context)
                // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor(context).find(selector);
            }

            // HANDLE: $(DOMElement)
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;

            // HANDLE: $(function)
            // Shortcut for document ready
        } else if (jQuery.isFunction(selector)) {
            return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) :
            // Execute immediately if ready is not present
            selector(jQuery);
        }

        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return jQuery.makeArray(selector, this);
    };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);

    var rnotwhite = /\S+/g;

    // String to Object options format cache
    var optionsCache = {};

    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);

        var // Flag to know if list is currently firing
        firing,

        // Last fire value (for non-forgettable lists)
        memory,

        // Flag to know if list was already fired
        fired,

        // End of the loop when firing
        firingLength,

        // Index of currently firing callback (modified by remove if needed)
        firingIndex,

        // First callback to fire (used internally by add and fireWith)
        firingStart,

        // Actual callback list
        list = [],

        // Stack of fire calls for repeatable lists
        stack = !options.once && [],

        // Fire callbacks
        fire = function (data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (; list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false; // To prevent further calls using add
                    break;
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift());
                    }
                } else if (memory) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        },

        // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function () {
                if (list) {
                    // First, we save the current length
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function (_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                // Inspect recursively
                                add(arg);
                            }
                        });
                    })(arguments);
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if (firing) {
                        firingLength = list.length;
                        // With memory, if we're not firing then
                        // we should call right away
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove: function () {
                if (list) {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            // Handle firing indexes
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function (fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            // Remove all callbacks from the list
            empty: function () {
                list = [];
                firingLength = 0;
                return this;
            },
            // Have the list do nothing anymore
            disable: function () {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled: function () {
                return !list;
            },
            // Lock the list in its current state
            lock: function () {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked: function () {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function (context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire: function () {
                self.fireWith(this, arguments);
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function () {
                return !!fired;
            }
        };

        return self;
    };

    jQuery.extend({

        Deferred: function (func) {
            var tuples = [
            // action, add listener, listener list, final state
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
                state = "pending",
                promise = {
                state: function () {
                    return state;
                },
                always: function () {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function () /* fnDone, fnFail, fnProgress */{
                    var fns = arguments;
                    return jQuery.Deferred(function (newDefer) {
                        jQuery.each(tuples, function (i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            deferred[tuple[1]](function () {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                } else {
                                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function (obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];

                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function () {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }

                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (subordinate /* , ..., subordinateN */) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,


            // the count of uncompleted subordinates
            remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


            // Update function for both resolve and progress values
            updateFunc = function (i, contexts, values) {
                return function (value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values);
                    } else if (! --remaining) {
                        deferred.resolveWith(contexts, values);
                    }
                };
            },
                progressValues,
                progressContexts,
                resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });

    // The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function (fn) {
        // Add the callback
        jQuery.ready.promise().done(fn);

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);

            // Trigger any bound ready events
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function (obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed, false);

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };

    var strundefined = typeof undefined;

    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";

    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;

    // Execute ASAP in case we need to set body.style.zoom
    jQuery(function () {
        // Minified: var a,b,c,d
        var val, div, body, container;

        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);

        if (typeof div.style.zoom !== strundefined) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild(container);
    });

    (function () {
        var div = document.createElement("div");

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();

    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function (elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ? false :

        // Nodes accept data unless otherwise specified; rejection can be conditional
        !noData || noData !== true && elem.getAttribute("classid") === noData;
    };

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null :
                    // Only convert to a number if it doesn't change the string
                    +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }

        return data;
    }

    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    function internalData(elem, name, data, pvt /* Internal Use Only */) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var ret,
            thisCache,
            internalKey = jQuery.expando,


        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
        isNode = elem.nodeType,


        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
        cache = isNode ? jQuery.cache : elem,


        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
        id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") {
            return;
        }

        if (!id) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if (!cache[id]) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : { toJSON: jQuery.noop };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }

        thisCache = cache[id];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {

            // First Try to find as-is property data
            ret = thisCache[name];

            // Test for null|undefined property data
            if (ret == null) {

                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var thisCache,
            i,
            isNode = elem.nodeType,


        // See jQuery.data for more information
        cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }

        if (name) {

            thisCache = pvt ? cache[id] : cache[id].data;

            if (thisCache) {

                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {

                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [name];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }

                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([elem], true);

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];

            // When all else fails, null
        } else {
            cache[id] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },

        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },

        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },

        // For internal use only.
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },

        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i,
                name,
                data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }

            return arguments.length > 1 ?

            // Sets one value
            this.each(function () {
                jQuery.data(this, key, value);
            }) :

            // Gets one value
            // Try to fetch any internally stored data first
            elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },

        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });

    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                jQuery.dequeue(elem, type);
            };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ? this : this.each(function () {
                var queue = jQuery.queue(this, type, data);

                // ensure a hooks for this queue
                jQuery._queueHooks(this, type);

                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                if (! --count) {
                    defer.resolveWith(elements, [elements]);
                }
            };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {
            var tmp,
                events,
                t,
                handleObjIn,
                special,
                eventHandle,
                handleObj,
                handlers,
                type,
                namespaces,
                origType,
                elemData = jQuery._data(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j,
                handleObj,
                tmp,
                origCount,
                t,
                events,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },

        trigger: function (event, data, elem, onlyHandlers) {
            var handle,
                ontype,
                cur,
                bubbleType,
                special,
                tmp,
                i,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [event] : jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                event.type = i > 1 ? bubbleType : special.bindType || type;

                // jQuery handler
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function (event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);

            var i,
                ret,
                handleObj,
                matched,
                j,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var sel,
                handleObj,
                matches,
                i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

                /* jshint eqeqeq: false */
                for (; cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({ elem: cur, handlers: matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
            }

            return handlerQueue;
        },

        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i,
                prop,
                copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];

            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = new jQuery.Event(originalEvent);

            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (event, original) {
                var body,
                    eventDoc,
                    doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function (type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function (elem, type, handle) {
        var name = "on" + type;

        if (elem.detachEvent) {

            // #8545, #7054, preventing memory leaks for custom events in IE6-8
            // detachEvent needed property on element, by name of that event, to properly expose it to GC
            if (typeof elem[name] === strundefined) {
                elem[name] = null;
            }

            elem.detachEvent(name, handle);
        }
    };

    jQuery.Event = function (src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&
            // Support: IE < 9, Android < 4.0
            src.returnValue === false ? returnTrue : returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // IE submit delegation
    if (!support.submitBubbles) {

        jQuery.event.special.submit = {
            setup: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function (event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function (event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },

            teardown: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

    // IE change delegation and checkbox/radio fix
    if (!support.changeBubbles) {

        jQuery.event.special.change = {

            setup: function () {

                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function (event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function (event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },

            handle: function (event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown: function () {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

    // Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };

            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function (types, selector, data, fn, /*INTERNAL*/one) {
            var type, origFn;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }

            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }

            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });

    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function () {
                clearTimeout(timeout);
            };
        });
    };

    var nonce = jQuery.now();

    var rquery = /\?/;

    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function (data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim(data + "");

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {

            // Force termination if we see a misplaced comma
            if (requireNonComma && comma) {
                depth = 0;
            }

            // Perform no more replacements after returning to outermost depth
            if (depth === 0) {
                return token;
            }

            // Commas must not follow "[", "{", or ","
            requireNonComma = open || comma;

            // Determine new depth
            // array/object open ("[" or "{"): depth += true - false (increment)
            // array/object close ("]" or "}"): depth += false - true (decrement)
            // other cases ("," or primitive): depth += true - true (numeric cast)
            depth += !close - !open;

            // Remove this token
            return "";
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    };

    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) {
                // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else {
                // IE
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };

    var
    // Document location
    ajaxLocParts,
        ajaxLocation,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,


    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},


    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},


    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat("*");

    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while (dataType = dataTypes[i++]) {
                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = structure === transports;

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var deep,
            key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType,
            ct,
            finalDataType,
            type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2,
            current,
            conv,
            tmp,
            prev,
            converters = {},

        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

            // Building a settings object
            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

            // Extending ajaxSettings
            ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
            parts,

            // Loop variable
            i,

            // URL without anti-cache param
            cacheURL,

            // Response headers as string
            responseHeadersString,

            // timeout handle
            timeoutTimer,


            // To know if global events are to be dispatched
            fireGlobals,
                transport,

            // Response headers
            responseHeaders,

            // Create the final options object
            s = jQuery.ajaxSetup({}, options),

            // Callbacks context
            callbackContext = s.context || s,

            // Context for global events is callbackContext if it is a DOM node or jQuery collection
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,

            // Deferreds
            deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),

            // Status-dependent callbacks
            statusCode = s.statusCode || {},

            // Headers (they are sent all at once)
            requestHeaders = {},
                requestHeadersNames = {},

            // The jqXHR state
            state = 0,

            // Default abort message
            strAbort = "canceled",

            // Fake xhr
            jqXHR = {
                readyState: 0,

                // Builds headers hashtable if needed
                getResponseHeader: function (key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },

                // Raw string
                getAllResponseHeaders: function () {
                    return state === 2 ? responseHeadersString : null;
                },

                // Caches the header
                setRequestHeader: function (name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },

                // Overrides response content-type header
                overrideMimeType: function (type) {
                    if (!state) {
                        s.mimeType = type;
                    }
                    return this;
                },

                // Status-dependent callbacks
                statusCode: function (map) {
                    var code;
                    if (map) {
                        if (state < 2) {
                            for (code in map) {
                                // Lazy-add the new callback in a way that preserves old ones
                                statusCode[code] = [statusCode[code], map[code]];
                            }
                        } else {
                            // Execute the appropriate callbacks
                            jqXHR.always(map[jqXHR.status]);
                        }
                    }
                    return this;
                },

                // Cancel the request
                abort: function (statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };

            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ?

                    // If there is already a '_' parameter, set its value
                    cacheURL.replace(rts, "$1_=" + nonce++) :

                    // Otherwise add one to the end
                    cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            // jqXHR.setRequestHeader(
            //     "Accept",
            //     s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
            //         s.accepts[s.dataTypes[0]] + ( s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
            //         s.accepts["*"]
            // );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in { success: 1, error: 1, complete: 1 }) {
                jqXHR[i](s[i]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess,
                    success,
                    error,
                    response,
                    modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    // Handle the global AJAX counter
                    if (! --jQuery.active) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

    // Attach a bunch of functions for handling common AJAX events
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });

    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };

    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function () {
                var type = this.type;
                // Use .is(":disabled") so that fieldset[disabled] works
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();

                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
        }
    });

    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
    // Support: IE6+
    function () {

        // XHR cannot access local files, always use ActiveX for that case
        return !this.isLocal &&

        // Support: IE7-8
        // oldIE XHR does not support non-RFC2616 methods (#13240)
        // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
        // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
        // Although this check for six methods instead of eight
        // since IE also does not support "trace" and "connect"
        /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }

    // Determine support properties
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    xhrSupported = support.ajax = !!xhrSupported;

    // Create transport if the browser can provide an xhr
    if (xhrSupported) {

        jQuery.ajaxTransport(function (options) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {

                var callback;

                return {
                    send: function (headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open(options.type, options.url, options.async, options.username, options.password);

                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }

                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for (i in headers) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }

                        if (xhr.upload && options.progress) {
                            xhr.upload.onprogress = options.progress;
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send(options.hasContent && (options.body || options.data) || null);

                        // Listener
                        callback = function (_, isAbort) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };

                        if (!options.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback);
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },

                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }

    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }

    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function (_, callback) {

                    script = document.createElement("script");

                    script.async = true;

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function (_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },

                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });

    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName,
            overwritten,
            responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {
                // Restore preexisting value
                window[callbackName] = overwritten;

                // Save back as free
                if (s[callbackName]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });

    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = jQuery.buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };

    return jQuery;
}();

var request = function (options, callback) {

    options = $.extend(true, { headers: {}, qs: {} }, options);

    // method
    options.type = options.method;
    delete options.method;

    // progress
    if (options.onProgress) {
        options.progress = options.onProgress;
        delete options.onProgress;
    }

    // qs
    if (options.qs) {
        var qsStr = queryString.stringify(options.qs);
        if (qsStr) {
            options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + qsStr;
        }
        delete options.qs;
    }

    // json
    if (options.json) {
        options.data = options.body;
        delete options.json;
        delete options.body;
        !options.headers && (options.headers = {});
        options.headers['Content-Type'] = 'application/json';
    }

    // body
    if (options.body) {
        if (options.body.constructor !== window.File && options.body.constructor !== window.Blob) {
            options.data = options.body;
            delete options.body;
        }
    }

    // headers
    if (options.headers) {
        var headers = options.headers;
        delete options.headers;
        options.beforeSend = function (xhr) {
            for (var key in headers) {
                if (headers.hasOwnProperty(key) && key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'user-agent' && key.toLowerCase() !== 'origin' && key.toLowerCase() !== 'host') {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        };
    }

    var getResponse = function (xhr) {
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
            statusCode: xhr.status,
            statusMessage: xhr.statusText,
            headers: headers
        };
    };

    // callback
    options.success = function (data, state, xhr) {
        callback(null, getResponse(xhr), data);
    };
    options.error = function (xhr) {
        if (xhr.responseText) {
            callback(null, getResponse(xhr), xhr.responseText);
        } else {
            callback(xhr.statusText, getResponse(xhr), xhr.responseText);
        }
    };

    options.dataType = 'text';

    // send
    return $.ajax(options);
};

module.exports = request;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Async = __webpack_require__(20);
var EventProxy = __webpack_require__(3).EventProxy;
var util = __webpack_require__(0);

// 文件分块上传全过程，暴露的分块上传接口
function sliceUploadFile(params, callback) {
    var ep = new EventProxy();
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var Body = params.Body;
    var ChunkSize = params.ChunkSize || params.SliceSize || this.options.ChunkSize;
    var AsyncLimit = params.AsyncLimit;
    var StorageClass = params.StorageClass || 'Standard';
    var FileSize;
    var self = this;

    var onProgress = params.onProgress;
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
    ep.on('upload_slice_complete', function (data) {
        uploadSliceComplete.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: data.UploadId,
            SliceList: data.SliceList
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
                return ep.emit('error', err);
            }
            ep.emit('upload_complete', data);
        });
    });

    // 获取 UploadId 完成，开始上传每个分片
    ep.on('get_upload_data_finish', function (UploadData) {
        uploadSliceList.call(self, {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Body: Body,
            FileSize: FileSize,
            SliceSize: ChunkSize,
            AsyncLimit: AsyncLimit,
            UploadData: UploadData,
            onProgress: onProgress
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return ep.emit('error', err);
            ep.emit('upload_slice_complete', data);
        });
    });

    // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
    ep.on('get_file_size_finish', function () {
        if (params.UploadData.UploadId) {
            ep.emit('get_upload_data_finish', params.UploadData);
        } else {
            var _params = util.extend({}, params);
            _params = util.extend(_params, {
                TaskId: TaskId,
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                StorageClass: StorageClass,
                Body: Body,
                FileSize: FileSize,
                SliceSize: ChunkSize,
                onHashProgress: onHashProgress
            });
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
    FileSize = Body.size || params.ContentLength;

    // 控制分片大小
    (function () {
        var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 8, 1024 * 10];
        var AutoChunkSize = 1024 * 1024;
        for (var i = 0; i < SIZE.length; i++) {
            AutoChunkSize = SIZE[i] * 1024 * 1024;
            if (FileSize / AutoChunkSize < 10000) break;
        }
        ChunkSize = Math.max(ChunkSize, AutoChunkSize);
    })();

    if (FileSize === 0) {
        params.Body = '';
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
    var Body = params.Body;
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
            var blob = util.fileSlice(Body, start, end);
            util.getFileMd5(blob, function (err, md5) {
                if (err) return callback(err);
                var ETag = '"' + md5 + '"';
                ETagMap[PartNumber] = ETag;
                FinishSliceCount += 1;
                FinishSize += ChunkSize;
                callback(err, {
                    PartNumber: PartNumber,
                    ETag: ETag,
                    Size: ChunkSize
                });
                onHashProgress({ loaded: FinishSize, total: FileSize });
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

    // 不存在 UploadId
    ep.on('upload_id_ready', function (UploadData) {
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
        var _params = util.extend({}, params);
        _params = util.extend(_params, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            StorageClass: StorageClass
        });
        self.multipartInit(_params, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return ep.emit('error', err);
            var UploadId = data.UploadId;
            if (!UploadId) {
                return callback({ Message: 'no upload id' });
            }
            ep.emit('upload_id_ready', { UploadId: UploadId, PartList: [] });
        });
    });

    // 如果已存在 UploadId，找一个可以用的 UploadId
    ep.on('has_upload_id', function (UploadIdList) {
        // 串行地，找一个内容一致的 UploadId
        UploadIdList = UploadIdList.reverse();
        Async.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {
            if (!self._isRunningTask(TaskId)) return;
            wholeMultipartListPart.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                UploadId: UploadId
            }, function (err, PartListData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) return ep.emit('error', err);
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
                ep.emit('upload_id_ready', AvailableUploadData);
            } else {
                ep.emit('no_available_upload_id');
            }
        });
    });

    // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。
    wholeMultipartList.call(self, {
        Bucket: Bucket,
        Region: Region,
        Key: Key
    }, function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) {
            return ep.emit('error', err);
        }
        var UploadIdList = data.UploadList.filter(function (item) {
            return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());
        }).reverse().map(function (item) {
            return item.UploadId || item.UploadID;
        });
        if (UploadIdList.length) {
            ep.emit('has_upload_id', UploadIdList);
        } else {
            ep.emit('no_available_upload_id');
        }
    });
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
            if (data.IsTruncated == 'true') {
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
            if (data.IsTruncated == 'true') {
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
    var ChunkParallel = params.AsyncLimit || self.options.ChunkParallelLimit || 1;
    var Body = params.Body;
    var SliceCount = Math.ceil(FileSize / SliceSize);
    var FinishSize = 0;
    var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {
        if (SliceItem['Uploaded']) {
            FinishSize += SliceItem['PartNumber'] >= SliceCount ? FileSize % SliceSize || SliceSize : SliceSize;
        }
        return !SliceItem['Uploaded'];
    });

    var onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

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
            Body: Body,
            UploadData: UploadData,
            onProgress: function (data) {
                FinishSize += data.loaded - preAddSize;
                preAddSize = data.loaded;
                onProgress({ loaded: FinishSize, total: FileSize });
            }
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (!err && !data.ETag) {
                err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.';
            }
            if (err) {
                FinishSize -= preAddSize;
            } else {
                FinishSize += currentSize - preAddSize;
                SliceItem.ETag = data.ETag;
            }
            asyncCallback(err || null, data);
        });
    }, function (err) {
        if (!self._isRunningTask(TaskId)) return;
        onProgress(null, true);
        if (err) {
            return cb(err);
        }
        cb(null, {
            UploadId: UploadData.UploadId,
            SliceList: UploadData.PartList
        });
    });
}

// 上传指定分片
function uploadSliceItem(params, callback) {
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var FileSize = params.FileSize;
    var FileBody = params.Body;
    var PartNumber = params.PartNumber * 1;
    var SliceSize = params.SliceSize;
    var UploadData = params.UploadData;
    var sliceRetryTimes = 3;
    var self = this;

    var start = SliceSize * (PartNumber - 1);

    var ContentLength = SliceSize;

    var end = start + SliceSize;

    if (end > FileSize) {
        end = FileSize;
        ContentLength = end - start;
    }

    var Body = util.fileSlice(FileBody, start, end);
    var PartItem = UploadData.PartList[PartNumber - 1];
    var ContentSha1 = PartItem.ETag;
    Async.retry(sliceRetryTimes, function (tryCallback) {
        if (!self._isRunningTask(TaskId)) return;
        self.multipartUpload({
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            ContentLength: ContentLength,
            ContentSha1: ContentSha1,
            PartNumber: PartNumber,
            UploadId: UploadData.UploadId,
            Body: Body,
            onProgress: params.onProgress
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
                return tryCallback(err);
            } else {
                PartItem.Uploaded = true;
                return tryCallback(null, data);
            }
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
    var Parts = SliceList.map(function (item) {
        return {
            PartNumber: item.PartNumber,
            ETag: item.ETag
        };
    });

    self.multipartComplete({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadId,
        Parts: Parts
    }, function (err, data) {
        if (err) {
            return callback(err);
        }

        callback(null, data);
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
            AsyncLimit: AsyncLimit,
            AbortArray: AbortArray
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            callback(null, data);
        });
    });

    if (Level === 'bucket') {
        // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'file') {
        // 文件级别的任务抛弃，抛弃该文件的全部上传任务
        if (!Key) return callback({ error: 'abort_upload_task_no_key' });
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'task') {
        // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务
        if (!UploadId) return callback({ error: 'abort_upload_task_no_id' });
        if (!Key) return callback({ error: 'abort_upload_task_no_key' });
        ep.emit('get_abort_array', [{
            Key: Key,
            UploadId: UploadId
        }]);
    } else {
        return callback({ error: 'abort_unknown_level' });
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
    Async.eachLimit(AbortArray, AsyncLimit, function (AbortItem, callback) {
        var eachIndex = index;
        if (Key && Key != AbortItem.Key) {
            return callback(null, {
                KeyNotMatch: true
            });
        }
        var UploadId = AbortItem.UploadId || AbortItem.UploadID;

        self.multipartAbort({
            Bucket: Bucket,
            Region: Region,
            Key: AbortItem.Key,
            UploadId: UploadId
        }, function (err, data) {
            var task = {
                Bucket: Bucket,
                Region: Region,
                Key: AbortItem.Key,
                UploadId: UploadId
            };
            resultList[eachIndex] = { error: err, task: task };
            callback(null);
        });
        index++;
    }, function (err) {
        if (err) {
            return callback(err);
        }

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
            callback(null, {
                files: resultList
            });
        }
    };

    // 开始处理每个文件
    var taskList = [];
    util.each(params.files, function (fileParams, index) {

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
        var _TaskReady = fileParams.TaskReady;
        var TaskReady = function (tid) {
            fileInfo.TaskId = tid;
            _TaskReady && _TaskReady(tid);
        };
        fileParams.TaskReady = TaskReady;

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
        taskList.push({
            api: FileSize >= SliceSize ? 'sliceUploadFile' : 'putObject',
            params: fileParams,
            callback: onFileFinish
        });
    });
    self._addTasks(taskList);
}

var API_MAP = {
    sliceUploadFile: sliceUploadFile,
    abortUploadTask: abortUploadTask,
    uploadFiles: uploadFiles
};

util.each(API_MAP, function (fn, apiName) {
    exports[apiName] = util.apiWrapper(apiName, fn);
});

/***/ }),
/* 20 */
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
    next(1);
};

var async = {
    eachLimit: eachLimit,
    retry: retry
};

module.exports = async;

/***/ })
/******/ ]);
});