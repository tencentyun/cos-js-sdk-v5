
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

// 观察者的选项（观察哪些突变）
const config = {
  entryTypes: ['resource', 'mark', 'measure']
};
 
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    // 在控制台上显示每个报告的测量
    console.log(
      `Name: ${entry.name}`,
      `Type: ${entry.entryType}`,
      `Start: ${entry.startTime}`,
      `Duration: ${entry.duration}`,
    );
  });
});
 
// 开始观察
observer.observe(config);
performance.mark('registered-observer');


class Reporter {
  constructor({ bucket, region, apiName, fileKey, fileSize }) {
    this.ins = beacon;
    this.params = {
      bucket,
      region,
      apiName,
      fileKey,
      fileSize: -1, // 默认给-1，可能真实值是0
      md5StartTime: 0, // md5计算开始时间
      md5EndTime: 0, // md5计算结束时间
      signStartTime: 0, // 计算签名开始时间
      signEndTime: 0, // 计算签名结束时间
      httpStartTime: 0, // 发起网络请求开始时间
      httpEndTime: 0, // 网路请求结束时间
      startTime: new Date().getTime(), // sdk api调用起始时间，不是纯网络耗时
      endTime: 0, //  sdk api调用结束时间，不是纯网络耗时
      retryTimes: 0, // 当前请求的重试次数，sdk内部发起的重试
      result: '', // sdk api调用结果
      statusCode: 0,
      errorMessage: '',
      requestId: '',
    };
  }

  // 格式化sdk回调
  formatParams(err, data) {
    Object.assign(this.params, {
      reult: err ? 'fail' : 'success',
      statusCode: err ? err.code : data.statusCode,
      errorMessage:  err ? err.message : '',
      requestId:  err ? err.headers['x-cos-request-id'] : data.headers['x-cos-request-id'],
    });
    if (this.params.apiName === 'getObject') {
      this.params.fileSize = data ? data.headers['content-length'] : -1;
    }
  }

  // 设置当前链路的参数
  setParams(params) {
    for(let i in params) {
      this.params[i] = params[i];
    }
  }

  // 使用灯塔延时上报
  sendEvents(eventCode) {
    const now = new Date().getTime();
    Object.assign(this.params, {
      endTime: now,
      avgTime: now - this.params.startTime,
      speed: this.params.fileSize !== -1 ? (this.params.fileSize/(avgTime/1000)).toFixed(2) : -1,
    });
    const uploadOrDownloadAPI = ['getObject', 'putObject', 'postObject', 'sliceUploadFile', 'multipartList', 'multipartInit', 'multipartUpload', 'multipartComplete', 'multipartAbort'];
    const { apiName, startTime, endTime, avgTime, speed,
      md5StartTime, md5EndTime, signStartTime, signEndTime, httpStartTime, httpEndTime,
      fileSize, fileKey, reult, statusCode, errorMessage, requestId } = this.params;
    // 上传、下载操作
    if (uploadOrDownloadAPI.includes(this.apiName)) {
      console.log(`%c ${apiName}`,'background: #006eff;color: #fff;font-size: 16px;',
      `【开始时间:${startTime}】,【结束时间:${endTime}】【耗时:${avgTime} ms】,
      【MD5计算耗时:${md5EndTime - md5StartTime} ms】,【签名计算耗时:${signEndTime - signStartTime} ms】,【http请求耗时:${httpEndTime - httpStartTime} ms】,
      【文件大小:${fileSize} B】【文件Key:${fileKey}】【速度:${speed} B/s】
      【调用结果:${reult}】【statusCode:${statusCode}】【message:${errorMessage}】,
      【requestId:${requestId}】`);
    } else {
      console.log(`%c ${apiName}`,'background: green;color: #fff;font-size: 16px;',
      `【开始时间:${startTime}】,【结束时间:${endTime}】【耗时:${avgTime} ms】,
      【MD5计算耗时:${md5EndTime - md5StartTime} ms】,【签名计算耗时:${signEndTime - signStartTime} ms】,【http请求耗时:${httpEndTime - httpStartTime} ms】,
      【调用结果:${reult}】【statusCode:${statusCode}】【message:${errorMessage}】,
      【requestId:${requestId}】`);
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