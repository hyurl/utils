export type Global = Ensured<Partial<NodeJS.Global & Window & typeof globalThis>, keyof Omit<NodeJS.Global,
    "Buffer" |
    "clearImmediate" |
    "gc" |
    "GLOBAL" |
    "global" |
    "process" |
    "root" |
    "setImmediate" |
    "v8debug">>;

/** Gets the global object of the host environment. */
export default function getGlobal(): Global;
/** Returns a property from the global object. */
export default function getGlobal<P extends keyof Global>(prop: P): Global[P];
/** Returns a property from the global object. */
export default function getGlobal(prop: string): any;
export default function getGlobal(prop: string = void 0): any {
    let _global: Global & { [prop: string]: any; };

    if (typeof globalThis === "object") {
        _global = <any>globalThis;
    } else if (typeof self === "object") {
        _global = self;
    } else if (typeof global === "object") {
        _global = <any>global;
    } else if (typeof window === "object") {
        _global = window;
    }

    return _global && (prop ? _global[prop] : _global);
}
