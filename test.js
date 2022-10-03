const myvar = 120; //这里120就是实际的地址
//const并不保存值不能改,只是保证指向的地址不能改
const foo = {};
foo.prop = 123; //为foo动态扩展一个属性并赋值123
console.log(foo.prop); //调用属性
//foo = {}; //这里会报不能能常量赋值
//常量数组指向一个空地址
const a = [];
a.push('Hello');
console.log(a[0]);
a.length = 0;
console.log(a);
//a=['OK'];//这里会报不能能常量赋值
//冻结对象
const myObj = Object.freeze({}); //冻结后对象不能被扩展
myObj.prop = 123; //扩展未生效
console.log(myObj.prop); //属性未定义
var Constantize = (obj) => {
    Object.freeze(obj); //冻结第一层
    Object.keys(obj).forEach((v, i) => {
        if (typeof (obj[v] === 'object')) {
            Object.freeze(obj[v]); //冻结第二层
            Object.keys(obj[v]).forEach((vv, ii) => {
                if (typeof (obj[v][vv] === 'object')) {
                    Object.freeze(obj[v][vv]); //冻结第三层
                }
            });
        }
    });
};
//被冻结对象
let testObj = {
    name: 'dev',
    address: 'CN',
    detail: {
        age: 16,
        sex: 1,
        subDetail: {
            age: 6,
            sex: 1,
            subsubDetail: {
                age: 6,
                sex: 1,
            }
        }
    },
    detail2: {
        age: 26,
        sex: 0,
    },
    detail3: {
        age: 36,
        sex: 0,
    },
};
//冻结
Constantize(testObj);
//测试扩展
testObj.job = 'IT'; //扩展冻结第一层
testObj.detail.tel = '13800000000'; //扩展冻结第二层
testObj.detail.subDetail.tel = '15900001111'; //扩展冻结第三层
console.log(testObj); //显示对象,没有扩展成功,三层都冻结了
//判断对象是否被冻结
console.log(Object.isFrozen(testObj));
console.log(Object.isFrozen(testObj.detail));
console.log(Object.isFrozen(testObj.detail.subDetail));
//数组的各种情况解构,按位置顺序来取
let [x, y, z] = [1, 2, 3];
console.log(x, y, z);
let [a1, [b1, c1]] = [10, [12, 14]];
console.log(a1, b1, c1);
let [, , nice] = ['YES', 'NO', 'PASS'];
console.log(nice);
let [p1, , p3] = [3, 6, 9];
console.log(p1, p3);
//...end表示后面所有参数,begin表达1
let [begin, ...end] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(begin);
console.log('=============');
console.log(end);
//y1会是undefined ,z1会是空数组
let [x1, y1, ...z1] = ['a'];
console.log(x1, y1, z1);
let [xxxx] = [];
let [xxx, yyy] = [1];
console.log(xxxx, yyy);
let [j, k] = [7, 8, 9];
console.log(j, k);
let [L1, [L3], L4] = [1, [2, 3], 4];
console.log(L1, L3, L4);
//下面会报错,只能赋值数组
//let [pp1]=1;
//let [pp2]=true;
// let [pp3]=NaN;
// let [pp4]=undefined;
// let [pp5]=null;
// let [pp6]={};
// @ts-ignore
let [q1, q2, q3] = new Set(['aaa', 'bbb', 'ccc']);
console.log(q1, q2, q3);
//生成器
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b]; //返回前个数字加上后个数字的队列如 0 1 1 2 3 5 8
    }
}
let [m1, m2, m3, m4, m5, m6] = fibs(); //从生成器中取6次
console.log(m1, m2, m3, m4, m5, m6);
//生成器
function* test() {
    let x = 0;
    while (true) {
        yield x;
        x += 2; //返回第次加2
    }
}
let [cx1, cx2, cx3] = test(); //从生成器中取3次
console.log(cx1, cx2, cx3); //- 0 2 4
//解构默认值
let [posX = 0, posY = 0] = [];
console.log(posX, posY);
let [meta1, meta2 = 'a'] = ['b'];
console.log(meta1, meta2);
let [meta3, meta4 = 'xxx'] = ['yyy', undefined];
console.log(meta3, meta4);
//undefined情况下默认值生效
let [defval = 1] = [undefined];
console.log(defval);
//null情况下默认值无效
let [defval2 = 1] = [null];
console.log(defval2);
function f() {
    console.log('aaa');
}
let [zzz = f()] = [1];
console.log(zzz);
let [zzz1 = f()] = [undefined]; //函数没返回的话取undefined
console.log(zzz1);
//对象的解构,按对象属性名来取,与位置无关
let { name, age, address } = { name: 'RemoteDev', age: 18, address: '中国上海' };
console.log(name, age, address);
let { age1, name1, address1 } = { name1: 'RemoteDev', age1: 18, address1: '中国上海' };
console.log(name1, age1, address1);
let { age2, name2, NewAddress } = { name2: 'RemoteDev', age2: 18, address2: '中国上海' };
console.log(name2, age2, NewAddress); //会取不到NewAddress因为与对象名不同,NewAddress返回undefined
//通过别名的形式来取
let { age3, name3, address3: NewAddress2 } = { name3: 'RemoteDev', age3: 18, address3: '中国上海' };
console.log(name3, age3, NewAddress2); //这样可正常取address3值并赋值给NewAddress2
console.log('完成用别名来取对象属性值');
let personData = { UserName: 'RemoteDev', Age: 18, Address: '中国上海' };
let { UserName: _n, Age: _a, Address: _d } = personData;
console.log(_n, _a, _d);
//console.log(UserName);  //UserName is not defined 因为UserName是用来匹配对象属性名的,取值放到变量_n中,使用别名,只能用别名变量
let tmpObj = {
    p: [
        'Ada',
        {
            'cap': 'Mix'
        }
    ]
};
//p用来匹配对象属性p,v1取Ada值,cap取Mix值
let { p: [v1, { cap }] } = tmpObj;
console.log(v1, cap);
//别名匹配
let { p: [r1, { cap: r2 }] } = tmpObj;
console.log(r1, r2);
//取整个对象值p
let { p, p: [val1, { cap: val2 }] } = tmpObj;
console.log(p, val1, val2);
//嵌套对象的匹配与取值
let node = {
    loc: {
        start: {
            line: 2,
            column: 10
        }
    }
};
let { loc, loc: { start }, loc: { start: { line } } } = node;
console.log(loc);
console.log(start);
console.log(line);
let _Obj = {};
let _Arr = [];
({ propA: _Obj.propA, propB: _Arr[0] } = { propA: 890, propB: false }); //要加上()不然会与变量名_Obj,_Arr冲突
console.log(_Obj, _Arr);
//对象解构默认值
let { theKinds = 9988 } = {};
console.log(theKinds);
let { kind1, kind2 = 5 } = { kind1: 9 };
console.log(kind1, kind2);
let { play: pname = 'Mick' } = { play: 'Linux' };
console.log(pname);
let { play: { subName = 'Default' } } = { play: { subName: undefined } };
console.log(subName);
let { PI = 3.14159 } = { PI: null }; //这里默认值不生效
console.log(PI);
let { _pa, _pb } = { VLCA: 100, VLCB: 200 };
console.log(_pa, _pb); //这里取不到值,因匹配属性名不成功
let moveAction = { actionType: 'Out' };
console.log(moveAction.actionType);
let { log, sin, cos } = Math;
//对数组属性进行解构
let numArr = [1, 2, 3];
let { 0: first, [numArr.length - 1]: last } = numArr;
console.log(first, last);
//字符串解构
const [nx1, nx2, nx3] = 'ABC';
console.log(nx1, nx2, nx3);
//字符属性解构
let { length: len } = 'RemoteDev';
console.log(len);
let { toString: s } = 123;
console.log(s);
let { toString: s1 } = true;
console.log(s1);
//因为undefined和null无法转换为对象所以下两个表达式会报错
//let {proA:__X}=undefined;
//let {proB:__Y}=null;
//函数参数解构
function Add([x, y]) {
    return x + y;
}
let result = Add([6, 9]);
console.log(result);
[[1, 2], [3, 4]].map(([x, y]) => console.log(x + y));
//函数参数默认值
function funcDef({ x = 0, y = 0 } = {}) {
    console.log([x, y]);
    return [x, y];
}
funcDef();
funcDef({ x: 50 });
funcDef({ x: 10, y: 20 });
funcDef({ y: 100 });
funcDef({});
//变量值交换
let NumberA = 10;
let NumberB = 20;
[NumberA, NumberB] = [NumberB, NumberA];
console.log(NumberA, NumberB);
function f1() {
    return [5, 10, 15];
}
let [e1, e2, e3] = f1();
console.log(e1, e2, e3);
function getTestObj() {
    return {
        a: 5 * 2,
        b: 10 * 2,
        c: 15 * 2
    };
}
let { a: ca1, b: ca2, c: ca3 } = getTestObj();
console.log(ca1, ca2, ca3);
//数组参数有序
function f2([x, y, z]) {
    console.log(x, y, z);
}
f2([9, 8, 7]);
//对象参数无序
function f3({ x = 0, y = 0, z = 0 } = {}) {
    console.log(x, y, z);
}
f3({ x: 3, z: 9, y: 80 });
//通过解构提取JSONovrn
let jsondata = {
    _id: 200,
    _status: "Success",
    _data: [168, 578]
};
let { _id, _status, _data: arr } = jsondata;
console.log(_id, _status, arr);
//构造Map
let myMap = new Map();
myMap.set(1, 100);
myMap.set(2, "OK");
myMap.set(3, false);
myMap.set('UI', 'ZJY');
console.log(myMap);
//遍历Map
for (const [k, v] of myMap) {
    console.log(k, v);
}
//# sourceMappingURL=test.js.map