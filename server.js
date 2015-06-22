console.log('Oh hey guuurl!¡!¡!')

var express = require('express');
var app = express();
var path = require('path');

var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser')
var morgan = require('morgan');
var mongoose = require('mongoose')
var db = require ('./models')

app.set('views','./views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.render('index');
})

server.listen(port, function(){
  console.log("Server started on http://localhost:" + port);
})