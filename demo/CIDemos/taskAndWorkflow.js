/**
 * 任务和工作流demo集合
 */

// 获取任务列表
export const DescribeFileProcessJobs = {
  name: '获取任务列表',
  fn: function DescribeFileProcessJobs() {
    const key = 'jobs'; // 固定值，必须
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
      }
    );
  },
};

// 查看指定任务
export const getJobDetail = {
  name: '查看指定任务',
  fn: function getJobDetail() {
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
      }
    );
  },
};

// 查询工作流
export const DescribeWorkflow = {
  name: '查询工作流',
  fn: function DescribeWorkflow() {
    const key = 'workflow'; // 固定值
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
      }
    );
  },
};

// 新增工作流
export const CreateWorkflow = {
  name: '新增工作流',
  fn: function CreateWorkflow() {
    const key = 'workflow'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    // 替换为自己的模板id
    const snapshotTemplate = 'xxx'; // 音视频截帧模板
    const transcodeTemplate = 'xxx'; // 视频转码模板
    const animationTemplate = 'xxx'; // 视频转动图模板
    const concatTemplate = 'xxx'; // 音视频拼接模板
    const voiceSeparateTemplate = 'xxx'; // 人声分离模板
    const videoMontageTemplate = 'xxx'; // 精彩集锦模板
    const watermarkTemplate = 'xxx'; // 视频水印模板
    const videoProcessTemplate = 'xxx'; // 视频增强模板
    const superResolutionTemplate = 'xxx'; // 超分辨率模板
    const body = COS.util.json2xml({
      Request: {
        MediaWorkflow: {
          Name: 'my_workflow',
          State: 'Active', // 创建并开启工作流
          Topology: {
            Dependencies: {
              Start:
                'Snapshot_1581665960536,Transcode_1581665960537,Animation_1581665960538,Concat_1581665960539,VoiceSeparate_1581665960551,VideoMontage_1581665960551,SDRtoHDR_1581665960553,VideoProcess_1581665960554,SuperResolution_1581665960583,Segment_1581665960667',
              Snapshot_1581665960536: 'End',
              Transcode_1581665960537: 'End',
              Animation_1581665960538: 'End',
              Concat_1581665960539: 'End',
              VideoMontage_1581665960551: 'End',
              SDRtoHDR_1581665960553: 'End',
              VideoProcess_1581665960554: 'End',
              SuperResolution_1581665960583: 'End',
              Segment_1581665960667: 'End',
              VoiceSeparate_1581665960551: 'End',
            },
            Nodes: {
              Start: {
                Type: 'Start',
                Input: {
                  ObjectPrefix: 'test-',
                  NotifyConfig: {
                    Type: 'Url',
                    Url: 'http://www.callback.com',
                    Event: 'TaskFinish,WorkflowFinish',
                  },
                  ExtFilter: {
                    State: 'On',
                    Audio: 'true',
                    Custom: 'true',
                    CustomExts: 'mp4/mp3',
                    AllFile: 'false',
                  },
                },
              },
              Snapshot_1581665960536: {
                Type: 'Snapshot',
                Operation: {
                  TemplateId: snapshotTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/snapshot-${number}.${Ext}',
                    SpriteObject: 'worlflow-test/${RunId}/snapshot-sprite-${number}.jpg',
                  },
                },
              },
              Transcode_1581665960537: {
                Type: 'Transcode',
                Operation: {
                  TemplateId: transcodeTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/trans.mp4',
                  },
                },
              },
              Animation_1581665960538: {
                Type: 'Animation',
                Operation: {
                  TemplateId: animationTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/bcd.gif',
                  },
                },
              },
              Concat_1581665960539: {
                Type: 'Concat',
                Operation: {
                  TemplateId: concatTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/abc.${ext}',
                  },
                },
              },
              VoiceSeparate_1581665960551: {
                Type: 'VoiceSeparate',
                Operation: {
                  TemplateId: voiceSeparateTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/background.mp3',
                    AuObject: 'worlflow-test/${RunId}/audio.mp3',
                  },
                },
              },
              VideoMontage_1581665960551: {
                Type: 'VideoMontage',
                Operation: {
                  TemplateId: videoMontageTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/montage.mp4',
                  },
                },
              },
              SDRtoHDR_1581665960553: {
                Type: 'SDRtoHDR',
                Operation: {
                  SDRtoHDR: {
                    HdrMode: 'HLG',
                  },
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/SDRtoHDR.mp4',
                  },
                },
              },
              VideoProcess_1581665960554: {
                Type: 'VideoProcess',
                Operation: {
                  TemplateId: videoProcessTemplate,
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/videoProcess.mp4',
                  },
                },
              },
              SuperResolution_1581665960583: {
                Type: 'SuperResolution',
                Operation: {
                  TemplateId: superResolutionTemplate,
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/SuperResolution.mkv',
                  },
                },
              },
              Segment_1581665960667: {
                Type: 'Segment',
                Operation: {
                  Segment: {
                    Format: 'mp4',
                    Duration: '5',
                  },
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/segment-trans${Number}',
                  },
                },
              },
            },
          },
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

