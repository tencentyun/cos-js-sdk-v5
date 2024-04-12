/**
 * 智能语音demo集合
 */

// 查询语音识别开通状态
export const getAsrBucket = {
  name: '查询语音识别开通状态',
  fn: function getAsrBucket() {
    const key = 'asrbucket'; // 固定值
    const host = `ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 地域信息，例如 ap-shanghai、ap-beijing，若查询多个地域以“,”分隔字符串，详情请参见 地域与域名;是否必传：是
          // regions: "",
          // 存储桶名称，以“,”分隔，支持多个存储桶，精确搜索;是否必传：是
          // bucketNames: "",
          // 存储桶名称前缀，前缀搜索;是否必传：是
          // bucketName: "",
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

// 开通智能语音
export const CreateAsrBucket = {
  name: '开通智能语音',
  fn: function CreateAsrBucket() {
    const key = 'asrbucket'; // 固定值
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

// 关闭智能语音
export const DeleteAsrBucket = {
  name: '关闭智能语音',
  fn: function DeleteAsrBucket() {
    const key = 'asrbucket'; // 固定值
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

// 查询语音识别队列
export const getAsrQueue = {
  name: '查询语音识别队列',
  fn: function getAsrQueue() {
    const key = 'asrqueue'; // 固定值
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
          // state: '',
          // 第几页，默认值1;是否必传：否
          // pageNumber: '',
          // 每页个数，默认值10;是否必传：否
          // pageSize: '',
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

// 更新语音识别队列
export const updateAsrQueue = {
  name: '更新语音识别队列',
  fn: function updateAsrQueue() {
    // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/79394)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
    const queueId = 'pcc77499e85c311edb9865254008618d9';
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/asrqueue/' + queueId;
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 提交音频降噪任务
export const postNoiseReduction = {
  name: '提交音频降噪任务',
  fn: function postNoiseReduction() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
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

// 提交人声分离任务
export const postVoiceSeparate = {
  name: '提交人声分离任务',
  fn: function postVoiceSeparate() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        Tag: 'VoiceSeparate',
        Input: {
          Object: 'ci/music.mp3', // 文件名，取值为文件在当前存储桶中的完整名称
        },
        Operation: {
          // VoiceSeparate: {}, // 指定转码模板参数，非必须
          TemplateId: 't17844a8302372436187b425271a0ae33a', // 指定的模板 ID，必须
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

// 创建人声分离模板
export const postVoiceSeparateTemplete = {
  name: '创建人声分离模板',
  fn: function postVoiceSeparateTemplete() {
    const key = 'template'; // 固定
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型: VoiceSeparate;是否必传：是
        Tag: 'VoiceSeparate',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_voiceSeparate',
        // 输出音频IsAudio：输出人声IsBackground：输出背景声AudioAndBackground：输出人声和背景声MusicMode：输出人声、背景声、Bass声、鼓声;是否必传：是
        AudioMode: 'IsAudio',
        // 音频配置;是否必传：是
        AudioConfig: {
          // 编解码格式，取值 aac、mp3、flac、amr。当 Request.AudioMode 为 MusicMode 时，仅支持 mp3、wav、acc;是否必传：否
          Codec: 'mp3',
          // 采样率单位：Hz可选 8000、11025、22050、32000、44100、48000、96000当 Codec 设置为 aac/flac 时，不支持 8000当 Codec 设置为 mp3 时，不支持 8000 和 96000当 Codec 设置为 amr 时，只支持 8000当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Samplerate: '',
          // 音频码率单位：Kbps值范围：[8，1000]当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Bitrate: '',
          // 声道数当 Codec 设置为 aac/flac，支持1、2、4、5、6、8当 Codec 设置为 mp3，支持1、2 当 Codec 设置为 amr，只支持1当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Channels: '',
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

// 更新人声分离模板
export const updateVoiceSeparateTemplete = {
  name: '更新人声分离模板',
  fn: function updateVoiceSeparateTemplete() {
    const templateId = 't18e592c70a4724b46bdcde4b711c6c0d5'; // 要更新的模版id
    const key = `template/${templateId}`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型: VoiceSeparate;是否必传：是
        Tag: 'VoiceSeparate',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_voiceSeparate2',
        // 输出音频IsAudio：输出人声IsBackground：输出背景声AudioAndBackground：输出人声和背景声MusicMode：输出人声、背景声、Bass声、鼓声;是否必传：是
        AudioMode: 'IsAudio',
        // 音频配置;是否必传：是
        AudioConfig: {
          // 编解码格式，取值 aac、mp3、flac、amr。当 Request.AudioMode 为 MusicMode 时，仅支持 mp3、wav、acc;是否必传：否
          Codec: 'mp3',
          // 采样率单位：Hz可选 8000、11025、22050、32000、44100、48000、96000当 Codec 设置为 aac/flac 时，不支持 8000当 Codec 设置为 mp3 时，不支持 8000 和 96000当 Codec 设置为 amr 时，只支持 8000当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Samplerate: '',
          // 音频码率单位：Kbps值范围：[8，1000]当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Bitrate: '',
          // 声道数当 Codec 设置为 aac/flac，支持1、2、4、5、6、8当 Codec 设置为 mp3，支持1、2 当 Codec 设置为 amr，只支持1当 Request.AudioMode 为 MusicMode 时，该参数无效;是否必传：否
          // Channels: '',
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

// 提交一个语音合成任务
export const postVoiceSynthesis = {
  name: '提交一个语音合成任务',
  fn: function postVoiceSynthesis() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：Tts;是否必传：是
        Tag: 'Tts',
        // 操作规则;是否必传：是
        Operation: {
          // 语音合成模板 ID; 与TtsTpl二选一传递
          TemplateId: 't1958211407ca54ebc8c78060a7f2ba564',
          // 语音合成参数; 与TemplateId二选一传递
          // TtsTpl: {
          //   // 同创建语音合成模板接口中的 Request.Mode﻿;是否必传：否
          //   Mode: '',
          //   // 同创建语音合成模板接口中的 Request.Codec﻿;是否必传：否
          //   Codec: '',
          //   // 同创建语音合成模板接口中的 Request.VoiceType﻿;是否必传：否
          //   VoiceType: '',
          //   // 同创建语音合成模板接口中的 Request.Volume﻿;是否必传：否
          //   Volume: '',
          //   // 同创建语音合成模板接口中的 Request.Speed﻿;是否必传：否
          //   Speed: '',
          //   // 同创建语音合成模板接口中的 Request.Emotion﻿;是否必传：否
          //   Emotion: '',
          // },
          // 语音合成任务参数;是否必传：是
          TtsConfig: {
            // 输入类型，Url/Text;是否必传：是
            InputType: 'Text',
            // 当 InputType 为 Url 时， 必须是合法的 COS 地址，文件必须是utf-8编码，且大小不超过 10M。如果合成方式为同步处理，则文件内容不超过 300 个 utf-8 字符；如果合成方式为异步处理，则文件内容不超过 10000 个 utf-8 字符。当 InputType 为 Text 时, 输入必须是 utf-8 字符, 且不超过 300 个字符。;是否必传：是
            Input: '床前明月光，疑是地上霜',
          },
          // 结果输出配置;是否必传：是
          Output: {
            // 存储桶的地域;是否必传：是
            Region: config.Region,
            // 存储结果的存储桶;是否必传：是
            Bucket: config.Bucket,
            // 结果文件名;是否必传：是
            Object: 'ci/tts.mp3',
          },
          // 透传用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
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

// 创建语音合成模板
export const postVoiceSynthesisTemplete = {
  name: '创建语音合成模板',
  fn: function postVoiceSynthesisTemplete() {
    const key = 'template'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：Tts;是否必传：是
        Tag: 'Tts',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_tts',
        // 处理模式Asyc（异步合成）Sync（同步合成）;是否必传：否
        // Mode: 'Asyc',
        // 音频格式，支持 wav、mp3、pcm ;是否必传：否
        // Codec: 'pcm',
        // 音色，取值和限制介绍请见下表;是否必传：否
        // VoiceType: 'ruxue',
        // 音量，取值范围 [-10,10];是否必传：否
        // Volume: '0',
        // 语速，取值范围 [50,200];是否必传：否
        // Speed: '100',
        // 情绪，不同音色支持的情绪不同，详见下表;是否必传：否
        // Emotion: '',
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

// 更新语音合成模板
export const updateVoiceSynthesisTemplete = {
  name: '更新语音合成模板',
  fn: function updateVoiceSynthesisTemplete() {
    const templateId = 'xxxx'; // 要更新的模板id
    const key = `template/${templateId}`; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：Tts;是否必传：是
        Tag: 'Tts',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_tts2',
        // 处理模式Asyc（异步合成）Sync（同步合成）;是否必传：否
        Mode: 'Asyc',
        // 音频格式，支持 wav、mp3、pcm ;是否必传：否
        Codec: 'pcm',
        // 音色，取值和限制介绍请见下表;是否必传：否
        VoiceType: 'ruxue',
        // 音量，取值范围 [-10,10];是否必传：否
        Volume: '0',
        // 语速，取值范围 [50,200];是否必传：否
        Speed: '100',
        // 情绪，不同音色支持的情绪不同，详见下表;是否必传：否
        Emotion: '无',
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

// 提交语音识别任务
export const postSpeechRecognition = {
  name: '提交语音识别任务',
  fn: function postSpeechRecognition() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
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
        Key: key,
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
          console.log(data.Response);
        }
      }
    );
  },
};

// 创建语音识别模板
export const postSpeechRecognitionTemplete = {
  name: '创建语音识别模板',
  fn: function postSpeechRecognitionTemplete() {
    const key = 'template'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：SpeechRecognition;是否必传：是
        Tag: 'SpeechRecognition',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_speechRecognition',
        // 语音识别参数;是否必传：是
        SpeechRecognition: {
          // 开启极速ASR，取值 true/false;是否必传：否
          FlashAsr: 'false',
          // 引擎模型类型，分为电话场景和非电话场景。电话场景：8k_zh：电话 8k 中文普通话通用（可用于双声道音频）8k_zh_s：电话 8k 中文普通话话者分离（仅适用于单声道音频）8k_en：电话 8k 英语 非电话场景： 6k_zh：16k 中文普通话通用16k_zh_video：16k 音视频领域16k_en：16k 英语16k_ca：16k 粤语16k_ja：16k 日语16k_zh_edu：中文教育16k_en_edu：英文教育16k_zh_medical：医疗16k_th：泰语16k_zh_dialect：多方言，支持23种方言极速 ASR 支持8k_zh、16k_zh、16k_en、16k_zh_video、16k_zh_dialect、16k_ms（马来语）、16k_zh-PY（中英粤）;是否必传：是
          EngineModelType: '16k_zh',
          // 语音声道数：1 表示单声道。EngineModelType为非电话场景仅支持单声道2 表示双声道（仅支持 8k_zh 引擎模型 双声道应分别对应通话双方）仅���持非极速ASR，为非极速ASR时，该参数必填;是否必传：否
          ChannelNum: '1',
          // 识别结果返回形式：0：识别结果文本（含分段时间戳）1：词级别粒度的详细识别结果，不含标点，含语速值（词时间戳列表，一般用于生成字幕场景）2：词级别粒度的详细识别结果（包含标点、语速值）3：标点符号分段，包含每段时间戳，特别适用于字幕场景（包含词级时间、标点、语速值）仅支持非极速ASR;是否必传：否
          // ResTextFormat: '0',
          // 是否过滤脏词（目前支持中文普通话引擎）0：不过滤脏词1：过滤脏词2：将脏词替换为 *;是否必传：否
          // FilterDirty: '0',
          // 是否过滤语气词（目前支持中文普通话引擎）：0 表示不过滤语气词1 表示部分过滤2 表示严格过滤 ;是否必传：否
          // FilterModal: '0',
          // 是否进行阿拉伯数字智能转换（目前支持中文普通话引擎）0：不转换，直接输出中文数字1：根据场景智能转换为阿拉伯数字3 ：打开数学相关数字转换仅支持非极速ASR;是否必传：否
          // ConvertNumMode: '0',
          // 是否开启说话人分离0：不开启1：开启(仅支持8k_zh，16k_zh，16k_zh_video，单声道音频)8k电话场景建议使用双声道来区分通话双方，设置ChannelNum=2即可，不用开启说话人分离。;是否必传：否
          // SpeakerDiarization: '0',
          // 说话人分离人数（需配合开启说话人分离使用），取值范围：[0, 10]0 代表自动分离（目前仅支持≤6个人）1-10代表指定说话人数分离仅支持非极速ASR;是否必传：否
          // SpeakerNumber: '',
          // 是否过滤标点符号（目前支持中文普通话引擎）0：不过滤。1：过滤句末标点2：过滤所有标点;是否必传：否
          // FilterPunc: '',
          // 输出文件类型，可选txt、srt极速ASR仅支持txt非极速Asr且ResTextFormat为3时仅支持txt;是否必传：否
          // OutputFileType: '',
          // 极速ASR音频格式，支持 wav、pcm、ogg-opus、speex、silk、mp3、m4a、aac极速ASR时，该参数必填;是否必传：否
          // Format: '',
          // 是否识别首个声道0：识别所有声道1：识别首个声道仅支持极速ASR;是否必传：否
          // FirstChannelOnly: '',
          // 是否显示词级别时间戳0：不显示1：显示，不包含标点时间戳2：显示，包含标点时间戳仅支持极速ASR;是否必传：否
          // WordInfo: '',
          // 单标点最多字数，取值范围：[6，40]默认值为 0 表示不开启该功能该参数可用于字幕生成场景，控制单行字幕最大字数当FlashAsr为false时，仅ResTextFormat为3时参数有效;是否必传：否
          // SentenceMaxLength: '',
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

// 更新语音识别模板
export const updateSpeechRecognitionTemplete = {
  name: '更新语音识别模板',
  fn: function updateSpeechRecognitionTemplete() {
    const templateId = 'xxxxx'; // 要更新的模板id
    const key = `template/${templateId}`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：SpeechRecognition;是否必传：是
        Tag: 'SpeechRecognition',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64;是否必传：是
        Name: 'my_speechRecognition',
        // 语音识别参数;是否必传：是
        SpeechRecognition: {
          // 开启极速ASR，取值 true/false;是否必传：否
          FlashAsr: 'true',
          // 引擎模型类型，分为电话场景和非电话场景。电话场景：8k_zh：电话 8k 中文普通话通用（可用于双声道音频）8k_zh_s：电话 8k 中文普通话话者分离（仅适用于单声道音频）8k_en：电话 8k 英语 非电话场景： 6k_zh：16k 中文普通话通用16k_zh_video：16k 音视频领域16k_en：16k 英语16k_ca：16k 粤语16k_ja：16k 日语16k_zh_edu：中文教育16k_en_edu：英文教育16k_zh_medical：医疗16k_th：泰语16k_zh_dialect：多方言，支持23种方言极速 ASR 支持8k_zh、16k_zh、16k_en、16k_zh_video、16k_zh_dialect、16k_ms（马来语）、16k_zh-PY（中英粤）;是否必传：是
          EngineModelType: '16k_zh',
          // 语音声道数：1 表示单声道。EngineModelType为非电话场景仅支持单声道2 表示双声道（仅支持 8k_zh 引擎模型 双声道应分别对应通话双方）仅���持非极速ASR，为非极速ASR时，该参数必填;是否必传：否
          ChannelNum: '2',
          // 识别结果返回形式：0：识别结果文本（含分段时间戳）1：词级别粒度的详细识别结果，不含标点，含语速值（词时间戳列表，一般用于生成字幕场景）2：词级别粒度的详细识别结果（包含标点、语速值）3：标点符号分段，包含每段时间戳，特别适用于字幕场景（包含词级时间、标点、语速值）仅支持非极速ASR;是否必传：否
          // ResTextFormat: '',
          // 是否过滤脏词（目前支持中文普通话引擎）0：不过滤脏词1：过滤脏词2：将脏词替换为 *;是否必传：否
          // FilterDirty: '',
          // 是否过滤语气词（目前支持中文普通话引擎）：0 表示不过滤语气词1 表示部分过滤2 表示严格过滤 ;是否必传：否
          // FilterModal: '',
          // 是否进行阿拉伯数字智能转换（目前支持中文普通话引擎）0：不转换，直接输出中文数字1：根据场景智能转换为阿拉伯数字3 ：打开数学相关数字转换仅支持非极速ASR;是否必传：否
          // ConvertNumMode: '',
          // 是否开启说话人分离0：不开启1：开启(仅支持8k_zh，16k_zh，16k_zh_video，单声道音频)8k电话场景建议使用双声道来区分通话双方，设置ChannelNum=2即可，不用开启说话人分离。;是否必传：否
          // SpeakerDiarization: '',
          // 说话人分离人数（需配合开启说话人分离使用），取值范围：[0, 10]0 代表自动分离（目前仅支持≤6个人）1-10代表指定说话人数分离仅支持非极速ASR;是否必传：否
          // SpeakerNumber: '',
          // 是否过滤标点符号（目前支持中文普通话引擎）0：不过滤。1：过滤句末标点2：过滤所有标点;是否必传：否
          // FilterPunc: '',
          // 输出文件类型，可选txt、srt极速ASR仅支持txt非极速Asr且ResTextFormat为3时仅支持txt;是否必传：否
          // OutputFileType: '',
          // 极速ASR音频格式，支持 wav、pcm、ogg-opus、speex、silk、mp3、m4a、aac极速ASR时，该参数必填;是否必传：否
          // Format: '',
          // 是否识别首个声道0：识别所有声道1：识别首个声道仅支持极速ASR;是否必传：否
          // FirstChannelOnly: '',
          // 是否显示词级别时间戳0：不显示1：显示，不包含标点时间戳2：显示，包含标点时间戳仅支持极速ASR;是否必传：否
          // WordInfo: '',
          // 单标点最多字数，取值范围：[6，40]默认值为 0 表示不开启该功能该参数可用于字幕生成场景，控制单行字幕最大字数当FlashAsr为false时，仅ResTextFormat为3时参数有效;是否必传：否
          // SentenceMaxLength: '',
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

// 创建音频降噪模版
export const postNoiseReductionTemplete = {
  name: '创建音频降噪模版',
  fn: function postNoiseReductionTemplete() {
    const key = 'template'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 固定值：NoiseReduction;是否必传：是
        Tag: 'NoiseReduction',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64。;是否必传：是
        Name: 'my_noiseReduction',
        // 降噪参数;是否必传：是
        NoiseReduction: {
          // 封装格式，支持 mp3、m4a、wav;是否必传：否
          Format: 'mp3',
          // 采样率单位：Hz可选 8000、12000、16000、24000、32000、44100、48000;是否必传：否
          // Samplerate: '',
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

// 更新音频降噪模板
export const updateNoiseReductionTemplete = {
  name: '更新音频降噪模板',
  fn: function updateNoiseReductionTemplete() {
    const templateId = 'xxxxx'; // 要更新的模板id
    const key = `template/${templateId}`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 固定值：NoiseReduction;是否必传：是
        Tag: 'NoiseReduction',
        // 模板名称，仅支持中文、英文、数字、_、-和*，长度不超过 64。;是否必传：是
        Name: 'my_noiseReduction2',
        // 降噪参数;是否必传：是
        NoiseReduction: {
          // 封装格式，支持 mp3、m4a、wav;是否必传：否
          Format: 'mp3',
          // 采样率单位：Hz可选 8000、12000、16000、24000、32000、44100、48000;是否必传：否
          // Samplerate: '',
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

// 提交听歌识曲任务
export const postSoundHound = {
  name: '提交听歌识曲任务',
  fn: function postSoundHound() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：SoundHound;是否必传：是
        Tag: 'SoundHound',
        // 待操作的对象信息;是否必传：是
        Input: {
          // 文件路径;是否必传：是
          Object: 'ci/music.mp3',
        },
        // 操作规则;是否必传：是
        // Operation: {
        // 透���用户信息，可打印的 ASCII 码，长度不超过1024;是否必传：否
        // UserData: '',
        // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
        // JobLevel: '',
        // },
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

// 音乐评分
export const vocalScore = {
  name: '音乐评分',
  fn: function vocalScore() {
    const key = 'jobs'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 创建任务的 Tag：VocalScore;是否必传：是
        Tag: 'VocalScore',
        // 待操作的对象信息;是否必传：是
        Input: {
          // 文件路径;是否必传：否
          Object: 'ci/music.mp3',
        },
        // 操作规则;是否必传：是
        Operation: {
          // 音乐评分参数配置;是否必传：是
          VocalScore: {
            // 比对基准文件路径;是否必传：否
            StandardObject: 'ci/base.mp3',
          },
          // 透传用户信息, 可打印的 ASCII 码, 长度不超过1024;是否必传：否
          // UserData: '',
          // 任务优先级，级别限制：0 、1 、2 。级别越大任务优先级越高，默认为0;是否必传：否
          // JobLevel: '',
        },
        // 任务回调格式，JSON 或 XML，默认 XML，优先级高于队列的回调格式;是否必传：否
        // CallBackFormat: '',
        // 任务回调类型，Url 或 TDMQ，默认 Url，优先级高于队列的回调类型;是否必传：否
        // CallBackType: '',
        // 任务回调地址，优先级高于队列的回调地址。设置为 no 时，表示队列的回调地址不产生回调;是否必传：否
        // CallBack: '',
        // 任务回调TDMQ配置，当 CallBackType 为 TDMQ 时必填。详情见 CallBackMqConfig﻿;是否必传：否
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
