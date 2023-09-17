import { isArrayLike, isDictLike } from "is-like";
import { ensureArray } from "./ensureType";

/**
 * Trims the leading and tailing spaces of a string, the string properties of
 * an object, or the string and object elements in an array.
 */
export default function trim<T extends any>(target: T, deep = false): T extends string ? string : T {
    if (typeof target === "string") {
        return target.trim() as any;
    } else if (isArrayLike(target, true)) {
        return ensureArray(target).map(item => trim(item, deep)) as any;
    } else if (isDictLike(target)) {
        const keys = [
            ...Object.getOwnPropertyNames(target),
            ...Object.getOwnPropertySymbols(target)
        ];

        return keys.reduce((result, key) => {
            let value = target[key];

            if (typeof value === "string") {
                value = value.trim();
            } else if (deep) {
                if (isArrayLike(value, true)) {
                    value = ensureArray(value).map(item => {
                        return isDictLike(item) ? trim(item, deep) : item;
                    });
                } else if (isDictLike(value)) {
                    value = trim(value, deep);
                }
            }

            result[key] = value;
            return result;
        }, {} as any);
    } else {
        return target as any;
    }
}
