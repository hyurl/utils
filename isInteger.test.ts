import * as assert from "assert";
import { describe, it } from "mocha";
import { isInteger } from ".";

describe("isInteger", () => {
    it("should pass for a clear integer number", () => {
        assert.ok(isInteger(123));
    });

    it("should pass for Number.MAX_VALUE", () => {
        assert.ok(isInteger(Number.MAX_VALUE));
    });

    if (typeof BigInt === "function") {
        it("should pass for a bigint number", () => {
            assert.ok(isInteger(BigInt(Number.MAX_VALUE)));
        });
    }

    it("should fail for Infinity and -Infinity", () => {
        assert.ok(!isInteger(Infinity));
        assert.ok(!isInteger(-Infinity));
    });

    it("should fail for NaN", () => {
        assert.ok(!isInteger(NaN));
    });

    it("should fail for Number.MIN_VALUE", () => {
        assert.ok(!isInteger(Number.MIN_VALUE));
    });

    it("should fail for non-number values", () => {
        assert.ok(!isInteger("123"));
    });
});
