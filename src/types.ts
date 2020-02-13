declare global {
    type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

    type Ensured<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

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

export { };