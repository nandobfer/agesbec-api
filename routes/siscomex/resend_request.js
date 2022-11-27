const express = require('express');
const router = express.Router();
const config = require('../../config.json')

router.post('/', (request, response, next) => {    
    const data = request.body
    const cert = {crt: config.certificate + config.certificate.crt, pem: config.certificate + config.certificate.pem}

    console.log(cert)
    console.log(data)

    response.json({test: cert})

});

module.exports = router;
