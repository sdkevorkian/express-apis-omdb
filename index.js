var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var request = require("request");

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// this adds some logging to each request
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
    res.send('Hello Backend!');
});

app.get('/results', function(req, res) {
    request('http://www.omdbapi.com/?t=' + req.query.q, function(err, response, body) {
        var data = JSON.parse(body);
        res.render("results", data);
        console.log(body);
    });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
