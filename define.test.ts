import * as assert from "node:assert";
import { define } from "./index.ts";
import { _try } from "https://lib.deno.dev/x/ayonli_jsext@latest/index.ts";

describe("define", () => {
    it("should set a non-enumerable and non-writable property", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", "Hello, World!");
        _try(() => {
            obj.foo = "Hi, Ayon!";
        });

        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), []);
    });

    it("should set a enumerable but non-writable property", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", "Hello, World!", true);
        _try(() => {
            obj.foo = "Hi, Ayon!";
        });

        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });

    it("should set a writable but non-enumerable property", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", "Hello, World!", false, true);
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hi, Ayon!");
        assert.deepStrictEqual(Object.keys(obj), []);
    });

    it("should set a enumerable and writable property", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", "Hello, World!", true, true);
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hi, Ayon!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });

    it("should set a getter property instead", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", { get: () => "Hello, World!" });
        assert.strictEqual(obj.foo, "Hello, World!");
    });

    it("should set a enumerable getter property instead", () => {
        const obj: { foo?: string; } = {};

        define(obj, "foo", { get: () => "Hello, World!" }, true);
        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });

    it("should set a getter and a setter property instead", () => {
        const obj: { foo?: string; _foo?: string; } = {};

        define(obj, "foo", {
            get: () => obj["_foo"] === void 0 ? "Hello, World!" : obj["_foo"],
            set: (v: any) => obj["_foo"] = v
        });
        assert.strictEqual(obj.foo, "Hello, World!");
        obj.foo = "Hi, Ayon";
        assert.strictEqual(obj.foo, "Hi, Ayon");
        assert.strictEqual(obj["_foo"], obj.foo);
    });
});
