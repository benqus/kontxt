var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createContext = exports.updateContexts = exports.removeListener = exports.addListener = void 0;
    var listeners = new Set();
    var execFn = function (fn) { return fn(); };
    var tout = null;
    var addListener = function (fn) { return listeners.add(fn) && fn; };
    exports.addListener = addListener;
    var removeListener = function (fn) { return listeners.delete(fn); };
    exports.removeListener = removeListener;
    function updateContexts() {
        clearTimeout(tout);
        tout = null;
        listeners.forEach(execFn);
    }
    exports.updateContexts = updateContexts;
    function createContext(value) {
        if (value === void 0) { value = null; }
        var context = function () { return value; };
        context.set = function (v) {
            value = v;
            tout = tout !== null && tout !== void 0 ? tout : setTimeout(updateContexts, 0);
        };
        context.merge = function (v) { return context.set(__assign(__assign({}, value), v)); };
        return context;
    }
    exports.createContext = createContext;
});
