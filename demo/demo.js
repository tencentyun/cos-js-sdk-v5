var config = {
    Bucket: 'test-1251902136',
    Region: 'ap-guangzhou'
};

var util = {
    createFile: function (options) {
        var buffer = new ArrayBuffer(options.size || 0);
        var arr = new Uint8Array(buffer);
        [].forEach.call(arr, function (char, i) {
            arr[i] = 0;
        });
        var opt = {};
        options.type && (opt.type = options.type);
        var blob = new Blob([buffer], options);
        return blob;
    }
};

var cos = new COS({
    getAuthorization: function (options,callback) {
        // 方法一、后端通过获取临时密钥给到前端，前端计算签名
        // var url = 'http://127.0.0.1:3000/sts';
        var url = '../server/sts.php';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            try {
                var data = JSON.parse(e.target.responseText);
            } catch (e) {
            }
            callback({
                TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                ExpiredTime: data.expiredTime,
            });
        };
        xhr.send();


        // // 方法二、后端通过获取临时密钥，并计算好签名给到前端
        // var method = (options.Method || 'get').toLowerCase();
        // var key = options.Key || '';
        // var query = options.Query || {};
        // var headers = options.Headers || {};
        // var pathname = key.indexOf('/') === 0 ? key : '/' + key;
        // // var url = 'http://127.0.0.1:3000/sts-auth';
        // var url = '../server/sts-auth.php';
        // var xhr = new XMLHttpRequest();
        // var data = {
        //     method: method,
        //     pathname: pathname,
        //     query: query,
        //     headers: headers,
        // };
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('content-type', 'application/json');
        // xhr.onload = function (e) {
        //     try {
        //         var AuthData = JSON.parse(e.target.responseText);
        //     } catch (e) {
        //     }
        //     callback({
        //         Authorization: AuthData.Authorization,
        //         XCosSecurityToken: AuthData.XCosSecurityToken,
        //     });
        // };
        // xhr.send(JSON.stringify(data));


        // // 方法三、后端使用固定密钥计算签名，返回给前端，auth.php，注意：后端需要通过 method、pathname 控制好权限，比如不允许 put / 等，这里暂不提供
        // var method = (options.Method || 'get').toLowerCase();
        // var key = options.Key || '';
        // var query = options.Query || {};
        // var headers = options.Headers || {};
        // var pathname = key.indexOf('/') === 0 ? key : '/' + key;
        // // var url = 'http://127.0.0.1:3000/auth';
        // var url = '../server/auth.php';
        // var xhr = new XMLHttpRequest();
        // var data = {
        //     method: method,
        //     pathname: pathname,
        //     query: query,
        //     headers: headers,
        // };
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('content-type', 'application/json');
        // xhr.onload = function (e) {
        //     callback({ Authorization: e.target.responseText, });
        // };
        // xhr.send(JSON.stringify(data));


        // // 方法四、前端使用固定密钥计算签名（适用于前端调试）
        // var authorization = COS.getAuthorization({
        //     SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        //     SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        //     Method: options.Method,
        //     Key: options.Key,
        //     Query: options.Query,
        //     Headers: options.Headers,
        //     Expires: 60,
        // });
        // callback(authorization);
    }
});

var TaskId;

var pre = document.querySelector('.result');
var showLogText = function (text, color) {
    if (typeof text === 'object') {
        try {
            text = JSON.stringify(text);
        } catch (e) {
        }
    }
    var div = document.createElement('div');
    div.innerText = text;
    color && (div.style.color = color);
    pre.appendChild(div);
    pre.style.display = 'block';
    pre.scrollTop = pre.scrollHeight;
};

var logger = {
    log: function (text) {
        console.log.apply(console, arguments);
        var args = [].map.call(arguments, function (v) {
            return typeof v === 'object' ? JSON.stringify(v) : v;
        });
        showLogText(args.join(' '));
    },
    error: function (text) {
        console.error(text);
        showLogText(text, 'red');
    },
};

function getObjectUrl() {
    var url = cos.getObjectUrl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip',
        Expires: 60,
        Sign: true,
    }, function (err, data) {
        logger.log(err || data && data.Url);
    });
    logger.log(url);
}

function getAuth() {
    var key = '1.png';
    // 这里不推荐自己拼接，推荐使用 getObjectUrl 获取 url
    cos.options.getAuthorization({
        Method: 'get',
        Key: key
    }, function (AuthData) {
        if (typeof AuthData === 'string') {
            AuthData = {Authorization: AuthData.Authorization};
        }
        var url = 'http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' +
            encodeURIComponent(key).replace(/%2F/g, '/') +
            '?' + AuthData +
            (AuthData.XCosSecurityToken ? '&' + AuthData.XCosSecurityToken : '');
        logger.log(url);
    });
}

