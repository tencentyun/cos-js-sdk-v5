var cos = new COS({
    AppId: config.AppId,
    getAuthorization: function (options, callback) {

        // 方法一（推荐）
        var method = (options.method || 'get').toLowerCase();
        var pathname = options.pathname || '/';
        var url = '../server/auth.php?method=' + method + '&pathname=' + pathname;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            callback(e.target.responseText);
        };
        xhr.send();

        // // 方法二（适用于前端调试）
        // var authorization = COS.getAuthorization({
        //     SecretId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        //     SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        //     method: (options.method || 'get').toLowerCase(),
        //     pathname: options.pathname || '/',
        // });
        // callback(authorization);

    }
});

var pre = document.querySelector('.result');
var log = {
    info: function (text, color) {
        console.log(text);
        if (typeof text === 'object') {
            try {
                text = JSON.stringify(text);
            } catch (e) {
            }
        }
        var div = document.createElement('div');
        div.innerText = text;
        color && (div.style.color = color);
        pre.append(div);
        pre.style.display = 'block';
        pre.scrollTop = pre.scrollHeight;
    },
    error: function (text) {
        log.info(text, 'red');
    },
};

function getAuth() {
    var AppId = config.AppId;
    var Bucket = config.Bucket;
    if (config.Bucket.indexOf('-') > -1) {
        var arr = config.Bucket.split('-');
        Bucket = arr[0];
        AppId = arr[1];
    }
    var key = '1.png';
    cos.getAuthorization({
        method: 'get',
        pathname: '/' + key
    }, function (auth) {
        log.info('http://' + Bucket + '-' + AppId + '.' + config.Region + '.myqcloud.com' + '/' + key + '?sign=' + encodeURIComponent(auth));
    });
}

