const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Ticker Schema
 * @private
 */
const tickerSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
    index: true,
  },
  price_usd: {
    type: Number,
    required: true,
  },
  price_btc: {
    type: Number,
    required: true,
  },
  '24h_volume_usd': {
    type: Number,
    index: true,
    required: true,
  },
  market_cap_usd: {
    type: Number,
    required: true,
  },
  available_supply: {
    type: Number,
    required: true,
  },
  total_supply: {
    type: Number,
    required: true,
  },
  max_supply: {
    type: Number,
    required: true,
  },
  percent_change_1h: {
    type: Number,
    required: true,
  },
  percent_change_24h: {
    type: Number,
    required: true,
  },
  percent_change_7d: {
    type: Number,
    required: true,
  },
  last_updated: {
    type: Date,
    required: true,
    index: true
  },
});

/**
 * Statics
 */
tickerSchema.statics = {
  /**
   * List Coin Tickers in descending order of 'asOf' timestamp.
   *
   * @param {number} skip - Number of Coin tickers to be skipped.
   * @param {number} limit - Limit number of Coin tickers to be returned.
   * @returns {Promise<Coin[]>}
   */
  list({
    page = 1, perPage = 100,
  }, symbol) {
    const options = {symbol};

    return this.find(options)
      .sort({ last_updated: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

/**
 * @typedef Ticker Details
 */
module.exports = mongoose.model('Ticker', tickerSchema);
