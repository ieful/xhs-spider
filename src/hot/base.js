const axios = require("axios");
const XLSX = require("xlsx");
const path = require('path');
const { headerInfo } = require('../config/page-header');


// 提取文章基本信息
function formatToBasicInfoSheetData(articles) {
    return articles.map(article => ({
        'Link': `https://www.xiaohongshu.com/explore/${article.id}`, // 链接
        'Title': article.note_card.display_title, // 标题
        'Like': article.note_card.interact_info.liked_count, // 点赞
        'Cover_img': article.note_card.image_list[0].url, // 封面图
        'imgs': article.note_card.image_list.map(item => item.url).join(';') // 配图
    }))
}

// 提取100篇文章中所有的图片
function formatToImgsLinkSheetData(articles) {
    return articles.map(article => article.note_card.image_list.map(img => img.url)).reduce((pre, next) => next.concat(pre)).map(item => ({
        img_link: item
    }))
}

// 延时
async function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

async function getSpecificHotPage(index) {
    return axios.post(
        'https://edith.xiaohongshu.com/api/sns/web/v1/search/notes',
        {
            'keyword': '\u6C7D\u8F66', // 汽车
            'page': index + 1,
            'page_size': 20,
            'search_id': '2cb4kcnjmrd4bvapmhxuy',
            'sort': 'popularity_descending',
            'note_type': 2,
            'image_scenes': 'FD_PRV_WEBP,FD_WM_WEBP'
        },
        {
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                // 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                // 'Cache-Control': 'no-cache',
                // 'Connection': 'keep-alive',
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Cookie': headerInfo.Cookie,
                // 'Origin': 'https://www.xiaohongshu.com',
                // 'Pragma': 'no-cache',
                // 'Referer': 'https://www.xiaohongshu.com/',
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same-site',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'X-s': headerInfo["X-s"][index],
                // 'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"',
            }
        }
    ).then(response => {
        return response.data.data.items;
    })
}

// 写入：Link、Title、Like、Cover_img、imgs
function writeToBasicInfoFile(formatedBasicData) {
    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(formatedBasicData);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, path.join(__dirname, `../../assets/basicInfo.xlsx`)); // 文章基本信息表格包括: 文章链接地址：Link、文章标题：Title、文章点赞：Like、文章封面图链接：Cover_img、文章所有配图链接: imgs
}

// 写入：img_link
function writeToImgsLinkFile(fromatedImgsData) {
    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(fromatedImgsData);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, path.join(__dirname, `../../assets/onlyImgs.xlsx`)); // 只有配图的链接
}

async function main() {
    console.time('cURL耗时');
    let result = [];
    let p1 = await getSpecificHotPage(0);
    console.log('p1 is', p1);
    // return;
    let p2 = await getSpecificHotPage(1);
    let p3 = await getSpecificHotPage(2);
    let p4 = await getSpecificHotPage(3);
    let p5 = await getSpecificHotPage(4);
    // let p6 = await getSpecificHotPage(5);
    result = [...p1, ...p2, ...p3, ...p4, ...p5,].filter(item => item.model_type === 'note');

    console.log('爬取热门文章总条数：', result.length);

    let formatedBasicData = formatToBasicInfoSheetData(result); // 格式化为基本信息字段
    let fromatedImgsData = formatToImgsLinkSheetData(result); // 格式化为图片链接信息

    writeToBasicInfoFile(formatedBasicData); // 写入基本信息表格
    console.log('写入表格: basicInfo.xlsx');
    writeToImgsLinkFile(fromatedImgsData); // 写入图片链接地址表格
    console.log('写入表格: onlyImgs.xlsx');
    console.timeEnd('cURL耗时');
    return true;
}


module.exports = {
    getBasicInfo: main
}
