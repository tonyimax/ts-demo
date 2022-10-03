export * from "./ModA.js"; //继承模块ModA
export function Hello(){
    console.log('Hello');
}
export {print as p} from "./ModA";
export {Hello as H};//别名导出
export default Hello;//默认导出
