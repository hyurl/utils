import { isDictLike } from 'is-like';
import { isValid } from "@ayonli/jsext/object";
import isEmpty from './isEmpty';


/**
 * Patches the differences onto the `origin` object from the `input` object. If
 * a property exists in both objects and the values are not equal, the `input`
 * one will be taken. However, those properties that are only presents in the
 * `origin` object will remain untouched.
 * 
 * NOTE: This function mutates the `origin` object and returns the patched
 * differences, when patching, any void value in the `input` object will be
 * ignored.
 * 
 * This function is very useful, for example, a client issued a patch of the
 * resource and the server wants to know what properties has been modified by
 * this update so that it can perform some extra operations to provide a better
 * user experience.
 */
export default function patch<T, U>(
    origin: T,
    input: U,
    deep = false,
    ignoreEmptyStrings = false,
): T & Partial<U> {
    return doPatch(origin, input, deep, ignoreEmptyStrings, false);
}

function doPatch(
    origin: any,
    input: any,
    deep: boolean,
    ignoreEmptyStrings: boolean,
    isChildNode: boolean
) {
    if (isDictLike(origin) && isDictLike(input)) {
        let keys = Reflect.ownKeys(input);
        let result: any = {};

        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                isValid(input[key]) && // ignore invalid values
                (!ignoreEmptyStrings || input[key] !== "")
            ) {
                if (deep && isDictLike(origin[key]) && isDictLike(input[key])) {
                    let _result = doPatch(
                        origin[key],
                        input[key],
                        deep,
                        ignoreEmptyStrings,
                        true
                    );

                    if (!isEmpty(_result)) {
                        result[key] = _result;
                        Object.assign(origin[key], input[key]);
                    }
                } else {
                    result[key] = origin[key] = input[key];
                }
            }
        });

        return result;
    } else if (isChildNode) {
        return input;
    } else {
        return {};
    }
}
