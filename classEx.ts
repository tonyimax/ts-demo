/*
* 基类
* */
class Base{
    constructor(obj=null) {
        if (obj){
            console.log('子类调用,基类构造函数',obj.a,obj.b);
        }else{
            console.log('基类构造函数');
        }

    }
    toString(obj){
        let [a,b]=[obj.a,obj.b];
        console.log('子类调用:toString()===>',a,b);
    }
}
//私有方法名符号定义
let s1 = Symbol('privateM1');
let s2 = Symbol('privateM2');
//私有属性名符号定义
let p1 = Symbol('privateP1');
/*
* 派生类,继承于Base
* */
class Framework extends Base{
    constructor({a=0,b=0}={}) {
        super({a,b});//向基类传入参数
        super.toString({a,b});//调用基类函数
        this[p1]='RemoteDev';
        console.log('私有属性输出:',this[p1]);
    }
    getPrivateProto(){
        return this[p1];
    }
    setPrivateProto(v){
        this[p1] = v;
    }
    //公有方法实现,默认下类的所有方法都是公有的
    getParentName(){
        console.log('Public Method Call ...');
        outOfClassMethod();//调用类外方法,这样类对象就无法访问outOfClassMethod
    }

    //类的私有方法实现
    _getParentName(){
        console.log('Private Method Call ...');
    }

    call_out_method(obj){
        outOfClassMethod.call(this,obj)//类外方法绑定形式实现私有方法
    }
    //调用通过Symbol定义的私有方法
    call_private(){
        this[s1]('hello');
        this[s2]('world');
    }
    //通过Symbol形式实现类私有方法,类对象无法访问通过Symbol命名的方法
    [s1](obj){
        console.log('通过Symbol命名的私有方法:',s1,obj)
    }

    [s2](obj){
        console.log('通过Symbol命名的私有方法:',s2,obj)
    }
    //类的私有私有属性与私有方法的另一种写法,#代表私有,目前属于提案阶段
    // #x=0;
    // #getx(){return #x;}
}

function outOfClassMethod(obj=null){
    console.log("通过调用类外部的方法形式实现类的私有方法",obj);
}

let base = new Base();//实例化基类
let framework = new Framework({a:8,b:9});//实例化派生类
//类实例是对象,类是函数
console.log('类对象的数据类型:',typeof base,typeof framework,'类的数据类型',typeof Base,typeof Framework);
console.log('类原型对象构造:',Framework.prototype.constructor,'类构造:',Framework.constructor);
console.log('类的原型对象prototype的constructor指向类名:',Framework.prototype.constructor===Framework);//类的原型对象prototype的constructor指向类名
console.log('类名:',Framework.name);
console.log(framework.constructor===Framework.prototype.constructor);

//通过类原型对象向类添加方法
Base.prototype.Add = function (x,y) {
    return x+y;
}
console.log('调用添加到基类原型对象上的方法:',base.Add(1,2));//调用添加到基类原型对象上的方法
console.log('派生类调用基类原型对象的方法:',framework.Add(5,6));//派生类调用基类原型对象的方法

// @ts-ignore
Base.prototype.test =()=> {
  console.log('test func');
};

console.log(Object.getOwnPropertyNames(Base.prototype));//取类所有方法名

//使用Object.assign为类添加方法
Object.assign(Base.prototype, {
    M1() {
        console.log('M1');
    },
    M2() {
        console.log('M2');
    },
    M3() {
        console.log('M3');
    }
});
//调用添加的方法
base.M1();
framework.M2();
framework.M3();

//注: 类内部定义的所有方法都是不可枚举的
console.log(Object.keys(Base.prototype));//constructor,toString这两个方法都在类内部定义,所以Object.keys无法枚举

//使用变量名定义类方法
let method = 'Done';
Object.assign( Base.prototype,{[method](){
    console.log('通过变量名定义的函数');
}});

console.log(Object.keys(Base.prototype));
base.Done();//通过方法名调用
Reflect.get(base,method)();//使用反射通过变量名调用
framework.Done();
console.log(Object.getOwnPropertyNames(Framework.prototype));
console.log('取当前类的继承对象',Object.getPrototypeOf(framework));
console.log('取当前类的继承对象的所有方法',Object.getPrototypeOf( Object.getPrototypeOf(framework)));
//根据子类取得基类,并调用基类方法
let p = Object.getPrototypeOf( Object.getPrototypeOf(framework))
p.Done();
console.log(Object.getOwnPropertyNames(p));
console.log(Reflect.ownKeys(p));
Reflect.get(p,method)();

console.log('base对象原型',base.__proto__,'framework对象原型:',framework.__proto__);


