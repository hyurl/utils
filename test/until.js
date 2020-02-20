/* global describe, it */
const assert = require("assert");
const { until } = require("..");

describe("until", () => {
    it("should hang the execution context until the condition fits", async () => {
        let result = 0;
        let expected = 10;

        await until(() => (++result) === 10);
        assert.strictEqual(result, expected);
    });
});