const axios = require("axios");
const cookie = require("./config/cookie.json");

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

module.exports = {
    fetchData: fetchData
}
