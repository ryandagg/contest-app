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
	data.push(new Submission(req.body.name, req.body.url, req.body.title, req.body.description));
	res.redirect('/');
})

var server = app.listen(8874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
