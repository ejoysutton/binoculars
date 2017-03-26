var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-mongoose-lesson-starter');

var User = require('../models/user');
var Sighting = require('../models/sighting');

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Sighting.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});

// create new users
var danny = new User({
  name: 'Danny',
  email: 'danny@gmail.com',
  password: blugh,
  items: [{common_name: "American Robin", location: "Orange Park", date: "03/10/2017", time: "12:25"}]
});

var maren = new User({
  name: 'Maren',
  email: 'maren@gmail.com',
  password: blugh,
  items: [{common_name: "American Robin", location: "Orange Park", date: "03/10/2017", time: "12:25"}]
});

var diesel = new User({
  name: 'diesel',
  email: 'diesel@gmail.com',
  password: blugh,
  items: [{common_name: "American Robin", location: "Orange Park", date: "03/10/2017", time: "12:25"}]
});

// save the users
danny.save(function(err) {
  if (err) console.log(err);

  console.log('User created!');
});

maren.save(function(err) {
  if (err) console.log(err);

  console.log('User created!');
});

diesel.save(function(err) {
  if (err) console.log(err);
  
  console.log('User created!');
});