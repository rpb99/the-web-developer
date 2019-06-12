let mongoose = require('mongoose');

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
// let Campground = mongoose.model("Campground//<- this will create collection with first word lower case and plural", campgroundSchema);
module.exports = mongoose.model("Campground", campgroundSchema);
