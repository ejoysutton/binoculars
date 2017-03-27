// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting


var express = require('express');
var router = express.Router();
var User = require('../controllers/users.js');
var Sightings = require('../controllers/sighting.js')
var authHelpers = require('../helpers/auth.js')


router.get('/signup', function(req, res){
	  console.log('signup here!');
	  res.send('signup here')
});

router.post('/', authHelpers.createSecure, function(req, res){
});

router.get('/badlogin', function(req, res){
  console.log('bad login here!');
  res.send('Bad Login')
});

router.get('/:id', function(req, res){
	  console.log('User here!');
	  res.send('User')
});

module.exports = router;