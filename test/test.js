/**
 * @jest-environment jsdom
 */
import {describe, expect, jest, test} from '@jest/globals';
import COS from '../index.js';

// config 替换成自己的桶信息
var config = {
	Bucket: process.env.Bucket, // 需提前创建并设置跨域
	Region: process.env.Region,
  ReplicationBucket: process.env.ReplicationBucket, // 存储桶复制时用到的桶，需提前创建并设置跨域
  ReplicationRegion: process.env.ReplicationRegion, // 存储桶复制时用到的桶的地域
  Uin: process.env.Uin,
};

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
      return blob;
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
  }
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
      var content = util.createFile({size: 1024 * 1024 * 10});
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
              params.Expires = (new Date()).toGMTString();
              params.Headers = {
                  'x-cos-meta-test': 'xxx'
              };
          }
          cos.putObject(params, function (err, data) {
              err ? reject(err) : resolve()
          });
      };
      put();
  });
}

var createFileSync = function (size) {
  return util.createFile({size: size});
};

var dataURItoUploadBody = function (dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
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
}


var cos = new COS({
  // 必选参数
  getAuthorization: getAuthorization,
});

var AppId = config.AppId;
var Bucket = config.Bucket;
var BucketShortName = Bucket;
var BucketLongName = Bucket + '-' + AppId;
var TaskId;

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
    jest.setTimeout(60 * 1000);
      fn.apply(this, arguments);
  });
};

var assert = {
  ok: function(val) {
    expect(Boolean(val)).toBeTruthy();
  }
};

group('mock readAsBinaryString', function () {
  test('mock readAsBinaryString', function (done) {
      FileReader.prototype._readAsBinaryString = FileReader.prototype.readAsBinaryString;
      FileReader.prototype.readAsBinaryString = false;
      var filename = '10m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 10});
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
                  cos.sliceUploadFile({
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
                      }
                  }, function (err) {
                      if (hasProgress) {
                          done();
                      }
                  });
              }
          }
      });
  });
});

group('getAuth()', function () {
  test('getAuth()', function (done) {
      var content = Date.now().toString();
      var key = '1.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.options.getAuthorization({
              Method: 'get',
              Key: key,
              Scope: [{
                  action: 'GetObject',
                  bucket: config.Bucket,
                  region: config.Region,
                  prefix: key,
              }],
          }, function (AuthData) {
              if (typeof AuthData === 'string') {
                  AuthData = {Authorization: AuthData};
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
              var link = 'http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' +
                  camSafeUrlEncode(key).replace(/%2F/g, '/') + '?' + AuthData.Authorization +
                  (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
              done();
          });
      });
  });
});

group('getObjectUrl()', function () {
  test('getObjectUrl()', function (done) {
      var content = Date.now().toString();
      var key = '1.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.getObjectUrl({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
          }, function (err, data) {
              expect(typeof data.Url).toBe('string');
              err ? done(err) : done();
          });
      });
  });
});

group('auth check', function () {
  test('auth check', function (done) {
      cos.getBucket({
          Bucket: config.Bucket,
          Region: config.Region,
          Prefix: 'aksjhdlash sajlhj!@#$%^&*()_+=-[]{}\';:"/.<>?.,??sadasd#/.,/~`',
          Headers: {
              'x-cos-test': 'aksjhdlash sajlhj!@#$%^&*()_+=-[]{}\';:\"/.<>?.,??sadasd#/.,/~`',
          },
      }, function (err, data) {
          err ? done(err) : done();
      });
  });
});

group('getBucket(),listObjectVersions()', function () {
  test('正常获取 bucket 里的文件列表', function (done) {
      cos.getBucket({
        Bucket: config.Bucket,
        Region: config.Region
      }, function (err, data) {
        expect(data.Name).toBe(BucketLongName);
        expect(data.Contents).toBeInstanceOf(Array);
        err ? done(err) : done();
      });
  });
  test('正常获取 bucket 里的文件版本列表', function (done) {
    cos.listObjectVersions({
        Bucket: config.Bucket,
        Region: config.Region
    }, function (err, data) {
      expect(data.Name).toBe(BucketLongName);
      expect(data.Versions).toBeInstanceOf(Array);
      err ? done(err) : done();
    });
  });
});

group('putObject(),cancelTask()', function () {
  test('putObject(),cancelTask()', function (done) {
      var filename = '10m.zip';
      var alive = false;
      var canceled = false;
      const file = createFileSync(10 * 1024 * 1024);
      cos.putObject({
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
          }
      }, function (err, data) {
        alive = true;
        err ? done(err) : done();
      });
  });
});

group('sliceUploadFile() 完整上传文件', function () {
  test('sliceUploadFile() 完整上传文件', function (done) {
      var lastPercent;
      var filename = '3m.zip';
      var fileSize = 1024 * 1024 * 3;
      var blob = createFileSync(fileSize)
      cos.abortUploadTask({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Level: 'file',
      }, function (err, data) {
          cos.sliceUploadFile({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
              Body: blob,
              onTaskReady: function (taskId) {
                  TaskId = taskId;
              },
              onProgress: function (info) {
                  lastPercent = info.percent;
              }
          }, function (err, data) {
              expect(data.ETag.length > 0);
              cos.headObject({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: filename,
              }, function (err, data) {
                  const success = data && data.headers && parseInt(data.headers['content-length'] || 0) === fileSize;
                  expect(success);
                  err ? done(err) : done();
              });
          });
      });
  });
  test('sliceUploadFile(),pauseTask(),restartTask()', function (done) {
      var filename = '10m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 10});
      var paused = false;
      var restarted = false;
      cos.abortUploadTask({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Level: 'file',
      }, function (err, data) {
          var TaskId;
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
                      cos.pauseTask(TaskId);
                      paused = true;
                      setTimeout(function () {
                          restarted = true;
                          cos.restartTask(TaskId);
                      }, 1000);
                  }
                  if (paused && restarted) {
                      if (info.percent === 0) return;
                      expect(info.percent > 0.3)
                      cos.cancelTask(TaskId);
                      done();
                  }
              }
          }, function (err, data) {
              paused = true;
          });
      });
  });
  test('sliceUploadFile(),cancelTask(),restartTask()', function (done) {
      var filename = '10m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 3});
      var paused = false;
      cos.abortUploadTask({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Level: 'file',
      }, function (err, data) {
          var TaskId;
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
                      setTimeout(function () {
                          cos.sliceUploadFile({
                              Bucket: config.Bucket,
                              Region: config.Region,
                              Key: filename,
                              Body: blob,
                          }, function (err, data) {
                              err ? done(err) : done();
                          });
                      }, 10);
                  }
              }
          }, function (err, data) {
          });
      });
  });
  test('sliceUploadFile(),cancelTask()', function (done) {
      var filename = '3m.zip';
      var alive = false;
      var canceled = false;
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: util.createFile({size: 1024 * 1024 * 3}),
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
          }
      }, function (err, data) {
          alive = true;
      });
  });
});

group('abortUploadTask()', function () {
  test('abortUploadTask(),Level=task', function (done) {
      var filename = '1m.zip';
      cos.multipartInit({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
      }, function (err, data) {
          cos.abortUploadTask({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
              Level: 'task',
              UploadId: data.UploadId,
          }, function (err, data) {
              var nameExist = false;
              data.successList.forEach(function (item) {
                  if (filename === item.Key) {
                      nameExist = true;
                  }
              });
              assert.ok(data.successList.length >= 1);
              assert.ok(nameExist);
              err ? done(err) : done();
          });
      });
  });
  test('abortUploadTask(),Level=file', function (done) {
      var filename = '1m.zip';
      var blob = util.createFile({size: 1024 * 1024});
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
              cos.abortUploadTask({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Level: 'file',
                  Key: filename,
              }, function (err, data) {
                assert.ok(data.successList.length >= 1);
                assert.ok(data.successList[0] && data.successList[0].Key === filename);
                  err ? done(err) : done();
              });
          }
      });
  });
  test('abortUploadTask(),Level=bucket', function (done) {
      var filename = '1m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 10});
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
              cos.abortUploadTask({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Level: 'bucket',
              }, function (err, data) {
                  var nameExist = false;
                  data.successList.forEach(function (item) {
                      if (filename === item.Key) {
                          nameExist = true;
                      }
                  });
                  assert.ok(data.successList.length >= 1);
                  assert.ok(nameExist);
                  err ? done(err) : done();
              });
          }
      });
  });
});

