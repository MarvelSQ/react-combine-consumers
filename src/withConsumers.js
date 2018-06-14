const React = require('react');
const { getConsumersAndKeys, getMappedValue } = require('./util');

function combine([Consumer, ...consumers], keys, WrappedComponent, props, values) {
  return (
    <Consumer>
      {(curValue) => {
        if (consumers.length === 0) {
          return <WrappedComponent {...getMappedValue([...values, curValue], keys)} {...props} />;
        }
        return combine(consumers, keys, WrappedComponent, props, [...values, curValue]);
      }}
    </Consumer>
  );
}

module.exports = (originConsumers) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);

  return WrappedComponent => class WithConsumer extends React.Component {
    render() {
      return combine(consumers, keys, WrappedComponent, this.props, []);
    }
  };
};
