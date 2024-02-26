import { isValid } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/object/index.js';
import { isNumeric } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/number/index.js';

function timestamp(input, ms = false) {
    var _a;
    if (typeof input === "boolean") {
        ms = input;
        input = void 0;
    }
    input = input || new Date();
    if (input instanceof Date) {
        return ms ? input.valueOf() : Math.floor(input.valueOf() / 1000);
    }
    else if (typeof input === "number") {
        return ms ? input : Math.floor(input / 1000);
    }
    else {
        let date;
        let dateTime = String(input).trim();
        if (dateTime.includes(",") && dateTime.split(",").every(v => isNumeric(v))) {
            date = parseDateRawArgs(dateTime);
        }
        else {
            let match = null;
            if (match = dateTime.match(/^(\d{1,2}):\d{2}(:\d{2})?/)) { // time only
                if (((_a = match[1]) === null || _a === void 0 ? void 0 : _a.length) !== 2) {
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
        }
        else {
            console.log(dateTime);
            throw new Error("The input argument is not a valid date-time string");
        }
    }
}
function parseDateRawArgs(str) {
    let [Y, M, D, H, m, s, ms] = str.split(",").map(Number);
    let date = new Date();
    isValid(Y) && date.setFullYear(Y);
    isValid(M) && date.setMonth(M);
    isValid(D) && date.setDate(D);
    isValid(H) && date.setHours(H);
    isValid(m) && date.setMinutes(m);
    isValid(s) && date.setSeconds(s);
    isValid(ms) && date.setMilliseconds(ms);
    return date;
}

export { timestamp as default };
//# sourceMappingURL=timestamp.js.map
