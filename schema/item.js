let mongoose = require('mongoose')
let validator = require('validator')
let itemSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  description: {
    type: String,
    required: true
},
 amount: {
     type: Number,
     required: true,

 },
 date: {
     type: Date,
 },
    user_id: {
     type: String,
     required: true,

 }

})

module.exports = mongoose.model('Item', itemSchema)