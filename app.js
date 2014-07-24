var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var data = [];

var Submission = function(name, url, title, description) {
	this.name = name;
	this.url = url;
	this.title = title;
	this.description = description;
}

var urlFormatter = function(url) {
	var id = url.substr(url.indexOf("=") + 1);
	var formatted = "//www.youtube.com/embed/" + id;
	return formatted
}

data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=05tKob_K76I"), "UFC (MMA) Best Knockouts 2014 HD", "BEST KNOCKOUTS EVER IN 2014 UFC MMA SUBSCRIBE SUBSCRIBE TO FIND MORE UFC FIGHTS AND KNOCKOUTS !!!"));
data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=rwU1ahN9Kcs"), "Kimbo Slice 19 Second Knockout NEW 2012", "Kimbo Slice Knocks Out Bo Cantrell In 19 Seconds"));
data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("George", urlFormatter("https://www.youtube.com/watch?v=IymYwo182I0"), "Anderson Silva is ready.", "MMA H.E.A.T.'s Karyn Bryant spends a few minutes with legendary UFC Middleweight Anderson Silva, and hears what he has to say about doctor's clearing him to train full steam after the brutal leg break he suffered in December at UFC 168. The former champion discusses the highs and lows of his recovery, his plans "));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/submissions', function(req, res) {
	res.render('submissions', {
		submissions: data
	});
})

app.post('/handleForm', function(req, res) {
	console.log(req.body)
	data.push(new Submission(req.body.name, urlFormatter(req.body.url), req.body.title, req.body.description));
	res.redirect('/');
})

var server = app.listen(8874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
