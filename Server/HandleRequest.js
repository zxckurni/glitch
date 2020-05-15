'use strict';

const Handle = exports = module.exports = {}
const TOOLS= require('./../TOOLS')

Handle.GetRequest = function ( req, res ){ //res.json({a:1}).end();return;
    const [home,command,param] = req.params[0].split('/'),
        Tools = new TOOLS({req, res, command})
    if(!command) return res. render('index.html', Tools.config)
    if(Tools[command]) return Tools[command]()
    res.sendStatus(404);
}

Handle.PostRequest = function( req, res ){
    const {command, vendor} = req.body,
        Tools = new TOOLS({req, res, command, vendor})
    if(command && Tools[command]) return Tools[command]()
    res.sendStatus(404);
}