group('headBucket()', function () {
  test('headBucket()', function (done) {
      cos.headBucket({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          expect(data.statusCode).toBe(200);
          err ? done(err) : done();
      });
  });
  test('getBucket()', function (done) {
      cos.getBucket({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
        assert.ok(data.Name === BucketLongName);
          expect(data.Contents).toBeInstanceOf(Array);
          err ? done(err) : done();
      });
  });
});

group('putObject()', function () {
  var buf = new ArrayBuffer(8);
  var arr = new Uint8Array(buf);
  [0x89, 0xe8,0xaf,0xb4,0x2e,0x70,0x72,0x70,0x72].forEach(function (v, i) {
      arr[i] = v;
  });
  test('putObject()', function (done) {
      var filename = '1.txt';
      var getObjectETag = function (callback) {
          setTimeout(function () {
              cos.headObject({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: filename,
              }, function (err, data) {
                  callback(data && data.headers && data.headers.etag);
              });
          }, 2000);
      };
      var content = Date.now().toString();
      var lastPercent = 0;
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: util.str2blob(content),
          onProgress: function (info) {
              lastPercent = info.percent;
          },
      }, function (err, data) {
          if (err) throw err;
          assert.ok(data.ETag !== undefined);
          getObjectETag(function (ETag) {
            assert.ok(data.ETag === ETag);
              done();
          });
      });
  });

  test('putObject(),string', function (done) {
      var filename = '1.txt';
      var content = '中文_' + Date.now().toString(36);
      var lastPercent = 0;
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: content,
          onProgress: function (info) {
              lastPercent = info.percent;
          },
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
          }, function (err, data) {
            assert.ok(data.Body && data.Body === content && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
  test('putObject(),string,empty', function (done) {
      var content = '';
      var lastPercent = 0;
      var Key = '1.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: content,
          onProgress: function (info) {
              lastPercent = info.percent;
          },
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
          }, function (err, data) {
            assert.ok(data.Body === content && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
  test('putObject(),特殊二进制字符 ArrayBuffer md5', function (done) {
      var content = '';
      var lastPercent = 0;
      var Key = '1.mp4';
      var blob = new Blob([buf]);
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: blob,
          onProgress: function (info) {
              lastPercent = info.percent;
          },
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              BodyType: 'arraybuffer',
          }, function (err, data) {
              var arr = new Uint8Array(data.Body);
              var isSame = arr.every(function (v, i) {
                  return v === arr[i];
              });
              assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
  test('putObject(),特殊二进制字符 Blob md5', function (done) {
      var content = '';
      var lastPercent = 0;
      var Key = '1.mp4';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: buf,
          onProgress: function (info) {
              lastPercent = info.percent;
          },
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              BodyType: 'arraybuffer',
          }, function (err, data) {
              var arr = new Uint8Array(data.Body);
              var isSame = arr.every(function (v, i) {
                  return v === arr[i];
              });
              assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
  test('putObject(),特殊二进制字符 中文 string md5', function (done) {
      var Key = '1.txt';
      var content = '中文';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: content,
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
          }, function (err, data) {
              var isSame = content === data.Body;
              assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
  test('putObject(),特殊二进制字符 unescape string md5', function (done) {
      var Key = '1.txt';
      var content = unescape(encodeURIComponent('中文'));
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: content,
      }, function (err, data) {
          if (err) throw err;
          var ETag = data && data.ETag;
          assert.ok(ETag !== undefined);
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
          }, function (err, data) {
              var isSame = content === data.Body;
              assert.ok(isSame && (data.headers && data.headers.etag) === ETag);
              done();
          });
      });
  });
});

group('getObject()', function () {
  test('getObject() body', function (done) {
      var key = '1.txt';
      var content = Date.now().toString();
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key
          }, function (err, data) {
              if (err) throw err;
              var objectContent = data.Body.toString();
              assert.ok(data.headers['content-length'] === '' + content.length);
              assert.ok(objectContent === content);
              done();
          });
      });
  });
  test('getObject() DataType blob', function (done) {
      var key = '1.txt';
      var content = Date.now().toString();
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
              DataType: 'blob',
          }, function (err, data) {
              if (err) throw err;
              expect(data.Body).toBeInstanceOf(Blob);
              expect(data.headers['content-length'] === '' + content.length);
              done();
          });
      });
  });
  test('getObject() DataType arraybuffer', function (done) {
      var key = '1.txt';
      var content = Date.now().toString();
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.getObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
              DataType: 'arraybuffer',
          }, function (err, data) {
              if (err) throw err;
              expect(data.Body).toBeInstanceOf(ArrayBuffer);
              expect(data.headers['content-length'] === '' + content.length);
              done();
          });
      });
  });
});

group('Key 特殊字符', function () {
  test('Key 特殊字符', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '(!\'*) "#$%&+,-./0123456789:;<=>@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
          Body: Date.now().toString()
      }, function (err, data) {
          if (err) throw err;
          expect(data !== null);
          done();
      });
  });
});

group('putObjectCopy() 1', function () {
  test('putObjectCopy() 1', function (done) {
      var content = Date.now().toString(36);
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.txt',
          Body: content,
      }, function (err, data) {
          var ETag = data.ETag;
          cos.deleteObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.copy.txt',
          }, function (err, data) {
              cos.putObjectCopy({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: '1.copy.txt',
                  CopySource: BucketLongName + '.cos.' + config.Region + '.myqcloud.com/1.txt',
              }, function (err, data) {
                  cos.headObject({
                      Bucket: config.Bucket,
                      Region: config.Region,
                      Key: '1.copy.txt',
                  }, function (err, data) {
                    expect(data.headers && data.headers.etag === ETag);
                      done();
                  });
              });
          });
      });
  });
});

group('putObjectCopy()', function () {
  var filename = '1.txt';
  test('正常复制 object', function (done) {
      cos.putObjectCopy({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.copy.txt',
          CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
      }, function (err, data) {
        expect(data.ETag.length > 0);
          done();
      });
  });
  test('捕获 object 异常', function (done) {
      var errFileName = '12345.txt';
      cos.putObjectCopy({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.copy.txt',
          CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + errFileName,
      }, function (err, data) {
        expect(err.statusCode === 404);
        expect(err.error.Code === 'NoSuchKey');
          done();
      });
  });
});

group('sliceCopyFile()', function () {
  var filename = 'bigger.zip';
  var Key = 'bigger.copy.zip';
  test('正常分片复制 object', function (done) {
      prepareBigObject(true).then(function () {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
          }, function (err, data1) {
              if (err) throw err;
              cos.sliceCopyFile({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: Key,
                  CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/'+ filename,
                  CopySliceSize: 5 * 1024 * 1024,
              },function (err, data) {
                  if (err) throw err;
                  assert.ok(data.ETag.length > 0);
                  cos.headObject({
                      Bucket: config.Bucket,
                      Region: config.Region,
                      Key: Key,
                  }, function (err, data2) {
                      if (err) throw err;
                      ['VersionId', 'ETag', 'RequestId'].forEach(key => {
                          delete data1[key];
                          delete data2[key];
                      });
                      ['x-cos-request-id', 'x-cos-version-id', 'x-cos-replication-status', 'last-modified', 'last-modified', 'etag', 'date', 'expires'].forEach(key => {
                          delete data1.headers[key];
                          delete data2.headers[key];
                      });
                      assert.ok(comparePlainObject(data1, data2));
                      done();
                  });
              });
          });
      }).catch(function () {
          assert.ok(false);
          done();
      });
  });
  test('单片复制 object', function (done) {
      setTimeout(function () {
          prepareBigObject(true).then(function () {
              cos.headObject({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: filename,
              }, function (err, data1) {
                  if (err) throw err;
                  cos.sliceCopyFile({
                      Bucket: config.Bucket,
                      Region: config.Region,
                      Key: Key,
                      CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
                      SliceSize: 10 * 1024 * 1024,
                  }, function (err, data) {
                      if (err) throw err;
                      assert.ok(data.ETag.length > 0);
                      setTimeout(function () {
                          cos.headObject({
                              Bucket: config.Bucket,
                              Region: config.Region,
                              Key: Key,
                          }, function (err, data2) {
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
                          });
                      }, 2000);
                  });
              });
          }).catch(function () {
              done();
          });
      }, 2000);
  });
  test('CopySource nor found', function (done) {
      cos.sliceCopyFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + Date.now(),
      }, function (err, data) {
        assert.ok(err !== null);
          done();
      });
  });
  test('复制归档文件', function (done) {
      var sourceKey = Date.now().toString(36);
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: sourceKey,
          StorageClass: 'ARCHIVE',
      }, function () {
          cos.sliceCopyFile({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + sourceKey,
          }, function (err, data) {
            assert.ok(err !== null);
              done();
          });
      });
  });
});

