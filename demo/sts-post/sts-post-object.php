<?php
// 临时密钥计算样例

// 固定分配给CSG的密钥
$config = array(
    'Url'=> 'https://sts.api.qcloud.com/v2/index.php',
    'Domain'=> 'sts.api.qcloud.com',
    'SecretId'=> 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'SecretKey'=> 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'Bucket'=> 'test-1250000000',
);

function getAuthorization($keys, $method, $pathname)
{
    // 获取个人 API 密钥 https://console.qcloud.com/capi
    $SecretId = $keys['credentials']['tmpSecretId'];
    $SecretKey = $keys['credentials']['tmpSecretKey'];

    // 整理参数
    $queryParams = array();
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
    $qUrlParamList = strtolower(implode(';', getObjectKeys($queryParams)));

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    $signKey = hash_hmac("sha1", $qKeyTime, $SecretKey);

    // 步骤二：构成 FormatString
    $formatString = implode("\n", array(strtolower($method), $pathname, obj2str($queryParams), obj2str($headers), ''));

    header('x-test-method', $method);
    header('x-test-pathname', $pathname);

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

// json 转 query string
function json2str($obj, $notEncode = false) {
    ksort($obj);
    $arr = array();
    foreach ($obj as $key => $val) {
        !$notEncode && ($val = urlencode($val));
        array_push($arr, $key . '=' . $val);
    }
    return join('&', $arr);
}

// 计算签名
function getSignature($opt, $key, $method) {
    global $config;
    $formatString = $method . $config['Domain'] . '/v2/index.php?' . json2str($opt, 1);
    echo "\n";
    echo $formatString;
    echo "\n";
    $sign = hash_hmac('sha1', $formatString, $key);
    $sign = base64_encode(hex2bin($sign));
    return $sign;
}

// 拼接获取临时密钥的参数
function getTempKeys($key) {


    $keyPathname = $key ? $key : '';
    $keyPathname = '1%201.txt';
    substr($keyPathname, 0, 1) != '/' && ($keyPathname = '/' . $keyPathname);

    global $config;
    $ShortBucketName = substr($config['Bucket'],0, strripos($config['Bucket'], '-'));
    $AppId = substr($config['Bucket'], 1 + strripos($config['Bucket'], '-'));
    $policy = array(
        'version'=> '2.0',
        'statement'=> array(
            array(
                'action'=> array(
                    'name/cos:PutObject',
                ),
                'effect'=> 'allow',
                'principal'=> array('qcs'=> array('*')),
                'resource'=> array(
                    'qcs::cos:ap-guangzhou:uid/' . $AppId . ':prefix//' . $AppId . '/' . $ShortBucketName . $keyPathname
                )
            )
        )
    );

    header('x-policy:' . 'qcs::cos:ap-guangzhou:uid/' . $AppId . ':prefix//' . $AppId . '/' . $ShortBucketName . $keyPathname);

    $policyStr = str_replace('\\/', '/', json_encode($policy));
    $Action = 'GetFederationToken';
    $Nonce = rand(10000, 20000);
    $Timestamp = time() - 1;
    $Method = 'GET';

    $params = array(
        'Action'=> $Action,
        'Nonce'=> $Nonce,
        'Region'=> '',
        'SecretId'=> $config['SecretId'],
        'Timestamp'=> $Timestamp,
        'durationSeconds'=> 7200, // 临时密钥有效时间
        'name'=> '',
        'policy'=> $policyStr
    );
    $params['Signature'] = urlencode(getSignature($params, $config['SecretKey'], $Method));

    $url = $config['Url'] . '?' . json2str($params, 1);
    $ch = curl_init($url);
    // curl_setopt($ch, CURLOPT_PROXY, '');
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    if(curl_errno($ch)) $result = curl_error($ch);
    curl_close($ch);

    echo $result;
    exit();

    $result = json_decode($result, 1);
    return $result['data'];
};

$method = isset($_GET['bucket']) ? $_GET['method'] : 'post';
$key = isset($_GET['key']) ? $_GET['key'] : '';
$pathname = isset($_GET['pathname']) ? $_GET['pathname'] : '/';

header('x-key:' . $key);
header('x-pathname:' . $pathname);

$data = getTempKeys($key);
$data['authorization'] = getAuthorization($data, $method, $pathname);
header('allow-control-allow-origin: *');
echo json_encode($data);
?>