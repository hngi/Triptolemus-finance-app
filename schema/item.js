let mongoose = require('mongoose')
let validator = require('validator')
let itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    amount: {
        type: Number,
        required: true,
        unique: false

    },
    date: {
        type: Date,
        required: true,
        unique: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        unique: false

    }

})

module.exports = mongoose.model('Item', itemSchema)