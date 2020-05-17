'use strict'
const CronJob = require('cron').CronJob
const request = require('request')
var job = new CronJob(`30 4 * * * *`, function () {
    let List = ['https://skinny-wool-petroleum.glitch.me/','https://granite-cyan-surf.glitch.me/','https://freezing-spectacular-chronometer.glitch.me/','https://hilarious-inquisitive-odometer.glitch.me/']
    !function AdaJob(e,h,b){
        if(b)console.log(b);
        if(!List.length) return;
        let site = List.pop()
        request.get(site, {
            headers:{
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
            }
        }, AdaJob)
    }()
}, null, true, 'America/Los_Angeles');
job.start();