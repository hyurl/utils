import typeOf from './typeOf';

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
export default function define(
    obj: any,
    prop: string | symbol,
    value: any,
    enumerable = false,
    writable = false,
): void {
    if ((typeOf(value) as any) === Object) {
        if (isGetter(value) || isGetterAndSetter(value)) {
            Object.defineProperty(obj, prop, {
                configurable: true,
                enumerable,
                ...value
            });
            return;
        }
    }

    Object.defineProperty(obj, <string | symbol>prop, {
        configurable: true,
        enumerable,
        writable,
        value
    });
}

function isGetter(obj: any) {
    return String(Object.keys(obj)) === "get"
        && typeof obj["get"] === "function";
}

function isGetterAndSetter(obj: any) {
    let sign = String(Object.keys(obj));
    return (sign === "get,set" || sign === "set,get")
        && typeof obj["get"] === "function"
        && typeof obj["set"] === "function";
}
