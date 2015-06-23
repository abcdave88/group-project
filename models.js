var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/threethingsdatabase');

var Schema = mongoose.Schema;

var ThreeThingsSchema = new Schema({
  one: [],
  two: [],
  three: []
})

var ThreeThings = mongoose.model('ThreeThings', ThreeThingsSchema);

var LocationSchema = new Schema ({
  country: String,
  city: String,
  date_of_visit: String,
  duration_of_visit: String,
  three_things: [ThreeThingsSchema]
});

var Location = mongoose.model('Location', LocationSchema);

var UserSchema = new Schema ({
  name: String,
  username: String,
  password: String,
  email: String,
  locations: [LocationSchema]
});

var User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.Location = Location;
module.exports.ThreeThings = ThreeThings;