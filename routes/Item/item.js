let express = require('express');
let router = express.Router();
let User=require('../../schema/user')
let Item=require('../../schema/item')


router.get('/api/users/:userId/items',async(req,res)=>{
try {
  const user=await User.find({})
  console.log(user);
} catch (error) {
  
}
})

module.exports=router;