//通过表达式形式声明类
const ExpClass = class Exp {//此处Exp为类的别名,作用域只限于类内部定义
    constructor() {
        console.log('构造时打印类名:',Exp.name);
    }
    getClassName(){
        console.log('调用getClassName打印类名:');
        return Exp.name;
    }
}

let exp = new ExpClass();
console.log(exp.getClassName());

//立即执行类
let execClass = new class{
    constructor() {
        console.log('立即执行类');
    }
}();
//带参数的立即执行类
let execClassWithParam = new class{
    constructor(param) {
        console.log('立即执行类,参数:',param);
    }
}('RemoteDev');
//注: 类不存在变量提升,必须先声明后再实例化

framework.getParentName();
framework._getParentName();//unsafe  类外依然可调用
framework.call_out_method({x:'hello'});
console.log(Object.getOwnPropertyNames(Framework.prototype));
console.log(Object.getPrototypeOf(framework));//基类
console.log(Object.keys(framework));//类内部定义方法不可枚举,所以为[]
framework.call_private();//通过公有方法访问私有方法
console.log( '读私有属性值:',framework.getPrivateProto());
framework.setPrivateProto('NICK');//写私有属性值
console.log( '读私有属性值:',framework.getPrivateProto());

//类的this指针使用
class Log{
    constructor() {
        //为printX函数绑定当前类对象,解决调用this.print时找不到print方法
        this.printX = this.printX.bind(this);
        //通过箭头函数形式使this指针自动绑定方法
        this.printY = ((y='y') => {
            this.print(`this allow auto bind this,${y}`);
        });
    }
    print(obj){
        console.log(obj);
    }
    printX(x='a'){
        this.print(`hi,${x}`);//使用了this指针
    }
    printY(x='a'){
        this.print(`bind test :,${x}`);//使用了this指针
    }
}

let l = new Log();
l.printX('HELLO');//可正常调用
//导出形式调用报错
const {printX,printY}=l;//从对象中导出
//printX调用的print方法找不到,this失效
//printX('WOW');//Cannot read properties of undefined (reading 'print')
//通过绑定this的形式解决,上面的构造函数中添加了函数绑定this对象
console.log('printX方法已绑定this指针,问题解决');
printX('WOW');
console.log('printY方法通过箭头函数自动绑定this指针,问题解决');
printY('===world===');

//通过代理器在获取函数方法时自动绑定this
function proxyAutoBindThis(obj){
    let c = new WeakMap();//缓存
    //代理器处理事件
    let h = {
        get (t,k){
            let v = Reflect.get(t,k);
            if (typeof v!=='function'){return v;}//不是函数不处理,直接返回
            if (!c.has(v)){c.set(v,v.bind(t));}//不重复绑定
            return c.get(v);//返回绑定了this的函数
        }
    };
    let p = new Proxy(obj,h);//为传入的obj设置代理器
    return p;//返回代理器对象
}

class A{
    test(obj){
        console.log(obj);
    }
    test1(obj=null){
        this.test(`${obj}===>,test1`);//使用this指针
    }
    test2(obj=null){
        this.test(`${obj}===>,test2`);//使用this指针
    }
}
let a = new A();//实例化A对象a
let objBindThisByProxy = proxyAutoBindThis(a);//所有方法自动绑定this
let {test1,test2}=objBindThisByProxy;//从代理器导出
//类对象调用
a.test1('类对象调用');
a.test2('类对象调用');
//通过代理器调用
test1('通过代理器调用');
test2('通过代理器调用');

//类get与set方法使用
class B {
    _x=0;
    get x(){
        return this._x;
    }
    set x(v){
        this._x = v;
    }
}
let b = new B();
console.log('get&set方法存储于原型对象的属性描述对象中:',Object.getOwnPropertyDescriptor(B.prototype,'x'));

//类的生成器(Generator)函数使用
class C {
    args=[];
    //构造时传入参数数组
    constructor(...args) {
        this.args = args;
        console.log(...args);
    }
    //为类添加遍历支持
    *[Symbol.iterator](){
        for (let v of this.args) {
            console.log('类的Generator函数输出:',v);
            yield v;
        }
    }
}
//类实现化后会返回一个遍历器,因为设置了Symbol.iterator这个属性
let c = new C('HELLO','WORLD');
// @ts-ignore
//for...of会自动调用c这个遍历器
for (let e of c) {
    console.log(e);
}

//类静态方法使用
class D{
    constructor() {
    }
    static M1(){console.log('静态方法M1');}
    static M2(){console.log('静态方法M2');}
}
//调用静态方法
D.M1();
D.M2();
class E extends D{
    //类的实例属性
    yes="yes";
    no="no";
    //类的静态属性
    static pass='PASS';
    constructor() {
        super();
    }
    static M3(){console.log('静态方法M3');}
}
//调用基类静态方法
E.M1();
E.M2();

