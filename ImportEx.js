"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAdd = exports.DEL_FUNC = exports.ADD_FUNC = void 0;
const ExportEx_1 = require("./ExportEx");
var ExportEx_2 = require("./ExportEx"); //从导入模块直接导出方法
Object.defineProperty(exports, "ADD_FUNC", { enumerable: true, get: function () { return ExportEx_2.ADD_FUNC; } });
Object.defineProperty(exports, "DEL_FUNC", { enumerable: true, get: function () { return ExportEx_2.DEL_FUNC; } });
Object.defineProperty(exports, "myAdd", { enumerable: true, get: function () { return ExportEx_2.Add; } });
console.log(ExportEx_1.HeadName, ExportEx_1.MidName, ExportEx_1.BothDate);
console.log(ExportEx_1.X, ExportEx_1.Y, ExportEx_1.Z);
console.log((0, ExportEx_1.ADD_FUNC)(1, 2), (0, ExportEx_1.DEL_FUNC)(3, 4));
console.log((0, ExportEx_1.Add)(5, 6));
//# sourceMappingURL=ImportEx.js.map