import { createRequire } from "https://deno.land/std/node/module.ts";
import * as _ from "./types.d.ts";
import _count from "./count.d.ts";
import _define from "./define.d.ts";
import _diff from "./diff.d.ts";
import _ensureType from "./ensureType.d.ts";
import _flatObject from "./flatObject.d.ts";
import _getGlobal from "./getGlobal.d.ts";
import _isBetween from "./isBetween.d.ts";
import _isEmpty from "./isEmpty.d.ts";
import _isFloat from "./isFloat.d.ts";
import _isInteger from "./isInteger.d.ts";
import _isNumeric from "./isNumeric.d.ts";
import _isOwnKey from "./isOwnKey.d.ts";
import _isOwnMethod from "./isOwnMethod.d.ts";
import _isRealObject from "./isRealObject.d.ts";
import _isSubClassOf from "./isSubClassOf.d.ts";
import _isVoid from "./isVoid.d.ts";
import _keysOf from "./keysOf.d.ts";
import _omit from "./omit.d.ts";
import _omitVoid from "./omitVoid.d.ts";
import _patch from "./patch.d.ts";
import _pick from "./pick.d.ts";
import _rand from "./rand.d.ts";
import _randStr from "./randStr.d.ts";
import _sleep from "./sleep.d.ts";
import _sort from "./sort.d.ts";
import _timestamp from "./timestamp.d.ts";
import _typeAs from "./typeAs.d.ts";
import _typeOf from "./typeOf.d.ts";
import _until from "./until.d.ts";
import _useThrottle from "./useThrottle.d.ts";
import _wrap from "./wrap.d.ts";

declare global {
    type Global = Partial<Window & typeof globalThis>;
}

// Because the `spilt` module has some Node.js special types that cannot be
// identified by Deno, we need to declare an individual type for it, but don't
// worry, the original function will still work for both platforms.
declare const _split: {
    /** Splits a string into chunks by the given separator. */
    (str: string, separator: string | RegExp): string[];
    /** Splits a string into chunks with the given length. */
    (str: string, length: number): string[];
    /** Splits a number into serials with the given step. */
    (num: number, step: number): number[];
    /** Splits an ArrayBuffer, or a TypedArray into chunks with the given byteLength. */
    <T extends ArrayBufferLike | TypedArray>(buf: T, byteLength: number): T[];
    /** Splits an array into chunks of arrays with the given length. */
    <T extends Array<any>>(arr: T, length: number): T[];
    /** Splits an array-like object into chunks of arrays with the given length. */
    <T>(list: ArrayLike<T>, length: number): T[][];
    /** Splits a collection into chunks with the given size. */
    <T extends Set<any> | Map<any, any>>(collection: T, size: number): T[];
    /** Splits an object into multiple objects with partial properties. */
    <T extends object>(obj: T extends Function ? never : T, size: number): Partial<T>[];
}

const _require = createRequire(import.meta.url);
const utils = _require("./bundle");

export const count: typeof _count = utils.count;
export const define: typeof _define = utils.define;
export const diff: typeof _diff = utils.diff;
export const ensureType: typeof _ensureType = utils.ensureType;
export const flatObject: typeof _flatObject = utils.flatObject;
export const getGlobal: typeof _getGlobal = utils.getGlobal;
export const isBetween: typeof _isBetween = utils.isBetween;
export const isEmpty: typeof _isEmpty = utils.isEmpty;
export const isFloat: typeof _isFloat = utils.isFloat;
export const isInteger: typeof _isInteger = utils.isInteger;
export const isNumeric: typeof _isNumeric = utils.isNumeric;
export const isOwnKey: typeof _isOwnKey = utils.isOwnKey;
export const isOwnMethod: typeof _isOwnMethod = utils.isOwnMethod;
export const isRealObject: typeof _isRealObject = utils.isRealObject;
export const isSubClassOf: typeof _isSubClassOf = utils.isSubClassOf;
export const isVoid: typeof _isVoid = utils.isVoid;
export const keysOf: typeof _keysOf = utils.keysOf;
export const omit: typeof _omit = utils.omit;
export const omitVoid: typeof _omitVoid = utils.omitVoid;
export const patch: typeof _patch = utils.patch;
export const pick: typeof _pick = utils.pick;
export const rand: typeof _rand = utils.rand;
export const randStr: typeof _randStr = utils.randStr;
export const sleep: typeof _sleep = utils.sleep;
export const sort: typeof _sort = utils.sort;
export const split: typeof _split = utils.spilt;
export const timestamp: typeof _timestamp = utils.timestamp;
export const typeAs: typeof _typeAs = utils.typeAs;
export const typeOf: typeof _typeOf = utils.typeOf;
export const until: typeof _until = utils.until;
export const useThrottle: typeof _useThrottle = utils.useThrottle;
export const wrap: typeof _wrap = utils.wrap;