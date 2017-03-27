// // ROUTES NEEDED:
// // "/"
// // "/user"------
// // "/user/signup"
// // "/user/badlogin"
// // "/user/:id" dashboard, contains sightings list
// // "/user/:id/sighting/:id" individual sighting


// var express = require('express');
// var router = express.Router({ mergeParams: true });

// var Sightings = require('../controllers/sightingController.js');
// var User = require('../controllers/usersController.js');

// router.use('/user/sightings', sightingController);
// // ADD A NEW SIGHTING
// router.post('/:userId/sightings', function(req, res){
//   User.findById(req.params.id)
//   .exec(function(err, user){
//     user.sightings.push(new Sightings({common_name: req.body.common_name}));
//     user.save(function(err){
//       if (err) console.log(err);
//       res.send(user);
//     });
//   });
// });

// // REMOVE A SIGHTING
// router.delete('/:userId/sightings/:id', function(req, res){
//   User.findByIdAndUpdate(req.params.userId, {
//     $pull:{
//       sightings: {_id: req.params.id}
//     }
//   })
//   .exec(function(err, item){
//     if (err) console.log(err);
//     res.redirect('/user/:id')
//   });
// });

// // SIGHTING UPDATE ROUTE
// router.patch('/:userId/sightings/:id', function(req, res){
//   User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
//   .exec(function(err, user){
//     if (err) { console.log(err); }
//     console.log(user);
//     res.redirect('/:userId')
//   });
// });


// module.exports = router;