import { isValid } from "https://lib.deno.dev/x/ayonli_jsext@latest/object/index.ts";
import { isNumeric } from "https://lib.deno.dev/x/ayonli_jsext@latest/number/index.ts";

export default timestamp;

/**
 * Returns the current UNIX timestamp.
 * 
 * @deprecated use [Day.js](https://day.js.org/) instead.
 */
function timestamp(ms?: boolean): number;
/**
 * Returns the UNIX timestamp according the input date or time.
 * 
 * TIP: since v0.2.3, this function supports the date string format in
 * `<year>,<monthIndex>,[date],[hours],[minutes],[seconds],[milliseconds]`,
 * which segments is used as arguments for `Date` constructor.
 * 
 * NOTE: if the input value is a number, it must be of milliseconds.
 * 
 * @deprecated use [Day.js](https://day.js.org/) instead.
 */
function timestamp(input: string | number | Date, ms?: boolean): number;
function timestamp(input: any, ms = false) {
    if (typeof input === "boolean") {
        ms = input;
        input = void 0;
    }

    input = input || new Date();

    if (input instanceof Date) {
        return ms ? input.valueOf() : Math.floor(input.valueOf() / 1000);
    } else if (typeof input === "number") {
        return ms ? input : Math.floor(input / 1000);
    } else {
        let date: Date;
        let dateTime = String(input).trim();

        if (dateTime.includes(",") && dateTime.split(",").every(v => isNumeric(v))) {
            date = parseDateRawArgs(dateTime);
        } else {
            let match: RegExpMatchArray | null = null;

            if (match = dateTime.match(/^(\d{1,2}):\d{2}(:\d{2})?/)) { // time only
                if (match[1]?.length !== 2) {
                    dateTime = "0" + dateTime;
                }

                if (!match[2]) {
                    dateTime += ":00";
                }

                date = new Date();
                dateTime = date.getFullYear()
                    + "-" + String(date.getMonth() + 1).padStart(2, "0")
                    + "-" + String(date.getDate()).padStart(2, "0")
                    + " " + dateTime;
            }

            date = new Date(dateTime);
        }

        if (String(date) !== "Invalid Date") {
            return ms ? date.valueOf() : Math.floor(date.valueOf() / 1000);
        } else {
            console.log(dateTime);
            throw new Error("The input argument is not a valid date-time string");
        }
    }
}

function parseDateRawArgs(str: string) {
    let [Y, M, D, H, m, s, ms] = str.split(",").map(Number);
    let date = new Date();

    isValid(Y) && date.setFullYear(Y as number);
    isValid(M) && date.setMonth(M as number);
    isValid(D) && date.setDate(D as number);
    isValid(H) && date.setHours(H as number);
    isValid(m) && date.setMinutes(m as number);
    isValid(s) && date.setSeconds(s as number);
    isValid(ms) && date.setMilliseconds(ms as number);

    return date;
}
