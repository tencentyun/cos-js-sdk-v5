/**
 * @jest-environment jsdom
 */
import { describe, expect, jest, test } from '@jest/globals';
import COS from '../index.js';
import Beacon from '../demo/common/beacon.min';
import ClsClient from '../demo/common/cls.min';

// config 替换成自己的桶信息
var config = {
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
  Bucket: process.env.Bucket, // 需提前创建并设置跨域
  Region: process.env.Region,
  ReplicationBucket: process.env.ReplicationBucket, // 存储桶复制时用到的桶，需提前创建并设置跨域
  ReplicationRegion: process.env.ReplicationRegion, // 存储桶复制时用到的桶的地域
  Uin: process.env.Uin,
  StsUrl: process.env.jssdkStsUrl,
};

// mock localStroage
var localStorageMock = (function () {
  var store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  writable: true,
  configurable: true,
  value: localStorageMock,
});

function checkEnvParams() {
  if (!process.env.Bucket) {
    console.warn('环境变量里未找到Bucket,请检查');
    return;
  }
  if (!process.env.Region) {
    console.warn('环境变量里未找到Region,请检查');
    return;
  }
  if (!process.env.ReplicationBucket) {
    console.warn('环境变量里未找到ReplicationBucket,请检查');
    return;
  }
  if (!process.env.ReplicationRegion) {
    console.warn('环境变量里未找到ReplicationRegion,请检查');
    return;
  }
  if (!process.env.Uin) {
    console.warn('环境变量里未找到Uin,请检查');
    return;
  }
  return true;
}

var util = {
  createFile: function (options) {
    var buffer = new ArrayBuffer(options.size || 0);
    var arr = new Uint8Array(buffer);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = 0;
    }
    var opt = {};
    options.type && (opt.type = options.type);
    var blob = new Blob([buffer], options);
    var file = new File([blob], `file-${Date.now()}`, {
      type: options.type,
      lastModified: Date.now(),
      lastModifiedDate: new Date(),
    });
    file.lastModifiedDate = new Date();
    return file;
  },
  str2blob: function (str) {
    var size = str.length;
    var buffer = new ArrayBuffer(size || 0);
    var arr = new Uint8Array(buffer);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = str[i];
    }
    var blob = new Blob([buffer]);
    return blob;
  },
};

function camSafeUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function comparePlainObject(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (var key in a) {
    if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      if (!comparePlainObject(a[key], b[key])) {
        return false;
      }
    } else if (a[key] != b[key]) {
      return false;
    }
  }
  return true;
}

function prepareBigObject(needHeaders) {
  return new Promise(function (resolve, reject) {
    // 创建测试文件
    var filename = name || 'bigger.zip';
    var content = util.createFile({ size: 1024 * 1024 * 10 });
    var put = function () {
      // 调用方法
      var params = {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: content,
        ContentLength: content.length,
      };
      if (needHeaders) {
        params.ContentType = 'text/html';
        params.CacheControl = 'max-age=7200';
        params.ContentDisposition = 'inline;filename=hello.jpg';
        params.Expires = new Date().toGMTString();
        params.Headers = {
          'x-cos-meta-test': 'xxx',
        };
      }
      cos.putObject(params, function (err, data) {
        err ? reject(err) : resolve();
      });
    };
    put();
  });
}

var createFileSync = function (size) {
  return util.createFile({ size: size });
};

var dataURItoUploadBody = function (dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

var getAuthorization = function (options, callback) {
  var authorization = COS.getAuthorization({
    SecretId: process.env.SecretId,
    SecretKey: process.env.SecretKey,
    Method: options.Method,
    Pathname: options.Pathname,
    Query: options.Query,
    Headers: options.Headers,
    Expires: 900,
  });
  callback({
    Authorization: authorization,
  });
};

var cos = new COS({
  // 必选参数
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
  UploadCheckContentMd5: true,
  UploadAddMetaMd5: true,
  Protocol: 'http:',
  // getAuthorization: getAuthorization,
});

console.log('config.StsUrl========', config.StsUrl);

// 使用临时密钥
var tempCOS = new COS({
  getAuthorization: function (options, callback) {
    var url = `${config.StsUrl}/sts`; // 如果是 npm run sts.js 起的 nodejs server，使用这个
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      try {
        var data = JSON.parse(e.target.responseText);
        var credentials = data.credentials;
      } catch (e) {}
      if (!data || !credentials) {
        return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2));
      }
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
        ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
      });
    };
    xhr.send(JSON.stringify(options.Scope));
  },
});

// 使用临时密钥（老版本使用的XCosSecurityToken）
var oldTempCOS = new COS({
  // UseAccelerate: true,
  getAuthorization: function (options, callback) {
    var url = `${config.StsUrl}/sts`; // 如果是 npm run sts.js 起的 nodejs server，使用这个
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      try {
        var data = JSON.parse(e.target.responseText);
        var credentials = data.credentials;
      } catch (e) {}
      if (!data || !credentials) {
        return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2));
      }
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        XCosSecurityToken: credentials.sessionToken,
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
        ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
      });
    };
    xhr.send(JSON.stringify(options.Scope));
  },
});

// 后端下发 putObject 前面 Key 为 1.txt
var getSignCOS = new COS({
  // UseAccelerate: true,
  getAuthorization: function (options, callback) {
    var url = `${config.StsUrl}/uploadSign`; // 如果是 npm run sts.js 起的 nodejs server，使用这个
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      try {
        var data = JSON.parse(e.target.responseText);
      } catch (e) {}
      if (!data) {
        return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2));
      }
      callback({
        Authorization: data?.signMap?.PutObject,
      });
    };
    xhr.send();
  },
});

var getStsCOS = new COS({
  // UseAccelerate: true,
  getSTS: function (options, callback) {
    var url = `${config.StsUrl}/sts`; // 如果是 npm run sts.js 起的 nodejs server，使用这个
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      try {
        var data = JSON.parse(e.target.responseText);
        var credentials = data.credentials;
      } catch (e) {}
      if (!data || !credentials) {
        return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2));
      }
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
        ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
      });
    };
    xhr.send();
  },
});

// 临时密钥允许的路径
var tempCOSPrefix = 'js-sdk/test/';

var Bucket = config.Bucket;
var BucketShortName = Bucket;
var TaskId;
var AppId;
var BucketLongName = Bucket + '-' + AppId;

var match = config.Bucket.match(/^(.+)-(\d+)$/);
if (match) {
  BucketLongName = config.Bucket;
  BucketShortName = match[1];
  AppId = match[2];
}

var group = function (name, fn) {
  if (!checkEnvParams()) return;
  console.log(`${name}进行中....`);
  describe(name, function () {
    jest.setTimeout(2 * 60 * 1000);
    fn.apply(this, arguments);
  });
};

var assert = {
  ok: function (val) {
    expect(Boolean(val)).toBeTruthy();
  },
};

