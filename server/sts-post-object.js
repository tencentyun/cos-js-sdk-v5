var http = require('http');
var crypto = require('crypto');
var request = require('request');

// 固定分配给CSG的密钥
var config = {
    Url: 'https://sts.api.qcloud.com/v2/index.php',
    Domain: 'sts.api.qcloud.com',
    SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    Bucket: 'test-1250000000', // 这里指定 bucket
};

// 缓存缓存临时密钥
var tempKeysCache = {
    policyStr: '',
    expiredTime: 0
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
        return sign;
    },
};

// 拼接获取临时密钥的参数
var getTempKeys = function (key, callback) {

    var keyPath = key ? key : '/';
    keyPath.substr(0, 1) !== '/' && (keyPath = '/' + keyPath);

    var ShortBucketName = config.Bucket.substr(0 , config.Bucket.lastIndexOf('-'));
    var AppId = config.Bucket.substr(1 + config.Bucket.lastIndexOf('-'));
    var policy = {
        'version': '2.0',
        'statement': [{
            'action': [
                'name/cos:PostObject',
                'name/cos:PutObject', // 某些旧的园区的 PostObject 对应了 PutObject 权限
            ],
            'effect': 'allow',
            'principal': {'qcs': ['*']},
            'resource': [
                'qcs::cos:ap-guangzhou:uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + keyPath
            ]
        }]
    };
    var policyStr = JSON.stringify(policy);

    // 有效时间小于 30 秒就重新获取临时密钥，否则使用缓存的临时密钥
    if (tempKeysCache.expiredTime - Date.now() / 1000 > 30 && tempKeysCache.policyStr === policyStr) {
        callback(null, tempKeysCache);
        return;
    }

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
        tempKeysCache = data;
        tempKeysCache.policyStr = policyStr;
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

function isActionAllow(method, pathname) {

    var allow = true;

    // // TODO 这里判断自己网站的登录态
    // if (!logined) {
    //     allow = false;
    //     return allow;
    // }

    // 这里应该根据需要，限制当前站点的用户只允许操作什么样的路径
    if (pathname !== '/') {
        // TODO 这里控制是否允许操作当前文件
    }

    return allow;

}

function getAuthorization (keys, method, pathname) {

    var SecretId = keys.credentials.tmpSecretId;
    var SecretKey = keys.credentials.tmpSecretKey;

    // 整理参数
    var query = {};
    var headers = {};
    method = (method ? method : 'get').toLowerCase();
    pathname = pathname ? pathname : '/';
    pathname.indexOf('/') === -1 && (pathname = '/' + pathname);

    // 注意这里要过滤好允许什么样的操作
    if (!isActionAllow(method, pathname)) {
        return 'action deny';
    }

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
    var expired = now + 600; // 签名过期时刻，600 秒后

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = now + ';' + expired;
    var qKeyTime = now + ';' + expired;
    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(query).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = crypto.createHmac('sha1', SecretKey).update(qKeyTime).digest('hex');

    // 步骤二：构成 FormatString
    var formatString = [method.toLowerCase(), pathname, obj2str(query), obj2str(headers), ''].join('\n');

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

// 获取 query 参数
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

// 启动简单的签名服务
http.createServer(function(req, res){
    if (req.url.indexOf('/sts-post-object') === 0) {
        // 获取前端过来的参数
        var method = getParam(req.url, 'method');
        var key = decodeURIComponent(getParam(req.url, 'key'));
        var pathname = decodeURIComponent(getParam(req.url, 'pathname'));

        // 获取临时密钥，计算签名
        getTempKeys(key, function (err, tempKeys) {
            var data = {
                authorization: getAuthorization(tempKeys, method, pathname),
                sessionToken: tempKeys['credentials'] && tempKeys['credentials']['sessionToken'],
            };
            if (data.authorization === 'action deny') {
                data = {error: 'action deny'};
            }

            // 返回数据给前端
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1',
                'Access-Control-Allow-Headers': 'origin,accept,content-type',
            });
            res.write(JSON.stringify(data) || '');
            res.end();
        });
    } else {
        res.writeHead(404);
        res.write('404 Not Found');
        res.end();
    }
}).listen(3000);
console.log('app is listening at http://127.0.0.1:3000');
