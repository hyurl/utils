import * as assert from "assert";
import { describe, it } from "mocha";
import { diff } from ".";

describe("diff", () => {
    it("should create a difference set of two arrays", () => {
        assert.deepStrictEqual(
            diff([1, 2, 3, 4, 5], [2, 3]),
            [1, 4, 5]
        );
    });

    it("should create a difference set of properties of two objects", () => {
        assert.deepStrictEqual(
            diff({ foo: "Hello", bar: "World" }, { foo: "Hi" }),
            { foo: "Hi", bar: "World" }
        );
    });

    it("should create a deep difference set of properties of two objects", () => {
        assert.deepStrictEqual(
            diff({
                foo: "Hello",
                bar: "World",
                child: {
                    foo: 123,
                    bar: 456
                }
            }, {
                foo: "Hi",
                child: {
                    bar: 456
                }
            }, true),
            {
                foo: "Hi",
                bar: "World",
                child: {
                    foo: 123
                }
            }
        );
    });

    it("should remove empty nodes when deeply diff two objects", () => {
        assert.deepStrictEqual(
            diff({
                foo: "Hello",
                bar: "World",
                child: {
                    foo: 123,
                    bar: 456
                },
                arr: [1, 2, 3]
            }, {
                foo: "Hi",
                child: {
                    foo: 123,
                    bar: 456
                },
                arr: [1, 2, 3]
            }, true),
            {
                foo: "Hi",
                bar: "World"
            }
        );
    });

    it("should treat all void values equal", () => {
        assert.deepStrictEqual(
            diff(
                { nil: null, not: undefined, nan: NaN, foo: null, bar: void 0 },
                { nil: undefined, not: NaN, nan: null, foo: false, bar: "A" }
            ),
            { foo: false, bar: "A" }
        );
    });

    it("should differ if only the origin's property is void", () => {
        assert.deepStrictEqual(
            diff({ foo: null }, { foo: "Hello" }),
            { foo: "Hello" }
        );
    });
});
