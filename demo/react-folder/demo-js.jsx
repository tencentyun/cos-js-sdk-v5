"use client";
import styles from "./index.module.css";
import { FileIcon, FolderIcon } from "./Icons";
import COS from "cos-js-sdk-v5";
import React, { useMemo, useState, useEffect } from "react";

/**要查看的桶配置 */
const bucketConfig = {
  /**桶名，必须字段 */
  Bucket: "xxxxx-123456789",
  /* 存储桶所在地域，必须字段 */
  Region: "ap-guangzhou",
};

/**COS SDK 实例 */
const cos = new COS({
  // SecretId 和 SecretKey请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
  // 注意⚠️：这种方法仅限前端测试调用，因为把密钥写在前端代码中将会导致泄露
  SecretId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  SecretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});
// 下面是从后端获取临时密钥的写法, 推荐！！
// const cos = new COS({
//   getAuthorization: async function (options, callback) {
//     const data = await (await fetch("/your_backend_api_path")).json();
//     const { credentials } = data;
//     callback({
//       TmpSecretId: credentials.tmpSecretId,
//       TmpSecretKey: credentials.tmpSecretKey,
//       SecurityToken: credentials.sessionToken,
//       StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
//       ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
//     });
//   },
// });

const baseURL = `https://${bucketConfig.Bucket}.cos.${bucketConfig.Region}.myqcloud.com/`;

/**
 *  文件管理, 实现了以下功能
 *  - 文件列表(含分页)
 *  - 下载文件
 *  - 删除文件
 *  - 上传文件
 *  - 创建文件夹
 */
