# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count` [.d.ts](./count.d.ts)
- `define` [.d.ts](./define.d.ts)
- `diff` [.d.ts](./diff.d.ts)
- `ensureType` [.d.ts](./ensureType.d.ts)
- `flatObject` [.d.ts](./flatObject.d.ts)
- `getGlobal` [.d.ts](./getGlobal.d.ts)
- `isBetween` [.d.ts](./isBetween.d.ts)
- `isEmpty` [.d.ts](./isEmpty.d.ts)
- `isNumeric` [.d.ts](./isNumeric.d.ts)
- `isSubClassOf` [.d.ts](./isSubClassOf.d.ts)
- `isVoid` [.d.ts](./isVoid.d.ts)
- `keysOf` [.d.ts](./keysOf.d.ts)
- `omit` [.d.ts](./omit.d.ts)
- `omitVoid` [.d.ts](./omitVoid.d.ts)
- `patch` [.d.ts](./patch.d.ts)
- `pick` [.d.ts](./pick.d.ts)
- `sort` [.d.ts](./sort.d.ts)
- `split` [.d.ts](./split.d.ts)
- `timestamp` [.d.ts](./timestamp.d.ts)
- `trim` [.d.ts](./trim.d.ts)
- `typeOf` [.d.ts](./typeOf.d.ts)

**Deprecated**

Since v0.3.0, the following functions have been merged to [@ayonli/jsext](https://github.com/ayonli/jsext),
which provides more semantic APIs for the JavaScript language. This package will remain because the
two packages serve different purposes, while **@ayonli/jsext** provides basic APIs for the language
itself, **@hyurl/utils** provides higher level functions that are used in more specific scenarios.

This package still keeps a link to these functions, but they have been marked __deprecated__ and will be removed in v0.4.0.

- `isFloat` Deprecated: use `Number.isFloat` from `@ayonli/jsext/number/augment` instead.
- `isInteger` Deprecated: use `Number.isInteger` instead.
- `isOwnKey` Deprecated: use `Object.hasOwn` from `@ayonli/jsext/object/augment` instead.
- `isOwnMethod` Deprecated: use `Object.hasOwnMethod` from `@ayonli/jsext/object/augment` instead.
- `rand` Deprecated: use `Number.random` from `@ayonli/jsext/number/augment` instead.
- `randStr` Deprecated: use `String.random` from `@ayonli/jsext/string/augment` instead.
- `sleep` Deprecated: use `Promise.sleep` from `@ayonli/jsext/promise/augment` instead.
- `typeAs` Deprecated: use `Object.as` from `@ayonli/jsext/object/augment` instead.
- `until` Deprecated: use `Promise.until` from `@ayonli/jsext/promise/augment` instead.
- `useThrottle` Deprecated: use `jsext.throttle` from `@ayonli/jsext` instead.
- `wrap` Deprecated: use `jsext.wrap` from `@ayonli/jsext` instead.

## Import

There are two ways to import these functions.

### All At Once

This method will load all functions into memory, even if you don't need some of
them.

```ts
import * as utils from "@hyurl/utils";

// or import specific functions

import { count, ensureType } from "@hyurl/utils";
```

### Only Needed

This method will only load needed functions, which is recommended.

```ts
import count from "@hyurl/utils/count";
import ensureType from "@hyurl/utils/ensureType";
```

## Utilities Types

Other than utility functions, this package also provides some utility types for
TypeScript, they are located in the following file and exposed to the global
namespace.

- [types.ts](./src/types.ts)

```ts
import "@hyurl/utils/types";
```

## Web Support

When using this package in the browser, there are three ways to import this
package.

1. Import From `node_modules`

This is the same as above, but requires a module bundler such as webpack.

2. Import ES Module

```html
<script type="module">
    import utils from "https://deno.land/x/hyurl_utils/esm/index.js";
</script>
```

Note: the ES module can also be used in Deno.

3. Include Bundle

```html
<script src="https://deno.land/x/hyurl_utils/bundle/index.js"></script>
<script>
    const utils = window["@hyurl/utils"];
<script>
```
