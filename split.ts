import { isArrayLike, isBufferLike, isCollectionLike } from "https://lib.deno.dev/x/is_like@latest/index.js";
import type { RealArrayLike, TypedArray } from "https://lib.deno.dev/x/ayonli_jsext@latest/index.ts";

function checkNumberArgument(name: string, value: any) {
    if (typeof value !== "number") {
        throw new TypeError(`argument '${name}' must be a number`);
    } else if (value < 1) {
        throw new RangeError(`argument '${name}' must be 1 or higher`);
    }
}

function splitArrayLike(arr: ArrayLike<any>, length: number, total: number | undefined = void 0) {
    let result: any[] = [];

    for (let i = 0, j = (total || arr.length); i < j; i += length) {
        if (typeof (arr as RealArrayLike<any>).slice === "function") {
            result.push((arr as RealArrayLike<any>).slice(i, i + length));
        } else {
            result.push(Array.prototype.slice.call(arr, i, i + length));
        }
    }

    return result;
}

function splitBuffer(buf: Buffer, sep: string | Buffer) {
    let result: Buffer[] = [];
    let offset = 0;
    let length = sep.length;
    let total = buf.byteLength;

    while (offset < total) {
        let index = buf.indexOf(sep, offset);

        if (index !== -1) {
            result.push(buf.slice(offset, index));
            offset = index + length;
        } else {
            result.push(buf.slice(offset));
            offset = total;
        }
    }

    return result;
}

function splitObject(obj: any, size: number) {
    let proto = Object.getPrototypeOf(obj);
    let keyChunks = splitArrayLike(Object.keys(obj), size);
    let result = [];

    for (let keys of keyChunks) {
        let chunk = Object.create(proto);
        result.push(chunk);

        for (let key of keys) {
            chunk[key] = obj[key];
        }
    }

    return result;
}

function splitNumber(num: number, step: number) {
    let result: number[] = [];
    let offset = 0;

    while ((offset += step) <= num) {
        result.push(offset);
    }

    if (num > offset - step) {
        result.push(num);
    }

    return result;
}

/** Splits a string into chunks by the given separator. */
export default function split(str: string, separator: string | RegExp): string[];
/** Splits a string into chunks with the given length. */
export default function split(str: string, length: number): string[];
/** Splits a number into serials with the given step. */
export default function split(num: number, step: number): number[];
/** Splits a Buffer into chunks by the given separator. */
export default function split<T extends Buffer>(buf: T, separator: string | Buffer): T[];
/** Splits a Buffer, an ArrayBuffer, or a TypedArray into chunks with the given byteLength. */
export default function split<T extends Buffer | ArrayBufferLike | TypedArray>(buf: T, byteLength: number): T[];
/** Splits an array into chunks of arrays with the given length. */
export default function split<T extends Array<any>>(arr: T, length: number): T[];
/** Splits an array-like object into chunks of arrays with the given length. */
export default function split<T>(list: ArrayLike<T>, length: number): T[][];
/** Splits a collection into chunks with the given size. */
export default function split<T extends Set<any> | Map<any, any>>(collection: T, size: number): T[];
/** Splits an object into multiple objects with partial properties. */
export default function split<T extends object>(obj: T extends Function ? never : T, size: number): Partial<T>[];
export default function split(obj: any, sep: any) {
    if (arguments.length < 2) {
        throw new SyntaxError(`2 arguments required, received ${arguments.length}`);
    } else if (typeof obj === "string") {
        if (typeof sep === "string" || sep instanceof RegExp) {
            return obj.split(sep);
        } else {
            checkNumberArgument("length", sep);
            return splitArrayLike(obj, sep);
        }
    } else if (typeof obj === "number") {
        checkNumberArgument("step", sep);
        return splitNumber(obj, sep);
    } else if (typeof Buffer === "function"
        && Buffer.isBuffer(obj)
        && (typeof sep === "string" || Buffer.isBuffer(sep))
    ) {
        return splitBuffer(obj, sep);
    } else if (isBufferLike(obj)) {
        checkNumberArgument("byteLength", sep);
        return splitArrayLike(obj, sep, obj.byteLength);
    } else if (isArrayLike(obj, true)) {
        checkNumberArgument("length", sep);
        return splitArrayLike(obj, sep);
    } else if (isCollectionLike(obj)) {
        let ctor = obj["constructor"];
        checkNumberArgument("size", sep);
        return splitArrayLike([...obj], sep).map(list => new ctor(list));
    } else if (typeof obj === "object" && obj !== null) {
        checkNumberArgument("size", sep);
        return splitObject(obj, sep);
    } else {
        throw new TypeError("argument 'obj' must be a string, a number or an object");
    }
}
