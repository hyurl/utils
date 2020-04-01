import { isIterable } from "check-iterable";
import { Typed } from "./match";
import isVoid from './isVoid';
import typeOf from './typeOf';
import ensureType from './ensureType';

if (typeof BigInt === "undefined") {
    // HACK, prevent throwing error when the runtime doesn't support BigInt.
    var BigInt: BigIntConstructor = new Function() as any;
}

export default function ensure<T>(obj: any): T;
export default function ensure<T>(arr: object[], schema: [T]): Typed<T>[];
export default function ensure<T extends any[]>(arr: object[], schema: T): Typed<T>;
export default function ensure<T>(arr: object[], schema: T): Typed<T>[];
export default function ensure<T>(obj: object, schema: T): Typed<T>;
export default function ensure<T>(obj: any, schema: T = null) {
    if (typeof obj !== "object") {
        return null;
    } else if (isVoid(schema)) {
        return ensureType(obj);
    } else if (Array.isArray(obj)) {
        if (Array.isArray(schema)) {
            if (schema.length === 0) {
                return obj;
            } else if (schema.length === 1) {
                return obj.map(e => ensure(e, schema[0]));
            } else {
                return schema.map((s, i) => obj[i] ?? ensure(obj[i], s));
            }
        } else {
            return obj.map(e => ensure(e, schema));
        }
    }

    return Reflect.ownKeys(<any>schema).reduce((result: any, prop: string) => {
        result[prop] = cast(obj[prop], (<any>schema)[prop]);
        return result;
    }, {});
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

function isTypedArrayCtor(type: any): type is Pick<Uint8ArrayConstructor, "from"> {
    return typeof type === "function"
        && typeof type.from === "function"
        && /(Big)?(Ui|I)nt(8|16|32|64)(Clamped)?Array$/.test(type.name);
}

function cast(value: any, type: any) {
    let exists = !isVoid(value);

    switch (type) {
        case String:
            return exists ? String(value) : "";

        case Number:
            return exists ? Number(value) : 0;

        case BigInt:
            return exists
                ? (typeof value === "bigint"
                    ? value
                    : BigInt(Number(value) || 0))
                : BigInt(0);

        case Boolean:
            return exists ? Boolean(value) : false;

        case Symbol: {
            if (exists) {
                let _type = typeof value;

                if (_type === "symbol") {
                    return value;
                } else if (_type === "string" || _type === "number") {
                    return Symbol.for(String(value));
                }
            }

            return void 0;
        }

        case Array:
            return exists
                ? (Array.isArray(value)
                    ? value
                    : (isIterable(value) ? Array.from(value) : [])) : [];

        case Object:
            return exists ? Object.assign({}, Object(value)) : {};

        case Date: {
            if (exists) {
                if (value instanceof Date) {
                    return value;
                } else {
                    return new Date(value);
                }
            } else {
                return new Date();
            }
        }

        case RegExp: {
            if (exists) {
                if (value instanceof RegExp) {
                    return value;
                } else if (typeof value === "string") {
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
            }

            return null;
        }

        case Map: {
            if (exists) {
                if (value instanceof Map) {
                    return value;
                } else if (isMapEntries(value)) {
                    return new Map(value);
                }
            }

            return new Map();
        }

        case Set: {
            if (exists) {
                if (value instanceof Set) {
                    return value;
                } else if (Array.isArray(value)) {
                    return new Set(value);
                }
            }

            return new Map();
        }

        case Buffer: {
            if (exists) {
                if (Buffer.isBuffer(value)) {
                    return value;
                } else if (couldBeBufferInput(value)) {
                    return Buffer.from(value);
                }
            }

            return Buffer.from([]);
        }

        default: {
            let _type = typeOf(type);

            if (_type === "class") {
                if (exists && value instanceof type) {
                    return value;
                } else if (isTypedArrayCtor(type)) {
                    try {
                        return type.from(Array.isArray(value) ? value : []);
                    } catch (e) {
                        return type.from([]);
                    }
                }

                return null;
            } else if (_type === Object // sub-schema
                && (typeOf(value) === Object) || (Array.isArray(value))
            ) {
                return ensure(value, type);
            } else {
                return type;
            }
        }
    }
}