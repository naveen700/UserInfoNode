const rn = require('random-number');
var num = rn.generator({
    min : 10000,
    max:  99999
    ,integer : true
})



module.exports.num = num;

