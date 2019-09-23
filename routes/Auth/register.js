require('../../database/database');
let UserModel = require('../../schema/user')
const express = require('express');
const router = express.Router();


router.post('/api/v1/auth/register',function(req,res){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    let user = new UserModel({
        username: username,
        email: email,
        password: password
    })
    user.save()
        .then(doc => {
            console.log(doc);
            res.json({"registered":true});
        })
        .catch(err=>{
            console.log(err);
            res.json({"registered":false});
        })


})



module.exports = router