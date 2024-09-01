const schedule = require('node-schedule');
const { main } = require('./crawl');
const { activateCookie } = require('./alive');
const { postDingMessage } = require('./pushDing');


// 全局异常捕获
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// 应用每次启动爬取一次数据（Cookie过期重置时）
// main().catch(e => {
//     console.log('main方法异常捕获', e);
//     postDingMessage({type: 'main'})
// });

// 爬取数据任务：每天下午5点爬取
const mainJob = schedule.scheduleJob('0 17 * * *', function(){
    main().catch(e => {
        console.log('main方法异常捕获', e);
        postDingMessage({type: 'main'});
    })
});

// cookie维活任务，每隔半小时请求一次
const liveCookieJob = schedule.scheduleJob('*/30 * * * *', function(){
    activateCookie();
});