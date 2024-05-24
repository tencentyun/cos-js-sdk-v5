var TaskId;

if (typeof logger === 'undefined') {
  logger = console;
}

if (typeof config === 'undefined' || !config || !config.Bucket || !config.Region) {
  console.error('请到 demo/index.html 中设置config初始化信息');
}

function getObjectUrl() {
  var url = cos.getObjectUrl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
      Expires: 60,
      Sign: true,
    },
    function (err, data) {
      logger.log('getObjectUrl:', err || (data && data.Url));
    }
  );
  logger.log('getObjectUrl:', url);
}

function getAuth() {
  var key = '1.png';
  // 这里不推荐自己拼接，推荐使用 getObjectUrl 获取 url
  getAuthorization(
    {
      Method: 'get',
      Key: key,
    },
    function (AuthData) {
      if (typeof AuthData === 'string') {
        AuthData = { Authorization: AuthData };
      }
      var url =
        'http://' +
        config.Bucket +
        '.cos.' +
        config.Region +
        '.myqcloud.com' +
        '/' +
        camSafeUrlEncode(key).replace(/%2F/g, '/') +
        '?' +
        AuthData +
        (AuthData.SecurityToken ? '&' + AuthData.SecurityToken : '');
      logger.log('getAuth:', url);
    }
  );
}

// getService、putBucket 接口会跨域，不支持浏览器使用，只在场景下可调用，比如改了 ServiceDomain 到代理地址
function getService() {
  cos.getService(function (err, data) {
    logger.log('getService:', err || data);
  });
}

// getService、putBucket 接口会跨域，不支持浏览器使用，只在场景下可调用，比如改了 ServiceDomain 到代理地址
function putBucket() {
  cos.putBucket(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      // Prefix: 'dir/'
      // Delimiter: '/'
    },
    function (err, data) {
      logger.log('putBucket:', err || data);
    }
  );
}

function getBucket() {
  cos.getBucket(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Prefix: 'a/',
    },
    function (err, data) {
      logger.log('getBucket:', err || data);
    }
  );
}

function headBucket() {
  cos.headBucket(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('headBucket:', err || data);
    }
  );
}

function deleteBucket() {
  // 谨慎使用，会删除存储桶
  // cos.deleteBucket(
  //   {
  //     Bucket: config.Bucket,
  //     Region: config.Region,
  //   },
  //   function (err, data) {
  //     logger.log('deleteBucket:', err || data);
  //   }
  // );
}

function putBucketAcl() {
  cos.putBucketAcl(
    {
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
      //         "URI": "http://cam.qcloud.com/groups/global/AllUsers", // 允许匿名用户组访问
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
    },
    function (err, data) {
      logger.log('putBucketAcl:', err || data);
    }
  );
}

function getBucketAcl() {
  cos.getBucketAcl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketAcl:', err || data);
    }
  );
}

function putBucketCors() {
  cos.putBucketCors(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      ResponseVary: 'true',
      CORSRules: [
        {
          AllowedOrigin: ['*'],
          AllowedMethod: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
          AllowedHeader: ['*'],
          ExposeHeader: [
            'ETag',
            'Date',
            'Content-Length',
            'x-cos-acl',
            'x-cos-version-id',
            'x-cos-request-id',
            'x-cos-delete-marker',
            'x-cos-server-side-encryption',
          ],
          MaxAgeSeconds: '5',
        },
      ],
    },
    function (err, data) {
      logger.log('putBucketCors:', err || data);
    }
  );
}

function getBucketCors() {
  cos.getBucketCors(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketCors:', err || data);
    }
  );
}

function deleteBucketCors() {
  // 浏览器端不建议使用
  // cos.deleteBucketCors(
  //   {
  //     Bucket: config.Bucket, // Bucket 格式：test-1250000000
  //     Region: config.Region,
  //   },
  //   function (err, data) {
  //     logger.log('deleteBucketCors:', err || data);
  //   }
  // );
}

function putBucketTagging() {
  cos.putBucketTagging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Tagging: {
        Tags: [
          { Key: 'k1', Value: 'v1' },
          { Key: 'k2', Value: 'v2' },
        ],
      },
    },
    function (err, data) {
      logger.log('putBucketTagging:', err || data);
    }
  );
}

function getBucketTagging() {
  cos.getBucketTagging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketTagging:', err || data);
    }
  );
}

function deleteBucketTagging() {
  cos.deleteBucketTagging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketTagging:', err || data);
    }
  );
}

