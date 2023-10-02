import { isArrayLike, isBufferLike, isDictLike } from 'https://ayonli.github.io/is-like/index.js';
import isVoid from './isVoid.js';

function flatObject(obj, depth = 1, flatArray = false) {
    return flatDeep({}, obj, "", 0, depth, flatArray);
}
function flatDeep(carrier, source, field, depth, maxDepth, flatArray) {
    let isArr;
    let isDict;
    let isContent = !isVoid(field) && field !== "";
    if (depth === maxDepth || (!(isArr = isArrayLike(source, true) && !isBufferLike(source)) &&
        !(isDict = isDictLike(source)))) {
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
