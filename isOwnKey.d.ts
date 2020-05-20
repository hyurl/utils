/**
 * Checks if a property name is one of the properties of the target object.
 */
export default function isOwnKey<T>(obj: T, prop: string | number | symbol): prop is keyof T;
