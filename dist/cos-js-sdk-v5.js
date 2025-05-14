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
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var COS = __webpack_require__(/*! ./src/cos */ "./src/cos.js");
module.exports = COS;

/***/ }),

/***/ "./lib/base64.js":
/*!***********************!*\
  !*** ./lib/base64.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

var Base64 = function (global) {
  global = global || {};
  'use strict';
  // existing version for noConflict()
  var _Base64 = global.Base64;
  var version = "2.1.9";
  // if node.js, we use Buffer
  var buffer;
  // constants
  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var b64tab = function (bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
    return t;
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  // encoder stuff
  var cb_utob = function cb_utob(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    } else {
      var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
      return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function utob(u) {
    return u.replace(re_utob, cb_utob);
  };
  var cb_encode = function cb_encode(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
      ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
      chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
    return chars.join('');
  };
  var btoa = global.btoa ? function (b) {
    return global.btoa(b);
  } : function (b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };
  var _encode = buffer ? function (u) {
    return (u.constructor === buffer.constructor ? u : new buffer(u)).toString('base64');
  } : function (u) {
    return btoa(utob(u));
  };
  var encode = function encode(u, urisafe) {
    return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };
  var encodeURI = function encodeURI(u) {
    return encode(u, true);
  };
  // decoder stuff
  var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');
  var cb_btou = function cb_btou(cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
          offset = cp - 0x10000;
        return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);
      case 3:
        return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));
      default:
        return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
    }
  };
  var btou = function btou(b) {
    return b.replace(re_btou, cb_btou);
  };
  var cb_decode = function cb_decode(cccc) {
    var len = cccc.length,
      padlen = len % 4,
      n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
      chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };
  var atob = global.atob ? function (a) {
    return global.atob(a);
  } : function (a) {
    return a.replace(/[\s\S]{1,4}/g, cb_decode);
  };
  var _decode = buffer ? function (a) {
    return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
  } : function (a) {
    return btou(atob(a));
  };
  var decode = function decode(a) {
    return _decode(String(a).replace(/[-_]/g, function (m0) {
      return m0 == '-' ? '+' : '/';
    }).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };
  var noConflict = function noConflict() {
    var Base64 = global.Base64;
    global.Base64 = _Base64;
    return Base64;
  };
  // export Base64
  var Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict
  };
  return Base64;
}();
module.exports = Base64;

/***/ }),

/***/ "./lib/crypto.js":
/*!***********************!*\
  !*** ./lib/crypto.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS = CryptoJS || function (g, l) {
  var e = {},
    d = e.lib = {},
    m = function m() {},
    k = d.Base = {
      extend: function extend(a) {
        m.prototype = this;
        var c = new m();
        a && c.mixIn(a);
        c.hasOwnProperty("init") || (c.init = function () {
          c.$super.init.apply(this, arguments);
        });
        c.init.prototype = c;
        c.$super = this;
        return c;
      },
      create: function create() {
        var a = this.extend();
        a.init.apply(a, arguments);
        return a;
      },
      init: function init() {},
      mixIn: function mixIn(a) {
        for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
        a.hasOwnProperty("toString") && (this.toString = a.toString);
      },
      clone: function clone() {
        return this.init.prototype.extend(this);
      }
    },
    p = d.WordArray = k.extend({
      init: function init(a, c) {
        a = this.words = a || [];
        this.sigBytes = c != l ? c : 4 * a.length;
      },
      toString: function toString(a) {
        return (a || n).stringify(this);
      },
      concat: function concat(a) {
        var c = this.words,
          q = a.words,
          f = this.sigBytes;
        a = a.sigBytes;
        this.clamp();
        if (f % 4) for (var b = 0; b < a; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);else if (65535 < q.length) for (b = 0; b < a; b += 4) c[f + b >>> 2] = q[b >>> 2];else c.push.apply(c, q);
        this.sigBytes += a;
        return this;
      },
      clamp: function clamp() {
        var a = this.words,
          c = this.sigBytes;
        a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
        a.length = g.ceil(c / 4);
      },
      clone: function clone() {
        var a = k.clone.call(this);
        a.words = this.words.slice(0);
        return a;
      },
      random: function random(a) {
        for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0);
        return new p.init(c, a);
      }
    }),
    b = e.enc = {},
    n = b.Hex = {
      stringify: function stringify(a) {
        var c = a.words;
        a = a.sigBytes;
        for (var b = [], f = 0; f < a; f++) {
          var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;
          b.push((d >>> 4).toString(16));
          b.push((d & 15).toString(16));
        }
        return b.join("");
      },
      parse: function parse(a) {
        for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);
        return new p.init(b, c / 2);
      }
    },
    j = b.Latin1 = {
      stringify: function stringify(a) {
        var c = a.words;
        a = a.sigBytes;
        for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));
        return b.join("");
      },
      parse: function parse(a) {
        for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4);
        return new p.init(b, c);
      }
    },
    h = b.Utf8 = {
      stringify: function stringify(a) {
        try {
          return decodeURIComponent(escape(j.stringify(a)));
        } catch (c) {
          throw Error("Malformed UTF-8 data");
        }
      },
      parse: function parse(a) {
        return j.parse(unescape(encodeURIComponent(a)));
      }
    },
    r = d.BufferedBlockAlgorithm = k.extend({
      reset: function reset() {
        this._data = new p.init();
        this._nDataBytes = 0;
      },
      _append: function _append(a) {
        "string" == typeof a && (a = h.parse(a));
        this._data.concat(a);
        this._nDataBytes += a.sigBytes;
      },
      _process: function _process(a) {
        var c = this._data,
          b = c.words,
          f = c.sigBytes,
          d = this.blockSize,
          e = f / (4 * d),
          e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0);
        a = e * d;
        f = g.min(4 * a, f);
        if (a) {
          for (var k = 0; k < a; k += d) this._doProcessBlock(b, k);
          k = b.splice(0, a);
          c.sigBytes -= f;
        }
        return new p.init(k, f);
      },
      clone: function clone() {
        var a = k.clone.call(this);
        a._data = this._data.clone();
        return a;
      },
      _minBufferSize: 0
    });
  d.Hasher = r.extend({
    cfg: k.extend(),
    init: function init(a) {
      this.cfg = this.cfg.extend(a);
      this.reset();
    },
    reset: function reset() {
      r.reset.call(this);
      this._doReset();
    },
    update: function update(a) {
      this._append(a);
      this._process();
      return this;
    },
    finalize: function finalize(a) {
      a && this._append(a);
      return this._doFinalize();
    },
    blockSize: 16,
    _createHelper: function _createHelper(a) {
      return function (b, d) {
        return new a.init(d).finalize(b);
      };
    },
    _createHmacHelper: function _createHmacHelper(a) {
      return function (b, d) {
        return new s.HMAC.init(a, d).finalize(b);
      };
    }
  });
  var s = e.algo = {};
  return e;
}(Math);
(function () {
  var g = CryptoJS,
    l = g.lib,
    e = l.WordArray,
    d = l.Hasher,
    m = [],
    l = g.algo.SHA1 = d.extend({
      _doReset: function _doReset() {
        this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
      },
      _doProcessBlock: function _doProcessBlock(d, e) {
        for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
          if (16 > a) m[a] = d[e + a] | 0;else {
            var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];
            m[a] = c << 1 | c >>> 31;
          }
          c = (n << 5 | n >>> 27) + l + m[a];
          c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514);
          l = g;
          g = h;
          h = j << 30 | j >>> 2;
          j = n;
          n = c;
        }
        b[0] = b[0] + n | 0;
        b[1] = b[1] + j | 0;
        b[2] = b[2] + h | 0;
        b[3] = b[3] + g | 0;
        b[4] = b[4] + l | 0;
      },
      _doFinalize: function _doFinalize() {
        var d = this._data,
          e = d.words,
          b = 8 * this._nDataBytes,
          g = 8 * d.sigBytes;
        e[g >>> 5] |= 128 << 24 - g % 32;
        e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
        e[(g + 64 >>> 9 << 4) + 15] = b;
        d.sigBytes = 4 * e.length;
        this._process();
        return this._hash;
      },
      clone: function clone() {
        var e = d.clone.call(this);
        e._hash = this._hash.clone();
        return e;
      }
    });
  g.SHA1 = d._createHelper(l);
  g.HmacSHA1 = d._createHmacHelper(l);
})();
(function () {
  var g = CryptoJS,
    l = g.enc.Utf8;
  g.algo.HMAC = g.lib.Base.extend({
    init: function init(e, d) {
      e = this._hasher = new e.init();
      "string" == typeof d && (d = l.parse(d));
      var g = e.blockSize,
        k = 4 * g;
      d.sigBytes > k && (d = e.finalize(d));
      d.clamp();
      for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) n[h] ^= 1549556828, j[h] ^= 909522486;
      p.sigBytes = b.sigBytes = k;
      this.reset();
    },
    reset: function reset() {
      var e = this._hasher;
      e.reset();
      e.update(this._iKey);
    },
    update: function update(e) {
      this._hasher.update(e);
      return this;
    },
    finalize: function finalize(e) {
      var d = this._hasher;
      e = d.finalize(e);
      d.reset();
      return d.finalize(this._oKey.clone().concat(e));
    }
  });
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
    stringify: function stringify(wordArray) {
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
    parse: function parse(base64Str) {
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
if (( false ? undefined : _typeof(module)) === 'object') {
  module.exports = CryptoJS;
} else {
  window.CryptoJS = CryptoJS;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./lib/md5.js":
/*!********************!*\
  !*** ./lib/md5.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* https://github.com/emn178/js-md5 */
(function () {
  'use strict';

  var WINDOW = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object';
  if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && ( false ? undefined : _typeof(module)) === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js");
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
      return _typeof(obj) === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
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
  var createOutputMethod = function createOutputMethod(outputType) {
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
  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./lib/request.js":
/*!************************!*\
  !*** ./lib/request.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (_typeof(v)) {
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
var queryStringify = function queryStringify(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }
  if (_typeof(obj) === 'object') {
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
var xhrRes = function xhrRes(err, xhr, body) {
  var headers = {};
  var strHeaders = xhr.getAllResponseHeaders();
  if (strHeaders && strHeaders.length > 0) {
    strHeaders.trim().split('\n').forEach(function (item) {
      if (item) {
        var index = item.indexOf(':');
        var key = item.substr(0, index).trim().toLowerCase();
        var val = item.substr(index + 1).trim();
        headers[key] = val;
      }
    });
  }
  return {
    error: err,
    statusCode: xhr.status,
    statusMessage: xhr.statusText,
    headers: headers,
    body: body
  };
};
var xhrBody = function xhrBody(xhr, dataType) {
  return !dataType && dataType === 'text' ? xhr.responseText : xhr.response;
};
var request = function request(opt, callback) {
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

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/fast-xml-parser/src/fxp.js":
/*!*************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/fxp.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const validator = __webpack_require__(/*! ./validator */ "./node_modules/fast-xml-parser/src/validator.js");
const XMLParser = __webpack_require__(/*! ./xmlparser/XMLParser */ "./node_modules/fast-xml-parser/src/xmlparser/XMLParser.js");
const XMLBuilder = __webpack_require__(/*! ./xmlbuilder/json2xml */ "./node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js");

module.exports = {
  XMLParser: XMLParser,
  XMLValidator: validator,
  XMLBuilder: XMLBuilder
}

/***/ }),

/***/ "./node_modules/fast-xml-parser/src/ignoreAttributes.js":
/*!**************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/ignoreAttributes.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function getIgnoreAttributesFn(ignoreAttributes) {
    if (typeof ignoreAttributes === 'function') {
        return ignoreAttributes
    }
    if (Array.isArray(ignoreAttributes)) {
        return (attrName) => {
            for (const pattern of ignoreAttributes) {
                if (typeof pattern === 'string' && attrName === pattern) {
                    return true
                }
                if (pattern instanceof RegExp && pattern.test(attrName)) {
                    return true
                }
            }
        }
    }
    return () => false
}

module.exports = getIgnoreAttributesFn

/***/ }),

/***/ "./node_modules/fast-xml-parser/src/util.js":
/*!**************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/util.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*'
const regexName = new RegExp('^' + nameRegexp + '$');

const getAllMatches = function(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    allmatches.startIndex = regex.lastIndex - match[0].length;
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};

const isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === 'undefined');
};

exports.isExist = function(v) {
  return typeof v !== 'undefined';
};

exports.isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0;
};

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
exports.merge = function(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if (arrayMode === 'strict') {
        target[keys[i]] = [ a[keys[i]] ];
      } else {
        target[keys[i]] = a[keys[i]];
      }
    }
  }
};
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

exports.getValue = function(v) {
  if (exports.isExist(v)) {
    return v;
  } else {
    return '';
  }
};

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

exports.isName = isName;
exports.getAllMatches = getAllMatches;
exports.nameRegexp = nameRegexp;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/validator.js":
/*!*******************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/validator.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const util = __webpack_require__(/*! ./util */ "./node_modules/fast-xml-parser/src/util.js");

const defaultOptions = {
  allowBooleanAttributes: false, //A tag can have attributes without any value
  unpairedTags: []
};

//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function (xmlData, options) {
  options = Object.assign({}, defaultOptions, options);

  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
  const tags = [];
  let tagFound = false;

  //indicates that the root tag has been closed (aka. depth 0 has been reached)
  let reachedRoot = false;

  if (xmlData[0] === '\ufeff') {
    // check for byte order mark (BOM)
    xmlData = xmlData.substr(1);
  }
  
  for (let i = 0; i < xmlData.length; i++) {

    if (xmlData[i] === '<' && xmlData[i+1] === '?') {
      i+=2;
      i = readPI(xmlData,i);
      if (i.err) return i;
    }else if (xmlData[i] === '<') {
      //starting of tag
      //read until you reach to '>' avoiding any '>' in attribute value
      let tagStartPos = i;
      i++;
      
      if (xmlData[i] === '!') {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === '/') {
          //closing tag
          closingTag = true;
          i++;
        }
        //read tagname
        let tagName = '';
        for (; i < xmlData.length &&
          xmlData[i] !== '>' &&
          xmlData[i] !== ' ' &&
          xmlData[i] !== '\t' &&
          xmlData[i] !== '\n' &&
          xmlData[i] !== '\r'; i++
        ) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        //console.log(tagName);

        if (tagName[tagName.length - 1] === '/') {
          //self closing tag without attributes
          tagName = tagName.substring(0, tagName.length - 1);
          //continue;
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "Invalid space after '<'.";
          } else {
            msg = "Tag '"+tagName+"' is an invalid name.";
          }
          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
        }

        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;

        if (attrStr[attrStr.length - 1] === '/') {
          //self closing tag
          const attrStrStart = i - attrStr.length;
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
            //continue; //text may presents after self closing tag
          } else {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
          } else if (tags.length === 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
          } else {
            const otg = tags.pop();
            if (tagName !== otg.tagName) {
              let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
              return getErrorObject('InvalidTag',
                "Expected closing tag '"+otg.tagName+"' (opened in line "+openPos.line+", col "+openPos.col+") instead of closing tag '"+tagName+"'.",
                getLineNumberForPosition(xmlData, tagStartPos));
            }

            //when there are no more tags, we reached the root level.
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }

          //if the root level has been reached before ...
          if (reachedRoot === true) {
            return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
          } else if(options.unpairedTags.indexOf(tagName) !== -1){
            //don't push into stack
          } else {
            tags.push({tagName, tagStartPos});
          }
          tagFound = true;
        }

        //skip tag text value
        //It may include comments and CDATA value
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            if (xmlData[i + 1] === '!') {
              //comment or CADATA
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else if (xmlData[i+1] === '?') {
              i = readPI(xmlData, ++i);
              if (i.err) return i;
            } else{
              break;
            }
          } else if (xmlData[i] === '&') {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          }else{
            if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
              return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
            }
          }
        } //end of reading tag text value
        if (xmlData[i] === '<') {
          i--;
        }
      }
    } else {
      if ( isWhiteSpace(xmlData[i])) {
        continue;
      }
      return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }

  if (!tagFound) {
    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
  }else if (tags.length == 1) {
      return getErrorObject('InvalidTag', "Unclosed tag '"+tags[0].tagName+"'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
  }else if (tags.length > 0) {
      return getErrorObject('InvalidXml', "Invalid '"+
          JSON.stringify(tags.map(t => t.tagName), null, 4).replace(/\r?\n/g, '')+
          "' found.", {line: 1, col: 1});
  }

  return true;
};

function isWhiteSpace(char){
  return char === ' ' || char === '\t' || char === '\n'  || char === '\r';
}
/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
  const start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == '?' || xmlData[i] == ' ') {
      //tagname
      const tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === 'xml') {
        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
        //check if valid attribut string
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}

function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
    //comment
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  } else if (
    xmlData.length > i + 8 &&
    xmlData[i + 1] === 'D' &&
    xmlData[i + 2] === 'O' &&
    xmlData[i + 3] === 'C' &&
    xmlData[i + 4] === 'T' &&
    xmlData[i + 5] === 'Y' &&
    xmlData[i + 6] === 'P' &&
    xmlData[i + 7] === 'E'
  ) {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        angleBracketsCount++;
      } else if (xmlData[i] === '>') {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (
    xmlData.length > i + 9 &&
    xmlData[i + 1] === '[' &&
    xmlData[i + 2] === 'C' &&
    xmlData[i + 3] === 'D' &&
    xmlData[i + 4] === 'A' &&
    xmlData[i + 5] === 'T' &&
    xmlData[i + 6] === 'A' &&
    xmlData[i + 7] === '['
  ) {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  }

  return i;
}

const doubleQuote = '"';
const singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
  let attrStr = '';
  let startChar = '';
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === '') {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
        //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
      } else {
        startChar = '';
      }
    } else if (xmlData[i] === '>') {
      if (startChar === '') {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== '') {
    return false;
  }

  return {
    value: attrStr,
    index: i,
    tagClosed: tagClosed
  };
}

/**
 * Select all the attributes whether valid or invalid.
 */
const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
  //console.log("start:"+attrStr+":end");

  //if(attrStr.trim().length === 0) return true; //empty string

  const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};

  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      //nospace before attribute name: a="sd"b="saf"
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(matches[i]))
    } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' is without value.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
      //independent attribute: ab
      return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(matches[i]));
    }
    /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(matches[i]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      //check for duplicate attribute.
      attrNames[attrName] = 1;
    } else {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(matches[i]));
    }
  }

  return true;
}

function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === 'x') {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ';')
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}

function validateAmpersand(xmlData, i) {
  // https://www.w3.org/TR/xml/#dt-charref
  i++;
  if (xmlData[i] === ';')
    return -1;
  if (xmlData[i] === '#') {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ';')
      break;
    return -1;
  }
  return i;
}

function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code: code,
      msg: message,
      line: lineNumber.line || lineNumber,
      col: lineNumber.col,
    },
  };
}

function validateAttrName(attrName) {
  return util.isName(attrName);
}

// const startsWithXML = /^xml/i;

function validateTagName(tagname) {
  return util.isName(tagname) /* && !tagname.match(startsWithXML) */;
}

//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
  const lines = xmlData.substring(0, index).split(/\r?\n/);
  return {
    line: lines.length,

    // column number is last line's length + 1, because column numbering starts at 1:
    col: lines[lines.length - 1].length + 1
  };
}

//this function returns the position of the first character of match within attrStr
function getPositionFromMatch(match) {
  return match.startIndex + match[1].length;
}


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js":
/*!*****************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//parse Empty Node as self closing node
const buildFromOrderedJs = __webpack_require__(/*! ./orderedJs2Xml */ "./node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js");
const getIgnoreAttributesFn = __webpack_require__(/*! ../ignoreAttributes */ "./node_modules/fast-xml-parser/src/ignoreAttributes.js")

