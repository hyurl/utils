var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

});

var isLike = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDictLike = isDictLike;
exports.isArrayLike = isArrayLike;
exports.isCollectionLike = isCollectionLike;
exports.isTypedArrayLike = isTypedArrayLike;
exports.isErrorLike = isErrorLike;
exports.isPromiseLike = isPromiseLike;
exports.isObjectIdLike = isObjectIdLike;
exports.isBufferLike = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * @returns {value is { [x: string]: any; }}
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

exports.isBufferLike = isBufferLike;

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
});

var utf8Length = function(s) {
  return ~-encodeURI(s).split(/%..|./).length
};

var count_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


const encoder = typeof TextEncoder === "function" ? new TextEncoder() : null;
exports.default = count;
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
                return utf8Length(target);
            }
        }
        else {
            return target.length;
        }
    }
    else if ((0, isLike.isArrayLike)(target, true)) {
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
    else if ((0, isLike.isBufferLike)(target)) {
        return target.byteLength;
    }
    else if ((0, isLike.isCollectionLike)(target, true)) {
        return target.size;
    }
    else {
        return Object.keys(target).length;
    }
}

});

var isVoid_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 */
function isVoid(value) {
    return value === null || value === undefined || Object.is(value, NaN);
}
exports.default = isVoid;

});

/**
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

var couldBeClass_2 = couldBeClass;
var _default = couldBeClass;

var couldBeClass_1 = {
	couldBeClass: couldBeClass_2,
	default: _default
};

var typeOf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
function typeOf(target) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if ((0, isVoid_1.default)(target))
        return "void";
    let type = typeof target;
    if (type === "function") {
        if ((0, couldBeClass_1.default)(target)) {
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
exports.default = typeOf;

});

var define_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

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
exports.default = define;
function isGetter(obj) {
    return String(Object.keys(obj)) === "get"
        && typeof obj["get"] === "function";
}
function isGetterAndSetter(obj) {
    let sign = String(Object.keys(obj));
    return (sign === "get,set" || sign === "set,get")
        && typeof obj["get"] === "function"
        && typeof obj["set"] === "function";
}

});

var isEmpty_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

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
exports.default = isEmpty;
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
        else if ((0, isLike.isBufferLike)(value)) {
            return value.byteLength === 0;
        }
        else if ((0, isLike.isArrayLike)(value, true)) {
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
        else if ((0, isLike.isCollectionLike)(value, true)) {
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
}

});

var diff_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function diff(origin, input, deep = false) {
    if (Array.isArray(origin) && Array.isArray(input)) {
        return [
            ...input.filter(value => !origin.includes(value)),
            ...origin.filter(value => !input.includes(value))
        ];
    }
    else if ((0, isLike.isDictLike)(origin) && (0, isLike.isDictLike)(input)) {
        let keys = Reflect.ownKeys(input);
        let _keys = Reflect.ownKeys(origin);
        let result = {};
        keys.forEach((key) => {
            if (origin[key] !== input[key] &&
                !((0, isVoid_1.default)(origin[key]) && (0, isVoid_1.default)(input[key])) // ignore void values
            ) {
                if (deep &&
                    typeof origin[key] === "object" && origin[key] !== null &&
                    typeof input[key] === "object" && input[key] !== null) {
                    let _result = diff(origin[key], input[key], deep);
                    if (!(0, isEmpty_1.default)(_result)) {
                        result[key] = _result;
                    }
                }
                else {
                    result[key] = input[key];
                }
            }
        });
        _keys.forEach((key) => {
            keys.includes(key) || (result[key] = origin[key]);
        });
        return result;
    }
    else {
        return input;
    }
}
exports.default = diff;

});

var isBetween_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if a number is between two numbers (gte than the minimal value and lte
 * than the maximum value).
 */
function isBetween(value, [min, max]) {
    return value >= min && value <= max;
}
exports.default = isBetween;

});

var keysOf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function keysOf(obj) {
    if (Array.isArray(obj)) {
        return Object.keys(obj).map(Number);
    }
    else {
        return Reflect.ownKeys(obj);
    }
}
exports.default = keysOf;

});

