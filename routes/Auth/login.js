const express = require('express');
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (email == '' || password == '' || email == null || password == null) {
    return res.status(401).json({
      message: 'Input field is required',
      success:false
    });
  }
  try {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        console.log('..........');
        return res.status(200).json({
          message: 'Invalid credentials',
          success: false
        });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          token = jwt.sign({ _id: user._id }, 'secret');
          let userJSON = user.toJSON();

          delete user.password;
          return res.status(200).json({
            token: token,
            user: userJSON,
            success: true
          });
        } else {
          return res.status(200).json({
            message: 'Invalid credentials',
            success: false
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});
module.exports = router;
