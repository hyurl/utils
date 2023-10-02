import * as assert from "node:assert";
import { typeOf } from "./index.ts";
import { _try } from "https://deno.land/x/ayonli_jsext/index.ts";

describe("typeOf", () => {
    it("should return 'string' for a string", () => {
        assert.ok(typeOf("Hello, World!") === "string");
    });

    it("should return 'number' for a number", () => {
        assert.ok(typeOf(12345) === "number");
    });

    if (typeof BigInt === "function") {
        it("should return 'bigint' for a bigint", () => {
            assert.ok(typeOf(BigInt("12345")) === "bigint");
        });
    }

    it("should return 'boolean' for a boolean", () => {
        assert.ok(typeOf(true) === "boolean");
    });

    it("should return 'symbol' for a symbol", () => {
        assert.ok(typeOf(Symbol()) === "symbol");
    });

    it("should return 'function' for a function", () => {
        assert.ok(typeOf(() => { }) === "function");
    });

    it("should return 'class' for a class", () => {
        assert.ok(typeOf(class { }) === "class");
    });

    it("should return 'void' for all void values", () => {
        assert.ok(typeOf(void 0) === "void");
        assert.ok(typeOf(null) === "void");
        assert.ok(typeOf(NaN) === "void");
    });

    it("should return the constructor for values of compound types", () => {
        assert.ok(typeOf([] as any[]) === Array);
        assert.ok(typeOf({}) === Object);
        assert.ok(typeOf(Object.create(null)) === Object);

        if (typeof Buffer === "function") {
            assert.ok(typeOf(Buffer.from("Hello, World!")) === Buffer);
        }
    });

    it("should throw TypeError is no argument is passed", () => {
        // @ts-ignore
        const [err] = _try(() => typeOf());
        assert.ok(err instanceof TypeError);
    });
});
