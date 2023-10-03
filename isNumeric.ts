import { isNumeric as _isNumeric } from "https://lib.deno.dev/x/ayonli_jsext@latest/number/index.ts";

/** @deprecated use `Number.isNumeric` from `@ayonli/jsext/number/augment` instead. */
const isNumeric = _isNumeric;
export default isNumeric;
