const express = require('express');
const router = express.Router();
const config = require('../../config.json')

router.post('/', (request, response, next) => {    
    const data = request.body
    const cert = config.certificate

    console.log(cert)
    console.log(data)

    response.json({test: cert})

});

module.exports = router;
