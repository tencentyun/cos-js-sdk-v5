const pkg = require('../package.json');
let beacon = null;

const getBeacon = (Beacon, delay) => {
  if (!beacon) {
    // 生成 beacon
    if (typeof Beacon !== 'function') {
      throw new Error('Beacon not found');
    }
    beacon = new Beacon({
      appkey: '0WEB05PY6MHRGK0U',
      versionCode: pkg.version,
      channelID: 'js_sdk', //渠道,选填
      openid: 'openid', // 用户id, 选填
      unionid: 'unid', //用户unionid , 类似idfv,选填
      strictMode: false, //严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!
      delay, // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填
      sessionDuration: 60 * 1000, // session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填
    });
  }
  return beacon;
};

// 毫秒转秒
const ms2s = function (ms) {
  if (!ms || ms < 0) return 0;
  return (ms / 1000).toFixed(3);
};

const utils = {
  // 生成uid 每个链路对应唯一一条uid
  getUid() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  },
  // 获取网络类型 4g ｜ wifi
  getNetType() {
    if (typeof navigator === 'object') {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return connection?.type || connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  },
  // http | https
  getProtocol() {
    if (typeof location === 'object') {
      return location.protocol.replace(/:/, '');
    }
    return 'unknown protocol';
  },
  // 获取pc端操作系统类型
  getOsType() {
    if (typeof navigator !== 'object') {
      return 'unknown os';
    }
    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
      return 'win32';
    }
    if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
      return 'win64';
    }
    if (isMac) {
      return 'mac';
    }
    return 'unknown os';
  },
  isMobile() {
    const exp =
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    if (typeof navigator === 'object' && navigator.userAgent.match(exp)) {
      return true; // 移动端
    }
    return false; // PC端
  },
  isAndroid() {
    const exp = /(Android|Adr|Linux)/i;
    if (typeof navigator === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }
    return false;
  },
  isIOS() {
    const exp = /(iPhone|iPod|iPad|iOS)/i;
    if (typeof navigator === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }
    return false;
  },
  isOtherMobile() {
    return isMobile && !isAndroid && !isIOS;
  },
  getUA() {
    if (typeof navigator !== 'object') {
      return 'unknown device';
    }
    const explorer = navigator.userAgent;
    return explorer;
  },
};

const isMobile = utils.isMobile();
const mobileOsType = utils.isAndroid() ? 'android' : utils.isIOS ? 'ios' : 'other_mobile';
const pcOsType = utils.getOsType();
const devicePlatform = isMobile ? mobileOsType : pcOsType;
const ua = utils.getUA();
const protocol = utils.getProtocol();

const transApiName = (api) => {
  if (['putObject', 'sliceUploadFile', 'uploadFile', 'uploadFiles'].includes(api)) {
    return 'UploadTask';
  } else if (api === 'getObject') {
    return 'DownloadTask';
  } else if (['putObjectCopy', 'sliceCopyFile'].includes(api)) {
    return 'CopyTask';
  }
  return api;
};

// 上报参数驼峰改下划线
function camel2underline(key) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}
function formatParams(params) {
  const formattedParams = {};
  const successKeys = [
    'sdkVersionName',
    'sdkVersionCode',
    'osName',
    'networkType',
    'requestName',
    'requestResult',
    'bucket',
    'region',
    'appid',
    'accelerate',
    'url',
    'host',
    'requestPath',
    'userAgent',
    'networkProtocol',
    'httpMethod',
    'httpSize',
    'httpSpeed',
    'httpTookTime',
    'httpMd5',
    'httpSign',
    'httpFullTime',
    'httpDomain',
    'partNumber',
    'httpRetryTimes',
    'customId',
    'traceId',
    'realApi',
  ];
  const failureKeys = [
    ...successKeys,
    'errorNode',
    'errorCode',
    'errorName',
    'errorMessage',
    'errorRequestId',
    'errorHttpCode',
    'errorServiceName',
    'errorType',
    'fullError',
  ];
  // 需要上报的参数字段
  const reporterKeys = params.requestResult === 'Success' ? successKeys : failureKeys;
  for (let key in params) {
    if (!reporterKeys.includes(key)) continue;
    const formattedKey = camel2underline(key);
    formattedParams[formattedKey] = params[key];
  }
  formattedParams['request_name'] = params.realApi ? transApiName(params.realApi) : params.requestName;
  return formattedParams;
}

