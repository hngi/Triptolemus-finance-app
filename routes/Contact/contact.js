const express = require('express');
const router = express.Router();
require('dotenv').config();

const DOMAIN = process.env.DOMAIN;
const API = process.env.API_KEY;

const mailgun = require('mailgun-js')({ apiKey: API, domain: DOMAIN });
router.post('/contact', (req, res) => {
  const { fullname, email, message } = req.body;

  let msg = {
    from: email,
    to:
      'codedcoderrr@gmail.com,teamtriptolemus@gmail.com',
    subject: `Enquiry from ${fullname}`,
    text: message
  };

  mailgun.messages().send(msg, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      res.send(msg);
      console.log(body);
    }
  });
});

module.exports = router;
