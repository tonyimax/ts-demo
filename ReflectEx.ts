let tmpProxy = new Proxy({},{
    set:function (t,p,v,r){
        let s = Reflect.set(t,p,v,r);
        if(s){
            console.log('set:',t,p,v);
        }
        return s;
    },
    get:function (t,p){
        console.log('get:',t,p);
        return Reflect.get(t,p);
    },
    deleteProperty(t, p) {
        console.log('delete:',t,p);
        return Reflect.deleteProperty(t,p);
    },
    has(t, p) {
        console.log('has:',t,p);
        return  Reflect.has(t,p);
    }
});
tmpProxy.x=0;
console.log(tmpProxy.x);
delete tmpProxy.x;
tmpProxy.hasOwnProperty('x');
'x' in tmpProxy;


let obj = {
    name:'RemoteDev',
    job:'IT'
};
console.log(Reflect.get(obj,'name'));
console.log(Reflect.get(obj,'job'));
//绑定接收者
let bindObj={
    x:1,
    y:2,
    get getXY(){
        return this.x + this.y;
    }
};
//接收者
let recv = {
    x:20,
    y:30
}
//调用
let r =Reflect.get(bindObj,'getXY',recv);
console.log(r);

let setObj={
    x:1,
    y:2,
    set setXY({x,y}){
        this.x=x;
        this.y=y;
    }
};
Reflect.set(setObj,'setXY',{x:50,y:60});
console.log(setObj.x,setObj.y);

//Reflect的set方法会触发代理器的defineProperty拦截
let obj1 = {
    x:1
};

let handler={
    set(t,p,v,r){
        console.log('set call');
        Reflect.set(t,p,v,r);
    },
    defineProperty(t, k, d) {
        console.log('defineProperty call');
        Reflect.defineProperty(t,k,d);
    }
};

// @ts-ignore
let proxy1= new Proxy(obj1,handler);
proxy1.x=88;
Reflect.deleteProperty(obj1,'x');

class A{
    constructor(x) {
        Object.assign(this,{x:0});
    }
    func (x){
        this.x = x;
        console.log("a func");
    }
}


let func_inst1 = new A(7);
console.log(func_inst1.func);
let func_inst2 = Reflect.construct(A,[100]);
console.log(func_inst2.func);
console.log(A.prototype,Reflect.getPrototypeOf(func_inst1));
let proto = {y:5};
Reflect.setPrototypeOf(func_inst1,proto);
console.log(Reflect.getPrototypeOf(func_inst1));

let arr = [1,2,3,4,5,6,7,8,9,0];
let tMin = Reflect.apply(Math.min,Math,arr);
let tMax = Reflect.apply(Math.max,Math,arr);
let tType = Reflect.apply(Object.prototype.toString,tMin,[]);
console.log(tMin,tMax,tType);

let newObj = {x:1};
Reflect.defineProperty(newObj,'newProp',{value:123});
console.log(Reflect.get(newObj,'newProp'));
console.log(Reflect.getOwnPropertyDescriptor(newObj,'newProp'));
console.log(Reflect.isExtensible(newObj));
Reflect.preventExtensions(newObj);
console.log(Reflect.isExtensible(newObj));
console.log(Reflect.ownKeys(newObj));

//观察者模式
let queueObserve = new Set();//观察池
let observe = fn=>queueObserve.add(fn);//观察者
let observable=data=>new Proxy(data,{set});//数据触发者,通过代理器实现
function set(t,k,v,r) {
    let d = Reflect.set(t,k,v,r);
    // @ts-ignore
    queueObserve.forEach(v=>v());//遍历池并调用池中方法
    return d;
}
//观察数据对象
let data=observable({
    name:'RemoteDev',
    job:'IT'
});

function print() {
    console.log(`${data.name},${data.job}`);
}
observe(print);//观察者
data.name='RM';//数据发生变化,调用observable--->set--->遍历池



