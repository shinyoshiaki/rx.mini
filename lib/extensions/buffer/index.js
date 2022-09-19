"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffer = void 0;
var core_1 = require("../../core");
function Buffer(length, event) {
    var observable = new core_1.Event();
    var pool = [];
    var fulled = false;
    event.subscribe(function () {
        var e = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
        }
        if (!fulled && pool.length === length) {
            pool.forEach(function (e) { return observable.execute.apply(observable, e); });
            fulled = true;
        }
        if (fulled) {
            observable.execute.apply(observable, e);
        }
        else {
            pool.push(e);
        }
    });
    var subscribe = observable.subscribe, asPromise = observable.asPromise, once = observable.once;
    return { subscribe: subscribe, asPromise: asPromise, once: once };
}
exports.Buffer = Buffer;
//# sourceMappingURL=index.js.map