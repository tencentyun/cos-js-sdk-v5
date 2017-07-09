# cos-js-sdk-v5

腾讯云 COS JS SDK（[XML API](https://www.qcloud.com/document/product/436/7751)）

[releases and changelog](https://github.com/tencentyun/cos-js-sdk-v5/releases)

## get started

1. 使用 SDK 需要浏览器支持HTML 5
2. 请您到https://console.qcloud.com/cos 获取您的 AppId、Bucket、Region、SecretId 和 SecretKey
3. 请您到https://console.qcloud.com/cos 针对您要操作的bucket进行跨域（CORS）设置，可以按照如下范例，修改允许的来源 Origin 和 Headers：

    ![cors.png](./demo/cors.png)

```html
<script src="dist/cos-js-sdk-v5.min.js"></script>
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