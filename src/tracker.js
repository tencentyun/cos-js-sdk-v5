
const BeaconAction = require('../lib/beacon');
const beacon = new BeaconAction({
  appkey: "0WEB0H6CDU46LPPI", // 系统或项目id, 必填
  versionCode: '0.0.1', //项目版本,选填
  channelID: 'channel', //渠道,选填
  openid: 'openid', // 用户id, 选填
  unionid: 'unid',//用户unionid , 类似idfv,选填
  strictMode: false,//严苛模式开关, 打开严苛模式会主动抛出异常, 上线请务必关闭!!!
  delay: 1000, // 普通事件延迟上报时间(单位毫秒), 默认1000(1秒),选填
  sessionDuration: 60 * 1000,// session变更的时间间隔, 一个用户持续30分钟(默认值)没有任何上报则算另一次 session,每变更一次session上报一次启动事件(rqd_applaunched),使用毫秒(ms),最小值30秒,选填
  // onReportSuccess: success, // 上报成功回调,选填
  // onReportFail: fail, // 上报失败回调,选填,
  // onReportBeforeSend: beforeSend, // 上报前回调，选填
});

var uuid = function () {
  var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

// 观察者的选项（观察哪些突变）
// const config = {
//   entryTypes: ['resource', 'mark', 'measure']
// };
 
// const observer = new PerformanceObserver(list => {
//   list.getEntries().forEach(entry => {
//     // 在控制台上显示每个报告的测量
//     console.log(
//       `Name: ${entry.name}`,
//       `Type: ${entry.entryType}`,
//       `Start: ${entry.startTime}`,
//       `Duration: ${entry.duration}`,
//     );
//   });
// });
 
// // 开始观察
// observer.observe(config);
// performance.mark('registered-observer');

const uploadApi = ['putObject', 'postObject', 'appendObject', 'multipartInit', 'multipartUpload', 'multipartComplete', 'multipartList', 'multipartListPart', 'multipartAbort', 'sliceUploadFile', 'uploadFile', 'uploadFiles'];
const downloadApi = ['getObject'];

function getEventCode(apiName) {
  if (uploadApi.includes(apiName)) {
    return 'cos_upload';
  }
  if (downloadApi.includes(apiName)) {
    return 'cos_download';
  }
  return 'cos_common';
}

// 上报参数驼峰改下划线
function hump2underline(key) {
  return key.replace(/([A-Z])/g,"_$1").toLowerCase();
}
function formatParams(params) {
  const formattedParams = {};
  for (let key in params) {
    const formattedKey = hump2underline(key);
    formattedParams[formattedKey] = params[key];
  }
  return formattedParams;
}

// 链路追踪器
class Tracker {
  constructor({ traceId, bucket, region, apiName, originApiName, fileKey, fileSize, useAccelerate }) {
    const appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';
    this.beacon = beacon; // 共用一个beacon实例
    this.params = {
      traceId: traceId || uuid(), // 每条上报唯一标识
      bucket,
      region,
      appid,
      apiName, // 调用sdk最原子的api名称，比如multipartInit
      originApiName, // 分块上传可能有uploadFile、uploadFiles内部触发
      fileKey,  // cos端文件路径
      fileSize, // 文件大小，上传时已知，下载时成功返回后取到。默认给-1，可能真实值是0
      useAccelerate: useAccelerate ? '1' : '0', // 使用全球加速
      md5StartTime: 0, // md5计算开始时间
      md5EndTime: 0, // md5计算结束时间
      md5AvgTime: 0, // MD5平均耗时
      signStartTime: 0, // 计算签名开始时间
      signEndTime: 0, // 计算签名结束时间
      signAvgTime: 0, // 计算签名平均耗时
      httpStartTime: 0, // 发起网络请求开始时间
      httpEndTime: 0, // 网路请求结束时间
      httpAvgTime: 0, // 网络请求平均耗时
      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时
      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时
      speed: -1, // 平均速度
      partNumber: 0, // 分块上传编号
      retryTimes: 0, // sdk内部发起的请求重试
      result: '', // sdk api调用结果success、fail
      statusCode: 0,
      errorMessage: '',
      requestId: '',
      reqUrl: '', // 请求url
    };
  }

  // 格式化sdk回调
  formatResult(err, data) {
    const now = new Date().getTime();
    var avgTime = now - this.params.startTime;
    Object.assign(this.params, {
      endTime: now,
      avgTime,
      speed: this.params.fileSize !== -1 ? (this.params.fileSize/(avgTime/1000)).toFixed(2) : -1,
      md5AvgTime: this.params.md5EndTime - this.params.md5StartTime,
      signAvgTime: this.params.signEndTime - this.params.signStartTime,
      httpAvgTime: this.params.httpEndTime - this.params.httpStartTime,
      result: err ? 'fail' : 'success',
      statusCode: err ? err.code : data.statusCode,
      errorMessage:  err ? err.message : '',
      requestId:  err ? (err.headers && err.headers['x-cos-request-id']) : (data.headers && data.headers['x-cos-request-id']),
    });
    if (this.params.apiName === 'getObject') {
      this.params.fileSize = data ? data.headers['content-length'] : -1;
    }
    this.params.speed = this.params.fileSize !== -1 ? (this.params.fileSize/(avgTime/1000)).toFixed(2) : -1;
  }

  // 设置当前链路的参数
  setParams(params) {
    Object.assign(this.params, params);
  }

  // 使用灯塔延时上报
  sendEvents() {
    const eventCode = getEventCode(this.params.apiName);
    const formattedParams = formatParams(this.params);
    this.beacon.onUserAction(eventCode, formattedParams);
  }

  // 生成子实例，与父所属一个链路，可用于分块上传内部流程上报单个分块操作
  generateSubTracker(subParams) {
    Object.assign(subParams, {
      traceId: this.params.traceId,
      originApiName: this.params.originApiName,
      bucket: this.params.bucket,
      region: this.params.region,
      fileKey: this.params.fileKey,
      fileSize: this.params.fileSize,
      useAccelerate: this.params.useAccelerate,
    });
    return new Tracker(subParams);
  }

  // 销毁实例
  destroy() {
    this.ins = null;
    this.params = {};
  }
}

module.exports = Tracker;