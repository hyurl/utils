import * as assert from "assert";
import { describe, it } from "mocha";
import { rand, isBetween } from ".";

describe("rand", () => {
    it("should generate random numbers within the range", () => {
        let count = 1000;

        while (0 < count--) {
            assert.ok(isBetween(rand(0, 9), [0, 9]));
        }
    });
});
