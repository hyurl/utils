import type { Constructor } from "@ayonli/jsext";
export type TypeNames = "string" | "number" | "bigint" | "boolean" | "symbol" | "function" | "class" | "arguments" | "void";
/**
 * Returns a string representation or the constructor of the value's type.
 * NOTE: this function also returns `'void'` when testing `NaN`.
 */
export default function typeOf<T extends any>(target: T): TypeNames | Constructor<T>;
