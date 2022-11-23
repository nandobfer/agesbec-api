const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('oi')
})

// sub-routes
const status = require('./status');
router.use('/status', status);

module.exports = router;