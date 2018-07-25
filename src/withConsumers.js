const React = require('react');
const { getConsumersAndKeys, getMappedValue } = require('./util');

const defaultMapValuesToProps = valuesObj => valuesObj;
const EmptyObject = Object.create(null);

function combine([FirstConsumer, ...originConsumers], keys, WrappedComponent, props, mapValueToProps) {
  function reduceConsumers(consumers, values) {
    const Consumer = consumers.shift();
    return (curValue) => {
      if (!Consumer) {
        let extendProps = mapValueToProps(getMappedValue([...values, curValue], keys));
        if (typeof extendProps !== 'object') {
          if (process.env.NODE_ENV !== 'production') console.warn(`MapValueToProps contain '${keys}' return a non-Object`);
          extendProps = EmptyObject;
        }
        return <WrappedComponent {...extendProps} {...props} />;
      }
      return <Consumer>{reduceConsumers(consumers, [...values, curValue])}</Consumer>;
    };
  }
  return <FirstConsumer>{reduceConsumers(originConsumers, [])}</FirstConsumer>;
}

module.exports = (originConsumers, mapValuesToProps) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);

  if (typeof mapValuesToProps !== 'function') {
    if (process.env.NODE_ENV !== 'production' && mapValuesToProps) console.warn(`mapValuesToProps in withConsumers[${keys}] should be function, but provided a ${typeof mapValuesToProps}`);
    mapValuesToProps = defaultMapValuesToProps;
  }
  return (WrappedComponent) => {
    const withComponent = props => combine(consumers, keys, WrappedComponent, props, mapValuesToProps);
    withComponent.displayName = `with(${keys.join(',')})`;
    return withComponent;
  };
};
