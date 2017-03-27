// ROUTES NEEDED:
// "/"
// "/user"------
// "/user/signup"
// "/user/badlogin"
// "/user/:id" dashboard, contains sightings list
// "/user/:id/sighting/:id" individual sighting


// var express = require('express');
// var router = express.Router({ mergeParams: true });

// var Sightings = require('../controllers/sightingController.js');
// var User = require('../controllers/usersController.js');

// // index sightings
// router.get('/', function(req, res) {
//           console.log('sighting here!');
//       res.send('sighting here');

//     // Sighting.find({})
//     //     .exec(function(err, sightings) {
//     //         if(err) console.log(err);

//     //         console.log('sightings');
//     //         res.send('sightings')
//     //         // res.render('sightings/index', {
//     //         // 	  sightings: sightings
//     //         // });
//     //     });
// });

// // individual sighting
// router.get('/:id', function(req, res) {
//           console.log('one sighting here!');
//       res.send('one sighting here');
// });

// module.exports = router;