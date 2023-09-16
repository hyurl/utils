var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}var utils = {};var count$1 = {};var isLike = {};Object.defineProperty(isLike, "__esModule", {
  value: true
});
isLike.isArrayLike = isArrayLike;
isLike.isBufferLike = void 0;
isLike.isCollectionLike = isCollectionLike;
isLike.isDictLike = isDictLike;
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
function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
/**
 * @param {any} value 
 * @param {Array<[string|symbol, string]>} props 
 * @param {Array<string>} types
 */
function isObjectWith(value) {
  var isObj = _typeof$1(value) === "object" && value !== null;
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  return isObj && props.every(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      p = _ref2[0],
      t = _ref2[1];
    return p in value && _typeof$1(value[p]) === t;
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
  return _typeof$1(value) === "object" && value !== null && (value.constructor === Object || !(value instanceof Date) && !(value instanceof RegExp) && !isArrayLike(value, true) && !isObjectIdLike(value) && !isEmptyDict(value) && !isTypedArrayLike(value) && !isCollectionLike(value) && !isPromiseLike(value));
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
isLike.isBufferLike = isBufferLike;
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
  return _typeof$1(value) === "object" && value !== null && (value.constructor.name === "ObjectId" || value.constructor.name === "ObjectID");
}var utf8Length = function(s) {
  return ~-encodeURI(s).split(/%..|./).length
};Object.defineProperty(count$1, "__esModule", { value: true });
const is_like_1$9 = isLike;
const bytes = utf8Length;
const encoder = typeof TextEncoder === "function" ? new TextEncoder() : null;
count$1.default = count;
function count(target, option = void 0) {
    if (typeof target === "string") {
        if (typeof option === "string") {
            if (!option) {
                return target.length + 1;
            }
            else if (!target) {
                return 0;
            }
            return target.split(option).length - 1;
        }
        else if (option === true) {
            if (typeof Buffer === "function" &&
                typeof Buffer.byteLength === "function") {
                return Buffer.byteLength(target);
            }
            else if (encoder) {
                return encoder.encode(target).byteLength;
            }
            else {
                return bytes(target);
            }
        }
        else {
            return target.length;
        }
    }
    else if ((0, is_like_1$9.isArrayLike)(target, true)) {
        if (arguments.length === 2) {
            let times = 0;
            for (let i = target.length; i--;) {
                // treat 0 equals -0 and NaN equals NaN
                if (target[i] === option || Object.is(target[i], option)) {
                    times++;
                }
            }
            return times;
        }
        else {
            return target.length;
        }
    }
    else if ((0, is_like_1$9.isBufferLike)(target)) {
        return target.byteLength;
    }
    else if ((0, is_like_1$9.isCollectionLike)(target, true)) {
        return target.size;
    }
    else {
        return Object.keys(target).length;
    }
}var define$1 = {};var typeOf$1 = {};var isVoid$1 = {};Object.defineProperty(isVoid$1, "__esModule", { value: true });
/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 */
function isVoid(value) {
    return value === null || value === undefined || Object.is(value, NaN);
}
isVoid$1.default = isVoid;var couldBeClass$1 = {};/**
 * Checks if an object could be an instantiable class.
 * @param {any} obj
 * @returns {obj is new (...args: any[]) => any}
 */
function couldBeClass(obj) {
    if (typeof obj != "function") return false;

    // async function or arrow function
    if (obj.prototype === undefined)
        return false;

    // generator function and malformed inheritance
    if (obj.prototype.constructor !== obj)
        return false;

    // has own prototype properties
    if (Object.getOwnPropertyNames(obj.prototype).length >= 2)
        return true;

    var str = String(obj);

    // ES6 class
    if (str.slice(0, 5) == "class")
        return true;

    // anonymous function
    if (/^function\s*\(|^function anonymous\(/.test(str))
        return false;

    var hasThis = /(call|apply|_classCallCheck)\(this(, arguments)?\)|\bthis(.\S+|\[.+?\])\s*(=|\()|=\s*this[,;]/.test(str);

    // Upper-cased first char of the name and has `this` in the body, or it's
    // a native class in ES5 style.
    if (/^function\s+[A-Z]/.test(str) && (hasThis ||
        (/\[native code\]/.test(str) &&
            obj.name !== "BigInt" && // ES6 BigInt and Symbol is not class
            obj.name !== "Symbol"
        )
    )) {
        return true;
    }

    // TypeScript anonymous class to ES5 with default export
    if (hasThis && obj.name === "default_1")
        return true;

    return false;
}

couldBeClass$1.couldBeClass = couldBeClass;
couldBeClass$1.default = couldBeClass;Object.defineProperty(typeOf$1, "__esModule", { value: true });
const isVoid_1$5 = isVoid$1;
const could_be_class_1 = couldBeClass$1;
/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
function typeOf(target) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if ((0, isVoid_1$5.default)(target))
        return "void";
    let type = typeof target;
    if (type === "function") {
        if ((0, could_be_class_1.default)(target)) {
            return "class";
        }
        else {
            return "function";
        }
    }
    else if (type === "object") {
        if (Object.prototype.toString.call(target) === "[object Arguments]") {
            return "arguments";
        }
        else {
            return target.constructor || Object;
        }
    }
    else {
        return type;
    }
}
typeOf$1.default = typeOf;Object.defineProperty(define$1, "__esModule", { value: true });
const typeOf_1 = typeOf$1;
/**
 * Sets a property on the target object.
 * @param value Normally this is the value bound to the property, however, it
 *  could be used to set the getter and the setter using the signature
 *  `{ get: Function, set?: Function }`.
 * @param enumerable By default, the property is non-enumerable and can't be
 *  seen by the console, use this option to make it enumerable and visible to
 *  the console.
 * @param writable By default, the property is readonly once set, use this
 *  option to allow it being writable.
 *  **This property doesn't work with setter.**
 */
function define(obj, prop, value, enumerable = false, writable = false) {
    if ((0, typeOf_1.default)(value) === Object) {
        if (isGetter(value) || isGetterAndSetter(value)) {
            Object.defineProperty(obj, prop, Object.assign({ configurable: true, enumerable }, value));
            return;
        }
    }
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable,
        writable,
        value
    });
}
define$1.default = define;
function isGetter(obj) {
    return String(Object.keys(obj)) === "get"
        && typeof obj["get"] === "function";
}
function isGetterAndSetter(obj) {
    let sign = String(Object.keys(obj));
    return (sign === "get,set" || sign === "set,get")
        && typeof obj["get"] === "function"
        && typeof obj["set"] === "function";
}var diff$1 = {};var isEmpty$1 = {};Object.defineProperty(isEmpty$1, "__esModule", { value: true });
const is_like_1$8 = isLike;
const BaseEmptyPrimitives = ["", NaN, null, void 0];
const EmptyPrimitives = [...BaseEmptyPrimitives, 0, false];
if (typeof BigInt === "function")
    EmptyPrimitives.push(BigInt("0"));
/**
 * Checks if the value resolves to an empty object or a falsy value.
 */
function isEmpty(value, deep = false) {
    return test(value, Boolean(deep), EmptyPrimitives);
}
isEmpty$1.default = isEmpty;
function test(value, deep, emptyPrimitives) {
    if (emptyPrimitives.includes(value))
        return true;
    if (typeof value === "object") {
        if (value instanceof RegExp) {
            return false;
        }
        else if (value instanceof Date) {
            return String(value) === "Invalid Date";
        }
        else if (value instanceof Error) {
            return value.message.length === 0;
        }
        else if ((0, is_like_1$8.isBufferLike)(value)) {
            return value.byteLength === 0;
        }
        else if ((0, is_like_1$8.isArrayLike)(value, true)) {
            if (value.length === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                for (let i = 0, len = value.length; i < len; ++i) {
                    if (!test(value[i], deep, BaseEmptyPrimitives)) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if ((0, is_like_1$8.isCollectionLike)(value, true)) {
            if (value.size === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                if (value instanceof Map) {
                    for (let v of value.values()) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }
                    return true;
                }
                else if (value instanceof Set) {
                    for (let v of value) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }
        }
        else {
            let keys = Reflect.ownKeys(value);
            if (keys.length === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                return keys.every(k => test(value[k], deep, BaseEmptyPrimitives));
            }
        }
    }
    return false;
}Object.defineProperty(diff$1, "__esModule", { value: true });
const is_like_1$7 = isLike;
const isEmpty_1$3 = isEmpty$1;
const isVoid_1$4 = isVoid$1;
function diff(origin, input, deep = false) {
    if (Array.isArray(origin) && Array.isArray(input)) {
        return [
            ...input.filter(value => !origin.includes(value)),
            ...origin.filter(value => !input.includes(value))
        ];
    }
    else if ((0, is_like_1$7.isDictLike)(origin) && (0, is_like_1$7.isDictLike)(input)) {
        let keys = Reflect.ownKeys(input);
        let _keys = Reflect.ownKeys(origin);
        let result = {};
        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                !((0, isVoid_1$4.default)(origin[key]) && (0, isVoid_1$4.default)(input[key])) // ignore void values
            ) {
                if (deep &&
                    typeof origin[key] === "object" && origin[key] !== null &&
                    typeof input[key] === "object" && input[key] !== null) {
                    let _result = diff(origin[key], input[key], deep);
                    if (!(0, isEmpty_1$3.default)(_result)) {
                        result[key] = _result;
                    }
                }
                else {
                    result[key] = input[key];
                }
            }
        });
        _keys.forEach(key => {
            keys.includes(key) || (result[key] = origin[key]);
        });
        return result;
    }
    else {
        return input;
    }
}
diff$1.default = diff;var ensureType$1 = {};var isBetween$1 = {};Object.defineProperty(isBetween$1, "__esModule", { value: true });
/**
 * Checks if a number is between two numbers (gte than the minimal value and lte
 * than the maximum value).
 */
function isBetween(value, [min, max]) {
    return value >= min && value <= max;
}
isBetween$1.default = isBetween;var keysOf$1 = {};Object.defineProperty(keysOf$1, "__esModule", { value: true });
function keysOf(obj) {
    if (Array.isArray(obj)) {
        return Object.keys(obj).map(Number);
    }
    else {
        return Reflect.ownKeys(obj);
    }
}
keysOf$1.default = keysOf;Object.defineProperty(ensureType$1, "__esModule", { value: true });
ensureType$1.ensureArray = void 0;
const is_like_1$6 = isLike;
const isBetween_1 = isBetween$1;
const keysOf_1 = keysOf$1;
const truePattern = /^\s*(true|yes|on)\s*$/i;
const falsePattern = /^\s*(false|no|off)\s*$/i;
const nullPattern = /^\s*(null|nil|none|void|undefined)\s*$/i;
const nanPattern = /^\s*NaN\s*$/;
const infinityPattern = /^\s*-?Infinity\s*/;
const regexPattern = /^\s*\/(.+)\/([gimuys]*)\s*$/;
const numberInterval = [
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
];
/**
 * Casts the target object or its contents to the closest types automatically.
 * This function is useful when reading config from a file or fetching data from
 * the web.
 */
function ensureType(target) {
    switch (typeof target) {
        case "string": {
            let re;
            if (truePattern.test(target)) {
                return true;
            }
            else if (falsePattern.test(target)) {
                return false;
            }
            else if (nullPattern.test(target)) {
                return null;
            }
            else if (nanPattern.test(target)) {
                return NaN;
            }
            else if (infinityPattern.test(target)) {
                return Number(target);
            }
            else if (re = target.match(regexPattern)) {
                return new RegExp(re[1], re[2]);
            }
            else {
                let num = Number(target);
                if (!isNaN(num) &&
                    (0, isBetween_1.default)(num, numberInterval) &&
                    target[0] !== "+" // Most likely a telephone number.
                ) {
                    return num;
                }
                else {
                    return target;
                }
            }
        }
        case "object": {
            if (target === null) {
                return null;
            }
            else if ((0, is_like_1$6.isArrayLike)(target, true)) {
                return ensureArray(target).map(ensureType);
            }
            else if ((0, is_like_1$6.isDictLike)(target)) {
                return (0, keysOf_1.default)(target).reduce((result, key) => {
                    result[key] = ensureType(target[key]);
                    return result;
                }, {});
            }
            else {
                return target;
            }
        }
        default:
            return target;
    }
}
ensureType$1.default = ensureType;
function ensureArray(value) {
    return Array.isArray(value) ? value : Array.from(value);
}
ensureType$1.ensureArray = ensureArray;var flatObject$1 = {};Object.defineProperty(flatObject$1, "__esModule", { value: true });
const isVoid_1$3 = isVoid$1;
const is_like_1$5 = isLike;
function flatObject(obj, depth = 1, flatArray = false) {
    return flatDeep({}, obj, "", 0, depth, flatArray);
}
flatObject$1.default = flatObject;
function flatDeep(carrier, source, field, depth, maxDepth, flatArray) {
    let isArr;
    let isDict;
    let isContent = !(0, isVoid_1$3.default)(field) && field !== "";
    if (depth === maxDepth || (!(isArr = (0, is_like_1$5.isArrayLike)(source, true) && !(0, is_like_1$5.isBufferLike)(source)) &&
        !(isDict = (0, is_like_1$5.isDictLike)(source)))) {
        carrier[field] = source;
    }
    else if (isDict) {
        Reflect.ownKeys(source).forEach(key => {
            let value = source[key];
            if (typeof key === "symbol") {
                if (depth === 0) { // only allow top-level symbol properties
                    carrier[key] = value;
                }
            }
            else {
                flatDeep(carrier, value, isContent ? `${field}.${key}` : key, isContent ? depth + 1 : depth, maxDepth, flatArray);
            }
        });
    }
    else if (isArr) {
        if (flatArray) {
            for (let i = 0, len = source.length; i < len; ++i) {
                flatDeep(carrier, source[i], isContent ? `${field}.${i}` : String(i), isContent ? depth + 1 : depth, maxDepth, flatArray);
            }
        }
        else {
            carrier[field] = source;
        }
    }
    return carrier;
}var getGlobal$1 = {};Object.defineProperty(getGlobal$1, "__esModule", { value: true });
function getGlobal(prop = void 0) {
    let _global;
    if (typeof globalThis === "object") {
        _global = globalThis;
    }
    else if (typeof self === "object") {
        _global = self;
    }
    else if (typeof commonjsGlobal === "object") {
        _global = commonjsGlobal;
    }
    else if (typeof window === "object") {
        _global = window;
    }
    return _global && (prop ? _global[prop] : _global);
}
getGlobal$1.default = getGlobal;var isFloat$2 = {};var number = {};Object.defineProperty(number, "__esModule", { value: true });
number.sequence = number.random = number.isFloat = void 0;
/** Returns true if the given value is a float, false otherwise. */
function isFloat$1(value) {
    return typeof value === "number"
        && !Number.isNaN(value)
        && (!Number.isFinite(value) || value % 1 !== 0);
}
number.isFloat = isFloat$1;
/** Returns a random integer ranged from `min` to `max`. */
function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
number.random = random;
/** Creates a generator that produces sequential numbers from `min` to `max` (inclusive). */
function* sequence(min, max, step = 1, loop = false) {
    let id = min;
    while (true) {
        yield id;
        if (id >= max) {
            if (loop) {
                id = min;
            }
            else {
                break;
            }
        }
        else {
            id += step;
        }
    }
}
number.sequence = sequence;Object.defineProperty(isFloat$2, "__esModule", { value: true });
const number_1$2 = number;
/** @deprecated use `Number.isFloat` from `@ayonli/jsext/number/augment` instead. */
const isFloat = number_1$2.isFloat;
isFloat$2.default = isFloat;var isInteger$1 = {};Object.defineProperty(isInteger$1, "__esModule", { value: true });
/**
 * Checks if the value is an integer number (or bigint).
 *
 * @deprecated use `Number.isInteger` instead.
 */
function isInteger(value) {
    return typeof value === "bigint" || Number.isInteger(value);
}
isInteger$1.default = isInteger;var isNumeric$1 = {};Object.defineProperty(isNumeric$1, "__esModule", { value: true });
/**
 * Checks if the value is a number or numeric string.
 */
function isNumeric(value) {
    let type = typeof value;
    return type === "number"
        || type === "bigint"
        || (type === "string" && !Number.isNaN(value));
}
isNumeric$1.default = isNumeric;var isOwnKey$1 = {};var object = {};Object.defineProperty(object, "__esModule", { value: true });
object.as = object.omit = object.pick = object.patch = object.hasOwnMethod = object.hasOwn = void 0;
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
object.hasOwn = hasOwn;
/**
 * Returns `true` if the specified object has the indicated method as its own method (in its own
 * prototype). If the method is inherited, or is not in the prototype, or does not exist, this
 * function returns `false`.
 */
function hasOwnMethod(obj, method) {
    var _a;
    let proto = Object.getPrototypeOf(obj);
    if (!proto || !hasOwn(proto, method)) {
        return false;
    }
    return typeof ((_a = Object.getOwnPropertyDescriptor(proto, method)) === null || _a === void 0 ? void 0 : _a.value) === "function";
}
object.hasOwnMethod = hasOwnMethod;
function patch$2(target, ...sources) {
    for (const source of sources) {
        for (const key of Reflect.ownKeys(source)) {
            if (!hasOwn(target, key) || target[key] === undefined) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
object.patch = patch$2;
function pick$2(obj, keys) {
    return keys.reduce((result, key) => {
        if (key in obj && obj[key] !== undefined) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
object.pick = pick$2;
function omit$2(obj, keys) {
    const allKeys = Reflect.ownKeys(obj);
    const keptKeys = allKeys.filter(key => !keys.includes(key));
    const result = pick$2(obj, keptKeys);
    // special treatment for Error types
    if (obj instanceof Error) {
        ["name", "message", "cause"].forEach(key => {
            if (!keys.includes(key) &&
                obj[key] !== undefined &&
                !hasOwn(result, key)) {
                result[key] = obj[key];
            }
        });
    }
    return result;
}
object.omit = omit$2;
function as(obj, type) {
    if (typeof type !== "function") {
        throw new TypeError("type must be a valid constructor");
    }
    let _type;
    let primitiveMap = {
        "string": String,
        "number": Number,
        "bigint": BigInt,
        "boolean": Boolean,
        "symbol": Symbol
    };
    if (obj instanceof type) {
        if ([String, Number, Boolean].includes(type)) {
            return obj.valueOf(); // make sure the primitives are returned.
        }
        else {
            return obj;
        }
    }
    else if ((_type = typeof obj) && primitiveMap[_type] === type) {
        return obj;
    }
    return null;
}
object.as = as;Object.defineProperty(isOwnKey$1, "__esModule", { value: true });
const object_1$4 = object;
/** @deprecated use `Object.hasOwn` from `@ayonli/jsext/object/augment` instead. */
const isOwnKey = object_1$4.hasOwn;
isOwnKey$1.default = isOwnKey;var isOwnMethod$1 = {};Object.defineProperty(isOwnMethod$1, "__esModule", { value: true });
const object_1$3 = object;
/** @deprecated use `Object.hasOwnMethod` from `@ayonli/jsext/object/augment` instead. */
const isOwnMethod = object_1$3.hasOwnMethod;
isOwnMethod$1.default = isOwnMethod;var isSubClassOf$1 = {};Object.defineProperty(isSubClassOf$1, "__esModule", { value: true });
/** Checks if a class is a sub-class of (inherited from) the base class. */
function isSubClassOf(target, base) {
    return typeof target === "function"
        && typeof base === "function"
        && target.prototype instanceof base;
}
isSubClassOf$1.default = isSubClassOf;var omit$1 = {};Object.defineProperty(omit$1, "__esModule", { value: true });
const object_1$2 = object;
function omit(obj, props) {
    if (Array.isArray(obj)) {
        return obj.filter(i => !props.includes(i));
    }
    else {
        return (0, object_1$2.omit)(obj, props);
    }
}
omit$1.default = omit;var omitVoid$1 = {};Object.defineProperty(omitVoid$1, "__esModule", { value: true });
omitVoid$1.doOmit = void 0;
const isVoid_1$2 = isVoid$1;
const isEmpty_1$2 = isEmpty$1;
const is_like_1$4 = isLike;
/**
 * Creates an object composed with only the non-void properties.
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 * @param omitEmptyStrings If set, empty properties of type `string` will be
 *  removed as well.
 */
function omitVoid(target, deep = false, omitEmptyObjects = false, omitEmptyStrings = false) {
    return doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, 0);
}
omitVoid$1.default = omitVoid;
function doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, depth) {
    if (typeof target === "string") {
        return omitEmptyStrings && target.trim() === ""
            ? (depth > 0 ? void 0 : "")
            : target;
    }
    else if (target === null
        || typeof target !== "object"
        || target instanceof Date
        || target instanceof Error
        || target instanceof RegExp
        || (0, is_like_1$4.isBufferLike)(target)) {
        return target;
    }
    else if (omitEmptyObjects && (0, isEmpty_1$2.default)(target)) {
        return depth > 0 ? void 0 : ((0, is_like_1$4.isArrayLike)(target, true) ? [] : {});
    }
    if ((0, is_like_1$4.isArrayLike)(target, true)) {
        let arr = [];
        for (let i = 0, len = target.length; i < len; ++i) {
            let value = target[i];
            if (!(0, isVoid_1$2.default)(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    (0, isVoid_1$2.default)(value) || arr.push(value);
                }
                else {
                    arr.push(value);
                }
            }
        }
        if (depth > 0 && omitEmptyObjects && (0, isEmpty_1$2.default)(arr)) {
            return void 0;
        }
        else {
            return arr;
        }
    }
    else {
        let obj = Reflect.ownKeys(target).reduce((obj, key) => {
            let value = target[key];
            if (!(0, isVoid_1$2.default)(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    (0, isVoid_1$2.default)(value) || (obj[key] = value);
                }
                else {
                    obj[key] = value;
                }
            }
            return obj;
        }, {});
        if (depth > 0 && omitEmptyObjects && (0, isEmpty_1$2.default)(obj)) {
            return void 0;
        }
        else {
            return obj;
        }
    }
}
omitVoid$1.doOmit = doOmit;var patch$1 = {};Object.defineProperty(patch$1, "__esModule", { value: true });
const is_like_1$3 = isLike;
const isEmpty_1$1 = isEmpty$1;
const isVoid_1$1 = isVoid$1;
/**
 * Patches the differences onto the `origin` object from the `input` object. If
 * a property exists in both objects and the values are not equal, the `input`
 * one will be taken. However, those properties that are only presents in the
 * `origin` object will remain untouched.
 *
 * NOTE: This function mutates the `origin` object and returns the patched
 * differences, when patching, any void value in the `input` object will be
 * ignored.
 *
 * This function is very useful, for example, a client issued a patch of the
 * resource and the server wants to know what properties has been modified by
 * this update so that it can perform some extra operations to provide a better
 * user experience.
 */
function patch(origin, input, deep = false, ignoreEmptyStrings = false) {
    return doPatch(origin, input, deep, ignoreEmptyStrings, false);
}
patch$1.default = patch;
function doPatch(origin, input, deep, ignoreEmptyStrings, isChildNode) {
    if ((0, is_like_1$3.isDictLike)(origin) && (0, is_like_1$3.isDictLike)(input)) {
        let keys = Reflect.ownKeys(input);
        let result = {};
        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                !(0, isVoid_1$1.default)(input[key]) && // ignore invalid values
                (!ignoreEmptyStrings || input[key] !== "")) {
                if (deep && (0, is_like_1$3.isDictLike)(origin[key]) && (0, is_like_1$3.isDictLike)(input[key])) {
                    let _result = doPatch(origin[key], input[key], deep, ignoreEmptyStrings, true);
                    if (!(0, isEmpty_1$1.default)(_result)) {
                        result[key] = _result;
                        Object.assign(origin[key], input[key]);
                    }
                }
                else {
                    result[key] = origin[key] = input[key];
                }
            }
        });
        return result;
    }
    else if (isChildNode) {
        return input;
    }
    else {
        return {};
    }
}var pick$1 = {};Object.defineProperty(pick$1, "__esModule", { value: true });
const object_1$1 = object;
function pick(obj, props) {
    if (Array.isArray(obj)) {
        return props.map(i => obj[i]);
    }
    else {
        return (0, object_1$1.pick)(obj, props);
    }
}
pick$1.default = pick;var rand$1 = {};Object.defineProperty(rand$1, "__esModule", { value: true });
const number_1$1 = number;
/** @deprecated use `Number.random` from `@ayonli/jsext/number/augment` instead. */
const rand = number_1$1.random;
rand$1.default = rand;var randStr$1 = {};Object.defineProperty(randStr$1, "__esModule", { value: true });
const rand_1 = rand$1;
/**
 * Generates a random string.
 * @param chars The possible characters.
 * @deprecated use `String.random` from `@ayonli/jsext/string/augment` instead.
 */
function randStr(length, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    let str = "";
    let max = chars.length - 1;
    while (0 < length--) {
        str += chars[(0, rand_1.default)(0, max)];
    }
    return str;
}
randStr$1.default = randStr;var sleep$2 = {};var promise = {};Object.defineProperty(promise, "__esModule", { value: true });
promise.until = promise.sleep = promise.after = promise.timeout = void 0;
/** Try to resolve a promise with a timeout limit. */
async function timeout(value, ms) {
    const result = await Promise.race([
        value,
        new Promise((_, reject) => setTimeout(() => {
            reject(new Error(`operation timeout after ${ms}ms`));
        }, ms))
    ]);
    return result;
}
promise.timeout = timeout;
/** Resolves a promise only after the given duration. */
async function after(value, ms) {
    const [result] = await Promise.allSettled([
        value,
        new Promise(resolve => setTimeout(resolve, ms))
    ]);
    if (result.status === "fulfilled") {
        return result.value;
    }
    else {
        throw result.reason;
    }
}
promise.after = after;
/** Blocks the context for a given time. */
async function sleep$1(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
promise.sleep = sleep$1;
/** Blocks the context until the test is passed. */
async function until$2(test) {
    if (typeof globalThis.setImmediate === "undefined") {
        // @ts-ignore
        globalThis.setImmediate = (cb) => setTimeout(cb, 0);
    }
    do {
        await new Promise(globalThis.setImmediate);
    } while ((await test()) == false);
}
promise.until = until$2;Object.defineProperty(sleep$2, "__esModule", { value: true });
const promise_1$1 = promise;
/** @deprecated use `Promise.sleep` from `@ayonli/jsext/promise/augment` instead. */
const sleep = promise_1$1.sleep;
sleep$2.default = sleep;var sort$1 = {};Object.defineProperty(sort$1, "__esModule", { value: true });
const is_like_1$2 = isLike;
const ensureType_1$1 = ensureType$1;
function sort(target, method = void 0) {
    if ((0, is_like_1$2.isArrayLike)(target, true)) {
        let arr = (0, ensureType_1$1.ensureArray)(target);
        let compare = method;
        // If the compare function is omitted and all the elements are numbers
        // (or of bigint), sort them by their values.
        if (!compare && (onlyNumbers(arr) || onlyNumbers(arr, "bigint"))) {
            compare = (a, b) => a - b;
        }
        if (shouldUseNativeSort(arr)) {
            return arr.sort(compare);
        }
        // Emulate stable sort.
        // Reference: http://blog.vjeux.com/2010/javascript/javascript-sorting-table.html
        return arr
            .map((value, index) => ({ value, index }))
            .sort((a, b) => compare(a.value, b.value) || a.index - b.index)
            .map(({ value }) => value);
    }
    else if ((0, is_like_1$2.isDictLike)(target)) {
        let deep = Boolean(method);
        let keys = [
            ...sort(Object.getOwnPropertyNames(target)),
            ...Object.getOwnPropertySymbols(target)
        ];
        return keys.reduce((result, key) => {
            let value = target[key];
            if (deep) {
                if ((0, is_like_1$2.isArrayLike)(value, true)) {
                    value = (0, ensureType_1$1.ensureArray)(value).map(item => {
                        return (0, is_like_1$2.isDictLike)(item) ? sort(item, deep) : item;
                    });
                }
                else if ((0, is_like_1$2.isDictLike)(value)) {
                    value = sort(value, deep);
                }
            }
            result[key] = value;
            return result;
        }, {});
    }
    else {
        if (typeof method === "function") {
            throw new TypeError("The target to sort is not an array");
        }
        else if (typeof method === "boolean") {
            throw new TypeError("The target to sort is not a pure object");
        }
        else {
            throw new TypeError("The target to sort is not an array or a pure object");
        }
    }
}
sort$1.default = sort;
function onlyNumbers(arr, type = "number") {
    return arr.every(ele => typeof ele === type);
}
function shouldUseNativeSort(arr) {
    if (typeof process === "object" && typeof process.versions === "object") {
        return arr.length <= 10
            || parseFloat(process.versions.v8 || "0") >= 7.0;
    }
    else if (typeof Deno === "object") {
        return true;
    }
    else if (typeof navigator === "object"
        && typeof navigator.userAgent === "string") {
        let match = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge|OPR)\/(\d+)/);
        if (match) {
            let name = match[1];
            let version = parseFloat(match[2]);
            if ((name === "Edge" && arr.length <= 512) ||
                (name === "Chrome" && (version >= 70) || arr.length <= 10) ||
                (name === "Firefox" && version >= 3) ||
                (name === "Safari" && version >= 10.1) ||
                (name === "OPR" && version >= 54)) {
                return true;
            }
        }
    }
    return false;
}var split$1 = {};Object.defineProperty(split$1, "__esModule", { value: true });
const is_like_1$1 = isLike;
function checkNumberArgument(name, value) {
    if (typeof value !== "number") {
        throw new TypeError(`argument '${name}' must be a number`);
    }
    else if (value < 1) {
        throw new RangeError(`argument '${name}' must be 1 or higher`);
    }
}
function splitArrayLike(arr, length, total = void 0) {
    let result = [];
    for (let i = 0, j = (total || arr.length); i < j; i += length) {
        if (typeof arr.slice === "function") {
            result.push(arr.slice(i, i + length));
        }
        else {
            result.push(Array.prototype.slice.call(arr, i, i + length));
        }
    }
    return result;
}
function splitBuffer(buf, sep) {
    let result = [];
    let offset = 0;
    let length = sep.length;
    let total = buf.byteLength;
    while (offset < total) {
        let index = buf.indexOf(sep, offset);
        if (index !== -1) {
            result.push(buf.slice(offset, index));
            offset = index + length;
        }
        else {
            result.push(buf.slice(offset));
            offset = total;
        }
    }
    return result;
}
function splitObject(obj, size) {
    let proto = Object.getPrototypeOf(obj);
    let keyChunks = splitArrayLike(Object.keys(obj), size);
    let result = [];
    for (let keys of keyChunks) {
        let chunk = Object.create(proto);
        result.push(chunk);
        for (let key of keys) {
            chunk[key] = obj[key];
        }
    }
    return result;
}
function splitNumber(num, step) {
    let result = [];
    let offset = 0;
    while ((offset += step) <= num) {
        result.push(offset);
    }
    if (num > offset - step) {
        result.push(num);
    }
    return result;
}
function split(obj, sep) {
    if (arguments.length < 2) {
        throw new SyntaxError(`2 arguments required, received ${arguments.length}`);
    }
    else if (typeof obj === "string") {
        if (typeof sep === "string" || sep instanceof RegExp) {
            return obj.split(sep);
        }
        else {
            checkNumberArgument("length", sep);
            return splitArrayLike(obj, sep);
        }
    }
    else if (typeof obj === "number") {
        checkNumberArgument("step", sep);
        return splitNumber(obj, sep);
    }
    else if (typeof Buffer === "function"
        && Buffer.isBuffer(obj)
        && (typeof sep === "string" || Buffer.isBuffer(sep))) {
        return splitBuffer(obj, sep);
    }
    else if ((0, is_like_1$1.isBufferLike)(obj)) {
        checkNumberArgument("byteLength", sep);
        return splitArrayLike(obj, sep, obj.byteLength);
    }
    else if ((0, is_like_1$1.isArrayLike)(obj, true)) {
        checkNumberArgument("length", sep);
        return splitArrayLike(obj, sep);
    }
    else if ((0, is_like_1$1.isCollectionLike)(obj)) {
        let ctor = obj["constructor"];
        checkNumberArgument("size", sep);
        return splitArrayLike([...obj], sep).map(list => new ctor(list));
    }
    else if (typeof obj === "object" && obj !== null) {
        checkNumberArgument("size", sep);
        return splitObject(obj, sep);
    }
    else {
        throw new TypeError("argument 'obj' must be a string, a number or an object");
    }
}
split$1.default = split;var timestamp$1 = {};Object.defineProperty(timestamp$1, "__esModule", { value: true });
const isNumeric_1 = isNumeric$1;
const isVoid_1 = isVoid$1;
timestamp$1.default = timestamp;
function timestamp(input, ms = false) {
    if (typeof input === "boolean") {
        ms = input;
        input = void 0;
    }
    input = input || new Date();
    if (input instanceof Date) {
        return ms ? input.valueOf() : Math.floor(input.valueOf() / 1000);
    }
    else if (typeof input === "number") {
        return ms ? input : Math.floor(input / 1000);
    }
    else {
        let date;
        let dateTime = String(input).trim();
        if (dateTime.includes(",") && dateTime.split(",").every(isNumeric_1.default)) {
            date = parseDateRawArgs(dateTime);
        }
        else {
            if (/^\d{1,2}:\d{2}(:\d{2})?/.test(dateTime)) { // time only
                date = new Date();
                dateTime = date.getFullYear()
                    + "-" + (date.getMonth() + 1)
                    + "-" + date.getDate()
                    + " " + dateTime;
            }
            date = new Date(dateTime);
        }
        if (String(date) !== "Invalid Date") {
            return ms ? date.valueOf() : Math.floor(date.valueOf() / 1000);
        }
        else {
            throw new Error("The input argument is not a valid date-time string");
        }
    }
}
function parseDateRawArgs(str) {
    let [Y, M, D, H, m, s, ms] = str.split(",").map(Number);
    let date = new Date();
    (0, isVoid_1.default)(Y) || date.setFullYear(Y);
    (0, isVoid_1.default)(M) || date.setMonth(M);
    (0, isVoid_1.default)(D) || date.setDate(D);
    (0, isVoid_1.default)(H) || date.setHours(H);
    (0, isVoid_1.default)(m) || date.setMinutes(m);
    (0, isVoid_1.default)(s) || date.setSeconds(s);
    (0, isVoid_1.default)(ms) || date.setMilliseconds(ms);
    return date;
}var trim$1 = {};Object.defineProperty(trim$1, "__esModule", { value: true });
const is_like_1 = isLike;
const ensureType_1 = ensureType$1;
/**
 * Trims the leading and tailing spaces of a string, the string properties of
 * an object, or the string and object elements in an array.
 */
function trim(target, deep = false) {
    if (typeof target === "string") {
        return target.trim();
    }
    else if ((0, is_like_1.isArrayLike)(target, true)) {
        return (0, ensureType_1.ensureArray)(target).map(item => trim(item, deep));
    }
    else if ((0, is_like_1.isDictLike)(target)) {
        const keys = [
            ...Object.getOwnPropertyNames(target),
            ...Object.getOwnPropertySymbols(target)
        ];
        return keys.reduce((result, key) => {
            let value = target[key];
            if (typeof value === "string") {
                value = value.trim();
            }
            else if (deep) {
                if ((0, is_like_1.isArrayLike)(value, true)) {
                    value = (0, ensureType_1.ensureArray)(value).map(item => {
                        return (0, is_like_1.isDictLike)(item) ? trim(item, deep) : item;
                    });
                }
                else if ((0, is_like_1.isDictLike)(value)) {
                    value = trim(value, deep);
                }
            }
            result[key] = value;
            return result;
        }, {});
    }
    else {
        return target;
    }
}
trim$1.default = trim;var typeAs$1 = {};Object.defineProperty(typeAs$1, "__esModule", { value: true });
const object_1 = object;
/** @deprecated use `Object.as` from `@ayonli/jsext/object/augment` instead. */
const typeAs = object_1.as;
typeAs$1.default = typeAs;var until$1 = {};Object.defineProperty(until$1, "__esModule", { value: true });
const promise_1 = promise;
/** @deprecated use `Promise.until` from `@ayonli/jsext/promise/augment` instead. */
const until = promise_1.until;
until$1.default = until;var useThrottle$1 = {};var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(useThrottle$1, "__esModule", { value: true });
const isEmpty_1 = isEmpty$1;
// @ts-ignore
if (typeof setImmediate === "undefined") {
    // compatible with browsers
    var setImmediate = (cb) => setTimeout(cb, 0);
}
useThrottle$1.default = useThrottle;
/**
 * Uses throttle strategy on the given resource and returns a throttle function,
 * if a subsequent call happens within the `interval` time, the previous result
 * will be returned and the current `handle` function will not be invoked.
 *
 * If `backgroundUpdate` is set, when reaching the `interval` time, the `handle`
 * function will be called in background and updates the result the when it's
 * done, the current call and any calls before the update will return the
 * previous result instead.
 *
 * NOTE: this function only creates the throttle function once and uses
 * `interval` only once, any later calls on the same `resource` will return the
 * initial throttle function.
 *
 * @deprecated this implementation is too complicated and redundant, use
 *  `jsext.throttle` from `@ayonli/jsext` instead.
 */
function useThrottle(resource, interval, backgroundUpdate = false) {
    if (interval < 1) {
        throw new RangeError("The 'interval' time for throttle must not be smaller than 1");
    }
    else if (!useThrottle.gcTimer) {
        let { gcInterval, tasks: jobs } = useThrottle;
        useThrottle.gcTimer = setInterval(() => {
            let now = Date.now();
            jobs.forEach(({ interval, lastActive }, key) => {
                if (now - lastActive > Math.max(interval + 5, gcInterval)) {
                    jobs.delete(key);
                }
            });
        }, gcInterval);
        if (typeof useThrottle.gcTimer.unref === "function") {
            useThrottle.gcTimer.unref();
        }
    }
    let task = useThrottle.tasks.get(resource);
    if (!task) {
        useThrottle.tasks.set(resource, task = createThrottleTask(interval, backgroundUpdate));
    }
    return task.func;
}
(function (useThrottle) {
    useThrottle.gcInterval = 30000;
    useThrottle.gcTimer = void 0;
    useThrottle.tasks = new Map();
})(useThrottle || (useThrottle = {}));
function createThrottleTask(interval, backgroundUpdate = false) {
    let task = {
        interval,
        lastActive: 0,
        cache: void 0,
        queue: new Set(),
        func: void 0,
        daemon: null,
    };
    function throttle(handle, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (backgroundUpdate && !this.daemon) {
                this.daemon = setInterval(() => { var _a; return (_a = this.func) === null || _a === void 0 ? void 0 : _a.call(this, handle, ...args); }, interval);
                if (typeof this.daemon.unref === "function") {
                    this.daemon.unref();
                }
            }
            let now = Date.now();
            if ((now - this.lastActive) >= interval) {
                this.lastActive = now;
                if (backgroundUpdate && this.cache) {
                    Promise.resolve(handle(...args)).then(result => {
                        this.cache = { value: result, error: null };
                    }).catch(err => {
                        this.cache = { value: void 0, error: err };
                    });
                    if (this.cache.error)
                        throw this.cache.error;
                    else
                        return this.cache.value;
                }
                else {
                    // Clear cache before dispatching the new job.
                    this.cache = void 0;
                    let result;
                    let error;
                    try {
                        result = yield handle(...args);
                        this.cache = { value: result, error: null };
                    }
                    catch (err) {
                        this.cache = { value: void 0, error: error = err };
                    }
                    // Resolve or reject subsequent jobs once the result is ready,
                    // and make the procedure asynchronous so that they will be
                    // performed after the current job.
                    setImmediate(() => {
                        if (!(0, isEmpty_1.default)(this.queue)) {
                            this.queue.forEach((job) => {
                                error ? job.reject(error) : job.resolve(result);
                                this.queue.delete(job);
                            });
                        }
                    });
                    if (error)
                        throw error;
                    else
                        return result;
                }
            }
            else if (this.cache) {
                if (this.cache.error)
                    throw this.cache.error;
                else
                    return this.cache.value;
            }
            else {
                return new Promise((resolve, reject) => {
                    this.queue.add({ resolve, reject });
                });
            }
        });
    }
    task.func = throttle.bind(task);
    return task;
}var wrap$1 = {};var jsext$1 = {};var checkIterable = {};Object.defineProperty(checkIterable, "__esModule", {
  value: true
});
checkIterable.isIterable = isIterable;
checkIterable.isAsyncIterable = isAsyncIterable;
checkIterable.isIteratorLike = isIteratorLike;
checkIterable.isIterableIterator = isIterableIterator;
checkIterable.isAsyncIterableIterator = isAsyncIterableIterator;
checkIterable.isGenerator = isGenerator;
checkIterable.isAsyncGenerator = isAsyncGenerator;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
if (!Symbol.asyncIterator) {
  Symbol.asyncIterator = Symbol("Symbol.asyncIterator");
}

