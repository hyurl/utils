import * as assert from "node:assert";
import { isFloat } from "./index.ts";

describe("isFloat", () => {
    it("should pass for a clear float number", () => {
        assert.ok(isFloat(1.23));
    });

    it("should pass for Infinity and -Infinity", () => {
        assert.ok(isFloat(Infinity));
        assert.ok(isFloat(-Infinity));
    });

    it("should pass for Number.MIN_VALUE", () => {
        assert.ok(isFloat(Number.MIN_VALUE));
    });

    it("should fail for an integer", () => {
        assert.ok(!isFloat(123));
    });

    it("should fail for NaN", () => {
        assert.ok(!isFloat(NaN));
    });

    it("should fail for Number.MAX_VALUE", () => {
        assert.ok(!isFloat(Number.MAX_VALUE));
    });

    it("should fail for non-number values", () => {
        assert.ok(!isFloat("1.23"));
    });
});
