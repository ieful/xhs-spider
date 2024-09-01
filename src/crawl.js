const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const  { getCrawlTime } = require("./utils");
const { concurrencyRequest } = require('./concurrentControl');
const { readExcelFromYunPan } = require('./readFromPan');
const { postDingMessage } = require('./pushDing');
const { uploadFileToPan } = require('./uploadFile');
// const domain = require("domain");

async function main() {
    let getNewArticleFile = undefined;
    try {
        getNewArticleFile = await readExcelFromYunPan();
    } catch (err) {
        console.log('从云盘读取文件失败');
        postDingMessage({type: 'readExcelFromYunPanFail'});
    }
    if (!getNewArticleFile) {
        return;
    }
    console.log('从云盘获取新Excel文件成功, 准备爬取数据...');
    console.time('耗时');
    await new Promise(resolve => setTimeout(resolve, 3000));  // 等待 3 秒
    const workbook = XLSX.readFile(path.join(__dirname, '../article.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const articles = XLSX.utils.sheet_to_json(sheet).map((row, index) => ({
        id: row.ID, // 总编号
        noteNum: row.NoteNumber, // 文章序号
        link: row.link, // 文章链接
        title: row.title,//  文章标题
        author: row.author, // 发布人
        index: index // 顺序号
    }));
    console.log(`本次共需爬取${articles.length}条数据`);
    let resultData = [];
    let successNum = 0;
    let failNum = 0;
    try {
        let resolveData = await concurrencyRequest(articles, 10);
        resultData = resolveData.results;
        successNum = resolveData.successNum;
        failNum = resolveData.failNum;
    } catch (err) {
        console.log('concurrencyRequest并发请求报错', err);
    }
    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(resultData);
    const crawlTimeObj = getCrawlTime();
    const fileName = crawlTimeObj.dayStamp;
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, path.join(__dirname, `../${fileName}.xlsx`));
    console.log(`全部数据爬取成功，写入文件${fileName}.xlsx!`);
    console.log(`成功: ${successNum}条`);
    console.log(`失败: ${failNum}条`);
    console.timeEnd('耗时');
    let uploadResult = undefined;
    try {
        uploadResult = await uploadFileToPan(path.join(__dirname, `../${fileName}.xlsx`), {
            uploadFileName: `${fileName}.xlsx`,
            token: 'dc8f20ffa95d3d1d9fe0e65b16c7483fd9ffb352',
            repoId: 'acb3e5ce-8e7f-4393-94fa-cec9b2e92ee5'
        })
    } catch (err) {
        postDingMessage({
            type: 'uploadFailed',
            date: fileName,
        })
    }
    if (!uploadResult) {
        console.log(`${fileName}.xlsx上传失败`);
    } else {
        const downLoadLink = uploadResult.downLoadLink;
        console.log(`${fileName}.xlsx上传成功`, downLoadLink);
        postDingMessage({
            type: 'missionComplete',
            date: fileName,
            downloadUrl: downLoadLink
        })
        // 删除文件
        fs.unlink(path.join(__dirname, `../${fileName}.xlsx`), (err) => {
            if (err) {
                console.error(`删除本地${fileName}.xlsx文件失败`, err);
            } else {
                console.log(`删除本地${fileName}.xlsx文件成功`);
            }
        });
    }
}

module.exports = {
    main: main
}

