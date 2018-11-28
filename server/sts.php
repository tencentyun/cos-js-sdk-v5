<?php
// 临时密钥计算样例

// 配置参数
$config = array(
    'Url' => 'https://sts.api.qcloud.com/v2/index.php',
    'Domain' => 'sts.api.qcloud.com',
    'Proxy' => '',
    'SecretId' => 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 固定密钥
    'SecretKey' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 固定密钥
    'Bucket' => 'test-1250000000',
    'Region' => 'ap-guangzhou',
    'AllowPrefix' => '_ALLOW_DIR_/*', // 必填，这里改成允许的路径前缀，这里可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 a/* 或者 a.jpg
);

function _hex2bin($data) {
    $len = strlen($data);
    return pack("H" . $len, $data);
}

// obj 转 query string
function json2str($obj, $notEncode = false) {
    ksort($obj);
    $arr = array();
    foreach ($obj as $key => $val) {
        array_push($arr, $key . '=' . ($notEncode ? $val : rawurlencode($val)));
    }
    return join('&', $arr);
}

// 计算临时密钥用的签名
function getSignature($opt, $key, $method) {
    global $config;
    $formatString = $method . $config['Domain'] . '/v2/index.php?' . json2str($opt, 1);
    $sign = hash_hmac('sha1', $formatString, $key);
    $sign = base64_encode(_hex2bin($sign));
    return $sign;
}

// 获取临时密钥
function getTempKeys() {

    global $config;

    // 判断是否修改了 AllowPrefix
    if ($config['AllowPrefix'] === '_ALLOW_DIR_/*') {
        return array('error'=> '请修改 AllowPrefix 配置项，指定允许上传的路径前缀');
    }

    $ShortBucketName = substr($config['Bucket'],0, strripos($config['Bucket'], '-'));
    $AppId = substr($config['Bucket'], 1 + strripos($config['Bucket'], '-'));
    $policy = array(
        'version'=> '2.0',
        'statement'=> array(
            array(
                'action'=> array(
                    // // 所有操作
                    // 'name/cos:*',

                    // // 列出 Bucket 列表
                    // 'name/cos:GetService',
                    // // Bucket ACL 读写
                    // 'name/cos:GetBucketACL',
                    // 'name/cos:PutBucketACL',
                    // // Object ACL 读写
                    // 'name/cos:GetObjectACL',
                    // 'name/cos:PutObjectACL',
                    // // Policy 权限策略
                    // 'name/cos:PutBucket',
                    // 'name/cos:HeadBucket',
                    // 'name/cos:GetBucket',
                    // 'name/cos:GetBucketObjectVersions',
                    // 'name/cos:DeleteBucket',
                    // 'name/cos:GetBucketLocation',
                    // // Policy 权限策略
                    // 'name/cos:GetBucketPolicy',
                    // 'name/cos:PutBucketPolicy',
                    // 'name/cos:DeleteBucketPolicy',
                    // // Versioning 多版本配置
                    // 'name/cos:PutBucketVersioning',
                    // 'name/cos:GetBucketVersioning',
                    // // CORS 跨域配置
                    // 'name/cos:PutBucketCORS',
                    // 'name/cos:GetBucketCORS',
                    // 'name/cos:DeleteBucketCORS',
                    // // Lifecycle 生命周期
                    // 'name/cos:PutBucketLifecycle',
                    // 'name/cos:GetBucketLifecycle',
                    // 'name/cos:DeleteBucketLifecycle',
                    // // Replication 跨区域复制
                    // 'name/cos:PutBucketReplication',
                    // 'name/cos:GetBucketReplication',
                    // 'name/cos:DeleteBucketReplication',
                    // // Tagging 标签
                    // 'name/cos:PutBucketTagging',
                    // 'name/cos:GetBucketTagging',
                    // 'name/cos:DeleteBucketTagging',
                    // // Referer 防盗链
                    // 'name/cos:GetBucketReferer',
                    // 'name/cos:PutBucketReferer',
                    // 'name/cos:DeleteBucketReferer',
                    // // Origin 源站设置
                    // 'name/cos:GetBucketOrigin',
                    // 'name/cos:PutBucketOrigin',
                    // 'name/cos:DeleteBucketOrigin',
                    // // Website 静态网站
                    // 'name/cos:GetBucketWebsite',
                    // 'name/cos:DeleteBucketWebsite',
                    // 'name/cos:PutBucketWebsite',
                    // // Logging 日志记录
                    // 'name/cos:GetBucketLogging',
                    // 'name/cos:PutBucketLogging',
                    // // Logging 日志记录
                    // 'name/cos:GetBucketNotification',
                    // 'name/cos:PutBucketNotification',
                    // // 删除文件
                    // 'name/cos:DeleteMultipleObjects',
                    // 'name/cos:DeleteObject',
                    // 'name/cos:AbortMultipartUpload',
                    // // 复制文件或分片
                    // 'name/cos:PutObjectCopy',
                    // 'name/cos:UploadPartCopy',
                    // // 取回归档
                    // 'name/cos:PostObjectRestore',
                    // // 读取文件
                    // 'name/cos:HeadObject',
                    // 'name/cos:GetObject',
                    // 'name/cos:OptionsObject',
                    // // 上传操作
                    // 'name/cos:PostObject',
                    // 'name/cos:AppendObject',
                    // 简单上传
                    'name/cos:PutObject',
                    // 分片上传操作
                    'name/cos:InitiateMultipartUpload',
                    'name/cos:ListMultipartUploads',
                    'name/cos:ListParts',
                    'name/cos:UploadPart',
                    'name/cos:CompleteMultipartUpload',
                ),
                'effect'=> 'allow',
                'principal'=> array('qcs'=> array('*')),
                'resource'=> array(
                    'qcs::cos:' . $config['Region'] . ':uid/' . $AppId . ':prefix//' . $AppId . '/' . $ShortBucketName . '/',
                    'qcs::cos:' . $config['Region'] . ':uid/' . $AppId . ':prefix//' . $AppId . '/' . $ShortBucketName . '/' . $config['AllowPrefix']
                )
            )
        )
    );

    $policyStr = str_replace('\\/', '/', json_encode($policy));
    $Action = 'GetFederationToken';
    $Nonce = rand(10000, 20000);
    $Timestamp = time() - 1;
    $Method = 'POST';

    $params = array(
        'Region'=> 'gz',
        'SecretId'=> $config['SecretId'],
        'Timestamp'=> $Timestamp,
        'Nonce'=> $Nonce,
        'Action'=> $Action,
        'durationSeconds'=> 7200,
        'name'=> 'cos',
        'policy'=> urlencode($policyStr)
    );
    $params['Signature'] = getSignature($params, $config['SecretKey'], $Method);

    $url = $config['Url'];
    $ch = curl_init($url);
    $config['Proxy'] && curl_setopt($ch, CURLOPT_PROXY, $config['Proxy']);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json2str($params));
    $result = curl_exec($ch);
    if(curl_errno($ch)) $result = curl_error($ch);
    curl_close($ch);

    $result = json_decode($result, 1);
    if (isset($result['data'])) $result = $result['data'];

    return $result;
}

// 获取临时密钥，计算签名
$tempKeys = getTempKeys();

// 返回数据给前端
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1'); // 这里修改允许跨域访问的网站
header('Access-Control-Allow-Headers: origin,accept,content-type');
echo json_encode($tempKeys);
