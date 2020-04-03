/* global describe, it */
const assert = require("assert");
const { ensure } = require("..");

describe("ensure", () => {
    it("should ensure default values with types", () => {
        assert.deepStrictEqual(ensure({}, {
            name: String,
            age: Number,
            tall: Boolean
        }), { name: "", age: 0, tall: false });
    });

    it("should ensure default values with set value", () => {
        assert.deepStrictEqual(ensure({}, {
            name: "Luna",
            age: 36,
            isWomen: true
        }), { name: "Luna", age: 36, isWomen: true });
    });

    it("should ensure force casting types of the values", () => {
        assert.deepStrictEqual(ensure({
            name: "Luna",
            age: "36",
            isWomen: 1
        }, {
            name: String,
            age: Number,
            isWomen: Boolean
        }), { name: "Luna", age: 36, isWomen: true });
    });

    it("should force casting compound types from string values", () => {
        let date = new Date();
        let re1 = /[a-z]/i;
        let re2 = new RegExp("\s+:\d+");

        assert.deepStrictEqual(ensure({
            re1: "/[a-z]/i",
            re2: "\s+:\d+",
            date: date.toISOString(),
            sym: "example",
            args: arguments,
            arr1: new Map([["foo", "Hello"], ["bar", "World"]]),
            arr2: new Set(["Hello", "World"]),
            obj: ["a", "b"],
            map: [["foo", "Hello"], ["bar", "World"]],
            set: ["Hello", "World"],
            buf1: "Hello, World!",
            buf2: [1, 2, 3, 4, 5],
        }, {
            re1: RegExp,
            re2: RegExp,
            date: Date,
            sym: Symbol,
            args: Array,
            arr1: Array,
            arr2: Array,
            obj: Object,
            map: Map,
            set: Set,
            buf1: Buffer,
            buf2: Buffer,
            buf3: Uint8Array
        }), {
            re1,
            re2,
            date,
            sym: Symbol.for("example"),
            args: [...arguments],
            arr1: [["foo", "Hello"], ["bar", "World"]],
            arr2: ["Hello", "World"],
            obj: { 0: "a", 1: "b" },
            map: new Map([["foo", "Hello"], ["bar", "World"]]),
            set: new Set(["Hello", "World"]),
            buf1: Buffer.from("Hello, World!"),
            buf2: Buffer.from([1, 2, 3, 4, 5]),
            buf3: Uint8Array.from([])
        });
    });
});