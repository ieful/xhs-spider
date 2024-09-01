const axios = require('axios');

async function follow() {
    let followResponse = await axios.post(
        'https://edith.xiaohongshu.com/api/sns/web/v1/user/follow',
        {
            'target_user_id': '5b02cc3c11be106e3c296c80',
            'refer_note_id': '646b294d0000000013013afd'
        },
        {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json;charset=UTF-8',
                'Cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; webBuild=3.7.3; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; acw_tc=dfe3dcfce6c20a1ae9b8c6439f14967c74960adbe58003134dba7352ff1fb3a7; web_session=0400697a72bbb1d7496837e1cb364b4172a387; xsecappid=xhs-pc-web; websectiga=3fff3a6f9f07284b62c0f2ebf91a3b10193175c06e4f71492b60e056edcdebb2; sec_poison_id=dca42651-4710-4a66-aa38-5e8790083935',
                'Origin': 'https://www.xiaohongshu.com',
                'Pragma': 'no-cache',
                'Referer': 'https://www.xiaohongshu.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'X-S-Common': '2UQAPsHC+aIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0P1+jhIHjIj2eHjwjQgynEDJ74AHjIj2ePjwjQhyoPTqBPT49pjHjIj2ecjwjHAN0q1PUHVHdWMH0ijP/YYP9bD+nLMPezDydp14nlU2fzEJd+D2fz7J7SA+dr72drhq0m32eLMPeZIPerA+0PlPsHVHdW9H0il+0DF+erlweZEPeGlNsQh+UHCHSY8pMRS2LkCGp4D4pLAndpQyfRk/SzbyLleadkYp9zMpDYV4Mk/a/8QJf4hanS7ypSGcd4/pMbk/9St+BbH/gz0zFMF8eQnyLSk49S0Pfl1GflyJB+1/dmjP0zk/9SQ2rSk49S0zFGMGDqEybkea/8QyDLl/gksJbSLz/pwpM8i/Dzb4FMLc/pwyfqA/dkm+bSgzgY+pFDA//QQ+LEL//+wySDUnnksJrFULfMw2SDU/D4bPbkLz/+yzFE3nnM+4MkgLg4yprMEnDzdPrRrG748yfqFnSztyrRoa/mOpB4h/dkyyDMT//QyyDQT//Q+2LMT//pyprEknfMayrMgnfY8pr8Vnnk34MkrGAm8pFpC/p4QPLEo//++JLE3/L4zPFEozfY+2D8k/SzayDECafkyzF8x/Dzd+pSxJBT8pBYxnSznJrEryBMwzF8TnnkVybDUnfk+PS8i/nkyJpkLcfS+ySDUnpzyyLEo/fk+PDEk/S4+PLMxGA+w2SDA/nMQPDMx/gY8yDk3/nkz4FET/fMyzBlV/nk8PDMCagSw2SbE/Mz+2bSTLfYw2fqAn/QwyFhUpfT8PDDFnfk32DMo/fS8pMp7ngknyLELpfTyprM7/LzwJrRgzfTwpbSEnp4nJrEgLfM8JpkT/fkdPrETzg4+yDQT/Dz3+pDULfkwzMLI/SzVJbSTpgkyzBz3/LztyDEC8BS8pF8V/fknyLRopgk+2DFM/L4wyFELzg4+2Sbh/F4ayLExG7k+pMLl/nkdPDETLgkOzFk3/D4bPMSxGAbwJpki/Szz+bSga/pOpFSCnSznJLRrz/mwPDkx/Lzd2bSEa0DjNsQhwsHCHDDAwoQH8B4AyfRI8FS98g+Dpd4daLP3JFSb/BMsn0pSPM87nrldzSzQ2bPAGdb7zgQB8nph8emSy9E0cgk+zSS1qgzianYt8p+DJoYlqg4Dag8mqM4sG9Y7LozF89FF+DTp2dYQyemAPrlNq9kl49EE+Fzyag86q7YjLBkEG7pmanYN8LzY+7+f8omVLop7//Qn478AJ7pIaL+MJLEgwrTCpd4/aL+d8nTn4rY7qg4raLp+qFSiPBph/bSDagY/PFS94d+g4g4atA4CLok0/d+DJe+S8Sm7prSk4d+nLozN/M8Fqg+l4b4HJrkSpbkU+rS9+bYQypGANM878Azl4bzQPUTcJFc98nSM4BYQ4fpA2bm7LrS3po4QyLplJ9pm8pP7wbYUJ0mA8dp7G7QjJ9LIzD8g/rQN8/m8qLEQ2BRS8dpFJDSbafpfLozQJ9lrJbbfyo4Q2epSPgbFP9QT+fL9J0YPaLpr8LSkLBFUpnMmag8g/jT+z7SQzn+fnS87LFShaL+oJA+AydkO8/+n4bYQ2rRA8rrA8nzDn0FjNsQhwaHCP/DEweHA+eD7wsIj2erIH0i9+eQR',
                'X-s': 'XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjE1MzBlYTE5NWVhNDEwMTA5Njg3NzA4YWExMWI3M2I5NTM3NjY2YjBlM2RmNzY2NGE0ZTE3ZGNkYmMwZWQwZTMyZDg0ODcwYjg4ZTJhOGI0OTgxNzZjMmM2ZjBmM2MyMmM5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNWM1Mjc3NzY3MmI2MjMxYjJkMjQwNmNmZDllMjY2MzIyNzQyOTMxYmRhNzg3Y2NkN2VkY2I4ZjkzMGNiYWUwYzViNTVkZTMwMDNlOWFkNTYyYWVlNWRmYmZmNjg0NmEwMjBmNDk5Y2RjNGU0NTllYmUzZDdkMDJjNzdiYWFlNjViOGUzMzM5MGNkNTEwMzQxOGRiNjczMWU1Mjg2NmQzOGJkNGE3Yjc1NmZhNTQ4YWI5OWIzZTVmODE0N2JjMDgxYyJ9',
                'X-t': '1694411809061',
                'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'x-b3-traceid': '3801cb739312906c'
            }
        }
    )
    // {"signSvn":"51","signType":"x1","appId":"xhs-pc-web","signVersion":"1","payload":"f2890a0d4744a4903d6b6beefa4e2cb08e3cd52a15fc1dad81de71a590262144ff5f640d545191fb3efece5016efa3bdc9e3bfda1faa1eb90d74aa31b54c72cd0d74aa31b54c72cdac489b9da8ce5e48f4afb9acfc3ea26fe0b266a6b4cc3cb5c52777672b6231b2d2406cfd9e266322742931bda787ccd7edcb8f930cbae0c5b55de3003e9ad562aee5dfbff6846a020f499cdc4e459ebe3d7d02c77baae65b8e33390cd5103418db6731e52866d38bb141d5b879b09cab8367af194cbeab33"}
    console.log('follow response is', followResponse.data);
}

