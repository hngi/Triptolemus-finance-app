require('../../database/database');
let UserModel = require('../../schema/user')
const express = require('express');
const router = express.Router();


router.post('/api/v1/auth/register', function(req,res){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user = new UserModel({
        username: username,
        email: email,
        password: password
    })
    user.save()
        .then(doc => {
            let jsonDoc = doc.toJSON();
            delete jsonDoc.password;
            res.json(jsonDoc);
        })
        .catch(err=>{
            console.log(err);
            res.json({"registered":false});
        })


})



module.exports = router