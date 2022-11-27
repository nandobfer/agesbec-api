const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const exec = require('child_process').exec;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    console.log(data)
    // const command = `echo "${data}"`
    
    // exec(command, (error, stdout, stderr) => {
    //     console.log(stdout)
    //     response.json({test: stdout})
    // })

});

module.exports = router;
