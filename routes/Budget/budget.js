let express = require('express');
let router = express.Router();
let User = require('../../schema/user');
// const mongoose = require('mongoose');
// const userAuth = require('../../middleware/userAuth');

router.post('/api/users/:userId/setWeeklyBudget', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { budget } = req.body;
    // if (userId !== id) {
    //     return res.status(401).json({ error: 'Unauthorized user' });
    // }
    let user = await User.findOne({
      _id: userId
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

router.post('/api/users/:userId/setYearlyBudget', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { budget } = req.body;
    // if (userId !== id) {
    //     return res.status(401).json({ error: 'Unauthorized user' });
    // }
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

    if (duration === 'weekly') {
      const newBudget = await User.findByIdAndUpdate(userId, {
        weekly_budget: budget
      });
      return res.status(200).json({
        budget: newBudget
      });
    } else if (duration === 'monthly') {
      const newBudget = await User.findByIdAndUpdate(userId, {
        monthly_budget: budget
      });
      return res.status(200).json({
        budget: newBudget
      });
    } else if (duration === 'yearly') {
      const newBudget = await User.findByIdAndUpdate(userId, {
        yearly_budget: budget
      });
      return res.status(200).json({
        budget: newBudget
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