var ensureType_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureArray = void 0;



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
            else if ((0, isLike.isArrayLike)(target, true)) {
                return ensureArray(target).map(ensureType);
            }
            else if ((0, isLike.isDictLike)(target)) {
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
exports.default = ensureType;
function ensureArray(value) {
    return Array.isArray(value) ? value : Array.from(value);
}
exports.ensureArray = ensureArray;

});

var flatObject_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function flatObject(obj, depth = 1, flatArray = false) {
    return flatDeep({}, obj, void 0, 0, depth, flatArray);
}
exports.default = flatObject;
function flatDeep(carrier, source, field, depth, maxDepth, flatArray) {
    let isArr;
    let isDict;
    let isContent = !(0, isVoid_1.default)(field);
    if (depth === maxDepth || (!(isArr = (0, isLike.isArrayLike)(source, true) && !(0, isLike.isBufferLike)(source)) &&
        !(isDict = (0, isLike.isDictLike)(source)))) {
        carrier[field] = source;
    }
    else if (isDict) {
        (0, keysOf_1.default)(source).forEach((key) => {
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
}

});

var getGlobal_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = getGlobal;

});

var isFloat_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the value is a float number.
 */
function isFloat(value) {
    return typeof value === "number"
        && !isNaN(value)
        && (!Number.isFinite(value) || value % 1 !== 0);
}
exports.default = isFloat;

});

var isInteger_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the value is an integer number (or bigint).
 */
function isInteger(value) {
    let type = typeof value;
    return type === "bigint"
        || (type === "number" &&
            !isNaN(value) &&
            Number.isFinite(value) &&
            value % 1 === 0);
}
exports.default = isInteger;

});

var isNumeric_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the value is a number or numeric string.
 */
function isNumeric(value) {
    let type = typeof value;
    return (type === "number" || type === "bigint" || type === "string")
        && !isNaN(Number(value));
}
exports.default = isNumeric;

});

var isOwnKey_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Checks if a property name is one of the properties of the target object.
 */
function isOwnKey(obj, prop) {
    return !(0, isVoid_1.default)(obj) && Object.prototype.hasOwnProperty.call(obj, prop);
}
exports.default = isOwnKey;

});

var isOwnMethod_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if a property name is one of the own methods of the target object (,
 * this method is defined in the prototype of the object and is not inherited
 * from a super class).
 */
function isOwnMethod(obj, method) {
    let proto = Object.getPrototypeOf(obj);
    return proto !== null
        && Object.prototype.hasOwnProperty.call(proto, method)
        && typeof proto[method] === "function";
}
exports.default = isOwnMethod;

});

var isSubClassOf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** Checks if a class is a sub-class of (inherited from) the base class. */
function isSubClassOf(target, base) {
    return typeof target === "function"
        && typeof base === "function"
        && target.prototype instanceof base;
}
exports.default = isSubClassOf;

});

var omit_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function omit(obj, props) {
    if (Array.isArray(obj)) {
        return obj.filter(i => !props.includes(i));
    }
    else {
        let keys = Reflect.ownKeys(obj);
        let result = keys.reduce((result, prop) => {
            if (!props.includes(prop) && obj[prop] !== undefined) {
                result[prop] = obj[prop];
            }
            return result;
        }, {});
        // collect properties from the prototype chain
        for (let prop in Object.getPrototypeOf(obj)) {
            if (!props.includes(prop) && obj[prop] !== undefined) {
                result[prop] = obj[prop];
            }
        }
        // special treatment for Error types
        if (obj instanceof Error) {
            ["name", "message"].forEach(prop => {
                if (!props.includes(prop) &&
                    obj[prop] !== undefined &&
                    !(0, isOwnKey_1.default)(result, prop)) {
                    result[prop] = obj[prop];
                }
            });
        }
        return result;
    }
}
exports.default = omit;

});

