/**
 * Wraps a function inside another function and returns a new function that
 * copies the original function's name and properties.
 */
export default function wrap<T extends (...args: any[]) => any>(target: T, wrapper: (target: T, ...args: Parameters<T>) => ReturnType<T>): T;