function putBucketPolicy() {
  var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
  cos.putBucketPolicy(
    {
      Policy: {
        version: '2.0',
        statement: [
          {
            effect: 'allow',
            principal: { qcs: ['qcs::cam::uin/10001:uin/10001'] }, // 这里的 10001 是 QQ 号
            action: [
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
            resource: ['qcs::cos:' + config.Region + ':uid/' + AppId + ':' + config.Bucket + '/*'], // 1250000000 是 appid
          },
        ],
      },
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('putBucketPolicy:', err || data);
    }
  );
}

function getBucketPolicy() {
  cos.getBucketPolicy(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketPolicy:', err || data);
    }
  );
}

function deleteBucketPolicy() {
  cos.deleteBucketPolicy(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketPolicy:', err || data);
    }
  );
}

function getBucketLocation() {
  cos.getBucketLocation(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketLocation:', err || data);
    }
  );
}

function putBucketLifecycle() {
  cos.putBucketLifecycle(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      LifecycleConfiguration: {
        Rules: [
          {
            ID: '1',
            Status: 'Enabled',
            Filter: {},
            Transition: {
              Days: '30',
              StorageClass: 'STANDARD_IA',
            },
          },
          {
            ID: '2',
            Status: 'Enabled',
            Filter: {
              Prefix: 'dir/',
            },
            Transition: {
              Days: '90',
              StorageClass: 'ARCHIVE',
            },
          },
          {
            ID: '3',
            Status: 'Enabled',
            Filter: {},
            Expiration: {
              Days: '180',
            },
          },
          {
            ID: '4',
            Status: 'Enabled',
            Filter: {},
            AbortIncompleteMultipartUpload: {
              DaysAfterInitiation: '30',
            },
          },
        ],
      },
    },
    function (err, data) {
      logger.log('putBucketLifecycle:', err || data);
    }
  );
}

function getBucketLifecycle() {
  cos.getBucketLifecycle(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketLifecycle:', err || data);
    }
  );
}

function deleteBucketLifecycle() {
  cos.deleteBucketLifecycle(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketLifecycle:', err || data);
    }
  );
}

function putBucketVersioning() {
  cos.putBucketVersioning(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      VersioningConfiguration: {
        Status: 'Enabled',
      },
    },
    function (err, data) {
      logger.log('putBucketVersioning:', err || data);
    }
  );
}

function getBucketVersioning() {
  cos.getBucketVersioning(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketVersioning:', err || data);
    }
  );
}

function listObjectVersions() {
  cos.listObjectVersions(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      // Prefix: "",
      // Delimiter: '/'
    },
    function (err, data) {
      logger.log('listObjectVersions:', err || JSON.stringify(data, null, '    '));
    }
  );
}

function putBucketReplication() {
  var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
  cos.putBucketReplication(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      ReplicationConfiguration: {
        Role: 'qcs::cam::uin/10001:uin/10001',
        Rules: [
          {
            ID: '1',
            Status: 'Enabled',
            Prefix: 'sync/',
            Destination: {
              Bucket: 'qcs:id/0:cos:ap-chengdu:appid/' + AppId + ':backup',
              // StorageClass: "Standard",
            },
          },
        ],
      },
    },
    function (err, data) {
      logger.log('putBucketReplication:', err || data);
    }
  );
}

function getBucketReplication() {
  cos.getBucketReplication(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketReplication:', err || data);
    }
  );
}

function deleteBucketReplication() {
  cos.deleteBucketReplication(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketReplication:', err || data);
    }
  );
}

function putBucketWebsite() {
  cos.putBucketWebsite(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      WebsiteConfiguration: {
        IndexDocument: {
          Suffix: 'index.html', // 必选
        },
        RedirectAllRequestsTo: {
          Protocol: 'https',
        },
        // ErrorDocument: {
        //     Key: "error.html"
        // },
        // RoutingRules: [{
        //     Condition: {
        //         HttpErrorCodeReturnedEquals: "404"
        //     },
        //     Redirect: {
        //         Protocol: "https",
        //         ReplaceKeyWith: "404.html"
        //     }
        // }, {
        //     Condition: {
        //         KeyPrefixEquals: "docs/"
        //     },
        //     Redirect: {
        //         Protocol: "https",
        //         ReplaceKeyPrefixWith: "documents/"
        //     }
        // }, {
        //     Condition: {
        //         KeyPrefixEquals: "img/"
        //     },
        //     Redirect: {
        //         Protocol: "https",
        //         ReplaceKeyWith: "picture.jpg"
        //     }
        // }]
      },
    },
    function (err, data) {
      logger.log('putBucketWebsite:', err || data);
    }
  );
}

function getBucketWebsite() {
  cos.getBucketWebsite(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketWebsite:', err || data);
    }
  );
}

