const httpStatus = require('http-status');
const { handler: errorHandler } = require('../../middlewares/error');
const Coins = require('../../models/coincap/coins.model');
const axios = require('axios');
const { forEach } = require('lodash');

/**
 * Get coins list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let coins = await Coins.count();
    console.log(coins);
    if(coins === 0) {
      const url = 'http://coincap.io/map/';
      const response = await axios.get(url, {  });
      console.log(response.data);
      if(response && response.data) {
        await Coins.create(response.data);
      }
    }
    coins = await Coins.list(req.query);
    res.json(coins);
  } catch (error) {
    next(error);
  }
};