/**
 * Checks if the given object is an Iterable (implemented `@@iterator`).
 * @returns {obj is Iterable<any>}
 */
function isIterable(obj) {
  return obj !== null && obj !== undefined && typeof obj[Symbol.iterator] === "function";
}

/**
 * Checks if the given object is an AsyncIterable (implemented `@@asyncIterator`).
 * @returns {obj is AsyncIterable<any>}
 */
function isAsyncIterable(obj) {
  return obj !== null && obj !== undefined && typeof obj[Symbol.asyncIterator] === "function";
}

/**
 * Checks if the given object is an IteratorLike (implemented `next`).
 * @returns {obj is { next: Function }}
 */
function isIteratorLike(obj) {
  // An iterable object has a 'next' method, however including a 'next' method
  // doesn't ensure the object is an iterator, it is only iterator-like.
  return _typeof(obj) === "object" && obj !== null && typeof obj.next === "function";
}

/**
 * Checks if the given object is an IterableIterator (implemented both
 * `@@iterator` and `next`).
 */
function isIterableIterator(obj) {
  return isIteratorLike(obj) && typeof obj[Symbol.iterator] === "function";
}

/**
 * Checks if the given object is an AsyncIterableIterator (implemented
 * both `@@asyncIterator` and `next`).
 * @returns {obj is AsyncIterableIterator<any>}
 */
