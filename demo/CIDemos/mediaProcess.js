/**
 * 媒体处理demo集合
 */

// 查询已经开通数据万象功能的存储桶
export const describeMediaBuckets = {
  name: '查询已经开通数据万象功能的存储桶',
  fn: function describeMediaBuckets() {
    const host = 'ci.' + config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/mediabucket';
    cos.request(
      {
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

// 搜索媒体处理队列
export const searchMediaQueue = {
  name: '搜索媒体处理队列',
  fn: function searchMediaQueue() {
    const key = `queue`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 队列 ID，支持搜索多个，以“,”符号分割字符串，最多填10个。;是否必传：否
          queueIds: '',
          // 1. Active 表示队列内的作业会被媒体处理服务调度执行2. Paused 表示队列暂停，作业不再会被媒体处理调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响;是否必传：否
          state: 'Active',
          // 1. CateAll：所有类型2. Transcoding：媒体处理队列3. SpeedTranscoding：媒体处理倍速转码队列4. 默认为 Transcoding;是否必传：否
          category: 'CateAll',
          // 第几页，默认值1;是否必传：否
          pageNumber: '',
          // 每页个数，默认值10;是否必传：否
          pageSize: '',
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

// 更新媒体处理队列
export const updateMediaQueue = {
  name: '更新媒体处理队列',
  fn: function updateMediaQueue() {
    const queueId = 'xxx'; // queueId: 要更新的队列id;
    const key = `queue/${queueId}`; // queueId: 要更新的队列id;
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 队列名称，仅支持中文、英文、数字、_、-和*，长度不超过 128;限制：无;;是否必传：是
        Name: 'queue-1',
        // 1. Active 表示队列内的作业会被媒体处理服务调度执行2. Paused 表示队列暂停，作业不再会被媒体处理调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响;限制：无;;是否必传：是
        State: 'Paused',
        // 回调配置;限制：无;;是否必传：是
        NotifyConfig: {
          // 回调开关OffOn;限制：Off;;是否必传：否
          State: 'Off',
          // 回调事件TaskFinish：任务完成WorkflowFinish：工作流完成;限制：无;;是否必传：否
          Event: 'TaskFinish',
          // 回调格式XMLJSON;限制：XML;;是否必传：否
          ResultFormat: '',
          // 回调类型UrlTDMQ;限制：无;;是否必传：否
          Type: 'Url',
          // 回调地址，不能为内网地址。;限制：无;;是否必传：否
          Url: '',
          // TDMQ 使用模式Topic：主题订阅Queue: 队列服务;限制：无;;是否必传：否
          MqMode: '',
          // TDMQ 所属园区，目前支持园区 sh（上海）、bj（北京）、gz（广州）、cd（成都）、hk（中国香港）;限制：无;;是否必传：否
          MqRegion: '',
          // TDMQ 主题名称;限制：无;;是否必传：否
          MqName: '',
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

// 获取媒体文件信息同步请求
export const getMediaInfo = {
  name: '获取媒体文件信息同步请求',
  fn: function getMediaInfo() {
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

// 获取媒体信息异步任务
export const postMediaInfo = {
  name: '获取媒体信息异步任务',
  fn: function postMediaInfo() {
    const key = 'jobs'; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：MediaInfo;是否必传：是
        Tag: 'MediaInfo',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 获取媒体文件某个时间的截图
export const getSnapshot = {
  name: '获取媒体文件某个时间的截图',
  fn: function getSnapshot() {
    const key = 'test.mp4'; // ObjectKey: 存在cos的媒体文件路径，比如test.mp4
    const host = `${config.Bucket}.cos.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 操作类型，固定使用 snapshot;是否必传：是
          'ci-process': 'snapshot',
          // 截图的时间点，单位为秒;是否必传：是
          time: 1,
          // 截图的宽。默认为0;是否必传：否
          width: 0,
          // 截图的高。默认为0;是否必传：否
          height: 0,
          // 截图的格式，支持 jpg 和 png，默认 jpg;是否必传：否
          format: 'jpg',
          // 图片旋转方式auto：按视频旋转信息进行自动���转off：不旋转默认值为 auto;是否必传：否
          rotate: 'auto',
          // 截帧方式keyframe：截取指定时间点之前的最近的一个关键帧exactframe：截取指定时间点的帧默认值为 exactframe;是否必传：否
          mode: 'exactframe',
        },
        RawBody: true,
        // 可选返回文件格式为blob
        DataType: 'blob',
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body);
        }
      }
    );
  },
};

// 提交视频截帧任务
export const postSnapshot = {
  name: '提交视频截帧任务',
  fn: function postSnapshot() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Snapshot;是否必传：是
        Tag: 'Snapshot',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 截帧模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/snapshot-${number}.jpg',
            // 雪碧图的名字。当有多个输出文件时必须包含 ${number} 通配符。仅支持 jpg 格式;是否必传：否
            SpriteObject: 'output/sprite-${number}.jpg',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 获取私m3u8
export const getPrivateM3U8 = {
  name: '获取私m3u8',
  fn: function getPrivateM3U8() {
    const key = '视频/peachtest.mp4.m3u8'; // ObjectKey: 存在cos的媒体文件路径，比如test.mp4
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Query: {
          // 操作类型，固定使用 pm3u8;是否必传：是
          'ci-process': 'pm3u8',
          // 私有 ts 资源 url 下载凭证的相对有效期，单位为秒，范围为[3600, 43200];是否必传：是
          expires: 3600,
        },
        RawBody: true, // 固定值，必须
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body);
        }
      }
    );
  },
};

// 音视频转码
export const postTranscode = {
  name: '音视频转码',
  fn: function postTranscode() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的Tag：Transcode;是否必传：是
        Tag: 'Transcode',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // TemplateId与Transcode 二选一传入
          // 转码模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 转码模板参数;是否必传：否
          // Transcode: {},
          // 水印模板 ID，可以传多个水印模板 ID，最多传3个;是否必传：否
          // WatermarkTemplateId: '',
          // 去除水印参数,  H265、AV1编码暂不支持该参数;是否必传：否
          // RemoveWatermark: {
          //   // 距离左上角原点 x 偏移，范围为[1, 4096];是否必传：是
          //   Dx: '',
          //   // 距离左上角原点 y 偏移，范围为[1, 4096];是否必传：是
          //   Dy: '',
          //   // 宽，范围为[1, 4096];是否必传：是
          //   Width: '',
          //   // 高，范围为[1, 4096];是否必传：是
          //   Height: '',
          // },
          // 字幕参数，H265、AV1编码和非mkv封装暂不支持该参数;是否必传：否
          // Subtitles: {
          //   // 字幕参数;是否必传：是
          //   Subtitle: {
          //     // 同 bucket 的字幕地址，需要 encode;是否必传：是
          //     Url: '',
          //   },
          // },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/test.mp4',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务所在的队列类型，限制为 SpeedTranscoding, 表示为开启倍速转码;是否必传：否
        QueueType: 'SpeedTranscoding',
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 极速高清
export const postExtremeHD = {
  name: '极速高清',
  fn: function postExtremeHD() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的Tag：Transcode;是否必传：是
        Tag: 'Transcode',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 极速高清转码模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 't0fc3f4eb75596459eb42b5fa52aa6e511',
          // 水印模板 ID，可以传多个水印模板 ID，最多传3个;是否必传：否
          // WatermarkTemplateId: '',
          // 去除水印参数,  H265、AV1编码暂不支持该参数;是否必传：否
          // RemoveWatermark: {
          //   // 距离左上角原点 x 偏移，范围为[1, 4096];是否必传：是
          //   Dx: '',
          //   // 距离左上角原点 y 偏移，范围为[1, 4096];是否必传：是
          //   Dy: '',
          //   // 宽，范围为[1, 4096];是否必传：是
          //   Width: '',
          //   // 高，范围为[1, 4096];是否必传：是
          //   Height: '',
          // },
          // 字幕参数，H265、AV1编码和非mkv封装暂不支持该参数;是否必传：否
          // Subtitles: {
          //   // 字幕参数;是否必传：是
          //   Subtitle: {
          //     // 同 bucket 的字幕地址，需要 encode;是否必传：是
          //     Url: '',
          //   },
          // },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/test.mp4',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 音视频转封装
export const postSegment = {
  name: '音视频转封装',
  fn: function postSegment() {
    const key = 'jobs'; // 固定值，必须
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Segment;是否必传：是
        Tag: 'Segment',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 转封装参数;是否必传：是
          Segment: {
            // 封装格式，支持 aac、mp3、flac、mp4、ts、mkv、avi、hls、m3u8;是否必传：是
            Format: 'mp4',
            // 转封装时长单位：秒不小于5的整数不设置 Duration 时，表示只转封装格式不分段;是否必传：否
            Duration: '5',
            // 处理的流编号，对应媒体信息中的 Response.MediaInfo.Stream.Video.Index  和 Response.MediaInfo.Stream.Audio.Index，详见 获取媒体信息接口﻿;是否必传：否
            // TranscodeIndex: '',
            // // hls 加密配置,当封装格式为 hls 和 m3u8 时生效;是否必传：否
            // HlsEncrypt: {
            //   // 是否开启 HLS 加密，取值 true/false，默认值 false;是否必传：否
            //   IsHlsEncrypt: '',
            //   // HLS 加密的 key，当 IsHlsEncrypt 为 true 时，该参数才有意义;是否必传：否
            //   UriKey: '',
            // },
            // // 开始时间取值范围： [0,视频时长]，默认值为0单位为秒支持 float 格式，执行精度精确到毫秒;是否必传：否
            // StartTime: '',
            // // 结束时间取值范围：[0, 视频时长]，默认值为视频结束时间单位为秒支持 float 格式，执行精度精确到毫秒;是否必传：否
            // EndTime: '',
          },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/out-${number}',
          },
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交音视频拼接任务
export const postConcat = {
  name: '提交音视频拼接任务',
  fn: function postConcat() {
    const key = 'jobs'; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Concat;是否必传：是
        Tag: 'Concat',
        // 待操作的文件信息;是否必传：否
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // TemplateId与ConcatTemplate 二选一传入
          // 转码模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 拼接参数;是否必传：否
          // ConcatTemplate: {
          //   // 拼接节点，支持多个文件，按照文件顺序拼接;限制：否;;是否必传：否
          //   ConcatFragment: {
          //     // 同 bucket 对象地址，需要 urlEncode;限制：是;;是否必传：否
          //     Url: '',
          //     // 拼接对象的索引位置，大于等于0的整数;限制：否;;是否必传：否
          //     FragmentIndex: '',
          //     // 开始时间[0, 视频时长]单位为秒 当Request.Operation.ConcatTemplate.DirectConcat 为 true 时不生效;限制：否;;是否必传：否
          //     StartTime: '',
          //     // 结束时间[0, 视频时长]单位为秒 当 Request.Operation.ConcatTemplate.DirectConcat 为 true 时不生效;限制：否;;是否必传：否
          //     EndTime: '',
          //   },
          //   // Input 节点位于 ConcatFragment 序列索引，不能大于 ConcatFragment 长度;限制：否;;是否必传：否
          //   Index: '',
          //   // 简单拼接方式（不转码直接拼接），其他的视频和音频参数失效，取值 true/false;限制：否;;是否必传：否
          //   DirectConcat: '',
          // },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/out.mp4',
          },
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交视频转动图
export const postAnimation = {
  name: '提交视频转动图',
  fn: function postAnimation() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Animation;是否必传：是
        Tag: 'Animation',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // TemplateId与Animation 二选一传入
          // 转码模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 视频转动图参数;是否必传：否
          // Animation: {},
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/out.${ext}',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交精彩集锦任务
export const postVideoMontage = {
  name: '提交精彩集锦任务',
  fn: function postVideoMontage() {
    const key = 'jobs'; // 固定值，必须
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：VideoMontage;是否必传：是
        Tag: 'VideoMontage',
        // 待操作的文件信息;是否必传：是
        Input: {
          // Object与url二选一传递
          // 同存储桶文件路径;是否必传：否
          Object: 'test.mp4',
          // 支持公网下载的Url;是否必传：否
          // Url: '',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 模板 ID;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/out.mp4',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交视频标签任务
export const postVideoTag = {
  name: '提交视频标签任务',
  fn: function postVideoTag() {
    const key = 'jobs'; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：VideoTag;是否必传：是
        Tag: 'VideoTag',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 执行视频标签任务的文件路径，目前支持 mp4、avi、mkv、wmv、rmvb、flv、mov 封装格式，视频时长超过30min的视频请 提交工单 处理;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 任务参数;是否必传：是
          VideoTag: {
            // 场景类型，可选择视频标签的运用场景，不同的运用场景使用的算法、输入输出等都会有所差异。当前版本只支持  Stream 场景;是否必传：是
            Scenario: 'Stream',
          },
          // 任务优先级，级别限制：0 、1 、2。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
          // 透传用户信息;是否必传：否
          UserData: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交智能封面任务
export const postSmartCover = {
  name: '提交智能封面任务',
  fn: function postSmartCover() {
    const key = 'jobs'; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：SmartCover;是否必传：是
        Tag: 'SmartCover',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 智能封面模板id;是否必传：否，可通过控制台获取
          TemplateId: 'xxx',
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/smartcover-${number}.jpg',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为 0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 添加数字水印任务
export const postDigitalWatermark = {
  name: '添加数字水印任务',
  fn: function postDigitalWatermark() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：DigitalWatermark;是否必传：是
        Tag: 'DigitalWatermark',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          DigitalWatermark: {
            Message: '123456', // 嵌入数字水印的水印信息;是否必传：是
            Type: 'Text', // 数字水印类型;是否必传：是
            Version: 'V1', // 数字水印版本;是否必传：是
            IgnoreError: true, // 当添加水印失败是否忽略错误继续执行任务;是否必传：是
          },
          // 结果输出配置;是否必传：是
          Output: {
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/output.mp4',
          },
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提取数字水印任务
export const postExtractDigitalWatermark = {
  name: '提取数字水印任务',
  fn: function postExtractDigitalWatermark() {
    const key = 'jobs'; // 固定值，必须
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：ExtractDigitalWatermark;是否必传：是
        Tag: 'ExtractDigitalWatermark',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'test.mp4',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 提取数字水印配置;是否必传：是
          ExtractDigitalWatermark: {
            // 水印类型;限制：Text;;是否必传：是
            Type: 'Text',
            // 水印版本;限制：V1;;是否必传：是
            Version: 'V1',
          },
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          UserData: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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

// 提交图片异步处理任务
export const postPicProcess = {
  name: '提交图片异步处理任务',
  fn: function postPicProcess() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：PicProcess;是否必传：是
        Tag: 'PicProcess',
        // 待操作的文件信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: '1.jpg',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 模板 ID;是否必传：否
          TemplateId: 't1edc04f224ca64782840022cdc8fc3aa4',
          // PicProcess: {},
          // 结果输出配置;是否必传：是
          Output: {
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 输出结果的文件名;是否必传：是
            Object: 'output/output.jpg',
          },
          // 透传用户信息, 可打印的 ASCII 码, 长度不超过1024;是否必传：否
          UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          JobLevel: '0',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        CallBackType: 'Url',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        CallBack: '',
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
          console.log(data);
        }
      }
    );
  },
};
