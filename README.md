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

When using this package in the browser, either loads it as a ESModule/CommonJS
Module as in Node.js, or loads the bundle file 
[./bundle/index.js](./bundle/index.js) instead.

```html
<script src="./node_modules/@hyurl/utils/bundle/index.js"></script>
<script>
    const { count } = window["@hyurl/utils"];

    console.log(count([1,2,3]));
<script>
```

## Deno Support

Yes, this package can be used directly in [Deno](https://deno.land), to use it,
there are two ways to do so:

1. Import [mod.ts](./mod.ts)

Just add this repository as a submodule to your project, and then import it
locally,

```sh
git submodule add https://github.com/hyurl/utils vendors/hyurl/utils
```

(It is recommended that you should store all your third party packages in a
common directory, for example, `vendors` as used here.)

```ts
import * as utils from "./vendors/hyurl/utils/mod.ts";
```

However, there is a trick under the hood that allows a Node.js module working
in Deno, and it requires read permission of the disk for loading the Node.js
module.

For example, a file named `test-deno.ts`:

```ts
import { sleep, timestamp } from "./vendors/hyurl/utils/mod.ts";

await sleep(1000);

console.log(timestamp());
```

You will need to use this command to run the program:

```sh
deno run --unstable --allow-read --allow-env test-deno.ts
```

2. Via [jspm.dev](https://jspm.dev/)

>jspm provides a module CDN allowing any package from npm to be directly loaded
>in the browser and other JS environments as a fully optimized native JavaScript
>module.

```ts
import utils from "https://jspm.dev/@hyurl/utils";
// Or
import * as utils from "https://jspm.dev/@hyurl/utils";
```

*Note: importing from jspm.dev will lost type intellisense, but it doesn't*
*require read-write access.*

However, there is a solution to fix types, in `deps.ts`, import both the
`mod.ts` (as type) and the commonjs module, then re-export them together.

```ts
// deps.ts
import type * as iUtils from "../hyurl/utils/mod.ts";
import * as _utils from "https://jspm.dev/@hyurl/utils";

export const utils = _utils as typeof iUtils;
```

In this way, we can use utils with types in our program:

```ts
// main.ts
import { utils } from "./deps.ts";
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
deno test --unstable --allow-read --allow-env test/deno/example.ts
```

#### Test as Submodule

```sh
deno test --unstable --allow-read --allow-env vendors/hyurl/utils/test/deno/example.ts
```
