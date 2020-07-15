export default timestamp;
/** Returns the current UNIX timestamp. */
declare function timestamp(ms?: boolean): number;
/**
 * Returns the UNIX timestamp according the input date or time.
 *
 * TIP: since v0.2.3, this function supports the date string format in
 * `<year>,<monthIndex>,[date],[hours],[minutes],[seconds],[milliseconds]`,
 * which segments is used as arguments for `Date` constructor.
 *
 * NOTE: if the input value is a number, it must be of milliseconds.
 */
declare function timestamp(input: string | number | Date, ms?: boolean): number;
