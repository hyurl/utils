import * as assert from "assert";
import { describe, it } from "mocha";
import { randStr } from ".";

describe("randStr", () => {
    it("should generate a random string", () => {
        let str = randStr(5);

        assert(/^[a-zA-Z0-9]{5}$/.test(str));
    });

    it("should generate a random string using the given chars", () => {
        let str = randStr(16, "abcdef");

        assert(/^[a-f]{16}$/.test(str));
    });
});
