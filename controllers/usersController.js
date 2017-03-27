// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting


var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');
var Sightings = require('../models/sightingsModel')
var authHelpers = require('../helpers/auth.js')

///Render Signup
router.get('/signup', function(req, res){
  res.render('user/signup.hbs');
});
router.get('/:id', function(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    // res.render('user/show.hbs', { user: user } );
    res.render('user/show.hbs', { user } );
  });
});

// USER DESTROY
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log('User deleted!');
    res.redirect('/user')
    // res.send("User deleted");
  });
});

///Create User
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

///Render Badlogin
router.get('/badlogin', function(req, res){
  console.log('bad login here!');
  res.send('Bad Login');
});


///Render User
router.get('/:id', function(req, res){
	  console.log('User here!');
	  res.send('User');
});

///Render all Users
router.get('/', function(req, res) {
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('user/index.hbs', { users: users })
  });
});

module.exports = router;


//////
// var express = require('express');
// router = express.Router();
// var User = require('../models/user.js');
// var authHelpers = require('../helpers/auth.js')

// router.get('/', function(req, res) {
//   User.find({})
//   .exec(function(err, users){
//     if (err) { console.log(err); }
//     res.render('users/index.hbs', { users: users })
//   });
// })



// router.get('/signup', function(req, res){
//   res.render('users/signup.hbs');
// });
// router.get('/:id', function(req, res) {
//   User.findById(req.params.id)
//   .exec(function(err, user) {
//     if (err) console.log(err);
//     console.log(user);
//     // res.render('user/show.hbs', { user: user } );
//     res.render('users/show.hbs', { user } );
//   });
// })

// router.post('/', authHelpers.createSecure, function(req, res){
//   var user = new User({
//     email: req.body.email,
//     password_digest: res.hashedPassword
//   });

//   user.save(function(err, user){
//     if (err) console.log(err);

//     console.log(user);
//     res.redirect('/users');
//   });

// });

module.exports = router;
