const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const { post } = require('../src/puppeteerAutoPost/index');

// ctx：上下文(Context)
app.use(cors({
    origin: 'http://localhost:8001',
    credentials: true
}));

app.use(bodyParser());

app.use(async ctx => {
    console.log('ctx request body is: ', ctx.request.body);
    const articleTitle = ctx.request.body.title;
    const articleContent = ctx.request.body.content;
    const imgUrl = ctx.request.body.imgUrl;
    let share_link = await post(articleTitle, articleContent, imgUrl);
    console.log('service中返回的share_link是：', share_link);
    ctx.body = {
        code: 200,
        message: 'success',
        data: {
            share_link: share_link
        }
    };
});


app.listen(3000);