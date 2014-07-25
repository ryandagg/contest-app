var express = require('express');
var bodyParser = require('body-parser');
var data = require("./models/data.js");

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// console.log(data.mainData.length);
app.get('/', function(req, res) {
	if(data.mainData.length < 8) {
		res.render('index');
	}
	else {
		res.redirect('/submissions-over')
	}
});
// console.log(data.contestOrder[data.videoCounter][0]);

var firstSubmissionsLoad = false
app.get('/submissions', function(req, res) {
	// console.log("submissions before setup: ", data.mainData.length);
	if(!firstSubmissionsLoad) {
		data.setupContest(); // this is getting called everytime submissions loads...
		firstSubmissionsLoad = true;
	}

	// console.log("submissions after setup: ", data.mainData.length);
	// console.log("submissions page load:data.contestOrder: ", data.contestOrder);
	// console.log(data.videoCounter);

	res.render('submissions', {
		submission1: data.contestOrder[data.videoCounter][0],
		submission2: data.contestOrder[data.videoCounter][1]
	});
})

app.get('/submissions-over', function(req, res) {
	res.render('submissions-over');
})
// console.log("outside winner maindata.length", data.mainData.length);

// console.log("outside: ", data.getWinner());
app.get('/winner', function(req, res) {
	// console.log("inside: ", data.getWinner());
	// console.log("inside winner maindata.length", data.mainData.length);

	res.render('winnerPage', {
		winner: data.getWinner()
	})
});

app.post('/handleForm', function(req, res) {
	data.pushSubmission(req.body.name, req.body.url, req.body.title, req.body.description);
	res.redirect('/');
})

app.post('/btn1', function(req, res) {
	console.log("btn 1 contestOrder: ", data.contestOrder);
	// console.log("bt1 data: ", data)
	// console.log("contestOrder: ", data.contestOrder[data.videoCounter]);
	data.contestOrder[data.videoCounter][0].votes++;
	// console.log("2contestOrder: ", data.contestOrder[data.videoCounter]);
	// console.log("btn1 inside data length", data.mainData.length);
	if(data.contestOrder[data.videoCounter + 1]) {
		data.videoCounter++;
		res.redirect('/submissions');
	}
	else {
		res.redirect("/winner");
	}

})

app.post('/btn2', function(req, res) {
	// console.log("contestOrder: ", data.contestOrder[data.videoCounter]);
	data.contestOrder[data.videoCounter][1].votes++; 
	// console.log("2contestOrder: ", data.contestOrder[data.videoCounter]);
	if(data.contestOrder[data.videoCounter + 1]) {
		data.videoCounter++;
		res.redirect('/submissions');
	}
	else {
		res.redirect("/winner");
	}
})

var server = app.listen(8874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
