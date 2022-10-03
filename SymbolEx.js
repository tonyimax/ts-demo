let s = Symbol();
console.log(s);
console.log(typeof (s));
let s1 = Symbol('desc_name');
console.log(s1, typeof (s1), s1.toString());
console.log(Symbol() === Symbol()); //false ,Symbol是唯一的
console.log(Boolean(Symbol())); //true ,Symbol可转换为bool类型,
console.log(String(Symbol()));
//console.log(Number(Symbol()));//Symbol不可转换为Number
let obj = {};
obj[Symbol()] = 'hello';
console.log(obj);
let objA = {
    [Symbol()]: 'world'
};
console.log(objA);
let sym = Symbol();
let objB = {
    [sym]: 'helloworld',
    [Symbol('test')]: 'testSymbol'
};
console.log(objB);
console.log(objB[sym]);
console.log(Object.getOwnPropertySymbols(objB));
//全局Symbol
let sym1 = Symbol.for('sym1');
let sym2 = Symbol.for('sym2');
let sym3 = Symbol.for('sym2'); //存在,不重复创建,直接返回已存在
console.log(sym2 === sym3); //true
//取Symbol.for中定义的key
console.log(Symbol.keyFor(sym2));
let a = require('./mod'); //调用模块
console.log(a.foo);
console.log(global._foo);
global._foo = 123;
console.log(global._foo);
let b = require('./mod'); //调用模块
console.log(b.foo);
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}
// @ts-ignore
if ([1, 2, 3] instanceof new MyClass()) {
}
//数组的展开使用
let arr1 = ['c', 'd'];
console.log(['a', 'b'].concat(arr1, 'e'));
console.log(arr1[Symbol.isConcatSpreadable]); //
arr1[Symbol.isConcatSpreadable] = false; //不展开数组
console.log(['a', 'b'].concat(arr1, 'e'));
class AA extends Array {
    constructor(...args) {
        super(...args);
        this[Symbol.isConcatSpreadable] = true; //展开数组
    }
}
class AB extends Array {
    constructor(...args) {
        super(...args);
        this[Symbol.isConcatSpreadable] = false; //不展开数组
    }
}
let aa1 = new AA([1, 2, 3, 4, 5]);
let aa2 = new AB([6, 7, 8, 9, 0]);
console.log([9, 9, 9].concat(aa1, aa2));
//Symbol.species指向当前对象的构造函数
class C extends Array {
    constructor(...args) {
        super(...args);
        this[Symbol.isConcatSpreadable] = true;
    }
    //覆盖父类Array的构造函数
    static get [Symbol.species]() {
        return Array;
    }
}
let cc = new C(1, 2, 3, 4, 5);
let ccMap = cc.map(x => x * x);
console.log(ccMap instanceof C);
console.log(ccMap instanceof Array); //ccMap属于Array实例,因为Symbol.species覆盖了
console.log('hello'.match(/^he/i));
class D {
    [Symbol.match](str) {
        return 'hello'.indexOf(str);
    }
}
// @ts-ignore
console.log('e'.match(new D()));
const xx = {};
xx[Symbol.replace] = (...s) => console.log(s);
// @ts-ignore
'Hello'.replace(xx, 'world');
class E {
    constructor(v) {
        this.v = v;
    }
    [Symbol.search](str) {
        return str.indexOf(this.v);
    }
}
console.log('hello'.search(new E('e')));
class F {
    constructor(v) {
        this.v = v;
    }
    [Symbol.split](str) {
        let i = str.indexOf(this.v);
        if (i === -1) {
            return str;
        }
        return [str.substr(0, i), str.substr(i + this.v.length)];
    }
}
console.log('hello'.split(new F('e')));
let myIter = {};
myIter[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
// @ts-ignore
console.log([...myIter]);
//指向迭代器
class Collection {
    *[Symbol.iterator]() {
        let i = 0;
        while (this[i] !== undefined) {
            yield this[i];
            ++i;
        }
    }
}
let myCol = new Collection();
myCol[0] = 1;
myCol[1] = 2;
myCol[2] = 3;
myCol[3] = 4;
myCol[4] = 5;
// @ts-ignore
for (const myColElement of myCol) {
    console.log(myColElement);
}
//指向原生对象
let objProto = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'hello';
            case 'default':
                return 'default';
            default:
                throw new Error('type Error');
        }
    }
};
// @ts-ignore
console.log(2 * objProto);
console.log(objProto + 'World');
console.log(objProto, objProto == 'default', String(objProto));
//指向对象的标签
console.log(({ [Symbol.toStringTag]: 'Foo' }.toString()));
class Coll {
    get [Symbol.toStringTag]() {
        return 'xxx';
    }
}
let CollObj = new Coll();
console.log(Object.prototype.toString.call(CollObj));
console.log(CollObj);
console.log(JSON[Symbol.toStringTag]);
console.log(Math[Symbol.toStringTag]);
console.log(ArrayBuffer.prototype[Symbol.toStringTag]);
console.log(aa1[Symbol.toStringTag]);
//# sourceMappingURL=SymbolEx.js.map