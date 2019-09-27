let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User=require('../../schema/user')

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
