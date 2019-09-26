let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let moment = require('moment');
let Item = require('../../schema/item');

router.get('/api/users/:userId/calculate/year', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.body;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({
        error: 'Unauthorized user'
      });
    }
    const items = await Item.find({
      user_id: id,
      date: {
        $gte: new Date(date) + 364
      }
    });
    if (items.length < 0) {
      return res.status(200).json({
        message: 'No items recorded for the specified period'
      });
    }
    let amounts = items.map(item => {
      return item.amount;
    });
    if (amounts === []) {
      return res.status(200).json({
        message: 'No items recorded for the specified period'
      });
    }
    const totalExpenses = amounts.reduce((total, amount) => total + amount);

    return res.status(200).json({
      totalExpenses
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/api/users/:userId/items', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({
        error: 'Unauthorized user'
      });
    }

    const { name, description, amount } = req.body;
    if (name === '' || description === '' || amount === '') {
      res.status(400).json({
        error: 'Input field cannot be empty'
      });
    }
    const newItem = new Item({
      name,
      description,
      amount,
      user_id: id,
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
router.get('/api/users/:userId/items', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({
        error: 'Unauthorized user'
      });
    }
    const items = await Item.find({
      user_id: id
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

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

router.post('/api/users/:userId/calculate/week', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { startDate, endDate } = req.body;
    let end_msec = Date.parse(endDate);
    end_date = new Date(end_msec);
    endDate = end_date.addDays(1);
    if (userId !== id) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
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
            if (i>0) { prev_week = item_week; }
            item_week = moment(doc[i].date).week()
            if (item_week == prev_week) {
              totalCost = totalCost + doc[i].amount;
              weekCost = weekCost + doc[i].amount;
              if ((i+1) == docCount) { 
                //weeklies[week_index] = { weeklyCost: weekCost, weekNumber: item_week } 
                weeklies.push({ weeklyCost: weekCost, weekNumber: "Week "+item_week }); 
              }
            } else {
                //weeklies[week_index] = { weeklyCost: weekCost, weekNumber: prev_week }
                weeklies.push({ weeklyCost: weekCost, weekNumber: "Week "+prev_week });
                if (i > 0) { 
                  //week_index++; 
                  weekCost = 0;
                }
                totalCost = totalCost + doc[i].amount;
                weekCost = weekCost + doc[i].amount;
                if ((i+1) == docCount) { 
                  //weeklies[week_index] = { weeklyCost: weekCost, weekNumber: item_week } 
                  weeklies.push({ weeklyCost: weekCost, weekNumber: "Week "+item_week });  
                }
            }
          }
          weekly_track = { totalExpenses: totalCost, expensePerWeek : weeklies}
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

router.post('/api/users/:userId/calculate/daily', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    let { startDate, endDate } = req.body;
    let end_msec = Date.parse(endDate);
    end_date = new Date(end_msec);
    endDate = end_date.addDays(1);
    if (userId !== id) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
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
            dailyCost = dailyCost + doc[i].amount;
          }
          res.status(200).json({
            dailyCost: weekCost,
            startdate: startDate,
            enddate: endDate
          });
        } else {
          res
            .status(400)
            .json({ dailyCost: 0, startdate: startDate, enddate: endDate });
        }
      })
      .catch(err => {
        console.error(err);
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
