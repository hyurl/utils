/** Creates an array composed of the picked elements. */
export default function pick<T extends any[]>(arr: T, indexes: number[]): T;
/** Creates an object composed of the picked properties. */
export default function pick<T extends object, U extends keyof T>(obj: T, props: (U | symbol)[]): Pick<T, U>;
