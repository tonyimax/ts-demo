//导出变量
export let HeadName = 'Nance';
export let MidName = 'Jone';
export let BothDate = '2020-12-20';

let [X,Y,Z]=[0,0,0];
export {X,Y,Z};

//导出函数
export function Add(a,b){return a+b;}

function Multiply(x,y){return x * y;}
export {Multiply};

function a1(a,b){return a+b;}
function b1(a,b){return a-b;};
export {a1,b1};//导出多个函数

//函数别名形式导出
export {a1 as ADD_FUNC ,b1 as DEL_FUNC};

//默认导出,一个模块只能有一个默认导出,不管是类,方法或者是变量
//export default class a{};//默认导出类a后就不能再默认导出函数,或者默认导出变量
//export default function b(){};
let qq=0;
export default qq; //默认导出不能使用 as 别名导出

