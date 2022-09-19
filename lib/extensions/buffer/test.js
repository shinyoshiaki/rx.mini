"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("../../core"));
var _1 = require(".");
test("buffer", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var event, pool, i;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = new core_1.default();
                pool = (0, _1.Buffer)(3, event);
                i = 0;
                pool.subscribe(function () {
                    expect(i > 3).toBe(true);
                });
                event.execute(i++);
                event.execute(i++);
                event.execute(i++);
                event.execute(i++);
                event.execute(i++);
                event.execute(i++);
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=test.js.map