const express = require('express');
const emailAuth = require('../../middleware/emailAuth');
const User = require('../../schema/user');
const Item = require('../../schema/item');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN;
const API = process.env.API_KEY;
const tripHostEmail = process.env.TRIP_EMAIL;
const mailgun = require('mailgun-js')({ apiKey: API, domain: DOMAIN });
const nodemailer = require('nodemailer');
const tripHostEmailPass = process.env.TRIP_EMAIL_PASS;

router.post('/api/auth/reset', emailAuth, async (req, res) => {
  const { password } = req.body;
  if (req.email == undefined && req.tokenExpired) {
    return res.status(200).json({
      message: 'Link Expired, please request for a new link',
      success: false
    });
  }
  if (password == '' || password == undefined) {
    return res
      .status(200)
      .json({ message: 'Password field cannot be empty', success: false });
  }
  try {
    let user = await User.findOne({ email: req.email });
    user.password = password;
    user = await user.save();
    return res.status(200).json({
      message: 'Password reset succesful',
      email: req.email,
      success: true
    });
  } catch (error) {
    return res.status(200).json({ message: error, success: false });
  }
});

module.exports = router;