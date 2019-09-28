let express = require('express');
let router = express.Router();
let moment = require('moment');
// let userAuth = require('../../middleware/userAuth');
let Item = require('../../schema/item');
const mongoose = require('mongoose');
const User = require('../../schema/user');

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

router.post('/api/users/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({
    //     error: 'Unauthorized user'
    //   });
    // }
    const { name, description, amount } = req.body;
    if (
      name == '' ||
      name == null ||
      description == '' ||
      description == null ||
      amount == '' ||
      amount == null
    ) {
      res.status(400).json({
        error: 'All input fields are required'
      });
    }
    const newItem = new Item({
      name,
      description,
      amount,
      user_id: userId,
      date: new Date()
    });
    const item = await newItem.save();
    res.status(200).json({
      item: item
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.get('/api/users/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({
    //     error: 'Unauthorized user'
    //   });
    // }
    const items = await Item.find({
      user_id: userId
    });
    if (!items) {
      res.status(200).json({
        items: null
      });
    }
    res.status(200).json({
      items: items
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.post('/api/users/:userId/calculate/week', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { startDate, endDate } = req.body;
    if (
      startDate == '' ||
      startDate == null ||
      endDate == '' ||
      endDate == null
    ) {
      return res.status(400).json({
        error: 'All input fields are required'
      });
    }
    let end_msec = Date.parse(endDate);
    end_date = new Date(end_msec);
    endDate = end_date.addDays(1);
    // if (userId !== id) {
    //   return res.status(401).json({ error: 'Unauthorized user' });
    // }
    Item.find({
      user_id: userId,
      date: { $gte: startDate, $lte: endDate }
    })
      .sort({ date: 1 })
      .then(doc => {
        //if (doc.length > 0) {
        let docCount = doc.length;
        weeklies = [];
        //week_index = 0;
        totalCost = 0;
        weekCost = 0;
        prev_week = 0;
        for (i = 0; i < docCount; i++) {
          if (i > 0) {
            prev_week = item_week;
          }
          item_week = moment(doc[i].date).week();
          if (item_week == prev_week || i == 0) {
            totalCost = totalCost + doc[i].amount;
            weekCost = weekCost + doc[i].amount;
            if (i + 1 == docCount) {
              weeklies.push({
                weeklyCost: weekCost,
                weekNumber: 'Week ' + item_week
              });
            }
          } else {
            totalCost = totalCost + doc[i].amount;
            if (i + 1 == docCount) {
              weeklies.push({
                weeklyCost: weekCost,
                weekNumber: 'Week ' + prev_week
              });
              weeklies.push({
                weeklyCost: doc[i].amount,
                weekNumber: 'Week ' + item_week
              });
            } else {
              weeklies.push({
                weeklyCost: weekCost,
                weekNumber: 'Week ' + prev_week
              });
              weekCost = 0;
              weekCost = weekCost + doc[i].amount;
            }
          }
        }
        weekly_track = { totalExpenses: totalCost, expensePerWeek: weeklies };
        res.status(200).json(weekly_track);
        // } else {
        //   res
        //     .status(400)
        //     .json({ weeklyCost: 0, startdate: startDate, enddate: endDate });
        // }
      })
      .catch(err => {
        console.error(err);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/api/users/:userId/calculate/year', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { startDate, endDate } = req.body;
    let end_msec = Date.parse(endDate);
    end_date = new Date(end_msec);
    endDate = end_date.addDays(1);
    // if (userId !== id) {
    //   return res.status(401).json({ error: 'Unauthorized user' });
    // }
    Item.find({
      user_id: userId,
      date: { $gte: startDate, $lte: endDate }
    })
      .sort({ date: 1 })
      .then(doc => {
        //if (doc.length > 0) {
        let docCount = doc.length;
        yearlies = [];
        //week_index = 0;
        totalCost = 0;
        yearCost = 0;
        prev_year = 0;
        for (i = 0; i < docCount; i++) {
          if (i > 0) {
            prev_year = item_year;
          }
          item_year = moment(doc[i].date).year();
          if (item_year == prev_year || i == 0) {
            totalCost = totalCost + doc[i].amount;
            yearCost = yearCost + doc[i].amount;
            if (i + 1 == docCount) {
              yearlies.push({
                yearlyCost: yearCost,
                weekNumber: 'Year ' + item_year
              });
            }
          } else {
            totalCost = totalCost + doc[i].amount;
            if (i + 1 == docCount) {
              yearlies.push({
                yearlyCost: yearCost,
                weekNumber: 'Year ' + prev_year
              });
              yearlies.push({
                yearlyCost: doc[i].amount,
                weekNumber: 'Year ' + item_year
              });
            } else {
              yearlies.push({
                yearlyCost: yearCost,
                weekNumber: 'Year ' + prev_year
              });
              yearCost = 0;
              yearCost = yearCost + doc[i].amount;
            }
          }
        }
        yearly_track = { totalExpenses: totalCost, expensePerYear: yearlies };
        res.status(200).json(yearly_track);
        // } else {
        //   res
        //     .status(400)
        //     .json({ weeklyCost: 0, startdate: startDate, enddate: endDate });
        // }
      })
      .catch(err => {
        console.error(err);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/api/users/:userId/calculate/daily', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { startDate, endDate } = req.body;
    let end_msec = Date.parse(endDate);
    end_date = new Date(end_msec);
    endDate = end_date.addDays(1);
    // if (userId !== id) {
    //   return res.status(401).json({ error: 'Unauthorized user' });
    // }
    Item.find({
      user_id: userId,
      date: { $gte: startDate, $lte: endDate }
    })
      .sort({ date: 1 })
      .then(doc => {
        if (doc.length > 0) {
          let docCount = doc.length;
          dailyCost = 0;
          for (i = 0; i < docCount; i++) {
            weekCost = weekCost + doc[i].amount;
          }
          res.status(200).json({
            weeklyCost: weekCost,
            startdate: startDate,
            enddate: endDate
          });
        } else {
          res.status(400).json({
            weeklyCost: null,
            startdate: startDate,
            enddate: endDate
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  } catch (error) {
    console.log(error.message);
  }
});

// route for getting all items for month(s)
router.post('/api/users/:userId/calculate/month', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { startDate, endDate } = req.body;

    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({ error: 'Unauthorized user' });
    // }

    if (startDate > endDate) {
      return res
        .status(400)
        .json({ error: 'Invalid Request. Start Date is in the future' });
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate).addDays(1);
    const filteredItems = await Item.aggregate([
      {
        $match: {
          user_id: mongoose.Types.ObjectId(userId),
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $project: {
          month: { $month: '$date' },
          user_id: 1,
          amount: 1
        }
      },

      {
        $group: {
          _id: '$month',
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          total: 1
        }
      }
    ]);

    if (!filteredItems) {
      res.status(200).json({ items: null });
    }
    res.status(200).json({ items: filteredItems });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

router.get('/api/users/:userId/profile', async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    
    const user = await User.find({_id: userId});
    if (!user) {
      res.status(200).json({
        user: null
      });
    }
    res.status(200).json({
      user: user
    });
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;
