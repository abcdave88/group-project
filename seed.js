var REPL = require('repl');
var db = require('./models');

var repl = REPL.start('Users >')
repl.context.db = db;

db.User.collection.remove();
db.Location.collection.remove();
db.ThreeThings.collection.remove();

// db.User.create({
//   name: 'User One',
//   username: 'UzeeeerOne',
//   password: 'password',
//   email: 'userone@test.com'
// }, function(err, user){
//   console.log('user created');
//   console.log(user);
//   db.Location.create({
//     country: 'England',
//     city: 'London',
//     date_of_visit: '10/10/2010',
//      duration_of_visit: '2 weeks'
//   }, function(err, location){
//     console.log('location created');
//     console.log(location);
//     db.ThreeThings.create({
//       text: 'test1',
//       lat: '2343454',
//       lng: '133435'
//     }, function(err, threeThings){
//       console.log('things created');
//       console.log(threeThings);
//       location.three_things.push(threeThings);
//       user.locations.push(location);
//       user.save();
//     })
//   })
//   })

 // blog.comments.push(comment);
 //     blog.save()