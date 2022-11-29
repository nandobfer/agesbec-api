const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const newMysql = require('../../src/database')

router.post('/', (request, response, next) => {    
    const data = request.body
	const mysql = newMysql(config.database);
	mysql.connect();

    console.log(data)
	
	// mysql.query({
	// 	sql: `SELECT * FROM acessos WHERE nome LIKE "%?%" order by id DESC`,
	// 	timeout: 40000,
    //     values = [

    //     ]
	// }, (error, results) => {
	// 	if (error) console.error(error);
    //     response.json(results)
    //     mysql.end()

	// });


});

module.exports = router;
