/**
 * Returns the names of the enumerable string properties and methods of an
 * object. This function is the same as calling `Object.keys()` except it's
 * typing-friendly.
 */
export default function keysOf<T = any>(obj: T): (keyof T)[] {
    return Object.keys(obj) as any[];
}