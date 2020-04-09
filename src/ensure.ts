import { isIterable } from "check-iterable";
import { Constructed } from "./types";
import isVoid from './isVoid';
import typeOf, { TypeNames } from './typeOf';
import ensureType from './ensureType';
import getGlobal from './getGlobal';
import isSubClassOf from './isSubClassOf';
import isEmpty from './isEmpty';

// HACK, prevent throwing error when the runtime doesn't support these types.
var BigInt: BigIntConstructor = getGlobal("BigInt") || new Function() as any;
var URL: typeof globalThis.URL = getGlobal("URL") || new Function() as any;
var Buffer: typeof global.Buffer = getGlobal("Buffer") || new Function() as any;

export default function ensure<T>(obj: any): T;
export default function ensure<T>(arr: any[], schema: [T], omitUntyped?: boolean): Constructed<T>[];
export default function ensure<T>(obj: any, schema: T, omitUntyped?: boolean): Constructed<T>;
export default function ensure<T>(obj: any, schema: T = null, omitUntyped = false) {
    return makeSure("", obj, schema, omitUntyped);
}

function makeSure<T>(
    field: string,
    value: any,
    schema: T,
    omitUntyped: boolean
): any {
    if (value === null) {
        return null;
    } else if (isVoid(schema)) {
        return ensureType(value);
    } else if (Array.isArray(schema)) {
        if (schema.length === 1) {
            if (Array.isArray(value)) {
                return value.map((o, i) => makeSure(
                    field ? `${field}.${i}` : String(i),
                    o,
                    schema[0],
                    omitUntyped
                ));
            } else {
                throwTypeError(field, "Array");
            }
        } else if (!isEmpty(field)) {
            throw new TypeError(
                `The array schema of ${field} should only contain one element`
            );
        } else {
            throw new TypeError(
                "An array schema should only contain one element"
            );
        }
    } else if (typeof value !== "object" || Array.isArray(value)) {
        throwTypeError(field, "Object");
    }

    let result = Reflect.ownKeys(<any>schema).reduce((result, prop) => {
        result[prop] = cast(
            field ? `${field}.${String(prop)}` : String(prop),
            value[prop], // value
            (<any>schema)[prop], // constructor or default value
            omitUntyped
        );

        return result;
    }, <any>{});

    if (!omitUntyped) {
        Reflect.ownKeys(value).forEach(prop => {
            if (!(prop in result)) {
                result[prop] = value[prop];
            }
        });
    }

    return result;
}

function isMapEntries(value: any) {
    return Array.isArray(value)
        && value.every(e => Array.isArray(e));
}

function couldBeBufferInput(value: any) {
    return typeof value === "string"
        || value instanceof Uint8Array
        || value instanceof ArrayBuffer
        || (typeof SharedArrayBuffer === "function" &&
            value instanceof SharedArrayBuffer)
        || (Array.isArray(value) && value.every(
            e => typeof e === "number" && e >= 0 && e <= 255
        ));
}

function isTypedArrayCtor(type: any): type is Uint8ArrayConstructor {
    return typeOf(type) === "class"
        && typeOf(type.from) === "function"
        && /(Big)?(Ui|I)nt(8|16|32|64)(Clamped)?Array$/.test(type.name);
}

function isErrorCtor(type: any): type is Constructor<Error> {
    return typeOf(type) === "class"
        && type === Error || isSubClassOf(type, Error);
}

function throwTypeError(
    field: string,
    type: string
) {
    let title = (/^AEIOU/i.test(type) ? "an" : "a") + " " + type;
    let msg = isEmpty(field)
        ? `The value must be ${title}`
        : `The value of ${field} is not ${title} and cannot be casted into one`;

    throw new TypeError(msg);
}

