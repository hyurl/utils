/* global describe, it */
const assert = require("assert");
const { count } = require("..");

describe("count", () => {
    describe("count string length", () => {
        it("should count the length of a string", () => {
            assert(count("你好，世界！") === 6);
        });

        it("should count the byte length of a string", () => {
            assert(count("你好，世界！", true) === 18);
        });
    });

    describe("count string appearances", () => {
        it("should count the appearances of a substring", () => {
            assert(count("Hello, World!", "l") === 3);
        });
    });

    describe("count array length", () => {
        it("should count the length of an array", () => {
            assert(count(["Hello", "World"]) === 2);
        });
    });

    describe("count array element appearances", () => {
        it("should count the appearances of an element", () => {
            assert(count(["Hello", "World", "Hello"], "Hello") === 2);
        });

        it("should count the appearances of NaN", () => {
            assert(count([NaN, "World", NaN], NaN) === 2);
        });
    });

    describe("count map size", () => {
        it("should count the size of a map", () => {
            assert(count(new Map([["foo", "Hello"], ["bar", "World"]])) === 2);
        });
    });

    describe("count set size", () => {
        it("should count the size of a set", () => {
            assert(count(new Set(["Hello", "World"])) === 2);
        });
    });

    describe("count object capacity", () => {
        it("should count how many properties the object has", () => {
            assert(count({ foo: "Hello", bar: "World" }) === 2);
        });
    });
});