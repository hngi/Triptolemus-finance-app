const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


class Helpers {
  /**
   * generate Token Method
   * @params {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign({
      user_id: id
    }, process.env.JWY_KEY, {
      expiresIn: '1hr'
    });
    return token;
  }
}
module.exports = Helpers;