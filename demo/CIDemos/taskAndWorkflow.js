/**
 * 任务和工作流demo集合
*/

// 获取任务列表
export const getJobList = {
  name: '获取任务列表',
  fn: function getJobList() {
    const key = 'jobs'; // 固定值，必须
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request({
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
    }, function (err, data) {
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    });
  }
};


// 查看指定任务
export const getJobDetail = {
  name: '查看指定任务',
  fn: function getJobDetail() {
    const jobId = 'jec8ae8943c2511ee9d4a9b3cb7a5c6xx'; // jobId: 需要查询的jobId;
    const key = `jobs/${jobId}`; // jobId: 需要查询的jobId;
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request({
      Method: 'GET', // 固定值，必须
      Key: key, // 必须
      Url: url, // 请求的url，必须
    }, function (err, data) {
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    });
  }
};

// 查询工作流
export const getWorkflow = {
  name: '查询工作流',
  fn: function getWorkflow() {
    const key = `workflow`; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request({
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
    }, function (err, data) {
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    });
  }
};

// 获取工作流实例详情
export const getWorkflowexecution = {
  name: '获取工作流实例详情',
  fn: function getWorkflowexecution() {
    const runId = 'ic7af1bf53c2911ee9988525400ae68xx';
    const key = `workflowexecution/${runId}`; // RunId:7;
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request({
      Method: 'GET', // 固定值，必须
      Key: key, // 必须
      Url: url, // 请求的url，必须
    }, function (err, data) {
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    });
  }
};

// 测试工作流
export const triggerworkflow = {
  name: '测试工作流',
  fn: function triggerworkflow() {
    const key = `triggerworkflow`; //
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request({
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
    }, function (err, data) {
      if (err) {
        // 处理请求失败
        console.log(err);
      } else {
        // 处理请求成功
        console.log(data.Response);
      }
    });
  }
};


