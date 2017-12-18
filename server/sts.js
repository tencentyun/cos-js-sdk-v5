var http = require('http');
var crypto = require('crypto');
var request = require('request');

//固定分配给CSG的密钥
var config = {
    Url: 'https://sts.api.qcloud.com/v2/index.php',
    Domain: 'sts.api.qcloud.com',
    SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    AppId: '1250000000',
    Bucket: 'test',
};

var util = {
    // 获取随机数
    getRandom: function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },
    // json 转 query string
    json2str: function (obj, notEncode) {
        var arr = [];
        Object.keys(obj).sort().forEach(function (item) {
            var val = obj[item] || '';
            !notEncode && (val = val);
            arr.push(item + '=' + val);
        });
        return arr.join('&');
    },
    // 计算签名
    getSignature: function (opt, key, method) {
        var formatString = method + config.Domain + '/v2/index.php?' + util.json2str(opt, 1);
        var hmac = crypto.createHmac('sha1', key);
        var sign = hmac.update(new Buffer(formatString, 'utf8')).digest('base64');
        console.log(formatString, sign);
        return sign;
    },
};

// 拼接获取临时密钥的参数
var getTempKeys = function (callback) {
    var policy = {
        'version': '2.0',
        'statement': [{
            'action': [
                'name/cos:*'
            ],
            'effect': 'allow',
            'principal': {'qcs': ['*']},
            'resource': [
                'qcs::cos:ap-guangzhou:uid/' + config.AppId + ':prefix//' + config.AppId + '/' + config.Bucket,
                'qcs::cos:ap-guangzhou:uid/' + config.AppId + ':prefix//' + config.AppId + '/' + config.Bucket + '/*'
            ]
        }]
    };

    var policyStr = JSON.stringify(policy);
    var Action = 'GetFederationToken';
    var Nonce = util.getRandom(10000, 20000);
    var Timestamp = parseInt(+new Date() / 1000);
    var Method = 'GET';

    var params = {
        Action: Action,
        Nonce: Nonce,
        Region: '',
        SecretId: config.SecretId,
        Timestamp: Timestamp,
        durationSeconds: 7200,
        name: '',
        policy: policyStr,
    };
    params.Signature = encodeURIComponent(util.getSignature(params, config.SecretKey, Method));

    var opt = {
        method: Method,
        url: config.Url + '?' + util.json2str(params),
        rejectUnauthorized: false,
        headers: {
            Host: config.Domain
        }
    };
    request(opt, function (err, response, body) {
        body = body && JSON.parse(body);
        var data = body.data;
        callback(err, data);
    });
};

function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

function getAuthorization (keys, method, pathname) {
    // 获取个人 API 密钥 https://console.qcloud.com/capi
    var SecretId = keys.credentials.tmpSecretId;
    var SecretKey = keys.credentials.tmpSecretKey;

    var queryParams = {};
    var headers = {};
    method = (method ? method : 'get').toLowerCase();
    pathname = pathname ? pathname : '/';
    pathname.indexOf('/') === -1 && (pathname = '/' + pathname);

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
}

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
        getTempKeys(function (err, data) {
            data.authorization = getAuthorization(data, method, pathname);
            console.log(method, pathname);
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
                'Access-Control-Allow-Headers': 'accept,content-type',
                'Access-Control-Max-Age': 60
            });
            res.write(JSON.stringify(data) || '');
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 Not Found');
        res.end();
    }
}).listen(3000);