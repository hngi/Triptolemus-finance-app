const express = require('express');
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/auth/login', async (req, res) => {
    const email = req.body.email, password = req.body.password;
    let token = null, respCode = '', respMsg = '', userDetails = null;

    if ( email == '' || email == undefined) {
            return res.status(401).json({ 
            respCode: '99',
            respMsg: "email Field can't be empty",
            token: token,
            userDetails: userDetails });
        }else if(password == '' || password == undefined){
            return res.status(401).json({ 
            respCode: '99',
            respMsg: "password Field can't be empty",
            token: token,
            userDetails: userDetails });
        }else{
            try{
            User.findOne({email: email}).then( user => {
                if(!user){
                    return res.status(401).json({
                        respCode: '99',
                        respMsg: 'User does not exist',
                        token: null,
                        userDetails: null});
                }
                bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch){
                        token = jwt.sign({_id: user._id},'secret');
                        return res.status(200).json({respCode: '00', respMsg: 'SUCCESS', token: token, userDetails: user});
                    } else {
                        return res.status(400).json({respCode: '99', respMsg: 'FAILED', token: null, userDetails: null});
                    }

                });
            });
        }catch(error){
            return res.status(400).json({respCode: respCode, respMsg: error.errmsg.toString, token: token, userDetails: userDetails});
        }
    }
});
module.exports = router;