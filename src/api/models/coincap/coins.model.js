const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');

/**
 * Coins Schema
 * @private
 */
const coinsSchema = new mongoose.Schema({
  symbol: {
    type: String,
    index: true,
    required: true,
  },
  name: {
    type: String,
    index: true,
  }
  }, {
  timestamps: true,
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
coinsSchema.pre('validate', async function validate(next) {
  try {
    console.log("Coming here for validate method");
    this.TotalCoinsFreeFloat =  parseFloat(this.TotalCoinsFreeFloat) || 0;
    this.TotalCoinSupply =  parseFloat(this.TotalCoinSupply) || 0;
    this.PreMinedValue =  parseFloat(this.PreMinedValue) || 0;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Statics
 */
coinsSchema.statics = {

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
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

/**
 * @typedef Coins
 */
module.exports = mongoose.model('Coincap.Coins', coinsSchema);
