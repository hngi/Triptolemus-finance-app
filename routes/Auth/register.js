require('../../database/database');
const jwt = require('jsonwebtoken');
let UserModel = require('../../schema/user')
const express = require('express');
const router = express.Router();


router.post('/api/auth/register', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if ((username == "" || username == undefined) || (email == "" || email == undefined) || (password == "" || password == undefined)) {
        res.status(401)
        res.json({ error: "Input Fields can't be empty" })
    } else {

        try {

            let user = new UserModel({
                username: username,
                email: email,
                password: password
            })
            let userDoc = await user.save()
            userDocJson = userDoc.toJSON()
            delete userDocJson.password
            userDocJson["token"] = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            res.status(200)
            res.json(userDocJson)
        } catch (error) {
            res.status(401)
            if (error.errmsg.toString().includes("duplicate key error collection")) {
                res.json({ error: "User already exist" })
            } else {res.json({ error: error.errmsg.toString })

            }





        }

    }


})



module.exports = router