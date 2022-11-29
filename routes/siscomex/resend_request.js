const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const exec = require('child_process').exec;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    
    const request = data.request.body
    console.log(request)
    const command = `python3 /home/suporte/siscomex/src/Receita.py ${request}`
    console.log(request)
    
    // exec(command, (error, stdout, stderr) => {
    //     // console.log(stdout)

    //     response.json({test: 'success'})
    // })

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
