var express = require('express');
var request = require('request');

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var db;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://arn197:hellobyebye@ds155028.mlab.com:55028/bsafe',function(err, database){     
	if(err)         
		return console.log("Error while connecting to database");     
	db = database; 
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/heatmap.html');
})

app.get('/view',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/views',function(req,res){
	db.collection('latlng').find().toArray(function(err,result){         
		console.log(result);         
		res.json(result);     
	});
})

app.get('/sendata',function(req,res){
	var data;
	var id = req.body.id;
	var token = req.body.tok;
	request('http://graph.facebook.com/' + id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
        data = body;
    }
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
