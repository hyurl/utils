/**
 * Hangs the execution context until the test is passed.
 */
export default async function until(test: () => boolean | Promise<boolean>) {
    if (typeof setImmediate === "undefined") {
        var setImmediate = (cb: () => void) => setTimeout(cb, 0);
    }

    do { await new Promise<void>(setImmediate); } while ((await test()) == false);
}
