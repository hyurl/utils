function keysOf(obj) {
    if (Array.isArray(obj)) {
        return obj.map((_, i) => i);
    }
    else {
        return Reflect.ownKeys(obj);
    }
}

export { keysOf as default };
//# sourceMappingURL=keysOf.js.map
