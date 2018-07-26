const React = require('react');
const {
  assign, type, is,
} = require('./util');
const combineConsumers = require('../combineConsumers');

const defaultMapValuesToProps = valuesObj => valuesObj;

module.exports = (originConsumers, mapValuesToProps) => {
  if (!is(mapValuesToProps, 'function')) {
    if (process.env.NODE_ENV !== 'production' && mapValuesToProps) console.warn(`mapValuesToProps in withConsumers[${keys}] should be function, but provided a ${type(mapValuesToProps)}`);
    mapValuesToProps = defaultMapValuesToProps;
  }
  return (WrappedComponent) => {
    const MultiConsumers = combineConsumers(originConsumers);
    const { keys } = MultiConsumers;
    const withComponent = props => (
      <MultiConsumers>
        {
          (contexts) => {
            const nextProps = assign([mapValuesToProps(contexts), props]);
            return <WrappedComponent {...nextProps} />;
          }
        }
      </MultiConsumers>
    );
    withComponent.displayName = `with(${keys.join(',')})`;
    return withComponent;
  };
};
