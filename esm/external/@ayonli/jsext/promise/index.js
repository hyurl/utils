/** Try to resolve a promise with a timeout limit. */
/** Blocks the context for a given time. */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/** Blocks the context until the test is passed. */
async function until(test) {
    if (typeof globalThis.setImmediate === "undefined") {
        // @ts-ignore
        globalThis.setImmediate = (cb) => setTimeout(cb, 0);
    }
    do {
        await new Promise(globalThis.setImmediate);
    } while ((await test()) == false);
}

export { sleep, until };
//# sourceMappingURL=index.js.map