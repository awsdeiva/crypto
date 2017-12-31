const Joi = require('joi');
const Coins = require('../models/coins.model');

module.exports = {

  // GET /v1/coins
  listCoins: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(1000)
    },
  },
};
