let express = require('express');
let router = express.Router();
<<<<<<< HEAD
let userAuth = require('../../middleware/userAuth');
let User=require('../../schema/user')
=======
let User = require('../../schema/user');
const mongoose = require('mongoose');

router.post('/api/users/:userId/setWeeklyBudget', userAuth, async (req, res) => {
  try {
		const { userId } = req.params;
        const id = req.user;
        let { budget } = req.body;
        if (userId !== id) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }
        let user = await User.find({
          id: userId
        });
        user.weekly_budget = budget;
        const updated_user = await user.save();
        res.status(200).json({
          user: updated_user
        });
  } catch (error) {
        console.log(error.message);
  }
});

router.post('/api/users/:userId/setYearlyBudget', userAuth, async (req, res) => {
  try {
		const { userId } = req.params;
        const id = req.user;
        let { budget } = req.body;
        if (userId !== id) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }
        let user = await User.find({
          id: userId
      });
        user.yearly_budget = budget;
        const updated_user = await user.save();
        res.status(200).json({
          user: updated_user
        });
  } catch (error) {
        console.log(error.message);
  }
});
>>>>>>> ed5568a39e5734433c252265595de13ecb88adef

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
module.exports = router;
