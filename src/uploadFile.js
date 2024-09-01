const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const { getTokenPanApi } = require('@auto/pan.core');

async function uploadFileToPan(filePath, options) {
    const Pan = getTokenPanApi(options.token);

    if (!fs.existsSync(filePath)) {
        return Promise.reject(new Error(`上传失败, 本地文件${filePath}不存在`));
    }

    const link = await Pan.file.getUploadLink(options.repoId);
    const data = await promisify(fs.readFile)(filePath);
    const fileName = path.basename(filePath);

    const uploadResults = await Pan.file.upload({
        "data": data,
        "fileName": options.uploadFileName || fileName,
        "link": link
    });
    const item = uploadResults[0];
    return { fileName: item.name, downLoadLink: `https://pan.corpautohome.com/lib/acb3e5ce-8e7f-4393-94fa-cec9b2e92ee5/file/${options.uploadFileName}?dl=1`};
}

module.exports = {
    uploadFileToPan: uploadFileToPan
}
