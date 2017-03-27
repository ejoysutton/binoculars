// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting

var express = require('express');
var router = express.Router();

var User = require("../models/users");
var Item = require("../models/sightings");

//Index '/'
router.get('/', function(req, res){
  console.log('homepage here!');
  res.send('homepage')
});


module.exports = router;