const axios = require('axios');

axios.post(
    'https://edith.xiaohongshu.com/web_api/sns/v2/note',
    {
        'common': {
            'type': 'normal',
            'title': '\u671F\u5F85\u7684\u65E5\u5B50\u91CC',
            'note_id': '',
            'desc': '\u751F\u6D3B\u603B\u662F\u8FD9\u6837\u53CD\u53CD\u590D\u590D\uFF0C\u4E0D\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u662F\u4E2A\u5C3D\u5934',
            'source': '{"type":"web","ids":"","extraInfo":"{\\"subType\\":\\"\\",\\"systemId\\":\\"web\\"}"}',
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
                    'file_id': 'spectrum/xVCHrMvYcWu8sAmlkp-3OWq2re2C_DlF9Zna_GrmHbLiLKE',
                    'width': 690,
                    'height': 690,
                    'metadata': {
                        'source': -1
                    },
                    'stickers': {
                        'version': 2,
                        'floating': []
                    },
                    'extra_info_json': '{"mimeType":"image/jpeg"}'
                }
            ]
        },
        'video_info': null
    },
    {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Authorization': '',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json;charset=UTF-8',
            'Cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; web_session=0400697a72bbb1d7496884cec3364b779eb94b; webBuild=3.7.3; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; xsecappid=creator-creator; acw_tc=ed5b560356757a10317e312fb91ce4b87bc4eb4c55784c30ff8b924e6c9f592e; websectiga=29098a4cf41f76ee3f8db19051aaa60c0fc7c5e305572fec762da32d457d76ae; sec_poison_id=5cdd702a-db42-4398-b9c1-985daad7ffa5',
            'Origin': 'https://creator.xiaohongshu.com',
            'Pragma': 'no-cache',
            'Referer': 'https://creator.xiaohongshu.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            'X-s': 'OgsC12TbOgcKsiTWOiFWO61GOBMiO6sGOiq61ls+ZY13',
            'X-t': '1694053668273',
            // 'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            // 'sec-ch-ua-mobile': '?0',
            // 'sec-ch-ua-platform': '"Windows"'
        }
    }
).then(res => {
    console.log('res data is', res.data);
})