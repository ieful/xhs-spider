FROM node:16

# 创建并设置工作目录
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .
# 容器启动
CMD ["npm", "run", "start"]
