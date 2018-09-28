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
    'AllowPrefix' => '_ALLOW_DIR_/*', // 这里改成允许的路径前缀，这里可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 a/* 或者 a.jpg
);


// 缓存临时密钥
if (!isset($_SESSION['tempKeysCache'])) {
    $_SESSION['tempKeysCache'] = array(
        'policyStr' => '',
        'expiredTime' => 0
    );
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
    $sign = base64_encode(hex2bin($sign));
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
                    // // 这里可以从临时密钥的权限上控制前端允许的操作
                    // 'name/cos:*', // 这样写可以包含下面所有权限

                    // // 列出所有允许的操作
                    // // ACL 读写
                    // 'name/cos:GetBucketACL',
                    // 'name/cos:PutBucketACL',
                    // 'name/cos:GetObjectACL',
                    // 'name/cos:PutObjectACL',
                    // // 简单 Bucket 操作
                    // 'name/cos:PutBucket',
                    // 'name/cos:HeadBucket',
                    // 'name/cos:GetBucket',
                    // 'name/cos:DeleteBucket',
                    // 'name/cos:GetBucketLocation',
                    // // Versioning
                    // 'name/cos:PutBucketVersioning',
                    // 'name/cos:GetBucketVersioning',
                    // // CORS
                    // 'name/cos:PutBucketCORS',
                    // 'name/cos:GetBucketCORS',
                    // 'name/cos:DeleteBucketCORS',
                    // // Lifecycle
                    // 'name/cos:PutBucketLifecycle',
                    // 'name/cos:GetBucketLifecycle',
                    // 'name/cos:DeleteBucketLifecycle',
                    // // Replication
                    // 'name/cos:PutBucketReplication',
                    // 'name/cos:GetBucketReplication',
                    // 'name/cos:DeleteBucketReplication',
                    // // 删除文件
                    // 'name/cos:DeleteMultipleObject',
                    // 'name/cos:DeleteObject',
                    // 简单文件操作
                    'name/cos:PutObject',
                    'name/cos:PostObject',
                    'name/cos:AppendObject',
                    'name/cos:GetObject',
                    'name/cos:HeadObject',
                    'name/cos:OptionsObject',
                    'name/cos:PutObjectCopy',
                    'name/cos:PostObjectRestore',
                    // 分片上传操作
                    'name/cos:InitiateMultipartUpload',
                    'name/cos:ListMultipartUploads',
                    'name/cos:ListParts',
                    'name/cos:UploadPart',
                    'name/cos:CompleteMultipartUpload',
                    'name/cos:AbortMultipartUpload',
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

    // 有效时间小于 30 秒就重新获取临时密钥，否则使用缓存的临时密钥
    if (isset($_SESSION['tempKeysCache']) && isset($_SESSION['tempKeysCache']['expiredTime']) && isset($_SESSION['tempKeysCache']['policyStr']) &&
        $_SESSION['tempKeysCache']['expiredTime'] - time() > 30 && $_SESSION['tempKeysCache']['policyStr'] === $policyStr) {
        return $_SESSION['tempKeysCache'];
    }

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

    $_SESSION['tempKeysCache'] = $result;
    $_SESSION['tempKeysCache']['policyStr'] = $policyStr;

    return $result;
}

// 计算 COS API 请求用的签名
function getAuthorization($keys, $method, $pathname, $query = array(), $headers = array())
{
    // 获取个人 API 密钥 https://console.qcloud.com/capi
    $SecretId = $keys['credentials']['tmpSecretId'];
    $SecretKey = $keys['credentials']['tmpSecretKey'];

    // 整理参数
    $query = array();
    $headers = array();
    $method = strtolower($method ? $method : 'get');
    $pathname = $pathname ? $pathname : '/';
    substr($pathname, 0, 1) != '/' && ($pathname = '/' . $pathname);

    // 工具方法
    function getObjectKeys($obj)
    {
        $list = array_keys($obj);
        sort($list);
        return $list;
    }

    function obj2str($obj)
    {
        $list = array();
        $keyList = getObjectKeys($obj);
        $len = count($keyList);
        for ($i = 0; $i < $len; $i++) {
            $key = $keyList[$i];
            $val = isset($obj[$key]) ? $obj[$key] : '';
            $key = strtolower($key);
            $list[] = rawurlencode($key) . '=' . rawurlencode($val);
        }
        return implode('&', $list);
    }

    // 签名有效起止时间
    $now = time() - 1;
    $expired = $now + 600; // 签名过期时刻，600 秒后

    // 要用到的 Authorization 参数列表
    $qSignAlgorithm = 'sha1';
    $qAk = $SecretId;
    $qSignTime = $now . ';' . $expired;
    $qKeyTime = $now . ';' . $expired;
    $qHeaderList = strtolower(implode(';', getObjectKeys($headers)));
    $qUrlParamList = strtolower(implode(';', getObjectKeys($query)));

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    $signKey = hash_hmac("sha1", $qKeyTime, $SecretKey);

    // 步骤二：构成 FormatString
    $formatString = implode("\n", array(strtolower($method), $pathname, obj2str($query), obj2str($headers), ''));

    // 步骤三：计算 StringToSign
    $stringToSign = implode("\n", array('sha1', $qSignTime, sha1($formatString), ''));

    // 步骤四：计算 Signature
    $qSignature = hash_hmac('sha1', $stringToSign, $signKey);

    // 步骤五：构造 Authorization
    $authorization = implode('&', array(
        'q-sign-algorithm=' . $qSignAlgorithm,
        'q-ak=' . $qAk,
        'q-sign-time=' . $qSignTime,
        'q-key-time=' . $qKeyTime,
        'q-header-list=' . $qHeaderList,
        'q-url-param-list=' . $qUrlParamList,
        'q-signature=' . $qSignature
    ));

    return $authorization;
}

// 开启 session 缓存临时密钥
session_start();

// 获取前端过来的参数


// 获取前端过来的参数
$inputBody = file_get_contents("php://input");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $inputBody){
    $params = json_decode($inputBody, 1);
    $pathname = isset($params['pathname']) ? $params['pathname'] : '/';
    $method = isset($params['method']) ? $params['method'] : 'get';
    $query = isset($params['query']) ? $params['query'] : array();
    $headers = isset($params['headers']) ? $params['headers'] : array();
} else {
    $pathname = isset($_GET['pathname']) ? $_GET['pathname'] : '/';
    $method = isset($_GET['method']) ? $_GET['method'] : 'get';
    $query = isset($_GET['query']) && $_GET['query'] ? json_decode($_GET['query'], 1) : array();
    $headers = isset($_GET['headers']) && $_GET['headers'] ? json_decode($_GET['headers'], 1) : array();
}

// 获取临时密钥，计算签名
$tempKeys = getTempKeys();
if ($tempKeys && isset($tempKeys['credentials'])) {
    $data = array(
        'Authorization' => getAuthorization($tempKeys, $method, $pathname, $query, $headers),
        'XCosSecurityToken' => $tempKeys['credentials']['sessionToken'],
    );
} else {
    $data = array('error'=> $tempKeys);
}

// 返回数据给前端
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1'); // 这里修改允许跨域访问的网站
header('Access-Control-Allow-Headers: origin,accept,content-type');
echo json_encode($data);
