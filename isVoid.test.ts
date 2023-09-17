import * as assert from "assert";
import { describe, it } from "mocha";
import { isVoid } from ".";

describe("isVoid", () => {
    it("should pass for null", () => {
        assert.ok(isVoid(null));
    });

    it("should pass for undefined", () => {
        assert.ok(isVoid(void 0));
    });

    it("should pass for NaN", () => {
        assert.ok(isVoid(NaN));
    });

    it("should fail for non-void values", () => {
        assert.ok(!isVoid(false));
        assert.ok(!isVoid(true));
        assert.ok(!isVoid(0));
        assert.ok(!isVoid(123));
        assert.ok(!isVoid({}));
        assert.ok(!isVoid([]));
    });
});
