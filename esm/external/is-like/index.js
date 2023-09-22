/**
 * @param {any} value 
 * @param {Array<[string|symbol, string]>} props 
 * @param {Array<string>} types
 */
function isObjectWith(value, ...props) {
    let isObj = typeof value === "object" && value !== null;
    return isObj && props.every(([p, t]) => p in value && typeof value[p] === t);
}

function isEmptyDict(obj) {
    try {
        let str = JSON.stringify(obj);
        return str === "{}" || str === "[]";
    } catch (e) {
        return false;
    }
}

/**
 * Checks if the input value is a dict `object`, which includes key-value pairs.
 * @returns {value is { [x: string | symbol]: any; }}
 */
function isDictLike(value) {
    return typeof value === "object" && value !== null
        && (value.constructor === Object || (
            !(value instanceof Date) &&
            !(value instanceof RegExp) &&
            !isArrayLike(value, true) &&
            !isObjectIdLike(value) &&
            !isEmptyDict(value) &&
            !isTypedArrayLike(value) &&
            !isCollectionLike(value) &&
            !isPromiseLike(value)
        ));
}

/**
 * Checks if the input value is an `object` with `length` property or a string.
 * @returns {value is ArrayLike<any>}
 */
function isArrayLike(value, strict = false) {
    if (Array.isArray(value)) {
        return true;
    } else if (!strict) {
        return isObjectWith(value, ["length", "number"])
            || (typeof value === "string");
    } else if (isObjectWith(value, ["length", "number"])) {
        let keys = Object.keys(value);
        let isNonEnumLength = !keys.includes("length");
        let indexes;

        if (value.length === 0 ||
            (indexes = keys.map(Number).filter(isFinite)).length === 0) {
            return isNonEnumLength;
        } else {
            let hasIterator = typeof value[Symbol.iterator] === "function";

            for (let i = value.length; i--;) {
                if (!indexes.includes(i) && !(isNonEnumLength || hasIterator)) {
                    return false;
                }
            }

            return true;
        }
    }

    return false;
}

/**
 * Checks if the input value is an `object` with `size` property and
 * `[Symbol.iterator]()` method, or is an instance of **WeakMap** or
 * **WeakSet** if `excludeWeakOnes` is not set.
 */
function isCollectionLike(value, excludeWeakOnes = false) {
    return (isObjectWith(value, ["size", "number"], [Symbol.iterator, "function"]))
        || (!excludeWeakOnes &&
            (value instanceof WeakMap || value instanceof WeakSet));
}

/**
 * 
 * @returns {value is ArrayLike<number> & Pick<Uint8Array, "byteLength" | "slice">}
 */
function isTypedArrayLike(value) {
    return isObjectWith(value, ["byteLength", "number"], ["slice", "function"]);
}

/** @deprecated An alias of `isTypedArrayLike`. */
const isBufferLike = isTypedArrayLike;

/**
 * Checks if the input is an `object` with `then()` method.
 * @returns {value is PromiseLike<any>}
 */
function isPromiseLike(value) {
    return isObjectWith(value, ["then", "function"]);
}

function isObjectIdLike(value) {
    return typeof value === "object" && value !== null
        && (value.constructor.name === "ObjectId"
            || value.constructor.name === "ObjectID");
}

export { isArrayLike, isBufferLike, isCollectionLike, isDictLike, isObjectIdLike, isPromiseLike, isTypedArrayLike };
//# sourceMappingURL=index.js.map
