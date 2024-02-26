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
