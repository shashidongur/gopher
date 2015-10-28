var express = require('express');
var bodyParser = require("body-parser");
var router = express();
var validator = require('validator');
var mongodb = require('mongodb');
var http = require('http'); //HTTP request
var MongoClient = mongodb.MongoClient; //We need to work with "MongoClient" interface in order to connect to a mongodb server.
var url = "mongodb://localhost:27017/gopher"; // Connection URL. This is where your mongodb server is running.

router.use(bodyParser.urlencoded({extended:false}));


/* GEt index.html */
router.get('/', function (req, res) {
  res.sendFile('../index.html', {root: __dirname});
});

/* POST to Add User Service */
router.post('/addUserEmail', function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var userEmail = req.body;
    if(validator.isEmail(userEmail.email))
    {
	    // Submit to the DB
	    MongoClient.connect(url, function (err, db) {
	    	if (err) {
	    		console.log('Unable to connect to the mongoDB server. Error:', err);
	    	} else {
	    		console.log('connections established to', url);
		    	// Get the documents collection
		    	var collection = db.collection('userEmails');

			    // Insert some users
			    collection.insert([userEmail], function (err, result) {
			      	if (err) 
				    {
				        console.log(err);
				    }
			      	//Close connection
			      	db.close();
		  		});
			}
		});
	}
});

router.post('/investorMessage', function(req, res){
	var investorMessage = req.body;
	// Submit to the DB
    MongoClient.connect(url, function (err, db) {
    	if (err) {
    		console.log('Unable to connect to the mongoDB server. Error:', err);
    	} else {
    		console.log('connections established to', url);
	    	// Get the documents collection
	    	var collection = db.collection('investorMessages');

		    // Insert some users
		    collection.insert([investorMessage], function (err, result) {
		      	if (err) 
			    {
			        console.log(err);
			    }
		      	//Close connection
		      	db.close();
	  		});
		}
	});
});
module.exports = router;