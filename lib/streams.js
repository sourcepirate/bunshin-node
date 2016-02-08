var stream = require('stream');
var Transform = stream.Transform;
var chalk = require('chalk');

var logStream = new Transform({objectMode: true});
var errStream = new Transform({objectMode: true});

logStream._transform = function(chunk, encoding, done){
    var data = chunk.toString();
    chalk.green(data);
    this.push(data);
    done();
}

logStream._flush = function(done){
    this.push(null);
    done();
}

errStream._transform = function(chunk, encoding, done){
  var data = chunk.toString();
  chalk.red(data);
  this.push(data);
  done();
}

errStream._flush = function(done){
  this.push(null);
  done();
}

module.exports.logoutStream = logStream;
module.exports.logerrStream = errStream;