// 链路追踪器
class Tracker {
  constructor(opt) {
    const {
      parent,
      traceId,
      bucket,
      region,
      apiName,
      realApi,
      httpMethod,
      fileKey,
      fileSize,
      accelerate,
      customId,
      delay,
      deepTracker,
      Beacon,
      clsReporter,
    } = opt;
    const appid = (bucket && bucket.substr(bucket.lastIndexOf('-') + 1)) || '';
    this.parent = parent;
    this.deepTracker = deepTracker;
    this.delay = delay;
    if (clsReporter && !this.clsReporter) {
      this.clsReporter = clsReporter;
    }
    // 上报用到的字段
    this.params = {
      // 通用字段
      sdkVersionName: 'cos-js-sdk-v5',
      sdkVersionCode: pkg.version,
      osName: devicePlatform,
      networkType: '',

      requestName: apiName || '',
      requestResult: '', // sdk api调用结果Success、Failure
      realApi,

      bucket,
      region,
      accelerate,
      httpMethod,
      url: '', // 请求url
      host: '',
      httpDomain: '',
      requestPath: fileKey || '',
      userAgent: ua,
      networkProtocol: protocol,

      errorType: '',
      errorCode: '',
      errorName: '',
      errorMessage: '',
      errorRequestId: '',
      errorHttpCode: 0,
      errorServiceName: '',
      errorNode: '',

      httpTookTime: 0, // http整体耗时
      httpSize: fileSize || 0, // 主要是文件大小，大小 B
      httpMd5: 0, // MD5耗时
      httpSign: 0, // 计算签名耗时
      httpFullTime: 0, // 任务整体耗时(包括md5、签名等)
      httpSpeed: 0, // 主要关注上传速度，KB/s

      md5StartTime: 0, // md5计算开始时间
      md5EndTime: 0, // md5计算结束时间
      signStartTime: 0, // 计算签名开始时间
      signEndTime: 0, // 计算签名结束时间
      httpStartTime: 0, // 发起网络请求开始时间
      httpEndTime: 0, // 网路请求结束时间
      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时
      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时

      // js补充字段
      traceId: traceId || utils.getUid(), // 每条上报唯一标识
      appid,
      partNumber: 0, // 分块上传编号
      httpRetryTimes: 0, // sdk内部发起的请求重试
      customId: customId || '', // 业务id
      partTime: 0,
    };
    if (Beacon) {
      this.beacon = getBeacon(Beacon, delay);
    }
  }

