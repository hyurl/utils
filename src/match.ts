export type Typed<T> = {
    [P in keyof T]: (
        T[P] extends typeof String ? string :
        T[P] extends typeof Number ? number :
        T[P] extends typeof BigInt ? bigint :
        T[P] extends typeof Boolean ? boolean :
        T[P] extends typeof Symbol ? symbol :
        T[P] extends typeof Buffer ? Buffer :
        T[P] extends (...args: any[]) => any ? T[P] :
        T[P] extends new (...args: any[]) => infer R ? R :
        T[P] extends object ? Typed<T[P]> :
        T[P]
    )
};

export default function match<T>(obj: any, schema: T): obj is Typed<T> {
    process.emitWarning("This function hasn't been implemented");
    return null;
}