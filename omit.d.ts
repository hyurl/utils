/** Creates an array composed without the picked items. */
export default function omit<T extends any>(arr: T[], items: T[]): T[];
/**
 * Creates an object composed without the picked properties.
 * NOTE: this function will collect both the own keys and the enumerable
 * properties from the prototype chain.
 */
export default function omit<T extends object, U extends keyof T>(obj: T, props: U[]): Omit<T, U>;
export default function omit<T>(obj: T, props: (string | symbol)[]): Partial<T>;
