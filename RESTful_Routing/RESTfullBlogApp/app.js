const bodyParser = require('body-parser'),
methodOverride   = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose  		 = require('mongoose'),
express    		 = require('express'),
app 			 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
let blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
// 	title: "Test BLog",
// 	image: "https://nacto.org/wp-content/uploads/gallery/2012_conventionalbikelane/bl_pdx.jpg",
// 	body: "Hello This Body of post"
// }, (err, blog) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(blog);
// 	}
// });


// RESTFUL ROUTES
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});

});

app.get("/blogs/new", (req, res) => {
	res.render("new");
});

app.post("/blogs", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.Blog.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

app.put("/blogs/:id", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, () => {
	console.log("SERVER IS RUNNING");
});

