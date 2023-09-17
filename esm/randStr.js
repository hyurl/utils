import rand from './rand.js';

/**
 * Generates a random string.
 * @param chars The possible characters.
 * @deprecated use `String.random` from `@ayonli/jsext/string/augment` instead.
 */
function randStr(length, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    let str = "";
    let max = chars.length - 1;
    while (0 < length--) {
        str += chars[rand(0, max)];
    }
    return str;
}

export { randStr as default };
//# sourceMappingURL=randStr.js.map
