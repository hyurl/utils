import isEmpty from './isEmpty';

/**
 * Creates a throttled function based on the `handle` function; if a subsequent
 * call happens within the `interval` time, the previous result will be returned
 * and the `handle` function will not be invoked.
 */
export default function throttle<T extends any, A extends any[] = any[]>(
    handle: (...args: A) => T,
    interval: number,
    ...args: A
): () => T {
    if (interval < 1) {
        throw new RangeError(
            "The 'interval' time for throttle must not be smaller than 1"
        );
    }

    let cache: { value: T, error: any, async?: boolean };
    let lastInvokeTime = 0;
    let queue = new Set<{
        resolve: (value: T) => void,
        reject: (err: any) => void;
    }>();

    if (typeof setImmediate === "undefined") {
        // compatible with browsers
        var setImmediate = (cb: () => void) => setTimeout(cb, 0);
    }

    return () => {
        let now = Date.now();

        if ((now - lastInvokeTime) >= interval) {
            // Clear cache and update the invoke time before dispatching the new
            // job.
            cache = void 0;
            lastInvokeTime = now;

            let result: T;

            try {
                result = handle(...args);
            } catch (err) {
                cache = { value: void 0, error: err };
                throw err;
            }

            if (typeof result["then"] !== "function") { // synchronous call
                cache = { value: result, error: null };
                return result;
            }

            // For Promise-like result (asynchronous call), resolve the final
            // result and trigger waiting jobs to finish once the result is
            // ready.
            return (async () => {
                let value: any;
                let error: any;

                try {
                    value = await <Promise<any>><unknown>result;
                    cache = { value, error: null, async: true };
                } catch (e) {
                    error = e;
                    cache = { value: void 0, error, async: true };
                }

                // Resolve or reject subsequent jobs once the result is ready,
                // and make the procedure asynchronous so that they will be
                // performed after the current job.
                setImmediate(() => {
                    if (!isEmpty(queue)) {
                        queue.forEach((job) => {
                            error ? job.reject(error) : job.resolve(value);
                            queue.delete(job);
                        });
                    }
                });

                if (error)
                    throw error;
                else
                    return value;
            })() as any;
        } else if (cache) {
            if (cache.error) {
                if (cache.async) {
                    return Promise.reject(cache.error);
                } else {
                    throw cache.error;
                }
            } else {
                return cache.async
                    ? Promise.resolve(cache.value)
                    : cache.value;
            }
        } else {
            // This block will only be entered when the `handle` function
            // is asynchronous, since synchronous throttled function calls
            // will run in sequence and `history` will always be available.
            // So it's OK here to return a Promise.
            return new Promise((resolve, reject) => {
                queue.add({ resolve, reject });
            });
        }
    };
}