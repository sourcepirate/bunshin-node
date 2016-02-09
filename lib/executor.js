var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var pStreams = require('./streams.js');

function executeNodeApp(dir){
  var package = require(dir+"/package.json");
  var childStream;
  if(package.scripts && package.scripts.start){
     console.log("executing "+ package.scripts.start)
     childStream = exec(package.scripts.start);top
  }
  else if(package.main){
    console.log("executing "+ package.main);
    console.log(dir+"/"+ package.main)
    childStream = spawn('node',[dir+"/"+ package.main]);
  }
  childStream.stdout.pipe(pStreams.logoutStream);
  // childStream.stderr.pipe(pStreams.logerrStream);
  childStream.stderr.on('error', function(err){
     console.log(err);
  });
  childStream.version = package.version;
  childStream.port = package.port;
  childStream.directory = dir;
  return childStream;
}

function NodeProcess(dirs){
   var self = this;
   if(!(this instanceof NodeProcess))
       return new NodeProcess(dirs);
   self._processes = {};
   dirs.forEach(function(dir){
       console.log("executing node in "+ dir)
       var stream = executeNodeApp(dir);
       self._processes[stream.version] = stream;
   });
}

NodeProcess.prototype.get = function(version){
  return this._processes[version];
}

NodeProcess.prototype.kill = function(version){
  var app = this._processes[version];
  if(app)
     process.kill(app.pid, 'SIGKILL');
}


module.exports = NodeProcess;
