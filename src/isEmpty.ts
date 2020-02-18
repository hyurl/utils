import { isArrayLike, isBufferLike, isCollectionLike } from "is-like";

const EmptyPrimitives: any[] = [0, NaN, false, null, void 0, ""];

if (typeof BigInt === "function")
    EmptyPrimitives.push(BigInt("0"));

/**
 * Checks if the value resolves to an empty object or a falsy value.
 */
export default function isEmpty(value: any): boolean {
    if (EmptyPrimitives.includes(value))
        return true;

    if (typeof value === "object") {
        if (isBufferLike(value)) {
            return value.byteLength === 0;
        } else if (isArrayLike(value)) {
            return value.length === 0;
        } else if (isCollectionLike(value, true)) {
            return value.size === 0;
        } else {
            return Reflect.ownKeys(value).length === 0;
        }
    }

    return false;
}