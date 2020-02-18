/** Checks if a class is a sub-class of (inherited from) the base class. */
export default function isSubClassOf<T, B>(
    target: new (...args: any[]) => T,
    base: new (...args: any[]) => B
) {
    return typeof target === "function"
        && typeof base === "function"
        && target.prototype instanceof base;
}