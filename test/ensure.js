/* global describe, it, BigInt */
const assert = require("assert");
const { ensure } = require("..");

const date = new Date();

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
                ensure({}, { foo: { bar: "" } }),
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
                ensure({ foo: date }, { foo: String }),
                { foo: date.toISOString() }
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
                ensure({}, { foo: { bar: 0 } }),
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
            assert.deepStrictEqual(
                ensure({ foo: date }, { foo: Number }),
                { foo: date.valueOf() }
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
                    ensure({}, { foo: { bar: BigInt(0) } }),
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
                assert.deepStrictEqual(
                    ensure({ foo: date }, { foo: BigInt }),
                    { foo: BigInt(date.valueOf()) }
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

    describe("Boolean", () => {
        it("should ensure the default value", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: Boolean }),
                { foo: false }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: false }),
                { foo: false }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: true }),
                { foo: true }
            );
        });

        it("should ensure the default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: Boolean } }),
                { foo: { bar: false } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: false } }),
                { foo: { bar: false } }
            );
        });

        it("should cast existing value to boolean", () => {
            assert.deepStrictEqual(
                ensure({ foo: 1 }, { foo: Boolean }),
                { foo: true }
            );
            assert.deepStrictEqual(
                ensure({ foo: 0 }, { foo: Boolean }),
                { foo: false }
            );

            if (typeof BigInt === "function") {
                assert.deepStrictEqual(
                    ensure({ foo: BigInt(1) }, { foo: Boolean }),
                    { foo: true }
                );
                assert.deepStrictEqual(
                    ensure({ foo: BigInt(0) }, { foo: Boolean }),
                    { foo: false }
                );
            }

            assert.deepStrictEqual(
                ensure(
                    {
                        foo: "1",
                        foo2: "true",
                        foo3: "True",
                        foo4: "yes",
                        foo5: "Yes",
                        foo6: "on",
                        foo7: "On"
                    },
                    {
                        foo: Boolean,
                        foo2: Boolean,
                        foo3: Boolean,
                        foo4: false,
                        foo5: false,
                        foo6: true,
                        foo7: true
                    }
                ),
                {
                    foo: true,
                    foo2: true,
                    foo3: true,
                    foo4: true,
                    foo5: true,
                    foo6: true,
                    foo7: true
                }
            );
            assert.deepStrictEqual(
                ensure(
                    {
                        foo: "0",
                        foo2: "false",
                        foo3: "False",
                        foo4: "no",
                        foo5: "No",
                        foo6: "off",
                        foo7: "Off"
                    },
                    {
                        foo: Boolean,
                        foo2: Boolean,
                        foo3: Boolean,
                        foo4: false,
                        foo5: false,
                        foo6: true,
                        foo7: true
                    }
                ),
                {
                    foo: false,
                    foo2: false,
                    foo3: false,
                    foo4: false,
                    foo5: false,
                    foo6: false,
                    foo7: false
                }
            );
        });

        it("should cast existing value in sub-nodes to number", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: 1 } }, { foo: { bar: Boolean } }),
                { foo: { bar: true } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "abc" }, { foo: Boolean });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a boolean and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: "abc" } }, { foo: { bar: Boolean } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a boolean and cannot be casted into one"
            );
        });
    });

    describe("Symbol", () => {
        it("should ensure the default value", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: Symbol }),
                { foo: null }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: Symbol.for("foo") }),
                { foo: Symbol.for("foo") }
            );
        });

        it("should ensure the default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: Symbol } }),
                { foo: { bar: null } }
            );
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: Symbol.for("foo") } }),
                { foo: { bar: Symbol.for("foo") } }
            );
        });

        it("should cast existing value to boolean", () => {
            assert.deepStrictEqual(
                ensure({ foo: Symbol.for("foo") }, { foo: Symbol }),
                { foo: Symbol.for("foo") }
            );
            assert.deepStrictEqual(
                ensure({ foo: "foo" }, { foo: Symbol }),
                { foo: Symbol.for("foo") }
            );
            assert.deepStrictEqual(
                ensure({ foo: 123 }, { foo: Symbol }),
                { foo: Symbol.for("123") }
            );

            if (typeof BigInt === "function") {
                assert.deepStrictEqual(
                    ensure({ foo: BigInt(123) }, { foo: Symbol }),
                    { foo: Symbol.for("123") }
                );
            }
        });

        it("should cast existing value in sub-nodes to symbol", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: "fooBar" } }, { foo: { bar: Symbol } }),
                { foo: { bar: Symbol.for("fooBar") } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: {} }, { foo: Symbol });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a symbol and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: {} } }, { foo: { bar: Symbol } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a symbol and cannot be casted into one"
            );
        });
    });

    describe("Object", () => {
        class A {
            constructor() {
                this.foo = "hello";
                this.bar = "world";
            }
        }

        it("should ensure default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: Object }), { foo: {} });
            assert.deepStrictEqual(ensure({}, { foo: {} }), { foo: {} });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: Object } }),
                { foo: { bar: {} } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: {} } }),
                { foo: { bar: {} } }
            );
        });

        it("should cast existing value to object", () => {
            assert.deepStrictEqual(
                ensure({ foo: new A() }, { foo: Object }),
                { foo: { foo: "hello", bar: "world" } }
            );
        });

        it("should cast existing value in sub-nodes to object", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: new A() } }, { foo: { bar: Object } }),
                { foo: { bar: { foo: "hello", bar: "world" } } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "" }, { foo: Object });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not an Object and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: 123 } }, { foo: { bar: {} } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not an Object and cannot be casted into one"
            );
        });
    });
});