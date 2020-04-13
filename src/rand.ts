/** Generates a random number within the range from `min` to `max`. */
export default function rand(min: number, max: number) {
    return Number(min) + Math.floor(Math.random() * (max - min + 1));
}