import { sleep as _sleep } from "https://lib.deno.dev/x/ayonli_jsext@latest/promise/index.ts";

/** @deprecated use `Promise.sleep` from `@ayonli/jsext/promise/augment` instead. */
const sleep = _sleep;
export default sleep;
