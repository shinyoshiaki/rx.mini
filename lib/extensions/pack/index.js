"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../core");
function Pack() {
    var events = [];
    var event = function () {
        var e = new core_1.Event();
        events.push(e);
        return e;
    };
    var finishAll = function () {
        events.forEach(function (e) { return e.allUnsubscribe(); });
        events = [];
    };
    return { event: event, finishAll: finishAll };
}
exports.default = Pack;
//# sourceMappingURL=index.js.map