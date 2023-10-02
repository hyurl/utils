import * as assert from "node:assert";
import { keysOf } from "./index.ts";

describe("keysOf", () => {
    it("should return the own properties of the object", () => {
        let result = keysOf({
            foo: "Hello",
            bar: "World",
            [Symbol.toStringTag]: "Hello, World"
        });
        assert.deepStrictEqual(result, ["foo", "bar", Symbol.toStringTag]);
    });

    it("should return the indexes of the given array", () => {
        let result = keysOf([1, 2, 3, 4, 5]);
        assert.deepStrictEqual(result, [0, 1, 2, 3, 4]);
    });

    it("should return an array of the given function's own properties", () => {
        let result = keysOf(() => { });
        assert.deepStrictEqual(result, ["length", "name"]);
    });
});
