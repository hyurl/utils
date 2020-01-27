/* global describe, it */
const assert = require("assert");
const isOwnMethod = require("../isOwnMethod").default;

class Test {
    constructor() {
        this.fnProp = () => { };
    }

    method1() { }
}

let test = new Test();

describe("isOwnMethod", () => {
    it("should pass for an own method", () => {
        assert(isOwnMethod(test, "method1"));
    });

    it("should fail for an inherited method", () => {
        assert(!isOwnMethod(test, "hasOwnProperty"));
    });

    it("should fail for a function property", () => {
        assert(!isOwnMethod(test, "fnProp"));
    });

    it("should fail when the method doesn't exist", () => {
        assert(!isOwnMethod(test, "method2"));
    });
});