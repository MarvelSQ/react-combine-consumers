'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var React = require('react');

var _require = require('./util'),
    getConsumersAndKeys = _require.getConsumersAndKeys,
    getMappedValue = _require.getMappedValue;

var defaultMapValuesToProps = function defaultMapValuesToProps(valuesObj) {
  return valuesObj;
};
var EmptyObject = Object.create(null);

function combine(_ref, keys, WrappedComponent, props, mapValueToProps) {
  var _ref2 = _toArray(_ref),
      FirstConsumer = _ref2[0],
      originConsumers = _ref2.slice(1);

  function reduceConsumers(consumers, values) {
    var Consumer = consumers.shift();
    return function (curValue) {
      if (!Consumer) {
        var extendProps = mapValueToProps(getMappedValue([].concat(_toConsumableArray(values), [curValue]), keys));
        if ((typeof extendProps === 'undefined' ? 'undefined' : _typeof(extendProps)) !== 'object') {
          if (process.env.NODE_ENV !== 'production') console.warn('MapValueToProps contain \'' + keys + '\' return a non-Object');
          extendProps = EmptyObject;
        }
        return React.createElement(WrappedComponent, _extends({}, extendProps, props));
      }
      return React.createElement(
        Consumer,
        null,
        reduceConsumers(consumers, [].concat(_toConsumableArray(values), [curValue]))
      );
    };
  }
  return React.createElement(
    FirstConsumer,
    null,
    reduceConsumers(originConsumers, [])
  );
}

module.exports = function (originConsumers, mapValuesToProps) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  if (typeof mapValuesToProps !== 'function') {
    if (process.env.NODE_ENV !== 'production' && mapValuesToProps) console.warn('mapValuesToProps in withConsumers[' + keys + '] should be function, but provided a ' + (typeof mapValuesToProps === 'undefined' ? 'undefined' : _typeof(mapValuesToProps)));
    mapValuesToProps = defaultMapValuesToProps;
  }
  return function (WrappedComponent) {
    var withComponent = function withComponent(props) {
      return combine(consumers, keys, WrappedComponent, props, mapValuesToProps);
    };
    withComponent.displayName = 'with(' + keys.join(',') + ')';
    return withComponent;
  };
};