import * as assert from "assert";
import { describe, it } from "mocha";
import { isInteger } from ".";

describe("isInteger", () => {
    it("should pass for a clear integer number", () => {
        assert(isInteger(123));
    });

    it("should pass for Number.MAX_VALUE", () => {
        assert(isInteger(Number.MAX_VALUE));
    });

    if (typeof BigInt === "function") {
        it("should pass for a bigint number", () => {
            assert(isInteger(BigInt(Number.MAX_VALUE)));
        });
    }

    it("should fail for Infinity and -Infinity", () => {
        assert(!isInteger(Infinity));
        assert(!isInteger(-Infinity));
    });

    it("should fail for NaN", () => {
        assert(!isInteger(NaN));
    });

    it("should fail for Number.MIN_VALUE", () => {
        assert(!isInteger(Number.MIN_VALUE));
    });

    it("should fail for non-number values", () => {
        assert(!isInteger("123"));
    });
});
