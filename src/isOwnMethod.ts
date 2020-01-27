/**
 * Checks if a property name is one of the own methods of the target object (,
 * this method is defined in the prototype of the object and is not inherited
 * from a super class).
 */
export default function isOwnMethod<T>(obj: T, method: string): boolean {
    let proto = Object.getPrototypeOf(obj);
    return proto !== null
        && Object.prototype.hasOwnProperty.call(proto, method)
        && typeof proto[method] === "function";
}