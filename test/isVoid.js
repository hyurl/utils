/* global describe, it */
const assert = require("assert");
const { isVoid } = require("..");

describe("isVoid", () => {
    it("should pass for null", () => {
        assert(isVoid(null));
    });

    it("should pass for undefined", () => {
        assert(isVoid(void 0));
    });

    it("should pass for NaN", () => {
        assert(isVoid(NaN));
    });

    it("should fail for non-void values", () => {
        assert(!isVoid(false));
        assert(!isVoid(true));
        assert(!isVoid(0));
        assert(!isVoid(123));
        assert(!isVoid({}));
        assert(!isVoid([]));
    });
});