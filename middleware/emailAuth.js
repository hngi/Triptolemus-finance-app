const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const jwtsecret = process.env.JWT_KEY;
  const { header, payload, signature } = req.params;
  token = header + '.' + payload + '.' + signature;
  
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