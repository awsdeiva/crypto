const express = require('express');
const coinsRoutes = require('./coins.route');
const tickerRoutes = require('./ticker.route');

const router = express.Router();

router.use('/ticker', tickerRoutes);
router.use('/coins', coinsRoutes);

module.exports = router;
