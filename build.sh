# 流水线构建打包脚本
npm config list --json --long && \
echo "run commit-hash" && \
npm run commit-hash && \
echo "clean directories" && \
rm -rf ./dist && \
echo "install dependencies" && \
npm ci && \
echo "create zip file" && \
zip -r dist.zip .
ls -alh