// 更新工作流
export const UpdateWorkflow = {
  name: '更新工作流',
  fn: function UpdateWorkflow() {
    const workflowId = 'xxx'; // 要更新的工作流id
    const key = `workflow/${workflowId}`; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    // 替换为自己的模板id
    const snapshotTemplate = 'xxx'; // 音视频截帧模板
    const transcodeTemplate = 'xxx'; // 视频转码模板
    const animationTemplate = 'xxx'; // 视频转动图模板
    const concatTemplate = 'xxx'; // 音视频拼接模板
    const voiceSeparateTemplate = 'xxx'; // 人声分离模板
    const videoMontageTemplate = 'xxx'; // 精彩集锦模板
    const watermarkTemplate = 'xxx'; // 视频水印模板
    const videoProcessTemplate = 'xxx'; // 视频增强模板
    const superResolutionTemplate = 'xxx'; // 超分辨率模板
    const body = COS.util.json2xml({
      Request: {
        MediaWorkflow: {
          Name: 'my_workflow3333',
          State: 'Active', // 创建并开启工作流
          Topology: {
            Dependencies: {
              Start:
                'Snapshot_1581665960536,Transcode_1581665960537,Animation_1581665960538,Concat_1581665960539,VoiceSeparate_1581665960551,VideoMontage_1581665960551,SDRtoHDR_1581665960553,VideoProcess_1581665960554,SuperResolution_1581665960583,Segment_1581665960667',
              Snapshot_1581665960536: 'End',
              Transcode_1581665960537: 'End',
              Animation_1581665960538: 'End',
              Concat_1581665960539: 'End',
              VideoMontage_1581665960551: 'End',
              SDRtoHDR_1581665960553: 'End',
              VideoProcess_1581665960554: 'End',
              SuperResolution_1581665960583: 'End',
              Segment_1581665960667: 'End',
              VoiceSeparate_1581665960551: 'End',
            },
            Nodes: {
              Start: {
                Type: 'Start',
                Input: {
                  ObjectPrefix: 'test-',
                  NotifyConfig: {
                    Type: 'Url',
                    Url: 'http://www.callback.com',
                    Event: 'TaskFinish,WorkflowFinish',
                  },
                  ExtFilter: {
                    State: 'On',
                    Audio: 'true',
                    Custom: 'true',
                    CustomExts: 'mp4/mp3',
                    AllFile: 'false',
                  },
                },
              },
              Snapshot_1581665960536: {
                Type: 'Snapshot',
                Operation: {
                  TemplateId: snapshotTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/snapshot-${number}.${Ext}',
                    SpriteObject: 'worlflow-test/${RunId}/snapshot-sprite-${number}.jpg',
                  },
                },
              },
              Transcode_1581665960537: {
                Type: 'Transcode',
                Operation: {
                  TemplateId: transcodeTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/trans.mp4',
                  },
                },
              },
              Animation_1581665960538: {
                Type: 'Animation',
                Operation: {
                  TemplateId: animationTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/bcd.gif',
                  },
                },
              },
              Concat_1581665960539: {
                Type: 'Concat',
                Operation: {
                  TemplateId: concatTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/abc.${ext}',
                  },
                },
              },
              VoiceSeparate_1581665960551: {
                Type: 'VoiceSeparate',
                Operation: {
                  TemplateId: voiceSeparateTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/background.mp3',
                    AuObject: 'worlflow-test/${RunId}/audio.mp3',
                  },
                },
              },
              VideoMontage_1581665960551: {
                Type: 'VideoMontage',
                Operation: {
                  TemplateId: videoMontageTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/montage.mp4',
                  },
                },
              },
              SDRtoHDR_1581665960553: {
                Type: 'SDRtoHDR',
                Operation: {
                  SDRtoHDR: {
                    HdrMode: 'HLG',
                  },
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/SDRtoHDR.mp4',
                  },
                },
              },
              VideoProcess_1581665960554: {
                Type: 'VideoProcess',
                Operation: {
                  TemplateId: videoProcessTemplate,
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/videoProcess.mp4',
                  },
                },
              },
              SuperResolution_1581665960583: {
                Type: 'SuperResolution',
                Operation: {
                  TemplateId: superResolutionTemplate,
                  TranscodeTemplateId: transcodeTemplate,
                  WatermarkTemplateId: watermarkTemplate,
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/SuperResolution.mkv',
                  },
                },
              },
              Segment_1581665960667: {
                Type: 'Segment',
                Operation: {
                  Segment: {
                    Format: 'mp4',
                    Duration: '5',
                  },
                  Output: {
                    Region: config.Region,
                    Bucket: config.Bucket,
                    Object: 'worlflow-test/${RunId}/segment-trans${Number}',
                  },
                },
              },
            },
          },
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

