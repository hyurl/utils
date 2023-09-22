import isVoid from './isVoid.js';
import { couldBeClass as couldBeClass_2 } from './external/could-be-class/index.js';

/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
function typeOf(target) {
    if (arguments.length === 0)
        throw new TypeError("1 argument is required, 0 given");
    else if (isVoid(target))
        return "void";
    let type = typeof target;
    if (type === "function") {
        if (couldBeClass_2(target)) {
            return "class";
        }
        else {
            return "function";
        }
    }
    else if (type === "object") {
        if (Object.prototype.toString.call(target) === "[object Arguments]") {
            return "arguments";
        }
        else {
            return target.constructor || Object;
        }
    }
    else {
        return type;
    }
}

export { typeOf as default };
//# sourceMappingURL=typeOf.js.map
