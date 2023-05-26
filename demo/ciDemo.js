// @ts-check
// config 替换成自己的存储桶和账号信息
var config = {
  Bucket: 'test-1250000000',
  Region: 'ap-guangzhou',
  Uin: '10001',
};

var util = {
  createFile: function (options) {
    var buffer = new ArrayBuffer(options.size || 0);
    var arr = new Uint8Array(buffer);
    [].forEach.call(arr, function (char, i) {
      arr[i] = 0;
    });
    var opt = {};
    options.type && (opt.type = options.type);
    var blob = new Blob([buffer], options);
    return blob;
  },
  selectLocalFile: function (onChange) {
    var id = 'file_selector';
    var input = document.createElement('input');
    input.style = 'width:0;height:0;border:0;margin:0;padding:0;';
    input.type = 'file';
    input.id = id;
    input.onchange = function (e) {
      var files = this.files;
      if (!files.length) return;
      onChange && onChange(files);
      document.body.removeChild(input);
    };
    document.body.appendChild(input);
    input.click();
  },
};

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function (str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
};

var getAuthorization = function (options, callback) {
  // 格式一、（推荐）后端通过获取临时密钥给到前端，前端计算签名
  // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
  // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
  var url = '/sts'; // 如果是 npm run sts.js 起的 nodejs server，使用这个
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    try {
      var data = JSON.parse(e.target.responseText);
      var credentials = data.credentials;
    } catch (e) {}
    if (!data || !credentials) {
      return logger.error('credentials invalid:\n' + JSON.stringify(data, null, 2));
    }
    callback({
      TmpSecretId: credentials.tmpSecretId,
      TmpSecretKey: credentials.tmpSecretKey,
      SecurityToken: credentials.sessionToken,
      StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
      ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
      ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
    });
  };
  xhr.send(JSON.stringify(options.Scope));

  // // 格式二、（推荐）【细粒度控制权限】后端通过获取临时密钥给到前端，前端只有相同请求才重复使用临时密钥，后端可以通过 Scope 细粒度控制权限
  // // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
  // // var url = '../server/sts.php'; // 如果起的是 php server 用这个
  // var url = '/sts-scope'; // 如果是 npm run sts.js 起的 nodejs server，使用这个
  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onload = function (e) {
  //     try {
  //         var data = JSON.parse(e.target.responseText);
  //         var credentials = data.credentials;
  //     } catch (e) {
  //     }
  //     if (!data || !credentials) {
  //         return logger.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
  //     };
  //     callback({
  //         TmpSecretId: credentials.tmpSecretId,
  //         TmpSecretKey: credentials.tmpSecretKey,
  //         SecurityToken: credentials.sessionToken,
  //         StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
  //         ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
  //         ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
  //     });
  // };
  // xhr.send(JSON.stringify(options.Scope));

  // // 格式三、（不推荐，分片上传权限不好控制）前端每次请求前都需要通过 getAuthorization 获取签名，后端使用固定密钥或临时密钥计算签名返回给前端
  // // 服务端获取签名，请参考对应语言的 COS SDK：https://cloud.tencent.com/document/product/436/6474
  // // 注意：这种有安全风险，后端需要通过 method、pathname 严格控制好权限，比如不允许 put / 等
  // var method = (options.Method || 'get').toLowerCase();
  // var query = options.Query || {};
  // var headers = options.Headers || {};
  // var pathname = options.Pathname || '/';
  // // var url = 'http://127.0.0.1:3000/auth';
  // var url = '../server/auth.php';
  // var xhr = new XMLHttpRequest();
  // var data = {
  //     method: method,
  //     pathname: pathname,
  //     query: query,
  //     headers: headers,
  // };
  // xhr.open('POST', url, true);
  // xhr.setRequestHeader('content-type', 'application/json');
  // xhr.onload = function (e) {
  //     try {
  //         var data = JSON.parse(e.target.responseText);
  //     } catch (e) {
  //     }
  //     if (!data || !data.authorization) return console.error('authorization invalid');
  //     callback({
  //         Authorization: data.authorization,
  //         // SecurityToken: data.sessionToken, // 如果使用临时密钥，需要把 sessionToken 传给 SecurityToken
  //     });
  // };
  // xhr.send(JSON.stringify(data));

  // // 格式四、（不推荐，适用于前端调试，避免泄露密钥）前端使用固定密钥计算签名
  // var authorization = COS.getAuthorization({
  //     SecretId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 可传固定密钥或者临时密钥
  //     SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 可传固定密钥或者临时密钥
  //     Method: options.Method,
  //     Pathname: options.Pathname,
  //     Query: options.Query,
  //     Headers: options.Headers,
  //     Expires: 900,
  // });
  // callback({
  //     Authorization: authorization,
  //     // SecurityToken: credentials.sessionToken, // 如果使用临时密钥，需要传 SecurityToken
  // });
};

var cos = new COS({
  getAuthorization: getAuthorization,
  UploadCheckContentMd5: true,
});

var TaskId;

var pre = document.querySelector('.result');
var showLogText = function (text, color) {
  if (typeof text === 'object') {
    try {
      text = JSON.stringify(text);
    } catch (e) {}
  }
  var div = document.createElement('div');
  div.innerText = text;
  color && (div.style.color = color);
  pre.appendChild(div);
  pre.style.display = 'block';
  pre.scrollTop = pre.scrollHeight;
};

var logger = {
  log: function (text) {
    console.log.apply(console, arguments);
    var args = [].map.call(arguments, function (v) {
      return typeof v === 'object' ? JSON.stringify(v, null, 2) : v;
    });

    var logStr = args.join(' ');

    if (logStr.length > 1000000) {
      logStr = logStr.slice(0, 1000000) + '...content is too long, the first 1000000 characters are intercepted';
    }

    showLogText(logStr);
  },
  error: function (text) {
    console.error(text);
    showLogText(text, 'red');
  },
};

function getObjectUrl() {
  var url = cos.getObjectUrl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1mb.zip',
      Expires: 60,
      Sign: true,
    },
    function (err, data) {
      logger.log('getObjectUrl:', err || (data && data.Url));
    },
  );
  logger.log('getObjectUrl:', url);
}

function request() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: '1.png',
      Method: 'POST',
      Action: 'image_process',
      Headers: {
        // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
        'Pic-Operations':
          '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/"}]}',
      },
    },
    function (err, data) {
      logger.log('request:', err || data);
    },
  );
}

