import * as assert from "assert";
import { getGlobal } from "./index.ts";

describe("getGlobal", () => {
    it("should get the global object", () => {
        assert.strictEqual(getGlobal(), global);
    });

    it("should get a property from the global object", () => {
        assert.strictEqual(getGlobal("Buffer"), global.Buffer);
    });

    it("should get a user-defined property from the global object", () => {
        // @ts-ignore
        global["foo"] = "Hello, World!";
        // @ts-ignore
        assert.strictEqual(getGlobal("foo"), global["foo"]);
    });
});
