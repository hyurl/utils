import { isArrayLike, isBufferLike, isCollectionLike } from './external/is-like/index.js';

const encoder = new TextEncoder();
function count(target, option = void 0) {
    if (typeof target === "string") {
        if (typeof option === "string") {
            if (!option) {
                return target.length + 1;
            }
            else if (!target) {
                return 0;
            }
            return target.split(option).length - 1;
        }
        else if (option === true) {
            if (typeof Buffer === "function" &&
                typeof Buffer.byteLength === "function") {
                return Buffer.byteLength(target);
            }
            else {
                return encoder.encode(target).byteLength;
            }
        }
        else {
            return target.length;
        }
    }
    else if (isArrayLike(target, true)) {
        if (arguments.length === 2) {
            let times = 0;
            for (let i = target.length; i--;) {
                // treat 0 equals -0 and NaN equals NaN
                if (target[i] === option || Object.is(target[i], option)) {
                    times++;
                }
            }
            return times;
        }
        else {
            return target.length;
        }
    }
    else if (isBufferLike(target)) {
        return target.byteLength;
    }
    else if (isCollectionLike(target, true)) {
        return target.size;
    }
    else {
        return Object.keys(target).length;
    }
}

export { count as default };
//# sourceMappingURL=count.js.map
