let express = require('express');
let router = express.Router();
let moment = require('moment');
// let userAuth = require('../../middleware/userAuth');
let Item = require('../../schema/item');
const mongoose = require('mongoose');
const User = require('../../schema/user');

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

router.post('/api/users/:userId/items', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({
    //     error: 'Unauthorized user'
    //   });
    // }
    const {
      name,
      description,
      amount,
      date
    } = req.body;
    if (
      name == '' ||
      name == null ||
      description == '' ||
      description == null ||
      amount == '' ||
      amount == null ||
      date == '' ||
      date == null
    ) {
      res.status(200).json({
        message: 'All input fields are required',
        success: false
      });
    }
    const newItem = new Item({
      name,
      description,
      amount,
      user_id: userId,
      date: date
    });
    const item = await newItem.save();
    res.status(200).json({
      item: item,
      success: true
    });
  } catch (error) {
    res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});
router.post('/api/users/:userId/allItems', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const {
      startDate,
      endDate
    } = req.body;
    if (startDate > endDate) {
      return res.status(200).json({
        message: 'Start Date cannot be greater than End Date',
        success: false
      });
    } else if (endDate > new Date().toISOString()) {
      return res.status(200).json({
        message: 'End Date cannot be in the future',
        success: false
      });
    }

    const items = await Item.find({
      user_id: userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({
      date: 1
    });

    if (items.length <= 0) {
      return res.status(200).json({
        message: 'There are no expenses recorded during the specified period,please choose another date',
        items: [],
        success: false
      });
    }
    res.status(200).json({
      items: items,
      success: true
    });
  } catch (error) {
    res.status(200).json({
      items: [],
      success: false,
      message: error.toString()
    });
  }
});
router.post('/api/users/:userId/calculate/week', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const id = req.user;
    let {
      startDate,
      endDate
    } = req.body;
    if (startDate > endDate) {
      return res.status(200).json({
        message: 'Start Date cannot be greater than End Date',
        success: false
      });
    }
    if (
      startDate == '' ||
      startDate == null ||
      endDate == '' ||
      endDate == null
    ) {
      return res.status(200).json({
        message: 'All input fields are required',
        success: false
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
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .sort({
        date: 1
      })
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
        let weekly_track = {
          success: true,
          total_weekly_cost: totalCost,
          totalExpenses: totalCost,
          expensePerWeek: weeklies
        };
        res.status(200).json(weekly_track);
        // } else {
        //   res
        //     .status(400)
        //     .json({ weeklyCost: 0, startdate: startDate, enddate: endDate });
        // }
      })
      .catch(err => {
        console.error(err.toString() + 'in expense weekly');
        throw err;
      });
  } catch (error) {
    res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});

router.post('/api/users/:userId/calculate/year', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const id = req.user;
    let {
      startDate,
      endDate
    } = req.body;
    if (startDate > endDate) {
      return res.status(200).json({
        message: 'Start Date cannot be greater than End Date',
        success: false
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
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .sort({
        date: 1
      })
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
        yearly_track = {
          success: true,
          totalExpenses: totalCost,
          expensePerYear: yearlies
        };
        res.status(200).json(yearly_track);
        // } else {
        //   res
        //     .status(400)
        //     .json({ weeklyCost: 0, startdate: startDate, enddate: endDate });
        // }
      })
      .catch(err => {
        console.error(err.toString + ' in yearly expense ');
      });
  } catch (error) {
    res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});

router.post('/api/users/:userId/calculate/daily', async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const id = req.user;
    let {
      startDate,
      endDate
    } = req.body;
    if (startDate > endDate) {
      return res.status(200).json({
        message: 'Start Date cannot be greater than End Date',
        success: false
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
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .sort({
        date: 1
      })
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
  } catch (error) {}
});

// route for getting all items for month(s)
router.post('/api/users/:userId/calculate/month', async (req, res, next) => {
  try {
    const {
      userId
    } = req.params;
    let {
      startDate,
      endDate
    } = req.body;

    const id = req.user;
    // if (userId !== id) {
    //   return res.status(401).json({ error: 'Unauthorized user' });
    // }

    if (startDate > endDate) {
      return res.status(200).json({
        message: 'Start Date cannot be greater than End Date',
        success: false
      });
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate).addDays(1);
    const filteredItems = await Item.aggregate([{
        $match: {
          user_id: mongoose.Types.ObjectId(userId),
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $project: {
          month: {
            $month: '$date'
          },
          user_id: 1,
          amount: 1
        }
      },

      {
        $group: {
          _id: '$month',
          total: {
            $sum: '$amount'
          }
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
      res.status(200).json({
        items: [{
          totalExpenses: 0
        }],
        success: true
      });
    }
    res.status(200).json({
      items: filteredItems,
      success: true
    });
  } catch (error) {
    res.status(200).json({
      message: error.toString(),
      success: false
    });
  }
});

router.put('/api/users/:userId/Item/:itemId', async (req, res) => {
  try {
    const {
      userId,
      itemId
    } = req.params;

    const updatedItem = await Item.updateOne({
      user_id: userId,
      _id: itemId
    }, {
      $set: {
        name: req.body.name || item.name,
        description: req.body.description || item.description,
        amount: req.body.amount || item.amount,
        date: req.body.date
      }
    })
    if (!updatedItem) {
      return res.status(200).json({
        message: 'Update Failed Item Not Found',
        success: false
      })
    } else {
      return res.status(200).json({
        message: 'Update Successfull',
        success: true
      })
    }

  } catch {
    return res.status(200).json({
      message: 'Update Failed',
      success: false
    })
  }
})

router.delete('/api/users/:userId/items/:itemId', async (req, res)=>{
  console.log(req)
  try{
    const {userId,itemId} = req.params
    Item.findOneAndDelete({_id:itemId},(err,res)=>{
      console.log(res)
      console.log(err)
    })
    
    return res.status(200).json({success:true,message:"Item Deleted",itemId:itemId})
  } catch(error){
    return res.status(200).json({success:false,message:"Could not Delete Item"})

  }
});

router.post('/api/users/:userId/items/delete', async (req, res)=>{
  console.log(req.body)
  try{
    const {userId} = req.params
    const {items} = req.body
    console.log(items)
    if (items == undefined || items==null || items.length == 0){
      return res.status(200).json({success:false,message:"Empty Request"})
    }
      items.forEach(element => {
         Item.findOneAndDelete({_id:element},(err,res)=>{
        console.log(res)
        console.log(err)
    })
      });
     return res.status(200).json({success:true,message:items.length + " Item(s) Deleted"})
    
  } catch(error){
    console.log(error)
    return res.status(200).json({success:false,message:"Could not Delete Items"})

  }
});

module.exports = router;
