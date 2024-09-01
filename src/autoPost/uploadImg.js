
const axios = require('axios');

axios.get('https://creator.xiaohongshu.com/api/media/v1/upload/web/permit', {
    // 入参
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
        'Cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; web_session=0400697a72bbb1d7496884cec3364b779eb94b; webBuild=3.7.3; feugc-status=online; feugc-status.sig=B9ChOZWemdxggiLg0HsBku4anQtV-2bl8oVorYSDQEw; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; fecreatorcreator-status=online; fecreatorcreator-status.sig=hONhqbf1FgWDB6m1qqUw2kUCTR7Q965C9_7OPE7Hp7w; fecreatormcn-status=online; fecreatormcn-status.sig=_5m-gktr7CfMaqFQDhsy2ihjqXHQuVjb0DZg10KGgoU; websectiga=10f9a40ba454a07755a08f27ef8194c53637eba4551cf9751c009d9afb564467; sec_poison_id=a6f53941-f3dc-4db5-8d0f-38c36ced1fcc; xsecappid=ugc',
        'Pragma': 'no-cache',
        'Referer': 'https://creator.xiaohongshu.com/publish/publish?source=',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        'X-s': '12qk02dvsiOk1BcG1gsLsBaB12MGZgslZ21iO2TKZ613',
        'X-t': '1694054368467',
        'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }
}).then(res => {
    console.log('res data.data is', res.data.data);
    console.log('图片ID', res.data.data.uploadTempPermits.map(item => item.fileIds[0]));
})

// f
// fileIds:
// 'spectrum/g80hffR2ba_Hxw0uRz2OlnCdUch8Tai0_t2epi3zVBe8Wqw',
//   'spectrum/1040g0k030on2iekp360g4ao6v3soa69usdk9a50',
//   'spectrum/1040g0k030on2iekp360g4ao6v3soa69usdk9a50'

// 预期返回结果中有： spectrum/AkdwB2vbJL_r5fEoEtEzJQqh5VR3DQqaqmPI3r7PkLkwv0Y