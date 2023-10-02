import { isBufferLike, isArrayLike, isCollectionLike } from 'https://ayonli.github.io/is-like/index.js';

function checkNumberArgument(name, value) {
    if (typeof value !== "number") {
        throw new TypeError(`argument '${name}' must be a number`);
    }
    else if (value < 1) {
        throw new RangeError(`argument '${name}' must be 1 or higher`);
    }
}
function splitArrayLike(arr, length, total = void 0) {
    let result = [];
    for (let i = 0, j = (total || arr.length); i < j; i += length) {
        if (typeof arr.slice === "function") {
            result.push(arr.slice(i, i + length));
        }
        else {
            result.push(Array.prototype.slice.call(arr, i, i + length));
        }
    }
    return result;
}
function splitBuffer(buf, sep) {
    let result = [];
    let offset = 0;
    let length = sep.length;
    let total = buf.byteLength;
    while (offset < total) {
        let index = buf.indexOf(sep, offset);
        if (index !== -1) {
            result.push(buf.slice(offset, index));
            offset = index + length;
        }
        else {
            result.push(buf.slice(offset));
            offset = total;
        }
    }
    return result;
}
function splitObject(obj, size) {
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
function splitNumber(num, step) {
    let result = [];
    let offset = 0;
    while ((offset += step) <= num) {
        result.push(offset);
    }
    if (num > offset - step) {
        result.push(num);
    }
    return result;
}
function split(obj, sep) {
    if (arguments.length < 2) {
        throw new SyntaxError(`2 arguments required, received ${arguments.length}`);
    }
    else if (typeof obj === "string") {
        if (typeof sep === "string" || sep instanceof RegExp) {
            return obj.split(sep);
        }
        else {
            checkNumberArgument("length", sep);
            return splitArrayLike(obj, sep);
        }
    }
    else if (typeof obj === "number") {
        checkNumberArgument("step", sep);
        return splitNumber(obj, sep);
    }
    else if (typeof Buffer === "function"
        && Buffer.isBuffer(obj)
        && (typeof sep === "string" || Buffer.isBuffer(sep))) {
        return splitBuffer(obj, sep);
    }
    else if (isBufferLike(obj)) {
        checkNumberArgument("byteLength", sep);
        return splitArrayLike(obj, sep, obj.byteLength);
    }
    else if (isArrayLike(obj, true)) {
        checkNumberArgument("length", sep);
        return splitArrayLike(obj, sep);
    }
    else if (isCollectionLike(obj)) {
        let ctor = obj["constructor"];
        checkNumberArgument("size", sep);
        return splitArrayLike([...obj], sep).map(list => new ctor(list));
    }
    else if (typeof obj === "object" && obj !== null) {
        checkNumberArgument("size", sep);
        return splitObject(obj, sep);
    }
    else {
        throw new TypeError("argument 'obj' must be a string, a number or an object");
    }
}

export { split as default };
//# sourceMappingURL=split.js.map
