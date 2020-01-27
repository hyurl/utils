/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 */
export default function isVoid(value: any) {
    return value === null || value === undefined || Object.is(value, NaN);
}