group('init cos', function () {
  const putFile = function (cosIns, done, canSuccess = true) {
    var key = '1.txt';
    var content = Date.now().toString();
    cosIns.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
        Headers: {
          'x-cos-test': '1',
          'x-cos-meta-test': 'meta',
        },
        'x-cos-test2': '2',
      },
      function (err, data) {
        assert.ok(canSuccess ? !err : err);
        done();
      }
    );
  };
  test('使用AppId', function (done) {
    var initCos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      AppId: AppId,
    });
    putFile(initCos, done);
  });
  test('SecretId格式错误', function (done) {
    var initCos = new COS({
      SecretId: config.SecretId + ' ',
      SecretKey: config.SecretKey,
    });
    putFile(initCos, done, false);
  });
  test('SecretKey格式错误', function (done) {
    var initCos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey + ' ',
    });
    putFile(initCos, done, false);
  });
  test('Timeout=6000', function (done) {
    var initCos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Timeout: 6000,
    });
    putFile(initCos, done);
  });
  test('ForcePathStyle', function (done) {
    try {
      var initCos = new COS({
        SecretId: config.SecretId,
        SecretKey: config.SecretKey,
        ForcePathStyle: true,
      });
      putFile(initCos, done, false);
    } catch (e) {
      assert.ok(e.message === 'ForcePathStyle is not supported');
      done();
    }
  });
  test('getAuthorization error tmpSecretId', function (done) {
    var initCos = new COS({
      getAuthorization: function (options, callback) {
        callback({
          tmpSecretId: config.SecretId,
          TmpSecretKey: config.SecretKey,
        });
      },
    });
    putFile(initCos, done, false);
  });
  test('getAuthorization error tmpSecretKey', function (done) {
    var initCos = new COS({
      getAuthorization: function (options, callback) {
        callback({
          TmpSecretId: config.SecretId,
          tmpSecretKey: config.SecretKey,
        });
      },
    });
    putFile(initCos, done, false);
  });
  test('getAuthorization error', function (done) {
    var initCos = new COS({
      getAuthorization: function (options, callback) {
        callback({
          TmpSecretId: config.SecretId,
          TmpSecretKey: config.SecretKey,
        });
      },
    });
    putFile(initCos, done, false);
  });
  test('getAuthorization 使用临时密钥 putObject', function (done) {
    tempCOS.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: tempCOSPrefix + Date.now().toString(36),
        Body: '12345',
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('getStsCOS 使用临时密钥 putObject', function (done) {
    getStsCOS.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: tempCOSPrefix + Date.now().toString(36),
        Body: '12345',
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('getAuthorization 使用临时密钥 sliceUploadFile', function (done) {
    const file = createFileSync(20 * 1024 * 1024);
    oldTempCOS.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: tempCOSPrefix + Date.now().toString(36),
        Body: file,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('getAuthorization 使用临时密钥 sliceUploadFile 没有权限', function (done) {
    const file = createFileSync(20 * 1024 * 1024);
    tempCOS.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Date.now().toString(36),
        Body: file,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getStsCOS 使用下发的签名 putObject', function (done) {
    getSignCOS.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        Body: '12345',
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('getAuthorization 使用下发的签名 sliceUploadFile', function (done) {
    const file = createFileSync(20 * 1024 * 1024);
    getSignCOS.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        Body: file,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('task 队列', function () {
  test('putObject() 批量上传', function (done) {
    var cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      UploadQueueSize: 100,
    });
    var upload = function () {
      var filename = '5.txt';
      cos.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: '12345',
        },
        function (err, data) {}
      );
    };
    for (var i = 0; i < 120; i++) {
      upload();
    }
    var taskList = cos.getTaskList();
    const isUploading = cos.isUploadRunning();
    assert.ok(isUploading);
    done();
  });
  test('putObject(),update-list()', function (done) {
    var filename = '10m.zip';
    const file = createFileSync(10 * 1024 * 1024);
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: file,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
    cos.on('task-list-update', function () {});
  });
});

group('兼容性测试', function () {
  test('getBucketACL 老用法', function (done) {
    cos.getBucketACL(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
});

group('getService()', function () {
  var cos = new COS({
    // 必选参数
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
    UploadCheckContentMd5: true,
    UploadAddMetaMd5: true,
    Protocol: 'http:',
    ServiceDomain: 'service.cos.myqcloud.com/',
  });
  test('getService 老用法', function (done) {
    cos.getService(function (err, data) {
      assert.ok(err);
      done();
    });
  });
  test('getService 传Region', function (done) {
    var cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
    });
    cos.getService(
      {
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getService 不传Region和Domain', function (done) {
    var cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
    });
    cos.getService({}, function (err, data) {
      assert.ok(err);
      done();
    });
  });
  test('不能正常列出 Bucket', function (done) {
    cos.getService(
      {
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('putBucket()', function () {
  var NewBucket = 'test' + Date.now().toString(36) + '-' + AppId;
  test('创建 bucket js sdk因为跨域会失败', function (done) {
    cos.putBucket(
      {
        Bucket: NewBucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('正常创建 bucket BucketAZConfig js sdk因为跨域会失败', function (done) {
    cos.putBucket(
      {
        Bucket: NewBucket,
        Region: config.Region,
        BucketAZConfig: {},
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucket() deleteBucket 不存在', function (done) {
    cos.deleteBucket(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err, 'deleteBucket 不存在');
        done();
      }
    );
  });
});

group('mock readAsBinaryString', function () {
  test('mock readAsBinaryString', function (done) {
    FileReader.prototype._readAsBinaryString = FileReader.prototype.readAsBinaryString;
    FileReader.prototype.readAsBinaryString = false;
    var filename = '10m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 10 });
    var paused = false;
    cos.sliceUploadFile({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: filename,
      Body: blob,
      onTaskReady: function (taskId) {
        TaskId = taskId;
      },
      onProgress: function (info) {
        if (!paused && info.percent > 0.6) {
          cos.cancelTask(TaskId);
          var hasProgress = false;
          cos.sliceUploadFile(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
              Body: blob,
              onTaskReady: function (taskId) {
                TaskId = taskId;
              },
              onProgress: function (info) {
                if (info.percent === 0) return;
                expect(info.percent).toBeGreaterThanOrEqual(0.3);
                cos.cancelTask(TaskId);
                FileReader.prototype.readAsBinaryString = FileReader.prototype._readAsBinaryString;
                delete FileReader.prototype._readAsBinaryString;
                done();
              },
            },
            function (err) {
              if (hasProgress) {
                done();
              }
            }
          );
        }
      },
    });
  });
});

group('getAuth()', function () {
  test('getAuth()', function (done) {
    var content = Date.now().toString();
    var key = '1.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        if (err) {
          done();
          return;
        }
        let AuthData = cos.getAuth({
          SecretId: config.SecretId,
          SecretKey: config.SecretKey,
          Method: 'get',
          Key: key,
          Scope: [
            {
              action: 'GetObject',
              bucket: config.Bucket,
              region: config.Region,
              prefix: key,
            },
          ],
        });
        if (typeof AuthData === 'string') {
          AuthData = { Authorization: AuthData };
        }
        if (!AuthData.Authorization) {
          AuthData.Authorization = COS.getAuthorization({
            SecretId: AuthData.TmpSecretId,
            SecretKey: AuthData.TmpSecretKey,
            Method: 'get',
            Key: key,
            SystemClockOffset: cos.options.SystemClockOffset,
          });
        }
        var link =
          'http://' +
          config.Bucket +
          '.cos.' +
          config.Region +
          '.myqcloud.com' +
          '/' +
          camSafeUrlEncode(key).replace(/%2F/g, '/') +
          '?' +
          AuthData.Authorization +
          (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
        done();
      }
    );
  });
});

group('getObjectUrl()', function () {
  test('getObjectUrl()', function (done) {
    var content = Date.now().toString();
    var key = '1.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        cos.getObjectUrl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
            Query: {
              a: 1,
            },
            Sign: true,
            Expires: 8000000,
          },
          function (err, data) {
            expect(typeof data.Url).toBe('string');
            err ? done(err) : done();
          }
        );
        tempCOS.getObjectUrl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
            Query: {
              a: 1,
            },
            Sign: false,
          },
          function (err, data) {
            expect(typeof data.Url).toBe('string');
            err ? done(err) : done();
          }
        );
      }
    );
  });
});

group('auth check', function () {
  test('auth check', function (done) {
    cos.getBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Prefix: 'aksjhdlash sajlhj!@#$%^&*()_+=-[]{}\';:"/.<>?.,??sadasd#/.,/~`',
        Headers: {
          'x-cos-test': 'aksjhdlash sajlhj!@#$%^&*()_+=-[]{}\';:"/.<>?.,??sadasd#/.,/~`',
        },
      },
      function (err, data) {
        err ? done(err) : done();
      }
    );
  });
});

group('getBucket(),listObjectVersions()', function () {
  test('正常获取 bucket 里的文件列表', function (done) {
    cos.getBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        expect(data.Name).toBe(BucketLongName);
        expect(data.Contents).toBeInstanceOf(Array);
        err ? done(err) : done();
      }
    );
  });
  test('正常获取 bucket 里的文件版本列表', function (done) {
    cos.listObjectVersions(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        expect(data.Name).toBe(config.Bucket);
        expect(data.Versions).toBeInstanceOf(Array);
        err ? done(err) : done();
      }
    );
  });
});

group('putObject(),cancelTask()', function () {
  test('putObject(),cancelTask()', function (done) {
    var filename = '10m.zip';
    var alive = false;
    var canceled = false;
    const file = createFileSync(10 * 1024 * 1024);
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: file,
        onTaskReady: function (taskId) {
          TaskId = taskId;
        },
        onProgress: function (info) {
          alive = true;
          if (!canceled) {
            cos.cancelTask(TaskId);
            alive = false;
            canceled = true;
            setTimeout(function () {
              expect(alive).toBe(false);
              done();
            }, 1200);
          }
        },
      },
      function (err, data) {
        alive = true;
        err ? done(err) : done();
      }
    );
  });
});

group('putObject 测试老参数', function () {
  test('putObject() options.AppId', function (done) {
    var filename = '/1m.zip';
    const file = createFileSync(1 * 1024 * 1024);
    var cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      AppId,
      UseRawKey: true,
    });
    cos.putObject(
      {
        Bucket: BucketShortName,
        Region: config.Region,
        Key: filename,
        Body: file,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('putObject() options.CompatibilityMode', function (done) {
    var filename = '/1m.zip';
    const file = createFileSync(1 * 1024 * 1024);
    var cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      CompatibilityMode: true,
    });
    cos.putObject(
      {
        Bucket: BucketShortName,
        Region: config.Region,
        Key: filename,
        Body: file,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putObject() BucketShortName', function (done) {
    var filename = '/1m.zip';
    const file = createFileSync(1 * 1024 * 1024);
    cos.putObject(
      {
        Bucket: BucketShortName,
        AppId: AppId,
        Region: config.Region,
        Key: filename,
        Body: file,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('putObject() error Body', function (done) {
    cos.putObject(
      {
        Bucket: BucketShortName,
        AppId: AppId,
        Region: config.Region,
        Key: COS.util.encodeBase64('转base64', true),
        Body: { a: 1 },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putObject() missing Key', function (done) {
    try {
      cos.putObject(
        {
          Bucket: BucketShortName,
          AppId: AppId,
          Region: config.Region,
          Body: file,
        },
        function (err, data) {}
      );
    } catch (e) {
      assert.ok(e.message === 'file is not defined');
      done();
    }
  });
});

group('sliceUploadFile() 完整上传文件', function () {
  test('sliceUploadFile() 完整上传文件', function (done) {
    var lastPercent;
    var filename = '3m.zip';
    var fileSize = 1024 * 1024 * 3;
    var blob = createFileSync(fileSize);
    cos.abortUploadTask(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Level: 'file',
      },
      function (err, data) {
        if (err) {
          done();
          return;
        }
        cos.sliceUploadFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
            Body: blob,
            Headers: {
              'x-cos-traffic-limit': 8192000000,
            },
            onTaskReady: function (taskId) {
              console.log(taskId);
            },
            onProgress: function (info) {
              lastPercent = info.percent;
            },
          },
          function (err, data) {
            console.log('sliceUploadFile', err ? 'failed' : 'success');
            if (err) {
              done();
              return;
            }
            cos.headObject(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: filename,
              },
              function (err, data) {
                console.log('headObject', err ? 'failed' : 'success');
                const success = data && data.headers && parseInt(data.headers['content-length'] || 0) === fileSize;
                console.log(`data.headers['content-length']`, data.headers['content-length'], fileSize, success);
                expect(success);
                done();
              }
            );
          }
        );
      }
    );
  });
  test('sliceUploadFile(),pauseTask(),restartTask()', function (done) {
    var filename = Date.now().toString() + '-10m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 10 });
    var paused = false;
    var updateFn = function (info) {
      var task = info.list.find((item) => item.Key === filename);
      if (task && task.state === 'success') {
        console.log('任务成功');
        cos.off('list-update', updateFn);
        assert.ok(1);
        done();
      }
    };
    cos.abortUploadTask(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Level: 'file',
      },
      function (err, data) {
        if (err) {
          done();
          return;
        }
        var TaskId;
        cos.sliceUploadFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
            Body: blob,
            onTaskReady: function (taskId) {
              TaskId = taskId;
            },
            onProgress: function (info) {
              if (!paused && info.percent >= 0.3) {
                cos.pauseTask(TaskId);
                paused = true;
                console.log('任务暂停');
                cos.on('list-update', updateFn);
                setTimeout(function () {
                  if (paused) {
                    console.log('任务重启');
                    cos.restartTask(TaskId);
                  }
                }, 10);
              }
            },
          },
          function (err, data) {
            assert.ok(1);
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile(),cancelTask(),restartTask()', function (done) {
    var filename = '10m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 3 });
    var paused = false;
    cos.abortUploadTask(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Level: 'file',
      },
      function (err, data) {
        var TaskId;
        cos.sliceUploadFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
            Body: blob,
            onTaskReady: function (taskId) {
              TaskId = taskId;
            },
            onProgress: function (info) {
              if (!paused && info.percent > 0.6) {
                cos.cancelTask(TaskId);
                setTimeout(function () {
                  cos.sliceUploadFile(
                    {
                      Bucket: config.Bucket,
                      Region: config.Region,
                      Key: filename,
                      Body: blob,
                    },
                    function (err, data) {
                      err ? done(err) : done();
                    }
                  );
                }, 10);
              }
            },
          },
          function (err, data) {}
        );
      }
    );
  });
  test('sliceUploadFile(),cancelTask()', function (done) {
    var filename = '3m.zip';
    var alive = false;
    var canceled = false;
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: util.createFile({ size: 1024 * 1024 * 3 }),
        onTaskReady: function (taskId) {
          TaskId = taskId;
        },
        onProgress: function (info) {
          alive = true;
          if (!canceled) {
            cos.cancelTask(TaskId);
            alive = false;
            canceled = true;
            setTimeout(function () {
              done();
            }, 1200);
          }
        },
      },
      function (err, data) {
        alive = true;
      }
    );
  });
});

group('sliceUploadFile() 同时上传2个文件', function () {
  var filename = '30m.zip';
  var blob = util.createFile({ size: 1024 * 1024 * 30 });
  test('sliceUploadFile() 上传文件1', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
    setTimeout(() => {
      cos.sliceUploadFile(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: blob,
        },
        function (err, data) {
          assert.ok(!err);
          done();
        }
      );
    }, 2000);
  });
});

group('sliceUploadFile() 续传', function () {
  var filename = '30m.zip';
  var blob = util.createFile({ size: 1024 * 1024 * 30 });
  test('sliceUploadFile() 正常续传', function (done) {
    var taskId;
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
        onTaskReady: function (id) {
          taskId = id;
        },
        onProgress: function (progressData) {
          if (progressData.percent >= 0.3) {
            cos.pauseTask(taskId);
            console.log('pause task');
            cos.sliceUploadFile(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: filename,
                Body: blob,
                TaskReady: function (id) {
                  console.log('TaskReady', id);
                },
              },
              function (err, data) {
                assert.ok(!err);
                done();
              }
            );
          }
        },
      },
      function (err, data) {}
    );
  });
  test('sliceUploadFile() cancelTask', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
        onTaskReady: function (id) {
          setTimeout(() => {
            cos.cancelTask(id);
            cos.sliceUploadFile(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: filename,
                Body: blob,
              },
              function (err, data) {
                assert.ok(!err);
                done();
              }
            );
          }, 2000);
        },
      },
      function (err, data) {}
    );
  });
  test('sliceUploadFile() 续传时远程为 0', function (done) {
    var taskId;
    var paused = false;
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
        onTaskReady: function (id) {
          taskId = id;
        },
        onProgress: function (progressData) {
          if (!paused && progressData.percent >= 0.3) {
            cos.pauseTask(taskId);
            paused = true;
            setTimeout(() => {
              if (paused) {
                var blob = util.createFile({ size: 1024 * 1024 * 20 });
                cos.sliceUploadFile(
                  {
                    Bucket: config.Bucket,
                    Region: config.Region,
                    Key: filename,
                    Body: blob,
                  },
                  function (err, data) {
                    assert.ok(!err);
                    done();
                  }
                );
              }
            }, 1000);
          }
        },
      },
      function (err, data) {}
    );
  });
});

group('abortUploadTask()', function () {
  test('abortUploadTask(),Level=task', function (done) {
    var filename = '1m.zip';
    cos.multipartInit(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
      },
      function (err, data) {
        cos.abortUploadTask(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
            Level: 'task',
            UploadId: data.UploadId,
          },
          function (err, data) {
            var nameExist = false;
            data.successList.forEach(function (item) {
              if (filename === item.Key) {
                nameExist = true;
              }
            });
            assert.ok(data.successList.length >= 1);
            assert.ok(nameExist);
            err ? done(err) : done();
          }
        );
      }
    );
  });
  test('abortUploadTask(),Level=file', function (done) {
    var filename = '1m.zip';
    var blob = util.createFile({ size: 1024 * 1024 });
    cos.sliceUploadFile({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: filename,
      Body: blob,
      onTaskReady: function (taskId) {
        TaskId = taskId;
      },
      onProgress: function (info) {
        cos.cancelTask(TaskId);
        cos.abortUploadTask(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Level: 'file',
            Key: filename,
          },
          function (err, data) {
            assert.ok(data.successList.length >= 1);
            assert.ok(data.successList[0] && data.successList[0].Key === filename);
            err ? done(err) : done();
          }
        );
      },
    });
  });
  test('abortUploadTask(),Level=bucket', function (done) {
    var filename = '1m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 10 });
    cos.sliceUploadFile({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: filename,
      Body: blob,
      Headers: {
        'x-cos-traffic-limit': 838860800,
      },
      onTaskReady: function (taskId) {
        TaskId = taskId;
      },
      onProgress: function (info) {
        cos.cancelTask(TaskId);
        cos.abortUploadTask(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Level: 'bucket',
          },
          function (err, data) {
            var nameExist = false;
            data.successList.forEach(function (item) {
              if (filename === item.Key) {
                nameExist = true;
              }
            });
            assert.ok(data.successList.length >= 1);
            assert.ok(nameExist);
            err ? done(err) : done();
          }
        );
      },
    });
  });
});

group('headBucket()', function () {
  test('headBucket()', function (done) {
    cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        expect(data.statusCode).toBe(200);
        err ? done(err) : done();
      }
    );
  });
  test('getBucket()', function (done) {
    cos.getBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(data.Name === BucketLongName);
        expect(data.Contents).toBeInstanceOf(Array);
        err ? done(err) : done();
      }
    );
  });
});

