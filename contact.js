var restful = require('node-restful');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://xariniov:apple@ds227865.mlab.com:27865/contactsdb');

var contactSchema = new mongoose.Schema({
    name: String,
    phone_office: String,
    phone_personal: String,
    image: String
});
module.exports = restful.model('tblcontact', contactSchema);
