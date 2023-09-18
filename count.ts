import { isArrayLike, isBufferLike, isCollectionLike } from "is-like";

const encoder = new TextEncoder();

export default count;

/** Counts the length of a string. */
function count(str: string, byteLength?: boolean): number;
/** Counts how many times a substring appeared in the given string. */
function count(str: string, substr: string): number;
/** Counts the length of an array-like object. */
function count<T>(arr: ArrayLike<T>): number;
/** Counts how many times an element appeared in the given array-like object. */
function count<T>(arr: ArrayLike<T>, ele: T): number;
/** Counts the size of a collection. */
function count(collection: Map<any, any> | Set<any>): number;
/** Counts the capacity of an object (of how many properties it has). */
function count(obj: any): number;
function count(target: any, option: any = void 0) {
    if (typeof target === "string") {
        if (typeof option === "string") {
            if (!option) {
                return target.length + 1;
            } else if (!target) {
                return 0;
            }

            return target.split(option).length - 1;
        } else if (option === true) {
            if (typeof Buffer === "function" &&
                typeof Buffer.byteLength === "function"
            ) {
                return Buffer.byteLength(target);
            } else {
                return encoder.encode(target).byteLength;
            }
        } else {
            return target.length;
        }
    } else if (isArrayLike(target, true)) {
        if (arguments.length === 2) {
            let times = 0;

            for (let i = target.length; i--;) {
                // treat 0 equals -0 and NaN equals NaN
                if (target[i] === option || Object.is(target[i], option)) {
                    times++;
                }
            }

            return times;
        } else {
            return target.length;
        }
    } else if (isBufferLike(target)) {
        return target.byteLength;
    } else if (isCollectionLike(target, true)) {
        return target.size;
    } else {
        return Object.keys(target).length;
    }
}
