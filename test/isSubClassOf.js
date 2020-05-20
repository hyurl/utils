/* global describe, it */
const assert = require("assert");
const { isSubClassOf } = require("..");

class A { }
class B extends A { }
class C extends A { }

describe("isSubClassOf", () => {
    it("should pass for a subclass", () => {
        assert(isSubClassOf(B, A));
    });

    it("should pass when the base class is Object", () => {
        assert(isSubClassOf(A, Object));
    });

    it("should fail for non-subclass", () => {
        assert(!isSubClassOf(C, B));
    });
});