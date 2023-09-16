declare global {
    type DiffKeys<T, U> = {
        [K in keyof T]: K extends keyof U ? never : K;
    }[keyof T];
    type Diff<T, U> = Pick<T & U, DiffKeys<T, U> | DiffKeys<U, T>>;
    type DeepPartial<T> = {
        [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
    };
    type Callable<T extends any = any, A extends any[] = any[]> = (...args: A) => T;
    type ResolveType<T extends Callable> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;
    type Asynchronize<T extends Callable> = ReturnType<T> extends Promise<any> ? T : (ReturnType<T> extends (AsyncIterableIterator<infer U> | IterableIterator<infer U>) ? (...args: Parameters<T>) => AsyncIterableIterator<U> : (...args: Parameters<T>) => Promise<ReturnType<T>>);
    type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
    type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
    type FunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T];
    type NonFunctionPropertyNames<T> = {
        [K in keyof T]: T[K] extends Function ? never : K;
    }[keyof T];
}
export {};