group('deleteMultipleObject', function () {
  test('deleteMultipleObject()', function (done) {
      var content = Date.now().toString(36);
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.txt',
          Body: content,
      }, function (err, data) {
          cos.putObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '2.txt',
              Body: content,
          }, function (err, data) {
              cos.deleteMultipleObject({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Objects: [
                      {Key: '1.txt'},
                      {Key: '2.txt'},
                  ],
              }, function (err, data) {
                assert.ok(data.Deleted.length === 2);
                  cos.headObject({
                      Bucket: config.Bucket,
                      Region: config.Region,
                      Key: '1.txt',
                  }, function (err, data) {
                    assert.ok(err.statusCode === 404);
                      cos.headObject({
                          Bucket: config.Bucket,
                          Region: config.Region,
                          Key: '2.txt',
                      }, function (err, data) {
                        assert.ok(err.statusCode === 404);
                          done();
                      });
                  });
              });
          });
      });
  });
});

group('BucketAcl', function () {
  var AccessControlPolicy = {
      "Owner": {
          "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 QQ 号
      },
      "Grants": [{
          "Grantee": {
              "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
          },
          "Permission": "READ"
      }]
  };
  var AccessControlPolicy2 = {
      "Owner": {
          "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 QQ 号
      },
      "Grant": {
          "Grantee": {
              "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
          },
          "Permission": "READ"
      }
  };
  test('putBucketAcl() header ACL:private', function (done) {
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: 'private'
      }, function (err, data) {
        assert.ok(!err);
          cos.getBucketAcl({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              AccessControlPolicy.Owner.ID = data.Owner.ID;
              AccessControlPolicy2.Owner.ID = data.Owner.ID;
              assert.ok(data.ACL === 'private' || data.ACL === 'default');
              done();
          });
      });
  });
  test('putBucketAcl() header ACL:public-read', function (done) {
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: 'public-read',
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.ACL === 'public-read');
              done();
          });
      });
  });
  test('putBucketAcl() header ACL:public-read-write', function (done) {
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: 'public-read-write',
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.ACL === 'public-read-write');
              done();
          });
      });
  });
  test('putBucketAcl() header GrantRead:1001,1002', function (done) {
      var GrantRead = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantRead: GrantRead,
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.GrantRead === GrantRead);
              done();
          });
      });
  });
  test('putBucketAcl() header GrantWrite:1001,1002', function (done) {
      var GrantWrite = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantWrite: GrantWrite,
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.GrantWrite === GrantWrite);
              done();
          });
      });
  });
  test('putBucketAcl() header GrantFullControl:1001,1002', function (done) {
      var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantFullControl: GrantFullControl,
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.GrantFullControl === GrantFullControl);
              done();
          });
      });
  });
  test('putBucketAcl() header ACL:public-read, GrantFullControl:1001,1002', function (done) {
      var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"';
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantFullControl: GrantFullControl,
          ACL: 'public-read',
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.GrantFullControl === GrantFullControl);
              assert.ok(data.ACL === 'public-read');
              done();
          });
      });
  });
  test('putBucketAcl() xml', function (done) {
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          AccessControlPolicy: AccessControlPolicy
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.Grants.length === 1);
              assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002', '设置 AccessControlPolicy ID 正确');
              assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', '设置 AccessControlPolicy Permission 正确');
              done();
          });
      });
  });
  test('putBucketAcl() xml2', function (done) {
      cos.putBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          AccessControlPolicy: AccessControlPolicy2,
      }, function (err, data) {
          assert.ok(!err, 'putBucketAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, function (err, data) {
              assert.ok(data.Grants.length === 1);
              assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002');
              assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ');
              done();
          });
      });
  });
  test('putBucketAcl() decodeAcl', function (done) {
      cos.getBucketAcl({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          cos.putBucketAcl({
              Bucket: config.Bucket,
              Region: config.Region,
              GrantFullControl: data.GrantFullControl,
              GrantWrite: data.GrantWrite,
              GrantRead: data.GrantRead,
              ACL: data.ACL,
          }, function (err, data) {
              assert.ok(data);
              done();
          });
      });
  });
});

group('ObjectAcl', function () {
  var AccessControlPolicy = {
      "Owner": {
          "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 QQ 号
      },
      "Grants": [{
          "Grantee": {
              "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
          },
          "Permission": "READ"
      }]
  };
  var AccessControlPolicy2 = {
      "Owner": {
          "ID": 'qcs::cam::uin/10001:uin/10001' // 10001 是 QQ 号
      },
      "Grant": {
          "Grantee": {
              "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
          },
          "Permission": "READ"
      }
  };
  test('putObjectAcl() header ACL:private', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.txt',
          Body: 'hello!',
      }, function (err, data) {
          assert.ok(!err);
          cos.putObjectAcl({
              Bucket: config.Bucket,
              Region: config.Region,
              ACL: 'private',
              Key: '1.txt',
          }, function (err, data) {
              assert.ok(!err, 'putObjectAcl 成功');
              cos.getObjectAcl({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: '1.txt'
              }, function (err, data) {
                  assert.ok(data.ACL = 'private');
                  AccessControlPolicy.Owner.ID = data.Owner.ID;
                  AccessControlPolicy2.Owner.ID = data.Owner.ID;
                  assert.ok(data.Grants.length === 1);
                  done();
              });
          });
      });
  });
  test('putObjectAcl() header ACL:default', function (done) {
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: 'default',
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.txt'
          }, function (err, data) {
              assert.ok(data.ACL = 'default');
              done();
          });
      });
  });
  test('putObjectAcl() header ACL:public-read', function (done) {
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: 'public-read',
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
              assert.ok(data.ACL = 'public-read');
              done();
          });
      });
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
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantRead: GrantRead,
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
              assert.ok(data.GrantRead = GrantRead);
              done();
          });
      });
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
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantFullControl: GrantFullControl,
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
              assert.ok(data.GrantFullControl = GrantFullControl);
              done();
          });
      });
  });
  test('putObjectAcl() header ACL:public-read, GrantRead:1001,1002', function (done) {
      var GrantFullControl = 'id="qcs::cam::uin/1001:uin/1001", id="qcs::cam::uin/1002:uin/1002"';
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          GrantFullControl: GrantFullControl,
          ACL: 'public-read',
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
              assert.ok(data.GrantFullControl = GrantFullControl);
              assert.ok(data.ACL = 'public-read');
              done();
          });
      });
  });
  test('putObjectAcl() xml', function (done) {
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          AccessControlPolicy: AccessControlPolicy,
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, function (err, data) {
              assert.ok(data.Grants.length === 1);
              assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002', '设置 AccessControlPolicy ID 正确');
              assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', '设置 AccessControlPolicy Permission 正确');
              done();
          });
      });
  });
  test('putObjectAcl() xml2', function (done) {
      cos.putObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          AccessControlPolicy: AccessControlPolicy2,
          Key: '1.txt',
      }, function (err, data) {
          assert.ok(!err, 'putObjectAcl 成功');
          cos.getObjectAcl({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.txt'
          }, function (err, data) {
              assert.ok(data.Grants.length === 1);
              assert.ok(data.Grants[0] && data.Grants[0].Grantee.ID === 'qcs::cam::uin/10002:uin/10002', 'ID 正确');
              assert.ok(data.Grants[0] && data.Grants[0].Permission === 'READ', 'Permission 正确');
              done();
          });
      });
  });
  test('putObjectAcl() decodeAcl', function (done) {
      cos.getObjectAcl({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.txt'
      }, function (err, data) {
          cos.putObjectAcl({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.txt',
              GrantFullControl: data.GrantFullControl,
              GrantWrite: data.GrantWrite,
              GrantRead: data.GrantRead,
              ACL: data.ACL,
          }, function (err, data) {
              assert.ok(data);
              done();
          });
      });
  });
});