function getBucket() {
    cos.getBucket({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function headBucket() {
    cos.headBucket({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function putBucketACL() {
    cos.putBucketACL({
        Bucket: config.Bucket,
        Region: config.Region,
        // GrantFullControl: 'uin="1001", uin="1002"',
        // GrantWrite: 'uin="1001", uin="1002"',
        // GrantRead: 'uin="1001", uin="1002"',
        // ACL: 'public-read-write',
        // ACL: 'public-read',
        ACL: 'private'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function getBucketACL() {
    cos.getBucketACL({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(data.AccessControlList.Grant);
    });
}

function putBucketCORS() {
    //  该接口存在问题，Content-MD5 错误
    cos.putBucketCORS({
        Bucket: config.Bucket,
        Region: config.Region,
        CORSRules: [{
            "AllowedOrigin": ["*"],
            "AllowedMethod": ["GET", "POST", "PUT", "DELETE", "HEAD"],
            "AllowedHeader": ["origin", "accept", "content-type", "authorzation"],
            "ExposeHeader": ["ETag"],
            "MaxAgeSeconds": "600"
        }]
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function getBucketCORS() {
    cos.getBucketCORS({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function putBucketPolicy() {
    var AppId = config.AppId;
    var Bucket = config.Bucket;
    if (config.Bucket.indexOf('-') > -1) {
        var arr = config.Bucket.split('-');
        Bucket = arr[0];
        AppId = arr[1];
    }
    cos.putBucketPolicy({
        Policy: {
            "version": "2.0",
            "principal": {"qcs": ["qcs::cam::uin/909600000:uin/909600000"]}, // 这里的 909600000 是 QQ 号
            "statement": [
                {
                    "effect": "allow",
                    "action": [
                        "name/cos:GetBucket",
                        "name/cos:PutObject",
                        "name/cos:PostObject",
                        "name/cos:PutObjectCopy",
                        "name/cos:InitiateMultipartUpload",
                        "name/cos:UploadPart",
                        "name/cos:UploadPartCopy",
                        "name/cos:CompleteMultipartUpload",
                        "name/cos:AbortMultipartUpload",
                        "name/cos:AppendObject"
                    ],
                    // "resource": ["qcs::cos:cn-south:uid/1250000000:test-1250000000.cn-south.myqcloud.com//1250000000/test/*"] // 1250000000 是 appid
                    "resource": ["qcs::cos:" + config.Region + ":uid/" + AppId + ":" + Bucket + "-" + AppId + "." + config.Region + ".myqcloud.com//" + AppId + "/" + Bucket + "/*"] // 1250000000 是 appid
                }
            ]
        },
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            getBucketPolicy();
        }
    });
}

function getBucketLocation() {
    cos.getBucketLocation({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function deleteBucket() {
    cos.deleteBucket({
        Bucket: 'testnew',
        Region: config.Region
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function getBucketPolicy() {
    cos.getBucketPolicy({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            log.info(JSON.stringify(data, null, '  '));
        }
    });
}

function putObject() {
    var blob = util.createFile({type: 'image/png', size: 1024 * 1024});
    cos.putObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: blob,
        onProgress: function (progressData) {
            log.info(JSON.stringify(progressData));
        },
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            log.info(JSON.stringify(data, null, '  '));
        }
    });
}

function putObjectCopy() {
    var AppId = config.AppId;
    var Bucket = config.Bucket;
    if (config.Bucket.indexOf('-') > -1) {
        var arr = config.Bucket.split('-');
        Bucket = arr[0];
        AppId = arr[1];
    }
    cos.putObjectCopy({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.copy.zip',
        CopySource: Bucket + '-' + AppId + '.' + config.Region + '.myqcloud.com/1mb.zip',
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            log.info(JSON.stringify(data, null, '  '));
        }
    });
}

function getObject() {
    cos.getObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function headObject() {
    cos.headObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function putObjectACL() {
    cos.putBucketACL({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        // GrantFullControl: 'uin="1001", uin="1002"',
        // GrantWrite: 'uin="1001", uin="1002"',
        // GrantRead: 'uin="1001", uin="1002"',
        // ACL: 'public-read-write',
        // ACL: 'public-read',
        ACL: 'private'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function getObjectACL() {
    cos.getObjectACL({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function deleteObject() {
    cos.deleteObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }

        log.info(JSON.stringify(data, null, '  '));
    });
}

function deleteMultipleObject() {
    cos.deleteMultipleObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Objects: [
            {Key: '1mb.zip'},
            {Key: '3mb.zip'},
        ]
    }, function (err, data) {
        if (err) {
            return log.error(err);
        }
        log.info(JSON.stringify(data, null, '  '));
    });
}

function abortUploadTask() {
    cos.abortUploadTask({
        Bucket: config.Bucket, /* 必须 */
        Region: config.Region, /* 必须 */
        Key: '10mb.zip',
        Level: 'bucket',
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            log.info(JSON.stringify(data, null, '  '));
        }
    });
}

function sliceUploadFile() {
    var blob = util.createFile({type: 'image/png', size: 1024 * 1024 * 10});
    cos.sliceUploadFile({
        Bucket: config.Bucket, /* 必须 */
        Region: config.Region,
        Key: '10mb.zip', /* 必须 */
        SliceSize: 1024 * 1024,  //1MB  /* 非必须 */
        AsyncLimit: 3, /* 非必须 */
        Body: blob,
        onHashProgress: function (progressData) {
            log.info(JSON.stringify(progressData));
        },
        onProgress: function (progressData) {
            log.info(JSON.stringify(progressData));
        },
    }, function (err, data) {
        if (err) {
            log.error(err);
        } else {
            log.info(JSON.stringify(data, null, '  '));
        }
    });
}

(function () {
    var list = [
        'getAuth',
        'getBucket',
        'headBucket',
        // 'putBucketACL',
        // 'getBucketACL',
        // 'putBucketCORS',
        // 'getBucketCORS',
        // 'putBucketPolicy',
        // 'getBucketPolicy',
        // 'getBucketLocation',
        'deleteBucket',
        'putObject',
        'putObjectCopy',
        'getObject',
        'headObject',
        // 'putObjectACL',
        'getObjectACL',
        'deleteObject',
        // 'deleteMultipleObject',
        // 'abortUploadTask',
        'sliceUploadFile',
    ];
    var container = document.querySelector('.main');
    var html = [];
    list.forEach(function (name) {
        html.push('<a href="javascript:void(0)">' + name + '</a>');
    });
    container.innerHTML = html.join('');
    container.onclick = function (e) {
        if (e.target.tagName === 'A') {
            var name = e.target.innerText.trim();
            window[name]();
        }
    };
})();
