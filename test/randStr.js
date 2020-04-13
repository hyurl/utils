/* global describe, it */
const assert = require("assert");
const { randStr } = require("..");

describe("randStr", () => {
    it("should generate a random string", () => {
        let str = randStr(5);

        assert(/^[a-zA-Z0-9]{5}$/.test(str));
    });

    it("should generate a random string using the given chars", () => {
        let str = randStr(16, "abcdef");

        assert(/^[a-f]{16}$/.test(str));
    });
});