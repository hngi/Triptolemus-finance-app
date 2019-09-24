/**
* @swagger
* /auth/login:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: User sigin endpoint
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: input parameter are required
*       402:
*         description: Bad username, not found
*       403:
*         description: Username and password don't match
*/

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
            error: "email Field can't be empty" });
        }else if(password == '' || password == undefined){
            return res.status(401).json({ 
            error: "password Field can't be empty"});
        }else{
            try{
            User.findOne({email: email}).then( user => {
                if(!user){
                    return res.status(402).json({
                        error: 'User does not exist'});
                }
                bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch){
                        token = jwt.sign({_id: user._id},'secret');
                        return res.status(200).json({token: token, userDetails: user});
                    } else {
                        return res.status(403).json({error: 'Username or Password incorrect'});
                    }

                });
            });
        }catch(error){
            return res.status(400).json({error: error.errmsg});
        }
    }
});
module.exports = router;