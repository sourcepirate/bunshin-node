var DEFAULT_PORT = 8080;

var http = require('http');
var proxy = require('./proxy.js');
var Events = require('events').EventEmitter;
var util = require('util');
var executor = require('./executor.js');
var Files = require('./files.js');
var Store = require('./store.js');

/*
 * port is basically the port on which the node-staging demon
 * runs.
 */
function Container(port, root, db_root){
   this._proxyport = port;
   this._dirroot = root;
   this._dbroot = db_root;

   this.files = Files(this._dirroot);
   this.db = Store(this._dbroot);
}

util.inherits(Container, Events);