group('BucketCors', function () {
  var CORSRules = [{
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
      "AllowedHeaders": ["*", 'test-' + Date.now().toString(36)],
      "ExposeHeaders": [
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
      "MaxAgeSeconds": "5"
  }];
  var CORSRulesMulti = [{
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "Date", "Content-Length", "x-cos-acl", "x-cos-version-id", "x-cos-request-id", "x-cos-delete-marker", "x-cos-server-side-encryption"],
      "MaxAgeSeconds": "5"
  }, {
      "AllowedOrigins": ["http://qq.com", "http://qcloud.com"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "Date", "Content-Length", "x-cos-acl", "x-cos-version-id", "x-cos-request-id", "x-cos-delete-marker", "x-cos-server-side-encryption"],
      "MaxAgeSeconds": "5"
  }];
  test('putBucketCors() old CORSConfiguration', function (done) {
      CORSRules[0].AllowedHeaders[1] = 'test-' + Date.now().toString(36);
      cos.putBucketCors({
          Bucket: config.Bucket,
          Region: config.Region,
          CORSConfiguration: {
              CORSRules: CORSRules
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketCors({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(CORSRules, data.CORSRules));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketCors() multi', function (done) {
      cos.putBucketCors({
          Bucket: config.Bucket,
          Region: config.Region,
          CORSConfiguration: {
              CORSRules: CORSRulesMulti
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketCors({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(CORSRulesMulti, data.CORSRules));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketCors() old CORSRules', function (done) {
      CORSRules[0].AllowedHeaders[1] = 'test-' + Date.now().toString(36);
      cos.putBucketCors({
          Bucket: config.Bucket,
          Region: config.Region,
          CORSRules: CORSRules
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketCors({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(CORSRules, data.CORSRules));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketCors(),getBucketCors()', function (done) {
      CORSRules[0].AllowedHeaders = ['*'];
      cos.putBucketCors({
          Bucket: config.Bucket,
          Region: config.Region,
          CORSConfiguration: {
              CORSRules: CORSRules
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketCors({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(CORSRules, data.CORSRules));
                  done();
              });
          }, 2000);
      });
  });
});

group('BucketTagging', function () {
  var Tags = [
      {Key: "k1", Value: "v1"}
  ];
  var TagsMulti = [
      {Key: "k1", Value: "v1"},
      {Key: "k2", Value: "v2"},
  ];
  test('putBucketTagging(),getBucketTagging()', function (done) {
      Tags[0].Value = Date.now().toString(36);
      cos.putBucketTagging({
          Bucket: config.Bucket,
          Region: config.Region,
          Tagging: {
              Tags: Tags
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketTagging({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(Tags, data.Tags));
                  done();
              });
          }, 1000);
      });
  });
  test('deleteBucketTagging()', function (done) {
      cos.deleteBucketTagging({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketTagging({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject([], data.Tags));
                  done();
              });
          }, 1000);
      });
  });
  test('putBucketTagging() multi', function (done) {
      Tags[0].Value = Date.now().toString(36);
      cos.putBucketTagging({
          Bucket: config.Bucket,
          Region: config.Region,
          Tagging: {
              Tags: TagsMulti
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketTagging({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(TagsMulti, data.Tags));
                  done();
              });
          }, 1000);
      });
  });
});

group('BucketPolicy', function () {
  var Prefix = Date.now().toString(36);
  var Policy = {
      "version": "2.0",
      "principal": {"qcs": ["qcs::cam::uin/10001:uin/10001"]}, // 这里的 10001 是 QQ 号
      "statement": [{
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
          "resource": ["qcs::cos:" + config.Region + ":uid/" + AppId + ":" + BucketLongName + "//" + AppId + "/" + BucketShortName + "/" + Prefix + "/*"] // 1250000000 是 appid
      }]
  };
  var getRes = function (s) {
      var t = s && s[0];
      var res = t && t.resource && t.resource[0];
      return res;
  };
  test('putBucketPolicy(),getBucketPolicy()', function (done) {
      cos.putBucketPolicy({
          Bucket: config.Bucket,
          Region: config.Region,
          Policy: Policy
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketPolicy({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(getRes(Policy.statement) === getRes(data.Policy.Statement));
              done();
          });
      });
  });
  test('putBucketPolicy() s3', function (done) {
      cos.putBucketPolicy({
          Bucket: config.Bucket,
          Region: config.Region,
          Policy: JSON.stringify(Policy)
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketPolicy({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(getRes(Policy.statement) === getRes(data.Policy.Statement));
              done();
          });
      });
  });
  test('deleteBucketPolicy()', function (done) {
      cos.deleteBucketPolicy({
          Bucket: config.Bucket,
          Region: config.Region,
          Policy: JSON.stringify(Policy)
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketPolicy({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(err.ErrorStatus === 'Policy Not Found');
              done();
          });
      });
  });
});

// group('BucketLocation', function () {
//   test('getBucketLocation()', function (done) {
//       cos.getBucketLocation({
//           Bucket: config.Bucket,
//           Region: config.Region
//       }, function (err, data) {
//           var map1 = {
//               'tianjin': 'ap-beijing-1',
//               'cn-south-2': 'ap-guangzhou-2',
//               'cn-south': 'ap-guangzhou',
//               'cn-east': 'ap-shanghai',
//               'cn-southwest': 'ap-chengdu',
//           };
//           var map2 = {
//               'ap-beijing-1': 'tianjin',
//               'ap-guangzhou-2': 'cn-south-2',
//               'ap-guangzhou': 'cn-south',
//               'ap-shanghai': 'cn-east',
//               'ap-chengdu': 'cn-southwest',
//           };
//           assert.ok(data.LocationConstraint === config.Region || data.LocationConstraint === map1[config.Region] ||
//               data.LocationConstraint === map2[config.Region]);
//           done();
//       });
//   });
// });

group('BucketLifecycle', function () {
  var Rules = [{
      'ID': '1',
      'Filter': {
          'Prefix': 'test_' + Date.now().toString(36),
      },
      'Status': 'Enabled',
      'Transition': {
          'Date': '2018-07-29T16:00:00.000Z',
          'StorageClass': 'STANDARD_IA'
      }
  }];
  var RulesMulti = [{
      'ID': '1',
      'Filter': {
          'Prefix': 'test1_' + Date.now().toString(36),
      },
      'Status': 'Enabled',
      'Transition': {
          'Date': '2018-07-29T16:00:00.000Z',
          'StorageClass': 'STANDARD_IA'
      }
  }, {
      'ID': '2',
      'Filter': {
          'Prefix': 'test2_' + Date.now().toString(36),
      },
      'Status': 'Enabled',
      'Transition': {
          'Date': '2018-07-29T16:00:00.000Z',
          'StorageClass': 'STANDARD_IA'
      }
  }];
  test('deleteBucketLifecycle()', function (done) {
      cos.deleteBucketLifecycle({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketLifecycle({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject([], data.Rules));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketLifecycle(),getBucketLifecycle()', function (done) {
      Rules[0].Filter.Prefix = 'test_' + Date.now().toString(36);
      cos.putBucketLifecycle({
          Bucket: config.Bucket,
          Region: config.Region,
          LifecycleConfiguration: {
              Rules: Rules
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketLifecycle({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(Rules, data && data.Rules));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketLifecycle() multi', function (done) {
      Rules[0].Filter.Prefix = 'test_' + Date.now().toString(36);
      cos.putBucketLifecycle({
          Bucket: config.Bucket,
          Region: config.Region,
          LifecycleConfiguration: {
              Rules: RulesMulti
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketLifecycle({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(RulesMulti, data.Rules));
                  done();
              });
          }, 2000);
      });
  });
});

group('BucketWebsite', function () {
  var RoutingRules = [{
      Condition: {
          HttpErrorCodeReturnedEquals: "404"
      },
      Redirect: {
          Protocol: "https",
          ReplaceKeyWith: "404.html"
      }
  }, {
      Condition: {
          KeyPrefixEquals: "docs/"
      },
      Redirect: {
          Protocol: "https",
          ReplaceKeyPrefixWith: "documents/"
      }
  }, {
      Condition: {
          KeyPrefixEquals: "img/"
      },
      Redirect: {
          Protocol: "https",
          ReplaceKeyWith: "picture.jpg"
      }
  }];
  var WebsiteConfiguration = {
      IndexDocument: {
          Suffix: "index.html"
      },
      RedirectAllRequestsTo: {
          Protocol: "https"
      },
      ErrorDocument: {
          Key: "error.html"
      },
  };
  test('putBucketWebsite(),getBucketWebsite()', function (done) {
      cos.putBucketWebsite({
          Bucket: config.Bucket,
          Region: config.Region,
          WebsiteConfiguration: WebsiteConfiguration
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketWebsite({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(WebsiteConfiguration, data.WebsiteConfiguration));
                  done();
              });
          }, 2000);
      });
  });
  test('putBucketWebsite() multi RoutingRules', function (done) {
      WebsiteConfiguration.RoutingRules = RoutingRules;
      cos.putBucketWebsite({
          Bucket: config.Bucket,
          Region: config.Region,
          WebsiteConfiguration: WebsiteConfiguration
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketWebsite({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(WebsiteConfiguration, data.WebsiteConfiguration));
                  done();
              });
          }, 2000);
      });
  });
  test('deleteBucketWebsite()', function (done) {
      cos.deleteBucketWebsite({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketWebsite({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject({}, data.WebsiteConfiguration));
                  done();
              });
          }, 2000);
      });
  });
});

