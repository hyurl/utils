/**
 * Creates an array that contains the difference set between `origin` and
 * `input`;
 */
export default function diff<T>(origin: T[], input: T[]): T[];
/**
 * Evaluates the differences between `origin` and `input`, if a property exists
 * in both objects and the values are not equal, the `input` one will be taken.
 *
 * NOTE: This function treats all void values equal and will not differ them.
 */
export default function diff<T, U>(origin: T, input: U): Diff<T, U>;
export default function diff<T, U>(origin: T, input: U, deep: true): DeepPartial<T & U>;
