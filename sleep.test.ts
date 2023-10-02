import * as assert from "node:assert";
import { sleep, timestamp } from "./index.ts";

describe("sleep", () => {
    it("should delay for a while before assert", async () => {
        let ts = timestamp();
        await sleep(1000);
        assert.strictEqual(timestamp(), ts + 1);
    });
});
