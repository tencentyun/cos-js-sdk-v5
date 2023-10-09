var TaskId;

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

function getImageUrl() {
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
  const host = 'ci.' + config.Region + '.myqcloud.com';
  const url = 'https://' + host + '/mediabucket';
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
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    },
  );
}

// 搜索媒体处理队列
function searchMediaQueue() {
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
    },
  );
}

// 更新媒体处理队列
function updateMediaQueue() {
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
    },
  );
}

// 获取媒体文件信息同步请求
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
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    },
  );
}

function postMediaInfo() {
  const key = `jobs`; //
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
    },
  );
}

// 获取媒体文件某个时间的截图
function getSnapshot() {
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
    },
  );
}
// 获取私m3u8
function getPrivateM3U8() {
  const key = '视频/peachtest.mp4.m3u8'; // ObjectKey: 存在cos的媒体文件路径，比如test.mp4
  const host = `${config.Bucket}.cos.${config.Region}.myqcloud.com`;

  cos.request(
    {
      Bucket: config.Bucket,
      Region: config.Region,
      Method: 'GET', // 固定值，必须
      Key: key, // 必须
      // Url: url, // 请求的url，必须
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
    },
  );
}

// 音视频转码
function postTranscode() {
  const key = `jobs`; // 固定值
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
    },
  );
}

// 极速高清
function postExtremeHD() {
  const key = `jobs`; // 固定值
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
    },
  );
}

// 音视频转封装
function postSegment() {
  const key = `jobs`; // 固定值，必须
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
    },
  );
}

// 提交音视频拼接任务
function postConcat() {
  const key = `jobs`; //
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
    },
  );
}

// 提交视频转动图
function postAnimation() {
  const key = `jobs`; // 固定值
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
    },
  );
}

// 提交视频截帧任务
function postSnapshot() {
  const key = `jobs`; // 固定值
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
    },
  );
}

// 提交精彩集锦任务
function postVideoMontage() {
  const key = `jobs`; // 固定值，必须
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
    },
  );
}

// 提交视频标签任务
function postVideoTag() {
  const key = `jobs`; //
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
    },
  );
}

// 提交智能封面任务
function postSmartCover() {
  const key = `jobs`; //
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
    },
  );
}

// 添加数字水印任务
function postDigitalWatermark() {
  const key = `jobs`; // 固定值
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
    },
  );
}

// 提取数字水印任务
function postExtractDigitalWatermark() {
  const key = `jobs`; // 固定值，必须
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
    },
  );
}

// 提交图片异步处理任务
function postPicProcess() {
  const key = `jobs`; // 固定值
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
      Key: 'image/auditing',
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

// 反馈处理结果
function reportBadCase() {
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

// 取消直播审核
function cancelLiveAuditing() {
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
        srcType: 'docx', // 非必须，源数据的后缀类型，当前文档转换根据 COS 对象的后缀名来确定源数据类型。当 COS 对象没有后缀名时，可以设置该值
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
  // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/46946)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
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
        dstType: 'html', // 非必须，转换输出目标文件类型
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
        width: 200, //必须，指定生成的二维码或条形码的宽度，高度会进行等比压缩
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
        TemplateId: 'xxx', // 指定的模板 ID，必须
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
        TemplateId: 'xxx', // 指定的模板 ID，必须
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
  // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/46946)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
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
        weboffice_url: 1, // 非必须，是否获取预览链接。填入值为1会返回预览链接和Token信息；填入值为2只返回Token信息；不传会直接预览
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
        state: 'Active', // 非必须，Active 表示队列内的作业会被调度执行。Paused 表示队列暂停，作业不再会被调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响
        pageNumber: 1, // 第几页,默认值1
        pageSize: 10, // 非必须，每页个数,默认值10
      },
    },
    function (err, data) {
      logger.log(err || data);
    },
  );
}

