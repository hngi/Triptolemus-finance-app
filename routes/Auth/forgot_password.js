const express = require('express');
const emailAuth = require('../../middleware/emailAuth');
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN;
const API = process.env.API_KEY;
const triptolemusEmail = process.env.TRIP_EMAIL
const mailgun = require('mailgun-js')({ apiKey: API, domain: DOMAIN });

router.post('/api/auth/reset',emailAuth, async (req, res) => {
    console.log(req.email)
    const { password } = req.body
    User.find({email:req.email})
    return res.status(200).json({email:email})


});

router.post('/api/auth/forgot', async (req, res) => {
    const feUrl = 'http://127.0.0.1:3000'
    try {
    const { email } = req.body
    token = jwt.sign({email: email},process.env.JWT_KEY,{expiresIn: 60*15})
    const {header, payload, signature} = token.split(".")
    password_reset_link = feUrl + "/reset-password/" + header + "/" + payload + "/" + signature

    let msg = {
        from: triptolemusEmail,
        to: email,
        subject: "Password Reset Link",
        text: message
      };

    let mailOptions = {
        from: hostEmail,
        to: email,
        subject: 'TripToTracker - Password reset link',
        text: 'Please follow the link to reset your password ' + password_reset_link
    }

    transporter.sendMail(mailOptions, (error,info)=>{
        if (error){
            console.log(error)
            throw error
        } else {
            console.log(info.response)
            Response.status(200).json({message:"Email with password reset link sent",success:true})
        }
    })

    } catch(error){

        res.status(401).json({message:error})
    };
    


});


module.exports = router;