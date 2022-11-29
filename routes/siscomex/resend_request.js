const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const exec = require('child_process').exec;
const PythonShell = require('python-shell').PythonShell;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    
    const request = data.request.body
    const command = `cd /home/suporte/siscomex && python3 src/Receita.py '${JSON.stringify(request)}'`

    const options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'],
        scriptPath: '/home/suporte/siscomex',
        args: [`'${JSON.stringify(request)}'`]
      };

      PythonShell.run('resend_request.py', options, function (err, results) {
        if (err) 
          throw err;
        // Results is an array consisting of messages collected during execution
        for (let message of results) {
            console.log(message)
        }

        response.send(JSON.stringify(results))
      });

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
