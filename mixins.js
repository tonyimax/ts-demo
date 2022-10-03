"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mix = void 0;
//导出混合方法
function mix(...args) {
    return function (t) {
        Object.assign(t.prototype, ...args); //添加方法到对象原型
    };
}
exports.mix = mix;
//# sourceMappingURL=mixins.js.map