function CIExample1() {
  util.selectLocalFile(function (files) {
    var file = files && files[0];
    if (!file) return;
    if (file.type.indexOf('image') < 0) {
      logger.error('Please select a photo to upload!');
      return;
    }
    if (file.size > 1024 * 1024) {
      cos.sliceUploadFile(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          Headers: {
            // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
            'Pic-Operations':
              '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/"}]}',
          },
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onHashProgress: function (progressData) {
            logger.log('onHashProgress', JSON.stringify(progressData));
          },
          onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('CIExample1:', err || data);
        },
      );
    } else {
      cos.putObject(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          Headers: {
            // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
            'Pic-Operations':
              '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/"}]}',
          },
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onHashProgress: function (progressData) {
            logger.log('onHashProgress', JSON.stringify(progressData));
          },
          onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('CIExample1:', err || data);
        },
      );
    }
  });
}
function CIExample2() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: 'photo.png',
      Method: 'POST',
      Action: 'image_process',
      Headers: {
        // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
        'Pic-Operations':
          '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/thumbnail/200x/"}]}',
      },
    },
    function (err, data) {
      logger.log('CIExample2:', err || data);
    },
  );
}
function CIExample3() {
  cos.getObject(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: 'photo.png',
      QueryString: `imageMogr2/thumbnail/200x/`,
    },
    function (err, data) {
      logger.log('CIExample3:', err || data);
    },
  );
}
function CIExample4() {
  // 生成带图片处理参数的文件签名URL，过期时间设置为 30 分钟。
  cos.getObjectUrl(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: 'photo.png',
      QueryString: `imageMogr2/thumbnail/200x/`,
      Expires: 1800,
      Sign: true,
    },
    function (err, data) {
      logger.log('getObjectUrl with sign: ', err || (data && data.Url));
    },
  );

  // 生成带图片处理参数的文件URL，不带签名。
  cos.getObjectUrl(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: 'photo.png',
      QueryString: `imageMogr2/thumbnail/200x/`,
      Sign: false,
    },
    function (err, data) {
      logger.log('getObjectUrl without sign: ', err || (data && data.Url));
    },
  );
}