group('BucketDomain', function () {
  var DomainRule = [{
      Status: "DISABLED",
      Name: "www.testDomain1.com",
      Type: "REST"
  },
  {
      Status: "DISABLED",
      Name: "www.testDomain2.com",
      Type: "WEBSITE"
  }];
  test('putBucketDomain(),getBucketDomain()', function (done) {
      cos.putBucketDomain({
          Bucket: config.Bucket,
          Region: config.Region,
          DomainRule: DomainRule
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketDomain({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(comparePlainObject(DomainRule, data.DomainRule));
                  done();
              });
          }, 2000);
      });
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
      cos.deleteBucketDomain({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketDomain({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(err.statusCode === 404);
                  done();
              });
          }, 2000);
      });
  });
});

group('params check Region', function () {
  test('params check', function (done) {
      cos.headBucket({
          Bucket: config.Bucket,
          Region: 'cos.ap-guangzhou'
      }, function (err, data) {
          assert.ok(err.message === 'param Region should not be start with "cos."');
          done();
      });
  });
  test('params check Region', function (done) {
      cos.headBucket({
          Bucket: config.Bucket,
          Region: 'gz'
      }, function (err, data) {
        assert.ok(err.message === 'CORS blocked or network error');
        done();
      });
  });
});

group('Key 特殊字符处理', function () {
  test('Key 特殊字符处理', function (done) {
      var Key = '中文→↓←→↖↗↙↘! $&\'()+,-.0123456789=@ABCDEFGHIJKLMNOPQRSTUV？WXYZ[]^_`abcdefghijklmnopqrstuvwxyz{}~.jpg';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: 'hello',
      }, function (err, data) {
          assert.ok(!err);
          cos.deleteObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              Body: 'hello',
          }, function (err, data) {
              assert.ok(!err);
              cos.deleteMultipleObject({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Objects: {
                      Key: Key,
                  },
              }, function (err, data) {
                  assert.ok(!err);
                  done();
              });
          });
      });
  });
});

group('Bucket 格式有误', function () {
  test('Bucket 带有中文', function (done) {
      cos.headBucket({
          Bucket: '中文-1250000000',
          Region: config.Region,
      }, function (err, data) {
          assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
          done();
      });
  });
  test('Bucket 带有 /', function (done) {
      cos.headBucket({
          Bucket: 'te/st-1250000000',
          Region: config.Region,
      }, function (err, data) {
          assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
          done();
      });
  });
  test('Bucket 带有 .', function (done) {
      cos.headBucket({
          Bucket: 'te.st-1250000000',
          Region: config.Region,
      }, function (err, data) {
          assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
          done();
      });
  });
  test('Bucket 带有 :', function (done) {
      cos.headBucket({
          Bucket: 'te:st-1250000000',
          Region: config.Region,
      }, function (err, data) {
          assert.ok(err && err.message === 'Bucket should format as "test-1250000000".');
          done();
      });
  });
});

group('Region 格式有误', function () {
  test('Region 带有中文', function (done) {
      cos.headBucket({
          Bucket: 'test-1250000000',
          Region: '中文',
      }, function (err, data) {
          assert.ok(err && err.message === 'Region format error.');
          done();
      });
  });
  test('Region 带有 /', function (done) {
      cos.headBucket({
          Bucket: 'test-1250000000',
          Region: 'test/',
      }, function (err, data) {
          assert.ok(err && err.message === 'Region format error.');
          done();
      });
  });
  test('Region 带有 :', function (done) {
      cos.headBucket({
          Bucket: 'test-1250000000',
          Region: 'test:',
      }, function (err, data) {
          assert.ok(err && err.message === 'Region format error.');
          done();
      });
  });
});

group('复制文件', function () {
  test('sliceCopyFile() 正常分片复制', function (done) {
      var filename = '10m.zip';
      var Key = '10mb.copy.zip';
      var blob = util.createFile({size: 1024 * 1024 * 10});
      var lastPercent;
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: filename,
          Body: blob,
      }, function (err, data) {
          cos.sliceCopyFile({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
              SliceSize: 5 * 1024 * 1024,
              onProgress: function (info) {
                  lastPercent = info.percent;
              }
          }, function (err, data) {
              assert.ok(data && data.ETag, '成功进行分片复制');
              done();
          });
      });
  });

  test('sliceCopyFile() 单片复制', function (done) {
      var filename = '10m.zip';
      var Key = '10mb.copy.zip';
      cos.sliceCopyFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + filename,
          SliceSize: 10 * 1024 * 1024,
      }, function (err, data) {
          if (err) throw err;
          assert.ok(data && data.ETag, '成功进行单片复制');
          done();
      });
  });
});

group('putObject 中文 Content-MD5', function () {
  var fileBlob = dataURItoUploadBody('data:text/plain;base64,5Lit5paH');
  // 这里两个用户正式测试的时候需要给 putObject 计算并加上 Content-MD5 字段
  test('putObject 中文文件内容 带 Content-MD5', function (done) {
      var Key = '中文.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: fileBlob,
      }, function (err, data) {
          assert.ok(data && data.ETag, '成功进行上传');
          done();
      });
  });
  test('putObject 中文字符串 带 Content-MD5', function (done) {
      var Key = '中文.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          Body: '中文',
      }, function (err, data) {
          assert.ok(data && data.ETag, '成功进行上传');
          done();
      });
  });
});

group('deleteMultipleObject Key 带中文字符', function () {
  test('deleteMultipleObject Key 带中文字符', function (done) {
      cos.deleteMultipleObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Objects: [
              {Key: '中文/中文.txt'},
              {Key: '中文/中文.zip', VersionId: 'MTg0NDY3NDI1MzM4NzM0ODA2MTI'},
              {Key: unescape(encodeURIComponent('中文'))},
              {Key: unescape('%e8%af%b4%2e%70%72%70%72')},
          ]
      }, function (err, data) {
          assert.ok(!err, '成功进行批量删除');
          done();
      });
  });
});

group('upload Content-Type', function () {
  // putObject
  test('putObject empty string Content-Type null -> text/plain', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1',
          Body: '',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject string Content-Type null -> text/plain', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: '12345',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject string Content-Type text/xml -> text/xml', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          ContentType: 'text/xml',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject blob Content-Type text/xml -> text/xml', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          ContentType: 'text/xml',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject blob Content-Type text/html -> text/html', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/html', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject blob Content-Type null -> application/zip or application/octet-stream', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: util.createFile({size: 1}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'application/zip', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject blob Content-Type null application/octet-stream', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1',
          Body: util.createFile({size: 1}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
              done();
          });
      });
  });
  test('putObject empty blob Content-Type null application/octet-stream', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1',
          Body: util.createFile({size: 0}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
              done();
          });
      });
  });
  // sliceUploadFile
  test('sliceUploadFile string Content-Type null -> text/plain', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: '12345',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/plain', 'Content-Type 正确');
              done();
          });
      });
  });
  test('sliceUploadFile string Content-Type text/xml -> text/xml', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          ContentType: 'text/xml',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
              done();
          });
      });
  });
  test('sliceUploadFile blob Content-Type text/xml -> text/xml', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          ContentType: 'text/xml',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/xml', 'Content-Type 正确');
              done();
          });
      });
  });
  test('sliceUploadFile blob Content-Type text/html -> text/html', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: util.createFile({size: 1, type: 'text/html'}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'text/html', 'Content-Type 正确');
              done();
          });
      });
  });
  test('sliceUploadFile blob Content-Type null -> application/zip or application/octet-stream', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.zip',
          Body: util.createFile({size: 1}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.zip',
          }, function (err, data) {
              var userAgent = navigator.userAgent || '';
              var m = userAgent.match(/ TBS\/(\d{6}) /);
              if (location.protocol === 'http:' && m && m[1].length <= 6 && m[1] < '044429') {
                  assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
              } else {
                  assert.ok(data.headers['content-type'] === 'application/zip', 'Content-Type 正确');
              }
              done();
          });
      });
  });
  test('sliceUploadFile blob Content-Type null application/octet-stream', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1',
          Body: util.createFile({size: 1}),
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1',
          }, function (err, data) {
              assert.ok(data.headers['content-type'] === 'application/octet-stream', 'Content-Type 正确');
              done();
          });
      });
  });
});

