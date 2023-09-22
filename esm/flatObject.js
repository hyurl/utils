import { isArrayLike as isArrayLike_1, isBufferLike as isBufferLike_1, isDictLike as isDictLike_1 } from './external/is-like/index.js';
import isVoid from './isVoid.js';

function flatObject(obj, depth = 1, flatArray = false) {
    return flatDeep({}, obj, "", 0, depth, flatArray);
}
function flatDeep(carrier, source, field, depth, maxDepth, flatArray) {
    let isArr;
    let isDict;
    let isContent = !isVoid(field) && field !== "";
    if (depth === maxDepth || (!(isArr = isArrayLike_1(source, true) && !isBufferLike_1(source)) &&
        !(isDict = isDictLike_1(source)))) {
        carrier[field] = source;
    }
    else if (isDict) {
        Reflect.ownKeys(source).forEach(key => {
            let value = source[key];
            if (typeof key === "symbol") {
                if (depth === 0) { // only allow top-level symbol properties
                    carrier[key] = value;
                }
            }
            else {
                flatDeep(carrier, value, isContent ? `${field}.${key}` : key, isContent ? depth + 1 : depth, maxDepth, flatArray);
            }
        });
    }
    else if (isArr) {
        if (flatArray) {
            for (let i = 0, len = source.length; i < len; ++i) {
                flatDeep(carrier, source[i], isContent ? `${field}.${i}` : String(i), isContent ? depth + 1 : depth, maxDepth, flatArray);
            }
        }
        else {
            carrier[field] = source;
        }
    }
    return carrier;
}

export { flatObject as default };
//# sourceMappingURL=flatObject.js.map
