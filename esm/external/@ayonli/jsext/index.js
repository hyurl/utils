import _try from './try.js';
import func from './func.js';
import wrap from './wrap.js';
import throttle from './throttle.js';
import mixins from './mixins.js';
import isSubclassOf from './isSubclassOf.js';
import chan from './chan.js';
export { Channel } from './chan.js';
import read from './read.js';
import run from './run.js';
import example from './example.js';

/**
 * The entry of jsext main functions.
 */
const jsext = {
    try: _try,
    func,
    wrap,
    throttle,
    mixins,
    isSubclassOf,
    chan,
    read,
    run,
    example,
};

export { _try, chan, jsext as default, example, func, isSubclassOf, mixins, read, run, throttle, wrap };
//# sourceMappingURL=index.js.map
