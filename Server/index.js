'use strict';

const express = require("express");
const fileUpload = require('express-fileupload');
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const mix = require('merge-descriptors')
const Template = __dirname+"/../Template/"

const HandleRequest= require('./HandleRequest')



exports = module.exports = CreateApp

function    CreateApp(){
    const app = express();
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Last-Modified', (new Date()).toUTCString());
        next();
    });
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(fileUpload());
    // set folders with templates
    var env = nunjucks.configure([Template], { autoescape: true, express: app });
    
    
    

    app. get('*', HandleRequest.GetRequest)
    app. post('*', HandleRequest.PostRequest)


    return app;

}