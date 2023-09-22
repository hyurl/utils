import * as assert from "assert";
import { isNumeric } from "./index.ts";

describe("isNumeric", () => {
    it("should pass for a clear number", () => {
        assert.ok(isNumeric(123));
    });

    if (typeof BigInt === "function") {
        it("should pass for a bigint number", () => {
            assert.ok(isNumeric(BigInt(Number.MAX_VALUE)));
        });
    }

    it("should pass for a numeric decimal string", () => {
        assert.ok(isNumeric("123"));
        assert.ok(isNumeric("1.23"));
    });

    it("should pass for a numeric binary string", () => {
        assert.ok(isNumeric("0b1010"));
    });

    it("should pass for a numeric octal string", () => {
        assert.ok(isNumeric("0o123"));
    });

    it("should pass for a numeric hexadecimal string", () => {
        assert.ok(isNumeric("0x123"));
    });
});
