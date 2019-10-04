/**
* @swagger
* /users/{userId}:
*   get:
*     tags:
*       - Users
*     name: getUsersById
*     summary: Get All By UsersId
*     security:
*       - bearerAuth: []
*     produces:
*       - application/json
*     parameters:
*       - name: userId
*         description: user's id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Items successfully fetched
*/

let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User = require('../../schema/user');

router.get('/api/users/:userId' , async (req, res) => {
  try {
    const { userId } = req.params;
    await User.find({ _id: userId }).then( user =>{
        if(!user){
            return res.status(200).json({
              message: "No User found",
              success: false
            });
        }else {
            return res.status(200).json({
              users: user,
              success: true
            });
        }
    });
    // res.json({ items: items });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      message : error.message,
      success: false
    });
  }
});

module.exports = router;
