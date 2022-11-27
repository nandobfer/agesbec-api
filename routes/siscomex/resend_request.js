const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const exec = require('child_process').exec;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    
    const request = data.request.body
    console.log(request)
    const command = `echo "${JSON.stringify(request)}"`
    
    exec(command, (error, stdout, stderr) => {
        console.log(stdout)
        response.json({test: stdout})
    })

});

module.exports = router;
