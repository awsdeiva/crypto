const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');

/**
 * Coins Schema
 * @private
 */
const tickerSchema = new mongoose.Schema({
  short: {
    type: String,
    index: true,
    required: true,
  },
  volume: {
    type: Number,
    index: true,
  },
  price: {
    type: Number,
    index: true,
  },
  mktcap: {
    type: Number,
    index: true,
  },
  supply: {
    type: Number,
    index: true,
  },
  vwapData: {
    type: Number,
    index: true,
  },
  perc: {
    type: Number,
    index: true,
  },
  cap24hrChange: {
    type: Number,
    index: true,
  },
  time: {
    type: Number,
    index: true,
  }
  }, {
  timestamps: true,
});


/**
 * Statics
 */
tickerSchema.statics = {

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(Symbol) {
    try {
      let coin;

      const user = await this.findOne({ Symbol }).exec();
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'Coin does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List Coins in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of Coins to be skipped.
   * @param {number} limit - Limit number of Coins to be returned.
   * @returns {Promise<Coins[]>}
   */
  list({
    page = 1, perPage = 30,
  }) {
    const options = {};

    return this.find(options)
      .sort({ time: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

/**
 * @typedef Coins
 */
module.exports = mongoose.model('Coincap.ticker', tickerSchema);
