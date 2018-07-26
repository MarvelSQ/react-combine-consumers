
let _extends = Object.assign || function (a) { for (var b, c = 1; c < arguments.length; c++) for (const d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]); return a; },
  _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (a) { return typeof a; } : function (a) { return a && typeof Symbol === 'function' && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a; }; function _toConsumableArray(a) { if (Array.isArray(a)) { for (var b = 0, c = Array(a.length); b < a.length; b++)c[b] = a[b]; return c; } return Array.from(a); } let React = require('react'),
  _require = require('./util'),
  getConsumersAndKeys = _require.getConsumersAndKeys,
  getMappedValue = _require.getMappedValue,
  defaultMapValuesToProps = function (a) { return a; },
  EmptyObject = Object.create(null);

function combine(a, b, c, d, e) { function f(a, g) { const h = a.shift(); return function (i) { if (!h) { let j = e(getMappedValue([].concat(_toConsumableArray(g), [i]), b)); return (typeof j === 'undefined' ? 'undefined' : _typeof(j)) !== 'object' && (process.env.NODE_ENV !== 'production' && console.warn(`MapValueToProps contain '${b}' return a non-Object`), j = EmptyObject), React.createElement(c, _extends({}, j, d)); } return React.createElement(h, null, f(a, [].concat(_toConsumableArray(g), [i]))); }; } const g = a.shift(); return React.createElement(g, null, f(a, [])); } module.exports = function (a, b) {
  let c = getConsumersAndKeys(a),
    d = c.keys,
    e = c.consumers; return typeof b !== 'function' && (process.env.NODE_ENV !== 'production' && b && console.warn(`mapValuesToProps in withConsumers[${d}] should be function, but provided a ${typeof b === 'undefined' ? 'undefined' : _typeof(b)}`), b = defaultMapValuesToProps), function (a) { const c = function (c) { return combine(e, d, a, c, b); }; return c.displayName = `with(${d.join(',')})`, c; };
};
