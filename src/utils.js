const axios = require('axios');
const fs = require('fs');
const path = require('path');
const memfs = require("memfs");


function getCrawlTime() {
    let timeStamp = '';
    let dayStamp = '';
    const CRAWLDAY = new Date();
    const YEAR = CRAWLDAY.getFullYear();
    const MONTH = CRAWLDAY.getMonth() + 1;
    const DAY = CRAWLDAY.getDate();
    const TIME = CRAWLDAY.toTimeString().substring(0, 8);
    timeStamp = `${YEAR}-${MONTH}-${DAY} ${TIME}`;
    dayStamp = `${YEAR}-${MONTH}-${DAY}`;
    return { timeStamp, dayStamp };
}

const emptyArticle = {
    '总编号': null,
    '文章序号': null,
    '文章标题': null,
    '文章链接': null,
    '点赞数': '文章已删除无法访问',
    '收藏数': null,
    '评论数': null,
    '发布人': null,
    '发布日期': null,
}

// 下载图片到内存文件系统
async function downloadImageToMemfs(imageUrl, imagePath) {
    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = memfs.createWriteStream(imagePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    }).catch(err => {
        console.log('downloadImageToMemfs下载单个图片报错', err);
    })
}


// 下载图片到内存文件系统
// async function downloadImageToMemfs(imageUrl, imagePath) {
//     if (typeof imageUrl === 'string') {
//         console.log('开始下载图片');
//         const response = await axios({
//             url: imageUrl,
//             method: 'GET',
//             responseType: 'stream',
//         });
//         const writer = memfs.createWriteStream(imagePath);
//         response.data.pipe(writer);
//         return new Promise((resolve, reject) => {
//             writer.on('finish', resolve);
//             writer.on('error', reject);
//         }).catch(err => {
//             console.log('downloadImageToMemfs下载单个图片报错', err);
//         })
//     } else if (Array.isArray(imageUrl)) {
//         let promiseArr = imageUrl.map(item => {
//             return new Promise(async (resolve, reject) => {
//                 let response = await axios({
//                     url: item,
//                     method: 'GET',
//                     responseType: 'stream',
//                 })
//                 const writer = memfs.createWriteStream(imagePath);
//                 response.data.pipe(writer);
//                 writer.on('finish', resolve);
//                 writer.on('error', reject);
//             })
//         })
//         return Promise.all(promiseArr).then((res) => {
//             Promise.resolve(res);
//         }).catch(err => {
//             console.log('downloadImageToMemfs下载多个图片报错', err);
//         })
//     }
// }



// 下载图片
async function downLoadImg(imgUrl, imgPath, imgName) {
    const response = await axios({
        url: imgUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const filePath = path.resolve(imgPath, `${imgName}.png`);

    response.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => resolve(filePath));
        response.data.on('error', reject);
    });
}

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}


module.exports = {
    getCrawlTime: getCrawlTime,
    emptyArticle: emptyArticle,
    downLoadImg: downLoadImg,
    // downloadImageToMemfs: downloadImageToMemfs,
    // downloadImageToDir: downloadImageToDir,
    sleep: sleep
}