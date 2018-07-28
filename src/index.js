const React = require('react');

const { warn, log } = console;

const CONTEXT_TYPE = (typeof Symbol === 'function' && Symbol.for) ? Symbol.for('react.context') : 0xeace;

function getMappedValue(values, keys) {
  const nextValue = {};
  for (let i = 0; i < keys.length; i++) {
    nextValue[keys[i]] = values[i];
  }
  return nextValue;
}

function getConsumersAndKeys(consumers) {
  const consumerKeys = Object.keys(consumers);
  const finalKeys = [];
  const finalConsumers = [];
  for (let i = 0; i < consumerKeys.length; i++) {
    const key = consumerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof consumers[key] === 'undefined') {
        warn(`No consumer provided for key "${key}"`);
      } else if (consumers[key].$$type === CONTEXT_TYPE) {
        warn(`key "${key}" is not A React.context Component`);
      }
    }

    if (typeof consumers[key] !== 'undefined' && consumers[key].$$typeof === CONTEXT_TYPE) {
      const postion = finalKeys.push(key);
      finalConsumers[postion - 1] = consumers[key];
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    log('combined consumer', finalKeys);
  }
  return { keys: finalKeys, consumers: finalConsumers };
}

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
          if (process.env.NODE_ENV !== 'production') warn(`MapValue contain '${keys}' not return a Vaild Component`);
          return undefined;
        }
        return component;
      }
      return <Consumer>{reduceConsumers(consumers, nextValues)}</Consumer>;
    };
  }
  return <FirstConsumer>{reduceConsumers(NextConsumers, [])}</FirstConsumer>;
}

const combineConsumers = (originConsumers, preRender) => {
  const { keys, consumers } = getConsumersAndKeys(originConsumers);
  if (typeof preRender !== 'function') {
    if (process.env.NODE_ENV !== 'production' && preRender) warn(`preRender in combineConsumers[${keys}] should be function, but provided a ${typeof preRender}`);
    preRender = (valuesObj, render) => render(valuesObj);
  }
  const combineComponent = ({ children }) => {
    if (typeof children !== 'function') {
      throw Error('children need to be a function');
    }
    return combine(consumers, keys, children, preRender);
  };

  combineComponent.displayName = `combine(${keys.join(',')})`;
  combineComponent.keys = keys;

  return combineComponent;
};

const withConsumers = (originConsumers, mapValuesToProps) => (WrappedComponent) => {
  const MultiConsumers = combineConsumers(originConsumers);
  const { keys } = MultiConsumers;
  if (typeof mapValuesToProps !== 'function') {
    if (process.env.NODE_ENV !== 'production' && mapValuesToProps) warn(`mapValuesToProps in withConsumers[${keys}] should be function, but provided a ${typeof mapValuesToProps}`);
    mapValuesToProps = valuesObj => valuesObj;
  }
  const withComponent = props => (
    <MultiConsumers>
      {
        (contexts) => {
          const nextProps = { ...mapValuesToProps(contexts), ...props };
          return <WrappedComponent {...nextProps} />;
        }
      }
    </MultiConsumers>
  );
  withComponent.displayName = `with(${keys.join(',')})`;
  return withComponent;
};

module.exports = {
  withConsumers,
  combineConsumers,
};
