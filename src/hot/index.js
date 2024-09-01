const { getBasicInfo } = require('./base');
const { getCoverImgCol } = require('./cover_col');
const { getContent } = require('./content');
// const { makeArticleDirs } = require('./dirs'); // 将爬取的热门文章各自创建文件夹


// 爬取热贴
async function getHotArticles() {
    let basicInfoSuccess = await getBasicInfo();
    console.log('basicInfoSuccess is', basicInfoSuccess);
    if (basicInfoSuccess) {
        getCoverImgCol();
        getContent();
    }
}


getHotArticles();


