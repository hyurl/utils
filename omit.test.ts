import * as assert from "assert";
import { describe, it } from "mocha";
import { omit } from ".";

describe("omit", () => {
    it("should omit properties from the object", () => {
        let err = new Error("Something went wrong");
        let foo = Symbol("foo");
        // @ts-ignore
        err[foo] = "Hello, World!";

        assert.deepStrictEqual(omit(err, ["stack"]), {
            name: err.name,
            message: err.message,
            // @ts-ignore
            [foo]: err[foo]
        });
    });

    it("should omit elements from the array", () => {
        assert.deepStrictEqual(omit([1, 2, 3, 4, 5], [2, 3]), [1, 4, 5]);
    });
});
