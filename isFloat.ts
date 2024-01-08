import { isFloat as _isFloat } from "https://lib.deno.dev/x/ayonli_jsext@latest/number/index.ts";

/** @deprecated use `isFloat` from `@ayonli/jsext/number` instead. */
const isFloat = _isFloat as (value: any) => value is number;
export default isFloat;
