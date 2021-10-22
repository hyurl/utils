/**
 * Trims the leading and tailing spaces of a string, the string properties of
 * an object, or the string and object elements in an array.
 */
export default function trim<T extends any>(target: T, deep?: boolean): T extends string ? string : T;