E.M3();

//类外部定义的静态属性
E.X = 1;
console.log('类外部定义的静态属性X:=',E.X);
E.hello = 'Hello';
console.log('类外部定义的静态属性hello:=',E.hello);
console.log('类内部定义的静态属性X:=',E.pass);//类内部定义的静态属性
//类的实例属性调用
let e = new E();
console.log(e.yes,e.no);

//判断类对象是否用new创建的
function Persion(name){
    if (new.target !== undefined){
        this.name = name;
        console.log(name);
    }else{
        throw new Error('请使用new来实例化对象');
    }
}
let ps1 = new Persion('X');//通过new来实例化
//let ps2 = Persion.call(ps1,'Z');//通过类对象ps1来创建.报异常

class BaseClass{
    constructor() {
        console.log(new.target,new.target == BaseClass);
        //防止基类被实例化
        if (new.target === BaseClass){
            throw new Error('基类只能被继承,不能被实例化');
        }
    }
    test(){
        console.log('基类的test方法');
    }
}
class SubClass extends BaseClass{
    constructor() {
        super();//构造基类对象,
        super.test();//调用基类的方法 ,super只能在constructor构造函数中调用
        this.test();//调用super后,super相当于当前类this ,this指针是从基类继承过来的
        console.log(super.valueOf() instanceof SubClass);//super指向子类实例
    }
}

//let bc = new BaseClass();//基类禁止实例化,会报错
let sc = new SubClass();

console.log(SubClass.prototype,SubClass.__proto__);
console.log(SubClass.__proto__,SubClass.prototype.__proto__);
//子类__proto__指向父类,表示构造函数继承
console.log('构造函数继承:',SubClass.__proto__ === BaseClass);
//子类的prototype.__proto__指向父类的prototype,表示prototype原型对象的继承
console.log('原型对象继承:',SubClass.prototype.__proto__ === BaseClass.prototype);

//原生构造函数继承
class myArray extends Array{
    constructor(...args){
        super(...args);
        console.log('扩展原生对象Array');
    }
}
let myArr = new myArray([1,2,3]);
console.log(myArr);
myArr[3]=8;
console.log(myArr.length);

class verCtlArray extends Array{
    verList;
    constructor() {
        super();
        this.verList=[[]];
    }
    up(){
        this.verList.push(this.slice());
    }
    rev(){
        this.splice(0,this.length,...this.verList[this.verList.length-1]);
    }
}
let vcArray = new verCtlArray();
vcArray.push(1);
vcArray.push(2);
console.log(vcArray,vcArray.verList);
vcArray.up();
console.log(vcArray.verList);
vcArray.push(3);
vcArray.up();
console.log(vcArray.verList);

class myError extends Error{
    msg='';stack='';
    constructor(msg) {
        super();
        this.msg = msg;
        this.stack = new Error().stack;
        this.name = this.constructor.name;
    }
}
//let err = new myError('myErr');
//console.log(err.msg,err.stack,err.name);

//混合多个类为一个类
function MixinFunc(...mixins){
    class MixClass{}

    for (let m of mixins) {
        cloneProto(MixClass,m);//克隆构造函数
        cloneProto(MixClass.prototype,m.prototype);//克隆原型对象
    }
    return MixClass;
}
//克隆对象
function cloneProto(t,s){
    for (let k of Reflect.ownKeys(s)) {
        //不克隆构造函数key,原型对象key及对象名key
        if (k !== 'constructor' && k !== 'prototype' && k !== 'name'){
            let d = Object.getOwnPropertyDescriptor(s,k);//取源对象属性描述
            Object.defineProperty(t,k,d);//克隆源对象键值对目标对象
        }
    }
}

class a1{
    constructor() {
    }
    test1(){console.log('a1类的test1方法');}
}
class a2{
    constructor() {
    }
    test2(){console.log('a2类的test2方法');}
}
class a3{
    constructor() {
    }
    test3(){console.log('a3类的test3方法');}
}

let mixCls =MixinFunc(a1,a2,a3);//混合a1,a2,a3这三个类的功能到mixCls这个对象
console.log(Object.getOwnPropertyNames(mixCls.prototype));//[ 'constructor', 'test1', 'test2', 'test3' ]
//调用,因为类的方法都定义在原型对象上,所以Reflect.get要传入混合对象的原型对象
Reflect.get(mixCls.prototype,'test1')();//test1()
Reflect.get(mixCls.prototype,'test2')();//test2()
Reflect.get(mixCls.prototype,'test3')();//test3()









