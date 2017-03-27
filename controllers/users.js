// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting


var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Sightings = require('../models/sightings.js')
var authHelpers = require('../helpers/auth.js')


router.get('/signup', function(req, res){
	  console.log('signup here!');
	  res.send('signup here');
});


router.post('/', authHelpers.createSecure, function(req, res){
		console.log(req.params);
	var user =  new User({
		email: req.body.email,
		name: req.body.name,
		password_digest: res.hashedPassword
	});

	user.save(function(err, user) {
		if (err) { console.log(err); }
		console.log(user);
		res.redirect("/sessions/login");
	});
});

router.get('/badlogin', function(req, res){
  console.log('bad login here!');
  res.send('Bad Login');
});

router.get('/:id', function(req, res){
	  console.log('User here!');
	  res.send('User');
});

router.get('/', function(req, res){
	  console.log('User here!');
	  res.send('User');
});

module.exports = router;