async function unfollow() {
    const UnfollowResponse = await axios.post(
        'https://edith.xiaohongshu.com/api/sns/web/v1/user/unfollow',
        {
            'target_user_id': '5a0721ce4eacab748a575db6'
        },
        {
            headers: {
                // 'authority': 'edith.xiaohongshu.com',
                // 'accept': 'application/json, text/plain, */*',
                // 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                // 'cache-control': 'no-cache',
                // 'content-type': 'application/json;charset=UTF-8',
                'cookie': 'abRequestId=7476c5e5-87f4-5489-90a8-4e862333c9b9; a1=18a3ad5e504djunulrzdynsdzdwoys6q7zq8r0kx550000136310; webId=77eb229bf187a411101f5244d77a0b58; gid=yY0q0f2iq8W0yY0q0f2d2u8T84fV7I71FufvAC2IMfufEY28lvMKAF888yqKqy884WyqWqKy; web_session=0400697a72bbb1d7496884cec3364b779eb94b; webBuild=3.7.3; customerBeakerSessionId=6fca68fcb7d58bf06c1609c100a14782de934dd0gAJ9cQAoWBAAAABjdXN0b21lclVzZXJUeXBlcQFLAVgOAAAAX2NyZWF0aW9uX3RpbWVxAkdB2T5LsFOl41gJAAAAYXV0aFRva2VucQNYQQAAADE4NjNlMzhkNGQxNzQ0NzQ4YTZmNjMxYTM5NzQxZjM1LWJkOTkwNjU5YmFiYTRlYTBhYjdiNzU4MmUyYTc0NGNicQRYAwAAAF9pZHEFWCAAAABiNjFhODUwOTZkYzA0M2NkYTc2YmZlZjE5MmEyMWUxMnEGWA4AAABfYWNjZXNzZWRfdGltZXEHR0HZPkuwU6XjWAYAAAB1c2VySWRxCFgYAAAANWI4YjM5ODU0ZDdhYzYwMDAxYmExOTNlcQlYAwAAAHNpZHEKWBgAAAA2NGY5MmVjMTc1MDAwMDAwMDAwMDAwMGFxC3Uu; customerClientId=978691700579904; customer-sso-sid=64f92ec1750000000000000a; x-user-id-creator.xiaohongshu.com=5b8b39854d7ac60001ba193e; access-token-creator.xiaohongshu.com=customer.ares.AT-f50851bdef234eea97028fdea6401b3f-51b8950e3b9c49bca8d293f140070341; galaxy_creator_session_id=XdWDPqmVbtz3hECeNWmP8J3S3BJ61ZsHVVnh; galaxy.creator.beaker.session.id=1694052033907074973004; xsecappid=xhs-pc-web; websectiga=29098a4cf41f76ee3f8db19051aaa60c0fc7c5e305572fec762da32d457d76ae; sec_poison_id=fce72a28-00ad-475e-a206-ffdd593b2d03',
                // 'origin': 'https://www.xiaohongshu.com',
                // 'pragma': 'no-cache',
                // 'referer': 'https://www.xiaohongshu.com/',
                // 'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"',
                // 'sec-fetch-dest': 'empty',
                // 'sec-fetch-mode': 'cors',
                // 'sec-fetch-site': 'same-site',
                // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                // 'x-b3-traceid': '133fd0d12e41f499',
                'x-s': 'XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6ImI0MDIwN2UyN2Y3OGVjYThkNjYwYmNlZWUwOTJhNTRkZDQzOTJmYzQ0MDJkNTBkMWZhMzI5ZDg2OWU1NDQ1ZTM2ZjBiNmViMGMyNTI0MWE0NjhhNzhhOTRiZWQ5MmExYWM5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNWM1Mjc3NzY3MmI2MjMxYjJkMjQwNmNmZDllMjY2MzIyNzQyOTMxYmRhNzg3Y2NkN2VkY2I4ZjkzMGNiYWUwYzViNTVkZTMwMDNlOWFkNTYyYWVlNWRmYmZmNjg0NmEwMjBmNDk5Y2RjNGU0NTllYmUzZDdkMDJjNzdiYWFlNjViOGUzMzM5MGNkNTEwMzQxOGRiNjczMWU1Mjg2NmQzOGI1MzUyZGQ0OTAxMjhiNGIxNGUzOWI2MTBkY2M3MmZiOCJ9',
                // 'x-s-common': '2UQAPsHC+aIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0P1+jhIHjIj2eHjwjQgynEDJ74AHjIj2ePjwjQhyoPTqBPT49pjHjIj2ecjwjHAN0q1PUHVHdWMH0ijP/YYP9bD+nLMPezDydp14nlU2fzEJd+D2fz7J7SA+dr72drhq0m32eLMPeZIPerA+0PlPsHVHdW9H0il+0DFPADEPeGMPeqhNsQh+UHCHSY8pMRS2LkCGp4D4pLAndpQyfRk/SzbyLleadkYp9zMpDYV4Mk/a/8QJf4hanS7ypSGcd4/pMbk/9St+BbH/gz0zFMF8eQnyLSk49S0Pfl1GflyJB+1/dmjP0zk/9SQ2rSk49S0zFGMGDqEybkea/8QJLDI/LzQ4FhUpgSwPSDA/F4nySSLyBTwySS7nnMwJbkgpg4Oprki/SzayMkrLgkOprkTngkzPrMrafTwprQ3/p4yyrMCa/pyzBqU/M4pPLErL/byprFUnfksyLETpfS+zFME/SzQPrMgz/mwyfYi/dkiyrRLLfSypMrM/nMb2bSg//pyprEknfMayrMgnfY8pr8Vnnk34MkrGAm8pFpC/p4QPLEo//++JLE3/L4zPFEozfY+2D8k/SzayDECafkyzF8x/Dzd+pSxJBT8pBYxnSznJrEryBMwzF8TnnkVybDUnfk+PS8i/nkyJpkLcfS+ySDUnpzyyLEo/fk+PDEk/S4+PLMxGA+w2SDA/nMQPDMx/gY8yDk3/nkz4FET/fMyzBlV/nk8PDMCagSw2SbE/Mz+2bSTLfYw2fqAn/QwyFhUpfT8PDDFnfk32DMo/fS8pMp7ngknyLELpfTyprM7/LzwJrRgzfTwpbSEnp4nJrEgLfM8JpkT/fkdPrETzg4+yDQT/Dz3+pDULfkwzMLI/SzVJbSTpgkyzBz3/LztyDEC8BS8pF8V/fknyLRopgk+2DFM/L4wyFELzg4+2Sbh/F4ayLExG7k+pMLl/nkdPDETLgkOzFDl/gkp2pkoL/mOprbh/nkiyLEoagYwzMpC/M4QPDMLcfT8PDFA/nMyyLRea0DjNsQhwsHCHDDAwoQH8B4AyfRI8FS98g+Dpd4daLP3JFSb/BMsn0pSPM87nrldzSzQ2bPAGdb7zgQB8nph8emSy9E0cgk+zSS1qgzianYt8p+DzgYlqg4Dag8mqM4sG9Y7LozF89FF+DTp2dYQyemAPrlNq9kl49EE+Fzyag86q7YjLBkEG7pmanYN8LzY+7+f8omVLop7//Qn478AJ7pIaL+MJLEgwrTCpd4/aL+d8nTn4rY7qg4raLp+qFSiPBph/bSDagY/PFS94d+g4g4atA4CLok0/d+DJe+S8Sm7prSk4d+nLozN/M8Fqg+l4b4HJrTS+S4o+rS9+bYQypGANM878Azl4bzQPUTcJFc98nSM4BYQ4fpA2bm7LrS3po4QyLplJ9pm8pP7wbYUJ0mA8dp7G7QjJ9LIzD8g/rQN8/m8qLEQ2BRS8dpFJDSbJ9prLoziGflMpgcEz74Q2epSPgbFP9QT+fL9J0YPaLpr8LSkLBFUpnMmag8g/jT+z7SQzn+fnS87LFShaL+oJA+AydkO8/+n4bYQ2rRA8rrA8nzDn0FjNsQhwaHCN/DI+AH9+0rEPaIj2erIH0iUP0SR',
                // 'x-t': '1694399065078'
            }
        }
    )
    console.log('UnfollowResponse is', UnfollowResponse.data);
}


follow();

// unfollow();
