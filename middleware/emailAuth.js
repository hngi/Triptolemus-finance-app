const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const jwtsecret = process.env.JWT_KEY;
  const { token } = req.body;
  req.tokenExpired = false
  if (!token) {
    return res.status(401).json({'message':'authorization denied'});
  }
  try {
    const decoded = jwt.verify(token, jwtsecret);
    req.email = decoded.email;
    console.log(req.email)
    next();
  } catch (error) {
    if (error.hasOwnProperty('name') && error.name == 'TokenExpiredError'){
      req.tokenExpired = true
      return res.status(200).json({message:"Link Expired, please request for a new link",success:false})
    }
    
    return res.status(401).json({'message':error.toString()});
  }
};