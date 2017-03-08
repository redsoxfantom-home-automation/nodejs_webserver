var config = require('./config.json')
var winston = require('winston')

module.exports = function(module) {

var logger = new (winston.Logger)({
   transports: [
      new (winston.transports.Console)({
         formatter: function(options) {
            return options.level + ' ['+ module +'] : ' + options.message
         }
      })
   ]
});

return logger;
}
