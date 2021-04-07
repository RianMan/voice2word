const RequestApi = require('../weblfasr-node');
const { readdir, writeFileSync } = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdirPromise = promisify(readdir);

let baseDirVal = 'wav'

const baseDir = path.join(__dirname, baseDirVal);
// 系统配置
const config = {
    // 请求地址
    hostUrl: "http://raasr.xfyun.cn/api/",
    // 在控制台-我的应用-语音转写获取
    appId: "60580661",
    // 在控制台-我的应用-语音转写获取
    secretKey: "fae6e62ac48c1fece317355e3656a763",
    // 音频文件地址
}

// 获取文件路径
const getFile = (fp) => path.join(baseDir,fp);

const readFile = async () => {
    console.log(baseDir,'baseDir')
    let waveFileNameArr = await readdirPromise(baseDir);
    let waveFilePathLists = waveFileNameArr.map(f => getFile(f));
    writeText(waveFilePathLists[0])
}

// 获取后台返回的结果进行文件名转写
const writeText = async (element) => {
    let obj = {...config, filePath: element};
    let ra = new RequestApi(obj);
    let res = await ra.allApiRequest();
    await writeFileSync('./1.txt', res)
}

readFile();
