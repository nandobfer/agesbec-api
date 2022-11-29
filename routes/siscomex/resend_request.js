const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const newMysql = require('../../src/database')
const PythonShell = require('python-shell').PythonShell;

router.post('/', (_request, response, next) => {    
    const data = _request.body
    const mysql = newMysql(config.database);
    
    const request = data.request.body
    const command = `cd /home/suporte/siscomex && python3 src/Receita.py '${JSON.stringify(request)}'`

    const options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'],
        scriptPath: '/home/suporte/siscomex',
        args: [`${JSON.stringify(request)}`]
      };

      PythonShell.run('resend_request.py', options, function (err, results) {
        if (err) 
          throw err;
        // Results is an array consisting of messages collected during execution
        const sis_reponse = JSON.parse(results[0])
        console.log(sis_reponse)

        mysql.connect();
        
        mysql.query({
            sql: `UPDATE acessos SET status = ? where id = ? `,
            timeout: 40000,
            values: [
                JSON.stringify(sis_reponse),
                sis_reponse.request.body.idEvento,
            ]
        }, (error, results) => {
            if (error) {
                console.error(Error)
            } else {

                mysql.query({
                    sql: 'SELECT * FROM acessos ORDER BY id DESC',
                    timeout: 40000,
                }, (error, results) => {
                    if (error) {
                        console.error(error)
                        mysql.end()
                    } else {
                        response.json(results)
                        mysql.end()
                    }
                })
            }

        });

      });

});

module.exports = router;
