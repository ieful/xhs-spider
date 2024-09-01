// 将爬取的文章写入到对应的文件夹
const XLSX = require("xlsx");
const path = require('path');
const cheerio = require("cheerio");
const fs = require('fs');
const { promisify } = require('util');
const { downLoadImg } = require('../utils');
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

async function scrapeArticleInfo(url, imgs) {
    if (!url) {
        return;
    }
    let likes = ''; // 点赞
    let collects = ''; // 收藏
    let comments = ''; // 评论
    let articleTitle = ''; // 文章标题
    let publishDate = ''; // 发布日期
    let author = ''; // 发布人
    let desc = ''; // 内容

    let parentDir = path.join(__dirname, '../../assets/hot120');

    try {
        let html = await fetchData(url);
        const $ = cheerio.load(html);
        likes = $('.like-wrapper .count').text(); // 点赞数
        collects = $('.collect-wrapper .count').text(); // 收藏数
        comments = $('.chat-wrapper .count').text(); // 评论数

        articleTitle = $('.note-content #detail-title').text(); // 文章标题

        publishDate = $('.note-content .date').text(); // 发布日期 地点
        author = $('.author .info .name span').text(); // 发布人
        author = author.substring(0, author.length/2); // 处理名字重复

        desc = $('.note-content #detail-desc').text(); // 内容
    } catch (err) {
        throw new Error(`爬取${url}报错: ${err}`);
    }

    let childDir = articleTitle;

    let fullPath = path.join(parentDir, childDir);

    let newDir = await promisify(fs.mkdir)(fullPath);
    let dir = path.join(parentDir, articleTitle);
    let filename = `${articleTitle}.txt`;
    let content = `标题：${articleTitle} \n 发布日期 ${publishDate} \n 发布人：${author} \n 内容：${desc} \n 点赞：${likes} \n 收藏：${collects} \n 评论：${comments} \n 链接：${url}`;
    let filepath = path.join(dir, filename);
    let newFile = await promisify(fs.writeFile)(filepath, content);

    for (let i = 0; i < imgs.length; i++) {
        let imgName = i === 0 ? '00Cover' : `0${i}`;
        await downLoadImg(imgs[i], dir, imgName);
        console.log('图片下载成功');
    }
    if (newDir && newFile) {
        return true;
    } else {
        return false;
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
        // 请求
        async function request() {
            if (index === articles.length) return;
            const i = index;
            const url = articles[index].link;
            const imgs = articles[index].imgs;
            index++;
            try {
                const res = await scrapeArticleInfo(url, imgs);
                results[i] = res;
                console.log(`第${index}篇文章写入成功`);
                successNum += 1;
            } catch (err) {
                results[i] = {}
                console.log(`第${index}篇文章写入失败`, err);
                failNum += 1;
            } finally {
                count++;
                if (count === articles.length) {
                    console.log('全部文章写入完成！');
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
    console.time('写入目录耗时');
    const workbook = XLSX.readFile(path.join(__dirname, '../../assets/basicInfo.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const articles = XLSX.utils.sheet_to_json(sheet).map((row, index) => ({
        link: row.Link, // 链接
        title: row.Title,//  文章标题
        like: row.Like, // 赞数
        cover: row.Cover_img, // 封面
        imgs: row.imgs.split(';'), // 配图
        index: index // 顺序号
    }));
    console.log(`本次共需爬取${articles.length}条数据`);
    // let result;
    try {
        await concurrencyRequest(articles, 10);
    } catch (err) {
        console.log('concurrencyRequest方法报错', err);
    }
    console.log(`全部数据写入成功，写入目录hot120`);
    console.timeEnd('写入目录耗时');
}

// main();
module.exports = {
    makeArticleDirs: main
}