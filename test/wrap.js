/* global describe, it */
const assert = require("assert");
const { wrap } = require("..");

describe("until", () => {
    it("should wrap a function with name and properties", () => {
        let sum = function sum(a, b) {
            return a + b;
        };
        let _sum = wrap(sum, (sum, a, b) => {
            return sum(a, b);
        });

        assert.strictEqual(_sum.name, sum.name);
        assert.strictEqual(_sum.length, sum.length);
        assert.strictEqual(_sum.toString(), sum.toString());
        assert.strictEqual(_sum(1, 2), sum(1, 2));
    });

    it("should wrap a method and pass `this`", () => {
        class A {
            constructor(a, b) {
                this.a = a;
                this.b = b;
            }

            sum() {
                return this.a + this.b;
            }
        }

        let a = new A(1, 2);

        a.sum = wrap(A.prototype.sum, function (sum) {
            return sum.call(this);
        });

        assert.strictEqual(a.sum.name, "sum");
        assert.strictEqual(a.sum.length, 0);
        assert.strictEqual(a.sum.toString(), A.prototype.sum.toString());
        assert.strictEqual(a.sum(), 3);
    });
});