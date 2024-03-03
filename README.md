# HyURL Utilities

**Utility functions of HyURL collection.**

This package is no longer maintained, many functions has been either removed or deprecated,
similar functions can be found in the standard JavaScript APIs or other libraries.

Check out [@ayonli/jsext](https://github.com/ayonli/jsext) instead.

- `count` [.ts](./count.ts)
- `define` [.ts](./define.ts)
- `diff` [.ts](./diff.ts)
- `ensureType` [.ts](./ensureType.ts)
- `flatObject` [.ts](./flatObject.ts) *deprecated: use `flatKeys` from `@ayonli/jsext/object` instead.*
- `getGlobal` [.ts](./getGlobal.ts) *deprecated: use `globalThis` instead.*
- `isEmpty` [.ts](./isEmpty.ts)
- `keysOf` [.ts](./keysOf.ts) *deprecated: use `Reflect.ownKeys` instead.*
- `omitInvalid` [.ts](./omitInvalid.ts) *deprecated: use `sanitize` from `@ayonli/jsext/object` instead.*
- `patch` [.ts](./patch.ts) *deprecated: this function has design flaws.*
- `sort` [.ts](./sort.ts) *deprecated: use `sortKeys` from `@ayonli/jsext/object` instead.*
- `split` [.ts](./split.ts)
- `timestamp` [.ts](./timestamp.ts) *deprecated: use `Day.js` instead.*
- `trim` [.ts](./trim.ts) *deprecated: use `String.prototype.trim` and `sanitize` from `@ayonli/jsext/object` instead.*
- `typeOf` [.ts](./typeOf.ts) *deprecated: use `typeOf` from `@ayonli/jsext/object` instead.*

## Import

There are many ways to import these functions.

### All At Once

This method will load all functions into memory, even if you don't need some of
them.

```js
// Node.js
import * as utils from "@hyurl/utils";

// Deno
import * as utils from "https://lib.deno.dev/x/hyurl_utils@latest/index.ts";

// Browser
import * as utils from "https://lib.deno.dev/x/hyurl_utils@latest/esm/index.js";
```

### Only Needed

This method will only load needed functions, which is recommended.

```js
// Node.js
import count from "@hyurl/utils/count";
import ensureType from "@hyurl/utils/ensureType";

// Deno
import count from "https://lib.deno.dev/x/hyurl_utils@latest/count.ts";
import ensureType from "https://lib.deno.dev/x/hyurl_utils@latest/ensureType.ts";

// Browser
import count from "https://lib.deno.dev/x/hyurl_utils@latest/esm/count.js";
import ensureType from "https://lib.deno.dev/x/hyurl_utils@latest/esm/ensureType.js";
```

**NOTE:** Configure `tsconfig.json` to set `compilerOptions.module` as `NodeNext` or `ESNext`
instead of `CommonJS` for this to work with Node.js+TypeScript.

## Utilities Types

Other than utility functions, this package also provides some utility types for
TypeScript, they are located in the following file and exposed to the global
namespace.

- [types.ts](./types.ts)

```ts
import { ResolveType, FunctionProperties, /* ... */ } from "@hyurl/utils/types";
```
