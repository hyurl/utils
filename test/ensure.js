/* global describe, it, BigInt */
const assert = require("assert");
const { ensure } = require("..");

describe("ensure", () => {
    describe("String", () => {
        it("should ensure the default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: String }), { foo: "" });
            assert.deepStrictEqual(ensure({}, { foo: "" }), { foo: "" });
            assert.deepStrictEqual(
                ensure({}, { foo: "Hello, World!" }),
                { foo: "Hello, World!" }
            );
            assert.deepStrictEqual(
                ensure({ foo: null }, { foo: String }),
                { foo: "" }
            );
        });

        it("should ensure the default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: String } }),
                { foo: { bar: "" } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: String } }),
                { foo: { bar: "" } }
            );
        });

        it("should cast the existing value to string", () => {
            assert.deepStrictEqual(
                ensure({ foo: 123 }, { foo: String }),
                { foo: "123" }
            );
            assert.deepStrictEqual(
                ensure({ foo: true }, { foo: String }),
                { foo: "true" }
            );
            assert.deepStrictEqual(
                ensure({ foo: false }, { foo: "" }),
                { foo: "false" }
            );
            assert.deepStrictEqual(
                ensure(
                    { foo: { hello: "world" }, bar: [1, 2, 3], fn: () => { } },
                    { foo: String, bar: String, fn: String }
                ),
                {
                    foo: JSON.stringify({ hello: "world" }),
                    bar: JSON.stringify([1, 2, 3]),
                    fn: "() => { }"
                }
            );
        });

        it("should cast existing value in sub-nodes to string", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: 123 } }, { foo: { bar: String } }),
                { foo: { bar: "123" } }
            );
        });
    });

    describe("Number", () => {
        it("should ensure the default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: Number }), { foo: 0 });
            assert.deepStrictEqual(ensure({}, { foo: 0 }), { foo: 0 });
            assert.deepStrictEqual(ensure({}, { foo: 123 }), { foo: 123 });
            assert.deepStrictEqual(
                ensure({ foo: null, bar: NaN }, { foo: 1, bar: 2 }),
                { foo: 1, bar: 2 }
            );
        });

        it("should ensure the default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: Number } }),
                { foo: { bar: 0 } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: Number } }),
                { foo: { bar: 0 } }
            );
        });

        it("should cast the existing value to number", () => {
            assert.deepStrictEqual(
                ensure({ foo: "123" }, { foo: Number }),
                { foo: 123 }
            );
            assert.deepStrictEqual(
                ensure({ foo: "123" }, { foo: 100 }),
                { foo: 123 }
            );
            assert.deepStrictEqual(
                ensure({ foo: true }, { foo: Number }),
                { foo: 1 }
            );
            assert.deepStrictEqual(
                ensure({ foo: false }, { foo: Number }),
                { foo: 0 }
            );
        });

        it("should cast existing value in sub-nodes to number", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: "123" } }, { foo: { bar: Number } }),
                { foo: { bar: 123 } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "abc" }, { foo: Number });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a number and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: "abc" } }, { foo: { bar: Number } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a number and cannot be casted into one"
            );
        });
    });

    if (typeof BigInt === "function") {
        describe("BigInt", () => {
            it("should ensure the default value", () => {
                assert.deepStrictEqual(
                    ensure({}, { foo: BigInt }),
                    { foo: BigInt(0) }
                );
                assert.deepStrictEqual(
                    ensure({}, { foo: BigInt(0) }),
                    { foo: BigInt(0) }
                );
                assert.deepStrictEqual(
                    ensure({}, { foo: BigInt(123) }),
                    { foo: BigInt(123) }
                );
                assert.deepStrictEqual(
                    ensure(
                        { foo: null, bar: NaN },
                        { foo: BigInt(1), bar: BigInt(2) }
                    ),
                    { foo: BigInt(1), bar: BigInt(2) }
                );
            });

            it("should ensure the default value in sub-nodes", () => {
                assert.deepStrictEqual(
                    ensure({ foo: {} }, { foo: { bar: BigInt } }),
                    { foo: { bar: BigInt(0) } }
                );
                assert.deepStrictEqual(
                    ensure({}, { foo: { bar: BigInt } }),
                    { foo: { bar: BigInt(0) } }
                );
            });

            it("should cast the existing value to bigint", () => {
                assert.deepStrictEqual(
                    ensure({ foo: 123 }, { foo: BigInt }),
                    { foo: BigInt(123) }
                );
                assert.deepStrictEqual(
                    ensure({ foo: "123" }, { foo: BigInt }),
                    { foo: BigInt(123) }
                );
                assert.deepStrictEqual(
                    ensure({ foo: 123 }, { foo: BigInt(100) }),
                    { foo: BigInt(123) }
                );
                assert.deepStrictEqual(
                    ensure({ foo: true }, { foo: BigInt }),
                    { foo: BigInt(1) }
                );
                assert.deepStrictEqual(
                    ensure({ foo: false }, { foo: BigInt }),
                    { foo: BigInt(0) }
                );
            });

            it("should cast existing value in sub-nodes to number", () => {
                assert.deepStrictEqual(
                    ensure({ foo: { bar: 123 } }, { foo: { bar: BigInt } }),
                    { foo: { bar: BigInt(123) } }
                );
            });

            it("should throw proper error if casting failed", () => {
                let err;

                try {
                    ensure({ foo: "abc" }, { foo: BigInt });
                } catch (e) {
                    err = e;
                }

                assert.deepStrictEqual(
                    String(err),
                    "TypeError: The value of 'foo' is not a bigint and cannot be casted into one"
                );
            });

            it("should throw proper error if casting failed in sub-nodes", () => {
                let err;

                try {
                    ensure({ foo: { bar: "abc" } }, { foo: { bar: BigInt } });
                } catch (e) {
                    err = e;
                }

                assert.deepStrictEqual(
                    String(err),
                    "TypeError: The value of 'foo.bar' is not a bigint and cannot be casted into one"
                );
            });
        });
    }
});