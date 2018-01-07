const express = require('express');
const coinsRoutes = require('./coins.route');
const coinRoutes = require('./coin.route');
const coinCapRoutes = require('./coincap');

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
router.use('/coincap', coinCapRoutes);

module.exports = router;
