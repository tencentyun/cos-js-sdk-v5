var config = {
    Bucket: 'test-1250000000',
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

var getAuthorization = function (options, callback) {

    // 方法一（推荐）
    var method = (options.Method || 'get').toLowerCase();
    var key = options.Key || '';
    var pathname = key.indexOf('/') === 0 ? key : '/' + key;

    var url = '../server/auth.php?method=' + method + '&pathname=' + encodeURIComponent(pathname);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
        callback(e.target.responseText);
    };
    xhr.send();

    // // 方法二（适用于前端调试）
    // var authorization = COS.getAuthorization({
    //     SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //     SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //     Method: options.Method,
    //     Key: options.Key,
    // });
    // callback(authorization);

};

var cos = new COS({
    // 必选参数
    getAuthorization: getAuthorization,
    // 可选参数
    FileParallelLimit: 3,    // 控制文件上传并发数
    ChunkParallelLimit: 3,   // 控制单个文件下分片上传并发数
    ChunkSize: 1024 * 1024,  // 控制分片大小，单位 B
    ProgressInterval: 1000,  // 控制 onProgress 回调的间隔
});
var TaskId;

var pre = document.querySelector('.result');
var logger = function (text, color) {
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
console._log = console.log;
console._error = console.error;
console.log = function (text) {
    console._log.apply(console, arguments);
    logger(text);
};
console.error = function (text) {
    console._error.apply(console, arguments);
    logger(text, 'red');
};

function getAuth() {
    var key = '1mb.zip';
    getAuthorization({
        Method: 'get',
        Key: key
    }, function (auth) {
        // 注意：这里的 Bucket 格式是 test-1250000000
        console.log('http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' + key + '?sign=' + encodeURIComponent(auth));
    });
}

function getObjectUrl() {
    var url = cos.getObjectUrl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip',
        Expires: 60,
    }, function (err, data) {
        console.log(err || data);
    });
    console.log(url);
}

