import keysOf from './keysOf';
import isVoid from './isVoid';
import isRealObject from './isRealObject';
import { isArrayLike, isBufferLike } from 'is-like';

type OmitChildrenNodes<T> = Pick<T, {
    [K in keyof T]: T[K] extends TypedArray
    ? K
    : T[K] extends (any[] | ArrayLike<any> | Function | Constructor<any> | Map<any, any> | Set<any> | Promise<any> | TypedArray)
    ? K
    : T[K] extends object
    ? never
    : K;
}[keyof T]>;

type OmitChildrenElements<T> = Pick<T, {
    [K in keyof T]: T[K] extends TypedArray
    ? K
    : T[K] extends (Function | Constructor<any> | Map<any, any> | Set<any> | Promise<any> | TypedArray)
    ? K
    : T[K] extends (object | any[] | ArrayLike<any>)
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
    depth?: number
): OmitChildrenNodes<T> & Record<string | symbol, any>;
export default function flatObject<T extends object>(
    obj: T,
    depth: number,
    flatArray: true
): OmitChildrenElements<T> & Record<string | symbol, any>;
export default function flatObject(obj: any, depth = 1, flatArray = false) {
    return flatDeep({}, obj, void 0, 0, depth, flatArray);
}

function flatDeep(
    carrier: any,
    source: any,
    field: string,
    depth: number,
    maxDepth: number,
    flatArray: boolean
) {
    let isArr: boolean;
    let isObj: boolean;
    let isContent = !isVoid(field);

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
                    isContent ? `${field}.${key}` : key,
                    isContent ? depth + 1 : depth,
                    maxDepth,
                    flatArray
                );
            }
        });
    } else if (isArr) {
        if (flatArray) {
            for (let i = 0, len = (<any[]>source).length; i < len; ++i) {
                flatDeep(
                    carrier,
                    (<any[]>source)[i],
                    isContent ? `${field}.${i}` : String(i),
                    isContent ? depth + 1 : depth,
                    maxDepth,
                    flatArray
                );
            }
        } else if (depth > 0) {
            carrier[field] = source;
        }
    }

    return carrier;
}
