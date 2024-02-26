/**
 * Returns the indexes of the given array.
 * @deprecated use `arr.map((_, i) => i)` instead.
 */
export default function keysOf<T extends any[]>(arr: T): number[];
/**
 * Returns an array of the given function's own properties.
 * @deprecated use `Reflect.ownKeys(fn)` instead.
 */
export default function keysOf<T extends Function>(fn: T): (string | symbol)[];
/**
 * Returns an array of the given object's own properties.
 * 
 * @deprecated use `Reflect.ownKeys(obj)` instead.
 */
export default function keysOf<T extends object>(obj: T): (keyof T | symbol)[];
export default function keysOf(obj: object): (string | number | symbol)[] {
    if (Array.isArray(obj)) {
        return obj.map((_, i) => i);
    } else {
        return Reflect.ownKeys(obj);
    }
}
