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

///REnder badlogin
router.get('/badlogin', function(req, res){
  console.log('bad login here!');
  res.render('badlogin.hbs');
});

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
  , { new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.redirect('/user')
  });
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
router.post('/:userId/sightings', authHelpers.authorize, function(req, res){
  User.findById(req.params.userId)
  .exec(function(err, user){
    var currentUserLocation = req.params.userId;
    user.sightings.push(new Sightings(req.body));
    user.save(function(err){
      if (err) console.log(err);
      res.redirect('/user/:id');
    });
  });
});

// REMOVE A SIGHTING
router.delete('/:userId/sightings/:id', authHelpers.authorize, function(req, res){
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
router.patch('/:userId/sightings/:id', authHelpers.authorizeNewSighting, function(req, res){
    User.findById(req.params.userId)
      .exec(function(err, user){
        if (err) { return console.log(err); }
        console.log(user);
        var currentUserLocation = req.params.userId;
        var sightingsArray = user.sightings;
        var targetSighting = sightingsArray.id(req.params.id);
        targetSighting.set(req.body);
        user.save(function(err, user) {
          if (err) { console.log(err); }
          console.log(user);
          res.redirect("../");
        });
    });
});

router.get('/:userId/sightings/:id', function(req, res) {
  User.findById(req.params.userId)
  .exec(function(err, user) {
    if (err) { return console.log(err); }
    var currentUserLocation = req.params.userId;
    var targetUser = user;
    var sightingsArray = user.sightings;
    var targetSighting = sightingsArray.id(req.params.id);
    console.log(user);
    res.render('sighting/show.hbs', { targetUser: targetUser, targetSighting: targetSighting } );
  });
});

router.get('/:userId/sightings/:id/edit', authHelpers.authorize, function(req, res) {
  User.findById(req.params.userId)
  .exec(function(err, user) {
    if (err) { return console.log(err); }
    var targetUser = user;
    var sightingsArray = user.sightings;
    var targetSighting = sightingsArray.id(req.params.id);
    console.log(user);
    res.render('sighting/edit.hbs', { targetUser: targetUser, targetSighting: targetSighting } );
  });
});


module.exports = router;