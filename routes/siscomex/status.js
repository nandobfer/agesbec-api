const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const newMysql = require('../../src/database')

router.get('/', (request, response, next) => {    

	const mysql = newMysql(config.database);
	mysql.connect();
	
	mysql.query({
		sql: `SELECT * FROM activity`,
		timeout: 40000, // 40s
	}, (error, results) => {
		if (error) console.error(error);

        const lastping = results[0].lastping

        mysql.query({
            sql: 'SELECT NOW()',
            timeout: 40000
        }, (error, results) => {
            if (error) console.error(error)
            console.log(results)

            response.json({lastping, results})
            mysql.end()
        })

	});


});

module.exports = router;