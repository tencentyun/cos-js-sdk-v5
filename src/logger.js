const pkg = require('../package.json');
const pkgVersion = pkg.version;

class Logger {
  level = 'VERBOSE';
  cos = null;
  constructor(params) {
    this.level = params.level || 'VERBOSE';
    this.cos = params.cos;
  }
  info(...msg) {
    this.log('info', ...msg);
  }
  debug(...msg) {
    this.log('debug', ...msg);
  }
  warn(...msg) {
    this.log('warn', ...msg);
  }
  error(...msg) {
    this.log('error', ...msg);
  }
  /**
   * 参数结构 {
   *  timestamp: '2021-08-16T06:51:27.781Z',
   *  cate: 'PROCESS',
   *  tag: 'network',
   *  msg: {}
   * */ 
  log(...args) {
    const type = args[0];
    const { cate = 'base', tag = 'base', msg } = args[1];
    const logMsg = {
      timestamp: new Date().toISOString(),
      cate: `[${cate.toUpperCase()}]`,
      tag: `[${tag.toUpperCase()}]`,
      msg
    };
    this.emit('log-message', logMsg);
    console[type](`[cos-js-sdk-v5-${pkgVersion}] ${logMsg.timestamp} ${logMsg.cate} ${logMsg.tag} ${logMsg.msg}`);
  }
}

module.exports = Logger;