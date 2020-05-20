import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {
    count,
    define,
    diff,
    ensureType,
    flatObject,
    getGlobal,
    isBetween,
    isEmpty,
    isFloat,
    isInteger,
    isNumeric,
    isOwnKey,
    isOwnMethod,
    isRealObject,
    isSubClassOf,
    isVoid,
    keysOf,
    omit,
    omitVoid,
    patch,
    pick,
    rand,
    randStr,
    timestamp,
    sleep,
    sort,
    typeAs,
    typeOf,
    until,
    // useThrottle,
    wrap
} from "../../mod.ts";

declare global {
    const foo: string;
}

Deno.test("count", () => {
    assert(count("你好，世界！") === 6);
    assert(count("你好，世界！", true) === 18);
    assert(count("Hello, World!", "l") === 3);
    assert(count(["Hello", "World"]) === 2);
    assert(count(["Hello", "World", "Hello"], "Hello") === 2);
    assert(count([NaN, "World", NaN], NaN) === 2);
    assert(count(new Map([["foo", "Hello"], ["bar", "World"]])) === 2);
    assert(count(new Set(["Hello", "World"])) === 2);
    assert(count({ foo: "Hello", bar: "World" }) === 2);
});

Deno.test("define", () => {
    define(globalThis, "foo", "Deno test");
    console.assert(foo === "Deno test");
});

Deno.test("diff", () => {
    assertEquals(diff([1, 2, 3, 4, 5], [2, 3]), [1, 4, 5]);

    assertEquals(
        diff({ foo: "Hello", bar: "World" }, { foo: "Hi" }),
        { foo: "Hi", bar: "World" }
    );

    assertEquals(
        diff({
            foo: "Hello",
            bar: "World",
            child: {
                foo: 123,
                bar: 456
            }
        }, {
            foo: "Hi",
            child: {
                bar: 456
            }
        }, true),
        {
            foo: "Hi",
            bar: "World",
            child: {
                foo: 123
            }
        }
    );
});

Deno.test("ensureType", () => {
    assertEquals(ensureType({
        foo: "123",
        bar: "true"
    }), {
        foo: 123,
        bar: true
    });
});

Deno.test("floatObject", () => {
    let num = Symbol("sym")
    assertEquals(flatObject({
        [num]: 123,
        foo: {
            bar: "Hello, World!",
            [num]: 456,
            deep: {
                greet: "Hello, World!"
            }
        },
    }), {
        "foo.bar": "Hello, World!",
        "foo.deep": {
            greet: "Hello, World!"
        },
        [num]: 123
    });
});

Deno.test("getGlobal", () => {
    assertEquals(getGlobal(), globalThis);
    assertEquals(getGlobal("Deno"), Deno);

    define(globalThis, "foo", 123);
    assertEquals(getGlobal("foo"), 123);
});

Deno.test("isBetween", () => {
    assert(isBetween(1, [1, 2]));
    assert(isBetween(2, [1, 2]));
    assert(isBetween(2, [1, 3]));
    assert(!isBetween(0, [1, 2]));
    assert(!isBetween(3, [1, 2]));
});

Deno.test("isEmpty", () => {
    assert(isEmpty(0));
    assert(isEmpty(NaN));
    assert(isEmpty(false));
    assert(isEmpty(null));
    assert(isEmpty(void 0));
    assert(isEmpty(""));

    assert(isEmpty({}));
    assert(isEmpty([]));

    assert(isEmpty(new Map()));
    assert(isEmpty(new Set()));
    assert(isEmpty({ size: 0, [Symbol.iterator]() { } }));

    assert(isEmpty(new Uint8Array()));

    assert(isEmpty({
        foo: null,
        bar: {
            foo: void 0,
            bar: {
                foo: NaN,
                bar: {
                    foo: "",
                    bar: {}
                }
            }
        }
    }, true));

    assert(isEmpty([null, [void 0, [NaN, ["", []]]]], true));
});

Deno.test("isFloat", () => {
    assert(isFloat(1.23));
    assert(isFloat(Infinity));
    assert(isFloat(-Infinity));
    assert(isFloat(Number.MIN_VALUE));
});

Deno.test("isInteger", () => {
    assert(isInteger(123));
    assert(isInteger(Number.MAX_VALUE));
});

Deno.test("isNumeric", () => {
    assert(isNumeric(123));
});

Deno.test("isOwnKey", () => {
    assert(isOwnKey({ foo: "Hello" }, "foo"));
    assert(isOwnKey({ 1: "Hello" }, 1));

    let foo = Symbol("foo");
    assert(isOwnKey({ [foo]: "Hello" }, foo));
});

Deno.test("isOwnMethod", () => {
    class Test {
        fnProp = () => { };

        method1() { }
    }

    let test = new Test();

    assert(isOwnMethod(test, "method1"));
    assert(!isOwnMethod(test, "hasOwnProperty"));
    assert(!isOwnMethod(test, "fnProp"));
    assert(!isOwnMethod(test, "method2"));
});

Deno.test("isRealObject", () => {
    assert(isRealObject({}));
    assert(isRealObject(new class A { }));
    assert(!isRealObject([]));
    assert(!isRealObject((function () { return arguments })()));
    assert(!isRealObject(new Map()));
    assert(!isRealObject(new Set()));
    assert(!isRealObject(Promise.resolve(1)));
});

Deno.test("isSubClassOf", () => {
    class A { }
    class B extends A { }
    class C extends A { }

    assert(isSubClassOf(A, Object));
    assert(isSubClassOf(B, A));
    assert(!isSubClassOf(C, B));
});

Deno.test("isVoid", () => {
    assert(isVoid(null));
    assert(isVoid(void 0));
    assert(isVoid(NaN));
});

