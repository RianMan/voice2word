const RequestApi = require('../weblfasr-node');
const { readdir, renameSync } =  require('fs');
const path = require('path');
const { promisify } =require('util');
const readdirPromise = promisify(readdir);

const baseDir = path.join(__dirname,'11');
// 系统配置
const config = {
    // 请求地址
    hostUrl: "http://raasr.xfyun.cn/api/",
    // 在控制台-我的应用-语音转写获取
    appId: "5e74986d",
    // 在控制台-我的应用-语音转写获取
    secretKey: "9dc7944b5b5968305314d585727eae7c",
    // 音频文件地址
    
}

const getFile = (fp) => path.join(baseDir,fp);

const readFile = async () => {
    // console.log(baseDir,'baseDir')
    // let dirArr = await readdirPromise(baseDir);
    // // dirArr = dirArr.filter(f => f.startsWith('File') );
    // let fileArr  = dirArr.map(f => getFile(f));
    // fileArr = fileArr.filter(f => f.endsWith('.wav') );
    // console.log(fileArr,'fileArr')
    const fileArr  =['/Users/jinyan/PersonProject/voice2text/src/public/File0169.wav'];
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
