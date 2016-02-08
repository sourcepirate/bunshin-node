var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var pStreams = require('./streams.js');

function executeNodeApp(dir){
  var package = require(dir+"/package.json");
  var childStream;
  if(package.scripts && package.scripts.start){
     childStream = exec(package.scripts.start);
  }
  else if(package.main){
    childStream = spawn('node',[dir+ package.main]);
  }
  childStream.stdout.pipe(pStreams.logoutStream);
  childStream.stderr.pipe(pStreams.logerrStream);
  childStream.version = package.version;
  return childStream;
}

function NodeProcess(dirs){
   var self = this;
   self._processes = {};
   dirs.forEach(function(dir){
       var stream = executeNodeApp(dir);
       self._processes[stream.version] = stream;
   });
}

NodeProcess.prototype.get = function(version){
  return this._processes[version];
}
