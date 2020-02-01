/* global describe, it */
const assert = require("assert");
const keysOf = require("../keysOf").default;

describe("keysOf", () => {
    it("should return the string properties of the object", () => {
        let result = keysOf({
            foo: "Hello",
            bar: "World",
            [Symbol.toStringTag]: "Hello, World"
        });
        assert.deepStrictEqual(result, ["foo", "bar"]);
    });
});