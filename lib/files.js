var fs = require('chokidar');
var _file = require('fs');
var events = require('events').EventEmitter;
var util = require('util');

function Files(dir){
   // is the deployment directory.
   dir = dir || '/opt/node-apps/';
   _file.lstatSync(dir).isDirectory() ? true :throw new Error("Is not directory");
   var subpath = "deployments"
   self._base = subpath
   events.call(this);
   // watching file events on deployment direcotr
   function onWatch(event, file){
     this.emit(event, file);
   };

   this._watcher = fs.watch(dir+self._base,{
     ignoreInitial: true,
     cwd: '.'
   });

   this._watcher.on(onWatch.bind(this));
};

util.inherits(Deployments, events);

Files.prototype.listApps = function(){
  var self = this;
  var dirs = Object.keys(this._watcher.getWatched());
  dirs = dirs.filter(function(dir){
    return dir != "." && dir != self._base && dir.split("/").length == 2;
  });
  return dirs;
};
