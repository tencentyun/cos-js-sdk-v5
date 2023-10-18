var session = require('./session');
var Async = require('./async');
var EventProxy = require('./event').EventProxy;
var util = require('./util');
var Tracker = require('./tracker');

// 文件分块上传全过程，暴露的分块上传接口
function sliceUploadFile(params, callback) {
  var self = this;
  var ep = new EventProxy();
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var Body = params.Body;
  var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;
  var AsyncLimit = params.AsyncLimit;
  var StorageClass = params.StorageClass;
  var ServerSideEncryption = params.ServerSideEncryption;
  var FileSize;

  var onProgress;
  var onHashProgress = params.onHashProgress;

  var tracker = params.tracker;
  tracker && tracker.setParams({ chunkSize: ChunkSize });

  // 上传过程中出现错误，返回错误
  ep.on('error', function (err) {
    if (!self._isRunningTask(TaskId)) return;
    err.UploadId = params.UploadData.UploadId || '';
    return callback(err);
  });

  // 上传分块完成，开始 uploadSliceComplete 操作
  ep.on('upload_complete', function (UploadCompleteData) {
    var _UploadCompleteData = util.extend(
      {
        UploadId: params.UploadData.UploadId || '',
      },
      UploadCompleteData
    );
    callback(null, _UploadCompleteData);
  });

  // 上传分块完成，开始 uploadSliceComplete 操作
  ep.on('upload_slice_complete', function (UploadData) {
    var metaHeaders = {};
    util.each(params.Headers, function (val, k) {
      var shortKey = k.toLowerCase();
      if (shortKey.indexOf('x-cos-meta-') === 0 || shortKey === 'pic-operations') metaHeaders[k] = val;
    });
    uploadSliceComplete.call(
      self,
      {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadData.UploadId,
        SliceList: UploadData.SliceList,
        Headers: metaHeaders,
        tracker: tracker,
      },
      function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        session.removeUsing(UploadData.UploadId);
        if (err) {
          onProgress(null, true);
          return ep.emit('error', err);
        }
        session.removeUploadId.call(self, UploadData.UploadId);
        onProgress({ loaded: FileSize, total: FileSize }, true);
        ep.emit('upload_complete', data);
      }
    );
  });

  // 获取 UploadId 完成，开始上传每个分片
  ep.on('get_upload_data_finish', function (UploadData) {
    // 处理 UploadId 缓存
    var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);
    uuid && session.saveUploadId.call(self, uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
    session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

    // 获取 UploadId
    onProgress(null, true); // 任务状态开始 uploading
    uploadSliceList.call(
      self,
      {
        TaskId: TaskId,
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Body: Body,
        FileSize: FileSize,
        SliceSize: ChunkSize,
        AsyncLimit: AsyncLimit,
        ServerSideEncryption: ServerSideEncryption,
        UploadData: UploadData,
        Headers: params.Headers,
        onProgress: onProgress,
        tracker: tracker,
      },
      function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) {
          onProgress(null, true);
          return ep.emit('error', err);
        }
        ep.emit('upload_slice_complete', data);
      }
    );
  });

  // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
  ep.on('get_file_size_finish', function () {
    onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

    if (params.UploadData.UploadId) {
      ep.emit('get_upload_data_finish', params.UploadData);
    } else {
      var _params = util.extend(
        {
          TaskId: TaskId,
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          Headers: params.Headers,
          StorageClass: StorageClass,
          Body: Body,
          FileSize: FileSize,
          SliceSize: ChunkSize,
          onHashProgress: onHashProgress,
          tracker: tracker,
        },
        params
      );
      getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return ep.emit('error', err);
        params.UploadData.UploadId = UploadData.UploadId;
        params.UploadData.PartList = UploadData.PartList;
        ep.emit('get_upload_data_finish', params.UploadData);
      });
    }
  });

  // 获取上传文件大小
  FileSize = params.ContentLength;
  delete params.ContentLength;
  !params.Headers && (params.Headers = {});
  util.each(params.Headers, function (item, key) {
    if (key.toLowerCase() === 'content-length') {
      delete params.Headers[key];
    }
  });

  // 控制分片大小
  (function () {
    var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
    var AutoChunkSize = 1024 * 1024;
    for (var i = 0; i < SIZE.length; i++) {
      AutoChunkSize = SIZE[i] * 1024 * 1024;
      if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
    }
    params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
  })();

  // 开始上传
  if (FileSize === 0) {
    params.Body = '';
    params.ContentLength = 0;
    params.SkipTask = true;
    self.putObject(params, callback);
  } else {
    ep.emit('get_file_size_finish');
  }
}