function getBucket() {
    cos.getBucket({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // Prefix: 'dir/'
        // Delimiter: '/'
    }, function (err, data) {
        logger.log(err || data);
    });
}

function headBucket() {
    cos.headBucket({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketAcl() {
    cos.putBucketAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // GrantFullControl: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantWrite: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantRead: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantReadAcp: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantWriteAcp: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // ACL: 'public-read-write',
        // ACL: 'public-read',
        ACL: 'private',
        // AccessControlPolicy: {
        // "Owner": { // AccessControlPolicy 里必须有 owner
        //     "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 Bucket 所属用户的 QQ 号
        // },
        // "Grants": [{
        //     "Grantee": {
        //         "ID": "qcs::cam::uin/1001:uin/1001", // 10002 是 QQ 号
        //         "DisplayName": "qcs::cam::uin/1001:uin/1001" // 10002 是 QQ 号
        //     },
        //     "Permission": "READ"
        // }, {
        //     "Grantee": {
        //         "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
        //     },
        //     "Permission": "WRITE"
        // }, {
        //     "Grantee": {
        //         "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
        //     },
        //     "Permission": "READ_ACP"
        // }, {
        //     "Grantee": {
        //         "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
        //     },
        //     "Permission": "WRITE_ACP"
        // }]
        // }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketAcl() {
    cos.getBucketAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketCors() {
    cos.putBucketCors({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        CORSConfiguration: {
            "CORSRules": [{
                "AllowedOrigin": ["*"],
                "AllowedMethod": ["GET", "POST", "PUT", "DELETE", "HEAD"],
                "AllowedHeader": ["*"],
                "ExposeHeader": ["ETag", "Content-Length", "x-cos-acl", "x-cos-version-id", "x-cos-delete-marker", "x-cos-server-side-encryption"],
                "MaxAgeSeconds": "5"
            }]
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketCors() {
    cos.getBucketCors({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucketCors() {
    cos.deleteBucketCors({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketTagging() {
    cos.putBucketTagging({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Tagging: {
            "Tags": [
                {"Key": "k1", "Value": "v1"},
                {"Key": "k2", "Value": "v2"}
            ]
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketTagging() {
    cos.getBucketTagging({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucketTagging() {
    cos.deleteBucketTagging({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketPolicy() {
    var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
    cos.putBucketPolicy({
        Policy: {
            "version": "2.0",
            "statement": [{
                "effect": "allow",
                "principal": {"qcs": ["qcs::cam::uin/10001:uin/10001"]}, // 这里的 10001 是 QQ 号
                "action": [
                    // 这里可以从临时密钥的权限上控制前端允许的操作
                    // 'name/cos:*', // 这样写可以包含下面所有权限

                    // // 列出所有允许的操作
                    // // ACL 读写
                    // 'name/cos:GetBucketACL',
                    // 'name/cos:PutBucketACL',
                    // 'name/cos:GetObjectACL',
                    // 'name/cos:PutObjectACL',
                    // // 简单 Bucket 操作
                    // 'name/cos:PutBucket',
                    // 'name/cos:HeadBucket',
                    // 'name/cos:GetBucket',
                    // 'name/cos:DeleteBucket',
                    // 'name/cos:GetBucketLocation',
                    // // Versioning
                    // 'name/cos:PutBucketVersioning',
                    // 'name/cos:GetBucketVersioning',
                    // // CORS
                    // 'name/cos:PutBucketCORS',
                    // 'name/cos:GetBucketCORS',
                    // 'name/cos:DeleteBucketCORS',
                    // // Lifecycle
                    // 'name/cos:PutBucketLifecycle',
                    // 'name/cos:GetBucketLifecycle',
                    // 'name/cos:DeleteBucketLifecycle',
                    // // Replication
                    // 'name/cos:PutBucketReplication',
                    // 'name/cos:GetBucketReplication',
                    // 'name/cos:DeleteBucketReplication',
                    // // 删除文件
                    // 'name/cos:DeleteMultipleObject',
                    // 'name/cos:DeleteObject',
                    // 简单文件操作
                    'name/cos:PutObject',
                    'name/cos:AppendObject',
                    'name/cos:GetObject',
                    'name/cos:HeadObject',
                    'name/cos:OptionsObject',
                    'name/cos:PutObjectCopy',
                    'name/cos:PostObjectRestore',
                    // 分片上传操作
                    'name/cos:InitiateMultipartUpload',
                    'name/cos:ListMultipartUploads',
                    'name/cos:ListParts',
                    'name/cos:UploadPart',
                    'name/cos:CompleteMultipartUpload',
                    'name/cos:AbortMultipartUpload',
                ],
                // "resource": ["qcs::cos:ap-guangzhou:uid/1250000000:test-1250000000/*"] // 1250000000 是 appid
                "resource": ["qcs::cos:" + config.Region + ":uid/" + AppId + ":" + config.Bucket + "/*"] // 1250000000 是 appid
            }]
        },
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketPolicy() {
    cos.getBucketPolicy({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucketPolicy() {
    cos.deleteBucketPolicy({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketLocation() {
    cos.getBucketLocation({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketLifecycle() {
    cos.putBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        LifecycleConfiguration: {
            Rules: [{
                "ID": "1",
                "Status": "Enabled",
                "Filter": {},
                "Transition": {
                    "Days": "30",
                    "StorageClass": "STANDARD_IA"
                }
            }, {
                "ID": "2",
                "Status": "Enabled",
                "Filter": {
                    "Prefix": "dir/"
                },
                "Transition": {
                    "Days": "90",
                    "StorageClass": "ARCHIVE"
                }
            }, {
                "ID": "3",
                "Status": "Enabled",
                "Filter": {},
                "Expiration": {
                    "Days": "180"
                }
            }, {
                "ID": "4",
                "Status": "Enabled",
                "Filter": {},
                "AbortIncompleteMultipartUpload": {
                    "DaysAfterInitiation": "30"
                }
            }],
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketLifecycle() {
    cos.getBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucketLifecycle() {
    cos.deleteBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putBucketVersioning() {
    cos.putBucketVersioning({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        VersioningConfiguration: {
            Status: "Enabled"
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketVersioning() {
    cos.getBucketVersioning({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function listObjectVersions() {
    cos.listObjectVersions({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // Prefix: "",
        // Delimiter: '/'
    }, function (err, data) {
        logger.log(err || JSON.stringify(data, null, '    '));
    });
}

function putBucketReplication() {
    var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
    cos.putBucketReplication({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        ReplicationConfiguration: {
            Role: "qcs::cam::uin/10001:uin/10001",
            Rules: [{
                ID: "1",
                Status: "Enabled",
                Prefix: "sync/",
                Destination: {
                    Bucket: "qcs:id/0:cos:ap-chengdu:appid/" + AppId + ":backup",
                    // StorageClass: "Standard",
                }
            }]
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getBucketReplication() {
    cos.getBucketReplication({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucketReplication() {
    cos.deleteBucketReplication({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteBucket() {
    cos.deleteBucket({
        Bucket: 'testnew-' + config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1),
        Region: 'ap-guangzhou'
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putObject() {
    // 创建测试文件
    var filename = '1mb.zip';
    var blob = util.createFile({size: 1024 * 1024 * 1});
    // 调用方法
    cos.putObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: filename, /* 必须 */
        Body: blob,
        TaskReady: function (tid) {
            TaskId = tid;
        },
        onProgress: function (progressData) {
            logger.log(JSON.stringify(progressData));
        },
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putObjectCopy() {
    cos.putObjectCopy({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.copy.zip',
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + encodeURIComponent('1mb.zip').replace(/%2F/g, '/'), // Bucket 格式：test-1250000000
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getObject() {
    cos.getObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip',
    }, function (err, data) {
        logger.log(err || data);
    });
}

function headObject() {
    cos.headObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        logger.log(err || data);
    });
}

function putObjectAcl() {
    cos.putObjectAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip',
        // GrantFullControl: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantWrite: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantRead: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // ACL: 'public-read-write',
        // ACL: 'public-read',
        // ACL: 'private',
        ACL: 'default', // 继承上一级目录权限
        // AccessControlPolicy: {
        //     "Owner": { // AccessControlPolicy 里必须有 owner
        //         "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 Bucket 所属用户的 QQ 号
        //     },
        //     "Grants": [{
        //         "Grantee": {
        //             "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
        //         },
        //         "Permission": "READ"
        //     }]
        // }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function getObjectAcl() {
    cos.getObjectAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteObject() {
    cos.deleteObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        logger.log(err || data);
    });
}

function deleteMultipleObject() {
    cos.deleteMultipleObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Objects: [
            {Key: '中文/中文.txt'},
            {Key: '中文/中文.zip',VersionId: 'MTg0NDY3NDI1MzM4NzM0ODA2MTI'},
        ]
    }, function (err, data) {
        logger.log(err || data);
    });
}

function restoreObject() {
    cos.restoreObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1.txt',
        RestoreRequest: {
            Days: 1,
            CASJobParameters: {
                Tier: 'Expedited'
            }
        }
    }, function (err, data) {
        logger.log(err || data);
    });
}

function abortUploadTask() {
    cos.abortUploadTask({
        Bucket: config.Bucket, /* 必须 */ // Bucket 格式：test-1250000000
        Region: config.Region, /* 必须 */
        // 格式1，删除单个上传任务
        // Level: 'task',
        // Key: '10mb.zip',
        // UploadId: '14985543913e4e2642e31db217b9a1a3d9b3cd6cf62abfda23372c8d36ffa38585492681e3',
        // 格式2，删除单个文件所有未完成上传任务
        Level: 'file',
        Key: '10mb.zip',
        // 格式3，删除 Bucket 下所有未完成上传任务
        // Level: 'bucket',
    }, function (err, data) {
        logger.log(err || data);
    });
}

function sliceUploadFile() {
    var blob = util.createFile({size: 1024 * 1024 * 3});
    cos.sliceUploadFile({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '3mb.zip', /* 必须 */
        Body: blob,
        TaskReady: function (tid) {
            TaskId = tid;
        },
        onHashProgress: function (progressData) {
            logger.log('onHashProgress', JSON.stringify(progressData));
        },
        onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
        },
    }, function (err, data) {
        logger.log(err || data);
    });
}

function selectFileToUpload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function (e) {
        var file = this.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                cos.sliceUploadFile({
                    Bucket: config.Bucket, // Bucket 格式：test-1250000000
                    Region: config.Region,
                    Key: file.name,
                    Body: file,
                    TaskReady: function (tid) {
                        TaskId = tid;
                    },
                    onHashProgress: function (progressData) {
                        logger.log('onHashProgress', JSON.stringify(progressData));
                    },
                    onProgress: function (progressData) {
                        logger.log('onProgress', JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    logger.log(err || data);
                });
            } else {
                cos.putObject({
                    Bucket: config.Bucket, // Bucket 格式：test-1250000000
                    Region: config.Region,
                    Key: file.name,
                    Body: file,
                    TaskReady: function (tid) {
                        TaskId = tid;
                    },
                    onProgress: function (progressData) {
                        logger.log(JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    logger.log(err || data);
                });
            }
        }
    };
    input.click();
}

function cancelTask() {
    cos.cancelTask(TaskId);
    logger.log('canceled');
}

function pauseTask() {
    cos.pauseTask(TaskId);
    logger.log('paused');
}

function restartTask() {
    cos.restartTask(TaskId);
    logger.log('restart');
}

function uploadFiles() {
    var filename = 'mb.zip';
    var blob = util.createFile({size: 1024 * 1024 * 10});
    cos.uploadFiles({
        files: [{
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '1' + filename,
            Body: blob,
        }, {
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '2' + filename,
            Body: blob,
        }, {
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '3' + filename,
            Body: blob,
        }],
        SliceSize: 1024 * 1024,
        onProgress: function (info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
            logger.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
        },
    }, function (err, data) {
        logger.log(err || data);
    });
}

function sliceCopyFile() {
    // 创建测试文件
    var sourceName = '3mb.zip';
    var Key = '3mb.copy.zip';

    var sourcePath = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/'+ encodeURIComponent(sourceName).replace(/%2F/g, '/');

    cos.sliceCopyFile({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: Key,
        CopySource: sourcePath,
        SliceSize: 2 * 1024 * 1024, // 大于2M的文件用分片复制，小于则用单片复制
        onProgress:function (info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        }
    },function (err,data) {
        if(err){
            logger.log(err);
        }else{
            logger.log(data);
        }
    });

}

(function () {
    var list = [
        // 'getService', // 不支持
        'getObjectUrl',
        'getAuth',
        // 'putBucket', // 不支持
        'getBucket',
        'headBucket',
        'putBucketAcl',
        'getBucketAcl',
        'putBucketCors',
        'getBucketCors',
        // 'deleteBucketCors', // 不提供
        'putBucketTagging',
        'getBucketTagging',
        'deleteBucketTagging',
        'putBucketPolicy',
        'getBucketPolicy',
        'deleteBucketPolicy',
        'getBucketLocation',
        'getBucketLifecycle',
        'putBucketLifecycle',
        'deleteBucketLifecycle',
        'putBucketVersioning',
        'getBucketVersioning',
        'listObjectVersions',
        'putBucketReplication',
        'getBucketReplication',
        'deleteBucketReplication',
        'deleteBucket',
        'putObject',
        'putObjectCopy',
        'getObject',
        'headObject',
        'putObjectAcl',
        'getObjectAcl',
        'deleteObject',
        'deleteMultipleObject',
        'restoreObject',
        'abortUploadTask',
        'sliceUploadFile',
        'selectFileToUpload',
        'cancelTask',
        'pauseTask',
        'restartTask',
        'uploadFiles',
        'sliceCopyFile',
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
