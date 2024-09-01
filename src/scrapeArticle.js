const cheerio = require("cheerio");
const { fetchData } = require("./fetchHtml");
const  { getCrawlTime, emptyArticle } = require("./utils");

async function scrapeArticleInfo(url, id, noteNum) {
    if (!url) {
        return emptyArticle;
    }
    let likes = ''; // 点赞
    let collects = ''; // 收藏
    let comments = ''; // 评论
    let articleTitle = ''; // 文章标题
    let publishDate = ''; // 发布日期
    let author = ''; // 发布人
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
    } catch (err) {
        throw new Error(`爬取${url}报错: ${err}`);
    }
    const crawlTimeObj = getCrawlTime();
    return {
        '总编号': id,
        '文章序号': noteNum,
        '文章标题': articleTitle,
        '文章链接': url,
        '点赞数': likes,
        '收藏数': collects,
        '评论数': comments,
        '发布人': author,
        '发布日期': publishDate,
        '数据抓取时间': crawlTimeObj.timeStamp,
    };
}

module.exports = {
    scrapeArticleInfo: scrapeArticleInfo
}