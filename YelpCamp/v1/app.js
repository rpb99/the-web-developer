const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
let campgrounds = [
	{name: "King Of Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{name: "Greeck", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
	{name: "Mountain Nest", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
	{name: "King Of Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{name: "Greeck", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
	{name: "Mountain Nest", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
];
app.get("/", (req, res) => {
	res.render('landing');
});

app.get("/campgrounds", (req, res) => {
	res.render('campgrounds',{campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});






app.listen(3000, () => {
	console.log('Server Has Started!');
});



