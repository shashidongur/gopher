var express = require('express');
var app = express(),
    path = require('path'),
    routes = require('./routes/index');

// Setup static public directory
app.use(express.static(path.join(__dirname , '/public')));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

app.use('/', routes);

  console.log('Gopher listening at http://%s:%s', host, port);
});