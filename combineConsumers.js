if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod/combineConsumers');
} else {
  module.exports = require('./lib/combineConsumers');
}