function deleteBucketWebsite() {
  cos.deleteBucketWebsite(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketWebsite:', err || data);
    }
  );
}

function putBucketReferer() {
  cos.putBucketReferer(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      RefererConfiguration: {
        Status: 'Enabled',
        RefererType: 'White-List',
        DomainList: {
          Domains: ['*.qq.com', '*.qcloud.com'],
        },
        EmptyReferConfiguration: 'Allow',
      },
    },
    function (err, data) {
      logger.log('putBucketReferer:', err || data);
    }
  );
}

function getBucketReferer() {
  cos.getBucketReferer(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketReferer:', err || JSON.stringify(data, null, '    '));
    }
  );
}

function putBucketDomain() {
  cos.putBucketDomain(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      DomainRule: [
        {
          Status: 'DISABLED',
          Name: 'www.testDomain1.com',
          Type: 'REST',
        },
        {
          Status: 'DISABLED',
          Name: 'www.testDomain2.com',
          Type: 'WEBSITE',
        },
      ],
    },
    function (err, data) {
      logger.log('putBucketDomain:', err || data);
    }
  );
}

function getBucketDomain() {
  cos.getBucketDomain(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketDomain:', err || data);
    }
  );
}

function deleteBucketDomain() {
  cos.deleteBucketDomain(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketDomain:', err || data);
    }
  );
}

function putBucketLogging() {
  var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
  cos.putBucketLogging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      BucketLoggingStatus: {
        LoggingEnabled: {
          TargetBucket: 'bucket-logging-' + AppId,
          TargetPrefix: 'logging',
        },
      },
    },
    function (err, data) {
      logger.log('putBucketLogging:', err || data);
    }
  );
}

function getBucketLogging() {
  cos.getBucketLogging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketLogging:', err || data);
    }
  );
}

function deleteBucketLogging() {
  cos.putBucketLogging(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      BucketLoggingStatus: {},
    },
    function (err, data) {
      logger.log('deleteBucketLogging:', err || data);
    }
  );
}

function putBucketInventory() {
  cos.putBucketInventory(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Id: 'inventory_test',
      InventoryConfiguration: {
        Id: 'inventory_test',
        IsEnabled: 'true',
        Destination: {
          COSBucketDestination: {
            Format: 'CSV',
            AccountId: config.Uin,
            Bucket: 'qcs::cos:' + config.Region + '::' + config.Bucket,
            Prefix: 'inventory',
            Encryption: {
              SSECOS: '',
            },
          },
        },
        Schedule: {
          Frequency: 'Daily',
        },
        Filter: {
          Prefix: 'myPrefix',
        },
        IncludedObjectVersions: 'All',
        OptionalFields: [
          'Size',
          'LastModifiedDate',
          'ETag',
          'StorageClass',
          'IsMultipartUploaded',
          'ReplicationStatus',
        ],
      },
    },
    function (err, data) {
      logger.log('putBucketInventory:', err || data);
    }
  );
}

function postBucketInventory() {
  cos.postBucketInventory(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Id: 'inventory_test6',
      InventoryConfiguration: {
        Id: 'inventory_test6',
        Destination: {
          COSBucketDestination: {
            Format: 'CSV',
            AccountId: config.Uin,
            Bucket: 'qcs::cos:' + config.Region + '::' + config.Bucket,
            Prefix: 'inventory6',
            Encryption: {
              SSECOS: '',
            },
          },
        },
        Filter: {
          Prefix: 'myPrefix',
          // Period: {
          //   StartTime: new Date('2023-05-01').getTime()/1000,
          //   EndTime: new Date('2023-05-31').getTime()/1000,
          // },
          // And: {
          //   Prefix: 'myPrefix',
          //   Tag: [{ Key: 'test1', Value: '1'}, { Key: 'test2', Value: '2' }]
          // }
        },
        IncludedObjectVersions: 'All',
        OptionalFields: [
          'Size',
          'LastModifiedDate',
          'ETag',
          'StorageClass',
          'IsMultipartUploaded',
          'ReplicationStatus',
          'Tag',
        ],
      },
    },
    function (err, data) {
      logger.log('postBucketInventory:', err || data);
    }
  );
}

function getBucketInventory() {
  cos.getBucketInventory(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Id: 'inventory_test',
    },
    function (err, data) {
      logger.log('getBucketInventory:', err || JSON.stringify(data));
    }
  );
}

function deleteBucketInventory() {
  cos.deleteBucketInventory(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Id: 'inventory_test',
    },
    function (err, data) {
      logger.log('deleteBucketInventory:', err || JSON.stringify(data));
    }
  );
}

