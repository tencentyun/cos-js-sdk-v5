# cos-js-sdk-v5

腾讯云 COS JS SDK（[XML API](https://www.qcloud.com/document/product/436/7751)）

[releases and changelog](https://github.com/tencentyun/cos-js-sdk-v5/releases)

## get started

```html
<script src="dist/cos-js-sdk-v5.js"></script>
<script>
var cos = new COS({
    AppId: '1250000000',
    getAuthorization: function (options, callback) {
        $.get('../server/auth.php', {
            method: (options.method || 'get').toLowerCase(),
            pathname: options.pathname || '/'
        }, function (authorization) {
            callback(authorization);
        }, 'text');
    }
});
// 分片上传
cos.sliceUploadFile({
    Bucket: 'test',
    Region: 'cn-south',
    Key: '1.zip',
    Body: file
}, function (err, data) {
    console.log(err, data);
});
</script>
```

[更多例子](demo/demo.js)