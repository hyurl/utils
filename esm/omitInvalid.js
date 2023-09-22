import { isBufferLike as isBufferLike_1, isArrayLike as isArrayLike_1 } from './external/is-like/index.js';
import { isValid } from './external/@ayonli/jsext/object/index.js';
import isEmpty from './isEmpty.js';

/**
 * Creates an object composed with only the valid properties and values.
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 * @param omitEmptyStrings If set, empty properties of type `string` will be
 *  removed as well.
 */
function omitInvalid(target, deep = false, omitEmptyObjects = false, omitEmptyStrings = false) {
    return doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, 0);
}
function doOmit(target, deep, omitEmptyObjects, omitEmptyStrings, depth) {
    if (typeof target === "string") {
        return omitEmptyStrings && target.trim() === ""
            ? (depth > 0 ? void 0 : "")
            : target;
    }
    else if (target === null
        || typeof target !== "object"
        || target instanceof Date
        || target instanceof Error
        || target instanceof RegExp
        || isBufferLike_1(target)) {
        return target;
    }
    else if (omitEmptyObjects && isEmpty(target)) {
        return depth > 0 ? void 0 : (isArrayLike_1(target, true) ? [] : {});
    }
    if (isArrayLike_1(target, true)) {
        let arr = [];
        for (let i = 0, len = target.length; i < len; ++i) {
            let value = target[i];
            if (isValid(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    !isValid(value) || arr.push(value);
                }
                else {
                    arr.push(value);
                }
            }
        }
        if (depth > 0 && omitEmptyObjects && isEmpty(arr)) {
            return void 0;
        }
        else {
            return arr;
        }
    }
    else {
        let obj = Reflect.ownKeys(target).reduce((obj, key) => {
            let value = target[key];
            if (isValid(value)) {
                if (deep) {
                    value = doOmit(value, deep, omitEmptyObjects, omitEmptyStrings, depth + 1);
                    !isValid(value) || (obj[key] = value);
                }
                else {
                    obj[key] = value;
                }
            }
            return obj;
        }, {});
        if (depth > 0 && omitEmptyObjects && isEmpty(obj)) {
            return void 0;
        }
        else {
            return obj;
        }
    }
}

export { omitInvalid as default, doOmit };
//# sourceMappingURL=omitInvalid.js.map