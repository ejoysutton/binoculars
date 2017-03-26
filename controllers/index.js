// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var express = require('express');
var router = express.Router();

var User = require("../models/users");
var Item = require("../models/sightings");

// USERS INDEX ROUTE
router.get('/', function(req, res){
  User.find({})
    .exec(function(err, users){
      if (err) { console.log(err); }
      console.log(users);
      res.send(users);
    });
});

// USER SHOW ROUTE
router.get('/:id', function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    res.send(user);
  });
});

// USER CREATE ROUTE
router.post('/', function(req, res){
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.send(user);
  });
});

// USER UPDATE ROUTE
router.patch('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, { new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.send(user);
  });
});

// USER DESTROY
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log('User deleted!');
    res.send("User deleted");
  });
});

// ADD A NEW SIGHTING
router.post('/:id/sightings', function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user){
    user.items.push(new Sighting({common_name: req.body.common_name, location: req.body.location, date: req.body.date, time: req.body.time}));
    user.save(function(err){
      if (err) console.log(err);
      res.send(user);
    });
  });
});

// REMOVE A SIGHTING
router.delete('/:userId/sightings/:id', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull:{
      sightings: {_id: req.params.id}
    }
  })
  .exec(function(err, item){
    if (err) console.log(err);
    res.send(sighting + " Sighting deleted");
  });
});


module.exports = router;