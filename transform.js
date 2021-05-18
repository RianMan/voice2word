const RequestApi = require('./weblfasr-node');
const { readdir, renameSync } = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdirPromise = promisify(readdir);

let baseDirVal = ''
let args = process.argv.slice(2)

baseDirVal = args[0]

const baseDir = path.join(__dirname, baseDirVal);
// 系统配置
const config = {
    // 请求地址
    hostUrl: "http://raasr.xfyun.cn/api/",
    // 在控制台-我的应用-语音转写获取
    appId: "436b32a1",
    // 在控制台-我的应用-语音转写获取
    secretKey: "0459fe9861395e28060dc735967bd8ca",
    // 音频文件地址
}

// 获取文件路径
const getFile = (fp) => path.join(baseDir,fp);

// 读取文件名称 并且将文件变成 10 * 10的二维数组，快速的进行操作
const readFile = async () => {
    console.log(baseDir,'baseDir')
    let waveFileNameArr = await readdirPromise(baseDir);
    waveFileNameArr = waveFileNameArr.filter(f => f.startsWith('File') );
    let waveFilePathLists = waveFileNameArr.map(f => getFile(f));
    waveFilePathLists = waveFilePathLists.filter(f => f.endsWith('.wav') );
    console.log(waveFilePathLists, 'waveFilePathLists')
    let len = waveFilePathLists.length
    if(len > 10){
        let dimensionArray = []
        for (let index = 0; index < len; index+=10) {
            dimensionArray.push(waveFilePathLists.slice(index,index+10))
        }
        for (let index = 0; index < dimensionArray.length; index++) {
            const fileListsArray = dimensionArray[index];
            reName(fileListsArray)
        }
    }else{
        reName(waveFilePathLists)
    }
    
}

// 获取后台返回的结果进行文件名转写
const reName = async (fileArr) => {
    for (let index = 0; index < fileArr.length; index++) {
        const element = fileArr[index];
        let obj = {...config, filePath: element};
        let ra = new RequestApi(obj);
        let res = await ra.allApiRequest();
        console.log(res,'res')
        if(res && typeof res ==='string'){
            renameSync(element,getFile(`${res}.wav`));
        }
    }
}

readFile();
