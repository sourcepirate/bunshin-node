var http = require('http');
var proxy = require('./proxy.js');
var Events = require('events').EventEmitter;
var util = require('util');
var Executor = require('./executor.js');
var Files = require('./files.js');
var Store = require('./store.js');
var Proxy = require('./proxy.js');

/*
 * port is basically the port on which the node-staging demon
 * runs.
 */
function Container(port, root, db_root){

   if(!(this instanceof Container))
       return new Container(port, root, db_root);
   this._proxyport = port;
   this._dirroot = root;
   this._dbroot = db_root;
   this.files = Files(this._dirroot);
   this.db = Store(this._dbroot);
   var self = this;
   setTimeout(function(){
     self.execute();
   }, 1000);
  // this.execute();
}

util.inherits(Container, Events);


Container.prototype.execute = function(){
  console.log("calling execute");
  var self = this;
  self.apps = self.files.listApps();
  console.log(self.apps);
  self.apps.forEach(function(app){
      console.log(app)
      var json_path = self.files.getApp(app);
      var package_json = require(json_path);
      self.db.create(package_json.version.toString(),
                     package_json.port,
                     app);
  });
  self.executor = Executor(self.apps);
  self.proxy = Proxy(self._dirroot, self.db);
  self.proxy.listen(self._proxyport);
}




module.exports = Container;