group('Cache-Control', function (val) {
  var isNormalCacheControl = function (val) {
      return val === undefined
          || val === 'no-cache'
          || val === 'max-age=259200'
          // || val === 'no-cache, max-age=259200' // IE 10
          // || val === 'no-cache, max-age=7200' // firefox
  };
  // putObject
  test('putObject Cache-Control: null -> Cache-Control: null or max-age=259200', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(isNormalCacheControl(data.headers['cache-control']), 'cache-control 正确');
              done();
          });
      });
  });
  test('putObject Cache-Control: max-age=7200 -> Cache-Control: max-age=7200', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
          CacheControl: 'max-age=7200',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(data.headers['cache-control'] === 'max-age=7200', 'cache-control 正确');
              done();
          });
      });
  });
  test('putObject Cache-Control: no-cache -> Cache-Control: no-cache', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
          CacheControl: 'no-cache',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(data.headers['cache-control'] === 'no-cache' || data.headers['cache-control'] === 'no-cache, max-age=259200', 'cache-control 正确');
              done();
          });
      });
  });
  // sliceUploadFile
  test('sliceUploadFile Cache-Control: null -> Cache-Control: null or max-age=259200', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(data.headers['cache-control'] === undefined || data.headers['cache-control'] === 'max-age=259200' || data.headers['cache-control'] === 'no-cache, max-age=259200', 'cache-control 正确');
              done();
          });
      });
  });
  test('sliceUploadFile Cache-Control: max-age=7200 -> Cache-Control: max-age=7200', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
          CacheControl: 'max-age=7200',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(data.headers['cache-control'] === 'max-age=7200', 'cache-control 正确');
              done();
          });
      });
  });
  test('sliceUploadFile Cache-Control: no-cache -> Cache-Control: no-cache', function (done) {
      cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1mb.zip',
          Body: '',
          CacheControl: 'no-cache',
      }, function (err, data) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1mb.zip',
          }, function (err, data) {
              assert.ok(data.headers['cache-control'] === 'no-cache' || data.headers['cache-control'] === 'no-cache, max-age=259200', 'cache-control 正确');
              done();
          });
      });
  });
});

group('BucketLogging', function () {
  var TargetBucket = config.Bucket;
  var TargetPrefix = 'bucket-logging-prefix' + Date.now().toString(36) + '/';
  var BucketLoggingStatus = {
      LoggingEnabled: {
          TargetBucket: TargetBucket,
          TargetPrefix: TargetPrefix
      }
  };

  test('putBucketLogging(), getBucketLogging()', function (done) {
      cos.putBucketLogging({
          Bucket: config.Bucket,
          Region: config.Region,
          BucketLoggingStatus: BucketLoggingStatus
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketLogging({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(comparePlainObject(BucketLoggingStatus, data.BucketLoggingStatus));
              done();
          });
      });
  });

  test('putBucketLogging() 删除 logging 配置', function (done) {
      cos.putBucketLogging({
          Bucket: config.Bucket,
          Region: config.Region,
          BucketLoggingStatus: ''
      }, function (err, data) {
          assert.ok(!err);

          cos.getBucketLogging({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(data.BucketLoggingStatus === '');
              done();
          });
      });
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
                  SSECOS: ''
              }
          }
      },
      Schedule: {
          Frequency: 'Daily'
      },
      Filter: {
          Prefix: 'myPrefix'
      },
      IncludedObjectVersions: 'All',
      OptionalFields: [
          'Size'
      ]
  };

  var InventoryConfigurationNoEncryption = {
      Id: 'inventory_test',
      IsEnabled: 'true',
      Destination: {
          COSBucketDestination: {
              Format: 'CSV',
              AccountId: config.Uin,
              Bucket: 'qcs::cos:' + config.Region + '::' + TargetBucket,
              Prefix: 'inventory_prefix_1'
          }
      },
      Schedule: {
          Frequency: 'Daily'
      },
      Filter: {
          Prefix: 'myPrefix'
      },
      IncludedObjectVersions: 'All',
      OptionalFields: [
          'Size'
      ]
  };

  test('putBucketInventory(), getBucketInventory()', function (done) {
      cos.putBucketInventory({
          Bucket: config.Bucket,
          Region: config.Region,
          Id: InventoryConfiguration.Id,
          InventoryConfiguration: InventoryConfiguration
      }, function (err, data) {
          assert.ok(!err);

          cos.getBucketInventory({
              Bucket: config.Bucket,
              Region: config.Region,
              Id: InventoryConfiguration.Id
          }, function (err, data) {
              assert.ok(comparePlainObject(InventoryConfiguration, data.InventoryConfiguration));
              done();
          });
      });
  });

  test('listBucketInventory()', function (done) {
      cos.listBucketInventory({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          var targetInventory;
          data.InventoryConfigurations.forEach(function (item) {
              if (item.Id === InventoryConfiguration.Id) {
                  targetInventory = item;
              }
          });
          assert.ok(comparePlainObject(InventoryConfiguration, targetInventory));
          assert.ok(data.IsTruncated === 'false' || data.IsTruncated === 'true');
          done();
      });
  });

  test('putBucketInventory() 不设置 SSECOS', function (done) {
      cos.putBucketInventory({
          Bucket: config.Bucket,
          Region: config.Region,
          Id: InventoryConfigurationNoEncryption.Id,
          InventoryConfiguration: InventoryConfigurationNoEncryption
      }, function (err, data) {
          assert.ok(!err);

          cos.getBucketInventory({
              Bucket: config.Bucket,
              Region: config.Region,
              Id: InventoryConfigurationNoEncryption.Id
          }, function (err, data) {
              assert.ok(comparePlainObject(InventoryConfigurationNoEncryption, data.InventoryConfiguration));
              done();
          });
      });
  });

  test('deleteBucketInventory()', function (done) {
      cos.deleteBucketInventory({
          Bucket: config.Bucket,
          Region: config.Region,
          Id: InventoryConfiguration.Id
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketInventory({
              Bucket: config.Bucket,
              Region: config.Region,
              Id: InventoryConfiguration.Id
          }, function (err, data) {
              assert.ok(err && err.statusCode === 404);
              done();
          });
      });
  });
});


var tagging2str = function (obj) {
  var arr = [];
  obj.forEach(function (v) {
      arr.push(v.Key + '=' + encodeURIComponent(v.Value));
  })
  return arr.join('&');
}
group('上传带 tagging', function () {
  var Tags = [
      {Key: "k1", Value: "v1"},
      {Key: "k2", Value: "v2"},
  ];
  var key = '1.txt';

  test('putObject 带 x-cos-tagging', function (done) {
      Tags[0].Value = Date.now().toString(36);
      var tagStr = tagging2str(Tags);
      // 调用方法
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: 'hello!',
          Headers: {
              'x-cos-tagging': tagStr,
          },
      }, function (err1, data1) {
          cos.headObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: key,
          }, function (err2, data2) {
              var taggingCount = data2 && data2.headers['x-cos-tagging-count'];
              assert.ok(taggingCount === '2', '返回 x-cos-tagging-count: ' + taggingCount);
              cos.getObjectTagging({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: key,
              }, function (err3, data3) {
                  assert.ok(comparePlainObject(Tags, data3.Tags));
                  done();
              });
          });
      });
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
      {Key: "k1", Value: "v1"},
      {Key: "k2", Value: "v2"},
  ];
  test('putObjectTagging(),getObjectTagging()', function (done) {
      Tags[0].Value = Date.now().toString(36);
      cos.putObjectTagging({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Tagging: {
              Tags: Tags
          },
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getObjectTagging({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: key,
              }, function (err, data) {
                  assert.ok(comparePlainObject(Tags, data.Tags));
                  done();
              });
          }, 1000);
      });
  });
  test('deleteObjectTagging()', function (done) {
      cos.deleteObjectTagging({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getObjectTagging({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: key,
              }, function (err, data) {
                  assert.ok(comparePlainObject([], data.Tags));
                  done();
              });
          }, 1000);
      });
  });
});

group('getBucketAccelerate', function () {
  test('putBucketAccelerate(),getBucketAccelerate() Enabled', function (done) {
      cos.putBucketAccelerate({
          Bucket: config.Bucket,
          Region: config.Region,
          AccelerateConfiguration: {
              Status: 'Enabled', // Suspended、Enabled
          },
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketAccelerate({
                  Bucket: config.Bucket,
                  Region: config.Region,
              }, function (err2, data2) {
                  assert.ok(data2 && data2.AccelerateConfiguration && data2.AccelerateConfiguration.Status === 'Enabled');
                  done();
              });
          }, 2000);
      });
  });

  test('putBucketAccelerate(),getBucketAccelerate() Suspended', function (done) {
      cos.putBucketAccelerate({
          Bucket: config.Bucket,
          Region: config.Region,
          AccelerateConfiguration: {
              Status: 'Suspended', // Suspended、Enabled
          },
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketAccelerate({
                  Bucket: config.Bucket,
                  Region: config.Region,
              }, function (err2, data2) {
                  assert.ok(data2 && data2.AccelerateConfiguration && data2.AccelerateConfiguration.Status === 'Suspended');
                  done();
              });
          }, 1000);
      });
  });
});

