'use strict';

var React = require('react');

var _require = require('./util'),
    assign = _require.assign,
    type = _require.type,
    is = _require.is;

var combineConsumers = require('../combineConsumers');

var defaultMapValuesToProps = function defaultMapValuesToProps(valuesObj) {
  return valuesObj;
};

module.exports = function (originConsumers, mapValuesToProps) {
  if (!is(mapValuesToProps, 'function')) {
    if (process.env.NODE_ENV !== 'production' && mapValuesToProps) console.warn('mapValuesToProps in withConsumers[' + keys + '] should be function, but provided a ' + type(mapValuesToProps));
    mapValuesToProps = defaultMapValuesToProps;
  }
  return function (WrappedComponent) {
    var MultiConsumers = combineConsumers(originConsumers);
    var keys = MultiConsumers.keys;

    var withComponent = function withComponent(props) {
      return React.createElement(
        MultiConsumers,
        null,
        function (contexts) {
          var nextProps = assign([mapValuesToProps(contexts), props]);
          return React.createElement(WrappedComponent, nextProps);
        }
      );
    };
    withComponent.displayName = 'with(' + keys.join(',') + ')';
    return withComponent;
  };
};