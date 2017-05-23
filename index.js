// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongodb = require('mongodb');
var cookieSession = require("cookie-session");
var secrets = require('./secerts/secert.js');
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
	secret: secerts.expressSecret, // SECRET!
	resave: false,
	saveUninitialized: true,
	})
);

app.use(cookieSession({
	name: "session",
	keys:['keyboard cat'],
	maxAge : 24*60*60*1000 //24hrs
	})
);

app.use(function(req,res,next){
	console.log(req.session);
	console.log(req.url);
	next();
});

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

//Post a new response 
app.post('/api/response/:rantID', function(req,res){
	if(req.session){
		req.session.responseCount+= 1;
	}else {
		req.session.responseCount= 1;
	}
	db.collection('rants').findOneAndUpdate(
		{
		_id : req.query.rantId,
		},
		{
		$push:{listOfResponse: req.body.response},
		}, function(err, data) {
			if (err) {
				console.log(err);
				res.status(500);
				res.send("What you can't even inserting a comment right🙄");
				return;
			}
			//console.log(data);
			res.send(data);
	});
});

// Post a new rant
app.post('/api/newRant', function(req, res) {
// _id:responseID,
// 				content:req.body,//.???
// 				dateOfResponse:Date,
// 				cookieCount: {
// 					cookie: session._id
	if(req.session){
		req.session.rantCount+= 1;
	}else {
		req.session.rantCount= 1;
	}
	db.collection('rants').insertOne(
	{
		_id: rantID,
		content: req.body.rant,
		channel: req.body.channel,
		listOfResponse:[],
		listOfReaction:
		{
			angryCat:0,
			trashCan:0,
			thumbsDown:0
		}, 
		dateOfRant:Date,
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

// post an update reaction
app.post('/api/updatereaction/:rantID', function(req,res){
	db.collection('rants').findOneAndUpdate(
		{
		_id : req.query.rantId,
		},
		{
		$push:{listOfReaction: req.body.reactions},
		}, function(err, data) {
			if (err) {
				console.log(err);
				res.status(500);
				res.send("What you can't even add a reaction right🙄");
				return;
			}
			//console.log(data);
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


