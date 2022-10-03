import {HeadName,MidName,BothDate,X,Y,Z,ADD_FUNC,DEL_FUNC,Add} from "./ExportEx";
export {ADD_FUNC,DEL_FUNC,Add as myAdd} from "./ExportEx";//从导入模块直接导出方法
console.log(HeadName,MidName,BothDate);
console.log(X,Y,Z);
console.log(ADD_FUNC(1,2),DEL_FUNC(3,4));
console.log(Add(5,6));
