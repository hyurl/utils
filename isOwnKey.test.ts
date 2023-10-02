import * as assert from "node:assert";
import { isOwnKey } from "./index.ts";

describe("isOwnKey", () => {
    it("should pass for string property", () => {
        assert.ok(isOwnKey({ foo: "Hello" }, "foo"));
    });

    it("should pass for numeric property", () => {
        assert.ok(isOwnKey({ 1: "Hello" }, 1));
    });

    it("should pass for symbolic property", () => {
        let foo = Symbol("foo");
        assert.ok(isOwnKey({ [foo]: "Hello" }, foo));
    });

    it("should fail if the property doesn't exist", () => {
        assert.ok(!isOwnKey({}, "foo"));
    });
});
