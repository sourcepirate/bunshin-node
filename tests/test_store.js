var assert = require('assert');
var Store = require('../lib/store.js')("mock");

function isEmpty(obj){
  if (obj == null) return true;
  for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 return true;
}


describe('Store suite', function() {

  before(function(done) {
     Store.create('1.0.0', 9090, "/home/github");
     Store.create('1.0.1', 9091, "/home/app2");
     done();
  });

  describe('Should CRUD Properly',function(){

    it('should read', function(done){
      var entry = Store.get('1.0.0');
      assert.ok(entry);
      done();
    });

    it('should update', function(done){
      Store.update('1.0.0', {port: 10020});
      entry = Store.get('1.0.0');
      assert.ok(entry.data.port == 10020)
      done();
    });

    it('should delete', function(done){
      Store.delete('1.0.0');
      entry = Store.get('1.0.0');
      assert.ok(!entry);
      done();
    });

  });
});
