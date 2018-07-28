'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

var _console = console,
    warn = _console.warn,
    log = _console.log;


var CONTEXT_TYPE = typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.context') : 0xeace;

function getMappedValue(values, keys) {
  var nextValue = {};
  for (var i = 0; i < keys.length; i++) {
    nextValue[keys[i]] = values[i];
  }
  return nextValue;
}

function getConsumersAndKeys(consumers) {
  var consumerKeys = Object.keys(consumers);
  var finalKeys = [];
  var finalConsumers = [];
  for (var i = 0; i < consumerKeys.length; i++) {
    var key = consumerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof consumers[key] === 'undefined') {
        warn('No consumer provided for key "' + key + '"');
      } else if (consumers[key].$$type === CONTEXT_TYPE) {
        warn('key "' + key + '" is not A React.context Component');
      }
    }

    if (typeof consumers[key] !== 'undefined' && consumers[key].$$typeof === CONTEXT_TYPE) {
      var postion = finalKeys.push(key);
      finalConsumers[postion - 1] = consumers[key];
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    log('combined consumer', finalKeys);
  }
  return { keys: finalKeys, consumers: finalConsumers };
}

function combine(originConsumers, keys, render, preRender) {
  var FirstConsumer = originConsumers[0];
  var NextConsumers = originConsumers.slice(1);
  function reduceConsumers(consumers, values) {
    var Consumer = consumers.shift();
    return function (curValue) {
      var nextValues = [].concat(_toConsumableArray(values), [curValue]);
      if (!Consumer) {
        var component = preRender(getMappedValue(nextValues, keys), render);
        if (!React.isValidElement(component)) {
          if (process.env.NODE_ENV !== 'production') warn('MapValue contain \'' + keys + '\' not return a Vaild Component');
          return undefined;
        }
        return component;
      }
      return React.createElement(
        Consumer,
        null,
        reduceConsumers(consumers, nextValues)
      );
    };
  }
  return React.createElement(
    FirstConsumer,
    null,
    reduceConsumers(NextConsumers, [])
  );
}

var combineConsumers = function combineConsumers(originConsumers, preRender) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  if (typeof preRender !== 'function') {
    if (process.env.NODE_ENV !== 'production' && preRender) warn('preRender in combineConsumers[' + keys + '] should be function, but provided a ' + (typeof preRender === 'undefined' ? 'undefined' : _typeof(preRender)));
    preRender = function preRender(valuesObj, render) {
      return render(valuesObj);
    };
  }
  var combineComponent = function combineComponent(_ref) {
    var children = _ref.children;

    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };

  combineComponent.displayName = 'combine(' + keys.join(',') + ')';
  combineComponent.keys = keys;

  return combineComponent;
};

var withConsumers = function withConsumers(originConsumers, mapValuesToProps) {
  return function (WrappedComponent) {
    var MultiConsumers = combineConsumers(originConsumers);
    var keys = MultiConsumers.keys;

    if (typeof mapValuesToProps !== 'function') {
      if (process.env.NODE_ENV !== 'production' && mapValuesToProps) warn('mapValuesToProps in withConsumers[' + keys + '] should be function, but provided a ' + (typeof mapValuesToProps === 'undefined' ? 'undefined' : _typeof(mapValuesToProps)));
      mapValuesToProps = function mapValuesToProps(valuesObj) {
        return valuesObj;
      };
    }
    var withComponent = function withComponent(props) {
      return React.createElement(
        MultiConsumers,
        null,
        function (contexts) {
          var nextProps = _extends({}, mapValuesToProps(contexts), props);
          return React.createElement(WrappedComponent, nextProps);
        }
      );
    };
    withComponent.displayName = 'with(' + keys.join(',') + ')';
    return withComponent;
  };
};

module.exports = {
  withConsumers: withConsumers,
  combineConsumers: combineConsumers
};