const defaultOptions = {
  attributeNamePrefix: '@_',
  attributesGroupName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  cdataPropName: false,
  format: false,
  indentBy: '  ',
  suppressEmptyNode: false,
  suppressUnpairedNode: true,
  suppressBooleanAttributes: true,
  tagValueProcessor: function(key, a) {
    return a;
  },
  attributeValueProcessor: function(attrName, a) {
    return a;
  },
  preserveOrder: false,
  commentPropName: false,
  unpairedTags: [],
  entities: [
    { regex: new RegExp("&", "g"), val: "&amp;" },//it must be on top
    { regex: new RegExp(">", "g"), val: "&gt;" },
    { regex: new RegExp("<", "g"), val: "&lt;" },
    { regex: new RegExp("\'", "g"), val: "&apos;" },
    { regex: new RegExp("\"", "g"), val: "&quot;" }
  ],
  processEntities: true,
  stopNodes: [],
  // transformTagName: false,
  // transformAttributeName: false,
  oneListGroup: false
};

function Builder(options) {
  this.options = Object.assign({}, defaultOptions, options);
  if (this.options.ignoreAttributes === true || this.options.attributesGroupName) {
    this.isAttribute = function(/*a*/) {
      return false;
    };
  } else {
    this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes)
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }

  this.processTextOrObjNode = processTextOrObjNode

  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = '>\n';
    this.newLine = '\n';
  } else {
    this.indentate = function() {
      return '';
    };
    this.tagEndChar = '>';
    this.newLine = '';
  }
}

Builder.prototype.build = function(jObj) {
  if(this.options.preserveOrder){
    return buildFromOrderedJs(jObj, this.options);
  }else {
    if(Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1){
      jObj = {
        [this.options.arrayNodeName] : jObj
      }
    }
    return this.j2x(jObj, 0, []).val;
  }
};

Builder.prototype.j2x = function(jObj, level, ajPath) {
  let attrStr = '';
  let val = '';
  const jPath = ajPath.join('.')
  for (let key in jObj) {
    if(!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
    if (typeof jObj[key] === 'undefined') {
      // supress undefined node only if it is not an attribute
      if (this.isAttribute(key)) {
        val += '';
      }
    } else if (jObj[key] === null) {
      // null attribute should be ignored by the attribute list, but should not cause the tag closing
      if (this.isAttribute(key)) {
        val += '';
      } else if (key[0] === '?') {
        val += this.indentate(level) + '<' + key + '?' + this.tagEndChar;
      } else {
        val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
      }
      // val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextValNode(jObj[key], key, '', level);
    } else if (typeof jObj[key] !== 'object') {
      //premitive type
      const attr = this.isAttribute(key);
      if (attr && !this.ignoreAttributesFn(attr, jPath)) {
        attrStr += this.buildAttrPairStr(attr, '' + jObj[key]);
      } else if (!attr) {
        //tag value
        if (key === this.options.textNodeName) {
          let newval = this.options.tagValueProcessor(key, '' + jObj[key]);
          val += this.replaceEntitiesValue(newval);
        } else {
          val += this.buildTextValNode(jObj[key], key, '', level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      //repeated nodes
      const arrLen = jObj[key].length;
      let listTagVal = "";
      let listTagAttr = "";
      for (let j = 0; j < arrLen; j++) {
        const item = jObj[key][j];
        if (typeof item === 'undefined') {
          // supress undefined node
        } else if (item === null) {
          if(key[0] === "?") val += this.indentate(level) + '<' + key + '?' + this.tagEndChar;
          else val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
          // val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
        } else if (typeof item === 'object') {
          if(this.options.oneListGroup){
            const result = this.j2x(item, level + 1, ajPath.concat(key));
            listTagVal += result.val;
            if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
              listTagAttr += result.attrStr
            }
          }else{
            listTagVal += this.processTextOrObjNode(item, key, level, ajPath)
          }
        } else {
          if (this.options.oneListGroup) {
            let textValue = this.options.tagValueProcessor(key, item);
            textValue = this.replaceEntitiesValue(textValue);
            listTagVal += textValue;
          } else {
            listTagVal += this.buildTextValNode(item, key, '', level);
          }
        }
      }
      if(this.options.oneListGroup){
        listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
      }
      val += listTagVal;
    } else {
      //nested node
      if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr += this.buildAttrPairStr(Ks[j], '' + jObj[key][Ks[j]]);
        }
      } else {
        val += this.processTextOrObjNode(jObj[key], key, level, ajPath)
      }
    }
  }
  return {attrStr: attrStr, val: val};
};

Builder.prototype.buildAttrPairStr = function(attrName, val){
  val = this.options.attributeValueProcessor(attrName, '' + val);
  val = this.replaceEntitiesValue(val);
  if (this.options.suppressBooleanAttributes && val === "true") {
    return ' ' + attrName;
  } else return ' ' + attrName + '="' + val + '"';
}

function processTextOrObjNode (object, key, level, ajPath) {
  const result = this.j2x(object, level + 1, ajPath.concat(key));
  if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
    return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
  } else {
    return this.buildObjectNode(result.val, key, result.attrStr, level);
  }
}

Builder.prototype.buildObjectNode = function(val, key, attrStr, level) {
  if(val === ""){
    if(key[0] === "?") return  this.indentate(level) + '<' + key + attrStr+ '?' + this.tagEndChar;
    else {
      return this.indentate(level) + '<' + key + attrStr + this.closeTag(key) + this.tagEndChar;
    }
  }else{

    let tagEndExp = '</' + key + this.tagEndChar;
    let piClosingChar = "";
    
    if(key[0] === "?") {
      piClosingChar = "?";
      tagEndExp = "";
    }
  
    // attrStr is an empty string in case the attribute came as undefined or null
    if ((attrStr || attrStr === '') && val.indexOf('<') === -1) {
      return ( this.indentate(level) + '<' +  key + attrStr + piClosingChar + '>' + val + tagEndExp );
    } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
      return this.indentate(level) + `<!--${val}-->` + this.newLine;
    }else {
      return (
        this.indentate(level) + '<' + key + attrStr + piClosingChar + this.tagEndChar +
        val +
        this.indentate(level) + tagEndExp    );
    }
  }
}

Builder.prototype.closeTag = function(key){
  let closeTag = "";
  if(this.options.unpairedTags.indexOf(key) !== -1){ //unpaired
    if(!this.options.suppressUnpairedNode) closeTag = "/"
  }else if(this.options.suppressEmptyNode){ //empty
    closeTag = "/";
  }else{
    closeTag = `></${key}`
  }
  return closeTag;
}

function buildEmptyObjNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildObjectNode(val, key, attrStr, level);
  } else {
    if(key[0] === "?") return  this.indentate(level) + '<' + key + attrStr+ '?' + this.tagEndChar;
    else {
      return  this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
      // return this.buildTagStr(level,key, attrStr);
    }
  }
}

Builder.prototype.buildTextValNode = function(val, key, attrStr, level) {
  if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
    return this.indentate(level) + `<![CDATA[${val}]]>` +  this.newLine;
  }else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
    return this.indentate(level) + `<!--${val}-->` +  this.newLine;
  }else if(key[0] === "?") {//PI tag
    return  this.indentate(level) + '<' + key + attrStr+ '?' + this.tagEndChar; 
  }else{
    let textValue = this.options.tagValueProcessor(key, val);
    textValue = this.replaceEntitiesValue(textValue);
  
    if( textValue === ''){
      return this.indentate(level) + '<' + key + attrStr + this.closeTag(key) + this.tagEndChar;
    }else{
      return this.indentate(level) + '<' + key + attrStr + '>' +
         textValue +
        '</' + key + this.tagEndChar;
    }
  }
}

Builder.prototype.replaceEntitiesValue = function(textValue){
  if(textValue && textValue.length > 0 && this.options.processEntities){
    for (let i=0; i<this.options.entities.length; i++) {
      const entity = this.options.entities[i];
      textValue = textValue.replace(entity.regex, entity.val);
    }
  }
  return textValue;
}

function indentate(level) {
  return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
  if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}

module.exports = Builder;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js":
/*!**********************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const EOL = "\n";

/**
 * 
 * @param {array} jArray 
 * @param {any} options 
 * @returns 
 */
function toXml(jArray, options) {
    let indentation = "";
    if (options.format && options.indentBy.length > 0) {
        indentation = EOL;
    }
    return arrToStr(jArray, options, "", indentation);
}