group('Promise', function () {
  test('headBucket callback', function (done) {
      var res = cos.headBucket({
          Bucket: config.Bucket,
          Region: config.Region,
      }, function (err, data) {
          assert.ok(!err && data);
          done();
      });
      assert.ok(!res);
  });

  test('Promise() getObjectUrl', function (done) {
      var res = cos.getObjectUrl({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '123.txt',
      });
      assert.ok(!res.then);
      done();
  });

  test('Promise() headBucket', function (done) {
      cos.headBucket({
          Bucket: config.Bucket,
          Region: config.Region,
      }).then(function (data) {
          assert.ok(data);
          done();
      }).catch(function () {
          assert.ok(false);
          done();
      });
  });

  test('headBucket callback', function (done) {
      var res = cos.headBucket({
          Bucket: config.Bucket,
          Region: config.Region,
      }, function (err, data) {
          assert.ok(!err && data);
          done();
      });
      assert.ok(!res);
  });

  test('Promise() headBucket error', function (done) {
      cos.headBucket({
          Bucket: config.Bucket,
          Region: config.Region + '/',
      }).then(function (data) {
          assert.ok(!data);
          done();
      }).catch(function (err) {
          assert.ok(err && err.message === 'Region format error.');
          done();
      });
  });
});

group('Query 的键值带有特殊字符', function () {
  test('getAuth() 特殊字符', function (done) {
      var content = Date.now().toString();
      var key = '1.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;\'[]\\-=0987654321`~!@#$%^&*()_+{}|":>?<';
          var qs = {};
          qs[str] = str;
          cos.options.getAuthorization({
              Method: 'get',
              Key: key,
              Scope: [{
                  action: 'GetObject',
                  bucket: config.Bucket,
                  region: config.Region,
                  prefix: key,
              }],
              Query: qs,
          }, function (AuthData) {
              if (typeof AuthData === 'string') {
                  AuthData = {Authorization: AuthData};
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
              var link = 'http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' +
                  camSafeUrlEncode(key).replace(/%2F/g, '/') + '?' + AuthData.Authorization +
                  (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '') +
                  '&' + camSafeUrlEncode(str) + '=' + camSafeUrlEncode(str);
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
          });
      });
  });
  test('getAuth() 特殊字符 ?sign=', function (done) {
      var content = Date.now().toString();
      var key = '1.txt';
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;\'[]\\-=0987654321`~!@#$%^&*()_+{}|":>?<';
          var qs = {};
          qs[str] = str;
          cos.options.getAuthorization({
              Method: 'get',
              Key: key,
              Scope: [{
                  action: 'GetObject',
                  bucket: config.Bucket,
                  region: config.Region,
                  prefix: key,
              }],
              Query: qs,
          }, function (AuthData) {
              if (typeof AuthData === 'string') {
                  AuthData = {Authorization: AuthData};
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
              var link = 'http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' +
                  camSafeUrlEncode(key).replace(/%2F/g, '/') +
                  '?sign=' + camSafeUrlEncode(AuthData.Authorization) +
                  (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '') +
                  '&' + camSafeUrlEncode(str) + '=' + camSafeUrlEncode(str);
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
          });
      });
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
          Expression: "Select * from COSObject",
          ExpressionType: "SQL",
          InputSerialization: {JSON: {Type: "DOCUMENT",},},
          OutputSerialization: {JSON: {RecordDelimiter: "\n"},},
          RequestProgress: {Enabled: "FALSE"}
      },
  };
  test('selectObjectContent', function (done) {
      var time = Date.now();
      var content = `{"a":123,"b":"中文${time}","c":{"d":456}}`;
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          cos.selectObjectContent(selectJsonOpt, function (err, data) {
              assert.ok(data.Payload === content + '\n');
              done();
          });
      });
  });
  test('selectObjectContent', function (done) {
      var time = Date.now();
      var content = `{"a":123,"b":"${time}","c":{"d":456}`;
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: key,
          Body: content,
      }, function (err, data) {
          var bufList = [];
          cos.selectObjectContent(selectJsonOpt, function (err, data) {
              assert.ok(err);
              done();
          });
      });
  });
});

group('BucketReplication', function () {
  var prepared = false;
  // var repBucket = config.Bucket.replace(/^(.*)(-\d+)$/, '$1-replication$2');
  var repBucket = config.ReplicationBucket;
  var repRegion = config.ReplicationRegion;
  var repBucketName = repBucket.replace(/(-\d+)$/, '');
  var prepareBucket = function (callback) {
    cos.putBucketVersioning({
      Bucket: config.Bucket,
      Region: config.Region,
      VersioningConfiguration: {
          Status: 'Enabled'
      }
    }, function (err, data) {
        if (err) {
          console.log('putBucketVersioning error', err);
          return;
        }
        cos.putBucketVersioning({
            Bucket: repBucket,
            Region: repRegion,
            VersioningConfiguration: {
                Status: 'Enabled'
            }
        }, function (err, data) {
            if (err) {
              console.log('prepareBucket error', err);
              return;
            }
            prepared = true;
            callback();
        });
    });
  };
  test('putBucketReplication();getBucketReplication()', function (done) {
      var ruleId = Date.now().toString(36);
      prepareBucket(function () {
          cos.putBucketReplication({
              Bucket: config.Bucket,
              Region: config.Region,
              ReplicationConfiguration: {
                  Role: "qcs::cam::uin/10001:uin/10001",
                  Rules: [{
                      ID: ruleId,
                      Status: "Enabled",
                      Prefix: "sync/",
                      Destination: {
                          Bucket: `qcs::cos:${repRegion}::${repBucket}`,
                      }
                  }]
              }
          }, function (err, data) {
              assert.ok(!err);
              cos.getBucketReplication({
                  Bucket: config.Bucket,
                  Region: config.Region,
              }, function (err, data) {
                  assert.ok(data.ReplicationConfiguration.Rules[0].ID === ruleId);
                  done();
              });
          });
      });
  });
  test('deleteBucketReplication()', function (done) {
      cos.deleteBucketReplication({
          Bucket: config.Bucket,
          Region: config.Region,
          VersioningConfiguration: {
              Status: 'Suspended'
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketReplication({
                  Bucket: config.Bucket,
                  Region: config.Region,
              }, function (err, data) {
                  assert.ok(err && err.statusCode === 404);
                  done();
              });
          }, 2000);
      });
  });
});

group('putBucketVersioning(),getBucketVersioning()', function () {
  test('Enabled', function (done) {
      cos.deleteBucketReplication({
          Bucket: config.Bucket,
          Region: config.Region,
          VersioningConfiguration: {
              Status: "Enabled"
          }
      }, function (err, data) {
          cos.putBucketVersioning({
              Bucket: config.Bucket,
              Region: config.Region,
              VersioningConfiguration: {
                  Status: "Enabled"
              }
          }, function (err, data) {
              setTimeout(function () {
                  cos.getBucketVersioning({
                      Bucket: config.Bucket,
                      Region: config.Region,
                  }, function (err, data) {
                      assert.ok(data.VersioningConfiguration.Status === 'Enabled');
                      done();
                  });
              }, 2000);
          });
      });
  });
  test('Suspended', function (done) {
      cos.putBucketVersioning({
          Bucket: config.Bucket,
          Region: config.Region,
          VersioningConfiguration: {
              Status: 'Suspended'
          }
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketVersioning({
                  Bucket: config.Bucket,
                  Region: config.Region,
              }, function (err, data) {
                  assert.ok(data.VersioningConfiguration.Status === 'Suspended');
                  done();
              });
          }, 2000);
      });
  });
});