var omitVoid_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.doOmit = void 0;




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
exports.default = omitVoid;
function doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, depth) {
    if (typeof target === "string") {
        return omitEmptyStrings && target.trim() === "" ? void 0 : target;
    }
    else if (target === null
        || typeof target !== "object"
        || target instanceof Date
        || target instanceof Error
        || target instanceof RegExp
        || (0, isLike.isBufferLike)(target)) {
        return target;
    }
    else if (omitEmptyObjects && (0, isEmpty_1.default)(target)) {
        return depth > 0 ? void 0 : ((0, isLike.isArrayLike)(target, true) ? [] : {});
    }
    if ((0, isLike.isArrayLike)(target, true)) {
        let arr = [];
        for (let i = 0, len = target.length; i < len; ++i) {
            let value = target[i];
            if (!(0, isVoid_1.default)(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    (0, isVoid_1.default)(value) || arr.push(value);
                }
                else {
                    arr.push(value);
                }
            }
        }
        if (depth > 0 && omitEmptyObjects && (0, isEmpty_1.default)(arr)) {
            return void 0;
        }
        else {
            return arr;
        }
    }
    else {
        let obj = (0, keysOf_1.default)(target).reduce((obj, key) => {
            let value = target[key];
            if (!(0, isVoid_1.default)(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    (0, isVoid_1.default)(value) || (obj[key] = value);
                }
                else {
                    obj[key] = value;
                }
            }
            return obj;
        }, {});
        if (depth > 0 && omitEmptyObjects && (0, isEmpty_1.default)(obj)) {
            return void 0;
        }
        else {
            return obj;
        }
    }
}
exports.doOmit = doOmit;

});

var patch_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



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
exports.default = patch;
function doPatch(origin, input, deep, ignoreEmptyStrings, isChildNode) {
    if ((0, isLike.isDictLike)(origin) && (0, isLike.isDictLike)(input)) {
        let keys = Reflect.ownKeys(input);
        let result = {};
        keys.forEach((key) => {
            if (origin[key] !== input[key] &&
                !(0, isVoid_1.default)(input[key]) && // ignore invalid values
                (!ignoreEmptyStrings || input[key] !== "")) {
                if (deep && (0, isLike.isDictLike)(origin[key]) && (0, isLike.isDictLike)(input[key])) {
                    let _result = doPatch(origin[key], input[key], deep, ignoreEmptyStrings, true);
                    if (!(0, isEmpty_1.default)(_result)) {
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
}

});

var pick_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function pick(obj, props) {
    if (Array.isArray(obj)) {
        return props.map(i => obj[i]);
    }
    else {
        return props.reduce((result, prop) => {
            if (prop in obj && obj[prop] !== undefined) {
                result[prop] = obj[prop];
            }
            return result;
        }, {});
    }
}
exports.default = pick;

});

var rand_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** Generates a random number within the range from `min` to `max`. */
function rand(min, max) {
    return Number(min) + Math.floor(Math.random() * (max - min + 1));
}
exports.default = rand;

});

var randStr_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Generates a random string.
 * @param chars The possible characters.
 */
function randStr(length, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    let str = "";
    let max = chars.length - 1;
    while (0 < length--) {
        str += chars[(0, rand_1.default)(0, max)];
    }
    return str;
}
exports.default = randStr;

});

var sleep_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Delays the execution context for a while before running the remaining
 * procedures.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, Number(ms)));
}
exports.default = sleep;

});

