const fs = require('fs');
const archiver = require('archiver');

const homedir = __dirname;//这里是当前目录路径

//const timeString = new Date().toLocaleDateString().replace(/\//g, '-'); // 日期充当hash值防止覆盖之前的压缩包

//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const target = ['build']

// 默认在当前目录路径生成此文件 build.zip
const output = fs.createWriteStream(homedir + '/build.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // 设置压缩级别
});

archive.on('error', function (err) {
    throw err;
});

output.on('close', function () {

    console.log(`
     --------- ---------压缩完毕--------- ---------
     生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
     请在当前项目路径下寻找 build.zip 文件,系统路径为 ${homedir}\\build.zip
     ---------如需配置生成路径或文件名,请配置output---------
     `);
});

archive.pipe(output);
for (i of target) { archive.directory(i, i) }
archive.finalize();
