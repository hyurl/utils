import * as assert from "assert";
import { describe, it } from "mocha";
import { flatObject } from ".";

describe("flatObject", () => {
    it("should flat an object with only one level of depth", () => {
        assert.deepStrictEqual(flatObject({
            foo: {
                bar: "Hello, World!"
            }
        }), {
            "foo.bar": "Hello, World!"
        });
    });

    it("should flat an object with only one level of depth and with symbol properties", () => {
        let num = Symbol("sym")
        assert.deepStrictEqual(flatObject({
            [num]: 123,
            foo: {
                bar: "Hello, World!",
                [num]: 456,
                deep: {
                    greet: "Hello, World!"
                }
            },
        }), {
            "foo.bar": "Hello, World!",
            "foo.deep": {
                greet: "Hello, World!"
            },
            [num]: 123
        });
    });

    it("should flat an object with many levels of depth", () => {
        assert.deepStrictEqual(flatObject({
            foo: {
                bar: {
                    greeting: "Hello, World!",
                    author: "Ayon Lee",
                    arr: [
                        "a",
                        ["b", "c"],
                        {
                            saga: "HaHa"
                        }
                    ]
                }
            }
        }, 10), {
            "foo.bar.greeting": "Hello, World!",
            "foo.bar.author": "Ayon Lee",
            "foo.bar.arr": [
                "a",
                ["b", "c"],
                {
                    saga: "HaHa"
                }
            ]
        });
    });

    it("should flat an object with many levels of depth along with arrays", () => {
        assert.deepStrictEqual(flatObject({
            foo: {
                bar: {
                    greeting: "Hello, World!",
                    author: "Ayon Lee",
                    arr: [
                        "a",
                        ["b", "c"],
                        {
                            saga: "HaHa"
                        }
                    ]
                }
            }
        }, 10, true), {
            "foo.bar.greeting": "Hello, World!",
            "foo.bar.author": "Ayon Lee",
            "foo.bar.arr.0": "a",
            "foo.bar.arr.1.0": "b",
            "foo.bar.arr.1.1": "c",
            "foo.bar.arr.2.saga": "HaHa"
        });
    });

    it("should flat array-like children nodes except for TypedArray", () => {
        // @ts-ignore
        let args = (function () { return arguments })(1, 2, 3);
        let buf = Buffer.from("Hello, World!");

        assert.deepStrictEqual(flatObject({ args, buf }, 1, true), {
            "args.0": 1,
            "args.1": 2,
            "args.2": 3,
            buf
        });
    });
});
