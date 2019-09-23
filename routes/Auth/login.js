const express = require('express');
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    // const {errors, isvalid} = validateLoginInput(req.body);

        const username = req.username;
        const password = req.password;
        User.findOne({username: username}).then( user => {
                if(!user){
                    return res.status(404).json({'respCode': '99', 'respMsg': 'User does not exist', 'token': null, 'userDetails': null});
                }

            bcrypt.compare(password, user.password).then(isMatch => {
                let token = null;
                let respCode = '';
                let respMsg = '';
                let userDetails = null;
                if(isMatch){
                    const payload = {username : user.username};
                    token = jwt.sign(payload,'secret', {
                        expiresIn: null
                      });
                    respCode = '00';
                    respMsg = 'SUCCESS';
                    userDetails = user;
                    return res.status(200).json({'respCode': respCode, 'respMsg': respMsg, 'token': token, 'userDetails': userDetails});
                } else {
                    respCode = '99';
                    respMsg = 'FAILED';
                    userDetails = null;
                    return res.status(400).json({'respCode': respCode, 'respMsg': respMsg, 'token': token, 'userDetails': userDetails});
                }

            });
        });
});
module.exports = router;