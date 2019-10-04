/**
* @swagger
* /users/edit:
*   put:
*     tags:
*       - Users
*     name: editUser
*     summary: edit User
*     security:
*       - bearerAuth: []
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
*             user_id:
*               type: string
*             first_name:
*               type: string
*             last_name:
*               type: string
*             email:
*               type: string
*             phone_number:
*               type: string
*             gender:
*               type: string
*             date_of_birth:
*               type: date
*         required:
*           - user_id
*     responses:
*       200:
*         description: Items successfully fetched
*/

let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User = require('../../schema/user');
let Item = require('../../schema/item');

router.put('/api/users/edit' , async (req, res) => {
  try {
    const { user_id, first_name, last_name, email, phone_number, gender, date_of_birth } = req.body;
    await User.find({ _id: user_id }).then( user =>{
        if(!user){
            return res.status(400).json({
              message: "No User found",
              success: false
            });
        }else {
            User.findOneAndUpdate({_id: user_id}, {$set:{first_name: first_name, last_name: last_name,
                 email: email, phone_number: phone_number, gender: gender, date_of_birth: date_of_birth}},{new: true})
                 .then( resp =>{
                     if(resp){
                        return res.status(200).json({
                            message: resp,
                            success: true
                          });
                     } else {
                        return res.status(400).json({
                            message: "No User found",
                            success: false
                          });
                     }
                 });
        }
    });
    // res.json({ items: items });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message : error.message,
      success: false
    });
  }
});

module.exports = router;
