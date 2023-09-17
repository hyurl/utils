import isEmpty from './isEmpty.js';

// @ts-ignore
if (typeof setImmediate === "undefined") {
    // compatible with browsers
    var setImmediate = (cb) => setTimeout(cb, 0);
}
var useThrottle = useThrottle$1;
/**
 * Uses throttle strategy on the given resource and returns a throttle function,
 * if a subsequent call happens within the `interval` time, the previous result
 * will be returned and the current `handle` function will not be invoked.
 *
 * If `backgroundUpdate` is set, when reaching the `interval` time, the `handle`
 * function will be called in background and updates the result the when it's
 * done, the current call and any calls before the update will return the
 * previous result instead.
 *
 * NOTE: this function only creates the throttle function once and uses
 * `interval` only once, any later calls on the same `resource` will return the
 * initial throttle function.
 *
 * @deprecated this implementation is too complicated and redundant, use
 *  `jsext.throttle` from `@ayonli/jsext` instead.
 */
function useThrottle$1(resource, interval, backgroundUpdate = false) {
    if (interval < 1) {
        throw new RangeError("The 'interval' time for throttle must not be smaller than 1");
    }
    else if (!useThrottle$1.gcTimer) {
        let { gcInterval, tasks: jobs } = useThrottle$1;
        useThrottle$1.gcTimer = setInterval(() => {
            let now = Date.now();
            jobs.forEach(({ interval, lastActive }, key) => {
                if (now - lastActive > Math.max(interval + 5, gcInterval)) {
                    jobs.delete(key);
                }
            });
        }, gcInterval);
        if (typeof useThrottle$1.gcTimer.unref === "function") {
            useThrottle$1.gcTimer.unref();
        }
    }
    let task = useThrottle$1.tasks.get(resource);
    if (!task) {
        useThrottle$1.tasks.set(resource, task = createThrottleTask(interval, backgroundUpdate));
    }
    return task.func;
}
(function (useThrottle) {
    useThrottle.gcInterval = 30000;
    useThrottle.gcTimer = void 0;
    useThrottle.tasks = new Map();
})(useThrottle$1 || (useThrottle$1 = {}));
function createThrottleTask(interval, backgroundUpdate = false) {
    let task = {
        interval,
        lastActive: 0,
        cache: void 0,
        queue: new Set(),
        func: void 0,
        daemon: null,
    };
    async function throttle(handle, ...args) {
        if (backgroundUpdate && !this.daemon) {
            this.daemon = setInterval(() => { var _a; return (_a = this.func) === null || _a === void 0 ? void 0 : _a.call(this, handle, ...args); }, interval);
            if (typeof this.daemon.unref === "function") {
                this.daemon.unref();
            }
        }
        let now = Date.now();
        if ((now - this.lastActive) >= interval) {
            this.lastActive = now;
            if (backgroundUpdate && this.cache) {
                Promise.resolve(handle(...args)).then(result => {
                    this.cache = { value: result, error: null };
                }).catch(err => {
                    this.cache = { value: void 0, error: err };
                });
                if (this.cache.error)
                    throw this.cache.error;
                else
                    return this.cache.value;
            }
            else {
                // Clear cache before dispatching the new job.
                this.cache = void 0;
                let result;
                let error;
                try {
                    result = await handle(...args);
                    this.cache = { value: result, error: null };
                }
                catch (err) {
                    this.cache = { value: void 0, error: error = err };
                }
                // Resolve or reject subsequent jobs once the result is ready,
                // and make the procedure asynchronous so that they will be
                // performed after the current job.
                setImmediate(() => {
                    if (!isEmpty(this.queue)) {
                        this.queue.forEach((job) => {
                            error ? job.reject(error) : job.resolve(result);
                            this.queue.delete(job);
                        });
                    }
                });
                if (error)
                    throw error;
                else
                    return result;
            }
        }
        else if (this.cache) {
            if (this.cache.error)
                throw this.cache.error;
            else
                return this.cache.value;
        }
        else {
            return new Promise((resolve, reject) => {
                this.queue.add({ resolve, reject });
            });
        }
    }
    task.func = throttle.bind(task);
    return task;
}

export { useThrottle as default };
//# sourceMappingURL=useThrottle.js.map
