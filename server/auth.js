/**
 * nodejs 签名样例
 * 命令行启动服务: node auth.js
 * 浏览器访问: http://127.0.0.1:3333
 */

var http = require('http');
var crypto = require('crypto');

var SecretId = 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var SecretKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

function getAuthorization (method, pathname) {

    var queryParams = {};
    var headers = {};
    method = (method ? method : 'get').toLowerCase();
    pathname = pathname ? pathname : '/';
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);

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
            list.push(camSafeUrlEncode(key) + '=' + camSafeUrlEncode(val));
        }
        return list.join('&');
    };

    // 签名有效起止时间
    var now = parseInt(new Date().getTime() / 1000) - 1;
    var expired = now + 600; // 签名过期时刻，600 秒后

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = now + ';' + expired;
    var qKeyTime = now + ';' + expired;
    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = crypto.createHmac('sha1', SecretKey).update(qKeyTime).digest('hex');

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

    return authorization;
};

function getParam(url, name) {
    var query, params = {}, index = url.indexOf('?');
    if (index >= 0) {
        query = url.substr(index + 1).split('&');
        query.forEach(function (v) {
            var arr = v.split('=');
            params[arr[0]] = arr[1];
        });
    }
    return params[name];
}

http.createServer(function(req, res){
    if (req.url.substr(0, '/auth?'.indexOf('?')) === '/auth') {
        var method = getParam(req.url, 'method');
        var pathname = decodeURIComponent(getParam(req.url, 'pathname'));
        var auth = getAuthorization(method, pathname);
        console.log(method, pathname);
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
            'Access-Control-Allow-Headers': 'accept,content-type',
            'Access-Control-Max-Age': 60
        });
        res.write(auth || '');
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 Not Found');
        res.end();
    }
}).listen(3000);
