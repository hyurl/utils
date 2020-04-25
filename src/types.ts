declare global {
    type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

    type Ensured<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

    type Constructor<T> = Function & { new(...args: any[]): T; prototype: T; };

    type Callable<T extends any = any, A extends any[] = any[]> = (...args: A) => T;

    type ResolveType<T extends Callable> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;

    type Asynchronize<T extends Callable> = (...args: Parameters<T>) => Promise<ResolveType<T>>;

    type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

    type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

    type FunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? K : never
    }[keyof T];

    type NonFunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? never : K
    }[keyof T];

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