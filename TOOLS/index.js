'use strict';
const cron = require('./cron')
const Toolings = {
    google : require('./google'),
    proxy: require('./proxy'),
    // image: require('./image'),
}

module.exports = class TOOLS{
    constructor({req, res, command}){
        this.req = req
        this.res = res
        this.command = command
        for(const ToolName in Toolings){ //load all toolings as that functname
            for( const functName in Toolings[ToolName]){
                //check nama fungsi sebelumnya apakah ada yang sama
                if(this[functName]) throw new Error("Nama Fungsi sudah pernah dipakai, pakai nama fungsi lain")
                this[functName] =  Toolings[ToolName][functName]//(this)
            }
        }
        //console.log(this);
    }
}