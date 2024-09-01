const axios = require('axios');
const cookie = require('./config/cookie.json');
const { postDingMessage } = require('./pushDing');

const instance = axios.create({
    maxRedirects: 0,
    headers: {
        'Cookie': `sec_poison_id=${cookie.sec_poison_id}; web_session=${cookie.web_session}`
    }
});

function activateCookie() {
    instance.get('https://www.xiaohongshu.com/explore/64382917000000001301410d').then(() => {
        console.log('cookie维活请求成功');
    }).catch(() => {
        postDingMessage({type: 'cookieFail'});
    })
}

module.exports = {
    activateCookie: activateCookie
}

