const httpStatus = require('http-status');
const { handler: errorHandler } = require('../middlewares/error');
const Coins = require('../models/coins.model');
const axios = require('axios');
const { forEach } = require('lodash');

const saveCoin = (value) => {
  let coin;
  try {
    coin = new Coins(value);
    const savedCoin = coin.save();
  } catch(e) {
    console.log(e);
  }
}

/**
 * Get coins list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let coins = await Coins.count();
    console.log(coins);
    if(coins === 0) {
      const url = 'https://www.cryptocompare.com/api/data/coinlist/';
      const response = await axios.get(url, {  });
      if(response && response.data && response.data.Data) {
        let processedData = [];
        forEach(response.data.Data, function(value, key) {
          processedData.push(value);
        });
        await Coins.create(processedData);
      }
    }
    coins = await Coins.list(req.query);
    const transformedCoins = coins.map(coin => coin.transform());
    res.json(transformedCoins);
  } catch (error) {
    next(error);
  }
};
