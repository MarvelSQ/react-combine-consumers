'use strict';

var CONTEXT_TYPE = require('./ContextType');

module.exports = {
  getConsumersAndKeys: function getConsumersAndKeys(consumers) {
    var consumerKeys = Object.keys(consumers);
    var finalKeys = [];
    var finalConsumers = [];
    for (var i = 0; i < consumerKeys.length; i++) {
      var key = consumerKeys[i];

      if (process.env.NODE_ENV !== 'production') {
        if (typeof consumers[key] === 'undefined') {
          console.warn('No consumer provided for key "' + key + '"');
        } else if (consumers[key].$$type === CONTEXT_TYPE) {
          console.warn('key "' + key + '" is not A React.context Component');
        }
      }

      if (typeof consumers[key] !== 'undefined' && consumers[key].$$typeof === CONTEXT_TYPE) {
        var postion = finalKeys.push(key);
        finalConsumers[postion - 1] = consumers[key];
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('combined consumer', finalKeys);
    }
    return { keys: finalKeys, consumers: finalConsumers };
  },
  getMappedValue: function getMappedValue(values, keys) {
    var nextValue = {};
    for (var i = 0; i < keys.length; i++) {
      nextValue[keys[i]] = values[i];
    }
    return nextValue;
  }
};