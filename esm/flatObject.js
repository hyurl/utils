import { isValid } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/object/index.js';
import { isArrayLike, isBufferLike, isDictLike } from 'https://lib.deno.dev/x/is_like@latest/index.js';

function flatObject(obj, depth = 1, flatArray = false) {
    return flatDeep({}, obj, "", 0, depth, flatArray);
}
function flatDeep(carrier, source, field, depth, maxDepth, flatArray) {
    let isArr;
    let isDict;
    let isContent = isValid(field) && field !== "";
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
