var express = require('express');
var router = express.Router({ mergeParams: true });

var Sightings = require('../controllers/sighting');
var User = require('../controllers/users.js');

// index sightings
router.get('/', function(req, res) {
          console.log('sighting here!');
      res.send('sighting here');

    // Sighting.find({})
    //     .exec(function(err, sightings) {
    //         if(err) console.log(err);

    //         console.log('sightings');
    //         res.send('sightings')
    //         // res.render('sightings/index', {
    //         // 	  sightings: sightings
    //         // });
    //     });
});

module.exports = router;