function listBucketInventory() {
  cos.listBucketInventory(
    {
      Bucket: config.Bucket,
      Region: config.Region,
    },
    function (err, data) {
      logger.log('listBucketInventory:', err || JSON.stringify(data));
    }
  );
}

function putBucketEncryption() {
  cos.putBucketEncryption(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      ServerSideEncryptionConfiguration: {
        Rule: [
          {
            ApplySideEncryptionConfiguration: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
    },
    function (err, data) {
      logger.log('putBucketEncryption:', err || JSON.stringify(data));
    }
  );
}

function getBucketEncryption() {
  cos.getBucketEncryption(
    {
      Bucket: config.Bucket,
      Region: config.Region,
    },
    function (err, data) {
      logger.log('getBucketEncryption:', err || JSON.stringify(data));
    }
  );
}

function deleteBucketEncryption() {
  cos.deleteBucketEncryption(
    {
      Bucket: config.Bucket,
      Region: config.Region,
    },
    function (err, data) {
      logger.log('deleteBucketEncryption:', err || JSON.stringify(data));
    }
  );
}

function putObject() {
  // 创建测试文件
  var filename = '1mb.zip';
  var blob = util.createFile({ size: 1024 * 1024 * 1 });
  // 调用方法
  cos.putObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: filename, // 必须
      // 常见场景是使用 input[type="file"] 标签选择文件后上传，可参考 selectFileToUpload
      Body: blob,
      onTaskReady: function (tid) {
        TaskId = tid;
        logger.log('onTaskReady', tid);
      },
      onTaskStart: function (info) {
        logger.log('onTaskStart', info);
      },
      onProgress: function (progressData) {
        logger.log(JSON.stringify(progressData));
      },
      Headers: {
        // 万象持久化接口，上传时持久化
        // 'Pic-Operations': '{"is_pic_info": 1, "rules": [{"fileid": "test.jpg", "rule": "imageMogr2/thumbnail/!50p"}]}'
      },
    },
    function (err, data) {
      logger.log('putObject:', err || data);
    }
  );
}

// 简单上传 文件boby为base64
function putObject_base64ToBlob() {
  var base64Url =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABRFBMVEUAAAAAo/8Ao/8Ao/8Ao/8ApP8Aov8Ao/8Abv8Abv8AyNwAyNwAo/8Ao/8Ao/8Abv8Ao/8AivgAo/8AyNwAbv8Abv8AydwApf8Abf8Ao/8AbP8Ao/8AyNwAydwAbv8AydwApP8Ao/8AyNwAo/8AyNwAydsAyNwAxd8Aov8AyNwAytsAo/8Abv8AyNwAbv8Av+MAo/8AytsAo/8Abv8AyNwAo/8Abv8AqfkAbv8Aov8Abv8AyNwAov8Abv8Ao/8Abv8Ao/8AydwAo/8Ao/8Ate8Ay9oAvOcAof8AveAAyNwAyNwAo/8AyNwAy9kAo/8AyNwAyNwAo/8AqP8Aaf8AyNwAbv0Abv8Abv8AaP8Ao/8Ao/8Ao/8Ao/8Abv8AyNwAgvcAaP8A0dkAo/8AyNwAav8Abv8Ao/8Abv8AyNwAy9sAvOUAtePdkYxjAAAAZnRSTlMAw/co8uAuJAn8+/Tt29R8DAX77+nZz87Jv6CTh3lxTklAPjouJRsL5tjAuLiyr62roaCakYp0XVtOQTMyLiohICAcGRP49vTv5+PJurawq6mnnJuYl4+OiIB7eXVvX15QSDgqHxNcw3l6AAABe0lEQVQ4y82P11oCQQxGIy5FUJpKk6aAhV6k92LvvXedDfj+92ZkYQHxnnMxu3/OfJMEJo6y++baXf5XVw22GVGcsRmq431mQZRYyIzRGgdXi+HwIv86NDBKisrRAtU1hSj9pkZ9jpo/9YKbRsmNNKCHDXI00BxfMMirKNpMcjQ5Lm4/YZArUXyBYUwg40nsdr5jb3LBe25VWpNeKa1GENsEnq52C80z1uW48estiKjb19G54QdCrScnKAU69U3KJ4jzrsBawDWPuOcBqMyRvlcb1Y+zjMUBVsivAKe4gXgEKiVjSh9wlunGMmwiOqFL3RI0cj+nkgp3jC1BELVFkGiZSuvkp3tZZWZ2sKCuDj185PXqfmwI7AAOUctHkJoOeXg3sxA4ES+l7CVvrYHMEmNp8GtR+wycPG0+1RrwWQUzl4CvgQmPP5Ddofl8tWkJVT7J+BIAaxEktrYZoRAUfXgOGYHfcOqw3WF/EdLccz5cMfvUCPb4QwUmhB8+v12HZPCkbgAAAABJRU5ErkJggg==';
  var dataURLtoBlob = function (dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  // 调用方法
  cos.putObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: 'base64_file.png', // 必须
      Body: dataURLtoBlob(base64Url),
      onTaskReady: function (tid) {
        logger.log('onTaskReady', tid);
      },
      onTaskStart: function (info) {
        logger.log('onTaskStart', info);
      },
      onProgress: function (progressData) {
        logger.log(JSON.stringify(progressData));
      },
      Headers: {
        // 万象持久化接口，上传时持久化
        // 'Pic-Operations': '{"is_pic_info": 1, "rules": [{"fileid": "test.jpg", "rule": "imageMogr2/thumbnail/!50p"}]}'
      },
    },
    function (err, data) {
      logger.log('putObject:', err || data);
    }
  );
}

