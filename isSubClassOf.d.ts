/** Checks if a class is a sub-class of (inherited from) the base class. */
export default function isSubClassOf<T, B>(target: Constructor<T>, base: Constructor<B>): boolean;
