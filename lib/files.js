var fs = require('chokidar');
var _file = require('fs');
var events = require('events').EventEmitter;
var util = require('util');

function Files(dir){
   // is the deployment directory.
   dir = dir || '/opt/node-apps/deployments/';
   events.call(this);
   // watching file events on deployment direcotr
   function onWatch(event, file){
     this.emit(event, file);
   };

   this._watcher = fs.watch(dir,{
     ignoreInitial: true,
     cwd: '.'
   });

   this._watcher.on(onWatch.bind(this));
}

util.inherits(Deployments, events);
