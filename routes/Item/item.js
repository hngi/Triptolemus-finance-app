let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth')
let User = require('../../schema/user');
let Item = require('../../schema/item');

router.post('/api/users/:userId/items',userAuth.verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, description, amount } = req.body;
    const newItem = new Item({
      name,
      description,
      amount,
      user_id: userId
    });
    const item = await newItem.save();
    res.json({ item: item });
  } catch (error) {
    console.log(error.message);
  }
});
router.get('/api/users/:userId/items',userAuth.verifyToken ,async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Item.find({ user_id: userId });
    res.json({ items: items });
  } catch (error) {
    console.log(error.message);
  }
});

//route for getting all items in date range
router.get('/api/users/:userId/calculate/:startDate/:endDate', (req,res, next) => {
  const { userId, startdate, enddate } = req.params;
  const newItem = Item.find({user_id: userId, date: {$gte: startDate, $lte: endDate}}).then(
    things => {
      console.log(things);
      res.status(200).json(things);
    }
  ).catch(
    error => {
      console.log(error)
      res.status(400).json({
        error: error
      });
    }
  );
});

// route for getting all items for a particular month
router.get('/api/users/:userId/calculate/:month', userAuth.verifyToken, (req, res, next) => {
  const { userId, month } = request.params;
  const newItems = Item.find({$where: function(){ return this.date.getMonth() == month} }).then(
    things => {
      console.log(things);
      res.status(200).json(things);
    }
  ).catch(
    error => {
      res.status(404).json({
        error: error
      })
    }
  )
});

module.exports = router;
