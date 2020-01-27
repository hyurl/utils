# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count`[.d.ts](./count.d.ts)
- `ensureType`[.d.ts](./ensureType.d.ts)
- `isBetween`[.d.ts](./isBetween.d.ts)
- `isEmpty`[.d.ts](./isEmpty.d.ts)
- `isOwnKey`[.d.ts](./isOwnKey.d.ts)
- `isOwnMethod`[.d.ts](./isOwnMethod.d.ts)
- `isSubClassOf`[.d.ts](./isSubClassOf.d.ts)
- `isVoid`[.d.ts](./isVoid.d.ts)
- `sleep`[.d.ts](./sleep.d.ts)
- `split`[.d.ts](https://github.com/hyurl/split-any/blob/master/index.d.ts)
- `timestamp`[.d.ts](./timestamp.d.ts)
- `until`[.d.ts](./until.d.ts)

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