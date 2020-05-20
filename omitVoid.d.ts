/**
 * Creates an object composed with only the non-void properties.
 * @param omitEmptyObjects If set, empty properties of type `object` will be
 *  removed as well.
 * @param omitEmptyStrings If set, empty properties of type `string` will be
 *  removed as well.
 */
export default function omitVoid<T>(target: T, deep?: boolean, omitEmptyObjects?: boolean, omitEmptyStrings?: boolean): T;
export declare function doOmit<T extends any>(target: T, deep: boolean, omitEmptyObjects: boolean, omitEmptyStrings: boolean, depth: number): T;