function isAsyncIterableIterator(obj) {
  return isIteratorLike(obj) && typeof obj[Symbol.asyncIterator] === "function";
}

/**
 * Checks if the given object is a Generator.
 * @returns {obj is Generator}
 */
function isGenerator(obj) {
  return isIterableIterator(obj) && hasGeneratorSpecials(obj);
}

/**
 * Checks if the given object is an AsyncGenerator.
 * @returns {obj is AsyncGenerator}
 */
function isAsyncGenerator(obj) {
  return isAsyncIterableIterator(obj) && hasGeneratorSpecials(obj);
}
function hasGeneratorSpecials(obj) {
  return typeof obj["return"] === "function" && typeof obj["throw"] === "function";
}var _a;
Object.defineProperty(jsext$1, "__esModule", { value: true });
const check_iterable_1 = checkIterable;
const number_1 = number;
const isNode = typeof process === "object" && !!((_a = process.versions) === null || _a === void 0 ? void 0 : _a.node);
const throttleCaches = new Map();
/**
 * The maximum number of workers is set to 4 times of the CPU core numbers.
 *
 * The primary purpose of the workers is not mean to run tasks in parallel, but run them in separate
 * from the main thread, so that aborting tasks can be achieved by terminating the worker thread and
 * it will not affect the main thread.
 *
 * That said, the worker thread can still be used to achieve parallelism, but it should be noticed
 * that only the numbers of tasks that equals to the CPU core numbers will be run at the same time.
 */