group('BucketOrigin', function () {
  test('putBucketOrigin(),getBucketOrigin()', function (done) {
      var prefix = Date.now().toString(36) + '/';
      cos.putBucketOrigin({
          Bucket: config.Bucket,
          Region: config.Region,
          OriginRule: [{
              OriginType: 'Mirror',
              OriginCondition: {HTTPStatusCode: 404, Prefix: ''},
              OriginParameter: {
                  Protocol: 'HTTP',
                  FollowQueryString: 'true',
                  HttpHeader: {
                      NewHttpHeader: {
                          Header: [{
                              Key: 'a',
                              Value: 'a'
                          }]
                      }
                  },
                  FollowRedirection: 'true',
                  HttpRedirectCode: ['301', '302']
              },
              OriginInfo: {
                  HostInfo: {HostName: 'qq.com'},
                  FileInfo: {
                      PrefixConfiguration: {Prefix: prefix},
                      SuffixConfiguration: {Suffix: '.jpg'}
                  }
              },
              RulePriority: 1
          }]
      }, function (err, data) {
          assert.ok(!err);
          cos.getBucketOrigin({
              Bucket: config.Bucket,
              Region: config.Region
          }, function (err, data) {
              assert.ok(data.OriginRule[0].OriginInfo.FileInfo.PrefixConfiguration.Prefix === prefix);
              done();
          });
      });
  });
  test('deleteBucketOrigin()', function (done) {
      cos.deleteBucketOrigin({
          Bucket: config.Bucket,
          Region: config.Region
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketOrigin({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  assert.ok(err);
                  done();
              });
          }, 2000);
      });
  });
});

group('BucketReferer', function () {
  test('putBucketReferer(),getBucketReferer()', function (done) {
      var conf = {
          Status: 'Enabled',
          RefererType: 'White-List',
          DomainList: {
              Domains: [Date.now().toString(36) + '.qq.com', '*.qcloud.com']
          },
          EmptyReferConfiguration: 'Allow',
      };
      cos.putBucketReferer({
          Bucket: config.Bucket,
          Region: config.Region,
          RefererConfiguration: conf
      }, function (err, data) {
          assert.ok(!err);
          setTimeout(function () {
              cos.getBucketReferer({
                  Bucket: config.Bucket,
                  Region: config.Region
              }, function (err, data) {
                  var isEqual = comparePlainObject(conf.Status, data.RefererConfiguration.Status) &&
                  comparePlainObject(conf.RefererType, data.RefererConfiguration.RefererType) &&
                  comparePlainObject(conf.DomainList, data.RefererConfiguration.DomainList) &&
                  comparePlainObject(conf.EmptyReferConfiguration, data.RefererConfiguration.EmptyReferConfiguration) &&
                  assert.ok(isEqual);
                  done();
              });
          }, 2000);
      });
  });
});

group('restoreObject()', function () {
  test('restoreObject()', function (done) {
      cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: '1.jpg',
          Body: '123',
          StorageClass: 'ARCHIVE'
      }, function (err, data) {
          assert.ok(!err);
          cos.restoreObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: '1.jpg',
              RestoreRequest: {
                  Days: 1,
                  CASJobParameters: {
                      Tier: 'Expedited'
                  }
              },
          }, function (err, data) {
              assert.ok(data && Math.floor(data.statusCode / 100) === 2);
              done();
          });
      });
  });
});

group('uploadFile()', function () {
  // 高级上传
  test('uploadFile() 高级上传', function (done) {
      var filename = '3m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 3});
      cos.uploadFile({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
      }, function (err, data) {
          assert.ok(!err);
          done();
      });
  });
  test('uploadFile() 高级上传内容为空', function (done) {
      var filename = '3m.zip';
      cos.uploadFile({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: '',
      }, function (err, data) {
          assert.ok(!err);
          done();
      });
  });
  test('uploadFile() 高级上传 大于5mb则分块上传', function (done) {
      var filename = '3m.zip';
      var blob = util.createFile({size: 1024 * 1024 * 3});
      cos.uploadFile({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: filename,
        Body: blob,
        SliceSize: 1024 * 1024 * 5,
      }, function (err, data) {
          assert.ok(!err);
          done();
      });
  });
});


group('uploadFiles()', function () {
  test('uploadFiles()', function (done) {
      var filename = '1.zip';
      cos.uploadFiles({
          files: [{
              Bucket: config.Bucket,
              Region: config.Region,
              Key: filename,
              Body: '123456',
          }],
      }, function (err, data) {
          assert.ok(!data.files.error);
          done();
      });
  });
});

group('multipartAbort()', function () {
  test('multipartAbort()', function (done) {
      var Key = '1.jpg'
      cos.multipartInit({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
      }, function (err, data) {
          assert.ok(!err);
          var UploadId = data.UploadId;
          cos.multipartAbort({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              UploadId: UploadId,
          }, function (err, data) {
              assert.ok(!err);
              cos.multipartListPart({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: Key,
                  UploadId: UploadId,
              }, function (err, data) {
                  assert.ok(err);
                  done();
              });
          });
      });
  });
});

group('sliceUploadFile() 续传', function () {
  test('sliceUploadFile() 续传', function (done) {
      var Key = '3.zip'
      cos.multipartInit({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
      }, function (err, data) {
          assert.ok(!err);
          var UploadId = data.UploadId;
          cos.multipartUpload({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              UploadId: UploadId,
              PartNumber: 1,
              Body: util.createFile({size: 1024 * 1024}),
          }, function (err, data) {
              assert.ok(!err);
              cos.sliceUploadFile({
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: Key,
                  Body: util.createFile({size: 1024 * 1024 * 3}),
                  ChunkSize: 1024 * 1024,
              }, function (err, data) {
                  assert.ok(data);
                  done();
              });
          });
      });
  });
});

group('appendObject', function () {
  test('appendObject()', function (done) {
      cos.deleteObject({
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: 'append.txt', /* 必须 */
      }, function(err, data) {
          assert.ok(!err);
          cos.appendObject({
              Bucket: config.Bucket, // Bucket 格式：test-1250000000
              Region: config.Region,
              Key: 'append.txt', /* 必须 */
              Body: '123',
              Position: 0,
          }, function(err, data) {
              assert.ok(!err);
              cos.headObject({
                  Bucket: config.Bucket, // Bucket 格式：test-1250000000
                  Region: config.Region,
                  Key: 'append.txt', /* 必须 */
              }, function (err, data) {
                  assert.ok(!err);
                  if (err) return console.log(err);
                  // 首先取到要追加的文件当前长度，即需要上送的Position
                  var position = data.headers['content-length'];
                  cos.appendObject({
                          Bucket: config.Bucket, // Bucket 格式：test-1250000000
                          Region: config.Region,
                          Key: 'append.txt', /* 必须 */
                          Body: '456',
                          Position: position,
                      },
                      function (err, data) {
                          assert.ok(!err);
                          done();
                      })
              });
          });
      });
  });
});

// group('数据万象', function () {
//   test('describeMediaBuckets()', function (done) {
//       var host = 'ci.' + config.Region + '.myqcloud.com';
//       var url = 'https://' + host + '/mediabucket';
//       cos.request({
//           Bucket: config.Bucket,
//           Region: config.Region,
//           Method: 'GET',
//           Key: 'mediabucket', /** 固定值，必须 */
//           Url: url,
//           Query: {
//               pageNumber: '1', /** 第几页，非必须 */
//               pageSize: '10', /** 每页个数，非必须 */
//               // regions: 'ap-chengdu', /** 地域信息，例如'ap-beijing'，支持多个值用逗号分隔如'ap-shanghai,ap-beijing'，非必须 */
//               // bucketNames: 'test-1250000000', /** 存储桶名称，精确搜索，例如'test-1250000000'，支持多个值用逗号分隔如'test1-1250000000,test2-1250000000'，非必须 */
//               // bucketName: 'test', /** 存储桶名称前缀，前缀搜索，例如'test'，支持多个值用逗号分隔如'test1,test2'，非必须 */
//           }
//       }, function (err, data) {
//           assert.ok(!err);
//           done();
//       });
//   });
//   test('getMediaInfo()', function (done) {
//       cos.request({
//           Bucket: config.Bucket,
//           Region: config.Region,
//           Method: 'GET',
//           Key: 'test.mp4',
//           Query: {
//               'ci-process': 'videoinfo' /** 固定值，必须 */
//           }
//       }, function (err, data) {
//           assert.ok(!err);
//           done();
//       });
//   });
//   test('getSnapshot()', function (done) {
//       cos.request({
//           Bucket: config.Bucket,
//           Region: config.Region,
//           Method: 'GET',
//           Key: 'test.mp4',
//           Query: {
//               'ci-process': 'snapshot', /** 固定值，必须 */
//               time: 1, /** 截图的时间点，单位为秒，必须 */
//               // width: 0, /** 截图的宽，非必须 */
//               // height: 0, /** 截图的高，非必须 */
//               // format: 'jpg', /** 截图的格式，支持 jpg 和 png，默认 jpg，非必须 */
//               // rotate: 'auto', /** 图片旋转方式，默认为'auto'，非必须 */
//               // mode: 'exactframe', /** 截帧方式，默认为'exactframe'，非必须 */
//           },
//           RawBody: true,
//       },
//       function(err, data){
//           assert.ok(!err);
//           done();
//       });
//   });
// });