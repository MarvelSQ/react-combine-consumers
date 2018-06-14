module.exports = {
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'mocha': true
  },
  globals: {
    assert: true
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'babel'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
}