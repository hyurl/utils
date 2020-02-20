# HyURL Utilities

**Utility functions of HyURL collection.**

This package currently contains the following functions, more functions may be
included in the future. Each function is stored in a separated file.

- `count`[.ts](./src/count.ts)
- `ensureType`[.ts](./src/ensureType.ts)
- `flatObject`[.ts](./src/flatObject.ts)
- `getGlobal`[.ts](./src/getGlobal.ts)
- `isBetween`[.ts](./src/isBetween.ts)
- `isEmpty`[.ts](./src/isEmpty.ts)
- `isFloat`[.ts](./src/isFloat.ts)
- `isInteger`[.ts](./src/isInteger.ts)
- `isNumeric`[.ts](./src/isNumeric.ts)
- `isOwnKey`[.ts](./src/isOwnKey.ts)
- `isOwnMethod`[.ts](./src/isOwnMethod.ts)
- `isRealObject`[.ts](./src/isRealObject.ts)
- `isSubClassOf`[.ts](./src/isSubClassOf.ts)
- `isVoid`[.ts](./src/isVoid.ts)
- `keysOf`[.ts](./src/keysOf.ts)
- `omit`[.ts](./src/omit.ts)
- `omitVoid`[.ts](./src/omitVoid.ts)
- `pick`[.ts](./src/pick.ts)
- `sleep`[.ts](./src/sleep.ts)
- `sort`[.ts](./src/sort.ts)
- `split`[.ts](https://github.com/hyurl/split-any/blob/master/index.d.ts)
- `throttle`[.ts](./src/throttle.ts)
- `timestamp`[.ts](./src/timestamp.ts)
- `typeOf`[.ts](./src/typeOf.ts)
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

## Utilities Types

Other than utility functions, this package also provides some utility types for
TypeScript, they are located in the following file and exposed to the global
namespace.

- [types.ts](./src/types.ts)