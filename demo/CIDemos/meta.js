/**
 * 元数据demo集合
 */

// 从 Bucket 里拆出 AppId
const AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);

// 创建数据集
export const createDataset = {
  name: '创建数据集',
  fn: function createDataset() {
    const key = 'dataset/create'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。命名规则如下： - 长度为1~128字符 - 只能包含英文字母，数字，短划线（-）和下划线（） - 必须以英文字母和下划线（）开头;是否必传：是
      DatasetName: 'test-dataset-imagesearch2',
      // 数据集描述信息。长度为1~256个英文或中文字符，默认值为空。;是否必传：否
      Description: 'test-dataset-desc',
      // 指模板，在建立元数据索引时，后端将根据模板来决定收集哪些元数据。每个模板都包含一个或多个算子，不同的算子表示不同的元数据。目前支持的模板： Official:DefaultEmptyId：默认为空的模板，表示不进行元数据的采集。 Official:COSBasicMeta：基础信息模板，包含 COS 文件基础元信息算子，表示采集 COS 文件的名称、类型、ACL等基础元信息数据。 Official:FaceSearch：人脸检索模板，包含人脸检索、COS 文件基础元信息算子。Official:ImageSearch：图像检索模板，包含图像检索、COS 文件基础元信息算子。;是否必传：否
      TemplateId: 'Official:ImageSearch',
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 更新数据集
export const updateDataset = {
  name: '更新数据集',
  fn: function updateDataset() {
    const key = 'dataset/update'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-facesearch',
      // 数据集描述信息。长度为1~256个英文或中文字符，默认值为空。;是否必传：否
      Description: 'test-dataset-facesearch-desc',
      // 该参数表示模板，在建立元数据索引时，后端将根据模板来决定收集哪些元数据。每个模板都包含一个或多个算子，不同的算子表示不同的元数据。目前支持的模板： Official:Empty：默认为空的模板，表示不进行元数据的采集。 Official:COSBasicMeta：基础信息模板，包含COS文件基础元信息算子，表示采集cos文件的名称、类型、acl等基础元信息数据。;是否必传：否
      TemplateId: 'Official:FaceSearch',
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 删除数据集
export const deleteDataset = {
  name: '删除数据集',
  fn: function deleteDataset() {
    const key = 'dataset'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset',
    });

    cos.request(
      {
        Method: 'DELETE', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 列出数据集
export const describeDatasets = {
  name: '列出数据集',
  fn: function describeDatasets() {
    const key = 'datasets'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 本次返回数据集的最大个数，取值范围为0~200。不设置此参数或者设置为0时，则默认值为100。;是否必传：否
          maxresults: 100,
          // 翻页标记。当文件总数大于设置的MaxResults时，用于翻页的Token。从NextToken开始按字典序返回文件信息列表。填写上次查询返回的值，首次使用时填写为空。;是否必传：否
          // nexttoken: '',
          // 数据集名称前缀。;是否必传：否
          // prefix: 'test',
        },
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 查询数据集
export const describeDataset = {
  name: '查询数据集',
  fn: function describeDataset() {
    const key = 'dataset'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 数据集名称，同一个账户下唯一。;是否必传：是
          datasetname: 'test-dataset-base22',
          // 是否需要实时统计数据集中文件相关信息。有效值： false：不统计，返回的文件的总大小、数量信息可能不正确也可能都为0。 true：需要统计，返回数据集中当前的文件的总大小、数量信息。 默认值为false。;是否必传：否
          statistics: false,
        },
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err.code, err.message);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 绑定存储桶与数据集
export const createDatasetBinding = {
  name: '绑定存储桶与数据集',
  fn: function createDatasetBinding() {
    const key = 'datasetbinding/create'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-imagesearch2',
      // 资源标识字段，表示需要与数据集绑定的资源，当前仅支持COS存储桶，字段规则：cos://，其中BucketName表示COS存储桶名称，例如：cos://examplebucket-1250000000;是否必传：是
      URI: `cos://${config.Bucket}`,
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 解绑存储桶与数据集
export const deleteDatasetBinding = {
  name: '解绑存储桶与数据集',
  fn: function deleteDatasetBinding() {
    const key = 'datasetbinding'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-facesearch',
      // 资源标识字段，表示需要与数据集绑定的资源，当前仅支持COS存储桶，字段规则：cos://，其中BucketName表示COS存储桶名称，例如：cos://examplebucket-1250000000;是否必传：是
      URI: `cos://${config.Bucket}`,
    });

    cos.request(
      {
        Method: 'DELETE', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 查询数据集与存储桶的绑定关系
export const describeDatasetBinding = {
  name: '查询数据集与存储桶的绑定关系',
  fn: function describeDatasetBinding() {
    const key = 'datasetbinding'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 数据集名称，同一个账户下唯一。;是否必传：是
          datasetname: 'test-dataset-base',
          // 资源标识字段，表示需要与数据集绑定的资源，当前仅支持COS存储桶，字段规则：cos://，其中BucketName表示COS存储桶名称，例如（需要进行urlencode）：cos%3A%2F%2Fexample-125000;是否必传：是
          uri: `cos://${config.Bucket}`,
        },
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err.code, err.message);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 查询绑定关系列表
export const describeDatasetBindings = {
  name: '查询绑定关系列表',
  fn: function describeDatasetBindings() {
    const key = 'datasetbindings'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 数据集名称，同一个账户下唯一。;是否必传：否
          datasetname: 'test-dataset-base',
          // 返回绑定关系的最大个数，取值范围为0~200。不设置此参数或者设置为0时，则默认值为100。;是否必传：否
          maxresults: 100,
          // 当绑定关系总数大于设置的MaxResults时，用于翻页的token。从NextToken开始按字典序返回绑定关系信息列表。第一次调用此接口时，设置为空。;是否必传：是
          // nexttoken: '',
        },
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 创建元数据索引
export const createFileMetaIndex = {
  name: '创建元数据索引',
  fn: function createFileMetaIndex() {
    const key = 'filemeta/create'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-imagesearch2',
      // 元数据索引结果（以回调形式发送至您的回调地址，支持以 http:// 或者 https:// 开头的地址，例如： http://www.callback.com。;是否必传：否
      // Callback: 'http://www.callback.com',
      // 用于建立索引的文件信息。;是否必传：是
      File: {
        // 自定义ID。该文件索引到数据集后，作为该行元数据的属性存储，用于和您的业务系统进行关联、对应。您可以根据业务需求传入该值，例如将某个URI关联到您系统内的某个ID。推荐传入全局唯一的值。在查询时，该字段支持前缀查询和排序，详情请见字段和操作符的支持列表。   ;是否必传：否
        // CustomId: '001',
        // 自定义标签。您可以根据业务需要自定义添加标签键值对信息，用于在查询时可以据此为筛选项进行检索，详情请见字段和操作符的支持列表。  ;是否必传：否
        // CustomLabels: {"age":"18","level":"18"},
        // 可选项，文件媒体类型，枚举值： image：图片。  other：其他。 document：文档。 archive：压缩包。 video：视频。  audio：音频。  ;是否必传：否
        MediaType: 'image',
        // 可选项，文件内容类型（MIME Type），如image/jpeg。  ;是否必传：否
        ContentType: 'image/jpeg',
        // 资源标识字段，表示需要建立索引的文件地址，当前仅支持COS上的文件，字段规则：cos:///，其中BucketName表示COS存储桶名称，ObjectKey表示文件完整路径，例如：cos://examplebucket-1250000000/test1/img.jpg。 注意： 1、仅支持本账号内的COS文件 2、不支持HTTP开头的地址;是否必传：是
        URI: `cos://${config.Bucket}/ci/dog.jpeg`,
        // 输入图片中检索的人脸数量，默认值为20，最大值为20。(仅当数据集模板 ID 为 Official:FaceSearch 有效)。;是否必传：否
        // MaxFaceNum: 20,
        // 自定义人物属性(仅当数据集模板 ID 为 Official:FaceSearch 有效)。;是否必传：否
        // Persons: {
        // },
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 删除元数据索引
export const deleteFileMetaIndex = {
  name: '删除元数据索引',
  fn: function deleteFileMetaIndex() {
    const key = 'filemeta'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-base',
      // 资源标识字段，表示需要建立索引的文件地址。;是否必传：是
      URI: `cos://${config.Bucket}/1.png`,
    });

    cos.request(
      {
        Method: 'DELETE', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 查询元数据索引
export const describeFileMetaIndex = {
  name: '查询元数据索引',
  fn: function describeFileMetaIndex() {
    const key = 'filemeta'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;

    cos.request(
      {
        Method: 'GET', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Query: {
          // 数据集名称，同一个账户下唯一。;是否必传：是
          datasetname: 'test-dataset-base',
          // 资源标识字段，表示需要建立索引的文件地址，当前仅支持COS上的文件，字段规则：cos:///，其中BucketName表示COS存储桶名称，ObjectKey表示文件完整路径，例如：cos://examplebucket-1250000000/test1/img.jpg。 注意： 1、仅支持本账号内的COS文件 2、不支持HTTP开头的地址 3、需UrlEncode;是否必传：是
          uri: `cos://${config.Bucket}/1.png`,
        },
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err.message);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 更新元数据索引
export const updateFileMetaIndex = {
  name: '更新元数据索引',
  fn: function updateFileMetaIndex() {
    const key = 'filemeta/update'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-base',
      // 元数据索引结果（以回调形式发送至您的回调地址，支持以 http:// 或者 https:// 开头的地址，例如： http://www.callback.com;是否必传：是
      // Callback: 'http://www.callback.com',
      // 用于建立索引的文件信息。;是否必传：是
      File: {
        // 自定义ID。该文件索引到数据集后，作为该行元数据的属性存储，用于和您的业务系统进行关联、对应。您可以根据业务需求传入该值，例如将某个URI关联到您系统内的某个ID。推荐传入全局唯一的值。在查询时，该字段支持前缀查询和排序，详情请见字段和操作符的支持列表。   ;是否必传：否
        CustomId: '002',
        // 自定义标签。您可以根据业务需要自定义添加标签键值对信息，用于在查询时可以据此为筛选项进行检索，详情请见字段和操作符的支持列表。  ;是否必传：否
        // CustomLabels: { age: '18', level: '18' },
        // 可选项，文件媒体类型，枚举值： image：图片。  other：其他。 document：文档。 archive：压缩包。 video：视频。  audio：音频。  ;是否必传：否
        MediaType: 'image',
        // 可选项，文件内容类型（MIME Type），如image/jpeg。  ;是否必传：否
        ContentType: 'image/jpeg',
        // 资源标识字段，表示需要建立索引的文件地址，当前仅支持COS上的文件，字段规则：cos:///，其中BucketName表示COS存储桶名称，ObjectKey表示文件完整路径，例如：cos://examplebucket-1250000000/test1/img.jpg。 注意： 1、仅支持本账号内的COS文件 2、不支持HTTP开头的地址;是否必传：是
        URI: `cos://${config.Bucket}/1.png`,
        // 自定义人物属性(仅当数据集模板 ID 为 Official:FaceSearch 有效)。;是否必传：否
        // Persons: {},
      },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 简单查询
export const datasetSimpleQuery = {
  name: '简单查询',
  fn: function datasetSimpleQuery() {
    const key = 'datasetquery/simple'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-base',
      // 简单查询参数条件，可自嵌套。;是否必传：否
      // Query: {
      //   // 操作运算符。枚举值： not：逻辑非。 or：逻辑或。 and：逻辑与。 lt：小于。 lte：小于等于。 gt：大于。 gte：大于等于。 eq：等于。 exist：存在性查询。 prefix：前缀查询。 match-phrase：字符串匹配查询。 nested：字段为数组时，其中同一对象内逻辑条件查询。;是否必传：是
      //   Operation: 'and',
      //   // 子查询的结构体。 只有当Operations为逻辑运算符（and、or、not或nested）时，才能设置子查询条件。 在逻辑运算符为and/or/not时，其SubQueries内描述的所有条件需符合父级设置的and/or/not逻辑关系。 在逻辑运算符为nested时，其父级的Field必须为一个数组类的字段（如：Labels）。 子查询条件SubQueries组的Operation必须为and/or/not中的一个或多个，其Field必须为父级Field的子属性。;是否必传：否
      //   SubQueries: [{
      //     Operation: '',
      //     Field: '',
      //   }],
      //   Field: '',
      //   Value: '',
      // },
      // 返回文件元数据的最大个数，取值范围为0200。 使用聚合参数时，该值表示返回分组的最大个数，取值范围为02000。 不设置此参数或者设置为0时，则取默认值100。;是否必传：否
      MaxResults: 100,
      // 排序字段列表。请参考字段和操作符的支持列表。 多个排序字段可使用半角逗号（,）分隔，例如：Size,Filename。 最多可设置5个排序字段。 排序字段顺序即为排序优先级顺序。;是否必传：是
      Sort: 'CustomId',
      // 排序字段的排序方式。取值如下： asc：升序； desc（默认）：降序。 多个排序方式可使用半角逗号（,）分隔，例如：asc,desc。 排序方式不可多于排序字段，即参数Order的元素数量需小于等于参数Sort的元素数量。例如Sort取值为Size,Filename时，Order可取值为asc,desc或asc。 排序方式少于排序字段时，未排序的字段默认取值asc。例如Sort取值为Size,Filename，Order取值为asc时，Filename默认排序方式为asc，即升序排列;是否必传：是
      Order: 'desc',
      // 聚合字段信息列表。 当您使用聚合查询时，仅返回聚合结果，不再返回匹配到的元信息列表。;是否必传：否
      // Aggregations: {
      // Operation: '',
      // Field: ''
      // },
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },
      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 人脸搜索
export const datasetFaceSearch = {
  name: '人脸搜索',
  fn: function datasetFaceSearch() {
    const key = 'datasetquery/facesearch'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-facesearch2',
      // 资源标识字段，表示需要建立索引的文件地址。;是否必传：是
      URI: `cos://${config.Bucket}/ci/1.jpg`,
      // 输入图片中检索的人脸数量，默认值为1(传0或不传采用默认值)，最大值为10。;是否必传：否
      MaxFaceNum: 1,
      // 检索的每张人脸返回相关人脸数量，默认值为10，最大值为100。;是否必传：否
      Limit: 10,
      // 出参 Score 中，只有超过 MatchThreshold 值的结果才会返回。范围：1-100，默认值为0，推荐值为80。;是否必传：否
      MatchThreshold: 10,
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },

      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};

// 图像检索
export const searchImage = {
  name: '图像检索',
  fn: function searchImage() {
    const key = 'datasetquery/imagesearch'; // 固定值
    const host = `${AppId}.ci.${config.Region}.myqcloud.com`;
    const url = `https://${host}/${key}`;
    const body = JSON.stringify({
      // 数据集名称，同一个账户下唯一。;是否必传：是
      DatasetName: 'test-dataset-imagesearch2',
      // 指定检索方式为图片或文本，pic 为图片检索，text 为文本检索，默认为 pic。;是否必传：否
      Mode: 'pic',
      // 资源标识字段，表示需要建立索引的文件地址(Mode 为 pic 时必选)。;是否必传：否
      URI: `cos://${config.Bucket}/ci/dog.jpeg`,
      // 返回相关图片的数量，默认值为10，最大值为100。;是否必传：否
      Limit: 10,
      // 出参 Score（相关图片匹配得分） 中，只有超过 MatchThreshold 值的结果才会返回。默认值为0，推荐值为80。;是否必传：否
      MatchThreshold: 1,
    });

    cos.request(
      {
        Method: 'POST', // 固定值，必须
        Key: key, // 必须
        Url: url, // 请求的url，必须
        Body: body, // 请求体参数，必须
        RawBody: true, // 设置返回原始响应体，sdk 内部不做解析，固定值，必须
        Headers: {
          // 设置请求体为 json，固定值，必须
          'Content-Type': 'application/json',
          // 设置响应体为json，固定值，必须
          Accept: 'application/json',
        },
      },

      function (err, data) {
        if (err) {
          // 处理请求失败
          console.log(err);
        } else {
          // 处理请求成功
          console.log(data.Body && JSON.parse(data.Body));
        }
      }
    );
  },
};
