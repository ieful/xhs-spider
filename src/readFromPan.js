const fs = require('fs');
const axios = require('axios');
const path = require('path');


async function readExcelFromYunPan() {
    return axios({
        url: 'https://pan.corpautohome.com/f/1d498adff9b5439d8d66/?dl=1',
        method: 'GET',
        responseType: 'stream',
    }).then(response => {
        return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(path.join(__dirname, '../article.xlsx'));
            response.data.pipe(writer);
            writer.on('finish', resolve(true));
            writer.on('error', reject(false));
        });
    })
}

module.exports = {
    readExcelFromYunPan: readExcelFromYunPan
}