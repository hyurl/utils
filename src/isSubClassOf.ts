/** Checks if a class is a sub-class of (inherited from) the base class. */
export default function isSubClassOf(target: Function, base: Function) {
    return typeof target === "function" && target.prototype instanceof base;
}