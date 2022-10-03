//下面对空对象{}的get与set属性访问器进行拦截
let obj = new Proxy({}, {
    get: function (target, p, receiver) {
        console.log(`正在获取对象属性:${p}`);
        return Reflect.get(target, p, receiver);
    },
    set: function (target, p, value, receiver) {
        console.log(`正在对象设置属性:${p},值:${value}`);
        return Reflect.set(target, p, value, receiver);
    }
});
//下面对obj的访问会进入代理器的拦截
obj.length; //get访问
obj.length = 1; //set访问
let myProxy = new Proxy({}, {
    get: function (target, p) {
        return 'RemoteDev'; //获取myProxy这个代码器的任意对象都返回RemoteDev
    }
});
console.log(myProxy.x);
console.log(myProxy.y);
console.log(myProxy.z);
let proxy22 = new Proxy({}, {
    get: (target, property) => {
        return 'hello';
    }
});
console.log(proxy22.x);
let tmpObj = Object.create(proxy22);
tmpObj.p;
//同时拦截get,apply,construct
let handler = {
    get: function (target, p) {
        if (p == 'prototype') {
            return Object.prototype;
        }
        return 'Hello,Your Value:' + p;
    },
    apply: function (target, bind, args) {
        return args[0];
    },
    construct: function (target, args) {
        return { value: args[1] };
    }
};
let mulProxy = new Proxy(function (x, y) { return x + y; }, handler);
console.log(mulProxy(1, 2)); //apply拦截
console.log(new mulProxy(3, 4)); //construct拦截
console.log(mulProxy.prototype === Object.prototype); //get prototype拦截
console.log(mulProxy.xxx); //get拦截
//注,不可写或不可配置属性不能被代理
let noProxyObj = Object.defineProperties({}, {
    test: {
        value: 'test',
        configurable: false,
        writable: false
    },
});
let xhandler = {
    get: function (target, p) {
        return 'noProxyObj';
    }
};
let tmpProxy = new Proxy(noProxyObj, xhandler);
tmpProxy.xxx;
var t = () => { return 'XXXX'; };
let h = {
    apply: function () {
        return 'ZZZ';
    }
};
let p = new Proxy(t, h);
p();
let p1 = new Proxy(function () {
    return 'hello';
}, {
    apply(target, thisArg, argArray) {
        return '函数代理中';
    }
});
p1();
console.log('=============');
let h1 = {
    has: function (t, k) {
        if (k[0] === '_') {
            console.log('属性存在_');
            return false;
        }
        return k in t;
    }
};
let t1 = { _a: 'yes', b: 'no' };
let r1 = new Proxy(t1, h1);
console.log('_a' in r1);
let t2 = { a: 10 };
Object.preventExtensions(t2); //禁止对象t1扩展,不可配置或禁止扩展对象无法被代理
let p3 = new Proxy(t2, {
    has: function (target, p) {
        return false;
    }
});
//console.log('a' in p3); //不可配置或禁止扩展对象无法被代理,but the proxy target is not extensible
//注意: for...in循环无法被has拦截
let funcProxy = new Proxy(function () { console.log('函数拦截演示'); }, {
    construct(target, argArray, newTarget) {
        console.log('函数实现化拦截中...');
        return { value: argArray[0] * 80 };
    }
});
console.log(new funcProxy(9).value);
let delHandler = {
    deleteProperty(target, p) {
        checkDel(p, 'delete');
        return true;
    }
};
let checkDel = function (p, flag) {
    if (p[0] === '_') {
        throw new Error('成功拦截删除带下划线属性');
    }
    ;
};
let delTarget = { _a: 'yes', b: 'no' };
let delProxy = new Proxy(delTarget, delHandler);
//delete delProxy._a;//删除对象属性
//拦截对象添加属性
let noAddAttr = {};
let noAddHandler = {
    defineProperty(t, k, d) {
        return false;
    }
};
let noAddProxy = new Proxy(noAddAttr, noAddHandler);
noAddProxy.ok = 'ok';
let ownHandler = {
    getOwnPropertyDescriptor(t, k) {
        if (k[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(t, k);
    }
};
let ownTarget = { _a: 'yes', b: 'no' };
let ownProxy = new Proxy(ownTarget, ownHandler);
let ownP = Object.getOwnPropertyDescriptor(ownProxy, '_a'); //_a属性描述被拦截
console.log(ownP);
console.log(Object.getOwnPropertyDescriptor(ownProxy, 'b'));
let proto = {};
let protoProxy = new Proxy({}, {
    getPrototypeOf(t) {
        console.log('getPrototypeOf拦截');
        return proto;
    }
});
console.log(Object.getPrototypeOf(protoProxy));
let extProxy = new Proxy({}, {
    isExtensible(target) {
        console.log('isExtensible方法被拦截');
        return true;
    }
});
console.log(Object.isExtensible(extProxy));
let objExt = {
    x: 1, y: 2, z: 3
};
let objExtHandler = {
    ownKeys(target) {
        return ['y'];
    }
};
let objExProxy = new Proxy(objExt, objExtHandler);
console.log(Object.keys(objExProxy));
//不可枚举属性与Symbol名的属性会被拦截器过滤掉
let myTarget = {
    a: 1, b: 2, c: 3, [Symbol.for('test')]: 4
};
Object.defineProperty(myTarget, 'newkey', {
    value: 'test',
    configurable: true,
    enumerable: false,
    writable: true
});
let myHandler = {
    ownKeys(t) {
        return ['a', 'd', Symbol.for('test'), 'newkey']; //d属性不存在,Symbol自动过滤,所以返回 a属性
    }
};
let mytmpProxy = new Proxy(myTarget, myHandler);
console.log(Object.keys(mytmpProxy));
let pp = new Proxy({}, {
    ownKeys(t) {
        return ['a', 'b', 'c'];
    }
});
console.log(Object.getOwnPropertyNames(pp));
//不可扩展情况下,不能返回对象之外的属性
let obj1 = { x: 1 };
Object.preventExtensions(obj1);
let px = new Proxy(obj1, {
    ownKeys(t) {
        return ['x', 'y'];
    }
});
//console.log(Object.getOwnPropertyNames(px));//运行时报错 y为不可扩展对象之外的属性
let proxy1 = new Proxy({}, {
    preventExtensions(t) {
        Object.preventExtensions(t);
        return true;
    }
});
console.log(Object.preventExtensions(p));
let handler1 = {
    setPrototypeOf(t, p) {
        console.log('setPrototypeOf拦截');
        throw new Error('setPrototypeOf拦截');
    }
};
let proto1 = {};
let target1 = function () { };
let proxy2 = new Proxy(target1, handler1);
//Object.setPrototypeOf(proxy2,proto1);
//可取消代理
let t11 = {};
let h11 = {};
let { proxy, revoke } = Proxy.revocable(t11, h11);
console.log(proxy.x);
revoke(); //取消对象代理
//console.log(proxy.x);//不可访问,代理已取消  a proxy that has been revoked
//对象代理中this指针问题
let thisTarget = {
    m: function () {
        console.log(this, proxy, this === proxy);
    }
};
let thisHandler = {};
let thisProxy = new Proxy(thisTarget, thisHandler);
thisTarget.m();
thisProxy.m();
let _val = new WeakMap();
class A {
    constructor(v) {
        _val.set(this, v);
    }
    get v() {
        return _val.get(this);
    }
}
let j = new A('j');
console.log(j.v);
let jp = new Proxy(j, {});
console.log(j.v);
//代理对象绑定
let tarDate = new Date();
let tarHandler = {
    //解决代理对象不是Date的实例问题
    get: function (t, p) {
        if (p === 'getDate') {
            return t.getDate.bind(t); //绑定对象
        }
        return Reflect.get(t, p);
    }
};
let tarProxy = new Proxy(tarDate, tarHandler);
console.log(tarDate.getDate());
console.log(tarProxy.getDate()); //tarHandler没有处理get属性时,代理对象不是Date的实例
let newObject = {
    x: 1,
    y: 2
};
let newObjectProxy = new Proxy(newObject, {
    get(t, p) {
        console.log('get:', t, p);
        return Reflect.get(t, p);
    },
    deleteProperty(t, p) {
        console.log('delete:' + p.toString());
        return Reflect.deleteProperty(t, p);
    },
    has(t, p) {
        console.log('has:' + p.toString());
        return Reflect.has(t, p);
    }
});
console.log('x' in newObjectProxy);
delete newObjectProxy['x'];
console.log('x' in newObjectProxy);
console.log(newObjectProxy.y);
//# sourceMappingURL=ProxyEx.js.map