// 获取上传任务的 UploadId
function getUploadIdAndPartList(params, callback) {
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var StorageClass = params.StorageClass;
  var self = this;

  // 计算 ETag
  var ETagMap = {};
  var FileSize = params.FileSize;
  var SliceSize = params.SliceSize;
  var SliceCount = Math.ceil(FileSize / SliceSize);
  var FinishSliceCount = 0;
  var FinishSize = 0;
  var onHashProgress = util.throttleOnProgress.call(self, FileSize, params.onHashProgress);
  var getChunkETag = function (PartNumber, callback) {
    var start = SliceSize * (PartNumber - 1);
    var end = Math.min(start + SliceSize, FileSize);
    var ChunkSize = end - start;

    if (ETagMap[PartNumber]) {
      callback(null, {
        PartNumber: PartNumber,
        ETag: ETagMap[PartNumber],
        Size: ChunkSize,
      });
    } else {
      util.fileSlice(params.Body, start, end, false, function (chunkItem) {
        util.getFileMd5(chunkItem, function (err, md5) {
          if (err) return callback(util.error(err));
          var ETag = '"' + md5 + '"';
          ETagMap[PartNumber] = ETag;
          FinishSliceCount += 1;
          FinishSize += ChunkSize;
          onHashProgress({ loaded: FinishSize, total: FileSize });
          callback(null, {
            PartNumber: PartNumber,
            ETag: ETag,
            Size: ChunkSize,
          });
        });
      });
    }
  };

  // 通过和文件的 md5 对比，判断 UploadId 是否可用
  var isAvailableUploadList = function (PartList, callback) {
    var PartCount = PartList.length;
    // 如果没有分片，通过
    if (PartCount === 0) {
      return callback(null, true);
    }
    // 检查分片数量
    if (PartCount > SliceCount) {
      return callback(null, false);
    }
    // 检查分片大小
    if (PartCount > 1) {
      var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);
      if (PartSliceSize !== SliceSize) {
        return callback(null, false);
      }
    }
    // 逐个分片计算并检查 ETag 是否一致
    var next = function (index) {
      if (index < PartCount) {
        var Part = PartList[index];
        getChunkETag(Part.PartNumber, function (err, chunk) {
          if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
            next(index + 1);
          } else {
            callback(null, false);
          }
        });
      } else {
        callback(null, true);
      }
    };
    next(0);
  };

  var ep = new EventProxy();
  ep.on('error', function (errData) {
    if (!self._isRunningTask(TaskId)) return;
    return callback(errData);
  });

  // 存在 UploadId
  ep.on('upload_id_available', function (UploadData) {
    // 转换成 map
    var map = {};
    var list = [];
    util.each(UploadData.PartList, function (item) {
      map[item.PartNumber] = item;
    });
    for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {
      var item = map[PartNumber];
      if (item) {
        item.PartNumber = PartNumber;
        item.Uploaded = true;
      } else {
        item = {
          PartNumber: PartNumber,
          ETag: null,
          Uploaded: false,
        };
      }
      list.push(item);
    }
    UploadData.PartList = list;
    callback(null, UploadData);
  });

  // 不存在 UploadId, 初始化生成 UploadId
  ep.on('no_available_upload_id', function () {
    if (!self._isRunningTask(TaskId)) return;
    var _params = util.extend(
      {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Query: util.clone(params.Query),
        StorageClass: StorageClass,
        Body: params.Body,
        calledBySdk: 'sliceUploadFile',
        tracker: params.tracker,
      },
      params
    );
    var headers = util.clone(params.Headers);
    delete headers['x-cos-mime-limit'];
    _params.Headers = headers;
    self.multipartInit(_params, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (err) return ep.emit('error', err);
      var UploadId = data.UploadId;
      if (!UploadId) {
        return callback(util.error(new Error('no such upload id')));
      }
      ep.emit('upload_id_available', { UploadId: UploadId, PartList: [] });
    });
  });

  // 如果已存在 UploadId，找一个可以用的 UploadId
  ep.on('has_and_check_upload_id', function (UploadIdList) {
    // 串行地，找一个内容一致的 UploadId
    UploadIdList = UploadIdList.reverse();
    Async.eachLimit(
      UploadIdList,
      1,
      function (UploadId, asyncCallback) {
        if (!self._isRunningTask(TaskId)) return;
        // 如果正在上传，跳过
        if (session.using[UploadId]) {
          asyncCallback(); // 检查下一个 UploadId
          return;
        }
        // 判断 UploadId 是否可用
        wholeMultipartListPart.call(
          self,
          {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadId,
            tracker: params.tracker,
          },
          function (err, PartListData) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
              session.removeUsing(UploadId);
              return ep.emit('error', err);
            }
            var PartList = PartListData.PartList;
            PartList.forEach(function (item) {
              item.PartNumber *= 1;
              item.Size *= 1;
              item.ETag = item.ETag || '';
            });
            isAvailableUploadList(PartList, function (err, isAvailable) {
              if (!self._isRunningTask(TaskId)) return;
              if (err) return ep.emit('error', err);
              if (isAvailable) {
                asyncCallback({
                  UploadId: UploadId,
                  PartList: PartList,
                }); // 马上结束
              } else {
                asyncCallback(); // 检查下一个 UploadId
              }
            });
          }
        );
      },
      function (AvailableUploadData) {
        if (!self._isRunningTask(TaskId)) return;
        onHashProgress(null, true);
        if (AvailableUploadData && AvailableUploadData.UploadId) {
          ep.emit('upload_id_available', AvailableUploadData);
        } else {
          ep.emit('no_available_upload_id');
        }
      }
    );
  });

  // 在本地缓存找可用的 UploadId
  ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {
    // 在本地找可用的 UploadId
    var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);
    var LocalUploadIdList = session.getUploadIdList.call(self, uuid);
    if (!uuid || !LocalUploadIdList) {
      ep.emit('has_and_check_upload_id', RemoteUploadIdList);
      return;
    }
    var next = function (index) {
      // 如果本地找不到可用 UploadId，再一个个遍历校验远端
      if (index >= LocalUploadIdList.length) {
        ep.emit('has_and_check_upload_id', RemoteUploadIdList);
        return;
      }
      var UploadId = LocalUploadIdList[index];
      // 如果不在远端 UploadId 列表里，跳过并删除
      if (!util.isInArray(RemoteUploadIdList, UploadId)) {
        session.removeUploadId.call(self, UploadId);
        next(index + 1);
        return;
      }
      // 如果正在上传，跳过
      if (session.using[UploadId]) {
        next(index + 1);
        return;
      }
      // 判断 UploadId 是否存在线上
      wholeMultipartListPart.call(
        self,
        {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          UploadId: UploadId,
          tracker: params.tracker,
        },
        function (err, PartListData) {
          if (!self._isRunningTask(TaskId)) return;
          if (err) {
            // 如果 UploadId 获取会出错，跳过并删除
            session.removeUploadId.call(self, UploadId);
            next(index + 1);
          } else {
            // 找到可用 UploadId
            ep.emit('upload_id_available', {
              UploadId: UploadId,
              PartList: PartListData.PartList,
            });
          }
        }
      );
    };
    next(0);
  });

  // 获取线上 UploadId 列表
  ep.on('get_remote_upload_id_list', function () {
    // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。
    wholeMultipartList.call(
      self,
      {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        tracker: params.tracker,
      },
      function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return ep.emit('error', err);
        // 整理远端 UploadId 列表
        var RemoteUploadIdList = util
          .filter(data.UploadList, function (item) {
            return (
              item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase())
            );
          })
          .reverse()
          .map(function (item) {
            return item.UploadId || item.UploadID;
          });
        if (RemoteUploadIdList.length) {
          ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);
        } else {
          // 远端没有 UploadId，清理缓存的 UploadId
          var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key),
            LocalUploadIdList;
          if (uuid && (LocalUploadIdList = session.getUploadIdList.call(self, uuid))) {
            util.each(LocalUploadIdList, function (UploadId) {
              session.removeUploadId.call(self, UploadId);
            });
          }
          ep.emit('no_available_upload_id');
        }
      }
    );
  });

  // 开始找可用 UploadId
  ep.emit('get_remote_upload_id_list');
}

