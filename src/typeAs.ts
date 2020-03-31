/**
 * Returns the object if it's an instance of the type, otherwise returns `null`.
 * @example
 *  let foo = typeAs(bar, SomeType)?.doSomething();
 */
export default function typeAs<T>(obj: any, type: new (...args: any[]) => T) {
    return obj instanceof type ? obj : null;
}