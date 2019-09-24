/**
* @swagger
* /auth/register:
*   post:
*     tags:
*       - Users
*     name: Register
*     summary: API to create user account
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             username: 
*               type: string
*             email:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - email
*           - password
*     responses:
*       200:
*         description: User successfully added
*       400:
*         description: Unexceptated Error
*       401:
*         description: input parameter are required
*/

require('../../database/database');
const jwt = require('jsonwebtoken');
let UserModel = require('../../schema/user');
const express = require('express');
const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  if (
    username == '' ||
    username == undefined ||
    (email == '' || email == undefined) ||
    (password == '' || password == undefined)
  ) {
    return res.status(401).json({ error: "Input Fields can't be empty" });
  } else {
    try {
      let user = new UserModel({
        username: username,
        email: email,
        password: password
      });
      let userDoc = await user.save();
      userDocJson = userDoc.toJSON();
      delete userDocJson.password;
      userDocJson['token'] = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      res.status(200).json(userDocJson);
    } catch (error) {
      if (error.errmsg.toString().includes('duplicate key error collection')) {
        return res.status(401).json({ error: 'User already exists' });
      } else {
        res.status(400).json({ error: error.errmsg.toString });
      }
    }
  }
});

module.exports = router;
