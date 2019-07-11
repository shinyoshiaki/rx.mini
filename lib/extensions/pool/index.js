"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("../../core"));
function Pool(length, event) {
    var observable = new core_1.default();
    var pool = [];
    event.subscribe(function (e) {
        pool.push(e);
        if (pool.length >= length) {
            var data = pool.shift();
            if (data)
                observable.execute(data);
        }
    });
    var subscribe = observable.subscribe, asPromise = observable.asPromise, once = observable.once;
    return { subscribe: subscribe, asPromise: asPromise, once: once };
}
exports.Pool = Pool;
//# sourceMappingURL=index.js.map