var sort_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function sort(target, method = void 0) {
    if ((0, isLike.isArrayLike)(target, true)) {
        let arr = (0, ensureType_1.ensureArray)(target);
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
    else if ((0, isLike.isDictLike)(target)) {
        let deep = Boolean(method);
        let keys = [
            ...sort(Object.getOwnPropertyNames(target)),
            ...Object.getOwnPropertySymbols(target)
        ];
        return keys.reduce((result, key) => {
            let value = target[key];
            if (deep) {
                if ((0, isLike.isArrayLike)(value, true)) {
                    value = (0, ensureType_1.ensureArray)(value).map(item => {
                        return (0, isLike.isDictLike)(item) ? sort(item, deep) : item;
                    });
                }
                else if ((0, isLike.isDictLike)(value)) {
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
exports.default = sort;
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
}

});

var split_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

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
        if (typeof arr["slice"] === "function") {
            result.push(arr["slice"](i, i + length));
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
    else if ((0, isLike.isBufferLike)(obj)) {
        checkNumberArgument("byteLength", sep);
        return splitArrayLike(obj, sep, obj.byteLength);
    }
    else if ((0, isLike.isArrayLike)(obj, true)) {
        checkNumberArgument("length", sep);
        return splitArrayLike(obj, sep);
    }
    else if ((0, isLike.isCollectionLike)(obj)) {
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
exports.default = split;

});

var timestamp_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


exports.default = timestamp;
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
}

});

var trim_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Trims the leading and tailing spaces of a string, the string properties of
 * an object, or the string and object elements in an array.
 */
function trim(target, deep = false) {
    if (typeof target === "string") {
        return target.trim();
    }
    else if ((0, isLike.isArrayLike)(target, true)) {
        return (0, ensureType_1.ensureArray)(target).map(item => trim(item, deep));
    }
    else if ((0, isLike.isDictLike)(target)) {
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
                if ((0, isLike.isArrayLike)(value, true)) {
                    value = (0, ensureType_1.ensureArray)(value).map(item => {
                        return (0, isLike.isDictLike)(item) ? trim(item, deep) : item;
                    });
                }
                else if ((0, isLike.isDictLike)(value)) {
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
exports.default = trim;

});

var typeAs_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function typeAs(target, type) {
    if ((0, typeOf_1.default)(type) !== "class" &&
        type !== Symbol &&
        (typeof BigInt === "function" && type !== BigInt)) {
        throw new TypeError("'type' must be a valid constructor");
    }
    let _type;
    let primitiveMap = {
        "string": String,
        "number": Number,
        "bigint": (0, getGlobal_1.default)("BigInt"),
        "boolean": Boolean,
        "symbol": Symbol
    };
    if (target instanceof type) {
        if ([String, Number, Boolean].includes(type)) {
            return type(target); // make sure the primitives are returned.
        }
        else {
            return target;
        }
    }
    else if ((_type = typeof target) && primitiveMap[_type] === type) {
        return target;
    }
    return null;
}
exports.default = typeAs;

});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	__extends: __extends,
	get __assign () { return __assign; },
	__rest: __rest,
	__decorate: __decorate,
	__param: __param,
	__metadata: __metadata,
	__awaiter: __awaiter,
	__generator: __generator,
	__createBinding: __createBinding,
	__exportStar: __exportStar,
	__values: __values,
	__read: __read,
	__spread: __spread,
	__spreadArrays: __spreadArrays,
	__spreadArray: __spreadArray,
	__await: __await,
	__asyncGenerator: __asyncGenerator,
	__asyncDelegator: __asyncDelegator,
	__asyncValues: __asyncValues,
	__makeTemplateObject: __makeTemplateObject,
	__importStar: __importStar,
	__importDefault: __importDefault,
	__classPrivateFieldGet: __classPrivateFieldGet,
	__classPrivateFieldSet: __classPrivateFieldSet,
	__classPrivateFieldIn: __classPrivateFieldIn
});

var tslib_1 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

var until_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Hangs the execution context until the test is passed.
 */
function until(test) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (typeof setImmediate === "undefined") {
            var setImmediate = (cb) => setTimeout(cb, 0);
        }
        do {
            yield new Promise(setImmediate);
        } while ((yield test()) == false);
    });
}
exports.default = until;

});

var useThrottle_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


if (typeof setImmediate === "undefined") {
    // compatible with browsers
    var setImmediate = (cb) => setTimeout(cb, 0);
}
exports.default = useThrottle;
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (backgroundUpdate && !this.daemon) {
                this.daemon = setInterval(() => this.func(handle, ...args), interval);
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
}

});

var wrap_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Wraps a function inside another function and returns a new function that
 * copies the original function's name and properties.
 */
