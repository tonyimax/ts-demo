//属性的遍历
let obj = {
    x: 1,
    y: 2,
    hello() {
        console.log('hello');
    },
    [Symbol('PASS')]: 'PASS' //Symbol属性
};
//为对象obj增加不可枚举属性test
Object.defineProperty(obj, 'test', {
    value: 'nice',
    enumerable: false,
    writable: true,
    configurable: true
});
console.log(obj);
//遍历自身和继承的可枚举属性,不含Symbol
for (const objKey in obj) {
    console.log('遍历自身和继承的可枚举属性:', objKey);
}
//遍历自身可枚举属性,不含Symbol
Object.keys(obj).forEach(v => {
    console.log('遍历自身可枚举属性:', v);
});
//遍历自身所有属性含不可枚举属性,不含Symbol
Object.getOwnPropertyNames(obj).forEach(v => {
    console.log('遍历自身所有属性含不可枚举属性:', v);
});
//遍历所有Symbol属性
Object.getOwnPropertySymbols(obj).forEach(v => {
    console.log('遍历所有Symbol属性:', v);
});
//遍历对象所有属性含不可枚举,Symbol,
Reflect.ownKeys(obj).forEach(v => {
    console.log('遍历对象所有属性含不可枚举,Symbol', v);
});
class a {
    //构造
    constructor(c) {
        Object.assign(this, { c });
        this.c = c;
    }
    ;
    hello() {
        console.log('hello');
    }
    ;
    toString() {
        console.log('toString');
    }
    toValue() {
        console.log('toValue');
    }
}
console.log(a);
let newa = new a('hello');
console.log(newa);
console.log(Reflect.ownKeys(newa));
newa.hello();
console.log(typeof (newa.hello));
console.log(newa.constructor);
console.log(a.prototype.constructor);
console.log(a.prototype.hello);
//直接调用原型对象上的方法
a.prototype.hello();
a.prototype.toString();
a.prototype.toValue();
//对象原型上添加属性
a.prototype.x = 10;
a.prototype.y = 20;
console.log(newa.x, newa.y);
Object.getOwnPropertyNames(a.prototype).forEach(v => { console.log('>>>>>', v); });
//通过assign为对象原型添加方法
Object.assign(a.prototype, {
    func1() {
        console.log('通过assign添加到类原型对象上的func1方法');
    },
    func2() {
        console.log('通过assign添加到类原型对象上的func1方法');
    }
});
//调用类原型对象上的方法
a.prototype.func1();
a.prototype.func2();
//通过类对象调用
newa.func1();
newa.func2();
console.log(Reflect.has(newa, 'x')); //通过反射检查对象属性
console.log(a.prototype.hasOwnProperty('x')); //通过类原型对象检查对象属性
console.log(newa.hasOwnProperty('c')); //类对象上的属性
console.log(newa.__proto__.hasOwnProperty('x')); //类对象原型上的属性
let clsA = new a(9);
let clsB = new a(99);
console.log(clsA.__proto__, clsB.__proto__);
console.log(clsA.__proto__ === clsB.__proto__); //类对象实例原型共享,都指向a.prototype ,  a.prototype 与 clsA.__proto__指向的是同一结构
console.log("__proto__", '--->', clsA.__proto__, 'prototype', '--->', a.prototype);
//添加原型方法将影响所有实例
newa.__proto__.getData = () => { return "Hello World!"; };
console.log('newa实例调用:', newa.getData());
console.log('clsA实例调用:', clsA.getData());
console.log('clsB实例调用:', clsB.getData());
//对象方法与原型方法区别
let tmpObj = {
    //Enabled是对象自身方法
    Enabled: function () {
        console.log('Enabled');
    }
};
//这里添加的Diasbled是原型方法
tmpObj.__proto__.Diasbled = () => {
    console.log('Diasbled');
};
console.log(Object.getOwnPropertyNames(tmpObj)); //getOwnPropertyNames只能取命名函数
console.log(Object.getPrototypeOf(tmpObj)); //getPrototypeOf可取命名函数及箭头函数
console.log(Reflect.ownKeys(tmpObj)); //ownKeys只能取命名函数
console.log(Object.getOwnPropertyNames(tmpObj.__proto__));
let oldProto = Object.getPrototypeOf(tmpObj);
let newProto = Object.assign(oldProto, {
    x: 10,
    y: 20,
    z: 'hello',
    test: function () {
        console.log('添加的原型方法:test');
    }
});
//为对象添加属性
Object.setPrototypeOf(tmpObj, newProto);
console.log(Object.getOwnPropertyNames(tmpObj.__proto__));
a.prototype.test(); //调用添加的原型方法
tmpObj.test();
//创建对象
let newObject = Object.create({}, {
    item: {
        value: '不可枚举,因为enumerable默认是false'
    },
    item2: {
        value: '这个属性是可枚举,因为配置了enumerable属性为true',
        enumerable: true,
        writable: true,
        configurable: true
    }
});
console.log(newObject);
console.log(Object.values({ [Symbol()]: 'symbol val', a: 1, b: 2 })); //Symbol属性会被values过滤掉
console.log(Object.entries({ [Symbol()]: 'symbol val', a: 1, b: 2 })); //Symbol属性会被values过滤掉
console.log(Object.keys(newObject)); //不可枚举的属性的key不会被识别
//对象深克隆
let objCloneDeep = Object.assign(Object.create(Object.getPrototypeOf(tmpObj)), tmpObj);
console.log('tmpObj', Object.getOwnPropertyNames(tmpObj.__proto__));
console.log('objCloneDeep', Object.getOwnPropertyNames(objCloneDeep.__proto__));
//取原型对象属性描述
console.log("取单个属性描述:", Object.getOwnPropertyDescriptor(tmpObj.__proto__, 'test'));
console.log('取对象所有属性描述:', Object.getOwnPropertyDescriptors(tmpObj.__proto__));
let objA = {
    item: 'hello',
    //hello读属性方法
    get hello() {
        return this.item;
    },
    set hello(v) {
        this.item = v;
    }
};
console.log('objA:', objA);
console.log('objA->PropertyDescriptor:', Object.getOwnPropertyDescriptor(objA, 'item'));
console.log('objA->PropertyDescriptor:', Object.getOwnPropertyDescriptors(objA)); //get set方法能读取,getOwnPropertyDescriptors解决Object.assign无法正确复制get,set属性方法问题
let objB = {};
Object.assign(objB, objA);
console.log(objB);
console.log(Object.getOwnPropertyDescriptor(objB, 'hello'));
console.log(Object.getOwnPropertyDescriptors(objB));
let mix = (obj) => ({
    with: (...mixins) => mixins.reduce((c, mixin) => Object.create(c, Object.getOwnPropertyDescriptors(mixin)), obj)
});
let obj1 = { a: 'a' };
let obj2 = { b: 'b' };
let obj3 = { c: 'c' };
let obj4 = mix(obj1).with(obj2, obj3);
console.log(obj4);
//# sourceMappingURL=ObjEx.js.map