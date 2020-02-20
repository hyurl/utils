import isVoid from "./isVoid";
import isEmpty from "./isEmpty";
import keysOf from "./keysOf";
import { isArrayLike } from 'is-like';

/**
 * Creates an object composed with only the non-void properties.
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 */
export default function omitVoid<T>(
    target: T,
    deep = false,
    omitEmptyObjects = false,
): T {
    return doOmit(target, deep, omitEmptyObjects, 0);
}

export function doOmit<T extends any>(
    target: T,
    deep: boolean,
    omitEmptyObjects: boolean,
    depth: number
): T {
    if (target === null || typeof target !== "object") {
        return target;
    } else if (omitEmptyObjects && isEmpty(target)) {
        return depth > 0 ? void 0 : (isArrayLike(target, true) ? [] : {}) as any;
    }

    if (isArrayLike(target, true)) {
        let arr: any[] = [];

        for (let i = 0, len = (<ArrayLike<any>>target).length; i < len; ++i) {
            let value = target[i];

            if (!isVoid(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, depth + 1);
                    isVoid(value) || arr.push(value);
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
        let obj = keysOf(<object><any>target).reduce((obj, key) => {
            let value = target[key];

            if (!isVoid(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, depth + 1);
                    isVoid(value) || (obj[key] = value);
                } else {
                    obj[key] = value;
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