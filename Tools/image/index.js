'use strict'
const request = require('request')
const sharp = require('sharp')
const Crypto = require('./Crypto')
/**
 * 
 * untuk pengenkripsian url gambar, harus ada title dan url image asli
 * title digunakan sebagai passprash
 * Encrypt ===> /ImageEncrypt/?url=https://cf.shopee.co.id/file/0bf0b273daf115719faa19b8d6c8972b&title=cat+breed
 * Decrypt/view ===> Image/U2FsdGVkX192NSCoL8sy+o2kP+S5eWc/EnZ2DKpNOW15ZTqxKy1opntuIDycyuOeoyp/UtkPI+3TB2amFEGDqS7t9OWEVjxXLcl8UHofjRc5qmX9QKL+SECEMBPbatV/UDg8IMT2zThOyBPCzYPLrJao7Sq3VlOmuQ/cat-breed.jpg
 * lihat url decrypt kasih ?Decrypt=OK
 * */
module.exports = {
    Pass: "+AqilaZahra", //title +
    timeout: 1e4,
    Image: function () {
        let {
            res,
            req: {
                params
            },
            req: {
                query
            }
        } = this
        let data = params["0"].match(/\/Image\/(.*?)\/(.[^\/]+)\.(jpg|jpeg)$/i) //home, namafungsi, urlEnc, Pass
        if (!data) return res.sendStatus(404)
        let [a, encUrl, title, format] = data
        let Pass = title + this.Pass
        try {
            let decUrl = Crypto.decrypt(encUrl, Pass)
            if (!decUrl || !/http/.test(decUrl)) return res.sendStatus(404)
            if (query.Decrypt && query.Decrypt === 'OK') return res.end(decUrl)
            // sharp('C:/Users/E-Abi/Downloads/600.png').modulate({
            //     brightness: 1 // increase lightness by a factor of 1
            // }).pipe(res)
            // return
            
            var transformer = sharp()
                .modulate({
                    brightness: 1 // increase lightness by a factor of 1
                })
                  
            const j = request.jar()
            request.get(decUrl, {
                encoding: null,
                timeout: this.timeout,
                jar: j,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    Referer: decUrl
                }
            }, err => err && res.sendStatus(504))
            .pipe(transformer).on('error', e=>res.status(500).end('Image Error') )
            .pipe(res).on('error', e=>res.status(500).end('Transfer Image Error'))

        } catch (e){console.log(e);
            return res.sendStatus(404)
        }

    },
    ImageEncrypt: function () {
        //untuk mengenkripsi url image
        let {
            res,
            req: {
                query: {
                    title = '',
                    url
                }
            }
        } = arguments[0] || this
        if (!url) return res.send('url ??')
        let Pass = title + this.Pass
        let enc = Crypto.encrypt(url, Pass)
        res.json({
            status: 'OK',
            Encrypted: enc.toString().replace(/=/g, ''),
            url,
            Pass,
            title
        })


    }
}