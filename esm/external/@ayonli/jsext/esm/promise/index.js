/** Try to resolve a promise with a timeout limit. */
/** Blocks the context for a given time. */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/** Blocks the context until the test is passed. */
async function until(test) {
    while ((await test()) === false) {
        await new Promise(resolve => setTimeout(resolve));
    }
}

export { sleep, until };
//# sourceMappingURL=index.js.map
