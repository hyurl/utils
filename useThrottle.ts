import throttle from "https://lib.deno.dev/x/ayonli_jsext@latest/throttle.ts";

export default useThrottle;

/**
 * @deprecated use `jsext.throttle` from `@ayonli/jsext` instead.
 */
function useThrottle(resource: any, interval: number, backgroundUpdate = false) {
    return <T, A extends any[]>(handle: (...args: A) => T | Promise<T>, ...args: A) => {
        return Promise.resolve(throttle(handle as (...args: any[]) => T, {
            duration: interval,
            for: resource,
            noWait: backgroundUpdate,
        })(...args))
    }
}
