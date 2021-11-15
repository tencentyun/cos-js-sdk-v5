var util = require('./util');

/**
 * 查询已经开通数据万象功能的存储桶
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                                  Bucket名称，必须，格式：test-1250000000
 *     @param  {String}  params.Region                                  地域名称，必须
 *     @param  {String}  params.PageNumber                              第几页，非必须
 *     @param  {String}  params.PageSize                                每页个数，非必须
 *     @param  {String}  params.Regions                                 地域信息，例如'ap-shanghai,ap-beijing'，非必须
 *     @param  {String}  params.BucketNames                             存储桶名称，以“,”分隔，支持多个存储桶，精确搜索，非必须
 *     @param  {String}  params.BucketName                              存储桶名称前缀，前缀搜索，非必须
 * @param  {Function}  callback                                      回调函数，必须
 *     @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                                          为对应的 object 数据
 */
 function describeMediaBuckets(params, callback) {
    var host = 'ci.' + params.Region + '.myqcloud.com';
    var url = 'https://' + host + '/mediabucket';
    var query = {
        pageNumber: params.PageNumber,
        pageSize: params.PageSize,
        regions: params.Regions,
        bucketNames: params.BucketNames,
        bucketName: params.BucketName,
    };
    this.request({
        Bucket: params.Bucket,
        Region: params.Region,
        Method: 'GET',
        Key: 'mediabucket',
        Url: url,
        Query: query
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
    });
}

/**
 * 获取媒体文件信息
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须，格式：test-1250000000
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 文件名称，必须
 * @param  {Function}  callback                                     回调函数，必须
 *     @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                                          为对应的 object 数据
 */
 function getMediaInfo(params, callback) {
    this.request({
        Bucket: params.Bucket,
        Region: params.Region,
        Method: 'GET',
        Key: params.Key,
        Query: {
            'ci-process': 'videoinfo'
        }
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
    });
}

/**
 * 获取媒体文件某个时间的截图
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须，格式：test-1250000000
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 文件名称，必须
 *     @param  {Number}  params.Time                                截图的时间点，单位为秒，必须
 *     @param  {Number}  params.Width                               截图的宽，非必须
 *     @param  {Number}  params.Height                              截图的高，非必须
 *     @param  {String}  params.Format                              截图的格式，支持 jpg 和 png，默认 jpg，非必须
 *     @param  {String}  params.Rotate                              图片旋转方式，非必须
 *     @param  {String}  params.Mode                                截帧方式，非必须
 * @param  {Function}  callback                                     回调函数，必须
 *     @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                                          为对应的 object 数据
 */
 function getSnapshot(params, callback) {
    var query = {
        'ci-process': 'snapshot',
        time: params.Time || 1,
        width: params.Width || 0,
        height: params.Height || 0,
        format: params.Format || 'jpg',
        rotate: params.Rotate || 'auto',
        mode: params.Mode || 'exactframe',
    };
    this.request({
        Bucket: params.Bucket,
        Region: params.Region,
        Method: 'GET',
        Key: params.Key,
        Query: query,
        RawBody: true,
  }, function (err, data) {
      if (err) return callback(err);
      callback(null, data);
  });
}

var API_MAP = {
    describeMediaBuckets: describeMediaBuckets,
    getMediaInfo: getMediaInfo,
    getSnapshot: getSnapshot,
};

module.exports.init = function (COS) {
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
    });
};