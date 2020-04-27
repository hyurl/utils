import typeOf from './typeOf';

/**
 * Sets a property on the target object.
 * @param value If a function is set and the `prop` is neither `valueOf`, nor
 *  `toString`, nor `toJSON`, then the function will be used to set the getter.
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
): any {
    if (typeOf(value) === "function" &&
        !["valueOf", "toString", "toJSON"].includes(<string>prop)
    ) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable,
            get: value
        });
    } else {
        Object.defineProperty(obj, <string | symbol>prop, {
            configurable: true,
            enumerable,
            writable,
            value
        });
    }
}