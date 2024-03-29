import type { Ensured } from "https://lib.deno.dev/x/ayonli_jsext@latest/index.ts";

export type Global = Ensured<Partial<Window & typeof globalThis>, keyof Window & typeof globalThis>;

/** Gets the global object of the host environment. */
export default function getGlobal(): Global;
/** Returns a property from the global object. */
export default function getGlobal<P extends keyof Global>(prop: P): Global[P];
/** Returns a property from the global object. */
export default function getGlobal(prop: string): any;
export default function getGlobal(prop: string | undefined = void 0): any {
    let _global: Global & { [prop: string]: any; } | undefined;

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
