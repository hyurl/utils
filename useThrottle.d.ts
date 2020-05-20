export default useThrottle;
/**
 * Uses throttle strategy on the given resource and returns a throttle function,
 * if a subsequent call happens within the `interval` time, the previous result
 * will be returned and the current `handle` function will not be invoked.
 *
 * NOTE: this function only creates the throttle function once and uses
 * `interval` only once, any later calls on the same `resource` will return the
 * initial throttle function.
 */
declare function useThrottle(resource: any, interval: number): <T, A extends any[]>(handle: (...args: A) => T | Promise<T>, ...args: A) => Promise<T>;
declare namespace useThrottle {
    var gcInterval: number;
    let gcTimer: any;
    const tasks: Map<any, ThrottleTask>;
}
declare type ThrottleTask = {
    interval: number;
    lastActive: number;
    cache: {
        value: any;
        error: any;
    };
    queue: Set<{
        resolve: (value: any) => void;
        reject: (err: any) => void;
    }>;
    func: <T, A extends any[]>(handle: (...args: A) => T | Promise<T>, ...args: A) => Promise<T>;
};
