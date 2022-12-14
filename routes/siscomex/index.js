const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('oi')
})

// sub-routes
const status = require('./status');
router.use('/status', status);

const acessos = require('./acessos');
router.use('/acessos', acessos);

const resend_request = require('./resend_request');
router.use('/resend_request', resend_request);

const search = require('./search');
router.use('/search', search);

const credenciamentos = require('./credenciamentos');
router.use('/credenciamentos', credenciamentos);

module.exports = router;