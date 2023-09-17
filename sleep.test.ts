import * as assert from "assert";
import { describe, it } from "mocha";
import { sleep, timestamp } from ".";

describe("sleep", () => {
    it("should delay for a while before assert", async () => {
        let ts = timestamp();
        await sleep(1000);
        assert.strictEqual(timestamp(), ts + 1);
    });
});
