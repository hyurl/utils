/* global describe, it */
const assert = require("assert");
const until = require("../until").default;

describe("util", () => {
    it("should hang the execution context util the condition fits", async () => {
        let result = 0;
        let expected = 10;

        await until(() => (++result) === 10);
        assert.strictEqual(result, expected);
    });
});