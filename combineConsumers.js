if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/combineConsumers');
} else {
  module.exports = require('./src/combineConsumers');
}
