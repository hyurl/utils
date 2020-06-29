import "./types";
import count from "./count";
import define from "./define";
import diff from "./diff";
import ensureType from "./ensureType";
import flatObject from "./flatObject";
import getGlobal from "./getGlobal";
import isBetween from "./isBetween";
import isEmpty from "./isEmpty";
import isFloat from "./isFloat";
import isInteger from "./isInteger";
import isNumeric from "./isNumeric";
import isOwnKey from "./isOwnKey";
import isOwnMethod from "./isOwnMethod";
import isSubClassOf from "./isSubClassOf";
import isVoid from "./isVoid";
import keysOf from "./keysOf";
import omit from "./omit";
import omitVoid from "./omitVoid";
import patch from "./patch";
import pick from "./pick";
import rand from "./rand";
import randStr from "./randStr";
import sleep from "./sleep";
import sort from "./sort";
import split from "./split";
import timestamp from "./timestamp";
import typeAs from "./typeAs";
import typeOf from "./typeOf";
import until from "./until";
import useThrottle from "./useThrottle";
import wrap from "./wrap";

declare global {
    type Global = Ensured<Partial<NodeJS.Global & Window & typeof globalThis>, keyof Omit<NodeJS.Global,
        "Buffer" |
        "clearImmediate" |
        "gc" |
        "GLOBAL" |
        "global" |
        "process" |
        "root" |
        "setImmediate" |
        "v8debug">>;
}

export {
    count,
    define,
    diff,
    ensureType,
    flatObject,
    getGlobal,
    isBetween,
    isFloat,
    isInteger,
    isNumeric,
    isEmpty,
    isOwnKey,
    isOwnMethod,
    isSubClassOf,
    isVoid,
    keysOf,
    omit,
    omitVoid,
    patch,
    pick,
    rand,
    randStr,
    sleep,
    sort,
    split,
    timestamp,
    typeAs,
    typeOf,
    until,
    useThrottle,
    wrap
};