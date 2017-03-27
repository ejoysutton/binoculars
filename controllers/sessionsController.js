var express = require('express');
router = express.Router();
var User = require('../models/usersModel.js');
var authHelpers = require('../helpers/auth.js')

router.get('/login', function(req, res) {
  res.render('user/login.hbs')
})

router.post('/login', authHelpers.loginUser, function(req, res){
  res.redirect('/user')
});

router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('/user');
  });
})

module.exports = router;