// 追加上传
// function appendObject() {
//   cos.appendObject(
//     {
//       Bucket: config.Bucket, // Bucket 格式：test-1250000000
//       Region: config.Region,
//       Key: 'append.txt', // 必须
//       Body: '12345',
//       Position: 0,
//     },
//     function (err, data) {
//       logger.log('putObject:', err || data);
//     }
//   );
// }

// function appendObject_continue() {
//   cos.headObject(
//     {
//       Bucket: config.Bucket, // Bucket 格式：test-1250000000
//       Region: config.Region,
//       Key: 'append.txt', // 必须
//     },
//     function (err, data) {
//       if (err) return console.log(err);
//       // 首先取到要追加的文件当前长度，即需要上送的Position
//       var position = data.headers['content-length'];
//       cos.appendObject(
//         {
//           Bucket: config.Bucket, // Bucket 格式：test-1250000000
//           Region: config.Region,
//           Key: 'append.txt', // 必须
//           Body: '66666',
//           Position: position,
//         },
//         function (err, data) {
//           // 也可以取到下一次上传的position继续追加上传
//           // var nextPosition = data.headers['x-cos-next-append-position'];
//           logger.log('putObject:', err || data);
//         }
//       );
//     }
//   );
// }

function putObjectCopy() {
  cos.putObjectCopy(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.copy.zip',
      CopySource:
        config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + camSafeUrlEncode('1mb.zip').replace(/%2F/g, '/'), // Bucket 格式：test-1250000000
    },
    function (err, data) {
      logger.log('putObjectCopy:', err || data);
    }
  );
}

function getObject() {
  cos.getObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
      onProgress: function (progressData) {
        logger.log(JSON.stringify(progressData));
      },
    },
    function (err, data) {
      logger.log('getObject:', err || data);
    }
  );
}

function headObject() {
  cos.headObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
    },
    function (err, data) {
      logger.log('headObject:', err || data);
    }
  );
}

function putObjectAcl() {
  cos.putObjectAcl(
    {
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
    },
    function (err, data) {
      logger.log('putObjectAcl:', err || data);
    }
  );
}

function getObjectAcl() {
  cos.getObjectAcl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
    },
    function (err, data) {
      logger.log('getObjectAcl:', err || data);
    }
  );
}

function deleteObject() {
  cos.deleteObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
    },
    function (err, data) {
      logger.log('deleteObject:', err || data);
    }
  );
}

function deleteMultipleObject() {
  cos.deleteMultipleObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Objects: [{ Key: '中文/中文.txt' }, { Key: '中文/中文.zip', VersionId: 'MTg0NDY3NDI1MzM4NzM0ODA2MTI' }],
    },
    function (err, data) {
      logger.log('deleteMultipleObject:', err || data);
    }
  );
}

function restoreObject() {
  cos.restoreObject(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1.txt',
      RestoreRequest: {
        Days: 1,
        CASJobParameters: {
          Tier: 'Expedited',
        },
      },
    },
    function (err, data) {
      logger.log('restoreObject:', err || data);
    }
  );
}

