import { isDictLike } from 'https://deno.land/x/is_like/index.js';
import isEmpty from './isEmpty.js';
import isVoid from './isVoid.js';

function diff(origin, input, deep = false) {
    if (Array.isArray(origin) && Array.isArray(input)) {
        return [
            ...input.filter(value => !origin.includes(value)),
            ...origin.filter(value => !input.includes(value))
        ];
    }
    else if (isDictLike(origin) && isDictLike(input)) {
        let keys = Reflect.ownKeys(input);
        let _keys = Reflect.ownKeys(origin);
        let result = {};
        keys.forEach(key => {
            if (origin[key] !== input[key] &&
                !(isVoid(origin[key]) && isVoid(input[key])) // ignore void values
            ) {
                if (deep &&
                    typeof origin[key] === "object" && origin[key] !== null &&
                    typeof input[key] === "object" && input[key] !== null) {
                    let _result = diff(origin[key], input[key], deep);
                    if (!isEmpty(_result)) {
                        result[key] = _result;
                    }
                }
                else {
                    result[key] = input[key];
                }
            }
        });
        _keys.forEach(key => {
            keys.includes(key) || (result[key] = origin[key]);
        });
        return result;
    }
    else {
        return input;
    }
}

export { diff as default };
//# sourceMappingURL=diff.js.map