// 获取符合条件的全部上传任务 (条件包括 Bucket, Region, Prefix)
function wholeMultipartList(params, callback) {
  var self = this;
  var UploadList = [];
  var sendParams = {
    Bucket: params.Bucket,
    Region: params.Region,
    Prefix: params.Key,
    calledBySdk: params.calledBySdk || 'sliceUploadFile',
    tracker: params.tracker,
  };
  var next = function () {
    self.multipartList(sendParams, function (err, data) {
      if (err) return callback(err);
      UploadList.push.apply(UploadList, data.Upload || []);
      if (data.IsTruncated === 'true') {
        // 列表不完整
        sendParams.KeyMarker = data.NextKeyMarker;
        sendParams.UploadIdMarker = data.NextUploadIdMarker;
        next();
      } else {
        callback(null, { UploadList: UploadList });
      }
    });
  };
  next();
}

// 获取指定上传任务的分块列表
function wholeMultipartListPart(params, callback) {
  var self = this;
  var PartList = [];
  var sendParams = {
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    UploadId: params.UploadId,
    calledBySdk: 'sliceUploadFile',
    tracker: params.tracker,
  };
  var next = function () {
    self.multipartListPart(sendParams, function (err, data) {
      if (err) return callback(err);
      PartList.push.apply(PartList, data.Part || []);
      if (data.IsTruncated === 'true') {
        // 列表不完整
        sendParams.PartNumberMarker = data.NextPartNumberMarker;
        next();
      } else {
        callback(null, { PartList: PartList });
      }
    });
  };
  next();
}

// 上传文件分块，包括
/*
 UploadId (上传任务编号)
 AsyncLimit (并发量)，
 SliceList (上传的分块数组)，
 FilePath (本地文件的位置)，
 SliceSize (文件分块大小)
 FileSize (文件大小)
 onProgress (上传成功之后的回调函数)
 */
