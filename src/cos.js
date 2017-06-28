'use strict';

var util = require('./util');
var base = require('./base');
var advance = require('./advance');
var pkg = require('../package.json');

// 对外暴露的类
var COS = function (options) {
    options = options || {};
    this.AppId = options.AppId;
    this.SecretId = options.SecretId;
    this.SecretKey = options.SecretKey;
    this.getAuthorization = options.getAuthorization;
};
util.extend(COS.prototype, base);
util.extend(COS.prototype, advance);

COS.getAuthorization = util.getAuth;
COS.version = pkg.version;

module.exports = window.COS = COS;
