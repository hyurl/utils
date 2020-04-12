import getGlobal from './getGlobal';
import typeOf from './typeOf';


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
export default function typeAs(target: any, type: any): any {
    if (typeOf(type) !== "class" &&
        type !== Symbol &&
        (typeof BigInt === "function" && type !== BigInt)
    ) {
        throw new TypeError("'type' must be a valid constructor");
    }

    let _type: any;
    let primitiveMap = <Record<string, Function>>{
        "string": String,
        "number": Number,
        "bigint": getGlobal("BigInt"),
        "boolean": Boolean,
        "symbol": Symbol
    };

    if (target instanceof type) {
        if ([String, Number, Boolean].includes(type)) {
            return type(target); // make sure the primitives are returned.
        } else {
            return target;
        }
    } else if ((_type = typeof target) && primitiveMap[_type] === type) {
        return target;
    }

    return null;
}