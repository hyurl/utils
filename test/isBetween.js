/* global describe, it */
const assert = require("assert");
const isBetween = require("../isBetween").default;

describe("isBetween", () => {
    it("should pass if a number equals to the minimal edge", () => {
        assert(isBetween(1, [1, 2]));
    });

    it("should pass if a number equals to the maximum edge", () => {
        assert(isBetween(2, [1, 2]));
    });

    it("should pass if the number is inside the edges", () => {
        assert(isBetween(2, [1, 3]));
    });

    it("should fail if the number is outside the edges", () => {
        assert(!isBetween(0, [1, 2]));
        assert(!isBetween(3, [1, 2]));
    });
});