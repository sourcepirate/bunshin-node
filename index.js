#!/usr/bin/env node
var program = require('commander');
var Container = require('./lib/container.js');
var pconfig = require('./package.json');
var chalk = require('chalk');


program
    .version(pconfig.version)
    .option('-a, --appdir [value]', 'App Directory')
    .option('-d, --database [value]', 'App Database')
    .option('-p, --port <n>', 'App Port')
    .parse(process.argv)

var container = Container(program.port, program.appdir, program.database);

container.on('ready', function(){
  chalk.green('Listening on '+ program.port);
});
