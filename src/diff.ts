import isRealObject from './isRealObject';
import isEmpty from './isEmpty';
import isVoid from './isVoid';


/**
 * Creates an array that contains the difference set between `origin` and
 * `input`;
 */
export default function diff<T>(origin: T[], input: T[]): T[];
/**
 * Evaluates the differences between `origin` and `input`, if a property exists
 * in both objects and the values are not equal, the one in `input` will be
 * taken.
 */
export default function diff<T, U>(origin: T, input: U): Diff<T, U>;
export default function diff<T, U>(origin: T, input: U, deep: true): DeepPartial<T & U>;
export default function diff(origin: any, input: any, deep = false) {
    if (Array.isArray(origin) && Array.isArray(input)) {
        return [
            ...input.filter(value => !origin.includes(value)),
            ...origin.filter(value => !input.includes(value))
        ];
    } else if (isRealObject(origin) && isRealObject(input)) {
        let keys = Reflect.ownKeys(input);
        let _keys = Reflect.ownKeys(origin);
        let result: any = {};

        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                !(isVoid(origin[key]) && isVoid(input[key]))
            ) {
                if (deep &&
                    typeof origin[key] === "object" && origin[key] !== null &&
                    typeof input[key] === "object" && input[key] !== null
                ) {
                    let _result = diff(origin[key], input[key]);

                    if (!isEmpty(_result)) {
                        result[key] = _result;
                    }
                } else {
                    result[key] = input[key];
                }
            }
        });

        _keys.forEach(key => keys.includes(key) || (result[key] = origin[key]));

        return result;
    } else {
        return input;
    }
}