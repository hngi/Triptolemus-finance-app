require('./database');
const express = require('express');
const router = express.Router();
let mongoose = require('mongoose')
let itemModel = require('./items');
//let validator = require('validator')
var app = express();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

app.get('/itemName/:name/date/:startDate', function (req, res) {
	//user_id = req.params.userId;
	console.log(req.params);
	start_date = req.params.startDate;
	startDate = req.params.startDate;
	itemName = req.params.name;
	var start_msec = Date.parse(start_date);
	start_date = new Date(start_msec);
	end_date = start_date.addDays(8);
	console.log(start_date);
	//console.log(end_date);
	console.log(itemName);
	console.log(start_date);
	//console.log(req.params);
	itemModel
	 .find({
	 	date: { $gte: startDate, $lte: (end_date) }
	 })
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
app.listen(3000);
