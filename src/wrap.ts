import define from './define';

/**
 * Wraps a function inside another function and returns a new function that
 * copies the original function's name and properties.
 */
export default function wrap<T extends (...args: any[]) => any>(
    target: T,
    wrapper: (target: T, ...args: Parameters<T>) => ReturnType<T>
) {
    let fn = function (this: any, ...args: Parameters<T>): ReturnType<T> {
        return wrapper.call(this, target, ...args);
    };

    define(fn, "name", target.name);
    define(fn, "length", target.length);
    define(fn, "toString", target.toString.bind(target));

    return fn as T;
}