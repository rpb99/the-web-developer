const express = require('express');
const app = express();
const rp = require('request-promise');

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
	res.render("search");
});

app.get("/results", (req, res) => {
		const query = req.query.search;
		const url = 'http://omdbapi.com/?s='+ query +'&apikey=thewdb';
rp(url)
    .then((body) => {
        const data = JSON.parse(body);
		res.render('results', {varData: data});
    })
    .catch((err) => {
        // Crawling failed...
    });

});

app.listen(3000, () => {
	console.log("server has started");
});