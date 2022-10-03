"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEL_FUNC = exports.ADD_FUNC = exports.b1 = exports.a1 = exports.Multiply = exports.Add = exports.Z = exports.Y = exports.X = exports.BothDate = exports.MidName = exports.HeadName = void 0;
//导出变量
exports.HeadName = 'Nance';
exports.MidName = 'Jone';
exports.BothDate = '2020-12-20';
let [X, Y, Z] = [0, 0, 0];
exports.X = X;
exports.Y = Y;
exports.Z = Z;
//导出函数
function Add(a, b) { return a + b; }
exports.Add = Add;
function Multiply(x, y) { return x * y; }
exports.Multiply = Multiply;
function a1(a, b) { return a + b; }
exports.a1 = a1;
exports.ADD_FUNC = a1;
function b1(a, b) { return a - b; }
exports.b1 = b1;
exports.DEL_FUNC = b1;
;
//默认导出,一个模块只能有一个默认导出,不管是类,方法或者是变量
//export default class a{};//默认导出类a后就不能再默认导出函数,或者默认导出变量
//export default function b(){};
let qq = 0;
exports.default = qq; //默认导出不能使用 as 别名导出
//# sourceMappingURL=ExportEx.js.map