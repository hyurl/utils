/* global describe, it */
const assert = require("assert");
const { diff } = require("..");

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
            { bar: "World" }
        );
    });

    it("should create a deeply difference set of properties of two objects", () => {
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
                bar: "World"
            }
        );
    });
});