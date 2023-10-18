/**
 * 内容审核demo集合
 */

// 图片同步审核
export const getImageAuditing = {
  name: '图片同步审核',
  fn: function getImageAuditing() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '1.png', // 与detect-url二选一传递
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 图片批量审核
export const postImagesAuditing = {
  name: '图片批量审核',
  fn: function postImagesAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/image/auditing';
    const body = COS.util.json2xml({
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
        Key: 'image/auditing',
        ContentType: 'application/xml',
        Body: body,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询图片审核任务结果
export const getImageAuditingResult = {
  name: '查询图片审核任务结果',
  fn: function getImageAuditingResult() {
    const jobId = 'si8263213daf3711eca0d1525400d88xxx'; // jobId可以通过图片批量审核返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/image/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/image/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 反馈处理结果
export const reportBadCase = {
  name: '反馈处理结果',
  fn: function reportBadCase() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const key = 'report/badcase';
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        ContentType: 2,
        Url: 'https://example.com/desample_photo.jpg',
        Label: 'Porn',
        SuggestedLabel: 'Normal',
        // JobId: '',
        // ModerationTime: '',
      },
    });
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'POST',
        Url: url,
        Key: key,
        ContentType: 'application/xml',
        Body: body,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交视频审核任务
export const postVideoAuditing = {
  name: '提交视频审核任务',
  fn: function postVideoAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/video/auditing';
    const body = COS.util.json2xml({
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询视频审核任务结果
export const getVideoAuditingResult = {
  name: '查询视频审核任务结果',
  fn: function getVideoAuditingResult() {
    const jobId = 'av14d9ca15af3a11eca0d6525400d88xxx'; // jobId可以通过提交视频审核任务返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/video/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/video/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交音频审核任务
export const postAudioAuditing = {
  name: '提交音频审核任务',
  fn: function postAudioAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/audio/auditing';
    const body = COS.util.json2xml({
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询音频审核任务结果
export const getAudioAuditingResult = {
  name: '查询音频审核任务结果',
  fn: function getAudioAuditingResult() {
    const jobId = 'sa0c28d41daff411ecb23352540078cxxx'; // jobId可以通过提交音频审核任务返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/audio/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/audio/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交文本审核任务
export const postTextAuditing = {
  name: '提交文本审核任务',
  fn: function postTextAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/text/auditing';
    const body = COS.util.json2xml({
      Request: {
        Input: {
          // Content: COS.util.encodeBase64('乳沟'), // 经过base64编码过的文本”乳沟“，查询结果同步返回
          Object: '中文.txt', // 存在cos里的资源，审核结果异步返回，可以调用查询文本审核结果api查询
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询文本审核任务结果
export const getTextAuditingResult = {
  name: '查询文本审核任务结果',
  fn: function getTextAuditingResult() {
    const jobId = 'st8d88c664aff511ecb23352540078cxxx'; // jobId可以通过提交文本审核任务返回（Input传入Object）
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/text/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/text/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交文档审核任务
export const postDocumentAuditing = {
  name: '提交文档审核任务',
  fn: function postDocumentAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/document/auditing';
    const body = COS.util.json2xml({
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询文档审核任务结果
export const getDocumentAuditingResult = {
  name: '查询文档审核任务结果',
  fn: function getDocumentAuditingResult() {
    const jobId = 'sd7815c21caff611eca12f525400d88xxx'; // jobId可以通过提交文档审核任务返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/document/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/document/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交网页审核任务
export const postWebpageAuditing = {
  name: '提交网页审核任务',
  fn: function postWebpageAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/webpage/auditing';
    const body = COS.util.json2xml({
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询网页审核任务结果
export const getWebpageAuditingResult = {
  name: '查询网页审核任务结果',
  fn: function getWebpageAuditingResult() {
    const jobId = 'shce868019aff611ecb1155254009a4xxx'; // jobId可以通过提交网页审核任务返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/webpage/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/webpage/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 提交直播审核任务
export const postLiveAuditing = {
  name: '提交直播审核任务',
  fn: function postLiveAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/video/auditing';
    const body = COS.util.json2xml({
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
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 查询直播审核任务结果
export const getLiveAuditingResult = {
  name: '查询直播审核任务结果',
  fn: function getLiveAuditingResult() {
    const jobId = 'av0ca69557bd6111ed904c5254009411xx'; // jobId可以通过提交直播审核任务返回
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/video/auditing/' + jobId;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: '/video/auditing/' + jobId,
        Url: url,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};

// 取消直播审核
export const cancelLiveAuditing = {
  name: '取消直播审核',
  fn: function cancelLiveAuditing() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com';
    const jobId = 'av8088af71359c11eeb17c525400941xxx';
    const key = `video/cancel_auditing/${jobId}`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'POST',
        Url: url,
        Key: key,
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data);
        }
      }
    );
  },
};