function selectObjectContent() {
  // 查询 CSV
  cos.selectObjectContent(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1.csv',
      SelectType: 2,
      SelectRequest: {
        Expression: 'Select * from COSObject',
        ExpressionType: 'SQL',
        InputSerialization: {
          CSV: {
            FileHeaderInfo: 'IGNORE',
            RecordDelimiter: '\\n',
            FieldDelimiter: ',',
            QuoteCharacter: '"',
            QuoteEscapeCharacter: '"',
            Comments: '#',
            AllowQuotedRecordDelimiter: 'FALSE',
          },
        },
        OutputSerialization: {
          CSV: {
            QuoteFields: 'ASNEEDED',
            RecordDelimiter: '\\n',
            FieldDelimiter: ',',
            QuoteCharacter: '"',
            QuoteEscapeCharacter: '"',
          },
        },
        RequestProgress: {
          Enabled: 'FALSE',
        },
      },
    },
    function (err, data) {
      logger.log('selectObjectContent:', err || data);
    }
  );
  // 查询 JSON
  cos.selectObjectContent(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1.json',
      SelectType: 2,
      SelectRequest: {
        Expression: 'Select b from COSObject',
        ExpressionType: 'SQL',
        InputSerialization: {
          JSON: {
            Type: 'DOCUMENT',
          },
        },
        OutputSerialization: {
          JSON: {
            RecordDelimiter: '\n',
          },
        },
        RequestProgress: {
          Enabled: 'FALSE',
        },
      },
    },
    function (err, data) {
      logger.log('selectObjectContent:', err || data);
    }
  );
}

function abortUploadTask() {
  cos.abortUploadTask(
    {
      Bucket: config.Bucket, // 必须 // Bucket 格式：test-1250000000
      Region: config.Region, // 必须
      // 格式1，删除单个上传任务
      // Level: 'task',
      // Key: '10mb.zip',
      // UploadId: '14985543913e4e2642e31db217b9a1a3d9b3cd6cf62abfda23372c8d36ffa38585492681e3',
      // 格式2，删除单个文件所有未完成上传任务
      Level: 'file',
      Key: '10mb.zip',
      // 格式3，删除 Bucket 下所有未完成上传任务
      // Level: 'bucket',
    },
    function (err, data) {
      logger.log('abortUploadTask:', err || data);
    }
  );
}

function uploadFile() {
  var filename = '10mb.zip';
  var blob = util.createFile({ size: 1024 * 1024 * 10 });
  cos.uploadFile(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: filename,
      Body: blob,
      SliceSize: 1024 * 1024 * 5, // 大于5mb才进行分块上传
      onProgress: function (info) {
        var percent = Math.floor(info.percent * 10000) / 100;
        var speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
        logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
    },
    function (err, data) {
      logger.log('uploadFile:', err || data);
    }
  );
}

function sliceUploadFile() {
  var blob = util.createFile({ size: 1024 * 1024 * 3 });
  cos.sliceUploadFile(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '3mb.jpg', // 必须
      Body: blob,
      Headers: {
        // 支持万象持久化接口，上传时持久化
        // 'Pic-Operations': '{"is_pic_info": 1, "rules": [{"fileid": "test.jpg", "rule": "imageMogr2/thumbnail/!50p"}]}'
      },
      onTaskReady: function (tid) {
        TaskId = tid;
      },
      onHashProgress: function (progressData) {
        logger.log('onHashProgress', JSON.stringify(progressData));
      },
      onProgress: function (progressData) {
        logger.log('onProgress', JSON.stringify(progressData));
      },
    },
    function (err, data) {
      logger.log('sliceUploadFile:', err || data);
    }
  );
}

function selectFileToUpload() {
  // 选择本地文件上传
  util.selectLocalFile(function (files) {
    var file = files && files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      cos.sliceUploadFile(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('selectFileToUpload:', err || data);
        }
      );
    } else {
      cos.putObject(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onProgress: function (progressData) {
            logger.log(JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('selectFileToUpload:', err || data);
        }
      );
    }
  });
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
  var blob = util.createFile({ size: 1024 * 1024 * 10 });
  cos.uploadFiles(
    {
      files: [
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: '1' + filename,
          Body: blob,
        },
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: '2' + filename,
          Body: blob,
        },
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: '3' + filename,
          Body: blob,
        },
      ],
      SliceSize: 1024 * 1024,
      onProgress: function (info) {
        var percent = Math.floor(info.percent * 10000) / 100;
        var speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
        logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
      onFileFinish: function (err, data, options) {
        logger.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
      },
    },
    function (err, data) {
      logger.log('uploadFiles:', err || data);
    }
  );
}

function sliceCopyFile() {
  // 创建测试文件
  var sourceName = '3mb.zip';
  var Key = '3mb.copy.zip';

  var sourcePath =
    config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + camSafeUrlEncode(sourceName).replace(/%2F/g, '/');

  cos.sliceCopyFile(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: Key,
      CopySource: sourcePath,
      CopySliceSize: 5 * 1024 * 1024, // 指定文件多大时用分片复制，小于数值则用单片复制
      onProgress: function (info) {
        var percent = Math.floor(info.percent * 10000) / 100;
        var speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
        logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
    },
    function (err, data) {
      if (err) {
        logger.log('sliceCopyFile:', err);
      } else {
        logger.log('sliceCopyFile:', data);
      }
    }
  );
}

