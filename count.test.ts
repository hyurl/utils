import * as assert from "node:assert";
import { count } from "./index.ts";

describe("count", () => {
    describe("count string length", () => {
        it("should count the length of a string", () => {
            assert.ok(count("你好，世界！") === 6);
        });

        it("should count the byte length of a string", () => {
            assert.ok(count("你好，世界！", true) === 18);
        });
    });

    describe("count string appearances", () => {
        it("should count the appearances of a substring", () => {
            assert.ok(count("Hello, World!", "l") === 3);
        });
    });

    describe("count array length", () => {
        it("should count the length of an array", () => {
            assert.ok(count(["Hello", "World"]) === 2);
        });
    });

    describe("count array element appearances", () => {
        it("should count the appearances of an element", () => {
            assert.ok(count(["Hello", "World", "Hello"], "Hello") === 2);
        });

        it("should count the appearances of NaN", () => {
            assert.ok(count([NaN, "World", NaN], NaN) === 2);
        });
    });

    describe("count map size", () => {
        it("should count the size of a map", () => {
            assert.ok(count(new Map([["foo", "Hello"], ["bar", "World"]])) === 2);
        });
    });

    describe("count set size", () => {
        it("should count the size of a set", () => {
            assert.ok(count(new Set(["Hello", "World"])) === 2);
        });
    });

    describe("count object capacity", () => {
        it("should count how many properties the object has", () => {
            assert.ok(count({ foo: "Hello", bar: "World" }) === 2);
        });
    });
});
