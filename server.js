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

app.get('/login', function(req, res) {
  res.render('login.ejs'); 
});

app.get('/signup', function(req, res) {
  res.render('signup.ejs'); 
});

app.get('/places', function(req, res){
  db.Location.find({}, function(err, places){
    res.send(places)
  });
})

app.post('/places', function(req,res){
  console.log(req.body)
  db.Location.create(req.body, function(err, place){
    console.log(place);
    res.send(201, place);
    // user.locations.push(place);
    // user.save()
   
  });

});

server.listen(port, function(){
  console.log("Server started on http://localhost:" + port);
})