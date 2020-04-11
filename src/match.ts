import { Constructed } from './types';
import getGlobal from './getGlobal';
import typeOf from './typeOf';
import { isVoid, isEmpty } from '.';

// HACK, prevent throwing error when the runtime doesn't support these types.
var BigInt: BigIntConstructor = getGlobal("BigInt") || new Function() as any;
var Buffer: typeof global.Buffer = getGlobal("Buffer") || new Function() as any;

export default function match<T>(
    arr: any[],
    schema: [T],
    extractMatch?: boolean
): arr is Constructed<T>[];
export default function match<T extends object>(
    obj: object,
    schema: T,
    extractMatch?: boolean
): obj is Constructed<T>;
export default function match<T extends object>(
    obj: any,
    schema: T,
    extractMatch = false
): obj is Constructed<T> {
    if (obj === null ||
        typeof obj !== "object" ||
        (Array.isArray(obj) && !Array.isArray(schema))
    ) {
        return false;
    } else if (Array.isArray(schema)) {
        if (schema.length === 1) {
            if (Array.isArray(obj)) {
                return obj.every(o => match(o, schema[0]));
            } else {
                return false;
            }
        } else {
            throw new TypeError(
                "An array schema should only contain one element"
            );
        }
    }

    let keys = Reflect.ownKeys(schema);

    if (extractMatch && Reflect.ownKeys(obj).some(key => !keys.includes(key))) {
        return false;
    }

    for (let prop of Reflect.ownKeys(schema)) {
        if (isVoid(obj[prop]) || !isOf(obj[prop], (<any>schema)[prop])) {
            return false;
        }
    }

    return true;
}

function isOf(value: any, base: any): boolean {
    switch (base) {
        case String: return typeof value === "string";

        case Number: return typeof value === "number";

        case BigInt: return typeof value === "bigint";

        case Boolean: return typeof value === "boolean";

        case Symbol: return typeof value === "string";

        case Object: return typeOf(value) === Object;

        case Array: return Array.isArray(value);

        case Buffer: return Buffer.isBuffer(value);

        default: {
            let type = typeOf(base);

            if (type === "class") {
                return value instanceof base;
            } else if (type === Object || Array.isArray(base)) {
                if (isEmpty(base)) { // short-hand of Object `{}` and Array `[]`
                    return isOf(value, type);
                } else { // sub-schema
                    return match(value, base);
                }
            } else {
                return value === base;
            }
        }
    }
}