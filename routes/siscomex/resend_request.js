const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const request = require('request')
const fs = require('fs')

router.post('/', (_request, response, next) => {    
    const data = _request.body
    const cert = {crt: config.certificate.dir + config.certificate.crt, pem: config.certificate.dir + config.certificate.pem}

    console.log(cert)
    console.log(data)

    const options = {     
        url: config.url,     
        headers: {       
          "User-Agent": "node.js"     
        },     
        strictSSL: false,     
        form: {       
          // currency, language, provider-specific options here     
        },     
        cert: fs.readFileSync(cert.crt),     
        key: fs.readFileSync(cert.pem),     
        passphrase: process.env.PASSPHRASE 
      };  
        
        request.post(options, (err, httpResponse, body) => { 
            console.log(body)
            response.json({test: body})
      })

});

module.exports = router;
