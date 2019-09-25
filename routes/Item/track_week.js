const express = require('express');
const router = express.Router();
//let moment = require('moment')
let mongoose = require('mongoose')
let itemModel = require('../schema/item');
let userModel = require('../schema/user');
let validator = require('validator')
var app = express();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

router.post('/api/users/:userId/calculate/week', async (req, res) => {
	let userId = req.userId, startDate = req.body.startDate, endDate = req.body.endDate;
	var end_msec = Date.parse(endDate);
	end_date = new Date(end_msec);
	endDate = end_date.addDays(1);
	itemModel.find({
		user_id : userId,
		date: { $gte: startDate, $lte: endDate }
	}).sort({date: 1})
	.then(doc => {
		if(doc.length > 0) {
			let docCount = doc.length;
			weekCost = 0;
			for(i=0; i<docCount; i++) {
	 			weekCost = weekCost + doc[i].amount;
	 		}
	 		return res.status(200).json({weeklyCost: weekCost, startdate: startDate, enddate: endDate});
		} else {
			return res.status(400).json();
		}
	})
	.catch(err => {
	 	console.error(err)
	})
});

app.get('/users/:userId/calculate/week', function (req, res) {
	//user_id = req.params.userId;
	console.log(req.params);
	userId = req.params.userId;
	itemModel
	 .find({
	 	user_id : userId
	 }).sort({date: 1})
	 .then(doc => {
	 	console.log(doc)
	 	if(doc.length > 0) {
	 		let docCount = doc.length;
	 		weekCost = 0;
	 		for(i=0; i<docCount; i++) {
	 			weekCost = weekCost + doc[i].amount;
	 		}
	 		weekArray = {weeklyCost: weekCost};
	 	  res.send(JSON.stringify(weekArray));
	 	} else {
	 		let err =[];
	 		res.send(JSON.stringify(err));
	 	}
	 })
	 .catch(err => {
	 	console.error(err)
	 })
});
