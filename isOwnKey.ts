import { hasOwn } from "https://deno.land/x/ayonli_jsext/object/index.ts";

/** @deprecated use `Object.hasOwn` from `@ayonli/jsext/object/augment` instead. */
const isOwnKey = hasOwn;
export default isOwnKey;