group('putObject()', function () {
  var buf = new ArrayBuffer(8);
  var arr = new Uint8Array(buf);
  [0x89, 0xe8, 0xaf, 0xb4, 0x2e, 0x70, 0x72, 0x70, 0x72].forEach(function (v, i) {
    arr[i] = v;
  });
  test('putObject()', function (done) {
    var filename = '1.txt';
    var getObjectETag = function (callback) {
      setTimeout(function () {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
          },
          function (err, data) {
            callback(data && data.headers && data.headers.etag);
          }
        );
      }, 2000);
    };
    var content = Date.now().toString();
    var lastPercent = 0;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: util.str2blob(content),
        onProgress: function (info) {
          lastPercent = info.percent;
        },
        TaskReady: function (id) {
          console.log('TaskReady', id);
        },
      },
      function (err, data) {
        if (err) throw err;
        assert.ok(data.ETag !== undefined);
        getObjectETag(function (ETag) {
          assert.ok(data.ETag === ETag);
          done();
        });
      }
    );
  });

  test('putObject(),string', function (done) {
    var filename = '1.txt';
    var content = '中文_' + Date.now().toString(36);
    var lastPercent = 0;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: content,
        onProgress: function (info) {
          lastPercent = info.percent;
        },
        TaskReady: function (id) {
          console.log('TaskReady', id);
        },
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
          },
          function (err, data) {
            assert.ok(data.Body && data.Body === content && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
  test('putObject(),string,empty', function (done) {
    var content = '';
    var lastPercent = 0;
    var Key = '1.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: content,
        onProgress: function (info) {
          lastPercent = info.percent;
        },
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
          },
          function (err, data) {
            assert.ok(data.Body === content && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
  test('putObject(),特殊二进制字符 ArrayBuffer md5', function (done) {
    var content = '';
    var lastPercent = 0;
    var Key = '1.mp4';
    var blob = new Blob([buf]);
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: blob,
        onProgress: function (info) {
          lastPercent = info.percent;
        },
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            BodyType: 'arraybuffer',
          },
          function (err, data) {
            var arr = new Uint8Array(data.Body);
            var isSame = arr.every(function (v, i) {
              return v === arr[i];
            });
            assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
  test('putObject(),特殊二进制字符 Blob md5', function (done) {
    var content = '';
    var lastPercent = 0;
    var Key = '1.mp4';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: buf,
        onProgress: function (info) {
          lastPercent = info.percent;
        },
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            BodyType: 'arraybuffer',
          },
          function (err, data) {
            var arr = new Uint8Array(data.Body);
            var isSame = arr.every(function (v, i) {
              return v === arr[i];
            });
            assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
  test('putObject(),特殊二进制字符 中文 string md5', function (done) {
    var Key = '1.txt';
    var content = '中文';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: content,
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
          },
          function (err, data) {
            var isSame = content === data.Body;
            assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
  test('putObject(),特殊二进制字符 unescape string md5', function (done) {
    var Key = '1.txt';
    var content = unescape(encodeURIComponent('中文'));
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: content,
      },
      function (err, data) {
        if (err) throw err;
        var ETag = data && data.ETag;
        assert.ok(ETag !== undefined);
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
          },
          function (err, data) {
            var isSame = content === data.Body;
            assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
            done();
          }
        );
      }
    );
  });
});

group('getObject() 默认开启合并 Key 校验', function () {
  function getObjectErrorKey(Key, done) {
    cos.getObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key,
      },
      function (err, data) {
        assert.ok(err.message === 'The Getobject Key is illegal');
        done();
      }
    );
  }
  test('getObject() The Getobject Key is illegal 1', function (done) {
    getObjectErrorKey('///////', done);
  });
  test('getObject() The Getobject Key is illegal 2', function (done) {
    getObjectErrorKey('/abc/../', done);
  });
  test('getObject() The Getobject Key is illegal 3', function (done) {
    getObjectErrorKey('/./', done);
  });
  test('getObject() The Getobject Key is illegal 4', function (done) {
    getObjectErrorKey('///abc/.//def//../../', done);
  });
  test('getObject() The Getobject Key is illegal 5', function (done) {
    getObjectErrorKey('/././///abc/.//def//../../', done);
  });
});

group('getObject() 手动关闭 Key 校验', function () {
  var cos = new COS({
    // 必选参数
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
    Protocol: 'http',
    ObjectKeySimplifyCheck: false,
  });
  function getObjectGetBucket(Key, done) {
    cos.getObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  }
  test('getObject() The Getobject Key is illegal 1', function (done) {
    cos.getObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '///////',
      },
      function (err, data) {
        // 请求变成了 getBucket
        assert.ok(data.Body.includes('ListBucketResult'));
        done();
      }
    );
  });
  test('getObject() The Getobject Key is illegal 2', function (done) {
    getObjectGetBucket('/abc/../', done);
  });
  test('getObject() The Getobject Key is illegal 3', function (done) {
    getObjectGetBucket('/./', done);
  });
  test('getObject() The Getobject Key is illegal 4', function (done) {
    getObjectGetBucket('///abc/.//def//../../', done);
  });
  test('getObject() The Getobject Key is illegal 5', function (done) {
    getObjectGetBucket('/././///abc/.//def//../../', done);
  });
});

group('getObject()', function () {
  test('getObject() body', function (done) {
    var key = '1.txt';
    var content = Date.now().toString();
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
          },
          function (err, data) {
            if (err) throw err;
            var objectContent = data.Body.toString();
            assert.ok(data.headers['content-length'] === '' + content.length);
            assert.ok(objectContent === content);
            done();
          }
        );
      }
    );
  });
  test('getObject() bucket not exist', function (done) {
    cos.getObject(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        DataType: 'blob',
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getObject() object not exist', function (done) {
    cos.getObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Date.now().toString(36) + '=1.txt',
        DataType: 'blob',
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getObject() DataType blob', function (done) {
    var key = '1.txt';
    var content = Date.now().toString();
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
            DataType: 'blob',
          },
          function (err, data) {
            if (err) throw err;
            expect(data.Body).toBeInstanceOf(Blob);
            expect(data.headers['content-length'] === '' + content.length);
            done();
          }
        );
      }
    );
  });
  test('getObject() DataType arraybuffer', function (done) {
    var key = '1.txt';
    var content = Date.now().toString();
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
            DataType: 'arraybuffer',
          },
          function (err, data) {
            if (err) throw err;
            expect(data.Body).toBeInstanceOf(ArrayBuffer);
            expect(data.headers['content-length'] === '' + content.length);
            done();
          }
        );
      }
    );
  });
});

group('Key 特殊字符', function () {
  test('Key 特殊字符', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '(!\'*) "#$%&+,-./0123456789:;<=>@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
        Body: Date.now().toString(),
      },
      function (err, data) {
        if (err) throw err;
        expect(data !== null);
        done();
      }
    );
  });
});

group('deleteObject', function () {
  test('deleteObject() bucket not exist', function (done) {
    cos.deleteObject(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Key: '1.copy.txt',
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteObject() object not exist', function (done) {
    cos.deleteObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Date.now().toString(36) + '1.copy.txt',
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
});

group('putObjectCopy() 1', function () {
  test('putObjectCopy() 1', function (done) {
    var content = Date.now().toString(36);
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        Body: content,
      },
      function (err, data) {
        var ETag = data.ETag;
        cos.deleteObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.copy.txt',
          },
          function (err, data) {
            cos.putObjectCopy(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: '1.copy.txt',
                CopySource: BucketLongName + '.cos.' + config.Region + '.myqcloud.com/1.txt',
              },
              function (err, data) {
                cos.headObject(
                  {
                    Bucket: config.Bucket,
                    Region: config.Region,
                    Key: '1.copy.txt',
                  },
                  function (err, data) {
                    expect(data.headers && data.headers.etag === ETag);
                    done();
                  }
                );
              }
            );
          }
        );
      }
    );
  });
  test('捕获 object 异常', function (done) {
    var errFileName = '12345.txt' + Date.now().toString(36);
    cos.putObjectCopy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.copy.txt',
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + errFileName,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('putObjectCopy()', function () {
  var filename = '1.txt';
  test('正常复制 object', function (done) {
    cos.putObjectCopy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.copy.txt',
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
      },
      function (err, data) {
        expect(data.ETag.length > 0);
        done();
      }
    );
  });
  test('putObjectCopy 异常', function (done) {
    var errFileName = Date.now().toString();
    cos.putObjectCopy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.copy.txt',
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + errFileName,
      },
      function (err, data) {
        expect(err.statusCode === 404);
        expect(err.error.Code === 'NoSuchKey');
        done();
      }
    );
  });
  test('putObjectCopy 异常copySource', function (done) {
    cos.putObjectCopy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.copy.txt',
        CopySource: 'https://www.qq.com/1.txt',
      },
      function (err, data) {
        expect(err);
        done();
      }
    );
  });
});

group('sliceCopyFile()', function () {
  var filename = 'bigger.zip';
  var Key = 'bigger.copy.zip';
  test('正常分片复制 object', function (done) {
    prepareBigObject(true)
      .then(function () {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
          },
          function (err, data1) {
            if (err) throw err;
            cos.sliceCopyFile(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: Key,
                CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
                CopySliceSize: 5 * 1024 * 1024,
              },
              function (err, data) {
                if (err) throw err;
                assert.ok(data.ETag.length > 0);
                cos.headObject(
                  {
                    Bucket: config.Bucket,
                    Region: config.Region,
                    Key: Key,
                  },
                  function (err, data2) {
                    if (err) throw err;
                    ['VersionId', 'ETag', 'RequestId'].forEach((key) => {
                      delete data1[key];
                      delete data2[key];
                    });
                    [
                      'x-cos-request-id',
                      'x-cos-version-id',
                      'x-cos-replication-status',
                      'last-modified',
                      'last-modified',
                      'etag',
                      'date',
                      'expires',
                    ].forEach((key) => {
                      delete data1.headers[key];
                      delete data2.headers[key];
                    });
                    assert.ok(comparePlainObject(data1, data2));
                    done();
                  }
                );
              }
            );
          }
        );
      })
      .catch(function () {
        assert.ok(false);
        done();
      });
  });
  test('单片复制 object', function (done) {
    setTimeout(function () {
      prepareBigObject(true)
        .then(function () {
          cos.headObject(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
            },
            function (err, data1) {
              if (err) throw err;
              cos.sliceCopyFile(
                {
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: Key,
                  CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
                  CopySliceSize: 10 * 1024 * 1024,
                },
                function (err, data) {
                  if (err) throw err;
                  assert.ok(data.ETag.length > 0);
                  setTimeout(function () {
                    cos.headObject(
                      {
                        Bucket: config.Bucket,
                        Region: config.Region,
                        Key: Key,
                      },
                      function (err, data2) {
                        if (err) throw err;
                        delete data1.VersionId;
                        delete data2.VersionId;
                        delete data1.headers['x-cos-request-id'];
                        delete data2.headers['x-cos-request-id'];
                        delete data1.headers['x-cos-version-id'];
                        delete data2.headers['x-cos-version-id'];
                        delete data1.headers['x-cos-replication-status'];
                        delete data2.headers['x-cos-replication-status'];
                        delete data1.headers['last-modified'];
                        delete data2.headers['last-modified'];
                        delete data1.headers['date'];
                        delete data2.headers['date'];
                        delete data1.ETag;
                        delete data2.ETag;
                        delete data1.RequestId;
                        delete data2.RequestId;
                        assert.ok(comparePlainObject(data1, data2));
                        done();
                      }
                    );
                  }, 2000);
                }
              );
            }
          );
        })
        .catch(function () {
          done();
        });
    }, 2000);
  });
  test('CopySource not found', function (done) {
    cos.sliceCopyFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + Date.now(),
      },
      function (err, data) {
        assert.ok(err !== null);
        done();
      }
    );
  });
  test('CopySource invalid', function (done) {
    cos.sliceCopyFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        CopySource: 'https://www.qq.com/1.txt',
      },
      function (err, data) {
        assert.ok(err !== null);
        done();
      }
    );
  });
  test('复制归档文件', function (done) {
    var sourceKey = Date.now().toString(36);
    var blob = util.createFile({ size: 1024 * 1024 * 30 });
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: sourceKey,
        Body: blob,
        StorageClass: 'ARCHIVE',
      },
      function () {
        cos.sliceCopyFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + sourceKey,
          },
          function (err, data) {
            assert.ok(err !== null);
            done();
          }
        );
      }
    );
  });
  test('复制空文件', function (done) {
    var sourceKey = Date.now().toString(36) + 'empty';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: sourceKey,
        Body: '',
      },
      function () {
        cos.sliceCopyFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: 'empty-copy',
            CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + sourceKey,
            CopySliceSize: 1,
          },
          function (err, data) {
            assert.ok(!err);
            done();
          }
        );
      }
    );
  });
});

