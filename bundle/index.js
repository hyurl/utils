/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@hyurl/utils"]=t():e["@hyurl/utils"]=t()}(this,(function(){return(()=>{var e={182:(e,t)=>{"use strict";function r(e){if("function"!=typeof e)return!1;if(void 0===e.prototype)return!1;if(e.prototype.constructor!==e)return!1;if(Object.getOwnPropertyNames(e.prototype).length>=2)return!0;var t=String(e);if("class"==t.slice(0,5))return!0;if(/^function\s*\(|^function anonymous\(/.test(t))return!1;var r=/(call|apply|_classCallCheck)\(this(, arguments)?\)|\bthis(.\S+|\[.+?\])\s*(=|\()|=\s*this[,;]/.test(t);return!(!/^function\s+[A-Z]/.test(t)||!(r||/\[native code\]/.test(t)&&"BigInt"!==e.name&&"Symbol"!==e.name))||!(!r||"default_1"!==e.name)}t.couldBeClass=r,t.default=r},837:(e,t)=>{"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var u,f=e[Symbol.iterator]();!(n=(u=f.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==f.return||f.return()}finally{if(o)throw i}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e){for(var t="object"===o(e)&&null!==e,n=arguments.length,i=new Array(n>1?n-1:0),u=1;u<n;u++)i[u-1]=arguments[u];return t&&i.every((function(t){var n=r(t,2),i=n[0],u=n[1];return i in e&&o(e[i])===u}))}function u(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Array.isArray(e))return!0;if(!t)return i(e,["length","number"])||"string"==typeof e;if(i(e,["length","number"])){var r,n=Object.keys(e),o=!n.includes("length");if(0===e.length||0===(r=n.map(Number).filter(isFinite)).length)return o;for(var u="function"==typeof e[Symbol.iterator],f=e.length;f--;)if(!r.includes(f)&&!o&&!u)return!1;return!0}return!1}function f(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i(e,["size","number"],[Symbol.iterator,"function"])||!t&&(e instanceof WeakMap||e instanceof WeakSet)}function a(e){return i(e,["byteLength","number"],["slice","function"])}Object.defineProperty(t,"__esModule",{value:!0}),t.isDictLike=function(e){return!("object"!==o(e)||null===e||e.constructor!==Object&&(e instanceof Date||e instanceof RegExp||u(e,!0)||s(e)||function(e){try{var t=JSON.stringify(e);return"{}"===t||"[]"===t}catch(e){return!1}}(e)||a(e)||f(e)||c(e)))},t.isArrayLike=u,t.isCollectionLike=f,t.isTypedArrayLike=a,t.isErrorLike=function(e){return i(e,["name","string"],["message","string"],["stack","string"])},t.isPromiseLike=c,t.isObjectIdLike=s,t.isBufferLike=void 0;var l=a;function c(e){return i(e,["then","function"])}function s(e){return"object"===o(e)&&null!==e&&("ObjectId"===e.constructor.name||"ObjectID"===e.constructor.name)}t.isBufferLike=l},381:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=r(697),i="function"==typeof TextEncoder?new TextEncoder:null;t.default=function(e,t){if("string"==typeof e)return"string"==typeof t?e.split(t).length-1:!0===t?"function"==typeof Buffer&&"function"==typeof Buffer.byteLength?Buffer.byteLength(e):i?i.encode(e).byteLength:o(e):e.length;if((0,n.isArrayLike)(e)){if(2===arguments.length){let r=0;for(let n=e.length;n--;)(e[n]===t||Object.is(e[n],t))&&r++;return r}return e.length}return(0,n.isBufferLike)(e)?e.byteLength:(0,n.isCollectionLike)(e,!0)?e.size:Object.keys(e).length}},703:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(710);t.default=function(e,t,r,o=!1,i=!1){(0,n.default)(r)!==Object||!function(e){return"get"===String(Object.keys(e))&&"function"==typeof e.get}(r)&&!function(e){let t=String(Object.keys(e));return("get,set"===t||"set,get"===t)&&"function"==typeof e.get&&"function"==typeof e.set}(r)?Object.defineProperty(e,t,{configurable:!0,enumerable:o,writable:i,value:r}):Object.defineProperty(e,t,Object.assign({configurable:!0,enumerable:o},r))}},125:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=r(610),i=r(81);t.default=function e(t,r,u=!1){if(Array.isArray(t)&&Array.isArray(r))return[...r.filter((e=>!t.includes(e))),...t.filter((e=>!r.includes(e)))];if((0,n.isDictLike)(t)&&(0,n.isDictLike)(r)){let n=Reflect.ownKeys(r),f=Reflect.ownKeys(t),a={};return n.forEach((n=>{if(!(t[n]===r[n]||(0,i.default)(t[n])&&(0,i.default)(r[n])))if(u&&"object"==typeof t[n]&&null!==t[n]&&"object"==typeof r[n]&&null!==r[n]){let i=e(t[n],r[n],u);(0,o.default)(i)||(a[n]=i)}else a[n]=r[n]})),f.forEach((e=>{n.includes(e)||(a[e]=t[e])})),a}return r}},428:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ensureArray=void 0;const n=r(837),o=r(474),i=r(389),u=/^\s*(true|yes|on)\s*$/i,f=/^\s*(false|no|off)\s*$/i,a=/^\s*(null|nil|none|void|undefined)\s*$/i,l=/^\s*NaN\s*$/,c=/^\s*-?Infinity\s*/,s=/^\s*\/(.+)\/([gimuys]*)\s*$/,d=[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER];function y(e){return Array.isArray(e)?e:Array.from(e)}t.default=function e(t){switch(typeof t){case"string":{let e;if(u.test(t))return!0;if(f.test(t))return!1;if(a.test(t))return null;if(l.test(t))return NaN;if(c.test(t))return Number(t);if(e=t.match(s))return new RegExp(e[1],e[2]);{let e=Number(t);return!isNaN(e)&&(0,o.default)(e,d)&&"+"!==t[0]?e:t}}case"object":return null===t?null:(0,n.isArrayLike)(t,!0)?y(t).map(e):(0,n.isDictLike)(t)?(0,i.default)(t).reduce(((r,n)=>(r[n]=e(t[n]),r)),{}):t;default:return t}},t.ensureArray=y},36:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(389),o=r(81),i=r(837);function u(e,t,r,f,a,l){let c,s,d=!(0,o.default)(r);if(f===a||!(c=(0,i.isArrayLike)(t,!0)&&!(0,i.isBufferLike)(t))&&!(s=(0,i.isDictLike)(t)))e[r]=t;else if(s)(0,n.default)(t).forEach((n=>{let o=t[n];"symbol"==typeof n?0===f&&(e[n]=o):u(e,o,d?`${r}.${n}`:n,d?f+1:f,a,l)}));else if(c)if(l)for(let n=0,o=t.length;n<o;++n)u(e,t[n],d?`${r}.${n}`:String(n),d?f+1:f,a,l);else e[r]=t;return e}t.default=function(e,t=1,r=!1){return u({},e,void 0,0,t,r)}},93:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let t;return"object"==typeof globalThis?t=globalThis:"object"==typeof self?t=self:"object"==typeof global?t=global:"object"==typeof window&&(t=window),t&&(e?t[e]:t)}},341:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.wrap=t.useThrottle=t.until=t.typeOf=t.typeAs=t.trim=t.timestamp=t.split=t.sort=t.sleep=t.randStr=t.rand=t.pick=t.patch=t.omitVoid=t.omit=t.keysOf=t.isVoid=t.isSubClassOf=t.isOwnMethod=t.isOwnKey=t.isNumeric=t.isInteger=t.isFloat=t.isEmpty=t.isBetween=t.getGlobal=t.flatObject=t.ensureType=t.diff=t.define=t.count=void 0,r(683);var n=r(381);Object.defineProperty(t,"count",{enumerable:!0,get:function(){return n.default}});var o=r(703);Object.defineProperty(t,"define",{enumerable:!0,get:function(){return o.default}});var i=r(125);Object.defineProperty(t,"diff",{enumerable:!0,get:function(){return i.default}});var u=r(428);Object.defineProperty(t,"ensureType",{enumerable:!0,get:function(){return u.default}});var f=r(36);Object.defineProperty(t,"flatObject",{enumerable:!0,get:function(){return f.default}});var a=r(93);Object.defineProperty(t,"getGlobal",{enumerable:!0,get:function(){return a.default}});var l=r(474);Object.defineProperty(t,"isBetween",{enumerable:!0,get:function(){return l.default}});var c=r(610);Object.defineProperty(t,"isEmpty",{enumerable:!0,get:function(){return c.default}});var s=r(789);Object.defineProperty(t,"isFloat",{enumerable:!0,get:function(){return s.default}});var d=r(510);Object.defineProperty(t,"isInteger",{enumerable:!0,get:function(){return d.default}});var y=r(382);Object.defineProperty(t,"isNumeric",{enumerable:!0,get:function(){return y.default}});var p=r(953);Object.defineProperty(t,"isOwnKey",{enumerable:!0,get:function(){return p.default}});var b=r(540);Object.defineProperty(t,"isOwnMethod",{enumerable:!0,get:function(){return b.default}});var h=r(567);Object.defineProperty(t,"isSubClassOf",{enumerable:!0,get:function(){return h.default}});var v=r(81);Object.defineProperty(t,"isVoid",{enumerable:!0,get:function(){return v.default}});var g=r(389);Object.defineProperty(t,"keysOf",{enumerable:!0,get:function(){return g.default}});var m=r(191);Object.defineProperty(t,"omit",{enumerable:!0,get:function(){return m.default}});var O=r(877);Object.defineProperty(t,"omitVoid",{enumerable:!0,get:function(){return O.default}});var j=r(250);Object.defineProperty(t,"patch",{enumerable:!0,get:function(){return j.default}});var _=r(902);Object.defineProperty(t,"pick",{enumerable:!0,get:function(){return _.default}});var w=r(184);Object.defineProperty(t,"rand",{enumerable:!0,get:function(){return w.default}});var P=r(331);Object.defineProperty(t,"randStr",{enumerable:!0,get:function(){return P.default}});var S=r(103);Object.defineProperty(t,"sleep",{enumerable:!0,get:function(){return S.default}});var k=r(327);Object.defineProperty(t,"sort",{enumerable:!0,get:function(){return k.default}});var A=r(616);Object.defineProperty(t,"split",{enumerable:!0,get:function(){return A.default}});var M=r(94);Object.defineProperty(t,"timestamp",{enumerable:!0,get:function(){return M.default}});var E=r(385);Object.defineProperty(t,"trim",{enumerable:!0,get:function(){return E.default}});var L=r(89);Object.defineProperty(t,"typeAs",{enumerable:!0,get:function(){return L.default}});var T=r(710);Object.defineProperty(t,"typeOf",{enumerable:!0,get:function(){return T.default}});var x=r(681);Object.defineProperty(t,"until",{enumerable:!0,get:function(){return x.default}});var N=r(397);Object.defineProperty(t,"useThrottle",{enumerable:!0,get:function(){return N.default}});var D=r(140);Object.defineProperty(t,"wrap",{enumerable:!0,get:function(){return D.default}})},474:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,[t,r]){return e>=t&&e<=r}},610:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=["",NaN,null,void 0],i=[...o,0,!1];function u(e,t,r){if(r.includes(e))return!0;if("object"==typeof e){if(e instanceof RegExp)return!1;if(e instanceof Date)return"Invalid Date"===String(e);if(e instanceof Error)return 0===e.message.length;if((0,n.isBufferLike)(e))return 0===e.byteLength;if((0,n.isArrayLike)(e,!0)){if(0===e.length)return!0;if(t){for(let r=0,n=e.length;r<n;++r)if(!u(e[r],t,o))return!1;return!0}return!1}if((0,n.isCollectionLike)(e,!0)){if(0===e.size)return!0;if(t){if(e instanceof Map){for(let r of e.values())if(!u(r,t,o))return!1;return!0}if(e instanceof Set){for(let r of e)if(!u(r,t,o))return!1;return!0}return!1}return!1}{let r=Reflect.ownKeys(e);return 0===r.length||!!t&&r.every((r=>u(e[r],t,o)))}}return!1}"function"==typeof BigInt&&i.push(BigInt("0")),t.default=function(e,t=!1){return u(e,Boolean(t),i)}},789:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return!("number"!=typeof e||isNaN(e)||Number.isFinite(e)&&e%1==0)}},510:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let t=typeof e;return"bigint"===t||"number"===t&&!isNaN(e)&&Number.isFinite(e)&&e%1==0}},382:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let t=typeof e;return("number"===t||"bigint"===t||"string"===t)&&!isNaN(Number(e))}},953:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(81);t.default=function(e,t){return!(0,n.default)(e)&&Object.prototype.hasOwnProperty.call(e,t)}},540:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let r=Object.getPrototypeOf(e);return null!==r&&Object.prototype.hasOwnProperty.call(r,t)&&"function"==typeof r[t]}},567:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return"function"==typeof e&&"function"==typeof t&&e.prototype instanceof t}},81:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return null==e||Object.is(e,NaN)}},389:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Array.isArray(e)?Object.keys(e).map(Number):Reflect.ownKeys(e)}},191:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(953);t.default=function(e,t){if(Array.isArray(e))return e.filter((e=>!t.includes(e)));{let r=Reflect.ownKeys(e).reduce(((r,n)=>(t.includes(n)||(r[n]=e[n]),r)),{});for(let n in Object.getPrototypeOf(e))t.includes(n)||(r[n]=e[n]);return e instanceof Error&&["name","message"].forEach((o=>{t.includes(o)||(0,n.default)(r,o)||(r[o]=e[o])})),r}}},877:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.doOmit=void 0;const n=r(81),o=r(610),i=r(389),u=r(837);function f(e,t,r,a,l){if("string"==typeof e)return a&&""===e.trim()?void 0:e;if(null===e||"object"!=typeof e||e instanceof Date||e instanceof Error||e instanceof RegExp||(0,u.isBufferLike)(e))return e;if(r&&(0,o.default)(e))return l>0?void 0:(0,u.isArrayLike)(e,!0)?[]:{};if((0,u.isArrayLike)(e,!0)){let i=[];for(let o=0,u=e.length;o<u;++o){let u=e[o];(0,n.default)(u)||(t?(u=f(u,t,r,a,l+1),(0,n.default)(u)||i.push(u)):i.push(u))}return l>0&&r&&(0,o.default)(i)?void 0:i}{let u=(0,i.default)(e).reduce(((o,i)=>{let u=e[i];return(0,n.default)(u)||(t?(u=f(u,t,r,a,l+1),(0,n.default)(u)||(o[i]=u)):o[i]=u),o}),{});return l>0&&r&&(0,o.default)(u)?void 0:u}}t.default=function(e,t=!1,r=!1,n=!1){return f(e,t,r,n,0)},t.doOmit=f},250:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=r(610),i=r(81);function u(e,t,r,f,a){if((0,n.isDictLike)(e)&&(0,n.isDictLike)(t)){let a=Reflect.ownKeys(t),l={};return a.forEach((a=>{if(!(e[a]===t[a]||(0,i.default)(t[a])||f&&""===t[a]))if(r&&(0,n.isDictLike)(e[a])&&(0,n.isDictLike)(t[a])){let n=u(e[a],t[a],r,f,!0);(0,o.default)(n)||(l[a]=n,Object.assign(e[a],t[a]))}else l[a]=e[a]=t[a]})),l}return a?t:{}}t.default=function(e,t,r=!1,n=!1){return u(e,t,r,n,!1)}},902:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return Array.isArray(e)?t.map((t=>e[t])):t.reduce(((t,r)=>(r in e&&(t[r]=e[r]),t)),{})}},184:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return Number(e)+Math.floor(Math.random()*(t-e+1))}},331:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(184);t.default=function(e,t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){let r="",o=t.length-1;for(;0<e--;)r+=t[(0,n.default)(0,o)];return r}},103:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return new Promise((t=>setTimeout(t,Number(e))))}},327:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=r(428);function i(e,t="number"){return e.every((e=>typeof e===t))}t.default=function e(t,r){if((0,n.isArrayLike)(t,!0)){let e=(0,o.ensureArray)(t),n=r;return n||!i(e)&&!i(e,"bigint")||(n=(e,t)=>e-t),function(e){if("object"==typeof process&&"object"==typeof process.versions)return e.length<=10||parseFloat(process.versions.v8||"0")>=7;if("object"==typeof Deno)return!0;if("object"==typeof navigator&&"string"==typeof navigator.userAgent){let t=navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge|OPR)\/(\d+)/);if(t){let r=t[1],n=parseFloat(t[2]);if("Edge"===r&&e.length<=512||"Chrome"===r&&n>=70||e.length<=10||"Firefox"===r&&n>=3||"Safari"===r&&n>=10.1||"OPR"===r&&n>=54)return!0}}return!1}(e)?e.sort(n):e.map(((e,t)=>({value:e,index:t}))).sort(((e,t)=>n(e.value,t.value)||e.index-t.index)).map((({value:e})=>e))}if((0,n.isDictLike)(t)){let i=Boolean(r);return[...e(Object.getOwnPropertyNames(t)),...Object.getOwnPropertySymbols(t)].reduce(((r,u)=>{let f=t[u];return i&&((0,n.isArrayLike)(f,!0)?f=(0,o.ensureArray)(f).map((t=>(0,n.isDictLike)(t)?e(t,i):t)):(0,n.isDictLike)(f)&&(f=e(f,i))),r[u]=f,r}),{})}throw"function"==typeof r?new TypeError("The target to sort is not an array"):"boolean"==typeof r?new TypeError("The target to sort is not a pure object"):new TypeError("The target to sort is not an array or a pure object")}},616:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837);function o(e,t){if("number"!=typeof t)throw new TypeError(`argument '${e}' must be a number`);if(t<1)throw new RangeError(`argument '${e}' must be 1 or higher`)}function i(e,t,r){let n=[];for(let o=0,i=r||e.length;o<i;o+=t)"function"==typeof e.slice?n.push(e.slice(o,o+t)):n.push(Array.prototype.slice.call(e,o,o+t));return n}function u(e,t){let r=[],n=0,o=t.length,i=e.byteLength;for(;n<i;){let u=e.indexOf(t,n);-1!==u?(r.push(e.slice(n,u)),n=u+o):(r.push(e.slice(n)),n=i)}return r}function f(e,t){let r=Object.getPrototypeOf(e),n=i(Object.keys(e),t),o=[];for(let t of n){let n=Object.create(r);o.push(n);for(let r of t)n[r]=e[r]}return o}function a(e,t){let r=[],n=0;for(;(n+=t)<=e;)r.push(n);return e>n-t&&r.push(e),r}t.default=function(e,t){if(arguments.length<2)throw new SyntaxError(`2 arguments required, received ${arguments.length}`);if("string"==typeof e)return"string"==typeof t||t instanceof RegExp?e.split(t):(o("length",t),i(e,t));if("number"==typeof e)return o("step",t),a(e,t);if("function"==typeof Buffer&&Buffer.isBuffer(e)&&("string"==typeof t||Buffer.isBuffer(t)))return u(e,t);if((0,n.isBufferLike)(e))return o("byteLength",t),i(e,t,e.byteLength);if((0,n.isArrayLike)(e))return o("length",t),i(e,t);if((0,n.isCollectionLike)(e)){let r=e.constructor;return o("size",t),i([...e],t).map((e=>new r(e)))}if("object"==typeof e&&null!==e)return o("size",t),f(e,t);throw new TypeError("argument 'obj' must be a string, a number or an object")}},94:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(382),o=r(81);t.default=function(e,t=!1){if("boolean"==typeof e&&(t=e,e=void 0),(e=e||new Date)instanceof Date)return t?e.valueOf():Math.floor(e.valueOf()/1e3);if("number"==typeof e)return t?e:Math.floor(e/1e3);{let r,i=String(e).trim();if(i.includes(",")&&i.split(",").every(n.default)?r=function(e){let[t,r,n,i,u,f,a]=e.split(",").map(Number),l=new Date;return(0,o.default)(t)||l.setFullYear(t),(0,o.default)(r)||l.setMonth(r),(0,o.default)(n)||l.setDate(n),(0,o.default)(i)||l.setHours(i),(0,o.default)(u)||l.setMinutes(u),(0,o.default)(f)||l.setSeconds(f),(0,o.default)(a)||l.setMilliseconds(a),l}(i):(/^\d{1,2}:\d{2}(:\d{2})?/.test(i)&&(r=new Date,i=r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate()+" "+i),r=new Date(i)),"Invalid Date"!==String(r))return t?r.valueOf():Math.floor(r.valueOf()/1e3);throw new Error("The input argument is not a valid date-time string")}}},385:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(837),o=r(428);t.default=function e(t,r=!1){return"string"==typeof t?t.trim():(0,n.isArrayLike)(t)?(0,o.ensureArray)(t).map((t=>e(t,r))):(0,n.isDictLike)(t)?[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)].reduce(((i,u)=>{let f=t[u];return"string"==typeof f?f=f.trim():r&&((0,n.isArrayLike)(f,!0)?f=(0,o.ensureArray)(f).map((t=>(0,n.isDictLike)(t)?e(t,r):t)):(0,n.isDictLike)(f)&&(f=e(f,r))),i[u]=f,i}),{}):t}},89:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(93),o=r(710);t.default=function(e,t){if("class"!==(0,o.default)(t)&&t!==Symbol&&"function"==typeof BigInt&&t!==BigInt)throw new TypeError("'type' must be a valid constructor");let r,i={string:String,number:Number,bigint:(0,n.default)("BigInt"),boolean:Boolean,symbol:Symbol};return e instanceof t?[String,Number,Boolean].includes(t)?t(e):e:(r=typeof e)&&i[r]===t?e:null}},710:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(81),o=r(182);t.default=function(e){if(0===arguments.length)throw new TypeError("1 argument is required, 0 given");if((0,n.default)(e))return"void";let t=typeof e;return"function"===t?(0,o.default)(e)?"class":"function":"object"===t?"[object Arguments]"===Object.prototype.toString.call(e)?"arguments":e.constructor||Object:t}},683:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0})},681:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(655);t.default=function(e){return(0,n.__awaiter)(this,void 0,void 0,(function*(){if(void 0===t)var t=e=>setTimeout(e,0);do{yield new Promise(t)}while(0==(yield e()))}))}},397:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(655),o=r(610);if(void 0===i)var i=e=>setTimeout(e,0);function u(e,t,r=!1){if(t<1)throw new RangeError("The 'interval' time for throttle must not be smaller than 1");if(!u.gcTimer){let{gcInterval:e,tasks:t}=u;u.gcTimer=setInterval((()=>{let r=Date.now();t.forEach((({interval:n,lastActive:o},i)=>{r-o>Math.max(n+5,e)&&t.delete(i)}))}),e),"function"==typeof u.gcTimer.unref&&u.gcTimer.unref()}let f=u.tasks.get(e);return f||u.tasks.set(e,f=function(e,t=!1){let r={interval:e,lastActive:0,cache:void 0,queue:new Set,func:void 0};return r.func=function(r,...u){return(0,n.__awaiter)(this,void 0,void 0,(function*(){let n=Date.now();if(n-this.lastActive>=e){if(this.lastActive=n,t&&this.cache){if(Promise.resolve(r(...u)).then((e=>{this.cache={value:e,error:null}})).catch((e=>{this.cache={value:void 0,error:e}})),this.cache.error)throw this.cache.error;return this.cache.value}{let e,t;this.cache=void 0;try{e=yield r(...u),this.cache={value:e,error:null}}catch(e){this.cache={value:void 0,error:t=e}}if(i((()=>{(0,o.default)(this.queue)||this.queue.forEach((r=>{t?r.reject(t):r.resolve(e),this.queue.delete(r)}))})),t)throw t;return e}}if(this.cache){if(this.cache.error)throw this.cache.error;return this.cache.value}return new Promise(((e,t)=>{this.queue.add({resolve:e,reject:t})}))}))}.bind(r),r}(t,r)),f.func}t.default=u,function(e){e.gcInterval=3e4,e.gcTimer=void 0,e.tasks=new Map}(u||(u={}))},140:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(703);t.default=function(e,t){let r=function(...r){return t.call(this,e,...r)};return(0,n.default)(r,"name",e.name),(0,n.default)(r,"length",e.length),(0,n.default)(r,"toString",e.toString.bind(e)),r}},655:(e,t,r)=>{"use strict";r.r(t),r.d(t,{__extends:()=>o,__assign:()=>i,__rest:()=>u,__decorate:()=>f,__param:()=>a,__metadata:()=>l,__awaiter:()=>c,__generator:()=>s,__createBinding:()=>d,__exportStar:()=>y,__values:()=>p,__read:()=>b,__spread:()=>h,__spreadArrays:()=>v,__spreadArray:()=>g,__await:()=>m,__asyncGenerator:()=>O,__asyncDelegator:()=>j,__asyncValues:()=>_,__makeTemplateObject:()=>w,__importStar:()=>S,__importDefault:()=>k,__classPrivateFieldGet:()=>A,__classPrivateFieldSet:()=>M});var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function u(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}function f(e,t,r,n){var o,i=arguments.length,u=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(e,t,r,n);else for(var f=e.length-1;f>=0;f--)(o=e[f])&&(u=(i<3?o(u):i>3?o(t,r,u):o(t,r))||u);return i>3&&u&&Object.defineProperty(t,r,u),u}function a(e,t){return function(r,n){t(r,n,e)}}function l(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function c(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{a(n.next(e))}catch(e){i(e)}}function f(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,f)}a((n=n.apply(e,t||[])).next())}))}function s(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:f(0),throw:f(1),return:f(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function f(i){return function(f){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,f])}}}var d=Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]};function y(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||d(t,e,r)}function p(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function b(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),u=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return u}function h(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(b(arguments[t]));return e}function v(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],u=0,f=i.length;u<f;u++,o++)n[o]=i[u];return n}function g(e,t,r){if(r||2===arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}function m(e){return this instanceof m?(this.v=e,this):new m(e)}function O(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(e,t||[]),i=[];return n={},u("next"),u("throw"),u("return"),n[Symbol.asyncIterator]=function(){return this},n;function u(e){o[e]&&(n[e]=function(t){return new Promise((function(r,n){i.push([e,t,r,n])>1||f(e,t)}))})}function f(e,t){try{(r=o[e](t)).value instanceof m?Promise.resolve(r.value.v).then(a,l):c(i[0][2],r)}catch(e){c(i[0][3],e)}var r}function a(e){f("next",e)}function l(e){f("throw",e)}function c(e,t){e(t),i.shift(),i.length&&f(i[0][0],i[0][1])}}function j(e){var t,r;return t={},n("next"),n("throw",(function(e){throw e})),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,o){t[n]=e[n]?function(t){return(r=!r)?{value:m(e[n](t)),done:"return"===n}:o?o(t):t}:o}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=p(e),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,o){!function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)}(n,o,(t=e[r](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var P=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function S(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&d(t,e,r);return P(t,e),t}function k(e){return e&&e.__esModule?e:{default:e}}function A(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)}function M(e,t,r,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(e,r):o?o.value=r:t.set(e,r),r}},697:e=>{e.exports=function(e){return~-encodeURI(e).split(/%..|./).length}}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(341)})()}));
//# sourceMappingURL=index.js.map