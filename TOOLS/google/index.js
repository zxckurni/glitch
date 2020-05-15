'use strict';

module.exports = {
    IndexGoogle: function(){
        let {Proxy, res, req, req:{query:{domain}}} = this
        if(!domain || !/\.[a-z]{2,}/i.test(domain)) return res.end('domain?')
        req.query = {
            url : `https://www.google.com/search?q=site:${domain}`,
            Headers : {
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
            }
        }
        Proxy(this, respon=>{
            let resultCount = respon.match(/(id=['"]result-stats['"]>)([^<]+)/ig)
            if(!resultCount) 
            return res.json({
                domain, status:'NoIndex', count: 0
            }).end()
            resultCount = resultCount[0].replace(/[^\d,]/g,'')
            return res.json({
                domain,status:'Terindex',count:resultCount
            }).end()
        
        })
        
    }
}