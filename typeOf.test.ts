import * as assert from "assert";
import { describe, it } from "mocha";
import { typeOf } from ".";
import jsext from "@ayonli/jsext";

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
        assert(typeOf([] as any[]) === Array);
        assert(typeOf({}) === Object);
        assert(typeOf(Object.create(null)) === Object);
        assert(typeOf(Buffer.from("Hello, World!")) === Buffer);
    });

    it("should throw TypeError is no argument is passed", () => {
        // @ts-ignore
        const [err] = jsext.try(() => typeOf());
        assert(err instanceof TypeError);
    });
});
