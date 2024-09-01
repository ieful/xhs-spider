const { scrapeArticleInfo } = require("./scrapeArticle");
const { emptyArticle } = require("./utils");

let successNum = 0;
let failNum = 0;

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
            const url = validateUrl(articles[index].link);
            const id = articles[index].id;
            const author = articles[index].author;
            const noteNum = articles[index].noteNum;
            const title = articles[index].title;
            index++;
            try {
                const res = await scrapeArticleInfo(url, id, noteNum);
                results[i] = res;
                console.log(`第${index}条数据爬取成功`);
                successNum += 1;
            } catch (err) {
                results[i] = Object.assign({}, emptyArticle, { "总编号":id, "文章序号": noteNum, "文章标题": title, "文章链接": url, "发布人": author });
                console.log(`第${index}条数据爬取失败`, err);
                failNum += 1;
            } finally {
                count++;
                if (count === articles.length) {
                    console.log('全部请求完成！');
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

// 验证URL合法
function validateUrl(url) {
    url = url.trim();
    if(!url) {
        console.log(`空链接${url}`);
        return false;
    }
    // 小红书链接形式：短链接和标准链接
    if (!url.includes('xiaohongshu.com') && !url.includes('xhslink.com')) {
        console.log(`非小红书的链接${url}`);
        return false;
    }
    if (!url.startsWith('http')) {
        return encodeURI(`https://${url}`)
    }
    return encodeURI(url)
}

module.exports = {
    concurrencyRequest: concurrencyRequest,
    successNum: successNum,
    failNum: failNum
}