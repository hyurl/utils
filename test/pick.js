/* global describe, it */
const assert = require("assert");
const pick = require("../pick").default;

describe("pick", () => {
    it("should pick properties from the object", () => {
        let err = new Error("Something went wrong");
        let foo = Symbol("foo");
        err[foo] = "Hello, World!";

        assert.deepStrictEqual(pick(err, ["name", "message", foo]), {
            name: err.name,
            message: err.message,
            [foo]: err[foo]
        });
    });

    it("should pick elements from the array", () => {
        assert.deepStrictEqual(pick([1, 2, 3, 4, 5], [2, 3]), [3, 4]);
    });
});