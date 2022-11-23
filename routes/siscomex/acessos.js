const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const newMysql = require('../../src/database')

router.get('/', (request, response, next) => {    
    const data = request.body

	const mysql = newMysql(config.database);
	mysql.connect();
	
	mysql.query({
		sql: `SELECT * FROM ?`,
		timeout: 40000,
        values: [ data.table ]
	}, (error, results) => {
		if (error) console.error(error);

        console.log(results)
        response.json(results)

	});


});

module.exports = router;