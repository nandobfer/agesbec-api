const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const exec = require('child_process').exec;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    
    const request = data.request.body
    const spawn = require("child_process").spawn

    console.log(request)
    const pythonProcess = spawn('cd /home/suporte/siscomex && python3',["resend_request.py", `'${JSON.stringify(request)}'`]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(data)
    });

    response.json({test: 'success'})
});

router.get('/test', (request, response, next) => {
    const command = `python3 /home/suporte/siscomex/src/Receita.py testando argumentos`
    
    exec(command, (error, stdout, stderr) => {
        console.log(stdout)
        // const test = JSON.parse(stdout)
        // console.log(test)
        response.json({test: stdout})
    })
})

module.exports = router;
