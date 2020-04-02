import { Typed } from './types';

export default function match<T>(obj: any, schema: T): obj is Typed<T> {
    process.emitWarning("This function hasn't been implemented");
    obj;
    schema;
    return null;
}