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
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'

    }

})

module.exports = mongoose.model('Item', itemSchema)