function uploadSliceList(params, cb) {
  var self = this;
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadData = params.UploadData;
  var FileSize = params.FileSize;
  var SliceSize = params.SliceSize;
  var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);
  var Body = params.Body;
  var SliceCount = Math.ceil(FileSize / SliceSize);
  var FinishSize = 0;
  var ServerSideEncryption = params.ServerSideEncryption;
  var Headers = params.Headers;
  var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {
    if (SliceItem['Uploaded']) {
      FinishSize += SliceItem['PartNumber'] >= SliceCount ? FileSize % SliceSize || SliceSize : SliceSize;
    }
    return !SliceItem['Uploaded'];
  });
  var onProgress = params.onProgress;

  Async.eachLimit(
    needUploadSlices,
    ChunkParallel,
    function (SliceItem, asyncCallback) {
      if (!self._isRunningTask(TaskId)) return;
      var PartNumber = SliceItem['PartNumber'];
      var currentSize =
        Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
      var preAddSize = 0;
      uploadSliceItem.call(
        self,
        {
          TaskId: TaskId,
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          SliceSize: SliceSize,
          FileSize: FileSize,
          PartNumber: PartNumber,
          ServerSideEncryption: ServerSideEncryption,
          Body: Body,
          UploadData: UploadData,
          Headers: Headers,
          onProgress: function (data) {
            FinishSize += data.loaded - preAddSize;
            preAddSize = data.loaded;
            onProgress({ loaded: FinishSize, total: FileSize });
          },
          tracker: params.tracker,
        },
        function (err, data) {
          if (!self._isRunningTask(TaskId)) return;
          if (!err && !data.ETag)
            err =
              'get ETag error, please add "ETag" to CORS ExposeHeader setting.( 获取ETag失败，请在CORS ExposeHeader设置中添加ETag，请参考文档：https://cloud.tencent.com/document/product/436/13318 )';
          if (err) {
            FinishSize -= preAddSize;
          } else {
            FinishSize += currentSize - preAddSize;
            SliceItem.ETag = data.ETag;
          }
          onProgress({ loaded: FinishSize, total: FileSize });
          asyncCallback(err || null, data);
        }
      );
    },
    function (err) {
      if (!self._isRunningTask(TaskId)) return;
      if (err) return cb(err);
      cb(null, {
        UploadId: UploadData.UploadId,
        SliceList: UploadData.PartList,
      });
    }
  );
}

// 上传指定分片
function uploadSliceItem(params, callback) {
  var self = this;
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var FileSize = params.FileSize;
  var FileBody = params.Body;
  var PartNumber = params.PartNumber * 1;
  var SliceSize = params.SliceSize;
  var ServerSideEncryption = params.ServerSideEncryption;
  var UploadData = params.UploadData;
  var Headers = params.Headers || {};
  var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;

  var start = SliceSize * (PartNumber - 1);

  var ContentLength = SliceSize;

  var end = start + SliceSize;

  if (end > FileSize) {
    end = FileSize;
    ContentLength = end - start;
  }

  var headersWhiteList = ['x-cos-traffic-limit', 'x-cos-mime-limit'];
  var headers = {};
  util.each(Headers, function (v, k) {
    if (headersWhiteList.indexOf(k) > -1) {
      headers[k] = v;
    }
  });

  var PartItem = UploadData.PartList[PartNumber - 1];
  Async.retry(
    ChunkRetryTimes,
    function (tryCallback) {
      if (!self._isRunningTask(TaskId)) return;
      util.fileSlice(FileBody, start, end, true, function (Body) {
        self.multipartUpload(
          {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            ContentLength: ContentLength,
            PartNumber: PartNumber,
            UploadId: UploadData.UploadId,
            ServerSideEncryption: ServerSideEncryption,
            Body: Body,
            Headers: headers,
            onProgress: params.onProgress,
            calledBySdk: 'sliceUploadFile',
            tracker: params.tracker,
          },
          function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return tryCallback(err);
            PartItem.Uploaded = true;
            return tryCallback(null, data);
          }
        );
      });
    },
    function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      return callback(err, data);
    }
  );
}

// 完成分块上传
function uploadSliceComplete(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadId = params.UploadId;
  var SliceList = params.SliceList;
  var self = this;
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var Headers = params.Headers;
  var Parts = SliceList.map(function (item) {
    return {
      PartNumber: item.PartNumber,
      ETag: item.ETag,
    };
  });
  // 完成上传的请求也做重试
  Async.retry(
    ChunkRetryTimes,
    function (tryCallback) {
      self.multipartComplete(
        {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          UploadId: UploadId,
          Parts: Parts,
          Headers: Headers,
          calledBySdk: 'sliceUploadFile',
          tracker: params.tracker,
        },
        tryCallback
      );
    },
    function (err, data) {
      callback(err, data);
    }
  );
}

