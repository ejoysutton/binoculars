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
  name: String,
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
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


var UserModel = mongoose.model("User", UserSchema);
var SightingModel = mongoose.model("Sighting", SightingSchema);

module.exports = {
  User: UserModel,
  Sighting: SightingModel
};