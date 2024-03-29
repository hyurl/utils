import { omit as _omit } from "https://lib.deno.dev/x/ayonli_jsext@latest/object/index.ts";

/** Creates an array composed without the picked items. */
export default function omit<T extends any>(arr: T[], items: T[]): T[];
/**
 * Creates an object composed without the picked properties.
 * NOTE: this function will collect both the own keys and the enumerable
 * properties from the prototype chain.
 * 
 * @deprecated use `omit` from `@ayonli/jsext/object` instead.
 */
export default function omit<T extends object, U extends keyof T>(obj: T, props: U[]): Omit<T, U>;
/**
 * @deprecated use `omit` from `@ayonli/jsext/object` instead.
 */
export default function omit<T>(obj: T, props: (string | symbol)[]): Partial<T>;
export default function omit(obj: any, props: (string | number | symbol)[]) {
    if (Array.isArray(obj)) {
        return obj.filter(i => !props.includes(i));
    } else {
        return _omit(obj, props);
    }
}
