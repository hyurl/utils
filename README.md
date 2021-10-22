# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

Since 0.1.50, this package now supports Node.js, Web and
[Deno](https://deno.land).

- `count`[.d.ts](./count.d.ts)
- `define`[.d.ts](./define.d.ts)
- `diff`[.d.ts](./diff.d.ts)
- `ensureType`[.d.ts](./ensureType.d.ts)
- `flatObject`[.d.ts](./flatObject.d.ts)
- `getGlobal`[.d.ts](./getGlobal.d.ts)
- `isBetween`[.d.ts](./isBetween.d.ts)
- `isEmpty`[.d.ts](./isEmpty.d.ts)
- `isFloat`[.d.ts](./isFloat.d.ts)
- `isInteger`[.d.ts](./isInteger.d.ts)
- `isNumeric`[.d.ts](./isNumeric.d.ts)
- `isOwnKey`[.d.ts](./isOwnKey.d.ts)
- `isOwnMethod`[.d.ts](./isOwnMethod.d.ts)
- `isSubClassOf`[.d.ts](./isSubClassOf.d.ts)
- `isVoid`[.d.ts](./isVoid.d.ts)
- `keysOf`[.d.ts](./keysOf.d.ts)
- `omit`[.d.ts](./omit.d.ts)
- `omitVoid`[.d.ts](./omitVoid.d.ts)
- `patch`[.d.ts](./patch.d.ts)
- `pick`[.d.ts](./pick.d.ts)
- `rand`[.d.ts](./rand.d.ts)
- `randStr`[.d.ts](./randStr.d.ts)
- `sleep`[.d.ts](./sleep.d.ts)
- `sort`[.d.ts](./sort.d.ts)
- `split`[.d.ts](./split.d.ts)
- `timestamp`[.d.ts](./timestamp.d.ts)
- `trim` [.d.ts](./trim.d.ts)
- `typeAs`[.d.ts](./typeAs.d.ts)
- `typeOf`[.d.ts](./typeOf.d.ts)
- `until`[.d.ts](./until.d.ts)
- `useThrottle`[.d.ts](./useThrottle.d.ts)
- `wrap`[.d.ts](./wrap.d.ts)

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

2. Load ES Module

```html
<script type="module">
    import utils from "https://github.com/hyurl/utils/raw/master/esm/index.js";
    // Note the difference with the TypeScript/CommonJS version.
</script>
```

Note: this module can also be used Node.js as well.

### Load Bundle

```html
<script src="https://github.com/hyurl/utils/raw/master/bundle/index.js"></script>
<script>
    const { count } = window["@hyurl/utils"];

    console.log(count([1,2,3]));
<script>
```

## Deno Support

Yes, this package can be used directly in [Deno](https://deno.land), to use it,
there are two ways to import:

1. Directly from GitHub (recommended):

```ts
import * as utils from "https://github.com/hyurl/utils/raw/master/mod.ts";
```

2. Via Deno hosting service:

```ts
import * as utils from "https://deno.land/x/hyurl_utils/mod.ts";
```

## Unit Test

### In Node.js

```sh
npm test
```

### In Deno

```sh
npm run test-deno
# or
deno test test/deno/example.ts
```
