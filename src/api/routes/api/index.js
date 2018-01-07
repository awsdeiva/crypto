const express = require('express');
const routes = require('./v1');
const router = express.Router();
router.use('/v1', routes);
module.exports = router;
