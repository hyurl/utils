/** Try to resolve a promise with a timeout limit. */
/** Blocks the context for a given time. */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/** Blocks the context until the test is passed. */
async function until(test) {
    do {
        await new Promise(resolve => setTimeout(resolve));
    } while ((await test()) == false);
}

export { sleep, until };
//# sourceMappingURL=index.js.map
