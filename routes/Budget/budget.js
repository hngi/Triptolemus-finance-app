let express = require('express');
let router = express.Router();
<<<<<<< HEAD
let User = require('../../schema/user');
const mongoose = require('mongoose');
let userAuth = require('../../middleware/userAuth');
=======
let userAuth = require('../../middleware/userAuth');
let User=require('../../schema/user')
>>>>>>> ba8e5f4d9fa31a8795b2e7f85ee31505095a08a3

router.put('/api/users/:userId/update_budget',userAuth,async(req,res)=>{
  try {
    const { userId } = req.params;
    const { duration,budget } = req.body;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({
        error: 'Unauthorized user'
      });
    }

    else if(duration === 'weekly'){
      const newBudget= await User.findByIdAndUpdate(id,{weekly_budget:budget})
      return res.status(200).json({
        budget: newBudget
      });
    }
    else if(duration === 'monthly'){
      const newBudget = await User.findByIdAndUpdate(id,{
        
        monthly_budget: budget
      });
      return res.status(200).json({
        budget: newBudget
      });
    }
    else if(duration === 'yearly'){
      const newBudget = await User.findByIdAndUpdate(id,{  yearly_budget: budget });
      return res.status(200).json({
        budget: newBudget
      });
    }else{
      return res.status(400).json({
        error: 'Please enter either weekly,monthly or yearly'
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Error updating budget'
    });
  }
})
router.put('/api/users/:userId/setMonthlyBudget', userAuth, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { budget } = req.body;
        const id = req.user;
        
        if (userId !== id) {
            return res.status(401).json({
                error: 'Unauthorized user'
            });
        }
        
        await User.updateOne({_id: userId},{ $set: {monthly_budget: budget}}).then(
            () => {
                res.status(201).json({
                    message: "Budget set successfully",
                });
            }
        ).catch(
            error => {
                res.status(400).json({
                    error: error
                })
            }
        );

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
