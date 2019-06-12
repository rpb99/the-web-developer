var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});


// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


var newUser = new User({
	email: "anto@granger.com",
	name: "Anto Granger"
});

newUser.posts.push({
	title: "The First Avenger",
	content: "his called captain america"
});

// newUser.save((err, user) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

User.findOne({name: "Anto Granger"}, (err, user)=>{
	if(err){
		// console.log(err);
	}else {
		user.posts.push({
			title: "one thing i like",
			content: "Cat!!"
		});
		user.save((err, user) => {
			if(err){
				console.log(err);
			}else {
				console.log(user);
			}
		});
	}
});
