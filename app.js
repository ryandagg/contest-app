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
	this.votes = 0;
}

var urlFormatter = function(url) {
	var id = url.substr(url.indexOf("=") + 1);
	var formatted = "//www.youtube.com/embed/" + id;
	return formatted
}

var contestOrder = []

// Round Robin algorithm to have each video compete against all others. Have first player play everyone, then remove from array, repeat. Then randomize array.
var videoMatcher = function(array) {
	while(array.length > 1) {
		for(var ii = 1; ii < array.length; ii++) {
			contestOrder.push([array[0], array[ii]]);
			// console.log(array);
		}
		array.shift();
	}
}

// used to shuffle contestOrder
var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// add to data

data.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=05tKob_K76I"), "UFC (MMA) Best Knockouts 2014 HD", "BEST KNOCKOUTS EVER IN 2014 UFC MMA SUBSCRIBE SUBSCRIBE TO FIND MORE UFC FIGHTS AND KNOCKOUTS !!!"));
data.push(new Submission("Joe", urlFormatter("https://www.youtube.com/watch?v=rwU1ahN9Kcs"), "Kimbo Slice 19 Second Knockout NEW 2012", "Kimbo Slice Knocks Out Bo Cantrell In 19 Seconds"));
data.push(new Submission("Jeff", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Juan", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Seb", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("Gage", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
data.push(new Submission("George", urlFormatter("https://www.youtube.com/watch?v=IymYwo182I0"), "Anderson Silva is ready.", "MMA H.E.A.T.'s Karyn Bryant spends a few minutes with legendary UFC Middleweight Anderson Silva, and hears what he has to say about doctor's clearing him to train full steam after the brutal leg break he suffered in December at UFC 168. The former champion discusses the highs and lows of his recovery, his plans "));


videoMatcher(data);
// console.log("ordered: ", contestOrder);

shuffle(contestOrder);
console.log("shuffled: ", contestOrder);

app.get('/', function(req, res) {
	if(data.length < 8) {
		res.render('index');
	}
	else {
		res.redirect('/submissions-over')
	}
});

app.get('/submissions', function(req, res) {
	res.render('submissions', {
		submissions: data
	});
})

app.get('/submissions-over', function(req, res) {
	res.render('submissions-over');
})

app.post('/handleForm', function(req, res) {
	console.log(req.body)
	data.push(new Submission(req.body.name, urlFormatter(req.body.url), req.body.title, req.body.description));
	res.redirect('/');
})

var server = app.listen(8874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
