const pkg = require('../package.json');
const pkgVersion = pkg.version;

const logLevelList = ['VERBOSE', 'DEBUG', 'INFO', 'WARN', 'ERROR'];
class Logger {
  level = 'VERBOSE'; // VERBOSE | DEBUG | INFO | WARN | ERROR 按日志等级排序
  clsLogger = null;
  logExtras = {};
  constructor(params) {
    this.enableLog = params.enableLog ?? false;
    this.level = params.level || 'VERBOSE';
    if (!logLevelList.includes(this.level)) {
      this.level = 'VERBOSE';
    }
    this.enableLogcat = params.enableLogcat;
    this.clsLogger = params.clsLogger;
    this.logExtras = params.logExtras;
  }
  info(...msg) {
    if (['VERBOSE', 'INFO'].includes(this.level)) {
      this.log('info', ...msg);
    }
  }
  debug(...msg) {
    if (['VERBOSE', 'DEBUG'].includes(this.level)) {
      this.log('debug', ...msg);
    }
  }
  warn(...msg) {
    if (['VERBOSE', 'WARN'].includes(this.level)) {
      this.log('warn', ...msg);
    }
  }
  error(...msg) {
    if (['VERBOSE', 'ERROR'].includes(this.level)) {
      this.log('error', ...msg);
    }
  }
  /**
   * 参数结构 {
   *  timestamp: '2021-08-16T06:51:27.781Z',
   *  cate: 'PROCESS',
   *  tag: 'network',
   *  msg: {}
   * */
  log(...args) {
    if (!this.enableLog) {
      return;
    }
    const type = args[0];
    const { cate = 'base', tag = 'base', msg } = args[1];
    const logMsg = {
      version: `cos-js-sdk-v5-${pkgVersion}`,
      timestamp: new Date().toISOString(),
      cate: `[${cate.toUpperCase()}]`,
      tag: `[${tag.toUpperCase()}]`,
      msg,
      extras: this.logExtras,
    };
    // 日志输出到控制台
    if (this.enableLogcat) {
      console[type](
        `[${logMsg.version}] ${logMsg.timestamp} ${logMsg.cate} ${logMsg.tag} ${logMsg.msg} ${logMsg.extras ? JSON.stringify(logMsg.extras) : ''}`
      );
    }
    // 日志上报到 cls
    if (this.clsLogger) {
      this.clsLogger.log(logMsg, false);
    }
    // 日志回调
    this.emit('log-message', logMsg);
  }
}

module.exports = Logger;
