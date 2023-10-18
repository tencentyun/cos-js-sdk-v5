/**
 * 其他demo集合
 */

// 开通数据万象
export const createCIBucket = {
  name: '开通数据万象',
  fn: function createCIBucket() {
    const host = `${config.Bucket}.pic.${config.Region}.myqcloud.com`;
    const url = `https://${host}`;
    cos.request(
      {
        Method: 'PUT', // 固定值，必须
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

// 关闭数据万象
export const deleteCIBucket = {
  name: '关闭数据万象',
  fn: function deleteCIBucket() {
    const host = `${config.Bucket}.pic.${config.Region}.myqcloud.com`;
    const url = `https://${host}`;
    cos.request(
      {
        Method: 'PUT', // 固定值，必须
        Url: url, // 请求的url，必须
        Action: 'unbind', // 固定值
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

// 查询查询数据处理服务
export const queryCIBucket = {
  name: '查询查询数据处理服务',
  fn: function queryCIBucket() {
    const host = `${config.Bucket}.pic.${config.Region}.myqcloud.com`;
    const url = `https://${host}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Url: url, // 请求的url，必须
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

// 提交病毒检测任务
export const postVirusDetect = {
  name: '提交病毒检测任务',
  fn: function postVirusDetect() {
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/virus/detect';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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

// 查询病毒检测任务结果
export const getVirusDetectResult = {
  name: '查询病毒检测任务结果',
  fn: function getVirusDetectResult() {
    const jobId = 'ssdb2dab23bcdb11ed9efb5254009411xx'; // 提交病毒检测任务后会返回当前任务的jobId
    const host = config.Bucket + '.ci.' + config.Region + '.myqcloud.com/virus/detect/' + jobId;
    const url = 'https://' + host;
    cos.request(
      {
        Method: 'GET',
        Key: 'virus/detect/' + jobId,
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

// 查询防盗链
export const describeRefer = {
  name: '查询防盗链',
  fn: function describeRefer() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?hotlink';
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

// 设置防盗链
export const setRefer = {
  name: '设置防盗链',
  fn: function setRefer() {
    const host = config.Bucket + '.pic.' + config.Region + '.myqcloud.com/?hotlink';
    const url = 'https://' + host;
    const body = COS.util.json2xml({
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
