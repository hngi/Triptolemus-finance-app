let express = require('express');
let router = express.Router();
let User = require('../../schema/user')
let Item = require('../../schema/item')


router.get('/api/users/:userId/items', async (req, res) => {
  try {
    const user = await User.find({})
    console.log(user);
  } catch (error) {

  }
})



/**
 * calculate total spent in a year
 * @params {object} req
 * @params {object} res
 * @returns {object} With total spent in a year
 */
router.get('/api.users/:userId/calculate/year', async (req, res) => {
  const {
    userId
  } = req.params;
  try {
    const user = await User.findById({
      id: userID
    })
  } catch (e) {
    res.status(400).json({
      message: 'An error occurred'
    })
  }
})

module.exports = router;