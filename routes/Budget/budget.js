let express = require('express');
let router = express.Router();
let User = require('../../schema/user');
// const mongoose = require('mongoose');
// const userAuth = require('../../middleware/userAuth');

router.put('/api/users/:userId/update_budget', async (req, res) => {
  try {
    const { userId } = req.params;
    const { duration, budget } = req.body;
    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({
    //     error: 'Unauthorized user'
    //   });
    // }

//<<<<<<< HEAD
    if(duration === 'weekly'){
      let newBudget= await User.findByIdAndUpdate({ _id: userId },{weekly_budget:budget})
      const user = await User.find({ _id: userId });
      return res.status(200).json({
        budget: user
      });
    }
    else if(duration === 'monthly'){
      let newBudget = await User.findByIdAndUpdate({ _id: userId },{
        
// =======
//     if (duration === 'weekly') {
//       const newBudget = await User.findByIdAndUpdate(userId, {
//         weekly_budget: budget
//       });
//       return res.status(200).json({
//         budget: newBudget
//       });
//     } else if (duration === 'monthly') {
//       const newBudget = await User.findByIdAndUpdate(userId, {
// >>>>>>> 3841f8a27a6022632a713b6b5ade6980e5eacc1c
        monthly_budget: budget
      });
      const user = await User.find({ _id: userId });
      return res.status(200).json({
        budget: user
      });
//<<<<<<< HEAD
    }
    else if(duration === 'yearly'){
      let newBudget = await User.findByIdAndUpdate({ _id: userId },{  yearly_budget: budget });
      const user = await User.find({ _id: userId });
// =======
//     } else if (duration === 'yearly') {
//       const newBudget = await User.findByIdAndUpdate(userId, {
//         yearly_budget: budget
//       });
// >>>>>>> 3841f8a27a6022632a713b6b5ade6980e5eacc1c
      return res.status(200).json({
        budget: user
      });
    } else {
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

router.post('/api/users/:userId/setWeeklyBudget', async (req, res) => {
  try {
		const { userId } = req.params;
        const id = req.user;
        let { budget } = req.body;
        // if (userId !== id) {
        //     return res.status(401).json({ error: 'Unauthorized user' });
        // }
        let updated_user = await User.updateOne({ _id: userId }, {weekly_budget : budget }, {upsert:true});
        res.status(200).json({
          user: updated_user,
          message: "successfully upadated"
        });
  } catch (error) {
        console.log(error.message);
  }
});

router.post('/api/users/:userId/setYearlyBudget', async (req, res) => {
  try {
		const { userId } = req.params;
        const id = req.user;
        let { budget } = req.body;
        // if (userId !== id) {
        //     return res.status(401).json({ error: 'Unauthorized user' });
        // }
        let updated_user = await User.updateOne({ _id: userId }, {yearly_budget : budget }, {upsert:true});
        res.status(200).json({
          user: updated_user,
          message: "successfully upadated"
        });
  } catch (error) {
        console.log(error.message);
  }
});


// router.put('/api/users/:userId/setMonthlyBudget', userAuth, async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         const { budget } = req.body;
//         const id = req.user;
        
//         if (userId !== id) {
//             return res.status(401).json({
//                 error: 'Unauthorized user'
//             });
//         }
        
//         await User.updateOne({_id: userId},{ $set: {monthly_budget: budget}}).then(
//             () => {
//                 res.status(201).json({
//                     message: "Budget set successfully",
//                 });
//             }
//         ).catch(
//             error => {
//                 res.status(400).json({
//                     error: error
//                 })
//             }
//         );
// =======
// });
router.put('/api/users/:userId/setMonthlyBudget', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { budget } = req.body;
    const id = req.user;

    // if (userId !== id) {
    //     return res.status(401).json({
    //         error: 'Unauthorized user'
    //     });
    // }

    await User.updateOne({ _id: userId }, { $set: { monthly_budget: budget } })
      .then(() => {
        res.status(201).json({
          message: 'Budget set successfully'
        });
      })
      .catch(error => {
        res.status(400).json({
          error: error
        });
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
