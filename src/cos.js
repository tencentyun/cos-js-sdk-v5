'use strict';

var util = require('./util');
var event = require('./event');
var task = require('./task');
var base = require('./base');
var advance = require('./advance');
var pkg = require('../package.json');

var defaultOptions = {
    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
    SecretId: '',
    SecretKey: '',
    SecurityToken: '', // 使用临时密钥需要注意自行刷新 Token
    ChunkRetryTimes: 2,
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkSize: 1024 * 1024,
    SliceSize: 1024 * 1024,
    CopyChunkParallelLimit: 20,
    CopyChunkSize: 1024 * 1024 * 10,
    CopySliceSize: 1024 * 1024 * 10,
    MaxPartNumber: 10000,
    ProgressInterval: 1000,
    Domain: '',
    ServiceDomain: '',
    Protocol: '',
    CompatibilityMode: false,
    ForcePathStyle: false,
    UseRawKey: false,
    Timeout: 0, // 单位毫秒，0 代表不设置超时时间
    CorrectClockSkew: true,
    SystemClockOffset: 0, // 单位毫秒，ms
    UploadCheckContentMd5: false,
    UploadQueueSize: 10000,
    UploadAddMetaMd5: false,
    UploadIdCacheLimit: 50,
    UseAccelerate: false,
    ForceSignHost: true, // 默认将host加入签名计算，关闭后可能导致越权风险，建议保持为true
    EnableTracker: false, // 默认关闭上报
    DeepTracker: false, // 上报时是否对每个分块上传做单独上报
    TrackerDelay: 5000, // 周期性上报，单位毫秒。0代表实时上报
    CustomId: '', // 自定义上报id
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
    this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));
    this.options.Timeout = Math.max(0, this.options.Timeout);
    if (this.options.AppId) {
        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
    }
    if (this.options.SecretId && this.options.SecretId.indexOf(' ') > -1) {
        console.error('error: SecretId格式错误，请检查');
        console.error('error: SecretId format is incorrect. Please check');
    }
    if (this.options.SecretKey && this.options.SecretKey.indexOf(' ') > -1) {
      console.error('error: SecretKey格式错误，请检查');
      console.error('error: SecretKey format is incorrect. Please check');
    }
    if (util.isNode()) {
      console.warn('warning: cos-js-sdk-v5 不支持 nodejs 环境使用，请改用 cos-nodejs-sdk-v5，参考文档： https://cloud.tencent.com/document/product/436/8629');
      console.warn('warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629');
    }
    event.init(this);
    task.init(this);
};

base.init(COS, task);
advance.init(COS, task);

COS.util = {
    md5: util.md5,
    xml2json: util.xml2json,
    json2xml: util.json2xml,
};
COS.getAuthorization = util.getAuth;
COS.version = pkg.version;

module.exports = COS;
