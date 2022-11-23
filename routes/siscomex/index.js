const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('oi')
})

// sub-routes
const status = require('./status');
app.use('/status', status);

module.exports = router;