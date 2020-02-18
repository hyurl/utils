/* global describe, it */
const assert = require("assert");
const { throttle, sleep } = require("..");

describe("throttle", () => {
    it("should create a throttled function and runs the handle function only once", () => {
        let count = 0;
        let getFullName = throttle((firstName, lastName) => {
            count++;
            return firstName + " " + lastName;
        }, 100, "Ayon", "Lee");
        let result = new Array(10).fill(void 0).map(getFullName);

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 1);
    });

    it("should create a throttled function and runs the handle function many times", async () => {
        let count = 0;
        let getFullName = throttle((firstName, lastName) => {
            count++;
            return firstName + " " + lastName;
        }, 100, "Ayon", "Lee");
        let result = [];

        for (let i = 0; i < 10; i++) {
            result.push(getFullName());
            await sleep(100);
        }

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 10);
    });

    it("should create an async throttled function and runs the handle function only once", async () => {
        let count = 0;
        let getFullName = throttle(async (firstName, lastName) => {
            count++;
            return firstName + " " + lastName;
        }, 100, "Ayon", "Lee");
        let result = await Promise.all(
            new Array(10).fill(void 0).map(getFullName)
        );

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 1);
    });

    it("should create an async throttled function and runs the handle function many times", async () => {
        let count = 0;
        let getFullName = throttle(async (firstName, lastName) => {
            count++;
            return firstName + " " + lastName;
        }, 100, "Ayon", "Lee");
        let result = [];

        for (let i = 0; i < 10; i++) {
            result.push(await getFullName());
            await sleep(101); // set +1 to ensure the previous job is finished
        }

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 10);
    });

    it("should throw a TypeError if the throttle function or interval doesn't meet the needs", () => {
        let err;
        try { throttle(() => { }, 0) } catch (e) { err = e }
        assert(err instanceof RangeError);
    });

    it("should throw the same error if calls multiple times within the interval", async () => {
        let count = 0;
        let throwError = throttle(() => {
            count++;
            throw new Error("Something went wrong");
        }, 100);
        let result = [];

        for (let i = 0; i < 2; i++) {
            try {
                throwError();
            } catch (e) {
                result.push(e);
            }
        }

        assert.strictEqual(count, 1);
        assert.strictEqual(result.length, 2);
        assert(result[0] === result[1]);
    });

    it("should throw the same error if calls multiple times of an async throttle function within the interval", async () => {
        let count = 0;
        let throwError = throttle(async () => {
            count++;
            throw new Error("Something went wrong");
        }, 100);
        let result = [];

        for (let i = 0; i < 2; i++) {
            try {
                await throwError();
            } catch (e) {
                result.push(e);
            }
        }

        assert.strictEqual(count, 1);
        assert.strictEqual(result.length, 2);
        assert(result[0] === result[1]);
    });
});