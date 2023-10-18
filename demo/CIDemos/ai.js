/**
 * AI内容识别demo集合
 */

// 开通AI内容识别
export const CreateAIProcessBucket = {
  name: '开通AI内容识别',
  fn: function CreateAIProcessBucket() {
    const key = 'ai_bucket'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 关闭AI内容识别
export const closeAIBucket = {
  name: '关闭AI内容识别',
  fn: function closeAIBucket() {
    const key = 'ai_bucket'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'DELETE', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 查询开通AI内容识别的桶
export const DescribeAIProcessBuckets = {
  name: '查询开通AI内容识别的桶',
  fn: function DescribeAIProcessBuckets() {
    const key = 'ai_bucket'; // 固定值
    const host = `ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 地域信息，例如 ap-shanghai、ap-beijing，若查询多个地域以“,”分隔字符串，详情请参见 地域与域名;是否必传：是
          // regions: '',
          // 存储桶名称，以“,”分隔，支持多个存储桶，精确搜索;是否必传：是
          // bucketNames: '',
          // 存储桶名称前缀，前缀搜索;是否必传：是
          // bucketName: '',
          // 第几页;是否必传：是
          // pageNumber: 1,
          // 每页个数，大于0且小于等于100的整数;是否必传：是
          // pageSize: 10,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 查询AI内容识别队列
export const DescribeAiProcessQueues = {
  name: '查询AI内容识别队列',
  fn: function DescribeAiProcessQueues() {
    const key = 'ai_queue'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 队列 ID，以“,”符号分割字符串;是否必传：否
          // queueIds: '',
          // Active 表示队列内的作业会被调度执行Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响;是否必传：否
          state: 'Active',
          // 第几页，默认值1;是否必传：否
          // pageNumber: 0,
          // 每页个数，默认值10;是否必传：否
          // pageSize: 0,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 更新AI内容识别队列
export const UpdateAiProcessQueue = {
  name: '更新AI内容识别队列',
  fn: function UpdateAiProcessQueue() {
    const queueId = 'xxx'; // 队列id
    const key = `ai_queue/${queueId}`; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 队列名称，仅支持中文、英文、数字、_、-和*，长度不超过 128;是否必传：是
        Name: 'my_queue',
        // Active 表示队列内的作业会被调度执行Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响;是否必传：是
        State: 'Active',
        // 回调配置;是否必传：是
        NotifyConfig: {
          // 回调开关OffOn;是否必传：否
          State: 'On',
          // 回调事件TaskFinish：任务完成WorkflowFinish：工作流完成;是否必传：否
          Event: 'TaskFinish',
          // 回调格式XMLJSON;是否必传：否
          // ResultFormat: '',
          // 回调类型UrlTDMQ;是否必传：否
          Type: 'Url',
          // 回调地址，不能为内网地址。;是否必传：否
          Url: 'http://example.com',
          // TDMQ 使用模式Topic：主题订阅Queue: 队列服务;是否必传：否
          // MqMode: '',
          // TDMQ 所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;是否必传：否
          // MqRegion: '',
          // TDMQ 主题名称;是否必传：否
          // MqName: '',
        },
      },
    });

    cos.request(
      {
        Method: 'PUT', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 识别图片标签
export const getImageLabel = {
  name: '识别图片标签',
  fn: function getImageLabel() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/dog.jpeg', // 与detect-url二选一传递
        Query: {
          // 固定值detect-label;是否必传：是
          'ci-process': 'detect-label',
          // 本次调用支持的识别场景，可选值如下：web，针对网络图片优化；camera，针对手机摄像头拍摄图片优化；album，针对手机相册、网盘产品优化；news，针对新闻、资讯、广电等行业优化；如果不传此参数，则默认为camera。支持多场景（scenes）一起检测，以，分隔。例如，使用 scenes=web，camera 即对一张图片使用两个模型同时检测，输出两套识别结果。;是否必传：否
          // scenes: '',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          // 'detect-url': '',
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

// 二维码识别（云上图片识别）
export const recognitionQRcode = {
  name: '二维码识别（云上图片识别）',
  fn: function recognitionQRcode() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/二维码.png', // 必须
        Query: {
          // 万象处理能力，二维码识别固定为 QRcode;是否必传：是
          'ci-process': 'QRcode',
          // 二维码覆盖功能，将对识别出的二维码覆盖上马赛克。取值为0或1。0表示不开启二维码覆盖，1表示开启二维码覆盖，默认值0;是否必传：否
          cover: 0,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 二维码识别(上传时识别)
export const identifyQrcode_put = {
  name: '二维码识别(上传时识别)',
  fn: function identifyQrcode_put() {
    util.selectLocalFile(function (files) {
      const file = files && files[0];
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
            console.log('onProgress', JSON.stringify(progressData));
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
    });
  },
};

// 二维码识别(下载时识别)
export const identifyQrcode_get = {
  name: '二维码识别(下载时识别)',
  fn: function identifyQrcode_get() {
    const key = '1/二维码图片.png';
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: key,
        Query: {
          'ci-process': 'QRcode',
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

// 二维码生成
export const createCRcode = {
  name: '二维码生成',
  fn: function createCRcode() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Query: {
          'ci-process': 'qrcode-generate', // 必须，对象存储处理能力，二维码生成参数为 qrcode-generate
          'qrcode-content': '二维码文案', // 必须，可识别的二维码文本信息
          // mode: 0, // 非必须，生成的二维码类型，可选值：0或1。0为二维码，1为条形码，默认值为0
          width: 200, //必须，指定生成的二维码或条形码的宽度，高度会进行等比压缩
        },
      },
      function (err, data) {
        if (!err) {
          // 获得二维码base64
          const imgBase64 = data.Response.ResultImage;
          // 比如可拼接前缀直接展示在img里
          // document.querySelector('#img').src = 'data:image/jpg;base64,' + imgBase64;
        }
      }
    );
  },
};

// 图片文字识别
export const cOSOCR = {
  name: '图片文字识别',
  fn: function cOSOCR() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/0.jpg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，图片文字识别固定为OCR;是否必传：是
          'ci-process': 'OCR',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          // 'detect-url': '',
          // ocr的识别类型，有效值为general，accurate，efficient，fast，handwriting。general表示通用印刷体识别；accurate表示印刷体高精度版；efficient表示印刷体精简版；fast表示印刷体高速版；handwriting表示手写体识别。默认值为general。;是否必传：否
          type: 'general',
          // type值为general时有效，表示识别语言类型。支持自动识别语言类型，同时支持自选语言种类，默认中英文混合(zh)，各种语言均支持与英文混合的文字识别。可选值：zh：中英混合zh_rare：支持英文、数字、中文生僻字、繁体字，特殊符号等auto：自动mix：混合语种jap：日语kor：韩语spa：西班牙语fre：法语ger：德语por：葡萄牙语vie：越语may：马来语rus：俄语ita：意大利语hol：荷兰语swe：瑞典语fin：芬兰语dan：丹麦语nor：挪威语hun：匈牙利语tha：泰语hi：印地语ara：阿拉伯语;是否必传：否
          'language-type': 'zh',
          // type值为general，fast时有效，表示是否开启PDF识别，有效值为true和false，默认值为false，开启后可同时支持图片和PDF的识别。;是否必传：否
          ispdf: false,
          // type值为general，fast时有效，表示需要识别的PDF页面的对应页码，仅支持PDF单页识别，当上传文件为PDF且ispdf参数值为true时有效，默认值为1。;是否必传：否
          // 'pdf-pagenumber': 0,
          // type值为general，accurate时有效，表示识别后是否需要返回单字信息，有效值为true和false，默认为false;是否必传：否
          isword: false,
          // type值为handwriting时有效，表示是否开启单字的四点定位坐标输出，有效值为true和false，默认值为false。;是否必传：否
          'enable-word-polygon': false,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 车辆识别
export const aIDetectCar = {
  name: '车辆识别',
  fn: function aIDetectCar() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/car.png', // 对象文件名，必须，例如：folder/document.jpg
        Query: {
          // 数据万象处理能力，车辆识别固定为 DetectCar;是否必传：是
          'ci-process': 'DetectCar',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 宠物识别
export const aIDetectPet = {
  name: '宠物识别',
  fn: function aIDetectPet() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/dog.jpeg', // 对象文件名，必须，例如：folder/document.jpg须
        Query: {
          // 数据万象处理能力，宠物识别固定为 detect-pet;是否必传：是
          'ci-process': 'detect-pet',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 创建视频目标检测模板
export const postVideoTargetTemplete = {
  name: '创建视频目标检测模板',
  fn: function postVideoTargetTemplete() {
    const key = 'template'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：VideoTargetRec;是否必传：是
        Tag: 'VideoTargetRec',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_videoTargetRec',
        // 视频目标检测 参数;是否必传：是
        VideoTargetRec: {
          // 是否开启人体检测，取值 true/false;是否必传：否
          Body: 'true',
          // 是否开启宠物检测，取值 true/false;是否必传：否
          Pet: 'true',
          // 是否开启车辆检测，取值 true/false;是否必传：否
          Car: 'false',
        },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 更新视频目标检测模板
export const updateVideoTargetTemplete = {
  name: '更新视频目标检测模板',
  fn: function updateVideoTargetTemplete() {
    const templateId = 'xxxxxxx'; // 要更新的模板id
    const key = `template/${templateId}`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：VideoTargetRec;是否必传：是
        Tag: 'VideoTargetRec',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_videoTargetRec2',
        // 视频目标检测 参数;是否必传：是
        VideoTargetRec: {
          // 是否开启人体检测，取值 true/false;是否必传：否
          Body: 'false',
          // 是否开启宠物检测，取值 true/false;是否必传：否
          Pet: 'false',
          // 是否开启车辆检测，取值 true/false;是否必传：否
          Car: 'true',
        },
      },
    });

    cos.request(
      {
        Method: 'PUT', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 提交一个视频目标检测任务
export const postVideoTargetRec = {
  name: '提交一个视频目标检测任务',
  fn: function postVideoTargetRec() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：VideoTargetRec;是否必传：是
        Tag: 'VideoTargetRec',
        // 操作规则;是否必传：是
        Operation: {
          // 视频目标检测模板 ID;与VideoTargetRec二选一传递
          TemplateId: 'xxxx',
          // 视频目标检测参数, 同创建视频目标检测模板接口中的 Request.VideoTargetRec﻿;与TemplateId二选一传递
          // VideoTargetRec: {
          // 是否开启人体检测，取值 true/false;是否必传：否
          // Body: '',
          // 是否开启宠物检测，取值 true/false;是否必传：否
          // Pet: '',
          // 是否开启车辆检测，取值 true/false;是否必传：否
          // Car: '',
          // },
          // 透传用户信息, 可打印的 ASCII 码, 长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
        },
        // 待操作的媒体信息;是否必传：是
        Input: {
          // 媒体文件名;是否必传：否
          Object: 'ci/test.mp4',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        // CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        // CallBackType: '',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        // CallBack: '',
        // 任务回调TDMQ配置，当 CallBackType 为 TDMQ 时必填。详情请参见 CallBackMqConfig;是否必传：否
        // CallBackMqConfig: {
        // 消息队列所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;是否必传：是
        // MqRegion: '',
        // 消息队列使用模式，默认 Queue ：主题订阅：Topic队列服务: Queue;是否必传：是
        // MqMode: '',
        // TDMQ 主题名称;是否必传：是
        // MqName: '',
        // },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 提交词性分析任务
export const postWordsGeneralize = {
  name: '提交词性分析任务',
  fn: function postWordsGeneralize() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：WordsGeneralize;是否必传：是
        Tag: 'WordsGeneralize',
        // 待操作的对象信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'ci/test.txt',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 指定分词参数;是否必传：是
          WordsGeneralize: {
            // ner 方式，支持 NerBasic 和 DL，默认值 DL;是否必传：否
            NerMethod: 'DL',
            // 分词粒度，支持 SegBasic 和 MIX，默认值 MIX;是否必传：否
            SegMethod: 'MIX',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        // CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        // CallBackType: '',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        // CallBack: '',
        // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填。详情见 CallBackMqConfig;是否必传：否
        // CallBackMqConfig: {
        // 消息队列所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;是否必传：是
        // MqRegion: '',
        // 消息队列使用模式，默认 Queue ：主题订阅：Topic队列服务: Queue;是否必传：是
        // MqMode: '',
        // TDMQ 主题名称;是否必传：是
        // MqName: '',
        // },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 活体人脸核身
export const LivenessRecognition = {
  name: '活体人脸核身',
  fn: function LivenessRecognition() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/tf.mp4', // 必须
        Query: {
          // 数据万象处理能力，人脸核身固定为 LivenessRecognition;是否必传：是
          'ci-process': 'LivenessRecognition',
          // 身份证号;是否必传：是
          IdCard: '610321199411040019',
          // 姓名。中文请使用 UTF-8编码;是否必传：是
          Name: '田丰',
          // 活体检测类型，取值：LIP/ACTION/SILENTLIP 为数字模式，ACTION 为动作模式，SILENT 为静默模式，三种模式选择一种传入;是否必传：是
          LivenessType: 'SILENT',
          // 数字模式传参：数字验证码（1234），需先调用接口获取数字验证码动作模式传参：传动作顺序（2，1 or 1，2），需先调用接口获取动作顺序静默模式传参：空;是否必传：否
          ValidateData: '',
          // 需要返回多张最佳截图，取值范围1 - 10，不设置默认返回一张最佳截图;是否必传：否
          BestFrameNum: 1,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 获取动作顺序
export const GetActionSequence = {
  name: '获取动作顺序',
  fn: function GetActionSequence() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Query: {
          // 数据万象处理能力，获取动作顺序固定为 GetActionSequence;是否必传：是
          'ci-process': 'GetActionSequence',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 获取数字验证码
export const GetLiveCode = {
  name: '获取数字验证码',
  fn: function GetLiveCode() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Query: {
          // 数据万象处理能力，获取数字验证码固定为 GetLiveCode;是否必传：是
          'ci-process': 'GetLiveCode',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 卡证识别
export const aILicenseRec = {
  name: '卡证识别',
  fn: function aILicenseRec() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/card.jpeg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，卡证识别固定为AILicenseRec;是否必传：是
          'ci-process': 'AILicenseRec',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          'detect-url': '',
          // 卡证识别类型，有效值为IDCard，DriverLicense。<br>IDCard表示身份证；DriverLicense表示驾驶证，默认：DriverLicense;是否必传：是
          CardType: 'IDCard',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 开通以图搜图
export const CreateImageSearchBucket = {
  name: '开通以图搜图',
  fn: function CreateImageSearchBucket() {
    const key = 'CreateImageSearchBucket'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 图库容量限制;是否必传：是
        MaxCapacity: 1000,
        // 图库访问限制，默认10;是否必传：否
        MaxQps: 10,
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 商品抠图
export const goodsMatting = {
  name: '商品抠图',
  fn: function goodsMatting() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/goods.jpeg', // 与detect-url二选一传递
        Query: {
          // ;是否必传：是
          'ci-process': 'GoodsMatting',
          // ;是否必传：否
          // 'detect-url': '',
        },
        RawBody: true,
        DataType: 'blob',
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

// 添加图库图片
export const AddImage = {
  name: '添加图库图片',
  fn: function AddImage() {
    const body = COS.util.json2xml({
      Request: {
        // 物品 ID，最多支持64个字符。若 EntityId 已存在，则对其追加图片;是否必传：是
        EntityId: '123456',
        // 用户自定义的内容，最多支持4096个字符，查询时原样带回;是否必传：否
        CustomContent: '小商品',
        // 图片自定义标签，最多不超过10个，json 字符串，格式为 key:value （例 key1>=1 key1>='aa' ）对;是否必传：否
        // Tags: '',
      },
    });

    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'POST', // 固定值，必须
        Key: 'ci/goods.jpeg', // 必须
        Query: {
          // 固定值：ImageSearch;是否必传：是
          'ci-process': 'ImageSearch',
          // 固定值：AddImage;是否必传：是
          action: 'AddImage',
        },
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
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

// 删除图库图片
export const DeleteImage = {
  name: '删除图库图片',
  fn: function DeleteImage() {
    const body = COS.util.json2xml({
      Request: {
        // 物品 ID;是否必传：是
        EntityId: '',
      },
    });

    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 检索图片
export const SearchImage = {
  name: '检索图片',
  fn: function SearchImage() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/goods.jpeg', // 必须
        Query: {
          'ci-process': 'ImageSearch',
          action: 'SearchImage',
          // 出参 Score 中，只有超过 MatchThreshold 值的结果才会返回。默认为0;是否必传：否
          MatchThreshold: 0,
          // 起始序号，默认值为0;是否必传：否
          Offset: 0,
          // 返回数量，默认值为10，最大值为100;是否必传：否
          Limit: 0,
          // 针对入库时提交的 Tags 信息进行条件过滤。支持>、>=、<、<=、=、!=，多个条件之间支持 AND 和 OR 进行连接;是否必传：否
          Filter: '',
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

// 提交内容翻译任务
export const postTranslation = {
  name: '提交内容翻译任务',
  fn: function postTranslation() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Translation;是否必传：是
        Tag: 'Translation',
        // 待操作的对象信息;是否必传：是
        Input: {
          // 源文档文件名单文件（docx/xlsx/html/markdown/txt）：不超过800万字符有页数的（pdf/pptx）：不超过300页文本文件（txt）：不超过10MB二进制文件（pdf/docx/pptx/xlsx）：不超过60MB图片文件（jpg/jpeg/png/webp）：不超过10MB;是否必传：是
          Object: 'ci/test.txt',
          // 文档语言类型zh：简体中文zh-hk：繁体中文zh-tw：繁体中文zh-tr：繁体中文en：英语ar：阿拉伯语de：德语es：西班牙语fr：法语id：印尼语it：意大利语ja：日语pt：葡萄牙语ru：俄语ko：韩语km：高棉语lo：老挝语;是否必传：是
          Lang: 'zh-hk',
          // 文档类型pdfdocxpptxxlsxtxtxmlhtml：只能翻译 HTML 里的文本节点，需要通过 JS 动态加载的不进行翻译markdownjpgjpegpngwebp;是否必传：是
          Type: 'txt',
          // 原始文档类型仅在 Type=pdf/jpg/jpeg/png/webp 时使用，当值为pdf时，仅支持 docx、pptx当值为jpg/jpeg/png/webp时，仅支持txt;是否必传：否
          // BasicType: '',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 翻译参数;是否必传：是
          Translation: {
            // 目标语言类型源语言类型为 zh/zh-hk/zh-tw/zh-tr 时支持：en、ar、de、es、fr、id、it、ja、it、ru、ko、km、lo、pt源语言类型为 en 时支持：zh、zh-hk、zh-tw、zh-tr、ar、de、es、fr、id、it、ja、it、ru、ko、km、lo、pt其他类型时支持：zh、zh-hk、zh-tw、zh-tr、en;是否必传：是
            Lang: 'en',
            // 文档类型，源文件类型与目标文件类型映射关系如下：docx：docxpptx：pptxxlsx：xlsxtxt：txtxml：xmlhtml：htmlmarkdown：markdownpdf：pdf、docxpng：txtjpg：txtjpeg：txtwebp：txt;是否必传：是
            Type: 'txt',
          },
          // 结果输出地址，当NoNeedOutput为true时非必选;是否必传：否
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'ci/trans_test.txt',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
          // 仅输出结果，不生成结果文件。取值：true/false。该参数原文档类型为图片时有效。默认值 false;是否必传：否
          // NoNeedOutput: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        // CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        // CallBackType: '',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        // CallBack: '',
        // 任务回调TDMQ配置，当 CallBackType 为 TDMQ 时必填。详情见 CallBackMqConfig;是否必传：否
        // CallBackMqConfig: {
        // 消息队列所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;是否必传：是
        // MqRegion: '',
        // 消息队列使用模式，默认 Queue ：主题订阅：Topic队列服务: Queue;是否必传：是
        // MqMode: '',
        // TDMQ 主题名称;是否必传：是
        // MqName: '',
        // },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人脸检测
export const aIDetectFace = {
  name: '人脸检测',
  fn: function aIDetectFace() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/1.jpg', // 必须
        Query: {
          // 数据万象处理能力，人脸特效固定为 DetectFace。;是否必传：是
          'ci-process': 'DetectFace',
          // 最多处理的人脸数目。默认值为1（仅检测图片中面积最大的那张人脸），最大���为120。此参数用于控制处理待检测图片中的人脸个数，值越小，处理速度越快。;是否必传：否
          'max-face-num': 1,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人脸美颜
export const FaceBeautify = {
  name: '人脸美颜',
  fn: function aIFaceEffect() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/tom.jpeg', // 对象文件名，例如：folder/document.jpg，与detect-url二选一传递
        Query: {
          // 万象处理能力，人脸特效固定为face-effect;是否必传：是
          'ci-process': 'face-effect',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg。;是否必传：否
          // 'detect-url': '',
          // 人脸特效类型，人脸美颜：face-beautify；人脸性别转换：face-gender-transformation；人脸年龄变化：face-age-transformation；人像分割：face-segmentation;是否必传：是
          type: 'face-beautify',
          // type为face-beautify时生效，美白程度，取值范围[0,100]。0不美白，100代表最高程度。默认值30;是否必传：否
          whitening: 50,
          // type为face-beautify时生效，磨皮程度，取值范围[0,100]。0不磨皮，100代表最高程度。默认值10;是否必传：否
          smoothing: 50,
          // type为face-beautify时生效，瘦脸程度，取值范围[0,100]。0不瘦脸，100代表最高程度。默认值70;是否必传：否
          faceLifting: 50,
          // type为face-beautify时生效，大眼程度，取值范围[0,100]。0不大眼，100代表最高程度。默认值70;是否必传：否
          eyeEnlarging: 50,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人脸性别转换
export const FaceGenderTransformation = {
  name: '人脸性别转换',
  fn: function FaceGenderTransformation() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/tom.jpeg', // 对象文件名，例如：folder/document.jpg，与detect-url二选一传递
        Query: {
          // 万象处理能力，人脸特效固定为face-effect;是否必传：是
          'ci-process': 'face-effect',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg。;是否必传：否
          // 'detect-url': '',
          // 人脸特效类型，人脸美颜：face-beautify；人脸性别转换：face-gender-transformation；人脸年龄变化：face-age-transformation；人像分割：face-segmentation;是否必传：是
          type: 'face-gender-transformation',
          // type为face-gender-transformation时生效，选择转换方向，0：男变女，1：女变男。无默认值，为必选项。限制：仅对图片中面积最大的人脸进行转换。;是否必传：否
          gender: 0,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人脸年龄变化
export const FaceAgeTransformation = {
  name: '人脸年龄变化',
  fn: function FaceAgeTransformation() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/tom.jpeg', // 对象文件名，例如：folder/document.jpg，与detect-url二选一传递
        Query: {
          // 万象处理能力，人脸特效固定为face-effect;是否必传：是
          'ci-process': 'face-effect',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg。;是否必传：否
          // 'detect-url': '',
          // 人脸特效类型，人脸美颜：face-beautify；人脸性别转换：face-gender-transformation；人脸年龄变化：face-age-transformation；人像分割：face-segmentation;是否必传：是
          type: 'face-age-transformation',
          // type 为 face-age-transformation  时生效，变化到的人脸年龄，范围为[10,80]，无默认值。注意：仅对图片中面积最大的人脸进行转换
          age: 40,
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人像分割
export const FaceSegmentation = {
  name: '人像分割',
  fn: function FaceSegmentation() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/tom.jpeg', // 对象文件名，例如：folder/document.jpg，与detect-url二选一传递
        Query: {
          // 万象处理能力，人脸特效固定为face-effect;是否必传：是
          'ci-process': 'face-effect',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg。;是否必传：否
          // 'detect-url': '',
          // 人脸特效类型，人脸美颜：face-beautify；人脸性别转换：face-gender-transformation；人脸年龄变化：face-age-transformation；人像分割：face-segmentation;是否必传：是
          type: 'face-segmentation',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 人体识别
export const aIBodyRecognition = {
  name: '人体识别',
  fn: function aIBodyRecognition() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/dog.jpeg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，人体识别固定为AIBodyRecognition;是否必传：是
          'ci-process': 'AIBodyRecognition',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          // 'detect-url': '',
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

// 身份证识别
export const IDCardOCR = {
  name: '身份证识别',
  fn: function IDCardOCR() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/card.jpeg', // 必须
        Query: {
          // 数据万象处理能力，身份证识别固定为 IDCardOCR;是否必传：是
          'ci-process': 'IDCardOCR',
          // FRONT：身份证有照片的一面（人像面）BACK：身份证有国徽的一面（国徽面）该参数如果不填，将为您自动判断身份证正反面;是否必传：否
          CardSide: 'FRONT',
          // 以下可选字段均为 bool 类型，默认 false：CropIdCard，身份证照片裁剪（去掉证件外多余的边缘、自动矫正拍摄角度）CropPortrait，人像照片裁剪（自动抠取身份证头像区域）CopyWarn，复印件告警BorderCheckWarn，边框和框内遮挡告警ReshootWarn，翻拍告警DetectPsWarn，PS 检测告警TempIdWarn，临时身份证告警InvalidDateWarn，身份证有效日期不合法告警Quality，图片质量分数（评价图片的模糊程度）MultiCardDetect，是否开启多卡证检测参数设置方式参考：Config = {"CropIdCard":true,"CropPortrait":true};是否必传：否
          // Config: {},
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 实时文字翻译
export const autoTranslationBlock = {
  name: '实时文字翻译',
  fn: function autoTranslationBlock() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Query: {
          // 数据万象处理能力，文本块翻译固定为 AutoTranslationBlock。;是否必传：是
          'ci-process': 'AutoTranslationBlock',
          // 待翻译的文本;是否必传：是
          InputText: '我是张三',
          // 输入语言，如 "zh";是否必传：是
          SourceLang: 'zh',
          // 输出语言，如 "en";是否必传：是
          TargetLang: 'en',
          // 文本所属业务领域，如: "ecommerce", //缺省值为 general;是否必传：否
          // TextDomain: '',
          // 文本类型，如: "title", //缺省值为 sentence;是否必传：否
          // TextStyle: '',
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

// 提交一个视频人像抠图任务
export const postSegmentVideoBody = {
  name: '提交一个视频人像抠图任务',
  fn: function postSegmentVideoBody() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：SegmentVideoBody;是否必传：是
        Tag: 'SegmentVideoBody',
        // 待操作的对象信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'ci/tf.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 视频人像抠图配置;是否必传：否
          SegmentVideoBody: {
            // 抠图模式 Mask：输出alpha通道结果Foreground：输出前景视频Combination：输出抠图后的前景与自定义背景合成后的视频默认值：Mask;是否必传：否
            Mode: 'Mask',
            // 抠图类型HumanSeg：人像抠图GreenScreenSeg：绿幕抠图SolidColorSeg：纯色背景抠图默认值：HumanSeg;是否必传：否
            // SegmentType: '',
            // mode为 Foreground 时参数生效，背景颜色为红色，取值范围 [0, 255]， 默认值为 0;是否必传：否
            // BackgroundRed: '',
            // mode为 Foreground 时参数生效，背景颜色为绿色，取值范围 [0, 255]，默认值为 0;是否必传：否
            // BackgroundGreen: '',
            // mode为 Foreground 时参数生效，背景颜色为蓝色，取值范围 [0, 255]，默认值为 0;是否必传：否
            // BackgroundBlue: '',
            // 传入背景文件。mode为 Combination 时，此参数必填，背景文件需与源文件在同存储桶下;是否必传：否
            // BackgroundLogoUrl: '',
            // 调整抠图的边缘位置，取值范围为[0, 255]，默认值为 0;是否必传：否
            // BinaryThreshold: '',
            // 纯色背景抠图的背景色（红）, 当 SegmentType 为 SolidColorSeg 生效，取值范围为 [0, 255]，默认值为 0;是否必传：否
            // RemoveRed: '',
            // 纯色背景抠图的背景色（绿）, 当 SegmentType 为 SolidColorSeg 生效，取值范围为 [0, 255]，默认值为 0;是否必传：否
            // RemoveGreen: '',
            // 纯色背景抠图的背景色（蓝）, 当 SegmentType 为 SolidColorSeg 生效，取���范围为 [0, 255]，默认值为 0;是否必传：否
            // RemoveBlue: '',
          },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'ci/ss.mp4',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        // CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        // CallBackType: '',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        // CallBack: '',
        // 任务回调 TDMQ 配置，当 CallBackType 为 TDMQ 时必填。详情见 CallBackMqConfig;是否必传：否
        // CallBackMqConfig: {
        // 消息队列所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;是否必传：是
        // MqRegion: '',
        // 消息队列使用模式，默认 Queue ：主题订阅：Topic队列服务: Queue;是否必传：是
        // MqMode: '',
        // TDMQ 主题名称;是否必传：是
        // MqName: '',
        // },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        ContentType: 'application/xml', // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 图片上色
export const aIImageColoring = {
  name: '图片上色',
  fn: function aIImageColoring() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/1.jpg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，图片上色参固定为AIImageColoring。;是否必传：是
          'ci-process': 'AIImageColoring',
          // 待上色图片url，需要进行urlencode，与ObjectKey二选其一，如果同时存在，则默认以ObjectKey为准;是否必传：否
          // 'detect-url': '',
        },
        RawBody: true,
        DataType: 'blob',
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

// 图片质量评分
export const assessQuality = {
  name: '图片质量评分',
  fn: function assessQuality() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/dog.jpeg', // 必须
        Query: {
          // 数据万象处理能力，图像质量检测固定为 AssessQuality。;是否必传：是
          'ci-process': 'AssessQuality',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Response);
        }
      }
    );
  },
};

// 图像超分
export const aISuperResolution = {
  name: '图像超分',
  fn: function aISuperResolution() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/test.jpeg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，只能裁剪参固定为AISuperResolution。;是否必传：否
          'ci-process': 'AISuperResolution',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey，detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg。;是否必传：否
          // 'detect-url': '',
        },
        RawBody: true,
        DataType: 'blob',
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

// 图像修复
export const imageRepair = {
  name: '图像修复',
  fn: function imageRepair() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/card.jpeg', // 必须
        Query: {
          // 固定值：ImageRepair;是否必传：是
          'ci-process': 'ImageRepair',
          // 遮罩（白色区域为需要去除的水印位置）图片地址，私有图片需携带签名，需要经过 URL 安全的 Base64 编码
          // 比如图片url为 http://test.com/test.jpg
          MaskPic: COS.util.encodeBase64('http://test.com/test.jpg', true),
        },
        RawBody: true,
        DataType: 'blob',
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

// 图像增强
export const aIEnhanceImage = {
  name: '图像增强',
  fn: function aIEnhanceImage() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/1.jpg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，只能裁剪参固定为 AIEnhanceImage。;是否必传：是
          'ci-process': 'AIEnhanceImage',
          // 去噪强度值，取值范围为 0 - 5 之间的整数，值为 0 时不进行去噪操作，默认值为3。;是否必传：否
          denoise: 0,
          // 锐化强度值，取值范围为 0 - 5 之间的整数，值为 0 时不进行锐化操作，默认值为3。;是否必传：否
          sharpen: 0,
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url  时，后台会默认处理 ObjectKey ，填写了detect-url 时，后台会处理 detect-url链接，无需再填写 ObjectKey ，detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为  http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          // 'detect-url': '',
          // ;是否必传：否
          'ignore-error': 0,
        },
        RawBody: true,
        DataType: 'blob',
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

// 图像智能裁剪
export const aIImageCrop = {
  name: '图像智能裁剪',
  fn: function aIImageCrop() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/dog.jpeg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，智能裁剪固定为AIImageCrop;是否必传：是
          'ci-process': 'AIImageCrop',
          // 您可以通过填写 detect-url 处理任意公网可访问的图片链接。不填写 detect-url 时，后台会默认处理 ObjectKey ，填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 ObjectKey detect-url 示例：http://www.example.com/abc.jpg ，需要进行 UrlEncode，处理后为http%25253A%25252F%25252Fwww.example.com%25252Fabc.jpg;是否必传：否
          // 'detect-url': '',
          // 需要裁剪区域的宽度，与height共同组成所需裁剪的图片宽高比例；输入数字请大于0、小于图片宽度的像素值;是否必传：是
          width: 0,
          // 需要裁剪区域的高度，与width共同组成所需裁剪的图片宽高比例；输入数字请大于0、小于图片高度的像素值；width : height建议取值在[1, 2.5]之间，超过这个范围可能会影响效果;是否必传：是
          height: 0,
          // 是否严格按照 width 和 height 的值进行输出。取值为0时，宽高比例（width : height）会简化为最简分数，即如果width输入10、height输入20，会简化为1：2；取值为1时，输出图片的宽度等于width，高度等于height；默认值为0;是否必传：否
          fixed: 0,
          // 当此参数为1时，针对文件过大等导致处理失败的场景，会直接返回原图而不报错;是否必传：否
          'ignore-error': 0,
        },
        RawBody: true,
        DataType: 'blob',
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

// 游戏场景识别
export const aIGameRec = {
  name: '游戏场景识别',
  fn: function aIGameRec() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/game.jpeg', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，游戏场景识别固定为 AIGameRec;是否必传：是
          'ci-process': 'AIGameRec',
          // 您可以通过填写 detect-url 对任意公网可访问的图片进行游戏场景识别。不填写 detect-url 时，后台会默认处理 objectkey ；填写了 detect-url 时，后台会处理 detect-url 链接，无需再填写 objectkey ， detect-url 示例：http://www.example.com/abc.jpg。;是否必传：是
          // 'detect-url': '',
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

// Logo 识别
export const recognizeLogo = {
  name: 'Logo 识别',
  fn: function recognizeLogo() {
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: 'ci/logo.png', // 与detect-url二选一传递
        Query: {
          // 数据万象处理能力，Logo识别固定为RecognizeLogo;是否必传：是
          'ci-process': 'RecognizeLogo',
          // 待检查图片url，需要进行urlencode;是否必传：是
          // 'detect-url': '',
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
