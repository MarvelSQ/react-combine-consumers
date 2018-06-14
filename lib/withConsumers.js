'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var React = require('react');

var _require = require('./util'),
    getConsumersAndKeys = _require.getConsumersAndKeys,
    getMappedValue = _require.getMappedValue;

function combine(_ref, keys, WrappedComponent, props, values) {
  var _ref2 = _toArray(_ref),
      Consumer = _ref2[0],
      consumers = _ref2.slice(1);

  return React.createElement(
    Consumer,
    null,
    function (curValue) {
      if (consumers.length === 0) {
        return React.createElement(WrappedComponent, _extends({}, getMappedValue([].concat(_toConsumableArray(values), [curValue]), keys), props));
      }
      return combine(consumers, keys, WrappedComponent, props, [].concat(_toConsumableArray(values), [curValue]));
    }
  );
}

module.exports = function (originConsumers) {
  var _getConsumersAndKeys = getConsumersAndKeys(originConsumers),
      keys = _getConsumersAndKeys.keys,
      consumers = _getConsumersAndKeys.consumers;

  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(WithConsumer, _React$Component);

      function WithConsumer() {
        _classCallCheck(this, WithConsumer);

        return _possibleConstructorReturn(this, (WithConsumer.__proto__ || Object.getPrototypeOf(WithConsumer)).apply(this, arguments));
      }

      _createClass(WithConsumer, [{
        key: 'render',
        value: function render() {
          return combine(consumers, keys, WrappedComponent, this.props, []);
        }
      }]);

      return WithConsumer;
    }(React.Component);
  };
};