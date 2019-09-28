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

    if (duration === 'Weekly') {
      let newBudget = await User.findByIdAndUpdate(
        { _id: userId },
        { weekly_budget: budget }
      );
      const user = await User.find({ _id: userId });
      return res.status(200).json({
        budget: user
      });
    } else if (duration === 'Monthly') {
      let newBudget = await User.findByIdAndUpdate(
        { _id: userId },
        {
          monthly_budget: budget
        }
      );
      const user = await User.find({ _id: userId });
      return res.status(200).json({
        budget: user
      });
    } else if (duration === 'Yearly') {
      let newBudget = await User.findByIdAndUpdate(
        { _id: userId },
        { yearly_budget: budget }
      );
      const user = await User.find({ _id: userId });
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
});

router.post('/api/users/:userId/setWeeklyBudget', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { budget, duration } = req.body;
    // if (userId !== id) {
    //     return res.status(401).json({ error: 'Unauthorized user' });
    // }
    if (duration == 'Weekly') {
      let updated_user = await User.updateOne(
        { _id: userId },
        { weekly_budget: budget },
        { upsert: true }
      );
      const user = await User.findOne({ _id: userId });
      console.log(user);
      res.status(200).json({
        weekly_budget: user.weekly_budget,
        message: 'Budget set successfully'
      });
    } else {
      return res.status(400).json({
        error: 'Error setting budget'
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/api/users/:userId/setYearlyBudget', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { budget, duration } = req.body;
    // if (userId !== id) {
    //     return res.status(401).json({ error: 'Unauthorized user' });
    // }
    if (duration == 'Yearly') {
      let updated_user = await User.updateOne(
        { _id: userId },
        { yearly_budget: budget },
        { upsert: true }
      );
      const user = await User.findOne({ _id: userId });
      console.log(user)
      res.status(200).json({
        user: user.yearly_budget,
        message: 'Budget set successfully'
      });
    } else {
      return res.status(400).json({
        error: 'Error setting budget'
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});
router.post('/api/users/:userId/setMonthlyBudget', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { budget, duration } = req.body;
    // if (userId !== id) {
    //     return res.status(401).json({ error: 'Unauthorized user' });
    // }
    if (duration == 'Monthly') {
      let updated_user = await User.updateOne(
        { _id: userId },
        { monthly_budget: budget },
        { upsert: true }
      );
      
      const user = await User.findOne({ _id: userId });
      res.status(200).json({
        user: user.monthly_budget,
        message: 'Budget set successfully'
      });
    } else {
      return res.status(400).json({
        error: 'Error setting budget'
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;