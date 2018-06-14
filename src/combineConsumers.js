const React = require('react');
const { getConsumersAndKeys, getMappedValue } = require('./util');

function combine([Consumer, ...consumers], keys, children, values) {
  return (
    <Consumer>
      {(curValue) => {
        if (consumers.length === 0) {
          return children(getMappedValue([...values, curValue], keys));
        }
        return combine(consumers, keys, children, [...values, curValue]);
      }}
    </Consumer>
  );
}

module.exports = (originConsumers) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);
  return ({ children }) => {
    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, []);
  };
};
