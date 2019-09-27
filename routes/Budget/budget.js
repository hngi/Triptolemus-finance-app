let express = require('express');
let router = express.Router();
const userAuth = require('../../middleware/userAuth');
const User = require('../../schema/user');

module.exports = router;

router.put('/api/users/:userId/setMonthlyBudget', userAuth, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { duration, amount } = req.body;
        // amount = parseInt(amount);
        const id = req.user;
        if (userId !== id) {
            return res.status(401).json({
                error: 'Unauthorized user'
            });
        }

        if (duration == 'monthly' && amount > 0) {
            res.status(400).json({
                error: "Budget amount is invalid"
            })
        }
        const newBudget = new User({ _id: userId })
        // newBudget = {
        //     monthly_budget: amount
        // }
        User.updateOne({_id: userId},{ $set: {monthly_budget: amount}}).then(
            () => {
                res.status(201).json({
                    message: "Thing updated successfully"
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