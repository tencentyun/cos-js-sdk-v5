/**
 * nodejs 签名样例
 * 命令行启动服务: node auth.js
 * 浏览器访问: http://127.0.0.1:3000
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

function isActionAllow(method, pathname, query, headers) {

    var allow = true;

    // // TODO 这里判断自己网站的登录态
    // if (!logined) {
    //     allow = false;
    //     return allow;
    // }

    // 请求可能带有点所有 action
    // acl,cors,policy,location,tagging,lifecycle,versioning,replication,versions,delete,restore,uploads

    // 请求跟路径，只允许获取 UploadId
    if (pathname === '/' && !(method === 'get' && query['uploads'] !== undefined)) {
        allow = false;
    }

    // 不允许前端获取和修改文件权限
    if (pathname !== '/' && query['acl'] !== undefined) {
        allow = false;
    }

    // 这里应该根据需要，限制当前站点的用户只允许操作什么样的路径
    if (method === 'delete' && pathname !== '/') { // 这里控制是否允许删除文件
        // TODO 这里控制是否允许删除文件
    }
    if (method === 'put' && pathname !== '/') { // 这里控制是否允许上传和修改文件
        // TODO 这里控制是否允许上传和修改文件
    }
    if (method === 'get' && pathname !== '/') { // 这里控制是否获取文件和文件相关信息
        // TODO 这里控制是否允许获取文件和文件相关信息
    }

    return allow;

}

function getAuthorization (method, pathname, query, headers) {

    // 整理参数
    !query && (query = {});
    !headers && (headers = {});
    method = (method ? method : 'get').toLowerCase();
    pathname = pathname ? pathname : '/';
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);

    // 注意这里要过滤好允许什么样的操作
    if (!isActionAllow(method, pathname, query, headers)) {
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

function getBody(req, callback) {
    var body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    });
    req.on('end', function () {
        try {
            body = Buffer.concat(body).toString();
            body && console.log(body);
            body = JSON.parse(body);
        } catch (e) {
            body = {};
        }
        callback(body);
    });
}


// 启动简单的签名服务
http.createServer(function(req, res){
    if (req.url.indexOf('/auth') === 0) {
        // 获取前端过来的参数
        getBody(req, function (body) {
            // 计算签名
            var auth = getAuthorization(body.method, body.pathname, body.query, body.headers);

            // 返回数据给前端
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'origin,accept,content-type',
            });
            res.write(auth || '');
            res.end();
        });
    } else {
        res.writeHead(404);
        res.write('404 Not Found');
        res.end();
    }
}).listen(3000);
console.log('app is listening at http://127.0.0.1:3000');
