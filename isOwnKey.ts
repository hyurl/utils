import { hasOwn } from "https://lib.deno.dev/x/ayonli_jsext@latest/object/index.ts";

/** @deprecated use `Object.hasOwn` from `@ayonli/jsext/object/augment` instead. */
const isOwnKey = hasOwn;
export default isOwnKey;
