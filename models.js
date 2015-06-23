var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
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
  latLong: String,
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


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.Location = Location;
module.exports.ThreeThings = ThreeThings;
