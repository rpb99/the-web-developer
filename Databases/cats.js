var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB

// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save((err, cat) => {
// 	if(err){	
// 	console.log("Something Went Wrong!");
// 	} else {
// 		console.log("WE JUST SAVED A CAT TO THE DB");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Brian",
	age: 4,
	temperament: "Bland"
}, (err, cats) => {
	if(err){
		console.log(err);
	} else {
		console.log(cats);
	}
});


// retrieve all cats from the DB and console.log each one

Cat.find({}, (err, cats) => {
	if(err){
		console.log("OH NO, ERROR!", err);
	} else {
		console.log("ALL THE CATS.....");
		console.log(cats);
	}
});
