const express = require('express');
const validate = require('express-validation');
const controller = require('../../../../controllers/coincap/coins.controller');
const authorize = require('../../../../middlewares/auth').authorize;
const Coins = require('../../../../models/coincap/coins.model');
const router = express.Router();
const {
  listCoins,
} = require('../../../../validations/coins.validation');

router
  .route('/')
  /**
   * @api {get} v1/coincap/coins List Coins
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
  .get(authorize(), validate(listCoins), controller.list);


module.exports = router;
