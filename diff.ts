import { isDictLike } from "https://lib.deno.dev/x/is_like@latest/index.js";
import { isValid } from "https://lib.deno.dev/x/ayonli_jsext@latest/object/index.ts";
import isEmpty from "./isEmpty.ts";


/**
 * Creates an array that contains the difference set between `origin` and
 * `input`;
 */
export default function diff<T>(origin: T[], input: T[]): T[];
/**
 * Evaluates the differences between `origin` and `input`, if a property exists
 * in both objects and the values are not equal, the `input` one will be taken.
 * 
 * NOTE: This function treats all void values equal and will not differ them.
 */
export default function diff<T, U>(origin: T, input: U): Diff<T, U>;
export default function diff<T, U>(origin: T, input: U, deep: true): DeepPartial<T & U>;
export default function diff(origin: any, input: any, deep = false) {
    if (Array.isArray(origin) && Array.isArray(input)) {
        return [
            ...input.filter(value => !origin.includes(value)),
            ...origin.filter(value => !input.includes(value))
        ];
    } else if (isDictLike(origin) && isDictLike(input)) {
        let keys = Reflect.ownKeys(input);
        let _keys = Reflect.ownKeys(origin);
        let result: any = {};

        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                (isValid(origin[key]) || isValid(input[key])) // only valid values
            ) {
                if (deep &&
                    typeof origin[key] === "object" && origin[key] !== null &&
                    typeof input[key] === "object" && input[key] !== null
                ) {
                    let _result = diff(origin[key], input[key], deep);

                    if (!isEmpty(_result)) {
                        result[key] = _result;
                    }
                } else {
                    result[key] = input[key];
                }
            }
        });

        _keys.forEach(key => {
            keys.includes(key) || (result[key] = origin[key]);
        });

        return result;
    } else {
        return input;
    }
}
