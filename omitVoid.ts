import isEmpty from "./isEmpty";
import { isArrayLike, isBufferLike } from 'is-like';
import { isValid } from "@ayonli/jsext/object";

/**
 * Creates an object composed with only the non-void properties.
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 * @param omitEmptyStrings If set, empty properties of type `string` will be
 *  removed as well.
 */
export default function omitVoid<T>(
    target: T,
    deep = false,
    omitEmptyObjects = false,
    omitEmptyStrings = false
): T {
    return doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, 0) as T;
}

export function doOmit<T extends any>(
    target: T,
    deep: boolean,
    omitEmptyObjects: boolean,
    omitEmptyStrings: boolean,
    depth: number
): T | undefined {
    if (typeof target === "string") {
        return omitEmptyStrings && target.trim() === ""
            ? (depth > 0 ? void 0 : "" as T)
            : target;
    } else if (target === null
        || typeof target !== "object"
        || target instanceof Date
        || target instanceof Error
        || target instanceof RegExp
        || isBufferLike(target)
    ) {
        return target;
    } else if (omitEmptyObjects && isEmpty(target)) {
        return depth > 0 ? void 0 : (isArrayLike(target, true) ? [] : {}) as any;
    }

    if (isArrayLike(target, true)) {
        let arr: any[] = [];

        for (let i = 0, len = (<ArrayLike<any>>target).length; i < len; ++i) {
            let value = target[i];

            if (isValid(value)) {
                if (deep) {
                    value = doOmit(
                        value,
                        deep,
                        omitEmptyObjects,
                        omitEmptyStrings,
                        depth + 1);
                    !isValid(value) || arr.push(value);
                } else {
                    arr.push(value);
                }
            }
        }

        if (depth > 0 && omitEmptyObjects && isEmpty(arr)) {
            return void 0;
        } else {
            return arr as any;
        }
    } else {
        let obj = Reflect.ownKeys(target as object).reduce((obj, key) => {
            let value = (target as any)[key];

            if (isValid(value)) {
                if (deep) {
                    value = doOmit(
                        value,
                        deep,
                        omitEmptyObjects,
                        omitEmptyStrings,
                        depth + 1);
                    !isValid(value) || ((obj as any)[key] = value);
                } else {
                    (obj as any)[key] = value;
                }
            }

            return obj;
        }, <T>{});

        if (depth > 0 && omitEmptyObjects && isEmpty(obj)) {
            return void 0;
        } else {
            return obj;
        }
    }
}
