/* global describe, it */
const assert = require("assert");
const omitVoid = require("../omitVoid").default;

describe("omitVoid", () => {
    it("should omit properties of void values from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            nil2: null,
            nil3: NaN
        };
        let arr = [void 0, 1, null, 2, NaN, 3];

        assert.deepStrictEqual(omitVoid(obj), { name: "Ayon Lee" });
        assert.deepStrictEqual(omitVoid(arr), [1, 2, 3]);
    });

    it("should omit properties of void values deeply from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            child: {
                name: "Luna",
                nil: null
            },
            child2: {
                nil: NaN
            }
        };
        let arr = [void 0, [null, [NaN, "Ayon Lee"]]];

        assert.deepStrictEqual(omitVoid(obj, true), {
            name: "Ayon Lee",
            child: { name: "Luna" },
            child2: {}
        });
        assert.deepStrictEqual(omitVoid(arr, true), [[["Ayon Lee"]]]);
    });

    it("should omit properties of void values deeply from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            child: {
                nil: null
            },
            child2: [NaN]
        };
        let arr = [void 0, [null, [NaN]]];

        assert.deepStrictEqual(omitVoid(obj, true, true), {
            name: "Ayon Lee"
        });
        assert.deepStrictEqual(omitVoid(arr, true, true), []);
    });
});