// 抛弃分块上传任务
/*
 AsyncLimit (抛弃上传任务的并发量)，
 UploadId (上传任务的编号，当 Level 为 task 时候需要)
 Level (抛弃分块上传任务的级别，task : 抛弃指定的上传任务，file ： 抛弃指定的文件对应的上传任务，其他值 ：抛弃指定Bucket 的全部上传任务)
 */
function abortUploadTask(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadId = params.UploadId;
  var Level = params.Level || 'task';
  var AsyncLimit = params.AsyncLimit;
  var self = this;

  var ep = new EventProxy();

  ep.on('error', function (errData) {
    return callback(errData);
  });

  // 已经获取到需要抛弃的任务列表
  ep.on('get_abort_array', function (AbortArray) {
    abortUploadTaskArray.call(
      self,
      {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Headers: params.Headers,
        AsyncLimit: AsyncLimit,
        AbortArray: AbortArray,
      },
      callback
    );
  });

  if (Level === 'bucket') {
    // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务
    wholeMultipartList.call(
      self,
      {
        Bucket: Bucket,
        Region: Region,
        calledBySdk: 'abortUploadTask',
      },
      function (err, data) {
        if (err) return callback(err);
        ep.emit('get_abort_array', data.UploadList || []);
      }
    );
  } else if (Level === 'file') {
    // 文件级别的任务抛弃，抛弃该文件的全部上传任务
    if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
    wholeMultipartList.call(
      self,
      {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        calledBySdk: 'abortUploadTask',
      },
      function (err, data) {
        if (err) return callback(err);
        ep.emit('get_abort_array', data.UploadList || []);
      }
    );
  } else if (Level === 'task') {
    // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务
    if (!UploadId) return callback(util.error(new Error('abort_upload_task_no_id')));
    if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
    ep.emit('get_abort_array', [
      {
        Key: Key,
        UploadId: UploadId,
      },
    ]);
  } else {
    return callback(util.error(new Error('abort_unknown_level')));
  }
}

// 批量抛弃分块上传任务
function abortUploadTaskArray(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var AbortArray = params.AbortArray;
  var AsyncLimit = params.AsyncLimit || 1;
  var self = this;

  var index = 0;
  var resultList = new Array(AbortArray.length);
  Async.eachLimit(
    AbortArray,
    AsyncLimit,
    function (AbortItem, nextItem) {
      var eachIndex = index;
      if (Key && Key !== AbortItem.Key) {
        resultList[eachIndex] = { error: { KeyNotMatch: true } };
        nextItem(null);
        return;
      }
      var UploadId = AbortItem.UploadId || AbortItem.UploadID;

      self.multipartAbort(
        {
          Bucket: Bucket,
          Region: Region,
          Key: AbortItem.Key,
          Headers: params.Headers,
          UploadId: UploadId,
        },
        function (err) {
          var task = {
            Bucket: Bucket,
            Region: Region,
            Key: AbortItem.Key,
            UploadId: UploadId,
          };
          resultList[eachIndex] = { error: err, task: task };
          nextItem(null);
        }
      );
      index++;
    },
    function (err) {
      if (err) return callback(err);

      var successList = [];
      var errorList = [];

      for (var i = 0, len = resultList.length; i < len; i++) {
        var item = resultList[i];
        if (item['task']) {
          if (item['error']) {
            errorList.push(item['task']);
          } else {
            successList.push(item['task']);
          }
        }
      }

      return callback(null, {
        successList: successList,
        errorList: errorList,
      });
    }
  );
}

