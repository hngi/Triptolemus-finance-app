const jwt = require('jsonwebtoken');
let UserModel = require('../../schema/user');
const express = require('express');
const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
  let { username, email, password } = req.body;
  try {
    if (
      username == '' ||
      username == undefined ||
      (email == '' || email == undefined) ||
      (password == '' || password == undefined)
    ) {
      return res.status(401).json({
        error: 'Input field is required'
      });
    }
    let user = new UserModel({
      username: username,
      email: email,
      password: password
    });
    let userDoc = await user.save();
    userDocJson = userDoc.toJSON();
    delete userDocJson.password;
    userDocJson['token'] = jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_KEY
    );
    res.status(200).json(userDocJson);
  } catch (error) {
    if (
      error.hasOwnProperty('errmsg') &&
      error.errmsg.includes('E11000 duplicate key error collection')
    ) {
      return res.status(401).json({
        error: 'User already exists'
      });
    } else {
      res.status(400).json({
        error: error.toString()
      });
    }
  }
});

module.exports = router;
