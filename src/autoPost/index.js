const fs = require('fs');
const util = require('util');
const path = require('path');
const axios = require('axios');
const { crackXSign } = require('./X-s');


const readFile = util.promisify(fs.readFile);

// 预检请求
async function prePost() {
    return await axios.get('https://creator.xiaohongshu.com/api/media/v1/upload/web/permit', {
        params: {
            'biz_name': 'spectrum',
            'scene': 'image',
            'file_count': '1',
            'version': '1',
            'source': 'web'
        },
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Authorization': '',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; web_session=0400697a72bbb1d7496884cec3364b779eb94b; webBuild=3.7.3; feugc-status=online; feugc-status.sig=B9ChOZWemdxggiLg0HsBku4anQtV-2bl8oVorYSDQEw; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; fecreatorcreator-status=online; fecreatorcreator-status.sig=hONhqbf1FgWDB6m1qqUw2kUCTR7Q965C9_7OPE7Hp7w; fecreatormcn-status=online; fecreatormcn-status.sig=_5m-gktr7CfMaqFQDhsy2ihjqXHQuVjb0DZg10KGgoU; xsecappid=ugc; websectiga=3633fe24d49c7dd0eb923edc8205740f10fdb18b25d424d2a2322c6196d2a4ad; sec_poison_id=57268841-b932-4f22-8f36-089c24ef461d',
            'Pragma': 'no-cache',
            'Referer': 'https://creator.xiaohongshu.com/publish/publish?source=official',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            'X-s': 'ZBaJ12slsjsiZjMls65+O25psjwJs2TlZ25lsgVUZY53',
            'X-t': '1694142834955',
            'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    });
}


// 上传图片
async function upLoadImgToXiaoHongShu(url, Token) {
    const data = await readFile(path.resolve(__dirname, './cat.jpg'));
    try {
        await axios.put(`https://ros-upload.xiaohongshu.com/${url}`, data, {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Authorization': 'q-sign-algorithm=sha1&q-ak=null&q-sign-time=1694142834;1694150035&q-key-time=1694142834;1694150035&q-header-list=content-length&q-url-param-list=&q-signature=6d49594da25f746b0172a468a44e93d112e9184e',
                'Cache-Control': '',
                'Connection': 'keep-alive',
                'Content-Type': 'image/jpeg',
                'Origin': 'https://creator.xiaohongshu.com',
                'Pragma': 'no-cache',
                'Referer': 'https://creator.xiaohongshu.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'x-cos-security-token': Token
            }
        })
    } catch (err) {
        console.log('上传图片报错');
        throw new Error(err);
    }
    return true;
}

// 发布图文信息
async function publishArticle(articleObj) {
    console.log('articleObj is', articleObj);
    let temp = {
            'common': {
                'type': 'normal',
                'title': articleObj.title,
                'note_id': '',
                'desc': articleObj.desc,
                'source': '{"type":"web","ids":"","extraInfo":"{\\"subType\\":\\"official\\",\\"systemId\\":\\"web\\"}"}',
                'business_binds': '{"version":1,"noteId":0,"bizType":0,"noteOrderBind":{},"notePostTiming":{"postTime":""},"noteCollectionBind":{"id":""}}',
                'ats': [],
                'hash_tag': [],
                'post_loc': {},
                'privacy_info': {
                    'op_type': 1,
                    'type': 0
                }
            },
            'image_info': {
                'images': [
                    {
                        'file_id': articleObj.img_file_id,
                        'width': 690,
                        'height': 690,
                        'metadata': {
                            'source': -1
                        },
                        'stickers': {
                            'version': 2,
                            'floating': []
                        },
                        'extra_info_json': '{"mimeType":"image/png"}'
                    }
                ]
            },
            'video_info': null
        };
    let br = new Date().getTime();
    console.log('br is', br);
    let XSign = crackXSign(`${br}`, 'test', '/web_api/sns/v2/note', temp);
    console.log('XSign is', XSign);
    console.log(typeof XSign);
    return await axios.post(
        'https://edith.xiaohongshu.com/web_api/sns/v2/note',
        temp,
        {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Authorization': '',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json;charset=UTF-8',
                'Cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; web_session=0400697a72bbb1d7496884cec3364b779eb94b; webBuild=3.7.3; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; xsecappid=ugc; websectiga=634d3ad75ffb42a2ade2c5e1705a73c845837578aeb31ba0e442d75c648da36a',
                'Origin': 'https://creator.xiaohongshu.com',
                'Pragma': 'no-cache',
                'Referer': 'https://creator.xiaohongshu.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'X-s': XSign,
                'X-t': `${br}`,
                'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            }
        }
    );
}


// 主函数调用
async function main() {

    let prePostRes = await prePost();

    const fileId = prePostRes.data.data.uploadTempPermits[0].fileIds[0]; // 得到 fileId
    const Token = prePostRes.data.data.uploadTempPermits[0].token; // 得到准许上传图片的token

    console.log('fileId is', fileId);

    let upLoadRes = await upLoadImgToXiaoHongShu(fileId, Token);

    console.log('upLoadRes is', upLoadRes); // 图片上传结果

    if (upLoadRes) {
        // 准备发布
        let res = await publishArticle({
            title: '\u67FF\u67FF\u5982\u610F',
            desc: '\u5E0C\u671B\u81EA\u5DF1\u5F80\u540E\u7684\u65E5\u5B50\u91CC\uFF0C\u67FF\u67FF\u5982\u610F\uFF01',
            img_file_id: fileId,
        });
        console.log('res is', res);
    }
}

main();