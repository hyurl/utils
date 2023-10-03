import { isArrayLike, isDictLike } from 'https://lib.deno.dev/x/is_like@latest/index.js';
import { ensureArray } from './ensureType.js';

function sort(target, method = void 0) {
    if (isArrayLike(target, true)) {
        let arr = ensureArray(target);
        let compare = method;
        // If the compare function is omitted and all the elements are numbers
        // (or of bigint), sort them by their values.
        if (!compare && (onlyNumbers(arr) || onlyNumbers(arr, "bigint"))) {
            compare = (a, b) => a - b;
        }
        if (shouldUseNativeSort(arr)) {
            return arr.sort(compare);
        }
        // Emulate stable sort.
        // Reference: http://blog.vjeux.com/2010/javascript/javascript-sorting-table.html
        return arr
            .map((value, index) => ({ value, index }))
            .sort((a, b) => compare(a.value, b.value) || a.index - b.index)
            .map(({ value }) => value);
    }
    else if (isDictLike(target)) {
        let deep = Boolean(method);
        let keys = [
            ...sort(Object.getOwnPropertyNames(target)),
            ...Object.getOwnPropertySymbols(target)
        ];
        return keys.reduce((result, key) => {
            let value = target[key];
            if (deep) {
                if (isArrayLike(value, true)) {
                    value = ensureArray(value).map(item => {
                        return isDictLike(item) ? sort(item, deep) : item;
                    });
                }
                else if (isDictLike(value)) {
                    value = sort(value, deep);
                }
            }
            result[key] = value;
            return result;
        }, {});
    }
    else {
        if (typeof method === "function") {
            throw new TypeError("The target to sort is not an array");
        }
        else if (typeof method === "boolean") {
            throw new TypeError("The target to sort is not a pure object");
        }
        else {
            throw new TypeError("The target to sort is not an array or a pure object");
        }
    }
}
function onlyNumbers(arr, type = "number") {
    return arr.every(ele => typeof ele === type);
}
function shouldUseNativeSort(arr) {
    if (typeof process === "object" && typeof process.versions === "object") {
        return arr.length <= 10
            || parseFloat(process.versions.v8 || "0") >= 7.0;
    }
    else if (typeof Deno === "object") {
        return true;
    }
    else if (typeof navigator === "object"
        && typeof navigator.userAgent === "string") {
        let match = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge|OPR)\/(\d+)/);
        if (match) {
            let name = match[1];
            let version = parseFloat(match[2]);
            if ((name === "Edge" && arr.length <= 512) ||
                (name === "Chrome" && (version >= 70) || arr.length <= 10) ||
                (name === "Firefox" && version >= 3) ||
                (name === "Safari" && version >= 10.1) ||
                (name === "OPR" && version >= 54)) {
                return true;
            }
        }
    }
    return false;
}

export { sort as default };
//# sourceMappingURL=sort.js.map
