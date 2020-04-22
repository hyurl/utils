/* global describe, it */
const assert = require("assert");
const { isEmpty } = require("..");

describe("isEmpty", () => {
    describe("check primitives", () => {
        it("should pass for falsy primitives", () => {
            assert(isEmpty(0));
            assert(isEmpty(NaN));
            assert(isEmpty(false));
            assert(isEmpty(null));
            assert(isEmpty(void 0));
            assert(isEmpty(""));

            if (typeof BigInt === "function")
                assert(isEmpty(BigInt("0")));
        });

        it("should fail for truthy primitives", () => {
            assert(!isEmpty(1));
            assert(!isEmpty(Infinity));
            assert(!isEmpty(true));
            assert(!isEmpty("Hello, World!"));

            if (typeof BigInt === "function")
                assert(!isEmpty(BigInt("1")));
        });
    });

    describe("check array-like", () => {
        it("should pass for empty array-like objects", () => {
            assert(isEmpty([]));
            assert(isEmpty({ length: 0 })); // still controversial
        });

        it("should fail for non-empty array-like objects", () => {
            assert(!isEmpty(["Hello", "World"]));
            assert(!isEmpty({ 1: "Hello", 2: "World", length: 2 }));
        });
    });

    describe("check collection-like", () => {
        it("should pass for empty collection-like objects", () => {
            assert(isEmpty(new Map()));
            assert(isEmpty(new Set()));
            assert(isEmpty({ size: 0, [Symbol.iterator]() { } }));
        });

        it("should fail for non-empty collection-like objects", () => {
            assert(!isEmpty(new Map([["foo", "Hello"], ["bar", "World"]])));
            assert(!isEmpty(new Set(["Hello", "World"])));
        });
    });

    describe("check typed-array", () => {
        it("should pass for empty typed-array objects", () => {
            assert(isEmpty(Buffer.from("")));
            assert(isEmpty(new Uint8Array()));
        });

        it("should fail for non-empty typed-array objects", () => {
            assert(!isEmpty(Buffer.from("Hello, World!")));
            assert(!isEmpty(new Uint8Array([1, 2, 3])));
        });
    });

    describe("check plain object", () => {
        it("should pass for the object without properties", () => {
            assert(isEmpty({}));
        });

        it("should fail for the object with properties", () => {
            assert(!isEmpty({ foo: "Hello", bar: "World" }));
        });
    });

    describe("deep check", () => {
        it("should pass when an object contains only empty values", () => {
            assert(isEmpty({
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

            assert(isEmpty([null, [void 0, [NaN, ["", []]]]], true));
        });

        it("should fail when an object contains `0` and `false`", () => {
            assert(!isEmpty({
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

            assert(!isEmpty([null, [void 0, [NaN, ["", [0, false]]]]], true));
        });
    });
});