'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var React = require('react');

var _require = require('./util'),
    getConsumersAndKeys = _require.getConsumersAndKeys,
    getMappedValue = _require.getMappedValue;

var defaultPreRender = function defaultPreRender(valuesObj, render) {
  return render(valuesObj);
};

function combine(_ref, keys, render, preRender) {
  var _ref2 = _toArray(_ref),
      FirstConsumer = _ref2[0],
      originConsumers = _ref2.slice(1);

  function reduceConsumers(consumers, values) {
    var Consumer = consumers.shift();
    return function (curValue) {
      if (!Consumer) {
        var component = preRender(getMappedValue([].concat(_toConsumableArray(values), [curValue]), keys), render);
        if (!React.isValidElement(component)) {
          if (process.env.NODE_ENV !== 'production') console.warn('MapValue contain \'' + keys + '\' not return a Vaild Component');
          return undefined;
        }
        return component;
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

module.exports = function (originConsumers, preRender) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  if (typeof preRender !== 'function') {
    if (process.env.NODE_ENV !== 'production' && preRender) console.warn('preRender in combineConsumers[' + keys + '] should be function, but provided a ' + (typeof preRender === 'undefined' ? 'undefined' : _typeof(preRender)));
    preRender = defaultPreRender;
  }
  var combineComponent = function combineComponent(_ref3) {
    var children = _ref3.children;

    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };

  combineComponent.displayName = 'combine(' + keys.join(',') + ')';

  return combineComponent;
};