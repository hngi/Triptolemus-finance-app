const express = require('express');
const emailAuth = require('../../middleware/emailAuth');
const User = require('../../schema/user');
const Item = require('../../schema/item');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN;
const API = process.env.API_KEY;
const tripHostEmail = process.env.TRIP_EMAIL
const mailgun = require('mailgun-js')({ apiKey: API, domain: DOMAIN });
const nodemailer = require('nodemailer');
const tripHostEmailPass = process.env.TRIP_EMAIL_PASS

router.post('/api/auth/reset',emailAuth, async (req, res) => {
    console.log(req.email)
    const { password } = req.body
    if (req.email==undefined && req.tokenExpired){return res.status(200).json({message:"Link Expired, please request for a new link",success:false})}
    if (password==''||password==undefined){
        return res.status(200).json({message:"Password field cannot be empty",success:false})
    }
    try{
    let user = await User.findOne({email:req.email})
    console.log(user)
    user.password = password;
    user = await user.save();
    return res.status(200).json({message:"Password reset succesful",email:req.email,success:true})
    } catch(error){
        console.log(error)
        return res.status(200).json({message:error,success:false})
    }


});

// router.get('/drop/user', async(req, res)=>{
// User.collection.drop();
// return res.status(200).json({message:"collection drop"})
// });

// router.get('/drop/item', async(req, res)=>{
//     Item.collection.drop();
//     return res.status(200).json({message:"collection drop"})
// });


router.post('/api/auth/forgot', async (req, res) => {
    console.log(tripHostEmailPass)
    const feUrl = 'http://127.0.0.1:3000'
    try {
    const { email } = req.body
    if (email == '' || undefined){
        return res.status(200).json({message:"Email can't be empty",success:false})
    }
    user = await User.findOne({
        email: email
    })
    if (!user){
        return res.status(200).json({message:"Email not registered",success:false})
    }
    token = jwt.sign({email: email},process.env.JWT_KEY,{expiresIn: 60*15})

    password_reset_link = feUrl + "/reset-password/" + token.split('.').join('/')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: tripHostEmail,
               pass: tripHostEmailPass
           }
       });

    let msg = {
        from: tripHostEmail,
        to: email,
        subject: "Password Reset Link",
        text: password_reset_link
      };
      
        //mailgun.messages().send
        transporter.sendMail (msg, (error, body) => {
        if (error) {
          console.log(error);
          res.status(200).json({message:'Could not send Email',success:false});
        } else {
          res.status(200).json({message:'Password Reset Link Sent to ' + msg.to+ "\n" +" expires in 15 minutes",success:true});
          console.log(body);
        }
      });

  } catch (error) {
      console.log(error)
    res.status(200).json({ message: error ,success:false});
  }
});

module.exports = router;
