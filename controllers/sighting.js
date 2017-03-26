var express = require('express');
var router = express.Router();

var Sighting = require('../models/sighting');

// index authors
router.get('/', function(req, res) {
    // res.send('authors will be here');
    Sighting.find({})
        .exec(function(err, sightings) {
            if(err) console.log(err);

            console.log(sightings);
            // res.send(authors);
            res.render('sightings/index', {
            	  sightings: sightings
            });
        });
});