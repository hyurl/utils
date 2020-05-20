export default timestamp;
/** Returns the current UNIX timestamp. */
declare function timestamp(ms?: boolean): number;
/**
 * Returns the UNIX timestamp according the input date or time.
 * NOTE: if the input value is a number, it must be of milliseconds.
 */
declare function timestamp(input: string | number | Date, ms?: boolean): number;
