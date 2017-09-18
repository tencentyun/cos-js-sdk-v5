/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var COS = __webpack_require__(1);
	module.exports = COS;

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);