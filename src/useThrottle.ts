import isEmpty from './isEmpty';

if (typeof setImmediate === "undefined") {
    // compatible with browsers
    var setImmediate = (cb: () => void) => setTimeout(cb, 0);
}

export default useThrottle;

/**
 * Uses throttle strategy on the given resource and returns a throttle function,
 * if a subsequent call happens within the `interval` time, the previous result
 * will be returned and the current `handle` function will not be invoked.
 */
function useThrottle(resource: any, interval: number) {
    if (interval < 1) {
        throw new RangeError(
            "The 'interval' time for throttle must not be smaller than 1"
        );
    } else if (!useThrottle.gcTimer) {
        let { gcInterval, jobs } = useThrottle;

        process.on("beforeExit", () => clearInterval(useThrottle.gcTimer));
        useThrottle.gcTimer = setInterval(() => {
            let now = Date.now();

            jobs.forEach(({ interval, lastActive }, key) => {
                if (now - lastActive > Math.max(interval + 5, gcInterval)) {
                    jobs.delete(key);
                }
            });
        }, gcInterval);
    }

    useThrottle.jobs.set(resource, {
        interval,
        lastActive: 0,
        cache: void 0,
        queue: new Set()
    });

    return async <T, A extends any[]>(
        handle: (...args: A) => T | Promise<T>,
        ...args: A
    ): Promise<T> => {
        let throttle = useThrottle.jobs.get(resource);
        let now = Date.now();

        if ((now - throttle.lastActive) >= interval) {
            // Clear cache and update the invoke time before dispatching the new
            // job.
            throttle.cache = void 0;
            throttle.lastActive = now;

            let result: T;
            let error: any;

            try {
                result = await handle(...args);
            } catch (err) {
                throttle.cache = { value: void 0, error: error = err };
            }

            // Resolve or reject subsequent jobs once the result is ready,
            // and make the procedure asynchronous so that they will be
            // performed after the current job.
            setImmediate(() => {
                if (!isEmpty(throttle.queue)) {
                    throttle.queue.forEach((job) => {
                        error ? job.reject(error) : job.resolve(result);
                        throttle.queue.delete(job);
                    });
                }
            });

            if (error)
                throw error;
            else
                return result;
        } else if (throttle.cache) {
            if (throttle.cache.error)
                throw throttle.cache.error;
            else
                return throttle.cache.value as T;
        } else {
            return new Promise<T>((resolve, reject) => {
                throttle.queue.add({ resolve, reject });
            });
        }
    };
}

namespace useThrottle {
    export var gcInterval = 30000;
    export let gcTimer: NodeJS.Timer = null;
    export const jobs = new Map<any, {
        interval: number;
        lastActive: number;
        cache: { value: any, error: any };
        queue: Set<{ resolve: (value: any) => void, reject: (err: any) => void; }>
    }>();
}