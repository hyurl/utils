/* global describe, it */
const assert = require("assert");
const { sleep, timestamp } = require("..");

describe("sleep", () => {
    it("should delay for a while before assert", async () => {
        let ts = timestamp();
        await sleep(1000);
        assert.strictEqual(timestamp(), ts + 1);
    });
});