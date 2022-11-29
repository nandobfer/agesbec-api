const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const newMysql = require('../../src/database')

router.post('/', (request, response, next) => {    
    const data = request.body
	const mysql = newMysql(config.database);
	mysql.connect();

    console.log(`SELECT * FROM acessos WHERE nome LIKE "%${data.name}%" order by id DESC`)

	mysql.query({
		sql: `SELECT * FROM acessos WHERE nome LIKE "%${data.name}%" order by id DESC`,
		timeout: 40000,
        values: [
            data.name
        ]
	}, (error, results) => {
		if (error) console.error(error);
        console.log(results)
        response.json(results)
        mysql.end()

	});


});

module.exports = router;
