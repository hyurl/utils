import type { Constructor, TypedArray } from "@ayonli/jsext";
type OmitChildrenNodes<T> = Pick<T, {
    [K in keyof T]: T[K] extends TypedArray ? K : T[K] extends (any[] | ArrayLike<any> | Function | Constructor<any> | Map<any, any> | Set<any> | Promise<any> | TypedArray) ? K : T[K] extends object ? never : K;
}[keyof T]>;
type OmitChildrenElements<T> = Pick<T, {
    [K in keyof T]: T[K] extends TypedArray ? K : T[K] extends (Function | Constructor<any> | Map<any, any> | Set<any> | Promise<any> | TypedArray) ? K : T[K] extends (object | any[] | ArrayLike<any>) ? never : K;
}[keyof T]>;
/**
 * Create an object with flatted properties of the original object, the children
 * nodes' properties will be transformed to a string-represented path.
 * NOTE: this function also flat array/array-like nodes (except for TypedArray).
 * @param depth Default value: `1`.
 * @example
 *  flatObject({ foo: { bar: "Hello, World!" } }) === { "foo.bar": "Hello, World!" }
 */
export default function flatObject<T extends object>(obj: T, depth?: number): OmitChildrenNodes<T> & Record<string | symbol, any>;
export default function flatObject<T extends object>(obj: T, depth: number, flatArray: true): OmitChildrenElements<T> & Record<string | symbol, any>;
export {};
