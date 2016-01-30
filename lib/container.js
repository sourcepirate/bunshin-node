var DEFAULT_PORT = 8080;

var http = require('http');
var proxy = require('./proxy.js');
var Events = require('events').EventEmitter;
var util = require('util');

/
 * port is basically the port on which the node-staging demon
 * runs.
 */
function Container(port){

}
util.inherits(Container, Events);
