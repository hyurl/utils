# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count`[.d.ts](./src/count.ts)
- `ensureType`[.d.ts](./src/ensureType.ts)
- `isBetween`[.d.ts](./src/isBetween.ts)
- `isEmpty`[.d.ts](./src/isEmpty.ts)
- `isOwnKey`[.d.ts](./src/isOwnKey.ts)
- `isOwnMethod`[.d.ts](./src/isOwnMethod.ts)
- `isSubClassOf`[.d.ts](./src/isSubClassOf.ts)
- `isVoid`[.d.ts](./src/isVoid.ts)
- `sleep`[.d.ts](./src/sleep.ts)
- `split`[.d.ts](https./src//github.com/hyurl/split-any/blob/master/index.ts)
- `timestamp`[.d.ts](./src/timestamp.ts)
- `until`[.d.ts](./src/until.ts)

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