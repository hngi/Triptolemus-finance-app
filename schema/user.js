let mongoose = require('mongoose')
let validator = require('validator')
let userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: false,
      validate: (value) => {
          return validator.isAlphanumeric(value)
      }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
        return validator.isEmail(value)
    }
},
  password: {
    type: String,
    required: true,
    unique: false,
}
})

module.exports = mongoose.model('User', userSchema)