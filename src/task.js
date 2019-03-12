var util = require('./util');

var originApiMap = {};
var transferToTaskMethod = function (apiMap, apiName) {
    originApiMap[apiName] = apiMap[apiName];
    apiMap[apiName] = function (params, callback) {
        if (params.SkipTask) {
            originApiMap[apiName].call(this, params, callback);
        } else {
            this._addTask(apiName, params, callback);
        }
    };
};

var initTask = function (cos) {

    var queue = [];
    var tasks = {};
    var uploadingFileCount = 0;
    var nextUploadIndex = 0;

    // 接口返回简略的任务信息
    var formatTask = function (task) {
        var t = {
            id: task.id,
            Bucket: task.Bucket,
            Region: task.Region,
            Key: task.Key,
            FilePath: task.FilePath,
            state: task.state,
            loaded: task.loaded,
            size: task.size,
            speed: task.speed,
            percent: task.percent,
            hashPercent: task.hashPercent,
            error: task.error,
        };
        if (task.FilePath) t.FilePath = task.FilePath;
        return t;
    };

    var emitListUpdate = function () {
        cos.emit('task-list-update', {list: util.map(queue, formatTask)});
        cos.emit('list-update', {list: util.map(queue, formatTask)});
    };

    var clearQueue = function () {
        if (queue.length > cos.options.UploadQueueSize) {
            var i;
            for (i = 0;
                 i < queue.length &&
                 queue.length > cos.options.UploadQueueSize && // 大于队列才处理
                 i < nextUploadIndex; // 小于当前操作的 index 才处理
                 i++) {
                var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';
                if (!queue[i] || !isActive) {
                    tasks[queue[i].id] && (delete tasks[queue[i].id]);
                    queue.splice(i, 1);
                    nextUploadIndex--;
                }
            }
        }
    };

    var startNextTask = function () {
        if (nextUploadIndex < queue.length &&
            uploadingFileCount < cos.options.FileParallelLimit) {
            var task = queue[nextUploadIndex];
            nextUploadIndex++;
            if (task.state === 'waiting') {
                uploadingFileCount++;
                task.state = 'checking';
                !task.params.UploadData && (task.params.UploadData = {});
                var apiParams = util.formatParams(task.api, task.params);
                originApiMap[task.api].call(cos, apiParams, function (err, data) {
                    if (!cos._isRunningTask(task.id)) return;
                    if (task.state === 'checking' || task.state === 'uploading') {
                        task.state = err ? 'error' : 'success';
                        err && (task.error = err);
                        uploadingFileCount--;
                        emitListUpdate();
                        startNextTask(cos);
                        task.callback && task.callback(err, data);
                        if (task.state === 'success') {
                            if (task.params) {
                                delete task.params.UploadData;
                                delete task.params.Body;
                                delete task.params;
                            }
                            delete task.callback;
                        }
                    }
                    clearQueue();
                });
                emitListUpdate();
            }
            startNextTask(cos);
        }
    };

    var killTask = function (id, switchToState) {
        var task = tasks[id];
        if (!task) return;
        var waiting = task && task.state === 'waiting';
        var running = task && (task.state === 'checking' || task.state === 'uploading');
        if (switchToState === 'canceled' && task.state !== 'canceled' ||
            switchToState === 'paused' && waiting ||
            switchToState === 'paused' && running) {
            if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {
                console.error('stream not support pause');
                return;
            }
            task.state = switchToState;
            cos.emit('inner-kill-task', {TaskId: id, toState: switchToState});
            emitListUpdate();
            if (running) {
                uploadingFileCount--;
                startNextTask(cos);
            }
            if (switchToState === 'canceled') {
                if (task.params) {
                    delete task.params.UploadData;
                    delete task.params.Body;
                    delete task.params;
                }
                delete task.callback;
            }
        }
        clearQueue();
    };

    cos._addTasks = function (taskList) {
        util.each(taskList, function (task) {
            cos._addTask(task.api, task.params, task.callback, true);
        });
        emitListUpdate();
    };

    cos._addTask = function (api, params, callback, ignoreAddEvent) {

        // 复制参数对象
        params = util.formatParams(api, params);

        // 生成 id
        var id = util.uuid();
        params.TaskId = id;
        params.TaskReady && params.TaskReady(id);

        var task = {
            // env
            params: params,
            callback: callback,
            api: api,
            index: queue.length,
            // task
            id: id,
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            FilePath: params.FilePath || '',
            state: 'waiting',
            loaded: 0,
            size: 0,
            speed: 0,
            percent: 0,
            hashPercent: 0,
            error: null,
        };
        var onHashProgress = params.onHashProgress;
        params.onHashProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.hashPercent = info.percent;
            onHashProgress && onHashProgress(info);
            emitListUpdate();
        };
        var onProgress = params.onProgress;
        params.onProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.state === 'checking' && (task.state = 'uploading');
            task.loaded = info.loaded;
            task.speed = info.speed;
            task.percent = info.percent;
            onProgress && onProgress(info);
            emitListUpdate();
        };

        // 异步获取 filesize
        util.getFileSize(api, params, function (err, size) {
            // 开始处理上传
            if (err) { // 如果获取大小出错，不加入队列
                callback(err);
                return;
            }
            // 获取完文件大小再把任务加入队列
            tasks[id] = task;
            queue.push(task);
            task.size = size;
            !ignoreAddEvent && emitListUpdate();
            startNextTask(cos);
            clearQueue();
        });
        return id;
    };
    cos._isRunningTask = function (id) {
        var task = tasks[id];
        return !!(task && (task.state === 'checking' || task.state === 'uploading'));
    };
    cos.getTaskList = function () {
        return util.map(queue, formatTask);
    };
    cos.cancelTask = function (id) {
        killTask(id, 'canceled')
    };
    cos.pauseTask = function (id) {
        killTask(id, 'paused')
    };
    cos.restartTask = function (id) {
        var task = tasks[id];
        if (task && (task.state === 'paused' || task.state === 'error')) {
            task.state = 'waiting';
            emitListUpdate();
            nextUploadIndex = Math.min(nextUploadIndex, task.index);
            startNextTask();
        }
    };
    cos.isUploadRunning = function () {
        return uploadingFileCount || nextUploadIndex < queue.length;
    };

};

module.exports.transferToTaskMethod = transferToTaskMethod;
module.exports.init = initTask;
