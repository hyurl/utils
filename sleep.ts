import { sleep as _sleep } from "https://deno.land/x/ayonli_jsext/promise/index.ts";

/** @deprecated use `Promise.sleep` from `@ayonli/jsext/promise/augment` instead. */
const sleep = _sleep;
export default sleep;
