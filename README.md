# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count` [.ts](./count.ts)
- `define` [.ts](./define.ts)
- `diff` [.ts](./diff.ts)
- `ensureType` [.ts](./ensureType.ts)
- `flatObject` [.ts](./flatObject.ts)
- `getGlobal` [.ts](./getGlobal.ts)
- `isEmpty` [.ts](./isEmpty.ts)
- `keysOf` [.ts](./keysOf.ts)
- `omitInvalid` [.ts](./omitInvalid.ts)
- `patch` [.ts](./patch.ts)
- `sort` [.ts](./sort.ts)
- `split` [.ts](./split.ts)
- `timestamp` [.ts](./timestamp.ts)
- `trim` [.ts](./trim.ts)
- `typeOf` [.ts](./typeOf.ts)

**Deprecated**

Since v0.3.0, the following functions have been merged to [@ayonli/jsext](https://github.com/ayonli/jsext).
The two packages serve different purposes, while **@ayonli/jsext** provides basic and semantic APIs
for the JavaScript language, **@hyurl/utils** provides higher level functions that deal with objects.

This package still keeps a link to these functions, but they have been marked __deprecated__ and
will be removed in v0.4.0.

- `isFloat` use `isFloat` from `@ayonli/jsext/number` instead.
- `isInteger` use `Number.isInteger` instead.
- `isNumeric` use `isNumeric` from `@ayonli/jsext/number` instead.
- `isBetween` use `isBetween` from `@ayonli/jsext/number` instead.
- `isOwnKey` use `hasOwn` from `@ayonli/jsext/object` instead.
- `isOwnMethod` use `hasOwnMethod` from `@ayonli/jsext/object` instead.
- `isSubClassOf` use `jsext.isSubclassOf` from `@ayonli/jsext` instead.
- `isVoid` use `!isValid` from `@ayonli/jsext/object` instead.
- `omit` use `omit` from `@ayonli/jsext/object` instead.
- `pick` use `pick` from `@ayonli/jsext/object` instead.
- `omitVoid` use `omitInvalid` instead.
- `rand` use `random` from `@ayonli/jsext/number` instead.
- `randStr` use `random` from `@ayonli/jsext/string` instead.
- `sleep` use `sleep` from `@ayonli/jsext/promise` instead.
- `typeAs` use `as` from `@ayonli/jsext/object` instead.
- `until` use `until` from `@ayonli/jsext/promise` instead.
- `useThrottle` use `jsext.throttle` from `@ayonli/jsext` instead.
- `wrap` use `jsext.wrap` from `@ayonli/jsext` instead.

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

### Load Bundle (browser only)

```html
<script src="https://lib.deno.dev/x/hyurl_utils@latest/bundle/index.js"></script>
<script>
    const utils = window["@hyurl/utils"];
<script>
```

## Utilities Types

Other than utility functions, this package also provides some utility types for
TypeScript, they are located in the following file and exposed to the global
namespace.

- [types.ts](./types.ts)

```ts
import "@hyurl/utils/types";
```
