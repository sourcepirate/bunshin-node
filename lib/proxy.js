var proxy = require('http-proxy');
var util = require('util');

var urlutil = require('./url.js');

function Proxy(name){
   var self = this;
   self._proxy = proxy.createProxyServer({});
   self.store = require('./store.js')(name);
}

Proxy.prototype.route = function(req, res){
  var self = this;
  var host = req.headers.host;
  var segments = host.split("-dot-");
  var version = segments[0];
  var app = self.store.get(version);
  self._proxy.web(req, res, {
    target: urlutil.getTarget(version, app.port);
  });
}


module.exports = Proxy;
