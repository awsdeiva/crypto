const httpStatus = require('http-status');
const { handler: errorHandler } = require('../middlewares/error');
const Ticker = require('../models/ticker.model');
const mongoose = require('mongoose');
const axios = require('axios');
const { forEach } = require('lodash');
const moment = require('moment');

const onInsert = (err, docs) => {
  if(err) {
    console.log(err);
  }
}

/**
 * Fetch the coin ticker and update it
 * @public
 */
exports.fetch = async (req, res, next) => {
  try {
      const url = 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=1500';
      const response = await axios.get(url, {  });
      if(response && response.data) {
          let processedData = [];
          forEach(response.data, function(value, key) {
              value.rank = parseInt(value.rank) || -1;
              value.price_usd = parseFloat(value.price_usd) || -1;
              value.price_btc = parseFloat(value.price_btc) || -1;
              value['24h_volume_usd'] = parseFloat(value['24h_volume_usd']) || -1;
              value.market_cap_usd = parseFloat(value.market_cap_usd) || -1;
              value.available_supply = parseFloat(value.available_supply) || -1;
              value.total_supply = parseFloat(value.total_supply) || -1;
              value.max_supply = parseFloat(value.max_supply) || -1;
              value.percent_change_1h = parseFloat(value.percent_change_1h) || -1;
              value.percent_change_24h = parseFloat(value.percent_change_24h) || -1;
              value.percent_change_7d = parseFloat(value.percent_change_7d) || -1;
              value.last_updated = moment((parseFloat(value.last_updated) || 0)*1000).utc().format();
              processedData.push(value);
          });
          Ticker.collection.insert(processedData, onInsert);
      }
      res.json({"status": "success"});
  } catch (error) {
    console.log(error);
    if(error && error.response && error.response.status) {
      if(error.response.status != 200) {
          res.json({"status": "empty"});
      }
    } else {
      next(error);
    }
  }
};

/**
 * Get coin ticker list
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    let coinTickers = await Ticker.list(req.query, id);
    req.locals = { coinTickers };
    return next();
  } catch (error) {
    next(error);
  }
};

exports.list = (req, res) => res.json(req.locals.coinTickers);
