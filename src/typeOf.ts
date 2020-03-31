import isVoid from './isVoid';

type TypeNames = "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "function"
    | "class"
    | "arguments"
    | "void";

function isClass(type: Function) {
    let str = type.toString();
    return str.slice(0, 6) === "class " ||
        (/^function [A-Z]/.test(str) && str.includes("[native code]"));
}

/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
export default function typeOf<T extends any>(
    target: T
): TypeNames | (new (...args: any[]) => T) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if (isVoid(target))
        return "void";

    let type = typeof target;

    if (type === "function") {
        if (isClass(<any>target)) {
            return "class";
        } else {
            return "function";
        }
    } else if (type === "object") {
        if (Object.prototype.toString.call(target) === "[object Arguments]") {
            return "arguments";
        } else {
            return target.constructor || Object;
        }
    } else {
        return <any>type;
    }
}