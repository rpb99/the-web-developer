const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
// let Campground = mongoose.model("Campground//<- this will create collection with first word lower case and plural", campgroundSchema);
let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "King Of Hill",
// 	image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
// 	description: "The weather be cold, so i can sleep"
// }, (err, campground) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 	}
// });





app.get("/", (req, res) => {
	res.render('landing');
});

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds', {campgrounds: allCampgrounds});
		}
	});
});

Campground.find({}, (err, data) => {
	if(err){
		console.log(err);
	} else {
		console.log(data);
	}
});

app.post("/campgrounds", (req, res) => {
	let name = req.body.name,
		image = req.body.image,
		desc = req.body.description;
	
	newCampground = {name: name, image: image, description: desc};
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});

});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
// 	find the campground with provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});





app.listen(3000, () => {
	console.log('Server Has Started!');
});