const maxWorkerNum = (() => {
    if (isNode) {
        return require("os").cpus().length * 4;
    }
    else {
        return 16;
    }
})();
const workerIdCounter = (0, number_1.sequence)(1, Number.MAX_SAFE_INTEGER, 1, true);
let workerPool = [];
// The worker consumer queue is nothing but a callback list, once a worker is available, the runner
// pop a consumer and run the callback, which will retry gaining the worker and retry the task.
const workerConsumerQueue = [];
/**
 * Merges properties and methods only if they're missing in the class.
 */
function mergeIfNotExists(proto, source, mergeSuper = false) {
    let props = Reflect.ownKeys(source);
    for (let prop of props) {
        if (prop == "constructor") {
            continue;
        }
        else if (mergeSuper) {
            // When merging properties from super classes, the properties in the
            // base class has the first priority and shall not be overwrite.
            if (!(prop in proto)) {
                setProp(proto, source, prop);
            }
        }
        else if (!proto.hasOwnProperty(prop)) {
            setProp(proto, source, prop);
        }
    }
    return proto;
}
/**
 * Merges properties and methods across the prototype chain.
 */
function mergeHierarchy(ctor, mixin, mergeSuper = false) {
    mergeIfNotExists(ctor.prototype, mixin.prototype, mergeSuper);
    let _super = Object.getPrototypeOf(mixin);
    // Every user defined class or functions that can be instantiated have their
    // own names, if no name appears, that means the function has traveled to 
    // the root of the hierarchical tree.
    if (_super.name) {
        mergeHierarchy(ctor, _super, true);
    }
}
/**
 * Sets property for prototype based on the given source and prop name properly.
 */