  // 格式化sdk回调
  formatResult(err, data) {
    const now = new Date().getTime();
    const networkType = utils.getNetType();
    const errorCode = err ? err?.code || err?.error?.code || err?.error?.Code : '';
    const errorMessage = err ? err?.message || err?.error?.message || err?.error?.Message : '';
    const errorName = errorMessage;
    const errorServiceName = err ? err?.resource || err?.error?.resource || err?.error?.Resource : '';
    const errorHttpCode = err ? err?.statusCode : data.statusCode;
    const requestId = err
      ? err?.headers && err?.headers['x-cos-request-id']
      : data?.headers && data?.headers['x-cos-request-id'];
    const errorType = err ? (requestId ? 'Server' : 'Client') : '';

    if (this.params.requestName === 'getObject') {
      this.params.httpSize = data ? data.headers && data.headers['content-length'] : 0;
    }

    // 上报 sliceUploadFile || uploadFile || uploadFiles 命中分块上传时
    const isSliceUploadFile = this.params.realApi === 'sliceUploadFile';
    const isSliceCopyFile = this.params.realApi === 'sliceCopyFile';

    if (isSliceUploadFile || isSliceCopyFile) {
      const speed = this.params.httpSize / 1024 / this.params.partTime;
      Object.assign(this.params, { httpSpeed: speed < 0 ? 0 : speed.toFixed(3) });
    } else {
      const httpFullTime = now - this.params.startTime;
      const httpTookTime = this.params.httpEndTime - this.params.httpStartTime;
      const speed = this.params.httpSize / 1024 / (httpTookTime / 1000);
      const httpMd5 = this.params.md5EndTime - this.params.md5StartTime;
      const httpSign = this.params.signEndTime - this.params.signStartTime;

      if (this.parent) {
        this.parent.addParamValue('httpTookTime', ms2s(httpTookTime));
        this.parent.addParamValue('httpFullTime', ms2s(httpFullTime));
        this.parent.addParamValue('httpMd5', ms2s(httpMd5));
        this.parent.addParamValue('httpSign', ms2s(httpSign));
        if (['multipartUpload', 'uploadPartCopy', 'putObjectCopy'].includes(this.params.requestName)) {
          // 只有小分块上传|复制才累计纯请求耗时，计算速度时用到
          this.parent.addParamValue('partTime', ms2s(httpTookTime));
        }
      }
      Object.assign(this.params, {
        httpFullTime: ms2s(httpFullTime),
        httpMd5: ms2s(httpMd5),
        httpSign: ms2s(httpSign),
        httpTookTime: ms2s(httpTookTime),
        httpSpeed: speed < 0 ? 0 : speed.toFixed(3),
      });
    }

    Object.assign(this.params, {
      networkType,
      requestResult: err ? 'Failure' : 'Success',
      errorType,
      errorCode,
      errorHttpCode,
      errorName,
      errorMessage,
      errorServiceName,
      errorRequestId: requestId,
    });

    if (err && (!errorCode || !errorMessage)) {
      // 暂存全量err一段时间 观察是否所有err格式都可被解析
      this.params.fullError = err ? JSON.stringify(err) : '';
    }

    if (this.params.url) {
      try {
        const execRes = /^http(s)?:\/\/(.*?)\//.exec(this.params.url);
        this.params.host = execRes[2];
      } catch (e) {
        this.params.host = this.params.url;
      }
      this.params.httpDomain = this.params.host;
    }
  }

  // 上报
  report(err, data) {
    if (!this.beacon && !this.clsReporter) return;
    this.formatResult(err, data);
    const formattedParams = formatParams(this.params);
    if (this.beacon) {
      this.sendEventsToBeacon(formattedParams);
    }
    if (this.clsReporter) {
      this.sendEventsToCLS(formattedParams);
    }
  }

  // 设置当前链路的参数
  setParams(params) {
    Object.assign(this.params, params);
  }

  addParamValue(key, value) {
    this.params[key] = (+this.params[key] + +value).toFixed(3);
  }

  // 上报灯塔
  sendEventsToBeacon(formattedParams) {
    // DeepTracker模式下才会上报分块上传内部细节
    const isSliceUploadFile =
      this.params.requestName === 'sliceUploadFile' || this.params.realApi === 'sliceUploadFile';
    if (isSliceUploadFile && !this.deepTracker) {
      return;
    }
    const eventCode = 'qcloud_track_cos_sdk';

    if (this.delay === 0) {
      // 实时上报
      this.beacon && this.beacon.onDirectUserAction(eventCode, formattedParams);
    } else {
      // 周期性上报
      this.beacon && this.beacon.onUserAction(eventCode, formattedParams);
    }
  }

  // 上报 cls
  sendEventsToCLS(formattedParams) {
    // 是否实时上报
    const immediate = !!(this.delay === 0);

    this.clsReporter.log(formattedParams, immediate);
  }

  // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作
  generateSubTracker(subParams) {
    Object.assign(subParams, {
      parent: this,
      deepTracker: this.deepTracker,
      traceId: this.params.traceId,
      bucket: this.params.bucket,
      region: this.params.region,
      accelerate: this.params.accelerate,
      fileKey: this.params.requestPath,
      customId: this.params.customId,
      delay: this.delay,
      clsReporter: this.clsReporter,
    });
    return new Tracker(subParams);
  }
}

module.exports = Tracker;
