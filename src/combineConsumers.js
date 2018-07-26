const React = require('react');
const {
  is, type, getConsumersAndKeys, getMappedValue,
} = require('./util');

const defaultPreRender = (valuesObj, render) => render(valuesObj);

function combine(originConsumers, keys, render, preRender) {
  const FirstConsumer = originConsumers[0];
  const NextConsumers = originConsumers.slice(1);
  function reduceConsumers(consumers, values) {
    const Consumer = consumers.shift();
    return (curValue) => {
      const nextValues = [...values, curValue];
      if (!Consumer) {
        const component = preRender(getMappedValue(nextValues, keys), render);
        if (!React.isValidElement(component)) {
          if (process.env.NODE_ENV !== 'production') console.warn(`MapValue contain '${keys}' not return a Vaild Component`);
          return undefined;
        }
        return component;
      }
      return <Consumer>{reduceConsumers(consumers, nextValues)}</Consumer>;
    };
  }
  return <FirstConsumer>{reduceConsumers(NextConsumers, [])}</FirstConsumer>;
}

module.exports = (originConsumers, preRender) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);
  if (typeof preRender !== 'function') {
    if (process.env.NODE_ENV !== 'production' && preRender) console.warn(`preRender in combineConsumers[${keys}] should be function, but provided a ${type(preRender)}`);
    preRender = defaultPreRender;
  }
  const combineComponent = ({ children }) => {
    if (!is(children, 'function')) {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };

  combineComponent.displayName = `combine(${keys.join(',')})`;
  combineComponent.keys = keys;

  return combineComponent;
};
