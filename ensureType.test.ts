import * as assert from "node:assert";
import { ensureType } from "./index.ts";

describe("ensureType", () => {
    describe("ensure booleans", () => {
        it("should cast the value into boolean true", () => {
            assert.ok(ensureType("true") === true);
            assert.ok(ensureType("yes") === true);
            assert.ok(ensureType("on") === true);
        });

        it("should cast the value into boolean false", () => {
            assert.ok(ensureType("false") === false);
            assert.ok(ensureType("no") === false);
            assert.ok(ensureType("off") === false);
        });
    });

    describe("ensure null", () => {
        it("should cast the value into null", () => {
            assert.ok(ensureType("null") === null);
            assert.ok(ensureType("nil") === null);
            assert.ok(ensureType("none") === null);
            assert.ok(ensureType("void") === null);
            assert.ok(ensureType("undefined") === null);
        });
    });

    describe("ensure numbers", () => {
        it("should cast the value into a number", () => {
            assert.ok(ensureType("12345") === 12345);
            assert.ok(ensureType("12345.123") === 12345.123);
            assert.ok(ensureType("9007199254740991") === Number.MAX_SAFE_INTEGER);
            assert.ok(ensureType("-9007199254740991") === Number.MIN_SAFE_INTEGER);
            assert.ok(Object.is(ensureType("NaN"), NaN));
            assert.ok(ensureType("Infinity") === Infinity);
            assert.ok(ensureType("-Infinity") === -Infinity);
        });

        it("should not cast if the numeric is greater than Number.MAX_SAFE_INTEGER", () => {
            assert.ok(ensureType("9007199254740992") === "9007199254740992");
        });

        it("should not cast if the numeric is lower than Number.MAX_SAFE_INTEGER", () => {
            assert.ok(ensureType("-9007199254740992") === "-9007199254740992");
        });

        it("should not cast if the numeric might be a phone number", () => {
            assert.ok(ensureType("+8913800774500") === "+8913800774500");
        });
    });

    describe("ensure objects", () => {
        it("should recursively cast elements in an array", () => {
            let source = [
                "true",
                "false",
                "null",
                "12345",
                [
                    "yes",
                    "no",
                    "nil"
                ]
            ];
            let expected = [
                true,
                false,
                null,
                12345,
                [
                    true,
                    false,
                    null
                ]
            ];

            assert.deepStrictEqual(ensureType(source), expected);
        });

        it("should recursively cast properties in an object", () => {
            let source = {
                bool1: "true",
                bool2: "false",
                nil: "null",
                num: "12345",
                re: "/[a-z]/i",
                child: {
                    bool3: "yes",
                    bool4: "no",
                    nil2: "nil"
                }
            };
            let expected = {
                bool1: true,
                bool2: false,
                nil: null,
                num: 12345,
                re: /[a-z]/i,
                child: {
                    bool3: true,
                    bool4: false,
                    nil2: null
                }
            };

            assert.deepStrictEqual(ensureType(source), expected);
        });
    });

    describe("ensure no cast", () => {
        it("should not cast if the input value is not a string", () => {
            assert.ok(ensureType(12345) === 12345);
            assert.ok(ensureType(true) === true);
            assert.ok(ensureType(null) === null);
        });

        it("should not cast if the string doesn't match any special pattern", () => {
            assert.ok(ensureType("Hello, World!") === "Hello, World!");
        });
    });
});
