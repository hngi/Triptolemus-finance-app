/**
* @swagger
* /items/{userId}:
*   get:
*     tags:
*       - Items
*     name: getItems
*     summary: Get Items by UserId
*     security:
*       - bearerAuth: []
*     produces:
*       - application/json
*     parameters:
*       - name: userId
*         description: user's id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Items successfully fetched
*/

let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User = require('../../schema/user');
let Item = require('../../schema/item');

router.get('/api/items/:userId',userAuth.verifyToken ,async (req, res) => {
  try {
    const { userId } = req.params;
    await Item.find({ user_id: userId }).then( items =>{;
        if(!items){
            return res.status(400).json({error: "No item found"});
        }else {
            return res.status(200).json({items: items});
        }
    });
    // res.json({ items: items });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
