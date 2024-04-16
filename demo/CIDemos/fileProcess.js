/**
 * 文件处理demo集合
 */

// 开通文件处理服务
export const createFileProcessBucket = {
  name: '开通文件处理服务',
  fn: function createFileProcessBucket() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_bucket';
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'POST',
        Key: 'file_bucket',
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

// 查询文件处理服务
export const DescribeFileProcessBuckets = {
  name: '查询文件处理服务',
  fn: function DescribeFileProcessBuckets() {
    const key = 'file_bucket';
    const host = 'ci.' + config.Region + '.myqcloud.com/' + key;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: key,
        Url: url,
        Query: {
          // regions: '', // 地域信息，例如 ap-shanghai、ap-beijing，若查询多个地域以“,”分隔字符串，详情请参见 地域与域名
          // bucketNames: '', // 存储桶名称，以“,”分隔，支持多个存储桶，精确搜索
          // bucketName: '', // 存储桶名称前缀，前缀搜索
          // pageNumber: '', // 第几页
          // pageSize: '', // 每页个数，大于0且小于等于100的整数
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

// 关闭文件处理服务
export const DeleteFileProcessBucket = {
  name: '关闭文件处理服务',
  fn: function DeleteFileProcessBucket() {
    const key = 'file_bucket';
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/' + key;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'Delete',
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

// 提交文件压缩任务
export const postFileCompress = {
  name: '提交文件压缩任务',
  fn: function postFileCompress() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询文件压缩任务结果
export const getFileCompress = {
  name: '查询文件压缩任务结果',
  fn: function getFileCompress() {
    const jobId = 'faf1d2774a13911ed88a65b0c303ae7xx'; // 提交文件压缩任务后会返回当前任务的jobId
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'file_jobs/' + jobId,
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

// 提交文件解压任务
export const postFileUnCompress = {
  name: '提交文件解压任务',
  fn: function postFileUnCompress() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询文件解压任务结果
export const getFileUnCompress = {
  name: '查询文件解压任务结果',
  fn: function getFileUnCompress() {
    const jobId = 'fe7b0fa34a13911eda186254bb8f3aaxx'; // 提交文件解压任务后会返回当前任务的jobId
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'file_jobs/' + jobId,
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

// 提交哈希值计算任务
export const postFileHash = {
  name: '提交哈希值计算任务',
  fn: function postFileHash() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询哈希值计算任务结果
export const getFileHashResult = {
  name: '查询哈希值计算任务结果',
  fn: function getFileHashResult() {
    const jobId = 'f3addcbd0a13811ed9b4ff5338d756fxx'; // 提交文件哈希值计算任务后会返回当前任务的jobId
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_jobs/' + jobId;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'file_jobs/' + jobId,
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

// 查询文件处理队列
export const describeFileProcessQueues = {
  name: '查询文件处理队列',
  fn: function describeFileProcessQueues() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_queue';
    const url = 'https://' + host;
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

// 更新文件处理队列
export const updateFileProcessQueue = {
  name: '更新文件处理队列',
  fn: function updateFileProcessQueue() {
    // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/86421)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
    const queueId = 'p6160ada105a7408e95aac015f4bf8xxx';
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/file_queue/' + queueId;
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 哈希值计算同步请求
export const generateFileHash = {
  name: '哈希值计算同步请求',
  fn: function generateFileHash() {
    const key = 'test.pdf';
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: key,
        Query: {
          'ci-process': 'filehash', // 必须，操作类型，哈希值计算固定为：filehash
          type: 'md5', // 必须，支持的哈希算法类型，有效值：md5、sha1、sha256
          // 'addtoheader': false, // 非必须，是否将计算得到的哈希值，自动添加至文件的自定义header，格式为：x-cos-meta-md5/sha1/sha256;有效值：true、false，不填则默认为false。
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
