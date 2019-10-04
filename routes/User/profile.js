let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User = require('../../schema/user');
let Item = require('../../schema/item');

router.get('/api/users/:userId/profile', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const id = req.user;

    const user = await User.find({
      _id: userId
    });
    if (!user) {
      res.status(200).json({
        message: 'Error, profile not found',
        success: false
      });
    }
    res.status(200).json({
      user: user,
      success: true
    });
  } catch (error) {
    res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});

router.put('/api/users/:userId/profile' , async (req, res) => {
  try {
    const userId = req.params
    const { first_name, last_name, email, phone_number, gender, date_of_birth } = req.body;
    await User.find({ _id: userId }).then( user =>{
        if(!user){
            return res.status(200).json({
              message: "No User found",
              success: false
            });
        }else {
            User.findOneAndUpdate({_id: userId}, {$set:{first_name: first_name, last_name: last_name,
                 email: email, phone_number: phone_number, gender: gender, date_of_birth: date_of_birth}},{new: true})
                 .then( resp =>{
                     if(resp){
                        return res.status(200).json({
                            message: resp,
                            success: true
                          });
                     } else {
                        return res.status(200).json({
                            message: "No User found",
                            success: false
                          });
                     }
                 });
        }
    });
  } catch (error) {
    return res.status(200).json({
      message : error,
      success: false
    });
  }
});

module.exports = router;