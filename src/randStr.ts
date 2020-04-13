import rand from './rand';

/** 
 * Generates a random string.
 * @param chars The possible characters.
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