// 查询已经开通数据万象功能的存储桶
function describeMediaBuckets() {
  var host = 'ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/mediabucket';
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: 'mediabucket', // 固定值，必须
      Url: url,
      Query: {
        pageNumber: '1', // 第几页，非必须
        pageSize: '10', // 每页个数，非必须
        // regions: 'ap-chengdu', // 地域信息，例如'ap-beijing'，支持多个值用逗号分隔如'ap-shanghai,ap-beijing'，非必须
        // bucketNames: 'test-1250000000', // 存储桶名称，精确搜索，例如'test-1250000000'，支持多个值用逗号分隔如'test1-1250000000,test2-1250000000'，非必须
        // bucketName: 'test', //存储桶名称前缀，前缀搜索，例如'test'，支持多个值用逗号分隔如'test1,test2'，非必须
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 获取媒体文件信息
function getMediaInfo() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: 'test.mp4',
      Query: {
        'ci-process': 'videoinfo', // 固定值，必须
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 获取媒体文件某个时间的截图
function getSnapshot() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: 'test.mp4',
      Query: {
        'ci-process': 'snapshot', // 固定值，必须
        time: 1, // 截图的时间点，单位为秒，必须
        // width: 0, // 截图的宽，非必须
        // height: 0, // 截图的高，非必须
        // format: 'jpg', // 截图的格式，支持 jpg 和 png，默认 jpg，非必须
        // rotate: 'auto', // 图片旋转方式，默认为'auto'，非必须
        // mode: 'exactframe', // 截帧方式，默认为'exactframe'，非必须
      },
      RawBody: true,
      // 可选返回文件格式为blob
      DataType: 'blob',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 图片同步审核
function getImageAuditing() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '1.png',
      Query: {
        'ci-process': 'sensitive-content-recognition', // 固定值，必须
        'biz-type': '', // 审核类型，非必须
        'detect-url': '', // 审核任意公网可访问的图片链接，非必须
        interval: 5, // 审核 GIF 动图时，每隔interval帧截取一帧，非必须
        'max-frames': 5, // 审核 GIF 动图时，最大截帧数，非必须
        'large-image-detect': '0', // 是否需要压缩图片后再审核，非必须
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 图片批量审核
function postImagesAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/image/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: [
        {
          Object: '1.png',
        },
        {
          Object: '6.png',
        },
      ],
      Conf: {
        BizType: '',
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/image/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询图片审核任务结果
function getImageAuditingResult() {
  var jobId = 'si8263213daf3711eca0d1525400d88xxx'; // jobId可以通过图片批量审核返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/image/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/image/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交视频审核任务
function postVideoAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/video/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: {
        Object: '1.mp4',
      },
      Conf: {
        BizType: '',
        Snapshot: {
          Count: 1000, // 视频截帧数量
        },
        DetectContent: 1, // 是否审核视频声音,0-只审核视频不审核声音；1-审核视频+声音
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/video/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询视频审核任务结果
function getVideoAuditingResult() {
  var jobId = 'av14d9ca15af3a11eca0d6525400d88xxx'; // jobId可以通过提交视频审核任务返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/video/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/video/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交音频审核任务
function postAudioAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/audio/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: {
        Object: '1.mp3',
      },
      Conf: {
        BizType: '',
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/audio/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询音频审核任务结果
function getAudioAuditingResult() {
  var jobId = 'sa0c28d41daff411ecb23352540078cxxx'; // jobId可以通过提交音频审核任务返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/audio/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/audio/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交文本审核任务
function postTextAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/text/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: {
        // Object: 'hello.txt', // 存在cos里的资源，审核结果异步返回，可以调用查询文本审核结果api查询
        Content: '5Lmz5rKf', // 经过base64编码过的文本”乳沟“，查询结果同步返回
      },
      Conf: {
        BizType: '',
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/text/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询文本审核任务结果
function getTextAuditingResult() {
  var jobId = 'st8d88c664aff511ecb23352540078cxxx'; // jobId可以通过提交文本审核任务返回（Input传入Object）
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/text/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/text/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交文档审核任务
function postDocumentAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/document/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: {
        Object: 'test.xlsx', // 存在cos里的资源，审核结果异步返回，可以调用查询文本审核结果api查询
      },
      Conf: {
        BizType: '',
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/document/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询文档审核任务结果
function getDocumentAuditingResult() {
  var jobId = 'sd7815c21caff611eca12f525400d88xxx'; // jobId可以通过提交文档审核任务返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/document/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/document/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交网页审核任务
function postWebpageAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/webpage/auditing';
  var body = COS.util.json2xml({
    Request: {
      Input: {
        Url: 'https://cloud.tencent.com/', // 存在cos里的资源，审核结果异步返回，可以调用查询文本审核结果api查询
      },
      Conf: {
        BizType: '',
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/webpage/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询网页审核任务结果
function getWebpageAuditingResult() {
  var jobId = 'shce868019aff611ecb1155254009a4xxx'; // jobId可以通过提交网页审核任务返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/webpage/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/webpage/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交直播审核任务
function postLiveAuditing() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/video/auditing';
  var body = COS.util.json2xml({
    Request: {
      Type: 'live_video',
      Input: {
        Url: 'rtmp://example.com/live/123', // 需要审核的直播流播放地址
        // DataId: '',
        // UserInfo: {},
      },
      Conf: {
        BizType: '766d07a7af937c26216c51db29793ea6',
        // Callback: 'https://callback.com', // 回调地址，非必须
        // CallbackType: 1, // 回调片段类型，非必须
      },
    },
  });
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'POST',
      Url: url,
      Key: '/video/auditing',
      ContentType: 'application/xml',
      Body: body,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询直播审核任务结果
function getLiveAuditingResult() {
  var jobId = 'av0ca69557bd6111ed904c5254009411xx'; // jobId可以通过提交直播审核任务返回
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host + '/video/auditing/' + jobId;
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET',
      Key: '/video/auditing/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询已经开通文档预览的存储桶
function describeDocProcessBuckets() {
  var host = 'ci.' + config.Region + '.myqcloud.com/docbucket';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'docbucket',
      Url: url,
      Query: {
        // regions: '', // 非必须，地域信息，以“,”分隔字符串，支持 All、ap-shanghai、ap-beijing
        // bucketNames: '', // 非必须，存储桶名称，以“,”分隔，支持多个存储桶，精确搜索
        // bucketName: '', // 非必须，存储桶名称前缀，前缀搜索
        // pageNumber: 1, // 非必须，第几页
        // pageSize: 10, // 非必须，每页个数
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 文档转码同步请求
function getDocPreview() {
  cos.getObjectUrl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1/文档.docx',
      Query: {
        'ci-process': 'doc-preview', // 必须，数据万象处理能力，文档预览固定为 doc-preview
        srcType:
          'docx', // 非必须，源数据的后缀类型，当前文档转换根据 COS 对象的后缀名来确定源数据类型。当 COS 对象没有后缀名时，可以设置该值
        // page: '', // 非必须，需转换的文档页码，默认从1开始计数；表格文件中 page 表示转换的第 X 个 sheet 的第 X 张图
        // dstType: '', // 非必须，转换输出目标文件类型
      },
      DataType: 'blob',
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // Body为转码后的内容 可展示在img里 比如
        var body = data.Body;
        // const url = URL.createObjectURL(body);
        // const img = document.getElementById('image');
        // img.src = url;
        // 获取总页数(需要在跨域配置的Expose-Headers配置需要暴露出的头部 比如下方的X-Total-Page)
        // 跨域配置可参考文档 https://cloud.tencent.com/document/product/436/13318
        var totalPage = data.headers['X-Total-Page'];
      }
    },
  );
}

// 查询文档转码队列
function describeDocProcessQueues() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/docqueue';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'docqueue',
      Url: url,
      Query: {
        // queueIds: '', // 非必须，队列 ID，以“,”符号分割字符串
        // state: '', // 非必须，1=Active,2=Paused 
        // pageNumber: 1, // 非必须，第几页
        // pageSize: 2, // 非必须，每页个数
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 更新文档预览队列
function updateDocProcessQueue() {
  var queueId = 'pa2e2c3d3fae042de909cafc16f1d801b'; // 替换成自己的队列id
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/docqueue/' + queueId;
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Name: 'queue-doc-process-1', // 替换成自己的队列name
      QueueID: queueId,
      State: 'Active',
      NotifyConfig: {
        State: 'Off',
      },
    },
  });
  cos.request(
    {
      Method: 'PUT',
      Key: 'docqueue/' + queueId,
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交文档转码任务
function createDocProcessJobs() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'DocProcess',
      Input: {
        Object: '1/文档.docx', // 存在cos里的路径
      },
      Operation: {
        DocProcess: {
          TgtType: 'jpg',
        },
        Output: {
          Bucket: config.Bucket,
          Region: config.Region,
          Object: '1/文档转码_${Number}.jpg', // 转码后存到cos的路径
        },
      },
      QueueId: 'pa2e2c3d3fae042de909cafc16f1d801b', // 替换成自己的queueId
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'doc_jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询指定的文档预览任务
function describeDocProcessJob() {
  var jobId = 'd87fbabd07b8611ed974b3f4b40648xxx'; // 替换成自己的jogId
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs/' + jobId;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'doc_jobs/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 拉取符合条件的文档预览任务
function describeDocProcessJobs() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'doc_jobs',
      Url: url,
      Query: {
        queueId: 'pa2e2c3d3fae042de909cafc16f1d801b', // 替换成自己的queueId
        tag: 'DocProcess',
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 文档转 HTML
function getDocHtmlUrl() {
  cos.getObjectUrl(
    {
      Bucket: config.Bucket, // Bucket 格式：test-1250000000
      Region: config.Region,
      Key: '1/文档.docx',
      Query: {
        'ci-process': 'doc-preview', // 必须，数据万象处理能力，文档预览固定为 doc-preview
        // srcType: '', // 非必须，源数据的后缀类型，当前文档转换根据 COS 对象的后缀名来确定源数据类型。当 COS 对象没有后缀名时，可以设置该值
        // page: '', // 非必须，需转换的文档页码，默认从1开始计数；表格文件中 page 表示转换的第 X 个 sheet 的第 X 张图
        dstType: 'html' // 非必须，转换输出目标文件类型
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // 使用浏览器打开url即可预览
        var url = data.Url;
        console.log(url);
      }
    },
  );
}

// 识别图片标签
function getImageLabel() {
  var key = '1/素材.jpeg';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      Query: {
        'ci-process': 'detect-label',
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 二维码识别(上传时识别)
function identifyQrcode_put() {
  util.selectLocalFile(function (files) {
    var file = files && files[0];
    if (!file) return;
    cos.putObject(
      {
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: '1/上传二维码.png',
        Body: file,
        Headers: {
          // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
          'Pic-Operations': '{"is_pic_info": 1, "rules": [{"fileid":"test.jpg","rule":" QRcode/cover/0"}]}',
        },
        onProgress: function (progressData) {
          logger.log('onProgress', JSON.stringify(progressData));
        },
      },
      function (err, data) {
        logger.log('CIExample1:', err || data);
      },
    );
  });
}

// 二维码识别(下载时识别)
function identifyQrcode_get() {
  var key = '1/二维码图片.png';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      Query: {
        'ci-process': 'QRcode',
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 二维码生成
function generateQrcode() {
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: '',
      Url: url,
      Query: {
        'ci-process': 'qrcode-generate', // 必须，对象存储处理能力，二维码生成参数为 qrcode-generate
        'qrcode-content': '二维码文案', // 必须，可识别的二维码文本信息
        // mode: 0, // 非必须，生成的二维码类型，可选值：0或1。0为二维码，1为条形码，默认值为0
        width: 200 //必须，指定生成的二维码或条形码的宽度，高度会进行等比压缩
      },
    },
    function (err, data) {
      if (!err) {
        // 获得二维码base64
        var imgBase64 = data.Response.ResultImage;
        // 比如可拼接前缀直接展示在img里
        // document.querySelector('#img').src = 'data:image/jpg;base64,' + imgBase64;
      }
    },
  );
}

// 图片文字识别
function ocr() {
  var key = '1/素材.jpeg';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      Query: {
        'ci-process': 'OCR', // 必须，数据万象处理能力，图片文字识别固定为 OCR
        // type: '', // 非必须，OCR 的识别类型
        // 'language-type': '', // 非必须，type 值为 general 时有效，表示识别语言类型
        // ispdf: false, // 非必须，type 值为 general、fast 时有效，表示是否开启 PDF 识别
        // 'pdf-pagenumber': '', // 非必须，type 值为 general、fast 时有效，表示需要识别的 PDF 页面的对应页码
        // isword: false, // 非必须，type 值为 general、accurate 时有效，表示识别后是否需要返回单字信息
        // 'enable-word-polygon': false, // 非必须，type 值为 handwriting 时有效，表示是否开启单字的四点定位坐标输出
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交文件压缩任务
function postFileCompress() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'FileCompress', // 必须
      Operation: {
        FileCompressConfig: {
          Flatten: '0', // 文件打包时，是否需要去除源文件已有的目录结构.0:不需要;1:需要
          Format: 'zip', // 打包压缩的类型，有效值：zip、tar、tar.gz
          // UrlList、Prefix、Key 三者仅能选择一个，不能都为空，也不会同时生效
          // UrlList: '', // 索引文件的对象地址
          Prefix: 'testCompress/', // 目录前缀
          // Key: [], // 支持对存储桶中的多个文件进行打包，个数不能超过 1000, 总大小不超过50G，否则会导致任务失败
        },
        Output: {
          Bucket: config.Bucket, // 保存压缩后文件的存储桶
          Region: config.Region, // 保存压缩后文件的存储桶地域
          Object: 'testCompress/compressed.zip', // 压缩后文件的文件名
        },
        UserData: '',
      },
      // QueueId: '', // 任务所在的队列 ID
      // CallBack: 'http://callback.demo.com', // 任务回调的地址
      // CallBackFormat: 'JSON', // 任务回调格式
      // CallBackType: 'Url', // 任务回调类型，Url 或 TDMQ，默认 Url
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'file_jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询文件压缩任务结果
function getFileCompress() {
  var jobId = 'faf1d2774a13911ed88a65b0c303ae7xx'; // 提交文件压缩任务后会返回当前任务的jobId
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'file_jobs/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交文件解压任务
function postFileUnCompress() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'FileUncompress', // 必须
      Input: {
        Object: 'testCompress/compressed.zip', // 文件名，取值为文件在当前存储桶中的完整名称
      },
      Operation: {
        FileUncompressConfig: {
          Prefix: '', // 指定解压后输出文件的前缀，不填则默认保存在存储桶根路径
          PrefixReplaced: '0', // 指定解压后的文件路径是否需要替换前缀,默认0
        },
        Output: {
          Bucket: config.Bucket, // 保存解压后文件的存储桶
          Region: config.Region, // 保存解压后文件的存储桶地域
        },
      },
      // QueueId: '', // 任务所在的队列 ID
      // CallBack: 'http://callback.demo.com', // 任务回调的地址
      // CallBackFormat: 'JSON', // 任务回调格式
      // CallBackType: 'Url', // 任务回调类型，Url 或 TDMQ，默认 Url
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'file_jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询文件解压任务结果
function getFileUnCompress() {
  var jobId = 'fe7b0fa34a13911eda186254bb8f3aaxx'; // 提交文件解压任务后会返回当前任务的jobId
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'file_jobs/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交哈希值计算任务
function postFileHash() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'FileHashCode', // 必须
      Input: {
        Object: 'test/1.pdf', // 文件名，取值为文件在当前存储桶中的完整名称
      },
      Operation: {
        FileHashCodeConfig: {
          Type: 'MD5', // 哈希值的算法类型，有效值：MD5、SHA1、SHA256
          AddToHeader: 'false', // 是否将计算得到的哈希值添加至文件自定义header, 有效值：true、false，默认值为 false。
        },
        // UserData: '', // 透传用户信息, 可打印的 ASCII 码, 长度不超过1024
      },
      // QueueId: '', // 任务所在的队列 ID
      // CallBack: 'http://callback.demo.com', // 任务回调的地址
      // CallBackFormat: 'JSON', // 任务回调格式
      // CallBackType: 'Url', // 任务回调类型，Url 或 TDMQ，默认 Url
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'file_jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询哈希值计算任务结果
function getFileHashResult() {
  var jobId = 'f3addcbd0a13811ed9b4ff5338d756fxx'; // 提交文件哈希值计算任务后会返回当前任务的jobId
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'file_jobs/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交病毒检测任务
function postVirusDetect() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/virus/detect';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Input: {
        Object: 'test/1.png', // 文件名，取值为文件在当前存储桶中的完整名称，与Url参数二选一
        // Url: 'http://examplebucket-1250000000.cos.ap-shanghai.myqcloud.com/virus.doc', // 病毒文件的链接地址，与Object参数二选一
      },
      Conf: {
        DetectType: 'Virus', // 检测的病毒类型，当前固定为：Virus
        // CallBack: 'http://callback.demo.com', // 任务回调的地址
      },
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'virus/detect',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询病毒检测任务结果
function getVirusDetectResult() {
  var jobId = 'ssdb2dab23bcdb11ed9efb5254009411xx'; // 提交病毒检测任务后会返回当前任务的jobId
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/virus/detect/' + jobId;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'virus/detect/' + jobId,
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交音频降噪任务
function postNoiseReduction() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'NoiseReduction',
      Input: {
        Object: 'ci/music.mp3', // 文件名，取值为文件在当前存储桶中的完整名称
      },
      Operation: {
        Output: {
          Bucket: config.Bucket, // 输出的存储桶
          Region: config.Region, // 输出的存储桶的地域
          Object: 'ci/out.mp3', // 输出的文件Key
        },
      },
      // QueueId: '', // 任务所在的队列 ID，非必须
      // CallBackFormat: '', // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式，非必须
      // CallBackType: '', // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型，非必须
      // CallBack: '', // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调，非必须
      // CallBackMqConfig: '', // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填，非必须
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交人声分离任务
function postVoiceSeparate() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'VoiceSeparate',
      Input: {
        Object: 'ci/music.mp3', // 文件名，取值为文件在当前存储桶中的完整名称
      },
      Operation: {
        // VoiceSeparate: {}, // 指定转码模板参数，非必须
        TemplateId: 't13fca82ad97e84878a22cd81bd2e5652c', // 指定的模板 ID，必须
        // JobLevel: 0, // 任务优先级，级别限制：0 、1 、2。级别越大任务优先级越高，默认为0，非必须
        Output: {
          Bucket: config.Bucket, // 输出的存储桶
          Region: config.Region, // 输出的存储桶的地域
          Object: 'ci/out/background.mp3', // 输出的文件Key,背景音结果文件名，不能与 AuObject 同时为空
          AuObject: 'ci/out/audio.mp3',
        },
      },
      // QueueId: '', // 任务所在的队列 ID，非必须
      // CallBackFormat: '', // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式，非必须
      // CallBackType: '', // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型，非必须
      // CallBack: '', // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调，非必须
      // CallBackMqConfig: '', // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填，非必须
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交语音合成任务
function postTts() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'Tts',
      Operation: {
        // VoiceSeparate: {}, // 指定转码模板参数，非必须
        TemplateId: 't192931b3564084168a3f50ebfea59acb3', // 指定的模板 ID，必须
        // JobLevel: 0, // 任务优先级，级别限制：0 、1 、2。级别越大任务优先级越高，默认为0，非必须
        TtsConfig: {
          InputType: 'Text',
          Input: '床前明月光，疑是地上霜',
        },
        Output: {
          Bucket: config.Bucket, // 输出的存储桶
          Region: config.Region, // 输出的存储桶的地域
          Object: 'ci/out/tts.mp3', // 输出的文件Key
        },
      },
      // QueueId: '', // 任务所在的队列 ID，非必须
      // CallBackFormat: '', // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式，非必须
      // CallBackType: '', // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型，非必须
      // CallBack: '', // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调，非必须
      // CallBackMqConfig: '', // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填，非必须
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交语音识别任务
function postSpeechRecognition() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/asr_jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'SpeechRecognition',
      Input: {
        Object: 'ci/music.mp3', // 文件名，取值为文件在当前存储桶中的完整名称，与Url参数二选一
        // Url: 'http://examplebucket-1250000000.cos.ap-shanghai.myqcloud.com/music.mp3', // 病毒文件的链接地址，与Object参数二选一
      },
      Operation: {
        SpeechRecognition: {
          EngineModelType: '16k_zh_video', // 引擎模型类型
          ChannelNum: 1, // 语音声道数
          ResTextFormat: 0, // 识别结果返回形式
          FilterDirty: 1, // 是否过滤脏词（目前支持中文普通话引擎）
          FilterModal: 1, // 是否过语气词（目前支持中文普通话引擎）
          ConvertNumMode: 0, // 是否进行阿拉伯数字智能转换（目前支持中文普通话引擎）
        },
        Output: {
          Bucket: config.Bucket, // 输出的存储桶
          Region: config.Region, // 输出的存储桶的地域
          Object: 'ci/out/SpeechRecognition.mp3', // 输出的文件Key
        },
      },
      // QueueId: '', // 任务所在的队列 ID，非必须
      // CallBackFormat: '', // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式，非必须
      // CallBackType: '', // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型，非必须
      // CallBack: '', // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调，非必须
      // CallBackMqConfig: '', // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填，非必须
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'asr_jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询语音识别队列
function getAsrQueue() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/asrqueue';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'asrqueue',
      Url: url,
      Query: {
        // queueIds: '', // 非必须，队列 ID，以“,”符号分割字符串
        // state: '', // 非必须，1=Active,2=Paused
        // pageNumber: 1, // 非必须，第几页
        // pageSize: 2, // 非必须，每页个数
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 更新语音识别队列
function putAsrQueue() {
  var queueId = 'pcc77499e85c311edb9865254008618d9';
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/asrqueue/' + queueId;
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Name: 'queue-doc-process-1',
      QueueID: queueId,
      State: 'Paused',
      NotifyConfig: {
        // Url: '',
        // Type: 'Url',
        // Event: '',
        State: 'Off',
      },
    },
  });
  cos.request(
    {
      Method: 'PUT',
      Key: 'asrqueue/' + queueId,
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询语音识别开通状态
function getAsrBucket() {
  var host = 'ci.' + config.Region + '.myqcloud.com/asrbucket';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'asrbucket',
      Url: url,
      Query: {
        // regions: '', // 非必须，地域信息，以“,”分隔字符串，支持 All、ap-shanghai、ap-beijing
        // bucketNames: '', // 非必须，存储桶名称，以“,”分隔，支持多个存储桶，精确搜索
        // bucketName: '', // 非必须，存储桶名称前缀，前缀搜索
        // pageNumber: 1, // 非必须，第几页
        // pageSize: 10, // 非必须，每页个数
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 获取在线文档预览地址
function getDocHtmlPreviewUrl() {
  var key = 'test.pdf';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      RawBody: true,
      Query: {
        'ci-process': 'doc-preview', // 必须，预览固定参数，值为 doc-preview
        dstType: 'html', // 必须，预览类型，如需预览生成类型为 html 则填入 html
        weboffice_url: 1 // 非必须，是否获取预览链接。填入值为1会返回预览链接和Token信息；填入值为2只返回Token信息；不传会直接预览
      },
    },
    function (err, data) {
      // 从响应数据中解析出在线文档预览地址
      let body = {};
      if (data && data.Body) {
        body = JSON.parse(data.Body) || {};
      }
      if (body && body.PreviewUrl) {
        data.PreviewUrl = body.PreviewUrl;
      }
      logger.log(err || data);
    },
  );
}

// 开通文件处理服务
function createFileProcessBucket() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_bucket';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'POST',
      Key: 'file_bucket',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询文件处理队列
function describeFileProcessQueues() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_queue';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'file_queue',
      Url: url,
      Query: {
        // queueIds: '', // 非必须，队列 ID，以“,”符号分割字符串
        state:
          'Active', // 非必须，Active 表示队列内的作业会被调度执行。Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响
        pageNumber: 1, // 第几页,默认值1
        pageSize: 10 // 非必须，每页个数,默认值10
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 更新文件处理队列
function updateFileProcessQueue() {
  var queueId = 'p6160ada105a7408e95aac015f4bf8xxx';
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_queue/' + queueId;
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Name: 'My-Queue-file', // 必须，队列名称,长度不超过128
      State: 'Active', // 必须，Active 表示队列内的作业会被调度执行。Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响。
      NotifyConfig: {
        // 必须，回调配置
        State: 'On', // 必须，回调开关，Off/On，默认Off
        Event: 'TaskFinish', // 回调事件，当 State=On时, 必选。任务完成：TaskFinish；工作流完成：WorkflowFinish
        ResultFormat: 'XML', // 非必选，回调格式，JSON/XML
        Type: 'Url', // 回调类型，当 State=On时, 必选，Url 或 TDMQ
        Url: 'https://www.example.com', // 回调地址，当 State=On, 且Type=Url时, 必选
        // MqMode: 'Off', // TDMQ 使用模式，当 State=On, 且Type=TDMQ时, 必选
        // MqRegion: 'Off', // TDMQ 所属园区，当 State=On, 且Type=TDMQ时, 必选
        // MqName: 'Off', // TDMQ 主题名称，当 State=On, 且Type=TDMQ时, 必选
      },
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'file_queue/' + queueId,
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 哈希值计算同步请求
function generateFileHash() {
  var key = 'test.pdf';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      Query: {
        'ci-process': 'filehash', // 必须，操作类型，哈希值计算固定为：filehash
        type: 'md5', // 必须，支持的哈希算法类型，有效值：md5、sha1、sha256
        // 'addtoheader': false, // 非必须，是否将计算得到的哈希值，自动添加至文件的自定义header，格式为：x-cos-meta-md5/sha1/sha256;有效值：true、false，不填则默认为false。
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 图片样式 - 增加样式
function addImageStyle() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    AddStyle: {
      StyleName: 'style_name1', // 必须，样式名称
      StyleBody: 'imageMogr2/thumbnail/!50px', // 必须，样式详情
    },
  });
  cos.request(
    {
      Method: 'PUT',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 图片样式 - 查询样式
function describeImageStyles() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Url: url,
      Query: {
        'style-name': 'style_name', // 非必填，样式名称
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 图片样式 - 删除样式
function deleteImageStyle() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    DeleteStyle: {
      StyleName: 'style_name1', // 必须，样式名称
    },
  });
  cos.request(
    {
      Method: 'DELETE',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 开通 Guetzli 压缩
function openImageGuetzli() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'PUT',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询 Guetzli 状态
function describeImageGuetzli() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 关闭 Guetzli 压缩
function closeImageGuetzli() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'DELETE',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 上传时使用图片压缩
function advanceCompressExample1() {
  util.selectLocalFile(function (files) {
    var file = files && files[0];
    if (!file) return;
    if (file.type.indexOf('image') < 0) {
      logger.error('Please select a photo to upload!');
      return;
    }
    if (file.size > 1024 * 1024) {
      cos.sliceUploadFile(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          Headers: {
            // 通过 imageMogr2 接口进行 avif 压缩，可以根据需要压缩的类型填入不同的压缩格式：webp/heif/tpg/avif/svgc
            'Pic-Operations':
              '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/format/avif"}]}',
          },
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onHashProgress: function (progressData) {
            logger.log('onHashProgress', JSON.stringify(progressData));
          },
          onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('advanceCompressExample1:', err || data);
        },
      );
    } else {
      cos.putObject(
        {
          Bucket: config.Bucket, // Bucket 格式：test-1250000000
          Region: config.Region,
          Key: file.name,
          Body: file,
          Headers: {
            // 通过 imageMogr2 接口进行 avif 压缩，可以根据需要压缩的类型填入不同的压缩格式：webp/heif/tpg/avif/svgc
            'Pic-Operations':
              '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/format/avif"}]}',
          },
          onTaskReady: function (tid) {
            TaskId = tid;
          },
          onHashProgress: function (progressData) {
            logger.log('onHashProgress', JSON.stringify(progressData));
          },
          onProgress: function (progressData) {
            logger.log('onProgress', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          logger.log('advanceCompressExample1:', err || data);
        },
      );
    }
  });
}

// 对云上数据进行图片压缩
function advanceCompressExample2() {
  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: '1.png',
      Method: 'POST',
      Action: 'image_process',
      Headers: {
        // 通过 imageMogr2 接口进行 avif 压缩，可以根据需要压缩的类型填入不同的压缩格式：webp/heif/tpg/avif/svgc
        'Pic-Operations':
          '{"is_pic_info": 1, "rules": [{"fileid": "desample_photo.jpg", "rule": "imageMogr2/format/avif"}]}',
      },
    },
    function (err, data) {
      logger.log('advanceCompressExample2:', err || data);
    },
  );
}

// 下载时使用图片压缩
function advanceCompressExample3() {
  cos.getObject(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Key: '1.png',
      QueryString: `imageMogr2/format/avif`, // 可以根据需要压缩的类型填入不同的压缩格式：webp/heif/tpg/avif/svgc
    },
    function (err, data) {
      logger.log('advanceCompressExample3:', err || data);
    },
  );
}

// 异常图片检测
function createImageInspectJob() {
  var key = '1.png';
  var host = config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + key;
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: key,
      Url: url,
      RawBody: true,
      Query: {
        'ci-process': 'ImageInspect' // 必须，操作类型，异常图片检测固定为：ImageInspect
      },
    },
    function (err, data) {
      // 从响应数据中解析出异常图片检测结果
      let body = {};
      if (data && data.Body) {
        body = JSON.parse(data.Body) || {};
        if (body) {
          data.body = body;
        }
      }
      logger.log(err || data);
    },
  );
}

// 查询图片处理队列
function describePicProcessQueues() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/picqueue';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Key: 'picqueue',
      Url: url,
      Query: {
        // queueIds: '', // 非必须，队列 ID，以“,”符号分割字符串
        state:
          'Active', // 非必须，1. Active 表示队列内的作业会被媒体处理服务调度执行。2. Paused 表示队列暂停，作业不再会被媒体处理调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响。
        pageNumber: 1, // 非必须，第几页,默认值1
        pageSize: 10, // 非必须，每页个数,默认值10
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 更新图片处理队列
function updatePicProcessQueue() {
  var queueId = 'p882d181160d84feca27d9376e17c4xxx';
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/picqueue/' + queueId;
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Name: 'My-Queue-Pic', // 必须，队列名称,长度不超过128
      State: 'Active', // 必须，Active 表示队列内的作业会被调度执行。Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响。
      NotifyConfig: {
        // 必须，回调配置
        State: 'On', // 必须，回调开关，Off/On，默认Off
        Event: 'TaskFinish', // 回调事件，当 State=On时, 必选。任务完成：TaskFinish；工作流完成：WorkflowFinish
        ResultFormat: 'XML', // 非必选，回调格式，JSON/XML
        Type: 'Url', // 回调类型，当 State=On时, 必选，Url 或 TDMQ
        Url: 'https://www.example.com', // 回调地址，当 State=On, 且Type=Url时, 必选
        // MqMode: 'Off', // TDMQ 使用模式，当 State=On, 且Type=TDMQ时, 必选
        // MqRegion: 'Off', // TDMQ 所属园区，当 State=On, 且Type=TDMQ时, 必选
        // MqName: 'Off', // TDMQ 主题名称，当 State=On, 且Type=TDMQ时, 必选
      },
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'picqueue/' + queueId,
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询防盗链
function describeRefer() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?hotlink';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 设置防盗链
function setRefer() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?hotlink';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Hotlink: {
      Url: 'https://www.example.com', // 必须，域名地址
      Type: 'white', // 必须，防盗链类型，white 为白名单，black 为黑名单，off 为关闭。
    },
  });
  cos.request(
    {
      Method: 'PUT',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 开通原图保护
function openOriginProtect() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'PUT',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 查询原图保护状态
function describeOriginProtect() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'GET',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 关闭原图保护
function closeOriginProtect() {
  var host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
  var url = 'https://' + host;
  cos.request(
    {
      Method: 'DELETE',
      Url: url,
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 提交视频截帧任务
function postSnapshot() {
  var host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/jobs';
  var url = 'https://' + host;
  var body = COS.util.json2xml({
    Request: {
      Tag: 'Snapshot', // 必须，固定值
      Input: {
        Object: 'ci/abc.mp4', // 文件名，取值为文件在当前存储桶中的完整名称
      },
      Operation: {
        // TemplateId与Snapshot二选一传递
        // TemplateId: '',
        Snapshot: {
          Mode: 'Interval', // 截图模式
          Start: '1', // 开始时间
          Count: '1', // 截图数量
        },
        Output: {
          Bucket: config.Bucket, // 输出的存储桶
          Region: config.Region, // 输出的存储桶的地域
          Object: 'ci/output/snapshot-${Number}.jpg', // 输出的文件 Key
        },
      },
    },
  });
  cos.request(
    {
      Method: 'POST',
      Key: 'jobs',
      Url: url,
      Body: body,
      ContentType: 'application/xml',
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

(function () {
  var list = [
    'header-图片处理',
    'CIExample1',
    'CIExample2',
    'CIExample3',
    'CIExample4',
    'addImageStyle',
    'describeImageStyles',
    'deleteImageStyle',
    'openImageGuetzli',
    'describeImageGuetzli',
    'closeImageGuetzli',
    'advanceCompressExample1',
    'advanceCompressExample2',
    'advanceCompressExample3',
    'createImageInspectJob',
    'describePicProcessQueues',
    'updatePicProcessQueue',
    'openOriginProtect',
    'describeOriginProtect',
    'closeOriginProtect',

    'header-媒体处理',
    'describeMediaBuckets',
    'getMediaInfo',
    'getSnapshot',
    'postSnapshot',

    'header-内容审核',
    'getImageAuditing',
    'postImagesAuditing',
    'getImageAuditingResult',
    'postVideoAuditing',
    'getVideoAuditingResult',
    'postAudioAuditing',
    'getAudioAuditingResult',
    'postTextAuditing',
    'getTextAuditingResult',
    'postDocumentAuditing',
    'getDocumentAuditingResult',
    'postWebpageAuditing',
    'getWebpageAuditingResult',
    'postLiveAuditing',
    'getLiveAuditingResult',

    'header-文档预览',
    'describeDocProcessBuckets',
    'getDocPreview',
    'describeDocProcessQueues',
    'updateDocProcessQueue',
    'createDocProcessJobs',
    'describeDocProcessJob',
    'describeDocProcessJobs',
    'getDocHtmlUrl',
    'getDocHtmlPreviewUrl',

    'header-AI识别',
    'getImageLabel',
    'identifyQrcode_put',
    'identifyQrcode_get',
    'generateQrcode',
    'ocr',

    'header-文件处理',
    'postFileCompress',
    'getFileCompress',
    'postFileUnCompress',
    'getFileUnCompress',
    'postFileHash',
    'getFileHashResult',
    'createFileProcessBucket',
    'describeFileProcessQueues',
    'updateFileProcessQueue',
    'generateFileHash',

    'header-病毒检测',
    'postVirusDetect',
    'getVirusDetectResult',

    'header-智能语音',
    'postNoiseReduction',
    'postVoiceSeparate',
    'postTts',
    'postSpeechRecognition',
    'getAsrQueue',
    'putAsrQueue',
    'getAsrBucket',

    'header-防盗链',
    'describeRefer',
    'setRefer',
  ];
  var labelMap = {
    putObject: '简单上传',
    putObject_base64ToBlob: '简单上传：base64转blob',
    appendObject: '追加上传',
    appendObject_continue: '查询position并追加上传',
    uploadFile: '高级上传',
    sliceUploadFile: '分片上传',
    sliceCopyFile: '分片复制',
    uploadFiles: '批量上传文件',
    selectFileToUpload: '上传本地文件',
    uploadFolder: '上传文件夹',
    uploadToFolder: '上传到指定文件夹',
    request: '通用请求接口',
    listFolder: '列出文件夹',
    deleteFolder: '删除文件夹(按前缀批量删除)',
    CIExample1: '上传时使用图片处理',
    CIExample2: '对云上数据进行图片处理',
    CIExample3: '下载时使用图片处理',
    CIExample4: '生成带图片处理参数的签名 URL',
    describeMediaBuckets: '查询媒体处理开通情况',
    getMediaInfo: '获取媒体文件信息',
    getSnapshot: '获取媒体文件某个时间的截图',
    getImageAuditing: '图片同步审核',
    postImagesAuditing: '图片批量审核',
    getImageAuditingResult: '查询图片审核任务结果',
    postVideoAuditing: '提交视频审核任务',
    getVideoAuditingResult: '查询视频审核任务结果',
    postAudioAuditing: '提交音频审核任务',
    getAudioAuditingResult: '查询音频审核任务结果',
    postTextAuditing: '提交文本审核任务',
    getTextAuditingResult: '查询文本审核任务结果',
    postDocumentAuditing: '提交文档审核任务',
    getDocumentAuditingResult: '查询文档审核任务结果',
    postWebpageAuditing: '提交网页审核任务',
    getWebpageAuditingResult: '查询网页审核任务结果',
    postLiveAuditing: '提交直播审核任务',
    getLiveAuditingResult: '查询直播审核任务结果',
    describeDocProcessBuckets: '查询文档预览开通状态',
    getDocPreview: '文档转码同步请求',
    describeDocProcessQueues: '查询文档转码队列',
    updateDocProcessQueue: '更新文档转码队列',
    createDocProcessJobs: '提交文档预览任务	',
    describeDocProcessJob: '查询指定的文档预览任务',
    describeDocProcessJobs: '拉取符合条件的文档预览任务',
    getDocHtmlUrl: '文档转 HTML',
    getImageLabel: '识别图片标签',
    identifyQrcode_put: '二维码识别(上传时识别)',
    identifyQrcode_get: '二维码识别(下载时识别)',
    generateQrcode: '二维码生成',
    ocr: '图片文字识别',
    postFileCompress: '提交文件压缩任务',
    getFileCompress: '查询文件压缩任务',
    postFileUnCompress: '提交文件解压任务',
    getFileUnCompress: '查询文件解压任务',
    postFileHash: '提交哈希值计算任务',
    getFileHashResult: '查询哈希值计算任务结果',
    postVirusDetect: '提交病毒检测任务',
    getVirusDetectResult: '查询病毒检测任务结果',
    postNoiseReduction: '提交音频降噪任务',
    postVoiceSeparate: '提交人声分离任务',
    postTts: '提交语音合成任务',
    postSpeechRecognition: '提交语音识别任务',
    getAsrQueue: '查询语音识别队列',
    putAsrQueue: '更新语音识别队列',
    getAsrBucket: '查询语音识别开通状态',
    getDocHtmlPreviewUrl: '获取在线文档预览地址',
    createFileProcessBucket: '开通文件处理服务',
    describeFileProcessQueues: '查询文件处理队列',
    updateFileProcessQueue: '更新文件处理队列',
    generateFileHash: '哈希值计算同步请求',
    addImageStyle: '图片处理-增加样式',
    describeImageStyles: '图片处理-查询样式',
    deleteImageStyle: '图片处理-删除样式',
    openImageGuetzli: '开通 Guetzli 压缩',
    describeImageGuetzli: '查询 Guetzli 压缩',
    closeImageGuetzli: '关闭 Guetzli 压缩',
    advanceCompressExample1: '上传时使用图片压缩',
    advanceCompressExample2: '对云上数据进行图片压缩',
    advanceCompressExample3: '下载时使用图片压缩',
    createImageInspectJob: '异常图片检测',
    describePicProcessQueues: '查询图片处理队列',
    updatePicProcessQueue: '更新图片处理队列',
    describeRefer: '查询防盗链',
    setRefer: '设置防盗链',
    openOriginProtect: '开通原图保护',
    describeOriginProtect: '查询原图保护状态',
    closeOriginProtect: '关闭原图保护',
    postSnapshot: '提交视频截帧任务',
  };
  var container = document.querySelector('.ci-main');
  var html = [];
  list.forEach(function (name) {
    if (name === '-') {
      html.push('<hr/>');
    } else if (name.indexOf('header') > -1) {
      html.push('<h4>' + name.split('-')[1] + '</h4>');
    } else {
      html.push(
        '<a href="javascript:void(0)" data-method="' +
          name +
          '">' +
          name +
          (labelMap[name] ? ' (' + labelMap[name] + ')' : '') +
          '</a>',
      );
    }
  });
  container.innerHTML = html.join('');
  container.onclick = function (e) {
    if (e.target.tagName === 'A') {
      var name = e.target.getAttribute('data-method').trim();
      window[name]();
    }
  };

  // 设置结果面板跟随窗口自适应高
  var mainPanel = document.querySelector('.ci-main');
  var resultPanel = document.querySelector('.result');
  resultPanel.style.height = getPanelHeight();
  window.onresize = function (e) {
    resultPanel.style.height = getPanelHeight();
  };

  function getPanelHeight() {
    return mainPanel.getBoundingClientRect().height - 80 + 'px';
  }
})();
