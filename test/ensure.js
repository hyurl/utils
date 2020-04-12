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

        it("should cast JSON string in object notation to object", () => {
            assert.deepStrictEqual(
                ensure({ foo: `{"bar":"Hello, World!"}` }, { foo: Object }),
                { foo: { bar: "Hello, World!" } }
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

    describe("Array", () => {
        it("should ensure default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: Array }), { foo: [] });
            assert.deepStrictEqual(ensure({}, { foo: [] }), { foo: [] });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: Array } }),
                { foo: { bar: [] } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: [] } }, { foo: { bar: [] } }),
                { foo: { bar: [] } }
            );
        });

        it("should cast existing value to array", () => {
            assert.deepStrictEqual(
                ensure({ foo: "Hello, World!" }, { foo: Array }),
                { foo: "Hello, World!".split("") }
            );
            assert.deepStrictEqual(
                ensure({ foo: new Set([1, 2, 3]) }, { foo: [] }),
                { foo: [1, 2, 3] }
            );
            assert.deepStrictEqual(
                ensure({ foo: Uint8Array.from([1, 2, 3]) }, { foo: [] }),
                { foo: [1, 2, 3] }
            );
        });

        it("should cast existing value in sub-nodes to array", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: "Hello, World!" } }, { foo: { bar: [] } }),
                { foo: { bar: "Hello, World!".split("") } }
            );
        });

        it("should cast JSON string in array notation to array", () => {
            assert.deepStrictEqual(
                ensure({ foo: `["hello","world"]` }, { foo: Array }),
                { foo: ["hello", "world"] }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: 123 }, { foo: Array });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not an Array and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: 123 } }, { foo: { bar: [] } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not an Array and cannot be casted into one"
            );
        });
    });

    describe("Date", () => {
        it("should ensure default value", () => {
            assert(ensure({}, { foo: Date }).foo instanceof Date);
            assert.deepStrictEqual(ensure({}, { foo: date }), { foo: date });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: date } }),
                { foo: { bar: date } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: date } }),
                { foo: { bar: date } }
            );
        });

        it("should cast existing value to Date", () => {
            assert.deepStrictEqual(
                ensure({ foo: date.toISOString() }, { foo: Date }),
                { foo: date }
            );
            assert.deepStrictEqual(
                ensure({ foo: date.valueOf() }, { foo: Date }),
                { foo: date }
            );
        });

        it("should cast existing value to Date", () => {
            assert.deepStrictEqual(
                ensure(
                    { foo: { bar: date.toISOString() } },
                    { foo: { bar: Date } }
                ),
                { foo: { bar: date } }
            );
            assert.deepStrictEqual(
                ensure({ foo: { bar: date.valueOf() } }, { foo: { bar: Date } }),
                { foo: { bar: date } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "not a date" }, { foo: Date });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a Date and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: "not a date" } }, { foo: { bar: Date } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a Date and cannot be casted into one"
            );
        });
    });

    if (typeof URL === "function") {
        describe("URL", () => {
            const url = "https://github.com/hyurl/utils";
            const urlObj = new URL(url);

            it("should ensure default value", () => {
                assert.deepStrictEqual(ensure({}, { foo: URL }), { foo: null });
                assert.deepStrictEqual(ensure({}, { foo: urlObj }), { foo: urlObj });
            });

            it("should ensure default value in sub-nodes", () => {
                assert.deepStrictEqual(
                    ensure({ foo: {} }, { foo: { bar: URL } }),
                    { foo: { bar: null } }
                );
                assert.deepStrictEqual(
                    ensure({}, { foo: { bar: urlObj } }),
                    { foo: { bar: urlObj } }
                );
            });

            it("should cast existing value to URL", () => {
                assert.deepStrictEqual(
                    ensure({ foo: url }, { foo: URL }),
                    { foo: urlObj }
                );
            });

            it("should cast existing value in sub-nodes to URL", () => {
                assert.deepStrictEqual(
                    ensure({ foo: { bar: url } }, { foo: { bar: URL } }),
                    { foo: { bar: urlObj } }
                );
            });

            it("should throw proper error if casting failed", () => {
                let err;

                try {
                    ensure({ foo: "not a URL" }, { foo: URL });
                } catch (e) {
                    err = e;
                }

                assert.deepStrictEqual(
                    String(err),
                    "TypeError: The value of 'foo' is not a(n) URL and cannot be casted into one"
                );
            });

            it("should throw proper error if casting failed in sub-nodes", () => {
                let err;

                try {
                    ensure({ foo: { bar: "not a URL" } }, { foo: { bar: URL } });
                } catch (e) {
                    err = e;
                }

                assert.deepStrictEqual(
                    String(err),
                    "TypeError: The value of 'foo.bar' is not a(n) URL and cannot be casted into one"
                );
            });
        });
    }

    describe("RegExp", () => {
        const pattern = "/[0-9a-f]{40}/i";
        const regex = /[0-9a-f]{40}/i;

        it("should ensure default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: RegExp }), { foo: null });
            assert.deepStrictEqual(ensure({}, { foo: regex }), { foo: regex });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({ foo: {} }, { foo: { bar: RegExp } }),
                { foo: { bar: null } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: regex } }),
                { foo: { bar: regex } }
            );
        });

        it("should cast existing value to RegExp", () => {
            assert.deepStrictEqual(
                ensure({ foo: pattern }, { foo: RegExp }),
                { foo: regex }
            );
        });

        it("should cast existing value in sub-nodes to RegExp", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: pattern } }, { foo: { bar: RegExp } }),
                { foo: { bar: regex } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "not a RegExp" }, { foo: RegExp });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a RegExp and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: "not a RegExp" } }, { foo: { bar: RegExp } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a RegExp and cannot be casted into one"
            );
        });
    });

    describe("Map", () => {
        const entries = [["foo", "Hello"], ["bar", "World"]];
        const map = new Map(entries);

        it("should ensure default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: Map }), { foo: new Map() });
            assert.deepStrictEqual(ensure({}, { foo: map }), { foo: map });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: Map } }),
                { foo: { bar: new Map() } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: map } }),
                { foo: { bar: map } }
            );
        });

        it("should cast existing value to Map", () => {
            assert.deepStrictEqual(
                ensure({ foo: entries }, { foo: Map }),
                { foo: map }
            );
        });

        it("should cast existing value in sub-nodes to Map", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: entries } }, { foo: { bar: Map } }),
                { foo: { bar: map } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "not a Map" }, { foo: Map });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a Map and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: [1, 2, 3] } }, { foo: { bar: Map } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a Map and cannot be casted into one"
            );
        });
    });

    describe("Set", () => {
        const entries = ["Hello", "World"];
        const set = new Set(entries);

        it("should ensure default value", () => {
            assert.deepStrictEqual(ensure({}, { foo: Set }), { foo: new Set() });
            assert.deepStrictEqual(ensure({}, { foo: set }), { foo: set });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: Set } }),
                { foo: { bar: new Set() } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: set } }),
                { foo: { bar: set } }
            );
        });

        it("should cast existing value to Set", () => {
            assert.deepStrictEqual(
                ensure({ foo: entries }, { foo: Set }),
                { foo: set }
            );
        });

        it("should cast existing value in sub-nodes to Set", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: entries } }, { foo: { bar: Set } }),
                { foo: { bar: set } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: "not a Set" }, { foo: Set });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a Set and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: 123 } }, { foo: { bar: Set } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a Set and cannot be casted into one"
            );
        });
    });

    describe("Buffer", () => {
        const entries = [0, 1, 255];
        const buf = Buffer.from(entries);

        it("should ensure default value", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: Buffer }),
                { foo: Buffer.from([]) }
            );
            assert.deepStrictEqual(ensure({}, { foo: buf }), { foo: buf });
        });

        it("should ensure default value in sub-nodes", () => {
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: Buffer } }),
                { foo: { bar: Buffer.from([]) } }
            );
            assert.deepStrictEqual(
                ensure({}, { foo: { bar: buf } }),
                { foo: { bar: buf } }
            );
        });

        it("should cast existing value to Buffer", () => {
            assert.deepStrictEqual(
                ensure({ foo: entries }, { foo: Buffer }),
                { foo: buf }
            );
            assert.deepStrictEqual(
                ensure(
                    { foo: "Hello, World!" },
                    { foo: Buffer }
                ),
                { foo: Buffer.from("Hello, World!") }
            );
            assert.deepStrictEqual(
                ensure(
                    { foo: Uint8Array.from(entries) },
                    { foo: Buffer }
                ),
                { foo: Buffer.from(entries) }
            );
            assert.deepStrictEqual(
                ensure(
                    { foo: Uint8Array.from(entries).buffer },
                    { foo: Buffer }
                ),
                { foo: Buffer.from(entries) }
            );
        });

        it("should cast existing value in sub-nodes to Buffer", () => {
            assert.deepStrictEqual(
                ensure({ foo: { bar: entries } }, { foo: { bar: Buffer } }),
                { foo: { bar: buf } }
            );
        });

        it("should throw proper error if casting failed", () => {
            let err;

            try {
                ensure({ foo: 123 }, { foo: Buffer });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo' is not a Buffer and cannot be casted into one"
            );
        });

        it("should throw proper error if casting failed in sub-nodes", () => {
            let err;

            try {
                ensure({ foo: { bar: 123 } }, { foo: { bar: Buffer } });
            } catch (e) {
                err = e;
            }

            assert.deepStrictEqual(
                String(err),
                "TypeError: The value of 'foo.bar' is not a Buffer and cannot be casted into one"
            );
        });
    });
});