function setProp(proto, source, prop) {
    let desc = Object.getOwnPropertyDescriptor(source, prop);
    if (desc) {
        Object.defineProperty(proto, prop, desc);
    }
    else {
        proto[prop] = source[prop];
    }
}
const jsext = {
    try(fn, ...args) {
        if (typeof fn === "function") {
            try {
                return jsext.try(fn.apply(void 0, args));
            }
            catch (err) {
                return [err, undefined];
            }
        }
        let returns = fn;
        // Implementation details should be ordered from complex to simple.
        if ((0, check_iterable_1.isAsyncGenerator)(returns)) {
            return (async function* () {
                let input;
                let result;
                // Use `while` loop instead of `for...of...` in order to
                // retrieve the return value of a generator function.
                while (true) {
                    try {
                        let { done, value } = await returns.next(input);
                        if (done) {
                            result = value;
                            break;
                        }
                        else {
                            // Receive any potential input value that passed
                            // to the outer `next()` call, and pass them to
                            // `res.next()` in the next call.
                            input = yield Promise.resolve([null, value]);
                        }
                    }
                    catch (err) {
                        // If any error occurs, yield that error as resolved
                        // and break the loop immediately, indicating the
                        // process is forced broken.
                        yield Promise.resolve([err, undefined]);
                        break;
                    }
                }
                return Promise.resolve([null, result]);
            })();
        }
        else if ((0, check_iterable_1.isGenerator)(returns)) {
            return (function* () {
                let input;
                let result;
                while (true) {
                    try {
                        let { done, value } = returns.next(input);
                        if (done) {
                            result = value;
                            break;
                        }
                        else {
                            input = yield [null, value];
                        }
                    }
                    catch (err) {
                        yield [err, undefined];
                        break;
                    }
                }
                return [null, result];
            })();
        }
        else if (typeof (returns === null || returns === void 0 ? void 0 : returns.then) === "function") {
            returns = returns.then((value) => [null, value]);
            return Promise.resolve(returns).catch((err) => [err, undefined]);
        }
        else {
            return [null, returns];
        }
    },
    func(fn) {
        return function (...args) {
            var _a;
            const callbacks = [];
            const defer = (cb) => void callbacks.push(cb);
            let result;
            try {
                const returns = fn.call(this, defer, ...args);
                if ((0, check_iterable_1.isAsyncGenerator)(returns)) {
                    const gen = (async function* () {
                        var _a;
                        let input;
                        // Use `while` loop instead of `for...of...` in order to
                        // retrieve the return value of a generator function.
                        while (true) {
                            try {
                                let { done, value } = await returns.next(input);
                                if (done) {
                                    result = { value, error: null };
                                    break;
                                }
                                else {
                                    // Receive any potential input value that passed
                                    // to the outer `next()` call, and pass them to
                                    // `res.next()` in the next call.
                                    input = yield Promise.resolve(value);
                                }
                            }
                            catch (error) {
                                // If any error occurs, capture that error and break
                                // the loop immediately, indicating the process is
                                // forced broken.
                                result = { value: void 0, error };
                                break;
                            }
                        }
                        for (let i = callbacks.length - 1; i >= 0; i--) {
                            await ((_a = callbacks[i]) === null || _a === void 0 ? void 0 : _a.call(callbacks));
                        }
                        if (result.error) {
                            throw result.error;
                        }
                        else {
                            return Promise.resolve(result.value);
                        }
                    })();
                    return gen;
                }
                else if ((0, check_iterable_1.isGenerator)(returns)) {
                    const gen = (function* () {
                        var _a;
                        let input;
                        while (true) {
                            try {
                                let { done, value } = returns.next(input);
                                if (done) {
                                    result = { value, error: null };
                                    break;
                                }
                                else {
                                    input = yield value;
                                }
                            }
                            catch (error) {
                                result = { value: void 0, error };
                                break;
                            }
                        }
                        for (let i = callbacks.length - 1; i >= 0; i--) {
                            (_a = callbacks[i]) === null || _a === void 0 ? void 0 : _a.call(callbacks);
                        }
                        if (result.error) {
                            throw result.error;
                        }
                        else {
                            return result.value;
                        }
                    })();
                    return gen;
                }
                else if (typeof (returns === null || returns === void 0 ? void 0 : returns.then) === "function") {
                    return Promise.resolve(returns).then(value => ({
                        value,
                        error: null,
                    })).catch((error) => ({
                        value: void 0,
                        error,
                    })).then(async (result) => {
                        var _a;
                        for (let i = callbacks.length - 1; i >= 0; i--) {
                            await ((_a = callbacks[i]) === null || _a === void 0 ? void 0 : _a.call(callbacks));
                        }
                        if (result.error) {
                            throw result.error;
                        }
                        else {
                            return result.value;
                        }
                    });
                }
                else {
                    result = { value: returns, error: null };
                }
            }
            catch (error) {
                result = { value: void 0, error };
            }
            for (let i = callbacks.length - 1; i >= 0; i--) {
                (_a = callbacks[i]) === null || _a === void 0 ? void 0 : _a.call(callbacks);
            }
            if (result.error) {
                throw result.error;
            }
            else {
                return result.value;
            }
        };
    },
    wrap(fn, wrapper) {
        const wrapped = function (...args) {
            return wrapper.call(this, fn, ...args);
        };
        Object.defineProperty(wrapped, "name", Object.getOwnPropertyDescriptor(fn, "name"));
        Object.defineProperty(wrapped, "length", Object.getOwnPropertyDescriptor(fn, "length"));
        Object.defineProperty(wrapped, "toString", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: fn.toString.bind(fn),
        });
        return wrapped;
    },
    throttle(handler, options) {
        const key = typeof options === "number" ? null : options.for;
        const duration = typeof options === "number" ? options : options.duration;
        const handleCall = function (cache, ...args) {
            var _a;
            if (cache.result && Date.now() < ((_a = cache.expires) !== null && _a !== void 0 ? _a : 0)) {
                if (cache.result.error) {
                    throw cache.result.error;
                }
                else {
                    return cache.result.value;
                }
            }
            try {
                const returns = handler.call(this, ...args);
                cache.result = { value: returns };
                cache.expires = Date.now() + duration;
                return returns;
            }
            catch (error) {
                cache.result = { error };
                cache.expires = Date.now() + duration;
                throw error;
            }
        };
        if (!key) {
            const cache = { for: null };
            return function (...args) {
                return handleCall.call(this, cache, ...args);
            };
        }
        else {
            let cache = throttleCaches.get(key);
            if (!cache) {
                cache = { for: key };
                throttleCaches.set(key, cache);
            }
            return function (...args) {
                return handleCall.call(this, cache, ...args);
            };
        }
    },
    mixins(base, ...mixins) {
        const obj = { ctor: null };
        obj.ctor = class extends base {
        }; // make sure this class has no name
        for (let mixin of mixins) {
            if (typeof mixin == "function") {
                mergeHierarchy(obj.ctor, mixin);
            }
            else if (mixin && typeof mixin == "object") {
                mergeIfNotExists(obj.ctor.prototype, mixin);
            }
            else {
                throw new TypeError("mixin must be a constructor or an object");
            }
        }
        return obj.ctor;
    },
    read(source, eventMap = undefined) {
        var _a;
        if (typeof source[Symbol.asyncIterator] === "function") {
            return source;
        }
        const iterable = {
            ended: false,
            error: null,
            queue: [],
            consumers: [],
            next() {
                return new Promise((resolve, reject) => {
                    if (this.error && !this.ended) {
                        // If there is error occurred during the last transmission and the iterator
                        // hasn't been closed, reject that error and stop the iterator immediately.
                        reject(this.error);
                        this.ended = true;
                    }
                    else if (this.ended && !this.queue.length) {
                        // If the iterator has is closed, resolve the pending consumer with void
                        // value.
                        resolve({ value: void 0, done: true });
                    }
                    else if (this.queue.length > 0) {
                        // If there are data in the queue, resolve the the first piece immediately.
                        resolve({ value: this.queue.shift(), done: false });
                    }
                    else {
                        // If there are no queued data, push the consumer to a waiting queue.
                        this.consumers.push({ resolve, reject });
                    }
                });
            }
        };
        const handleMessage = (data) => {
            var _a;
            if (iterable.consumers.length > 0) {
                (_a = iterable.consumers.shift()) === null || _a === void 0 ? void 0 : _a.resolve({ value: data, done: false });
            }
            else {
                iterable.queue.push(data);
            }
        };
        const handleClose = () => {
            iterable.ended = true;
            let consumer;
            while (consumer = iterable.consumers.shift()) {
                consumer.resolve({ value: undefined, done: true });
            }
        };
        const handleError = (err) => {
            iterable.error = err;
            if (iterable.consumers.length > 0) {
                iterable.consumers.forEach(item => {
                    item.reject(err);
                });
                iterable.consumers = [];
            }
        };
        const handleBrowserErrorEvent = (ev) => {
            let err;
            if (ev instanceof ErrorEvent) {
                err = ev.error || new Error(ev.message);
            }
            else {
                // @ts-ignore
                err = new Error("something went wrong", { cause: ev });
            }
            handleError(err);
        };
        const proto = Object.getPrototypeOf(source);
        const msgDesc = Object.getOwnPropertyDescriptor(proto, "onmessage");
        if ((msgDesc === null || msgDesc === void 0 ? void 0 : msgDesc.set) && typeof source.close === "function") { // WebSocket or EventSource
            const errDesc = Object.getOwnPropertyDescriptor(proto, "onerror");
            const closeDesc = Object.getOwnPropertyDescriptor(proto, "onclose");
            let cleanup;
            if ((eventMap === null || eventMap === void 0 ? void 0 : eventMap.event) &&
                (eventMap === null || eventMap === void 0 ? void 0 : eventMap.event) !== "message" &&
                typeof source["addEventListener"] === "function") { // for EventSource listening on custom events
                const es = source;
                const eventName = eventMap.event;
                const msgListener = (ev) => {
                    handleMessage(ev.data);
                };
                es.addEventListener(eventName, msgListener);
                cleanup = () => {
                    es.removeEventListener(eventName, msgListener);
                };
            }
            else {
                msgDesc.set.call(source, (ev) => {
                    handleMessage(ev.data);
                });
                cleanup = () => {
                    var _a;
                    (_a = msgDesc.set) === null || _a === void 0 ? void 0 : _a.call(source, null);
                };
            }
            (_a = errDesc === null || errDesc === void 0 ? void 0 : errDesc.set) === null || _a === void 0 ? void 0 : _a.call(source, handleBrowserErrorEvent);
            if (closeDesc === null || closeDesc === void 0 ? void 0 : closeDesc.set) { // WebSocket
                closeDesc.set.call(source, () => {
                    var _a, _b;
                    handleClose();
                    (_a = closeDesc.set) === null || _a === void 0 ? void 0 : _a.call(source, null);
                    (_b = errDesc === null || errDesc === void 0 ? void 0 : errDesc.set) === null || _b === void 0 ? void 0 : _b.call(source, null);
                    cleanup === null || cleanup === void 0 ? void 0 : cleanup();
                });
            }
            else if (!(closeDesc === null || closeDesc === void 0 ? void 0 : closeDesc.set) && typeof source.close === "function") { // EventSource
                // EventSource by default does not trigger close event, we need to make sure when
                // it calls the close() function, the iterator is automatically closed.
                const es = source;
                const _close = es.close;
                es.close = function close() {
                    var _a;
                    _close.call(es);
                    handleClose();
                    es.close = _close;
                    (_a = errDesc === null || errDesc === void 0 ? void 0 : errDesc.set) === null || _a === void 0 ? void 0 : _a.call(source, null);
                    cleanup === null || cleanup === void 0 ? void 0 : cleanup();
                };
            }
        }
        else if (typeof source.send === "function" && typeof source.close === "function") {
            // non-standard WebSocket implementation
            const ws = source;
            ws.onmessage = (ev) => {
                handleMessage(ev.data);
            };
            ws.onerror = handleBrowserErrorEvent;
            ws.onclose = () => {
                handleClose();
                ws.onclose = null;
                ws.onerror = null;
                ws.onmessage = null;
            };
        }
        else if (typeof source["addEventListener"] === "function") { // EventTarget
            const target = source;
            const msgEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.message) || "message";
            const errEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.error) || "error";
            const closeEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.close) || "close";
            const msgListener = (ev) => {
                if (ev instanceof MessageEvent) {
                    handleMessage(ev.data);
                }
            };
            target.addEventListener(msgEvent, msgListener);
            target.addEventListener(errEvent, handleBrowserErrorEvent);
            target.addEventListener(closeEvent, function closeListener() {
                handleClose();
                target.removeEventListener(closeEvent, closeListener);
                target.removeEventListener(msgEvent, msgListener);
                target.removeEventListener(errEvent, handleBrowserErrorEvent);
            });
        }
        else if (typeof source["on"] === "function") { // EventEmitter
            const target = source;
            const dataEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.data) || "data";
            const errEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.error) || "error";
            const endEvent = (eventMap === null || eventMap === void 0 ? void 0 : eventMap.close) || "close";
            target.on(dataEvent, handleMessage);
            target.once(errEvent, handleError);
            target.once(endEvent, () => {
                handleClose();
                target.off(dataEvent, handleMessage);
                target.off(dataEvent, handleError);
            });
        }
        else {
            throw new TypeError("the input source cannot be read as an AsyncIterable object");
        }
        return {
            [Symbol.asyncIterator]() {
                return iterable;
            }
        };
    },
    async run(script, args = undefined, options = undefined) {
        var _a;
        const msg = {
            type: "ffi",
            script,
            baseUrl: "",
            fn: (options === null || options === void 0 ? void 0 : options.fn) || "default",
            args: args !== null && args !== void 0 ? args : [],
        };
        if (typeof Deno === "object") {
            msg.baseUrl = "file://" + Deno.cwd() + "/";
        }
        else if (isNode) {
            msg.baseUrl = "file://" + process.cwd() + "/";
        }
        else if (typeof location === "object") {
            msg.baseUrl = location.href;
        }
        // `buffer` is used to store data pieces yielded by generator functions before they are
        // consumed. `error` and `result` serves similar purposes for function results.
        const buffer = [];
        let error = null;
        let result;
        let resolver;
        let iterator;
        let workerId;
        let poolRecord;
        let release;
        let terminate = () => Promise.resolve(void 0);
        let timeout = (options === null || options === void 0 ? void 0 : options.timeout) ? setTimeout(() => {
            const err = new Error(`operation timeout after ${options.timeout}ms`);
            if (resolver) {
                resolver.reject(err);
            }
            else {
                error = err;
            }
            terminate();
        }, options.timeout) : null;
        const handleMessage = (msg) => {
            var _a;
            if (msg && typeof msg === "object" && typeof msg.type === "string") {
                if (msg.type === "error") {
                    return handleError(msg.error);
                }
                else if (msg.type === "return") {
                    if (options === null || options === void 0 ? void 0 : options.keepAlive) {
                        // Release before resolve.
                        release === null || release === void 0 ? void 0 : release();
                        if (workerConsumerQueue.length) {
                            // Queued consumer now has chance to gain the worker.
                            (_a = workerConsumerQueue.shift()) === null || _a === void 0 ? void 0 : _a();
                        }
                    }
                    else {
                        terminate();
                    }
                    if (resolver) {
                        resolver.resolve(msg.value);
                    }
                    else {
                        result = { value: msg.value };
                    }
                }
                else if (msg.type === "yield") {
                    if (msg.done) {
                        // The final message of yield event is the return value.
                        handleMessage({ type: "return", value: msg.value });
                    }
                    else {
                        if (iterator) {
                            iterator.emit("data", msg.value);
                        }
                        else {
                            buffer.push(msg.value);
                        }
                    }
                }
            }
        };
        const handleError = (err) => {
            if (resolver) {
                resolver.reject(err);
            }
            else if (iterator) {
                iterator.emit("error", err);
            }
            else {
                error = err;
            }
        };
        const handleExit = () => {
            var _a;
            if (poolRecord) {
                // Clean the pool before resolve.
                workerPool = workerPool.filter(record => record !== poolRecord);
                if (workerConsumerQueue.length) {
                    // Queued consumer now has chance to create new worker.
                    (_a = workerConsumerQueue.shift()) === null || _a === void 0 ? void 0 : _a();
                }
            }
            if (resolver) {
                resolver.resolve(void 0);
            }
            else if (iterator) {
                iterator.emit("close");
            }
            else if (!error && !result) {
                result = { value: void 0 };
            }
        };
        if (isNode) {
            const path = await Promise.resolve().then(() => require("path"));
            const util = await Promise.resolve().then(() => require("util"));
            const fs = await Promise.resolve().then(() => require("fs"));
            const stat = util.promisify(fs.stat);
            let _filename;
            let _dirname;
            let entry;
            if (typeof __filename === "string") {
                _filename = __filename;
                _dirname = __dirname;
            }
            else {
                // Using the ES module in Node.js is very unlikely, so we just check the module
                // filename in a simple manner, and report error if not found.
                let [err] = await jsext.try(stat("package.json"));
                if (err) {
                    throw new Error("the current working directory is not a Node.js module");
                }
                _filename = process.cwd() + "/node_modules/@ayonli/jsext/esm/index.mjs";
                [err] = await jsext.try(stat(_filename));
                if (err) {
                    // Assuming this is @ayonli/jsext itself.
                    _filename = process.cwd() + "/esm/index.mjs";
                    [err] = await jsext.try(stat(_filename));
                    if (err) {
                        throw new Error("can not locate the worker entry");
                    }
                }
                _dirname = path.dirname(_filename);
            }
            if (_filename.endsWith(".js")) { // compiled
                entry = path.join(_dirname, "esm", "worker.mjs");
            }
            else {
                entry = path.join(path.dirname(_dirname), "esm", "worker.mjs");
            }
            if ((options === null || options === void 0 ? void 0 : options.adapter) === "child_process") {
                let worker;
                let ok = true;
                poolRecord = workerPool.find(item => {
                    return item.adapter === "child_process" && !item.busy;
                });
                if (poolRecord) {
                    worker = poolRecord.worker;
                    workerId = poolRecord.workerId;
                    poolRecord.busy = true;
                }
                else if (workerPool.length < maxWorkerNum) {
                    const { fork } = await Promise.resolve().then(() => require("child_process"));
                    const isPrior14 = parseInt(process.version.slice(1)) < 14;
                    worker = fork(entry, {
                        stdio: "inherit",
                        serialization: isPrior14 ? "advanced" : "json",
                    });
                    workerId = worker.pid;
                    ok = await new Promise((resolve) => {
                        worker.once("exit", () => {
                            if (error) {
                                // The child process took too long to start and cause timeout error.
                                resolve(false);
                            }
                        });
                        worker.once("message", () => {
                            worker.removeAllListeners("exit");
                            resolve(true);
                        });
                    });
                    // Fill the worker pool regardless the current call should keep-alive or not,
                    // this will make sure that the total number of workers will not exceed the
                    // maxWorkerNum. If the the call doesn't keep-alive the worker, it will be
                    // cleaned after the call.
                    ok && workerPool.push(poolRecord = {
                        workerId,
                        worker,
                        adapter: "child_process",
                        busy: true,
                    });
                }
                else {
                    // Put the current call in the consumer queue if there are no workers available,
                    // once an existing call finishes, the queue will pop the its head consumer and
                    // retry.
                    return new Promise((resolve) => {
                        workerConsumerQueue.push(resolve);
                    }).then(() => jsext.run(script, args, options));
                }
                release = () => {
                    // Remove the event listener so that later calls will not mess up.
                    worker.off("message", handleMessage);
                    poolRecord && (poolRecord.busy = false);
                };
                terminate = () => Promise.resolve(void worker.kill(1));
                if (ok) {
                    worker.send(msg);
                    worker.on("message", handleMessage);
                    worker.once("error", handleError);
                    worker.once("exit", handleExit);
                }
            }
            else {
                let worker;
                let ok = true;
                poolRecord = workerPool.find(item => {
                    return item.adapter === "worker_threads" && !item.busy;
                });
                if (poolRecord) {
                    worker = poolRecord.worker;
                    workerId = poolRecord.workerId;
                    poolRecord.busy = true;
                }
                else if (workerPool.length < maxWorkerNum) {
                    const { Worker } = await Promise.resolve().then(() => require("worker_threads"));
                    worker = new Worker(entry);
                    workerId = worker.threadId;
                    ok = await new Promise((resolve) => {
                        worker.once("exit", () => {
                            if (error) {
                                // The child process took too long to start and cause timeout error.
                                resolve(false);
                            }
                        });
                        worker.once("online", () => {
                            worker.removeAllListeners("exit");
                            resolve(true);
                        });
                    });
                    ok && workerPool.push(poolRecord = {
                        workerId,
                        worker,
                        adapter: "worker_threads",
                        busy: true,
                    });
                }
                else {
                    return new Promise((resolve) => {
                        workerConsumerQueue.push(resolve);
                    }).then(() => jsext.run(script, args, options));
                }
                release = () => {
                    worker.off("message", handleMessage);
                    poolRecord && (poolRecord.busy = false);
                };
                terminate = async () => void (await worker.terminate());
                if (ok) {
                    worker.postMessage(msg);
                    worker.on("message", handleMessage);
                    worker.once("error", handleError);
                    worker.once("messageerror", handleError);
                    worker.once("exit", handleExit);
                }
            }
        }
        else {
            let worker;
            poolRecord = workerPool.find(item => {
                return item.adapter === "worker_threads" && !item.busy;
            });
            if (poolRecord) {
                worker = poolRecord.worker;
                workerId = poolRecord.workerId;
                poolRecord.busy = true;
            }
            else if (workerPool.length < maxWorkerNum) {
                const _url = (options === null || options === void 0 ? void 0 : options.webWorkerEntry)
                    || "https://raw.githubusercontent.com/ayonli/jsext/main/esm/worker-web.mjs";
                let url;
                if (typeof Deno === "object") {
                    // Deno can load the module regardless of MINE type.
                    url = new URL(_url, msg.baseUrl).href;
                }
                else {
                    const res = await fetch(_url);
                    let blob;
                    if ((_a = res.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.startsWith("application/javascript")) {
                        blob = await res.blob();
                    }
                    else {
                        const buf = await res.arrayBuffer();
                        blob = new Blob([new Uint8Array(buf)], {
                            type: "application/javascript",
                        });
                    }
                    url = URL.createObjectURL(blob);
                }
                worker = new Worker(url, { type: "module" });
                workerId = workerIdCounter.next().value;
                workerPool.push(poolRecord = {
                    workerId,
                    worker,
                    adapter: "worker_threads",
                    busy: true,
                });
            }
            else {
                return new Promise((resolve) => {
                    workerConsumerQueue.push(resolve);
                }).then(() => jsext.run(script, args, options));
            }
            release = () => {
                worker.onmessage = null;
                poolRecord && (poolRecord.busy = false);
            };
            terminate = async () => {
                await Promise.resolve(worker.terminate());
                handleExit();
            };
            worker.postMessage(msg);
            worker.onmessage = (ev) => handleMessage(ev.data);
            worker.onerror = (ev) => handleMessage(ev.error || new Error(ev.message));
            worker.onmessageerror = () => {
                handleError(new Error("unable to deserialize the message"));
            };
        }
        return {
            workerId,
            async abort() {
                timeout && clearTimeout(timeout);
                await terminate();
            },
            async result() {
                return await new Promise((resolve, reject) => {
                    if (error) {
                        reject(error);
                    }
                    else if (result) {
                        resolve(result.value);
                    }
                    else {
                        resolver = { resolve, reject };
                    }
                });
            },
            async *iterate() {
                if (resolver) {
                    throw new Error("result() has been called");
                }
                else if (result) {
                    throw new TypeError("the response is not iterable");
                }
                const { EventEmitter } = await Promise.resolve().then(() => require("events"));
                iterator = new EventEmitter();
                if (buffer.length) {
                    (async () => {
                        await Promise.resolve(null);
                        let msg;
                        while (msg = buffer.shift()) {
                            iterator.emit("data", msg);
                        }
                    })().catch(console.error);
                }
                for await (const msg of jsext.read(iterator)) {
                    yield msg;
                }
            },
        };
    }
};
jsext$1.default = jsext;Object.defineProperty(wrap$1, "__esModule", { value: true });
const jsext_1 = jsext$1;
/** @deprecated use `jsext.wrap` from `@ayonli/jsext` instead. */
const wrap = jsext_1.default.wrap;
wrap$1.default = wrap;(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.wrap = exports.useThrottle = exports.until = exports.typeOf = exports.typeAs = exports.trim = exports.timestamp = exports.split = exports.sort = exports.sleep = exports.randStr = exports.rand = exports.pick = exports.patch = exports.omitVoid = exports.omit = exports.keysOf = exports.isVoid = exports.isSubClassOf = exports.isOwnMethod = exports.isOwnKey = exports.isNumeric = exports.isInteger = exports.isFloat = exports.isEmpty = exports.isBetween = exports.getGlobal = exports.flatObject = exports.ensureType = exports.diff = exports.define = exports.count = void 0;

	var count_1 = count$1;
	Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.default; } });
	var define_1 = define$1;
	Object.defineProperty(exports, "define", { enumerable: true, get: function () { return define_1.default; } });
	var diff_1 = diff$1;
	Object.defineProperty(exports, "diff", { enumerable: true, get: function () { return diff_1.default; } });
	var ensureType_1 = ensureType$1;
	Object.defineProperty(exports, "ensureType", { enumerable: true, get: function () { return ensureType_1.default; } });
	var flatObject_1 = flatObject$1;
	Object.defineProperty(exports, "flatObject", { enumerable: true, get: function () { return flatObject_1.default; } });
	var getGlobal_1 = getGlobal$1;
	Object.defineProperty(exports, "getGlobal", { enumerable: true, get: function () { return getGlobal_1.default; } });
	var isBetween_1 = isBetween$1;
	Object.defineProperty(exports, "isBetween", { enumerable: true, get: function () { return isBetween_1.default; } });
	var isEmpty_1 = isEmpty$1;
	Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.default; } });
	var isFloat_1 = isFloat$2;
	Object.defineProperty(exports, "isFloat", { enumerable: true, get: function () { return isFloat_1.default; } });
	var isInteger_1 = isInteger$1;
	Object.defineProperty(exports, "isInteger", { enumerable: true, get: function () { return isInteger_1.default; } });
	var isNumeric_1 = isNumeric$1;
	Object.defineProperty(exports, "isNumeric", { enumerable: true, get: function () { return isNumeric_1.default; } });
	var isOwnKey_1 = isOwnKey$1;
	Object.defineProperty(exports, "isOwnKey", { enumerable: true, get: function () { return isOwnKey_1.default; } });
	var isOwnMethod_1 = isOwnMethod$1;
	Object.defineProperty(exports, "isOwnMethod", { enumerable: true, get: function () { return isOwnMethod_1.default; } });
	var isSubClassOf_1 = isSubClassOf$1;
	Object.defineProperty(exports, "isSubClassOf", { enumerable: true, get: function () { return isSubClassOf_1.default; } });
	var isVoid_1 = isVoid$1;
	Object.defineProperty(exports, "isVoid", { enumerable: true, get: function () { return isVoid_1.default; } });
	var keysOf_1 = keysOf$1;
	Object.defineProperty(exports, "keysOf", { enumerable: true, get: function () { return keysOf_1.default; } });
	var omit_1 = omit$1;
	Object.defineProperty(exports, "omit", { enumerable: true, get: function () { return omit_1.default; } });
	var omitVoid_1 = omitVoid$1;
	Object.defineProperty(exports, "omitVoid", { enumerable: true, get: function () { return omitVoid_1.default; } });
	var patch_1 = patch$1;
	Object.defineProperty(exports, "patch", { enumerable: true, get: function () { return patch_1.default; } });
	var pick_1 = pick$1;
	Object.defineProperty(exports, "pick", { enumerable: true, get: function () { return pick_1.default; } });
	var rand_1 = rand$1;
	Object.defineProperty(exports, "rand", { enumerable: true, get: function () { return rand_1.default; } });
	var randStr_1 = randStr$1;
	Object.defineProperty(exports, "randStr", { enumerable: true, get: function () { return randStr_1.default; } });
	var sleep_1 = sleep$2;
	Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return sleep_1.default; } });
	var sort_1 = sort$1;
	Object.defineProperty(exports, "sort", { enumerable: true, get: function () { return sort_1.default; } });
	var split_1 = split$1;
	Object.defineProperty(exports, "split", { enumerable: true, get: function () { return split_1.default; } });
	var timestamp_1 = timestamp$1;
	Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.default; } });
	var trim_1 = trim$1;
	Object.defineProperty(exports, "trim", { enumerable: true, get: function () { return trim_1.default; } });
	var typeAs_1 = typeAs$1;
	Object.defineProperty(exports, "typeAs", { enumerable: true, get: function () { return typeAs_1.default; } });
	var typeOf_1 = typeOf$1;
	Object.defineProperty(exports, "typeOf", { enumerable: true, get: function () { return typeOf_1.default; } });
	var until_1 = until$1;
	Object.defineProperty(exports, "until", { enumerable: true, get: function () { return until_1.default; } });
	var useThrottle_1 = useThrottle$1;
	Object.defineProperty(exports, "useThrottle", { enumerable: true, get: function () { return useThrottle_1.default; } });
	var wrap_1 = wrap$1;
	Object.defineProperty(exports, "wrap", { enumerable: true, get: function () { return wrap_1.default; } });
	
} (utils));

var index = /*@__PURE__*/getDefaultExportFromCjs(utils);export{index as default};//# sourceMappingURL=index.js.map
