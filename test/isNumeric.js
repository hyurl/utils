/* global describe, it */
const assert = require("assert");
const { isNumeric } = require("..");

describe("isNumeric", () => {
    it("should pass for a clear number", () => {
        assert(isNumeric(123));
    });

    if (typeof BigInt === "function") {
        it("should pass for a bigint number", () => {
            assert(isNumeric(BigInt(Number.MAX_VALUE)));
        });
    }

    it("should pass for a numeric decimal string", () => {
        assert(isNumeric("123"));
        assert(isNumeric("1.23"));
    });

    it("should pass for a numeric binary string", () => {
        assert(isNumeric("0b1010"));
    });

    it("should pass for a numeric octal string", () => {
        assert(isNumeric("0o123"));
    });

    it("should pass for a numeric hexadecimal string", () => {
        assert(isNumeric("0x123"));
    });
});