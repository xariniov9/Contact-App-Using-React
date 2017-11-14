var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var imageService = require('./imageService');


var db = mongoose.createConnection('mongodb://xariniov:apple@ds227865.mlab.com:27865/contactsdb');

var app = express();

imageService(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + "/public"));


// Routes
app.use('/api', require('./api'));

app.listen(3100, function(){
    console.log("Listening on port 3100!")
});

