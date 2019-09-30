const express = require('express');
const router = express.Router();
require('dotenv').config();

const DOMAIN = process.env.DOMAIN;
const API = process.env.API_KEY;

const mailgun = require('mailgun-js')({ apiKey: API, domain: DOMAIN });
router.post('/contact', (req, res) => {
  const { fullname, email, message } = req.body;
  if (
    fullname == '' ||
    fullname == null ||
    email == '' ||
    email == null ||
    message == '' ||
    message == null
  ) {
    return res
      .status(200)
      .json({ message: 'All input fields are required', success: false });
  }
  let msg = {
    from: email,
    to: 'codedcoderrr@gmail.com,teamtriptolemus@gmail.com',
    subject: `Enquiry from ${fullname}`,
    text: message
  };

  mailgun.messages().send(msg, (error, body) => {
    if (error) {
    } else {
      res.status(200).json({ msg: msg, success: true });
    }
  });
});

module.exports = router;
