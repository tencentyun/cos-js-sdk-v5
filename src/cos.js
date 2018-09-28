'use strict';

var util = require('./util');
var event = require('./event');
var task = require('./task');
var base = require('./base');
var advance = require('./advance');

var defaultOptions = {
    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
    SecretId: '',
    SecretKey: '',
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkRetryTimes: 3,
    ChunkSize: 1024 * 1024,
    SliceSize: 1024 * 1024,
    CopyChunkParallelLimit: 20,
    CopyChunkSize: 1024 * 1024 * 10,
    CopySliceSize: 1024 * 1024 * 10,
    ProgressInterval: 1000,
    UploadQueueSize: 10000,
    Domain: '',
    ServiceDomain: '',
    Protocol: '',
    CompatibilityMode: false,
    UploadIdCacheLimit: 50,
    ForcePathStyle: false,
};

// 对外暴露的类
var COS = function (options) {
    this.options = util.extend(util.clone(defaultOptions), options || {});
    this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);
    this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);
    this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);
    this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);
    this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);
    this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);
    this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);
    if (this.options.AppId) {
        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
    }
    event.init(this);
    task.init(this);
};

util.extend(COS.prototype, base);
util.extend(COS.prototype, advance);

COS.getAuthorization = util.getAuth;
COS.version = '0.4.17';

module.exports = COS;
