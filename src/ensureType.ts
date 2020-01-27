import isBetween from './isBetween';
import isOwnKey from './isOwnKey';

const truePattern = /^\s*(true|yes|on)\s*$/i;
const falsePattern = /^\s*(false|no|off)\s*$/i;
const nullPattern = /^\s*(null|nil|none|void|undefined)\s*$/i;
const nanPattern = /^\s*NaN\s*$/;
const infinityPattern = /^\s*-?Infinity\s*/;
const numberInterval: [number, number] = [
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
];

/**
 * Casts the target object or its contents to the closest types automatically.
 * This function is useful when reading config from a file or fetching data from
 * the web.
 */
export default function ensureType(target: any): any {
    switch (typeof target) {
        case "string": {
            if (truePattern.test(target)) {
                return true;
            } else if (falsePattern.test(target)) {
                return false;
            } else if (nullPattern.test(target)) {
                return null;
            } else if (nanPattern.test(target)) {
                return NaN;
            } else if (infinityPattern.test(target)) {
                return Number(target);
            } else {
                let num = Number(target);

                if (!isNaN(num) &&
                    isBetween(num, numberInterval) &&
                    target[0] !== "+" // Most likely a telephone number.
                ) {
                    return num;
                } else {
                    return target;
                }
            }
        }

        case "object": {
            if (target === null) {
                return null;
            } else if (Array.isArray(target)) {
                return target.map(ensureType);
            } else {
                return Object.keys(target)
                    .filter(key => isOwnKey(target, key))
                    .reduce((result, key) => {
                        result[key] = ensureType(target[key]);
                        return result;
                    }, <Record<string, any>>{});
            }
        }

        default:
            return target;
    }
}