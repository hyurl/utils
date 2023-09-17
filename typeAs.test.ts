import * as assert from "assert";
import { describe, it } from "mocha";
import { typeAs } from ".";

describe("typeAs", () => {
    it("should return the original object as-is when testing object constructor", () => {
        let re = /^[0-9a-f]$/;
        let _re = typeAs(re, RegExp);

        assert(re === _re);
    });

    it("should return primitives when testing primitive constructors", () => {
        assert(typeAs("Hello, World!", String) === "Hello, World!");
        assert(typeAs(new String("Hello, World!"), String) === "Hello, World!");

        assert(typeAs(123, Number) === 123);
        assert(typeAs(new Number(123), Number) === 123);

        assert(typeAs(true, Boolean) === true);
        assert(typeAs(new Boolean(true), Boolean) === true);

        let symbol = Symbol("");
        assert(typeAs(symbol, Symbol) === symbol);

        if (typeof BigInt === "function") {
            assert(typeAs(BigInt(123), BigInt) === BigInt(123));
        }
    });

    it("should return null when testing failed", () => {
        assert(typeAs("", RegExp) === null);
        assert(typeAs("", Symbol) === null);

        if (typeof BigInt === "function") {
            assert(typeAs("", BigInt) === null);
        }
    });
});
