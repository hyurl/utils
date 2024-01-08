/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 *
 * @deprecated use `!isValid` from `@ayonli/jsext/object` instead.
 */
function isVoid(value) {
    return value === null || value === undefined || Object.is(value, NaN);
}

export { isVoid as default };
//# sourceMappingURL=isVoid.js.map
