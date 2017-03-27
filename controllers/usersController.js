// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting

var express = require('express');
var router = express.Router({ mergeParams: true });
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

// USER UPDATE ROUTE
router.patch('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body
    // { first_name: req.body.first_name,
    // last_name: req.body.last_name,
    // email: req.body.email }


    // can just pass in req.body since it contains the above data
  , { new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.redirect('/user')
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

//////////////////////////////////////////////
///Sightings

// ADD A NEW SIGHTING
router.post('/:id/sightings', function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user){
    user.sightings.push(new Sightings({common_name: req.body.common_name}));
    user.save(function(err){
      if (err) console.log(err);
      res.send(user);
    });
  });
});

// REMOVE AN SIGHTING
router.delete('/:userId/sightings/:id', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull:{
      sightings: {_id: req.params.id}
    }
  })
  .exec(function(err, item){
    if (err) console.log(err);
    res.redirect('/user/:id')
  });
});

// SIGHTING UPDATE ROUTE
router.patch('/:userId/sightings/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body
    // { first_name: req.body.first_name,
    // last_name: req.body.last_name,
    // email: req.body.email }


    // can just pass in req.body since it contains the above data
  , { new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.redirect('/:userId/sightings')
  });
});



module.exports = router;