// 删除工作流
export const DeleteWorkflow = {
  name: '删除工作流',
  fn: function DeleteWorkflow() {
    const workflowId = 'xxx'; // 要删除的工作流id
    const key = `workflow/${workflowId}`; // 固定格式
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

// 工作流实例列表
export const DescribeWorkflowExecutions = {
  name: '工作流实例列表',
  fn: function DescribeWorkflowExecutions() {
    const key = 'workflowexecution'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          workflowId: 'xxx', // 工作流 ID，非必须
          // name: '', // 文件名称，非必须
          // orderByTime: 'Desc', // Desc 或者 Asc。默认为 Desc，非必须
          // size: '10', // 拉取的最大任务数。默认为10。最大为100，非必须
          // states: 'All', // 工作流实例状态，以,分割支持多状态，非必须
          // startCreationTime: '', // 拉取创建时间大于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // endCreationTime: '', // 拉取创建时间小于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // nextToken: '', // 请求的上下文，用于翻页。下一页输入 token，非必须
          // jobId: '' // 批量触发工作流任务 ID，用于扫描出批量触发任务 ID 对应执行的工作流实例，非必须
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

// 获取工作流实例详情
export const DescribeWorkflowExecution = {
  name: '获取工作流实例详情',
  fn: function DescribeWorkflowExecution() {
    const runId = 'xxx'; // 要查询的工作流实例 ID
    const key = `workflowexecution/${runId}`; // 固定格式
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
      }
    );
  },
};

// 手动触发工作流
export const TriggerWorkflow = {
  name: '手动触发工作流',
  fn: function TriggerWorkflow() {
    const key = 'triggerworkflow'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 需要触发的工作流 ID;是否必传：是
          workflowId: 'xxxx',
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
      }
    );
  },
};

