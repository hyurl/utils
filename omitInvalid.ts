import { isArrayLike, isBufferLike } from "https://lib.deno.dev/x/is_like@latest/index.js";
import { isValid } from "https://lib.deno.dev/x/ayonli_jsext@latest/object/index.ts";
import isEmpty from "./isEmpty.ts";

/**
 * Creates an object composed with only the valid properties and values.
 * 
 * @deprecated use `sanitize` from `@ayonli/jsext/object` instead.
 * 
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 * @param omitEmptyStrings If set, empty properties of type `string` will be
 *  removed as well.
 */
export default function omitInvalid<T>(
    target: T,
    deep = false,
    omitEmptyObjects = false,
    omitEmptyStrings = false
): T {
    return doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, 0) as T;
}

function doOmit<T extends any>(
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
