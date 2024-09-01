const axios = require('axios');


const Dingurl = 'https://oapi.dingtalk.com/robot/send?access_token=eb6ecf573c401266834c01d77d674e8a454f19f8fe0cf714cce66f280dd23093';

const messageTypeMap = {
    "main": {
        "at": {
            "atMobiles":[
                "13262675072"
            ],
            "isAtAll": false
        },
        "msgtype": "text",
        "text": {
            "content": `main方法异常`
        }
    },
    "uploadFailed": {
        "at": {
            "atMobiles":[
                "13262675072"
            ],
            "isAtAll": false
        },
        "msgtype": "text",
        "text": {
            "content": `文件上传失败请检查`
        }
    },
    "cookieFail": {
        "at": {
            "atMobiles":[
                "13262675072"
            ],
            "isAtAll": false
        },
        "msgtype": "text",
        "text": {
            "content": `cookie维活请求失败请及时检查cookie是否过期`
        }
    },
    "readExcelFromYunPanFail": {
        "at": {
            "atMobiles":[
                "13262675072"
            ],
            "isAtAll": false
        },
        "msgtype": "text",
        "text": {
            "content": `从云盘读取Excel表格失败停止本次爬取，请登录云盘检查表格是否存在`
        }
    },
}

function getMessageData(messageObj) {
    if (messageObj.type !== "missionComplete") {
        return messageTypeMap[messageObj.type];
    } else {
        const { date, downloadUrl } = messageObj;
        return {
            "at": {
                "atMobiles":[
                    "13811721778"
                ],
                "isAtAll": false
            },
            "msgtype": "text",
            "text": {
                "content": `${date}日数据已经采集完毕\n 下载链接:${downloadUrl}\n 说明：需登录云盘，点击链接后会在浏览器中自动下载，请在浏览器下载目录查看.`
            }
        }
    }
}


function postDingMessage(messageObj) {
    const messageData = getMessageData(messageObj);
    axios.post(Dingurl, messageData)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

module.exports = {
    postDingMessage: postDingMessage
}
