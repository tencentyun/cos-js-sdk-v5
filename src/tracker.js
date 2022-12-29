
const pkg = require('../package.json');
let beacon = null;

const getBeacon = (delay) => {
  if (!beacon) {
    // 不放在顶层是避免首次引入就被加载，从而避免在某些环境比如webworker里加载灯塔sdk内window相关对象报错
    const BeaconAction = require('../lib/beacon.min');
    beacon = new BeaconAction({
      appkey: "0AND0VEVB24UBGDU",
      versionCode: pkg.version,
      channelID: 'js_sdk', //渠道,选填
      openid: 'openid', // 用户id, 选填
      unionid: 'unid',//用户unionid , 类似idfv,选填
      strictMode: false,//严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!
      delay, // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填
      sessionDuration: 60 * 1000,// session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填
    });
  }
  return beacon;
};

const utils = {
    // 生成uid 每个链路对应唯一一条uid
    getUid() {
      var S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    // 获取网络类型
    getNetType() {
      if (typeof navigator === 'object') {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return connection?.type || connection?.effectiveType || 'unknown';
      }
      return 'unknown';
    },
    // 获取pc端操作系统类型
    getOsType() {
      if (typeof navigator !== 'object') {
        return 'unknown os';
      }
      var agent = navigator.userAgent.toLowerCase();
      var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
          return 'win32';
      }
      if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
          return 'win64';
      }
      if (isMac) {
          return 'mac';
      }
      return 'unknown os';
    },
    isMobile() {
      const exp = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
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
    // 获取浏览器类型
    getDeviceName() {
      if (typeof navigator !== 'object') {
        return 'unknown device';
      }
      const explorer = navigator.userAgent.toLowerCase();
      // 腾讯会议内置浏览器
      if (explorer.includes('app/tencent_wemeet')) {
        return 'tencent_wemeet';
      }
      // 遨游浏览器
      if (explorer.indexOf('maxthon') >= 0) {
        const match = explorer.match(/maxthon\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `傲游浏览器 ${ver}`.trim();
      }
      // QQ浏览器
      if (explorer.indexOf('qqbrowser') >= 0) {
        const match = explorer.match(/qqbrowser\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `QQ浏览器 ${ver}`.trim();
      }
      // 搜狗浏览器
      if (explorer.indexOf('se 2.x') >= 0) {
        return '搜狗浏览器';
      }
      // 微信浏览器
      if (explorer.indexOf('wxwork') >= 0) {
        return '微信内置浏览器';
      }
      // ie
      if (explorer.indexOf('msie') >= 0) {
        const match = explorer.match(/msie ([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `IE ${ver}`.trim();
      }
      // firefox
      if (explorer.indexOf('firefox') >= 0) {
        const match = explorer.match(/firefox\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `Firefox ${ver}`.trim();
      }
      // Chrome
      if (explorer.indexOf('chrome') >= 0) {
        const match = explorer.match(/chrome\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `Chrome ${ver}`.trim();
      }
      // Opera
      if (explorer.indexOf('opera') >= 0) {
        const match = explorer.match(/opera.([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `Opera ${ver}`.trim();
      }
      // Safari
      if (explorer.indexOf('safari') >= 0) {
        const match = explorer.match(/version\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `Safari ${ver}`.trim();
      }
      if (explorer.indexOf('edge') >= 0) {
        const match = explorer.match(/edge\/([\d.]+)/);
        const ver = (match && match[1]) || '';
        return `edge ${ver}`.trim();
      }
      return explorer.substr(0, 200);
    },
};

const constant = {
  isMobile: utils.isMobile(),
  isBrowser: !utils.isMobile(),
  mobileOsType: utils.isAndroid() ? 'android' : utils.isIOS ? 'ios' : 'other_mobile',
  pcOsType: utils.getOsType(),
};

// 设备信息，只取一次值
const deviceInfo = {
  // ↓上报项
  deviceType: constant.isMobile ? 'mobile' : constant.isBrowser ? 'browser' : 'unknown',
  devicePlatform: constant.isMobile ? constant.mobileOsType : constant.pcOsType,
  deviceName: utils.getDeviceName(), //浏览器名称
};

// 分块上传原子方法
const sliceUploadMethods = ['multipartInit', 'multipartUpload', 'multipartComplete', 'multipartList', 'multipartListPart', 'multipartAbort'];

const uploadApi = ['putObject', 'postObject', 'appendObject', 'sliceUploadFile', 'uploadFile', 'uploadFiles'].concat(sliceUploadMethods);
const downloadApi = ['getObject'];

function getEventCode(apiName) {
  if (uploadApi.includes(apiName)) {
    return 'cos_upload';
  }
  if (downloadApi.includes(apiName)) {
    return 'cos_download';
  }
  return 'base_service';
}

// 上报参数驼峰改下划线
function camel2underline(key) {
  return key.replace(/([A-Z])/g,"_$1").toLowerCase();
}
function formatParams(params) {
  const formattedParams = {};
  const allReporterKeys = ['tracePlatform', 'cossdkVersion', 'region', 'networkType', 'host', 'accelerate', 'requestPath', 'size', 'httpMd5',
  'httpSign', 'httpFull', 'name', 'result', 'tookTime', 'errorNode', 'errorCode', 'errorMessage', 'errorRequestId', 'errorStatusCode', 'errorServiceName',
  'errorType', 'traceId', 'bucket', 'appid', 'partNumber', 'retryTimes', 'reqUrl', 'customId', 'fullError',
  'deviceType', 'devicePlatform', 'deviceName'];
  const successKeys = ['tracePlatform', 'cossdkVersion', 'region', 'bucket', 'appid', 'networkType', 'host', 'accelerate', 'requestPath',
    'partNumber', 'size', 'name', 'result', 'tookTime', 'errorRequestId', 'retryTimes', 'reqUrl', 'customId',
    'deviceType', 'devicePlatform', 'deviceName'];
  // 需要上报的参数字段
  const reporterKeys = params.result === 'Success' ? successKeys : allReporterKeys;
  for (let key in params) {
    if (!reporterKeys.includes(key)) continue;
    const formattedKey = camel2underline(key);
    formattedParams[formattedKey] = params[key];
  }
  return formattedParams;
}

// 链路追踪器
class Tracker {
  constructor(opt) {
    const { parent, traceId, bucket, region, apiName, fileKey, fileSize, accelerate, customId, delay, deepTracker } = opt;
    const appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';
    this.parent = parent;
    this.deepTracker = deepTracker;
    this.delay = delay;
    // 上报用到的字段
    this.params = {
      // 通用字段
      cossdkVersion: pkg.version,
      region,
      networkType: '',
      host: '',
      accelerate: accelerate ? 'Y' : 'N',
      requestPath: fileKey || '',
      size: fileSize || -1,
      httpMd5: 0, // MD5耗时
      httpSign: 0, // 计算签名耗时
      httpFull: 0, // http请求耗时
      name: apiName || '',
      result: '', // sdk api调用结果Success、Fail
      tookTime: 0, // 总耗时
      errorNode: '',
      errorCode: '',
      errorMessage: '',
      errorRequestId: '',
      errorStatusCode: 0,
      errorServiceName: '',

      // js补充字段
      tracePlatform: 'cos-js-sdk-v5', // 上报平台=js
      traceId: traceId || utils.getUid(), // 每条上报唯一标识
      bucket,
      appid,
      partNumber: 0, // 分块上传编号
      retryTimes: 0, // sdk内部发起的请求重试
      reqUrl: '', // 请求url
      customId: customId || '', // 业务id
      deviceType: deviceInfo.deviceType, // 设备类型 移动端浏览器、web浏览器
      devicePlatform: deviceInfo.devicePlatform,
      deviceName: deviceInfo.deviceName,

      md5StartTime: 0, // md5计算开始时间
      md5EndTime: 0, // md5计算结束时间
      signStartTime: 0, // 计算签名开始时间
      signEndTime: 0, // 计算签名结束时间
      httpStartTime: 0, // 发起网络请求开始时间
      httpEndTime: 0, // 网路请求结束时间
      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时
      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时
    };
    this.beacon = getBeacon(delay);
  }

  // 格式化sdk回调
  formatResult(err, data) {
    const now = new Date().getTime();
    const tookTime = now - this.params.startTime;
    const networkType = utils.getNetType();
    const errorCode = err ? (err?.code || err?.error?.code || err?.error?.Code) : '';
    const errorMessage = err ? (err?.message || err?.error?.message || err?.error?.Message) : '';
    const errorServiceName = err ? (err?.resource || err?.error?.resource || err?.error?.Resource) : '';
    const errorStatusCode = err ? err?.statusCode : data.statusCode;
    const requestId = err ? (err?.headers && err?.headers['x-cos-request-id']) : (data?.headers && data?.headers['x-cos-request-id']);
    const errorType = err ? (requestId ? 'Server' : 'Client'): '';
    Object.assign(this.params, {
      tookTime,
      networkType,
      httpMd5: this.params.md5EndTime - this.params.md5StartTime,
      httpSign: this.params.signEndTime - this.params.signStartTime,
      httpFull: this.params.httpEndTime - this.params.httpStartTime,
      result: err ? 'Fail' : 'Success',
      errorType,
      errorCode,
      errorStatusCode,
      errorMessage,
      errorServiceName,
      errorRequestId: requestId,
    });
    if (err && (!errorCode || !errorMessage)) {
      // 暂存全量err一段时间 观察是否所有err格式都可被解析
      this.params.fullError = err ? JSON.stringify(err) : '';
    }
    if (this.params.name === 'getObject') {
      this.params.size = data ? (data.headers && data.headers['content-length']) : -1;
    }
    if (this.params.reqUrl) {
      try {
        const execRes = /^http(s)?:\/\/(.*?)\//.exec(this.params.reqUrl);
        this.params.host = execRes[2];
      } catch (e) {
        this.params.host = this.params.reqUrl;
      }
    }
    this.sendEvents();
  }

  // 设置当前链路的参数
  setParams(params) {
    Object.assign(this.params, params);
  }

  // 使用灯塔延时上报
  sendEvents() {
    // DeepTracker模式下才会上报分块上传内部细节
    if (sliceUploadMethods.includes(this.params.name) && !this.deepTracker) {
      return;
    }
    const eventCode = getEventCode(this.params.name);
    const formattedParams = formatParams(this.params);

    // 兜底处理
    if (!this.beacon) {
      this.beacon = getBeacon(this.delay || 5000);
    }

    if (this.delay === 0) {
      // 实时上报
      this.beacon && this.beacon.onDirectUserAction(eventCode, formattedParams);
    } else {
      // 周期性上报
      this.beacon && this.beacon.onUserAction(eventCode, formattedParams);
    }
  }

  // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作
  generateSubTracker(subParams) {
    Object.assign(subParams, {
      parent: this,
      deepTracker: this.deepTracker,
      traceId: this.params.traceId,
      bucket: this.params.bucket,
      region: this.params.region,
      fileKey: this.params.requestPath,
      customId: this.params.customId,
      delay: this.delay,
    });
    return new Tracker(subParams);
  }

}

module.exports = Tracker;