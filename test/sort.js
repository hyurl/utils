/* global describe, it */
const assert = require("assert");
const { sort, keysOf } = require("..");

describe("sort", () => {
    it("should sort an array of numbers in ascending order", () => {
        assert.deepStrictEqual(
            sort([3, 2, 1, 4, 6, 5, 10]),
            [1, 2, 3, 4, 5, 6, 10]
        );
    });

    it("should sort an array of strings in ascending order", () => {
        assert.deepStrictEqual(
            sort(["a", "c", "b", "d", "f", "g", "e"]),
            ["a", "b", "c", "d", "e", "f", "g"]
        );
    });

    it("should sort an array of numbers in ascending order by a given compare function", () => {
        assert.deepStrictEqual(
            sort([3, 2, 1, 4, 6, 5, 10], (a, b) => a - b),
            [1, 2, 3, 4, 5, 6, 10]
        );
    });

    it("should sort an array of numbers in descending order by a given compare function", () => {
        assert.deepStrictEqual(
            sort([3, 2, 1, 4, 6, 5, 10], (a, b) => b - a),
            [10, 6, 5, 4, 3, 2, 1]
        );
    });

    it("should sort an array of object in ascending order", () => {
        assert.deepStrictEqual(
            sort([
                { weight: 3 },
                { weight: 2 },
                { weight: 4 },
                { weight: 1 }
            ], (a, b) => a.weight - b.weight),
            [{ weight: 1 }, { weight: 2 }, { weight: 3 }, { weight: 4 }]
        );
    });

    it("should sort an array of object in descending order", () => {
        assert.deepStrictEqual(
            sort([
                { weight: 3 },
                { weight: 2 },
                { weight: 4 },
                { weight: 1 }
            ], (a, b) => b.weight - a.weight),
            [{ weight: 4 }, { weight: 3 }, { weight: 2 }, { weight: 1 }]
        );
    });

    it("should sort an object's properties in ascending order", () => {
        let foo = Symbol("foo");
        let bar = Symbol("bar");
        let result = sort({
            a: 1,
            b: 2,
            d: 3,
            c: 4,
            g: 5,
            f: 6,
            e: 7,
            [foo]: 8,
            [bar]: 9
        });
        assert.deepStrictEqual(result, {
            a: 1,
            b: 2,
            c: 4,
            d: 3,
            e: 7,
            f: 6,
            g: 5,
            [foo]: 8,
            [bar]: 9
        });
        assert.deepStrictEqual(
            keysOf(result),
            ["a", "b", "c", "d", "e", "f", "g", foo, bar]
        );
    });

    it("should deeply sort an object's and its contents' properties in ascending order", () => {
        let foo = Symbol("foo");
        let bar = Symbol("bar");
        let result = sort({
            a: 1,
            b: 2,
            d: 3,
            c: {
                g: 5,
                f: 6,
                e: {
                    h: 7,
                    j: 8,
                    i: 9
                },
                [foo]: {
                    l: 10,
                    k: 11,
                    [bar]: [
                        {
                            n: 12,
                            m: 13,
                            o: 14
                        },
                        {
                            q: 15,
                            p: 16,
                            r: 17
                        }
                    ]
                }
            }
        }, true);
        assert.deepStrictEqual(result, {
            a: 1,
            b: 2,
            c: {
                e: {
                    h: 7,
                    i: 9,
                    j: 8
                },
                f: 6,
                g: 5,
                [foo]: {
                    k: 11,
                    l: 10,
                    [bar]: [
                        {
                            m: 13,
                            n: 12,
                            o: 14
                        },
                        {
                            p: 16,
                            q: 15,
                            r: 17
                        }
                    ]
                }
            },
            d: 3
        });
        assert.deepStrictEqual(
            keysOf(result),
            ["a", "b", "c", "d"]
        );
        assert.deepStrictEqual(
            keysOf(result.c),
            ["e", "f", "g", foo]
        );
        assert.deepStrictEqual(
            keysOf(result.c.e),
            ["h", "i", "j"]
        );
        assert.deepStrictEqual(
            keysOf(result.c[foo]),
            ["k", "l", bar]
        );
        assert.deepStrictEqual(
            keysOf(result.c[foo][bar][0]),
            ["m", "n", "o"]
        );
        assert.deepStrictEqual(
            keysOf(result.c[foo][bar][1]),
            ["p", "q", "r"]
        );
    });

    it("should deeply sort an object's properties but leave alone array contents", () => {
        let result = sort({
            foo: "Hello",
            bar: "World",
            arr: [1, 3, 2, 4, 7, 6, 5]
        }, true);
        assert.deepStrictEqual(result, {
            arr: [1, 3, 2, 4, 7, 6, 5],
            bar: "World",
            foo: "Hello",
        });
        assert.deepStrictEqual(keysOf(result), ["arr", "bar", "foo"]);
    })
});