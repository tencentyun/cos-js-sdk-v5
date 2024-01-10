import COS from 'cos-js-sdk-v5';

// 初始化可参考 https://cloud.tencent.com/document/product/436/11459#.E5.BC.80.E5.A7.8B.E4.BD.BF.E7.94.A8
const cos = new COS({
  SecretId: '',
  SecretKey: '',
});

let selectedFile = null;

const handleFileChange = (event) => {
  selectedFile = event.target.files[0];
};

const handleUpload = () => {
  if (selectedFile) {
    console.log('上传文件:', selectedFile);
    cos.uploadFile({
      Bucket: 'examplebucket-1250000000', /* 填入您自己的存储桶，必须字段 */
      Region: 'COS_REGION',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key: selectedFile.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body: selectedFile, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
      SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
      onProgress: function (progressData) {           /* 非必须 */
        console.log(JSON.stringify(progressData));
      },
    }, function (err, data) {
      console.log(err || data);
    });

  } else {
    console.log('请选择一个文件');
  }
};

export default () => <div>
  <input type="file" onChange={handleFileChange} />
  <button onClick={handleUpload}>上传</button>
</div>
