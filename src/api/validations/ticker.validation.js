const Joi = require('joi');
const Ticker = require('../models/ticker.model');

module.exports = {

  // GET /v1/coin/:coin
  listCoin: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100)
    },
  },
};
