/**
 * Returns the object if it's an instance of the type, otherwise returns `null`.
 * This function is used with the syntax shown in the example.
 * @example
 *  let foo = typeAs(bar, SomeType)?.doSomething();
 */
export default function typeAs(target: any, type: StringConstructor): string;
export default function typeAs(target: any, type: NumberConstructor): number;
export default function typeAs(target: any, type: BigIntConstructor): bigint;
export default function typeAs(target: any, type: BooleanConstructor): boolean;
export default function typeAs(target: any, type: SymbolConstructor): symbol;
export default function typeAs<T>(target: T, type: Constructor<T>): T;
