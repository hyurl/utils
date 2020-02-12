# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count`[.ts](./src/count.ts)
- `ensureType`[.ts](./src/ensureType.ts)
- `isBetween`[.ts](./src/isBetween.ts)
- `isEmpty`[.ts](./src/isEmpty.ts)
- `isOwnKey`[.ts](./src/isOwnKey.ts)
- `isOwnMethod`[.ts](./src/isOwnMethod.ts)
- `isSubClassOf`[.ts](./src/isSubClassOf.ts)
- `isVoid`[.ts](./src/isVoid.ts)
- `keysOf`[.ts](./src/keysOf.ts)
- `pick`[.ts](./src/pick.ts)
- `sleep`[.ts](./src/sleep.ts)
- `split`[.ts](https://github.com/hyurl/split-any/blob/master/index.d.ts)
- `timestamp`[.ts](./src/timestamp.ts)
- `until`[.ts](./src/until.ts)

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