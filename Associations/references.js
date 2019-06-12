let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});


let Post = require('./models/post');
let User = require('./models/user');


// Post.create({
// 	title: "Don't rely to someone pt.4",
// 	content: "ASJDAISJDIOS"
// }, (err,post)=>{
// 	User.findOne({email: "lancer@gmail.com"}, (err,foundUser)=>{
// 		if(err){
// 			console.log(err);
// 		}else {
// 			foundUser.posts.push(post);
// 			// data '(post)' will be push into an array 'posts' and then data array in 'posts' into 'foundUser'.
// 			foundUser.save((err, data) => {
// 				if(err){
// 					console.log(err);
// 				}else {
// 					console.log(data);
// 				}
// 			});
// 		}
// 	});
// });

User.findOne({name: 'Ken Lancer'}).populate("posts").exec((err, user) => {
	if(err){
		
	}else {
		console.log(user);
	}
});