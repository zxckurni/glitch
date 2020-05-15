'use strict';
const request = require('request')
module.exports = {
    Proxy: function(){
        let [data, cb]= arguments.length ? arguments : [this, null]
        const {res, req:{headers={}}, req:{query:{url,Headers,type, noBody}}} = data
        if(!url) return res.end('query:{url,Headers,type, noBody} ??')
        if(noBody) return request.head(url, (err, {statusCode} , body)=>{
            if(cb) return cb(body)
            return res . json({statusCode}).end()
        })
        const requestSettings = {
            url,
            headers: {
                'User-Agent': headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                ...Headers
            }
        };
        if(type && type=='image'  || url.match(/png|jpg|ico|bmp|jpeg/i)) requestSettings.encoding = null 
        request(requestSettings, function(error, response, body) {
            if(!response) return res.status(500).send('No respon from ' + url)
            if(cb) return cb(body)
            
            res . setHeader('Content-Type', response.headers['content-type'] || 'application/json')
            res . send(body)
            res . end()
        });
    }
}