// 更新文件处理队列
function updateFileProcessQueue() {
  // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/46946)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
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

// 上传时使用图片处理
function uploadPicOperation() {
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
            'Pic-Operations': JSON.stringify({
              is_pic_info: 1,
              rules: [{ fileid: 'desample_photo.jpg', rule: 'imageMogr2/thumbnail/200x/' }],
            }),
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
          logger.log('uploadPicOperation:', err || data);
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
          logger.log('uploadPicOperation:', err || data);
        },
      );
    }
  });
}

// 对云上数据处理
function requestPicOperation() {
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
      logger.log('requestPicOperation:', err || data);
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
        state: 'Active', // 非必须，1. Active 表示队列内的作业会被媒体处理服务调度执行。2. Paused 表示队列暂停，作业不再会被媒体处理调度执行，队列内的所有作业状态维持在暂停状态，已经执行中的任务不受影响。
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
  // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/46946)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
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

// 查看指定任务
function getJobDetail() {
  const jobId = 'jec8ae8943c2511ee9d4a9b3cb7a5c6xx'; // jobId: 需要查询的jobId;
  const key = `jobs/${jobId}`; // jobId: 需要查询的jobId;
  const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
  const url = `https://${host}/${key}`;

  cos.request(
    {
      Method: 'GET', // 固定值，必须
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
    },
  );
}

// 获取任务列表
function getJobList() {
  const key = `jobs`; // 固定值，必须
  const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
  const url = `https://${host}/${key}`;

  cos.request(
    {
      Method: 'GET', // 固定值，必须
      Key: key, // 必须
      Url: url, // 请求的url，必须
      Query: {
        // 拉取该队列 ID 下的任务;是否必传：否
        // queueId: '',
        // 拉取队列类型下的任务，和 queueId 不同时生效，同时存在时 queueId 优先;是否必传：否
        // queueType: '',
        // 任务的 Tag;是否必传：是，比如查找视频转动图的任务
        tag: 'Animation',
        // 触发该任务的工作流ID;是否必传：否
        workflowId: '',
        // 触发该任务的存量触发任务ID;是否必传：否
        // inventoryTriggerJobId: '',
        // 该任务的输入文件名，暂仅支持精确匹配;是否必传：否
        // inputObject: '',
        // Desc 或者 Asc。默认为 Desc;是否必传：否
        // orderByTime: '',
        // 请求的上下文，用于翻页。上次返回的值;是否必传：否
        // nextToken: '',
        // 拉取的最大任务数。默认为10。最大为100;是否必传：否
        size: 10,
        // 拉取该状态的任务，以,分割，支持多状态：All、Submitted、Running、Success、Failed、Pause、Cancel。默认为 All;是否必传：否
        states: 'All',
        // 拉取创建时间大于该时间的任务。格式为：%Y-%m-%dT%H:%m:%S%z，示例：2001-01-01T00:00:00+0800;是否必传：否
        // startCreationTime: '',
        // 拉取创建时间小于该时间的任务。格式为：%Y-%m-%dT%H:%m:%S%z，示例：2001-01-01T23:59:59+0800;是否必传：否
        // endCreationTime: '',
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
    },
  );
}

function getWorkflow() {
  const key = `workflow`; //
  const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
  const url = `https://${host}/${key}`;

  cos.request(
    {
      Method: 'GET', // 固定值，必须
      Key: key, // 必须
      Url: url, // 请求的url，必须
      Query: {
        // 工作流 ID，以,符号分割字符串;是否必传：否
        ids: '',
        // 工作流名称;是否必传：否
        name: '',
        // 第几页;是否必传：否
        pageNumber: '',
        // 每页个数;是否必传：否
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
    },
  );
}

// 获取工作流实例详情
function getWorkflowexecution() {
  const runId = 'ic7af1bf53c2911ee9988525400ae68xx';
  const key = `workflowexecution/${runId}`; // RunId:7;
  const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
  const url = `https://${host}/${key}`;

  cos.request(
    {
      Method: 'GET', // 固定值，必须
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
    },
  );
}

// 测试工作流
function triggerworkflow() {
  const key = `triggerworkflow`; //
  const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
  const url = `https://${host}/${key}`;

  cos.request(
    {
      Method: 'POST', // 固定值，必须
      Key: key, // 必须
      Url: url, // 请求的url，必须
      Query: {
        // 需要触发的工作流 ID;是否必传：是
        workflowId: 'wd3330113a4ef4287a4e0a93c36af09xx',
        // 需要进行工作流处理的对象名称, 需要进行 url 编码;是否必传：是
        object: 'test.mp4',
        // 存量触发任务名称，支持中文、英文、数字、—和_，长度限制128字符，默认为空;是否必传：否
        // name: '',
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
    },
  );
}

(function () {
  var list = [
    'header-任务与工作流',
    'getJobDetail',
    'getJobList',
    'getWorkflow',
    'getWorkflowexecution',
    'triggerworkflow',

    'header-图片处理',
    'getImageUrl',
    'addImageStyle',
    'describeImageStyles',
    'deleteImageStyle',
    'openImageGuetzli',
    'describeImageGuetzli',
    'closeImageGuetzli',
    'uploadPicOperation',
    'requestPicOperation',
    'advanceCompressExample3',
    'createImageInspectJob',
    'describePicProcessQueues',
    'updatePicProcessQueue',
    'openOriginProtect',
    'describeOriginProtect',
    'closeOriginProtect',

    'header-媒体处理',
    'describeMediaBuckets',
    'searchMediaQueue',
    'updateMediaQueue',
    'getMediaInfo',
    'postMediaInfo',
    'getSnapshot',
    'postSnapshot',
    'getPrivateM3U8',
    'postTranscode',
    'postExtremeHD',
    'postSegment',
    'postConcat',
    'postAnimation',
    'postVideoMontage',
    'postVideoTag',
    'postSmartCover',
    'postDigitalWatermark',
    'postExtractDigitalWatermark',
    'postPicProcess',

    'header-内容审核',
    'getImageAuditing',
    'postImagesAuditing',
    'getImageAuditingResult',
    'reportBadCase',
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
    'cancelLiveAuditing',

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
    getImageUrl: '生成带图片处理参数的签名 URL',

    getJobDetail: '查询指定任务',
    getJobList: '获取任务列表',
    getWorkflow: '查询工作流',
    getWorkflowexecution: '获取工作流实例详情',
    triggerworkflow: '测试工作流',

    describeMediaBuckets: '查询媒体处理开通情况',
    searchMediaQueue: '搜索媒体处理队列',
    updateMediaQueue: '更新媒体处理队列',
    getMediaInfo: '获取媒体信息同步请求',
    postMediaInfo: '获取媒体信息异步任务',
    getSnapshot: '获取媒体文件某个时间的截图',
    getPrivateM3U8: '获取私有m3u8',
    postTranscode: '提交音视频转码',
    postExtremeHD: '提交极速高清转码',
    postSegment: '提交音视频转封装',
    postConcat: '提交音视频拼接任务',
    postAnimation: '提交视频转动图任务',
    postVideoMontage: '提交精彩集锦任务',
    postVideoTag: '提交视频标签任务',
    postSmartCover: '提交智能封面任务',
    postDigitalWatermark: '添加数字水印任务',
    postExtractDigitalWatermark: '提取数字水印任务',
    postPicProcess: '提交图片异步处理任务',

    getImageAuditing: '图片同步审核',
    postImagesAuditing: '图片批量审核',
    getImageAuditingResult: '查询图片审核任务结果',
    reportBadCase: '反馈处理结果',
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
    cancelLiveAuditing: '取消直播审核任务',
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
    uploadPicOperation: '上传时使用图片处理',
    requestPicOperation: '对云上数据进行图片处理',
    advanceCompressExample3: '下载时使用图片处理',
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
