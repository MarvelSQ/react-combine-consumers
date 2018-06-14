'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var React = require('react');

var _require = require('./util'),
    getConsumersAndKeys = _require.getConsumersAndKeys,
    getMappedValue = _require.getMappedValue;

function combine(_ref, keys, children, values) {
  var _ref2 = _toArray(_ref),
      Consumer = _ref2[0],
      consumers = _ref2.slice(1);

  return React.createElement(
    Consumer,
    null,
    function (curValue) {
      if (consumers.length === 0) {
        return children(getMappedValue([].concat(_toConsumableArray(values), [curValue]), keys));
      }
      return combine(consumers, keys, children, [].concat(_toConsumableArray(values), [curValue]));
    }
  );
}

module.exports = function (originConsumers) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  return function (_ref3) {
    var children = _ref3.children;

    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, []);
  };
};