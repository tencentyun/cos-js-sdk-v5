// 临时密钥服务例子
var STS = require('qcloud-cos-sts');
var bodyParser = require('body-parser');
var express = require('express');

// 配置参数
var config = {
    secretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    secretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    proxy: '',
    durationSeconds: 1800,
    bucket: 'test-1250000000',
    region: 'ap-guangzhou',
    allowPrefix: '_ALLOW_DIR_/*',
    // 密钥的权限列表
    allowActions: [
        // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload'
    ],
};


// 创建临时密钥服务
var app = express();
app.use(bodyParser.json());

// 支持跨域访问
app.all('*', function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:88');
    res.header('Access-Control-Allow-Headers', 'origin,accept,content-type');
    if (req.method.toUpperCase() === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});


// 格式一：临时密钥接口
app.all('/sts', function (req, res, next) {

    // TODO 这里根据自己业务需要做好放行判断
    if (config.allowPrefix === '_ALLOW_DIR_/*') {
        res.send({error: '请修改 allowPrefix 配置项，指定允许上传的路径前缀'});
        return;
    }

    // 获取临时密钥
    var LongBucketName = config.bucket;
    var ShortBucketName = LongBucketName.substr(0, LongBucketName.indexOf('-'));
    var AppId = LongBucketName.substr(LongBucketName.indexOf('-') + 1);
    var policy = {
        'version': '2.0',
        'statement': [{
            'action': config.allowActions,
            'effect': 'allow',
            'resource': [
                'qcs::cos:ap-guangzhou:uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + config.allowPrefix,
            ],
        }],
    };
    var startTime = Math.round(Date.now() / 1000);
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy: policy,
    }, function (err, tempKeys) {
        var result = JSON.stringify(err || tempKeys) || '';
        res.send(result);
    });
});


// // 格式二：临时密钥接口，支持细粒度权限控制
// // 判断是否允许获取密钥
// var allowScope = function (scope) {
//     var allow = (scope || []).every(function (item) {
//         return config.allowActions.includes(item.action) &&
//             item.bucket === config.bucket &&
//             item.region === config.region &&
//             (item.prefix || '').startsWith(config.allowPrefix);
//     });
//     return allow;
// };
// app.all('/sts-scope', function (req, res, next) {
//     var scope = req.body;
//
//     // TODO 这里根据自己业务需要做好放行判断
//     if (config.allowPrefix === '_ALLOW_DIR_/*') {
//         res.send({error: '请修改 allowPrefix 配置项，指定允许上传的路径前缀'});
//         return;
//     }
//     // TODO 这里可以判断 scope 细粒度控制权限
//     if (!scope || !scope.length || !allowScope(scope)) return res.send({error: 'deny'});
//
//     // 获取临时密钥
//     var policy = STS.getPolicy(scope);
//     var startTime = Math.round(Date.now() / 1000);
//     STS.getCredential({
//         secretId: config.secretId,
//         secretKey: config.secretKey,
//         proxy: config.proxy,
//         durationSeconds: config.durationSeconds,
//         policy: policy,
//     }, function (err, tempKeys) {
//         var result = JSON.stringify(err || tempKeys) || '';
//         res.send(result);
//     });
// });


app.all('*', function (req, res, next) {
    res.send({code: -1, message: '404 Not Found'});
});

// 启动签名服务
app.listen(3000);
console.log('app is listening at http://127.0.0.1:3000');
