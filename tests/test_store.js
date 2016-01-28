var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Version = require('../lib/store.js');

function isEmpty(obj){
  if (obj == null) return true;
  for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 return true;
}


describe('Store suite', function() {

  before(function(done) {
    var persistData = [{
      version: '0.0.1',
      port: 9000,
      directory: '/home'
    }, {
      version: '0.0.2',
      port: 9001,
      directory: '/home'
    }, {
      version: '0.0.3',
      port: 9002,
      directory: '/hello'
    }, {}];
    persistData.forEach(function(data){
      if(!isEmpty(data)){
        var version = new Version(data);
        version.save();
      }else{
        done();
      }
    });
  });

  it('should run', function(){
     assert.ok(true);
  });


});
