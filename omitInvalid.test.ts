import * as assert from "node:assert";
import { omitInvalid } from "./index.ts";

describe("omitInvalid", () => {
    it("should omit properties of void values from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            nil2: null,
            nil3: NaN,
            date: new Date("invalid"),
        };
        let arr = [void 0, 1, null, 2, NaN, 3];

        assert.deepStrictEqual(omitInvalid(obj), { name: "Ayon Lee" });
        assert.deepStrictEqual(omitInvalid(arr), [1, 2, 3]);
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
                nil: NaN,
                date: new Date("invalid"),
            }
        };
        let arr = [void 0, [null, [NaN, "Ayon Lee"]]];

        assert.deepStrictEqual(omitInvalid(obj, true), {
            name: "Ayon Lee",
            child: { name: "Luna" },
            child2: {}
        });
        assert.deepStrictEqual(omitInvalid(arr, true), [[["Ayon Lee"]]]);
    });

    it("should omit properties of void values deeply from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            child: {
                nil: null
            },
            child2: [NaN, new Date("invalid")]
        };
        let arr = [void 0, [null, [NaN]]];

        assert.deepStrictEqual(omitInvalid(obj, true, true), {
            name: "Ayon Lee"
        });
        assert.deepStrictEqual(omitInvalid(arr, true, true), []);
    });

    it("should omit properties of empty strings deeply from the object", () => {
        let obj = {
            name: "Ayon Lee",
            nil: void 0,
            child: {
                nil: null,
                str: "",
                date: new Date("invalid"),
            },
            child2: [NaN]
        };
        let arr = [void 0, [null, [NaN, ""]]];

        assert.deepStrictEqual(omitInvalid(obj, true, true, true), {
            name: "Ayon Lee"
        });
        assert.deepStrictEqual(omitInvalid(arr, true, true, true), []);
    });
});
