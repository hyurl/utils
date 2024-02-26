import { isValid } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/object/index.js';

/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
function typeOf(target) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if (!isValid(target) && !(target instanceof Date))
        return "void";
    let type = typeof target;
    if (type === "function") {
        if (isClass(target)) {
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
function isClass(obj) {
    if (typeof obj != "function")
        return false;
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
            obj.name !== "Symbol"))) {
        return true;
    }
    // TypeScript anonymous class to ES5 with default export
    if (hasThis && obj.name === "default_1")
        return true;
    return false;
}

export { typeOf as default };
//# sourceMappingURL=typeOf.js.map
