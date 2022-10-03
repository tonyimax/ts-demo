var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//定义变量修饰函数
function hasFuncA(t) {
    t.hasFuncA = true;
}
//为类A添加修饰器hasFuncA 编译器支持,但IDE不支持 修改器,编译成js后不影响执行
let A = class A {
    constructor() {
        console.log('使用了修饰器的类');
    }
};
A = __decorate([
    hasFuncA
], A);
let a = new A();
console.log('调用修饰器变量:', A.hasFuncA);
//# sourceMappingURL=DecoratorEx.js.map