group('deleteMultipleObject', function () {
  test('deleteMultipleObject()', function (done) {
    var content = Date.now().toString(36);
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        Body: content,
      },
      function (err, data) {
        cos.putObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '2.txt',
            Body: content,
          },
          function (err, data) {
            cos.deleteMultipleObject(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Objects: [{ Key: '1.txt' }, { Key: '2.txt' }],
              },
              function (err, data) {
                assert.ok(data.Deleted.length === 2);
                cos.headObject(
                  {
                    Bucket: config.Bucket,
                    Region: config.Region,
                    Key: '1.txt',
                  },
                  function (err, data) {
                    assert.ok(err.statusCode === 404);
                    cos.headObject(
                      {
                        Bucket: config.Bucket,
                        Region: config.Region,
                        Key: '2.txt',
                      },
                      function (err, data) {
                        assert.ok(err.statusCode === 404);
                        done();
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

group('BucketAcl', function () {
  var AccessControlPolicy = {
    Owner: {
      ID: 'qcs::cam::uin/10001:uin/10001', // 10001 是 QQ 号
    },
    Grants: [
      {
        Grantee: {
          ID: 'qcs::cam::uin/10002:uin/10002', // 10002 是 QQ 号
        },
        Permission: 'READ',
      },
    ],
  };
  var AccessControlPolicy2 = {
    Owner: {
      ID: 'qcs::cam::uin/10001:uin/10001', // 10001 是 QQ 号
    },
    Grant: {
      Grantee: {
        ID: 'qcs::cam::uin/10002:uin/10002', // 10002 是 QQ 号
      },
      Permission: 'READ',
    },
  };
  test('putBucketAcl() header ACL:private', function (done) {
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        ACL: 'private',
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            AccessControlPolicy.Owner.ID = data.Owner.ID;
            AccessControlPolicy2.Owner.ID = data.Owner.ID;
            assert.ok(data.ACL === 'private' || data.ACL === 'default');
            done();
          }
        );
      }
    );
  });
  test('putBucketAcl() header ACL:public-read', function (done) {
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        ACL: 'public-read',
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.ACL === 'public-read');
          done();
        });
      }
    );
  });
  test('putBucketAcl() header ACL:public-read-write', function (done) {
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        ACL: 'public-read-write',
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.ACL === 'public-read-write');
          done();
        });
      }
    );
  });
  test('putBucketAcl() header GrantRead:1001,1002', function (done) {
    var GrantRead = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantRead: GrantRead,
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.GrantRead === GrantRead);
          done();
        });
      }
    );
  });
  test('putBucketAcl() header GrantWrite:1001,1002', function (done) {
    var GrantWrite = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantWrite: GrantWrite,
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.GrantWrite === GrantWrite);
          done();
        });
      }
    );
  });
  test('putBucketAcl() header GrantFullControl:1001,1002', function (done) {
    var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantFullControl: GrantFullControl,
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.GrantFullControl === GrantFullControl);
          done();
        });
      }
    );
  });
  test('putBucketAcl() header ACL:public-read, GrantFullControl:1001,1002', function (done) {
    var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantFullControl: GrantFullControl,
        ACL: 'public-read',
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.GrantFullControl === GrantFullControl);
          assert.ok(data.ACL === 'public-read');
          done();
        });
      }
    );
  });
  test('putBucketAcl() xml', function (done) {
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccessControlPolicy: AccessControlPolicy,
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.Grants.length === 1);
          assert.ok(
            data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002',
            '设置 AccessControlPolicy ID 正确'
          );
          assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', '设置 AccessControlPolicy Permission 正确');
          done();
        });
      }
    );
  });
  test('putBucketAcl() xml2', function (done) {
    cos.putBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccessControlPolicy: AccessControlPolicy2,
      },
      function (err, data) {
        assert.ok(!err, 'putBucketAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region }, function (err, data) {
          assert.ok(data.Grants.length === 1);
          assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002');
          assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ');
          done();
        });
      }
    );
  });
  test('putBucketAcl() decodeAcl', function (done) {
    cos.getBucketAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        cos.putBucketAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            GrantFullControl: data.GrantFullControl,
            GrantWrite: data.GrantWrite,
            GrantRead: data.GrantRead,
            ACL: data.ACL,
          },
          function (err, data) {
            assert.ok(data);
            done();
          }
        );
      }
    );
  });
});

group('ObjectAcl', function () {
  var AccessControlPolicy = {
    Owner: {
      ID: 'qcs::cam::uin/10001:uin/10001', // 10001 是 QQ 号
    },
    Grants: [
      {
        Grantee: {
          ID: 'qcs::cam::uin/10002:uin/10002', // 10002 是 QQ 号
        },
        Permission: 'READ',
      },
    ],
  };
  var AccessControlPolicy2 = {
    Owner: {
      ID: 'qcs::cam::uin/10001:uin/10001', // 10001 是 QQ 号
    },
    Grant: {
      Grantee: {
        ID: 'qcs::cam::uin/10002:uin/10002', // 10002 是 QQ 号
      },
      Permission: 'READ',
    },
  };
  test('putObjectAcl() header ACL:private', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
        Body: 'hello!',
      },
      function (err, data) {
        assert.ok(!err);
        cos.putObjectAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            ACL: 'private',
            Key: '1.txt',
          },
          function (err, data) {
            assert.ok(!err, 'putObjectAcl 成功');
            cos.getObjectAcl(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: '1.txt',
              },
              function (err, data) {
                assert.ok((data.ACL = 'private'));
                AccessControlPolicy.Owner.ID = data.Owner.ID;
                AccessControlPolicy2.Owner.ID = data.Owner.ID;
                assert.ok(data.Grants.length === 1);
                done();
              }
            );
            cos.getObjectAcl(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: '1.txt',
                VersionId: 1,
              },
              function (err, data) {
                assert.ok(err);
                done();
              }
            );
          }
        );
      }
    );
  });
  test('putObjectAcl() header ACL:default', function (done) {
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        ACL: 'default',
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.txt',
          },
          function (err, data) {
            assert.ok((data.ACL = 'default'));
            done();
          }
        );
      }
    );
  });
  test('putObjectAcl() header ACL:public-read', function (done) {
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        ACL: 'public-read',
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl({ Bucket: config.Bucket, Region: config.Region, Key: '1.txt' }, function (err, data) {
          assert.ok((data.ACL = 'public-read'));
          done();
        });
      }
    );
  });
  // Object 不再支持修改写权限
  // test('putObjectAcl() header ACL:public-read-write', function (done) {
  //     cos.putObjectAcl({
  //         Bucket: config.Bucket,
  //         Region: config.Region,
  //         ACL: 'public-read-write',
  //         Key: '1.txt',
  //     }, function (err, data) {
  //         assert.ok(!err, 'putObjectAcl 成功');
  //         cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
  //             assert.ok(data.ACL = 'public-read-write');
  //             done();
  //         });
  //     });
  // });
  test('putObjectAcl() header GrantRead:1001,1002', function (done) {
    var GrantRead = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantRead: GrantRead,
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl({ Bucket: config.Bucket, Region: config.Region, Key: '1.txt' }, function (err, data) {
          assert.ok((data.GrantRead = GrantRead));
          done();
        });
      }
    );
  });
  // Object 不再支持修改写权限
  // test('putObjectAcl() header GrantWrite:1001,1002', function (done) {
  //     var GrantWrite = 'id="qcs::cam::uin/1001:uin/1001", id="qcs::cam::uin/1002:uin/1002"';
  //     cos.putObjectAcl({
  //         Bucket: config.Bucket,
  //         Region: config.Region,
  //         GrantWrite: GrantWrite,
  //         Key: '1.txt',
  //     }, function (err, data) {
  //         assert.ok(!err, 'putObjectAcl 成功');
  //         cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
  //             assert.ok(data.GrantWrite = GrantWrite);
  //             done();
  //         });
  //     });
  // });
  test('putObjectAcl() header GrantFullControl:1001,1002', function (done) {
    var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001", id="qcs::cam::uin/1002:uin/1002"';
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantFullControl: GrantFullControl,
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl({ Bucket: config.Bucket, Region: config.Region, Key: '1.txt' }, function (err, data) {
          assert.ok((data.GrantFullControl = GrantFullControl));
          done();
        });
      }
    );
  });
  test('putObjectAcl() header ACL:public-read, GrantRead:1001,1002', function (done) {
    var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001", id="qcs::cam::uin/1002:uin/1002"';
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        GrantFullControl: GrantFullControl,
        ACL: 'public-read',
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl({ Bucket: config.Bucket, Region: config.Region, Key: '1.txt' }, function (err, data) {
          assert.ok((data.GrantFullControl = GrantFullControl));
          assert.ok((data.ACL = 'public-read'));
          done();
        });
      }
    );
  });
  test('putObjectAcl() xml', function (done) {
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccessControlPolicy: AccessControlPolicy,
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getBucketAcl({ Bucket: config.Bucket, Region: config.Region, Key: '1.txt' }, function (err, data) {
          assert.ok(data.Grants.length === 1);
          assert.ok(
            data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002',
            '设置 AccessControlPolicy ID 正确'
          );
          assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', '设置 AccessControlPolicy Permission 正确');
          done();
        });
      }
    );
  });
  test('putObjectAcl() xml2', function (done) {
    cos.putObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccessControlPolicy: AccessControlPolicy2,
        Key: '1.txt',
      },
      function (err, data) {
        assert.ok(!err, 'putObjectAcl 成功');
        cos.getObjectAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.txt',
          },
          function (err, data) {
            assert.ok(data.Grants.length === 1);
            assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002', 'ID 正确');
            assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', 'Permission 正确');
            done();
          }
        );
      }
    );
  });
  test('putObjectAcl() decodeAcl', function (done) {
    cos.getObjectAcl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.txt',
      },
      function (err, data) {
        cos.putObjectAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.txt',
            GrantFullControl: data.GrantFullControl,
            GrantWrite: data.GrantWrite,
            GrantRead: data.GrantRead,
            ACL: data.ACL,
          },
          function (err, data) {
            assert.ok(data);
            done();
          }
        );
      }
    );
  });
});

