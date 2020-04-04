import typeOf from "./typeOf";

export default function typeIs(obj: any, type: "string"): obj is string;
export default function typeIs(obj: any, type: "number"): obj is number;
export default function typeIs(obj: any, type: "bigint"): obj is bigint;
export default function typeIs(obj: any, type: "boolean"): obj is boolean;
export default function typeIs(obj: any, type: "symbol"): obj is symbol;
export default function typeIs(obj: any, type: "function"): obj is Function;
export default function typeIs(obj: any, type: "class"): obj is Constructor<any>;
export default function typeIs(obj: any, type: "arguments"): obj is IArguments;
export default function typeIs(obj: any, type: "void"): obj is void;
export default function typeIs<T>(obj: any, type: Constructor<T>): obj is T;
export default function typeIs(obj: any, type: any) {
    if (typeof type === "string") {
        return typeOf(obj) === type;
    } else {
        return obj instanceof type;
    }
}