import { isNumeric as _isNumeric } from "https://deno.land/x/ayonli_jsext/number/index.ts";

/** @deprecated use `Number.isNumeric` from `@ayonli/jsext/number/augment` instead. */
const isNumeric = _isNumeric;
export default isNumeric;
