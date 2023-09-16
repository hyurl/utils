import { pick as _pick } from "@ayonli/jsext/object";

/** Creates an array composed of the picked elements. */
export default function pick<T extends any[]>(arr: T, indexes: number[]): T;
/** Creates an object composed of the picked properties. */
export default function pick<T extends object, U extends keyof T>(obj: T, props: U[]): Pick<T, U>;
export default function pick<T>(obj: T, props: (string | symbol)[]): Partial<T>;
export default function pick(obj: any, props: (string | number | symbol)[]) {
    if (Array.isArray(obj)) {
        return (<number[]>props).map(i => obj[i]);
    } else {
        return _pick(obj, props);
    }
}
