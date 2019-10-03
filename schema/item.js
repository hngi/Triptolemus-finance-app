/**
 * @swagger 
 * definitions:
 *  Item:
 *    type: Object
 *    properties:
 *    _id:
 *      type: string
 *    name:
 *      type: string
 *    description:
 *      type: string
 *    amount:
 *      type: integer
 *    user_id:
 *      type: string
 *    date:
 *      type: date-time
 *    required:
 *      - name
 *      - description
 *      - amount
 */

let mongoose = require('mongoose');
let validator = require('validator');
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
        unique: false,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        unique: false

    }

});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
