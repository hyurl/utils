import * as assert from "assert";
import { describe, it } from "mocha";
import { trim } from ".";

describe("trim", () => {
    it("should trim a string", () => {
        assert.strictEqual(trim(" foo  "), "foo");
    });

    it("should trim string properties of an object", () => {
        assert.deepStrictEqual(trim({
            foo: " foo  ",
            bar: "bar ",
            num: 123,
            bool: true,
            child: {
                foo: " foo  ",
                bar: " bar"
            }
        }), {
            foo: "foo",
            bar: "bar",
            num: 123,
            bool: true,
            child: {
                foo: " foo  ",
                bar: " bar"
            }
        });
    });

    it("should deeply trim string properties of an object", () => {
        assert.deepStrictEqual(trim({
            foo: " foo  ",
            bar: "bar ",
            num: 123,
            bool: true,
            child: {
                foo: " foo  ",
                bar: " bar"
            }
        }, true), {
            foo: "foo",
            bar: "bar",
            num: 123,
            bool: true,
            child: {
                foo: "foo",
                bar: "bar"
            }
        });
    });

    it("should trim string properties of the objects and strings in an array", () => {
        assert.deepStrictEqual(trim([
            " foo  ",
            "bar ",
            123,
            true,
            {
                foo: " foo  ",
                bar: "bar ",
                num: 123,
                bool: true,
                child: {
                    foo: " foo  ",
                    bar: " bar"
                }
            }
        ]), [
            "foo",
            "bar",
            123,
            true,
            {
                foo: "foo",
                bar: "bar",
                num: 123,
                bool: true,
                child: {
                    foo: " foo  ",
                    bar: " bar"
                }
            }
        ]);
    });

    it("should deeply trim string properties of the objects and strings in an array", () => {
        assert.deepStrictEqual(trim([
            " foo  ",
            "bar ",
            123,
            true,
            {
                foo: " foo  ",
                bar: "bar ",
                num: 123,
                bool: true,
                child: {
                    foo: " foo  ",
                    bar: " bar"
                }
            }
        ], true), [
            "foo",
            "bar",
            123,
            true,
            {
                foo: "foo",
                bar: "bar",
                num: 123,
                bool: true,
                child: {
                    foo: "foo",
                    bar: "bar"
                }
            }
        ]);
    });
});
