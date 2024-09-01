const crypto = require('crypto');


function crackXSign(br, fr, e, vr) {

    console.log('接收到的参数', br, fr, e, vr);

    let preMd5 = ''

    let stringvr = JSON.stringify(vr);

    console.log('stringvr is', stringvr);

    preMd5 = `${br}${fr}${e}${stringvr}`

    console.log('preMd5 is', preMd5);

    const hash = crypto.createHash('md5');

    hash.update(preMd5);

    const md5 = hash.digest('hex');
    console.log('md5 is', md5);
    console.log('md5长度', md5.length);

    return Buffer.from(md5).toString('base64');
}


module.exports = {
    crackXSign: crackXSign
}