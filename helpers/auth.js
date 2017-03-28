var bcrypt = require('bcrypt');
var User = require('../models/usersModel.js');

function createSecure(req, res, next) {
  var password = req.body.password;
  console.log(req.params);
  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
};

function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

 var query = User.findOne({ email: email }).exec();

  User.findOne({ email: email })
  .then(function(foundUser){
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"})

    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    res.json({status: 500, data: err})
  });
};

function authorize(req, res, next) {
  var currentUser = req.session.currentUser;
  console.log(currentUser);
  if (!currentUser || currentUser._id !== req.params.id ) {
    res.send({status: 401})
  } else {
    next();
  };
};

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
};