Deno.test("keysOf", () => {
    let result = keysOf({
        foo: "Hello",
        bar: "World",
        [Symbol.toStringTag]: "Hello, World"
    });
    assertEquals(result, ["foo", "bar", Symbol.toStringTag]);
});

Deno.test("pick", () => {
    let err = new Error("Something went wrong");

    assertEquals(pick(err, ["name", "message"]), {
        name: err.name,
        message: err.message
    });
});

Deno.test("omit", () => {
    let err = new Error("Something went wrong");

    assertEquals(omit(err, ["stack"]), {
        name: err.name,
        message: err.message
    });
});

Deno.test("omitVoid", () => {
    let obj = {
        name: "Ayon Lee",
        nil: void 0,
        child: {
            nil: null
        },
        child2: [NaN]
    };
    let arr = [void 0, [null, [NaN]]];

    assertEquals(omitVoid(obj, true, true), {
        name: "Ayon Lee"
    });
    assertEquals(omitVoid(arr, true, true), []);
});

Deno.test("patch", () => {
    let origin = {
        foo: "Hello",
        bar: "World",
        child: {
            foo: 123,
            bar: 456
        }
    };

    assertEquals(
        patch(origin, {
            foo: "Hi",
            child: {
                bar: 456
            }
        }, true),
        {
            foo: "Hi"
        }
    );
    assertEquals(origin, { ...origin, foo: "Hi" });
});

Deno.test("rand", () => {
    let count = 1000;

    while (0 < count--) {
        assert(isBetween(rand(0, 9), [0, 9]));
    }
});

Deno.test("randStr", () => {
    assert(/^[a-zA-Z0-9]{5}$/.test(randStr(5)));
    assert(/^[a-f]{16}$/.test(randStr(16, "abcdef")));
});

Deno.test("sleep", async () => {
    let ts = timestamp();
    await sleep(1000);
    assertEquals(timestamp(), ts + 1);
});

Deno.test("sort", () => {
    assertEquals(
        sort([3, 2, 1, 4, 6, 5, 10]),
        [1, 2, 3, 4, 5, 6, 10]
    );

    assertEquals(
        sort(["a", "c", "b", "d", "f", "g", "e"]),
        ["a", "b", "c", "d", "e", "f", "g"]
    );

    assertEquals(
        sort([3, 2, 1, 4, 6, 5, 10], (a, b) => a - b),
        [1, 2, 3, 4, 5, 6, 10]
    );

    {
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
        assertEquals(result, {
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
        assertEquals(
            keysOf(result),
            ["a", "b", "c", "d"]
        );
        assertEquals(
            keysOf(result.c),
            ["e", "f", "g", foo]
        );
        assertEquals(
            keysOf(result.c.e),
            ["h", "i", "j"]
        );
        assertEquals(
            keysOf((<any>result.c)[foo]),
            ["k", "l", bar]
        );
        assertEquals(
            keysOf((<any>result.c)[foo][bar][0]),
            ["m", "n", "o"]
        );
        assertEquals(
            keysOf((<any>result.c)[foo][bar][1]),
            ["p", "q", "r"]
        );
    }
});

Deno.test("timestamp", () => {
    assert(timestamp() === Math.floor(Date.now() / 1000));

    let dateStr = "2020-01-27 14:00:00.000+0800";
    assert(timestamp(dateStr) === 1580104800);
});

Deno.test("typeAs", () => {
    let re = /^[0-9a-f]$/;
    let _re = typeAs(re, RegExp);

    assert(re === _re);

    assert(typeAs("Hello, World!", String) === "Hello, World!");
    assert(typeAs(new String("Hello, World!"), String) === "Hello, World!");

    assert(typeAs(123, Number) === 123);
    assert(typeAs(new Number(123), Number) === 123);

    assert(typeAs(true, Boolean) === true);
    assert(typeAs(new Boolean(true), Boolean) === true);

    let symbol = Symbol("");
    assert(typeAs(symbol, Symbol) === symbol);

    assert(typeAs("", Symbol) === null);
});

Deno.test("typeOf", () => {
    assert(typeOf("Hello, World!") === "string");
    assert(typeOf(12345) === "number");
    assert(typeOf(true) === "boolean");
    assert(typeOf(Symbol()) === "symbol");
    assert(typeOf(() => { }) === "function");
    assert(typeOf(class { }) === "class");

    assert(typeOf(void 0) === "void");
    assert(typeOf(null) === "void");
    assert(typeOf(NaN) === "void");

    assert(typeOf<any>([]) === Array);
    assert(typeOf({}) === Object);
    assert(typeOf(Object.create(null)) === Object);
});

Deno.test("until", async () => {
    let result = 0;
    let expected = 10;

    await until(() => (++result) === 10);
    assertEquals(result, expected);
});

// Deno.test("useThrottle", async () => {
//     let count = 0;
//     let getFullName = useThrottle("getFullName", 100);
//     let result = await Promise.all(
//         new Array(10).fill(void 0).map(_ => getFullName((firstName, lastName) => {
//             count++;
//             return firstName + " " + lastName;
//         }, "Ayon", "Lee"))
//     );

//     assertEquals(result, new Array(10).fill("Ayon Lee"));
//     assertEquals(count, 1);
// });

Deno.test("wrap", () => {
    let sum = function sum(a: number, b: number) {
        return a + b;
    };
    let _sum = wrap(sum, (sum, a, b) => {
        return sum(a, b);
    });

    assertEquals(_sum.name, sum.name);
    assertEquals(_sum.length, sum.length);
    assertEquals(_sum.toString(), sum.toString());
    assertEquals(_sum(1, 2), sum(1, 2));
});