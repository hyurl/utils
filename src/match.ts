import { Constructed } from './types';

export default function match<T>(obj: any, schema: T): obj is Constructed<T> {
    process.emitWarning("This function hasn't been implemented");
    obj;
    schema;
    return null;
}