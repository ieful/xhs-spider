const puppeteer = require('puppeteer');
const chokidar = require('chokidar');
const readline = require('readline');
const { sleep, downLoadImg } = require('../utils');
const { cookies } = require('./config/cookies');
const path = require("path");
const fs = require("fs");

async function handleDownLoadImg(imgUrl, temImgDir) {
    let result = [];
    if (typeof imgUrl === 'string') {
        return await downLoadImg(imgUrl, temImgDir, 'pic');
    } else if (Array.isArray(imgUrl)) {
        for (let i = 0; i < imgUrl.length; i++) {
            let res = await downLoadImg(imgUrl[i], temImgDir, `pic${i}`);
            result.push(res);
        }
        return result;
    }
}
// 删除文件
function clearTempImg() {
    const directoryPath = path.join(__dirname, './tempImg');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`读取 ${directoryPath} 目录失败: ${err}`);
        } else {
            files.forEach(file => {
                if(path.extname(file) === '.png' || path.extname(file) === '.jpg') {
                    fs.unlink(path.join(directoryPath, file), err => {
                        if (err) {
                            console.error(`删除文件 ${file} 失败: ${err}`);
                        } else {
                            console.log(`删除文件 ${file} 成功`);
                        }
                    });
                }
            });
        }
    });
}



async function doPost(authCookies, imgUrl, Title, Desc) {
    let share_link = '';
    const temImgDir = path.join(__dirname, './tempImg'); // 临时存储图片文件夹
    let resolvedFilePath = await handleDownLoadImg(imgUrl, temImgDir);
    console.log('resolvedFilePath is', resolvedFilePath);
    // 打开浏览器
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setCookie(...authCookies);
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto('https://creator.xiaohongshu.com/publish/publish?source=official'); // 发布页
    await page.waitForNavigation({ waitUntil: 'networkidle0' }); // 等待页面加载完成
    // await page.screenshot({path: './发布页加载完成.png'}); // 截屏

    // 监听
    page.on('response', async (response) => {
        const request = response.request();
        if (request.method() === 'POST' && response.url().endsWith('/web_api/sns/v2/note') && response.status() === 200) {
            const data = await response.json();
            console.log('data is', data);
            share_link = data.share_link;
        }
    });

    await page.waitForSelector('.upload-container');

    await page.click('.tab:nth-of-type(2)');  // 选择上传图文

    const inputUploadHandle = await page.$('input[type=file]');

    // let fileToUpload = imgPath;
    if (typeof resolvedFilePath === 'string') {
        await inputUploadHandle.uploadFile(resolvedFilePath);
        await sleep(2000);
    } else if (Array.isArray(resolvedFilePath)) {
        await inputUploadHandle.uploadFile(...resolvedFilePath);
        await sleep(resolvedFilePath.length * 1000);
    }
    // inputUploadHandle.uploadFile(...fileToUpload);
    // const sleepTime = imgUrls.length * 1000;

    await page.waitForSelector('.c-input_inner');
    await page.type('input.c-input_inner', Title); // 写入标题

    await page.waitForSelector('#post-textarea');
    await page.type('#post-textarea', Desc); // 写入内容

    await page.click('div.submit > button:first-child');
    await page.waitForXPath('//p[text()="发布成功"]');

    await browser.close();

    clearTempImg();

    return share_link;

}



async function run(title, content, imgUrl) {
    console.time('本次发帖耗时');
    console.log('开始运行自发发帖...');
    console.log('接受到的imgUrl', imgUrl);
    let share_link = await doPost(cookies, imgUrl, title, content);
    console.log(`发帖成功：${share_link}`);
    console.timeEnd('本次发帖耗时');
    return share_link;
    // await page.goto('https://creator.xiaohongshu.com/login');
    //
    // await page.type('input[placeholder="手机号"]', '18668154317');
    //
    // console.log('发送验证码');
    // // await page.click('.css-uyobdj');
    // await page.type('input[placeholder="验证码"]', '180929');
    //
    // await page.click('.btn-content');
}

// run();

module.exports = {
    post: run
}

// 在文件改动时重新运行脚本
// chokidar.watch('.').on('change', async (path) => {
//     console.log(`File ${path} has been changed, rerunning script...`);
//     // 在这里添加你希望在文件改动时执行的操作
//     // 例如，你可以导航到不同的页面，或者执行其他的 Puppeteer 操作
//     run();
// });



// 使用 readline 保持 Node.js 进程活动
// readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
