import { isArrayLike, isBufferLike, isCollectionLike } from "is-like";

/**
 * Checks if the target resolves to an empty object or a falsy value.
 */
export default function isEmpty(target: any): boolean {
    let emptyPrimitives: any[] = [0, NaN, false, null, void 0, ""];

    if (typeof BigInt === "function")
        emptyPrimitives.push(BigInt("0"));

    if (emptyPrimitives.includes(target))
        return true;

    if (typeof target === "object") {
        if (isBufferLike(target)) {
            return target.byteLength === 0;
        } else if (isArrayLike(target)) {
            return target.length === 0;
        } else if (isCollectionLike(target, true)) {
            return target.size === 0;
        } else {
            return Reflect.ownKeys(target).length === 0;
        }
    }

    return false;
}