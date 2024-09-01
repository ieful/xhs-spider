const XLSX = require("xlsx");
const path = require('path');
const { promisify } = require('util');
const axios = require("axios");
const xl = require("excel4node");
const stream = require('stream');

const pipeline = promisify(stream.pipeline);

async function downloadImageAndAddToExcel(imgUrl, ws, fromCellAnchor, toCellAnchor) {
    const response = await axios({
        url: imgUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const bufferChunks = [];
    const streamToBuffer = new stream.Writable({
        write(chunk, encoding, callback) {
            bufferChunks.push(chunk);
            callback();
        }
    });

    await pipeline(response.data, streamToBuffer);
    const buffer = Buffer.concat(bufferChunks);

    ws.addImage({
        image: buffer,
        type: 'picture',
        position: {
            type: 'twoCellAnchor',
            from: {
                col: 1, // 列
                colOff: 0,
                row: fromCellAnchor, // 行
                rowOff: 0,
            },
            to: {
                col: 2, // 列
                colOff: 0,
                row: toCellAnchor, // 行
                rowOff: 0,
            },
        },
    });
    return true;
}

async function concurrentLoadImg(articles, maxNum, ws) {

    return new Promise((resolve) => {
        let index = 1; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        async function request() {
            if (index === articles.length) return;
            let i = index;
            let url = articles[i].cover;
            index++;
            try {
                await downloadImageAndAddToExcel(url, ws, i+1, i+2);
                console.log(`第${i}条数据爬取完成`);
            } catch (err) {
                console.log(`第${i}条数据爬取失败`, err);
            } finally {
                count++;
                if (count === articles.length - 1) {
                    console.log('请求全部完成');
                    resolve(true)
                } else {
                    request();
                }
            }
        }
        for (let i = 0; i < maxNum; i++){
            request();
        }
    }).catch(err => {
        console.log('concurrentLoadImg方法报错', err);
    })
}


async function main() {
    // console.time('耗时');
    const workbook = XLSX.readFile(path.join(__dirname, '../../assets/basicInfo.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const articles = XLSX.utils.sheet_to_json(sheet).map((row, index) => ({
    cover: row.Cover_img, // 封面
    index: index // 顺序号
    }));
    console.log(`本次共需爬取${articles.length}条数据`);
    articles.unshift({});
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');

    for (let i = 0; i < articles.length; i++) {
        ws.column(i+1).setWidth(30); // 设置列宽
        if (i === 0) {
            ws.cell(1, 1).string('封面').style({
                    textAlign: 'center'
                });
        } else {
            ws.row(i+1).setHeight(245); // 设置行高
        }
    }
    await concurrentLoadImg(articles, 10, ws);
    wb.write(path.join(__dirname, '../../assets/coverImg.xlsx'));
    console.log(`coverImg脚本执行完毕，数据写入../../assets/coverImg.xlsx`);
    // console.timeEnd('耗时');
    return true;
}

module.exports = {
    getCoverImgCol: main
}