import { isArrayLike, isDictLike } from './external/is-like/index.js';
import { ensureArray } from './ensureType.js';

/**
 * Trims the leading and tailing spaces of a string, the string properties of
 * an object, or the string and object elements in an array.
 */
function trim(target, deep = false) {
    if (typeof target === "string") {
        return target.trim();
    }
    else if (isArrayLike(target, true)) {
        return ensureArray(target).map(item => trim(item, deep));
    }
    else if (isDictLike(target)) {
        const keys = [
            ...Object.getOwnPropertyNames(target),
            ...Object.getOwnPropertySymbols(target)
        ];
        return keys.reduce((result, key) => {
            let value = target[key];
            if (typeof value === "string") {
                value = value.trim();
            }
            else if (deep) {
                if (isArrayLike(value, true)) {
                    value = ensureArray(value).map(item => {
                        return isDictLike(item) ? trim(item, deep) : item;
                    });
                }
                else if (isDictLike(value)) {
                    value = trim(value, deep);
                }
            }
            result[key] = value;
            return result;
        }, {});
    }
    else {
        return target;
    }
}

export { trim as default };
//# sourceMappingURL=trim.js.map
