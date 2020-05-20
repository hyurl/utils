/**
 * Casts the target object or its contents to the closest types automatically.
 * This function is useful when reading config from a file or fetching data from
 * the web.
 */
export default function ensureType(target: any): any;
export declare function ensureArray<T>(value: ArrayLike<T>): T[];