group('BucketCors', function () {
  var CORSRules = [
    {
      AllowedOrigins: ['*'],
      AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
      AllowedHeaders: ['*', 'test-' + Date.now().toString(36)],
      ExposeHeaders: [
        'etag',
        'date',
        'content-length',
        'expires',
        'cache-control',
        'content-disposition',
        'content-encoding',
        'x-cos-acl',
        'x-cos-version-id',
        'x-cos-request-id',
        'x-cos-delete-marker',
        'x-cos-server-side-encryption',
        'x-cos-storage-class',
        'x-cos-acl',
        'x-cos-meta-test',
        'x-cos-tagging-count',
      ],
      MaxAgeSeconds: '5',
    },
  ];
  var CORSRulesMulti = [
    {
      AllowedOrigins: ['*'],
      AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
      AllowedHeaders: ['*'],
      ExposeHeaders: [
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
    {
      AllowedOrigins: ['http://qq.com', 'http://qcloud.com'],
      AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
      AllowedHeaders: ['*'],
      ExposeHeaders: [
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
  ];
  test('getBucketCors() bucket not exist', function (done) {
    cos.getBucketCors(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('putBucketCors() old CORSConfiguration', function (done) {
    CORSRules[0].AllowedHeaders[1] = 'test-' + Date.now().toString(36);
    cos.putBucketCors(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        CORSConfiguration: {
          CORSRules: CORSRules,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketCors(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(CORSRules, data.CORSRules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketCors() multi', function (done) {
    cos.putBucketCors(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        CORSConfiguration: {
          CORSRules: CORSRulesMulti,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketCors(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(CORSRulesMulti, data.CORSRules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketCors() old CORSRules', function (done) {
    CORSRules[0].AllowedHeaders[1] = 'test-' + Date.now().toString(36);
    cos.putBucketCors(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        CORSRules: CORSRules,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketCors(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(CORSRules, data.CORSRules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketCors(),getBucketCors()', function (done) {
    CORSRules[0].AllowedHeaders = ['*'];
    cos.putBucketCors(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        CORSConfiguration: {
          CORSRules: CORSRules,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketCors(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(CORSRules, data.CORSRules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('getBucketCors() bucket not exist', function (done) {
    cos.getBucketCors(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketCors() bucket not exist', function (done) {
    cos.deleteBucketCors(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('optionsObject', function () {
  test('optionsObject bucket not exist', function (done) {
    cos.optionsObject(
      {
        Bucket: Date.now().toString(36) + config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1.jpg',
        Headers: {
          Origin: 'https://qq.com',
          'Access-Control-Request-Method': 'PUT',
          'Access-Control-Request-Headers': 'Authorization,x-cos-security-token',
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('optionsObject', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1.jpg',
        Body: '123',
      },
      function (err, data) {
        cos.optionsObject(
          {
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '1.jpg',
            Headers: {
              Origin: 'https://qq.com',
              'Access-Control-Request-Method': 'PUT',
              'Access-Control-Request-Headers': 'Authorization,x-cos-security-token',
            },
          },
          function (err, data) {
            assert.ok(err);
            done();
          }
        );
      }
    );
  });
});

group('BucketTagging', function () {
  var Tags = [{ Key: 'k1', Value: 'v1' }];
  var TagsMulti = [
    { Key: 'k1', Value: 'v1' },
    { Key: 'k2', Value: 'v2' },
  ];
  test('putBucketTagging() bucket not exist', function (done) {
    cos.putBucketTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Tagging: {
          Tags: Tags,
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketTagging() bucket not exist', function (done) {
    cos.getBucketTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketTagging() bucket not exist', function (done) {
    cos.deleteBucketTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketTagging(),getBucketTagging()', function (done) {
    Tags[0].Value = Date.now().toString(36);
    cos.putBucketTagging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Tagging: {
          Tags: Tags,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketTagging(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(Tags, data.Tags));
              done();
            }
          );
        }, 1000);
      }
    );
  });
  test('deleteBucketTagging()', function (done) {
    cos.deleteBucketTagging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketTagging(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject([], data.Tags));
              done();
            }
          );
        }, 1000);
      }
    );
  });
  test('putBucketTagging() multi', function (done) {
    Tags[0].Value = Date.now().toString(36);
    cos.putBucketTagging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Tagging: {
          Tags: TagsMulti,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketTagging(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(TagsMulti, data.Tags));
              done();
            }
          );
        }, 1000);
      }
    );
  });
});

group('BucketPolicy', function () {
  var Prefix = Date.now().toString(36);
  var Policy = {
    version: '2.0',
    principal: { qcs: ['qcs::cam::uin/10001:uin/10001'] }, // 这里的 10001 是 QQ 号
    statement: [
      {
        effect: 'allow',
        action: [
          'name/cos:GetBucket',
          'name/cos:PutObject',
          'name/cos:PostObject',
          'name/cos:PutObjectCopy',
          'name/cos:InitiateMultipartUpload',
          'name/cos:UploadPart',
          'name/cos:UploadPartCopy',
          'name/cos:CompleteMultipartUpload',
          'name/cos:AbortMultipartUpload',
          'name/cos:AppendObject',
        ],
        resource: [
          'qcs::cos:' +
            config.Region +
            ':uid/' +
            AppId +
            ':' +
            BucketLongName +
            '//' +
            AppId +
            '/' +
            BucketShortName +
            '/' +
            Prefix +
            '/*',
        ], // 1250000000 是 appid
      },
    ],
  };
  var getRes = function (s) {
    var t = s && s[0];
    var res = t && t.resource && t.resource[0];
    return res;
  };
  test('putBucketPolicy(),getBucketPolicy()', function (done) {
    cos.putBucketPolicy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Policy: Policy,
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketPolicy(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(getRes(Policy.statement) === getRes(data.Policy.Statement));
            done();
          }
        );
      }
    );
  });
  test('putBucketPolicy() s3', function (done) {
    cos.putBucketPolicy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Policy: JSON.stringify(Policy),
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketPolicy(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(getRes(Policy.statement) === getRes(data.Policy.Statement));
            done();
          }
        );
      }
    );
  });
  test('getBucketPolicy() bucket not exist', function (done) {
    cos.getBucketPolicy(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketPolicy() bucket not exist', function (done) {
    cos.putBucketPolicy(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Policy: JSON.stringify(Policy),
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketPolicy() bucket not exist', function (done) {
    cos.deleteBucketPolicy(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Policy: JSON.stringify(Policy),
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketPolicy()', function (done) {
    cos.deleteBucketPolicy(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Policy: JSON.stringify(Policy),
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketPolicy(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(err.ErrorStatus === 'Policy Not Found');
            done();
          }
        );
      }
    );
  });
});

group('BucketLocation', function () {
  test('getBucketLocation()', function (done) {
    cos.getBucketLocation(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        var map1 = {
          tianjin: 'ap-beijing-1',
          'cn-south-2': 'ap-guangzhou-2',
          'cn-south': 'ap-guangzhou',
          'cn-east': 'ap-shanghai',
          'cn-southwest': 'ap-chengdu',
        };
        var map2 = {
          'ap-beijing-1': 'tianjin',
          'ap-guangzhou-2': 'cn-south-2',
          'ap-guangzhou': 'cn-south',
          'ap-shanghai': 'cn-east',
          'ap-chengdu': 'cn-southwest',
        };
        assert.ok(
          data.LocationConstraint === config.Region ||
            data.LocationConstraint === map1[config.Region] ||
            data.LocationConstraint === map2[config.Region]
        );
        done();
      }
    );
  });
});

group('BucketLifecycle', function () {
  var Rules = [
    {
      ID: '1',
      Filter: {
        Prefix: 'test_' + Date.now().toString(36),
      },
      Status: 'Enabled',
      Transition: {
        Date: '2018-07-29T16:00:00.000Z',
        StorageClass: 'STANDARD_IA',
      },
    },
  ];
  var RulesMulti = [
    {
      ID: '1',
      Filter: {
        Prefix: 'test1_' + Date.now().toString(36),
      },
      Status: 'Enabled',
      Transition: {
        Date: '2018-07-29T16:00:00.000Z',
        StorageClass: 'STANDARD_IA',
      },
    },
    {
      ID: '2',
      Filter: {
        Prefix: 'test2_' + Date.now().toString(36),
      },
      Status: 'Enabled',
      Transition: {
        Date: '2018-07-29T16:00:00.000Z',
        StorageClass: 'STANDARD_IA',
      },
    },
  ];
  test('deleteBucketLifecycle()', function (done) {
    cos.deleteBucketLifecycle(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketLifecycle(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject([], data.Rules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketLifecycle(),getBucketLifecycle()', function (done) {
    Rules[0].Filter.Prefix = 'test_' + Date.now().toString(36);
    cos.putBucketLifecycle(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        LifecycleConfiguration: {
          Rules: Rules,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketLifecycle(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(Rules, data && data.Rules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketLifecycle() multi', function (done) {
    Rules[0].Filter.Prefix = 'test_' + Date.now().toString(36);
    cos.putBucketLifecycle(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        LifecycleConfiguration: {
          Rules: RulesMulti,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketLifecycle(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(RulesMulti, data.Rules));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketLifecycle() bucket not exist', function (done) {
    cos.putBucketLifecycle(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        LifecycleConfiguration: {
          Rules: RulesMulti,
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketLifecycle() bucket not exist', function (done) {
    cos.getBucketLifecycle(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketLifecycle() bucket not exist', function (done) {
    cos.deleteBucketLifecycle(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('BucketWebsite', function () {
  var RoutingRules = [
    {
      Condition: {
        HttpErrorCodeReturnedEquals: '404',
      },
      Redirect: {
        Protocol: 'https',
        ReplaceKeyWith: '404.html',
      },
    },
    {
      Condition: {
        KeyPrefixEquals: 'docs/',
      },
      Redirect: {
        Protocol: 'https',
        ReplaceKeyPrefixWith: 'documents/',
      },
    },
    {
      Condition: {
        KeyPrefixEquals: 'img/',
      },
      Redirect: {
        Protocol: 'https',
        ReplaceKeyWith: 'picture.jpg',
      },
    },
  ];
  var WebsiteConfiguration = {
    IndexDocument: {
      Suffix: 'index.html',
    },
    RedirectAllRequestsTo: {
      Protocol: 'https',
    },
    ErrorDocument: {
      Key: 'error.html',
    },
  };
  test('putBucketWebsite(),getBucketWebsite()', function (done) {
    cos.putBucketWebsite(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        WebsiteConfiguration: WebsiteConfiguration,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketWebsite(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              var IndexDocumentIsEqual = comparePlainObject(
                WebsiteConfiguration.IndexDocument,
                data.WebsiteConfiguration.IndexDocument
              );
              var RedirectAllRequestsToIsEqual = comparePlainObject(
                WebsiteConfiguration.RedirectAllRequestsTo,
                data.WebsiteConfiguration.RedirectAllRequestsTo
              );
              var ErrorDocumentIsEqual = comparePlainObject(
                WebsiteConfiguration.ErrorDocument,
                data.WebsiteConfiguration.ErrorDocument
              );
              var isEqual = IndexDocumentIsEqual && RedirectAllRequestsToIsEqual && ErrorDocumentIsEqual;
              assert.ok(isEqual);
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketWebsite() multi RoutingRules', function (done) {
    WebsiteConfiguration.RoutingRules = RoutingRules;
    cos.putBucketWebsite(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        WebsiteConfiguration: WebsiteConfiguration,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketWebsite(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              var IndexDocumentIsEqual = comparePlainObject(
                WebsiteConfiguration.IndexDocument,
                data.WebsiteConfiguration.IndexDocument
              );
              var RedirectAllRequestsToIsEqual = comparePlainObject(
                WebsiteConfiguration.RedirectAllRequestsTo,
                data.WebsiteConfiguration.RedirectAllRequestsTo
              );
              var ErrorDocumentIsEqual = comparePlainObject(
                WebsiteConfiguration.ErrorDocument,
                data.WebsiteConfiguration.ErrorDocument
              );
              var isEqual = IndexDocumentIsEqual && RedirectAllRequestsToIsEqual && ErrorDocumentIsEqual;
              assert.ok(isEqual);
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketWebsite() no WebsiteConfiguration', function (done) {
    cos.putBucketWebsite(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketWebsite() bucket not exist', function (done) {
    cos.putBucketWebsite(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketWebsite() bucket not exist', function (done) {
    cos.getBucketWebsite(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketWebsite() bucket not exist', function (done) {
    cos.deleteBucketWebsite(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketWebsite()', function (done) {
    cos.deleteBucketWebsite(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketWebsite(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject({}, data.WebsiteConfiguration));
              done();
            }
          );
        }, 2000);
      }
    );
  });
});

group('BucketDomain', function () {
  var DomainRule = [
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
  ];
  test('putBucketDomain(),getBucketDomain()', function (done) {
    cos.putBucketDomain(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        DomainRule: DomainRule,
      },
      function (err, data) {
        setTimeout(function () {
          cos.getBucketDomain(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(comparePlainObject(DomainRule, data.DomainRule));
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketDomain() bucket not exist', function (done) {
    cos.putBucketDomain(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        DomainRule: DomainRule,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketDomain() bucket not exist', function (done) {
    cos.getBucketDomain(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketDomain() bucket not exist', function (done) {
    cos.deleteBucketDomain(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  // test('putBucketDomain() multi', function (done) {
  //     cos.putBucketDomain({
  //         Bucket: config.Bucket,
  //         Region: config.Region,
  //         DomainRule: DomainRuleMulti
  //     }, function (err, data) {
  //         assert.ok(!err);
  //         setTimeout(function () {
  //             cos.getBucketDomain({
  //                 Bucket: config.Bucket,
  //                 Region: config.Region
  //             }, function (err, data) {
  //                 assert.ok(comparePlainObject(DomainRuleMulti, data.DomainRule));
  //                 done();
  //             });
  //         }, 2000);
  //     });
  // });
  test('deleteBucketDomain()', function (done) {
    cos.deleteBucketDomain(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketDomain(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(err.statusCode === 404);
              done();
            }
          );
        }, 2000);
      }
    );
  });
});

group('params check Region', function () {
  test('params check', function (done) {
    cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: 'cos.ap-guangzhou',
      },
      function (err, data) {
        assert.ok(err.message === 'param Region should not be start with "cos."');
        done();
      }
    );
  });
  test('params check Region', function (done) {
    cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: 'gz',
      },
      function (err, data) {
        assert.ok(err.message === 'CORS blocked or network error');
        done();
      }
    );
  });
});

group('Key 特殊字符处理', function () {
  test('Key 特殊字符处理', function (done) {
    var Key =
      "中文→↓←→↖↗↙↘! $&'()+,-.0123456789=@ABCDEFGHIJKLMNOPQRSTUV？WXYZ[]^_`abcdefghijklmnopqrstuvwxyz{}~.jpg";
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: 'hello',
      },
      function (err, data) {
        assert.ok(!err);
        cos.deleteObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            Body: 'hello',
          },
          function (err, data) {
            assert.ok(!err);
            cos.deleteMultipleObject(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Objects: {
                  Key: Key,
                },
              },
              function (err, data) {
                assert.ok(!err);
                done();
              }
            );
          }
        );
      }
    );
  });
});

group('Bucket 格式有误', function () {
  test('Bucket 带有中文', function (done) {
    cos.headBucket(
      {
        Bucket: '中文-1250000000',
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
        done();
      }
    );
  });
  test('Bucket 带有 /', function (done) {
    cos.headBucket(
      {
        Bucket: 'te/st-1250000000',
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
        done();
      }
    );
  });
  test('Bucket 带有 .', function (done) {
    cos.headBucket(
      {
        Bucket: 'te.st-1250000000',
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
        done();
      }
    );
  });
  test('Bucket 带有 :', function (done) {
    cos.headBucket(
      {
        Bucket: 'te:st-1250000000',
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
        done();
      }
    );
  });
});

group('Region 格式有误', function () {
  test('Region 带有中文', function (done) {
    cos.headBucket(
      {
        Bucket: 'test-1250000000',
        Region: '中文',
      },
      function (err, data) {
        assert.ok(err && err.message === 'Region format error.');
        done();
      }
    );
  });
  test('Region 带有 /', function (done) {
    cos.headBucket(
      {
        Bucket: 'test-1250000000',
        Region: 'test/',
      },
      function (err, data) {
        assert.ok(err && err.message === 'Region format error.');
        done();
      }
    );
  });
  test('Region 带有 :', function (done) {
    cos.headBucket(
      {
        Bucket: 'test-1250000000',
        Region: 'test:',
      },
      function (err, data) {
        assert.ok(err && err.message === 'Region format error.');
        done();
      }
    );
  });
});

group('复制文件', function () {
  test('sliceCopyFile() 正常分片复制', function (done) {
    var filename = '10m.zip';
    var Key = '10mb.copy.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 10 });
    var lastPercent;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
      },
      function (err, data) {
        cos.sliceCopyFile(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
            CopySliceSize: 5 * 1024 * 1024,
            onProgress: function (info) {
              lastPercent = info.percent;
            },
          },
          function (err, data) {
            assert.ok(data && data.ETag, '成功进行分片复制');
            done();
          }
        );
      }
    );
  });

  test('sliceCopyFile() 单片复制', function (done) {
    var filename = '10m.zip';
    var Key = '10mb.copy.zip';
    cos.sliceCopyFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
        CopySliceSize: 10 * 1024 * 1024,
      },
      function (err, data) {
        if (err) throw err;
        assert.ok(data && data.ETag, '成功进行单片复制');
        done();
      }
    );
  });
});

group('putObject 中文 Content-MD5', function () {
  var fileBlob = dataURItoUploadBody('data:text/plain;base64,5Lit5paH');
  // 这里两个用户正式测试的时候需要给 putObject 计算并加上 Content-MD5 字段
  test('putObject 中文文件内容 带 Content-MD5', function (done) {
    var Key = '中文.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: fileBlob,
      },
      function (err, data) {
        assert.ok(data && data.ETag, '成功进行上传');
        done();
      }
    );
  });
  test('putObject 中文字符串 带 Content-MD5', function (done) {
    var Key = '中文.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        Body: '中文',
      },
      function (err, data) {
        assert.ok(data && data.ETag, '成功进行上传');
        done();
      }
    );
  });
});

group('deleteMultipleObject Key 带中文字符', function () {
  test('deleteMultipleObject Key 带中文字符', function (done) {
    cos.deleteMultipleObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Objects: [
          { Key: '中文/中文.txt' },
          { Key: '中文/中文.zip', VersionId: 'MTg0NDY3NDI1MzM4NzM0ODA2MTI' },
          { Key: unescape(encodeURIComponent('中文')) },
          { Key: unescape('%e8%af%b4%2e%70%72%70%72') },
        ],
      },
      function (err, data) {
        assert.ok(!err, '成功进行批量删除');
        done();
      }
    );
  });
});

group('upload Content-Type', function () {
  // putObject
  test('putObject empty string Content-Type null -> text/plain', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1',
        Body: '',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject string Content-Type null -> text/plain', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: '12345',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject string Content-Type text/xml -> text/xml', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        ContentType: 'text/xml',
        Body: util.createFile({ size: 1, type: 'text/html' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject blob Content-Type text/xml -> text/xml', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: util.createFile({ size: 1, type: 'text/xml' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject blob Content-Type text/html -> text/html', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: util.createFile({ size: 1, type: 'text/html' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/html', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject blob Content-Type null -> application/zip or application/octet-stream', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: util.createFile({ size: 1 }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'application/zip', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject blob Content-Type null application/octet-stream', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1',
        Body: util.createFile({ size: 1 }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject empty blob Content-Type null application/octet-stream', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1',
        Body: util.createFile({ size: 0 }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  // sliceUploadFile
  test('sliceUploadFile string Content-Type null -> text/plain', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: '12345',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile string Content-Type text/xml -> text/xml', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        ContentType: 'text/xml',
        Body: util.createFile({ size: 1, type: 'text/html' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile blob Content-Type text/xml -> text/xml', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        ContentType: 'text/xml',
        Body: util.createFile({ size: 1, type: 'text/html' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile blob Content-Type text/html -> text/html', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: util.createFile({ size: 1, type: 'text/html' }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'text/html', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile blob Content-Type null -> application/zip or application/octet-stream', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.zip',
        Body: util.createFile({ size: 1 }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.zip',
          },
          function (err, data) {
            var userAgent = navigator.userAgent || '';
            var m = userAgent.match(/ TBS\/(\d{6}) /);
            if (location.protocol === 'http:' && m && m[1].length <= 6 && m[1] < '044429') {
              assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
            } else {
              assert.ok(data.headers['content-type'] === 'application/zip', 'Content-Type 正确');
            }
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile blob Content-Type null application/octet-stream', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1',
        Body: util.createFile({ size: 1 }),
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1',
          },
          function (err, data) {
            assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
            done();
          }
        );
      }
    );
  });
});

group('Cache-Control', function (val) {
  var isNormalCacheControl = function (val) {
    return val === undefined || val === 'no-cache' || val === 'max-age=259200';
    // || val === 'no-cache, max-age=259200' // IE 10
    // || val === 'no-cache, max-age=7200' // firefox
  };
  // putObject
  test('putObject Cache-Control: null -> Cache-Control: null or max-age=259200', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(isNormalCacheControl(data.headers['cache-control']), 'cache-control 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject Cache-Control: max-age=7200 -> Cache-Control: max-age=7200', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
        CacheControl: 'max-age=7200',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(data.headers['cache-control'] === 'max-age=7200', 'cache-control 正确');
            done();
          }
        );
      }
    );
  });
  test('putObject Cache-Control: no-cache -> Cache-Control: no-cache', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
        CacheControl: 'no-cache',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(
              data.headers['cache-control'] === 'no-cache' ||
                data.headers['cache-control'] === 'no-cache, max-age=259200',
              'cache-control 正确'
            );
            done();
          }
        );
      }
    );
  });
  // sliceUploadFile
  test('sliceUploadFile Cache-Control: null -> Cache-Control: null or max-age=259200', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
        Headers: {
          'x-cos-traffic-limit': 838860800,
        },
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(
              data.headers['cache-control'] === undefined ||
                data.headers['cache-control'] === 'max-age=259200' ||
                data.headers['cache-control'] === 'no-cache, max-age=259200',
              'cache-control 正确'
            );
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile Cache-Control: max-age=7200 -> Cache-Control: max-age=7200', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
        CacheControl: 'max-age=7200',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(data.headers['cache-control'] === 'max-age=7200', 'cache-control 正确');
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile Cache-Control: no-cache -> Cache-Control: no-cache', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1mb.zip',
        Body: '',
        CacheControl: 'no-cache',
      },
      function (err, data) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(
              data.headers['cache-control'] === 'no-cache' ||
                data.headers['cache-control'] === 'no-cache, max-age=259200',
              'cache-control 正确'
            );
            done();
          }
        );
      }
    );
  });
});

group('BucketLogging', function () {
  var TargetBucket = config.Bucket;
  var TargetPrefix = 'bucket-logging-prefix' + Date.now().toString(36) + '/';
  var BucketLoggingStatus = {
    LoggingEnabled: {
      TargetBucket: TargetBucket,
      TargetPrefix: TargetPrefix,
    },
  };

  test('putBucketLogging(), getBucketLogging()', function (done) {
    cos.putBucketLogging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        BucketLoggingStatus: BucketLoggingStatus,
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketLogging(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(comparePlainObject(BucketLoggingStatus, data.BucketLoggingStatus));
            done();
          }
        );
      }
    );
  });

  test('putBucketLogging() bucket not exist', function (done) {
    cos.putBucketLogging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        BucketLoggingStatus: BucketLoggingStatus,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('getBucketLogging() bucket not exist', function (done) {
    cos.getBucketLogging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('putBucketLogging() 删除 logging 配置', function (done) {
    cos.putBucketLogging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        BucketLoggingStatus: '',
      },
      function (err, data) {
        assert.ok(!err);

        cos.getBucketLogging(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(data.BucketLoggingStatus === '');
            done();
          }
        );
      }
    );
  });
});

group('BucketInventory', function () {
  var TargetBucket = config.Bucket;
  var InventoryConfiguration = {
    Id: 'inventory_test',
    IsEnabled: 'true',
    Destination: {
      COSBucketDestination: {
        Format: 'CSV',
        AccountId: config.Uin,
        Bucket: 'qcs::cos:' + config.Region + '::' + TargetBucket,
        Prefix: 'inventory_prefix_1',
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
    OptionalFields: ['Size'],
  };

  var InventoryConfigurationNoEncryption = {
    Id: 'inventory_test',
    IsEnabled: 'true',
    Destination: {
      COSBucketDestination: {
        Format: 'CSV',
        AccountId: config.Uin,
        Bucket: 'qcs::cos:' + config.Region + '::' + TargetBucket,
        Prefix: 'inventory_prefix_1',
      },
    },
    Schedule: {
      Frequency: 'Daily',
    },
    Filter: {
      Prefix: 'myPrefix',
    },
    IncludedObjectVersions: 'All',
    OptionalFields: ['Size'],
  };

  test('putBucketInventory() bucket not exist', function (done) {
    cos.putBucketInventory(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
        InventoryConfiguration: InventoryConfiguration,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('postBucketInventory() bucket not exist', function (done) {
    cos.postBucketInventory(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
        InventoryConfiguration: InventoryConfiguration,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('getBucketInventory() bucket not exist', function (done) {
    cos.getBucketInventory(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('deleteBucketInventory() bucket not exist', function (done) {
    cos.deleteBucketInventory(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('putBucketInventory(), getBucketInventory()', function (done) {
    cos.putBucketInventory(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
        InventoryConfiguration: InventoryConfiguration,
      },
      function (err, data) {
        assert.ok(!err);

        cos.getBucketInventory(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Id: InventoryConfiguration.Id,
          },
          function (err, data) {
            assert.ok(comparePlainObject(InventoryConfiguration, data.InventoryConfiguration));
            done();
          }
        );
      }
    );
  });

  test('postBucketInventory()', function (done) {
    var inventoryConfig = JSON.parse(JSON.stringify(InventoryConfiguration));
    inventoryConfig.Id = inventoryConfig.Id + Date.now().toString(36);
    delete inventoryConfig.IsEnabled;
    delete inventoryConfig.Schedule;
    cos.postBucketInventory(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Id: inventoryConfig.Id,
        InventoryConfiguration: inventoryConfig,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });

  test('listBucketInventory()', function (done) {
    cos.listBucketInventory(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        var targetInventory;
        data.InventoryConfigurations.forEach(function (item) {
          if (item.Id === InventoryConfiguration.Id) {
            targetInventory = item;
          }
        });
        assert.ok(comparePlainObject(InventoryConfiguration, targetInventory));
        assert.ok(data.IsTruncated === 'false' || data.IsTruncated === 'true');
        done();
      }
    );
  });

  test('putBucketInventory() 不设置 SSECOS', function (done) {
    cos.putBucketInventory(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Id: InventoryConfigurationNoEncryption.Id,
        InventoryConfiguration: InventoryConfigurationNoEncryption,
      },
      function (err, data) {
        assert.ok(!err);

        cos.getBucketInventory(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Id: InventoryConfigurationNoEncryption.Id,
          },
          function (err, data) {
            assert.ok(comparePlainObject(InventoryConfigurationNoEncryption, data.InventoryConfiguration));
            done();
          }
        );
      }
    );
  });

  test('deleteBucketInventory()', function (done) {
    cos.deleteBucketInventory(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Id: InventoryConfiguration.Id,
      },
      function (err, data) {
        assert.ok(!err);
        cos.getBucketInventory(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Id: InventoryConfiguration.Id,
          },
          function (err, data) {
            assert.ok(err && err.statusCode === 404);
            done();
          }
        );
      }
    );
  });
});

var tagging2str = function (obj) {
  var arr = [];
  obj.forEach(function (v) {
    arr.push(v.Key + '=' + encodeURIComponent(v.Value));
  });
  return arr.join('&');
};
group('上传带 tagging', function () {
  var Tags = [
    { Key: 'k1', Value: 'v1' },
    { Key: 'k2', Value: 'v2' },
  ];
  var key = '1.txt';

  test('putObject 带 x-cos-tagging', function (done) {
    Tags[0].Value = Date.now().toString(36);
    var tagStr = tagging2str(Tags);
    // 调用方法
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: 'hello!',
        Headers: {
          'x-cos-tagging': tagStr,
        },
      },
      function (err1, data1) {
        cos.headObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: key,
          },
          function (err2, data2) {
            var taggingCount = data2 && data2.headers['x-cos-tagging-count'];
            assert.ok(taggingCount === '2', '返回 x-cos-tagging-count: ' + taggingCount);
            cos.getObjectTagging(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: key,
              },
              function (err3, data3) {
                assert.ok(comparePlainObject(Tags, data3.Tags));
                done();
              }
            );
          }
        );
      }
    );
  });

  // test('sliceUploadFile 带 x-cos-tagging', function (done) {
  //     Tags[0].Value = Date.now().toString(36);
  //     var tagStr = tagging2str(Tags);
  //     // 调用方法
  //     cos.sliceUploadFile({
  //         Bucket: config.Bucket,
  //         Region: config.Region,
  //         Key: key,
  //         Body: 'hello!',
  //         Headers: {
  //             'x-cos-tagging': tagStr,
  //         },
  //     }, function (err1, data1) {
  //         cos.headObject({
  //             Bucket: config.Bucket,
  //             Region: config.Region,
  //             Key: key,
  //         }, function (err2, data2) {
  //             var taggingCount = data2 && data2.headers['x-cos-tagging-count'];
  //             assert.ok(taggingCount === '1', '返回 x-cos-tagging-count: ' + taggingCount);
  //             cos.getObjectTagging({
  //                 Bucket: config.Bucket,
  //                 Region: config.Region,
  //                 Key: key,
  //             }, function (err3, data3) {
  //                 assert.ok(data3 && data3.Tags && comparePlainObject(Tags, data3.Tags));
  //                 done();
  //             });
  //         });
  //     });
  // });
});

group('ObjectTagging', function () {
  var key = '1.txt';
  var Tags = [
    { Key: 'k1', Value: 'v1' },
    { Key: 'k2', Value: 'v2' },
  ];
  test('putObjectTagging() bucket not exist', function (done) {
    Tags[0].Value = Date.now().toString(36);
    cos.putObjectTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Key: key,
        Tagging: {
          Tags: Tags,
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getObjectTagging() bucket not exist', function (done) {
    cos.getObjectTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Key: key,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteObjectTagging() bucket not exist', function (done) {
    cos.deleteObjectTagging(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        Key: key,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putObjectTagging(),getObjectTagging()', function (done) {
    Tags[0].Value = Date.now().toString(36);
    cos.putObjectTagging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Tagging: {
          Tags: Tags,
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getObjectTagging(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
            },
            function (err, data) {
              assert.ok(comparePlainObject(Tags, data.Tags));
              done();
            }
          );
        }, 1000);
      }
    );
  });
  test('deleteObjectTagging()', function (done) {
    cos.deleteObjectTagging(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getObjectTagging(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
            },
            function (err, data) {
              assert.ok(comparePlainObject([], data.Tags));
              done();
            }
          );
        }, 1000);
      }
    );
  });
});

group('getBucketAccelerate', function () {
  test('putBucketAccelerate() empty AccelerateConfiguration', function (done) {
    cos.putBucketAccelerate(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('putBucketAccelerate() bucket not exist', function (done) {
    cos.putBucketAccelerate(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        AccelerateConfiguration: {
          Status: 'Enabled', // Suspended、Enabled
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });

  test('putBucketAccelerate(),getBucketAccelerate() Enabled', function (done) {
    cos.putBucketAccelerate(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccelerateConfiguration: {
          Status: 'Enabled', // Suspended、Enabled
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketAccelerate(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err2, data2) {
              assert.ok(data2 && data2.AccelerateConfiguration && data2.AccelerateConfiguration.Status === 'Enabled');
              done();
            }
          );
        }, 2000);
      }
    );
  });

  test('putBucketAccelerate(),getBucketAccelerate() Suspended', function (done) {
    cos.putBucketAccelerate(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        AccelerateConfiguration: {
          Status: 'Suspended', // Suspended、Enabled
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketAccelerate(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err2, data2) {
              assert.ok(data2 && data2.AccelerateConfiguration && data2.AccelerateConfiguration.Status === 'Suspended');
              done();
            }
          );
        }, 1000);
      }
    );
  });
});

group('Promise', function () {
  test('headBucket callback', function (done) {
    var res = cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err && data);
        done();
      }
    );
    assert.ok(!res);
  });

  test('Promise() getObjectUrl', function (done) {
    var res = cos.getObjectUrl({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: '123.txt',
      QueryString: 'ab=1',
    });
    assert.ok(!res.then);
    done();
  });

  test('Promise() headBucket', function (done) {
    cos
      .headBucket({
        Bucket: config.Bucket,
        Region: config.Region,
      })
      .then(function (data) {
        assert.ok(data);
        done();
      })
      .catch(function () {
        assert.ok(false);
        done();
      });
  });

  test('headBucket callback', function (done) {
    var res = cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err && data);
        done();
      }
    );
    assert.ok(!res);
  });

  test('Promise() headBucket error', function (done) {
    cos
      .headBucket({
        Bucket: config.Bucket,
        Region: config.Region + '/',
      })
      .then(function (data) {
        assert.ok(!data);
        done();
      })
      .catch(function (err) {
        assert.ok(err && err.message === 'Region format error.');
        done();
      });
  });
});

