/* global describe, it */
const assert = require("assert");
const { isFloat } = require("..");

describe("isFloat", () => {
    it("should pass for a clear float number", () => {
        assert(isFloat(1.23));
    });

    it("should pass for Infinity and -Infinity", () => {
        assert(isFloat(Infinity));
        assert(isFloat(-Infinity));
    });

    it("should pass for Number.MIN_VALUE", () => {
        assert(isFloat(Number.MIN_VALUE));
    });

    it("should fail for an integer", () => {
        assert(!isFloat(123));
    });

    it("should fail for NaN", () => {
        assert(!isFloat(NaN));
    });

    it("should fail for Number.MAX_VALUE", () => {
        assert(!isFloat(Number.MAX_VALUE));
    });

    it("should fail for non-number values", () => {
        assert(!isFloat("1.23"));
    });
});