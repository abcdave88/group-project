console.log('Oh hey guuurl!¡!¡!')

var express = require('express');
var app = express();
var path = require('path');

var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')
var db = require('./models')

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


require('./public/js/passport.js')(app, passport);

app.set('views','./views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req, res){
  res.render('index');
})


app.post('/signup', passport.authenticate('local-signup', {
       successRedirect : '/'
   }));


app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login'
    }));


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/users', function(req, res){
  db.User.find({}, function(err, users){
    res.send(users)
  });
})

app.get('/locations', function(req, res){
  db.Location.find({}, function(err, locations){
    res.send(locations);
  });
})

///posting in the database 
app.post('/places', isLoggedIn, function(req,res){
  db.Location.create(req.body.location, function(err, location){
    console.log('location created');
  
    db.User.find({_id: req.user.id}, function(err, user) {
      if(err) console.log(err);

      user[0].locations.push(location);
      user[0].save();
    })

    db.ThreeThings.create(req.body.three_things.one, function(err, topThree){
      location.three_things.push(topThree)
    })

    db.ThreeThings.create(req.body.three_things.two, function(err, topThree){
      console.log(topThree, 'second')
      location.three_things.push(topThree)
    })

    db.ThreeThings.create(req.body.three_things.three, function(err, topThree){
     console.log(topThree, 'third')
     location.three_things.push(topThree)
     location.save();
     res.send(location)
    });
  });
});


/// ajax  getting the citty's out of the database
app.get('/test', function(req,res){
  if (req.user) {
    console.log('if being run')
    db.User.findById({_id:req.user.id}, function(err, user){
      console.log(user, "this is after findById");
      res.send(user);
    })
  } else {
    console.log('else begin run')
    db.Location.find({}, function(err, places){
      res.send(places);
      console.log(places)
    });
  }  
})

/// ajax delete 
app.delete("/users/:user_id/locations/:place_id", function (req, res){
  var LocationId = req.params.place_id;
  var UserId = req.params.user_id;


  db.User.findByIdAndUpdate(
    UserId,
   { $pull: { 'locations': {  _id: LocationId } } },function(err,model){
      if(err){
        console.log(err);
        return res.send(err);
        }
        // return res.json(model);
        res.send(204);
    });
});

///Trending////
  app.get('/trending', function(req, res){
    db.ThreeThings.aggregate([
        {$group : { _id: "$text" , count : { $sum: 1}}},
        {$match : { count : { $gt : 1 } }} 
      ], function(err, duplicates){
    res.send(duplicates);
    });


  })
///Trending///

server.listen(port, function(){
  console.log("Server started on http://localhost:" + port);
})

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}