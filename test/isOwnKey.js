/* global describe, it */
const assert = require("assert");
const { isOwnKey } = require("..");

describe("isOwnKey", () => {
    it("should pass for string property", () => {
        assert(isOwnKey({ foo: "Hello" }, "foo"));
    });

    it("should pass for numeric property", () => {
        assert(isOwnKey({ 1: "Hello" }, 1));
    });

    it("should pass for symbolic property", () => {
        let foo = Symbol("foo");
        assert(isOwnKey({ [foo]: "Hello" }, foo));
    });

    it("should fail if the property doesn't exist", () => {
        assert(!isOwnKey({}, "foo"));
    });

    it("should fail if the object is null", () => {
        assert(!isOwnKey(null, "foo"));
    });
});