function getBucket() {
    cos.getBucket({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function headBucket() {
    cos.headBucket({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putBucketAcl() {
    cos.putBucketAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // GrantFullControl: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantWrite: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // GrantRead: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
        // ACL: 'public-read-write',
        // ACL: 'public-read',
        ACL: 'private',
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
        console.log(err || data);
    });
}

function getBucketAcl() {
    cos.getBucketAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
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
                "ExposeHeader": ["ETag"],
                "MaxAgeSeconds": "5"
            }]
        }
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketCors() {
    cos.getBucketCors({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteBucketCors() {
    cos.deleteBucketCors({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
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
        console.log(err || data);
    });
}

function getBucketTagging() {
    cos.getBucketTagging({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteBucketTagging() {
    cos.deleteBucketTagging({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putBucketPolicy() {
    var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
    cos.putBucketPolicy({
        Policy: {
            "version": "2.0",
            "principal": {"qcs": ["qcs::cam::uin/10001:uin/10001"]}, // 这里的 10001 是 QQ 号
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
                    // "resource": ["qcs::cos:ap-guangzhou:uid/1250000000:test-1250000000/*"] // 1250000000 是 appid
                    "resource": ["qcs::cos:" + config.Region + ":uid/" + AppId + ":" + config.Bucket + "/*"] // 1250000000 是 appid
                }
            ]
        },
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketPolicy() {
    cos.getBucketPolicy({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketLocation() {
    cos.getBucketLocation({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putBucketLifecycle() {
    cos.putBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        LifecycleConfiguration: {
            "Rules": [{
                'ID': 1,
                'Filter': {
                    'Prefix': 'test123',
                },
                'Status': 'Enabled',
                'Transition': {
                    'Date': '2016-10-31T00:00:00+08:00',
                    'StorageClass': 'STANDARD_IA'
                }
            }]
        }
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketLifecycle() {
    cos.getBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteBucketLifecycle() {
    cos.deleteBucketLifecycle({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putBucketVersioning() {
    cos.putBucketVersioning({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        VersioningConfiguration: {
            MFADelete: "Enabled",
            Status: "Enabled"
        }
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketVersioning() {
    cos.getBucketVersioning({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putBucketReplication() {
    var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
    cos.putBucketReplication({
        Bucket: config.Bucket,
        Region: config.Region,
        ReplicationConfiguration: {
            Role: "qcs::cam::uin/459000000:uin/459000000",
            Rules: [{
                ID: "1",
                Status: "Enabled",
                Prefix: "img/",
                Destination: {
                    Bucket: "qcs::cos:" + config.Region + "::tianjin-" + AppId
                },
            }]
        }
    }, function (err, data) {
        console.log(err || data);
    });
}

function getBucketReplication() {
    cos.getBucketReplication({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteBucketReplication() {
    cos.deleteBucketReplication({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteBucket() {
    cos.deleteBucket({
        Bucket: 'testnew',
        Region: config.Region
    }, function (err, data) {
        console.log(err || data);
    });
}

function putObject() {
    // 创建测试文件
    var filename = '1mb.zip';
    var blob = util.createFile({size: 1024 * 1024 * 10});
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
            console.log(JSON.stringify(progressData));
        },
    }, function (err, data) {
        console.log(err || data);
    });
}

function putObjectCopy() {
    cos.putObjectCopy({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.copy.zip',
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/1mb.zip', // Bucket 格式：test-1250000000
    }, function (err, data) {
        console.log(err || data);
    });
}

function getObject() {
    cos.getObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: './1mb.zip',
    }, function (err, data) {
        console.log(err || data);
    });
}

function headObject() {
    cos.headObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        console.log(err || data);
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
        //         "ID": 'qcs::cam::uin/459000000:uin/459000000' // 459000000 是 Bucket 所属用户的 QQ 号
        //     },
        //     "Grants": [{
        //         "Grantee": {
        //             "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
        //         },
        //         "Permission": "READ"
        //     }]
        // }
    }, function (err, data) {
        console.log(err || data);
    });
}

function getObjectAcl() {
    cos.getObjectAcl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteObject() {
    cos.deleteObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1mb.zip'
    }, function (err, data) {
        console.log(err || data);
    });
}

function deleteMultipleObject() {
    cos.deleteMultipleObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Objects: [
            {Key: '1mb.zip'},
            {Key: '3mb.zip'},
        ]
    }, function (err, data) {
        console.log(err || data);
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
        console.log(err || data);
    });
}

function sliceUploadFile() {
    var blob = util.createFile({size: 1024 * 1024 * 30});
    cos.sliceUploadFile({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '30mb.zip', /* 必须 */
        Body: blob,
        TaskReady: function (tid) {
            TaskId = tid;
        },
        onHashProgress: function (progressData) {
        },
        onProgress: function (progressData) {
            console.log('onProgress', JSON.stringify(progressData));
        },
    }, function (err, data) {
        console.log(err || data);
    });
}

function selectFileToUpload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function (e) {
        var file = this.files[0]
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
                        console.log('onHashProgress', JSON.stringify(progressData));
                    },
                    onProgress: function (progressData) {
                        console.log('onProgress', JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    console.log(err || data);
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
                        console.log(JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    console.log(err || data);
                });
            }
        }
    };
    input.click();
}

function cancelTask() {
    cos.cancelTask(TaskId);
    console.log('canceled');
}

function pauseTask() {
    cos.pauseTask(TaskId);
    console.log('paused');
}

function restartTask() {
    cos.restartTask(TaskId);
    console.log('restart');
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
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
            console.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
        },
    }, function (err, data) {
        console.log(err || data);
    });
}

// uploadFiles();
// getAuth();
// getObjectUrl();
// getBucket();
// headBucket();
// putBucketAcl();
// getBucketAcl();
// putBucketCors();
// getBucketCors();
// deleteBucketCors();
// putBucketTagging();
// getBucketTagging();
// deleteBucketTagging();
// putBucketPolicy();
// getBucketPolicy();
// getBucketLocation();
// getBucketLifecycle();
// putBucketLifecycle();
// deleteBucketLifecycle();
// getBucketVersioning();
// putBucketVersioning();
// getBucketReplication();
// putBucketReplication();
// deleteBucket();
// putObject();
// putObjectCopy();
// getObject();
// headObject();
// putObjectAcl();
// getObjectAcl();
// deleteObject();
// deleteMultipleObject();
// abortUploadTask();
// sliceUploadFile();
// cancelTask();
// pauseTask();
// restartTask();
// uploadFiles();


(function () {
    var list = [
        // 'getService', // 不支持
        'getAuth',
        'getObjectUrl',
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
        'getBucketLocation',
        'getBucketLifecycle',
        'putBucketLifecycle',
        'deleteBucketLifecycle',
        'deleteBucketLifecycle',
        'putBucketVersioning',
        'getBucketVersioning',
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
        'abortUploadTask',
        'sliceUploadFile',
        'selectFileToUpload',
        'cancelTask',
        'pauseTask',
        'restartTask',
        'uploadFiles',
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