group('Query 的键值带有特殊字符', function () {
  test('getAuth() 特殊字符', function (done) {
    var content = Date.now().toString();
    var key = '1.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;\'[]\\-=0987654321`~!@#$%^&*()_+{}|":>?<';
        var qs = {};
        qs[str] = str;
        let AuthData = COS.getAuthorization({
          SecretId: config.SecretId,
          SecretKey: config.SecretKey,
          Method: 'get',
          Key: key,
          Scope: [
            {
              action: 'GetObject',
              bucket: config.Bucket,
              region: config.Region,
              prefix: key,
            },
          ],
          Query: qs,
        });
        if (typeof AuthData === 'string') {
          AuthData = { Authorization: AuthData };
        }
        if (!AuthData.Authorization) {
          AuthData.Authorization = COS.getAuthorization({
            SecretId: AuthData.TmpSecretId,
            SecretKey: AuthData.TmpSecretKey,
            Method: 'get',
            Key: key,
            SystemClockOffset: cos.options.SystemClockOffset,
          });
        }
        var link =
          'http://' +
          config.Bucket +
          '.cos.' +
          config.Region +
          '.myqcloud.com' +
          '/' +
          camSafeUrlEncode(key).replace(/%2F/g, '/') +
          '?' +
          AuthData.Authorization +
          (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '') +
          '&' +
          camSafeUrlEncode(str) +
          '=' +
          camSafeUrlEncode(str);
        assert.ok(link);
        done();
        // request({
        //     method: 'GET',
        //     url: link,
        // }, function (err, response, body) {
        //     assert.ok(response.statusCode === 200);
        //     assert.ok(body === content);
        //     done();
        // });
      }
    );
  });
  test('getAuth() 特殊字符 ?sign=', function (done) {
    var content = Date.now().toString();
    var key = '1.txt';
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;\'[]\\-=0987654321`~!@#$%^&*()_+{}|":>?<';
        var qs = {};
        qs[str] = str;
        let AuthData = COS.getAuthorization({
          SecretId: config.SecretId,
          SecretKey: config.SecretKey,
          Method: 'get',
          Key: key,
          Scope: [
            {
              action: 'GetObject',
              bucket: config.Bucket,
              region: config.Region,
              prefix: key,
            },
          ],
          Query: qs,
        });
        if (typeof AuthData === 'string') {
          AuthData = { Authorization: AuthData };
        }
        if (!AuthData.Authorization) {
          AuthData.Authorization = COS.getAuthorization({
            SecretId: AuthData.TmpSecretId,
            SecretKey: AuthData.TmpSecretKey,
            Method: 'get',
            Key: key,
            SystemClockOffset: cos.options.SystemClockOffset,
          });
        }
        var link =
          'http://' +
          config.Bucket +
          '.cos.' +
          config.Region +
          '.myqcloud.com' +
          '/' +
          camSafeUrlEncode(key).replace(/%2F/g, '/') +
          '?sign=' +
          camSafeUrlEncode(AuthData.Authorization) +
          (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '') +
          '&' +
          camSafeUrlEncode(str) +
          '=' +
          camSafeUrlEncode(str);
        assert.ok(link);
        done();
        // request({
        //     method: 'GET',
        //     url: link,
        // }, function (err, response, body) {
        //     assert.ok(response.statusCode === 200);
        //     assert.ok(body === content);
        //     done();
        // });
      }
    );
  });
});

