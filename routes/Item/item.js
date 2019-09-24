let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let Item = require('../../schema/item');

router.post('/api/users/:userId/items', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    const { name, description, amount } = req.body;
    if (name === '' || description === '' || amount === '') {
      res.status(400).json({ error: 'Input field cannot be empty' });
    }
    const newItem = new Item({
      name,
      description,
      amount,
      user_id: id,
      date: new Date()
    });
    const item = await newItem.save();
    res.status(200).json({ item: item });
  } catch (error) {
    console.log(error.message);
  }
});
router.get('/api/users/:userId/items', userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const id = req.user;
    if (userId !== id) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
    const items = await Item.find({ user_id: id });
    if (!items) {
      res.status(200).json({ items: null });
    }
    res.status(200).json({ items: items });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
