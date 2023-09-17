import * as assert from "assert";
import { describe, it } from "mocha";
import { split } from ".";

describe("split", () => {
    describe("Split strings", () => {
        it("should split a string by a substring", () => {
            assert.deepStrictEqual(
                split("Hello, World!", ""),
                ["H", "e", "l", "l", "o", ",", " ", "W", "o", "r", "l", "d", "!"]
            );
            assert.deepStrictEqual(split("Hello, World!", ", "), ["Hello", "World!"]);
        });

        it("should split a string by a regular expression", () => {
            assert.deepStrictEqual(
                split("Hello, World!", /,\s*/),
                ["Hello", "World!"]
            );
        });

        it("should split a string by a length", () => {
            assert.deepStrictEqual(
                split("Hello, World!", 3),
                ["Hel", "lo,", " Wo", "rld", "!"]
            );
        });
    });

    describe("Split number", () => {
        it("should split a number into stepping serials", () => {
            assert.deepStrictEqual(
                split(100, 10),
                [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            );

            assert.deepStrictEqual(
                split(105, 10),
                [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 105]
            );
        });
    });

    describe("Split Array", () => {
        it("should split an array into chunks", () => {
            assert.deepStrictEqual(
                split(["Hello", "World", "Hi", "Ayon"], 2),
                [["Hello", "World"], ["Hi", "Ayon"]]
            );
        });

        it("should split an array-like object into chunks", () => {
            let args: ArrayLike<number> | null = null;
            // @ts-ignore
            (function () { args = arguments; })(1, 2, 3, 4, 5, 6, 7, 8, 9);

            assert.deepStrictEqual(
                split(args, 2),
                [[1, 2], [3, 4], [5, 6], [7, 8], [9]]
            );
        });
    });

    describe("Split Buffer", () => {
        it("should split a Buffer into chunks", () => {
            assert.deepStrictEqual(
                split(Buffer.from([1, 2, 3, 4]), 2),
                [Buffer.from([1, 2]), Buffer.from([3, 4])]
            );
        });

        it("should split a Buffer into chunks by a separator", () => {
            assert.deepStrictEqual(
                split(Buffer.from("Hello, World, Hi, Ayon"), ", "),
                [
                    Buffer.from("Hello"),
                    Buffer.from("World"),
                    Buffer.from("Hi"),
                    Buffer.from("Ayon")
                ]
            );
            assert.deepStrictEqual(
                split(Buffer.from("Hello, World, Hi, Ayon"), Buffer.from(", ")),
                [
                    Buffer.from("Hello"),
                    Buffer.from("World"),
                    Buffer.from("Hi"),
                    Buffer.from("Ayon")
                ]
            );
        });
    });

    describe("Split TypedArray", () => {
        it("should split a TypedArray instance into chunks", () => {
            assert.deepStrictEqual(
                split(Uint8Array.from([1, 2, 3, 4]), 2),
                [Uint8Array.from([1, 2]), Uint8Array.from([3, 4])]
            );
        });
    });

    describe("Split ArrayBuffer", () => {
        it("should split a ArrayBuffer into chunks", () => {
            assert.deepStrictEqual(
                split(new ArrayBuffer(8), 2),
                [
                    new ArrayBuffer(2),
                    new ArrayBuffer(2),
                    new ArrayBuffer(2),
                    new ArrayBuffer(2)
                ]
            );
        });

        if (typeof SharedArrayBuffer === "function") {
            it("should split a ShareArrayBuffer instance into chunks", () => {
                assert.deepStrictEqual(
                    split(new SharedArrayBuffer(8), 2),
                    [
                        new SharedArrayBuffer(2),
                        new SharedArrayBuffer(2),
                        new SharedArrayBuffer(2),
                        new SharedArrayBuffer(2)
                    ]
                );
            });
        }
    });

    describe("Split Collection", () => {
        it("should split a Set instance into chunks", () => {
            assert.deepStrictEqual(
                split(new Set(["Hello", "World", "Hi", "Ayon"]), 2),
                [new Set(["Hello", "World"]), new Set(["Hi", "Ayon"])]
            );
        });

        it("should split a Map instance into chunks", () => {
            assert.deepStrictEqual(
                split(new Map([["Hello", "World"], ["Hi", "Ayon"]]), 1),
                [new Map([["Hello", "World"]]), new Map([["Hi", "Ayon"]])]
            );
        });
    });

    describe("Split Object", () => {
        it("should split a plain object into chunks", () => {
            assert.deepStrictEqual(
                split({ hello: "world", hi: "ayon", foo: "bar" }, 2),
                [
                    { hello: "world", hi: "ayon" },
                    { foo: "bar" }
                ]
            );
        });

        it("should split a class instance into chunks", () => {
            class Test {
                constructor(data: any) {
                    Object.assign(this, data);
                }
            }

            assert.deepStrictEqual(
                split(new Test({ hello: "world", hi: "ayon", foo: "bar" }), 2),
                [
                    new Test({ hello: "world", hi: "ayon" }),
                    new Test({ foo: "bar" })
                ]
            );
        });
    });
});
