import * as assert from "assert";
import { describe, it } from "mocha";
import { isSubClassOf } from ".";

class A { }
class B extends A { }
class C extends A { }

describe("isSubClassOf", () => {
    it("should pass for a subclass", () => {
        assert.ok(isSubClassOf(B, A));
    });

    it("should pass when the base class is Object", () => {
        assert.ok(isSubClassOf(A, Object));
    });

    it("should fail for non-subclass", () => {
        assert.ok(!isSubClassOf(C, B));
    });
});
