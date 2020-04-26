import isOwnKey from './isOwnKey';
import isRealObject from './isRealObject';
import isEmpty from './isEmpty';

/**
 * Creates an array that contains the difference set of `arr1` and `arr2`;
 */
export default function diff<T>(arr1: T[], arr2: T[]): T[];
/**
 * Creates an object that contains the difference set of properties in `obj1`
 * and `obj2`;
 */
export default function diff<T, U>(obj1: T, obj2: U): Diff<T, U>;
export default function diff<T, U>(obj1: T, obj2: U, deep: true): DeepPartial<T & U>;
export default function diff(obj1: any, obj2: any, deep = false) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return obj1.filter(value => !obj2.includes(value));
    } else if (isRealObject(obj1) && isRealObject(obj2)) {
        let keys1 = Reflect.ownKeys(obj1);
        let keys2 = Reflect.ownKeys(obj2);
        let result: any = {};

        keys1.forEach(key => {
            if (!isOwnKey(obj2, key)) {
                result[key] = obj1[key];
            } else if (deep) {
                let _result = diff(obj1[key], obj2[key]);

                if (!isEmpty(_result)) {
                    result[key] = _result;
                }
            }
        });

        keys2.forEach(key => keys1.includes(key) || (result[key] = obj2[key]));

        return result;
    } else {
        return null;
    }
}