function getGlobal(prop = void 0) {
    let _global;
    if (typeof globalThis === "object") {
        _global = globalThis;
    }
    else if (typeof self === "object") {
        _global = self;
    }
    else if (typeof global === "object") {
        _global = global;
    }
    else if (typeof window === "object") {
        _global = window;
    }
    return _global && (prop ? _global[prop] : _global);
}

export { getGlobal as default };
//# sourceMappingURL=getGlobal.js.map
