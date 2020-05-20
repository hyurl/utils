export default count;
/** Counts the length of a string. */
declare function count(str: string, byteLength?: boolean): number;
/** Counts how many times a substring appeared in the given string. */
declare function count(str: string, substr: string): number;
/** Counts the length of an array-like object. */
declare function count<T>(arr: ArrayLike<T>): number;
/** Counts how many times an element appeared in the given array-like object. */
declare function count<T>(arr: ArrayLike<T>, ele: T): number;
/** Counts the size of a collection. */
declare function count(collection: Map<any, any> | Set<any>): number;
/** Counts the capacity of an object (of how many properties it has). */
declare function count(obj: any): number;
