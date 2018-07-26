'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var CONTEXT_TYPE = require('./ContextType');

module.exports = {
  assign: function assign(objs) {
    return objs.reduce(function (f, e) {
      return _extends({}, f, e);
    }, {});
  },
  type: function type(target) {
    return typeof target === 'undefined' ? 'undefined' : _typeof(target);
  },
  is: function is(target, type) {
    return type === (typeof target === 'undefined' ? 'undefined' : _typeof(target));
  },
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