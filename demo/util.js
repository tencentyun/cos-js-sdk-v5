var util = {
    createFile: function (options) {
        var buffer = new ArrayBuffer(options.size || 0);
        var arr = new Uint8Array(buffer);
        arr.forEach(function (char, i) {
            arr[i] = 0;
        });
        var opt = {};
        options.type && (opt.type = options.type);
        var blob = new Blob([buffer], options);
        return blob;
    }
};