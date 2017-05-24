﻿// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongodb = require('mongodb');
var cookieSession = require("cookie-session");
var secrets = require("./secrets/secrets.js");
var objectId = require('mongodb').ObjectID;
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



//Add req.session for each individual for to every request
app.use(expressSession({
	secret: secrets.expressSecret, // SECRET!
	resave: false,
	saveUninitialized: true,
	})
);

app.use(function (req, res, next) {
    //req.session.cookie.secure = false;
    //console.log("COOKIE:", req.session.cookie.secure);
    next();
});

//app.use(cookieSession({
//	name: "session",
//    keys: ['keyboard cat'],
//    secure: false,
//	maxAge : 24*60*60*1000 //24hrs
//	})
//);



app.use(function(req,res,next){
	//console.log(req.session);
	//console.log(req.url);
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
app.post('/api/response/:rantID', function (req, res) {

    console.log(req.params.rantID);
    console.log(req.body.response);

	if(req.session){
		req.session.responseCount+= 1;
	}else {
		req.session.responseCount= 1;
	}
	db.collection('rants').findOneAndUpdate(
		{
		    _id : objectId(req.params.rantID)
		},
        {
            //$set: { listOfResponse: req.body.response },
		    $push:{ listOfResponse: req.body.response },
		}, function(err, data) {
			if (err) {
				console.log(err);
				res.status(500);
				res.send("What you can't even inserting a comment right🙄");
				return;
			}
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
app.post('/api/updateReaction/:rantID', function(req,res){
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

// Post a new post
app.post('/api/newRant', function (req, res) {
    if (req.session._id) {
        //number of posts
        //change icon
    }
    // Add new post
    db.collection('rants').insertOne(
        {
            _id: postID,
            channel: req.body.channel,
            listOfResponse:
            {
                _id: responseID,
                content: req.body,//.???
                dateOfPost: Date
            },
            listOfReaction:
            {
                angryCat: number,
                trashCan: number,
                thumbsDown: number
            },

        },
        function (err, data) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send("What you can't even inserting a comment right🙄");
                return;
            }
            res.send(data);
    });
});

app.get("/", function (req, res) {
    res.status(200);
    res.sendFile("./public/", { "root": __dirname });
});

//GET all rants
app.get('/api/rants', function(req, res) {
	db.collection('rants').find({}).toarray(function(err, data){
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
		//_id: rantID,
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
            res.status(200);
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


