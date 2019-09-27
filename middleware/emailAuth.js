const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const jwtsecret = process.env.JWT_KEY;
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({'message':'authorization denied'});
  }
  try {
    const decoded = jwt.verify(token, jwtsecret);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({'message':error.toString()});
  }
};