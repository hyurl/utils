import isOwnKey from './isOwnKey';

/** Creates an array composed without the picked items. */
export default function omit<T extends any[]>(arr: T, items: number[]): T;
/**
 * Creates an object composed without the picked properties.
 * NOTE: this function will collect both the own keys and the enumerable
 * properties from the prototype chain.
 */
export default function omit<T extends object, U extends keyof T>(obj: T, props: (U | symbol)[]): Omit<T, U>;
export default function omit(obj: any, props: (string | number | symbol)[]) {
    if (Array.isArray(obj)) {
        return obj.filter(i => !props.includes(i));
    } else {
        let keys = Reflect.ownKeys(obj);
        let result = keys.reduce((result: any, prop: symbol) => {
            props.includes(prop) || (result[prop] = obj[prop]);
            return result;
        }, {});

        // collect properties from the prototype chain
        for (let prop in Object.getPrototypeOf(obj)) {
            props.includes(prop) || (result[prop] = obj[prop]);
        }

        // special treatment for Error types
        if (obj instanceof Error) {
            ["name", "message"].forEach(prop => {
                if (!props.includes(prop) && !isOwnKey(result, prop))
                    result[prop] = (<any>obj)[prop];
            });
        }

        return result;
    }
}
