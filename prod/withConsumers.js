'use strict';var React=require('react'),_require=require('./util'),assign=_require.assign,type=_require.type,is=_require.is,combineConsumers=require('../combineConsumers'),defaultMapValuesToProps=function(a){return a};module.exports=function(a,b){return is(b,'function')||('production'!==process.env.NODE_ENV&&b&&console.warn('mapValuesToProps in withConsumers['+keys+'] should be function, but provided a '+type(b)),b=defaultMapValuesToProps),function(c){var d=combineConsumers(a),e=d.keys,f=function(a){return React.createElement(d,null,function(d){var e=assign([b(d),a]);return React.createElement(c,e)})};return f.displayName='with('+e.join(',')+')',f}};