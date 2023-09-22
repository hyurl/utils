import * as assert from "assert";
import { pick } from "./index.ts";

describe("pick", () => {
    it("should pick properties from the object", () => {
        let err = new Error("Something went wrong");
        let foo = Symbol("foo");
        // @ts-ignore
        err[foo] = "Hello, World!";

        assert.deepStrictEqual(pick(err, ["name", "message", foo]), {
            name: err.name,
            message: err.message,
            // @ts-ignore
            [foo]: err[foo]
        });
    });

    it("should pick elements from the array", () => {
        assert.deepStrictEqual(pick([1, 2, 3, 4, 5], [2, 3]), [3, 4]);
    });
});
