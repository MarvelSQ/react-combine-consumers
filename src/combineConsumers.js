const React = require('react');
const { getConsumersAndKeys, getMappedValue } = require('./util');

const defaultPreRender = (valuesObj, render) => render(valuesObj);

function combine([FirstConsumer, ...originConsumers], keys, render, preRender) {
  function reduceConsumers(consumers, values) {
    const Consumer = consumers.shift();
    return (curValue) => {
      if (!Consumer) {
        const component = preRender(getMappedValue([...values, curValue], keys), render);
        if (!React.isValidElement(component)) {
          if (process.env.NODE_ENV !== 'production') console.warn(`MapValue contain '${keys}' not return a Vaild Component`);
          return undefined;
        }
        return component;
      }
      return <Consumer>{reduceConsumers(consumers, [...values, curValue])}</Consumer>;
    };
  }
  return <FirstConsumer>{reduceConsumers(originConsumers, [])}</FirstConsumer>;
}

module.exports = (originConsumers, preRender = defaultPreRender) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);
  return ({ children }) => {
    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };
};
