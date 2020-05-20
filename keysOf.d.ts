/** Returns the indexes of the given array. */
export default function keysOf<T extends any[]>(arr: T): number[];
/** Returns an array of the given function's own properties. */
export default function keysOf<T extends Function>(fn: T): (string | symbol)[];
/** Returns an array of the given object's own properties. */
export default function keysOf<T extends object>(obj: T): (keyof T | symbol)[];