function wrap(target, wrapper) {
    let fn = function (...args) {
        return wrapper.call(this, target, ...args);
    };
    (0, define_1.default)(fn, "name", target.name);
    (0, define_1.default)(fn, "length", target.length);
    (0, define_1.default)(fn, "toString", target.toString.bind(target));
    return fn;
}
exports.default = wrap;

});

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.useThrottle = exports.until = exports.typeOf = exports.typeAs = exports.trim = exports.timestamp = exports.split = exports.sort = exports.sleep = exports.randStr = exports.rand = exports.pick = exports.patch = exports.omitVoid = exports.omit = exports.keysOf = exports.isVoid = exports.isSubClassOf = exports.isOwnMethod = exports.isOwnKey = exports.isNumeric = exports.isInteger = exports.isFloat = exports.isEmpty = exports.isBetween = exports.getGlobal = exports.flatObject = exports.ensureType = exports.diff = exports.define = exports.count = void 0;


Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.default; } });

Object.defineProperty(exports, "define", { enumerable: true, get: function () { return define_1.default; } });

Object.defineProperty(exports, "diff", { enumerable: true, get: function () { return diff_1.default; } });

Object.defineProperty(exports, "ensureType", { enumerable: true, get: function () { return ensureType_1.default; } });

Object.defineProperty(exports, "flatObject", { enumerable: true, get: function () { return flatObject_1.default; } });

Object.defineProperty(exports, "getGlobal", { enumerable: true, get: function () { return getGlobal_1.default; } });

Object.defineProperty(exports, "isBetween", { enumerable: true, get: function () { return isBetween_1.default; } });

Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.default; } });

Object.defineProperty(exports, "isFloat", { enumerable: true, get: function () { return isFloat_1.default; } });

Object.defineProperty(exports, "isInteger", { enumerable: true, get: function () { return isInteger_1.default; } });

Object.defineProperty(exports, "isNumeric", { enumerable: true, get: function () { return isNumeric_1.default; } });

Object.defineProperty(exports, "isOwnKey", { enumerable: true, get: function () { return isOwnKey_1.default; } });

Object.defineProperty(exports, "isOwnMethod", { enumerable: true, get: function () { return isOwnMethod_1.default; } });

Object.defineProperty(exports, "isSubClassOf", { enumerable: true, get: function () { return isSubClassOf_1.default; } });

Object.defineProperty(exports, "isVoid", { enumerable: true, get: function () { return isVoid_1.default; } });

Object.defineProperty(exports, "keysOf", { enumerable: true, get: function () { return keysOf_1.default; } });

Object.defineProperty(exports, "omit", { enumerable: true, get: function () { return omit_1.default; } });

Object.defineProperty(exports, "omitVoid", { enumerable: true, get: function () { return omitVoid_1.default; } });

Object.defineProperty(exports, "patch", { enumerable: true, get: function () { return patch_1.default; } });

Object.defineProperty(exports, "pick", { enumerable: true, get: function () { return pick_1.default; } });

Object.defineProperty(exports, "rand", { enumerable: true, get: function () { return rand_1.default; } });

Object.defineProperty(exports, "randStr", { enumerable: true, get: function () { return randStr_1.default; } });

Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return sleep_1.default; } });

Object.defineProperty(exports, "sort", { enumerable: true, get: function () { return sort_1.default; } });

Object.defineProperty(exports, "split", { enumerable: true, get: function () { return split_1.default; } });

Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.default; } });

Object.defineProperty(exports, "trim", { enumerable: true, get: function () { return trim_1.default; } });

Object.defineProperty(exports, "typeAs", { enumerable: true, get: function () { return typeAs_1.default; } });

Object.defineProperty(exports, "typeOf", { enumerable: true, get: function () { return typeOf_1.default; } });

Object.defineProperty(exports, "until", { enumerable: true, get: function () { return until_1.default; } });

Object.defineProperty(exports, "useThrottle", { enumerable: true, get: function () { return useThrottle_1.default; } });

Object.defineProperty(exports, "wrap", { enumerable: true, get: function () { return wrap_1.default; } });

});

var index = /*@__PURE__*/getDefaultExportFromCjs(utils);

export { index as default };
