import * as assert from "assert";
import { describe, it } from "mocha";
import { isOwnMethod } from ".";

class Test {
    fnProp = () => {};
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
