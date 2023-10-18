/**
 * 文档预览demo集合
 */

// 查询已经开通文档预览的存储桶
export const describeDocProcessBuckets = {
  name: '查询已经开通文档预览的存储桶',
  fn: function describeDocProcessBuckets() {
    const host = 'ci.' + config.Region + '.myqcloud.com/docbucket';
    const url = 'https://' + host;
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

// 文档转码同步请求
export const getDocPreview = {
  name: '文档转码同步请求',
  fn: function getDocPreview() {
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
          const body = data.Body;
          // const url = URL.createObjectURL(body);
          // const img = document.getElementById('image');
          // img.src = url;
          // 获取总页数(需要在跨域配置的Expose-Headers配置需要暴露出的头部 比如下方的X-Total-Page)
          // 跨域配置可参考文档 https://cloud.tencent.com/document/product/436/13318
          const totalPage = data.headers['X-Total-Page'];
        }
      }
    );
  },
};

// 查询文档转码队列
export const describeDocProcessQueues = {
  name: '查询文档转码队列',
  fn: function describeDocProcessQueues() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/docqueue';
    const url = 'https://' + host;
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

// 更新文档预览队列
export const updateDocProcessQueue = {
  name: '更新文档预览队列',
  fn: function updateDocProcessQueue() {
    // 任务所在的队列 ID，请使用查询队列(https://cloud.tencent.com/document/product/460/46946)获取或前往万象控制台(https://cloud.tencent.com/document/product/460/46487)在存储桶中查询
    const queueId = 'pa2e2c3d3fae042de909cafc16f1d801b'; // 替换成自己的队列id
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/docqueue/' + queueId;
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 提交文档转码任务
export const createDocProcessJobs = {
  name: '提交文档转码任务',
  fn: function createDocProcessJobs() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询指定的文档预览任务
export const describeDocProcessJob = {
  name: '查询指定的文档预览任务',
  fn: function describeDocProcessJob() {
    const jobId = 'd87fbabd07b8611ed974b3f4b40648xxx'; // 替换成自己的jogId
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs/' + jobId;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'doc_jobs/' + jobId,
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

// 拉取符合条件的文档预览任务
export const describeDocProcessJobs = {
  name: '拉取符合条件的文档预览任务',
  fn: function describeDocProcessJobs() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/doc_jobs';
    const url = 'https://' + host;
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

// 文档转 HTML
export const getDocHtmlUrl = {
  name: '文档转 HTML',
  fn: function getDocHtmlUrl() {
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
          const url = data.Url;
          console.log(url);
        }
      }
    );
  },
};

// 获取在线文档预览地址
export const getDocHtmlPreviewUrl = {
  name: '获取在线文档预览地址',
  fn: function getDocHtmlPreviewUrl() {
    const key = 'test.pdf';
    cos.request(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Method: 'GET',
        Key: key,
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
