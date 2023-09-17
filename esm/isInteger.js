/**
 * Checks if the value is an integer number (or bigint).
 *
 * @deprecated use `Number.isInteger` instead.
 */
function isInteger(value) {
    return typeof value === "bigint" || Number.isInteger(value);
}

export { isInteger as default };
//# sourceMappingURL=isInteger.js.map
