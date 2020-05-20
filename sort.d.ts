/**
 * Creates a new array with sorted elements of the original array, the sorted
 * array is in ascending order by default, unless providing a `compare` function
 * to determine how should the elements be ordered.
 * Unlike `Array.prototype.sort()`, this function always guarantees a stable
 * sort; and if all elements are numbers, they're sorted by their values instead
 * of converting to strings for sorting.
 */
export default function sort<T>(arr: ArrayLike<T>, compare?: (a: T, b: T) => number): T[];
/**
 * Creates a new object with sorted keys (in ascending order) of the original
 * object, if `deep` is set, the children nodes will be sorted as well.
 * Note: symbol keys are not sorted and remain their original order.
 */
export default function sort<T extends object>(obj: T, deep?: boolean): T;
