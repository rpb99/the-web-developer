var mongoose   = require('mongoose'),
	Campground = require('./models/campground');

function seedDB(){
	// Remove all campgrounds
	Campground.deleteMany({}, (err)=>{
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
	});
}
module.exports = seedDB;