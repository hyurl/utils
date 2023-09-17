import * as assert from "assert";
import { describe, it } from "mocha";
import { isSubClassOf } from ".";

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