group('selectObjectContent(),selectObjectContentStream()', function () {
  var key = '1.json';
  var selectJsonOpt = {
    Bucket: config.Bucket,
    Region: config.Region,
    Key: key,
    SelectType: 2,
    SelectRequest: {
      Expression: 'Select * from COSObject',
      ExpressionType: 'SQL',
      InputSerialization: { JSON: { Type: 'DOCUMENT' } },
      OutputSerialization: { JSON: { RecordDelimiter: '\n' } },
      RequestProgress: { Enabled: 'FALSE' },
    },
  };
  test('selectObjectContent', function (done) {
    var time = Date.now();
    var content = `{"a":123,"b":"中文${time}","c":{"d":456}}`;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        cos.selectObjectContent(selectJsonOpt, function (err, data) {
          assert.ok(data.Payload === content + '\n');
          done();
        });
      }
    );
  });
  test('selectObjectContent', function (done) {
    var time = Date.now();
    var content = `{"a":123,"b":"${time}","c":{"d":456}`;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: content,
      },
      function (err, data) {
        var bufList = [];
        cos.selectObjectContent(selectJsonOpt, function (err, data) {
          assert.ok(err);
          done();
        });
      }
    );
  });
});

group('BucketReplication', function () {
  var prepared = false;
  // var repBucket = config.Bucket.replace(/^(.*)(-\d+)$/, '$1-replication$2');
  var repBucket = config.ReplicationBucket;
  var repRegion = config.ReplicationRegion;
  var repBucketName = repBucket.replace(/(-\d+)$/, '');
  var prepareBucket = function (callback) {
    cos.putBucketVersioning(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        VersioningConfiguration: {
          Status: 'Enabled',
        },
      },
      function (err, data) {
        if (err) {
          console.log('putBucketVersioning error', err);
          return;
        }
        cos.putBucketVersioning(
          {
            Bucket: repBucket,
            Region: repRegion,
            VersioningConfiguration: {
              Status: 'Enabled',
            },
          },
          function (err, data) {
            if (err) {
              console.log('prepareBucket error', err);
              return;
            }
            prepared = true;
            callback();
          }
        );
      }
    );
  };
  test('putBucketVersioning no VersioningConfiguration', function (done) {
    cos.putBucketVersioning(
      {
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketVersioning bucket not exist', function (done) {
    cos.putBucketVersioning(
      {
        Bucket: Date.now().toString(36) + config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketReplication bucket not exist', function (done) {
    cos.getBucketReplication(
      {
        Bucket: Date.now().toString(36) + config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketReplication bucket not exist', function (done) {
    cos.putBucketReplication(
      {
        Bucket: Date.now().toString(36) + config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketReplication();getBucketReplication()', function (done) {
    var ruleId = Date.now().toString(36);
    prepareBucket(function () {
      cos.putBucketReplication(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          ReplicationConfiguration: {
            Role: 'qcs::cam::uin/10001:uin/10001',
            Rules: [
              {
                ID: ruleId,
                Status: 'Enabled',
                Prefix: 'sync/',
                Destination: {
                  Bucket: `qcs::cos:${repRegion}::${repBucket}`,
                },
              },
            ],
          },
        },
        function (err, data) {
          assert.ok(!err);
          cos.getBucketReplication(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(data.ReplicationConfiguration.Rules[0].ID === ruleId);
              done();
            }
          );
        }
      );
    });
  });
  test('deleteBucketReplication()', function (done) {
    cos.deleteBucketReplication(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        VersioningConfiguration: {
          Status: 'Suspended',
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketReplication(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(err && err.statusCode === 404);
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('deleteBucketReplication() bucket not exist', function (done) {
    cos.deleteBucketReplication(
      {
        Bucket: Date.now().toString(36) + config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        VersioningConfiguration: {
          Status: 'Suspended',
        },
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('putBucketVersioning(),getBucketVersioning()', function () {
  test('Enabled', function (done) {
    cos.deleteBucketReplication(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        VersioningConfiguration: {
          Status: 'Enabled',
        },
      },
      function (err, data) {
        cos.putBucketVersioning(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            VersioningConfiguration: {
              Status: 'Enabled',
            },
          },
          function (err, data) {
            setTimeout(function () {
              cos.getBucketVersioning(
                {
                  Bucket: config.Bucket,
                  Region: config.Region,
                },
                function (err, data) {
                  assert.ok(data.VersioningConfiguration.Status === 'Enabled');
                  done();
                }
              );
            }, 2000);
          }
        );
      }
    );
  });
  test('Suspended', function (done) {
    cos.putBucketVersioning(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        VersioningConfiguration: {
          Status: 'Suspended',
        },
      },
      function (err, data) {
        assert.ok(!err);
        setTimeout(function () {
          cos.getBucketVersioning(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(data.VersioningConfiguration.Status === 'Suspended');
              done();
            }
          );
        }, 2000);
      }
    );
  });
});

group('BucketOrigin', function () {
  var prefix = Date.now().toString(36) + '/';
  var rule = [
    {
      OriginType: 'Mirror',
      OriginCondition: { HTTPStatusCode: 404, Prefix: '' },
      OriginParameter: {
        Protocol: 'HTTP',
        FollowQueryString: 'true',
        HttpHeader: {
          NewHttpHeader: {
            Header: [
              {
                Key: 'a',
                Value: 'a',
              },
            ],
          },
        },
        FollowRedirection: 'true',
        HttpRedirectCode: ['301', '302'],
      },
      OriginInfo: {
        HostInfo: { HostName: 'qq.com' },
        FileInfo: {
          PrefixConfiguration: { Prefix: prefix },
          SuffixConfiguration: { Suffix: '.jpg' },
        },
      },
      RulePriority: 1,
    },
  ];
  test('putBucketOrigin(),getBucketOrigin()', function (done) {
    cos.putBucketOrigin(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        OriginRule: rule,
      },
      function (err, data) {
        cos.getBucketOrigin(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(data.OriginRule[0].OriginInfo.FileInfo.PrefixConfiguration.Prefix === prefix);
            done();
          }
        );
      }
    );
  });
  test('putBucketOrigin() bucket not exist', function (done) {
    cos.putBucketOrigin(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        OriginRule: rule,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketOrigin() bucket not exist', function (done) {
    cos.getBucketOrigin(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketOrigin() bucket not exist', function (done) {
    cos.deleteBucketOrigin(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketOrigin()', function (done) {
    cos.deleteBucketOrigin(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        setTimeout(function () {
          cos.getBucketOrigin(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              assert.ok(err);
              done();
            }
          );
        }, 2000);
      }
    );
  });
});

group('BucketReferer', function () {
  test('putBucketReferer(),getBucketReferer()', function (done) {
    var conf = {
      Status: 'Enabled',
      RefererType: 'White-List',
      DomainList: {
        Domains: [Date.now().toString(36) + '.qq.com', '*.qcloud.com'],
      },
      EmptyReferConfiguration: 'Allow',
    };
    cos.putBucketReferer(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        RefererConfiguration: conf,
      },
      function (err, data) {
        setTimeout(function () {
          cos.getBucketReferer(
            {
              Bucket: config.Bucket,
              Region: config.Region,
            },
            function (err, data) {
              var isEqual =
                comparePlainObject(conf.Status, data.RefererConfiguration.Status) &&
                comparePlainObject(conf.RefererType, data.RefererConfiguration.RefererType) &&
                comparePlainObject(conf.DomainList, data.RefererConfiguration.DomainList) &&
                comparePlainObject(conf.EmptyReferConfiguration, data.RefererConfiguration.EmptyReferConfiguration);
              assert.ok(isEqual);
              done();
            }
          );
        }, 2000);
      }
    );
  });
  test('putBucketReferer() bucket not exist', function (done) {
    var conf = {
      Status: 'Enabled',
      RefererType: 'White-List',
      DomainList: {
        Domains: [Date.now().toString(36) + '.qq.com', '*.qcloud.com'],
      },
      EmptyReferConfiguration: 'Allow',
    };
    cos.putBucketReferer(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
        RefererConfiguration: conf,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketReferer()  no RefererConfiguration', function (done) {
    cos.putBucketReferer(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketReferer() bucket not exist', function (done) {
    cos.getBucketReferer(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
});

group('putBucketEncryption getBucketEncryption', function () {
  test('putBucketEncryption empty', function (done) {
    cos.putBucketEncryption(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        cos.getBucketEncryption(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          function (err, data) {
            assert.ok(data.EncryptionConfiguration.Rules.length === 0);
            done();
          }
        );
      }
    );
  });
  test('putBucketEncryption bucket not exist', function (done) {
    cos.putBucketEncryption(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('getBucketEncryption bucket not exist', function (done) {
    cos.getBucketEncryption(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('deleteBucketEncryption bucket not exist', function (done) {
    cos.deleteBucketEncryption(
      {
        Bucket: Date.now().toString(36) + config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('putBucketEncryption', function (done) {
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
        assert.ok(!err);
        done();
      }
    );
  });
  test('getBucketEncryption', function (done) {
    cos.getBucketEncryption(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('deleteBucketEncryption', function (done) {
    cos.deleteBucketEncryption(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
});

group('restoreObject()', function () {
  test('restoreObject() no RestoreRequest', function (done) {
    cos.restoreObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.jpg',
      },
      function (err, data) {
        assert.ok(err);
        done();
      }
    );
  });
  test('restoreObject()', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.jpg',
        Body: '123',
        StorageClass: 'ARCHIVE',
      },
      function (err, data) {
        assert.ok(!err);
        cos.restoreObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.jpg',
            RestoreRequest: {
              Days: 1,
              CASJobParameters: {
                Tier: 'Expedited',
              },
            },
          },
          function (err, data) {
            assert.ok(data && Math.floor(data.statusCode / 100) === 2);
            done();
          }
        );
      }
    );
  });
});

group('uploadFile()', function () {
  // 高级上传
  test('uploadFile() 高级上传', function (done) {
    var filename = '3m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 3 });
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('uploadFile() 高级上传内容为空', function (done) {
    var filename = '3m.zip';
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: '',
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
  test('uploadFile() 高级上传 大于5mb则分块上传', function (done) {
    var filename = '3m.zip';
    var blob = util.createFile({ size: 1024 * 1024 * 3 });
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
        SliceSize: 1024 * 1024 * 5,
      },
      function (err, data) {
        assert.ok(!err);
        done();
      }
    );
  });
});

group('uploadFiles()', function () {
  test('uploadFiles()', function (done) {
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      EnableTracker: true,
      DeepTracker: true,
      Protocol: 'http',
    });
    var filename = '1.zip';
    cos.uploadFiles(
      {
        files: [
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: filename,
            Body: '123456',
          },
        ],
      },
      function (err, data) {
        assert.ok(!data.files.error);
        done();
      }
    );
  });
});

group('multipartAbort()', function () {
  test('multipartAbort()', function (done) {
    var Key = '1.jpg';
    cos.multipartInit(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
      },
      function (err, data) {
        assert.ok(!err);
        var UploadId = data.UploadId;
        cos.multipartAbort(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            UploadId: UploadId,
          },
          function (err, data) {
            assert.ok(!err);
            cos.multipartListPart(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: Key,
                UploadId: UploadId,
              },
              function (err, data) {
                assert.ok(err);
                done();
              }
            );
          }
        );
      }
    );
  });
});

group('上报', function () {
  test('uploadFile() 上报异常', function (done) {
    try {
      var cos = new COS({
        // 必选参数
        SecretId: config.SecretId,
        SecretKey: config.SecretKey,
        BeaconReporter: {},
        DeepTracker: true,
        CustomId: 'sdk-unit-test',
      });
      cos.headBucket(
        {
          Bucket: config.Bucket,
          Region: config.Region,
        },
        function (err, data) {}
      );
    } catch (e) {
      assert.ok(e.message === 'Beacon not found');
      done();
    }
  });
  test('uploadFile() 上报', function (done) {
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      BeaconReporter: Beacon,
      DeepTracker: true,
      CustomId: 'sdk-unit-test',
    });
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '30mb.zip',
        Body: util.createFile({ size: 1024 * 1024 * 30 }),
        ChunkSize: 1024 * 1024 * 8,
      },
      function (err, data) {
        assert.ok(data);
        done();
      }
    );
  });
  test('headBucket() 上报', function (done) {
    const clsClient = new ClsClient({
      topicId: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx', // 日志主题 id
      region: 'ap-guangzhou', // 日志主题所在地域，比如 ap-guangzhou
      maxRetainDuration: 30, // 默认 30s
      maxRetainSize: 20, // 默认20条
    });
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      ClsReporter: clsClient, // 开启 cls 上报
      CustomId: 'sdk-unit-test',
    });
    cos.headBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      function (err, data) {
        assert.ok(data);
        done();
      }
    );
  });
  test('sliceUploadFile() 上报', function (done) {
    const clsClient = new ClsClient({
      topicId: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx', // 日志主题 id
      region: 'ap-guangzhou', // 日志主题所在地域，比如 ap-guangzhou
      maxRetainDuration: 30, // 默认 30s
      maxRetainSize: 20, // 默认20条
    });
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      ClsReporter: clsClient, // 开启 cls 上报
      CustomId: 'sdk-unit-test',
    });
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '10mb.zip',
        Body: util.createFile({ size: 1024 * 1024 * 10 }),
      },
      function (err, data) {
        assert.ok(data);
        done();
      }
    );
  });
  test('uploadFiles() 上报', function (done) {
    const clsClient = new ClsClient({
      topicId: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx', // 日志主题 id
      region: 'ap-guangzhou', // 日志主题所在地域，比如 ap-guangzhou
      maxRetainDuration: 30, // 默认 30s
      maxRetainSize: 20, // 默认20条
    });
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      ClsReporter: clsClient, // 开启 cls 上报
      CustomId: 'sdk-unit-test',
    });
    cos.uploadFiles(
      {
        files: [
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '10mb-1.zip',
            Body: util.createFile({ size: 1024 * 1024 * 10 }),
          },
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '/10mb-2.zip',
            Body: util.createFile({ size: 1024 * 1024 * 10 }),
          },
        ],
      },
      function (err, data) {
        assert.ok(data);
        done();
      }
    );
  });
  test('getObject() 上报', function (done) {
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      BeaconReporter: Beacon,
      TrackerDelay: 0,
      CustomId: 'sdk-unit-test',
    });
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '2mb.zip',
        Body: util.createFile({ size: 1024 * 1024 * 2 }),
        ChunkSize: 1024 * 1024,
      },
      function (err, data) {
        cos.getObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1mb.zip',
          },
          function (err, data) {
            assert.ok(data);
            done();
          }
        );
      }
    );
  });
  test('sliceCopyFile() 上报', function (done) {
    var cos = new COS({
      // 必选参数
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      BeaconReporter: Beacon,
      DeepTracker: true,
      CustomId: 'sdk-unit-test',
    });
    var key = '10mb.zip';
    cos.uploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: util.createFile({ size: 1024 * 1024 * 10 }),
        ChunkSize: 1024 * 1024 * 5,
        ACL: 'public-read',
      },
      function (err, data) {
        cos.sliceCopyFile(
          {
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: 'sliceCopyFile-' + key,
            CopySource: `${config.Bucket}.cos.${config.Region}.myqcloud.com/${key}`,
            CopySliceSize: 2 * 1024 * 1024, // 指定文件多大时用分片复制，小于数值则用单片复制
          },
          function (err, data) {
            assert.ok(data);
            done();
          }
        );
      }
    );
  });
});

