/** Creates an array composed of the picked elements. */
export default function pick<T extends any[]>(arr: T, indexes: number[]): T;
/** Creates an object composed of the picked properties. */
export default function pick<T extends object, U extends keyof T>(obj: T, props: (U | symbol)[]): Pick<T, U>;
export default function pick(obj: any, props: (string | number | symbol)[]) {
    if (Array.isArray(obj)) {
        return (<number[]>props).map(i => obj[i]);
    } else {
        return props.reduce((result: any, prop: string) => {
            prop in obj && (result[prop] = obj[prop]);
            return result;
        }, {});
    }
}