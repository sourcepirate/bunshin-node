var proxy = require('http-proxy');
var util = require('util');
var http = require('http');
var urlutil = require('./url.js');

function Proxy(name, store){
   if(!(this instanceof Proxy))
        return new Proxy(name, store);
   var self = this;
   self._proxy = proxy.createProxyServer({});
   self.store = store || require('./store.js')(name);
   self.defaulthttpPort = 8080;
   self.activate();
}

Proxy.prototype._route = function(req, res){
  var self = this;
  var host = req.headers.host;
  console.log(host);
  var segments = host.split(".dot.");
  var version = segments[0];
  console.log("proxy is getting the version "+ version);
  var app = self.store.get(version);
  console.log(app);
  self._proxy.web(req, res, {
    target: urlutil.getTarget(version, app.data.port)
  });
}

Proxy.prototype.activate = function(){
  var self = this;
  self.server = http.createServer(function(req, res){
    self._route(req, res);
  });
}


Proxy.prototype.listen = function(port){
  var self = this;
  self.server.listen(self.defaulthttpPort|| port);
}

module.exports = Proxy;
