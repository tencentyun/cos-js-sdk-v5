'use strict';

var util = require('./util');
var event = require('./event');
var task = require('./task');
var base = require('./base');
var advance = require('./advance');
var Logger = require('./logger');
var pkg = require('../package.json');

var defaultOptions = {
  AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
  SecretId: '',
  SecretKey: '',
  SecurityToken: '', // 使用临时密钥需要注意自行刷新 Token
  StartTime: 0, // 临时密钥返回起始时间
  ExpiredTime: 0, // 临时密钥过期时间
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
  AutoSwitchHost: true,
  CopySourceParser: null, // 自定义拷贝源解析器
  ObjectKeySimplifyCheck: true, // 开启合并校验 getObject Key
  /** 上报相关 **/
  DeepTracker: false, // 上报时是否对每个分块上传做单独上报
  TrackerDelay: 5000, // 周期性上报，单位毫秒。0代表实时上报
  CustomId: '', // 自定义上报id
  BeaconReporter: null, // 灯塔上报组件，如有需要请自行传入，传入即代表开启上报
  ClsReporter: null, // cls 上报组件，如有需要请自行传入，传入即代表开启上报
  // 日志相关
  EnableLog: false, // 是否开启日志
  EnableLogcat: false, // 是否开启控制台日志打印
  LogLevel: 'VERBOSE', // 日志级别，支持 VERBOSE、DEBUG、INFO、WARN、ERROR，默认为 VERBOSE
  ClsLogger: null, // 日志上报到 cls 组件
  LogExtras: {}, // 日志上报时，附带的额外信息，例如：{deviceID: '', userID: ''}
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
  this.options.EnableReporter = this.options.BeaconReporter || this.options.ClsReporter;

  if (this.options.AppId) {
    console.warn(
      'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'
    );
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
    console.log('Tip: Next.js、Nuxt.js 等服务端渲染技术可正常使用JavaScript SDK，请忽略下方 nodejs 环境警告');
    console.warn(
      'warning: cos-js-sdk-v5 不支持 nodejs 环境使用，请改用 cos-nodejs-sdk-v5，参考文档： https://cloud.tencent.com/document/product/436/8629'
    );
    console.warn(
      'warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629'
    );
  }
  if (this.options.ForcePathStyle) {
    console.warn(
      'cos-js-sdk-v5不再支持使用path-style，仅支持使用virtual-hosted-style，参考文档：https://cloud.tencent.com/document/product/436/96243'
    );
    throw new Error('ForcePathStyle is not supported');
  }
  event.init(this);
  task.init(this);
  // 初始化日志模块
  this.logger = new Logger({
    enableLog: this.options.EnableLog,
    enableLogcat: this.options.EnableLogcat,
    level: this.options.LogLevel ?? 'VERBOSE',
    clsLogger: this.options.ClsLogger,
    logExtras: this.options.LogExtras ?? {},
  });
  if (this.options.EnableLog) {
    event.init(this.logger);
    this.logger.on('log-message', (data) => {
      this.emit('log-message', data);
    });
  }
};

base.init(COS, task);
advance.init(COS, task);

COS.util = {
  md5: util.md5,
  xml2json: util.xml2json,
  json2xml: util.json2xml,
  encodeBase64: util.encodeBase64,
};
COS.getAuthorization = util.getAuth;
COS.version = pkg.version;

module.exports = COS;
