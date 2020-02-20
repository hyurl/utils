/* global describe, it */
const assert = require("assert");
const { isRealObject } = require("..");

describe("isRealObject", () => {
    it("should pass for an object literal", () => {
        assert(isRealObject({}));
    });

    it("should pass for a user-defined object", () => {
        assert(isRealObject(new class A { }));
    });

    it("should fail for an array", () => {
        assert(!isRealObject([]));
    });

    it("should fail for an array-like object", () => {
        assert(!isRealObject((function () { return arguments })(1, 2, 3)));
    });

    it("should fail for a Map or a Set", () => {
        assert(!isRealObject(new Map()));
        assert(!isRealObject(new Set()));
    });

    it("should fail for a Promise", () => {
        assert(!isRealObject(Promise.resolve(1)));
    });
});