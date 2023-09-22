import * as assert from "assert";
import { typeAs } from "./index.ts";

describe("typeAs", () => {
    it("should return the original object as-is when testing object constructor", () => {
        let re = /^[0-9a-f]$/;
        let _re = typeAs(re, RegExp);

        assert.ok(re === _re);
    });

    it("should return primitives when testing primitive constructors", () => {
        assert.ok(typeAs("Hello, World!", String) === "Hello, World!");
        assert.ok(typeAs(new String("Hello, World!"), String) === "Hello, World!");

        assert.ok(typeAs(123, Number) === 123);
        assert.ok(typeAs(new Number(123), Number) === 123);

        assert.ok(typeAs(true, Boolean) === true);
        assert.ok(typeAs(new Boolean(true), Boolean) === true);

        let symbol = Symbol("");
        assert.ok(typeAs(symbol, Symbol) === symbol);

        if (typeof BigInt === "function") {
            assert.ok(typeAs(BigInt(123), BigInt) === BigInt(123));
        }
    });

    it("should return null when testing failed", () => {
        assert.ok(typeAs("", RegExp) === null);
        assert.ok(typeAs("", Symbol) === null);

        if (typeof BigInt === "function") {
            assert.ok(typeAs("", BigInt) === null);
        }
    });
});