/* 移动对象*/
function moveObject() {
  // COS 没有对象重命名或移动的接口，移动对象可以通过复制/删除对象实现
  var source = 'source.txt';
  var target = 'target.txt';
  var copySource =
    config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + camSafeUrlEncode(source).replace(/%2F/g, '/');
  cos.putObject(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: source,
      Body: 'hello!',
    },
    function (err, data) {
      if (err) return logger.log(err);
      cos.putObjectCopy(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: target,
          CopySource: copySource,
        },
        function (err, data) {
          if (err) return logger.log(err);
          cos.deleteObject(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              Key: source,
            },
            function (err, data) {
              logger.log(err || data);
            }
          );
        }
      );
    }
  );
}

/* 上传到指定文件夹/目录 */
function uploadToFolder() {
  util.selectLocalFile(function (files) {
    var file = files && files[0];
    if (!file) return;
    cos.putObject(
      {
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: 'folder/' + file.name,
        Body: file,
      },
      function (err, data) {
        logger.log(err || data);
      }
    );
  });
}

/* 创建文件夹 */
function createFolder() {
  cos.putObject(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: 'folder/', // 对象存储没有实际的文件夹，可以创建一个路径以 / 结尾的空对象表示，能在部分场景中满足文件夹使用需要
      Body: '',
    },
    function (err, data) {
      logger.log(err || data);
    }
  );
}

/* 上传本地文件夹 */
function uploadFolder() {
  // <input type='file' name="file" webkitdirectory >
  var input = document.createElement('input');
  input.type = 'file';
  input.webkitdirectory = true;
  input.onchange = function () {
    var oFiles = input.files;
    if (!oFiles.length) return;
    var files = [];
    for (var i = 0; i < oFiles.length; i++) {
      var file = oFiles[i];
      var Key = 'folder/' + file.webkitRelativePath;
      files.push({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: Key,
        Body: file,
      });
    }
    cos.uploadFiles(
      {
        files: files,
        SliceSize: 1024 * 1024,
        onProgress: function (info) {
          var percent = Math.floor(info.percent * 10000) / 100;
          var speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
          logger.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
          logger.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
        },
      },
      function (err, data) {
        logger.log('uploadFolder:', err || data);
      }
    );
  };
  input.click();
}

/* 列出文件夹下的文件 */
function listFolder() {
  var _listFolder = function (params, callback) {
    var Contents = [];
    var CommonPrefixes = [];
    var marker;
    var next = function () {
      params.Marker = marker;
      cos.getBucket(params, function (err, data) {
        if (err) return callback(err);
        data &&
          data.CommonPrefixes &&
          data.CommonPrefixes.forEach(function (item) {
            CommonPrefixes.push(item);
          });
        data &&
          data.Contents &&
          data.Contents.forEach(function (item) {
            Contents.push(item);
          });
        if (data.IsTruncated === 'true') {
          marker = data.NextMarker;
          next();
        } else {
          callback(null, {
            CommonPrefixes: CommonPrefixes,
            Contents: Contents,
          });
        }
      });
    };
    next();
  };
  _listFolder(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Delimiter: '/', // 如果按目录列出文件传入该分隔符，如果要深度列出文件不传改参数
      Prefix: 'folder/', // 要列出的目录前缀
    },
    function (err, data) {
      logger.log('listFolder:', err || data);
    }
  );
}

/* 删除指定文件夹下的所有对象（删除存储桶里指定前缀所有对象） */
function deleteFolder() {
  var _deleteFolder = function (params, callback) {
    var deletedList = [];
    var errorList = [];
    var marker;
    var next = function () {
      params.Marker = marker;
      cos.getBucket(params, function (err, data) {
        if (err) return callback(err);
        var Objects = [];
        if (data && data.Contents && data.Contents.length) {
          data.Contents.forEach(function (item) {
            Objects.push({ Key: item.Key });
          });
        }
        var afterDeleted = function () {
          if (data.IsTruncated === 'true') {
            marker = data.NextMarker;
            next();
          } else {
            callback(null, { Deleted: deletedList, Error: errorList });
          }
        };
        if (Objects.length) {
          cos.deleteMultipleObject(
            {
              Bucket: params.Bucket,
              Region: params.Region,
              Objects: Objects,
            },
            function (err, data) {
              data.Deleted &&
                data.Deleted.forEach(function (item) {
                  deletedList.push(item);
                });
              data.Error &&
                data.Error.forEach(function (item) {
                  errorList.push(item);
                });
              afterDeleted();
            }
          );
        } else {
          afterDeleted();
        }
      });
    };
    next();
  };
  _deleteFolder(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Prefix: 'folder/', // 要列出的目录前缀
    },
    function (err, data) {
      logger.log('deleteFolder:', err || data);
    }
  );
}

