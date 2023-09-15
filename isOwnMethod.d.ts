/**
 * Checks if a property name is one of the own methods of the target object (,
 * this method is defined in the prototype of the object and is not inherited
 * from a super class).
 */
export default function isOwnMethod(obj: any, method: string | symbol): boolean;
