/**
 * Checks if the value is a number or numeric string.
 */
export default function isNumeric(
    value: any
): value is (number | bigint | string) {
    let type = typeof value;
    return (type === "number" || type === "bigint" || type === "string")
        && !isNaN(Number(value));
}