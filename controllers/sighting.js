var express = require('express');
var router = express.Router({ mergeParams: true });

var Sighting = require('../controllers/sighting');

// index authors
router.get('/', function(req, res) {
    Sighting.find({})
        .exec(function(err, sightings) {
            if(err) console.log(err);

            console.log(sightings);
            res.render('sightings/index', {
            	  sightings: sightings
            });
        });
});