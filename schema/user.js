let mongoose = require('mongoose');
let validator = require('validator');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false,
    validate: (value) => {
      return validator.isAlphanumeric(value);
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

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) { return next() };
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  })
}, function (err) {
  next(err)
})
userSchema.methods.comparePassword = function (userPassword, next) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return next(err);
    next(null, isMatch)
  })
}
var User = mongoose.model('User', userSchema);

module.exports = User;