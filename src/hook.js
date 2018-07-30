var async = require('./async');

var init = function (cos) {
    var listeners = {};
    var getList = function (action) {
        !listeners[action] && (listeners[action] = []);
        return listeners[action];
    };
    cos.register = function (action, callback) {
        getList(action).push(callback);
    };
    cos.unRegister = function (action, callback) {
        var list = getList(action);
        for (var i = list.length - 1; i >= 0; i--) {
            callback === list[i] && list.splice(i, 1);
        }
    };
    cos._runRegister = function (action, data, callback) {
        var list = getList(action).map(function (cb) {
            return cb;
        });
        async.eachLimit(list, 1, function (hook, nextHook) {
            hook(data, nextHook);
        }, function () {
            callback();
        });
    };
};

module.exports.init = init;