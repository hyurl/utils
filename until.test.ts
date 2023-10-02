import * as assert from "node:assert";
import { until } from "./index.ts";

describe("until", () => {
    it("should hang the execution context until the condition fits", async () => {
        let result = 0;
        let expected = 10;

        await until(() => (++result) === 10);
        assert.strictEqual(result, expected);
    });
});
