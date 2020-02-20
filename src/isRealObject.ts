import { isArrayLike, isCollectionLike, isPromiseLike } from 'is-like';
import typeOf from './typeOf';

/**
 * Check if the target is a real object, that means it's of type `object`, but
 * not an array-like, not a Collection-like, and not a Promise-like object.
 */
export default function isRealObject(target: any) {
    return typeOf(target) === Object
        || (target !== null &&
            typeof target === "object" &&
            !isArrayLike(target, true) &&
            !isCollectionLike(target) &&
            !isPromiseLike(target));
}