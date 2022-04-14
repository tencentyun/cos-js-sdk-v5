
const BeaconAction = require('../lib/beacon');
const beacon = new BeaconAction({
  appkey: "0M000A1RC72MXXRH", // 系统或项目id, 必填
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

class Reporter {
  constructor({ bucket, region, apiName, fileKey, fileSize }) {
    this.ins = beacon;
    this.startTime = new Date().getTime();
    this.bucket = bucket;
    this.region = region;
    this.apiName = apiName;
    this.fileKey = fileKey;
    this.fileSize = fileSize;
  }

  // 格式化sdk回调
  formatParams(err, data) {
    this.reult = err ? 'fail' : 'success';
    this.statusCode = err ? err.code : data.statusCode;
    this.errorMessage =  err ? err.message : '';
    this.requestId =  err ? err.headers['x-cos-request-id'] : data.headers['x-cos-request-id'];
    if (this.apiName === 'getObject') {
      this.fileSize = data ? data.headers['content-length'] : -1;
    }
  }

  // 使用灯塔延时上报
  sendEvents(eventCode) {
    this.endTime = new Date().getTime();
    this.avgTime = this.endTime - this.startTime;
    this.speed = this.fileSize !== -1 ? (this.fileSize/(this.avgTime/1000)).toFixed(2) : -1;
    const uploadOrDownloadAPI = ['getObject', 'putObject', 'postObject', 'sliceUploadFile', 'multipartList', 'multipartInit', 'multipartUpload', 'multipartComplete', 'multipartAbort'];
    // 上传、下载操作
    if (uploadOrDownloadAPI.includes(this.apiName)) {
      console.log(`%c ${this.apiName}`,'background: #006eff;color: #fff;font-size: 16px;',
      `【开始时间:${this.startTime}】,【结束时间:${this.endTime}】【耗时:${this.avgTime} ms】,
      【文件大小:${this.fileSize} B】【文件Key:${this.fileKey}】【速度:${this.speed} B/s】
      【调用结果:${this.reult}】【statusCode:${this.statusCode}】【message:${this.errorMessage}】,
      【requestId:${this.requestId}】`);
    } else {
      console.log(`%c ${this.apiName}`,'background: green;color: #fff;font-size: 16px;',
      `【开始时间:${this.startTime}】,【结束时间:${this.endTime}】【耗时:${this.avgTime} ms】,
      【调用结果:${this.reult}】【statusCode:${this.statusCode}】【message:${this.errorMessage}】,
      【requestId:${this.requestId}】`);
    }
    // beacon.onUserAction(eventCode, params);
  }

  // 重新搞一个实例，可用于分块上传内部流程上报单个分块操作
  renew() {
    return new Reporter();
  }

  // 销毁实例
  destroy() {
    this.ins = null;
  }
}

module.exports = Reporter;