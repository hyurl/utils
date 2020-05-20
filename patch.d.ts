/**
 * Patches the differences onto the `origin` object from the `input` object. If
 * a property exists in both objects and the values are not equal, the `input`
 * one will be taken. However, those properties that are only presents in the
 * `origin` object will remain untouched.
 *
 * NOTE: This function mutates the `origin` object and returns the patched
 * differences, when patching, any void value in the `input` object will be
 * ignored.
 *
 * This function is very useful, for example, a client issued a patch into the
 * resource store and the server wants to know what properties has modified by
 * this update so that it can perform some extra operations to provide a better
 * user experience.
 */
export default function patch<T, U>(origin: T, input: U, deep?: boolean, ignoreEmptyStrings?: boolean): T & Partial<U>;