// 高级上传
function uploadFile(params, callback) {
  var self = this;

  // 判断多大的文件使用分片上传
  var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

  var taskList = [];

  var Body = params.Body;
  var FileSize = Body.size || Body.length || 0;
  var fileInfo = { TaskId: '' };

  // 上传链路
  if (self.options.EnableTracker) {
    const accelerate =
      self.options.UseAccelerate ||
      (typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.'));
    params.tracker = new Tracker({
      bucket: params.Bucket,
      region: params.Region,
      apiName: 'uploadFile',
      fileKey: params.Key,
      fileSize: FileSize,
      accelerate,
      deepTracker: self.options.DeepTracker,
      customId: self.options.CustomId,
      delay: self.options.TrackerDelay,
    });
  }

  // 整理 option，用于返回给回调
  util.each(params, function (v, k) {
    if (typeof v !== 'object' && typeof v !== 'function') {
      fileInfo[k] = v;
    }
  });

  // 处理文件 TaskReady
  var _onTaskReady = params.onTaskReady;
  var onTaskReady = function (tid) {
    fileInfo.TaskId = tid;
    _onTaskReady && _onTaskReady(tid);
  };
  params.onTaskReady = onTaskReady;

  // 添加上传任务,超过阈值使用分块上传，小于等于则简单上传
  var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

  // 处理文件完成
  var _onFileFinish = params.onFileFinish;
  var onFileFinish = function (err, data) {
    // 格式化上报参数并上报
    params.tracker && params.tracker.formatResult(err, data);
    _onFileFinish && _onFileFinish(err, data, fileInfo);
    callback && callback(err, data);
  };

  taskList.push({
    api: api,
    params: params,
    callback: onFileFinish,
  });

  self._addTasks(taskList);
}

// 批量上传文件
function uploadFiles(params, callback) {
  var self = this;

  // 判断多大的文件使用分片上传
  var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

  // 汇总返回进度
  var TotalSize = 0;
  var TotalFinish = 0;
  var onTotalProgress = util.throttleOnProgress.call(self, TotalFinish, params.onProgress);

  // 汇总返回回调
  var unFinishCount = params.files.length;
  var _onTotalFileFinish = params.onFileFinish;
  var resultList = Array(unFinishCount);
  var onTotalFileFinish = function (err, data, options) {
    onTotalProgress(null, true);
    _onTotalFileFinish && _onTotalFileFinish(err, data, options);
    resultList[options.Index] = {
      options: options,
      error: err,
      data: data,
    };
    if (--unFinishCount <= 0 && callback) {
      callback(null, { files: resultList });
    }
  };

  // 开始处理每个文件
  var taskList = [];
  util.each(params.files, function (fileParams, index) {
    (function () {
      // 对齐 nodejs 缩进

      var Body = fileParams.Body;
      var FileSize = Body.size || Body.length || 0;
      var fileInfo = { Index: index, TaskId: '' };

      // 如果 批量上传的 Key 是 / 开头，强制去掉第一个 /
      if (!self.options.UseRawKey && fileParams.Key && fileParams.Key.substr(0, 1) === '/') {
        fileParams.Key = fileParams.Key.substr(1);
      }

      // 更新文件总大小
      TotalSize += FileSize;

      // 单个文件上传链路
      if (self.options.EnableTracker) {
        const accelerate =
          self.options.UseAccelerate ||
          (typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.'));
        fileParams.tracker = new Tracker({
          bucket: fileParams.Bucket,
          region: fileParams.Region,
          apiName: 'uploadFiles',
          fileKey: fileParams.Key,
          fileSize: FileSize,
          accelerate,
          deepTracker: self.options.DeepTracker,
          customId: self.options.CustomId,
          delay: self.options.TrackerDelay,
        });
      }

      // 整理 option，用于返回给回调
      util.each(fileParams, function (v, k) {
        if (typeof v !== 'object' && typeof v !== 'function') {
          fileInfo[k] = v;
        }
      });

      // 处理单个文件 TaskReady
      var _onTaskReady = fileParams.onTaskReady;
      var onTaskReady = function (tid) {
        fileInfo.TaskId = tid;
        _onTaskReady && _onTaskReady(tid);
      };
      fileParams.onTaskReady = onTaskReady;

      // 处理单个文件进度
      var PreAddSize = 0;
      var _onProgress = fileParams.onProgress;
      var onProgress = function (info) {
        TotalFinish = TotalFinish - PreAddSize + info.loaded;
        PreAddSize = info.loaded;
        _onProgress && _onProgress(info);
        onTotalProgress({ loaded: TotalFinish, total: TotalSize });
      };
      fileParams.onProgress = onProgress;

      // 添加上传任务
      var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject';

      // 处理单个文件完成
      var _onFileFinish = fileParams.onFileFinish;
      var onFileFinish = function (err, data) {
        // 格式化上报参数并上报
        fileParams.tracker && fileParams.tracker.formatResult(err, data);
        _onFileFinish && _onFileFinish(err, data);
        onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
      };

      taskList.push({
        api: api,
        params: fileParams,
        callback: onFileFinish,
      });
    })();
  });
  self._addTasks(taskList);
}

// 分片复制文件
function sliceCopyFile(params, callback) {
  var ep = new EventProxy();

  var self = this;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var CopySource = params.CopySource;
  var m = util.getSourceParams.call(this, CopySource);
  if (!m) {
    callback(util.error(new Error('CopySource format error')));
    return;
  }

  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
  var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;
  CopySliceSize = Math.max(0, CopySliceSize);

  var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;
  var ChunkParallel = this.options.CopyChunkParallelLimit;
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;

  var ChunkCount = 0;
  var FinishSize = 0;
  var FileSize;
  var onProgress;
  var SourceResHeaders = {};
  var SourceHeaders = {};
  var TargetHeader = {};

  // 分片复制完成，开始 multipartComplete 操作
  ep.on('copy_slice_complete', function (UploadData) {
    var metaHeaders = {};
    util.each(params.Headers, function (val, k) {
      if (k.toLowerCase().indexOf('x-cos-meta-') === 0) metaHeaders[k] = val;
    });
    var Parts = util.map(UploadData.PartList, function (item) {
      return {
        PartNumber: item.PartNumber,
        ETag: item.ETag,
      };
    });
    // 完成上传的请求也做重试
    Async.retry(
      ChunkRetryTimes,
      function (tryCallback) {
        self.multipartComplete(
          {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadData.UploadId,
            Parts: Parts,
            calledBySdk: 'sliceCopyFile',
          },
          tryCallback
        );
      },
      function (err, data) {
        session.removeUsing(UploadData.UploadId); // 标记 UploadId 没被使用了，因为复制没提供重试，所以只要出错，就是 UploadId 停用了。
        if (err) {
          onProgress(null, true);
          return callback(err);
        }
        session.removeUploadId(UploadData.UploadId);
        onProgress({ loaded: FileSize, total: FileSize }, true);
        callback(null, data);
      }
    );
  });

  ep.on('get_copy_data_finish', function (UploadData) {
    // 处理 UploadId 缓存
    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    uuid && session.saveUploadId(uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
    session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

    var needCopySlices = util.filter(UploadData.PartList, function (SliceItem) {
      if (SliceItem['Uploaded']) {
        FinishSize += SliceItem['PartNumber'] >= ChunkCount ? FileSize % ChunkSize || ChunkSize : ChunkSize;
      }
      return !SliceItem['Uploaded'];
    });
    Async.eachLimit(
      needCopySlices,
      ChunkParallel,
      function (SliceItem, asyncCallback) {
        var PartNumber = SliceItem.PartNumber;
        var CopySourceRange = SliceItem.CopySourceRange;
        var currentSize = SliceItem.end - SliceItem.start;
        Async.retry(
          ChunkRetryTimes,
          function (tryCallback) {
            copySliceItem.call(
              self,
              {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                CopySource: CopySource,
                UploadId: UploadData.UploadId,
                PartNumber: PartNumber,
                CopySourceRange: CopySourceRange,
              },
              tryCallback
            );
          },
          function (err, data) {
            if (err) return asyncCallback(err);
            FinishSize += currentSize;
            onProgress({ loaded: FinishSize, total: FileSize });
            SliceItem.ETag = data.ETag;
            asyncCallback(err || null, data);
          }
        );
      },
      function (err) {
        if (err) {
          session.removeUsing(UploadData.UploadId); // 标记 UploadId 没被使用了，因为复制没提供重试，所以只要出错，就是 UploadId 停用了。
          onProgress(null, true);
          return callback(err);
        }
        ep.emit('copy_slice_complete', UploadData);
      }
    );
  });

  ep.on('get_chunk_size_finish', function () {
    var createNewUploadId = function () {
      self.multipartInit(
        {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          Headers: TargetHeader,
        },
        function (err, data) {
          if (err) return callback(err);
          params.UploadId = data.UploadId;
          ep.emit('get_copy_data_finish', { UploadId: params.UploadId, PartList: params.PartList });
        }
      );
    };

    // 在本地找可用的 UploadId
    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    var LocalUploadIdList = session.getUploadIdList(uuid);
    if (!uuid || !LocalUploadIdList) return createNewUploadId();

    var next = function (index) {
      // 如果本地找不到可用 UploadId，再一个个遍历校验远端
      if (index >= LocalUploadIdList.length) return createNewUploadId();
      var UploadId = LocalUploadIdList[index];
      // 如果正在被使用，跳过
      if (session.using[UploadId]) return next(index + 1);
      // 判断 UploadId 是否存在线上
      wholeMultipartListPart.call(
        self,
        {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          UploadId: UploadId,
        },
        function (err, PartListData) {
          if (err) {
            // 如果 UploadId 获取会出错，跳过并删除
            session.removeUploadId(UploadId);
            next(index + 1);
          } else {
            // 如果异步回来 UploadId 已经被用了，也跳过
            if (session.using[UploadId]) return next(index + 1);
            // 找到可用 UploadId
            var finishETagMap = {};
            var offset = 0;
            util.each(PartListData.PartList, function (PartItem) {
              var size = parseInt(PartItem.Size);
              var end = offset + size - 1;
              finishETagMap[PartItem.PartNumber + '|' + offset + '|' + end] = PartItem.ETag;
              offset += size;
            });
            util.each(params.PartList, function (PartItem) {
              var ETag = finishETagMap[PartItem.PartNumber + '|' + PartItem.start + '|' + PartItem.end];
              if (ETag) {
                PartItem.ETag = ETag;
                PartItem.Uploaded = true;
              }
            });
            ep.emit('get_copy_data_finish', { UploadId: UploadId, PartList: params.PartList });
          }
        }
      );
    };
    next(0);
  });

  ep.on('get_file_size_finish', function () {
    // 控制分片大小
    (function () {
      var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
      var AutoChunkSize = 1024 * 1024;
      for (var i = 0; i < SIZE.length; i++) {
        AutoChunkSize = SIZE[i] * 1024 * 1024;
        if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
      }
      params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
      ChunkCount = Math.ceil(FileSize / ChunkSize);

      var list = [];
      for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
        var start = (partNumber - 1) * ChunkSize;
        var end = partNumber * ChunkSize < FileSize ? partNumber * ChunkSize - 1 : FileSize - 1;
        var item = {
          PartNumber: partNumber,
          start: start,
          end: end,
          CopySourceRange: 'bytes=' + start + '-' + end,
        };
        list.push(item);
      }
      params.PartList = list;
    })();

    if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {
      TargetHeader = params.Headers;
    } else {
      TargetHeader = SourceHeaders;
    }
    TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];
    TargetHeader = util.clearKey(TargetHeader);
    /**
     * 对于归档存储的对象，如果未恢复副本，则不允许 Copy
     */
    if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE' || SourceHeaders['x-cos-storage-class'] === 'DEEP_ARCHIVE') {
      var restoreHeader = SourceHeaders['x-cos-restore'];
      if (!restoreHeader || restoreHeader === 'ongoing-request="true"') {
        callback(util.error(new Error('Unrestored archive object is not allowed to be copied')));
        return;
      }
    }
    /**
     * 去除一些无用的头部，规避 multipartInit 出错
     * 这些头部通常是在 putObjectCopy 时才使用
     */
    delete TargetHeader['x-cos-copy-source'];
    delete TargetHeader['x-cos-metadata-directive'];
    delete TargetHeader['x-cos-copy-source-If-Modified-Since'];
    delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];
    delete TargetHeader['x-cos-copy-source-If-Match'];
    delete TargetHeader['x-cos-copy-source-If-None-Match'];
    ep.emit('get_chunk_size_finish');
  });

  // 获取远端复制源文件的大小
  self.headObject(
    {
      Bucket: SourceBucket,
      Region: SourceRegion,
      Key: SourceKey,
    },
    function (err, data) {
      if (err) {
        if (err.statusCode && err.statusCode === 404) {
          callback(util.error(err, { ErrorStatus: SourceKey + ' Not Exist' }));
        } else {
          callback(err);
        }
        return;
      }

      FileSize = params.FileSize = data.headers['content-length'];
      if (FileSize === undefined || !FileSize) {
        callback(
          util.error(
            new Error(
              'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.（ 获取Content-Length失败，请在CORS ExposeHeader设置中添加Content-Length，请参考文档：https://cloud.tencent.com/document/product/436/13318 ）'
            )
          )
        );
        return;
      }

      onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

      // 开始上传
      if (FileSize <= CopySliceSize) {
        if (!params.Headers['x-cos-metadata-directive']) {
          params.Headers['x-cos-metadata-directive'] = 'Copy';
        }
        self.putObjectCopy(params, function (err, data) {
          if (err) {
            onProgress(null, true);
            return callback(err);
          }
          onProgress({ loaded: FileSize, total: FileSize }, true);
          callback(err, data);
        });
      } else {
        var resHeaders = data.headers;
        SourceResHeaders = resHeaders;
        SourceHeaders = {
          'Cache-Control': resHeaders['cache-control'],
          'Content-Disposition': resHeaders['content-disposition'],
          'Content-Encoding': resHeaders['content-encoding'],
          'Content-Type': resHeaders['content-type'],
          Expires: resHeaders['expires'],
          'x-cos-storage-class': resHeaders['x-cos-storage-class'],
        };
        util.each(resHeaders, function (v, k) {
          var metaPrefix = 'x-cos-meta-';
          if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
            SourceHeaders[k] = v;
          }
        });
        ep.emit('get_file_size_finish');
      }
    }
  );
}

// 复制指定分片
function copySliceItem(params, callback) {
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var CopySource = params.CopySource;
  var UploadId = params.UploadId;
  var PartNumber = params.PartNumber * 1;
  var CopySourceRange = params.CopySourceRange;

  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var self = this;

  Async.retry(
    ChunkRetryTimes,
    function (tryCallback) {
      self.uploadPartCopy(
        {
          TaskId: TaskId,
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          CopySource: CopySource,
          UploadId: UploadId,
          PartNumber: PartNumber,
          CopySourceRange: CopySourceRange,
        },
        function (err, data) {
          tryCallback(err || null, data);
        }
      );
    },
    function (err, data) {
      return callback(err, data);
    }
  );
}

var API_MAP = {
  sliceUploadFile: sliceUploadFile,
  abortUploadTask: abortUploadTask,
  uploadFile: uploadFile,
  uploadFiles: uploadFiles,
  sliceCopyFile: sliceCopyFile,
};

module.exports.init = function (COS, task) {
  task.transferToTaskMethod(API_MAP, 'sliceUploadFile');
  util.each(API_MAP, function (fn, apiName) {
    COS.prototype[apiName] = util.apiWrapper(apiName, fn);
  });
};
