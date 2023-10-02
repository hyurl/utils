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

- `isFloat` use `Number.isFloat` from `@ayonli/jsext/number/augment` instead.
- `isInteger` use `Number.isInteger` instead.
- `isNumeric` use `Number.isNumeric` from `@ayonli/jsext/number/augment` instead.
- `isBetween` use `Number.isBetween` from `@ayonli/jsext/number/augment` instead.
- `isOwnKey` use `Object.hasOwn` from `@ayonli/jsext/object/augment` instead.
- `isOwnMethod` use `Object.hasOwnMethod` from `@ayonli/jsext/object/augment` instead.
- `isSubClassOf` use `jsext.jsSubclassOf` from `@ayonli/jsext` instead.
- `isVoid` use `!Object.isValid` from `@ayonli/jsext/object/augment` instead.
- `omit` use `Object.omit` from `@ayonli/jsext/object/augment` instead.
- `pick` use `Object.pick` from `@ayonli/jsext/object/augment` instead.
- `omitVoid` use `omitInvalid` instead.
- `rand` use `Number.random` from `@ayonli/jsext/number/augment` instead.
- `randStr` use `String.random` from `@ayonli/jsext/string/augment` instead.
- `sleep` use `Promise.sleep` from `@ayonli/jsext/promise/augment` instead.
- `typeAs` use `Object.as` from `@ayonli/jsext/object/augment` instead.
- `until` use `Promise.until` from `@ayonli/jsext/promise/augment` instead.
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
import * as utils from "https://deno.land/x/hyurl_utils//index.ts";

// Browser
import * as utils from "https://deno.land/x/hyurl_utils//esm/index.js";
```

### Only Needed

This method will only load needed functions, which is recommended.

```js
// Node.js
import count from "@hyurl/utils/count";
import ensureType from "@hyurl/utils/ensureType";

// Deno
import count from "https://deno.land/x/hyurl_utils//count.ts";
import ensureType from "https://deno.land/x/hyurl_utils//ensureType.ts";

// Browser
import count from "https://deno.land/x/hyurl_utils//esm/count.js";
import ensureType from "https://deno.land/x/hyurl_utils//esm/ensureType.js";
```

**NOTE:** Configure `tsconfig.json` to set `compilerOptions.module` as `NodeNext` or `ESNext`
instead of `CommonJS` for this to work with Node.js+TypeScript.

### Load Bundle (browser only)

```html
<script src="https://deno.land/x/hyurl_utils//bundle/index.js"></script>
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

## Web Support

When using this package in the browser, there are three ways to import this
package.

1. Import From `node_modules`

This is the same as above, but requires a module bundler such as webpack.

2. Import ES Module

```html
<script type="module">
    import * as utils from "https://deno.land/x/hyurl_utils/esm/index.js";
    // or individuals
    import count from "https://deno.land/x/hyurl_utils/esm/count.js";
    import split from "https://deno.land/x/hyurl_utils/esm/split.js";
</script>
```

3. Include Bundle

```html
<script src="https://deno.land/x/hyurl_utils/bundle/index.js"></script>
<script>
    const utils = window["@hyurl/utils"];
<script>
```
