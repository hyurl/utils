import { isArrayLike, isDictLike } from 'https://lib.deno.dev/x/is_like@latest/index.js';
import { isBetween } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/number/index.js';

const truePattern = /^\s*(true|yes|on)\s*$/i;
const falsePattern = /^\s*(false|no|off)\s*$/i;
const nullPattern = /^\s*(null|nil|none|void|undefined)\s*$/i;
const nanPattern = /^\s*NaN\s*$/;
const infinityPattern = /^\s*-?Infinity\s*/;
const regexPattern = /^\s*\/(.+)\/([gimuys]*)\s*$/;
const numberInterval = [
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
];
/**
 * Casts the target object or its contents to the closest types automatically.
 * This function is useful when reading config from a file or fetching data from
 * the web.
 */
function ensureType(target) {
    switch (typeof target) {
        case "string": {
            let re;
            if (truePattern.test(target)) {
                return true;
            }
            else if (falsePattern.test(target)) {
                return false;
            }
            else if (nullPattern.test(target)) {
                return null;
            }
            else if (nanPattern.test(target)) {
                return NaN;
            }
            else if (infinityPattern.test(target)) {
                return Number(target);
            }
            else if (re = target.match(regexPattern)) {
                return new RegExp(re[1], re[2]);
            }
            else {
                let num = Number(target);
                if (!isNaN(num) &&
                    isBetween(num, numberInterval) &&
                    target[0] !== "+" // Most likely a telephone number.
                ) {
                    return num;
                }
                else {
                    return target;
                }
            }
        }
        case "object": {
            if (target === null) {
                return null;
            }
            else if (isArrayLike(target, true)) {
                return ensureArray(target).map(ensureType);
            }
            else if (isDictLike(target)) {
                return Reflect.ownKeys(target).reduce((result, key) => {
                    result[key] = ensureType(target[key]);
                    return result;
                }, {});
            }
            else {
                return target;
            }
        }
        default:
            return target;
    }
}
function ensureArray(value) {
    return Array.isArray(value) ? value : Array.from(value);
}

export { ensureType as default, ensureArray };
//# sourceMappingURL=ensureType.js.map
