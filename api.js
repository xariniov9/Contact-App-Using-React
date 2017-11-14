var express = require('express');
var router = express.Router();
var contact = require('./contact');



contact.methods(['get', 'put', 'post', 'delete']);
contact.register(router, '/contact');

module.exports = router;
