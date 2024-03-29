import * as assert from "node:assert";
import { useThrottle, sleep } from "./index.ts";
import { _try } from "https://lib.deno.dev/x/ayonli_jsext@latest/index.ts";

describe("useThrottle", () => {
    it("should create a throttle function and runs the handle function only once", async () => {
        let count = 0;
        let getFullName = useThrottle("getFullName", 100);
        let result = await Promise.all(
            new Array(10).fill(void 0).map(_ => getFullName((firstName, lastName) => {
                count++;
                return firstName + " " + lastName;
            }, "Ayon", "Lee"))
        );

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 1);
    });

    it("should create a throttle function and runs the handle function many times", async () => {
        let count = 0;
        let getFullName = useThrottle("getFullName2", 100);
        let result: string[] = [];

        for (let i = 0; i < 10; i++) {
            result.push(await getFullName(async (firstName, lastName) => {
                count++;
                return firstName + " " + lastName;
            }, "Ayon", "Lee"));
            await sleep(101); // set +1 to ensure the previous job is finished
        }

        assert.deepStrictEqual(result, new Array(10).fill("Ayon Lee"));
        assert.strictEqual(count, 10);
    });

    it("should throw the same error if calls multiple times of a throttle function within the interval", async () => {
        let count = 0;
        let throwError = useThrottle("throwError", 100);
        let result: unknown[] = [];

        for (let i = 0; i < 2; i++) {
            const [err] = await _try(throwError(async () => {
                count++;
                throw new Error("Something went wrong");
            }));
            result.push(err);
        }

        assert.strictEqual(count, 1);
        assert.strictEqual(result.length, 2);
        assert.ok(result[0] === result[1]);
    });

    // The following test is unstable, and since this function has been deprecated, we no longer 
    // test it.
    // it("should create a throttle function and re-runs the handle function in background", async () => {
    //     let count = 0;
    //     let getFullName = useThrottle("getFullName3", 50, true);
    //     let result: number[] = [];

    //     for (let i = 0; i < 10; i++) {
    //         result.push(await getFullName(async () => {
    //             count++;

    //             await Promise.resolve(null);

    //             return count;
    //         }));
    //         await sleep(10);
    //     }

    //     assert.deepStrictEqual(result, [1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
    //     assert.strictEqual(count, 3);
    // });
});
