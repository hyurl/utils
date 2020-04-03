import { isIterable } from "check-iterable";
import { Constructed } from "./types";
import isVoid from './isVoid';
import typeOf from './typeOf';
import ensureType from './ensureType';
import getGlobal from './getGlobal';
import isSubClassOf from './isSubClassOf';
import isEmpty from './isEmpty';

type BasicTypes = "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";

// HACK, prevent throwing error when the runtime doesn't support these types.
var BigInt: BigIntConstructor = getGlobal("BigInt") || new Function() as any;
var URL: typeof globalThis.URL = getGlobal("URL") || new Function() as any;
var Buffer: typeof global.Buffer = getGlobal("Buffer") || new Function() as any;

export default function ensure<T>(obj: any): T;
export default function ensure<T>(arr: object[], schema: [T], omitUntyped?: boolean): Constructed<T>[];
export default function ensure<T extends any[]>(arr: object[], schema: T, omitUntyped?: boolean): Constructed<T>;
export default function ensure<T>(arr: object[], schema: T, omitUntyped?: boolean): Constructed<T>[];
export default function ensure<T>(obj: object, schema: T, omitUntyped?: boolean): Constructed<T>;
export default function ensure<T>(obj: any, schema: T = null, omitUntyped = false) {
    return makeSure("", obj, schema, omitUntyped);
}

function makeSure<T>(
    field: string,
    value: any,
    schema: T,
    omitUntyped: boolean
): any {
    if (value === null || typeof value !== "object") {
        return null;
    } else if (isVoid(schema)) {
        return ensureType(value);
    } else if (Array.isArray(value)) {
        if (Array.isArray(schema)) {
            if (schema.length === 0) {
                return value;
            } else if (schema.length === 1) {
                return value.map((o, i) => makeSure(
                    field ? `${field}.${i}` : String(i),
                    o,
                    schema[0],
                    omitUntyped
                ));
            } else {
                return schema.map((s, i) => isVoid(value[i]) ? null : makeSure(
                    field ? field + `${field}.${i}` : String(i),
                    value[i],
                    s,
                    omitUntyped
                ));
            }
        } else {
            return value.map((o, i) => makeSure(
                field ? `${field}.${i}` : String(i),
                o,
                schema,
                omitUntyped
            ));
        }
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
    return typeof type === "function"
        && typeof type.from === "function"
        && /(Big)?(Ui|I)nt(8|16|32|64)(Clamped)?Array$/.test(type.name);
}

function isErrorCtor(type: any): type is new (msg: string) => Error {
    return typeof type === "function"
        && type === Error || isSubClassOf(type, Error);
}

function throwTypeError(
    field: string,
    type: string
) {
    let title = (/^AEIOU/i.test(type) ? "an" : "a") + " " + type;

    throw new TypeError(
        `The value of ${field} is not ${title} and cannot be casted into one`
    );
}

function getHandles(
    ctor: any,
    value: any
): [(type: BasicTypes) => any, any, string?] {
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
        }, () => ({})];

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
    ctor: any,
    omitUntyped: boolean,
) {
    let exists = !isVoid(value);
    let handles = getHandles(ctor, value);

    if (!isEmpty(handles)) {
        let [handle, defaultValue, label] = handles;

        if (exists) {
            let result = handle(typeof value);

            if (result === void 0) {
                throwTypeError(field, label || (<Function>ctor).name);
            } else {
                return result;
            }
        } else {
            return defaultValue;
        }
    } else {
        let type = typeOf(ctor);

        if (type === "class") {
            if (exists && value instanceof ctor) {
                return value;
            } else if (isTypedArrayCtor(ctor)) {
                if (exists) {
                    if (isIterable(value)) {
                        try {
                            return ctor.from(value);
                        } catch (e) { }
                    }

                    throwTypeError(field, ctor.name);
                } else {
                    return ctor.from([]);
                }
            } else if (exists && isErrorCtor(ctor)) {
                let _type = typeof value;

                if (_type === "string") {
                    return new ctor(value);
                } else if (_type === "object"
                    && typeof value["name"] === "string"
                    && typeof value["message"] === "string"
                ) {
                    ctor = getGlobal(value["name"]) || ctor;
                    let err = Object.create(ctor.prototype);

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

                throwTypeError(field, ctor.name);
            }

            return null;
        } else if (type === Object // sub-schema
            && (typeOf(value) === Object) || (Array.isArray(value))
        ) {
            return makeSure(field, value, ctor, omitUntyped);
        } else {
            return ctor;
        }
    }
}