export default function FileManager() {
  /** 一页个数 */
  const pageSize = 30;
  // 前缀字符串数组
  const [prefixArr, setPrefixArr] = useState([]);
  /** 前缀字符串 */
  const prefix = useMemo(() => prefixArr.join(""), [prefixArr]);
  // 本次请求结果，用于判断分页
  const [result, setResult] = useState({
    Name: "",
    Prefix: "",
    Marker: "",
    MaxKeys: "",
    Contents: [],
    CommonPrefixes: [],
    IsTruncated: "false",
  });
  // 当前对象列表
  const [list, setList] = useState({
    CommonPrefixes: [],
    Contents: [],
  });
  // 是否正在加载中
  const [loading, setLoading] = useState(false);

  /**单击面包蟹 */
  const changePrefix = (path) => {
    const newArr = [];
    for (let i = 0; i < prefixArr.length; i++) {
      const item = prefixArr[i];
      newArr.push(item);
      if (item === path) break;
    }
    setPrefixArr(newArr);
  };
  /**获取COS API返回结果 */
  const getBucket = async (Marker) => {
    setLoading(true);
    const _data = await cos.getBucket({
      ...bucketConfig,
      Prefix: prefix,
      Delimiter: "/", //不深度遍历
      MaxKeys: pageSize, //一页大小
      Marker, //分页 - 下一个对象开始位置
    });
    setLoading(false);
    console.log(_data);
    setResult(_data);
    return _data;
  };
  /**分页 - 点击获取下一页 */
  const getNext = async () => {
    const res = await getBucket(result.NextMarker);
    setList(({ CommonPrefixes, Contents }) => {
      return {
        CommonPrefixes: CommonPrefixes.concat(res.CommonPrefixes), //分页数据拼接
        Contents: Contents.concat(res.Contents.filter((k) => k.Key !== prefix)), //分页数据拼接 + 排除同名文件夹
      };
    });
  };
  /**获取当前目录第一页 （当 prefix 变化了自动调用）  */
  const getFirstPage = async () => {
    const res = await getBucket();
    setList({
      CommonPrefixes: res.CommonPrefixes,
      Contents: res.Contents.filter((k) => k.Key !== prefix),
    });
  };
  /**双击文件下载 */
  const download = async (Key) => {
    const a = document.createElement("a");
    a.download = Key;
    a.href = baseURL + Key;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("下载完成");
  };
  /**右键删除 */
  const deleteFile = (e, Key) => {
    e.preventDefault();
    if (window.confirm("确认删除此对象吗")) {
      cos.deleteObject({ ...bucketConfig, Key }).then(() => {
        getFirstPage();
      });
    }
  };
  /**双击文件夹进入下一层 */
  const intoFolder = (Prefix) => {
    setPrefixArr((arr) => arr.concat(Prefix.replace(prefix, ""))); //要去除当前文件夹的部分前缀
  };
  /**在当前目录上传文件 */
  const onUpload = async (e) => {
    const files = e.currentTarget.files;
    if (files && files.length) {
      const [file] = files;
      await cos.uploadFile({
        ...bucketConfig,
        Body: file,
        Key: prefix + file.name, // 上传到哪里
        onProgress(e) {
          console.log(`上传中 ${e.percent * 100}%`);
        },
      });
      alert("上传成功");
      getFirstPage();
    }
  };
  /**创建文件夹 */
  const createFolder = async () => {
    const key = window.prompt("请输入文件夹名称")?.trim();
    if (!key) {
      return alert("请输入完整内容");
    }
    await cos.uploadFile({
      ...bucketConfig,
      Body: "",
      Key: prefix + key + "/", //末尾加个斜杠，就是文件夹
    });
    alert("创建成功");
    getFirstPage();
  };

  // 前缀变化了就获取该前缀的第一页
  useEffect(() => {
    getFirstPage();
  }, [prefix]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.btnList}>
          <label className={styles.btn}>
            在当前目录上传文件 <input style={{ display: "none" }} type="file" onChange={onUpload} />
          </label>
          <div className={styles.btn} onClick={createFolder}>
            创建文件夹
          </div>
        </div>
        <div className={styles.breadcrumb}>
          <BreadItem onClick={() => setPrefixArr([])} name={bucketConfig.Bucket + "/"} />
          {prefixArr.map((k) => (
            <BreadItem key={k} onClick={() => changePrefix(k)} name={k} />
          ))}
        </div>
        <div className={styles.fileList}>
          <div className={styles.fileItems}>
            {list.CommonPrefixes.length === 0 && list.Contents.length === 0 ? (
              <div className={styles.noData}>暂无数据</div>
            ) : (
              <>
                {list.CommonPrefixes.map((k) => {
                  return (
                    <FileItem
                      key={k.Prefix}
                      title={k.Prefix.replace(prefix, "").slice(0, -1)} // 需要去除前缀
                      Icon={FolderIcon} // 这里传递 文件夹 图标
                      onContextMenu={(e) => deleteFile?.(e, k.Prefix)}
                      onDoubleClick={(e) => intoFolder?.(k.Prefix)}
                    />
                  );
                })}
                {list.Contents.map((k) => {
                  return (
                    <FileItem
                      key={k.Key}
                      title={k.Key.replace(prefix, "")} // 需要去除前缀
                      Icon={FileIcon} // 这里传递 文件 图标
                      onDoubleClick={(e) => download?.(k.Key)}
                      onContextMenu={(e) => deleteFile?.(e, k.Key)}
                    />
                  );
                })}
              </>
            )}
          </div>
          {result.IsTruncated === "true" && (
            <div className={styles.loadMore} onClick={getNext}>
              点我加载更多（一页{pageSize}个）
            </div>
          )}
        </div>
        <div className={styles.instruction}>双击文件夹进入下一层、双击文件进行下载、右键删除</div>
      </div>
    </div>
  );
}

/**面包屑元素 */
const BreadItem = ({ name, onClick }) => {
  return (
    <div className={styles.breadItem} onClick={onClick}>
      {name}
    </div>
  );
};
/**文件列表元素组件 */
const FileItem = ({ Icon, title, onDoubleClick, onContextMenu }) => {
  return (
    <div className={styles.fileItem} onContextMenu={onContextMenu} onDoubleClick={onDoubleClick}>
      {Icon}
      <div className={styles.fileItemTitle}>{title}</div>
    </div>
  );
}; 