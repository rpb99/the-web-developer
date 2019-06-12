const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://dbtest:'+process.env.SECRET_KEY+'@cluster0-jkj67.mongodb.net/test?retryWrites=true', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB');
}).catch(err => {
	console.log('ERROR:', err.message);
});



const PostSchema = new mongoose.Schema({
	title: String,
	description: String
});
const Post = mongoose.model("Post", PostSchema);

app.get("/", async (req, res) => {
	let post = await Post.create({title: 'test', description: 'this is a test also'});
	res.send(post);
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});