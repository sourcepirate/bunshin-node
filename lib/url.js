
var url = {};

function getTargetURL(version, port){
   console.log(port);
   var url = "http://localhost"+":"+port+"/";
   console.log(url);
   return url;
}

url["getTarget"] = getTargetURL;

module.exports = url;