function request() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: '1.png',
      Method: 'POST',
      Action: 'image_process',
      Headers: {
        // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
        'Pic-Operations': JSON.stringify({
          is_pic_info: 1,
          rules: [{ fileid: 'desample_photo.jpg', rule: 'imageMogr2/thumbnail/200x/' }],
        }),
      },
    },
    function (err, data) {
      logger.log('request:', err || data);
    }
  );
}

(function () {
  var list = [
    'header-工具函数',
    'request',
    'getObjectUrl',
    'getAuth',

    //'getService', // 不支持，正常场景会跨域
    'header-存储桶操作',
    //'putBucket', // 不支持，正常场景会跨域
    'headBucket',
    'putBucketAcl',
    'getBucketAcl',
    'putBucketCors',
    'getBucketCors',
    // 'deleteBucketCors', // 不建议调用，删除 CORS，浏览器不能正常调用
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
    'getBucketReplication',
    'putBucketReplication',
    'deleteBucketReplication',
    'putBucketWebsite',
    'getBucketWebsite',
    'deleteBucketWebsite',
    'putBucketReferer',
    'getBucketReferer',
    'putBucketDomain',
    'getBucketDomain',
    'deleteBucketDomain',
    'putBucketLogging',
    'getBucketLogging',
    'deleteBucketLogging',
    'putBucketInventory',
    'postBucketInventory',
    'getBucketInventory',
    'deleteBucketInventory',
    'listBucketInventory',
    'putBucketEncryption',
    'getBucketEncryption',
    'deleteBucketEncryption',
    'deleteBucket',

    'header-对象操作',
    'getBucket',
    'listObjectVersions',
    'putObjectCopy',
    'getObject',
    'headObject',
    'putObjectAcl',
    'getObjectAcl',
    'deleteObject',
    'deleteMultipleObject',
    'restoreObject',
    'abortUploadTask',
    'selectObjectContent',
    'putObject',
    'putObject_base64ToBlob',
    // 'appendObject',
    // 'appendObject_continue',

    'header-高级操作',
    'uploadFile',
    'sliceUploadFile',
    'selectFileToUpload',
    'sliceCopyFile',
    'uploadFiles',
    'uploadFolder',
    'uploadToFolder',
    'moveObject',
    'createFolder',
    'listFolder',
    'deleteFolder',
    'cancelTask',
    'pauseTask',
    'restartTask',
  ];
  var labelMap = {
    putObject: '简单上传',
    putObject_base64ToBlob: '简单上传：base64转blob',
    appendObject: '追加上传',
    appendObject_continue: '查询position并追加上传',
    uploadFile: '高级上传',
    sliceUploadFile: '分片上传',
    sliceCopyFile: '分片复制',
    uploadFiles: '批量上传文件',
    selectFileToUpload: '上传本地文件',
    uploadFolder: '上传文件夹',
    uploadToFolder: '上传到指定文件夹',
    request: '通用请求接口',
    listFolder: '列出文件夹',
    deleteFolder: '删除文件夹(按前缀批量删除)',
  };
  var container = document.querySelector('.cos-main');
  var html = [];
  list.forEach(function (name) {
    if (name === '-') {
      html.push('<hr/>');
    } else if (name.indexOf('header') > -1) {
      html.push('<h4>' + name.split('-')[1] + '</h4>');
    } else {
      html.push(
        '<a href="javascript:void(0)" data-method="' +
          name +
          '">' +
          name +
          (labelMap[name] ? ' (' + labelMap[name] + ')' : '') +
          '</a>'
      );
    }
  });
  container.innerHTML = html.join('');
  container.onclick = function (e) {
    if (e.target.tagName === 'A') {
      var name = e.target.getAttribute('data-method').trim();
      window[name]();
    }
  };

  // 设置结果面板跟随窗口自适应高
  var mainPanel = document.querySelector('.cos-main');
  var resultPanel = document.querySelector('.result');
  resultPanel.style.height = getPanelHeight();
  window.onresize = function (e) {
    resultPanel.style.height = getPanelHeight();
  };

  function getPanelHeight() {
    return mainPanel.getBoundingClientRect().height - 80 + 'px';
  }
})();
