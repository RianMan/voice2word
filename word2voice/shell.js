var exec = require('child_process').exec;

module.exports = function pcm2wav(){
    exec('python3 index.py',(error,stdout,stderr) => {
        console.log(stdout);
        console.log('=======');
        console.log(stderr);
    })
}