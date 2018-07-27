!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("underscore"),require("moment")):"function"==typeof define&&define.amd?define(["underscore","moment"],t):"object"==typeof exports?exports.FormulaValue=t(require("underscore"),require("moment")):e.FormulaValue=t(e.underscore,e.moment)}(window,function(__WEBPACK_EXTERNAL_MODULE__3__,__WEBPACK_EXTERNAL_MODULE__6__){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=8)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _underscore=__webpack_require__(3),_underscore2=_interopRequireDefault(_underscore),_moment=__webpack_require__(6),_moment2=_interopRequireDefault(_moment);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var ARRAY_REFERENCE_REGEX=/(.*)\[(@|\*|\d+)]/g,processPath=function(e){if(!e)return[];for(var t=e.split(/\.|::/),r=[],n=function(e,t,n){return r.push(t),"@"!==n&&"*"!==n&&(n=Number(n)),r.push(n),""},a=void 0;t.length>0;)(a=(a=t.shift()).replace(ARRAY_REFERENCE_REGEX,n))&&r.push(a);return r},assignTo=function(e,t,r,n){var a=processPath(t);void 0!==r&&a.push(r);for(var o=void 0;a.length;)o=a.shift(),a.length>0?(e[o]||("number"==typeof a[0]?e[o]=[]:e[o]={}),e=e[o]):e[o]=n},compact=function(e,t){for(var r=processPath(t),n=void 0;r.length;)n=r.shift(),r.length>0?(e[n]||("number"==typeof r[0]?e[n]=[]:e[n]={}),e=e[n]):e[n]=_underscore2.default.compact(e[n])},getDateTimeFormat=function(e){if(!e||"string"!=typeof e)return"";switch(e.length){case 10:return"YYYY-MM-DD";case 19:return"YYYY-MM-DD HH:mm:ss";case 8:return"HH:mm:ss";default:return""}},validateOperation=function(e,t,r){switch(r){case"years":case"months":case"weeks":case"days":if("HH:mm:ss"===e||"HH:mm:ss"===t)return!1;break;case"hours":case"minutes":case"seconds":if(("HH:mm:ss"===e||"HH:mm:ss"===t)&&e!==t)return!1}return!0},evalWithSafeEnvironment=function(){var __defaultSpec="seconds",__availableSpecs={Y:"years",M:"months",W:"weeks",D:"days",h:"hours",m:"minutes",s:"seconds",years:"years",months:"months",weeks:"weeks",days:"days",hours:"hours",minutes:"minutes",seconds:"seconds"},__processStarOperator=function __processStarOperator(array,path){var result=[];if(array&&_underscore2.default.isArray(array)&&array.length)for(var value=void 0,pushNestedElement=function pushNestedElement(nestedElement){value.push(eval("nestedElement"+path))},i=0,len=array.length;i<len;i++){if(_underscore2.default.isArray(array[i]))value=[],array[i].forEach(pushNestedElement);else{value=null;try{value=eval("array[i]"+path)}catch(e){console.warn(e)}}result.push(value)}return result},dateDiff=function(e,t,r){var n=getDateTimeFormat(e),a=getDateTimeFormat(t);return r=__availableSpecs[r]||__defaultSpec,validateOperation(n,a,r)?(e=(0,_moment2.default)(e,n),t=(0,_moment2.default)(t,a),e.diff(t,r)):(console.warn("Invalid inputs at dateDiff."),null)},sum=function(e){var t=0;if(e&&_underscore2.default.isArray(e)&&e.length)for(var r=0,n=e.length;r<n;r++)e[r]&&(t+=e[r]);return t},extract=function(e,t,r){e="string"==typeof e?e:e||"",t=t||",",r=r||0;var n=e.split(t)[r];return isNaN(n)?n:Number(n)},flatten=_underscore2.default.flatten,groupConcat=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:", ";return e.join(t)};function concat(){return Array.prototype.slice.call(arguments).join("")}var count=function(e){return e.length},avg=function(e){var t=sum(e);return e&&_underscore2.default.isArray(e)&&e.length>0&&(t/=e.length),t},formatDate=function(e,t){return(0,_moment2.default)(e).format(t)};return function(formula,data,metaData){return eval(formula)}}.call();exports.default={processPath:processPath,assignTo:assignTo,compact:compact,patterns:{variable:"{{([^}]+)}}",parsedExpression:"\\[\\*(\\d*)\\*\\]",invalidVariable:"\\[(?!(?:@|\\*|\\d+)\\]|[\\.$])|^[^\\[]*\\]|\\][^\\[]*\\]|[\\{\\}]|\\][]|\\][^\\.\\[]"},dataVarName:"data",metaDataVarName:"metaData",evalWithSafeEnvironment:evalWithSafeEnvironment}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=u(r(3)),o=u(r(0));function u(e){return e&&e.__esModule?e:{default:e}}var i=new RegExp(o.default.patterns.invalidVariable),s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._path=o.default.processPath(t),this._hasStar=this._path.indexOf("*")>-1,this._hasAt=this._path.indexOf("@")>-1,this._hasContext=this._hasAt,t.indexOf("::")>-1?this._environment=o.default.metaDataVarName:this._environment=o.default.dataVarName,""===t?this._parsedVariable="null":this._hasContext||(this._parsedVariable=e._parse(this._path,this._environment))}return n(e,[{key:"parseVariable",value:function(e){return this._parsedVariable||this._parseWithContext(e)}},{key:"_parseWithContext",value:function(t){for(var r=0,n=t.length,o=this._path.length,u=this._path.slice();r<n&&r<o;r++)if("@"===u[r]&&a.default.isNumber(t[r]))u[r]=Number(t[r]);else if(u[r]!==t[r]||"*"===u[r])break;for(;r<o;r++)if("@"===u[r])throw new Error("Context could not fully resolve");return e._parse(u,this._environment)}},{key:"hasStar",value:function(){return this._hasStar}},{key:"hasAt",value:function(){return this._hasAt}}],[{key:"isValid",value:function(e){return!i.test(e)}},{key:"_parse",value:function(e,t){for(var r=void 0,n=!1,a=t,o=0,u=e.length;o<u;o++)"*"===(r=e[o])?(n?a+='")':n=!0,a="__processStarOperator("+a+',"'):a+="['"+r+"']";return n&&(a+='")'),a}}]),e}();t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=u(r(1)),o=u(r(0));function u(e){return e&&e.__esModule?e:{default:e}}var i=new RegExp(o.default.patterns.variable,"g"),s=function(){function e(t,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._variables=[];for(var o=0,u=t.length;o<u;o++){var s=t[o];r=r.replace(new RegExp(s.pattern,"g"),s.replacement)}var l={};this._parsedExpression=r.replace(i,function(e,t){return a.default.isValid(t)?(l[t]||(l[t]=n._variables.length,n._variables.push(new a.default(t))),"[*"+l[t]+"*]"):"{{"+t+"}}"})}return n(e,[{key:"eval",value:function(){throw new Error("Eval is not implemented")}},{key:"getDependencies",value:function(){throw new Error("GetDependencies is not implemented")}}]),e}();t.default=s},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE__3__},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(2),u=(n=o)&&n.__esModule?n:{default:n};var i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,[],""));return r.value=e,r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u.default),a(t,[{key:"eval",value:function(){return this.value}}]),t}();t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=u(r(0)),o=u(r(2));u(r(1));function u(e){return e&&e.__esModule?e:{default:e}}var i=[{pattern:"'",replacement:"\\'"}],s=new RegExp(a.default.patterns.variable),l=new RegExp(a.default.patterns.parsedExpression,"g"),f=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,i,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.default),n(t,[{key:"eval",value:function(e,t,r){var n="";try{var o=a.default.processPath(r),u=this._variables.map(function(r){return r.hasStar()?"":a.default.evalWithSafeEnvironment(r.parseVariable(o),e,t)});n=this._parsedExpression.replace(l,function(e,t){return u[parseInt(t)]})}catch(e){console.warn(e)}return n}},{key:"getDependencies",value:function(){return this._variables.map(function(e){return e.split("::").shift()})}}],[{key:"isConcatenatedText",value:function(e){return"string"==typeof e&&s.test(e)}}]),t}();t.default=f},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE__6__},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=u(r(2)),o=(u(r(1)),u(r(0)));function u(e){return e&&e.__esModule?e:{default:e}}var i=[{pattern:"^=",replacement:""},{pattern:"'",replacement:"\\'"}],s=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,i,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default),n(t,[{key:"eval",value:function(e,t,r){var n=null;try{var a=o.default.processPath(r),u=this._variables.map(function(e){return e.parseVariable(a)}),i=this._parsedExpression.replace(/\[\*(\d*)\*\]/g,function(e,t){return u[parseInt(t)]});n=o.default.evalWithSafeEnvironment(i,e,t)}catch(e){console.warn(e)}return n}},{key:"getDependencies",value:function(){return this._variables.map(function(e){return e.split("::").shift()})}}],[{key:"isFormula",value:function(e){return"string"==typeof e&&0===e.indexOf("=")}}]),t}();t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=i(r(7)),o=i(r(5)),u=i(r(4));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a.default.isFormula(t)?this.compiledExpression=new a.default(t):o.default.isConcatenatedText(t)?this.compiledExpression=new o.default(t):this.compiledExpression=new u.default(t)}return n(e,[{key:"eval",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return this.compiledExpression.eval(e,t,r)}}],[{key:"isFormulaValue",value:function(e){return a.default.isFormula(e)||o.default.isConcatenatedText(e)}}]),e}();t.default=s}]).default});
//# sourceMappingURL=FormulaValue.web.js.map