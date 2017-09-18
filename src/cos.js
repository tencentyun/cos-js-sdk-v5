'use strict';

import util from './util';
import event from './event';
import task from './task';
import base from './base';
import advance from './advance';
import pkg from '../package.json';

var defaultOptions = {
    AppId: '',
    SecretId: '',
    SecretKey: '',
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkSize: 1024 * 1024,
    ProgressInterval: 1000,
    Domain: '',
    ServiceDomain: '',
};

// 对外暴露的类
var COS = function (options) {
    this.options = util.extend(util.clone(defaultOptions), options || {});
    event.init(this);
    task.init(this);
};

util.extend(COS.prototype, base);
util.extend(COS.prototype, advance);

COS.getAuthorization = util.getAuth;
COS.version = pkg.version;

module.exports = window.COS = COS;
