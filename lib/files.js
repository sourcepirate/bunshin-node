var fs = require('chokidar');
var _file = require('fs');
var events = require('events').EventEmitter;
var util = require('util');

function Files(dir) {
  // is the deployment directory.
  if(!(this instanceof Files))
      return new Files(dir);
  var self = this;
  console.log(dir);
  dir = dir || '/opt/node-apps/';
  _file.lstatSync(dir).isDirectory() ? true : (function(){throw new Error("Is not directory")})();
  var subpath = "deployments/"
  self._base = subpath
  events.call(this);
  // watching file events on deployment direcotr
  function onWatch(event, file) {
    console.log(event)
    console.log(file);
    this.emit(event, file);
  };
  console.log(dir + self._base);
  this._watcher = fs.watch(dir + self._base, {
    //ignoreInitial: true
    // cwd: '.'
  });
  console.log("binding")
  this._watcher.on('all',onWatch.bind(this));
  this._watcher.on('ready', onWatch.bind(this, 'ready', ''));
};

util.inherits(Files, events);

Files.prototype.listApps = function() {
  var self = this;
  console.log("apps are")
  console.log(this._watcher.getWatched())
  var dirs = Object.keys(this._watcher.getWatched());
  console.log(dirs);
  dirs = dirs.filter(function(dir) {
    return dir != "." && dir != self._base && dir.split("deployments/").length == 2;
  });
  console.log(dirs);
  return dirs;
};

Files.prototype.getApp = function(appDir){
   if(_file.existsSync(appDir+'/package.json'))
       return appDir+'/package.json';
   else
       throw Error("No Package.json file found on"+appDir);
};

module.exports = Files;
