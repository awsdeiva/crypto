const httpStatus = require('http-status');
const { handler: errorHandler } = require('../../middlewares/error');
const CoinTicker = require('../../models/coincap/ticker.model');
const axios = require('axios');
const { forEach } = require('lodash');

/**
 * Get coins list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const url = 'http://coincap.io/front';
    const response = await axios.get(url, {  });
    var timeStamp = Date.now();
    if(response && response.data) {
      let processedData = [];
      forEach(response.data, function(value, key) {
        value.time = timeStamp;
        processedData.push(value);
      });

      await CoinTicker.create(processedData);
    }
    coins = await CoinTicker.list(req.query);
    res.json(coins);
  } catch (error) {
    next(error);
  }
};
