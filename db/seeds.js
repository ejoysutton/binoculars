var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_8jddbrfh:hugkjreq35221hlopm2vbktdk6@ds025239.mlab.com:25239/heroku_8jddbrfh');
var Schema = require("./schema.js");

var UserModel = require('../controllers/usersController');
var SightingModel = require('../controllers/sightingController');

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing students and projects.
// UserModel.remove({}, function(err) {
//   console.log(err);
// });

// SightingModel.remove({}, function(err) {
//   console.log(err);
// });

// Now, we will generate instances of a Student and of their Project.
var becky = new UserModel({name: "becky"});
var brandon = new UserModel({name: "brandon"});
var steve = new UserModel({name: "steve"});

var sighting1 = new SightingModel({common_name: "American Robin", location: "yard", date: "03/26/17", time: "12.45"});
var sighting2 = new SightingModel({common_name: "Chimney Swift", location: "house", date: "03/26/17", time: "12.45"});
var sighting3 = new SightingModel({common_name: "Barred Owl", location: "woods", date: "03/26/17", time: "12.45"});
var sighting4 = new SightingModel({common_name: "Eastern Phoebe", location: "field", date: "03/26/17", time: "12.45"});

// create two arrays that we can iterate over
var users = [becky, brandon, steve];
var sightings = [sighting1, sighting2, sighting3, sighting4];

// Here we assign some projects to each student.
users.forEach(function(student, i){
  users.sightings.push(sightings[i], sightings[i + 1]);

  users.save(function(err) {
    if(err) { console.log(err); }
    
    console.log(users);
  });
});