const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');
const axios = require('axios');

// 设置APPID/AK/SK
var APP_ID = "18940546";
var API_KEY = "fhVunxn9p9IsOZEaiMx5wrll";
var SECRET_KEY = "hpnbFaXUk6IefHeXpcWtCWNSG6SslLtv";
const getTokenurl = `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;
const getVocieUrl = 'https://vop.baidu.com/pro_api';


const handleUpload = (token) => {
    let voice = fs.readFileSync('./16k.wav');
    let voiceBuffer = Buffer.from(voice).toString('base64');
    let statObj = fs.statSync('./16k.wav');
    let base64 = 'data:audio/wav;base64,' + voiceBuffer;
    console.log(statObj.size,'base64')
    const sendObj = {
        format: 'wav',
        rate: 16000,
        channel: 1,
        cuid: 'baidu_workshop',
        token,
        dev_pid: 80001,
        speech: base64,
        len: statObj.size,
    }
    return sendObj;
}

const handleRequest = async () => {
    let response = await axios.get(getTokenurl);
    let bodyObj = response.data;
    if (bodyObj.access_token) {
        access_token = bodyObj.access_token;
    }
    let sendObj = handleUpload(access_token);
    getVoiceData(sendObj);
}

const getVoiceData = async (data) => {
    let response = await axios({
        method: 'post',
        url: getVocieUrl,
        data,
        headers: {
            "Content-Type": "application/json"
        }
      });
    console.log(response.data,'response');
}


handleRequest();

