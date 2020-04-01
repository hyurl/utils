/* global describe, it */
const assert = require("assert");
const { ensure } = require("..");

describe("ensure", () => {
    it("ensure default values with types", () => {
        assert.deepStrictEqual(ensure({}, {
            name: String,
            age: Number,
            tall: Boolean
        }), { name: "", age: 0, tall: false });
    });

    it("ensure default values with set value", () => {
        assert.deepStrictEqual(ensure({}, {
            name: "Luna",
            age: 36,
            isWomen: true
        }), { name: "Luna", age: 36, isWomen: true });
    });

    it("ensure force casting types of the values", () => {
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
});