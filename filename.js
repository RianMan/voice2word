const { readdir, renameSync } =  require('fs');
const path = require('path');
const { promisify } =require('util');
const readdirPromise = promisify(readdir);

const baseDir = path.join(__dirname,'2');

const getFile = (fp) => path.join(baseDir,fp);

const readFile = async () => {
    console.log(baseDir,'baseDir')
    let dirArr = await readdirPromise(baseDir);
    let fileArr  = dirArr.map(f => getFile(f));
    fileArr = fileArr.filter(f => f.endsWith('.mp3') );
    for (let index = 0; index < fileArr.length; index++) {
        const element = fileArr[index];
        const newElement = element.replace('.mp3',`${index}`)
        try {
            renameSync(element,`${newElement}.wav`);
        } catch (error) {
            console.log(error);
            break
        }
    }
}

readFile();

