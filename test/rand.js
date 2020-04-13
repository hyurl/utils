/* global describe, it */
const assert = require("assert");
const { rand, isBetween } = require("..");

describe("rand", () => {
    it("should generate random numbers within the range", () => {
        let count = 1000;

        while (0 < count--) {
            assert(isBetween(rand(0, 9), [0, 9]));
        }
    });
});