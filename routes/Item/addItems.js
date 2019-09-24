/**
* @swagger
* /items:
*   post:
*     tags:
*       - Items
*     name: addItems
*     summary: API to add items
*     security:
*       - bearerAuth: []
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             user_id: 
*               type: string
*             name: 
*               type: string
*             description:
*               type: string
*             amount:
*               type: integer
*         required:
*           - user_id
*           - name
*           - description
*           - amount
*     responses:
*       200:
*         description: Item Added Successfully
*       401:
*         description: Error has occured
*/

let express = require('express');
let router = express.Router();
let userAuth = require('../../middleware/userAuth');
let User = require('../../schema/user');
let Item = require('../../schema/item');

router.post('/api/items',userAuth.verifyToken, async (req, res) => {
  try {
    // const { userId } = req.params;
    // const { userId, name, description, amount } = req.body;
    // const newItem = new Item({
    //   name,
    //   description,
    //   amount,
    //   user_id: userId
    // });
    const newItem = new Item(req.body);
    const item = await newItem.save();
    res.json({ item: item });
  } catch (error) {
    res.status(401).json({error: error.message});
  }
});

module.exports = router;