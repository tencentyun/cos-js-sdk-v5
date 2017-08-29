/**
 * nodejs 签名样例
 * 命令行启动服务: node auth.js
 * 浏览器访问: http://127.0.0.1:3333
 */

var http = require('http');
var crypto = require('crypto');

var cos = {
    // 获取个人 API 密钥 https://console.qcloud.com/capi
    SecretId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    getAuthorization: function (method, pathname, callback) {
        method = (method ? method : 'post').toLowerCase();
        pathname = pathname ? pathname : '/';
        pathname.substr(0, 1) != '/' && (pathname = '/' + pathname);
        var queryParams = {};
        var headers = {};

        // 工具方法
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
                key = encodeURIComponent(key);
                list.push(key + '=' + encodeURIComponent(val));
            }
            return list.join('&');
        };

        // 签名有效起止时间
        var now = parseInt(new Date().getTime() / 1000) - 1;
        var expired = now + 600; // 签名过期时刻，600 秒后

        // 要用到的 Authorization 参数列表
        var qSignAlgorithm = 'sha1';
        var qAk = cos.SecretId;
        var qSignTime = now + ';' + expired;
        var qKeyTime = now + ';' + expired;
        var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
        var qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

        // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
        // 步骤一：计算 SignKey
        var signKey = crypto.createHmac('sha1', cos.SecretKey).update(qKeyTime).digest('hex');

        // 步骤二：构成 FormatString
        var formatString = [method.toLowerCase(), pathname, obj2str(queryParams), obj2str(headers), ''].join('\n');

        // 步骤三：计算 StringToSign
        var stringToSign = ['sha1', qSignTime, crypto.createHash('sha1').update(formatString).digest('hex'), ''].join('\n');

        // 步骤四：计算 Signature
        var qSignature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');

        // 步骤五：构造 Authorization
        var authorization  = [
            'q-sign-algorithm=' + qSignAlgorithm,
            'q-ak=' + qAk,
            'q-sign-time=' + qSignTime,
            'q-key-time=' + qKeyTime,
            'q-header-list=' + qHeaderList,
            'q-url-param-list=' + qUrlParamList,
            'q-signature=' + qSignature
        ].join('&');

        callback && callback(authorization);
    }
};

var getParam = function (url, name) {
    var query, params = {}, index = url.indexOf('?');
    if (index >= 0) {
        query = url.substr(index + 1).split('&');
        query.forEach(function (v) {
            var arr = v.split('=');
            params[arr[0]] = arr[1];
        });
    }
    return params[name];
};

http.createServer(function(req, res){
    var method = getParam(req.url, 'method');
    var pathname = getParam(req.url, 'pathname');
    cos.getAuthorization(method, pathname, function (authorization) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'accept,content-type',
            'Access-Control-Max-Age': 60
        });
        res.write(authorization || '');
        res.end();
    });
}).listen(3333);
