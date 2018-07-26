const CONTEXT_TYPE = require('./ContextType');

module.exports = {
  assign: objs => objs.reduce((f, e) => ({ ...f, ...e }), {}),
  type: target => typeof target,
  is: (target, type) => type === typeof target,
  getConsumersAndKeys: (consumers) => {
    const consumerKeys = Object.keys(consumers);
    const finalKeys = [];
    const finalConsumers = [];
    for (let i = 0; i < consumerKeys.length; i++) {
      const key = consumerKeys[i];

      if (process.env.NODE_ENV !== 'production') {
        if (typeof consumers[key] === 'undefined') {
          console.warn(`No consumer provided for key "${key}"`);
        } else if (consumers[key].$$type === CONTEXT_TYPE) {
          console.warn(`key "${key}" is not A React.context Component`);
        }
      }

      if (typeof consumers[key] !== 'undefined' && consumers[key].$$typeof === CONTEXT_TYPE) {
        const postion = finalKeys.push(key);
        finalConsumers[postion - 1] = consumers[key];
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('combined consumer', finalKeys);
    }
    return { keys: finalKeys, consumers: finalConsumers };
  },
  getMappedValue: (values, keys) => {
    const nextValue = {};
    for (let i = 0; i < keys.length; i++) {
      nextValue[keys[i]] = values[i];
    }
    return nextValue;
  },
};

