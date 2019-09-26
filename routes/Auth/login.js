const express = require('express');
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/auth/login', async (req, res) => {
  console.log(req.body)
  const email = req.body.email,
    password = req.body.password;

  if (email == '' || password == '') {
    return res.status(401).json({
      error: 'Input field is required'
    });
  }
  try {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          token = jwt.sign({ _id: user._id }, 'secret');
          userJSON = user.toJSON()
          delete userJSON.password
          return res.status(200).json({
            token,
            userJSON
          });
        } else {
          return res.status(401).json({
            error: 'Invalid credentials'
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});
module.exports = router;
