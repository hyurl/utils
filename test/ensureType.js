/* global describe, it */
const assert = require("assert");
const { ensureType } = require("..");

describe("ensureType", () => {
    describe("ensure booleans", () => {
        it("should cast the value into boolean true", () => {
            assert(ensureType("true") === true);
            assert(ensureType("yes") === true);
            assert(ensureType("on") === true);
        });

        it("should cast the value into boolean false", () => {
            assert(ensureType("false") === false);
            assert(ensureType("no") === false);
            assert(ensureType("off") === false);
        });
    });

    describe("ensure null", () => {
        it("should cast the value into null", () => {
            assert(ensureType("null") === null);
            assert(ensureType("nil") === null);
            assert(ensureType("none") === null);
            assert(ensureType("void") === null);
            assert(ensureType("undefined") === null);
        });
    });

    describe("ensure numbers", () => {
        it("should cast the value into a number", () => {
            assert(ensureType("12345") === 12345);
            assert(ensureType("12345.123") === 12345.123);
            assert(ensureType("9007199254740991") === Number.MAX_SAFE_INTEGER);
            assert(ensureType("-9007199254740991") === Number.MIN_SAFE_INTEGER);
            assert(Object.is(ensureType("NaN"), NaN));
            assert(ensureType("Infinity") === Infinity);
            assert(ensureType("-Infinity") === -Infinity);
        });

        it("should not cast if the numeric is greater than Number.MAX_SAFE_INTEGER", () => {
            assert(ensureType("9007199254740992") === "9007199254740992");
        });

        it("should not cast if the numeric is lower than Number.MAX_SAFE_INTEGER", () => {
            assert(ensureType("-9007199254740992") === "-9007199254740992");
        });

        it("should not cast if the numeric might be a phone number", () => {
            assert(ensureType("+8913800774500") === "+8913800774500");
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
            assert(ensureType(12345) === 12345);
            assert(ensureType(true) === true);
            assert(ensureType(null) === null);
        });

        it("should not cast if the string doesn't match any special pattern", () => {
            assert(ensureType("Hello, World!") === "Hello, World!");
        });
    });
});