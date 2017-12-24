var express = require('express'); 
var mongoose = require('mongoose');       // call express
var bodyParser = require('body-parser');
const cors = require('cors')
var jwt  = require('jsonwebtoken');
var app = express();                 // define our app using express


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const appRoutes = require('./routes/index.js')(app);


mongoose.connect('mongodb://localhost:27017/crudApp');

var port = process.env.PORT || 8080;        // set our port


app.listen(port);
console.log('Magic happens on port ' + port);

app.get('/', function(req, res) {
    res.send("<h1>App Working !</h1>");   
});


