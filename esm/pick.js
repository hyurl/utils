import { pick as pick$1 } from './external/@ayonli/jsext/esm/object/index.js';

function pick(obj, props) {
    if (Array.isArray(obj)) {
        return props.map(i => obj[i]);
    }
    else {
        return pick$1(obj, props);
    }
}

export { pick as default };
//# sourceMappingURL=pick.js.map
