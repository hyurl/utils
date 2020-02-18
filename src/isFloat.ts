/**
 * Checks if the value is a float number.
 */
export default function isFloat(value: any): value is number {
    return typeof value === "number"
        && !isNaN(value)
        && (!Number.isFinite(value) || value % 1 !== 0);
}