import { isFloat as _isFloat } from "https://ayonli.github.io/jsext/number/index.ts";

/** @deprecated use `Number.isFloat` from `@ayonli/jsext/number/augment` instead. */
const isFloat = _isFloat as (value: any) => value is number;
export default isFloat;
