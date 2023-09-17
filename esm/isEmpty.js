import { isBufferLike as isBufferLike_1, isArrayLike as isArrayLike_1, isCollectionLike as isCollectionLike_1 } from './_external/is-like/index.js';

const BaseEmptyPrimitives = ["", NaN, null, void 0];
const EmptyPrimitives = [...BaseEmptyPrimitives, 0, false];
if (typeof BigInt === "function")
    EmptyPrimitives.push(BigInt("0"));
/**
 * Checks if the value resolves to an empty object or a falsy value.
 */
function isEmpty(value, deep = false) {
    return test(value, Boolean(deep), EmptyPrimitives);
}
function test(value, deep, emptyPrimitives) {
    if (emptyPrimitives.includes(value))
        return true;
    if (typeof value === "object") {
        if (value instanceof RegExp) {
            return false;
        }
        else if (value instanceof Date) {
            return String(value) === "Invalid Date";
        }
        else if (value instanceof Error) {
            return value.message.length === 0;
        }
        else if (isBufferLike_1(value)) {
            return value.byteLength === 0;
        }
        else if (isArrayLike_1(value, true)) {
            if (value.length === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                for (let i = 0, len = value.length; i < len; ++i) {
                    if (!test(value[i], deep, BaseEmptyPrimitives)) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if (isCollectionLike_1(value, true)) {
            if (value.size === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                if (value instanceof Map) {
                    for (let v of value.values()) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }
                    return true;
                }
                else if (value instanceof Set) {
                    for (let v of value) {
                        if (!test(v, deep, BaseEmptyPrimitives)) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }
        }
        else {
            let keys = Reflect.ownKeys(value);
            if (keys.length === 0) {
                return true;
            }
            else if (!deep) {
                return false;
            }
            else {
                return keys.every(k => test(value[k], deep, BaseEmptyPrimitives));
            }
        }
    }
    return false;
}

export { isEmpty as default };
//# sourceMappingURL=isEmpty.js.map