function getHandles(
    ctor: any,
    value: any
): [(type: TypeNames) => any, any, string?] {
    switch (ctor) {
        case String: return [() => String(value), ""];

        case Number: return [type => {
            let num: number;

            if (type === "number") {
                return value;
            } else if (type === "string" && !isNaN(num = Number(value))) {
                return num;
            }
        }, 0, "number"];

        case BigInt: return [type => {
            let num: number;

            if (type === "bigint") {
                return value;
            } else if (type === "number") {
                return BigInt(value);
            } else if (type === "string" && !isNaN(num = Number(value))) {
                return BigInt(num);
            }
        }, BigInt(0), "bigint"];

        case Boolean: return [type => {
            if (type === "boolean") {
                return value;
            } else if (type === "number" || type === "bigint") {
                return Number(value) === 0 ? false : true;
            } else if (type === "string") {
                value = value.trim();

                if (["true", "yes", "on", "1"].includes(value)) {
                    return true;
                } else if (["false", "no", "off", "0"].includes(value)) {
                    return false;
                }
            }
        }, false, "boolean"];

        case Symbol: return [type => {
            if (type === "symbol") {
                return value;
            } else if (type === "string"
                || type === "number"
                || type === "bigint"
            ) {
                return Symbol.for(String(value));
            }
        }, null, "symbol"];

        case Array: return [() => {
            if (Array.isArray(value)) {
                return value;
            } else if (isIterable(value)) {
                return Array.from(value);
            }
        }, () => <any[]>[]];

        case Object: return [() => {
            try {
                return { ...Object(value) };
            } catch (e) { }
        }, () => <any>null];

        case Date: return [type => {
            if (value instanceof Date) {
                return value;
            } else if (type === "string" || type === "number") {
                return new Date(value);
            }
        }, () => new Date()];

        case URL: return [type => {
            if (value instanceof URL) {
                return value;
            } else if (type === "string") {
                return new URL(value);
            }
        }, null];

        case RegExp: return [type => {
            if (value instanceof RegExp) {
                return value;
            } else if (type === "string") {
                value = value.trim();
                let i: number;

                if (value[0] === "/" && 0 !== (i = value.lastIndexOf("/"))) {
                    let pattern = value.slice(1, i);
                    let flags = value.slice(i + 1);

                    return new RegExp(pattern, flags);
                } else {
                    return new RegExp(value);
                }
            }
        }, null];

        case Map: return [() => {
            if (value instanceof Map) {
                return value;
            } else if (isMapEntries(value)) {
                return new Map(value);
            }
        }, () => new Map()];

        case Set: return [() => {
            if (value instanceof Set) {
                return value;
            } else if (Array.isArray(value)) {
                return new Set(value);
            }
        }, () => new Set()];

        case Buffer: return [() => {
            if (Buffer.isBuffer(value)) {
                return value;
            } else if (couldBeBufferInput(value)) {
                return Buffer.from(value);
            }
        }, () => Buffer.from([])];
    }
}

function cast(
    field: string,
    value: any,
    base: any,
    omitUntyped: boolean,
): any {
    let exists = !isVoid(value);
    let handles = getHandles(base, value);

    if (!isEmpty(handles)) {
        let [handle, defaultValue, label] = handles;
        let _type: TypeNames;

        if (exists) {
            let result = handle(typeOf(value) as TypeNames);

            if (result === void 0) {
                throwTypeError(field, label || (<Constructor<any>>base).name);
            } else {
                return result;
            }
        } else if ((_type = <TypeNames>typeOf(defaultValue)) === "function") {
            return defaultValue();
        } else if (_type === "class") {
            return new defaultValue();
        } {
            return defaultValue;
        }
    } else {
        let type = typeOf(base);

        if (type === "class") {
            if (exists && value instanceof base) {
                return value;
            } else if (isTypedArrayCtor(base)) {
                if (exists) {
                    if (isIterable(value)) {
                        try {
                            return base.from(value);
                        } catch (e) { }
                    }

                    throwTypeError(field, base.name);
                } else {
                    return base.from([]);
                }
            } else if (exists && isErrorCtor(base)) {
                let _type = typeof value;

                if (_type === "string") {
                    return new base(value);
                } else if (_type === "object"
                    && typeof value["name"] === "string"
                    && typeof value["message"] === "string"
                ) {
                    base = getGlobal(value["name"]) || base;
                    let err = Object.create(base.prototype);

                    if (err.name !== value["name"]) {
                        Object.defineProperty(err, "name", {
                            value: value["name"]
                        });
                    }

                    if (typeof value["stack"] === "string") {
                        Object.defineProperty(err, "stack", {
                            value: value["stack"]
                        });
                    }

                    return err;
                }

                throwTypeError(field, base.name);
            }

            return null;
        } else if (type === Object || Array.isArray(base)) {
            if (isEmpty(base)) { // short-hand of Object (`{}`) and Array (`[]`)
                return cast(
                    field,
                    value,
                    type === Object ? Object : Array,
                    omitUntyped
                );
            } else {  // sub-schema
                return makeSure(field, value, base, omitUntyped);
            }
        } else {
            return exists ? value : base;
        }
    }
}