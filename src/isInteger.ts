/**
 * Checks if the value is an integer number (or bigint).
 */
export default function isInteger(value: any): value is (number | bigint) {
    let type = typeof value;
    return type === "bigint"
        || (type === "number" &&
            !isNaN(value) &&
            Number.isFinite(value) &&
            value % 1 === 0);
}