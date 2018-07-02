 const fs = require('fs');   


var check = function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }

  
  module.exports.check = check;