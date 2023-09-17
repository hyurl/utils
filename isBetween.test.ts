import * as assert from "assert";
import { describe, it } from "mocha";
import { isBetween } from ".";

describe("isBetween", () => {
    it("should pass if a number equals to the minimal edge", () => {
        assert.ok(isBetween(1, [1, 2]));
    });

    it("should pass if a number equals to the maximum edge", () => {
        assert.ok(isBetween(2, [1, 2]));
    });

    it("should pass if the number is inside the edges", () => {
        assert.ok(isBetween(2, [1, 3]));
    });

    it("should fail if the number is outside the edges", () => {
        assert.ok(!isBetween(0, [1, 2]));
        assert.ok(!isBetween(3, [1, 2]));
    });
});
