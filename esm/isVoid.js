/**
 * Checks if a value is resolved to void (`null`, `undefined` or `NaN`).
 *
 * @deprecated use `!Object.isValid` from `@ayonli/jsext/object/augment` instead.
 */
function isVoid(value) {
    return value === null || value === undefined || Object.is(value, NaN);
}

export { isVoid as default };
//# sourceMappingURL=isVoid.js.map
