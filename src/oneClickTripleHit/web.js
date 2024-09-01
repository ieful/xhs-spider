const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const chokidar = require('chokidar');
// const readline = require('readline');
const { sleep } = require('../utils');
const { cookies } = require('./config/cookies');
const { missions } = require('./config/missions');
// const path = require("path");

puppeteer.use(StealthPlugin());

// 一键三连
async function oneClickTripleHit(missions){
    console.time('一键三连耗时');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    for (let i = 0; i < missions.length; i++) {
        let articleLink = `https://www.xiaohongshu.com/explore/${missions[i].articleId}`;
        await page.goto(articleLink);
        // 关注
        await page.waitForSelector('.interaction-container');
        const followButtons = await page.$$('.follow');
        const followedButtons = await page.$$('.followed');
        if (followedButtons.length > 1) {
            console.log('已关注该作者无需重复关注');
        } else if (followButtons.length > 1) {
            await followButtons[1].click();
            console.log('关注成功!');
        } else {
            console.log('关注失败，没有找到正确的关注按钮，网页结构或已改变');
        }
        // 点赞
        await page.waitForSelector('.buttons');
        const interactionsButtons = await page.$$('.buttons');
        if (interactionsButtons.length) {
            const likeWrapper = await interactionsButtons[0].$('.like-wrapper');
            if (likeWrapper) {
                console.log('likeWrapper is', likeWrapper);
                const likeStatus = await likeWrapper.evaluate(() => {
                    return document.querySelector('.buttons').querySelector('.like-wrapper').querySelector('use').attributes['xlink:href'].value;
                });
                if (likeStatus === '#like') {
                    await likeWrapper.click();
                    console.log('点赞成功!');
                } else if (likeStatus === '#liked') {
                    console.log('已点赞了该文章，无需重复点赞');
                }
            } else {
                console.log('点赞失败，没有找到like-wrapper元素');
            }
        } else {
            console.log('点赞失败，没有找到正确的点赞按钮元素，网页结构或已改变');
        }
        // 评论
        await page.type('.comment-input', missions[i].comment);
        await page.waitForSelector('button.submit');
        await page.click('button.submit');
        console.log('评论成功!');
        console.timeEnd('一键三连耗时');
    }
}

oneClickTripleHit(missions);