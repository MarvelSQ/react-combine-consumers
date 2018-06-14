if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/withConsumers');
} else {
  module.exports = require('./src/withConsumers');
}
