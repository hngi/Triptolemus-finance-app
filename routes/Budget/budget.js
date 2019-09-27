let express = require('express');
let router = express.Router();
let router = express.Router();
let User = require('../../schema/user');
const mongoose = require('mongoose');
userAuth = require('../../middleware/userAuth');

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


router.put('/api/users/:userId/setMonthlyBudget', userAuth, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { duration, amount } = req.body;
        const id = req.user;
        
        if (userId !== id) {
            return res.status(401).json({
                error: 'Unauthorized user'
            });
        }
        const newBudget = new User({ _id: userId })
        await User.updateOne({_id: userId},{ $set: {monthly_budget: amount}}).then(
            () => {
                res.status(201).json({
                    message: "Budget set successfully"
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
