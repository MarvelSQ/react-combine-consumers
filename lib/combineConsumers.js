'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

var _require = require('./util'),
    is = _require.is,
    type = _require.type,
    getConsumersAndKeys = _require.getConsumersAndKeys,
    getMappedValue = _require.getMappedValue;

var defaultPreRender = function defaultPreRender(valuesObj, render) {
  return render(valuesObj);
};

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
          if (process.env.NODE_ENV !== 'production') console.warn('MapValue contain \'' + keys + '\' not return a Vaild Component');
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

module.exports = function (originConsumers, preRender) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  if (typeof preRender !== 'function') {
    if (process.env.NODE_ENV !== 'production' && preRender) console.warn('preRender in combineConsumers[' + keys + '] should be function, but provided a ' + type(preRender));
    preRender = defaultPreRender;
  }
  var combineComponent = function combineComponent(_ref) {
    var children = _ref.children;

    if (!is(children, 'function')) {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };

  combineComponent.displayName = 'combine(' + keys.join(',') + ')';
  combineComponent.keys = keys;

  return combineComponent;
};