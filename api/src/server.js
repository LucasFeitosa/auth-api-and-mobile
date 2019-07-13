var express      = require('express');
var bodyParser   = require('body-parser');
var passport     = require('passport');
var mongoose     = require('mongoose');
var config       = require('./config/config');
var port         = process.env.PORT || 5000;
const cors       = require('cors'); 


var app = express();

app.use(function(req, res, next){
    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
  
    //Request methods you with to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    //Request headers you with to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, X-Requested-With, content-Type, Authorization');
  
    //Set to true if you need the website to include cookies in the requests sent
    //to the API (e.g. in case you use sessions)
    //set.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.get('/', function(req, res) {
    return res.send('Hello! The API is at http://localhost:'+ port + '/api');
});

var routes = require('./routes.js');
app.use('/api', routes);

//Connection com DB
mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is up and running. " + err);
    process.exit();
});

app.listen(port);

console.log("App is up and runing!");