var http = require('http');
var config = require('./package.json');


var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log(req.domain);
  console.log(req.headers.host);
  res.write("hello from app2");
  res.end();
});

server.listen(config.port);
