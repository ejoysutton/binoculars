var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var SightingSchema = new Schema({
  common_name: String,
  location: String,
  date: String,
  time: String
});

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password_digest: String,
  email: {
    type: String,
    match: /.+\@.+\..+/
  },
  created_at: Date,
  sightings: [SightingSchema]
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var SightingModel = mongoose.model("Sighting", SightingSchema);
var UserModel = mongoose.model("User", UserSchema);

module.exports = {
  User: UserModel,
  Sighting: SightingModel
};