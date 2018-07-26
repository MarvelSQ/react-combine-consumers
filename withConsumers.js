if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod/withConsumers');
} else {
  module.exports = require('./lib/withConsumers');
}
