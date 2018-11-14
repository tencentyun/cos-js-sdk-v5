var Bucket = 'test-1250000000';
var Region = 'ap-guangzhou';

var cos = new COS({
    FileParallelLimit: 5,
    ChunkParallelLimit: 5,
    ChunkMbSize: 8 * 1024 * 1024,
    getAuthorization: function (options, callback) {
        var url = '../../server/sts.php';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            try {
                var data = JSON.parse(e.target.responseText);
            } catch (e) {
            }
            callback({
                TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                ExpiredTime: data.expiredTime,
            });
        };
        xhr.send();
    }
});

new Vue({
    el: '#app',
    data: function () {
        return {
            FileParallelLimit: 5,
            ChunkParallelLimit: 16,
            ChunkMbSize: 2,
            list: [],
        };
    },
    created: function () {
        cos.on('list-update', data => {
            this.list = data.list;
        });
    },
    methods: {
        formatSize: function (size) {
            var i, unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
            for (i = 0; i < unit.length && size >= 1024; i++) {
                size /= 1024;
            }
            return (Math.round(size * 100) / 100 || 0) + unit[i];
        },
        selectedFile: function (e) {
            var files = e.target.files;
            var list = [].map.call(files, function (f) {
                return {
                    Bucket: Bucket,
                    Region: Region,
                    Key: f.name,
                    Body: f,
                };
            });
            cos.uploadFiles({files: list});
            document.getElementById('form').reset();
        },
        pauseTask: function (task) {
            cos.pauseTask(task.id);
        },
        restartTask: function (task) {
            cos.restartTask(task.id);
        },
        cancelTask: function (task) {
            cos.cancelTask(task.id);
        },
    },
});