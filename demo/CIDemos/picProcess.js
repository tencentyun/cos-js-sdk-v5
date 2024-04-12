/**
 * 图片处理demo集合
 */

// 获取带图片处理的访问url
export const getImageUrl = {
  name: '获取带图片处理的访问url',
  fn: function getImageUrl() {
    // 生成带图片处理参数的文件签名URL，过期时间设置为 30 分钟。
    cos.getObjectUrl(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '02.png',
        Query: { 'imageMogr2/thumbnail/200x/': '' },
        Expires: 1800,
        Sign: true,
      },
      function (err, data) {
        console.log('getObjectUrl with sign: ', err || (data && data.Url));
      }
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
        console.log('getObjectUrl without sign: ', err || (data && data.Url));
      }
    );
  },
};

// 图片样式 - 查询样式
export const describeImageStyles = {
  name: '图片样式 - 查询样式',
  fn: function describeImageStyles() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Url: url,
        Query: {
          'style-name': 'style_name', // 非必填，样式名称
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

// 图片样式 - 增加样式
export const addImageStyle = {
  name: '图片样式 - 增加样式',
  fn: function addImageStyle() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 图片样式 - 删除样式
export const deleteImageStyle = {
  name: '图片样式 - 删除样式',
  fn: function deleteImageStyle() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?style';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 开通 Guetzli 压缩
export const openImageGuetzli = {
  name: '开通 Guetzli 压缩',
  fn: function openImageGuetzli() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'PUT',
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

// 查询 Guetzli 状态
export const describeImageGuetzli = {
  name: '查询 Guetzli 状态',
  fn: function describeImageGuetzli() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
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

// 关闭 Guetzli 压缩
export const closeImageGuetzli = {
  name: '关闭 Guetzli 压缩',
  fn: function closeImageGuetzli() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?guetzli';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'DELETE',
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

// 上传时使用图片处理
export const uploadPicOperation = {
  name: '上传时使用图片处理',
  fn: function uploadPicOperation() {
    util.selectLocalFile(function (files) {
      const file = files && files[0];
      if (!file) return;
      if (file.type.indexOf('image') < 0) {
        console.error('Please select a photo to upload!');
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
              'Pic-Operations': JSON.stringify({
                is_pic_info: 1,
                rules: [{ fileid: 'desample_photo.jpg', rule: 'imageMogr2/thumbnail/200x/' }],
              }),
            },
            onHashProgress: function (progressData) {
              console.log('onHashProgress', JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
              console.log('onProgress', JSON.stringify(progressData));
            },
          },
          function (err, data) {
            console.log('uploadPicOperation:', err || data);
          }
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
            onHashProgress: function (progressData) {
              console.log('onHashProgress', JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
              console.log('onProgress', JSON.stringify(progressData));
            },
          },
          function (err, data) {
            console.log('uploadPicOperation:', err || data);
          }
        );
      }
    });
  },
};

// 对云上数据处理
export const requestPicOperation = {
  name: '对云上数据处理',
  fn: function requestPicOperation() {
    // 文字水印示例
    const text = '腾讯云万象优图';
    const color = '#3D3D3D';
    // 经过安全base64编码 使用 COS.util.encodeBase64 方法需要sdk版本至少为1.4.18
    const textBase64 = COS.util.encodeBase64(text, true);
    const colorBase64 = COS.util.encodeBase64(color, true);
    // 生成一个文字水印
    const waterMarkRule = `watermark/2/text/${textBase64}/fill/${colorBase64}/fontsize/20/dissolve/50/gravity/northeast/dx/20/dy/20/batch/1/degree/45`;
    const picOperations = JSON.stringify({
      is_pic_info: 1, // 固定
      // fileid 设置和Key相同可实现只保留处理后的图片而不保留原图
      rules: [{ fileid: 'desample_photo.jpg', rule: waterMarkRule }],
    });

    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '02.png',
        Method: 'GET',
        Action: 'exif',
        RawBody: true,
        // Headers: {
        //   // 通过 imageMogr2 接口使用图片缩放功能：指定图片宽度为 200，宽度等比压缩
        //   'Pic-Operations': picOperations,
        // },
      },
      function (err, data) {
        const info = JSON.parse(data.Body);
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

// 下载时使用图片压缩
export const getObjectPicOperation = {
  name: '下载时使用图片压缩',
  fn: function getObjectPicOperation() {
    cos.getObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '1.png',
        QueryString: `imageMogr2/format/avif`, // 可以根据需要压缩的类型填入不同的压缩格式：webp/heif/tpg/avif/svgc
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

// 异常图片检测
export const createImageInspectJob = {
  name: '异常图片检测',
  fn: function createImageInspectJob() {
    const key = '1.png';
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: key,
        RawBody: true,
        Query: {
          'ci-process': 'ImageInspect', // 必须，操作类型，异常图片检测固定为：ImageInspect
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

// 查询图片处理队列
export const describePicProcessQueues = {
  name: '查询图片处理队列',
  fn: function describePicProcessQueues() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/picqueue';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'picqueue',
        Url: url,
        Query: {
          // queueIds: '', // 非必须，队列 ID，以“,”符号分割字符串
          state: 'Active', // 非必须，1. Active 表示队列内的作业会被媒体处理服务调度执行。2. Paused 表示队列暂停，作业不再会被媒体处理调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响。
          pageNumber: 1, // 非必须，第几页,默认值1
          pageSize: 10, // 非必须，每页个数,默认值10
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

// 更新图片处理队列
export const updatePicProcessQueue = {
  name: '更新图片处理队列',
  fn: function updatePicProcessQueue() {
    // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/79395)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
    const queueId = 'p882d181160d84feca27d9376e17c4xxx';
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/picqueue/' + queueId;
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询原图保护状态
export const describeOriginProtect = {
  name: '查询原图保护状态',
  fn: function describeOriginProtect() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
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

// 开通原图保护
export const openOriginProtect = {
  name: '开通原图保护',
  fn: function openOriginProtect() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'PUT',
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

// 关闭原图保护
export const closeOriginProtect = {
  name: '关闭原图保护',
  fn: function closeOriginProtect() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?origin-protect';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'DELETE',
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

// 开通图片处理（异步）服务
export const CreatePicProcessBucket = {
  name: '开通图片处理（异步）服务',
  fn: function CreatePicProcessBucket() {
    const key = 'picbucket'; // 固定值
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/' + key;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'POST',
        Key: key,
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

// 查询图片处理（异步）服务
export const DescribePicProcessBuckets = {
  name: '查询图片处理（异步）服务',
  fn: function DescribePicProcessBuckets() {
    const key = 'picbucket'; // 固定值
    const host = 'ci.' + config.Region + '.myqcloud.com/' + key;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: key,
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
