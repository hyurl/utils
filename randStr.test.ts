import * as assert from "assert";
import { randStr } from "./index.ts";

describe("randStr", () => {
    it("should generate a random string", () => {
        let str = randStr(5);

        assert.ok(/^[a-zA-Z0-9]{5}$/.test(str));
    });

    it("should generate a random string using the given chars", () => {
        let str = randStr(16, "abcdef");

        assert.ok(/^[a-f]{16}$/.test(str));
    });
});
