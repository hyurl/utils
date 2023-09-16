/** @deprecated use `jsext.wrap` from `@ayonli/jsext` instead. */
declare const wrap: <T, Fn extends (this: T, ...args: any[]) => any>(fn: Fn, wrapper: (this: T, fn: Fn, ...args: Parameters<Fn>) => ReturnType<Fn>) => Fn;
export default wrap;
