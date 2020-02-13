/* global describe, it */
const assert = require("assert");
const { default: getGlobal } = require("../getGlobal");

describe("getGlobal", () => {
    it("should get the global object", () => {
        assert.strictEqual(getGlobal(), global);
    });

    it("should get a property from the global object", () => {
        assert.strictEqual(getGlobal("Buffer"), global.Buffer);
    });

    it("should get a user-defined property from the global object", () => {
        global["foo"] = "Hello, World!";
        assert.strictEqual(getGlobal("foo"), global["foo"]);
    });
});