group('sliceUploadFile() 续传', function () {
  test('sliceUploadFile() 续传', function (done) {
    var Key = '3.zip';
    cos.multipartInit(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
      },
      function (err, data) {
        assert.ok(!err);
        var UploadId = data.UploadId;
        cos.multipartUpload(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            UploadId: UploadId,
            PartNumber: 1,
            Body: util.createFile({ size: 1024 * 1024 }),
          },
          function (err, data) {
            assert.ok(!err);
            cos.sliceUploadFile(
              {
                Bucket: config.Bucket,
                Region: config.Region,
                Key: Key,
                Body: util.createFile({ size: 1024 * 1024 * 3 }),
                ChunkSize: 1024 * 1024,
              },
              function (err, data) {
                assert.ok(data);
                done();
              }
            );
          }
        );
      }
    );
  });
});

group('appendObject', function () {
  test('appendObject()', function (done) {
    cos.deleteObject(
      {
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: 'append.txt', // 必须
      },
      function (err, data) {
        assert.ok(!err);
        cos.appendObject(
          {
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: 'append.txt', // 必须
            Body: '123',
            Position: 0,
          },
          function (err, data) {
            assert.ok(!err);
            cos.headObject(
              {
                Bucket: config.Bucket, // Bucket 格式：test-1250000000
                Region: config.Region,
                Key: 'append.txt', // 必须
              },
              function (err, data) {
                assert.ok(!err);
                if (err) return console.log(err);
                // 首先取到要追加的文件当前长度，即需要上送的Position
                var position = data.headers['content-length'];
                cos.appendObject(
                  {
                    Bucket: config.Bucket, // Bucket 格式：test-1250000000
                    Region: config.Region,
                    Key: 'append.txt', // 必须
                    Body: '456',
                    Position: position,
                  },
                  function (err, data) {
                    assert.ok(!err);
                    done();
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

group('request', function () {
  var base64Url =
    'data:image/png;base64,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';
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
  // 需要转为Blob上传
  var body = dataURLtoBlob(base64Url);
  test('putObject pic-operations()', function (done) {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.png',
        Body: body,
      },
      function (err, data) {
        cos.request(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.png',
            Method: 'POST',
            Action: 'image_process',
            Headers: {
              // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
              'Pic-Operations':
                '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.png", "rule": "imageMogr2/thumbnail/20x20/ignore-error/1"}]}',
            },
          },
          function (err, data) {
            assert.ok(!err);
            done();
          }
        );
      }
    );
  });
  test('sliceUploadFile pic-operations()', function (done) {
    cos.sliceUploadFile(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.png',
        Body: body,
        Headers: {
          // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
          'Pic-Operations':
            '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/ignore-error/1"}]}',
        },
      },
      function (err, data) {
        assert.ok(data.UploadResult.ProcessResults);
        done();
      }
    );
  });
  test('request ImageInspect()', function (done) {
    var key = '1.png';
    var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
    var url = 'https://' + host;
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: body,
      },
      function (err, data) {
        cos.request(
          {
            Method: 'GET',
            Key: key,
            Url: url,
            RawBody: true,
            Query: {
              'ci-process': 'ImageInspect' /* 必须，操作类型，异常图片检测固定为：ImageInspect	*/,
            },
          },
          function (err, data) {
            assert.ok(!err);
            done();
          }
        );
      }
    );
  });
});


// group('get json body', function () {
//   // 从 Bucket 里拆出 AppId
//   const AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
//   test('json error()', function (done) {
//       const key = 'dataset'; // 固定值
//       const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
//       const url = `https://${host}/${key}`;
//       cos.request(
//         {
//           Method: 'GET', // 固定值，必须
//           Key: key, // 必须
//           Url: url, // 请求的url，必须
//           Query: {
//             // 数据集名称，同一个账户下唯一。;是否必传：是
//             datasetname: 'test-not-found-112233',
//             // 是否需要实时统计数据集中文件相关信息。有效值： false：不统计，返回的文件的总大小、数量信息可能不正确也可能都为0。 true：需要统计，返回数据集中当前的文件的总大小、数量信息。 默认值为false。;是否必传：否
//             statistics: false,
//           },
//           RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
//           Headers: {
//             // 设置请求体为 json，固定值，必须
//             'Content-Type': 'application/json',
//             // 设置响应体为json，固定值，必须
//             Accept: 'application/json',
//           },
//         },
//         function (err, data) {
//           // TODO 元数据当前只支持北京园区，万象对其他园区没有抛错误码
//           if (config.Region === 'ap-beijing') {
//             assert.ok(err.message === 'dataset not created');
//           } else {
//             assert.ok(JSON.parse(data).Body.Response === null);
//           }
//           done();
//         }
//       );
//   });
// });