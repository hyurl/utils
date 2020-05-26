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
export default function define(obj: any, prop: string | symbol, value: any, enumerable?: boolean, writable?: boolean): void;
