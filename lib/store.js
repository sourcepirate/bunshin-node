var db= require("diskdb");

function Entry(version, port, directory){
  this.data = {};
  this.data.version = this.data._id = version;
  this.data.port = port;
  this.data.directory = directory;
};

Entry.prototype.update = function(values, collection){
  var self = this;
  var oldSelf = Object.create(self.data);
  for(var key in values){
    self.data[key] = values[key];
  }
  return collection.update(oldSelf,self.data);
};

Entry.prototype.save = function(collection){
  var self = this;
  collection.save(self.data);
};

Entry.prototype.remove = function(collection){
  var self = this;
  return collection.remove({"version": self.data._id});
};

function Store(name) {
  if(!(this instanceof Store))
      return new Store(name);
  var name = name || __dirname+'/opt/node-app/config';
  var self = this;
  var _connection = db.connect(name, ["versions"]);
  self.collection = _connection.versions;
};

Store.prototype.create = function(version, port, directory) {
  var self = this;
  var entry = new Entry(version, port, directory)
  entry.save(self.collection);
  return entry;
};

Store.prototype.get = function(version){
  var self = this;
  entryObj = self.collection.findOne({"version":version});
  if(!entryObj)
     return null;
  var entry = new Entry(entryObj.version, entryObj.port, entryObj.directory);
  return entry;
};

Store.prototype.update = function(version, values){
  var self = this;
  var entryObj = self.get(version);
  return entryObj.update(values, self.collection);
};

Store.prototype.delete = function(version){
  var self = this;
  var entry = self.get(version);
  return entry.remove(self.collection);
};

module.exports = Store;
