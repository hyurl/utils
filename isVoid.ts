/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 * 
 * @deprecated use `!isValid` from `@ayonli/jsext/object` instead.
 */
export default function isVoid(value: any): value is void {
    return value === null || value === undefined || Object.is(value, NaN);
}
