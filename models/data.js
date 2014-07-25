var mainData = [];
var videoCounter = 0;
var contestOrder = []

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


var videoMatcher = function(array) {
	tempArray = [];
	for(var jj = 0; jj < array.length; jj++) {
		tempArray.push(array[jj]);
	}
	// console.log("data videoMatcher: ", tempArray) //currently working
	while(tempArray.length > 1) {
		for(var ii = 1; ii < tempArray.length; ii++) {
			contestOrder.push([tempArray[0], tempArray[ii]]);
			// console.log(tempArray);
		}
		tempArray.shift();
	}
	// console.log("data videoMatcher contestOrder: ", contestOrder); // this is working
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
	// console.log("data shuffle contestOrder: ", contestOrder); // this is working

return array;
}

var setupContest = function() {
	videoMatcher(mainData);
	shuffle(contestOrder);
}

var getWinner = function() {
	var largest = -1;
	var index = 0;
	console.log("mainData.length: ", mainData.length);
	for(var i = 0; i < mainData.length; i++) {
		console.log(mainData[i].votes, mainData[i].title);
		if(mainData[i].votes > largest) {
			largest = mainData[i].votes;
			index = i;
		}
	}
	console.log("what getWinner returns: ", mainData[index])
	return mainData[index];
}

var pushSubmission = function(name, url, title, desc) {
	mainData.push(new Submission(name, urlFormatter(url), title, desc));
}


// add to mainData
mainData.push(new Submission("Joe", urlFormatter("https://www.youtube.com/watch?v=rwU1ahN9Kcs"), "Kimbo Slice 19 Second Knockout NEW 2012", "Kimbo Slice Knocks Out Bo Cantrell In 19 Seconds"));
mainData.push(new Submission("Ryan", urlFormatter("https://www.youtube.com/watch?v=05tKob_K76I"), "UFC (MMA) Best Knockouts 2014 HD", "BEST KNOCKOUTS EVER IN 2014 UFC MMA SUBSCRIBE SUBSCRIBE TO FIND MORE UFC FIGHTS AND KNOCKOUTS !!!"));
// mainData.push(new Submission("Jeff", urlFormatter("https://www.youtube.com/watch?v=fs-CQ_QJ9rQ"), "Butterbean best knockouts", "best knockouts"));
// mainData.push(new Submission("Juan", urlFormatter("https://www.youtube.com/watch?v=uS7b4A0l2rA"), "UFC / MMA Ultimate Top 100 Female Knockouts", "best knockouts"));
// mainData.push(new Submission("Seb", urlFormatter("https://www.youtube.com/watch?v=cHNxw8SXC5Q"), " UFC Ultimate Top 100 Knockouts", "best knockouts"));
// mainData.push(new Submission("George", urlFormatter("https://www.youtube.com/watch?v=IymYwo182I0"), "Anderson Silva is ready.", "MMA H.E.A.T.'s Karyn Bryant spends a few minutes with legendary UFC Middleweight Anderson Silva, and hears what he has to say about doctor's clearing him to train full steam after the brutal leg break he suffered in December at UFC 168. The former champion discusses the highs and lows of his recovery, his plans "));
// mainData.push(new Submission("Gage", urlFormatter("https://www.youtube.com/watch?v=z1NVycQ8GFo"), "Best UFC Fighters 2014 Most Entertaining Fighters", "best knockouts"));


// videoMatcher(mainData);
// console.log("ordered: ", contestOrder);

// shuffle(contestOrder);
// console.log("shuffled: ", contestOrder);

module.exports = {
	getWinner: getWinner,
	contestOrder: contestOrder,
	mainData: mainData,
	pushSubmission: pushSubmission,
	setupContest: setupContest,
	videoCounter: videoCounter,
}