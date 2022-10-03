//导出混合方法
export function mix(...args){
    return function (t){
        Object.assign(t.prototype,...args);//添加方法到对象原型
    }
}