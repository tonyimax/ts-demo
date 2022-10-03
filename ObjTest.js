//函数返回对象
let func = (x, y) => {
    return { x, y }; //返回Object
};
console.log(func(2, 3));
//带有方法的对象
let obj = {
    getHello() {
        return 'Hello';
    }
};
//调用对象中的方法
console.log(obj.getHello());
//带有属性与方法的对象
let person = {
    name: 'RemoteDev',
    birth: '1949/10/01',
    getJob() {
        return 'IT Coding';
    },
    getData() {
        return [this.name, this.birth, this.getJob()];
    }
};
console.log(person, person.getJob());
let objArray = {};
let getItem = (key) => {
    return key in objArray ? objArray[key] : null;
};
let setItem = (k, v) => {
    objArray[k] = v;
};
let clear = () => {
    objArray = {};
};
//对象属性赋值器与访问器使用
let car = {
    _wheels: 4,
    get wheels() {
        return this._wheels;
    },
    set wheels(v) {
        if (v < this._wheels) {
            throw new Error('wheels too small');
        }
        this._wheels = v;
    }
};
console.log(car.wheels);
car.wheels = 16;
console.log(car.wheels);
//取方法我name属性
// @ts-ignore
let pname = Object.getOwnPropertyDescriptor(car, 'wheels').get.name;
console.log(pname);
//
console.log(func.bind(1, 2).name);
//对象比较
// @ts-ignore
console.log(Object.is('ok', 'ok'));
// @ts-ignore
console.log(Object.is({}, {}));
console.log(+0 === -0);
console.log(NaN === NaN);
// @ts-ignore
console.log(Object.is(NaN, NaN));
// @ts-ignore
console.log(Object.is(+0, -0));
//对象属性复制
let targetObj = { name: 'RemoteDev' };
let s1Obj = { age: 80 };
let s2Obj = { address: 'China' };
// @ts-ignore
Object.assign(targetObj, s1Obj, s2Obj);
console.log('属性复制后的对象:', targetObj);
let s3Obj = { age: 95, tel: '13800001111' }; //属性同名会被覆盖
// @ts-ignore
Object.assign(targetObj, s3Obj);
console.log('属性复制后的对象,同名属性后面的覆盖前面的:', targetObj);
//注:因undefined和null无法转换为Object所以不能将这两乾作为Object.assign的首参数
let objDesc = {
    name: 'RemoteDev',
    address: 'China',
    detail: {
        title: 'subject',
        main: {
            id: 101
        }
    }
};
//取对象属性描述
let desc = Object.getOwnPropertyDescriptor(objDesc, 'name');
console.log(desc);
for (const descKey in desc) {
    console.log('对象描述键:', descKey);
}
if (desc['enumerable'] == true) {
    console.log('可枚举属性');
}
Object.keys(objDesc).forEach((v, i) => {
    console.log('对象自身可枚举属性:', v);
});
//序列化
console.log('序列化为JSON:', JSON.stringify(objDesc));
console.log(objDesc.name.toString(), objDesc.name.length);
console.log(Object.getOwnPropertyDescriptor(objDesc, 'name').enumerable);
console.log(Object.getOwnPropertyDescriptor(objDesc, 'address').enumerable);
// @ts-ignore
Object.assign({ b: 'c' }, Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
}));
// @ts-ignore
Object.assign(objDesc, Object.defineProperty({}, 'tel', {
    enumerable: false,
    configurable: true,
    value: '13811110000'
}));
console.log(objDesc);
for (const descKey in objDesc) {
    console.log(descKey);
}
let oneProperty = Object.defineProperties(objDesc, {
    tel: {
        configurable: true,
        enumerable: true,
        value: '15112345678',
        //writable:true
    },
    job: {
        configurable: false,
        enumerable: false,
        value: 'GameDev'
    }
});
console.log(objDesc);
let copyObj1 = {};
// @ts-ignore
Object.assign(copyObj1, objDesc);
objDesc.detail.main.id = 999;
console.log('复制并替换对象属性:', copyObj1);
let firstObj = {
    x: 1,
    y: {
        k: 5, dbg: 'yes'
    }
};
console.log(firstObj);
let secondObj = {
    z: 'hello',
    y: 'abc'
};
console.log(secondObj);
// @ts-ignore
Object.assign(firstObj, secondObj); //合并后secondObj中的y会替换掉firstObj中的y对象,因为同名
console.log('合并后secondObj中的y会替换掉firstObj中的y对象,因为同名:', firstObj);
//数组也一样,会按key来覆盖
// @ts-ignore
console.log(Object.assign([1, 2, 3], [4, 5]));
//定义类
/*
*   类
* */
class myClass {
    /*
    * 构造函数
    * */
    constructor(x, y) {
        // @ts-ignore
        Object.assign(this, { x, y }); //添加属性
    }
}
class mySubClass extends myClass {
    constructor() {
        super(200, 300);
    }
    hello() {
        console.log('hello,mySubClass');
    }
}
console.log(myClass);
let mycalss = new myClass(10, 20); //实例化类并调用构造函数
console.log('类myClass对象myclass的x属性描述:', Object.getOwnPropertyDescriptor(mycalss, 'x'));
Object.getOwnPropertyNames(mycalss).forEach((v, i) => {
    console.log('类myClass所有属性:', v);
});
//为类对象添加方法
// @ts-ignore
Object.assign(mycalss, {
    getX() {
        console.log('为类添加的getX方法');
    },
    getY() {
        console.log('为类添加的getY方法');
    }
});
Object.getOwnPropertyNames(mycalss).forEach((v, i) => {
    console.log('类myClass所有属性与方法:', v);
});
console.log(mycalss.x, mycalss.y, mycalss.getX, mycalss.getY);
//调用动态为类对象添加的方法
mycalss.getX();
mycalss.getY();
console.log('=========新的类对象并不拥有assign添加的方法,Object.assign只为类对象myclass添加了getX与getY方法======================');
let mynewclass = new myClass(50, 100);
Object.getOwnPropertyNames(mynewclass).forEach((v, i) => {
    console.log('类myClass所有属性与方法:', v);
});
//非继续克隆
let clone = (obj) => {
    // @ts-ignore
    return Object.assign({}, obj);
};
//继承克隆
let clonedeep = (obj) => {
    let objProto = Object.getPrototypeOf(obj);
    // @ts-ignore
    return Object.assign(Object.create(objProto), obj);
};
console.log(objDesc);
let cloneObj = clone(objDesc);
console.log("被克隆对象属性发生变更,浅拷贝,克隆对象会随被克隆对象变化而变化", cloneObj);
objDesc.detail.title = '被克隆对象属性发生变更';
console.log(cloneObj);
let clonedeepObj = clonedeep(objDesc);
objDesc.detail.title = '原始对象被修改';
console.log(objDesc);
console.log('深度拷贝:', clonedeepObj);
let mysub = new mySubClass();
console.log(mysub, mysub.x, mysub.y);
mysub.hello();
let subClone = clone(mysub);
console.log(subClone);
//subClone.hello();//浅克隆hello方法没有克隆过来
let subDeepClone = clonedeep(mysub);
console.log(subDeepClone);
subDeepClone.hello(); //深克隆hello方法可克隆过来
// @ts-ignore
console.log(Reflect.has(subClone, 'hello'));
// @ts-ignore
console.log(Reflect.has(subDeepClone, 'hello'));
// @ts-ignore
console.log(Reflect.get(subDeepClone, 'hello'), typeof (Reflect.get(subDeepClone, 'hello')));
// @ts-ignore
if (Reflect.has(subDeepClone, 'hello')) { //如果对象存在hello这个属性名
    // @ts-ignore
    let func_hello = Reflect.get(subDeepClone, 'hello');
    // @ts-ignore
    if (typeof (func_hello) == 'function') { //如果hello是函数
        console.log('通过反映执行函数===');
        func_hello(); //执行函数
    }
}
//# sourceMappingURL=ObjTest.js.map