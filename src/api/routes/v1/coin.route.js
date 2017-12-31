const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/coin.controller');
const authorize = require('../../middlewares/auth').authorize;
const Ticker = require('../../models/ticker.model');
const router = express.Router();
const {
  listCoin,
} = require('../../validations/ticker.validation');

router
  .param('coin', controller.load);

router
  .route('/fetch')
  /**
   * @api {get} v1/coin/fetch update coin ticker details
   * @apiDescription Get this latest update for the Coins
   * @apiVersion 1.0.0
   * @apiName UpdateCoinTicker
   * @apiGroup Coin
   *
   * @apiSuccess {Object[]} coins List of coins.
   *
   */
  .get(authorize(), controller.fetch);

router
  .route('/:coin')
  /**
   * @api {get} v1/coins List Coins
   * @apiDescription Get this list of Coins
   * @apiVersion 1.0.0
   * @apiName ListCoins
   * @apiGroup Coins
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Object[]} coins List of coins.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(listCoin), controller.list);


module.exports = router;
