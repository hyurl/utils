/* global describe, it */
const assert = require("assert");
const { define } = require("..");

describe("define", () => {
    it("should set a non-enumerable and non-writable property", () => {
        let obj = {};

        define(obj, "foo", "Hello, World!");
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), []);
    });

    it("should set a enumerable but non-writable property", () => {
        let obj = {};

        define(obj, "foo", "Hello, World!", true);
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });

    it("should set a writable but non-enumerable property", () => {
        let obj = {};

        define(obj, "foo", "Hello, World!", false, true);
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hi, Ayon!");
        assert.deepStrictEqual(Object.keys(obj), []);
    });

    it("should set a enumerable and writable property", () => {
        let obj = {};

        define(obj, "foo", "Hello, World!", true, true);
        obj.foo = "Hi, Ayon!";

        assert.strictEqual(obj.foo, "Hi, Ayon!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });

    it("should set a getter property instead", () => {
        let obj = {};

        define(obj, "foo", () => "Hello, World!");
        assert.strictEqual(obj.foo, "Hello, World!");
    });

    it("should set a enumerable getter property instead", () => {
        let obj = {};

        define(obj, "foo", () => "Hello, World!", true);
        assert.strictEqual(obj.foo, "Hello, World!");
        assert.deepStrictEqual(Object.keys(obj), ["foo"]);
    });
});