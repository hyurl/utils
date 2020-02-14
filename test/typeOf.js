/* global describe, it */
const assert = require("assert");
const typeOf = require("../typeOf").default;

describe("typeOf", () => {
    it("should return 'string' for a string", () => {
        assert(typeOf("Hello, World!") === "string");
    });

    it("should return 'number' for a number", () => {
        assert(typeOf(12345) === "number");
    });

    if (typeof BigInt === "function") {
        it("should return 'bigint' for a bigint", () => {
            assert(typeOf(BigInt("12345")) === "bigint");
        });
    }

    it("should return 'boolean' for a boolean", () => {
        assert(typeOf(true) === "boolean");
    });

    it("should return 'symbol' for a symbol", () => {
        assert(typeOf(Symbol()) === "symbol");
    });

    it("should return 'function' for a function", () => {
        assert(typeOf(() => { }) === "function");
    });

    it("should return 'class' for a class", () => {
        assert(typeOf(class { }) === "class");
    });

    it("should return 'void' for all void values", () => {
        assert(typeOf(void 0) === "void");
        assert(typeOf(null) === "void");
        assert(typeOf(NaN) === "void");
    });

    it("should return the constructor for values of compound types", () => {
        assert(typeOf([]) === Array);
        assert(typeOf({}) === Object);
        assert(typeOf(Object.create(null)) === Object);
        assert(typeOf(Buffer.from("Hello, World!")) === Buffer);
    });

    it("should throw TypeError is no argument is passed", () => {
        let err;
        try { typeOf() } catch (e) { err = e };
        assert(err instanceof TypeError);
    });
});