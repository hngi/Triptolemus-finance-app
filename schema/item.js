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
 lastModified: {
     type: Date,
 }
})

module.exports = mongoose.model('Item', userSchema)