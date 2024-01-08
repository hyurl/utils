import throttle from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/throttle.js';

/**
 * @deprecated use `jsext.throttle` from `@ayonli/jsext` instead.
 */
function useThrottle(resource, interval, backgroundUpdate = false) {
    return (handle, ...args) => {
        return Promise.resolve(throttle(handle, {
            duration: interval,
            for: resource,
            noWait: backgroundUpdate,
        })(...args));
    };
}

export { useThrottle as default };
//# sourceMappingURL=useThrottle.js.map