// 取消任务
export const CancelMediaJob = {
  name: '取消任务',
  fn: function CancelMediaJob() {
    const jobId = 'xxxx'; // 要取消的任务id
    const key = `jobs/${jobId}`; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'PUT', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Action: 'cancel', // 固定值
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

// 任务列表
export const DescribeMediaJobs = {
  name: '任务列表',
  fn: function DescribeMediaJobs() {
    const key = 'jobs'; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          tag: 'Animation', // 任务的 Tag，这里以视频转动图任务Animation为例，必须
          // workflowId: '', // 触发该任务的工作流ID，非必须
          // inventoryTriggerJobId: '', // 触发该任务的存量触发任务 ID，非必须
          // inputObject: '', // 该任务的输入文件名，暂仅支持精确匹配，非必须
          // orderByTime: 'Desc', // Desc 或者 Asc。默认为 Desc，非必须
          // size: '10', // 拉取的最大任务数。默认为10。最大为100，非必须
          // states: 'All', // 工作流实例状态，以,分割支持多状态，非必须
          // startCreationTime: '', // 拉取创建时间大于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // endCreationTime: '', // 拉取创建时间小于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // nextToken: '', // 请求的上下文，用于翻页。下一页输入 token，非必须
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

// 查询模板列表
export const DescribeMediaTemplates = {
  name: '查询模板列表',
  fn: function DescribeMediaTemplates() {
    const key = 'template'; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          tag: 'All', // 模板类型，默认值: All
          // category: '', // Official(系统预设模板)，Custom(自定义模板)，默认值: Custom，非必须
          // ids: '', // 模板 ID，以,符号分割字符串，非必须
          // name: '', // 模板名称前缀，非必须
          // pageNumber: '1', // 第几页，默认值:1，非必须
          // pageSize: '10', // 每页个数，默认值:10，非必须
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

// 创建模板
export const CreateMediaTemplate = {
  name: '创建模板',
  fn: function CreateMediaTemplate() {
    const key = 'template'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：按照不同需求传递，这里以创建视频检测模板VideoTargetRec为例;是否必传：是
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

// 更新模版
export const UpdateMediaTemplate = {
  name: '更新模版',
  fn: function UpdateMediaTemplate() {
    const templateId = 'xxxxxxx'; // 要更新的模板id
    const key = `template/${templateId}`; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        // 模板类型：按照不同需求传递，这里以创建视频检测模板VideoTargetRec为例;是否必传：是
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

// 删除模板
export const DeleteMediaTemplate = {
  name: '删除模板',
  fn: function DeleteMediaTemplate() {
    const templateId = 'xxxx'; // 要删除的模板id
    const key = `template/${templateId}`; // 固定格式
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

// 创建批量任务
export const CreateInventoryTriggerJob = {
  name: '创建批量任务',
  fn: function CreateInventoryTriggerJob() {
    const key = 'inventorytriggerjob'; // 固定值
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = COS.util.json2xml({
      Request: {
        Name: 'demo', // 批量触发任务名称，支持中文、英文、数字、—和_，长度限制128字符
        Type: 'Workflow', // 批量处理任务类型: Workflow，也支持设置为Job
        Input: {
          Prefix: 'inputtest', // Object 前缀
        },
        Operation: {
          TimeInterval: {
            Start: '2022-02-01T12:00:00+0800', // 扫描对象的上传时间，非必须
            End: '2022-05-01T12:00:00+0800', // 扫描对象的上传时间，非必须
          },
          WorkflowIds: 'xxxx', // 触发的工作流 ID，必须
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

// 取消批量任务
export const CancelInventoryTriggerJob = {
  name: '取消批量任务',
  fn: function CancelInventoryTriggerJob() {
    const jobId = 'xxx'; // 要取消的批量任务id
    const key = `inventorytriggerjob/${jobId}`; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'PUT', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Action: 'cancel', // 固定值，必须
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

// 查询单个批量任务
export const DescribeInventoryTriggerJob = {
  name: '查询单个批量任务',
  fn: function DescribeInventoryTriggerJob() {
    const jobId = 'xxx'; // 要查询的批量任务id
    const key = `inventorytriggerjob/${jobId}`; // 固定格式
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
      }
    );
  },
};

// 批量任务列表
export const DescribeInventoryTriggerJobs = {
  name: '批量任务列表',
  fn: function DescribeInventoryTriggerJobs() {
    const key = 'inventorytriggerjob'; // 固定格式
    const host = `${config.Bucket}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // nextToken: '', // 请求的上下文，用于翻页。下一页输入 token，非必须
          // size: '10', // 拉取的最大任务数。默认为10。最大为100，非必须
          // type: 'Workflow', // 拉取批量任务类型，工作流类型 Workflow 、任务类型 Job，非必须
          // orderByTime: 'Desc', // Desc 或者 Asc。默认为 Desc，非必须
          // states: 'All', // 工作流实例状态，以,分割支持多状态，非必须
          // startCreationTime: '', // 拉取创建时间大于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // endCreationTime: '', // 拉取创建时间小于等于该时间。格式为：%Y-%m-%dT%H:%m:%S%z，非必须
          // workflowId: '', // 工作流 ID，非必须
          // jobId: '', // 批量触发任务 ID，非必须
          // name: '', // 批量触发任务名称
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
