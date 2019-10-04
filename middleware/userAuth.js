const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const jwtsecret = process.env.JWT_KEY;
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }
  try {
    const decoded = jwt.verify(token, jwtsecret);
    // console.log(decoded)
    req.user = decoded._id;
    next();
  } catch (error) {
    res.status(401).send('Token is not valid');
  }
};
