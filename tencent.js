const tencentcloud = require("tencentcloud-sdk-nodejs");
const axios = require("axios");

// 导入对应产品模块的client models。
const CvmClient = tencentcloud.cvm.v20170312.Client;

const clientConfig = {
  // 腾讯云认证信息
  credential: {
    secretId: "AKIDX1GGzR5U9avzoPSmfKl79uNaaQ17nK2T",
    secretKey: "IJ9l1D9oBH7oHWhbEaeS6VK4XjdKkz0t",
  },
  // 产品地域
  region: "ap-shanghai",
  // 可选配置实例
  profile: {
    signMethod: "HmacSHA256", // 签名方法
    httpProfile: {
      reqMethod: "POST", // 请求方法
      reqTimeout: 30, // 请求超时时间，默认60s
    },
  },
};
// 实例化要请求产品(以cvm为例)的client对象
const client = new CvmClient(clientConfig);
// 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
client
  .DescribeZones()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.error("error", err);
    }
  );
