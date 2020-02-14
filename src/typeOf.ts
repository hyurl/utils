import isVoid from './isVoid';

/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
export default function typeOf<T extends any>(
    target: T
): "string" | "number" | "bigint" | "boolean" | "symbol" | "function" | "class" | "void" | (new (...args: any[]) => T) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if (isVoid(target))
        return "void";

    let type = typeof target;

    if (type === "function") {
        if (String(target).slice(0, 5) === "class") {
            return "class";
        } else {
            return "function";
        }
    } else if (type === "object") {
        return target.constructor || Object;
    } else {
        return <any>type;
    }
}