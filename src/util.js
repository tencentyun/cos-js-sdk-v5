'use strict';

var md5 = require('../lib/md5');
var CryptoJS = require('../lib/crypto');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true});
var xmlBuilder = new xml2js.Builder();


//测试用的key后面可以去掉
var getAuth = function (opt) {

    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var method = (opt.method || 'get').toLowerCase();
    var pathname = opt.pathname || '/';
    var queryParams = opt.params || '';
    var headers = opt.headers || '';

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
        var keyList = Object.keys(obj);
        for (i = 0; i < keyList.length; i++) {
            key = keyList[i];
            val = obj[key] || '';
            key = key.toLowerCase();
            key = encodeURIComponent(key);
            list.push(key + '=' + encodeURIComponent(val));
        }
        return list.join('&');
    };

    // 签名有效起止时间
    var now = parseInt(new Date().getTime() / 1000) - 1;
    var expired = now;

    if (opt.expires === undefined) {
        expired += 3600; // 签名过期时间为当前 + 3600s
    } else {
        expired += (opt.expires * 1) || 0;
    }

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = now + ';' + expired;
    var qKeyTime = now + ';' + expired;
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

// XML 对象转 JSON 对象
var xml2json = function (bodyStr) {
    var d = {};
    xmlParser.parseString(bodyStr, function (err, result) {
        d = result;
    });

    return d;
};

// JSON 对象转 XML 对象
var json2xml = function (json) {
    var xml = xmlBuilder.buildObject(json);
    return xml;
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
    if (FileReader.prototype.readAsBinaryString) {
        readFun = FileReader.prototype.readAsBinaryString;
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
    readFun.call(this, blob);
};

// 获取文件 sha1 值
var getFileSHA = function (blob, callback) {
    readAsBinaryString(blob, function (content) {
        CryptoJS.SHA1(content).toString();
    });
};

// 获取文件 md5 值
var getFileMd5 = function (blob, callback) {
    readAsBinaryString(blob, function (content) {
        md5(content);
    });
};
function clone(obj) {
    return map(obj, function (v) {
        return typeof v === 'object' ? clone(v) : v;
    });
}
function extend(target, source) {
    for (var method in source) {
        if (!target[method]) {
            target[method] = source[method];
        }
    }
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
var binaryBase64 = function (str) {
    var i, len, char, arr = [];
    for (i = 0, len = str.length / 2; i < len; i++) {
        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
        arr.push(char);
    }
    return new Buffer(arr).toString('base64');
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
        'gz': 'cn-south',
        'tj': 'cn-north',
        'sh': 'cn-east',
        'cd': 'cn-southwest'
    };
    return function (params, callback) {
        callback = callback || function () { };
        if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
            // 判断参数是否完整
            if (!checkParams(apiName, params)) {
                callback({error: 'lack of required params'});
                return;
            }
            // 优化 Key 参数
            if (params.Key && params.Key.indexOf('/') === 0) {
                callback({error: 'params Key can not start width "/"'});
                return;
            }
            // 判断 region 格式
            if (params.Region && regionMap[params.Region]) {
                callback({error: 'Region error, it should be ' + regionMap[params.Region]});
                return;
            }
            // 兼容带有 AppId 的 Bucket
            var appId, bucket = params.Bucket;
            if (bucket && bucket.indexOf('-') > -1) {
                var arr = bucket.split('-');
                appId = arr[1];
                bucket = arr[0];
                params.AppId = appId;
                params.Bucket = bucket;
            }
        }
        var res = apiFn.call(this, params, callback);
        if (apiName === 'getAuth') {
            return res;
        } else {
            return;
        }
    }
};

var fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

var util = {
    apiWrapper: apiWrapper,
    getAuth: getAuth,
    xml2json: xml2json,
    json2xml: json2xml,
    md5: md5,
    clearKey: clearKey,
    getFileSHA: getFileSHA,
    getFileMd5: getFileMd5,
    extend: extend,
    isArray: isArray,
    each: each,
    map: map,
    clone: clone,
    binaryBase64: binaryBase64,
    fileSlice: fileSlice
};


module.exports = util;