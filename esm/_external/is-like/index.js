import { __exports as isLike } from '../../_virtual/index.js';

Object.defineProperty(isLike, "__esModule", {
  value: true
});
var isArrayLike_1 = isLike.isArrayLike = isArrayLike;
var isBufferLike_1 = isLike.isBufferLike = void 0;
var isCollectionLike_1 = isLike.isCollectionLike = isCollectionLike;
var isDictLike_1 = isLike.isDictLike = isDictLike;
isLike.isErrorLike = isErrorLike;
isLike.isObjectIdLike = isObjectIdLike;
isLike.isPromiseLike = isPromiseLike;
isLike.isTypedArrayLike = isTypedArrayLike;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * @param {any} value 
 * @param {Array<[string|symbol, string]>} props 
 * @param {Array<string>} types
 */
function isObjectWith(value) {
  var isObj = _typeof(value) === "object" && value !== null;
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  return isObj && props.every(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      p = _ref2[0],
      t = _ref2[1];
    return p in value && _typeof(value[p]) === t;
  });
}
function isEmptyDict(obj) {
  try {
    var str = JSON.stringify(obj);
    return str === "{}" || str === "[]";
  } catch (e) {
    return false;
  }
}

/**
 * Checks if the input value is a dict `object`, which includes key-value pairs.
 * @returns {value is { [x: string | symbol]: any; }}
 */
function isDictLike(value) {
  return _typeof(value) === "object" && value !== null && (value.constructor === Object || !(value instanceof Date) && !(value instanceof RegExp) && !isArrayLike(value, true) && !isObjectIdLike(value) && !isEmptyDict(value) && !isTypedArrayLike(value) && !isCollectionLike(value) && !isPromiseLike(value));
}

/**
 * Checks if the input value is an `object` with `length` property or a string.
 * @returns {value is ArrayLike<any>}
 */
function isArrayLike(value) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (Array.isArray(value)) {
    return true;
  } else if (!strict) {
    return isObjectWith(value, ["length", "number"]) || typeof value === "string";
  } else if (isObjectWith(value, ["length", "number"])) {
    var keys = Object.keys(value);
    var isNonEnumLength = !keys.includes("length");
    var indexes;
    if (value.length === 0 || (indexes = keys.map(Number).filter(isFinite)).length === 0) {
      return isNonEnumLength;
    } else {
      var hasIterator = typeof value[Symbol.iterator] === "function";
      for (var i = value.length; i--;) {
        if (!indexes.includes(i) && !(isNonEnumLength || hasIterator)) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

/**
 * Checks if the input value is an `object` with `size` property and
 * `[Symbol.iterator]()` method, or is an instance of **WeakMap** or
 * **WeakSet** if `excludeWeakOnes` is not set.
 */
function isCollectionLike(value) {
  var excludeWeakOnes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isObjectWith(value, ["size", "number"], [Symbol.iterator, "function"]) || !excludeWeakOnes && (value instanceof WeakMap || value instanceof WeakSet);
}

/**
 * 
 * @returns {value is ArrayLike<number> & Pick<Uint8Array, "byteLength" | "slice">}
 */
function isTypedArrayLike(value) {
  return isObjectWith(value, ["byteLength", "number"], ["slice", "function"]);
}

/** @deprecated An alias of `isTypedArrayLike`. */
var isBufferLike = isTypedArrayLike;

/**
 * Checks if the input value is an `object` with `name`, `message` and `stack`
 * properties.
 * @returns {value is Error}
 */
isBufferLike_1 = isLike.isBufferLike = isBufferLike;
function isErrorLike(value) {
  return isObjectWith(value, ["name", "string"], ["message", "string"], ["stack", "string"]);
}

/**
 * Checks if the input is an `object` with `then()` method.
 * @returns {value is PromiseLike<any>}
 */
function isPromiseLike(value) {
  return isObjectWith(value, ["then", "function"]);
}
function isObjectIdLike(value) {
  return _typeof(value) === "object" && value !== null && (value.constructor.name === "ObjectId" || value.constructor.name === "ObjectID");
}

export { isLike as default, isArrayLike_1 as isArrayLike, isBufferLike_1 as isBufferLike, isCollectionLike_1 as isCollectionLike, isDictLike_1 as isDictLike };
//# sourceMappingURL=index.js.map
