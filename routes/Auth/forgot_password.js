const express = require('express');
const emailAuth = require('../../middleware/emailAuth')
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/api/auth/reset', async (req, res) => {
    console.log(req.email)
    const { password } = req.body
    User.find({email:req.email})
    return res.status(200).json({email:email})


});


router.post('/api/auth/forgot',emailAuth, async (req, res) => {
    const hostEmail = 'winninggreat@gmail.com'
    const hostPass = '946okiki'
    try {
    const { email } = req.body
    token = jwt.sign({email: email},process.env.JWT_KEY,{expiresIn: ""})
    const {header, payload, signature} = token.split(".")
    password_reset_link = "http://127.0.0.1:3000/reset-password/" + header + "/" + payload + "/" + signature
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: hostEmail,
            pass: hostPass
        }
    });

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