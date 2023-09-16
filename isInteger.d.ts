/**
 * Checks if the value is an integer number (or bigint).
 *
 * @deprecated use `Number.isInteger` instead.
 */
export default function isInteger(value: any): value is (number | bigint);
