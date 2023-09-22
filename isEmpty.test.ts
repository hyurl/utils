import * as assert from "assert";
import { describe, it } from "mocha";
import { isEmpty } from "./index.ts";

describe("isEmpty", () => {
    describe("check primitives", () => {
        it("should pass for falsy primitives", () => {
            assert.ok(isEmpty(0));
            assert.ok(isEmpty(NaN));
            assert.ok(isEmpty(false));
            assert.ok(isEmpty(null));
            assert.ok(isEmpty(void 0));
            assert.ok(isEmpty(""));

            if (typeof BigInt === "function")
                assert.ok(isEmpty(BigInt("0")));
        });

        it("should fail for truthy primitives", () => {
            assert.ok(!isEmpty(1));
            assert.ok(!isEmpty(Infinity));
            assert.ok(!isEmpty(true));
            assert.ok(!isEmpty("Hello, World!"));

            if (typeof BigInt === "function")
                assert.ok(!isEmpty(BigInt("1")));
        });
    });

    describe("check Date, Error and RegExp", () => {
        it("should pass for invalid date", () => {
            assert.ok(isEmpty(new Date("foo")));
        });

        it("should fail when for normal date", () => {
            assert.ok(!isEmpty(new Date()));
        });

        it("should fail for RegExp instance", () => {
            assert.ok(!isEmpty(/foo/));
        });

        it("should pass for Error instance without meaningful message", () => {
            assert.ok(isEmpty(new Error()));
        });

        it("should fail for normal error", () => {
            assert.ok(!isEmpty(new Error("foo")));
        });
    });

    describe("check array-like", () => {
        it("should pass for empty array-like objects", () => {
            assert.ok(isEmpty([]));
            assert.ok(!isEmpty({ length: 0 }));
        });

        it("should fail for non-empty array-like objects", () => {
            assert.ok(!isEmpty(["Hello", "World"]));
            assert.ok(!isEmpty({ 1: "Hello", 2: "World", length: 2 }));
        });
    });

    describe("check collection-like", () => {
        it("should pass for empty collection-like objects", () => {
            assert.ok(isEmpty(new Map()));
            assert.ok(isEmpty(new Set()));
            assert.ok(isEmpty({ size: 0, [Symbol.iterator]() { } }));
        });

        it("should fail for non-empty collection-like objects", () => {
            assert.ok(!isEmpty(new Map([["foo", "Hello"], ["bar", "World"]])));
            assert.ok(!isEmpty(new Set(["Hello", "World"])));
        });
    });

    describe("check typed-array", () => {
        it("should pass for empty typed-array objects", () => {
            assert.ok(isEmpty(Buffer.from("")));
            assert.ok(isEmpty(new Uint8Array()));
        });

        it("should fail for non-empty typed-array objects", () => {
            assert.ok(!isEmpty(Buffer.from("Hello, World!")));
            assert.ok(!isEmpty(new Uint8Array([1, 2, 3])));
        });
    });

    describe("check plain object", () => {
        it("should pass for the object without properties", () => {
            assert.ok(isEmpty({}));
        });

        it("should fail for the object with properties", () => {
            assert.ok(!isEmpty({ foo: "Hello", bar: "World" }));
        });
    });

    describe("deep check", () => {
        it("should pass when an object contains only empty values", () => {
            assert.ok(isEmpty({
                foo: null,
                bar: {
                    foo: void 0,
                    bar: {
                        foo: NaN,
                        bar: {
                            foo: "",
                            bar: {}
                        }
                    }
                }
            }, true));

            assert.ok(isEmpty([null, [void 0, [NaN, ["", []]]]], true));
        });

        it("should fail when an object contains `0` and `false`", () => {
            assert.ok(!isEmpty({
                foo: null,
                bar: {
                    foo: void 0,
                    bar: {
                        foo: NaN,
                        bar: {
                            foo: "",
                            bar: {
                                foo: 0,
                                bar: false
                            }
                        }
                    }
                }
            }, true));

            assert.ok(!isEmpty([null, [void 0, [NaN, ["", [0, false]]]]], true));
        });
    });
});
