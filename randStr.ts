import rand from "./rand.ts";

/** 
 * Generates a random string.
 * @param chars The possible characters.
 * @deprecated use `random` from `@ayonli/jsext/string` instead.
 */
export default function randStr(
    length: number,
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) {
    let str = "";
    let max = chars.length - 1;

    while (0 < length--) {
        str += chars[rand(0, max)];
    }

    return str;
}
