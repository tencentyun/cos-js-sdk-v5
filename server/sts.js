// 临时密钥服务例子
var bodyParser = require('body-parser');
var STS = require('qcloud-cos-sts');
var express = require('express');
var pathLib = require('path');

// 配置参数
var config = {
    secretId: process.env.SecretId,
    secretKey: process.env.SecretKey,
    proxy: process.env.Proxy,
    durationSeconds: 1800,
    bucket: process.env.Bucket,
    region: process.env.Region,
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
app.use('/dist/', express.static(pathLib.resolve(__dirname, '../dist')));
app.use('/demo/', express.static(pathLib.resolve(__dirname, '../demo')));
app.use('/test/', express.static(pathLib.resolve(__dirname, '../test')));
app.all('/', (req, res, next) => res.redirect('/demo/'));
app.use(bodyParser.json());

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
                'qcs::cos:' + config.region + ':uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + config.allowPrefix,
            ],
        }],
    };
    var startTime = Math.round(Date.now() / 1000);
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        region: config.region,
        durationSeconds: config.durationSeconds,
        policy: policy,
    }, function (err, tempKeys) {
        if (tempKeys) tempKeys.startTime = startTime;
        res.send(err || tempKeys);
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
//         if (tempKeys) tempKeys.startTime = startTime;
//         res.send(err || tempKeys);
//     });
// });

app.all('*', function (req, res, next) {
    res.send({code: -1, message: '404 Not Found'});
});

// 启动签名服务
app.listen(3000);
console.log('app is listening at http://127.0.0.1:3000');
