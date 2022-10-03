function A(){
    this.foo = 'hello';
}
let key=Symbol.for('globalFoo');//防止key被覆盖
if(!global[key]){
    global[key] = new A();
}
module.exports = global[key];//导出