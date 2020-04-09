declare global {
    type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

    type Ensured<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

    type Constructor<T> = Function & { new(...args: any[]): T; prototype: T; };

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

export type Constructed<T> = {
    [P in keyof T]: (
        T[P] extends typeof String ? string :
        T[P] extends typeof Number ? number :
        T[P] extends typeof BigInt ? bigint :
        T[P] extends typeof Boolean ? boolean :
        T[P] extends typeof Symbol ? symbol :
        T[P] extends typeof Object ? object :
        T[P] extends typeof Buffer ? Buffer :
        T[P] extends Constructor<infer R> ? R :
        T[P] extends Function ? T[P] :
        T[P] extends object ? Constructed<T[P]> :
        T[P]
    )
};