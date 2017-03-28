// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting

var express = require('express');
var router = express.Router();

var User = require("../models/usersModel");
var Item = require("../models/sightingsModel");

//Index '/'
router.get('/', function(req, res){
  console.log('homepage here!');
  res.render('index.hbs');
});


module.exports = router;