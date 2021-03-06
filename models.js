var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var db_url = process.env.MONGOLAB_URI || 'mongodb://localhost/threethingsdatabase'
mongoose.connect(db_url);

var Schema = mongoose.Schema;

var ThreeThingsSchema = new Schema({
  text: String,
  lat: String,
  lng: String
})

var ThreeThings = mongoose.model('ThreeThings', ThreeThingsSchema);

var LocationSchema = new Schema ({
  country: String,
  city: String,
  date_of_visit: String,
  duration_of_visit: String,
  lat: Number,
  lng: Number,
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
