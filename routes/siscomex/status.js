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

        console.log(results)

        response.json(results)
        mysql.end()
	});


});

module.exports = router;