const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const router = express.Router();
var login = require('./router/login');
let  app = express();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/login',login);


app.listen(88);

module.exports = app;
