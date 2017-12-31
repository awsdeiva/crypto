const express = require('express');
const coinsRoutes = require('./coins.route');
const coinRoutes = require('./coin.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/coins
 */
router.use('/coins', coinsRoutes);
router.use('/coin', coinRoutes);

module.exports = router;
