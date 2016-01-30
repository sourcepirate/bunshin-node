
var url = {};

function getTargetURL(version, port){
   var url = "http://localhost"+":"+port.toString()+"/";
   return url;
}

url["getTarget"] = getTargetURL;

module.exports = url;
