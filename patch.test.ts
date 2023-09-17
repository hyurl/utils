import * as assert from "assert";
import { describe, it } from "mocha";
import { patch } from ".";

describe("patch", () => {
    it("should return the difference of two objects for patch", () => {
        let origin = { foo: "Hello", bar: "World" };

        assert.deepStrictEqual(
            patch(origin, { foo: "Hi" }),
            { foo: "Hi" }
        );
        assert.deepStrictEqual(origin, { foo: "Hi", bar: "World" });
    });

    it("should return the deep difference of two objects for patch", () => {
        let origin = {
            foo: "Hello",
            bar: "World",
            child: {
                foo: 123,
                bar: 456,
                subChild: {
                    foo: "abc",
                    bar: "def"
                }
            }
        };

        assert.deepStrictEqual(
            patch(origin, {
                foo: "Hi",
                child: {
                    bar: 789,
                    subChild: {
                        foo: "012",
                        bar: "def"
                    }
                }
            }, true),
            {
                foo: "Hi",
                child: {
                    bar: 789,
                    subChild: {
                        foo: "012"
                    }
                }
            }
        );
        assert.deepStrictEqual(origin, {
            foo: "Hi",
            bar: "World",
            child: {
                foo: 123,
                bar: 789,
                subChild: {
                    foo: "012",
                    bar: "def"
                }
            }
        });
    });

    it("should ignore valid values", () => {
        let origin = {
            foo: "Hello",
            bar: "World",
            child: {
                foo: 123,
                bar: 456
            }
        };

        assert.deepStrictEqual(
            patch(origin, {
                foo: "Hi",
                bar: "",
                child: {
                    bar: 456
                }
            }, true),
            {
                foo: "Hi",
                bar: ""
            }
        );
        assert.deepStrictEqual(origin, {
            ...origin,
            foo: "Hi",
            bar: ""
        });
    });

    it("should ignore empty strings", () => {
        let origin = {
            foo: "Hello",
            bar: "World",
            child: {
                foo: 123,
                bar: 456
            }
        };

        assert.deepStrictEqual(
            patch(origin, {
                foo: "Hi",
                bar: "",
                child: {
                    bar: 456
                }
            }, true, true),
            {
                foo: "Hi"
            }
        );
        assert.deepStrictEqual(origin, { ...origin, foo: "Hi" });
    });
});
