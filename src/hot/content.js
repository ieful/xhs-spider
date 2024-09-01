const XLSX = require("xlsx");
const path = require('path');
const cheerio = require("cheerio");
const { emptyArticle } = require("../utils");
const axios = require("axios");
const cookie = require("../config/cookie.json");

let successNum = 0;
let failNum = 0;

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            maxRedirects: 0,
            headers: {
                'Cookie': `sec_poison_id=${cookie.sec_poison_id}; web_session=${cookie.web_session}`
            }
        }).then(res => {
            resolve(res.data); // 标准小红书链接返回html
        }).catch(error => {
            if (error.response && error.response.status === 307 && error.response.headers.location) {
                // 处理小红书短链接形式触发的重定向
                let redirectUrl = error.response.headers.location;
                axios.get(redirectUrl, {
                    headers: {
                        'Cookie': `sec_poison_id=${cookie.sec_poison_id}; web_session=${cookie.web_session}`
                    }
                }).then(res => {
                    resolve(res.data); // 重定向到标准链接后的返回html
                }).catch(() => {
                    // 处理重定向后发生错误
                    reject(`链接${url}文章可能已经删除`);
                })
            } else {
                // 其他非短链接形式触发的错误
                reject(`链接${url}文章可能已经删除`);
            }
        })
    })
}

async function scrapeArticleInfo(url) {
    if (!url) {
        return emptyArticle;
    }
    let articleTitle = ''; // 文章标题
    let desc = ''; // 内容
    let likes = ''; // 点赞
    let comments = ''; // 评论
    let collects = ''; // 收藏
    let link = url; // 文章链接
    let author = ''; // 发布人
    let publishDate = ''; // 发布日期

    try {
        let html = await fetchData(url);
        const $ = cheerio.load(html);
        articleTitle = $('.note-content #detail-title').text(); // 文章标题
        desc = $('.note-content #detail-desc').text(); // 内容
        likes = $('.like-wrapper .count').text(); // 点赞数
        comments = $('.chat-wrapper .count').text(); // 评论数
        collects = $('.collect-wrapper .count').text(); // 收藏数

        publishDate = $('.note-content .date').text(); // 发布日期 地点
        author = $('.author .info .name span').text(); // 发布人
        author = author.substring(0, author.length/2); // 处理名字重复
    } catch (err) {
        throw new Error(`爬取${url}报错: ${err}`);
    }

    return {
        '标题': articleTitle,
        '内容': desc,
        '点赞': likes,
        '评论': comments,
        '收藏': collects,
        '发布人': author,
        '发布日期': publishDate,
        '链接地址': link
    }
}

async function concurrencyRequest(articles, maxNum) {
    return new Promise((resolve) => {
        if (articles.length === 0) {
            resolve([]);
            return;
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === articles.length) return;
            const i = index;
            const url = articles[index].link;
            // const coverImg = articles[index].cover; // 封面图
            // const imgs = articles[index].imgs;
            index++;
            try {
                const res = await scrapeArticleInfo(url);
                results[i] = res;
                console.log(`第${index}条数据爬取成功`);
                successNum += 1;
            } catch (err) {
                results[i] = {}
                console.log(`第${index}条数据爬取失败`, err);
                failNum += 1;
            } finally {
                count++;
                if (count === articles.length) {
                    console.log('全部数据爬取完成！');
                    resolve({
                        results: results,
                        successNum: successNum,
                        failNum: failNum
                    });
                    successNum = 0;
                    failNum = 0;
                } else {
                    request();
                }
            }
        }
        const times = Math.min(maxNum, articles.length);
        for(let i = 0; i < times; i++) {
            request();
        }
    }).catch(err => {
        console.log('concurrencyRequest 请求方法报错', err);
    })
}

async function main() {
    const workbook = XLSX.readFile(path.join(__dirname, '../../assets/basicInfo.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const articles = XLSX.utils.sheet_to_json(sheet).map((row, index) => ({
        link: row.Link, // 链接
        title: row.Title,//  文章标题
        cover: row.Cover_img, // 封面
        index: index // 顺序号
    }));
    console.log(`本次共需爬取${articles.length}条数据`);

    let resultData = [];

    try {
        let resolveData = await concurrencyRequest(articles, 10);
        resultData = resolveData.results;
    } catch (e) {
        console.log('方法：concurrencyRequest 报错', e);
    }

    // console.log('resultData is', resultData);

    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(resultData);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, path.join(__dirname, `../../assets/article.xlsx`));
    console.log(`content脚本执行完毕，全部数据写入成功，article.xlsx`);
    return true;
    // todo: 合并表格

    // const Myworkbook = XLSX.readFile(path.join(__dirname, './MyExcelFile.xlsx'));
    //
    // const Myworksheet = Myworkbook.Sheets[Myworkbook.SheetNames[0]];
    //
    // const range = XLSX.utils.decode_range(Myworksheet['!ref']);
    // console.log('range is', range);
    // const numberOfColumns = range.e.c + 1;
    // console.log('numberOfColumns is', numberOfColumns);
    //
    // // 将数据添加到现有数据的后面
    // const startCell = XLSX.utils.encode_col(numberOfColumns) + '1';
    // console.log('startCell is', startCell);
    // XLSX.utils.sheet_add_json(Myworksheet, resultData, { origin: startCell });
    //
    // // 将修改后的数据写回文件
    // XLSX.writeFile(Myworkbook, 'MyExcelFile.xlsx');
}


module.exports = {
    getContent: main
}