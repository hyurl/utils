import keysOf from './keysOf';
import isRealObject from './isRealObject';
import { isArrayLike, isBufferLike } from 'is-like';

type OmitChildrenNodes<T> = Pick<T, {
    [K in keyof T]: T[K] extends TypedArray
    ? K
    : T[K] extends (any[] | ArrayLike<any>)
    ? never
    : T[K] extends (Function | Map<any, any> | Set<any> | Promise<any>)
    ? K
    : T[K] extends object
    ? never
    : K;
}[keyof T]>;

/**
 * Create an object with flatted properties of the original object, the children
 * nodes' properties will be transformed to a string-represented path.
 * NOTE: this function also flat array/array-like nodes (except for TypedArray).
 * @param depth Default value: `1`.
 * @example
 *  flatObject({ foo: { bar: "Hello, World!" } }) === { "foo.bar": "Hello, World!" }
 */
export default function flatObject<T extends object>(
    obj: T,
    depth = 1
): OmitChildrenNodes<T> & Record<string | symbol, any> {
    return flatDeep({}, obj, "", 0, depth);
}

function flatDeep(
    carrier: any,
    source: any,
    field: string,
    depth: number,
    maxDepth: number
) {
    let isArr: boolean;
    let isObj: boolean;

    if (depth === maxDepth || (
        !(isArr = isArrayLike(source, true) && !isBufferLike(source)) &&
        !(isObj = isRealObject(source))
    )) {
        carrier[field] = source;
    } else if (isObj) {
        keysOf(<object>source).forEach((key: string | symbol) => {
            let value = source[key];

            if (typeof key === "symbol") {
                if (depth === 0) { // only allow top-level symbol properties
                    carrier[key] = value;
                }
            } else {
                flatDeep(
                    carrier,
                    value,
                    field ? `${field}.${key}` : key,
                    depth,
                    maxDepth
                );
            }
        });
    } else if (isArr) {
        for (let i = 0, len = (<any[]>source).length; i < len; ++i) {
            flatDeep(
                carrier,
                (<any[]>source)[i],
                field ? `${field}.${i}` : String(i),
                depth + 1,
                maxDepth
            );
        }
    }

    return carrier;
}
