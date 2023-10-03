import { omit as omit$1 } from 'https://lib.deno.dev/x/ayonli_jsext@latest/esm/object/index.js';

function omit(obj, props) {
    if (Array.isArray(obj)) {
        return obj.filter(i => !props.includes(i));
    }
    else {
        return omit$1(obj, props);
    }
}

export { omit as default };
//# sourceMappingURL=omit.js.map
