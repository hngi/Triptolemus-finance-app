const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//load user model
const User = require('../schema/user');

class userAuth {

  /**
   * verify token 
   * @params {object} req
   * @params {object} res
   * @params {object} next
   * @return {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res.status(400).send({
        'message': 'You cant access this routes'
      });
    }
    try {
      const {
        _id
      } = await jwt.verify(token, process.env.JWT_KEY);
      const user = User.findOne({
        _id
      })
      if (!user) {
        return res.status(400).send({
          'message': 'The token you provided is invalid'
        });
      }
      req.user = {
        _id
      }
      next();
    } catch (e) {
      // return res.status(400).send(e);
      console.log(e);
    }
  }
}

module.exports = userAuth;