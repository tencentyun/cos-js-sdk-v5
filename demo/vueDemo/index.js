window.onload = function() {
  const Bucket = 'examplebucket-1250000000';  /* 存储桶 */
  const Region = 'ap-beijing';  /* 存储桶所在地域，必须字段 */
  // SecretId 和 SecretKey请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
  const cos = new COS({
    SecretId: '',
    SecretKey: '',
  });

  /*
    实现了以下功能
    - 文件列表
    - 上传文件
    - 上传文件夹
    - 下载文件
    - 删除文件
  */
  const vm = new Vue({
    el: '#app',
    data() {
      return {
        columns: [
          { label: '名称', value: 'Key' },
          { label: '大小', value: 'Size' },
          { label: '修改时间', value: 'LastModified' },
          { label: '操作', value: 'action' }
        ],
        list: [],
        Prefix: '',
        Marker: '',
        hasMore: false,
      }
    },
    computed: {
      // 面包屑导航条
      navList() {
        const prefixes = this.Prefix.split('/').filter(Boolean);
        const folders = prefixes.map((item, index) => {
          return {
            name: item,
            Prefix: prefixes.slice(0, index + 1).join('/') + '/',
          };
        });
        return [{ name: Bucket, Prefix: ''}].concat(folders);
      },
    },
    created() {
      this.getFileList();
    },
    methods: {
      // 查询文件列表
      getFileList(loadMore) {
        const { Prefix, Marker } = this;
        cos.getBucket({
          Bucket, /* 必须 */
          Region,     /* 存储桶所在地域，必须字段 */
          Prefix,              /* 非必须 */
          Marker,       /* 非必须 */
          Delimiter: '/',            /* 非必须 */
       }, (err, data) => {
          if(err) {
            console.log(err);
            return;
          }
          const folder = data.CommonPrefixes.map((item) => {
            return {
              Prefix: item.Prefix,
              name: item.Prefix.replace(Prefix, '').slice(0,-1),
              isDir: true,
            }
          });
          const files = data.Contents.filter((item) => !item.Key.endsWith('/'))
                        .map((item) => {
                          return {
                            ...item,
                            name: item.Key.replace(Prefix, ''),
                          }
                        });
          const list = folder.concat(files);
          this.hasMore = data.IsTruncated;
          this.Marker = data.NextMarker || '';
          if (loadMore) {
            this.list = [...this.list, ...list];
          } else {
            this.list = list;
          }
       });
      },
      // 点击面包屑
      navClick(item) {
        this.openFolder(item.Prefix);
      },
      // 打开文件夹
      openFolder(prefix) {
        this.Prefix = prefix;
        this.hasMore = false;
        this.Marker = '';
        this.getFileList();
      },
      // 上传文件
      uploadFileClick() {
        document.querySelectorAll('.file-select')[0].click();
      },
      // 上传文件夹
      uploadFolderClick() {
        document.querySelectorAll('.folder-select')[0].click();
      },
      // 上传
      uploadChange(events) {
        const files = events.currentTarget.files;
        const uploadFileList = [...files].map((file) => {
          const path = file.webkitRelativePath || file.name;
          return {
            Bucket,
            Region,
            Key: this.Prefix + path,
            Body: file,
          }
        });
        cos.uploadFiles({
          files: uploadFileList,
          SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */
          onProgress: function (info) {
              var percent = parseInt(info.percent * 10000) / 100;
              var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
              console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
          },
          onFileFinish: function (err, data, options) {
              console.log(options.Key + '上传' + (err ? '失败' : '完成'));
          },
       }, (err, data) => {
          if (err) {
            console.log('上传失败', err);
            return;
          }
          // 刷新列表前初始化
          this.hasMore = false;
          this.Marker = '';
          this.getFileList();
       });
      },
      // 加载更多
      loadMore() {
        this.getFileList(true);
      },
      // 下载
      downloadFile(file) {
        cos.getObjectUrl({
          Bucket, /* 必须 */
          Region,     /* 存储桶所在地域，必须字段 */
          Key: file.Key,              /* 必须 */
        }, function(err, data) {
          if (err) {
            console.log(err);
            return;
          }
          const url = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment'; // 补充强制下载的参数
          // 使用iframe下载
          const elemIF = document.createElement("iframe");
          elemIF.src = url;
          elemIF.style.display = "none";
          document.body.appendChild(elemIF);
        });
      },
      // 删除
      deleteFile(file) {
        cos.deleteObject({
          Bucket, /* 必须 */
          Region,     /* 存储桶所在地域，必须字段 */
          Key: file.Key        /* 必须 */
       }, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          // 刷新列表前初始化
          this.hasMore = false;
          this.Marker = '';
          this.getFileList();
       });
      },
    },
  });
}

