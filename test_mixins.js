"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = require("./mixins"); //导入混合方法
//声明要混合入类的方法
let methodToMix = {
    MixFunc() { console.log('this method use for Mix'); }
};
let MyClass = class MyClass {
};
MyClass = __decorate([
    (0, mixins_1.mix)(methodToMix) //在类声明中使用了修饰器@mix
], MyClass);
let obj = new MyClass(); //实例化类,类对象具有修饰器混入的方法MixFunc
obj.MixFunc(); //调用混入的方法
//# sourceMappingURL=test_mixins.js.map