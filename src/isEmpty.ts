import { isArrayLike, isBufferLike, isCollectionLike } from "is-like";

const BaseEmptyPrimitives: any[] = ["", NaN, null, void 0];
const EmptyPrimitives: any[] = [...BaseEmptyPrimitives, 0, false];

if (typeof BigInt === "function")
    EmptyPrimitives.push(BigInt("0"));

/**
 * Checks if the value resolves to an empty object or a falsy value.
 */
export default function isEmpty(value: any, deep = false): boolean {
    return test(value, Boolean(deep), EmptyPrimitives);
}

function test(
    value: any,
    deep: boolean,
    emptyPrimitives: any[]
): boolean {
    if (emptyPrimitives.includes(value))
        return true;

    if (typeof value === "object") {
        if (isBufferLike(value)) {
            return value.byteLength === 0;
        } else if (isArrayLike(value, true)) {
            if (value.length === 0) {
                return true;
            } else if (!deep) {
                return false;
            } else {
                for (let i = 0, len = value.length; i < len; ++i) {
                    if (!test(value[i], deep, BaseEmptyPrimitives)) {
                        return false;
                    }
                }

                return true;
            }
        } else if (isCollectionLike(value, true)) {
            if (value.size === 0) {
                return true;
            } else if (!deep) {
                return false;
            } else {
                if (value instanceof Map) {
                    for (let v of value.values()) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }

                    return true;
                } else if (value instanceof Set) {
                    for (let v of value) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            }
        } else {
            let keys = Reflect.ownKeys(value);

            if (keys.length === 0) {
                return true;
            } else if (!deep) {
                return false;
            } else {
                return keys.every(
                    k => test(value[k], deep, BaseEmptyPrimitives)
                );
            }
        }
    }

    return false;
}
