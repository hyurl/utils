import * as assert from "assert";
import { omit } from "./index.ts";

describe("omit", () => {
    it("should omit properties from the object", () => {
        let err = new Error("Something went wrong");
        let foo = Symbol("foo");
        // @ts-ignore
        err[foo] = "Hello, World!";

        const res = omit(err, ["stack"]);
        assert.strictEqual(res.name, err.name);
        assert.strictEqual(res.message, err.message);
        // @ts-ignore
        assert.strictEqual(res[foo], err[foo]);
        // @ts-ignore
        assert.strictEqual(res["stack"], undefined);
    });

    it("should omit elements from the array", () => {
        assert.deepStrictEqual(omit([1, 2, 3, 4, 5], [2, 3]), [1, 4, 5]);
    });
});
