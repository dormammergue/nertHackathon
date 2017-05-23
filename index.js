// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongodb = require('mongodb');

var db;

// Connect to mongo (make sure mongo is running!)
mongodb.MongoClient.connect('mongodb://localhost', function(err, database) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to Database");
	db = database;
// start the server.
	startListening();
});

// Create express app
var app = express();

// Add req.body to each RANT request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Add req.session for each individual for to every request
app.use(expressSession({
	secret: 'keyboard cat', // SECRET! Don't push to github
	resave: false,
	saveUninitialized: true,
	// cookie:{if else };
	})
);

// GET all rants
app.get('/api/rants', function(req, res) {
	db.collection('rants').find({}).toArray(function(err, data){
		if (err) {
			console.log(err);
			res.status(500);
			res.send("error");
			return;
		}
		res.send(data);
	});
});

// Post a new post
app.post('/api/newRant', function(req, res) {
	if (req.session._id) {
		//number of posts
		//change icon
	}
		// increment count of posts

// Add new post
	db.collection('rants').insertOne(
	{
		_id: postID,
		channel: req.body.channel,
		listOfResponse:
			{
				_id:responseID,
				content:req.body,//.???
				dateOfPost:Date
			},
		listOfReaction:
			{
				angryCat:number,
				trashCan: number,
				thumbsDown:number
			}, 

		},
		function(err, data) {
			if (err) {
				console.log(err);
				res.status(500);
				res.send("What you can't even inserting a comment right🙄");
				return;
			}
			res.send(data);
	});
});

// serve files out of the static public folder (e.g. index.html)
app.use(express.static('public'));

// 404 boilerplate
app.use(function(req, res, next) {
	res.status(404);
	res.send("File Not Found! Loser💩");
});

// 500 boilerplate
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("Internal Server Error! We don't like you! Go away!🖐🏼");
	//res.send(err);
});

// start listening (but only after we've connected to the db!)
function startListening() {
	app.listen(8080, function() {
		console.log("👏🏼 http://localhost:8080");
	});
}


