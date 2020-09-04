/// <reference types="node" />
export declare type Global = Ensured<Partial<NodeJS.Global & Window & typeof globalThis>, keyof Omit<NodeJS.Global, "Buffer" | "clearImmediate" | "gc" | "GLOBAL" | "global" | "process" | "root" | "setImmediate" | "v8debug">>;
/** Gets the global object of the host environment. */
export default function getGlobal(): Global;
/** Returns a property from the global object. */
export default function getGlobal<P extends keyof Global>(prop: P): Global[P];
/** Returns a property from the global object. */
export default function getGlobal(prop: string): any;
