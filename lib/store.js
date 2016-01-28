var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema({
    'version': String,
    'port': Number,
    'directory': String,
    'last_deployed': {
      type: Date,
      default: Date.now
    }
});

VersionSchema.statics.getByVersion = function(version){
  var self = this;
  var result = new Promise(function(resolve, reject){
      self.findOne({version: version}, function(err, docs){
        if(err){
          reject(err);
        }else{
          resolve(docs);
        }
      })
  });
  return result;
}

VersionSchema.statics.getByQuery = function(query){
  var self = this;
  var result = new Promise(function(resolve, reject){
    self.find(query, function(err, docs){
      if(err)
        reject(err)
      else
        resolve(docs);
    })
  });
  return result;
}


module.exports = mongoose.model('Version', VersionSchema);