function arrToStr(arr, options, jPath, indentation) {
    let xmlStr = "";
    let isPreviousElementTag = false;

    for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        if(tagName === undefined) continue;

        let newJPath = "";
        if (jPath.length === 0) newJPath = tagName
        else newJPath = `${jPath}.${tagName}`;

        if (tagName === options.textNodeName) {
            let tagText = tagObj[tagName];
            if (!isStopNode(newJPath, options)) {
                tagText = options.tagValueProcessor(tagName, tagText);
                tagText = replaceEntitiesValue(tagText, options);
            }
            if (isPreviousElementTag) {
                xmlStr += indentation;
            }
            xmlStr += tagText;
            isPreviousElementTag = false;
            continue;
        } else if (tagName === options.cdataPropName) {
            if (isPreviousElementTag) {
                xmlStr += indentation;
            }
            xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
            isPreviousElementTag = false;
            continue;
        } else if (tagName === options.commentPropName) {
            xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
            isPreviousElementTag = true;
            continue;
        } else if (tagName[0] === "?") {
            const attStr = attr_to_str(tagObj[":@"], options);
            const tempInd = tagName === "?xml" ? "" : indentation;
            let piTextNodeName = tagObj[tagName][0][options.textNodeName];
            piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : ""; //remove extra spacing
            xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr}?>`;
            isPreviousElementTag = true;
            continue;
        }
        let newIdentation = indentation;
        if (newIdentation !== "") {
            newIdentation += options.indentBy;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        const tagStart = indentation + `<${tagName}${attStr}`;
        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
            if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
            else xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
            xmlStr += tagStart + "/>";
        } else if (tagValue && tagValue.endsWith(">")) {
            xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        } else {
            xmlStr += tagStart + ">";
            if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
                xmlStr += indentation + options.indentBy + tagValue + indentation;
            } else {
                xmlStr += tagValue;
            }
            xmlStr += `</${tagName}>`;
        }
        isPreviousElementTag = true;
    }

    return xmlStr;
}

function propName(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(!obj.hasOwnProperty(key)) continue;
        if (key !== ":@") return key;
    }
}

function attr_to_str(attrMap, options) {
    let attrStr = "";
    if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
            if(!attrMap.hasOwnProperty(attr)) continue;
            let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
            attrVal = replaceEntitiesValue(attrVal, options);
            if (attrVal === true && options.suppressBooleanAttributes) {
                attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
            } else {
                attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
            }
        }
    }
    return attrStr;
}

function isStopNode(jPath, options) {
    jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
    let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
    for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName) return true;
    }
    return false;
}

function replaceEntitiesValue(textValue, options) {
    if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
            const entity = options.entities[i];
            textValue = textValue.replace(entity.regex, entity.val);
        }
    }
    return textValue;
}
module.exports = toXml;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js":
/*!*********************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(/*! ../util */ "./node_modules/fast-xml-parser/src/util.js");

//TODO: handle comments
function readDocType(xmlData, i){
    
    const entities = {};
    if( xmlData[i + 3] === 'O' &&
         xmlData[i + 4] === 'C' &&
         xmlData[i + 5] === 'T' &&
         xmlData[i + 6] === 'Y' &&
         xmlData[i + 7] === 'P' &&
         xmlData[i + 8] === 'E')
    {    
        i = i+9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for(;i<xmlData.length;i++){
            if (xmlData[i] === '<' && !comment) { //Determine the tag type
                if( hasBody && isEntity(xmlData, i)){
                    i += 7; 
                    [entityName, val,i] = readEntityExp(xmlData,i+1);
                    if(val.indexOf("&") === -1) //Parameter entities are not supported
                        entities[ validateEntityName(entityName) ] = {
                            regx : RegExp( `&${entityName};`,"g"),
                            val: val
                        };
                }
                else if( hasBody && isElement(xmlData, i))  i += 8;//Not supported
                else if( hasBody && isAttlist(xmlData, i))  i += 8;//Not supported
                else if( hasBody && isNotation(xmlData, i)) i += 9;//Not supported
                else if( isComment)                         comment = true;
                else                                        throw new Error("Invalid DOCTYPE");

                angleBracketsCount++;
                exp = "";
            } else if (xmlData[i] === '>') { //Read tag content
                if(comment){
                    if( xmlData[i - 1] === "-" && xmlData[i - 2] === "-"){
                        comment = false;
                        angleBracketsCount--;
                    }
                }else{
                    angleBracketsCount--;
                }
                if (angleBracketsCount === 0) {
                  break;
                }
            }else if( xmlData[i] === '['){
                hasBody = true;
            }else{
                exp += xmlData[i];
            }
        }
        if(angleBracketsCount !== 0){
            throw new Error(`Unclosed DOCTYPE`);
        }
    }else{
        throw new Error(`Invalid Tag instead of DOCTYPE`);
    }
    return {entities, i};
}

function readEntityExp(xmlData,i){
    //External entities are not supported
    //    <!ENTITY ext SYSTEM "http://normal-website.com" >

    //Parameter entities are not supported
    //    <!ENTITY entityname "&anotherElement;">

    //Internal entities are supported
    //    <!ENTITY entityname "replacement text">
    
    //read EntityName
    let entityName = "";
    for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"' ); i++) {
        // if(xmlData[i] === " ") continue;
        // else 
        entityName += xmlData[i];
    }
    entityName = entityName.trim();
    if(entityName.indexOf(" ") !== -1) throw new Error("External entites are not supported");

    //read Entity Value
    const startChar = xmlData[i++];
    let val = ""
    for (; i < xmlData.length && xmlData[i] !== startChar ; i++) {
        val += xmlData[i];
    }
    return [entityName, val, i];
}

function isComment(xmlData, i){
    if(xmlData[i+1] === '!' &&
    xmlData[i+2] === '-' &&
    xmlData[i+3] === '-') return true
    return false
}
function isEntity(xmlData, i){
    if(xmlData[i+1] === '!' &&
    xmlData[i+2] === 'E' &&
    xmlData[i+3] === 'N' &&
    xmlData[i+4] === 'T' &&
    xmlData[i+5] === 'I' &&
    xmlData[i+6] === 'T' &&
    xmlData[i+7] === 'Y') return true
    return false
}
function isElement(xmlData, i){
    if(xmlData[i+1] === '!' &&
    xmlData[i+2] === 'E' &&
    xmlData[i+3] === 'L' &&
    xmlData[i+4] === 'E' &&
    xmlData[i+5] === 'M' &&
    xmlData[i+6] === 'E' &&
    xmlData[i+7] === 'N' &&
    xmlData[i+8] === 'T') return true
    return false
}

function isAttlist(xmlData, i){
    if(xmlData[i+1] === '!' &&
    xmlData[i+2] === 'A' &&
    xmlData[i+3] === 'T' &&
    xmlData[i+4] === 'T' &&
    xmlData[i+5] === 'L' &&
    xmlData[i+6] === 'I' &&
    xmlData[i+7] === 'S' &&
    xmlData[i+8] === 'T') return true
    return false
}
function isNotation(xmlData, i){
    if(xmlData[i+1] === '!' &&
    xmlData[i+2] === 'N' &&
    xmlData[i+3] === 'O' &&
    xmlData[i+4] === 'T' &&
    xmlData[i+5] === 'A' &&
    xmlData[i+6] === 'T' &&
    xmlData[i+7] === 'I' &&
    xmlData[i+8] === 'O' &&
    xmlData[i+9] === 'N') return true
    return false
}

function validateEntityName(name){
    if (util.isName(name))
	return name;
    else
        throw new Error(`Invalid entity name ${name}`);
}

module.exports = readDocType;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js":
/*!**********************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


const defaultOptions = {
    preserveOrder: false,
    attributeNamePrefix: '@_',
    attributesGroupName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    removeNSPrefix: false, // remove NS from tag name or attribute name if true
    allowBooleanAttributes: false, //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true, //Trim string values of tag and attributes
    cdataPropName: false,
    numberParseOptions: {
      hex: true,
      leadingZeros: true,
      eNotation: true
    },
    tagValueProcessor: function(tagName, val) {
      return val;
    },
    attributeValueProcessor: function(attrName, val) {
      return val;
    },
    stopNodes: [], //nested tags will not be parsed even for errors
    alwaysCreateTextNode: false,
    isArray: () => false,
    commentPropName: false,
    unpairedTags: [],
    processEntities: true,
    htmlEntities: false,
    ignoreDeclaration: false,
    ignorePiTags: false,
    transformTagName: false,
    transformAttributeName: false,
    updateTag: function(tagName, jPath, attrs){
      return tagName
    },
    // skipEmptyListItem: false
};
   
const buildOptions = function(options) {
    return Object.assign({}, defaultOptions, options);
};

exports.buildOptions = buildOptions;
exports.defaultOptions = defaultOptions;

/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js":
/*!************************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///@ts-check

const util = __webpack_require__(/*! ../util */ "./node_modules/fast-xml-parser/src/util.js");
const xmlNode = __webpack_require__(/*! ./xmlNode */ "./node_modules/fast-xml-parser/src/xmlparser/xmlNode.js");
const readDocType = __webpack_require__(/*! ./DocTypeReader */ "./node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js");
const toNumber = __webpack_require__(/*! strnum */ "./node_modules/strnum/strnum.js");
const getIgnoreAttributesFn = __webpack_require__(/*! ../ignoreAttributes */ "./node_modules/fast-xml-parser/src/ignoreAttributes.js")

// const regx =
//   '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
//   .replace(/NAME/g, util.nameRegexp);

//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

class OrderedObjParser{
  constructor(options){
    this.options = options;
    this.currentNode = null;
    this.tagsNodeStack = [];
    this.docTypeEntities = {};
    this.lastEntities = {
      "apos" : { regex: /&(apos|#39|#x27);/g, val : "'"},
      "gt" : { regex: /&(gt|#62|#x3E);/g, val : ">"},
      "lt" : { regex: /&(lt|#60|#x3C);/g, val : "<"},
      "quot" : { regex: /&(quot|#34|#x22);/g, val : "\""},
    };
    this.ampEntity = { regex: /&(amp|#38|#x26);/g, val : "&"};
    this.htmlEntities = {
      "space": { regex: /&(nbsp|#160);/g, val: " " },
      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
      "cent" : { regex: /&(cent|#162);/g, val: "¢" },
      "pound" : { regex: /&(pound|#163);/g, val: "£" },
      "yen" : { regex: /&(yen|#165);/g, val: "¥" },
      "euro" : { regex: /&(euro|#8364);/g, val: "€" },
      "copyright" : { regex: /&(copy|#169);/g, val: "©" },
      "reg" : { regex: /&(reg|#174);/g, val: "®" },
      "inr" : { regex: /&(inr|#8377);/g, val: "₹" },
      "num_dec": { regex: /&#([0-9]{1,7});/g, val : (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
      "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val : (_, str) => String.fromCharCode(Number.parseInt(str, 16)) },
    };
    this.addExternalEntities = addExternalEntities;
    this.parseXml = parseXml;
    this.parseTextData = parseTextData;
    this.resolveNameSpace = resolveNameSpace;
    this.buildAttributesMap = buildAttributesMap;
    this.isItStopNode = isItStopNode;
    this.replaceEntitiesValue = replaceEntitiesValue;
    this.readStopNodeData = readStopNodeData;
    this.saveTextToParentTag = saveTextToParentTag;
    this.addChild = addChild;
    this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes)
  }

}

function addExternalEntities(externalEntities){
  const entKeys = Object.keys(externalEntities);
  for (let i = 0; i < entKeys.length; i++) {
    const ent = entKeys[i];
    this.lastEntities[ent] = {
       regex: new RegExp("&"+ent+";","g"),
       val : externalEntities[ent]
    }
  }
}

/**
 * @param {string} val
 * @param {string} tagName
 * @param {string} jPath
 * @param {boolean} dontTrim
 * @param {boolean} hasAttributes
 * @param {boolean} isLeafNode
 * @param {boolean} escapeEntities
 */
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
  if (val !== undefined) {
    if (this.options.trimValues && !dontTrim) {
      val = val.trim();
    }
    if(val.length > 0){
      if(!escapeEntities) val = this.replaceEntitiesValue(val);
      
      const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
      if(newval === null || newval === undefined){
        //don't parse
        return val;
      }else if(typeof newval !== typeof val || newval !== val){
        //overwrite
        return newval;
      }else if(this.options.trimValues){
        return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
      }else{
        const trimmedVal = val.trim();
        if(trimmedVal === val){
          return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
        }else{
          return val;
        }
      }
    }
  }
}

function resolveNameSpace(tagname) {
  if (this.options.removeNSPrefix) {
    const tags = tagname.split(':');
    const prefix = tagname.charAt(0) === '/' ? '/' : '';
    if (tags[0] === 'xmlns') {
      return '';
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}

//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?', 'gm');

function buildAttributesMap(attrStr, jPath, tagName) {
  if (this.options.ignoreAttributes !== true && typeof attrStr === 'string') {
    // attrStr = attrStr.replace(/\r?\n/g, ' ');
    //attrStr = attrStr || attrStr.trim();

    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length; //don't make it inline
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      if (this.ignoreAttributesFn(attrName, jPath)) {
        continue
      }
      let oldVal = matches[i][4];
      let aName = this.options.attributeNamePrefix + attrName;
      if (attrName.length) {
        if (this.options.transformAttributeName) {
          aName = this.options.transformAttributeName(aName);
        }
        if(aName === "__proto__") aName  = "#__proto__";
        if (oldVal !== undefined) {
          if (this.options.trimValues) {
            oldVal = oldVal.trim();
          }
          oldVal = this.replaceEntitiesValue(oldVal);
          const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
          if(newVal === null || newVal === undefined){
            //don't parse
            attrs[aName] = oldVal;
          }else if(typeof newVal !== typeof oldVal || newVal !== oldVal){
            //overwrite
            attrs[aName] = newVal;
          }else{
            //parse
            attrs[aName] = parseValue(
              oldVal,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          }
        } else if (this.options.allowBooleanAttributes) {
          attrs[aName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (this.options.attributesGroupName) {
      const attrCollection = {};
      attrCollection[this.options.attributesGroupName] = attrs;
      return attrCollection;
    }
    return attrs
  }
}

const parseXml = function(xmlData) {
  // xmlData = xmlData.replace(/\r\n?/g, "\n"); //TODO: remove this line
  const xmlObj = new xmlNode('!xml');
  let currentNode = xmlObj;
  let textData = "";
  let jPath = "";
  for(let i=0; i< xmlData.length; i++){//for each char in XML data
    const ch = xmlData[i];
    if(ch === '<'){
      // const nextIndex = i+1;
      // const _2ndChar = xmlData[nextIndex];
      if( xmlData[i+1] === '/') {//Closing Tag
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.")
        let tagName = xmlData.substring(i+2,closeIndex).trim();

        if(this.options.removeNSPrefix){
          const colonIndex = tagName.indexOf(":");
          if(colonIndex !== -1){
            tagName = tagName.substr(colonIndex+1);
          }
        }

        if(this.options.transformTagName) {
          tagName = this.options.transformTagName(tagName);
        }

        if(currentNode){
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
        }

        //check if last tag of nested tag was unpaired tag
        const lastTagName = jPath.substring(jPath.lastIndexOf(".")+1);
        if(tagName && this.options.unpairedTags.indexOf(tagName) !== -1 ){
          throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
        }
        let propIndex = 0
        if(lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1 ){
          propIndex = jPath.lastIndexOf('.', jPath.lastIndexOf('.')-1)
          this.tagsNodeStack.pop();
        }else{
          propIndex = jPath.lastIndexOf(".");
        }
        jPath = jPath.substring(0, propIndex);

        currentNode = this.tagsNodeStack.pop();//avoid recursion, set the parent tag scope
        textData = "";
        i = closeIndex;
      } else if( xmlData[i+1] === '?') {

        let tagData = readTagExp(xmlData,i, false, "?>");
        if(!tagData) throw new Error("Pi Tag is not closed.");

        textData = this.saveTextToParentTag(textData, currentNode, jPath);
        if( (this.options.ignoreDeclaration && tagData.tagName === "?xml") || this.options.ignorePiTags){

        }else{
  
          const childNode = new xmlNode(tagData.tagName);
          childNode.add(this.options.textNodeName, "");
          
          if(tagData.tagName !== tagData.tagExp && tagData.attrExpPresent){
            childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
          }
          this.addChild(currentNode, childNode, jPath)

        }


        i = tagData.closeIndex + 1;
      } else if(xmlData.substr(i + 1, 3) === '!--') {
        const endIndex = findClosingIndex(xmlData, "-->", i+4, "Comment is not closed.")
        if(this.options.commentPropName){
          const comment = xmlData.substring(i + 4, endIndex - 2);

          textData = this.saveTextToParentTag(textData, currentNode, jPath);

          currentNode.add(this.options.commentPropName, [ { [this.options.textNodeName] : comment } ]);
        }
        i = endIndex;
      } else if( xmlData.substr(i + 1, 2) === '!D') {
        const result = readDocType(xmlData, i);
        this.docTypeEntities = result.entities;
        i = result.i;
      }else if(xmlData.substr(i + 1, 2) === '![') {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
        const tagExp = xmlData.substring(i + 9,closeIndex);

        textData = this.saveTextToParentTag(textData, currentNode, jPath);

        let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
        if(val == undefined) val = "";

        //cdata should be set even if it is 0 length string
        if(this.options.cdataPropName){
          currentNode.add(this.options.cdataPropName, [ { [this.options.textNodeName] : tagExp } ]);
        }else{
          currentNode.add(this.options.textNodeName, val);
        }
        
        i = closeIndex + 2;
      }else {//Opening tag
        let result = readTagExp(xmlData,i, this.options.removeNSPrefix);
        let tagName= result.tagName;
        const rawTagName = result.rawTagName;
        let tagExp = result.tagExp;
        let attrExpPresent = result.attrExpPresent;
        let closeIndex = result.closeIndex;

        if (this.options.transformTagName) {
          tagName = this.options.transformTagName(tagName);
        }
        
        //save text as child node
        if (currentNode && textData) {
          if(currentNode.tagname !== '!xml'){
            //when nested tag is found
            textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
          }
        }

        //check if last tag was unpaired tag
        const lastTag = currentNode;
        if(lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1 ){
          currentNode = this.tagsNodeStack.pop();
          jPath = jPath.substring(0, jPath.lastIndexOf("."));
        }
        if(tagName !== xmlObj.tagname){
          jPath += jPath ? "." + tagName : tagName;
        }
        if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
          let tagContent = "";
          //self-closing tag
          if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
            if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            }else{
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            i = result.closeIndex;
          }
          //unpaired tag
          else if(this.options.unpairedTags.indexOf(tagName) !== -1){
            
            i = result.closeIndex;
          }
          //normal tag
          else{
            //read until closing tag is found
            const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
            if(!result) throw new Error(`Unexpected end of ${rawTagName}`);
            i = result.i;
            tagContent = result.tagContent;
          }

          const childNode = new xmlNode(tagName);
          if(tagName !== tagExp && attrExpPresent){
            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
          }
          if(tagContent) {
            tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
          }
          
          jPath = jPath.substr(0, jPath.lastIndexOf("."));
          childNode.add(this.options.textNodeName, tagContent);
          
          this.addChild(currentNode, childNode, jPath)
        }else{
  //selfClosing tag
          if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
            if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            }else{
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            
            if(this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }

            const childNode = new xmlNode(tagName);
            if(tagName !== tagExp && attrExpPresent){
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath)
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
          }
    //opening tag
          else{
            const childNode = new xmlNode( tagName);
            this.tagsNodeStack.push(currentNode);
            
            if(tagName !== tagExp && attrExpPresent){
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath)
            currentNode = childNode;
          }
          textData = "";
          i = closeIndex;
        }
      }
    }else{
      textData += xmlData[i];
    }
  }
  return xmlObj.child;
}

function addChild(currentNode, childNode, jPath){
  const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"])
  if(result === false){
  }else if(typeof result === "string"){
    childNode.tagname = result
    currentNode.addChild(childNode);
  }else{
    currentNode.addChild(childNode);
  }
}

const replaceEntitiesValue = function(val){

  if(this.options.processEntities){
    for(let entityName in this.docTypeEntities){
      const entity = this.docTypeEntities[entityName];
      val = val.replace( entity.regx, entity.val);
    }
    for(let entityName in this.lastEntities){
      const entity = this.lastEntities[entityName];
      val = val.replace( entity.regex, entity.val);
    }
    if(this.options.htmlEntities){
      for(let entityName in this.htmlEntities){
        const entity = this.htmlEntities[entityName];
        val = val.replace( entity.regex, entity.val);
      }
    }
    val = val.replace( this.ampEntity.regex, this.ampEntity.val);
  }
  return val;
}
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
  if (textData) { //store previously collected data as textNode
    if(isLeafNode === undefined) isLeafNode = Object.keys(currentNode.child).length === 0
    
    textData = this.parseTextData(textData,
      currentNode.tagname,
      jPath,
      false,
      currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
      isLeafNode);

    if (textData !== undefined && textData !== "")
      currentNode.add(this.options.textNodeName, textData);
    textData = "";
  }
  return textData;
}

//TODO: use jPath to simplify the logic
/**
 * 
 * @param {string[]} stopNodes 
 * @param {string} jPath
 * @param {string} currentTagName 
 */
function isItStopNode(stopNodes, jPath, currentTagName){
  const allNodesExp = "*." + currentTagName;
  for (const stopNodePath in stopNodes) {
    const stopNodeExp = stopNodes[stopNodePath];
    if( allNodesExp === stopNodeExp || jPath === stopNodeExp  ) return true;
  }
  return false;
}

/**
 * Returns the tag Expression and where it is ending handling single-double quotes situation
 * @param {string} xmlData 
 * @param {number} i starting index
 * @returns 
 */
function tagExpWithClosingIndex(xmlData, i, closingChar = ">"){
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < xmlData.length; index++) {
    let ch = xmlData[index];
    if (attrBoundary) {
        if (ch === attrBoundary) attrBoundary = "";//reset
    } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
    } else if (ch === closingChar[0]) {
      if(closingChar[1]){
        if(xmlData[index + 1] === closingChar[1]){
          return {
            data: tagExp,
            index: index
          }
        }
      }else{
        return {
          data: tagExp,
          index: index
        }
      }
    } else if (ch === '\t') {
      ch = " "
    }
    tagExp += ch;
  }
}

function findClosingIndex(xmlData, str, i, errMsg){
  const closingIndex = xmlData.indexOf(str, i);
  if(closingIndex === -1){
    throw new Error(errMsg)
  }else{
    return closingIndex + str.length - 1;
  }
}

function readTagExp(xmlData,i, removeNSPrefix, closingChar = ">"){
  const result = tagExpWithClosingIndex(xmlData, i+1, closingChar);
  if(!result) return;
  let tagExp = result.data;
  const closeIndex = result.index;
  const separatorIndex = tagExp.search(/\s/);
  let tagName = tagExp;
  let attrExpPresent = true;
  if(separatorIndex !== -1){//separate tag name and attributes expression
    tagName = tagExp.substring(0, separatorIndex);
    tagExp = tagExp.substring(separatorIndex + 1).trimStart();
  }

  const rawTagName = tagName;
  if(removeNSPrefix){
    const colonIndex = tagName.indexOf(":");
    if(colonIndex !== -1){
      tagName = tagName.substr(colonIndex+1);
      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
    }
  }

  return {
    tagName: tagName,
    tagExp: tagExp,
    closeIndex: closeIndex,
    attrExpPresent: attrExpPresent,
    rawTagName: rawTagName,
  }
}
/**
 * find paired tag for a stop node
 * @param {string} xmlData 
 * @param {string} tagName 
 * @param {number} i 
 */
function readStopNodeData(xmlData, tagName, i){
  const startIndex = i;
  // Starting at 1 since we already have an open tag
  let openTagCount = 1;

  for (; i < xmlData.length; i++) {
    if( xmlData[i] === "<"){ 
      if (xmlData[i+1] === "/") {//close tag
          const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
          let closeTagName = xmlData.substring(i+2,closeIndex).trim();
          if(closeTagName === tagName){
            openTagCount--;
            if (openTagCount === 0) {
              return {
                tagContent: xmlData.substring(startIndex, i),
                i : closeIndex
              }
            }
          }
          i=closeIndex;
        } else if(xmlData[i+1] === '?') { 
          const closeIndex = findClosingIndex(xmlData, "?>", i+1, "StopNode is not closed.")
          i=closeIndex;
        } else if(xmlData.substr(i + 1, 3) === '!--') { 
          const closeIndex = findClosingIndex(xmlData, "-->", i+3, "StopNode is not closed.")
          i=closeIndex;
        } else if(xmlData.substr(i + 1, 2) === '![') { 
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
          i=closeIndex;
        } else {
          const tagData = readTagExp(xmlData, i, '>')

          if (tagData) {
            const openTagName = tagData && tagData.tagName;
            if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length-1] !== "/") {
              openTagCount++;
            }
            i=tagData.closeIndex;
          }
        }
      }
  }//end for loop
}

function parseValue(val, shouldParse, options) {
  if (shouldParse && typeof val === 'string') {
    //console.log(options)
    const newval = val.trim();
    if(newval === 'true' ) return true;
    else if(newval === 'false' ) return false;
    else return toNumber(val, options);
  } else {
    if (util.isExist(val)) {
      return val;
    } else {
      return '';
    }
  }
}


module.exports = OrderedObjParser;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/XMLParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/XMLParser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { buildOptions} = __webpack_require__(/*! ./OptionsBuilder */ "./node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js");
const OrderedObjParser = __webpack_require__(/*! ./OrderedObjParser */ "./node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js");
const { prettify} = __webpack_require__(/*! ./node2json */ "./node_modules/fast-xml-parser/src/xmlparser/node2json.js");
const validator = __webpack_require__(/*! ../validator */ "./node_modules/fast-xml-parser/src/validator.js");

class XMLParser{
    
    constructor(options){
        this.externalEntities = {};
        this.options = buildOptions(options);
        
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(xmlData,validationOption){
        if(typeof xmlData === "string"){
        }else if( xmlData.toString){
            xmlData = xmlData.toString();
        }else{
            throw new Error("XML data is accepted in String or Bytes[] form.")
        }
        if( validationOption){
            if(validationOption === true) validationOption = {}; //validate with default options
            
            const result = validator.validate(xmlData, validationOption);
            if (result !== true) {
              throw Error( `${result.err.msg}:${result.err.line}:${result.err.col}` )
            }
          }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if(this.options.preserveOrder || orderedResult === undefined) return orderedResult;
        else return prettify(orderedResult, this.options);
    }

    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(key, value){
        if(value.indexOf("&") !== -1){
            throw new Error("Entity value can't have '&'")
        }else if(key.indexOf("&") !== -1 || key.indexOf(";") !== -1){
            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'")
        }else if(value === "&"){
            throw new Error("An entity with value '&' is not permitted");
        }else{
            this.externalEntities[key] = value;
        }
    }
}

module.exports = XMLParser;

/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/node2json.js":
/*!*****************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/node2json.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 
 * @param {array} node 
 * @param {any} options 
 * @returns 
 */
function prettify(node, options){
  return compress( node, options);
}

/**
 * 
 * @param {array} arr 
 * @param {object} options 
 * @param {string} jPath 
 * @returns object
 */
function compress(arr, options, jPath){
  let text;
  const compressedObj = {};
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const property = propName(tagObj);
    let newJpath = "";
    if(jPath === undefined) newJpath = property;
    else newJpath = jPath + "." + property;

    if(property === options.textNodeName){
      if(text === undefined) text = tagObj[property];
      else text += "" + tagObj[property];
    }else if(property === undefined){
      continue;
    }else if(tagObj[property]){
      
      let val = compress(tagObj[property], options, newJpath);
      const isLeaf = isLeafTag(val, options);

      if(tagObj[":@"]){
        assignAttributes( val, tagObj[":@"], newJpath, options);
      }else if(Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode){
        val = val[options.textNodeName];
      }else if(Object.keys(val).length === 0){
        if(options.alwaysCreateTextNode) val[options.textNodeName] = "";
        else val = "";
      }

      if(compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
        if(!Array.isArray(compressedObj[property])) {
            compressedObj[property] = [ compressedObj[property] ];
        }
        compressedObj[property].push(val);
      }else{
        //TODO: if a node is not an array, then check if it should be an array
        //also determine if it is a leaf node
        if (options.isArray(property, newJpath, isLeaf )) {
          compressedObj[property] = [val];
        }else{
          compressedObj[property] = val;
        }
      }
    }
    
  }
  // if(text && text.length > 0) compressedObj[options.textNodeName] = text;
  if(typeof text === "string"){
    if(text.length > 0) compressedObj[options.textNodeName] = text;
  }else if(text !== undefined) compressedObj[options.textNodeName] = text;
  return compressedObj;
}

function propName(obj){
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(key !== ":@") return key;
  }
}

function assignAttributes(obj, attrMap, jpath, options){
  if (attrMap) {
    const keys = Object.keys(attrMap);
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      const atrrName = keys[i];
      if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
        obj[atrrName] = [ attrMap[atrrName] ];
      } else {
        obj[atrrName] = attrMap[atrrName];
      }
    }
  }
}

function isLeafTag(obj, options){
  const { textNodeName } = options;
  const propCount = Object.keys(obj).length;
  
  if (propCount === 0) {
    return true;
  }

  if (
    propCount === 1 &&
    (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)
  ) {
    return true;
  }

  return false;
}
exports.prettify = prettify;


/***/ }),

/***/ "./node_modules/fast-xml-parser/src/xmlparser/xmlNode.js":
/*!***************************************************************!*\
  !*** ./node_modules/fast-xml-parser/src/xmlparser/xmlNode.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class XmlNode{
  constructor(tagname) {
    this.tagname = tagname;
    this.child = []; //nested tags, text, cdata, comments in order
    this[":@"] = {}; //attributes map
  }
  add(key,val){
    // this.child.push( {name : key, val: val, isCdata: isCdata });
    if(key === "__proto__") key = "#__proto__";
    this.child.push( {[key]: val });
  }
  addChild(node) {
    if(node.tagname === "__proto__") node.tagname = "#__proto__";
    if(node[":@"] && Object.keys(node[":@"]).length > 0){
      this.child.push( { [node.tagname]: node.child, [":@"]: node[":@"] });
    }else{
      this.child.push( { [node.tagname]: node.child });
    }
  };
};


module.exports = XmlNode;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./node_modules/strnum/strnum.js":
/*!***************************************!*\
  !*** ./node_modules/strnum/strnum.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
const numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
// const octRegex = /^0x[a-z0-9]+/;
// const binRegex = /0x[a-z0-9]+/;

 
const consider = {
    hex :  true,
    // oct: false,
    leadingZeros: true,
    decimalPoint: "\.",
    eNotation: true,
    //skipLike: /regex/
};

function toNumber(str, options = {}){
    options = Object.assign({}, consider, options );
    if(!str || typeof str !== "string" ) return str;
    
    let trimmedStr  = str.trim();
    
    if(options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
    else if(str==="0") return 0;
    else if (options.hex && hexRegex.test(trimmedStr)) {
        return parse_int(trimmedStr, 16);
    // }else if (options.oct && octRegex.test(str)) {
    //     return Number.parseInt(val, 8);
    }else if (trimmedStr.search(/[eE]/)!== -1) { //eNotation
        const notation = trimmedStr.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/); 
        // +00.123 => [ , '+', '00', '.123', ..
        if(notation){
            // console.log(notation)
            if(options.leadingZeros){ //accept with leading zeros
                trimmedStr = (notation[1] || "") + notation[3];
            }else{
                if(notation[2] === "0" && notation[3][0]=== "."){ //valid number
                }else{
                    return str;
                }
            }
            return options.eNotation ? Number(trimmedStr) : str;
        }else{
            return str;
        }
    // }else if (options.parseBin && binRegex.test(str)) {
    //     return Number.parseInt(val, 2);
    }else{
        //separate negative sign, leading zeros, and rest number
        const match = numRegex.exec(trimmedStr);
        // +00.123 => [ , '+', '00', '.123', ..
        if(match){
            const sign = match[1];
            const leadingZeros = match[2];
            let numTrimmedByZeros = trimZeros(match[3]); //complete num without leading zeros
            //trim ending zeros for floating number
            
            if(!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str; //-0123
            else if(!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str; //0123
            else if(options.leadingZeros && leadingZeros===str) return 0; //00
            
            else{//no leading zeros or leading zeros are allowed
                const num = Number(trimmedStr);
                const numStr = "" + num;

                if(numStr.search(/[eE]/) !== -1){ //given number is long and parsed to eNotation
                    if(options.eNotation) return num;
                    else return str;
                }else if(trimmedStr.indexOf(".") !== -1){ //floating number
                    if(numStr === "0" && (numTrimmedByZeros === "") ) return num; //0.0
                    else if(numStr === numTrimmedByZeros) return num; //0.456. 0.79000
                    else if( sign && numStr === "-"+numTrimmedByZeros) return num;
                    else return str;
                }
                
                if(leadingZeros){
                    return (numTrimmedByZeros === numStr) || (sign+numTrimmedByZeros === numStr) ? num : str
                }else  {
                    return (trimmedStr === numStr) || (trimmedStr === sign+numStr) ? num : str
                }
            }
        }else{ //non-numeric string
            return str;
        }
    }
}

/**
 * 
 * @param {string} numStr without leading zeros
 * @returns 
 */
function trimZeros(numStr){
    if(numStr && numStr.indexOf(".") !== -1){//float
        numStr = numStr.replace(/0+$/, ""); //remove ending zeros
        if(numStr === ".")  numStr = "0";
        else if(numStr[0] === ".")  numStr = "0"+numStr;
        else if(numStr[numStr.length-1] === ".")  numStr = numStr.substr(0,numStr.length-1);
        return numStr;
    }
    return numStr;
}

function parse_int(numStr, base){
    //polyfill
    if(parseInt) return parseInt(numStr, base);
    else if(Number.parseInt) return Number.parseInt(numStr, base);
    else if(window && window.parseInt) return window.parseInt(numStr, base);
    else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")
}

module.exports = toNumber;

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, types, scripts, repository, keywords, author, license, bugs, homepage, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"cos-js-sdk-v5\",\"version\":\"1.10.1\",\"description\":\"JavaScript SDK for [腾讯云对象存储](https://cloud.tencent.com/product/cos)\",\"main\":\"dist/cos-js-sdk-v5.js\",\"types\":\"index.d.ts\",\"scripts\":{\"prettier\":\"prettier --write src demo/demo.js demo/CIDemos/*.js test/test.js server/sts.js lib/request.js index.d.ts\",\"server\":\"node server/sts.js\",\"dev\":\"cross-env NODE_ENV=development webpack -w --mode=development\",\"build\":\"cross-env NODE_ENV=production webpack --mode=production\",\"cos-auth.min.js\":\"uglifyjs ./demo/common/cos-auth.js -o ./demo/common/cos-auth.min.js -c -m\",\"test\":\"jest --runInBand --coverage\",\"postinstall\":\"node scripts/patch-check.js\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/tencentyun/cos-js-sdk-v5.git\"},\"keywords\":[],\"author\":\"carsonxu\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/tencentyun/cos-js-sdk-v5/issues\"},\"homepage\":\"https://github.com/tencentyun/cos-js-sdk-v5#readme\",\"dependencies\":{\"fast-xml-parser\":\"4.5.0\"},\"devDependencies\":{\"@babel/core\":\"7.17.9\",\"@babel/plugin-transform-runtime\":\"7.18.10\",\"@babel/preset-env\":\"7.16.11\",\"babel-loader\":\"8.2.5\",\"body-parser\":\"^1.18.3\",\"cross-env\":\"^5.2.0\",\"express\":\"^4.16.4\",\"jest\":\"29.7.0\",\"jest-environment-jsdom\":\"29.7.0\",\"patch-package\":\"^8.0.0\",\"prettier\":\"^3.0.1\",\"qcloud-cos-sts\":\"^3.0.2\",\"request\":\"^2.87.0\",\"terser-webpack-plugin\":\"4.2.3\",\"uglifyjs\":\"^2.4.11\",\"webpack\":\"4.46.0\",\"webpack-cli\":\"4.10.0\"}}");

/***/ }),

/***/ "./src/advance.js":
/*!************************!*\
  !*** ./src/advance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
var session = __webpack_require__(/*! ./session */ "./src/session.js");
var Async = __webpack_require__(/*! ./async */ "./src/async.js");
var EventProxy = __webpack_require__(/*! ./event */ "./src/event.js").EventProxy;
var util = __webpack_require__(/*! ./util */ "./src/util.js");
var Tracker = __webpack_require__(/*! ./tracker */ "./src/tracker.js");

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
  tracker && tracker.setParams({
    chunkSize: ChunkSize
  });
  self.logger.info({
    cate: 'PROCESS',
    tag: 'upload',
    msg: "[key=".concat(params.Key, "] \u5206\u5757\u4E0A\u4F20\u5F00\u59CB")
  });

  // 上传过程中出现错误，返回错误
  ep.on('error', function (err) {
    if (!self._isRunningTask(TaskId)) return;
    if (params.UploadData.UploadId) {
      session.removeUsing(params.UploadData.UploadId);
    }
    err.UploadId = params.UploadData.UploadId || '';
    self.logger.error({
      cate: 'RESULT',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u5206\u5757\u4E0A\u4F20\u5931\u8D25: ").concat(JSON.stringify(err))
    });
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
      if (shortKey.indexOf('x-cos-meta-') === 0 || ['pic-operations', 'x-cos-callback', 'x-cos-callback-var', 'x-cos-return-body'].includes(shortKey)) {
        metaHeaders[k] = val;
      }
    });
    self.logger.info({
      cate: 'PROCESS',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u5F00\u59CB\u5B8C\u6210\u5206\u5757\u8BF7\u6C42")
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
        self.logger.error({
          cate: 'RESULT',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u5B8C\u6210\u5206\u5757\u8BF7\u6C42\u5931\u8D25")
        });
        return ep.emit('error', err);
      }
      session.removeUploadId.call(self, UploadData.UploadId);
      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
      self.logger.info({
        cate: 'RESULT',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u5B8C\u6210\u5206\u5757\u8BF7\u6C42\u6210\u529F")
      });
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
    self.logger.info({
      cate: 'PROCESS',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u5F00\u59CB\u4E0A\u4F20\u5404\u4E2A\u5206\u5757")
    });
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
        self.logger.error({
          cate: 'PROCESS',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u5206\u5757\u4E0A\u4F20\u5931\u8D25")
        });
        return ep.emit('error', err);
      }
      self.logger.info({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u6240\u6709\u5206\u5757\u4E0A\u4F20\u5B8C\u6210")
      });
      ep.emit('upload_slice_complete', data);
    });
  });

  // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
  ep.on('get_file_size_finish', function () {
    onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);
    if (params.UploadData.UploadId) {
      self.logger.info({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u5DF2\u7ECF\u83B7\u53D6\u5230 uploadId, ").concat(params.UploadData.UploadId)
      });
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
      self.logger.info({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u53BB\u83B7\u53D6 uploadId")
      });
      getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return ep.emit('error', err);
        params.UploadData.UploadId = UploadData.UploadId;
        params.UploadData.PartList = UploadData.PartList;
        self.logger.info({
          cate: 'PROCESS',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u83B7\u53D6\u5230 uploadId, ").concat(params.UploadData.UploadId)
        });
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
    self.logger.info({
      cate: 'PROCESS',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u6587\u4EF6\u5927\u5C0F\u4E3A 0\uFF0C\u6267\u884C\u7B80\u5355\u4E0A\u4F20")
    });
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
  var getChunkETag = function getChunkETag(PartNumber, callback) {
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
          onHashProgress({
            loaded: FinishSize,
            total: FileSize
          });
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
  var isAvailableUploadList = function isAvailableUploadList(PartList, callback) {
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
    var _next = function next(index) {
      if (index < PartCount) {
        var Part = PartList[index];
        getChunkETag(Part.PartNumber, function (err, chunk) {
          if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
            _next(index + 1);
          } else {
            callback(null, false);
          }
        });
      } else {
        callback(null, true);
      }
    };
    _next(0);
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
    self.logger.info({
      cate: 'PROCESS',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u51C6\u5907\u521D\u59CB\u5316\u5206\u5757\u4E0A\u4F20")
    });
    self.multipartInit(_params, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (err) {
        self.logger.error({
          cate: 'PROCESS',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u521D\u59CB\u5316\u5206\u5757\u4E0A\u4F20\u5931\u8D25, ").concat(JSON.stringify(err))
        });
        return ep.emit('error', err);
      }
      var UploadId = data.UploadId;
      if (!UploadId) {
        return callback(util.error(new Error('no such upload id')));
      }
      self.logger.info({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u521D\u59CB\u5316\u5206\u5757\u4E0A\u4F20\u6210\u529F")
      });
      ep.emit('upload_id_available', {
        UploadId: UploadId,
        PartList: []
      });
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
    var _next2 = function next(index) {
      // 如果本地找不到可用 UploadId，再一个个遍历校验远端
      if (index >= LocalUploadIdList.length) {
        ep.emit('has_and_check_upload_id', RemoteUploadIdList);
        return;
      }
      var UploadId = LocalUploadIdList[index];
      // 如果不在远端 UploadId 列表里，跳过并删除
      if (!util.isInArray(RemoteUploadIdList, UploadId)) {
        session.removeUploadId.call(self, UploadId);
        _next2(index + 1);
        return;
      }
      // 如果正在上传，跳过
      if (session.using[UploadId]) {
        _next2(index + 1);
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
          _next2(index + 1);
        } else {
          // 找到可用 UploadId
          ep.emit('upload_id_available', {
            UploadId: UploadId,
            PartList: PartListData.PartList
          });
        }
      });
    };
    _next2(0);
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
  var _next3 = function next() {
    self.multipartList(sendParams, function (err, data) {
      if (err) return callback(err);
      UploadList.push.apply(UploadList, data.Upload || []);
      if (data.IsTruncated === 'true') {
        // 列表不完整
        sendParams.KeyMarker = data.NextKeyMarker;
        sendParams.UploadIdMarker = data.NextUploadIdMarker;
        _next3();
      } else {
        callback(null, {
          UploadList: UploadList
        });
      }
    });
  };
  _next3();
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
  var _next4 = function next() {
    self.multipartListPart(sendParams, function (err, data) {
      if (err) return callback(err);
      PartList.push.apply(PartList, data.Part || []);
      if (data.IsTruncated === 'true') {
        // 列表不完整
        sendParams.PartNumberMarker = data.NextPartNumberMarker;
        _next4();
      } else {
        callback(null, {
          PartList: PartList
        });
      }
    });
  };
  _next4();
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
  var _onProgress2 = params.onProgress;
  self.logger.info({
    cate: 'PROCESS',
    tag: 'upload',
    msg: "[key=".concat(params.Key, "] \u5F00\u59CB\u5E76\u53D1\u4E0A\u4F20\u5404\u4E2A\u5206\u5757")
  });
  Async.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {
    if (!self._isRunningTask(TaskId)) return;
    var PartNumber = SliceItem['PartNumber'];
    var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
    var preAddSize = 0;
    self.logger.info({
      cate: 'PROCESS',
      tag: 'upload',
      msg: "[key=".concat(params.Key, "] \u5206\u5757").concat(PartNumber, "\u5F00\u59CB\u4E0A\u4F20")
    });
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
      onProgress: function onProgress(data) {
        FinishSize += data.loaded - preAddSize;
        preAddSize = data.loaded;
        _onProgress2({
          loaded: FinishSize,
          total: FileSize
        });
      },
      tracker: params.tracker
    }, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (!err && !data.ETag) {
        err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.( 获取ETag失败，请在CORS ExposeHeader设置中添加ETag，请参考文档：https://cloud.tencent.com/document/product/436/13318 )';
        self.logger.error({
          cate: 'PROCESS',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u5206\u5757").concat(PartNumber, "\u4E0A\u4F20\u8BF7\u6C42\u6210\u529F\uFF0C\u4F46\u662F\u672A\u83B7\u53D6\u5230 eTag")
        });
      }
      if (err) {
        FinishSize -= preAddSize;
        self.logger.info({
          cate: 'RESULT',
          tag: 'upload',
          msg: "[key=".concat(params.Key, "] \u5206\u5757").concat(PartNumber, "\u4E0A\u4F20\u5931\u8D25")
        });
      } else {
        FinishSize += currentSize - preAddSize;
        SliceItem.ETag = data.ETag;
      }
      self.logger.info({
        cate: 'RESULT',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] \u5206\u5757").concat(PartNumber, "\u4E0A\u4F20\u6210\u529F")
      });
      _onProgress2({
        loaded: FinishSize,
        total: FileSize
      });
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
      resultList[eachIndex] = {
        error: {
          KeyNotMatch: true
        }
      };
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
      resultList[eachIndex] = {
        error: err,
        task: task
      };
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
  var fileInfo = {
    TaskId: ''
  };

  // 上传链路
  if (self.options.EnableReporter) {
    var accelerate = self.options.UseAccelerate || typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.');
    var realApi = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';
    params.tracker = new Tracker({
      Beacon: self.options.BeaconReporter,
      clsReporter: self.options.ClsReporter,
      bucket: params.Bucket,
      region: params.Region,
      apiName: 'uploadFile',
      realApi: realApi,
      fileKey: params.Key,
      fileSize: FileSize,
      accelerate: accelerate,
      deepTracker: self.options.DeepTracker,
      customId: self.options.CustomId,
      delay: self.options.TrackerDelay
    });
  }

  // 整理 option，用于返回给回调
  util.each(params, function (v, k) {
    if (_typeof(v) !== 'object' && typeof v !== 'function') {
      fileInfo[k] = v;
    }
  });

  // 处理文件 TaskReady
  var _onTaskReady = params.onTaskReady;
  var onTaskReady = function onTaskReady(tid) {
    fileInfo.TaskId = tid;
    _onTaskReady && _onTaskReady(tid);
  };
  params.onTaskReady = onTaskReady;

  // 添加上传任务,超过阈值使用分块上传，小于等于则简单上传
  var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

  // 处理文件完成
  var _onFileFinish = params.onFileFinish;
  var onFileFinish = function onFileFinish(err, data) {
    // 格式化上报参数并上报
    params.tracker && params.tracker.report(err, data);
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
  var onTotalFileFinish = function onTotalFileFinish(err, data, options) {
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
    (function () {
      var Body = fileParams.Body;
      var FileSize = Body.size || Body.length || 0;
      var fileInfo = {
        Index: index,
        TaskId: ''
      };

      // 如果 批量上传的 Key 是 / 开头，强制去掉第一个 /
      if (!self.options.UseRawKey && fileParams.Key && fileParams.Key.substr(0, 1) === '/') {
        fileParams.Key = fileParams.Key.substr(1);
      }

      // 更新文件总大小
      TotalSize += FileSize;

      // 单个文件上传链路
      if (self.options.EnableReporter) {
        var accelerate = self.options.UseAccelerate || typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.');
        var realApi = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';
        fileParams.tracker = new Tracker({
          Beacon: self.options.BeaconReporter,
          clsReporter: self.options.ClsReporter,
          bucket: fileParams.Bucket,
          region: fileParams.Region,
          apiName: 'uploadFiles',
          realApi: realApi,
          fileKey: fileParams.Key,
          fileSize: FileSize,
          accelerate: accelerate,
          deepTracker: self.options.DeepTracker,
          customId: self.options.CustomId,
          delay: self.options.TrackerDelay
        });
      }

      // 整理 option，用于返回给回调
      util.each(fileParams, function (v, k) {
        if (_typeof(v) !== 'object' && typeof v !== 'function') {
          fileInfo[k] = v;
        }
      });

      // 处理单个文件 TaskReady
      var _onTaskReady = fileParams.onTaskReady;
      var onTaskReady = function onTaskReady(tid) {
        fileInfo.TaskId = tid;
        _onTaskReady && _onTaskReady(tid);
      };
      fileParams.onTaskReady = onTaskReady;

      // 处理单个文件进度
      var PreAddSize = 0;
      var _onProgress = fileParams.onProgress;
      var onProgress = function onProgress(info) {
        TotalFinish = TotalFinish - PreAddSize + info.loaded;
        PreAddSize = info.loaded;
        _onProgress && _onProgress(info);
        onTotalProgress({
          loaded: TotalFinish,
          total: TotalSize
        });
      };
      fileParams.onProgress = onProgress;

      // 添加上传任务
      var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

      // 处理单个文件完成
      var _onFileFinish = fileParams.onFileFinish;
      var onFileFinish = function onFileFinish(err, data) {
        // 格式化上报参数并上报
        fileParams.tracker && fileParams.tracker.report(err, data);
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
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var ChunkCount = 0;
  var FinishSize = 0;
  var FileSize;
  var onProgress;
  var SourceResHeaders = {};
  var SourceHeaders = {};
  var TargetHeader = {};

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
    // 完成上传的请求也做重试
    Async.retry(ChunkRetryTimes, function (tryCallback) {
      self.multipartComplete({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadData.UploadId,
        Parts: Parts,
        tracker: params.tracker,
        calledBySdk: 'sliceCopyFile'
      }, tryCallback);
    }, function (err, data) {
      session.removeUsing(UploadData.UploadId); // 标记 UploadId 没被使用了，因为复制没提供重试，所以只要出错，就是 UploadId 停用了。
      if (err) {
        onProgress(null, true);
        return callback(err);
      }
      session.removeUploadId(UploadData.UploadId);
      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
      callback(null, data);
    });
  });
  ep.on('get_copy_data_finish', function (UploadData) {
    // 处理 UploadId 缓存
    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    uuid && session.saveUploadId(uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
    session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

    var needCopySlices = util.filter(UploadData.PartList, function (SliceItem) {
      if (SliceItem['Uploaded']) {
        FinishSize += SliceItem['PartNumber'] >= ChunkCount ? FileSize % ChunkSize || ChunkSize : ChunkSize;
      }
      return !SliceItem['Uploaded'];
    });
    Async.eachLimit(needCopySlices, ChunkParallel, function (SliceItem, asyncCallback) {
      var PartNumber = SliceItem.PartNumber;
      var CopySourceRange = SliceItem.CopySourceRange;
      var currentSize = SliceItem.end - SliceItem.start;
      Async.retry(ChunkRetryTimes, function (tryCallback) {
        copySliceItem.call(self, {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          CopySource: CopySource,
          UploadId: UploadData.UploadId,
          PartNumber: PartNumber,
          CopySourceRange: CopySourceRange,
          tracker: params.tracker,
          calledBySdk: 'sliceCopyFile'
        }, tryCallback);
      }, function (err, data) {
        if (err) return asyncCallback(err);
        FinishSize += currentSize;
        onProgress({
          loaded: FinishSize,
          total: FileSize
        });
        SliceItem.ETag = data.ETag;
        asyncCallback(err || null, data);
      });
    }, function (err) {
      if (err) {
        session.removeUsing(UploadData.UploadId); // 标记 UploadId 没被使用了，因为复制没提供重试，所以只要出错，就是 UploadId 停用了。
        onProgress(null, true);
        return callback(err);
      }
      ep.emit('copy_slice_complete', UploadData);
    });
  });
  ep.on('get_chunk_size_finish', function () {
    var createNewUploadId = function createNewUploadId() {
      self.multipartInit({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Headers: TargetHeader,
        tracker: params.tracker,
        calledBySdk: 'sliceCopyFile'
      }, function (err, data) {
        if (err) return callback(err);
        params.UploadId = data.UploadId;
        ep.emit('get_copy_data_finish', {
          UploadId: params.UploadId,
          PartList: params.PartList
        });
      });
    };

    // 在本地找可用的 UploadId
    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    var LocalUploadIdList = session.getUploadIdList(uuid);
    if (!uuid || !LocalUploadIdList) return createNewUploadId();
    var _next5 = function next(index) {
      // 如果本地找不到可用 UploadId，再一个个遍历校验远端
      if (index >= LocalUploadIdList.length) return createNewUploadId();
      var UploadId = LocalUploadIdList[index];
      // 如果正在被使用，跳过
      if (session.using[UploadId]) return _next5(index + 1);
      // 判断 UploadId 是否存在线上
      wholeMultipartListPart.call(self, {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadId,
        tracker: params.tracker,
        calledBySdk: 'sliceCopyFile'
      }, function (err, PartListData) {
        if (err) {
          // 如果 UploadId 获取会出错，跳过并删除
          session.removeUploadId(UploadId);
          _next5(index + 1);
        } else {
          // 如果异步回来 UploadId 已经被用了，也跳过
          if (session.using[UploadId]) return _next5(index + 1);
          // 找到可用 UploadId
          var finishETagMap = {};
          var offset = 0;
          util.each(PartListData.PartList, function (PartItem) {
            var size = parseInt(PartItem.Size);
            var end = offset + size - 1;
            finishETagMap[PartItem.PartNumber + '|' + offset + '|' + end] = PartItem.ETag;
            offset += size;
          });
          util.each(params.PartList, function (PartItem) {
            var ETag = finishETagMap[PartItem.PartNumber + '|' + PartItem.start + '|' + PartItem.end];
            if (ETag) {
              PartItem.ETag = ETag;
              PartItem.Uploaded = true;
            }
          });
          ep.emit('get_copy_data_finish', {
            UploadId: UploadId,
            PartList: params.PartList
          });
        }
      });
    };
    _next5(0);
  });
  ep.on('get_file_size_finish', function () {
    // 控制分片大小
    (function () {
      var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
      var AutoChunkSize = 1024 * 1024;
      for (var i = 0; i < SIZE.length; i++) {
        AutoChunkSize = SIZE[i] * 1024 * 1024;
        if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
      }
      params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
      ChunkCount = Math.ceil(FileSize / ChunkSize);
      var list = [];
      for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
        var start = (partNumber - 1) * ChunkSize;
        var end = partNumber * ChunkSize < FileSize ? partNumber * ChunkSize - 1 : FileSize - 1;
        var item = {
          PartNumber: partNumber,
          start: start,
          end: end,
          CopySourceRange: 'bytes=' + start + '-' + end
        };
        list.push(item);
      }
      params.PartList = list;
    })();
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
    ep.emit('get_chunk_size_finish');
  });

  // 获取远端复制源文件的大小
  self.headObject({
    Bucket: SourceBucket,
    Region: SourceRegion,
    Key: SourceKey,
    tracker: params.tracker,
    calledBySdk: 'sliceCopyFile'
  }, function (err, data) {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        callback(util.error(err, {
          ErrorStatus: SourceKey + ' Not Exist'
        }));
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
    params.tracker && params.tracker.setParams({
      httpSize: FileSize
    });
    onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

    // 开始上传
    if (FileSize <= CopySliceSize) {
      if (!params.Headers['x-cos-metadata-directive']) {
        params.Headers['x-cos-metadata-directive'] = 'Copy';
      }
      self.putObjectCopy(Object.assign(params, {
        calledBySdk: 'sliceCopyFile'
      }), function (err, data) {
        if (err) {
          onProgress(null, true);
          return callback(err);
        }
        onProgress({
          loaded: FileSize,
          total: FileSize
        }, true);
        callback(err, data);
      });
    } else {
      var resHeaders = data.headers;
      SourceResHeaders = resHeaders;
      SourceHeaders = {
        'Cache-Control': resHeaders['cache-control'],
        'Content-Disposition': resHeaders['content-disposition'],
        'Content-Encoding': resHeaders['content-encoding'],
        'Content-Type': resHeaders['content-type'],
        Expires: resHeaders['expires'],
        'x-cos-storage-class': resHeaders['x-cos-storage-class']
      };
      util.each(resHeaders, function (v, k) {
        var metaPrefix = 'x-cos-meta-';
        if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
          SourceHeaders[k] = v;
        }
      });
      ep.emit('get_file_size_finish');
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
      CopySourceRange: CopySourceRange,
      tracker: params.tracker,
      calledBySdk: params.calledBySdk
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

/***/ "./src/async.js":
/*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var eachLimit = function eachLimit(arr, limit, iterator, callback) {
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
          callback = function callback() {};
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
var retry = function retry(times, iterator, callback) {
  var _next = function next(index) {
    iterator(function (err, data) {
      if (err && index < times) {
        _next(index + 1);
      } else {
        callback(err, data);
      }
    });
  };
  if (times < 1) {
    callback();
  } else {
    _next(1);
  }
};
var async = {
  eachLimit: eachLimit,
  retry: retry
};
module.exports = async;

/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var REQUEST = __webpack_require__(/*! ../lib/request */ "./lib/request.js");
var util = __webpack_require__(/*! ./util */ "./src/util.js");

// Bucket 相关

/**
 * 获取用户的 bucket 列表
 * @param  {Object}  params         回调函数，必须，下面为参数列表
 * 无特殊参数
 * @param  {Function}  callback     回调函数，必须
 */
function getService(params, callback) {
  var protocol = this.options.Protocol || (util.isBrowser && (typeof location === "undefined" ? "undefined" : _typeof(location)) === 'object' && location.protocol === 'http:' ? 'http:' : 'https:');
  var domain = this.options.ServiceDomain;
  var appId = params.AppId || this.options.appId;
  var region = params.Region;
  if (domain) {
    domain = domain.replace(/\{\{AppId\}\}/gi, appId || '').replace(/\{\{Region\}\}/gi, region || '').replace(/\{\{.*?\}\}/gi, '');
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
    SignHost: SignHost,
    tracker: params.tracker
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
    xml = util.json2xml({
      CreateBucketConfiguration: CreateBucketConfiguration
    });
  }
  submitRequest.call(this, {
    Action: 'name/cos:PutBucket',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    body: xml,
    tracker: params.tracker
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
    method: 'HEAD',
    tracker: params.tracker
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
    qs: reqParams,
    tracker: params.tracker
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
    method: 'DELETE',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    AccessControlPolicy.AccessControlList = {
      Grant: Grants
    };
    xml = util.json2xml({
      AccessControlPolicy: AccessControlPolicy
    });
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.b64(util.md5(xml));
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
    body: xml,
    tracker: params.tracker
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
    action: 'acl',
    tracker: params.tracker
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
  var Conf = {
    CORSRule: CORSRules
  };
  if (params.ResponseVary) Conf.ResponseVary = params.ResponseVary;
  var xml = util.json2xml({
    CORSConfiguration: Conf
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketCORS',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'cors',
    headers: headers,
    tracker: params.tracker
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
    action: 'cors',
    tracker: params.tracker
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
      });
    });
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
    action: 'cors',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'location',
    tracker: params.tracker
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
  headers['Content-MD5'] = util.b64(util.md5(PolicyStr));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketPolicy',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    action: 'policy',
    body: PolicyStr,
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    rawBody: true,
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      if (err.statusCode && err.statusCode === 403) {
        return callback(util.error(err, {
          ErrorStatus: 'Access Denied'
        }));
      }
      if (err.statusCode && err.statusCode === 405) {
        return callback(util.error(err, {
          ErrorStatus: 'Method Not Allowed'
        }));
      }
      if (err.statusCode && err.statusCode === 404) {
        return callback(util.error(err, {
          ErrorStatus: 'Policy Not Found'
        }));
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
    action: 'policy',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var xml = util.json2xml({
    Tagging: {
      TagSet: {
        Tag: Tags
      }
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketTagging',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'tagging',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'tagging',
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'NoSuchTagSet')) {
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
    action: 'tagging',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var xml = util.json2xml({
    LifecycleConfiguration: {
      Rule: Rules
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketLifecycle',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'lifecycle',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'lifecycle',
    tracker: params.tracker
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
    action: 'lifecycle',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var xml = util.json2xml({
    VersioningConfiguration: VersioningConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketVersioning',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'versioning',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'versioning',
    tracker: params.tracker
  }, function (err, data) {
    if (!err) {
      !data.VersioningConfiguration && (data.VersioningConfiguration = {});
    }
    callback(err, data);
  });
}
function putBucketReplication(params, callback) {
  var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);
  var xml = util.json2xml({
    ReplicationConfiguration: ReplicationConfiguration
  });
  xml = xml.replace(/<(\/?)Rules>/gi, '<$1Rule>');
  xml = xml.replace(/<(\/?)Tags>/gi, '<$1Tag>');
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketReplication',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'replication',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'replication',
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {
        var result = {
          ReplicationConfiguration: {
            Rules: []
          },
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
    action: 'replication',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  if (RoutingRules.length) WebsiteConfiguration.RoutingRules = {
    RoutingRule: RoutingRules
  };
  var xml = util.json2xml({
    WebsiteConfiguration: WebsiteConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketWebsite',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'website',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'website',
    tracker: params.tracker
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
    action: 'website',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  if (Domains.length) RefererConfiguration.DomainList = {
    Domain: Domains
  };
  var xml = util.json2xml({
    RefererConfiguration: RefererConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketReferer',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'referer',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'referer',
    tracker: params.tracker
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
      RefererConfiguration.DomainList = {
        Domains: Domains
      };
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
  var xml = util.json2xml({
    DomainConfiguration: {
      DomainRule: DomainRule
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketDomain',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'domain',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'domain',
    tracker: params.tracker
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
    action: 'domain',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var xml = util.json2xml({
    OriginConfiguration: {
      OriginRule: OriginRule
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketOrigin',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'origin',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'origin',
    tracker: params.tracker
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
    action: 'origin',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketLogging',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'logging',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'logging',
    tracker: params.tracker
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
function submitBucketInventory(method, params, callback) {
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
  headers['Content-MD5'] = util.b64(util.md5(xml));
  var action = method === 'PUT' ? 'name/cos:PutBucketInventory' : 'name/cos:PostBucketInventory';
  submitRequest.call(this, {
    Action: action,
    method: method,
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'inventory',
    qs: {
      id: params['Id']
    },
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
 * 创建一个清单任务
 */
function putBucketInventory(params, callback) {
  return submitBucketInventory.call(this, 'PUT', params, callback);
}

/**
 * 创建一个一次性清单任务 会立即执行
 */
function postBucketInventory(params, callback) {
  return submitBucketInventory.call(this, 'POST', params, callback);
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
    },
    tracker: params.tracker
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
    },
    tracker: params.tracker
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
    },
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var configuration = {
    AccelerateConfiguration: params.AccelerateConfiguration || {}
  };
  var xml = util.json2xml(configuration);
  var headers = {};
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketAccelerate',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'accelerate',
    headers: headers,
    tracker: params.tracker
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
    action: 'accelerate',
    tracker: params.tracker
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
  var xml = util.json2xml({
    ServerSideEncryptionConfiguration: {
      Rule: Rules
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketEncryption',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'encryption',
    headers: headers,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    action: 'encryption',
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.code === 'NoSuchEncryptionConfiguration') {
        var result = {
          EncryptionConfiguration: {
            Rules: []
          },
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
    data.EncryptionConfiguration = {
      Rules: Rules
    };
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
    action: 'encryption',
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    headers: params.Headers,
    tracker: params.tracker
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
    action: 'versions',
    tracker: params.tracker
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
  var self = this;
  self.logger.info({
    cate: 'PROCESS',
    tag: 'download',
    msg: "[key=".concat(params.Key, "] getObject\u5F00\u59CB")
  });
  if (this.options.ObjectKeySimplifyCheck) {
    // getObject 的 Key 需要校验，避免调用成 getBucket
    var formatKey = util.simplifyPath(params.Key);
    if (formatKey === '/') {
      callback(util.error(new Error('The Getobject Key is illegal')));
      return;
    }
  }
  var reqParams = params.Query || {};
  var reqParamsStr = params.QueryString || '';
  var onProgress = util.throttleOnProgress.call(this, 0, params.onProgress);
  var tracker = params.tracker;
  tracker && tracker.setParams({
    signStartTime: new Date().getTime()
  });
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
    self.logger.info({
      cate: 'PROCESS',
      tag: 'download',
      msg: "[key=".concat(params.Key, "] getObject\u7ED3\u675F")
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
  self.logger.info({
    cate: 'PROCESS',
    tag: 'upload',
    msg: "[key=".concat(params.Key, "] putObject\u5F00\u59CB")
  });

  // 特殊处理 Cache-Control、Content-Type，避免代理更改这两个字段导致写入到 Object 属性里
  var headers = params.Headers;
  if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = params.Body && params.Body.type || '';
  }
  var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;
  var tracker = params.tracker;
  needCalcMd5 && tracker && tracker.setParams({
    md5StartTime: new Date().getTime()
  });
  needCalcMd5 && self.logger.debug({
    cate: 'PROCESS',
    tag: 'upload',
    msg: "[key=".concat(params.Key, "] \u5F00\u59CB\u8BA1\u7B97 md5")
  });
  util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
    if (md5) {
      self.logger.debug({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] md5: ").concat(md5, "\uFF0Cmd5Base64=").concat(util.b64(md5))
      });
      tracker && tracker.setParams({
        md5EndTime: new Date().getTime()
      });
      if (self.options.UploadCheckContentMd5) headers['Content-MD5'] = util.b64(md5);
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
        self.logger.error({
          cate: 'ERROR',
          tag: 'upload',
          msg: "\u4E0A\u4F20\u5931\u8D25\uFF0C\u9519\u8BEF\u4FE1\u606F\uFF1A".concat(JSON.stringify(err))
        });
        onProgress(null, true);
        return callback(err);
      }
      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
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
      self.logger.info({
        cate: 'RESULT',
        tag: 'upload',
        msg: "\u4E0A\u4F20\u6210\u529F\uFF0CLocation=".concat(url)
      });
      self.logger.info({
        cate: 'PROCESS',
        tag: 'upload',
        msg: "[key=".concat(params.Key, "] putObject\u7ED3\u675F")
      });
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
    action: params.Recursive ? 'recursive' : '',
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      var statusCode = err.statusCode;
      if (statusCode && statusCode === 404) {
        return callback(null, {
          BucketNotFound: true,
          statusCode: statusCode
        });
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
  var reqParams = {};
  if (params.VersionId) {
    reqParams.versionId = params.VersionId;
  }
  submitRequest.call(this, {
    Action: 'name/cos:GetObjectACL',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    qs: reqParams,
    action: 'acl',
    tracker: params.tracker
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
    AccessControlPolicy.AccessControlList = {
      Grant: Grants
    };
    xml = util.json2xml({
      AccessControlPolicy: AccessControlPolicy
    });
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.b64(util.md5(xml));
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
    body: xml,
    tracker: params.tracker
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
    headers: headers,
    tracker: params.tracker
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
  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
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
    headers: params.Headers,
    tracker: params.tracker
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
  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
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
    headers: params.Headers,
    tracker: params.tracker
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
  var xml = util.json2xml({
    Delete: {
      Object: Objects,
      Quiet: Quiet || false
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
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
    headers: headers,
    tracker: params.tracker
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
  var xml = util.json2xml({
    RestoreRequest: RestoreRequest
  });
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:RestoreObject',
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    body: xml,
    action: 'restore',
    headers: headers,
    tracker: params.tracker
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
  var xml = util.json2xml({
    Tagging: {
      TagSet: {
        Tag: Tags
      }
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutObjectTagging',
    method: 'PUT',
    Bucket: params.Bucket,
    Key: params.Key,
    Region: params.Region,
    body: xml,
    action: 'tagging',
    headers: headers,
    VersionId: params.VersionId,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
    VersionId: params.VersionId,
    tracker: params.tracker
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'NoSuchTagSet')) {
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
    VersionId: params.VersionId,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  var xml = util.json2xml({
    SelectRequest: SelectRequest
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
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
    rawBody: true,
    tracker: params.tracker
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
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
  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = params.Body && params.Body.type || '';
  }
  var needCalcMd5 = params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5);
  needCalcMd5 && tracker && tracker.setParams({
    md5StartTime: new Date().getTime()
  });
  util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
    if (md5) params.Headers['x-cos-meta-md5'] = md5;
    needCalcMd5 && tracker && tracker.setParams({
      md5EndTime: new Date().getTime()
    });
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
      if (err) {
        tracker && tracker.parent && tracker.parent.setParams({
          errorNode: 'multipartInit'
        });
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
    needCalcMd5 && tracker && tracker.setParams({
      md5StartTime: new Date().getTime()
    });
    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
      if (md5) params.Headers['Content-MD5'] = util.b64(md5);
      needCalcMd5 && tracker && tracker.setParams({
        md5EndTime: new Date().getTime()
      });
      tracker && tracker.setParams({
        partNumber: params.PartNumber
      });
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
        if (err) {
          tracker && tracker.parent && tracker.parent.setParams({
            errorNode: 'multipartUpload'
          });
          return callback(err);
        }
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
  var xml = util.json2xml({
    CompleteMultipartUpload: {
      Part: Parts
    }
  });
  // CSP/ceph CompleteMultipartUpload 接口 body 写死了限制 1MB，这里最多 10000 片时，xml 字符串去掉空格853KB
  xml = xml.replace(/\n\s*/g, '');
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.b64(util.md5(xml));
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
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartComplete'
      });
      return callback(err);
    }
    var url = getUrl({
      ForcePathStyle: self.options.ForcePathStyle,
      protocol: self.options.Protocol,
      domain: self.options.Domain,
      bucket: params.Bucket,
      region: !self.options.UseAccelerate ? params.Region : 'accelerate',
      object: params.Key,
      isLocation: true
    });
    var res = data.CompleteMultipartUploadResult || {};
    // pic-operations 处理
    if (res.ProcessResults) {
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
    // callback 处理
    if (res.CallbackResult) {
      var callbackResult = res.CallbackResult;
      if (callbackResult.Status === '200' && callbackResult.CallbackBody) {
        try {
          res.CallbackBody = JSON.parse(util.decodeBase64(callbackResult.CallbackBody));
        } catch (e) {
          res.CallbackBody = {};
        }
      } else {
        res.CallbackError = callbackResult.Error || {};
      }
      delete res.CallbackResult;
    }
    // returnBody 处理
    if (res.ReturnBodyResult) {
      var returnBodyResult = res.ReturnBodyResult;
      if (returnBodyResult.Status === '200' && returnBodyResult.ReturnBody) {
        try {
          res.ReturnBody = JSON.parse(util.decodeBase64(returnBodyResult.ReturnBody));
        } catch (e) {
          res.ReturnBody = {};
        }
      } else {
        res.ReturnError = {
          Code: returnBodyResult.Code,
          Message: returnBodyResult.Message,
          Status: returnBodyResult.Status
        };
      }
      delete res.ReturnBodyResult;
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
  tracker && tracker.setParams({
    signStartTime: new Date().getTime()
  });
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
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartList'
      });
      return callback(err);
    }
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
  var tracker = params.tracker;
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
    qs: reqParams,
    tracker: tracker
  }, function (err, data) {
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartListPart'
      });
      return callback(err);
    }
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
    qs: reqParams,
    tracker: params.tracker
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
    DataType: params.DataType,
    tracker: params.tracker
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
  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = params.Body && params.Body.type || '';
  }
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
    headers: params.Headers,
    tracker: params.tracker
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
    callback(null, {
      Url: syncUrl
    });
    return syncUrl;
  }

  // 签名加上 Host，避免跨桶访问
  var SignHost = getSignHost.call(this, {
    Bucket: params.Bucket,
    Region: params.Region,
    UseAccelerate: params.UseAccelerate,
    Url: url
  });
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
    var replaceUrlParamList = function replaceUrlParamList(url) {
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
      callback(null, {
        Url: signUrl
      });
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
    FULL_CONTROL: 'GrantFullControl',
    WRITE: 'GrantWrite',
    READ: 'GrantRead',
    READ_ACP: 'GrantReadAcp',
    WRITE_ACP: 'GrantWriteAcp'
  };
  var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};
  var Grant = AccessControlList.Grant;
  if (Grant) {
    Grant = util.isArray(Grant) ? Grant : [Grant];
  }
  var PublicAcl = {
    READ: 0,
    WRITE: 0,
    FULL_CONTROL: 0
  };
  Grant && Grant.length && util.each(Grant, function (item) {
    var uriMatch = item.Grantee.URI && item.Grantee.URI.endsWith('/groups/global/AllUsers');
    if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || uriMatch) {
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
    domain = domain({
      Bucket: longBucket,
      Region: region
    });
  }
  // 兼容不带冒号的http、https
  if (['http', 'https'].includes(params.protocol)) {
    params.protocol = params.protocol + ':';
  }
  var protocol = params.protocol || (util.isBrowser && (typeof location === "undefined" ? "undefined" : _typeof(location)) === 'object' && location.protocol === 'http:' ? 'http:' : 'https:');
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
  domain = domain.replace(/\{\{AppId\}\}/gi, appId).replace(/\{\{Bucket\}\}/gi, shortBucket).replace(/\{\{Region\}\}/gi, region).replace(/\{\{.*?\}\}/gi, '');
  domain = domain.replace(/\{AppId\}/gi, appId).replace(/\{BucketName\}/gi, shortBucket).replace(/\{Bucket\}/gi, longBucket).replace(/\{Region\}/gi, region).replace(/\{.*?\}/gi, '');
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
var getSignHost = function getSignHost(opt) {
  // Url 或 Bucket+Region 至少传一个
  var paramsCompleted = opt.Url || opt.Bucket && opt.Region;
  if (!paramsCompleted) return '';
  var useAccelerate = opt.UseAccelerate === undefined ? this.options.UseAccelerate : opt.UseAccelerate;
  var url = opt.Url || getUrl({
    ForcePathStyle: this.options.ForcePathStyle,
    protocol: this.options.Protocol,
    domain: this.options.Domain,
    bucket: opt.Bucket,
    region: useAccelerate ? 'accelerate' : opt.Region
  });
  var urlHost = url.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
  return urlHost;
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
  var cb = function cb(err, AuthData) {
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
  var calcAuthByTmpKey = function calcAuthByTmpKey() {
    var KeyTime = '';
    if (StsData.StartTime && params.Expires) {
      KeyTime = StsData.StartTime + ';' + (StsData.StartTime + params.Expires * 1);
    } else if (StsData.StartTime && StsData.ExpiredTime) {
      KeyTime = StsData.StartTime + ';' + StsData.ExpiredTime;
    }
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
      ClientUA: StsData.ClientUA || '',
      SignFrom: 'client'
    };
    cb(null, AuthData);
  };
  var checkAuthError = function checkAuthError(AuthData) {
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
      if (typeof AuthData === 'string') AuthData = {
        Authorization: AuthData
      };
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
      var KeyTime = '';
      if (self.options.StartTime && params.Expires) {
        if (self.options.StartTime.toString().length !== 10) {
          return cb(util.error(new Error('params "StartTime" should be 10 digits')));
        }
        KeyTime = self.options.StartTime + ';' + (self.options.StartTime + params.Expires * 1);
      } else if (self.options.StartTime && self.options.ExpiredTime) {
        if (self.options.StartTime.toString().length !== 10) {
          return cb(util.error(new Error('params "StartTime" should be 10 digits')));
        }
        if (self.options.ExpiredTime.toString().length !== 10) {
          return cb(util.error(new Error('params "ExpiredTime" should be 10 digits')));
        }
        KeyTime = self.options.StartTime + ';' + self.options.ExpiredTime * 1;
      }
      var Authorization = util.getAuth({
        SecretId: params.SecretId || self.options.SecretId,
        SecretKey: params.SecretKey || self.options.SecretKey,
        Method: params.Method,
        Pathname: Pathname,
        Query: params.Query,
        Headers: headers,
        Expires: params.Expires,
        KeyTime: KeyTime,
        UseRawKey: self.options.UseRawKey,
        SystemClockOffset: self.options.SystemClockOffset,
        ForceSignHost: forceSignHost
      });
      var AuthData = {
        Authorization: Authorization,
        SecurityToken: self.options.SecurityToken || self.options.XCosSecurityToken,
        SignFrom: 'client'
      };
      cb(null, AuthData);
      return AuthData;
    }();
  }
  return '';
}

// 判断当前请求出错时能否重试
function allowRetry(err) {
  var self = this;
  var canRetry = false;
  var isTimeError = false;
  var networkError = false;
  var serverDate = err.headers && (err.headers.date || err.headers.Date) || err.error && err.error.ServerTime;
  try {
    var errorCode = err.error.Code;
    var errorMessage = err.error.Message;
    if (errorCode === 'RequestTimeTooSkewed' || errorCode === 'AccessDenied' && errorMessage === 'Request has expired') {
      isTimeError = true;
    }
  } catch (e) {}
  if (err) {
    // 调整时间偏差
    if (isTimeError && serverDate) {
      var serverTime = Date.parse(serverDate);
      if (this.options.CorrectClockSkew && Math.abs(util.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {
        console.error('error: Local time is too skewed.');
        this.options.SystemClockOffset = serverTime - Date.now();
        canRetry = true;
      }
    } else if (Math.floor(err.statusCode / 100) === 5) {
      canRetry = true;
      networkError = false;
    } else if (err.message === 'timeout') {
      canRetry = true;
      networkError = self.options.AutoSwitchHost;
    } else if (err.message === 'CORS blocked or network error') {
      // 跨域/网络错误都包含在内
      canRetry = true;
      networkError = self.options.AutoSwitchHost;
    }
  }
  return {
    canRetry: canRetry,
    networkError: networkError
  };
}

/**
 * requestUrl：请求的url，用于判断是否cos主域名，true才切
 * clientCalcSign：是否客户端计算签名，服务端返回的签名不能切，true才切
 * networkError：是否未知网络错误，true才切
 * */
function canSwitchHost(_ref) {
  var requestUrl = _ref.requestUrl,
    clientCalcSign = _ref.clientCalcSign,
    networkError = _ref.networkError;
  if (!this.options.AutoSwitchHost) return false;
  if (!requestUrl) return false;
  if (!clientCalcSign) return false;
  if (!networkError) return false;
  var commonReg = /^https?:\/\/[^\/]*\.cos\.[^\/]*\.myqcloud\.com(\/.*)?$/;
  var accelerateReg = /^https?:\/\/[^\/]*\.cos\.accelerate\.myqcloud\.com(\/.*)?$/;
  // 当前域名是cos主域名才切换
  var isCommonCosHost = commonReg.test(requestUrl) && !accelerateReg.test(requestUrl);
  return isCommonCosHost;
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

  /**
   * 手动传params.SignHost的场景：cos.getService、cos.getObjectUrl
   * 手动传Url的场景：cos.request
   */
  var paramsUrl = params.url || params.Url;
  var SignHost = params.SignHost || getSignHost.call(this, {
    Bucket: params.Bucket,
    Region: params.Region,
    Url: paramsUrl
  });
  var tracker = params.tracker;
  var _next = function next(tryTimes) {
    var oldClockOffset = self.options.SystemClockOffset;
    tracker && tracker.setParams({
      signStartTime: new Date().getTime(),
      httpRetryTimes: tryTimes - 1
    });
    if (params.SwitchHost) {
      // 更换要签的host
      SignHost = SignHost.replace(/myqcloud.com/, 'tencentcos.cn');
    }
    var logParams = _objectSpread(_objectSpread({}, params), {}, {
      Query: Query,
      SignHost: SignHost,
      ForceSignHost: self.options.ForceSignHost
    });
    delete logParams.tracker;
    self.logger.debug({
      cate: 'PROCESS',
      tag: 'base',
      msg: "\u5F00\u59CB\u8BA1\u7B97\u7B7E\u540D, opt=".concat(JSON.stringify(logParams))
    });
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
      ForceSignHost: self.options.ForceSignHost,
      SwitchHost: params.SwitchHost
    }, function (err, AuthData) {
      if (err) {
        self.logger.error({
          cate: 'PROCESS',
          tag: 'base',
          msg: "\u7B7E\u540D\u83B7\u53D6\u5931\u8D25, err=".concat(JSON.stringify(err.message))
        });
        callback(err);
        return;
      }
      tracker && tracker.setParams({
        signEndTime: new Date().getTime(),
        httpStartTime: new Date().getTime()
      });
      params.AuthData = AuthData;
      self.logger.debug({
        cate: 'PROCESS',
        tag: 'base',
        msg: "\u7B7E\u540D\u83B7\u53D6\u6210\u529F"
      });
      self.logger.info({
        cate: 'PROCESS',
        tag: 'base',
        msg: "\u51C6\u5907\u53D1\u8D77\u8BF7\u6C42"
      });
      _submitRequest.call(self, params, function (err, data) {
        tracker && tracker.setParams({
          httpEndTime: new Date().getTime()
        });
        var canRetry = false;
        var networkError = false;
        if (err) {
          var info = allowRetry.call(self, err);
          canRetry = info.canRetry || oldClockOffset !== self.options.SystemClockOffset;
          networkError = info.networkError;
          self.logger.error({
            cate: 'PROCESS',
            tag: 'network',
            msg: "\u8BF7\u6C42\u5931\u8D25, err=".concat(JSON.stringify(err), ", canRetry=").concat(canRetry, ", networkError=").concat(networkError, ", tryTimes=").concat(tryTimes)
          });
        }
        if (err && tryTimes < 4 && canRetry) {
          if (params.headers) {
            delete params.headers.Authorization;
            delete params.headers['token'];
            delete params.headers['clientIP'];
            delete params.headers['clientUA'];
            params.headers['x-cos-security-token'] && delete params.headers['x-cos-security-token'];
            params.headers['x-ci-security-token'] && delete params.headers['x-ci-security-token'];
          }
          // 进入重试逻辑时 需判断是否需要切换cos备用域名
          var switchHost = canSwitchHost.call(self, {
            requestUrl: (err === null || err === void 0 ? void 0 : err.url) || '',
            clientCalcSign: AuthData.SignFrom === 'client',
            networkError: networkError
          });
          params.SwitchHost = switchHost;
          // 重试时增加请求头
          params.headers['x-cos-sdk-retry'] = true;
          self.logger.info({
            cate: 'PROCESS',
            tag: 'base',
            msg: "\u91CD\u8BD5\u8BF7\u6C42, \u91CD\u8BD5\u7B2C".concat(tryTimes, "\u6B21")
          });
          _next(tryTimes + 1);
        } else {
          self.logger.info({
            cate: 'PROCESS',
            tag: 'base',
            msg: "\u8BF7\u6C42\u5B8C\u6210"
          });
          callback(err, data);
        }
      });
    });
  };
  _next(1);
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
  if (params.SwitchHost) {
    // 更换请求的url
    url = url.replace(/myqcloud.com/, 'tencentcos.cn');
  }
  var repoterUrl = object ? url : '';
  if (params.action) {
    // 已知问题，某些版本的qq会对url自动拼接（比如/upload被拼接成/upload=(null)）导致签名错误，这里做下兼容。
    url = url + '?' + (util.isIOS_QQ ? "".concat(params.action, "=") : params.action);
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
  params.Action && (opt.action = params.Action);
  opt.key = params.Key || params.ResourceKey;

  // 清理 undefined 和 null 字段
  opt.headers && (opt.headers = util.clearKey(opt.headers));
  opt = util.clearKey(opt);

  // progress
  if (params.onProgress && typeof params.onProgress === 'function') {
    var contentLength = body && (body.size || body.length) || 0;
    opt.onProgress = function (e) {
      if (TaskId && !self._isRunningTask(TaskId)) return;
      var loaded = e ? e.loaded : 0;
      params.onProgress({
        loaded: loaded,
        total: contentLength
      });
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
  var requestUid = util.uuid();
  self.logger.info({
    cate: 'PROCESS',
    tag: 'network',
    msg: "[Request] ".concat(requestUid, ", requestOpt=").concat(JSON.stringify(opt))
  });
  self.emit('before-send', opt);
  var useAccelerate = opt.url.includes('accelerate.');
  var queryString = opt.qs ? Object.keys(opt.qs).map(function (key) {
    return "".concat(key, "=").concat(opt.qs[key]);
  }).join('&') : '';
  var fullUrl = queryString ? opt.url + '?' + queryString : opt.url;
  if (params.tracker) {
    var _opt$body;
    params.tracker.setParams({
      url: fullUrl,
      httpMethod: opt.method,
      accelerate: useAccelerate,
      httpSize: ((_opt$body = opt.body) === null || _opt$body === void 0 ? void 0 : _opt$body.size) || 0
    });
    // 分块上传时给父级tracker设置url信息
    if (params.tracker.parent && !params.tracker.parent.params.url) {
      params.tracker.parent.setParams({
        url: repoterUrl,
        accelerate: useAccelerate
      });
    }
  }
  var sender = (self.options.Request || REQUEST)(opt, function (r) {
    if (r && r.error === 'abort') return;
    var receive = {
      options: opt,
      error: r && r.error,
      statusCode: r && r.statusCode || 0,
      statusMessage: r && r.statusMessage || '',
      headers: r && r.headers || {},
      body: r && r.body
    };
    // 抛出事件，允许修改返回值的 error、statusCode、statusMessage、body
    self.emit('after-receive', receive);
    var err = receive.error;
    var body = receive.body;
    // 返回内容添加 状态码 和 headers
    var response = {
      statusCode: receive.statusCode,
      statusMessage: receive.statusMessage,
      headers: receive.headers
    };
    var result = err ? '[error]' : '[success]';
    self.logger.info({
      cate: 'PROCESS',
      tag: 'network',
      msg: "[Response] ".concat(requestUid, ", ").concat(result, ", response=").concat(JSON.stringify(response))
    });
    var hasReturned;
    var cb = function cb(err, data) {
      TaskId && self.off('inner-kill-task', _killTask);
      if (hasReturned) return;
      hasReturned = true;
      var attrs = {};
      response && response.statusCode && (attrs.statusCode = response.statusCode);
      response && response.headers && (attrs.headers = response.headers);
      if (err) {
        opt.url && (attrs.url = opt.url);
        opt.method && (attrs.method = opt.method);
        err = util.extend(err || {}, attrs);
        callback(err, null);
      } else {
        // putObject 返回回调处理
        if (params.Action === 'name/cos:PutObject') {
          var pHeaders = {};
          for (var i in params.headers) {
            var key = i.toLowerCase();
            pHeaders[key] = params.headers[i];
          }
          if (pHeaders['x-cos-callback']) {
            if (data.Error) {
              data.CallbackError = util.clone(data.Error);
              delete data.Error;
            } else {
              data.CallbackBody = util.clone(data);
            }
          } else if (pHeaders['x-cos-return-body']) {
            if (data.Error) {
              data.ReturnError = util.clone(data.Error);
              delete data.Error;
            } else {
              data.ReturnBody = util.clone(data);
            }
          }
        }
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
    if (rawBody) {
      if (statusSuccess) {
        return cb(null, {
          body: body
        });
      } else {
        // 兼容报错时返回了 blob，需要解析成 string
        if (body instanceof Blob) {
          util.readAsBinaryString(body, function (content) {
            var json = util.parseResBody(content);
            var errorBody = json.Error || json;
            return cb(util.error(new Error(errorBody.Message || 'response body error'), {
              code: errorBody.Code,
              error: errorBody
            }));
          });
          return;
        }
      }
    }

    // 解析body，兼容 xml、json，解析失败时完整返回
    var json = util.parseResBody(body);

    // 处理返回值
    var errorBody = json.Error || json;
    if (statusSuccess) {
      // 正确返回，状态码 2xx 时，body 不会有 Error
      cb(null, json);
    } else if (errorBody) {
      // 正常返回了 xml body，且有 Error 节点
      cb(util.error(new Error(errorBody.Message), {
        code: errorBody.Code,
        error: errorBody
      }));
    } else if (statusCode) {
      // 有错误的状态码
      cb(util.error(new Error(response.statusMessage), {
        code: '' + statusCode
      }));
    } else if (statusCode) {
      // 无状态码，或者获取不到状态码
      cb(util.error(new Error('statusCode error')));
    }
  });

  // kill task
  var _killTask = function killTask(data) {
    if (data.TaskId === TaskId) {
      sender && sender.abort && sender.abort();
      self.off('inner-kill-task', _killTask);
    }
  };
  TaskId && self.on('inner-kill-task', _killTask);
}
var API_MAP = {
  // Bucket 相关方法
  getService: getService,
  // Bucket
  putBucket: putBucket,
  headBucket: headBucket,
  // Bucket
  getBucket: getBucket,
  deleteBucket: deleteBucket,
  putBucketAcl: putBucketAcl,
  // BucketACL
  getBucketAcl: getBucketAcl,
  putBucketCors: putBucketCors,
  // BucketCors
  getBucketCors: getBucketCors,
  deleteBucketCors: deleteBucketCors,
  getBucketLocation: getBucketLocation,
  // BucketLocation
  getBucketPolicy: getBucketPolicy,
  // BucketPolicy
  putBucketPolicy: putBucketPolicy,
  deleteBucketPolicy: deleteBucketPolicy,
  putBucketTagging: putBucketTagging,
  // BucketTagging
  getBucketTagging: getBucketTagging,
  deleteBucketTagging: deleteBucketTagging,
  putBucketLifecycle: putBucketLifecycle,
  // BucketLifecycle
  getBucketLifecycle: getBucketLifecycle,
  deleteBucketLifecycle: deleteBucketLifecycle,
  putBucketVersioning: putBucketVersioning,
  // BucketVersioning
  getBucketVersioning: getBucketVersioning,
  putBucketReplication: putBucketReplication,
  // BucketReplication
  getBucketReplication: getBucketReplication,
  deleteBucketReplication: deleteBucketReplication,
  putBucketWebsite: putBucketWebsite,
  // BucketWebsite
  getBucketWebsite: getBucketWebsite,
  deleteBucketWebsite: deleteBucketWebsite,
  putBucketReferer: putBucketReferer,
  // BucketReferer
  getBucketReferer: getBucketReferer,
  putBucketDomain: putBucketDomain,
  // BucketDomain
  getBucketDomain: getBucketDomain,
  deleteBucketDomain: deleteBucketDomain,
  putBucketOrigin: putBucketOrigin,
  // BucketOrigin
  getBucketOrigin: getBucketOrigin,
  deleteBucketOrigin: deleteBucketOrigin,
  putBucketLogging: putBucketLogging,
  // BucketLogging
  getBucketLogging: getBucketLogging,
  putBucketInventory: putBucketInventory,
  // BucketInventory
  postBucketInventory: postBucketInventory,
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

/***/ "./src/cos.js":
/*!********************!*\
  !*** ./src/cos.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(/*! ./util */ "./src/util.js");
var event = __webpack_require__(/*! ./event */ "./src/event.js");
var task = __webpack_require__(/*! ./task */ "./src/task.js");
var base = __webpack_require__(/*! ./base */ "./src/base.js");
var advance = __webpack_require__(/*! ./advance */ "./src/advance.js");
var Logger = __webpack_require__(/*! ./logger */ "./src/logger.js");
var pkg = __webpack_require__(/*! ../package.json */ "./package.json");
var defaultOptions = {
  AppId: '',
  // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
  SecretId: '',
  SecretKey: '',
  SecurityToken: '',
  // 使用临时密钥需要注意自行刷新 Token
  StartTime: 0,
  // 临时密钥返回起始时间
  ExpiredTime: 0,
  // 临时密钥过期时间
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
  Timeout: 0,
  // 单位毫秒，0 代表不设置超时时间
  CorrectClockSkew: true,
  SystemClockOffset: 0,
  // 单位毫秒，ms
  UploadCheckContentMd5: false,
  UploadQueueSize: 10000,
  UploadAddMetaMd5: false,
  UploadIdCacheLimit: 50,
  UseAccelerate: false,
  ForceSignHost: true,
  // 默认将host加入签名计算，关闭后可能导致越权风险，建议保持为true
  AutoSwitchHost: true,
  CopySourceParser: null,
  // 自定义拷贝源解析器
  ObjectKeySimplifyCheck: true,
  // 开启合并校验 getObject Key
  /** 上报相关 **/
  DeepTracker: false,
  // 上报时是否对每个分块上传做单独上报
  TrackerDelay: 5000,
  // 周期性上报，单位毫秒。0代表实时上报
  CustomId: '',
  // 自定义上报id
  BeaconReporter: null,
  // 灯塔上报组件，如有需要请自行传入，传入即代表开启上报
  ClsReporter: null,
  // cls 上报组件，如有需要请自行传入，传入即代表开启上报
  // 日志相关
  EnableLog: false,
  // 是否开启日志
  EnableLogcat: false,
  // 是否开启控制台日志打印
  LogLevel: 'VERBOSE',
  // 日志级别，支持 VERBOSE、DEBUG、INFO、WARN、ERROR，默认为 VERBOSE
  ClsLogger: null,
  // 日志上报到 cls 组件
  LogExtras: {} // 日志上报时，附带的额外信息，例如：{deviceID: '', userID: ''}
};

// 对外暴露的类
var COS = function COS(options) {
  var _this$options$LogLeve,
    _this$options$LogExtr,
    _this = this;
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
  this.options.EnableReporter = this.options.BeaconReporter || this.options.ClsReporter;
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
    console.log('Tip: Next.js、Nuxt.js 等服务端渲染技术可正常使用JavaScript SDK，请忽略下方 nodejs 环境警告');
    console.warn('warning: cos-js-sdk-v5 不支持 nodejs 环境使用，请改用 cos-nodejs-sdk-v5，参考文档： https://cloud.tencent.com/document/product/436/8629');
    console.warn('warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629');
  }
  if (this.options.ForcePathStyle) {
    console.warn('cos-js-sdk-v5不再支持使用path-style，仅支持使用virtual-hosted-style，参考文档：https://cloud.tencent.com/document/product/436/96243');
    throw new Error('ForcePathStyle is not supported');
  }
  event.init(this);
  task.init(this);
  // 初始化日志模块
  this.logger = new Logger({
    enableLog: this.options.EnableLog,
    enableLogcat: this.options.EnableLogcat,
    level: (_this$options$LogLeve = this.options.LogLevel) !== null && _this$options$LogLeve !== void 0 ? _this$options$LogLeve : 'VERBOSE',
    clsLogger: this.options.ClsLogger,
    logExtras: (_this$options$LogExtr = this.options.LogExtras) !== null && _this$options$LogExtr !== void 0 ? _this$options$LogExtr : {}
  });
  if (this.options.EnableLog) {
    event.init(this.logger);
    this.logger.on('log-message', function (data) {
      _this.emit('log-message', data);
    });
  }
};
base.init(COS, task);
advance.init(COS, task);
COS.util = {
  md5: util.md5,
  xml2json: util.xml2json,
  json2xml: util.json2xml,
  encodeBase64: util.encodeBase64
};
COS.getAuthorization = util.getAuth;
COS.version = pkg.version;
module.exports = COS;

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var initEvent = function initEvent(cos) {
  var listeners = {};
  var getList = function getList(action) {
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
var EventProxy = function EventProxy() {
  initEvent(this);
};
module.exports.init = initEvent;
module.exports.EventProxy = EventProxy;

/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
var pkg = __webpack_require__(/*! ../package.json */ "./package.json");
var pkgVersion = pkg.version;
var logLevelList = ['VERBOSE', 'DEBUG', 'INFO', 'WARN', 'ERROR'];
var Logger = /*#__PURE__*/function () {
  "use strict";

  function Logger(params) {
    var _params$enableLog;
    _classCallCheck(this, Logger);
    _defineProperty(this, "level", 'VERBOSE');
    // VERBOSE | DEBUG | INFO | WARN | ERROR 按日志等级排序
    _defineProperty(this, "clsLogger", null);
    _defineProperty(this, "logExtras", {});
    this.enableLog = (_params$enableLog = params.enableLog) !== null && _params$enableLog !== void 0 ? _params$enableLog : false;
    this.level = params.level || 'VERBOSE';
    if (!logLevelList.includes(this.level)) {
      this.level = 'VERBOSE';
    }
    this.enableLogcat = params.enableLogcat;
    this.clsLogger = params.clsLogger;
    this.logExtras = params.logExtras;
  }
  return _createClass(Logger, [{
    key: "info",
    value: function info() {
      if (['VERBOSE', 'INFO'].includes(this.level)) {
        for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
          msg[_key] = arguments[_key];
        }
        this.log.apply(this, ['info'].concat(msg));
      }
    }
  }, {
    key: "debug",
    value: function debug() {
      if (['VERBOSE', 'DEBUG'].includes(this.level)) {
        for (var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          msg[_key2] = arguments[_key2];
        }
        this.log.apply(this, ['debug'].concat(msg));
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (['VERBOSE', 'WARN'].includes(this.level)) {
        for (var _len3 = arguments.length, msg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          msg[_key3] = arguments[_key3];
        }
        this.log.apply(this, ['warn'].concat(msg));
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (['VERBOSE', 'ERROR'].includes(this.level)) {
        for (var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          msg[_key4] = arguments[_key4];
        }
        this.log.apply(this, ['error'].concat(msg));
      }
    }
    /**
     * 参数结构 {
     *  timestamp: '2021-08-16T06:51:27.781Z',
     *  cate: 'PROCESS',
     *  tag: 'network',
     *  msg: {}
     * */
  }, {
    key: "log",
    value: function log() {
      if (!this.enableLog) {
        return;
      }
      var type = arguments.length <= 0 ? undefined : arguments[0];
      var _ref = arguments.length <= 1 ? undefined : arguments[1],
        _ref$cate = _ref.cate,
        cate = _ref$cate === void 0 ? 'base' : _ref$cate,
        _ref$tag = _ref.tag,
        tag = _ref$tag === void 0 ? 'base' : _ref$tag,
        msg = _ref.msg;
      var logMsg = {
        version: "cos-js-sdk-v5-".concat(pkgVersion),
        timestamp: new Date().toISOString(),
        cate: "[".concat(cate.toUpperCase(), "]"),
        tag: "[".concat(tag.toUpperCase(), "]"),
        msg: msg,
        extras: this.logExtras
      };
      // 日志输出到控制台
      if (this.enableLogcat) {
        console[type]("[".concat(logMsg.version, "] ").concat(logMsg.timestamp, " ").concat(logMsg.cate, " ").concat(logMsg.tag, " ").concat(logMsg.msg, " ").concat(logMsg.extras ? JSON.stringify(logMsg.extras) : ''));
      }
      // 日志上报到 cls
      if (this.clsLogger) {
        this.clsLogger.log(logMsg, false);
      }
      // 日志回调
      this.emit('log-message', logMsg);
    }
  }]);
}();
module.exports = Logger;

/***/ }),

/***/ "./src/session.js":
/*!************************!*\
  !*** ./src/session.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "./src/util.js");

// 按照文件特征值，缓存 UploadId
var cacheKey = 'cos_sdk_upload_cache';
var expires = 30 * 24 * 3600;
var cache;
var timer;
var getCache = function getCache() {
  try {
    var val = JSON.parse(localStorage.getItem(cacheKey));
  } catch (e) {}
  if (!val) val = [];
  cache = val;
};
var setCache = function setCache() {
  try {
    if (cache.length) localStorage.setItem(cacheKey, JSON.stringify(cache));else localStorage.removeItem(cacheKey);
  } catch (e) {}
};
var init = function init() {
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
var save = function save() {
  if (timer) return;
  timer = setTimeout(function () {
    setCache();
    timer = null;
  }, 400);
};
var mod = {
  using: {},
  // 标记 UploadId 正在使用
  setUsing: function setUsing(uuid) {
    mod.using[uuid] = true;
  },
  // 标记 UploadId 已经没在使用
  removeUsing: function removeUsing(uuid) {
    delete mod.using[uuid];
  },
  // 用上传参数生成哈希值
  getFileId: function getFileId(file, ChunkSize, Bucket, Key) {
    if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
      return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));
    } else {
      return null;
    }
  },
  // 用上传参数生成哈希值
  getCopyFileId: function getCopyFileId(copySource, sourceHeaders, ChunkSize, Bucket, Key) {
    var size = sourceHeaders['content-length'];
    var etag = sourceHeaders.etag || '';
    var lastModified = sourceHeaders['last-modified'];
    if (copySource && ChunkSize) {
      return util.md5([copySource, size, etag, lastModified, ChunkSize, Bucket, Key].join('::'));
    } else {
      return null;
    }
  },
  // 获取文件对应的 UploadId 列表
  getUploadIdList: function getUploadIdList(uuid) {
    if (!uuid) return null;
    init.call(this);
    var list = [];
    for (var i = 0; i < cache.length; i++) {
      if (cache[i][0] === uuid) list.push(cache[i][1]);
    }
    return list.length ? list : null;
  },
  // 缓存 UploadId
  saveUploadId: function saveUploadId(uuid, UploadId, limit) {
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
  removeUploadId: function removeUploadId(UploadId) {
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

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(/*! ./session */ "./src/session.js");
var util = __webpack_require__(/*! ./util */ "./src/util.js");
var originApiMap = {};
var transferToTaskMethod = function transferToTaskMethod(apiMap, apiName) {
  originApiMap[apiName] = apiMap[apiName];
  apiMap[apiName] = function (params, callback) {
    if (params.SkipTask) {
      originApiMap[apiName].call(this, params, callback);
    } else {
      this._addTask(apiName, params, callback);
    }
  };
};
var initTask = function initTask(cos) {
  var queue = [];
  var tasks = {};
  var uploadingFileCount = 0;
  var nextUploadIndex = 0;

  // 接口返回简略的任务信息
  var formatTask = function formatTask(task) {
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
    var emit = function emit() {
      timer = 0;
      cos.emit('task-list-update', {
        list: util.map(queue, formatTask)
      });
      cos.emit('list-update', {
        list: util.map(queue, formatTask)
      });
    };
    return function () {
      if (!timer) timer = setTimeout(emit);
    };
  }();
  var clearQueue = function clearQueue() {
    if (queue.length <= cos.options.UploadQueueSize) return;
    for

      // 如果还太多，才继续清理
    (var i = 0; i < nextUploadIndex &&
    // 小于当前操作的 index 才清理
    i < queue.length &&
    // 大于队列才清理
    queue.length > cos.options.UploadQueueSize;) {
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
  var _startNextTask = function startNextTask() {
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
        _startNextTask();
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
    setTimeout(_startNextTask);
  };
  var killTask = function killTask(id, switchToState) {
    var task = tasks[id];
    if (!task) return;
    var waiting = task && task.state === 'waiting';
    var running = task && (task.state === 'checking' || task.state === 'uploading');
    if (switchToState === 'canceled' && task.state !== 'canceled' || switchToState === 'paused' && waiting || switchToState === 'paused' && running) {
      task.state = switchToState;
      cos.emit('inner-kill-task', {
        TaskId: id,
        toState: switchToState
      });
      try {
        var UploadId = task && task.params && task.params.UploadData.UploadId;
      } catch (e) {}
      if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId);
      emitListUpdate();
      if (running) {
        uploadingFileCount--;
        _startNextTask();
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
      _startNextTask();
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
      _startNextTask();
    }
  };
  cos.isUploadRunning = function () {
    return uploadingFileCount || nextUploadIndex < queue.length;
  };
};
module.exports.transferToTaskMethod = transferToTaskMethod;
module.exports.init = initTask;

/***/ }),

/***/ "./src/tracker.js":
/*!************************!*\
  !*** ./src/tracker.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
var pkg = __webpack_require__(/*! ../package.json */ "./package.json");
var beacon = null;
var getBeacon = function getBeacon(Beacon, delay) {
  if (!beacon) {
    // 生成 beacon
    if (typeof Beacon !== 'function') {
      throw new Error('Beacon not found');
    }
    beacon = new Beacon({
      appkey: '0WEB05PY6MHRGK0U',
      versionCode: pkg.version,
      channelID: 'js_sdk',
      //渠道,选填
      openid: 'openid',
      // 用户id, 选填
      unionid: 'unid',
      //用户unionid , 类似idfv,选填
      strictMode: false,
      //严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!
      delay: delay,
      // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填
      sessionDuration: 60 * 1000 // session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填
    });
  }
  return beacon;
};

// 毫秒转秒
var ms2s = function ms2s(ms) {
  if (!ms || ms < 0) return 0;
  return (ms / 1000).toFixed(3);
};
var utils = {
  // 生成uid 每个链路对应唯一一条uid
  getUid: function getUid() {
    var S4 = function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  },
  // 获取网络类型 4g ｜ wifi
  getNetType: function getNetType() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object') {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return (connection === null || connection === void 0 ? void 0 : connection.type) || (connection === null || connection === void 0 ? void 0 : connection.effectiveType) || 'unknown';
    }
    return 'unknown';
  },
  // http | https
  getProtocol: function getProtocol() {
    if ((typeof location === "undefined" ? "undefined" : _typeof(location)) === 'object') {
      return location.protocol.replace(/:/, '');
    }
    return 'unknown protocol';
  },
  // 获取pc端操作系统类型
  getOsType: function getOsType() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
      return 'unknown os';
    }
    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
      return 'win32';
    }
    if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
      return 'win64';
    }
    if (isMac) {
      return 'mac';
    }
    return 'unknown os';
  },
  isMobile: function isMobile() {
    var exp = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true; // 移动端
    }
    return false; // PC端
  },
  isAndroid: function isAndroid() {
    var exp = /(Android|Adr|Linux)/i;
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }
    return false;
  },
  isIOS: function isIOS() {
    var exp = /(iPhone|iPod|iPad|iOS)/i;
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }
    return false;
  },
  isOtherMobile: function isOtherMobile() {
    return isMobile && !isAndroid && !isIOS;
  },
  getUA: function getUA() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
      return 'unknown device';
    }
    var explorer = navigator.userAgent;
    return explorer;
  }
};
var isMobile = utils.isMobile();
var mobileOsType = utils.isAndroid() ? 'android' : utils.isIOS ? 'ios' : 'other_mobile';
var pcOsType = utils.getOsType();
var devicePlatform = isMobile ? mobileOsType : pcOsType;
var ua = utils.getUA();
var protocol = utils.getProtocol();
var transApiName = function transApiName(api) {
  if (['putObject', 'sliceUploadFile', 'uploadFile', 'uploadFiles'].includes(api)) {
    return 'UploadTask';
  } else if (api === 'getObject') {
    return 'DownloadTask';
  } else if (['putObjectCopy', 'sliceCopyFile'].includes(api)) {
    return 'CopyTask';
  }
  return api;
};

// 上报参数驼峰改下划线
function camel2underline(key) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}
function formatParams(params) {
  var formattedParams = {};
  var successKeys = ['sdkVersionName', 'sdkVersionCode', 'osName', 'networkType', 'requestName', 'requestResult', 'bucket', 'region', 'appid', 'accelerate', 'url', 'host', 'requestPath', 'userAgent', 'networkProtocol', 'httpMethod', 'httpSize', 'httpSpeed', 'httpTookTime', 'httpMd5', 'httpSign', 'httpFullTime', 'httpDomain', 'partNumber', 'httpRetryTimes', 'customId', 'traceId', 'realApi'];
  var failureKeys = [].concat(successKeys, ['errorNode', 'errorCode', 'errorName', 'errorMessage', 'errorRequestId', 'errorHttpCode', 'errorServiceName', 'errorType', 'fullError']);
  // 需要上报的参数字段
  var reporterKeys = params.requestResult === 'Success' ? successKeys : failureKeys;
  for (var key in params) {
    if (!reporterKeys.includes(key)) continue;
    var formattedKey = camel2underline(key);
    formattedParams[formattedKey] = params[key];
  }
  formattedParams['request_name'] = params.realApi ? transApiName(params.realApi) : params.requestName;
  return formattedParams;
}

// 链路追踪器
var Tracker = /*#__PURE__*/function () {
  "use strict";

  function Tracker(opt) {
    _classCallCheck(this, Tracker);
    var parent = opt.parent,
      traceId = opt.traceId,
      bucket = opt.bucket,
      region = opt.region,
      apiName = opt.apiName,
      realApi = opt.realApi,
      httpMethod = opt.httpMethod,
      fileKey = opt.fileKey,
      fileSize = opt.fileSize,
      accelerate = opt.accelerate,
      customId = opt.customId,
      delay = opt.delay,
      deepTracker = opt.deepTracker,
      Beacon = opt.Beacon,
      clsReporter = opt.clsReporter;
    var appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';
    this.parent = parent;
    this.deepTracker = deepTracker;
    this.delay = delay;
    if (clsReporter && !this.clsReporter) {
      this.clsReporter = clsReporter;
    }
    // 上报用到的字段
    this.params = {
      // 通用字段
      sdkVersionName: 'cos-js-sdk-v5',
      sdkVersionCode: pkg.version,
      osName: devicePlatform,
      networkType: '',
      requestName: apiName || '',
      requestResult: '',
      // sdk api调用结果Success、Failure
      realApi: realApi,
      bucket: bucket,
      region: region,
      accelerate: accelerate,
      httpMethod: httpMethod,
      url: '',
      // 请求url
      host: '',
      httpDomain: '',
      requestPath: fileKey || '',
      userAgent: ua,
      networkProtocol: protocol,
      errorType: '',
      errorCode: '',
      errorName: '',
      errorMessage: '',
      errorRequestId: '',
      errorHttpCode: 0,
      errorServiceName: '',
      errorNode: '',
      httpTookTime: 0,
      // http整体耗时
      httpSize: fileSize || 0,
      // 主要是文件大小，大小 B
      httpMd5: 0,
      // MD5耗时
      httpSign: 0,
      // 计算签名耗时
      httpFullTime: 0,
      // 任务整体耗时(包括md5、签名等)
      httpSpeed: 0,
      // 主要关注上传速度，KB/s

      md5StartTime: 0,
      // md5计算开始时间
      md5EndTime: 0,
      // md5计算结束时间
      signStartTime: 0,
      // 计算签名开始时间
      signEndTime: 0,
      // 计算签名结束时间
      httpStartTime: 0,
      // 发起网络请求开始时间
      httpEndTime: 0,
      // 网路请求结束时间
      startTime: new Date().getTime(),
      // sdk api调用起始时间，不是纯网络耗时
      endTime: 0,
      //  sdk api调用结束时间，不是纯网络耗时

      // js补充字段
      traceId: traceId || utils.getUid(),
      // 每条上报唯一标识
      appid: appid,
      partNumber: 0,
      // 分块上传编号
      httpRetryTimes: 0,
      // sdk内部发起的请求重试
      customId: customId || '',
      // 业务id
      partTime: 0
    };
    if (Beacon) {
      this.beacon = getBeacon(Beacon, delay);
    }
  }

  // 格式化sdk回调
  return _createClass(Tracker, [{
    key: "formatResult",
    value: function formatResult(err, data) {
      var _err$error, _err$error2, _err$error3, _err$error4, _err$error5, _err$error6;
      var now = new Date().getTime();
      var networkType = utils.getNetType();
      var errorCode = err ? (err === null || err === void 0 ? void 0 : err.code) || (err === null || err === void 0 ? void 0 : (_err$error = err.error) === null || _err$error === void 0 ? void 0 : _err$error.code) || (err === null || err === void 0 ? void 0 : (_err$error2 = err.error) === null || _err$error2 === void 0 ? void 0 : _err$error2.Code) : '';
      var errorMessage = err ? (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : (_err$error3 = err.error) === null || _err$error3 === void 0 ? void 0 : _err$error3.message) || (err === null || err === void 0 ? void 0 : (_err$error4 = err.error) === null || _err$error4 === void 0 ? void 0 : _err$error4.Message) : '';
      var errorName = errorMessage;
      var errorServiceName = err ? (err === null || err === void 0 ? void 0 : err.resource) || (err === null || err === void 0 ? void 0 : (_err$error5 = err.error) === null || _err$error5 === void 0 ? void 0 : _err$error5.resource) || (err === null || err === void 0 ? void 0 : (_err$error6 = err.error) === null || _err$error6 === void 0 ? void 0 : _err$error6.Resource) : '';
      var errorHttpCode = err ? err === null || err === void 0 ? void 0 : err.statusCode : data.statusCode;
      var requestId = err ? (err === null || err === void 0 ? void 0 : err.headers) && (err === null || err === void 0 ? void 0 : err.headers['x-cos-request-id']) : (data === null || data === void 0 ? void 0 : data.headers) && (data === null || data === void 0 ? void 0 : data.headers['x-cos-request-id']);
      var errorType = err ? requestId ? 'Server' : 'Client' : '';
      if (this.params.requestName === 'getObject') {
        this.params.httpSize = data ? data.headers && data.headers['content-length'] : 0;
      }

      // 上报 sliceUploadFile || uploadFile || uploadFiles 命中分块上传时
      var isSliceUploadFile = this.params.realApi === 'sliceUploadFile';
      var isSliceCopyFile = this.params.realApi === 'sliceCopyFile';
      if (isSliceUploadFile || isSliceCopyFile) {
        var speed = this.params.httpSize / 1024 / this.params.partTime;
        Object.assign(this.params, {
          httpSpeed: speed < 0 ? 0 : speed.toFixed(3)
        });
      } else {
        var httpFullTime = now - this.params.startTime;
        var httpTookTime = this.params.httpEndTime - this.params.httpStartTime;
        var _speed = this.params.httpSize / 1024 / (httpTookTime / 1000);
        var httpMd5 = this.params.md5EndTime - this.params.md5StartTime;
        var httpSign = this.params.signEndTime - this.params.signStartTime;
        if (this.parent) {
          this.parent.addParamValue('httpTookTime', ms2s(httpTookTime));
          this.parent.addParamValue('httpFullTime', ms2s(httpFullTime));
          this.parent.addParamValue('httpMd5', ms2s(httpMd5));
          this.parent.addParamValue('httpSign', ms2s(httpSign));
          if (['multipartUpload', 'uploadPartCopy', 'putObjectCopy'].includes(this.params.requestName)) {
            // 只有小分块上传|复制才累计纯请求耗时，计算速度时用到
            this.parent.addParamValue('partTime', ms2s(httpTookTime));
          }
        }
        Object.assign(this.params, {
          httpFullTime: ms2s(httpFullTime),
          httpMd5: ms2s(httpMd5),
          httpSign: ms2s(httpSign),
          httpTookTime: ms2s(httpTookTime),
          httpSpeed: _speed < 0 ? 0 : _speed.toFixed(3)
        });
      }
      Object.assign(this.params, {
        networkType: networkType,
        requestResult: err ? 'Failure' : 'Success',
        errorType: errorType,
        errorCode: errorCode,
        errorHttpCode: errorHttpCode,
        errorName: errorName,
        errorMessage: errorMessage,
        errorServiceName: errorServiceName,
        errorRequestId: requestId
      });
      if (err && (!errorCode || !errorMessage)) {
        // 暂存全量err一段时间 观察是否所有err格式都可被解析
        this.params.fullError = err ? JSON.stringify(err) : '';
      }
      if (this.params.url) {
        try {
          var execRes = /^http(s)?:\/\/(.*?)\//.exec(this.params.url);
          this.params.host = execRes[2];
        } catch (e) {
          this.params.host = this.params.url;
        }
        this.params.httpDomain = this.params.host;
      }
    }

    // 上报
  }, {
    key: "report",
    value: function report(err, data) {
      if (!this.beacon && !this.clsReporter) return;
      this.formatResult(err, data);
      var formattedParams = formatParams(this.params);
      if (this.beacon) {
        this.sendEventsToBeacon(formattedParams);
      }
      if (this.clsReporter) {
        this.sendEventsToCLS(formattedParams);
      }
    }

    // 设置当前链路的参数
  }, {
    key: "setParams",
    value: function setParams(params) {
      Object.assign(this.params, params);
    }
  }, {
    key: "addParamValue",
    value: function addParamValue(key, value) {
      this.params[key] = (+this.params[key] + +value).toFixed(3);
    }

    // 上报灯塔
  }, {
    key: "sendEventsToBeacon",
    value: function sendEventsToBeacon(formattedParams) {
      // DeepTracker模式下才会上报分块上传内部细节
      var isSliceUploadFile = this.params.requestName === 'sliceUploadFile' || this.params.realApi === 'sliceUploadFile';
      if (isSliceUploadFile && !this.deepTracker) {
        return;
      }
      var eventCode = 'qcloud_track_cos_sdk';
      if (this.delay === 0) {
        // 实时上报
        this.beacon && this.beacon.onDirectUserAction(eventCode, formattedParams);
      } else {
        // 周期性上报
        this.beacon && this.beacon.onUserAction(eventCode, formattedParams);
      }
    }

    // 上报 cls
  }, {
    key: "sendEventsToCLS",
    value: function sendEventsToCLS(formattedParams) {
      // 是否实时上报
      var immediate = !!(this.delay === 0);
      this.clsReporter.log(formattedParams, immediate);
    }

    // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作
  }, {
    key: "generateSubTracker",
    value: function generateSubTracker(subParams) {
      Object.assign(subParams, {
        parent: this,
        deepTracker: this.deepTracker,
        traceId: this.params.traceId,
        bucket: this.params.bucket,
        region: this.params.region,
        accelerate: this.params.accelerate,
        fileKey: this.params.requestPath,
        customId: this.params.customId,
        delay: this.delay,
        clsReporter: this.clsReporter
      });
      return new Tracker(subParams);
    }
  }]);
}();
module.exports = Tracker;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var md5 = __webpack_require__(/*! ../lib/md5 */ "./lib/md5.js");
var CryptoJS = __webpack_require__(/*! ../lib/crypto */ "./lib/crypto.js");
var _require = __webpack_require__(/*! fast-xml-parser */ "./node_modules/fast-xml-parser/src/fxp.js"),
  XMLParser = _require.XMLParser,
  XMLBuilder = _require.XMLBuilder;
var xmlParser = new XMLParser({
  ignoreDeclaration: true,
  // 忽略 XML 声明
  ignoreAttributes: true,
  // 忽略属性
  parseTagValue: false,
  // 关闭自动解析
  trimValues: false // 关闭默认 trim
});
var xmlBuilder = new XMLBuilder();
var base64 = __webpack_require__(/*! ../lib/base64 */ "./lib/base64.js");
var Tracker = __webpack_require__(/*! ./tracker */ "./src/tracker.js");

// 删掉不需要的#text
var textNodeName = '#text';
var _deleteTextNodes = function deleteTextNodes(obj) {
  if (!isObject(obj)) return;
  for (var i in obj) {
    var item = obj[i];
    if (typeof item === 'string') {
      if (i === textNodeName) {
        delete obj[i];
      }
    } else if (Array.isArray(item)) {
      item.forEach(function (i) {
        _deleteTextNodes(i);
      });
    } else if (isObject(item)) {
      _deleteTextNodes(item);
    }
  }
};

// XML 对象转 JSON 对象
var xml2json = function xml2json(bodyStr) {
  var json = xmlParser.parse(bodyStr);
  _deleteTextNodes(json);
  return json;
};

// JSON 对象转 XML 对象
var json2xml = function json2xml(json) {
  var xml = xmlBuilder.build(json);
  return xml;
};
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
}

/**
 * obj转为string
 * @param  {Object}  obj                需要转的对象，必须
 * @param  {Boolean} lowerCaseKey       key是否转为小写，默认false，非必须
 * @return {String}  data               返回字符串
 */
var obj2str = function obj2str(obj, lowerCaseKey) {
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
var signHeaders = ['cache-control', 'content-disposition', 'content-encoding', 'content-length', 'content-md5', 'expect', 'expires', 'host', 'if-match', 'if-modified-since', 'if-none-match', 'if-unmodified-since', 'origin', 'range', 'transfer-encoding', 'pic-operations'];
var getSignHeaderObj = function getSignHeaderObj(headers) {
  var signHeaderObj = {};
  for (var i in headers) {
    var key = i.toLowerCase();
    if (key.indexOf('x-cos-') > -1 || key.indexOf('x-ci-') > -1 || signHeaders.indexOf(key) > -1) {
      signHeaderObj[i] = headers[i];
    }
  }
  return signHeaderObj;
};

//测试用的key后面可以去掉
var getAuth = function getAuth(opt) {
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
var readIntBE = function readIntBE(chunk, size, offset) {
  var bytes = size / 8;
  var buf = chunk.slice(offset, offset + bytes);
  new Uint8Array(buf).reverse();
  return new {
    8: Uint8Array,
    16: Uint16Array,
    32: Uint32Array
  }[size](buf)[0];
};
var buf2str = function buf2str(chunk, start, end, isUtf8) {
  var buf = chunk.slice(start, end);
  var str = '';
  new Uint8Array(buf).forEach(function (charCode) {
    str += String.fromCharCode(charCode);
  });
  if (isUtf8) str = decodeURIComponent(escape(str));
  return str;
};
var parseSelectPayload = function parseSelectPayload(chunk) {
  var header = {};
  var body = buf2str(chunk);
  var result = {
    records: []
  };
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
var getSourceParams = function getSourceParams(source) {
  var parser = this.options.CopySourceParser;
  if (parser) return parser(source);
  var m = source.match(/^([^.]+-\d+)\.cos(v6|-cdc|-cdz|-internal)?\.([^.]+)\.((myqcloud\.com)|(tencentcos\.cn))\/(.+)$/);
  if (!m) return null;
  return {
    Bucket: m[1],
    Region: m[3],
    Key: m[7]
  };
};
var noop = function noop() {};

// 清除对象里值为的 undefined 或 null 的属性
var clearKey = function clearKey(obj) {
  var retObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
      retObj[key] = obj[key];
    }
  }
  return retObj;
};
var readAsBinaryString = function readAsBinaryString(blob, callback) {
  var readFun;
  var fr = new FileReader();
  if (FileReader.prototype.readAsBinaryString) {
    readFun = FileReader.prototype.readAsBinaryString;
    fr.onload = function () {
      callback(this.result);
    };
  } else if (FileReader.prototype.readAsArrayBuffer) {
    // 在 ie11 添加 readAsBinaryString 兼容
    readFun = function readFun(fileData) {
      var binary = '';
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
  var compareVersion = function compareVersion(a, b) {
    a = a.split('.');
    b = b.split('.');
    for (var i = 0; i < b.length; i++) {
      if (a[i] !== b[i]) {
        return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;
      }
    }
    return 0;
  };
  var check = function check(ua) {
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
var fileSlice = function fileSlice(file, start, end, isUseToUpload, callback) {
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
var getBodyMd5 = function getBodyMd5(UploadCheckContentMd5, Body, callback, onProgress) {
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
var getFileMd5 = function getFileMd5(blob, callback, onProgress) {
  var size = blob.size;
  var loaded = 0;
  var md5ctx = md5.getCtx();
  var _next = function next(start) {
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
        if (onProgress) onProgress({
          loaded: loaded,
          total: size,
          percent: Math.round(loaded / size * 10000) / 10000
        });
        _next(start + md5ChunkSize);
      });
    });
  };
  _next(0);
};
function clone(obj) {
  return map(obj, function (v) {
    return _typeof(v) === 'object' && v !== null ? clone(v) : v;
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
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
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
var b64 = function b64(str) {
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
var uuid = function uuid() {
  var S4 = function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};
var hasMissingParams = function hasMissingParams(apiName, params) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var Domain = this.options.Domain;
  var checkBucket = !Domain || typeof Domain === 'string' && Domain.indexOf('{Bucket}') > -1;
  var checkRegion = !Domain || typeof Domain === 'string' && Domain.indexOf('{Region}') > -1;
  if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
    if (checkBucket && !Bucket) return 'Bucket';
    if (checkRegion && !Region) return 'Region';
  } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask' || apiName === 'uploadFile') {
    if (checkBucket && !Bucket) return 'Bucket';
    if (checkRegion && !Region) return 'Region';
    if (!Key) return 'Key';
  }
  return false;
};
var formatParams = function formatParams(apiName, params) {
  // 复制参数对象
  params = extend({}, params);

  // 统一处理 Headers
  if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {
    var Headers = params.Headers || {};
    if (params && _typeof(params) === 'object') {
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
        Expect: 'Expect',
        Expires: 'Expires',
        'Cache-Control': 'CacheControl',
        'Content-Disposition': 'ContentDisposition',
        'Content-Encoding': 'ContentEncoding',
        Range: 'Range',
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
        'x-cos-callback': 'Callback',
        'x-cos-callback-var': 'CallbackVar',
        'x-cos-return-body': 'ReturnBody'
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
var apiWrapper = function apiWrapper(apiName, apiFn) {
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
    if (self.options.EnableReporter) {
      if (params.calledBySdk === 'sliceUploadFile' || params.calledBySdk === 'sliceCopyFile') {
        // 分块上传内部方法使用sliceUploadFile的子链路
        tracker = params.tracker && params.tracker.generateSubTracker({
          apiName: apiName
        });
      } else if (['uploadFile', 'uploadFiles'].includes(apiName)) {
        // uploadFile、uploadFiles方法在内部处理，此处不处理
        tracker = null;
      } else {
        var fileSize = 0;
        if (params.Body) {
          fileSize = typeof params.Body === 'string' ? params.Body.length : params.Body.size || params.Body.byteLength || 0;
        }
        var accelerate = self.options.UseAccelerate || typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.');
        tracker = new Tracker({
          Beacon: self.options.BeaconReporter,
          clsReporter: self.options.ClsReporter,
          bucket: params.Bucket,
          region: params.Region,
          apiName: apiName,
          realApi: apiName,
          accelerate: accelerate,
          fileKey: params.Key,
          fileSize: fileSize,
          deepTracker: self.options.DeepTracker,
          customId: self.options.CustomId,
          delay: self.options.TrackerDelay
        });
      }
    }
    params.tracker = tracker;

    // 代理回调函数
    var formatResult = function formatResult(result) {
      if (result && result.headers) {
        result.headers['x-ci-request-id'] && (result.RequestId = result.headers['x-ci-request-id']);
        result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);
        result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
        result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
      }
      return result;
    };
    var _callback = function _callback(err, data) {
      // 格式化上报参数并上报
      tracker && tracker.report(err, data);
      callback && callback(formatResult(err), formatResult(data));
    };
    var checkParams = function checkParams() {
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
    var isSync = ['getAuth', 'getObjectUrl'].includes(apiName);
    if (typeof Promise === 'function' && !isSync && !callback) {
      return new Promise(function (resolve, reject) {
        callback = function callback(err, data) {
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
var throttleOnProgress = function throttleOnProgress(total, onProgress) {
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
        onProgress({
          loaded: size1,
          total: total,
          speed: speed,
          percent: percent
        });
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
var getFileSize = function getFileSize(api, params, callback) {
  var size;
  if (typeof params.Body === 'string') {
    params.Body = new Blob([params.Body], {
      type: 'text/plain'
    });
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
var getSkewTime = function getSkewTime(offset) {
  return Date.now() + (offset || 0);
};
var error = function error(err, opt) {
  var sourceErr = err;
  err.message = err.message || null;
  if (typeof opt === 'string') {
    err.error = opt;
    err.message = opt;
  } else if (_typeof(opt) === 'object' && opt !== null) {
    extend(err, opt);
    if (opt.code || opt.name) err.code = opt.code || opt.name;
    if (opt.message) err.message = opt.message;
    if (opt.stack) err.stack = opt.stack;
  }
  if (typeof Object.defineProperty === 'function') {
    Object.defineProperty(err, 'name', {
      writable: true,
      enumerable: false
    });
    Object.defineProperty(err, 'message', {
      enumerable: true
    });
  }
  err.name = opt && opt.name || err.name || err.code || 'Error';
  if (!err.code) err.code = err.name;
  if (!err.error) err.error = clone(sourceErr); // 兼容老的错误格式

  return err;
};
var isWebWorker = function isWebWorker() {
  // 有限判断 worker 环境的 constructor name 其次用 worker 独有的 FileReaderSync 兜底 详细参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
  return (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && (globalThis.constructor.name === 'DedicatedWorkerGlobalScope' || globalThis.FileReaderSync);
};
var isNode = function isNode() {
  // 得兜底 web worker 环境中 webpack 用了 process 插件之类的情况
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && "function" === 'function' && !isWebWorker();
};
var isCIHost = function isCIHost(url) {
  return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(url);
};

//判断是否是ios
var isIOS = function () {
  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
    return false;
  }
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isIOS;
}();

// 判断是qq内置浏览器
var isQQ = function () {
  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
    return false;
  }
  return /\sQQ/i.test(navigator.userAgent);
}();
var encodeBase64 = function encodeBase64(str, safe) {
  var base64Str = base64.encode(str);
  // 万象使用的安全base64格式需要特殊处理
  if (safe) {
    base64Str = base64Str.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
  }
  return base64Str;
};
var decodeBase64 = function decodeBase64(base64Str) {
  if (!base64Str) return '';
  return base64.decode(base64Str);
};
var simplifyPath = function simplifyPath(path) {
  var names = path.split('/');
  var stack = [];
  var _iterator = _createForOfIteratorHelper(names),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      if (name === '..') {
        if (stack.length) {
          stack.pop();
        }
      } else if (name.length && name !== '.') {
        stack.push(name);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return '/' + stack.join('/');
};

// 解析响应体，兼容 xml、json
var parseResBody = function parseResBody(responseBody) {
  var json;
  if (responseBody && typeof responseBody === 'string') {
    var trimBody = responseBody.trim();
    var isXml = trimBody.indexOf('<') === 0;
    var isJson = trimBody.indexOf('{') === 0;
    if (isXml) {
      // xml 解析，解析失败返回{}
      json = util.xml2json(responseBody) || {};
    } else if (isJson) {
      // json解析，解析失败返回原始 Body
      try {
        // 替换 json 中的换行符为空格，否则解析会出错
        var formatBody = responseBody.replace(/\n/g, ' ');
        var parsedBody = JSON.parse(formatBody);
        // 确保解析出 json 对象
        if (Object.prototype.toString.call(parsedBody) === '[object Object]') {
          json = parsedBody;
        } else {
          json = responseBody;
        }
      } catch (e) {
        json = responseBody;
      }
    } else {
      json = responseBody;
    }
  } else {
    json = responseBody || {};
  }
  return json;
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
  b64: b64,
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
  encodeBase64: encodeBase64,
  decodeBase64: decodeBase64,
  simplifyPath: simplifyPath,
  readAsBinaryString: readAsBinaryString,
  parseResBody: parseResBody
};
module.exports = util;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

/******/ });
});